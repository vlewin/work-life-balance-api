const Record = require('../models/record')
const Validator = require('../validators/schema')
const Lambda = require('../helpers/lambda')


module.exports = {
  index: async function (event, context, callback) {
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

  create: async function (event, context, callback) {
    try {
      const params = Lambda.params(event)
      const response = await Record.create(Validator.validate(params, 'create_record'))
      callback(null, { statusCode: 200, body: JSON.stringify(response), headers: Lambda.headers })
    } catch (error) {
      console.log('ERROR:', error)
      callback(null, { statusCode: 422, body: error.message, headers: Lambda.headers })
    }
  }
}
