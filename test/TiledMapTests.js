/* eslint-disable quote-props */
/**
 * TiledMap tests:
 *
 */

describe('TiledMap', function () {
  let TiledMap
  after(async function () {
    await require('../lib/knex').disknex()
  })
  beforeEach(function () { TiledMap = require('../lib/models/TiledMap') })

  it('should be ok', function () { console.assert(TiledMap) })

  it('should createSchema', async function () { return TiledMap.createSchema() })

  describe('ensureSchema', function () {
    beforeEach(async function () {
      return TiledMap.ensureSchema()
    })

    it('should insert one', async function () {
      const created = await TiledMap.query().insertGraph({})
      return console.assert(created)
    })

    it('should insert with layers', async function () {
      const created = await TiledMap.query()
        .insertGraph({ layers: [{ name: 'Child Layer of Layer' }] })
      return console.assert(created)
    })

    it('should insert with properties', async function () {
      await require('../lib/models/TiledProperties').ensureSchema()
      const created = await TiledMap.query().insertGraph(
        { properties: [{ name: 'Child property of layer', value: 'property value of child proeprty of layer', type: 'some type' }] }
      )
      return console.assert(created)
    })

    it('works with example from website', async function () {
      const MapExample = {
        'backgroundcolor': '#656667',
        'height': 4,
        'layers': [],
        'nextobjectid': 1,
        'orientation': 'orthogonal',
        'properties': [
          {
            'name': 'mapProperty1',
            'type': 'one',
            'value': 'string'
          },
          {
            'name': 'mapProperty2',
            'type': 'two',
            'value': 'string'
          }],
        'renderorder': 'right-down',
        'tileheight': 32,
        'tilesets': [],
        'tilewidth': 32,
        'version': 1,
        'tiledversion': '1.0.3',
        'width': 4
      }
      await require('../lib/models/TiledProperties').ensureSchema()
      await require('../lib/models/TiledObject').ensureSchema()
      const created = await TiledMap.query().insertGraph(MapExample)
      return console.assert(created)
    })
  })
})
