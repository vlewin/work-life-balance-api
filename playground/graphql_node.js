const client = require('../app/models/graphql-client')

var variables = {
  user_id: 'auth0|5b0fd1cb21652a131b051f7a',
  vacation: 10,
  sickness: 20,
  total: 11.0
}

const update = async () => {
  // FIXME: Use webpack loader
  // https://www.npmjs.com/package/webpack-graphql-loader
  const query = `
    mutation UpdateBalance($user_id: String!, $vacation: Int, $sickness: Int, $total: Float) {
      updateBalanceDevelopment(
        input: {
          user_id: $user_id, 
          vacation: $vacation, 
          sickness: $sickness, 
          total: $total
        }) {
        user_id
        vacation
        sickness
        total
      }
    }`

  const response = await client.query(query, variables).catch(function (err) {
    console.log(err.message)
  })

  console.log(response)
  return response
}

update()
