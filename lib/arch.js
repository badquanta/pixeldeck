/**
 * @todo more reason for existence
 * @public
 */
const arch = module.exports = {
  // TODO: maybe fs?
  /** node.js `path` library */
  get Path () { return require('path') },
  get Fs () { return require('fs') },
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
    if (replacementExt) {
      while (arch.Path.extname(resPath) !== '') {
        resPath = resPath.replace(arch.Path.extname(resPath), '')
      }
      resPath += replacementExt
    }
    return resPath
  },
  /**
 * take all inputs and turn them into a single clean query object
 * @param {...object} arguments one or more input objects to clean of sub-objects and return as one query.
 * @note order of president follows argument order. #1 overrides #0, etc.
 * @return {object} single object with all non object properties copied onto it.
 **/
  cleanQuery () {
    const query = {}
    for (const arg of arguments) {
      switch (typeof arg) {
        case 'object':
          Object.keys(arg).forEach((key) => {
            if (typeof arg[key] !== 'object') {
              query[key] = arg[key]
            }
          })
          break
        case 'string':
          query.path = arg
          break
        default:
          throw new Error(`don't know how to handle ${typeof arg}`)
      }
    }
  }
}
