const Record = require('../app/models/time')

const record = new Record()
// record.save({ name: 'Fooo', description: 'Bar' })
console.log(record)

async function all(params) {
  const response = await Record.all(params)
  console.log(response)
}

async function get () {
  const response = await Record.find(8)
  console.log(response)
}

async function save () {
  const record = await new Record({
    date: '21.02.2018',
    week: 8,
    start: '08:00',
    pause: '00:30',
    finish: '16:30',
    duration: 8
  }).save()
}

async function saveAll () {
  const records = [
    { date: '22.3.2018', week: 12, absence: 'sickness' },
    { date: '15.3.2018', week: 11, absence: 'sickness' },
    { date: '8.3.2018', week: 10, absence: 'sickness' }
  ]
  const response = await Record.save(records)

  console.log(response)
}
// saveAll()

console.log(all({}))
