import balanceController from '../../../app/controllers/balance'
import Balance from '../../../app/models/balance'

jest.mock('../../../app/models/balance')

describe('Records controller', () => {
  const userId = 'user12345'

  describe('#update', () => {
    describe('Absence', () => {
      describe('INSERT event', () => {
        it('Increases vacation count', async () => {
          const event = require('../fixtures/streams/insert_absence.json')
          Balance.findById.mockReturnValue({ user_id: userId, total: 0, sickness: 0, vacation: 0 })

          await balanceController.update(event, {}, () => {})

          expect(Balance.findById).toHaveBeenLastCalledWith(userId)
          expect(Balance.update).toHaveBeenLastCalledWith({ sickness: 0, total: 0, user_id: userId, vacation: 1 })
        })
      })

      describe('MODIFY event', () => {
        it('Changes absence type but preserves count', async () => {
          const event = require('../fixtures/streams/modify_absence.json')
          Balance.findById.mockReturnValue({ user_id: userId, total: 0, sickness: 0, vacation: 1 })

          await balanceController.update(event, {}, () => {})

          expect(Balance.findById).toHaveBeenLastCalledWith(userId)
          expect(Balance.update).toHaveBeenLastCalledWith({
            sickness: 1, total: 0, user_id: userId, vacation: 0
          })
        })
      })

      describe('REMOVE event', () => {
        it('Descreases vacation count', async () => {
          const event = require('../fixtures/streams/remove_absence.json')
          Balance.findById.mockReturnValue({ user_id: userId, total: 0, sickness: 0, vacation: 3 })

          await balanceController.update(event, {}, () => {})

          expect(Balance.findById).toHaveBeenLastCalledWith(userId)
          expect(Balance.update).toHaveBeenLastCalledWith({
            sickness: 0, total: 0, user_id: userId, vacation: 2
          })
        })

        it('Ignores negative value vacation', async () => {
          const event = require('../fixtures/streams/remove_absence.json')
          Balance.findById.mockReturnValue({ user_id: userId, total: 0, sickness: 0, vacation: 0 })

          await balanceController.update(event, {}, () => {})

          expect(Balance.findById).toHaveBeenLastCalledWith(userId)
          expect(Balance.update).toHaveBeenLastCalledWith({
            sickness: 0, total: 0, user_id: userId, vacation: 0
          })
        })
      })
    })

    describe('Presence', () => {
      describe('INSERT event', () => {
        it('Increases presence total count', async () => {
          const event = require('../fixtures/streams/insert_presence_overtime.json')
          Balance.findById.mockReturnValue({ user_id: userId, total: 0, sickness: 0, vacation: 0 })

          await balanceController.update(event, {}, () => {})

          expect(Balance.findById).toHaveBeenLastCalledWith(userId)
          expect(Balance.update).toHaveBeenLastCalledWith({
            sickness: 0, total: 0.5, user_id: userId, vacation: 0
          })
        })

        it('Descreases presence total count', async () => {
          const event = require('../fixtures/streams/insert_presence_undertime.json')
          Balance.findById.mockReturnValue({ user_id: userId, total: 0, sickness: 0, vacation: 0 })

          await balanceController.update(event, {}, () => {})

          expect(Balance.findById).toHaveBeenLastCalledWith(userId)
          expect(Balance.update).toHaveBeenLastCalledWith({
            sickness: 0, total: -0.5, user_id: userId, vacation: 0
          })
        })
      })

      describe('MODIFY event', () => {
        it('Increases total count', async () => {
          const event = require('../fixtures/streams/modify_presence_increase.json')
          Balance.findById.mockReturnValue({ user_id: userId, total: 0, sickness: 0, vacation: 0 })

          await balanceController.update(event, {}, () => {})

          expect(Balance.findById).toHaveBeenLastCalledWith(userId)
          expect(Balance.update).toHaveBeenLastCalledWith({
            sickness: 0, total: 0.5, user_id: userId, vacation: 0
          })
        })

        it('Descreases total count', async () => {
          const event = require('../fixtures/streams/modify_presence_decrease.json')
          Balance.findById.mockReturnValue({ user_id: userId, total: 0, sickness: 0, vacation: 0 })

          await balanceController.update(event, {}, () => {})

          expect(Balance.findById).toHaveBeenLastCalledWith(userId)
          expect(Balance.update).toHaveBeenLastCalledWith({
            sickness: 0, total: -0.5, user_id: userId, vacation: 0
          })
        })
      })

      describe('REMOVE event', () => {
        it('Descreases total count', async () => {
          const event = require('../fixtures/streams/modify_presence_decrease.json')
          Balance.findById.mockReturnValue({ user_id: userId, total: 0.5, sickness: 0, vacation: 0 })

          await balanceController.update(event, {}, () => {})

          expect(Balance.findById).toHaveBeenLastCalledWith(userId)
          expect(Balance.update).toHaveBeenLastCalledWith({
            sickness: 0, total: 0, user_id: userId, vacation: 0
          })
        })
      })
    })
  })
})
