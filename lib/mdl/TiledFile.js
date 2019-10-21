const TiledModel = require('./TiledModel')
/**
 * Represents some cached database information about the file used to import
 * data.
 * @memberof mdl
 * @extends mdl.TiledModel
 * @property {string} path
 * @property {timestamp} lastStatAt
 * @property {timestamp} importedAt
 * @property {timestamp} atime
 * @property {timestamp} btime
 * @property {timestamp} ctime
 * @property {foreignKey} TileMap_uuid
 * @property {foreignKey} TileSet_uuid
 *
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
   * @param {*} path
   */
  static findResourcePathFor (path) {
    const basePath = this.resourceSearchPaths.find(function testEachSearchPath (value) {
      return require('fs').existsSync(require('path').join(value, path))
    })
    if (!basePath) {
      return undefined
    } else {
      return require('path').join(basePath, path)
    }
  }

  get resourcePath () {
    return TiledFile.findResourcePathFor(this.path)
  }

  static async beforeEnsureSchema (Knex) {
    await super.beforeEnsureSchema(Knex)
    await this.ensureAllSchemas(Knex, require('./TiledSet'), require('./TiledMap'))
  }

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
   *
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
   * @param {Knex.SchemaBuilder} table {@link http://knexjs.org/#Schema-Building}
   */
  static async createSchemaOn (table) {
    super.createSchemaOn(table)
    table.string('path')
    // const knex = require('../data')
    // table.timestamp('IndexedAt').defaultTo(knex.fn.now())
    table.timestamp('lastStatAt')
    table.timestamp('importedAt')
    table.timestamp('ctime')
    table.timestamp('btime')
    table.timestamp('atime')
    table.timestamp('birthtime')
    table.integer('TileMap_uuid')
    table.foreign('TileMap_uuid').references('TileMap.uuid')
    table.integer('TileSet_uuid')
    table.foreign('TileSet_uuid').references('TileSet.uuid')
  }
}

module.exports = TiledFile
TiledFile.dbg('loaded')
