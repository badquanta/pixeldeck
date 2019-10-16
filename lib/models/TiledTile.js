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
