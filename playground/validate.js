const Validator = require('../app/validators/record')
const Record = require('../app/models/record')
// 
// try {
//   const params = Validator.validate({ user_id: '111' }, 'index')
//   console.log(params)
// } catch(err) {
//   console.log('ERROR: ', err)
// }


// Record.all({ user_id: '111' }).then((r) => { console.log('all', r) })
//

const params = Validator.validate({ month: '4', user_id: 'github|611466' }, 'index')

Record.all({ month: '4', user_id: 'github|611466' }).then((r) => { console.log('month', r) })
//
// Record.all({ user_id: '111', week: 15 }).then((r) => { console.log('week', r) })

// try {
//   const params = Validator.validate({ date: '10.4.2018',
// week: 15,
// month: 4,
// start: '18:00',
// pause: '00:30',
// finish: '23:55',
// duration: 5.42,
// user_id: 'github|611466' }, 'create')
//
//   Record.create(params).then((r) => { console.log('month', r) })
// } catch(err) {
//   console.log('ERROR: ', err)
// }
