const cfg = require('./cfg')
const ui = module.exports = { blessed, tty: unimplemented, stdio: unimplemented }

if (ui[cfg.ui]) { ui.manager = ui[cfg.ui]() } else {
  throw new Error(`Unkown UI: ${cfg.ui}`)
}
function blessed () {

}

function unimplemented () {
  throw new Error('Not implemented', arguments.callee.name)
}