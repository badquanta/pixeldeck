const dbg = require('./dbg').extend('data')
dbg('Loading...')
/**
 * knex provides the database interface layer
 * @external
 * @property {object} schema
 * @property {function} schema.table
 * @property {function} schema.with
 * @property {function} schema.withSchema
 * @property {function} schema.createTable
 * @property {function} schema.renameTable
 * @property {function} schema.dropTable
 * @property {function} schema.raw
 */
const Knex = require('knex')
const knexCfg = require('./cfg').knex

dbg('KnexCfg %o', knexCfg)
require('sqlite3')
/**
 * @see {@link http://knexjs.org/}
 * @namespace pixeldeck.data
 */
const data = module.exports = Knex(knexCfg)
// if this doesn't throw then you have working db connection

data.disknex = disknex
const { Model: Objection } = require('objection')
Objection.knex(data)
data.ready = data.schema.hasTable('pixeldeck')
process.on('pixeldeck:stopping', disknex)

/**
 * disconnect from knex
 * @memberof pixeldeck.data
 */
function disknex () {
  process.removeListener('pixeldeck:stopping', disknex)
  data.destroy()
  dbg('unloading this module...')
  delete require.cache[__filename]
}
