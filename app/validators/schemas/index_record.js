module.exports = {
  type: 'object',
  properties: {
    user_id: {
      type: 'string',
      minLength: 2,
      maxLength: 15
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
