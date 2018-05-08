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
    validate: (v) => ['absence', 'presence'].includes(v)
  },

  reason: {
    type: String,
    required: false,
    default: null,
    validate: (v) => ['vacation', 'sickeness', 'holiday', null].includes(v)
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
