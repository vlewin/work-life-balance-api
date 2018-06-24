import balanceController from '../../../app/controllers/balance'

import Balance from '../../../app/models/balance'
import Streams from '../../fixtures/streams'

jest.mock('../../../app/models/balance')

describe('Records controller', () => {
  const user_id = 'user12345'


  describe('#update', () => {
    describe('Absence', () => {
      describe('INSERT event', () => {
        it('Increases vacation count', async () => {
          Balance.findById.mockReturnValue(Object.assign({}, { user_id: user_id, total: 0, sickness: 0, vacation: 0 }))

          await balanceController.update(Streams.inserAbsenceVacationEvent, {}, () => {})

          expect(Balance.findById).toHaveBeenLastCalledWith(user_id)
          expect(Balance.update).toHaveBeenLastCalledWith({ sickness: 0, total: 0, user_id: user_id, vacation: 1 })
        })
      })

      describe('REMOVE event', () => {
        it('Descreases vacation count', async () => {
          Balance.findById.mockReturnValue(Object.assign({}, { user_id: user_id, total: 0, sickness: 0, vacation: 3 }))

          await balanceController.update(Streams.removeAbsenceVacationEvent, {}, () => {})

          expect(Balance.findById).toHaveBeenLastCalledWith(user_id)
          expect(Balance.update).toHaveBeenLastCalledWith({ sickness: 0, total: 0, user_id: user_id, vacation: 2 })
        })
      })
    })

    describe('Presence', () => {
      describe('INSERT event', () => {
        it('Increases total count', async () => {
          Balance.findById.mockReturnValue(Object.assign({}, { user_id: user_id, total: 0, sickness: 0, vacation: 0 }))

          await balanceController.update(Streams.insertPresencePlusEvent, {}, () => {})

          expect(Balance.findById).toHaveBeenLastCalledWith(user_id)
          expect(Balance.update).toHaveBeenLastCalledWith({ sickness: 0, total: 0.5, user_id: user_id, vacation: 0 })
        })

        it('Descreases total count', async () => {
          Balance.findById.mockReturnValue(Object.assign({}, { user_id: user_id, total: 0, sickness: 0, vacation: 0 }))

          await balanceController.update(Streams.insertPresenceMinusEvent, {}, () => {})

          expect(Balance.findById).toHaveBeenLastCalledWith(user_id)
          expect(Balance.update).toHaveBeenLastCalledWith({ sickness: 0, total: -0.5, user_id: user_id, vacation: 0 })
        })
      })

      describe('MODIFY event', () => {
        it('Increases total count', async () => {
          Balance.findById.mockReturnValue(Object.assign({}, { user_id: user_id, total: 0, sickness: 0, vacation: 0 }))

          await balanceController.update(Streams.modifyPresencePlusEvent, {}, () => {})

          expect(Balance.findById).toHaveBeenLastCalledWith(user_id)
          expect(Balance.update).toHaveBeenLastCalledWith({ sickness: 0, total: 0.5, user_id: user_id, vacation: 0 })
        })

        it('Descreases total count', async () => {
          Balance.findById.mockReturnValue(Object.assign({}, { user_id: user_id, total: 1, sickness: 0, vacation: 0 }))

          await balanceController.update(Streams.modifyPresenceMinusEvent, {}, () => {})

          expect(Balance.findById).toHaveBeenLastCalledWith(user_id)
          expect(Balance.update).toHaveBeenLastCalledWith({ sickness: 0, total: 0, user_id: user_id, vacation: 0 })
        })
      })

      describe('REMOVE event', () => {
        it('Descreases total count', async () => {
          Balance.findById.mockReturnValue(Object.assign({}, { user_id: user_id, total: 1, sickness: 0, vacation: 0 }))

          await balanceController.update(Streams.removePresenceEvent, {}, () => {})

          expect(Balance.findById).toHaveBeenLastCalledWith(user_id)
          expect(Balance.update).toHaveBeenLastCalledWith({ sickness: 0, total: 0.5, user_id: user_id, vacation: 0 })
        })
      })
    })
  })

})
