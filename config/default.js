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
      filename: './example.db'
    },
    pool: {
      afterCreate: (conn, cb) => {
        conn.run('PRAGMA foreign_keys = ON', cb);
      }
    }
  },
  dbName: `${package.name}.db.json`,
  dbOpts: {
    autoload: true,
    autosave: true,
    autosaveInterval: 1000,
    serializationMethod: "pretty",
    persistenceMethod: "fs-storage"
  },
  env: "development",
  replOpts: {
    get prompt () { return `${defs.name}:${defs.env}>_` }
  },
  get interactive() {
    return !(process.env.INTERACTIVE && process.env.INTERACTIVE.match(/false/))
  },
  server: {
    port: 4444,
    address: '0.0.0.0'
  }
}