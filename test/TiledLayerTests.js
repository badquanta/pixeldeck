describe('TiledLayer', function () {
  let TiledLayer
  after(async function () {
    return TiledLayer.dropSchema()
    await require('../lib/knex').disknex()
  })
  beforeEach(function () { TiledLayer = require('../lib/models/TiledLayer') })

  it('should be ok', function () { console.assert(TiledLayer) })

  it('should createSchema', async function () { return TiledLayer.createSchema() })

  describe('ensureSchema', function () {
    beforeEach(async function () {
      return TiledLayer.ensureSchema()
    })

    it('should insert one', async function () {
      const created = await TiledLayer.query().insertGraph({})
      return console.assert(created)
    })
    it('should insert with layers', async function () {
      const created = await TiledLayer.query()
        .insertGraph({ layers: [{ name: 'Child Layer of Layer' }] })
      return console.assert(created)
    })

    it('should insert with objects', async function () {
      await require('../lib/models/TiledObject').ensureSchema()
      const created = await TiledLayer.query().insertGraph(
        { objects: [{ name: 'Child object of layer' }] }
      )
      return console.assert(created)
    })
  })
})
