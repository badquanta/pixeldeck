/* eslint-disable quote-props */
/**
 * TiledFile tests:
 *
 */

describe('TiledFile', function () {
  let TiledFile
  after(async function () {
    await require('../lib/data').disknex()
  })
  beforeEach(function () { TiledFile = this.TiledFile = require('../lib/mdl/TiledFile') })

  it('should be ok', function () { console.assert(TiledFile) })

  it('should createSchema', async function () { return TiledFile.createSchema() })

  describe('ensureSchema', function () {
    beforeEach(async function () {
      return TiledFile.ensureSchema()
    })

    it('should insert one', async function () {
      const created = await TiledFile.query().insertGraph({})
      return console.assert(created)
    })

    it('should insert with a map', async function () {
      await require('../lib/mdl/TiledProperties').ensureSchema()
      const created = await TiledFile.query().insertGraph(
        { tiledMap: { type: 'map' } }
      )
      return console.assert(created)
    })

    it('should be able to getTiledMap', async function () {
      const created = await TiledFile.query().insertGraph(
        { path: 'res/test/test1.json' }
      )
      const tiledMap = await created.getTiledMap()
      console.assert(tiledMap)
      return console.assert(created)
    })

    it('can stat', async function () {
      const created = await TiledFile.query().insertGraph(
        { path: 'res/test/test1.json' }
      )
      console.assert(!created.lastStatAt)
      await created.getStat()
      console.assert(created.lastStatAt)
    })
  })
})
