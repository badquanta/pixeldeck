describe('TiledModel', function () {
  let TiledModel
  after(async function () { await require('../lib/knex').disknex() })
  beforeEach(async function () {
    TiledModel = require('../lib/models/TiledModel')
    await TiledModel.ensureSchema()
  })
  it('should be ok', function () { console.assert(TiledModel) })

  it('allows me to insert', async function () {
    const inserted = await TiledModel.query().insertGraph({

    })
    return console.assert(inserted)
  })
})
