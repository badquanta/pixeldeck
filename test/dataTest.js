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

  describe('TileSets', function () {
    it('works', function () {
      const TileSets = test.pixeldeck.data.TileSets
      const set = TileSets.findOrLoad('/tilesets/lpc-terrains/terrain-v7.json')
      test.expect(set).to.be.ok;
      [
        'columns', 'image', 'imageheight',
        'imagewidth', 'margin', 'name',
        'spacing', 'terrains', 'tilecount',
        'tileheight', 'tiles', 'type',
        'version'
      ].forEach((key) => {
        test.expect(set[key]).to.not.be.undefined
      })
    })

    it('should save to db', function () {

      const TileSets = test.pixeldeck.data.TileSets
      test.expect(TileSets.collection.count()).to.eql(0)
      const set = new TileSets({ path: '/one/two/three' })
      test.expect(TileSets.collection.count()).to.eql(1)
      const set2 = new TileSets({ path: '/one/two/three' })
      test.expect(TileSets.collection.count()).to.eql(1)
      test.expect(set).to.eql(set2)
      const set3 = new TileSets({ path: '/one/two/four' })
      test.expect(TileSets.collection.count()).to.eql(2)
      test.expect(set3.type).to.be.undefined
    })
  })
})
