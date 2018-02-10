require('babel-polyfill')
const Record = require('../models/record')

module.exports = {
  index: async function (event, context, callback) {
    const response = await Record.all()
    callback(null, { statusCode: 200, body: JSON.stringify(response) })
  },

  show: async function (event, context, callback) {
    const response = await Record.find(event.pathParameters.id)
    callback(null, { statusCode: 200, body: JSON.stringify(response) })
  },

  create: async function (event, context, callback) {
    const response = await new Record(event.pathParameters).save()
    callback(null, { statusCode: 200, body: JSON.stringify(response) })
  },

  update: async function (event, context, callback) {
    // const result = await Record.save({ name: 'Huhu', description: 'haha' })
    callback(null, { statusCode: 200, body: 'result' })
  },

  destroy: async function (event, context, callback) {
    // const result = await Record.save({ name: 'Huhu', description: 'haha' })
    callback(null, { statusCode: 200, body: 'result' })
  }
}

// module.exports.index = async (event, context, callback) => {
//   const record = new Record()
//   const result = await record.save({ name: 'Huhu', description: 'haha' })
//   callback(null, { statusCode: 200, body: result })
// }
//
// module.exports.show = async (event, context, callback) => {
//   const record = new Record()
//   const result = await record.save({ name: 'Huhu', description: 'haha' })
//   callback(null, { statusCode: 200, body: result })
// }
//
// module.exports.create = async (event, context, callback) => {
//   const record = new Record()
//   const result = await record.save({ name: 'Huhu', description: 'haha' })
//   callback(null, { statusCode: 200, body: result })
// }
//
// module.exports.update = async (event, context, callback) => {
//   const record = new Record()
//   const result = await record.save({ name: 'Huhu', description: 'haha' })
//   callback(null, { statusCode: 200, body: result })
// }
//
// module.exports.destroy = async (event, context, callback) => {
//   const record = new Record()
//   const result = await record.save({ name: 'Huhu', description: 'haha' })
//   callback(null, { statusCode: 200, body: result })
// }
