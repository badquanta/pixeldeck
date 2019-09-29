module.exports = Tileset
const db = require('./db')
const tilesets = Tileset.db = db.addCollection('tilesets')
function Tileset (obj) {
  const ts = tilesets.findOne({ '$loki': obj['$loki'] }) || tilesets.insert(obj)
  return {
    get ts () { return ts }
  }
}