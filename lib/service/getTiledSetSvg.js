module.exports = getTiledSetSvg
/** @ignore */
const dbg = require('../dbg').extend('getTiledSetSvg')
/** @ignore */


/**
 * Handler for '/*.ts.svg'
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @memberof pixeldeck.service
 */
function getTiledSetSvg (req, res, next) {
  dbg('rendering %o...', req.path)
  const tileSet = res.locals.tileSet = require('../mdl/TiledSet').findOrImport(req.path)
  dbg('tileSet', !!tileSet)
  res.locals.doctype = 'svg'
  res.locals.pretty = true
  res.type('svg')
  res.render('tileSet/svg')

  dbg('%o rendered.', req.path)
}
