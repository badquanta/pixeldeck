const test = require('.')

describe('start', function () {
  it ('should work', function () {
    test.pixeldeck.evt.Start().should.eventually.resolve
  })
  this.afterAll(()=>{
    return test.pixeldeck.evt.Stop()
  })
})
