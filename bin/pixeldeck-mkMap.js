#!/usr/bin/env node
/** Convert Tiled JSON TileMap to SVG Version
 *
 */

/**
 * https://www.npmjs.com/package/commander
 */
const commander = require('commander')
const fs = require('fs')
const data = require('../lib/data')
const TileMaps = data.TileMaps
const Path = require('path')
const pug = require('pug')
const tileMapViewPathss = {
  html: Path.resolve(__dirname, '../views/tileMap/html.pug'),
  svg: Path.resolve(__dirname, '../views/tileMap/svg.pug')
}

const viewBasePath = Path.resolve(__dirname, '../views')
async function mkMap () {
  commander.parse(process.argv)
  const inputFile = commander.args.shift()
  const outputFile = commander.args.shift() || ''
  const outputFileExt = Path.extname(outputFile)

  const mapJson = JSON.parse(fs.readFileSync(inputFile, 'utf8'))
  mapJson.path = inputFile
  const tileMap = new TileMaps(mapJson)
  await tileMap.loadTileSets()
  const rendered = pug.renderFile(tileMapViewPath, {
    filename: tileMapViewPath,
    basedir: viewBasePath,
    tileMap: tileMap,
    embedTileSets: true
  })

  if (outputFile) {
    fs.writeFileSync(outputFile, rendered)
  } else {
    console.log(rendered)
  }
  data.base.close()
  return Promise.resolve()
}

if (require.main === module) {
  mkMap()
}
