var Parameters = require('strong-params').Parameters
var params = Parameters({ })

console.log(params.all())

params = Parameters({ foo: 1, age: 32 })

console.log(params.permit('name', 'age').value())
// params.permit('name', 'age').value()
// params.permit('id', 'name', {hobbies: []}).value()
// params.permit('id', 'name', {contacts: []}).value()
// params.permit('id', 'name', {contacts: ['type', 'value']}).value()
// params.require('address').all()


// import { validate, ParameterValidationError } from
const validate = require('parameter-validator').validate;
const ParameterValidationError = require('parameter-validator').ParameterValidationError;

params = { id: 'user1', name: 'Paula PureCloud', age: 22  };

try {
  let { id, name, age } = validate(params, [ 'id', 'name', 'age' ]);
} catch (error) {
  if (error instanceof ParameterValidationError) {
      console.log(error.message);
  }
}
