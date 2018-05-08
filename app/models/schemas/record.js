const Schema = require('dynamoose').Schema

module.exports = new Schema({
  user_id: {
    type: String,
    hashKey: true
  },

  timestamp: {
    type: Number,
    required: true,
    rangeKey: true,
    index: {
      global: false,
      hashKey: 'user_id',
      name: 'TimestampLocalIndex',
      project: true, // ProjectionType: ALL
      throughput: 1 // read and write are both 5
    }
  },

  type: {
    type: String,
    required: false,
    default: 'presence',
    validate: (v) => ['absence', 'presence'].includes(v),
    index: {
      global: false,
      hashKey: 'user_id',
      name: 'UserIdTypeLocalIndex',
      project: true, // ProjectionType: ALL
      throughput: 1 // read and write are both 5
    }
  },

  reason: {
    type: String,
    required: false,
    default: null,
    validate: (v) => ['vacation', 'sickeness', 'holiday', null].includes(v),
    index: {
      global: false,
      hashKey: 'user_id',
      name: 'UserIdReasonLocalIndex',
      project: true, // ProjectionType: ALL
      throughput: 1 // read and write are both 5
    }
  },

  date: {
    type: String,
    required: true
  },

  start: String,
  pause: String,
  end: String,
  duration: Number
},
{
  throughput: {read: 1, write: 1}
})
