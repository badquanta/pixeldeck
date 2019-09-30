const test = require('./')
describe('pixeldeck/',function(){
  this.timeout(10000)
  this.afterAll(function(){
    return test.pixeldeck.close()
  })
  it('responds with 200',function(){
    return test.agent.get('/').expect(200)
  })
})