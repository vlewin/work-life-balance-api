import Record from '../../app/models/record'
import Balance from '../../app/models/balance'

module.exports = {
  import: () => {
    console.log('******* Seed balance')
    Balance.update({
      "user_id": 'user12345',
      "total": 0.0,
      "vacation": 0,
      "sickness": 0
    })
  }
}
