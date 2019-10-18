/* eslint-disable quote-props */
/**
 * TiledLayer tests:
 *
 */

describe('TiledLayer', function () {
  let TiledLayer
  after(async function () {
    await require('../lib/data').disknex()
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

    it('should insert with properties', async function () {
      await require('../lib/models/TiledProperties').ensureSchema()
      const created = await TiledLayer.query().insertGraph(
        { properties: [{ name: 'Child property of layer', value: 'property value of child proeprty of layer', type: 'some type' }] }
      )
      return console.assert(created)
    })

    it('works with objectgroup example', async function () {
      const ObjLayerExample = {
        'draworder': 'topdown',
        'height': 0,
        'name': 'people',
        'objects': [],
        'opacity': 1,
        'properties': [
          {
            'name': 'layerProp1',
            'type': 'string',
            'value': 'someStringValue'
          }],
        'type': 'objectgroup',
        'visible': true,
        'width': 0,
        'x': 0,
        'y': 0
      }
      await require('../lib/models/TiledProperties').ensureSchema()
      await require('../lib/models/TiledObject').ensureSchema()
      const created = await TiledLayer.query().insertGraph(ObjLayerExample)
      return console.assert(created)
    })

    it('works with tilelayer example', async function () {
      const TilelayerExample = {
        'data': [1, 2, 1, 2, 3, 1, 3, 1, 2, 2, 3, 3, 4, 4, 4, 1],
        'height': 4,
        'name': 'ground',
        'opacity': 1,
        'properties': [
          {
            'name': 'tileLayerProp',
            'type': 'int',
            'value': 1
          }],
        'type': 'tilelayer',
        'visible': true,
        'width': 4,
        'x': 0,
        'y': 0
      }
      await require('../lib/models/TiledProperties').ensureSchema()
      await require('../lib/models/TiledObject').ensureSchema()
      const created = await TiledLayer.query().insertGraph(TilelayerExample)
      return console.assert(created)
    })
  })
})
