/* eslint-disable quotes */
const TiledModel = require('./TiledModel')
/**
 * TiledMap
 * @class
 * @see {@link https://doc.mapeditor.org/en/stable/reference/json-map-format/#map}
 * @extends mdl.TiledModel
 * @memberof mdl
 * @inheritdoc
 */
class TiledMap extends TiledModel {
  /**
   * @override
   */
  static async createSchemaOn (table) {
    super.createSchemaOn(table)
    /**
     * @name backgroundcolor
     * @type {string}
     * @memberof mdl.TiledMap
     * @instance
     **/
    table.string('backgroundcolor', 16)
    /**
     * @name height
     * @type {integer}
     * @memberof mdl.TiledMap
     * @instance
     **/
    table.integer('height')
    /**
     * @name hexsidelength
     * @type {integer}
     * @memberof mdl.TiledMap
     * @instance
     **/
    table.integer('hexsidelength')
    /**
     * @name infinite
     * @type {boolean}
     * @memberof mdl.TiledMap
     * @instance
     **/
    table.bool('infinite')
    // TODO: table.integer('layers')
    /**
     * @name nextlayerid
     * @type {integer}
     * @memberof mdl.TiledMap
     * @instance
     **/
    table.integer('nextlayerid')
    /**
     * @name nextobjectid
     * @type {integer}
     * @memberof mdl.TiledMap
     * @instance
     **/
    table.integer('nextobjectid')
    /**
     * @name orientation
     * @type {string}
     * @memberof mdl.TiledMap
     * @instance
     **/
    table.string('orientation')
    // TODO: table.array properties
    /**
     * @name renderorder
     * @type {string}
     * @memberof mdl.TiledMap
     * @instance
     **/
    table.string('renderorder')
    /**
     * @name staggeraxis
     * @type {string}
     * @memberof mdl.TiledMap
     * @instance
     **/
    table.string('staggeraxis')
    /**
     * @name staggerindex
     * @type {string}
     * @memberof mdl.TiledMap
     * @instance
     **/
    table.string('staggerindex')
    /**
     * @name tiledversion
     * @type {string}
     * @memberof mdl.TiledMap
     * @instance
     **/
    table.string('tiledversion')
    /**
     * @name tileheight
     * @type {integer}
     * @memberof mdl.TiledMap
     * @instance
     **/
    table.integer('tileheight')
    /**
     * @name tilewidth
     * @type {integer}
     * @memberof mdl.TiledMap
     * @instance
     **/
    table.integer('tilewidth')
    /**
     * @name backgroundcolor
     * @type {string}
     * @memberof mdl.TiledMap
     * @instance
     **/
    table.string('type')
    /**
     * @name version
     * @type {json}
     * @memberof mdl.TiledMap
     * @instance
     **/
    table.json('version')
    /**
     * @name width
     * @type {integer}
     * @memberof mdl.TiledMap
     * @instance
     **/
    table.integer('width')
  }

  /**
   * @override
   */
  static async beforeEnsureSchema (Knex) {
    await super.beforeEnsureSchema(Knex)
    await this.ensureAllSchemas(Knex,
      require('./TiledMapUsesSet'),
      require('./TiledLayer'),
      require('./TiledProperties'),
      require('./TiledSet')
    )
    // const names = [
    //  'TiledMapUsesSet', 'TiledLayer', 'TiledProperties', 'TiledSet'
    // ]
    // this.dbg('beforeEnsureSchema additional ensureSchema...%o', names)
    // await Promise.all(names.map(async function (name) {
    //  return require(`./${name}`).ensureSchema(Knex)
    // }))
    this.dbg('beforeEnsureSchema additional ensureSchemas complete.')
  }

  /**
   * Extend the data.Model schema.
   */
  static get jsonSchema () {
    this.dbg('get jsonSchema')
    return Object.assign({}, super.jsonSchema, {
      properties: {
        backgroundcolor: { type: 'string', description: 'Hex-formatted color (#RRGGBB or #AARRGGBB) (optional)' },
        height: { type: 'int', description: 'Number of tile rows' },
        hexsidelength: { type: 'int', description: 'Length of the side of a hex tile in pixels' },
        infinite: { type: 'bool', description: 'Whether the map has infinite dimensions' },
        //layers: { type: 'array', description: 'Array of Layers' },
        nextlayerid: { type: 'int', description: 'Auto-increments for each layer' },
        nextobjectid: { type: 'int', description: 'Auto-increments for each placed object' },
        orientation: { type: 'string', description: 'orthogonal, isometric, staggered or hexagonal' },
        properties: { type: 'array', description: 'A list of properties (name, value, type).' },
        renderorder: { type: 'string', description: 'Rendering direction (orthogonal maps only)' },
        staggeraxis: { type: 'string', description: 'x or y (staggered / hexagonal maps only)' },
        staggerindex: { type: 'string', description: 'odd or even (staggered / hexagonal maps only)' },
        tiledversion: { type: 'string', description: 'The Tiled version used to save the file' },
        tileheight: { type: 'int', description: 'Map grid height' },
        tilewidth: { type: 'int', description: 'Map grid width' },
        type: { type: 'string', description: 'map (since 1.0)' },
        version: { type: 'number', description: 'The JSON format version' },
        width: { type: 'int', description: 'Number of tile columns' }
      }
    })
  }

  /**
   *
   * defines relationships between:
   * * Has many {@link mdl.TiledMapUsesSet}
   * * Has many {@link mdl.TiledSet}
   * * Has many {@link mdl.TiledLayer}
   * * Has many {@link mdl.TiledProperties}
   * @override
   */
  static get relationMappings () {
    this.dbg('get relationMappings')
    return {
      layers: {
        relation: TiledModel.HasManyRelation,
        get modelClass () { return require('./TiledLayer') },
        join: {
          from: 'TiledMap.uuid',
          to: 'TiledLayer.TiledMapUuid'
        }
      },
      properties: {
        relation: TiledModel.HasManyRelation,
        get modelClass () { return require('./TiledProperties') },
        join: {
          from: 'TiledMap.uuid',
          to: 'TiledProperties.TiledMapUuid'
        }
      },
      tilesets: {
        relation: TiledModel.HasManyRelation,
        get modelClass () { return require('./TiledMapUsesSet') },
        join: {
          from: 'TiledMap.uuid',
          to: 'TiledMapUsesSet.TiledMapUuid'
        }
      }
    }
  }

  /**
   * @override
   */
  async preRender () {
    await this.$loadRelated("[layers.*, tilesets, properties]")
    async function preRenderAll (...args) {
      return Promise.all(args.map(a => a.preRender()))
    }
    await preRenderAll(...this.layers, ...this.tilesets)
  }
}

module.exports = TiledMap
TiledMap.dbg('loaded')
