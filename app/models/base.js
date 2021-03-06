const dynamoose = require('dynamoose')
const schema = require('./schemas/record')
const datetime = require('../helpers/datetime')
const Model = dynamoose.model(process.env.RECORDS_TABLE || 'records-development', schema, { update: false })

module.exports = class Base {
  constructor (data) {
    console.log('**** BASE CONSTRUCTOR', data)

    this.data = data
  }

  static get connection () {
    return Model
  }

  static async findById (userId) {
    console.log('===================================')
    console.log('findById', userId)
    // const response = await this.connection.query({ user_id: { eq: userId } }).filter('type').eq(this.type).exec()
    const query = this.connection.query('user_id').eq(userId)

    if (this.type) {
      query.filter('type').eq(this.type)
    }

    const response = await query.exec()

    console.log('===================================')
    return response
  }

  static async findByMonth (userId, month) {
    console.log('===================================')
    console.log('findByMonth', userId, month)
    console.log(process.env.TZ)

    const now = new Date()
    console.log('TZ', process.env.TZ, 'Offset', now.getTimezoneOffset())
    const range = datetime.getStartEndByMonth(month)

    const query = this.connection.query('user_id').eq(userId).where('timestamp').between(range[0], range[1])

    if (this.type) {
      query.filter('type').eq(this.type)
    }

    const response = await query.exec()

    console.log('===================================')
    return response
  }

  static async findByWeek (userId, week) {
    console.log('===================================')
    console.log('findByWeek', userId, week)
    const range = datetime.getStartEndByWeek(week)
    // const response = await this.connection.query({
    //   user_id: { eq: userId }
    // }).where('timestamp').between(range[0], range[1]).filter('type').eq(this.type).exec()

    const query = this.connection.query('user_id').eq(userId).where('timestamp').between(range[0], range[1])

    if (this.type) {
      query.filter('type').eq(this.type)
    }

    const response = await query.exec()

    console.log('===================================')
    return response
  }

  static async findByTimestamp (userId, timestamp) {
    // console.log('===================================')
    // console.log('findByDate', userId, timestamp)
    const query = this.connection.query('user_id').eq(userId).where('timestamp').eq(timestamp)

    if (this.type) {
      query.filter('type').eq(this.type)
    }

    const response = await query.exec()

    // console.log('===================================')
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
      console.log('*** .create() - init and call save')
      console.log(params)
      console.log(this)
      response = await new this(params).save()
    }

    console.log(response)
    return response
  }

  static async delete (params = {}) {
    console.log(params)

    if (Array.isArray(params)) {
      console.log('*** #delete() - batchDelete', params)
      await this.connection.batchDelete(params)
    } else {
      console.log('*** #delete() - delete')
      await this.connection.delete(params)
    }
  }

  async save () {
    console.log('*** #save()')
    console.log('*******')
    console.log(this.data)
    console.log('*******')

    const response = await new Model(this.data).save()
    return response
  }
}
