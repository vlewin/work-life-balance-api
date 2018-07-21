const SchemaValidator = require('ajv')
const SchemaValidatorInstance = new SchemaValidator({
  verbose: true,
  coerceTypes: true,
  useDefaults: true,
  removeAdditional: 'all'
})

module.exports = class Validator {
  static validate (object, action) {
    const schema = require(`./schemas/${action}`)
    const validate = SchemaValidatorInstance.compile(schema)

    if (validate(object)) {
      return object
    } else {
      throw new Error(SchemaValidatorInstance.errorsText(validate.errors))
    }
  }
}
