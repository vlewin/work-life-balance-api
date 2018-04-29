const headers = {
  'Access-Control-Allow-Origin': '*',
  // 'Access-Control-Allow-Headers':
  // 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
  // 'Access-Control-Allow-Credentials': true,
  'Content-Type': 'application/json'
}

module.exports = {
  index: (event, context, callback) => {
    console.log('**** EVENT ****')
    console.log(event.requestContext.authorizer.principalId)
    console.log('**** CONTEXT ****')
    console.log(context)
    callback(null, { statusCode: 200, body: JSON.stringify(event), headers })
  }
}
