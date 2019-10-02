module.exports = Stop
async function Stop(){
  const evt = require('../evt')
  const dbg = require('../dbg').extend('Stop()')
  evt.emit('Stopping')
  return Promise.resolve().finally(()=>{
     return require('../server').close((err)=>{
        if(err){dbg('server close error: %o',err)}
        else{dbg('server closed')}
     })
  }).finally(()=>{
    dbg('db stopping')
    require('../data/base').close(function(){
      dbg('db stopped')
    })
  }).finally(()=>{
    dbg('repl stopping')
    require('../repl').close(function(){
      dbg('repl stopped')
    })
  }).finally(()=>{
    evt.emit('Stop')
  })
}