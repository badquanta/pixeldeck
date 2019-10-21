/**
 * List of all model names for ensureAllSchemas() and dropAllSchemas()
 * @private
 */
const modelNames = [
  // TODO: Maybe remove Model from this list?
  'TiledModel',
  'TiledFile',
  'TiledSet',
  'TiledMap',
  'TiledProperties',
  'TiledMapUsesSet',
  'TiledLayer',
  // 'TiledChunk', // TODO: Maybe fake this with Layers instead???
  'TiledObject'
]

/**
 * an accessor object
 * @private
 */
const getModelIndex = modelNames.reduce((obj, name) => {
  obj[name] = {
    get: () => {
      return require(`./mdl/${name}`)
    }
  }
  return obj
}, {})

/**
 * generates an array of all the named model classes by requiring them.
 * @name mdl.ALL
 * @type {mdl.TiledModel[]}
 */
getModelIndex.ALL = {
  get: function () {
    const ALL = modelNames.map((n) => { return this[n] })

    return ALL
  }
}
/**
 * utility object that requires-on-demand each of the named model classes
 * @namespace mdl
 */
const models = module.exports
Object.defineProperties(models, getModelIndex)

/**
 * @memberof mdl
 * @param {mdl.TiledModel[]} [all=mdl.ALL]
 */
models.ensureAllSchemas = async function (all = models.ALL) {
  return Promise.all(all.map((a) => { return a.ensureSchema() }))
}

/**
 * @memberof mdl
 * @param {mdl.TiledModel[]} [all={@link mdl.ALL}]
 */
models.dropAllSchemas = async function (all = models.ALL) {
  return Promise.all(all.map((a) => { return a.dropSchema() }))
}

require('./dbg').extend('models')('loaded')
