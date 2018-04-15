const Validator = require('jsonschema').Validator

class ValidationHelper {
  constructor () {
    this.validator = new Validator()

    const schema = {
      id: '/Record',
      type: 'object',
      properties: {
        user_id: { type: 'string' },
        date: { type: 'string' },
        month: { type: 'number' },
        week: { type: 'number' },
        start: { type: 'string' },
        pause: { type: 'string' },
        finish: { type: 'string' },
        duration: { type: 'number' },
        absence: { type: 'string' }
      },
      required: ['user_id', 'date'],
      additionalProperties: false
    }

    this.validator.addSchema(schema, '/Record')
  }

  validate (object, type) {
    let schema = this.validator.schemas[type]

    return new Promise((resolve, reject) => {
      var validation = this.validator.validate(object, schema)
      if (validation.errors.length > 0) {
        console.log(validation)
        reject(validation.errors)
      } else {
        resolve()
      }
    })
  }
}

module.exports = ValidationHelper
