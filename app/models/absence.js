const dynamoose = require('dynamoose')
const schema = require('./schemas/absence')
const TABLE_NAME = process.env.RECORDS_TABLE || 'records-development'
const connection = dynamoose.model(TABLE_NAME, schema, { update: true })

module.exports = class Absence {
  static get model () {
    return connection
  }

  static async findById (userId) {
    console.log('NOTE: findById', userId)
    // return this.model.query({ user_id: {eq: user_id }}).exec(function (err, records) {
    //   console.log(err)
    //   console.log(JSON.stringify(records));
    // });

    const response = await this.model.query({ user_id: { eq: userId } }).where({ type: { eq: 'absence' } }).exec()
    console.log('*** Returns', JSON.stringify(response))
    return response
  }

  static async findByWeek (userId, week) {
    console.log('NOTE: findByWeek', userId, week)
    const response = await this.model.query({ user_id: { eq: userId } }).where({ week: { eq: week } }).exec()
    return response
  }

  static async findByMonth (userId, month) {
    console.log('NOTE: findByMonth', month)
    const response = await this.model.query({ user_id: { eq: userId } }).where({ month: { eq: month } }).exec()
    return response
  }

  static async findByType (userId, type) {
    console.log('NOTE: findByMonth', type)
    const response = await this.model.query({ user_id: { eq: userId } }).where({ absence: { eq: type } }).exec()
    return response
  }

  static async all (params = {}) {
    let response = []

    if (params.user_id && params.week) {
      response = await Absence.findByWeek(params.user_id, params.week)
    } else if (params.user_id && params.month) {
      response = await Absence.findByMonth(params.user_id, params.month)
    } else {
      response = await this.findById(params.user_id)
    }

    return response
  }

  static async create (params = []) {
    console.log('NOTE: create')
    if (Array.isArray(params)) {
      const response = await this.model.batchPut(params)
      console.log(response)
      return response
    } else {
      throw new Error('Invalid params type')
    }
  }
}
