


const modelNames = [
  // TODO: Maybe remove Model from this list?
  'Model',
  'TiledSet',
  'TiledMap',
  'TiledProperties',
  'TiledMapUsesSet',
  'TiledLayer',
  // 'TiledChunk', // TODO: Maybe fake this with Layers instead???
  'TiledObject'
]
const getModelIndex = modelNames.reduce((obj, name) => {
  obj[name] = {
    get: () => {
      return require(`./models/${name}`)
    }
  }
  return obj
}, {})
getModelIndex.ALL = {
  get: function () {
    const ALL = modelNames.map((n) => { return this[n] })

    return ALL
  }
}

const models = module.exports
Object.defineProperties(models, getModelIndex)
models.ensureAllSchemas = async function (all = models.ALL) {
  return Promise.all(all.map((a) => { return a.createSchema() }))
}
/** TODO: HOW TO DOCUMENT THIS? */
