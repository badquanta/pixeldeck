const TiledModel = require('./TiledModel')
/**
 * Represents some cached database information about the file used to import
 * data.
 * @memberof mdl
 * @class
 * @classdesc {@link external:Objection} Representation of a `Tiled` source file
 * @extends mdl.TiledModel
 * @inheritdoc
 */
class TiledFile extends TiledModel {
  /**
   * List of directories to search for paths given to TiledFile.findResourcePathFor(path)
   * @type {Array<String>}
   */
  static get resourceSearchPaths () {
    return [process.cwd(), require('../cfg').resDir, ...require('../cfg').resDirs]
  }

  /**
   * Using TiledFile.resourceSearchPaths; return the absolute path of the file if it exists
   * within the first resourceSearchPath
   * @param {string} path
   */
  static findResourcePathFor (path, newExt = undefined) {
    let reqPath = path.slice(0)
    if (newExt) {
      while (require('path').extname(reqPath) !== '') {
        reqPath = reqPath.replace(require('path').extname(reqPath), '')
      }
      reqPath += newExt
    }
    const basePath = this.resourceSearchPaths.find((value) => {
      const testPath = require('path').join(value, reqPath)
      const result = require('fs').existsSync(testPath)
      this.dbg('findResourcePath(%o) testing %o = %o', reqPath, value, result, testPath)
      return result
    })
    if (!basePath) {
      this.dbg('no resource path found for:', reqPath)
      return undefined
    } else {
      return require('path').join(basePath, reqPath)
    }
  }

  /**
   * @type string
   * @see mdl.TiledFile.findResourcePathFor
   */
  get resourcePath () {
    return TiledFile.findResourcePathFor(this.path, '.json')
  }

  /**
   * @override
   */
  static async beforeEnsureSchema (Knex) {
    await super.beforeEnsureSchema(Knex)
    await this.ensureAllSchemas(Knex, require('./TiledSet'), require('./TiledMap'))
  }

  /**
   * @type {external:Objection.RelationalMappings}
   */
  static get relationMappings () {
    return {
      tiledMap: {
        relation: this.BelongsToOneRelation,
        get modelClass () { return require('./TiledMap') },
        join: {
          from: 'TiledFile.TileMap_uuid',
          to: 'TiledMap.uuid'
        }
      },
      tiledSet: {
        relation: this.BelongsToOneRelation,
        get modelClass () { return require('./TiledSet') },
        join: {
          from: 'TiledFile.TileSet_uuid',
          to: 'TiledSet.uuid'
        }
      }
    }
  }

  /**
   * if we can find a resourcePath, the file exists.
   * @returns {boolean}
   */
  get exists () {
    return !!this.resourcePath
  }

  /**
   * ensure we have reasonably latest stats.
   * @todo maybe rename ensure stats?
   */
  async getStat () {
    const resPath = this.resourcePath
    if (!this.lastStatAt || (this.lastStatAt.getTime() + 1000) < Date.now()) {
      if (resPath) {
        const stats = require('fs').statSync(resPath)
        await this.$setJson({
          lastStatAt: new Date(),
          atime: stats.atime,
          mtime: stats.mtime,
          ctime: stats.ctime,
          birthtime: stats.birthtime
        })
        return this
      } else {
        return undefined
      }
    } else {
      return this
    }
  }

  /**
   * @todo remove duplication between getTiledMap &  getTiledSet
   */
  async getTiledMap () {
    this.dbg('ensuring relations are loaded...')
    await this.$loadRelated('tiledMap')
    if (!this.tiledMap) {
      this.dbg('tiledMap not yet imported')
      if (this.exists) {
        this.dbg('located tiledMap resource at', this.resourcePath)
        const json = require(this.resourcePath)
        await this.$relatedQuery('tiledMap').insertGraph(json)
      } else {
        throw new Error(this.path + ' does not exist.')
      }
    }
    return this.tiledMap
  }

  /**
   *
   */
  async getTiledSet () {
    this.dbg('getTiledSet')
    await this.$loadRelated('tiledSet')
    if (!this.tiledSet) {
      this.dbg('tiledSet not yet imported')
      if (this.exists) {
        const json = require(this.resourcePath)
        await this.$relatedQuery('tiledSet').insertGraph(json)
      } else {
        throw new Error(this.path + ' does not exist.')
      }
    }
    return this.tiledSet
  }

  /**
   *
   */
  static async createSchemaOn (table) {
    super.createSchemaOn(table)
    /**
     * @name path
     * @type string
     * @memberof mdl.TiledFile
     * @instance
     **/
    table.string('path')
    // const knex = require('../data')
    // table.timestamp('IndexedAt').defaultTo(knex.fn.now())
    /**
     * Holds the time of the last stats request for this file
     * @name lastStatAt
     * @type mdl.timestamp
     * @memberof mdl.TiledFile
     * @instance
     **/
    table.timestamp('lastStatAt')
    /**
     * Holds the time of the import of map from file
     * @name importedAt
     * @type mdl.timestamp
     * @memberof mdl.TiledFile
     * @instance
     **/
    table.timestamp('importedAt')
    /**
     * Holds the corresponding stat value
     * @name ctime
     * @type mdl.timestamp
     * @memberof mdl.TiledFile
     * @instance
     **/
    table.timestamp('ctime')
    /**
     * Holds the corresponding stat value
     * @name btime
     * @type mdl.timestamp
     * @memberof mdl.TiledFile
     * @instance
     **/
    table.timestamp('btime')
    /**
     * Holds the corresponding stat value
     * @name atime
     * @type mdl.timestamp
     * @memberof mdl.TiledFile
     * @instance
     **/
    table.timestamp('atime')
    /**
     * Holds the corresponding stat value
     * @name birthtime
     * @type mdl.timestamp
     * @memberof mdl.TiledFile
     * @instance
     **/
    table.timestamp('birthtime')
    /**
     * Links us to a {@link mdl.TiledMap}
     * @name TiledMap_uuid
     * @type {mdl.primaryKey}
     * @memberof mdl.TiledFile
     * @instance
     **/
    table.integer('TileMap_uuid')
    table.foreign('TileMap_uuid').references('TileMap.uuid')
    /**
     * Links us to a {@link mdl.TiledSet}
     * @name TiledSet_uuid
     * @type mdl.primaryKey
     * @memberof mdl.TiledFile
     * @instance
     **/
    table.integer('TileSet_uuid')
    table.foreign('TileSet_uuid').references('TileSet.uuid')
  }
}

module.exports = TiledFile
TiledFile.dbg('loaded')
