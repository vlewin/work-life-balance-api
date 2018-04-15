module.exports = {
  id: '/CreateRecord',
  type: 'object',
  properties: {
    user_id: { type: 'string' },
    date: { type: 'string' },
    month: { type: 'number' },
    week: { type: 'number' },
    start: { type: 'string' },
    pause: { type: 'string' },
    finish: { type: 'string' },
    duration: { type: 'number' },
    absence: { type: 'string' }
  },
  required: ['user_id', 'date', 'month', 'week'],
  additionalProperties: false
}
