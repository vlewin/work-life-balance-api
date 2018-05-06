var dynamoose = require('dynamoose');

var Schema = dynamoose.Schema;

var recordSchema = new Schema({
  user_id: {
    type: Number,
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
  }
},
{
  throughput: {read: 1, write: 1},
});


var Record = dynamoose.model('RecordDevelopment', recordSchema, { update: true });

let r1 = new Record({user_id: '111', month: 3, week: 12, date: '28.03.2018'})
let r2 = new Record({user_id: '111', month: 4, week: 14, date: '09.04.2018'})
let r3 = new Record({user_id: '111', month: 4, week: 14, date: '10.04.2018'})
let r4 = new Record({user_id: '111', month: 4, week: 15, date: '13.04.2018'})
let r5 = new Record({user_id: '111', month: 4, week: 15, date: '14.04.2018'})
let r6 = new Record({user_id: '111', month: 4, week: 15, date: '15.04.2018' })

r1.save()
r2.save()
r3.save()
r4.save()
r5.save()
r6.save()

Record.query({ user_id: {eq: '111'}}).where({ month: {eq: 3 }}).exec(function (err, records) {
  console.log(err)
  console.log(JSON.stringify(records));
  // Look at all the beagles
});

Record.query({ user_id: {eq: '222'}}).exec(function (err, records) {
  console.log(err)
  console.log(JSON.stringify(records));
  // Look at all the beagles
});
