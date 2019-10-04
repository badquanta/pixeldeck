module.exports = [/\/(.*)\.tm\.html/, getTileMapHtml]
const dbg = require('../dbg').extend('getTileMapHtml')
function getTileMapHtml(req,res,next){
  const tileMapPath = res.locals.tileMapPath = req.path.replace('.html','.svg')
  dbg('getTileMapHtml', tileMapPath)
  return res.render('tileMapHtml')
}