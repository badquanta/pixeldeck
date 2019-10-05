'use strict'


const base = require('./base')

const _Model = require('./_Model')
const arch = require('../arch')
const dbg = require('../dbg').extend('data:TileMaps')
/**
 * Object Relational Model Root for `TileMaps` loki collection.
 */
class TileMaps extends _Model {

  constructor (json) {
    super(json)
    const defineReaders = (...fields)=>{
      Object.defineProperties(this,fields.reduce((obj,field )=>{
        obj[field]={get:function(){return this.record[field]},enumerable:true}
        return obj
      },{}))
    }
    defineReaders(
      'height',
     'infinite',
     'layers',
     'nextlayerid',
     'nextobjectid',
     'orientation',
     'renderorder',
     'tiledversion',
     'tileheight',
     'tilesets',
     'tilewidth',
     'type',
     'version',
     'width',
     'path',
     'meta'
    )
  }





}
TileMaps.collection = base.addCollection ('TileMaps', { })
module.exports = TileMaps
