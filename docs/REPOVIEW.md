Here I will try to document an overview of implementation and examples; as well as the project progress, the goals, and perhaps my thoughts along the way.

## Overview of repository on Monday Sep 30th 2019

* `bin/` home to "binaries" (A.K.A: command, program, executable, application, software)
  * `pixeldeck.js`  command line interface the intended interface for starting and stopping the service.
* `config/` home to the programmer's collection of defaults
  * `default.js` the default's default.
* `docs/` various documentation resides here:
  * `imgs/` for screenshots, diagrams, etc.
  * `pixeldeck/` contains jsdoc` auto-generated html content that is revision-controlled.
  * `README.md` acts as the project's [Home](https://badquanta.github.io/pixeldeck/) `GitHub.io Page'; as well as the other content in this directory.
* `lib/` meat and potatoes of the project
  * `service/`
    * `app.js` contains the root `express()` application instances with basic configuration applied.
    * `index.js` map routes on `app.js` to the `express handler functions`; but also returns access to directory modules as auto-requires.
  * `cfg.js` manages the loading of the `../config` settings, as well as the searching for system, user, or current working directory overrides.
  * `close.js` is a `async function` that manages the shutdown process of the various `pixeldeck` components.
  * `db.js` contains the service's `loki.js` in memory database; persisted to the local running environment.
  * `express handler functions:`
    * `getRoot.js` =>   __/__
    * `getTilesetSvg.js` => __/*.ts.svg__
    * `getTilemapSvg.js` => __/*.tm.svg__

      2) [ ] provide a handy-dandy require-on-demand index of all components
  * `repl.js` is a `function object`
  provides an interactive interface to the `pixeldeck` service as it runs. Intended for development and possibly administrative purposes; as the service does not need to run the `repl` for it's core functionality.  I'm considering writing a nice T.U.I. for the server-side console... but honestly that's feature-creep.
    * _WARNING: WILL BE REFACTORED_
  * `server.js` contains the instance of node.js's `http.httpServer` for this `./app.js`
  * `start.js` is a `async function` that manages the startup process of various `pixeldeck` components.
  * `TileSet.js` is my first stab at a `database model` using `Loki.js`.
  * `ui.js`  currently not used; intended to be an optional developer's or administrator's T.U.I.
    * _WARNING: WILL BE REFACTORED_
* `man/`
  To be installed with pixeldeck command so that man commands work
  ```shell
  $>  man pixeldeck
  $>  man pixeldeck-topic
  ```

* `res/`
  The core TileSheets that I'm using for proof of concept.  They may be stripped out of the library; to be included with an optional and replaceable peer dependency
* `test/`
  * [TODO](#TODO)
* `views/`
  * `credits.pug`
  * `_tilemap.pug`
  * `.HTML.pug`
  * `.SVG.pug`
  * `main.pug`
  * `tilemap.pug`
  * `tileset.pug`
* `LICENSE` All of this code is licensed under the G.N.U. G.P.L. version 3.0, a markdown formatted version of this license is [available](https://github.com/badquanta/pixeldeck/blob/master/docs/LICENSE.md).