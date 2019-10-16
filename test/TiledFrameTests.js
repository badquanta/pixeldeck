/* eslint-disable quote-props */
/**
 * TiledFrame tests:
 *
 */

describe('TiledFrame', function () {
  let TiledFrame
  after(async function () {
    await require('../lib/knex').disknex()
  })
  beforeEach(function () { TiledFrame = require('../lib/models/TiledFrame') })

  it('should be ok', function () { console.assert(TiledFrame) })

  it('should createSchema', async function () { return TiledFrame.createSchema() })

  describe('ensureSchema', function () {
    beforeEach(async function () {
      return TiledFrame.ensureSchema()
    })

    it('should insert one', async function () {
      const created = await TiledFrame.query().insertGraph({
        duration: 1000, tileid: 100
      })
      return console.assert(created)
    })
  })
})
