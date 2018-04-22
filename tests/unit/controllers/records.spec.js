import recordsController from '../../../app/controllers/records'

import Record from '../../../app/models/record'
jest.mock('../../../app/models/record')

describe('Records controller', () => {
  const event = {}
  const context = {}

  describe('Invalid parameters', () => {
    it('Returns 422 with missing requried params message if no parameters', async () => {
      const callback = jest.fn((_, response) => {
        expect(response.statusCode).toBe(422)
        expect(JSON.parse(response.body).message).toBe('Missing required property: user_id')
      })

      await recordsController.index(event, context, callback)
    })
  })

  describe('Valid parameters', () => {
    const callback = jest.fn((error, response) => { console.log(error, response) })

    it('Returns 200 http status code', async () => {
      event.queryStringParameters = { user_id: 'auth0|12345' }

      const callback = jest.fn((_, response) => {
        expect(response.statusCode).toBe(200)
      })

      await recordsController.index(event, context, callback)
    })

    it('Calls Record.all if user_id was provided', async () => {
      event.queryStringParameters = { user_id: 'auth0|12345' }

      await recordsController.index(event, context, callback)

      expect(Record.all).toHaveBeenCalledWith(event.queryStringParameters)
    })

    it('Filters records by month', async () => {
      event.queryStringParameters = { user_id: 'auth0|12345', month: '5' }

      const callback = jest.fn((_, response) => {
        console.log(response)
        expect(response.statusCode).toBe(200)
      })

      await recordsController.index(event, context, callback)

      expect(Record.all).toHaveBeenCalledWith(event.queryStringParameters)
    })
  })
})
