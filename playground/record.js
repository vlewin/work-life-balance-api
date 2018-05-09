const Validator = require('../app/validators/schema')
const Record = require('../app/models/Record')

Record.findByWeek('github|611466', 18).then((r) => {
  console.log(r)
})
