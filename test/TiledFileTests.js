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
  beforeEach(function () { TiledFile = require('../lib/models/TiledFile') })

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
      await require('../lib/models/TiledProperties').ensureSchema()
      const created = await TiledFile.query().insertGraph(
        { tiledMap: { type: 'map' } }
      )
      return console.assert(created)
    })
  })
})
