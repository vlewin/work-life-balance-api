import balanceController from '../../../app/controllers/balance'

import Balance from '../../../app/models/balance'
import Streams from '../../fixtures/streams'

jest.mock('../../../app/models/balance')

describe('Records controller', () => {
  const event = {}
  const context = {}

  describe('#update', () => {
    describe('Presence type', () => {
      describe('Insert event', () => {
        it('Updates total balance and return 200 status code', async () => {
          const callback = jest.fn((_, response) => {
            expect(response.statusCode).toBe(200)
          })

          await balanceController.update(Streams.insertPresence, context, callback)

          expect(Balance.update).toHaveBeenLastCalledWith({})
        })
      })
    })
  })

  // describe('#create', () => {
  //   describe('Valid parameters', () => {
  //     it.only('Creates record and returns 200 status code', async () => {
  //       event.body = { user_id: 'auth0|12345', date: '01.01.2018', month: '1', week: '1' }
  //
  //       const callback = jest.fn((_, response) => {
  //         expect(response.statusCode).toBe(200)
  //       })
  //
  //       await recordsController.create(event, context, callback)
  //     })
  //   })
  // })
})
