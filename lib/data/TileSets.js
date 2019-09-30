module.exports = Tileset
Tileset.list = listTilesets
Tileset.loadJson = loadJson
Tileset.jsonPathFrom = jsonPathFrom
Tileset.forPath = getTilesetFrom
const dbg = require('../dbg').extend('Tileset')
const db = require('./db')
Tileset.collection = db.addCollection('tilesets', {
  indices: ['hostPath'],
  unique: ['hostPath']
})

/**
 * Give me something to load.
 * @param {*} json is pretty much just any kind of data.
 */
function Tileset (json) {
  const query = {}
  Object.keys(json).forEach((key) => {
    if (typeof json[key] !== 'object') {
      query[key] = json[key]
    }
  })
  const record = Tileset.collection.findOne(query) || Tileset.collection.insert(json)
  let imageDataUrl;
  const dbgg = dbg.extend(record.name)
  const tileset = {
    get record () { return record },
    get columns () { return record.columns },
    get image () { return record.image },
    get imageheight () { return record.imageheight },
    get imagewidth () { return record.imagewidth },
    get margin () { return record.margin },
    get name () { return record.name },
    get spacing () { return record.spacing },
    get terrains () { return record.terrains },
    get tilecount () { return record.tilecount },
    get tiledversion () { return record.tiledversion },
    get tileheight () { return record.tileheight },
    get tilewidth () { return record.tilewidth },
    get tiles () { return record.tiles },
    get tilewidth () { return record.tilewidth },
    get type () { return record.type },
    get version () { return record.version },
    get imageHostPath () { return Path.join(Path.dirname(record.hostPath), record.image) },
    get imageDataUrl () {

      if (!record.imageDataUrl) {
        dbgg('loading tileset image into data uri from %o', tileset.imageHostPath)
        const datauri = require('datauri')
        record.imageDataUrl = (new datauri(tileset.imageHostPath)).content
        tileset.update()
      } else {
        dbgg('image data already loaded...')
      }
      return record.imageDataUrl
    },
    update(values={}){
      Object.assign(record,values)
      return Tileset.collection.update(record)
    }
  }
  return tileset
}

const Path = require('path')
const cfg = require('../cfg')
const Fs = require('fs')
function resourcePathFrom (filepath) {
  let localpath = filepath
  while (Path.extname(localpath) != '') {
    localpath = localpath.replace(Path.extname(localpath), '')
  }
  if (!localpath.startsWith(cfg.resDir)) localpath = Path.join(cfg.resDir, localpath)
  return localpath
}

function jsonPathFrom (filepath) {
  return resourcePathFrom(filepath) + '.json'
}

function loadJson (filepath) {
  //TODO: Better way of handling extenctions// move away from .x.y.z
  let hostPath = jsonPathFrom(filepath)
  if (Fs.existsSync(hostPath)) {
    const json = Fs.readFileSync(hostPath)
    const data = JSON.parse(json)
    return Object.assign({ hostPath }, data)
  } else {
    throw new Error(`No such json file: ${hostPath}`)
  }
}

function getTilesetFrom (filepath) {
  const hostPath = jsonPathFrom(filepath)
  dbg('getTilesetFrom %o = %o', filepath, hostPath)
  let record = Tileset.collection.findOne({ hostPath: hostPath })
  if (record) {
    dbg('existing tileset located...')
    return Tileset(record)
  }
  dbg('loading tileset data...')
  const json = loadJson(hostPath)
  dbg('saving tileset data...')
  return Tileset(json)
}

function listTilesets () {
  return Tileset.collection.find({}).map((item) => item.name)
}
dbg('loaded')