const Validator = require('../app/validators/schema')
const Record = require('../app/models/Record')

const absence = [
  {
    "user_id": 'github|611466',
    "timestamp": new Date("2018-01-04T19:05:39.735Z").getTime(),
    "date": new Date("2018-01-04T19:05:39.735Z").toDateString(),
    "type": "absence",
    "reason": "vacation",
    "duration": "8"
  },
  {
    "user_id": 'github|611466',
    "timestamp": new Date("2018-01-05T19:05:39.735Z").getTime(),
    "date": new Date("2018-01-05T19:05:39.735Z").toDateString(),
    "type": "absence",
    "reason": "vacation",
    "duration": "8"
  },

  {
    "user_id": 'github|611466',
    "timestamp": new Date("2018-01-06T19:05:39.735Z").getTime(),
    "date": new Date("2018-01-06T19:05:39.735Z").toDateString(),
    "type": "absence",
    "reason": "sickness",
    "duration": "8"
  },

  {
    "user_id": 'github|611466',
    "timestamp": new Date("2018-01-07T19:05:39.735Z").getTime(),
    "date": new Date("2018-01-07T19:05:39.735Z").toDateString(),
    "type": "absence",
    "reason": "sickness",
    "duration": "8"
  },

  {
    "user_id": 'github|611466',
    "timestamp": new Date("2018-01-08T19:05:39.735Z").getTime(),
    "date": new Date("2018-01-08T19:05:39.735Z").toDateString(),
    "type": "absence",
    "reason": "sickness",
    "duration": "8"
  },

  {
    "user_id": 'github|611466',
    "timestamp": new Date("2018-02-08T19:05:39.735Z").getTime(),
    "date": new Date("2018-02-08T19:05:39.735Z").toDateString(),
    "type": "absence",
    "reason": "sickness",
    "duration": "8"
  }

]

// Record.create(absence)

// for(timestamp of absence) {
//   let params = Validator.validate(timestamp, 'create_absence')
//   let record = Record.create(params)
//   record.save()
// }


const date = {
  "user_id": 'github|611466',
  "timestamp": new Date("2018-02-08T19:05:39.735Z").getTime(),
  "date": new Date("2018-02-08T19:05:39.735Z").toDateString(),
  "type": "absence",
  "reason": "sickness",
  "duration": "8"
}

let params = Validator.validate(date, 'create_absence')
let record = new Record(params)
record.save()
