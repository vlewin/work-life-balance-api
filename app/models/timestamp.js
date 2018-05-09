const getISOWeek = require('date-fns/get_iso_week')
const datetime = require('../helpers/datetime')

module.exports = class Timestamp {
  constructor (data) {
    this.data = this.constructor._format(data)

    for (let field in this.data) {
      Object.defineProperty(this, field, {
        get: function () {
          console.log('** getter', field)
          return this.data[field]
        },

        set: function (value) {
          console.log('** setter', field, value)
          this.data[field] = value
          this.data['modified'] = (new Date()).getTime()
        }
      })
    }
  }

  // FIXME: Check if Object.keys(data).includes?(['start', 'pause', 'end'])
  static _calculateDuration (data) {
    console.log('*** duration', data)
    const start = datetime.timeToNumber(data.start)
    const pause = datetime.timeToNumber(data.pause)
    const end = datetime.timeToNumber(data.end)
    return end - (start + pause)
  }

  static _format (data) {
    console.log('*** format', data)
    const date = new Date(data.timestamp)
    const duration = this._calculateDuration(data)
    return {
      ...data,
      ...{
        date: date.toDateString(),
        month: date.getMonth() + 1, // Index starts with 0
        week: getISOWeek(date),
        duration: duration
      }
    }
  }
}
