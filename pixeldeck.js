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
  get service () { return require('./lib/service') },
  /**
   * {@link pixeldeck.cfg}
   *
   * */
  get cfg () {
    return require('./lib/cfg')
  },

  /**
   *
   */
  get models () {
    return require('./lib/models')
  },
  /**
   * {@link pixeldeck.dbg}
   *
   */
  get dbg () {
    return require('./lib/dbg')
  },
  /**
   * {@link pixeldeck.ui}
   *
   **/
  get ui () {
    return require('./lib/ui')
  },
  /**
   * {@link pixeldeck.server}
   *
   */
  get server () {
    return require('./lib/server')
  }
}
