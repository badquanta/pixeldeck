/* eslint-disable quote-props */
/**
 * TiledSet tests:
 *
 */

describe('TiledSet', function () {
  let TiledSet
  after(async function () {
    await require('../lib/data').disknex()
  })
  beforeEach(function () { TiledSet = require('../lib/models/TiledSet') })

  it('should be ok', function () { console.assert(TiledSet) })

  it('should createSchema', async function () { return TiledSet.createSchema() })

  describe('ensureSchema', function () {
    beforeEach(async function () {
      return TiledSet.ensureSchema()
    })

    it('should insert one', async function () {
      const created = await TiledSet.query().insertGraph({})
      return console.assert(created)
    })

    it('should insert with properties', async function () {
      await require('../lib/models/TiledProperties').ensureSchema()
      const created = await TiledSet.query().insertGraph(
        { properties: [{ name: 'Child property of layer', value: 'property value of child proeprty of layer', type: 'some type' }] }
      )
      return console.assert(created)
    })

    it('should insert with terrains', async function () {
      await require('../lib/models/TiledTerrain').ensureSchema()
      const created = await TiledSet.query().insertGraph(
        { terrains: [{ name: 'Child property of layer' }] }
      )
      return console.assert(created)
    })

    it('works with example from website', async function () {
      const SetExample = {
        'columns': 19,
        'firstgid': 1,
        'image': '..\/image\/fishbaddie_parts.png',
        'imageheight': 480,
        'imagewidth': 640,
        'margin': 3,
        'name': '',
        'properties': [
          {
            'name': 'myProperty1',
            'type': 'string',
            'value': 'myProperty1_value'
          }],
        'spacing': 1,
        'tilecount': 266,
        'tileheight': 32,
        'tilewidth': 32
      }
      await require('../lib/models/TiledProperties').ensureSchema()
      await require('../lib/models/TiledObject').ensureSchema()
      const created = await TiledSet.query().insertGraph(SetExample)
      return console.assert(created)
    })
  })
})
