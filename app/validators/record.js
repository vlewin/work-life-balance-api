const JSONSchemaValidator = require('jsonschema').Validator

class Validator {
  static validate (object, action) {
    console.log('**** Validate', object, action)
    const json_schema = require(`./schemas/${action}_record`)
    const results = new JSONSchemaValidator().validate(object, json_schema)

    console.log('**** Validator result', JSON.stringify(results))
    console.log(results.errors.length)
    if(results.errors.length) {
      console.log(results.errors)
      throw new Error(results.errors)
    }

    return results.instance
  }

  constructor (action) {
    this.validator = new JSONSchemaValidator()
  }

  // constructor (action) {
  //   this.validator = new JSONSchemaValidator()
  //
  //
  //
  //   this.validator.addSchema(schema, '/Record')
  // }
  //
  // validate (object, type) {
  //   let schema = this.validator.schemas[type]
  //
  //   return new Promise((resolve, reject) => {
  //     var validation = this.validator.validate(object, schema)
  //     if (validation.errors.length > 0) {
  //       console.log(validation)
  //       reject(validation.errors)
  //     } else {
  //       resolve()
  //     }
  //   })
  // }
}

module.exports = Validator
