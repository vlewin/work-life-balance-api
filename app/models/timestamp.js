const getISOWeek = require('date-fns/get_iso_week')
const datetime = require("../helpers/datetime");

module.exports = class Timestamp {
  constructor(data) {
    this.data = this.constructor._format(data)

    for (let field_name in this.data) {
      Object.defineProperty(this, field_name, {
        get: function () {
          console.log('** getter', field_name);
          return this.data[field_name];
        },

        set: function (new_value) {
          console.log('** setter', field_name, new_value);
          this.data[field_name] = new_value;
          this.data['modified'] = (new Date()).getTime();
        }
      })
    }
  }

  // FIXME: Move to helpers?
  // static _timeToNumber(time) {
  //   if (time) {
  //     const split = time.split(":")
  //     return parseFloat(parseInt(split[0], 10) + "." + parseInt(split[1] / 6 * 10, 10))
  //   }
  //   return 0
  // }

  // FIXME: Check if Object.keys(data).includes?(['start', 'pause', 'end'])
  static _calculateDuration(data) {
    console.log('*** duration', data)
    const start = datetime.timeToNumber(data.start)
    const pause = datetime.timeToNumber(data.pause)
    const end = datetime.timeToNumber(data.end)
    return end - (start + pause)
  }

  static _format(data) {
    console.log('*** format', data)
    const date = new Date(data.timestamp)
    const duration = this._calculateDuration(data)
    return {
      ...data,
      ...{
        date: date.toLocaleDateString('DE'),
        month: date.getMonth() + 1, // Index starts with 0
        week: getISOWeek(date),
        duration: duration
      }
    }
  }
}
