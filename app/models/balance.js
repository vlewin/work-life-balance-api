const TABLE_NAME = process.env.RECORDS_TABLE || 'balance-development'

const dynamoose = require('dynamoose')
const schema = require('./schemas/balance')
const connection = dynamoose.model(TABLE_NAME, schema, { update: false })

module.exports = class Balance {
  static get model () {
    return connection
  }

  static async findById (userId) {
    console.log('NOTE: findById', userId)

    const response = await this.model.get({ user_id: userId })
    console.log('*** Returns', JSON.stringify(response))
    return response
  }

  static async update (params = []) {
    console.log('NOTE: update')
    if (Array.isArray(params)) {
      const response = await this.model.batchPut(params)
      console.log('*** Returns', JSON.stringify(response))
      return response
    } else {
      const response = await new this.model(params).save()
      console.log('*** Returns', JSON.stringify(response))
      return response
    }
  }
}
