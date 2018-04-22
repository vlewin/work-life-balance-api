// const SchemaValidator = require('jsonschema').Validator
const SchemaValidator = require('jjv')()
const SchemaValidatorErrors = require('jjve')

module.exports = class Validator {
  static validate (object, action) {
    const schema = require(`./schemas/${action}`)
    SchemaValidator.addTypeCoercion('integer', (x) => parseInt(x, 10))
    SchemaValidator.addSchema(action, schema)

    const results = SchemaValidator.validate(action, object, { useCoerce: true, removeAdditional: true })

    if (results) {
      const mapper = SchemaValidatorErrors(SchemaValidator)
      const errors = mapper(schema, object, results)
      console.log('Validation errors', errors)

      throw new Error(errors.map((err) => err.message).join(', '))
    } else {
      return object
    }
  }
}
