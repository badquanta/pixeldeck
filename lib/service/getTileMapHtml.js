module.exports = [/\/(.*)\.tm\.html/, getTileMapHtml]
/** @ignore */
const dbg = require('../dbg').extend('getTileMapHtml')
/** @ignore */
const TileMaps = require('../data/TileMaps')
/**
 *
 * @param {request} req
 * @param {response} res
 * @param {next} next
 */
function getTileMapHtml (req, res, next) {
  res.locals.tileMap = TileMaps.findOrLoad(req.path)
  dbg('getTileMapHtml', !!res.locals.tileMap)
  return res.render('tileMap/html')
}
