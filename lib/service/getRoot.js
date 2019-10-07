module.exports = getRoot
/**
 * Handler for root '/' request
 * @memberof pixeldeck.service
 * @param {*} req
 * @param {*} res
 */
function getRoot (req, res) {
  res.render('main')
}
