/* eslint-disable quote-props */
/**
 * TiledTerrain tests:
 *
 */

describe('TiledTerrain', function () {
  let TiledTerrain
  after(async function () {
    await require('../lib/data').disknex()
  })
  beforeEach(function () { TiledTerrain = require('../lib/models/TiledTerrain') })

  it('should be ok', function () { console.assert(TiledTerrain) })

  it('should createSchema', async function () { return TiledTerrain.createSchema() })

  describe('ensureSchema', function () {
    beforeEach(async function () {
      return TiledTerrain.ensureSchema()
    })

    it('should insert one', async function () {
      const created = await TiledTerrain.query().insertGraph({
        name: 'inserted one name', tile: 0
      })
      return console.assert(created)
    })

    it('works with example from website', async function () {
      const TerrainExample = [
        {
          'name': 'ground',
          'tile': 0
        },
        {
          'name': 'chasm',
          'tile': 12
        },
        {
          'name': 'cliff',
          'tile': 36
        }]
      await require('../lib/models/TiledProperties').ensureSchema()
      await require('../lib/models/TiledObject').ensureSchema()
      const created = await TiledTerrain.query().insertGraph(TerrainExample)
      return console.assert(created)
    })
  })
})
