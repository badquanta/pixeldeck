const dbg = require('./dbg').extend('knex')
dbg('Loading...')
const Knex = require('knex')
const knexCfg = require('./cfg').knex
dbg('KnexCfg %o', knexCfg)
const knex = module.exports = Knex(knexCfg)
const { Model: Objection } = require('objection')
Objection.knex(knex)
process.on('pixeldeck:stopping', function stopKnex () {
  process.removeListener('pixeldeck:stopping', stopKnex)
  knex.destroy()
  dbg('unloading this module...')
  delete require.cache[__filename]
})
