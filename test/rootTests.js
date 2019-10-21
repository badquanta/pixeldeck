const supertest = require('supertest')

describe('pixeldeck/', function () {
  const server = require('../lib/server')
  // const data = require('../lib/data')
  this.timeout(10000)
  this.beforeAll(async function () {
    this.agent = supertest.agent(server)
    return server.Start()
  })
  this.afterAll(function () {
    return server.Stop()
  })
  this.afterEach(function () {
    return server.Restart()
  })
  it('responds with 200', function () {
    return this.agent.get('/').expect(200)
  })
  it('can give us a tileSet', function () {
    return this.agent.get('/tilesets/lpc-terrains/terrain-map-v7.ts.svg').expect(200)
  })
  it('can give us a tilemap svg', function () {
    return this.agent.get('/test/test1.tm.svg').expect(200)
  })

  it('can give us a tilemap html', function () {
    return this.agent.get('/test/test1.tm.html').expect(200)
  })
})
