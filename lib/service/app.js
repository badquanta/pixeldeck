/**
 * http://expressjs.com/en/4x/api.html
 */
const Express = require('express')
// TODO: Express App settings?
/**
 * @desc
 *    pixeldeck uses [express.js v4](http://expressjs.com/en/4x/api.html) as the remote holoemition router.
 * @type {Express}
 */
const app = module.exports = Express()
/** @ignore */
const cfg = require('../cfg')
app.set('view engine', 'pug')
app.set('views', cfg.viewsDir)
Object.assign(app.locals, cfg.locals)
app.locals.dbg = require('../dbg').extend('VIEW')
