const Path = require('path')
module.exports = {
  resDir: Path.resolve(__dirname, '../res'),
  viewsDir: Path.resolve(__dirname, '../views'),
  locals: {
    cache: false,
    compileDebug: true
  }
}