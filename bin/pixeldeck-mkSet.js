#!/usr/bin/env node
const MakeSet = require('../lib/cli/MakeSet')
const makeSet = new MakeSet()
if (require.main === module) { makeSet.main() }

const TiledMaps = require('../lib/mdl/TiledMap')
const Path = require('path')
const pug = require('pug')
const tileSetViewPaths = {
  html: Path.resolve(__dirname, '../views/tileSet/html.pug'),
  svg: Path.resolve(__dirname, '../views/tileSet/svg.pug')
}

const viewBasePath = Path.resolve(__dirname, '../views')

async function mkSet () {
  this.parse(process.argv)

  const inputFile = this.args.shift()
  const outputFile = this.args.shift()
  let outputFormat = Path.extname(outputFile).slice(1)
  if (!outputFormat || (outputFormat === '')) {
    outputFormat = this.format
  }
  const tileSetViewPath = tileSetViewPaths[outputFormat]
  if (!tileSetViewPath) {
    throw new Error('Unknown format type "' + outputFormat + '"')
  }
  const setJson = JSON.parse(fs.readFileSync(inputFile, 'utf8'))
  setJson.path = inputFile
  const tileSet = new TiledMaps(setJson)
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
  return require('../lib/data').disknex()
}

if (require.main === module) {
  mkSet()
}
