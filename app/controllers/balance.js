const Balance = require('../models/balance')
const Validator = require('../validators/schema')
const Lambda = require('../helpers/lambda')
const querystring = require('querystring');



module.exports = {
  show: async function (event, context, callback) {
    console.log('*** Incoming event ***')
    console.log(event)
    console.log('*** ************** ***')

    try {
      const params = Lambda.params(event)
      // FIXME: Move to lambda helpers
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

  update: async (event, context, callback) => {
    console.log('*** Incoming event ***')
    console.log(event)
    console.log('*** ************** ***')

    try {
      if(event && event.Records){
        const user_id = Lambda.convertStreamData(event.Records[0].dynamodb['Keys']).user_id
        let balance = await Balance.findById(user_id) || {}

        console.log('*********** CURRENT BALANCE ***********')
        console.log(balance)
        console.log('*********** *************** ***********')


        event.Records.forEach((record) => {
          console.log(user_id, record.eventName)
          if(record.eventName === 'INSERT') {
            const timestamp = Lambda.convertStreamData(record.dynamodb['NewImage'])

            if(timestamp.type === 'presence') {
              balance.total += parseFloat(timestamp.total)
            } else {
              balance[timestamp.reason] += 1
            }

          } else if (record.eventName === 'MODIFY') {
            const new_timestamp = Lambda.convertStreamData(record.dynamodb['NewImage'])
            const old_timestamp = Lambda.convertStreamData(record.dynamodb['OldImage'])

            if(new_timestamp.type === 'presence') {
              // FIXME: Why I get no total in event payload?
              let new_total = parseFloat(new_timestamp.duration) || 0
              let old_total = parseFloat(old_timestamp.duration) || 0

              balance.total += new_total - old_total
            } else {
              // balance[new_timestamp.reason] += 1
            }
          } else if (record.eventName === 'REMOVE') {
            console.log('REMOVE EVENT')
            const timestamp = Lambda.convertStreamData(record.dynamodb['OldImage'])

            if(timestamp.type === 'presence') {
              // FIXME: Why I get no total in event payload?
              balance.total -= parseFloat(timestamp.total) || 0
            } else {
              balance[timestamp.reason] -= 1
              // balance[new_timestamp.reason] += 1
            }

          } else {
            // Should never happen
            console.log('ERROR: Unknown event')
          }
        })

        const params = Validator.validate(balance, 'update_balance')

        console.log('*********** NEW BALANCE ***********')
        console.log(params)
        console.log('*********** *************** ***********')

        await Balance.update(params)

      } else {
        // Should never happen
        console.log('ERROR: No records')
      }
    } catch(error) {
      console.log('ERROR:', error)
    }
  }
}
