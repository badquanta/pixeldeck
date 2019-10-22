module.exports = getTiledMapSvg
/** @ignore */
const dbg = require('../dbg').extend('getTiledMapSvg')
const TiledFile = require('../mdl/TiledFile')
/**
 * Route handler for `tm.svg` files.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @memberof service
 */
async function getTiledMapSvg (req, res, next) {
  await TiledFile.ensureSchema()
  let tiledFile = await TiledFile.query().findOne({ path: req.path })
    .catch(err => {
      console.error(err)
    })
  if (!tiledFile) {
    tiledFile = await TiledFile.query().insertGraph({ path: req.path })
  }
  const tiledMap = await tiledFile.getTiledMap()
  if (!tiledMap) {
    next('error getting the tile map.')
  }
  res.send(await tiledMap.render({ format: '.svg' }))
}
