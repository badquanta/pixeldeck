#!/usr/bin/env node
var To_vFile = require('to-vfile')
var Unified = require('unified')
var Markdown = require('remark-parse')
var Man = require('remark-man')
var Path = require('path')
var Commander = require('commander')
Commander.usage("<path-to-file.md> [-o, --option=value]")
Commander.parse(process.argv)
//console.log('Commander:',Commander)
if(!Commander.args.length>0)Commander.help()
Unified()
  .use(Markdown)
  .use(Man)
  .process(To_vFile.readSync(Commander.args[0]), function(err, file) {
    if (err) throw err
    file.extname = '.1'
    file.dirname = Path.resolve(__dirname,'../man/')
    To_vFile.writeSync(file)
  })