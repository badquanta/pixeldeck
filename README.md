<a name="top">PixelDeck links:</a>

[home](https://BadQuanta.github.io/pixeldeck/),
[github](https://github.com/BadQuanta/pixeldeck/),
[APIv0.0.1](https://badquanta.github.io/pixeldeck/pixeldeck/0.0.1/index.html),
 ...

## About:



The general idea is to make a fun multiplayer 2d rpg engine/framework.

[![Screenshot](https://badquanta.github.io/pixeldeck/imgs/Screenshot01.thumbnail.png "Screenshot" )](https://badquanta.github.io/pixeldeck/imgs/Screenshot01.png)


## License:

The license is the G.N.U. G.P.L. for everything within the [repository](https://github.com/BadQuanta/pixeldeck) this [README](./README.md) and/or [LICENSE](./LICENSE.md) were found.

## Credits:

In general order of addition to repository.  Please [create a new issue](https://github.com/badquanta/pixeldeck/issues/new) if there is a missing credit and/or something is incorrect or incomplete.

### tilesets:

* From [bluecarrot16]() [lpc-terrains](https://opengameart.org/content/lpc-terrains)

### characters (sets):



### javascript libraries:

there are really so many, so check out [package.json](./package.json) if you really want to see just the top level dependencies.  Here are the top 10 highlights (so var...)

  1) [express](#TODO) TODO:
  2) [lokijs](#TODO) TODO:
  3) [mocha](#TODO) TODO:
  4) [pug](#TODO) TODO:
  5) [socket.io](#TODO) TODO:
  6) [jsdoc](#TODO) TODO:
  7) [nodemon](#TODO) TODO:
  9) [nyc](#TODO) TODO:
  10) [config](#TODO) TODO:


<a name="TODO">&nbsp;</a>

# TODOs



things I need to get done:

* [x] a lot...
* [ ] give due credit
* [ ] pacjage.json [config](https://docs.npmjs.com/misc/config)
* [ ] rewview package.json [scripts](https://docs.npmjs.com/misc/scripts)
  1) __(local install|pack|publish)__
      1) `prepublish:` _generate docs?_
      2) `prepare:` something
  1) __(publish)__
      `prepublishOnly`: Run BEFORE the package is prepared and packed, ONLY on publish. (See below.)
  1) __(pack| publish)__
      1) `prepack`: run BEFORE a tarball is packed when installing git dependencies
      2) `postpack:` Run AFTER the tarball has been generated and moved to its final destination.
  * __publish__ `publish, postpublish:` Run AFTER the package is published.
  * __install__ `preinstall:` Run BEFORE the package is installed
install, postinstall: Run AFTER the package is installed.
  * __install__ `preuninstall, uninstall:` Run BEFORE the package is uninstalled.
  * postuninstall: Run AFTER the package is uninstalled.
  * preversion: Run BEFORE bumping the package version.
  * version: Run AFTER bumping the package version, but BEFORE commit.
  * postversion: Run AFTER bumping the package version, and AFTER commit.
pretest, test, posttest: Run by the npm test command.
prestop, stop, poststop: Run by the npm stop command.
prestart, start, poststart: Run by the npm start command.
prerestart, restart, postrestart: Run by the npm restart command. Note: npm restart will run the stop and start scripts if no restart script is provided.
preshrinkwrap, shrinkwrap, postshrinkwrap: Run by the npm shrinkwrap command.

* [ ] version 0.0.1


back to [#top](#top)?