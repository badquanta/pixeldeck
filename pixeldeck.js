/**
 * @file the library index
 * @copyright Jon (BadQuanta) Sawyer
 * @license GPL-3.0
 */
/**
 * index of library
 * @type {object}
 * @namespace pixeldeck
 * @this pixeldeck
 */
// eslint-disable-next-line no-unused-vars
const pixeldeck = module.exports = {
  get service () { return require('./lib/service') },
  get cfg () { return require('./lib/cfg') },
  get cli () { return require('./lib/cli') },
  get models () { return require('./lib/models') },
  get dbg () { return require('./lib/dbg') },
  get ui () { return require('./lib/ui') },
  get server () { return require('./lib/server') }
}
