const uuid = require('uuid')
const AWS = require('aws-sdk')

AWS.config.update({region: 'eu-central-1'})
const DynamoDB = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'})
// import dynamodb from 'serverless-dynamodb-client'
const ValidationHelper = require('../helpers/validation')
const ValidationError = require('jsonschema').ValidationError

class Record {
  constructor (record) {
    this.record = Object.assign({ 'id': uuid.v4() }, record)
    this.validator = new ValidationHelper()
  }

  static async all (limit = 50) {
    console.log('All records with limit', limit)
    try {
      const data = await DynamoDB.scan({
        TableName: 'Records',
        Limit: limit
      }).promise()

      return data.Items
    } catch (error) {
      console.error(error)
      return error
    }
  }

  static async find (id) {
    console.log('Find', id)
    try {
      var params = {
        Key: {
          id: id
        },
        TableName: 'Records'
      }

      const data = await DynamoDB.get(params).promise()
      return data.Item
    } catch (error) {
      console.error(error)
      return error
    }
  }

  async isValid () {
    try {
      await this.validator.validate(this.record, '/Record')
      return true
    } catch (error) {
      console.error('**** Validation error')
      console.error(error)
      return error
    }
  }

  async save () {
    try {
      // const result = await this.validator.validate(record, '/Record')
      await this.validator.validate(this.record, '/Record')
      await DynamoDB.put({
        TableName: 'Records',
        Item: this.record,
        ReturnConsumedCapacity: 'TOTAL'
      }).promise()

      return this.record
    } catch (error) {
      if (error instanceof Array && error[0] instanceof ValidationError) {
        console.error('**** Validation error')
        return error[0].message
      } else {
        console.error('**** Unhandled error')
        return error
      }
    }
  }
}

module.exports = Record

// return this.validator.validate(taco, '/Taco').then(data => {
//   console.log(params)
//   console.log(data)
//   return this.db.put(params).promise().then(data => {
//     data = Object.assign({id: id}, data)
//     return data
//   })
// })
