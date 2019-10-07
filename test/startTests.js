const test = require('.')

describe('start', function () {
  it('should work', function () {
    test.pixeldeck.server.Start().should.eventually.resolve
  })
  this.afterAll(() => {
    return test.pixeldeck.server.Stop()
  })
})
