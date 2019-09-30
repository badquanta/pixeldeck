/**
 * @name server
 * @description [Node.js http.Server](https://nodejs.org/docs/latest-v10.x/api/http.html#http_class_http_server) instance for our [indexed express application](./index.js.html).
 */
module.exports = require('http').createServer(require('./index'))
