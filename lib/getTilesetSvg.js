module.exports = getTilesetSvg

const dbgTs = require('./dbg').extend('tileset')
const datauri = require('datauri')
const path = require('path')
const cfg = require('./cfg')
const fs = require('fs')
const Tileset = require('./Tileset')
let loadedImages = getTilesetSvg.loadedImages = {}
function getTilesetSvg (req, res, next) {
  dbgTs('rendering %o...', req.path)
  let inputPath = path.join(cfg.resDir, req.path.replace('.ts.svg', '.json'))
  if (fs.existsSync(inputPath)) {
    const json = fs.readFileSync(inputPath)
    //dbg('read json file: %o',json)
    const data = JSON.parse(json)
    //dbg('parsed json %o', data)
    Object.assign(res.locals, data, { json, data })
  } else {
    return next('unable to load tileset')
  }
  dbgTs('locals:', res.locals.image)
  const tsImgPath = path.join(path.dirname(inputPath), res.locals.image)
  if (!loadedImages[tsImgPath]) {
    dbgTs('loading tileset image into data uri')
    loadedImages[tsImgPath] = new datauri(tsImgPath)
  }
  res.locals.image = loadedImages[tsImgPath].content
  Tileset(res.locals)
  res.locals.doctype = 'svg'
  res.locals.pretty = true
  res.type('svg')
  res.render('tileset')

  dbgTs('%o rendered.', req.path)
}