const axios = require('axios');
const seed = require('../seeds/balance')
const Streams = require('../fixtures/streams')

beforeAll(async () => {
  await seed.import()

  axios.interceptors.request.use((config) => {
    // Do something before request is sent
    config.headers = { 'Authorization': 'TEST-TOKEN' }
    return config

  }, (error) => {
    // Do something with request error
    return Promise.reject(error)
  })
})

describe('#show()', () => {
  // it('Returns 422 with missing requried params message if no parameters', async () => {
  //   // request({ url: 'http://localhost:3000/records', json: true }, (error, response, body) => {
  //   //   console.log(error, response)
  //   // })
  //   console.log('***** ')
  //   const reponse = await axios.get('http://localhost:3000/records?week=18')
  //   console.log(reponse)
  // })

  it.only('Returns 200 with balance as a JSON response for given user', async () => {
    console.log('*** Test exec')
    const reponse = await axios.get('http://localhost:3000/balance/user12345')
    console.log(reponse.data)

    expect(reponse.data).toEqual({ user_id: 'user12345', total: 0, vacation: 0, sickness: 0 })
  })
})


describe('#update()', () => {
  // it('Returns 422 with missing requried params message if no parameters', async () => {
  //   // request({ url: 'http://localhost:3000/records', json: true }, (error, response, body) => {
  //   //   console.log(error, response)
  //   // })
  //   console.log('***** ')
  //   const reponse = await axios.get('http://localhost:3000/records?week=18')
  //   console.log(reponse)
  // })

  it.only('Returns 200 with balance as a JSON response for given user', async () => {
    console.log('*** Test exec')
    const reponse = await axios.get('http://localhost:3000/balance/user12345')
    console.log(reponse.data)

    expect(reponse.data).toEqual({ user_id: 'user12345', total: 0, vacation: 0, sickness: 0 })
  })
})
