const Schema = require('dynamoose').Schema

module.exports = new Schema({
  user_id: {
    type: String,
    hashKey: true
  },

  timestamp: {
    type: Number,
    required: false,
    rangeKey: true
  },

  type: {
    type: String,
    required: false,
    default: 'presence',
    validate: (v) => ['absence', 'presence'].includes(v),
    index: {
      global: false,
      hashKey: 'user_id',
      name: 'TypeLSI',
      project: true, // ProjectionType: ALL
      throughput: 1 // read and write are both 5
    }
  },

  reason: {
    type: String,
    required: false,
    default: null,
    validate: (v) => ['vacation', 'sickness', 'holiday', null].includes(v),
    index: {
      global: false,
      hashKey: 'user_id',
      name: 'ReasonLSI',
      project: true, // ProjectionType: ALL
      throughput: 1 // read and write are both 5
    }
  },

  date: {
    type: String,
    required: true,
    rangeKey: true
  },

  start: String,
  pause: String,
  end: String,
  duration: Number,
  total: Number
},
{
  throughput: {read: 1, write: 1}
})
