const Validator = require('../app/validators/schema')
const Absence = require('../app/models/absence')

Absence.create({
  "user_id": 'github|611466',
  "timestamp": new Date("2018-01-04T19:05:39.735Z").getTime(),
  "date": new Date("2018-01-04T19:05:39.735Z").toDateString(),
  "type": "absence",
  "reason": "vacation",
  "duration": "8"
})

Absence.findById('github|611466').then((r) => {
  console.log('Absence.findById', r.length)
})

Absence.findByMonth('github|611466', 1).then((r) => {
  console.log('Absence.findByMonth', r.length)
})

Absence.findByWeek('github|611466', 1).then((r) => {
  console.log('Absence.findByWeek', r.length)
})
