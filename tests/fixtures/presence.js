var eachDay = require('date-fns/each_day')
var startOfMonth = require('date-fns/start_of_month')
var endOfMonth = require('date-fns/end_of_month')
// var addMonths = require('date-fns/add_months')
var isWeekend = require('date-fns/is_weekend')
// Prev month
var subMonths = require('date-fns/sub_months')
let start = subMonths(new Date(), 1)
let end = endOfMonth(new Date())

const Record = require('../../app/models/Record')


// async function save(data) {
//   await setTimeout(() => {
//     new Record(data).save()
//   }, 1000)
// }

const payload = []
for(const [index, date] of eachDay(start, end).entries()) {
  if(isWeekend(date)) {
    console.log(date, 'is weekend')
  } else {
    let data = {
      "user_id": 'github|611466',
      "timestamp": date.getTime(),
      "date": date.toDateString(),
      "start": "08:30",
      "pause": "00:30",
      "end": "17:00",
      "duration": index%2 ? Math.floor(Math.random() * (9 - 6.5 + 1) + 6.5) : 8,
      "type": "presence"
    }

    console.log(data)
    payload.push(data)
    // FIXME: BacthPut

  }

}

Record.create(payload)
