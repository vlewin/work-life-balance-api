const Record = require('../models/record')
const Validator = require('../validators/schema')

// TODO: Move to helpers
const headers = {
  'Access-Control-Allow-Origin': '*',
  // 'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
  // 'Access-Control-Allow-Credentials': true,
  'Content-Type': 'application/json'
}

module.exports = {
  index: async function (event, context, callback) {
    try {
      const params = event.queryStringParameters || {}
      params.user_id = event.requestContext.authorizer.principalId

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

  show: async function (event, context, callback) {
    const response = await Record.find(event.pathParameters.id)
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(response),
      headers
    })
  },

  create: async function (event, context, callback) {
    try {
      console.log('*************** EVENT ****************')
      console.log(event.requestContext)

      const body = typeof (event.body) === 'string' ? JSON.parse(event.body) : event.body
      body.user_id = event.requestContext.authorizer.principalId
      const params = Validator.validate(body, 'create_record')
      const response = await Record.create(params)
      callback(null, { statusCode: 200, body: JSON.stringify(response), headers })
    } catch (error) {
      console.error('Error', error)
      callback(null, { statusCode: 422, body: error.message, headers })
    }
  },

  update: async function (event, context, callback) {
    // const result = await Record.save({ name: 'Huhu', description: 'haha' })
    callback(null, { statusCode: 200, body: 'result', headers })
  },

  destroy: async function (event, context, callback) {
    // const result = await Record.save({ name: 'Huhu', description: 'haha' })
    callback(null, { statusCode: 200, body: 'result', headers })
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
