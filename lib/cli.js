
/**
 * index of command line interfaces
 * @namespace cli
 */
const cli = module.exports = {
  /** @type {cli.Cmd} */
  get Cmd () { return require('./cli/Cmd') },
  /** @type {cli.MakeMap} **/
  get MakeMap () { return require('./cli/MakeMap') },
  /** @type {cli.Serve} */
  get Serve () { return require('./cli/Serve') }
}

require('./dbg').extend('cli')('loaded')
/**

 */
