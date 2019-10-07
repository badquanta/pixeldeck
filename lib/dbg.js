/**
 * `debug` provides our output
 * @namespace pixeldeck.dbg
 * @kind instance
 * @see {@link https://www.npmjs.com/package/debug}
 */
// eslint-disable-next-line no-unused-vars
const dbg = module.exports = require('debug')(require('../package.json').name)
