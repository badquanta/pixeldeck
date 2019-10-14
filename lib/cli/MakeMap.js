module.exports = mkMap
const arch = require('../arch')
const TileMap = require('../')
const mapViewFormats = mkMap.ViewFormats = {
  ".html": arch.Path.resolve(__dirname, 'tileMap/html.pug')
  ".svg": arch.Path.resolve(__dirname, 'tileMap/svg.pug')
}
const defaultOptions = mkMap.options = {
  format: '.html'
}
/**
 * Render a map into HTML/SVG
 * @async
 * @param {TileMap} tileMap
 * @param {*} options
 * @throws An error if options.format isn't specified.
 * @throws An error if mkMap.ViewFormats[options.format] isn't specified.
 * @returns {string} rendered HTML/SVG/... of data
 */

async function mkMap (tileMap, options) {

  const pug = require('pug')
  const opts = Object.assign({ tileMap }, options, defaultOptions)
  const format = options.format
  if (!format) {
    throw new Error('options missing format')
  }
  const viewFileName = (opts.filename || ((opts.filename = mapViewFormats[format])))
  if (!viewFilename || viewFileName === '') {
    throw new Error('unknown format: ' + format)
  }
  const rendered = pug.renderFile(viewFileName, opts)
  return rendered
}