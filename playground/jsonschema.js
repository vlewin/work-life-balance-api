
const Validator = require('../app/validators/schema')
const Record = require('../app/models/Record')

const timestamps = [
  {
    'user_id': 'github|611466',
    'timestamp': new Date('2018-01-01T19:05:39.735Z').getTime(),
    'date': '2018-01-01T19:05:39.735Z',
    'start': '08:00',
    'pause': '00:30',
    'end': '18:00',
    'duration': '8.5'
  },

  {
    'user_id': 'github|611466',
    'timestamp': new Date('2018-01-02T19:05:39.735Z').getTime(),
    'date': '2018-01-02T19:05:39.735Z',
    'start': '08:00',
    'pause': '00:30',
    'end': '18:00',
    'duration': '8.5'
  },

  {
    'user_id': 'github|611466',
    'timestamp': new Date('2018-01-03T19:05:39.735Z').getTime(),
    'date': '2018-01-03T19:05:39.735Z',
    'start': '08:00',
    'pause': '00:30',
    'end': '18:00',
    'duration': '8.5'
  },

  {
    'user_id': 'github|611466',
    'timestamp': new Date('2018-02-03T19:05:39.735Z').getTime(),
    'date': '2018-02-03T19:05:39.735Z',
    'start': '08:00',
    'pause': '00:30',
    'end': '18:00',
    'duration': '8.5'
  },

  {
    'user_id': 'github|611466',
    'timestamp': new Date('2018-02-03T19:05:39.735Z').getTime(),
    'date': '2018-02-03T19:05:39.735Z',
    'start': '08:00',
    'pause': '00:30',
    'end': '18:00',
    'duration': '8.5'
  },

  {
    'user_id': 'github|611466',
    'timestamp': new Date('2018-01-04T19:05:39.735Z').getTime(),
    'date': '2018-01-04T19:05:39.735Z',
    'type': 'absence',
    'reason': 'vacation',
    'duration': '8'
  },
  {
    'user_id': 'github|611466',
    'timestamp': new Date('2018-01-05T19:05:39.735Z').getTime(),
    'date': '2018-01-05T19:05:39.735Z',
    'type': 'absence',
    'reason': 'vacation',
    'duration': '8'
  }

]

for (let timestamp of timestamps) {
  let params = Validator.validate(timestamp, 'create_record')
  // console.log(params)
  let record = new Record(params)
  record.save()
}

const weekRangeByISOWeek = require('./date')
const range = weekRangeByISOWeek(1)
console.log(range)

// Record.connection
//   .query({ user_id: { eq: 'github|611466' } })
//   .where({ type: { eq: 'presence' }})
//   // .between(range[0], range[1])
//   .filter('timestamp').between(range[0], range[1])
//   // .filter({ timestamp: { between: range }})
//   .exec((err, result) => {
//     console.log('exec callback');
//     if (err) {
//       console.log('errored');
//       console.log(err);
//       return;
//     }
//     console.log('success');
//     console.log(result);
//   });

Record.findByWeek('github|611466', 1).then((r) => {
  console.log(r)
})

// const Timestamp = require('../app/models/timestamp')
// const timestamp = new Timestamp(params)
// console.log("Timetrack")
// console.log(timestamp.formated)
//
//
// class Record extends Timestamp {
//   constructor(data) {
//     super(data);
//   }
//
//   save() {
//     console.log('save to dynamoDb')
//   }
// }
//
// const record = new Record(params)
// console.log("Record", record.formated)
// record.save()
