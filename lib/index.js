/**

 * Pixeldeck library
 * @name pixeldeck
 * @public
 * @type {{service,cfg,data,dbg,evt,repl,server}}
 * ``
 */
const pixeldeck = module.exports = {
  get service () { return require('./service') },
  //direct app link?
  get cfg () {
    return require('./cfg')
  },
  get data () {
    return require('./data')
  },
  get dbg () {
    return require('./dbg')
  },
  get evt () {
    return require('./evt')
  },
  get repl () {
    return require('./repl')
  },
  get server () {
    return require('./server')
  },
}
