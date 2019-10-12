#!/usr/bin/env node

/**
 * https://www.npmjs.com/package/commander
 */
const commander = require('commander')
commander.option('-f, --format <type>', 'Define what format to generate.')
const fs = require('fs')
const data = require('../lib/data')
const TileMaps = data.TileSets
const Path = require('path')
const pug = require('pug')
const tileSetViewPaths = {
  html: Path.resolve(__dirname, '../views/tileSet/html.pug'),
  svg: Path.resolve(__dirname, '../views/tileSet/svg.pug')
}

const viewBasePath = Path.resolve(__dirname, '../views')

async function mkSet () {
  commander.parse(process.argv)

  const inputFile = commander.args.shift()
  const outputFile = commander.args.shift()
  let outputFormat = Path.extname(outputFile).slice(1)
  if (!outputFormat || (outputFormat === '')) {
    outputFormat = commander.format
  }
  const tileSetViewPath = tileSetViewPaths[outputFormat]
  if (!tileSetViewPath) {
    throw new Error('Unknown format type "' + outputFormat + '"')
  }
  const setJson = JSON.parse(fs.readFileSync(inputFile, 'utf8'))
  setJson.path = inputFile
  const tileSet = new TileMaps(setJson)
  await tileSet.getTileDataUrls()

  const rendered = pug.renderFile(tileSetViewPath, {
    filename: tileSetViewPath,
    basedir: viewBasePath,
    tileSet,
    embedTiles: true
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
  mkSet()
}
