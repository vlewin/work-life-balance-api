// const dynamoose = require('dynamoose');
const Schema = require('dynamoose').Schema;

module.exports = new Schema({
  user_id: {
    type: String,
    hashKey: true
  },

  date: {
    type: String,
    required: true,
    rangeKey: true,
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

  start: String,
  pause: String,
  finish: String,
  duration: Number,
  absence: String
},
{
  throughput: {read: 1, write: 1},
});
