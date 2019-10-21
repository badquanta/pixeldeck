/**
 * @file MakeCmd
 * @copyright Jon BadQuanta Sawyer 2011
 */
const Commander = require('commander')
const arch = require('../arch')
const dbg = require('../dbg').extend('make cmd')
/**
 * Creates a generic "Make Command"
 */
class _MakeCmd extends Commander.Command {
  constructor (...args) {
    super(...args)
    this.option('-f, --format <.ext>', 'Specifies the template to use, if blank will be detected by input file or defaults to')
    this.option('-j, --json <{"json":"data"}>')
    this.option('-i, --input <path>', 'If blank will use stdin, otherwise reads json from path')
    this.option('-o, --output <path>', 'If blank will use stdout, otherwise writes to file on path')
    return this
  }

  async _Setup () {
    dbg('_SETUP')
    if (!this.json) {
      const inputPath = this.input || '/dev/stdin'
      this.json = await arch.readFile(inputPath, 'utf8')
    }
    this.json = JSON.parse(this.json)
    return this.json
  }

  async _Process (data) {
    throw new Error('process should be overridden')
  }

  async _teardown (rendered) {
    const outputPath = this.output || '/dev/stdout'
    arch.writeFile(outputPath, rendered, 'utf8')
    return rendered
  }

  dbgProcessEvents (...named) {
    named.forEach((named) => {
      process.on(named, (...args) => {
        console.log(`process on ${named} = %o`, args)
      })
    })
  }

  async _RUN_ (args = process.argv) {
    dbg('_RUN_')
    this.dbgProcessEvents(
      'message',
      'multipleResolves',
      'unhandledRejection',
      'rejectionHandled',
      'uncaughtException',
      'warning',
      'SIGINT',
      'SIGHUP',
      'SIGTERM'
    )
    dbg('THIS.PARSE')
    this.parse(args)
    const data = await this._Setup()
    const rendered = await this._Process(data).finally(this._teardown.bind(this))
    dbg('COMPLETE')
    return rendered
  }
}
module.exports = _MakeCmd
dbg('loaded')
