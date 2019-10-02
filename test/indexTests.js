const test = require('./')
describe('pixeldeck (AKA: lib/index.js)', function () {
  this.afterAll(() => {
    test.pixeldeck.evt.Stop()
  })
  function propertyWorks (name) {
    it(`has property ${name}`, function () {
      const pd = test.pixeldeck
      pd.should.have.property(name)
      pd[name].should.be.ok
    })
  }
  propertyWorks('service')
  propertyWorks('cfg')
  propertyWorks('dbg')
  propertyWorks('data')
  propertyWorks('repl')
  propertyWorks('server')

})