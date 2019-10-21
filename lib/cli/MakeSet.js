/** @external */
const Path = require('path')
/** @external */
const fs = require('fs')

/**
 * @memberof cli
 * @class
 */
class MakeSet extends require('./Cmd') {
  /**
   * @override
   */
  constructor () {
    super(...arguments)
    this.option('-f, --format <type>', 'Define what format to generate.')
  }

  /**
   * @override
   */
  async main () {
    await super.main()
    const inputFile = this.args.shift()
    const outputFile = this.args.shift()
    let outputFormat = Path.extname(outputFile).slice(1)
    if (!outputFormat || (outputFormat === '')) {
      outputFormat = this.format
    }
    const tileSetViewPath = tileSetViewPaths[outputFormat]
    if (!tileSetViewPath) {
      throw new Error('Unknown format type "' + outputFormat + '"')
    }
    const setJson = JSON.parse(fs.readFileSync(inputFile, 'utf8'))
    setJson.path = inputFile
    const tileSet = new TiledMaps(setJson)
    await tileSet.getTileDataUrls()

    const rendered = pug.renderFile(tileSetViewPath, {
      filename: tileSetViewPath,
      basedir: viewBasePath,
      tileSet,
      embedTiles: true
    })

    if (outputFile) {
      fs.writeFileSync(outputFile, rendered)
    } else {
      console.log(rendered)
    }
    return require('../lib/data').disknex()
  }
}
module.exports = MakeSet
MakeSet.dbg('loaded')
