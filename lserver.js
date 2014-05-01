#!/usr/bin/env node
var http = require('http')
  , url  = require('url')
  , path = require('path')
  , fs   = require('fs')
  , mime = require('mime')

var port = 8000
  , root = __dirname

if (process.argv.length > 2) {
  if (isNaN(process.argv[2])) {
    root = process.argv[2] || root
    port = +process.argv[3] || port
  } else {
    port = +process.argv[2] || port
    root = process.argv[3] || root
  }
}

http.createServer(function requestHandler(req, res) {
  var uriPath  = url.parse(req.url).pathname,
      filePath = path.join(root, unescape(uriPath))

  console.log('Serving ' + uriPath)
  handle(filePath)

  function handle(filePath) {
    fs.stat(filePath, function(err, stat) {
      if (err) {
        res.statusCode = err.code == 'ENOENT' ? 404 : 500
        res.end()
        console.error(err)
      } else if (stat.isDirectory()) {
        handle(path.join(filePath, 'index.html'))
      } else {
        var contentType = mime.lookup(path.extname(filePath))
        res.writeHead(200, { 'Content-Type': contentType })
        fs.createReadStream(filePath).pipe(res)
      }
    })
  }
}).listen(port)

console.log('Server running at http://localhost:' + port + '/' + ' [root: ' + root + ']')