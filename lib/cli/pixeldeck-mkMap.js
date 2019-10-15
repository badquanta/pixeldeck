#!/usr/bin/env node
const dbg = require('../dbg').extend('cli:MakeMap')
const arch = require('../arch')
const Pug = require('pug')
/** Convert Tiled TiledMap JSON files into pixeldeck'ed TiledMap to SVG Version
 */
class MakeMap extends require('./_MakeCmd') {
  async _Process (data) {
    dbg('_PROCESS')
    const outputFile = this.output || ''
    let format = arch.Path.extname(outputFile)
    if (format === '') {
      format = '.html'
    }
    dbg('Format:', format)
    const tileMapViewPath = MakeMap.Formats[format]
    dbg('Loading tilesets...')
    const tileMap = new TiledMap(data)
    await tileMap.loadTiledSets()
    dbg('rendering map')
    const rendered = pug.renderFile(tileMapViewPath, {
      basedir: viewBasePath,
      tileMap,
      embedTiledSets: true
    })
    dbg('rendered')
    return rendered
  }
}

// eslint-disable-next-line no-unused-vars
const tileMapFormats = MakeMap.Formats = {
  html: arch.Path.resolve(__dirname, '../views/tileMap/html.pug'),
  svg: arch.Path.resolve(__dirname, '../views/tileMap/svg.pug')
}

if (require.main === module) {
  dbg('running...')
  const cmd = new MakeMap()
  cmd._RUN_()
}
dbg('loaded')