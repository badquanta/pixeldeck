/**
 * TiledSet
 * Uses
 */

/**
 * @extends {pixeldeck.data.Model}
 * @name {pixelmap.models.TiledSet}
 * @see {@link https://doc.mapeditor.org/en/stable/reference/json-map-format/#tileset Tiled TiledSet Docs}
 */
class TiledSet extends require('./Model') {
  /**
   * Extends Model Table Definitions.
   * @param {*} table
   */
  static async createSchemaOn (table) {
    super.createSchemaOn(table)
    table.integer('columns')
    table.integer('firstgid')
    // TODO : table.integer('grid')
    table.string('image')
    table.integer('imageheight')
    table.integer('imagewidth')
    table.integer('margin')
    table.string('name')
    // TODO : table.arraychild properties
    table.integer('spacing')
    table.integer('tilecount')
    table.string('transparentcolor')
    table.string('type')
    // TODO: table.array('wangsents')

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

  /**
   * defines members:
   * @member {Array<pixeldeck.models.TiledMapUsesSet>} tileMapUsage
   * @member {Array<pixeldeck.models.TiledMap>} usedBy
   */
  static get relationMappings () {
    return {
      tileMapUsage: {
        relation: require('./Model').HasManyRelation,
        modelClass: 'TiledMapUsesSet',
        join: {
          from: 'TiledSet.uuid',
          to: 'TiledMapUsesSet.TiledSetUuid'
        }
      },
      usedBy: {
        relation: require('./Model').ManyToManyRelation,
        modelClass: 'TiledMap',
        join: {
          from: 'TiledSet.uuid',
          through: {
            className: 'TiledMapUsesSet',
            from: 'TiledMapUsesSet.TiledSetUuid',
            to: 'TiledMapUsesSet.TiledMapUuid'
          },
          to: 'TiledMap.uuid'
        }
      }
    }
  }
}

module.exports = TiledSet
TiledSet.dbg('loaded')
