/**
 * @see {@link http://expressjs.com/en/4x/api.html|Express 4x API}
 * @external {Express}
 */
const Express = require('express')

/**
 * @desc
 *    pixeldeck uses Express 4 as the route to emit pixels via http [server]{@link pixeldeck.server}
 * @type {Express}
 * @namespace pixeldeck.service
 */
// TODO: Express App settings?
const service = module.exports = Express()
/** @ignore */
const cfg = require('./cfg')
/** @ignore */
const dbg = require('./dbg').extend('service')
dbg('configuring')
service.set('view engine', 'pug')
service.set('views', cfg.viewsDir)
Object.assign(service.locals, cfg.locals)
service.locals.dbg = require('./dbg').extend('VIEW')
service.get(/\/(.*)\.ts\.svg/, require('./service/getTiledSetSvg'))
service.get(/\/(.*)\.tm\.svg/, require('./service/getTiledMapSvg'))
service.get('/TiledMaps/', require('./service/getTiledMapsList'))
service.get(...require('./service/getTiledMapHtml'))
service.get('/', require('./service/getRoot'))
dbg('configured')
