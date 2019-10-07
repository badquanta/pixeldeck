/**
 * utility stuff
 * @type {object}
 * @namespace pixeldeck.arch
 */
const arch = module.exports = {
  // TODO: maybe fs?
  /**
   * the `path` module is used a lot.
   * Nodejs [Path docs](https://nodejs.org/docs/latest-v10.x/api/path.html)
   * @memberof pixeldeck.arch
   **/
  get Path () { return require('path') },
  /**
   * the `fs` module is used a lot.
   * Nodejs [fs docs](https://nodejs.org/docs/latest-v10.x/api/fs.html)
   * @memberof pixeldeck.arch
   *
   **/
  get Fs () { return require('fs') },
  /**
   * define automated requires on `target`.
   * each `name` in `names` are defined as properties on `target`
   * when read the properties will `require` modules with the same name
   * within the path defined by `dirname`
   * @memberof pixeldeck.arch
   *
   */
  defineRequires (dirname, target, ...names) {
    return Object.defineProperties(target, names.reduce((obj, name) => {
      obj[name] = { get: () => require(arch.Path.resolve(dirname, name)) }
      return obj
    }, {}))
  },
  /**
   * Convert any path into a resource path, optionally changing the extension
   * @param {string} aPath
   * @param {string} replacementExt (optional), giving '' strips off any extension
   * @memberof pixeldeck.arch
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
 * __note__ order of president follows argument order. #1 overrides #0, etc.
 * @return {object} single object with all non object properties copied onto it.
 * @memberof pixeldeck.arch
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
    return query
  }
}
