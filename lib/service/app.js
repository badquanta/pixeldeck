const express = require('express')
// TODO: Express App settings?
/**
 * @description
 *    pixeldeck uses [express.js v4](http://expressjs.com/en/4x/api.html) as the remote holoemition router.
 */
const app = module.exports = express()
const cfg = require('../cfg')
app.set('view engine', 'pug')
app.set('views', cfg.viewsDir)
Object.assign(app.locals, cfg.locals)

