module.exports = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
    'Access-Control-Allow-Credentials': true,
    'Content-Type': 'application/json'
  },

  params: (event) => {
    let payload = { user_id: event.requestContext.authorizer.principalId }

    if (event.httpMethod === 'GET') {
      Object.assign(payload, event.queryStringParameters)
    }

    if (['PUT', 'PATCH', 'POST'].includes(event.httpMethod)) {
      const body = typeof (event.body) === 'string' ? JSON.parse(event.body) : event.body
      Object.assign(payload, body)
    }

    if (event.pathParameters) {
      Object.assign(payload, event.pathParameters)
    }

    return payload
  },

  convertStreamData: (data) => {
    const object = { }
    for (let key of Object.keys(data)) {
      object[key] = Object.values(data[key])[0]
    }

    return object
  }
}
