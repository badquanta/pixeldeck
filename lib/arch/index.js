/**
 * @todo more reason for existence
 */
const arch = module.exports = {
  // TODO: maybe fs?
  /** node.js `path` library */
  get Path () { require('path') },
  defineRequires (dirname, target, ...names) {
    return Object.defineProperties(target, names.reduce((obj, name) => {
      obj[name] = { get: () => require(this.Path.resolve(dirname, name)) }
      return obj
    }, {}))
  },
  /**
   *
   * @param {string} aPath
   * @param {string} replacementExt (optional), giving '' strips off any extension
   */
  getResPathFor (aPath, replacementExt = null) {
    let resPath = arch.Path.join(require('../cfg').resDir, aPath)
    if(replacementExt){
      while(arch.Path.extname(resPath)!=''){
        resPath = arch.Path.basename(resPath)
      }
      resPath+=replacementExt
    }
    return resPath
  }
}