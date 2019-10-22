/**
 * @file the library index
 * @copyright Jon (BadQuanta) Sawyer
 * @license GPL-3.0
 */
/**
 * index of library
 * @module pixeldeck
 */
// eslint-disable-next-line no-unused-vars
const pixeldeck = module.exports = {

  /** @type cfg */
  get cfg () { return require('./lib/cfg') },
  /** @type cli */
  get cli () { return require('./lib/cli') },
  /** @type mdl */
  get mdl () { return require('./lib/mdl') },
  /** @type dbg */
  get dbg () { return require('./lib/dbg') },
  /** @type ui */
  get ui () { return require('./lib/ui') },
  /** @type service **/
  get service () { return require('./lib/service') },
  /** @type server */
  get server () { return require('./lib/server') }
}
