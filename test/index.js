/**
 * test helper index
 */
const test = module.exports = {
  get request () { return require('supertest')(test.pixeldeck.index) },
  get agent () { return require('supertest').agent(test.pixeldeck.server) },

  expect: require('chai').expect,
  should: require('should'),
  get server () { return require('../lib/server') },
  get pixeldeck () { return require('../lib') }
}
