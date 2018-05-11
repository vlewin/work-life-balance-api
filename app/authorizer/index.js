const jwk = require('jsonwebtoken')
const jwkToPem = require('jwk-to-pem')
const request = require('request')

// For Auth0:       https://<project>.auth0.com/
// refer to:        http://bit.ly/2hoeRXk
// For AWS Cognito: https://cognito-idp.<region>.amazonaws.com/<user pool id>/
// refer to:        http://amzn.to/2fo77UI
// const iss = 'https://work-life-balance.eu.auth0.com/'

// Generate policy to allow this user on this API:
const generatePolicy = (principalId, effect, resource) => {
  const authResponse = { principalId: principalId }

  // console.log('Generate policy for', principalId, effect, resource)
  if (effect && resource) {
    const statementOne = { Action: 'execute-api:Invoke', Effect: effect, Resource: '*' }
    const policyDocument = { Version: '2012-10-17', Statement: [statementOne] }
    authResponse.policyDocument = policyDocument
  }

  authResponse.context = { authId: principalId, foo: 'TEST' }
  return authResponse
}

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization',
  'Access-Control-Allow-Credentials': true,
  'Content-Type': 'application/json'
}

// Reusable Authorizer function, set on `authorizer` field in serverless.yml
module.exports.handler = (event, context, callback) => {
  // console.log('**** Event ****')
  // console.log(event)
  // console.log('**** Context ****')
  // console.log(context)
  //
  // console.log('**** NODE_ENV ****')
  // console.log(process.env.NODE_ENV)

  if(event.authorizationToken === 'TEST-TOKEN' && process.env.IS_OFFLINE) {
    callback(null, generatePolicy('user12345', 'Allow', event.methodArn))
    return true
  }

  const iss = 'https://work-life-balance.eu.auth0.com/'

  if (event.authorizationToken) {
    // console.log('**** FOUND AUTH TOKEN ****')
    const token = event.authorizationToken.replace('Bearer ', '')

    // Make a request to the iss + .well-known/jwks.json URL:
    request({ url: `${iss}.well-known/jwks.json`, json: true }, (error, response, body) => {
      if (error || response.statusCode !== 200) {
        console.log('Request error:', error)
        callback('Unauthorized')
        return true
      }

      const keys = body
      // Based on the JSON of `jwks` create a Pem:
      const k = keys.keys[0]
      const jwkArray = {
        kty: k.kty,
        n: k.n,
        e: k.e
      }
      const pem = jwkToPem(jwkArray)

      // Verify the token:
      jwk.verify(token, pem, { issuer: iss }, (err, decoded) => {
        if (err) {
          // console.log('**** JWT TOKEN IS INVALID:', err.message)
          callback('Unauthorized')
          // callback('Unauthorized', { statusCode: 403, headers: headers, body: err.message })
        } else {
          console.log('**** ALL GREEN:', decoded.sub, 'ALLOW', event.methodArn)
          callback(null, generatePolicy(decoded.sub, 'Allow', event.methodArn))
        }
      })
    })
  } else {
    console.log('**** NO AUTH TOKEN')
    callback('Unauthorized')
  }
}
