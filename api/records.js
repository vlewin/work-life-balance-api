'use strict'

const uuid = require('uuid')
const AWS = require('aws-sdk')

// AWS.config.setPromisesDependency(require('bluebird'));

const dynamoDb = new AWS.DynamoDB.DocumentClient()

const validate = require('parameter-validator').validate
const ParameterValidationError = require('parameter-validator').ParameterValidationError

module.exports.create = (event, context, callback) => {
  console.log('*** EVENT:', JSON.stringify(event))

  // const params = JSON.parse(event.body);

  try {
    const params = JSON.parse(event.body)

    console.log('*** Params:', JSON.stringify(params))

    let { fullname, email, experience } = validate(params, [ 'fullname', 'email', 'experience' ])
  } catch (e) {
    if (e instanceof ParameterValidationError) {
      callback(null, {
        statusCode: 422,
        body: JSON.stringify({
          message: e.message
        })
      })

      return
    } else {
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          message: e.message
        })
      })

      return
    }
  }

  // try {
  //   const params = JSON.parse(event.body);
  //
  //   console.log('*** Params:', JSON.stringify(params))
  //
  //   let { fullname, email, experience } = validate(params, [ 'fullname', 'email', 'experience' ]);
  // } catch (error) {
  //   console.log('*** Catch error', JSON.stringify(error))
  //
  //   if (error instanceof ParameterValidationError) {
  //     console.log(error.message);
  //     // callback(new Error(error.message));
  //
  //     callback(null, {
  //       statusCode: 500,
  //       body: JSON.stringify({
  //         message: error.message
  //       })
  //     })
  //
  //     return;
  //   }
  // }

  // if (!Object.keys(requestBody).length) {
  //   console.error('Empty body error');
  //   callback(new Error('No params!'));
  //   return;
  // }
  //
  // if (typeof fullname !== 'string' || typeof email !== 'string' || typeof experience !== 'number') {
  //   console.error('Validation Failed');
  //   callback(new Error('Couldn\'t submit candidate because of validation errors.'));
  //   return;
  // }

  // const fullname = requestBody.fullname;
  // const email = requestBody.email;
  // const experience = requestBody.experience;

  submitCandidateP(candidateInfo(fullname, email, experience))
    .then(res => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: `Sucessfully submitted candidate with email ${email}`,
          candidateId: res.id
        })
      })
    })
    .catch(err => {
      console.log(err)
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          message: `Unable to submit candidate with email ${email}`
        })
      })
    })
}

const submitCandidateP = candidate => {
  console.log('Submitting candidate')
  const candidateInfo = {
    TableName: process.env.CANDIDATE_TABLE,
    Item: candidate
  }
  return dynamoDb.put(candidateInfo).promise()
    .then(res => candidate)
}

const candidateInfo = (fullname, email, experience) => {
  const timestamp = new Date().getTime()
  return {
    id: uuid.v1(),
    fullname: fullname,
    email: email,
    experience: experience,
    submittedAt: timestamp,
    updatedAt: timestamp
  }
}
