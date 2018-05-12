// const Timestamp = require('./timestamp')
const datetime = require('../helpers/datetime')
const Base = require('./base')

module.exports = class Record extends Base {
  constructor (data) {
    console.log('**** RECORD CONSTRUCTOR')

    super(data)

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

  static _calculateDuration (data) {
    console.log('*** duration', data)
    if(data.duration) {
      return data.duration
    }

    const start = datetime.timeToNumber(data.start)
    const pause = datetime.timeToNumber(data.pause)
    const end = datetime.timeToNumber(data.end)
    return end - (start + pause)
  }

  static _format (data) {
    console.log('*** format', data)
    const date = new Date(data.timestamp)
    // console.log('*** Date from timestamp', date)
    const duration = this._calculateDuration(data)
    return {
      ...data,
      ...{
        // date: date.toDateString(),
        duration: duration,
        total: duration - 8
      }
    }
  }

  static get type () {
    return 'presence'
  }
}
