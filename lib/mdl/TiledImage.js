const TiledModel = require('./TiledModel')
/**
 * used for image processing
 * @external jimp
 * @see https://www.npmjs.com/package/jimp
 */
const jimp = require('jimp')
/**
 * @memberof mdl
 * @class
 * @extends mdl.TiledModel
 * @inheritdoc
 */
class TiledImage extends TiledModel {
  /**
   * @override
   */
  static async createSchemaOn (table) {
    super.createSchemaOn(table)
    /**
     * store binary pixel data...
     * @type binary
     * @name pixels
     * @memberof mdl.TiledImage
     * @instance
     */
    table.binary('pixels')
    /**
     * @type integer
     * @name width
     * @memberof mdl.TiledImage
     * @instance
     */
    table.integer('width')
    /**
     * @type integer
     * @name height
     * @memberof mdl.TiledImage
     * @instance
     */
    table.integer('height')
  }

  /**
   * read an image file into the database
   */
  static async read (path) {
    const img = await jimp.readAsync(path)
    const pixels = await img.getBufferAsync(jimp.AUTO)
    const tiledImage = await TiledImage.query().insert({
      pixels: pixels,
      width: img.bitmap.width,
      height: img.bitmap.height
    })
    return tiledImage
  }
}
module.exports = TiledImage
TiledImage.dbg('loaded')
