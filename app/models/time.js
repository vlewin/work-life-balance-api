const uuid = require('uuid')
const AWS = require('aws-sdk')

AWS.config.update({ region: 'eu-central-1' })
const DynamoDB = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' })
// import dynamodb from 'serverless-dynamodb-client'
const ValidationHelper = require('../helpers/validation')
const ValidationError = require('jsonschema').ValidationError
const TABLE_NAME = process.env.RECORDS_TABLE || 'records-production'

class Record {
  static validator () {
    return new ValidationHelper()
  }

  constructor (record) {
    this.record = Object.assign({ id: uuid.v4() }, record)
    this.validator = this.constructor.validator()
  }

  static async find_by(params) {
    console.log('Query for', params)
    const query = {
      TableName: TABLE_NAME,
      KeyConditionExpression: `${params.key} = :hkey`,
      ExpressionAttributeValues: {
        ':hkey': params.value
      },
      Limit: params.limit || 31
    }

    console.log(query)

    return await DynamoDB.query({
      TableName: TABLE_NAME,
      KeyConditionExpression: 'user_id = :hkey',
      ExpressionAttributeValues: {
        ':hkey': 'auth0|12345678'
      },
      KeyConditionExpression: `${params.key} = :hkey`,
      ExpressionAttributeValues: {
        ':hkey': params.value
      },
      Limit: params.limit || 31
    }).promise()
  }

  static async all (params = { limit:  10 }) {
    try {
      if (params.key && params.value) {
        // let expression = KeyConditionExpression: 'week = :hkey',
        // console.log('Query for week', week, 'limit', limit)
        //
        // const query = {
        //   TableName: TABLE_NAME,
        //   KeyConditionExpression: 'week = :hkey',
        //   ExpressionAttributeValues: {
        //     ':hkey': parseInt(week)
        //   }
        //
        // const data = await DynamoDB.query({
        //   TableName: TABLE_NAME,
        //   KeyConditionExpression: 'week = :hkey',
        //   ExpressionAttributeValues: {
        //     ':hkey': parseInt(week)
        //   },
        //   Limit: limit
        // }).promise()

        const data = await this.find_by(params)
        return data.Items

      } else {
        console.log('Scan for all with limit', params)

        const data = await DynamoDB.scan({
          TableName: TABLE_NAME,
          Limit: params.limit || 10
        }).promise()

        return data.Items
      }
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
        TableName: TABLE_NAME
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
      console.log('*** TABLE_NAME', TABLE_NAME)
      // const result = await this.validator.validate(record, '/Record')
      const params = {
        TableName: TABLE_NAME,
        Item: this.record,
        ReturnConsumedCapacity: 'TOTAL'
      }

      console.log(JSON.stringify(params))

      await this.validator.validate(this.record, '/Record')
      await DynamoDB.put(params).promise()

      return this.record
    } catch (error) {
      if (error instanceof Array && error[0] instanceof ValidationError) {
        console.error('**** Validation error', JSON.stringify(error))
        throw new Error(error[0].message)
      } else {
        console.error('**** Unhandled error')
        throw new Error(error.message)
      }
    }
  }

  static async save (records) {
    try {
      console.log('*** TABLE_NAME', TABLE_NAME)
      const params = { RequestItems: {} }
      params.RequestItems[TABLE_NAME] = []

      // const result = await this.validator.validate(record, '/Record')
      for (let record of records) {
        console.log(record)
        await this.validator().validate(record, '/Record')
        params.RequestItems[TABLE_NAME].push({ PutRequest: { Item: record } })
      }

      console.log(JSON.stringify(params))
      return await DynamoDB.batchWrite(params).promise()

      // await DynamoDB.put({
      //   TableName: TABLE_NAME,
      //   Item: this.record,
      //   ReturnConsumedCapacity: 'TOTAL'
      // }).promise()
    } catch (error) {
      if (error instanceof Array && error[0] instanceof ValidationError) {
        console.error('**** Validation error', JSON.stringify(error))
        throw new Error(error[0].message)
      } else {
        console.error('**** Unhandled error')
        throw new Error(error.message)
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
