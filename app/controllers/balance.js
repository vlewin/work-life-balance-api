const Balance = require('../models/balance')
const Validator = require('../validators/schema')
const Lambda = require('../helpers/lambda')
const querystring = require('querystring');

module.exports = {
  show: async function (event, context, callback) {
    try {
      const params = Lambda.params(event)
      const user_id = querystring.escape(event.pathParameters.id)
      console.info('**** Get balance for UserID', user_id, params)

      const response = await Balance.findById(params.user_id)
      console.info('**** BALANCE:GET RESPONSE', JSON.stringify(response))

      callback(null, { statusCode: 200, body: JSON.stringify(response), headers: Lambda.headers })
    } catch (error) {
      console.error('**** BALANCE:GET ERROR', JSON.stringify(error))
      callback(null, { statusCode: 422, body: error.message, headers: Lambda.headers })
    }
  },

  update: async function (event, context, callback) {
    try {
      console.log(event)

      console.log('*********** START EVENT JSON ***********')

      console.log(JSON.stringify(event))

      console.log('*********** END EVENT JSON ***********')

      // FIXME: Move to Lambda helpers streamEvent
      const record = event.Records[0].dynamodb['NewImage']
      const timestamp = {}

      for(let key of Object.keys(record)) {
        timestamp[key] = Object.values(record[key])[0]
      }

      console.log('*********** START TIMESTAMP ***********')
      console.log(timestamp)
      console.log('*********** END TIMESTAMP ***********')


      console.log('*********** START BALANCE ***********')
      let balance = await Balance.findById(timestamp.user_id)
      console.log('*********** END BALANCE ***********')


      if(!balance) {
        console.log('*** Init balance')
        balance = { total: 0, vacation: 0, sickness: 0 }
      }

      console.log('*********** UPDATE BALANCE ***********')
      balance.total += parseFloat(timestamp.duration) - 8
      console.log('Update total', balance)

      const params = Validator.validate(balance, 'update_balance')

      console.log('*** Update balance', params)
      const response = await Balance.update(params)
      console.log('*********** END BALANCE ***********')

      console.log('*********** START REPONSE ***********')
      console.log(typeof(response))

      console.log(response)

      console.info('**** RESPONSE', JSON.stringify(response))
      console.log('*********** END REPONSE ***********')
      // callback(null, { statusCode: 200, body: JSON.stringify(response), headers: Lambda.headers })

    } catch (error) {
      // FIXME: How to notify user about an exception in a balance update flow ???
      console.error('**** ERROR', JSON.stringify(error))
      callback(null, { statusCode: 422, body: error.message, headers: Lambda.headers })
    }
  }
}
