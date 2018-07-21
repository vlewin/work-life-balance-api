const Validator = require('../app/validators/schema')
const Record = require('../app/models/Record')

const presence = [
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
  }
]

for (let timestamp of presence) {
  let params = Validator.validate(timestamp, 'create_record')
  let record = new Record(params)
  record.save()
}
