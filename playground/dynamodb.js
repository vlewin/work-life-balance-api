var npdynamodb = require('npdynamodb');
var AWS = require('aws-sdk');

var dynamodb = new AWS.DynamoDB({
  apiVersion: '2012-08-10'
});

var npd = npdynamodb.createClient(dynamodb);

// npd().table('records-production').where("user_id", 'auth0|12345678').query("month", ">", 4).then(function(data){
//  console.log(data)
// }).catch(function(err){
//  console.error(err);
// });


// var Record = npdynamodb.define('records-production', {
//   npdynamodb: npd,
//   hashKey: 'user_id',
//   rangeKey: 'week'
// });
//
// console.log(Record.where('user_id', 'auth0|12345678'))

npd().table('records-production')
// npd().table('records-development')
  // .where('date', '10.04.2018')
  // .where('user_id', 'auth0|12345678')
  .where('user_id-month-index', 4)
  .then(function(data){
    console.log(data);
  })
  .catch(function(err){
    console.error(err);
  });
