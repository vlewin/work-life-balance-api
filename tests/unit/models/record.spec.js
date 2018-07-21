import Record from '../../../app/models/record'

describe('Records model', () => {
  describe('#delete', () => {
    it('Deletes a single record', async () => {
      const payload = { user_id: 'test|12345', timestamp: 1528282570000 }
      await Record.create(payload)

      await Record.delete(payload)

      const result = await Record.findByTimestamp(payload.user_id, payload.timestamp)
      expect(result.count).toEqual(0)
    })

    it('Deletes a batch of record', async () => {
      const userId = 'test|12345'
      const payload = [{ user_id: userId, timestamp: 1528282570000 }, { user_id: userId, timestamp: 1528282570001 }]

      await Record.create(payload)
      let result = await Record.all({ user_id: userId })
      expect(result.count).toEqual(2)

      await Record.delete(payload)
      result = await Record.all({ user_id: userId })
      expect(result.count).toEqual(0)
    })
  })
})
