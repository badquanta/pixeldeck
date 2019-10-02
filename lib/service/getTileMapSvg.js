module.exports = getTileMapSvg
const path = require('path')
const dbg = require('../dbg').extend('getTileMapSvg')
const cfg = require('../cfg')
/**
 * Route handler for `tm.svg` files.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function getTileMapSvg (req, res, next) {
  dbg('get tileMap', req.path)
  let inputPath = path.join(cfg.resDir, req.path.replace('.tm.svg', '.json'))
  if (require.cache[inputPath]) {
    dbg('unloaded previously loaded input data...')
    delete require.cache[inputPath]
  }
  try {
    res.locals = require(inputPath)
  } catch (e) {
    next(e)
  }
  res.locals.doctype = 'svg'
  res.locals.pretty = true
  res.locals.json = JSON.stringify(res.locals)
  res.type('svg')
  res.render('tileMap')
  dbg('%o rendered', req.path)
}