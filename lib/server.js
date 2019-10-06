/**
 * @name server
 * @desc [Node.js http.Server](https://nodejs.org/docs/latest-v10.x/api/http.html#http_class_http_server) instance for our [indexed express application](./index.js.html).
 */
// eslint-disable-next-line no-unused-vars
const server = module.exports = require('http').createServer(require('./service'))
