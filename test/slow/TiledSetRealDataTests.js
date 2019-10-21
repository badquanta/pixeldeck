/* eslint-disable quote-props */
/**
 * TiledSet tests:
 *
 */

describe('TiledSet', function () {
  let TiledSet
  before(async function () {
    await require('../../lib/mdls').ensureAllSchemas()
  })
  after(async function () {
    await require('../../lib/data').disknex()
  })
  beforeEach(function () {
    TiledSet = require('../../lib/mdls/TiledSet')
  })

  describe('with real data like', function () {
    it('../../res/tilesets/lpc-terrains/terrain-v7.json', async function () {
      this.timeout(10000)
      const a = require('../../res/tilesets/lpc-terrains/terrain-v7.json')
      await require('../../lib/mdls/TiledTile').ensureSchema()
      const created = await TiledSet.query().insertGraph(a)
      return console.assert(created)
    })
    it('../../res/tilesets/lpc-terrains/terrain-map-v7.json', async function () {
      this.timeout(100000)
      const a = require('../../res/tilesets/lpc-terrains/terrain-map-v7.json')
      await require('../../lib/mdls/TiledTile').ensureSchema()
      const created = await TiledSet.query().insertGraph(a)
      return console.assert(created)
    })
    it('../../res/characters/Owlish-Guy.json', async function () {
      this.timeout(10000)
      const a = require('../../res/characters/Owlish-Guy.json')
      await require('../../lib/mdls/TiledTile').ensureSchema()
      const created = await TiledSet.query().insertGraph(a)
      return console.assert(created)
    })
  })
})
