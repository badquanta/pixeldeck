const test = require('./')

describe('pixeldeck.data', () => {

  afterEach(test.pixeldeck.data.base.stop)
  before(async () => { await test.pixeldeck.data.createTables() })
  it('should be ok', () => { test.expect(test.pixeldeck.data).to.be.ok })

  describe('.base', () => {
    it('should be ok', () => { test.expect(test.pixeldeck.data.base).to.be.ok })
  })

  describe('.Model', () => {

    beforeEach(() => { this.Model = test.pixeldeck.data.Model })
    it('should be ok', () => { test.expect(this.Model).to.be.ok })

    it('allows me to insert', async () => {
      this.inserted = await this.Model.query().insertGraph({
        id: 1
      })
      return test.expect(this.inserted).to.be.ok
    })
  })

  describe('.TiledSet', () => {
    beforeEach(() => { this.TiledSet = test.pixeldeck.data.TiledSet })
    it('should be ok', () => { test.expect(this.TiledSet).to.be.ok })
    it('should let me make one', () => { test.expect(new this.TiledSet()).to.be.ok })
    it('allows me to insert one', async () => {
      this.inserted = await this.TiledSet.query().insertGraph({
        firstGid: 12
      })
      return test.expect(this.inserted).to.be.ok
    })
    it('should let me find one that I made', async () => {
      const tiledSet = await this.TiledSet.query().insertGraph({
        firstGid: 12
      })
      test.expect(tiledSet).to.be.ok
      const tiledSets = await this.TiledSet.query().where({
        firstGid: 12
      })
      return test.expect(tiledSets.length).to.be.greaterThan(0)
    }).timeout(5000)
  })

  // Todo: TiledMap.. etc
}).timeout(100000)

