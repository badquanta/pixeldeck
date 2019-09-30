<a name="top">PixelDeck links:</a>

[home](https://BadQuanta.github.io/pixeldeck/)
[github](https://github.com/BadQuanta/pixeldeck/)
[APIv0.0.1](https://badquanta.github.io/pixeldeck/pixeldeck/0.0.1/index.html)
 ...

---

### About:

A work-in-progress environment for 2d games.  Lots of goals.

[![Screenshot](https://badquanta.github.io/pixeldeck/imgs/Screenshot01.thumbnail.png "Screenshot" )](https://badquanta.github.io/pixeldeck/imgs/Screenshot01.png)

---

### License:

The license is the G.N.U. G.P.L. for everything within the [repository](https://github.com/BadQuanta/pixeldeck) this [README](./README.md) and/or [LICENSE](./LICENSE.md) were found.

---

### Credits:



In general order of addition to repository.  Please [create a new issue](https://github.com/badquanta/pixeldeck/issues/new) if there is a missing credit and/or something is incorrect or incomplete.

---

### TileSets:

###### Sources:

* From [bluecarrot16]() [lpc-terrains](https://opengameart.org/content/lpc-terrains)

---

###### characters

* TODO:
  * [ ] cat
  * [ ] dog
  * [ ] rat
  * [ ] bird
  * [ ] tree
  * [ ] grass/flower/tree?

---

###### objects

* [ ] TODO: Objects
* [ ] ground/floor/bridge/etc...
* [ ] walls/doors/windows
* [ ] NPC
  * [ ] Server NPCs
  * [ ] Client NPCs
* [ ] Players
  * [ ] Multi player w/ Server
  * [ ] Single player
    * [ ] with Server
    * [ ] without Server


---

###### javascript libraries:

there are really so many, so check out [package.json](./package.json) if you really want to see just the top level dependencies.  Here are the top 10 highlights (so var...)

  1) [express](http://expressjs.com/en/4x/api.html) used for server http server to javascript api handling
  2) [lokijs](https://github.com/techfort/LokiJS) I'm using this to provide an `isomorphic database` that will run identically on the client & the server. It also should support synchronizing changes between the client & server. This concept has yet to be prototyped.
  3) [#TODO mocha](https://mochajs.org/), along with libraries like [#TODO supertest](#TODO), [#TODO chai](#TODO), [#TODO approvals](#TODO) and others
  4) [pug](https://pugjs.org/) is an excellent tool for XML generation, and utilized her for `SVG` and `HTML` templates.
  5) [#TODO socket.io](https://socket.io/) Not yet really utilized; but intended to be the backbone of `loki database` synchronization.
  6) [jsdoc](https://jsdoc.app/) generates our excellent documentation.
  7) [nodemon](#TODO) TODO:
  9) [nyc](#TODO) TODO:
  10) [config](#TODO) TODO:

---

<a name="TODO">&nbsp;</a>

###### TODOs



things I need to get done:

* [x] a lot...
* [ ] give due credit
* [ ] pacjage.json [config](https://docs.npmjs.com/misc/config)
* [ ] rewview package.json [scripts](https://docs.npmjs.com/misc/scripts)
  1) `prepublish:` _generate docs?_
  2) `prepare:` something
  1) __(publish)__
      `prepublishOnly`: Run BEFORE the package is prepared and packed, ONLY on publish. (See below.)
  1) __(pack| publish)__
      1) `prepack`: run BEFORE a tarball is packed when installing git dependencies
      2) `postpack:` Run AFTER the tarball has been generated and moved to its final destination.
  1) __publish__
      1) `publish, postpublish:` Run AFTER the package is published.
  1) __install__ `preinstall:` Run BEFORE the package is installed
install, postinstall: Run AFTER the package is installed.
  1) __install__ `preuninstall, uninstall:` Run BEFORE the package is uninstalled.
  1) postuninstall: Run AFTER the package is uninstalled.
  1) preversion: Run BEFORE bumping the package version.
  1) version: Run AFTER bumping the package version, but BEFORE commit.
  1) postversion: Run AFTER bumping the package version, and AFTER commit.
pretest, test, posttest: Run by the npm test command.
prestop, stop, poststop: Run by the npm stop command.
prestart, start, poststart: Run by the npm start command.
prerestart, restart, postrestart: Run by the npm restart command. Note: npm restart will run the stop and start scripts if no restart script is provided.
preshrinkwrap, shrinkwrap, postshrinkwrap: Run by the npm shrinkwrap command.

* [ ] version 0.0.1

back to [#top](#top)?