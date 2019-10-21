module.exports = MakeMap
const arch = require('../arch')
const mapViewFormats = MakeMap.ViewFormats = {
  '.html': arch.Path.resolve(__dirname, 'tileMap/html.pug'),
  '.svg': arch.Path.resolve(__dirname, 'tileMap/svg.pug')
}
const defaultOptions = MakeMap.options = {
  format: '.html'
}
/**
 * Render a map into HTML/SVG
 * @async
 * @function
 * @memberof cli
 * @param {mdl.TiledMap} tileMap
 * @param {object} [options=undefined]
 * @param {string} [options.format='.html']
 * @throws An error if options.format isn't specified.
 * @throws An error if mkMap.ViewFormats[options.format] isn't specified.
 * @returns {string} rendered HTML/SVG/... of data
 */
async function MakeMap (tileMap, options) {
  const pug = require('pug')
  const opts = Object.assign({ tileMap }, options, defaultOptions)
  const format = options.format
  if (!format) {
    throw new Error('options missing format')
  }
  const viewFileName = (opts.filename || ((opts.filename = mapViewFormats[format])))
  if (!viewFileName || viewFileName === '') {
    throw new Error('unknown format: ' + format)
  }
  const rendered = pug.renderFile(viewFileName, opts)
  return rendered
}
