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
      // FIXME: Move to Lambda helpers streamEvent
      const record = event.Records[0].dynamodb['NewImage']
      const timestamp = {}

      for(let key of Object.keys(record)) {
        timestamp[key] = Object.values(record[key])[0]
      }

      console.log(timestamp)

      const difference = parseFloat(timestamp.duration) - 8
      const balance = await Balance.findById('github|611466')
      const response = await Balance.update({ total: balance.total + difference })

      console.info('**** RESPONSE', JSON.stringify(event.Records[0].dynamodb))
      callback(null, { statusCode: 200, body: JSON.stringify({}), headers: Lambda.headers })

    } catch (error) {
      console.error('**** ERROR', JSON.stringify(error))
      callback(null, { statusCode: 422, body: error.message, headers: Lambda.headers })
    }
  }
}
