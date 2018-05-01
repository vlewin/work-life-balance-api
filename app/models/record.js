const dynamoose = require('dynamoose')
const schema = require('./schemas/record')
const TABLE_NAME = process.env.RECORDS_TABLE || 'records-development'
const connection = dynamoose.model(TABLE_NAME, schema, { update: true })

module.exports = class Record {
  static get model () {
    return connection
  }

  static async findById (userId) {
    console.log('NOTE: findById', userId)
    // return this.model.query({ user_id: {eq: user_id }}).exec(function (err, records) {
    //   console.log(err)
    //   console.log(JSON.stringify(records));
    // });

    const response = await this.model.query({ user_id: { eq: userId } }).exec()
    console.log('*** Returns', JSON.stringify(response))
    return response
  }

  static async findByMonth (userId, month) {
    console.log('NOTE: findByMonth', month)
    const response = await this.model.query({ user_id: { eq: userId } }).where({ month: { eq: month } }).exec()
    return response

    // return this.model.query({ user_id: {eq: user_id }}).where({ month: {eq: month }}).exec(function (err, records) {
    //   console.log(err)
    //   if(err) console.log(err)
    //
    //   console.log(user_id, month, '=>', records.length);
    //   // Look at all the beagles
    // });
  }

  static async findByWeek (userId, week) {
    console.log('NOTE: findByWeek', userId, week)
    const response = await this.model.query({ user_id: { eq: userId } }).where({ week: { eq: week } }).exec()
    return response
  }

  // static async all (params = {}) {
  //   let response = []
  //
  //   if (params.user_id && params.week) {
  //     response = await Record.findByWeek(params.user_id, params.week)
  //   } else if (params.user_id && params.month) {
  //     response = await Record.findByMonth(params.user_id, params.month)
  //   } else {
  //     console.log('Not implemented')
  //     response = await this.findById(params.user_id)
  //   }
  //
  //   return response
  // }

  static async all (params = {}) {
    let response = []

    if (params.user_id && params.week) {
      response = await Record.findByWeek(params.user_id, params.week)
    } else if (params.user_id && params.month) {
      response = await Record.findByMonth(params.user_id, params.month)
    } else {
      response = await this.findById(params.user_id)
    }

    return response
  }

  static async create (params = {}) {
    console.log('NOTE: create')
    let response = {}
    if (Array.isArray(params)) {
      response = await this.saveAll(params)
    } else {
      response = await this.saveOn(params)
    }

    return response
  }

  static async saveAll (params = []) {
    console.log('NOTE: saveAll')
    console.log(params)
    const response = await this.model.batchPut(params)
    // const response = await record.save()
    return response
  }

  static async saveOn (params = {}) {
    console.log('NOTE: saveOn')
    console.log(params)
    const record = new this.model(params)
    const response = await record.save()
    return response
  }

  // constructor (record) {
  //   console.log('***** Init', record)
  //   this.model = this.constructor.model
  // }
}
