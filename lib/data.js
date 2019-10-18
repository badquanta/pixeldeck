const dbg = require('./dbg').extend('knex')
dbg('Loading...')
const Knex = require('knex')
const knexCfg = require('./cfg').knex

dbg('KnexCfg %o', knexCfg)
require('sqlite3')
const data = module.exports = Knex(knexCfg)
// if this doesn't throw then you have working db connection

data.disknex = disknex
const { Model: Objection } = require('objection')
Objection.knex(data)
data.ready = data.schema.hasTable('pixeldeck')
process.on('pixeldeck:stopping', disknex)

/**
 * disknex
 */
function disknex () {
  process.removeListener('pixeldeck:stopping', disknex)
  data.destroy()
  dbg('unloading this module...')
  delete require.cache[__filename]
}
