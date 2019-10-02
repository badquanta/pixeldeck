module.exports = start
const dbg = require('./dbg').extend('start')
/**
 * initialize pixeldeck services
 */
async function start () {
  return new Promise(function (res, rej) {
    const cfg = require('./cfg')
    dbg('cfg: %O',cfg)
    const server = require('./server')
    server.listen(4444, function () {
      dbg('listening')
      if (cfg.interactive) {
        const repl = require('./repl')
        repl()
        function objProps(...names){
          return names.reduce((obj,name)=>{
            obj[name] = {get:()=>require(`./${name}`)}
            return obj
          },{})
        }
        Object.defineProperties(repl.server.context,
          objProps('arch', 'data', 'service','cfg', 'repl','server')
        )

        res();
      }
    })
  })
}