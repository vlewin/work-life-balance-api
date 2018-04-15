const Record = require('../models/record')
const Validator = require('../validators/record')

// TODO: Move to helpers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
  'Access-Control-Allow-Credentials': true,
  'Content-Type': 'application/json'
}

module.exports = {
  index: async function (event, context, callback) {
    try {
      if(event.queryStringParameters === null) {
        throw new Error('Missing required params')
      }

      console.log('*** Query:', event.queryStringParameters)
      const params = Validator.validate(event.queryStringParameters, 'index')
      console.log('valid params', params)

      const response = await Record.all(params)
      console.log('response', response)

      callback(null, { statusCode: 200, body: JSON.stringify(response), headers })
    } catch (error) {
      console.log('*** ERROR', error)
      callback(null, { statusCode: 422, body: JSON.stringify(error), headers })
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
    // callback(null, {
    //   statusCode: 200,
    //   body: JSON.stringify(event),
    //   headers
    // })

    try {
      const body = JSON.parse(event.body)
      console.log('***', body)

      const params = Validator.validate(body, 'create')
      console.log('valid params', params)

      const response = await Record.create(body)

      callback(null, {
        statusCode: 200,
        body: JSON.stringify(response),
        headers
      })
    } catch (error) {
      console.error('Error', error)
      callback(null, {
        statusCode: 422,
        body: error.message,
        headers
      })
      return error
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
