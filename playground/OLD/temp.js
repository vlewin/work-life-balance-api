const Record = require('../app/models/record')


// records = Record.all('111')

// Record.all({ user_id: '111'}).then((results) => {
//   console.log('WEEK SEARCH DONE', results.length)
// })




// Record.find_by_month('111', 4).then(() => {
//   console.log('WEEK SEARCH DONE', results.length)
// })


async function all(params) {
  console.log('await Record.find_by_week')

  const response = await Record.find_by_week('111', 15)

  console.log('reutrn response')

  return JSON.stringify(response)
}

const ss = all({ user_id: '111', week: 15})

console.log('sss', ss)
