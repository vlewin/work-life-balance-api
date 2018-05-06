const setISOWeek = require('date-fns/set_iso_week')
const setHours = require('date-fns/set_hours')
const startOfWeek = require('date-fns/start_of_week')
const endOfWeek = require('date-fns/end_of_week')

module.exports = {
  getStartEndByISOWeek: (week) => {
    var date = setISOWeek(new Date(), week)
    date = setHours(date, 0)

    var start = startOfWeek(date, {weekStartsOn: 1})
    console.log('Start:', start.toLocaleString('DE'))

    var end = endOfWeek(date, {weekStartsOn: 1 })
    console.log('End:', end.toLocaleString('DE'))
    return [start.getTime(), end.getTime()]
  },

  timeToNumber: (time) => {
    if (time) {
      const split = time.split(":")
      return parseFloat(parseInt(split[0], 10) + "." + parseInt(split[1] / 6 * 10, 10))
    }
    return 0
  }
};
