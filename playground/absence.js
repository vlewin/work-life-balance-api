const Absence = require('../app/models/absence')

async function create (params) {
  const response = await Absence.create(params)
  console.log(response)
}

async function all () {
  const response = await Absence.all({ user_id: 'github|611466' })
  console.log(response)
}

// create([
//   { user_id: 'github|611466', date: '1.05.2018', month: 5, week: 18, type: 'absence', reason: 'holiday' },
//   { user_id: 'github|611466', date: '2.05.2018', month: 5, week: 18, type: 'absence', reason: 'vacation' }
// ])

all()
