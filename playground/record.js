const Record = require('../app/models/record')

const record = new Record()
// record.save({ name: 'Fooo', description: 'Bar' })

async function all () {
  const response = await Record.all(2)
  console.log(response)
}

async function get () {
  const response = await Record.find('2')
  console.log(response)
}

async function save () {
  const record = await new Record({ name: 'Item', description: 'description' }).save()
  console.log(record)
}

save()
// get()
