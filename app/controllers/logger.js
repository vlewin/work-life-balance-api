module.exports.handler = (event, context, callback) => {
  // print out the event information on the console (so that we can see it in the CloudWatch logs)
  console.log(JSON.stringify(event.Records))
  console.log(`The following happend in the DynamoDB database table "users":\n${JSON.stringify(event.Records[0].dynamodb, null, 2)}`)

  callback(null, { event })
}
