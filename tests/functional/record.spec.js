const axios = require('axios')

beforeAll(async () => {
  axios.interceptors.request.use((config) => {
    // Do something before request is sent
    config.headers = { 'Authorization': 'TEST-TOKEN' }
    return config
  }, (error) => {
    // Do something with request error
    return Promise.reject(error)
  })
})

describe('#index()', () => {
  it('Returns 200', async () => {
    const reponse = await axios.get('http://localhost:3000/records')

    expect(reponse.status).toBe(200)
  })
})
