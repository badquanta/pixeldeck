/**
 * @file the library index
 */
/**
 * index of library
 * @type {object}
 * @namespace pixeldeck
 * @this pixeldeck
 */
// eslint-disable-next-line no-unused-vars
const pixeldeck = module.exports = {
  /**
   * {@link pixeldeck.service} is an assembled {@link Express} application.
   *
   *
   **/
  get service () { return require('./service') },
  /**
   * {@link pixeldeck.cfg}
   *
   * */
  get cfg () {
    return require('./cfg')
  },
  /**
   * {@link pixeldeck.data}
   *
   */
  get data () {
    return require('./data')
  },
  /**
   * {@link pixeldeck.dbg}
   *
   */
  get dbg () {
    return require('./dbg')
  },
  /**
   * {@link pixeldeck.ui}
   *
   **/
  get ui () {
    return require('./ui')
  },
  /**
   * {@link pixeldeck.server}
   *
   */
  get server () {
    return require('./server')
  }
}
