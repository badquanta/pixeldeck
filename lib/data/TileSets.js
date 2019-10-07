'use strict'
/** @ignore */
const dbg = require('../dbg').extend('data:TileSet')
/** @ignore */
const _Model = require('./_Model')
/** @ignore */
const base = require('./base')
/**
 * ORM 4 Tile Sets
 * @memberof pixeldeck.data
 */
class TileSets extends _Model {
  /** @type {number} */
  get columns () { return this.record.columns }
  /** @type {string} */
  get image () { return this.record.image }
  /** @type {number} */
  get imageheight () { return this.record.imageheight }
  /** @type {number} */
  get imagewidth () { return this.record.imagewidth }
  /** @type {number} */
  get margin () { return this.record.margin }
  /** @type {string} */
  get name () { return this.record.name }
  /** @type {number} */
  get spacing () { return this.record.spacing }
  /** @type {Array<Object>} */
  get terrains () { return this.record.terrains }
  /** @type {number} */
  get tilecount () { return this.record.tilecount }
  /** @type {number} */
  get tileheight () { return this.record.tileheight }
  /** @type {Array<Object>} */
  get tiles () { return this.record.tiles }
  /** @type {number} */
  get tilewidth () { return this.record.tilewidth }
  /** @type {string} */
  get type () { return this.record.type }
  /** @type {string} */
  get version () { return this.record.version }
}
/**
 * @type {Loki.collection}
 */
TileSets.collection = base.addCollection('TileSets', {
  indices: ['path', 'hostPath'],
  unique: ['path', 'hostPath']
})

/**
 * Give me something to load.
 * @param {*} json is pretty much just any kind of data.
 * @memberof data
 * /

 *
TileSets.list = listTileSets

TileSets.loadJson = loadJson

TileSets.jsonPathFrom = jsonPathFrom

TileSets.forPath = forPath

function TileSets (json) {
  const query = {}
  Object.keys(json).forEach((key) => {
    if (typeof json[key] !== 'object') {
      query[key] = json[key]
    }
  })
  const record = TileSets.collection.findOne(query) || TileSets.collection.insert(json)
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
      return TileSets.collection.update(record)
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

function forPath (filepath) {
  const hostPath = jsonPathFrom(filepath)
  dbg('getTilesetFrom %o = %o', filepath, hostPath)
  let record = TileSets.collection.findOne({ hostPath: hostPath })
  if (record) {
    dbg('existing tileset located...')
    return TileSets(record)
  }
  dbg('loading tileset data...')
  const json = loadJson(hostPath)
  dbg('saving tileset data...')
  return TileSets(json)
}

function listTileSets () {
  return TileSets.collection.find({}).map((item) => item.name)
}
*/
dbg('loaded')

module.exports = TileSets
