Object.defineProperties(module.exports,{
  service:{get:()=>require('./service')},
  //direct app link?
  cfg:{get:()=>require('./cfg')},
  close:{get:()=>require('./close')},
  data:{get:()=>require('./data')},
  dbg:{get:()=>require('./dbg')},
  repl:{get:()=>require('./repl')},
  server:{get:()=>require('./server')},
  start:{get:()=>require('./start')},
})