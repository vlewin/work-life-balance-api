// const dynamoose = require('dynamoose');
const Schema = require('dynamoose').Schema

module.exports = new Schema({
  user_id: {
    type: String,
    hashKey: true
  },

  timestamp: {
    type: String,
    required: true,
    rangeKey: true
  },
  
  date: {
    type: String,
    required: true,
    rangeKey: true
  },

  month: {
    type: Number,
    required: true,
    index: {
      global: false,
      hashKey: 'user_id',
      name: 'MonthLocalIndex',
      project: true, // ProjectionType: ALL
      throughput: 1 // read and write are both 5
    }
  },

  week: {
    type: Number,
    required: true,
    index: {
      global: false,
      hashKey: 'user_id',
      name: 'WeekLocalIndex',
      project: true, // ProjectionType: ALL
      throughput: 1 // read and write are both 5
    }
  },

  duration: Number,

  type: {
    type: String,
    required: false,
    default: 'presence',
    validate: (v) => ['absence', 'presence'].includes(v),
    index: {
      global: false,
      hashKey: 'user_id',
      name: 'RecordTypeLocalIndex',
      project: true, // ProjectionType: ALL
      throughput: 1 // read and write are both 5
    }
  },

  reason: {
    type: String,
    required: false,
    validate: (v) => ['vacation', 'sickeness', 'holiday'].includes(v)
  }
},
{
  throughput: {read: 1, write: 1}
})
