const dynamoose = require('dynamoose')
const schema = require('./schemas/record')
const datetime = require("../helpers/datetime");

module.exports = class Base {
  static get connection () {
    return dynamoose.model(process.env.RECORDS_TABLE || 'records-development', schema, { update: false })
  }

  static async findById (userId) {
    console.log('===================================')
    console.log('findById', userId)
    const response = await this.connection.query({ user_id: { eq: userId } }).filter('type').eq(this.type).exec()
    console.log('===================================')
    return response
  }

  static async findByMonth (userId, month) {
    console.log('===================================')
    console.log('findByMonth', userId, month)
    const range = datetime.getStartEndByMonth(month)
    const response = await this.connection.query({
      user_id: { eq: userId }
    }).where('timestamp').between(range[0], range[1]).filter('type').eq(this.type).exec()

    console.log('===================================')
    return response
  }

  static async findByWeek (userId, week) {
    console.log('===================================')
    console.log('findByWeek', userId, week)
    const range = datetime.getStartEndByWeek(week)
    const response = await this.connection.query({
      user_id: { eq: userId }
    }).where('timestamp').between(range[0], range[1]).filter('type').eq(this.type).exec()

    console.log('===================================')
    return response
  }

  static async all (params = {}) {
    let response = []

    if (params.user_id && params.week) {
      response = await this.findByWeek(params.user_id, params.week)
    } else if (params.user_id && params.month) {
      response = await this.findByMonth(params.user_id, params.month)
    } else {
      response = await this.findById(params.user_id)
    }

    return response
  }

  static async create (params = {}) {
    console.log('*** .create()')
    console.log(params)
    let response = {}
    if (Array.isArray(params)) {
      console.log('*** .create() - batchPut')

      response = await this.connection.batchPut(params)
    } else {
      console.log('*** .create() - new save')

      response = await new this.connection(params).save()
    }

    return response
  }

  async save() {
    console.log('*** #save()')
    const response = await this.constructor.create(this.data)
    return response
  }
}
