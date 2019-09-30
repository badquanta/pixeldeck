const cfg = require('./cfg')
const ui = module.exports = { blessed, tty: unimplemented, stdio: unimplemented }

if (ui[cfg.ui]) { ui.manager = ui[cfg.ui]() } else {
  throw new Error(`Unkown UI: ${cfg.ui}`)
}
function blessed () {

  var blessed = require('blessed');

  // Create a screen object.
  var screen = blessed.screen({
    smartCSR: true
  });

  screen.title = 'my window title';

  // Create a box perfectly centered horizontally and vertically.
  var box = blessed.box({
    top: 'center',
    left: 'center',
    width: '50%',
    height: '50%',
    content: 'Hello {bold}world{/bold}!',
    tags: true,
    border: {
      type: 'line'
    },
    style: {
      fg: 'white',
      bg: 'magenta',
      border: {
        fg: '#f0f0f0'
      },
      hover: {
        bg: 'green'
      }
    }
  });
  const dbg = new blessed.log({ parent: screen, left: 0, top: 0, height: 5, width: 10 })
  dbg.show(true)
  require('debug').log = dbg.log.bind(dbg)
  const stream = require('stream')
  const replTerm = require('term.js')()
  const repl = require('./repl')
  //process.stdout.unpipe(repl.outputStream)
  //repl.inputStream.unpipe(process.stdin)

  const replUi = new blessed.terminal({
    parent: screen, terminal: replTerm, handler: function () {
      repl.write(...arguments)

    }
  })






  const konsole = new blessed.log({ parent: screen })
  // Append our box to the screen.
  screen.append(box);
  //console.log = konsole.log.bind(konsole)

  // Add a png icon to the box
  var icon = blessed.image({
    parent: box,
    top: 0,
    left: 0,
    type: 'ansi',
    width: 'shrink',
    height: 'shrink',
    file: __dirname + '/my-program-icon.png',
    search: false
  });

  // If our box is clicked, change the content.
  box.on('click', function (data) {
    box.setContent('{center}Some different {red-fg}content{/red-fg}.{/center}');

    screen.program.clear();
    screen.render();
  });

  // If box is focused, handle `enter`/`return` and give us some more content.
  box.key('enter', function (ch, key) {
    box.setContent('{right}Even different {black-fg}content{/black-fg}.{/right}\n');
    box.setLine(1, 'bar');
    box.insertLine(1, 'foo');
    screen.render();
  });



  // Quit on Escape, q, or Control-C.
  screen.key(['escape', 'q', 'C-c'], function (ch, key) {
    return require('./close')()
  });

  // Focus our element.
  box.focus();

  // Render the screen.
  screen.render();

  return {
    close () {
      screen.quit()
    }
  }
}

function unimplemented () {
  throw new Error('Not implemented', arguments.callee.name)
}