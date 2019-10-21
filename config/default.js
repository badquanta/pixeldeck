const Path = require('path')
const pkg = require('../package')
/**
 * @lends pixeldeck.cfg
 */
const defs = module.exports = {
  name: pkg.name,
  version: pkg.version,
  resDir: Path.resolve(__dirname, '../res'),
  resDirs: [],
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
  env: 'development',
  replOpts: {
    get prompt () { return `${defs.name}:${defs.env}>_` }
  },
  get interactive () {
    return !(process.env.INTERACTIVE && process.env.INTERACTIVE.match(/false/))
  },
  server: {
    port: 4444,
    address: '0.0.0.0'
  }
}
