const TiledModel = require('./TiledModel')
// const TiledFile = require('TiledFile')
/**
 * {@link https://doc.mapeditor.org/en/stable/reference/json-map-format/#tileset}
 * @memberof mdl
 * @class
 * @extends mdl.TiledModel
 * @inheritdoc
 */
class TiledSet extends TiledModel {
  /**
   * Return, or load, the `source` tile image.
   */
  async getTiledImage () {
    const TiledImage = require('./TiledImage')
    await this.$loadRelated('tiledImage')
    if (!this.tiledImage) {
      await this.$setRelated(
        'tiledImage',
        await TiledImage.read(this.image)
      )
    }
    return this.tiledImage
  }

  /**
   * @override
   */
  async preRender () {
    super.preRender()
    await this.$loadRelated('[tiles.*, properties]')
  }

  /**
   * Extends Model Table Definitions.
   * @param {*} table
   */
  static async createSchemaOn (table) {
    super.createSchemaOn(table)
    /**
      * defines the length of a row
      * @type integer
      * @name columns
      * @memberof mdl.TiledSet
      * @instance
      ***********************************/
    table.integer('columns')
    /**
      *
      * @type mdl.TiledGid
      * @name firstgid
      * @memberof mdl.TiledSet
      * @instance
      ***********************************/
    table.integer('firstgid')
    /**
      *
      * @type string
      * @name grid
      * @memberof mdl.TiledSet
      * @instance
      * @todo More research into grid: https://docs.mapeditor.org/en/stable/reference/tmx-map-format/#tmx-grid
      ***********************************/
    table.string('grid')
    /**
      *
      * @type string
      * @name image
      * @memberof mdl.TiledSet
      * @instance
      ************************************/
    table.string('image')
    /**
      *
      * @type integer
      * @name imageheight
      * @memberof mdl.TiledSet
      * @instance
      ***********************************/
    table.integer('imageheight')
    /**
      *
      * @type integer
      * @name imagewidth
      * @memberof mdl.TiledSet
      * @instance
      ***********************************/
    table.integer('imagewidth')
    /**
      *
      * @type integer
      * @name margin
      * @memberof mdl.TiledSet
      * @instance
      ***********************************/
    table.integer('margin')
    /**
      *
      * @type string
      * @name name
      * @memberof mdl.TiledSet
      * @instance
      ***********************************/
    table.string('name')
    /**
      *
      * @type integer
      * @name spacing
      * @memberof mdl.TiledSet
      * @instance
      ***********************************/
    table.integer('spacing')
    /**
      *
      * @type integer
      * @name tilecount
      * @memberof mdl.TiledSet
      * @instance
      ***********************************/
    table.integer('tilecount')
    /**
      *
      * @type integer
      * @name tileheight
      * @memberof mdl.TiledSet
      * @instance
      ***********************************/
    table.integer('tileheight')
    /**
      *
      * @type string
      * @name tileoffset
      * @memberof mdl.TiledSet
      * @instance
      ***********************************/
    table.string('tileoffset') // TODO: Look more into offset: https://docs.mapeditor.org/en/stable/reference/tmx-map-format/#tmx-tileoffset
    /**
      *
      * @type integer
      * @name tilewidth
      * @memberof mdl.TiledSet
      * @instance
      ***********************************/
    table.integer('tilewidth')
    /**
      *
      * @type string
      * @name transparentcolor
      * @memberof mdl.TiledSet
      * @instance
      ***********************************/
    table.string('transparentcolor')
    /**
      *
      * @type string
      * @name type
      * @memberof mdl.TiledSet
      * @instance
      ***********************************/
    table.string('type')
    // TODO: Handle Wangsets better
    /**
      *
      * @type string
      * @name wangsets
      * @memberof mdl.TiledSet
      * @instance
      ***********************************/
    table.string('wangsets') // TODO: https://docs.mapeditor.org/en/stable/reference/json-map-format/#json-wangset
    /**
      *
      * @type string
      * @name tiledversion
      * @memberof mdl.TiledSet
      * @instance
      ***********************************/
    table.string('tiledversion')
    /**
      *
      * @type string
      * @name version
      * @memberof mdl.TiledSet
      * @instance
      ***********************************/
    table.string('version')
    /**
     * @type mdl.primaryKey
     * @name TiledImageUuid
     * @memberof mdl.TiledSet
     * @instance
     */
    table.integer('TiledImageUuid')
    table.foreign('TiledImageUuid').references('TiledImage.uuid')
  }

  /**
   * extends model SchemaProperties
   */
  static get jsonSchemaProperties () {
    return Object.assign({}, super.jsonSchemaProperties, {
      //* Field Type Description **/
      columns: { type: 'number', description: 'The number of tile columns in the tileset' },
      firstgid: { type: 'number', description: 'GID corresponding to the first tile in the set' },
      grid: { type: 'object', description: 'See<grid> (optional)' },
      image: { type: 'string', description: 'Image used for tiles in this set' },
      imagewidth: { type: 'number', description: 'Width of source image in pixels' },
      imageheight: { type: 'number', description: 'Height of source image in pixels' },
      margin: { type: 'number', description: 'Buffer between image edge and first tile (pixels)' },
      name: { type: 'string', description: 'Name given to this tileset' },
      properties: { type: 'array', description: 'A list of properties (name, value, type).' },
      spacing: { type: 'number', description: 'Spacing between adjacent tiles in image(pixels)' },
      terrains: { type: 'array', description: 'Array of Terrains (optional)' },
      tilecount: { type: 'number', description: 'The number of tiles in this tileset' },
      tileheight: { type: 'number', description: 'Maximum height of tiles in this set' },
      tileoffset: { type: 'object', description: 'See<tileoffset> (optional)' },
      tiles: { type: 'array', description: 'Array of Tiles (optional)' },
      tilewidth: { type: 'number', description: 'Maximum width of tiles in this set' },
      transparentcolor: { type: 'string', description: 'Hex- formatted color (#RRGGBB) (optional)' },
      type: { type: 'string', description: 'tileset (for tileset files, since 1.0)' },
      wangsets: { type: 'array', description: 'Array of Wang sets(since 1.1.5)' }
    })
  }

  /**
   * Returns Model's SchemaRequired <which is undefined>
   * Just as an example of how one WOULD override.
   */
  static get jsonSchemaRequired () {
    return super.jsonSchemaRequired
    // required: [
    // 'columns', 'firstgid', 'grid', 'image',
    // 'imagewidth', 'imageheight', 'margin',
    // 'name', 'properties', 'spacing', 'terrains',
    // 'tilecount', 'tileheight', 'tileoffset',
    // 'tiles', 'tilewidth', 'transparentcolor',
    // 'type', 'wangsets'
    // ],
  }

  static async beforeEnsureSchema (Knex) {
    await this.ensureAllSchemas(Knex,
      require('./TiledMapUsesSet'),
      require('./TiledTile'),
      require('./TiledProperties'),
      require('./TiledTerrain')
    )
    this.dbg('beforeEnsureSchema additional ensureSchemas complete.')
  }

  /**
   * defines members:
   */
  static get relationMappings () {
    return {
      /**
       * @type mdl.TiledImage
       * @name tiledImage
       * @memberof mdl.TiledSet
       * @instance
       */
      tiledImage: {
        relation: this.BelongsToRelation,
        get modelClass () { return require('./TiledImage') },
        join: {
          from: 'TiledSet.TiledImageUuid',
          to: 'TiledImage.uuid'
        }
      },
      /**
       * @type mdl.TiledMapUsesSet[]
       * @name tileMapUsage
       * @memberof mdl.TiledSet
       * @instance
       */
      tileMapUsage: {
        relation: this.HasManyRelation,
        get modelClass () { return require('./TiledMapUsesSet') },
        join: {
          from: 'TiledSet.uuid',
          to: 'TiledMapUsesSet.TiledSetUuid'
        }
      },
      /**
       * @type mdl.TiledMap[]
       * @name usedBy
       * @memberof mdl.TiledSet
       * @instance
       */
      usedBy: {
        relation: this.ManyToManyRelation,
        get modelClass () { return require('./TiledMap') },
        join: {
          from: 'TiledSet.uuid',
          through: {
            className: 'TiledMapUsesSet',
            from: 'TiledMapUsesSet.TiledSetUuid',
            to: 'TiledMapUsesSet.TiledMapUuid'
          },
          to: 'TiledMap.uuid'
        }
      },
      /**
       * @type mdl.TiledProperties[]
       * @name properties
       * @memberof mdl.TiledSet
       * @instance
       */
      properties: {
        relation: this.HasManyRelation,
        get modelClass () { return require('./TiledProperties') },
        join: {
          from: 'TiledSet.uuid',
          to: 'TiledProperties.TiledSetUuid'
        }
      },
      /**
       * @type mdl.TiledTerrain[]
       * @name terrains
       * @memberof mdl.TiledSet
       * @instance
       */
      terrains: {
        relation: this.HasManyRelation,
        get modelClass () { return require('./TiledTerrain') },
        join: {
          from: 'TiledSet.uuid',
          to: 'TiledTerrain.TiledSetUuid'
        }
      },
      /**
       * @type mdl.TiledTile[]
       * @name tiles
       * @memberof mdl.TiledSet
       * @instance
       */
      tiles: {
        relation: this.HasManyRelation,
        get modelClass () { return require('./TiledTile') },
        join: {
          from: 'TiledSet.uuid',
          to: 'TiledTile.TiledSetUuid'
        }
      }
    }
  }
}

module.exports = TiledSet
TiledSet.dbg('loaded')
