#!/usr/bin/env node
/**
 * https://www.npmjs.com/package/commander
 */
const commander = require('commander')

commander.parse(process.argv)

const inputFile = commander.args.shift()
const outputFile = commander.args.shift()

const fs = require('fs')
const mapJson = JSON.parse(fs.readFileSync(inputFile, 'utf8'))
mapJson.path = inputFile
const TileMaps = require('../lib/data/TileMaps')
const tileMap = new TileMaps(mapJson)

const Path = require('path')
const pug = require('pug')
const tileMapViewPath = Path.resolve(__dirname, '../views/tileMap/html.pug')
const viewBasePath = Path.resolve(__dirname, '../views')
const rendered = pug.renderFile(tileMapViewPath, {
  filename: tileMapViewPath,
  basedir: viewBasePath,
  tileMap: tileMap,
  embedTileSets: true
})
// console.log('map:', map)

if (outputFile) {
  fs.writeFileSync(outputFile, rendered)
} else {
  console.log(rendered)
}
