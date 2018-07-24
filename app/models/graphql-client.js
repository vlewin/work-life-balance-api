
const GraphQlClient = require('graphql-client')
const config = require('../../.config')
const client = GraphQlClient({
  url: config.graphqlEndpoint,
  headers: {
    'X-Api-Key': config.apiKey
  }
})

module.exports = client
