Object.defineProperties(module.exports,{
  service:{get:()=>require('./service')},
  //direct app link?
  cfg:{get:()=>require('./cfg')},
  data:{get:()=>require('./data')},
  dbg:{get:()=>require('./dbg')},
  evt:{get:()=>require('./evt')},
  repl:{get:()=>require('./repl')},
  server:{get:()=>require('./server')},
})