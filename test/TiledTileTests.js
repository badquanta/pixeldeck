/* eslint-disable quote-props */
/**
 * TiledTile tests:
 *
 */

describe('TiledTile', function () {
  let TiledTile
  after(async function () {
    await require('../lib/knex').disknex()
  })
  beforeEach(function () { TiledTile = require('../lib/models/TiledTile') })

  it('should be ok', function () { console.assert(TiledTile) })

  it('should createSchema', async function () { return TiledTile.createSchema() })

  describe('ensureSchema', function () {
    beforeEach(async function () {
      return TiledTile.ensureSchema()
    })

    it('should insert one', async function () {
      const created = await TiledTile.query().insertGraph({})
      return console.assert(created)
    })

    it('should insert with properties', async function () {
      await require('../lib/models/TiledProperties').ensureSchema()
      const created = await TiledTile.query().insertGraph(
        { properties: [{ name: 'Child property of layer', value: 'property value of child proeprty of layer', type: 'some type' }] }
      )
      return console.assert(created)
    })

    it('should insert with terrain', async function () {
      await require('../lib/models/TiledTerrain').ensureSchema()
      const created = await TiledTile.query().insertGraph(
        { terrain: [0, 0, 0, 0] }
      )
      return console.assert(created)
    })

    it('works with example from website', async function () {
      const TileExample = [
        {
          'id': 0,
          'properties': [
            {
              'name': 'myProperty1',
              'type': 'string',
              'value': 'myProperty1_value'
            }],
          'terrain': [0, 0, 0, 0]
        },
        {
          'id': 11,
          'properties': [
            {
              'name': 'myProperty2',
              'type': 'string',
              'value': 'myProperty2_value'
            }],
          'terrain': [0, 1, 0, 1]
        },
        {
          'id': 12,
          'properties': [
            {
              'name': 'myProperty3',
              'type': 'string',
              'value': 'myProperty3_value'
            }],
          'terrain': [1, 1, 1, 1]
        }
      ]
      await require('../lib/models/TiledProperties').ensureSchema()
      await require('../lib/models/TiledObject').ensureSchema()
      const created = await TiledTile.query().insertGraph(TileExample)
      return console.assert(created)
    })
  })
})
