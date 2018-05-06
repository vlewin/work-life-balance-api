const SchemaValidator = require('ajv')
const SchemaValidatorInstance = new SchemaValidator({
  verbose: true,
  coerceTypes: true,
  useDefaults: true,
  removeAdditional: "all"
});



module.exports = class Validator {
  static validate (object, action) {
    const schema = require(`./schemas/${action}`)
    const validate = SchemaValidatorInstance.compile(schema)

    if (validate(object)) {
      console.log('Valid', object)
      return object
    } else {
      console.log('Invalid');
      console.log(validate.errors)
      throw new Error(SchemaValidatorInstance.errorsText(validate.errors))
    }

    // SchemaValidator.addTypeCoercion('integer', (x) => parseInt(x, 10))
    // SchemaValidator.addSchema(action, schema)
    //
    // console.log('validate object', JSON.stringify(object), 'with schema', action, ':', JSON.stringify(schema))
    // const results = SchemaValidator.validate(action, object, { useCoerce: true, removeAdditional: true })
    //
    // console.log(results)
    // if (results) {
    //   const mapper = SchemaValidatorErrors(SchemaValidator)
    //   const errors = mapper(schema, object, results)
    //   console.log('Validation errors', errors)
    //
    //   throw new Error(errors.map((err) => err.message).join(', '))
    // } else {
    //   console.log('*** Object is valid', JSON.stringify(object))
    //
    //   return object
    // }
  }
}



// Start validator
