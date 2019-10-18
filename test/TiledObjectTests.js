/* eslint-disable quote-props */
/**
 * TiledObject tests:
 *
 */

describe('TiledObject', function () {
  let TiledObject
  after(async function () {
    await require('../lib/data').disknex()
  })
  beforeEach(function () { TiledObject = require('../lib/models/TiledObject') })

  it('should be ok', function () { console.assert(TiledObject) })

  it('should createSchema', async function () { return TiledObject.createSchema() })

  describe('ensureSchema', function () {
    beforeEach(async function () {
      return TiledObject.ensureSchema()
    })

    it('should insert one', async function () {
      const created = await TiledObject.query().insertGraph({})
      return console.assert(created)
    })

    it('should insert with properties', async function () {
      await require('../lib/models/TiledProperties').ensureSchema()
      const created = await TiledObject.query().insertGraph(
        { properties: [{ name: 'Child property of layer', value: 'property value of child proeprty of layer', type: 'some type' }] }
      )
      return console.assert(created)
    })

    it('works with Object Example from website', async function () {
      const ObjectExample = {
        'gid': 5,
        'height': 0,
        'id': 1,
        'name': 'villager',
        'properties': [
          {
            'name': 'hp',
            'type': 'int',
            'value': 12
          }],
        'rotation': 0,
        'type': 'npc',
        'visible': true,
        'width': 0,
        'x': 32,
        'y': 32
      }
      await require('../lib/models/TiledProperties').ensureSchema()
      await require('../lib/models/TiledObject').ensureSchema()
      const created = await TiledObject.query().insertGraph(ObjectExample)
      return console.assert(created)
    })

    it('works with Ellipse Example from website', async function () {
      const EllipseExample = {
        'ellipse': true,
        'height': 152,
        'id': 13,
        'name': '',
        'rotation': 0,
        'type': '',
        'visible': true,
        'width': 248,
        'x': 560,
        'y': 808
      }
      await require('../lib/models/TiledProperties').ensureSchema()
      await require('../lib/models/TiledObject').ensureSchema()
      const created = await TiledObject.query().insertGraph(EllipseExample)
      return console.assert(created)
    })
    it('works with Point Example from website', async function () {
      const PointExample = {
        'point': true,
        'height': 0,
        'id': 20,
        'name': '',
        'rotation': 0,
        'type': '',
        'visible': true,
        'width': 0,
        'x': 220,
        'y': 350
      }
      await require('../lib/models/TiledProperties').ensureSchema()
      await require('../lib/models/TiledObject').ensureSchema()
      const created = await TiledObject.query().insertGraph(PointExample)
      return console.assert(created)
    })
    it('works with Rectangle Example from website', async function () {
      const RectangleExample = {
        'height': 184,
        'id': 14,
        'name': '',
        'rotation': 0,
        'type': '',
        'visible': true,
        'width': 368,
        'x': 576,
        'y': 584
      }

      const created = await TiledObject.query().insertGraph(RectangleExample)
      return console.assert(created)
    })
    it('works with Polygon Example from website', async function () {
      const PolygonExample = {
        'height': 0,
        'id': 15,
        'name': '',
        'polygon': [
          {
            'x': 0,
            'y': 0
          },
          {
            'x': 152,
            'y': 88
          },
          {
            'x': 136,
            'y': -128
          },
          {
            'x': 80,
            'y': -280
          },
          {
            'x': 16,
            'y': -288
          }],
        'rotation': 0,
        'type': '',
        'visible': true,
        'width': 0,
        'x': -176,
        'y': 432
      }
      await require('../lib/models/TiledPoint').ensureSchema()
      const created = await TiledObject.query().insertGraph(PolygonExample)
      return console.assert(created)
    })
    it('works with Polyline Example from website', async function () {
      const PolylineExample = {
        'height': 0,
        'id': 16,
        'name': '',
        'polyline': [
          {
            'x': 0,
            'y': 0
          },
          {
            'x': 248,
            'y': -32
          },
          {
            'x': 376,
            'y': 72
          },
          {
            'x': 544,
            'y': 288
          },
          {
            'x': 656,
            'y': 120
          },
          {
            'x': 512,
            'y': 0
          }],
        'rotation': 0,
        'type': '',
        'visible': true,
        'width': 0,
        'x': 240,
        'y': 88
      }

      await require('../lib/models/TiledPoint').ensureSchema()
      const created = await TiledObject.query().insertGraph(PolylineExample)
      return console.assert(created)
    })
    it('works with Text Example from website', async function () {
      const TextExample = {
        'height': 19,
        'id': 15,
        'name': '',
        'text':
        {
          'text': 'Hello World',
          'wrap': true
        },
        'rotation': 0,
        'type': '',
        'visible': true,
        'width': 248,
        'x': 48,
        'y': 136
      }

      await require('../lib/models/TiledPoint').ensureSchema()
      const created = await TiledObject.query().insertGraph(TextExample)
      return console.assert(created)
    })
  })
})
