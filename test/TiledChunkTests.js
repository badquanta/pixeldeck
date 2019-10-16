/* eslint-disable quote-props */
/**
 * TiledChunk tests:
 *
 */

describe('TiledChunk', function () {
  let TiledChunk
  after(async function () {
    //TiledChunk.dropSchema()

    return require('../lib/knex').disknex()
  })
  beforeEach(function () { TiledChunk = require('../lib/models/TiledChunk') })

  it('should be ok', function () { console.assert(TiledChunk) })

  it('should createSchema', async function () { return TiledChunk.createSchema() })

  describe('ensureSchema', function () {
    beforeEach(async function () {
      return TiledChunk.ensureSchema()
    })

    it('should insert one', async function () {
      const created = await TiledChunk.query().insertGraph({})
      return console.assert(created)
    })

    it('works with chunk example', async function () {
      const ChunkExample = {
        'data': [1, 2, 1, 2, 3, 1, 3, 1, 2, 2, 3, 3, 4, 4, 4, 1],
        'height': 16,
        'width': 16,
        'x': 0,
        'y': -16
      }
      const created = await TiledChunk.query().insertGraph(ChunkExample)
      return console.assert(created)
    })
  })
})
