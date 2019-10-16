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
  knex: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './dev.db'

    },
    asyncStackTraces: true
  },
  env: "development",
  replOpts: {
    get prompt () { return `${defs.name}:${process.env.NODE_ENV}>_` }
  },
  get interactive () {
    return !(process.env.INTERACTIVE && process.env.INTERACTIVE.match(/false/))
  },
  server: {
    port: 4444,
    address: '0.0.0.0'
  }
}