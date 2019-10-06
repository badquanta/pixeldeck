/** @ignore */
const dbg = require('../dbg').extend('evt')
/** @ignore */
const events = require('events')
/**
 * [EventEmitter offical documentation](https://nodejs.org/docs/latest-v10.x/api/events.html#events_class_eventemitter)
 */
const EventEmitter = events.EventEmitter
/**
 * testing
 * @extends {EventEmitter}
 */
class EvtHub extends EventEmitter {
  /**
   * Make one
   */
  constructor () {
    super(...arguments)
    this.on('Loaded', () => dbg('Loaded'))
    this.on('Started', () => dbg('Start'))
    this.on('Starting', () => dbg('Starting'))
    this.on('Restarting', () => dbg('Restarting'))
    this.on('Restarted', () => dbg('Restart'))
    this.on('Stopping', () => dbg('Stopping'))
    this.on('Stopped', () => dbg('Stop'))
  }

  /** @ignore */
  get Start () { return require('./Start') }
  /** @ignore */
  get Restart () { return require('./Restart') }
  /** @ignore */
  get Stop () { return require('./Stop') }
}
/**
 * @type {EvtHub}
 * instance of event hub
 */
// eslint-disable-next-line no-unused-vars
const evt = module.exports = new EvtHub()
dbg('loaded')
