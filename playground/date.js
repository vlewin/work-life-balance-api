
const setISOWeek = require('date-fns/set_iso_week')
const setHours = require('date-fns/set_hours')
const startOfWeek = require('date-fns/start_of_week')
const endOfWeek = require('date-fns/end_of_week')

module.exports = function getStartEndByISOWeek(week) {
  var date = setISOWeek(new Date(), week)
  date = setHours(date, 0)

  var start = startOfWeek(date, {weekStartsOn: 1})
  console.log('Start:', start.toLocaleString('DE'))

  var end = endOfWeek(date, {weekStartsOn: 1 })
  console.log('End:', end.toLocaleString('DE'))
  return [start.getTime(), end.getTime()]
}
