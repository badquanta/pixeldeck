/**
 * cli-serve
 * @memberof cli
 * @class
 * @augments cli.Cmd
 * @example <caption>shell</caption>
 *   $ pixeldeck-serve [--interactive | --batch] [--port=number] [--address=IP/hostname]
 * @example <caption>javascript</caption>
 * // Run as though we'd been called with this in process.argv
    * const Serve = require('pixeldeck').cli.Serve
    * const cmd = new Serve()
    * cmd.run(['--batch','--address','0.0.0.0','--port=1234'])
    * console.log(cmd.port) //=>1234\n
 */
class Serve extends require('./Cmd') {
  /**
   * configure instance options/events
   */
  constructor () {
    super(...arguments)
    this.option('-i, --interactive', 'Turn on REPL')
    this.option('-b, --batch', 'Turn off REPL')
    this.on('option:interactive', function () {
      require('../lib/cfg').interactive = true
    })
    this.on('option:batch', function () {
      require('../lib/cfg').interactive = false
    })
  }

  /**
   * @override
   */
  async main () {
    await super.main(...arguments)
    this.dbg('server start')
    await require('../server').Start()
    this.dbg('server started')
  }
}
module.exports = Serve
if (require.main === module) {
  const run = new Serve()
  run.main()
}
