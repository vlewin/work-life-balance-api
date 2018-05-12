import balanceController from '../../../app/controllers/balance'

import Balance from '../../../app/models/balance'
import Streams from '../../fixtures/streams'

jest.mock('../../../app/models/balance')

describe('Records controller', () => {
  const user_id = 'user12345'
  beforeEach(async () => {
    Balance.findById.mockReturnValue(Object.assign({}, { user_id: user_id, total: 0, sickness: 0, vacation: 0 }))
  })

  describe('#update', () => {
    describe('Absence', () => {
      describe('INSERT event', () => {
        it('Updates vacation count', async () => {
          await balanceController.update(Streams.inserAbsenceVacationEvent, {}, () => {})

          expect(Balance.findById).toHaveBeenLastCalledWith(user_id)
          expect(Balance.update).toHaveBeenLastCalledWith({ sickness: 0, total: 0, user_id: user_id, vacation: 1 })
        })

        it('Updates sickness count', async () => {
          await balanceController.update(Streams.inserAbsenceSicknessEvent, {}, () => {})

          expect(Balance.findById).toHaveBeenLastCalledWith(user_id)
          expect(Balance.update).toHaveBeenLastCalledWith({ sickness: 1, total: 0, user_id: user_id, vacation: 0 })
        })
      })
    })

    describe('Presence', () => {
      describe('INSERT event', () => {
        it('Increases total count', async () => {
          await balanceController.update(Streams.insertPresencePlusEvent, {}, () => {})

          expect(Balance.findById).toHaveBeenLastCalledWith(user_id)
          expect(Balance.update).toHaveBeenLastCalledWith({ sickness: 0, total: 0.5, user_id: user_id, vacation: 0 })
        })

        it('Descreases total count', async () => {
          await balanceController.update(Streams.insertPresenceMinusEvent, {}, () => {})

          expect(Balance.findById).toHaveBeenLastCalledWith(user_id)
          expect(Balance.update).toHaveBeenLastCalledWith({ sickness: 0, total: -0.5, user_id: user_id, vacation: 0 })
        })
      })

      describe('MODIFY event', () => {
        it('Increases total count', async () => {
          await balanceController.update(Streams.modifyPresencePlusEvent, {}, () => {})

          expect(Balance.findById).toHaveBeenLastCalledWith(user_id)
          expect(Balance.update).toHaveBeenLastCalledWith({ sickness: 0, total: 0.5, user_id: user_id, vacation: 0 })
        })

        it('Descreases total count', async () => {
          await balanceController.update(Streams.modifyPresenceMinusEvent, {}, () => {})

          expect(Balance.findById).toHaveBeenLastCalledWith(user_id)
          expect(Balance.update).toHaveBeenLastCalledWith({ sickness: 0, total: -1, user_id: user_id, vacation: 0 })
        })
      })

      describe('REMOVE event', () => {
        it('Updates total count', async () => {
          await balanceController.update(Streams.removePresenceEvent, {}, () => {})

          expect(Balance.findById).toHaveBeenLastCalledWith(user_id)
          expect(Balance.update).toHaveBeenLastCalledWith({ sickness: 0, total: -0.5, user_id: user_id, vacation: 0 })
        })
      })

    })
  })
})
