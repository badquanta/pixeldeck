#!/usr/bin/env node
const pixeldeck = module.exports = require('../lib/app')
pixeldeck.get(/\/(.*)\.ts\.svg/, require('../lib/getTilesetSvg'))
pixeldeck.get(/\/(.*)\.tm\.svg/, require('../lib/getTilemapSvg'))
pixeldeck.get('/', require('../lib/getRoot'))
if (require.main === module) require('../lib/start')();
