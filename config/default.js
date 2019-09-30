const Path = require('path')
const package = require('../package')
const defs = module.exports = {
  name: package.name,
  version: package.version,
  resDir: Path.resolve(__dirname, '../res'),
  viewsDir: Path.resolve(__dirname, '../views'),
  ui: 'blessed',
  locals: {
    cache: false,
    compileDebug: true
  },
  dbName: `${package.name}.db.json`,
  dbOpts: {
    autoload: true,
    autosave: true,
    pretty: true
  },
  env: "development",
  replOpts: {
    get prompt () { return `${defs.name}:${defs.env}>_` }
  },
  get interactive() {

    return !(process.env.INTERACTIVE && process.env.INTERACTIVE.match(/false/))
  }
}