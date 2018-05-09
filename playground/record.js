const Validator = require('../app/validators/schema')
const Record = require('../app/models/Record')

// Record.findByWeek('github|611466', 1).then((r) => {
//   console.log(r)
// })


Record.connection.query({
  user_id: { eq: 'github|611466' }
}).where('type').eq('absence').filter('reason').eq('sickness').exec((d, r) => {
  console.log(d, r)
})
