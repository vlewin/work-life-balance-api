import recordValidator from '../../../app/validators/schema'

describe('JSON schema validator', () => {
  describe('Valid object', () => {
    it('Validates required params', () => {
      const result = recordValidator.validate({ user_id: '12345' }, 'index_record')

      expect(result).toEqual({ user_id: '12345' })
    })

    it('Forces type coersion', () => {
      const result = recordValidator.validate({ user_id: '12345', month: '1' }, 'index_record')

      expect(result).toEqual({ user_id: '12345', month: 1 })
    })

    it('Ignores additional params', () => {
      const result = recordValidator.validate({ user_id: '12345', foo: 1 }, 'index_record')

      expect(result).toEqual({ user_id: '12345' })
    })
  })
})
