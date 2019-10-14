'use strict'
/** @ignore */
const dbg = require('../dbg').extend('data:TileSets')
/** @ignore */
const _Model = require('./_Model')
/** @ignore */
const base = require('./__base')
const Jimp = require('jimp')
/**
 * ORM 4 Tile Sets
 * @memberof pixeldeck.data
 */
class TileSets extends _Model {
  /** @type {number} */
  get columns () {
    return this.record.columns
  }

  /** @type {string} */
  get image () {
    return this.record.image
  }

  /** @type {number} */
  get imageheight () {
    return this.record.imageheight
  }

  /** @type {number} */
  get imagewidth () {
    return this.record.imagewidth
  }

  /** @type {number} */
  get margin () {
    return this.record.margin
  }

  /** @type {string} */
  get name () {
    return this.record.name
  }

  /** @type {number} */
  get spacing () {
    return this.record.spacing
  }

  /** @type {Array<Object>} */
  get terrains () {
    return this.record.terrains
  }

  /** @type {number} */
  get tilecount () {
    return this.record.tilecount
  }

  /** @type {number} */
  get tileheight () {
    return this.record.tileheight
  }

  /** @type {Array<Object>} */
  get tiles () {
    return this.record.tiles
  }

  /** @type {number} */
  get tilewidth () {
    return this.record.tilewidth
  }

  /** @type {string} */
  get type () {
    return this.record.type
  }

  /** @type {string} */
  get version () {
    return this.record.version
  }

  /** @type {string} */
  get path () {
    return this.record.path
  }

  /** Computed properties: */
  /** @type {string} url encoded image data. */
  get imageDataUrl () {
    const DataUri = require('datauri')

    return new DataUri(this.imageResourcePath).content
  }

  /** @type {string} path to file to read**/
  get imageResourcePath () {
    const arch = require('../arch')

    const path = arch.Path.join(arch.Path.dirname(this.path), this.image)
    return arch.getResPathFor(path)
  }

  getTileCoordsFrom (idx) {
    return [
      (idx % this.columns)*this.tilewidth,
      Math.floor(idx / this.columns)*this.tileheight
    ]
  }

  /** */
  async getTileDataUrls () {
    if (this._tileDataUrls) return Promise.resolve(this._tileDataUrls)
    dbg('reading image..')
    return Jimp.read(this.imageResourcePath).then((img) => {
      const tile = new Jimp(this.tilewidth, this.tileheight)
      dbg('Read image.')
      this._tileDataUrls = img
      const tilePixels = (new Array(this.tilecount).fill(0)).map((t, idx) => {
        tile.bitmap.data.fill(0)
        tile.blit(img, 0, 0, ...this.getTileCoordsFrom(idx), this.tilewidth, this.tileheight)
        return tile.getBase64Async('image/png')
      })
      return Promise.all(tilePixels).then((a) => {
        dbg('all tile urls encoded....')
        this._tileDataUrls = a
        return this._tileDataUrls
      })
    })
  }
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
