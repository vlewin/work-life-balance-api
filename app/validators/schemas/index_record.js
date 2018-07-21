module.exports = {
  type: 'object',
  properties: {
    user_id: {
      type: 'string',
      minLength: 5,
      maxLength: 50
    },
    month: {
      type: 'integer'
    },
    week: {
      type: 'integer'
    }
  },
  required: ['user_id']
}
