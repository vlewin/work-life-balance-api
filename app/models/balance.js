const TABLE_NAME = process.env.BALANCE_TABLE || 'balance-development'
const dynamoose = require('dynamoose')
const schema = require('./schemas/balance')
const connection = dynamoose.model(TABLE_NAME, schema, { update: true })

console.log('TABLE_NAME', TABLE_NAME)

module.exports = class Balance {
  static get connection () {
    return connection
  }

  static async findById (userId) {
    console.log('NOTE: findById', userId)

    const response = await this.connection.get({ user_id: userId })
    console.log('*** Returns', JSON.stringify(response))
    return response
  }

  static async update (params = []) {
    console.log('*** Balance.update()', params)

      let response = {}
      if (Array.isArray(params)) {
        response = await this.connection.batchPut(params)
      } else {
        response = await new this.connection(params).save()
      }

      console.log('*** Balance.update() - response', response)
      return response

    // if (Array.isArray(params)) {
    //   console.log('*** Balance.batchPut', params)
    //   const response = await this.model.batchPut(params)
    //   console.log('*** Returns', JSON.stringify(response))
    //   return response
    // } else {
    //   console.log('*** balance.save', new this.model(params).save())
    //   new this.model(params).save().then((a,b) => {
    //     console.log(a,b)
    //   })
    //   // const response = await new this.model(params).save()
    //   console.log('*** Returns', JSON.stringify({}))
    //   return {}
    // }
  }
}
