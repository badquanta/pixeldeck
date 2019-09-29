const Path = require('path')
const package = require('../package')
module.exports = {
  name: package.name,
  version: package.version,
  resDir: Path.resolve(__dirname, '../res'),
  viewsDir: Path.resolve(__dirname, '../views'),
  locals: {
    cache: false,
    compileDebug: true
  },
  dbName: `${package.name}.json`,
  dbOpts: {
    autoload: true,
    autosave: true,
    pretty: true
  }
}