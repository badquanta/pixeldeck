module.exports = getTileSetSvg

const dbg = require('../dbg').extend('getTileSetSvg')
const dataUri = require('datauri')
const path = require('path')
const cfg = require('../cfg')
const fs = require('fs')
const TileSets = require('../data/TileSets')
let loadedImages = getTileSetSvg.loadedImages = {}
/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function getTileSetSvg (req, res, next) {
  dbg('rendering %o...', req.path)
  const tileset = res.locals.tileset = TileSets.forPath(req.path)



  res.locals.doctype = 'svg'
  res.locals.pretty = true
  res.type('svg')
  res.render('tileset')

  dbg('%o rendered.', req.path)
}