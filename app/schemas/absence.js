const Absence = {
  id: '/Absence',
  type: 'object',
  properties: {
    date: { type: 'string' },
    week: { type: 'number' },
    kind: { type: 'string' }
  },
  required: ['date'],
  additionalProperties: false
}

export default Absence
