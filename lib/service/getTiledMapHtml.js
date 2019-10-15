module.exports = [/\/(.*)\.tm\.html/, getTiledMapHtml]
/** @ignore */
const dbg = require('../dbg').extend('getTiledMapHtml')
/** @ignore */
/**
 *
 * Handler for '/*.tm.html'
 * @param {request} req
 * @param {response} res
 * @param {next} next
 * @memberof pixeldeck.service
 */
async function getTiledMapHtml (req, res, next) {
  res.locals.tileMap = models.TiledMaps.findOrLoad(req.path)
  await res.locals.tileMap.loadTiledSets()
  res.locals.embedTiledSets = true
  dbg('getTiledMapHtml', !!res.locals.tileMap)
  return res.render('tileMap/html')
}
