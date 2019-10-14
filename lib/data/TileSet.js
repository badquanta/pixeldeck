/**
 *
 */
class TileSet extends require('./Model') {
  static get collectionIndices () {
    return super.collectionIndices().append(['source'])
  }

  static get collectionUniques () {
    return super.collectionUniques().append(['source'])
  }




}

module.exports = TileSet
