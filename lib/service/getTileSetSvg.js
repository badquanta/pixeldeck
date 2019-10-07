module.exports = getTileSetSvg
/** @ignore */
const dbg = require('../dbg').extend('getTileSetSvg')
/** @ignore */
const data = require('../data')

/**
 * Handler for '/*.ts.svg'
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @memberof pixeldeck.service
 */
function getTileSetSvg (req, res, next) {
  dbg('rendering %o...', req.path)
  const tileSet = res.locals.tileSet = data.TileSets.findOrLoad(req.path)
  dbg('tileSet', !!tileSet)
  res.locals.doctype = 'svg'
  res.locals.pretty = true
  res.type('svg')
  res.render('tileSet/svg')

  dbg('%o rendered.', req.path)
}
