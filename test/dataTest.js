const test = require('./')

describe('data', function () {
  describe('base', function () {
    it('should be ok', function () {
      test.expect(test.pixeldeck.data.base).to.be.ok
    })
  })

  describe('TileMaps', function () {
    it('should be ok', function () {
      test.expect(test.pixeldeck.data.TileMaps).to.be.ok
    })

    it('should save to db', function () {
      const TileMaps = test.pixeldeck.data.TileMaps
      test.expect(TileMaps.collection.count()).to.eql(0)
      const map = new TileMaps()
      test.expect(TileMaps.collection.count()).to.eql(1)
    })
  })
})
