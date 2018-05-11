const Absence = require('../models/absence')
const Validator = require('../validators/schema')
const Lambda = require('../helpers/lambda')


module.exports = {
  index: async function (event, context, callback) {
    try {
      const params = Lambda.params(event)
      const response = await Absence.all(Validator.validate(params, 'index_absence'))
      callback(null, { statusCode: 200, body: JSON.stringify(response), headers: Lambda.headers })

    } catch (error) {
      console.log('ERROR:', error)
      callback(null, { statusCode: 422, body: JSON.stringify({ message: error.message }), headers: Lambda.headers })
    }
  },

  create: async function (event, context, callback) {
    try {
      // FIXME: Extend JSONSchema and accept array of objects
      // const response = await Absence.create(Validator.validate(params, 'create_absence'))
      // console.log(params)
      const params = Lambda.params(event)
      const body = JSON.parse(event.body).map((r) => Object.assign(r, { user_id: params.user_id }))
      console.log(body)
      const response = await Absence.create(body)
      callback(null, { statusCode: 200, body: JSON.stringify({}), headers: Lambda.headers })
    } catch (error) {
      console.log('ERROR:', error)
      callback(null, { statusCode: 422, body: error.message, headers: Lambda.headers })
    }
  }
}
