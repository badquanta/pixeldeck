module.exports = getTilesetSvg

const dbgTs = require('./dbg').extend('getTilesetSvg')
const datauri = require('datauri')
const path = require('path')
const cfg = require('./cfg')
const fs = require('fs')
const Tileset = require('./Tileset')
let loadedImages = getTilesetSvg.loadedImages = {}
/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function getTilesetSvg (req, res, next) {
  dbgTs('rendering %o...', req.path)
  const tileset = res.locals.tileset = Tileset.forPath(req.path)



  res.locals.doctype = 'svg'
  res.locals.pretty = true
  res.type('svg')
  res.render('tileset')

  dbgTs('%o rendered.', req.path)
}