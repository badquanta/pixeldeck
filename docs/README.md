<a name="top">PixelDeck links:</a>

[home](https://BadQuanta.github.io/pixeldeck/),
[github](https://github.com/BadQuanta/pixeldeck/),
[APIv0.0.1](https://badquanta.github.io/pixeldeck/pixeldeck/0.0.1/index.html),
 ...

### API Documentation:
* [0.0.1](./pixeldeck/0.0.1/index.html)

![CoverageSVG](https://badquanta.github.io/pixeldeck/coverage.svg)

## Developer's Blog

I'll try to share current struggles and progress below:

## Monday October 7th, @12:49am U.S.A./PST

This past week has been focused on documentation, coverage, and refactoring.
I spent way too much time on documentation; switching between `esdoc` and `jsdoc`.
I've decided to stick with `jsdoc` for now.

As one can see with the coverage badge above I've made some progress on testing; but it is far from good.
Just the bare minimum to reach roughly 50% coverage of code.

The major components that will not be testing until later revisions (0.2.0+) include the command line and repl/user interfaces.

The refactoring includes almost complete re-writes of entire systems; mostly mirroring existing code but removing some duplication.  The views have been, and will continue to be refactored in major ways.  I may move away from using the PUG extend feature in lue of possibly composing everything via included mixin libraries.

As for raw functionality the only new things are support for group layers and support for objects; far from complete support but rendering of test4 works but without animations.

---

## Monday September 30th, @02:25pm U.S.A./PST
This started with making [Tiled](https://www.mapeditor.org/) tilesets & tilemaps, and using Node & Pug to convert the JSON files it produced into SVG files.

Once I got that working, I converted it to do this live with an express http service; added some additional support for more than 1 tileset and infinite maps.

I have a lot more to do; here is the first screenshot of it correctly rendering two test maps.


[![Screenshot](https://badquanta.github.io/pixeldeck/imgs/Screenshot01.thumbnail.png "Screenshot" )](https://badquanta.github.io/pixeldeck/imgs/Screenshot01.png)

Currently this is accomplished by generating a Tilesheet & Tilemap as separate SVGs; embedding the Pixels of the tiles as a url in the `image` tag's `href` attribute, then exporting each individual tile as an `view` tag with the `viewBox` attribute set to the origin in the `image` of that tile.  But there is only a single `image` tag in the tilesheet SVG; that are visible through named ids.

For example: `some_tilesheet.svg#1`
would should generally 1 tile, the very first tile available in the tilesheet; while `some_tilesheet.svg` sould show the entire sheet.  This is because the tilesheet svg does not specify a size; and will always render to fill the available size when displayed: either zooming in a single tile, or scaling down the entire tilesheet to fit.

The tilemap is a 2nd SVG. Each tile in this is represented by an individual `image` tag; who's `href` attribute is pointing to a specific tilesheet svg & a tile id fragment: `<tilesheet>.svg#<tile_id>`.  Each tag must have it's height & width set; because the tilesheet does not specify this; and will scale to any size from 100% to 0%.


__The immediate next steps are to__: Investigate other means of generating the tilesheet & tilemap svgs.  This is to embed everything into a single HTML file (all  svgs, stylesheets, javascript, and possibly json data.)  The reason is so that this can all be sent to the client all at once.  White this is a multiplayer game; if it is possible to make single player games possible to play offline the embedding of both assets; game logic; and state into one file makes it ideal for  sharing and archiving.

back to [#top](#top)?