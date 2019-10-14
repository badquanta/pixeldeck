
const data = require('../../data')
const dbg = data.dbg.extend('TileMap')
/**
 * TileMap
 * @see {@link https://doc.mapeditor.org/en/stable/reference/json-map-format/#map}
 */
class TileMap extends data.Model {
  /**
   * Extend the data.Model schema.
   */
  static get jsonSchema () {
    return Object.assign({}, super.jsonSchema(), {
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
    return {
      tilesetUsed: {
        relation: data.Model.HasManyRelation,
        modelClass: 'TileMapTileSet',
        join: {
          from: 'TileMap.uuid',
          to: 'TileMapUsesTileSet.TileMapUuid'
        }
      },
      tilesets: {
        relation: data.Model.ManyToManyRelation,
        modelClass: 'TileSet',
        join: {
          from: 'TileMap.uuid',
          through: {
            modelClass: 'TileMapUsesTileSet',
            from: 'TileMapUsesTileSet.TileMapUuid',
            to: 'TileMapUsesTileSet.TileSetUuid'
          },
          to: 'TileSet.uuid'
        }
      }
    }
  }
}

module.exports = TileMap
dbg('loaded')
