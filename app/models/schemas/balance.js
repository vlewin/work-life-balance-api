const Schema = require('dynamoose').Schema

module.exports = new Schema({
  user_id: {
    type: String,
    hashKey: true
  },

  total: {
    type: Number,
    required: false,
    default: 0.0
  },

  vacation: {
    type: Number,
    required: false,
    default: 0.0
  },

  sickness: {
    type: Number,
    required: false,
    default: 0.0
  }
},
{
  throughput: {read: 1, write: 1}
})
