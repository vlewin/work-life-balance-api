module.exports = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
    'Access-Control-Allow-Credentials': true,
    'Content-Type': 'application/json'
  },

  params: (event) => {
    let params = { user_id: event.requestContext.authorizer.principalId }

    if(event.httpMethod === 'GET') {
      Object.assign(params, event.queryStringParameters)
    }

    if(['PUT', 'PATCH', 'POST'].includes(event.httpMethod)) {
      const body = typeof (event.body) === 'string' ? JSON.parse(event.body) : event.body
      Object.assign(params, body)
    }

    if(event.pathParameters) {
      Object.assign(params, event.pathParameters)
    }

    return params
  },

  convertStreamData: (data) => {
    const object = { }
    for(let key of Object.keys(data)) {
      object[key] = Object.values(data[key])[0]
    }

    return object
  }
}
