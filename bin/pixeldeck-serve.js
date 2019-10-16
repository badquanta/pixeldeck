#!/usr/bin/env node
const Commander = require('commander')
Commander.option('-i, --interactive', 'Turn on REPL')
Commander.option('-b, --batch', 'Turn off REPL')
Commander.on('option:interactive', function () {
  require('../lib/cfg').interactive = true
})
Commander.on('option:batch', function () {
  require('../lib/cfg').interactive = false
})

Commander.parse(process.argv)
if (require.main === module) require('../lib/server').Start()
