/**
 * @todo more reason for existence
 * @public
 */
const arch = module.exports = {
  // TODO: maybe fs?
  /** node.js `path` library */
  get Path () { return require('path') },
  get Fs () { return require('fs')},
  defineRequires (dirname, target, ...names) {
    return Object.defineProperties(target, names.reduce((obj, name) => {
      obj[name] = { get: () => require(arch.Path.resolve(dirname, name)) }
      return obj
    }, {}))
  },
  /**
   *
   * @param {string} aPath
   * @param {string} replacementExt (optional), giving '' strips off any extension
   */
  getResPathFor (aPath, replacementExt = null) {
    let resPath = arch.Path.join(require('./cfg').resDir, aPath)
    if(replacementExt){
      while(arch.Path.extname(resPath)!=''){
        resPath = resPath.replace(arch.Path.extname(resPath),'')
      }
      resPath+=replacementExt
    }
    return resPath
  }
}