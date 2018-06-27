const Record = require('../models/record')
const Validator = require('../validators/schema')
const Lambda = require('../helpers/lambda')

module.exports = {
  index: async (event, context, callback) => {
    console.log('*** Incoming event ***')
    console.log(event)
    console.log('*** ************** ***')

    try {
      console.log(process.env.TZ)

      const params = Lambda.params(event)
      const response = await Record.all(Validator.validate(params, 'index_record'))
      callback(null, { statusCode: 200, body: JSON.stringify(response), headers: Lambda.headers })
    } catch (error) {
      console.log('ERROR:', error)
      callback(null, { statusCode: 422, body: JSON.stringify({ message: error.message }), headers: Lambda.headers })
    }
  },

  create: async (event, context, callback) => {
    console.log('*** Incoming event ***')
    console.log(event)
    console.log('*** ************** ***')

    try {
      const params = Lambda.params(event)
      const response = await Record.create(Validator.validate(params, 'create_record'))
      callback(null, { statusCode: 200, body: JSON.stringify(response), headers: Lambda.headers })
    } catch (error) {
      console.log('ERROR:', error)
      callback(null, { statusCode: 422, body: error.message, headers: Lambda.headers })
    }
  },

  delete: async (event, context, callback) => {
    console.log('*** Incoming event ***')
    console.log(event)
    console.log('*** ************** ***')

    try {
      const params = Lambda.params(event)
      // FIXME: Add json schema validation
      console.log('event', params.id)
      await Record.delete({ user_id: params.user_id, timestamp: params.id })

      callback(null, { statusCode: 201, body: null, headers: Lambda.headers })
    } catch (error) {
      console.log('ERROR:', error)
      callback(null, { statusCode: 422, body: error.message, headers: Lambda.headers })
    }
  }
}
