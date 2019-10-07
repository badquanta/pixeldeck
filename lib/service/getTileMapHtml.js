module.exports = [/\/(.*)\.tm\.html/, getTileMapHtml]
/** @ignore */
const dbg = require('../dbg').extend('getTileMapHtml')
/** @ignore */
const data = require('../data')
/**
 *
 * Handler for '/*.tm.html'
 * @param {request} req
 * @param {response} res
 * @param {next} next
 * @memberof pixeldeck.service
 */
function getTileMapHtml (req, res, next) {
  res.locals.tileMap = data.TileMaps.findOrLoad(req.path)
  dbg('getTileMapHtml', !!res.locals.tileMap)
  return res.render('tileMap/html')
}
