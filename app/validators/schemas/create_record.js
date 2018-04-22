module.exports = {
  type: 'object',
  properties: {
    user_id: {
      type: 'string',
      minLength: 2,
      maxLength: 15
    },
    date: { type: 'string' },
    month: { type: 'integer' },
    week: { type: 'integer' },
    start: { type: 'string' },
    pause: { type: 'string' },
    finish: { type: 'string' },
    duration: { type: 'integer' },
    absence: { type: 'string' }
  },
  required: ['user_id', 'date', 'month', 'week']
}
