module.exports = getTileSetSvg
/** @ignore */
const dbg = require('../dbg').extend('getTileSetSvg')
/** @ignore */
const TileSets = require('../data/TileSets')

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function getTileSetSvg (req, res, next) {
  dbg('rendering %o...', req.path)
  const tileSet = res.locals.tileSet = TileSets.findOrLoad(req.path)
  dbg('tileSet', !!tileSet)
  res.locals.doctype = 'svg'
  res.locals.pretty = true
  res.type('svg')
  res.render('tileSet/svg')

  dbg('%o rendered.', req.path)
}
