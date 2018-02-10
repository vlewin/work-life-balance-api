const ValidationHelper = require('../app/helpers/validation')
const validator = new ValidationHelper()

const record = { }

async function validate () {
  try {
    const result = await validator.validate(record, '/Record')
    console.log(result)
  } catch (error) {
    console.error(error)
  }
}

validate()
