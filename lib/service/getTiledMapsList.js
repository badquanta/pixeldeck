module.exports = getTiledMapsList

function getTiledMapsList (req, res) {
  res.locals.tileMaps = require('../../ARCHIVES/TiledMaps').findAll({})

  res.render('tileMapsList')
}