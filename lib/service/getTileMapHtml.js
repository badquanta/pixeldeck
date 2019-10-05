module.exports = [/\/(.*)\.tm\.html/, getTileMapHtml]
const dbg = require('../dbg').extend('getTileMapHtml')
const TileMaps = require('../data/TileMaps')
function getTileMapHtml (req, res, next) {
  const tileMapPath = res.locals.tileMapPath = req.path.replace('.html', '.svg')
  res.locals.tileMap = TileMaps.findOrLoad(req.path)
  dbg('getTileMapHtml', !!res.locals.tileMap)
  return res.render('tileMap/html')
}