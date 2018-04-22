import Record from '../../../app/models/record'

describe('Records model', () => {
  describe('#all', () => {
    it('Finds all records by user_id', async () => {
      const records = await Record.all({ user_id: 'github|611466' })
      console.log(records)
      expect(records).toHaveLength(3)
    })
  })

  describe('#create', () => {
    it('Creates new record', async () => {
      const record = await Record.create({
        user_id: 'test|12345',
        date: '01.01.2018',
        month: 1,
        week: 1,
        start: '08:00',
        pause: '00:30',
        finish: '17:00'
      })

      expect(record).toEqual({'date': '01.01.2018', 'finish': '17:00', 'month': 1, 'pause': '00:30', 'start': '08:00', 'user_id': 'test|12345', 'week': 1})
    })
  })
})
