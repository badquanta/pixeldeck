const dbg = require('../dbg').extend('data:base')
dbg('loading...')
const Knex = require('knex')
const cfg = require('../cfg')
const base = Knex(cfg.knex)
module.exports = base
dbg('defined')
/**
 *
 */
base.stop = stopBase
async function stopBase () {
  dbg('stopBase')
  process.removeListener('pixeldeck:Stopping', stopBase)
  return base.destroy()
}

process.on('pixeldeck:Stopping', stopBase)
