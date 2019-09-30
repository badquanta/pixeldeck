[GitHub repository](https://github.com/BadQuanta/pixeldeck)

### API Documentation:
* [0.0.1](./pixeldeck/0.0.1/index.html)

## Developer's Blog

I'll try to share current struggles and progress below:

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
