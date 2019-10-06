/**

 * Pixeldeck library
 * @name pixeldeck
 * @public
 * @type {{service:service,cfg:cfg,data:data,dbg:dbg,evt:evt,repl:repl,server:server}}
 * ``
 */
// eslint-disable-next-line no-unused-vars
const pixeldeck = module.exports = {
  get service () { return require('./service') },
  // direct app link?
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
    return require('./UI/repl')
  },
  get server () {
    return require('./server')
  }
}
