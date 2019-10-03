module.exports = Restart
const dbg = require('../dbg').extend('Reset()')
async function Restart(){
  const evt = require('../evt')
  evt.emit('Restarting')
  dbg('Restarting...')
  await require('./Stop')()
  const moduleDir = require('path').resolve(__dirname,'../../')

  require('.').emit('Resetting')
  Object.keys(require.cache).forEach((key)=>{
    if(key.startsWith(moduleDir)){

      delete require.cache[key]
    }
  })
  await require('./Start')()
  evt.emit('Restarted')
  dbg('Restarted')
}
dbg('loaded')