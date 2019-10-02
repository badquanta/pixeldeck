/**
 * @todo more reason for existence
 */
Object.defineProperties(module.exports,{
  // TODO: maybe fs?
  /** node.js `path` library */
  Path:{get:()=>require('path')},

  defineRequires: {value:function(dirname, target, ...names){
    return Object.defineProperties(target,names.reduce((obj,name)=>{
      obj[name] = {get:()=>require(this.Path.resolve(dirname,name))}
      return obj
    },{}))
  }}
})