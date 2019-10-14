/**
 * Provides HTTP support.
 * @external {httpServer}
 * @see {@link https://nodejs.org/docs/latest-v10.x/api/http.html#http_class_http_server}
 */
const httpServer = require('http').createServer
/**
 * instance of http server for [service]{@link pixeldeck.service}
 * @namespace pixeldeck.server
 */
// eslint-disable-next-line no-unused-vars
const server = (module.exports = httpServer(require('./service')))
server.Start = Start
server.Stop = Stop
server.Restart = Restart
/** @ignore */
const dbg = require('./dbg').extend('server')

server.on('Loaded', () => dbg('Loaded'))
server.on('Started', () => dbg('Start'))
server.on('Starting', () => dbg('Starting'))
server.on('Restarting', () => dbg('Restarting'))
server.on('Restarted', () => dbg('Restart'))
server.on('Stopping', () => dbg('Stopping'))
server.on('Stopped', () => dbg('Stop'))

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// End of server construction
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
/**
 * Restart
 * @memberof pixeldeck.server
 */
async function Restart () {
  /**
   * Restarting fires before restart begins
   * @event pixeldeck.server#Restarting
   * */
  process.emit('pixeldeck:Restarting')
  dbg('Restarting')
  await Stop()
  const moduleDir = require('path').resolve(__dirname, '../../')
  /** @event pixeldeck.server#Resetting */
  require('./server').emit('Resetting')
  Object.keys(require.cache).forEach(key => {
    if (key.startsWith(moduleDir)) {
      delete require.cache[key]
    }
  })
  await require('./server').Start()
  /**
   * Restarted fires after restart completes
   * __note__ this instance of Server will be invalid when this restart completes.
   * @event pixeldeck.server#Restarted
   **/

  process.emit('pixeldeck:Restarted')
  dbg('Restarted')
  return true
}
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

/**
 * Start the service
 * @memberof pixeldeck.server
 */
async function Start () {
  /**
   * Starting fires before server has begun listening.
   * @event pixeldeck.server#Starting
   **/
  process.emit('pixeldeck:Starting')

  const cfg = require('./cfg')
  await server.listen(cfg.server.port, cfg.server.address)
  dbg('listening', server.address())
  if (cfg.interactive) {
    const ui = require('./ui')
    await ui.Start()
    require('./arch').defineRequires(
      __dirname,
      ui.REPLServer.context,
      'arch',
      'data',
      'service',
      'cfg',
      'repl',
      'server'
    )
  }
  /**
   * Started fires after server has begun listening for connections.
   * @event pixeldeck.server#Started
   **/
  process.emit('pixeldeck:Started')
  return true
}
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
/**
 * Halt various pixeldeck services.
 * @todo better documentation
 * @memberof pixeldeck.server
 */
async function Stop () {
  /**
   * Stopping fires before server has closed ports.
   * @event pixeldeck.server#Stopping
   */
  process.emit('pixeldeck:Stopping')
  return Promise.resolve()
    .finally(() => {
      return require('./server').close(err => {
        if (err) {
          dbg('server close error: %o', err)
        } else {
          dbg('server closed')
        }
      })
    })
    .finally(() => {
      dbg('db stopping')
      require('./data/__base').close(function () {
        dbg('db stopped')
      })
    })
    .finally(() => {
      dbg('Ui stopping..')
      require('./ui').Stop(function () {
        dbg('repl stopped')
      })
    })
    .finally(() => {
      /**
       * Stopped fires after server has closed ports.
       * @event pixeldeck.server#Stopped
       */
      process.emit('pixeldeck:Stopped')
    })
}
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
dbg('loaded')
