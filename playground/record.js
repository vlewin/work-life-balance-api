const Validator = require('../app/validators/schema')
const Record = require('../app/models/record')

// Record.create({
//   "user_id": 'github|611466',
//   "timestamp": new Date("2018-01-01T19:05:39.735Z").getTime(),
//   "date": "2018-01-01T19:05:39.735Z",
//   "start": "08:00",
//   "pause": "00:30",
//   "end": "18:00",
//   "duration": "8.5"
// })

// const r = new Record({
//   "user_id": 'github|611466',
//   "timestamp": new Date("2018-01-01T19:05:39.735Z").getTime(),
//   "date": "2018-01-01T19:05:39.735Z",
//   "start": "08:00",
//   "pause": "00:30",
//   "end": "18:00",
//   "duration": "8.5"
// })
//
// console.log(r)

// Record.findById('github|611466').then((r) => {
//   console.log('Record.findById', r.length)
// })
//

// Record.findByMonth('github|611466', 5).then((r) => {
//   console.log('Record.findByMonth', r)
// })

// Record.findByTimestamp('auth0|5b0fd1cb21652a131b051f7a', "1528282570000").then((r) => {
//   console.log('Record.findByDate', r)
// })


const record = new Record({
  "user_id": 'test|611412345678',
  "timestamp": new Date("2018-01-01T19:05:39.735Z").getTime(),
  "date": "2018-01-01T19:05:39.735Z",
  "start": "08:00",
  "pause": "00:30",
  "end": "18:00",
  "duration": "8.5"
})

record.save()

console.log(record)

Record.delete({ user_id: 'test|611412345678', timestamp: 1514833539735 }).then((r) => {
  // console.log('Record.delete', r)
})

Record.findByTimestamp('test|611412345678', 1514833539735).then((r) => {
  console.log('Record.findByTimestamp', r.length)
})
