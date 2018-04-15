module.exports = {
  headers: () => {
    return {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
      'Access-Control-Allow-Credentials': true,
      'Content-Type': 'application/json'
    }
  }
  anotherName: () => { /* ... */ }
}
