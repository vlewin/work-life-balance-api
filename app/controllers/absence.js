require('babel-polyfill')
const Record = require('../models/record')

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
  'Access-Control-Allow-Credentials': true,
  'Content-Type': 'application/json'
}

// const headers = {
//   "Access-Control-Allow-Origin" : "*"
// }

module.exports = {
  index: async function (event, context, callback) {
    const params = event.queryStringParameters || {}
    const response = await Record.all(params.week)
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(response),
      headers
    })
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
      const body = JSON.parse(event.body)
      let response = {}
      if (body.records) {
        response = await new Record(body).save()
      } else {
        response = await new Record(body).save()
      }
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

  // create: async function (event, context, callback) {
  //   // callback(null, {
  //   //   statusCode: 200,
  //   //   body: JSON.stringify(event),
  //   //   headers
  //   // })
  //
  //   try {
  //     const response = await new Record(JSON.parse(event.body)).save()
  //     callback(null, {
  //       statusCode: 200,
  //       body: JSON.stringify(response),
  //       headers
  //     })
  //   } catch (error) {
  //     console.error('Error', error)
  //     callback(null, {
  //       statusCode: 422,
  //       body: error.message,
  //       headers
  //     })
  //     return error
  //   }
  // },

  update: async function (event, context, callback) {
    // const result = await Record.save({ name: 'Huhu', description: 'haha' })
    callback(null, { statusCode: 200, body: 'result', headers })
  },

  destroy: async function (event, context, callback) {
    // const result = await Record.save({ name: 'Huhu', description: 'haha' })
    callback(null, { statusCode: 200, body: 'result', headers })
  }
}
