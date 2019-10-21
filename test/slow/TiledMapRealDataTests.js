/* eslint-disable quote-props */
/**
 * TiledMap tests:
 *
 */

describe('TiledMap', function () {
  let TiledMap
  after(async function () {
    await require('../../lib/data').disknex()
  })
  beforeEach(async function () {
    TiledMap = require('../../lib/mdl/TiledMap')
    await TiledMap.ensureSchema()
  })
  describe('with real data', function () {

    it('res/test/test1.json', async function () {
      const test1 = require('../../res/test/test1.json')

      const created = await TiledMap.query().insertGraph(test1)
      return console.assert(created)
    })

    it('res/test/test2.json', async function () {
      const test1 = require('../../res/test/test2.json')

      const created = await TiledMap.query().insertGraph(test1)
      return console.assert(created)
    })

    it('res/test/test3.json', async function () {
      const test1 = require('../../res/test/test3.json')

      const created = await TiledMap.query().insertGraph(test1)
      return console.assert(created)
    })

    it('res/test/test4.json', async function () {
      const test1 = require('../../res/test/test4.json')


      const created = await TiledMap.query().insertGraph(test1)
      return console.assert(created)
    })
  })
})
