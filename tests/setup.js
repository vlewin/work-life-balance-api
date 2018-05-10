module.exports = async function () {
  console.log('Set NODE_ENV')
  global.foo = 'foo'
  process.env.NODE_ENV = 'test'
};
