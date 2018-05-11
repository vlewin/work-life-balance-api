const Validator = require('../app/validators/schema')
const Record = require('../app/models/record')

Record.create({
  "user_id": 'github|611466',
  "timestamp": new Date("2018-01-01T19:05:39.735Z").getTime(),
  "date": "2018-01-01T19:05:39.735Z",
  "start": "08:00",
  "pause": "00:30",
  "end": "18:00",
  "duration": "8.5"
})

Record.findById('github|611466').then((r) => {
  console.log('Record.findById', r.length)
})

Record.findByMonth('github|611466', 1).then((r) => {
  console.log('Record.findByMonth', r.length)
})

Record.findByWeek('github|611466', 1).then((r) => {
  console.log('Record.findByWeek', r.length)
})
