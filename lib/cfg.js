/**
 * used by {@link pixeldeck.cfg}
 * @external config
 * @see {@link https://www.npmjs.com/package/config}
 */
if (!process.NODE_ENV) {
  console.warn('NODE_ENV not set')
}
/**
 * loads runtime configuration using the {@link external:config} npm package
 * @namespace pixeldeck.cfg
 */
// eslint-disable-next-line no-unused-vars
const cfg = module.exports = require('config')
require('./dbg')('loaded configuration: %O', cfg)
