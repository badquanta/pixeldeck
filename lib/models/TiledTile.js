const TiledModel = require('./TiledModel')
/**
 *
 */
class TiledTile extends TiledModel {
  static async createSchemaOn (table) {
    super.createSchemaOn(table)
    table.int('TiledSetUuid')
    table.foreign('TiledSetUuid').references('TiledSet.uuid')
    table.int('id')
    table.string('image')
    table.int('imageheight')
    table.int('imagewidth')

    table.int('objectgroupUuid')
    table.foreign('objectgroupUuid').references('TiledSet.uuid')
    table.json('terrain')
    table.string('type')
    table.double('probability')
  }

  static async beforeEnsureSchema (Knex) {
    super.beforeEnsureSchema(Knex)
    const names = [
      'TiledFrame', 'TiledLayer', 'TiledProperties'
    ]
    this.dbg('beforeEnsureSchema additional ensureSchema...%o', names)
    await Promise.all(names.map(async function (name) {
      return require(`./${name}`).ensureSchema(Knex, false)
    }))
    this.dbg('beforeEnsureSchema additional ensureSchemas complete.')
  }

  static get relationMappings () {
    return {

      animation: {
        relation: this.HasManyRelation,
        get modelClass () { return require('./TiledFrame') },
        join: {
          from: 'TiledTile.uuid',
          to: 'TiledFrame.TiledTileUuid'
        }
      },

      objectgroup: {
        relation: this.BelongsToOneRelation,
        get modelClass () { return require('./TiledLayer') },
        join: {
          from: 'TiledTile.objectgroupUuid',
          to: 'TiledLayer.uuid'
        }
      },
      properties: {
        relation: this.HasManyRelation,
        get modelClass () { return require('./TiledProperties') },
        join: {
          from: 'TiledTile.uuid',
          to: 'TiledProperties.TiledTileUuid'
        }
      }
    }
  }
}

module.exports = TiledTile
TiledTile.dbg('loaded')
