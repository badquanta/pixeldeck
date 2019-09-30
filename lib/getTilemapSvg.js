module.exports = getTilemapSvg
const path = require('path')
const dbg = require('./dbg').extend('getTilemapSvg')
const cfg = require('./cfg')
function getTilemapSvg (req, res, next) {
  dbg('get tilemap', req.path)
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
  res.render('tilemap')
  dbg('%o rendered', req.path)
}