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

  if (effect && resource) {
    const statementOne = { Action: 'execute-api:Invoke', Effect: effect, Resource: resource }
    const policyDocument = { Version: '2012-10-17', Statement: [statementOne] }
    authResponse.policyDocument = policyDocument
  }

  console.log('authResponse')
  console.log(authResponse)
  // authResponse.context = { authId: principalId }
  return authResponse
}

// Reusable Authorizer function, set on `authorizer` field in serverless.yml
module.exports.handler = (event, context, callback) => {
  console.log('event')
  console.log(event)
  console.log('context')
  console.log(context)
  console.log('Auth function invoked')

  const iss = 'https://work-life-balance.eu.auth0.com/'

  if (event.authorizationToken) {
    // Remove 'bearer ' from token:
    // const token = event.authorizationToken.substring(7)
    const token = event.authorizationToken.replace('Bearer ', '')
    // console.log(token)

    // Make a request to the iss + .well-known/jwks.json URL:
    request({ url: `${iss}.well-known/jwks.json`, json: true }, (error, response, body) => {
      if (error || response.statusCode !== 200) {
        console.log('Request error:', error)
        callback('Unauthorized')
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
          console.log('Unauthorized user:', err.message)
          callback('Unauthorized')
        } else {
          callback(null, generatePolicy(decoded.sub, 'Allow', event.methodArn))
        }
      })
    })
  } else {
    console.log('No authorizationToken found in the header.')
    callback('Unauthorized')
  }
}
