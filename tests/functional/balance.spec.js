const axios = require('axios')
const seed = require('../seeds/balance')

beforeAll(async () => {
  await seed.import()

  axios.interceptors.request.use((config) => {
    config.headers = { 'Authorization': 'TEST-TOKEN' }
    return config
  }, (error) => {
    return Promise.reject(error)
  })
})

describe('#show()', () => {
  it('Returns 200 with balance as a JSON response for given user', async () => {
    const reponse = await axios.get('http://localhost:3000/balance/user12345')

    expect(reponse.data).toEqual({ user_id: 'user12345', total: 0, vacation: 0, sickness: 0 })
  })
})
