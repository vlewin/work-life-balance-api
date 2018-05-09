const axios = require('axios');

beforeAll(() => {
  axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers = {
      'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1UTTRNMEV6T1VJeVJUbEVRVUk1TnprMVJUSTNNamhFT1RrME9FTkJPRFkyTlVKRFJURTBRZyJ9.eyJpc3MiOiJodHRwczovL3dvcmstbGlmZS1iYWxhbmNlLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJnaXRodWJ8NjExNDY2IiwiYXVkIjpbImh0dHBzOi8vd29yay1saWZlLWJhbGFuY2UuZXUuYXV0aDAuY29tL2FwaS92Mi8iLCJodHRwczovL3dvcmstbGlmZS1iYWxhbmNlLmV1LmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE1MjUzNTYwMjEsImV4cCI6MTUyNTM2MzIyMSwiYXpwIjoiVXduMVQ3RXlCdzgzUlE1RkVWUnpIb2MwRTZNQjFVYVQiLCJzY29wZSI6Im9wZW5pZCJ9.T-pxmx1bFPkHu3AdVbcB4CYUKuYknf9Bz_qi5PckjUfp2O4Zr82LCs45g5fpaesqSq6TFjygYjenS8Kpc6tZTJgYFpRRW2jiC_wmgyvx1VhJWH7Mno22UNREhPaEopVG3bvaicacRWBT8uEDDBeeB8_P08nzOYnm3rDMLQrZBKqBoONdjh-MPmdD59aYDrEAwRo-cBbXTnYb-2SwKy7bExNMas27S5H786SCP-WmfZghQ84IKcqLIhyIFCOb1tJbc2llOFDnv6-L8Jgo4Sb6xb88IiFWtzYgWFjIfdEhKasiUC3fws-U4yFak6FPAtf5K5Z-I6ypADCZplxotes6Wg' }

    return config
  }, function (error) {
    // Do something with request error
    return Promise.reject(error)
  })
})

describe('#index()', () => {
  it('Returns 422 with missing requried params message if no parameters', async () => {
    // request({ url: 'http://localhost:3000/records', json: true }, (error, response, body) => {
    //   console.log(error, response)
    // })
    console.log('***** ')
    const reponse = await axios.get('http://localhost:3000/records?week=18')
    console.log(reponse)

  })
})
