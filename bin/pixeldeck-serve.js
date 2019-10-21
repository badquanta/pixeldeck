#!/usr/bin/env node
const Serve = require('../lib/cli/Serve')
const cmdServe = new Serve()
module.exports = cmdServe
if (require.main === module) cmdServe.main()
