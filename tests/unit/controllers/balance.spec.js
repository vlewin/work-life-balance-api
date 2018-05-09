import balanceController from '../../../app/controllers/balance'

import Balance from '../../../app/models/balance'
import Streams from '../../fixtures/streams'

jest.mock('../../../app/models/balance')

describe('Records controller', () => {
  const context = {}
  const callback = () => {}

  describe('#update', () => {
    describe('Presence', () => {
      it.only('Updates total balance and return 200 status code', async () => {
        Balance.findById.mockReturnValue({ total: 0 })

        const event = Streams.insertPresence
        await balanceController.update(event, context, callback)

        expect(Balance.findById).toHaveBeenLastCalledWith(event.Records[0].dynamodb['NewImage'].user_id['S'])
        expect(Balance.update).toHaveBeenLastCalledWith({ total: 0.5 })
      })
    })
  })
})
