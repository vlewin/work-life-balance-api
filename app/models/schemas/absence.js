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

  type: {
    type: String,
    required: false,
    default: 'absence',
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
  },

  date: {
    type: String,
    required: true
  },

  duration: {
    type: Number,
    required: false,
    default: 8.5

    // validate: (v) => ['vacation', 'sickeness', 'holiday'].includes(v)
  },
},
{
  throughput: {read: 1, write: 1}
})
