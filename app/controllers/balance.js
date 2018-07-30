const Balance = require('../models/balance')
const Validator = require('../validators/schema')
const Lambda = require('../helpers/lambda')
const querystring = require('querystring')
const graphQlClient = require('../models/graphql-client')

function insertBalance (balance, newTimestamp) {
  console.log(newTimestamp)
  if (newTimestamp.type === 'presence') {
    balance.total += parseFloat(newTimestamp.total)
  } else {
    balance[newTimestamp.reason] += 1
  }

  return balance
}

function updateBalance (balance, newTimestamp, oldTimestamp) {
  if (newTimestamp.type === 'presence') {
    console.log('-+ Presence')

    let newTotal = parseFloat(newTimestamp.duration) || 0
    let oldTotal = parseFloat(oldTimestamp.duration) || 0

    balance.total += (newTotal - oldTotal)
  } else {
    console.log('-+ Absence')

    if (balance[oldTimestamp.reason] > 0) {
      balance[oldTimestamp.reason] -= 1
    }

    balance[newTimestamp.reason] += 1
  }

  return balance
}

function removeBalance (balance, oldTimestamp) {
  if (oldTimestamp.type === 'presence') {
    console.log('-- Presence')
    balance.total -= parseFloat(oldTimestamp.total) || 0
  } else {
    console.log('-- Absence')

    if (balance[oldTimestamp.reason] > 0) {
      balance[oldTimestamp.reason] -= 1
    }
  }

  return balance
}

module.exports = {
  show: async (event, context, callback) => {
    console.log('*** Incoming event ***')
    console.log(event)
    console.log('*** ************** ***')

    try {
      console.log(process.env.TZ)

      const params = Lambda.params(event)
      console.info('**** Get balance for UserID', params.user_id, params)

      const response = await Balance.findById(params.user_id)
      console.info('**** BALANCE:GET RESPONSE', JSON.stringify(response))

      callback(null, { statusCode: 200, body: JSON.stringify(response), headers: Lambda.headers })
    } catch (error) {
      console.error('**** BALANCE:GET ERROR', JSON.stringify(error))
      callback(null, { statusCode: 422, body: error.message, headers: Lambda.headers })
    }
  },

  update: async (event, context, callback) => {
    try {
      if (event && event.Records) {
        const userId = Lambda.convertStreamData(event.Records[0].dynamodb['Keys']).user_id
        const balance = await Balance.findById(userId) || {}

        console.log('Balance:', balance)
        console.log(JSON.stringify(event.Records))

        event.Records.forEach((record) => {
          if (record.eventName === 'INSERT') {
            console.log('*** INSERT EVENT')
            const newTimestamp = Lambda.convertStreamData(record.dynamodb['NewImage'])
            insertBalance(balance, newTimestamp)
          } else if (record.eventName === 'MODIFY') {
            console.log('*** MODIFY EVENT')
            const newTimestamp = Lambda.convertStreamData(record.dynamodb['NewImage'])
            const oldTimestamp = Lambda.convertStreamData(record.dynamodb['OldImage'])
            updateBalance(balance, newTimestamp, oldTimestamp)
          } else if (record.eventName === 'REMOVE') {
            console.log('*** REMOVE EVENT')
            const oldTimestamp = Lambda.convertStreamData(record.dynamodb['OldImage'])
            removeBalance(balance, oldTimestamp)
          } else {
            // Should never happen
            console.log('ERROR: Unknown event')
          }
        })

        const params = Validator.validate(balance, 'update_balance')
        await Balance.update(params)

        console.log('*** GraphQl mutation')
        // FIXME: Use webpack loader
        // https://www.npmjs.com/package/webpack-graphql-loader
        const query = `
          mutation UpdateBalance($user_id: String!, $vacation: Int, $sickness: Int, $total: Float) {
            updateBalance(
              input: {
                user_id: $user_id, 
                vacation: $vacation, 
                sickness: $sickness, 
                total: $total
              }) {
              user_id
              vacation
              sickness
              total
            }
          }`

        const response = await graphQlClient.query(query, params).catch(function (err) {
          console.log(err.message)
        })

        console.log(response)
      } else {
        // Should never happen
        console.log('ERROR: No records')
      }
    } catch (error) {
      console.log('ERROR:', error)
    }
  }
}
