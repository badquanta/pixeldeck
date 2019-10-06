module.exports = getTileMapSvg
/** @ignore */
const dbg = require('../dbg').extend('getTileMapSvg')
/**
 * Route handler for `tm.svg` files.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function getTileMapSvg (req, res, next) {
  dbg('get tileMap', req.path)

  const TileMaps = require('../data/TileMaps')
  let tileMap = TileMaps.find({ path: req.path })
  dbg('lookup:', tileMap)
  if (!tileMap) {
    dbg('loading from json...')
    tileMap = TileMaps.readFromSync(req.path)
    dbg('json:%O', tileMap)
  } else {
    dbg('lookup success')
  }
  res.locals.tileMap = tileMap
  res.locals.doctype = 'svg'
  res.locals.pretty = true
  res.type('svg')
  res.render('tileMap/svg')
  dbg('%o rendered', req.path)
}
