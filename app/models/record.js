const dynamoose = require('dynamoose');
const recordSchema = require('../schemas/record')
const TABLE_NAME = process.env.RECORDS_TABLE || 'records-development'
const connection = dynamoose.model(TABLE_NAME, recordSchema, { update: true })

module.exports = class Record {
  static get model() {
    return connection
  }

  static async find_by_id(user_id) {
    console.log('find_by_id', user_id)
    // return this.model.query({ user_id: {eq: user_id }}).exec(function (err, records) {
    //   console.log(err)
    //   console.log(JSON.stringify(records));
    // });

    const response = await this.model.query({ user_id: {eq: user_id }}).exec()
    return response
  }

  static async find_by_month(user_id, month) {
    console.log('find_by_month', month)
    const response = await this.model.query({ user_id: {eq: user_id }}).where({ month: {eq: month }}).exec()
    return response

    // return this.model.query({ user_id: {eq: user_id }}).where({ month: {eq: month }}).exec(function (err, records) {
    //   console.log(err)
    //   if(err) console.log(err)
    //
    //   console.log(user_id, month, '=>', records.length);
    //   // Look at all the beagles
    // });
  }

  static async find_by_week(user_id, week) {
    console.log('find_by_week', user_id, week)
    const response = await this.model.query({ user_id: { eq: user_id }}).where({ week: {eq: week }}).exec()
    return response
  }

  static async all(params = {}) {
    let response = []

    if(params.user_id && params.week) {
      response = await Record.find_by_week(params.user_id, params.week)
    } else if (params.user_id && params.month) {
      response = await Record.find_by_month(params.user_id, params.month)
    } else {
      console.log('Not implemented')
      response = await this.find_by_id(params.user_id)
    }

    return response
  }

  static async all(params = {}) {
    let response = []

    if(params.user_id && params.week) {
      response = await Record.find_by_week(params.user_id, params.week)
    } else if (params.user_id && params.month) {
      response = await Record.find_by_month(params.user_id, params.month)
    } else {
      response = await this.find_by_id(params.user_id)
    }

    return response
  }

  static async create(params = {}) {
    console.log('*** Save')
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
