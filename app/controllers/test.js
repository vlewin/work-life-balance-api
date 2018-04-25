const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
  'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
  'Access-Control-Allow-Credentials': true,
  'Content-Type': 'application/json'
}

module.exports = {
  index: (event, context, callback) => {
    console.log('**** EVENT ****')
    console.log(event)
    console.log('**** CONTEXT ****')
    console.log(context)
    callback(null, { statusCode: 200, body: JSON.stringify(context), headers })
  }
}
