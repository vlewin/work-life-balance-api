const Validator = require('jsonschema').Validator

class ValidationHelper {
  constructor () {
    this.validator = new Validator()

    const schema = {
      'id': '/Record',
      'type': 'object',
      'properties': {
        'id': {'type': 'string'},
        'name': {'type': 'string'},
        'description': {'type': 'string'}
      },
      'required': ['name'],
      'additionalProperties': false
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
