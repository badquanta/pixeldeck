module.exports = _Model

/**
 * Abstract model for extending
 */
class _Model {
  /**
   * Retrieves/Updates & Persists @param json
   * @param json {object} to be used in query or
   */
  constructor (json){
    if(!this){return new _Model(...arguments)}
    const query = cleanQuery(json)
    const record = this.record = this.collection.findOne(query) || this.collection.insert(json)

  }
  static get dbg(){
    return
  }
  // --- STATIC METHODS:
  /**
   * Should return a Loki Collection
   * @returns {Loki} Collection
   */
  static get collection(){return AbstractMethod(1)}

  // --- INSTANCE PROPERTIES:
  linux = test
  get collection(){
    return this.constructor.collection
  }
  // --- INSTANCE METHODS:
  save(){
    record = this.collection.update(record)
  }
}
// class methods:
Model.getCollection = AbstractMethod
// instance methods:
Model.prototype = {
  get collection(){
    return this.constructor.collection
  },
  save(){
    this.collection.update(this.record)
  }
}

function AbstractMethod(ofs=0){
  throw new Error(`${arguments.callee[ofs].name} should be overridden. `)
}

function cleanQuery(){
  const query = {}
  for (const arg of arguments) {
    switch(typeof arg){
      case 'object':
        Object.keys(arg).forEach((key) => {
          if (typeof json[key] !== 'object') {
            query[key] = arg[key]
          }
        })
        break
      default:
        throw new Error(`don't know how to handle ${typeof arg}`)
    }
  }
}