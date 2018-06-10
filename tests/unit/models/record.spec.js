import Record from '../../../app/models/record'

describe('Records model', () => {
  // describe('#all', () => {
  //   it('Finds all records by user_id', async () => {
  //     const records = await Record.all({ user_id: 'github|611466' })
  //     console.log(records)
  //     expect(records).toHaveLength(3)
  //   })
  // })
  //
  // describe('#create', () => {
  //   it('Creates new record', async () => {
  //     const record = await Record.create({
  //       user_id: 'test|12345',
  //       date: '01.01.2018',
  //       month: 1,
  //       week: 1,
  //       start: '08:00',
  //       pause: '00:30',
  //       finish: '17:00'
  //     })
  //
  //     expect(record).toEqual({'date': '01.01.2018', 'finish': '17:00', 'month': 1, 'pause': '00:30', 'start': '08:00', 'user_id': 'test|12345', 'week': 1})
  //   })
  // })

  describe('#delete', () => {
    it('Deletes a single record', async () => {
      const payload = { user_id: 'test|12345', timestamp: 1528282570000 }
      const record = await Record.create(payload)

      await Record.delete(payload)

      const result = await Record.findByTimestamp(payload.user_id, payload.timestamp)
      expect(result.count).toEqual(0)
    })

    it('Deletes a batch of record', async () => {
      const user_id = 'test|12345'
      const payload = [{ user_id: user_id, timestamp: 1528282570000 }, { user_id: user_id, timestamp: 1528282570001 }]

      await Record.create(payload)
      let result = await Record.all({ user_id: user_id })
      expect(result.count).toEqual(2)

      await Record.delete(payload)
      result = await Record.all({ user_id: user_id })
      expect(result.count).toEqual(0)
    })
  })


})
