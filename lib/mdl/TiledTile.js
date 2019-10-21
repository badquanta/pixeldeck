const TiledModel = require('./TiledModel')
/**
 * @memberof mdl
 * @class
 * @extends mdl.TiledModel
 * @inheritdoc
 */
class TiledTile extends TiledModel {
  static async createSchemaOn (table) {
    super.createSchemaOn(table)
    /**
     * links this to a particular set
     * @type foreignKey
     * @name TiledSetUuid
     * @memberof mdl.TiledTile
     * @instance
     */
    table.int('TiledSetUuid')
    table.foreign('TiledSetUuid').references('TiledSet.uuid')
    /**
     * unique id with a {@link mdl.TiledSet}
     * @type integer
     * @name id
     * @memberof mdl.TiledTile
     * @instance
     */
    table.int('id')
    /**
     * @type {string}
     * @name image
     * @memberof mdl.TiledTile
     * @instance
     */
    table.string('image')
    /**
     * height of image specified in {@link mdl.TiledSet~image}
     * @type integer
     * @name imageheight
     * @memberof mdl.TiledTile
     * @instance
     */
    table.int('imageheight')
    /**
     * @name imagewidth
     * @memberof mdl.TiledTile
     * @instance
     */
    table.int('imagewidth')
    /**
     * @name objectgroupUuid
     * @memberof mdl.TiledTile
     * @instance
     */
    table.int('objectgroupUuid')
    table.foreign('objectgroupUuid').references('TiledSet.uuid')
    /**
     * @name terrain
     * @memberof mdl.TiledTile
     * @instance
     */
    table.json('terrain')
    /**
     * @name type
     * @memberof mdl.TiledTile
     * @instance
     */
    table.string('type')
    /**
     * @name probability
     * @memberof mdl.TiledTile
     * @instance
     */
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
