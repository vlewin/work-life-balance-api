const Record = require('../models/record')
const Validator = require('../validators/schema')

// TODO: Move to helpers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization',
  'Access-Control-Allow-Credentials': true,
  'Content-Type': 'application/json'
}

// TODO: Move to helpers
const getParams = (event) => {
  let params = { user_id: event.requestContext.authorizer.principalId }

  if(event.httpMethod === 'GET') {
    return Object.assign(params, event.queryStringParameters)
  }

  if(event.httpMethod === 'POST') {
    const body = typeof (event.body) === 'string' ? JSON.parse(event.body) : event.body
    return Object.assign(params, body)
  }
}

module.exports = {
  index: async function (event, context, callback) {
    try {
      // const params = event.queryStringParameters || {}
      // params.user_id = event.requestContext.authorizer.principalId

      const params = getParams(event)
      console.log('Validation', Validator.validate(params, 'index_record'))
      // FIXME: Record.all should take 2 parameters user_id and params
      const response = await Record.all(Validator.validate(params, 'index_record'))
      console.log('Response', response)
      callback(null, { statusCode: 200, body: JSON.stringify(response), headers })
    } catch (error) {
      console.log('***', error.message)
      callback(null, { statusCode: 422, body: JSON.stringify({ message: error.message }), headers })
    }
  },

  // show: async function (event, context, callback) {
  //   const response = await Record.find(event.pathParameters.id)
  //   callback(null, {
  //     statusCode: 200,
  //     body: JSON.stringify(response),
  //     headers
  //   })
  // },

  create: async function (event, context, callback) {
    console.log('============= CREATE ===================')

    try {
      console.log('*************** EVENT ****************')
      console.log(event.requestContext.authorizer)

      const body = typeof (event.body) === 'string' ? JSON.parse(event.body) : event.body

      console.log('*************** BODY ****************')
      console.log(body)
      body.user_id = event.requestContext.authorizer.principalId
      const params = Validator.validate(body, 'create_record')
      const response = await new Record(params).save()

      callback(null, { statusCode: 200, body: JSON.stringify(response), headers: headers })
    } catch (error) {
      console.error('**** ERROR', JSON.stringify(error))
      callback(null, { statusCode: 422, body: error.message, headers: headers })
    }
  },

  update: async function (event, context, callback) {
    // const result = await Record.save({ name: 'Huhu', description: 'haha' })
    callback(null, { statusCode: 200, body: 'result', headers: headers })
  },

  destroy: async function (event, context, callback) {
    // const result = await Record.save({ name: 'Huhu', description: 'haha' })
    callback(null, { statusCode: 200, body: 'result', headers: headers })
  }
}

// module.exports.index = async (event, context, callback) => {
//   const record = new Record()
//   const result = await record.save({ name: 'Huhu', description: 'haha' })
//   callback(null, { statusCode: 200, body: result })
// }
//
// module.exports.show = async (event, context, callback) => {
//   const record = new Record()
//   const result = await record.save({ name: 'Huhu', description: 'haha' })
//   callback(null, { statusCode: 200, body: result })
// }
//
// module.exports.create = async (event, context, callback) => {
//   const record = new Record()
//   const result = await record.save({ name: 'Huhu', description: 'haha' })
//   callback(null, { statusCode: 200, body: result })
// }
//
// module.exports.update = async (event, context, callback) => {
//   const record = new Record()
//   const result = await record.save({ name: 'Huhu', description: 'haha' })
//   callback(null, { statusCode: 200, body: result })
// }
//
// module.exports.destroy = async (event, context, callback) => {
//   const record = new Record()
//   const result = await record.save({ name: 'Huhu', description: 'haha' })
//   callback(null, { statusCode: 200, body: result })
// }
