const test = require('./')
describe('pixeldeck/',function(){
  this.timeout(10000)
  this.beforeAll(function(){
    return test.pixeldeck.evt.Start()
  })
  this.afterAll(function(){
    return test.pixeldeck.evt.Stop()
  })
  this.afterEach(function(){
    return test.pixeldeck.evt.Restart()
  })
  it('responds with 200',function(){
    return test.agent.get('/').expect(200)
  })
  it('can give us a tileSet',function(){
    return test.agent.get('/tilesets/lpc-terrains/terrain-map-v7.ts.svg').expect(200)
  })
  it('can give us a tilemap', function(){
    return test.agent.get('/test/test1.tm.svg').expect(200)
  })
})