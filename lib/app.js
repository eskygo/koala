
/**
 * This is a server used only for development.
 * Do not use this in production!
 */
var http = require("http2");
var Bunyan = require('bunyan');
module.exports = function (app) {
  app.listen = function listen(port, cb) {
    if (typeof port === 'function') cb = port, port = null;
    var fn = app.callback();
    var server = http.raw.createServer({log: Bunyan.createLogger({name:"http2"})});
    server.on('request', fn);
    server.on('checkContinue', function (req, res) {
      req.checkContinue = true;
      fn(req, res);
    });
    server.listen(port || process.env.PORT, cb);
    return server;
  }
}
