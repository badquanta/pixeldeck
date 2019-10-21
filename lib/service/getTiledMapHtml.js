module.exports = [/\/(.*)\.tm\.html/, getTiledMapHtml]
/** @ignore */
const dbg = require('../dbg').extend('getTiledMapHtml')
const TiledFile = require('../mdl/TiledFile')
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
  //const TiledMap = require('../../lib/mdl/TiledMap')
  await TiledFile.ensureSchema()
  let file = await TiledFile.query().findOne({ path: req.path }).catch(err => console.error(err))
  if (!file) {
    file = await TiledFile.query().insertGraph({ path: req.path })
  }
  const tiledMap = await file.getTiledMap()
  if (!tiledMap) {
    next('error getting the tile map.')
  }
  res.locals.tiledMap = tiledMap
  await res.locals.tileMap.loadTiledSets()
  res.locals.embedTiledSets = true
  dbg('getTiledMapHtml', !!res.locals.tileMap)
  return res.render('tileMap/html')
}
