#!/usr/bin/env node
const express = require('express')
const app = express()

const fs = require('fs')
const path = require('path')
const resDir = path.resolve(__dirname, './res')
const package = require('./package')
const dbg = require('debug')(package.name)
const datauri = require('datauri')
app.set('view engine', 'pug')
app.locals.cache = false
app.locals.compileDebug = true
const dbgTs = dbg.extend('tileset')
let datauris = {}
app.get(/\/(.*)\.ts\.svg/, function (req, res, next) {
  dbgTs('rendering %o...', req.path)
  let inputPath = path.join(resDir, req.path.replace('.ts.svg', '.json'))
  if (fs.existsSync(inputPath)) {
    const json = fs.readFileSync(inputPath)
    //dbg('read json file: %o',json)
    const data = JSON.parse(json)
    //dbg('parsed json %o', data)
    Object.assign(res.locals, data, {json,data})
  } else {
    return next('unable to load tileset')
  }
  dbgTs('locals:',res.locals.image)
  const tsImgPath = path.join(path.dirname(inputPath), res.locals.image)
  if (!datauris[tsImgPath]) {
    dbgTs('loading tileset image into data uri')
    datauris[tsImgPath] = new datauri(tsImgPath)
  }
  res.locals.image = datauris[tsImgPath].content

  res.locals.doctype = 'svg'
  res.locals.pretty = true
  res.type('svg')
  res.render('tileset')
  dbgTs('%o rendered.', req.path)
})
const dbgTm = dbg.extend('tilemap')
app.get(/\/(.*)\.tm\.svg/, function (req, res, next) {
  dbgTm('get tilemap', req.path)
  let inputPath = path.join(resDir, req.path.replace('.tm.svg', '.json'))
  if (require.cache[inputPath]) {
    dbgTs('unloaded previously loaded input data...')
    delete require.cache[inputPath]
  }
  try {
    res.locals = require(inputPath)
  } catch (e) {
    next(e)
  }
  res.locals.doctype = 'svg'
  res.locals.pretty = true
  res.type('svg')
  res.render('tilemap')
  dbgTm('%o rendered', req.path)
})

app.get('/', function (req, res) {
  res.locals.app = app
  res.render('main')
})

if (require.main === module) {
  const server = app.listen(4444, function () {
    dbg('listening')
    const repl = require('repl')
    app.repl = repl.start()
    Object.defineProperties(app.repl.context, {
      app: { get: () => app },
      server: { get: () => server }
    })
    app.repl.on('close', function () {
      dbg('closing....')
      server.close();
    })
  })
}
