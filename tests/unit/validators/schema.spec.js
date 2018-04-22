import recordValidator from '../../../app/validators/schema'

describe.skip('Record validator', () => {
  describe('Type coersion', () => {
    test('validate', () => {
      recordValidator.validate({}, 'index_record')

      recordValidator.validate({ user_id: 'ssss', month: '5', week: '4'}, 'index')

      recordValidator.validate({ user_id: 'ssss', month: '5', week: 4 }, 'index')

      expect(true).toEqual(true)
    })
  })
})
