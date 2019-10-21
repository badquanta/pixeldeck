/**
 *  * {@link https://www.npmjs.com/package/commander}
 *  * {@link https://www.npmjs.com/package/commander}
 *  * {@link https://github.com/tj/commander.js/wiki}
 * Provides a command line argument parser plus other features.
 * @external commander
 */
const commander = require('commander')
/**
 * @class
 * @see https://github.com/tj/commander.js#declaring-program-variable
 * @memberof external:commander
 */
const Command = commander.Command
/**
  * Implementation of abstract pixeldeck cli
  * @abstract
  * @class
  * @memberof cli
  * @augments commander.Command
  * @example <caption>Example typical usage.</caption>
  * // parse arguments, then print first non-option argument
  * const cli = require('pixeldeck/lib/cli');
  * const cmd = new cli.Cmd()
  * cmd.main(process.argv || ['--help-me','your','options'])
  * console.log(cmd.args.shift) //=> your\n
  **/
class Cmd extends Command {
  /**
   * @todo Review for removal; currently useless.
   */
  constructor () {
    const supRes = super(...arguments)
    this.dbg('constructed')
    return supRes
  }

  /**
   * class debugger
   */
  static get dbg () {
    return require('../dbg').extend(`cli.${this.name}`)
  }

  /**
   * instance debugger
   */
  get dbg () {
    return this.constructor.dbg.extend('instance')
  }

  /**
   * start the command
   * @abstract
   */
  async main (argv = process.argv) {
    this.dbg('parsing...')
    this.parse(argv)
  }
}
module.exports = Cmd
Cmd.dbg('loaded')
