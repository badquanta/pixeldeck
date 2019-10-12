module.exports = mkMap
const arch = require('../lib/arch')
const mapViewFormats = {
  ".html": arch.Path.resolve(__dirname,'tileMap/html.pug')
  ".svg": arch.Path.resolve(__dirname,'tileMap/svg.pug')
}

function mkMap(data, options){

}