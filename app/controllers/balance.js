const Balance = require('../models/balance')
const Validator = require('../validators/schema')
const Lambda = require('../helpers/lambda')

module.exports = {
  show: async function (event, context, callback) {
    try {
      const response = await Record.find(event.pathParameters.id)
      console.error('**** RESPONSE', JSON.stringify(response))
      callback(null, { statusCode: 200, body: JSON.stringify(response), headers: Lambda.headers })
    } catch (error) {
      console.error('**** ERROR', JSON.stringify(error))
      callback(null, { statusCode: 422, body: error.message, headers: Lambda.headers })
    }
  },

  update: async function (event, context, callback) {
    try {
      const params = Lambda.params(event)
      const response = await Balance.update(params)
      console.error('**** RESPONSE', JSON.stringify(response))
      callback(null, { statusCode: 200, body: JSON.stringify(response), headers: Lambda.headers })
    } catch (error) {
      console.error('**** ERROR', JSON.stringify(error))
      callback(null, { statusCode: 422, body: error.message, headers: Lambda.headers })
    }
  }
}
