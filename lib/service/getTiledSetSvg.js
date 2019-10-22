module.exports = getTiledSetSvg
/** @ignore */
const dbg = require('../dbg').extend('getTiledSetSvg')
/** @ignore */


/**
 * Handler for '/*.ts.svg'
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @memberof service
 */
async function getTiledSetSvg (req, res, next) {
  const TiledFile = require('../mdl/TiledFile')
  await TiledFile.ensureSchema()
  let tiledFile = await TiledFile.query().findOne({ path: req.path })
    .catch(console.warn)
  if (!tiledFile) {
    tiledFile = await TiledFile.query().insertGraph({ path: req.path })
  }
  const tiledSet = await tiledFile.getTiledSet()
  if (!tiledSet) {
    next('error getting the tile set.')
  }
  res.send(await tiledSet.render({ format: '.svg' }))
}
