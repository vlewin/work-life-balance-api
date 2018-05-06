var dynamoose = require('dynamoose');

var Schema = dynamoose.Schema;

var recordSchema = new Schema({
  user_id: {
    type: Number,
    validate: function(v) { return v > 0; },
    hashKey: true
  },
  date: {
    name: 'DateLocalIndex',
    type: String,
    required: true,
    rangeKey: true,
    index: true // name: nameLocalIndex, ProjectionType: ALL
  },

  month: {
    type: Number,
    required: true,
    index: {
      global: true,
      rangeKey: 'user_id',
      name: 'MonthGlobalIndex',
      project: true, // ProjectionType: ALL
      throughput: 1 // read and write are both 5
    }
  }
},
{
  throughput: {read: 1, write: 1},
});

var Record = dynamoose.model('Record3', recordSchema);

let r1 = new Record({user_id: '111', month: 3, week: 12, date: '28.03.2018'})
let r2 = new Record({user_id: '111', month: 4, week: 14, date: '09.04.2018'})
let r3 = new Record({user_id: '111', month: 4, week: 14, date: '10.04.2018'})
let r4 = new Record({user_id: '111', month: 4, week: 15, date: '13.04.2018'})
let r5 = new Record({user_id: '111', month: 4, week: 15, date: '14.04.2018'})
let r6 = new Record({user_id: '111', month: 4, week: 15 })

r1.save()
r2.save()
r3.save()
r4.save()
r5.save()
r6.save()

Record.query({ user_id: {eq: '111'}}).where({week: {eq: 15}}).exec(function (err, records) {
  console.log(err)
  console.log(JSON.stringify(records));

  // Look at all the beagles
});
