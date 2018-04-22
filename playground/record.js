const Record = require('../app/models/record')

async function all (params) {
  const response = await Record.all(params)
  console.log(response)
}

console.log(all({ user_id: 'github|611466' }))
