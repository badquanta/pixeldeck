const TiledModel = require('./TiledModel')
/**
 * Represents some cached database information about the file used to import
 * data.
 * @member {string} path
 * @member {timestamp} indexedAt Time of this file first being referenced.
 * @member {timestamp} lastStatAt Time of last stat call.
 * @member {timestamp} importedAt Time of last file read and importation.
 */
class TiledFile extends TiledModel {
  static async createSchemaOn (table) {
    super.createSchemaOn(table)
    table.string('path')
    //const knex = require('../data')
    //table.timestamp('IndexedAt').defaultTo(knex.fn.now())
    table.timestamp('lastStatAt')
    table.timestamp('importedAt')
    table.integer('TileMap_uuid')
    table.foreign('TileMap_uuid').references('TileMap.uuid')
    table.integer('TileSet_uuid')
    table.foreign('TileSet_uuid').references('TileSet.uuid')
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
}
module.exports = TiledFile
TiledFile.dbg('loaded')
