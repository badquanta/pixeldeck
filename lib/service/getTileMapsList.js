module.exports = getTileMapsList

function getTileMapsList (req, res) {
  res.locals.tileMaps = require('../data/TileMaps').findAll({})

  res.render('tileMapsList')
}