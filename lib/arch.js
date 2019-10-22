/**
 * utility stuff
 * @type {object}
 * @namespace arch
 */
const arch = (module.exports = {
  /**
   * the `path` module is used a lot.
   * Nodejs [Path docs](https://nodejs.org/docs/latest-v10.x/api/path.html)
   * @memberof arch
   **/
  get Path () {
    return require('path')
  },
  /**
   * the `fs` module is used a lot.
   * Nodejs [fs docs](https://nodejs.org/docs/latest-v10.x/api/fs.html)
   * @memberof arch
   *
   **/
  get Fs () {
    return require('fs')
  },
  /**
   * the `util` module is used a lot.
   * Nodejs [util docs](https://nodejs.org/docs/latest-v10.x/api/util.html)
   * @memberof arch
   *
   **/
  get Util () {
    return require('util')
  },
  /**
   * the `rw` library lets me use stdin and stdout like files
   */
  get Rw () {
    return require('rw')
  },
  /** Get a promisify-ed Rw.readFile */
  get readFile () {
    return this.Util.promisify(this.Rw.readFile)
  },
  /** Get a promisify-ed Rw.writeFile */
  get writeFile () {
    return this.Util.promisify(this.Rw.writeFile)
  },
  /**
   * define automated requires on `target`.
   * each `name` in `names` are defined as properties on `target`
   * when read the properties will `require` modules with the same name
   * within the path defined by `dirname`
   * @memberof arch
   *
   */
  defineRequires (dirname, target, ...names) {
    return Object.defineProperties(
      target,
      names.reduce((obj, name) => {
        obj[name] = { get: () => require(arch.Path.resolve(dirname, name)) }
        return obj
      }, {})
    )
  },
  /**
   * Convert any path into a resource path, optionally changing the extension
   * This will search the following paths:
   * 1) None: just try not modifying aPath's directory
   * 2) "configured" resource directory.
   * 3) "current working directory" as reported by node.
   * @todo "current working directory" may need to be scrapped so that client/server side works the same.
   * @param {string} aPath
   * @param {string} replacementExt (optional), giving '' strips off any extension
   * @memberof arch
   */
  getResPathFor (aPath, replacementExt = null) {
    let resPath = aPath
    if (replacementExt) {
      while (arch.Path.extname(resPath) !== '') {
        resPath = resPath.replace(arch.Path.extname(resPath), '')
      }
      resPath += replacementExt
    }
    let testPath = resPath
    const searchPaths = [require('./cfg').resDir, process.cwd(), '']
    while (!arch.Fs.existsSync(testPath)) {
      if (searchPaths.length) {
        testPath = arch.Path.resolve(arch.Path.join(searchPaths.shift(), resPath))
      } else throw new Error('search paths exhausted for:' + resPath)
    }
    return testPath
  },
  /**
   * take all inputs and turn them into a single clean query object
   * @param {...object} arguments one or more input objects to clean of sub-objects and return as one query.
   * __note__ order of president follows argument order. #1 overrides #0, etc.
   * @return {object} single object with all non object properties copied onto it.
   * @memberof arch
   **/
  cleanQuery () {
    const query = {}
    for (const arg of arguments) {
      switch (typeof arg) {
        case 'object':
          Object.keys(arg).forEach(key => {
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
})
