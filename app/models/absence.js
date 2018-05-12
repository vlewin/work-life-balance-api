
const Base = require('./base')

module.exports = class Absence extends Base {
  // constructor(data) {
  //   console.log('**** ABSENCE CONSTRUCTOR')
  //   super(data)
  // }

  static get type () {
    return 'absence'
  }
}
