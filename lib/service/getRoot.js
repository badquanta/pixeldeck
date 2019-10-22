module.exports = getRoot
/**
 * Handler for root '/' request
 * @memberof service
 * @param {*} req
 * @param {*} res
 */
function getRoot (req, res) {
  res.render('main')
}
