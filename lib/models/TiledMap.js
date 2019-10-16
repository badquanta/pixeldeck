const TiledModel = require('./TiledModel')
/**
 * TiledMap
 * @see {@link https://doc.mapeditor.org/en/stable/reference/json-map-format/#map}
 */
class TiledMap extends TiledModel {
  /**
   *
   */
  static async createSchemaOn (table) {
    super.createSchemaOn(table)
    table.string('backgroundcolor', 16)
    table.integer('height')
    table.integer('hexsidelength')
    table.bool('infinite')
    // TODO: table.integer('layers')
    table.integer('nextlayerid')
    table.integer('nextobjectid')
    table.string('orientation')
    // TODO: table.array properties
    table.string('renderorder')
    table.string('staggeraxis')
    table.string('staggerindex')
    table.string('tiledversion')
    table.integer('tileheight')
    table.integer('tilewidth')
    table.string('type')
    table.json('version')
    table.integer('width')
  }

  static async beforeEnsureSchema (Knex) {
    await super.beforeEnsureSchema(Knex)
    await this.ensureAllSchemas(Knex,
      require('./TiledMapUsesSet'),
      require('./TiledLayer'),
      require('./TiledProperties'),
      require('./TiledSet')
    )
    //const names = [
    //  'TiledMapUsesSet', 'TiledLayer', 'TiledProperties', 'TiledSet'
    //]
    //this.dbg('beforeEnsureSchema additional ensureSchema...%o', names)
    //await Promise.all(names.map(async function (name) {
    //  return require(`./${name}`).ensureSchema(Knex)
    //}))
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
        layers: { type: 'array', description: 'Array of Layers' },
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
      },
      tilesetsUsed: {
        relation: TiledModel.ManyToManyRelation,
        get modelClass () { return require('./TiledSet') },
        join: {
          from: 'TiledMap.uuid',
          through: {
            get modelClass () { return require('./TiledMapUsesSet') },
            from: 'TiledMapUsesSet.TiledMapUuid',
            to: 'TiledMapUsesSet.TiledSetUuid'
          },
          to: 'TiledSet.uuid'
        }
      }
    }
  }
}

module.exports = TiledMap
TiledMap.dbg('loaded')
