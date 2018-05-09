const Validator = require('../app/validators/schema')
const Balance = require('../app/models/Balance')

const balance = {
  "user_id": 'github|611466',
  "total": 0.0,
  "vacation": 3,
  "sickness": 3
}


// const params = Validator.validate(balance, 'update_balance')
// console.log(params)
//
// let response = Balance.update(params)

Balance.findById('github|611466')
