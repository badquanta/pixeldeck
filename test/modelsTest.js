const test = require('.')

describe('pixeldeck.models', function () {
  //afterEach(test.pixeldeck.data.base.stop)
  before(async function () { return test.pixeldeck.models.ensureAllSchemas() })
  it('should be ok', function () { test.expect(test.pixeldeck.models).to.be.ok })

  describe('.Model', function () {
    beforeEach(function () { this.Model = test.pixeldeck.models.Model })
    it('should be ok', function () { test.expect(this.Model).to.be.ok })

    it('allows me to insert', async function () {
      this.inserted = await this.Model.query().insertGraph({

      })
      return test.expect(this.inserted).to.be.ok
    })
  })

  describe('.TiledSet', function () {
    beforeEach(function () { this.TiledSet = test.pixeldeck.models.TiledSet })

    it('should be ok', function () { test.expect(this.TiledSet).to.be.ok })
    it('should let me make one', function () { test.expect(new this.TiledSet()).to.be.ok })
    it('allows me to insert one', async function () {
      this.inserted = await this.TiledSet.query().insertGraph({

      })
      return test.expect(this.inserted).to.be.ok
    })
    it('should let me find one that I made', async function () {
      const tiledSet = await this.TiledSet.query().insertGraph({
      })
      test.expect(tiledSet).to.be.ok
      const tiledSets = await this.TiledSet.query().where({

      })
      return test.expect(tiledSets.length).to.be.greaterThan(0)
    }).timeout(5000)
  })

  describe('.TiledMap', function () {
    beforeEach(function () { this.TiledMap = test.pixeldeck.models.TiledMap })
    it('should be ok', function () { test.expect(this.TiledMap).to.be.ok })

    it('should allow me to insert one', async function () {
      const inserted = await this.TiledMap.query().insertGraph({
        width: 12
      })
      return test.expect(inserted).to.be.ok
    })
  })

  describe('.TiledMapUsesSet', function () {
    beforeEach(function () { this.TiledMapUsesSet = test.pixeldeck.models.TiledMapUsesSet })
    it('should be ok', function () { test.expect(this.TiledMapUsesSet).to.be.ok })
    it('should allow me to insert one', async function () {
      const inserted = await this.TiledMapUsesSet.query().insertGraph({

      })
      return test.expect(inserted).to.be.ok
    })
  })

  describe('.TiledObject', function () {
    beforeEach(function () { this.TiledObject = test.pixeldeck.models.TiledObject })
    it('should be ok', function () { test.expect(this.TiledObject).to.be.ok })
    it('should allow me to insert one', async function () {
      const inserted = await this.TiledObject.query().insertGraph({

      })
      return test.expect(inserted).to.be.ok
    })
  })

  describe('.TiledProperties', function () {
    beforeEach(function () { this.TiledProperties = test.pixeldeck.models.TiledProperties })
    it('should be ok', function () { test.expect(this.TiledProperties).to.be.ok })
    it('can be inserted', async function () {
      const inserted = await this.TiledProperties.query().insertGraph({})
      return test.expect(inserted).to.be.ok
    })
  })

  describe('.TiledLayer', function () {
    let TiledLayer
    beforeEach(function () { TiledLayer = require('../lib/models/TiledLayer') })
    it('should be ok', function () { test.expect(TiledLayer).to.be.ok })
    it('should allow me to insert one', async function () {
      const inserted = await TiledLayer.query().insertGraph({

      })
      return test.expect(inserted).to.be.ok
    })
    it('can insert layers:', async function () {
      const inserted = await TiledLayer.query().insertGraph({
        name: 'Test With Child',
        layers: [
          { name: 'Test With Parent' }
        ]
      })
      return test.expect(inserted).to.be.ok
    })
    it('can insert with objects', async function () {
      const inserted = await TiledLayer.query().insertGraph({
        name: 'Test with Child Object',
        objects: [
          { name: 'First Child Object' }
        ]
      })
      return test.expect(inserted).to.be.ok
    })
    it('can insert with properties', async function () {
      const inserted = await TiledLayer.query().insertGraph({
        name: 'Test with Child Property',
        properties: [
          { name: 'firstProp', value: 'firstValue', type: 'firstType' }
        ]
      })
      return test.expect(inserted).to.be.ok
    })
  })

  // Todo: TiledMap.. etc
}).timeout(100000)
