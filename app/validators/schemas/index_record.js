module.exports = {
  id: '/IndexRecord',
  type: 'object',
  properties: {
    user_id: { type: 'string' },
    month: { type: 'number' },
    week: { type: 'number' },
  },
  required: ['user_id'],
  additionalProperties: false
}
