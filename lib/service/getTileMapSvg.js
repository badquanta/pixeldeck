module.exports = getTileMapSvg
/** @ignore */
const dbg = require('../dbg').extend('getTileMapSvg')
const data = require('../data')
/**
 * Route handler for `tm.svg` files.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @memberof pixeldeck.service
 */
function getTileMapSvg (req, res, next) {
  dbg('get tileMap', req.path)

  let tileMap = data.TileMaps.findOrLoad(req.path)

  res.locals.tileMap = tileMap
  res.locals.doctype = 'svg'
  res.locals.pretty = true
  res.type('svg')
  res.render('tileMap/svg')
  dbg('%o rendered', req.path)
}
