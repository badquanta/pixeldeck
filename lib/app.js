const express = require('express')
// TODO: Express App settings?
const app = module.exports = express()
const cfg = require('./cfg')
app.set('view engine', 'pug')
app.set('views', cfg.viewsDir)
Object.assign(app.locals, cfg.locals)

