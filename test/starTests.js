const test = require('./')

describe('start', function () {
  it ('should work', function () {
    test.pixeldeck.start().should.eventually.resolve
  })
})
