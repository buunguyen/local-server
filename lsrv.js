#!/usr/bin/env node
var http = require('http'),
    url  = require('url'),
    path = require('path'),
    fs   = require('fs')

var PORT_NUMBER = Number(process.argv[2]) || 8000, 
    ROOT_FOLDER = process.argv[3] || './',
    MIME_TYPES  = {
      '.html' : 'text/html',
      '.js'   : 'text/javascript',
      '.css'  : 'text/css',
      '.jpeg' : 'image/jpeg',
      '.jpg'  : 'image/jpeg',
      '.png'  : 'image/png'
    }

http.createServer(function requestHandler(req, res) {
  var uriPath  = url.parse(req.url).pathname,
      filePath = path.join(ROOT_FOLDER, unescape(uriPath))
  handle(filePath)

  function handle(filePath) {
    fs.stat(filePath, function(err, stat) {
      if (err) {
        res.writeHead(err.code == 'ENOENT' ? 404 : 500, { 'Content-Type': 'text/html' })
        res.end(err.toString())
        console.log('Error', err)
      } else if (stat.isDirectory()) {
        handle(path.join(filePath, 'index.html'))
      } else {
        var mime = MIME_TYPES[path.extname(filePath)] || 'text/plain'
        res.writeHead(200, { 'Content-Type': mime })
        fs.createReadStream(filePath).pipe(res)
        console.log('Sent', filePath)
      }
    })
  }
}).listen(PORT_NUMBER)

console.log('Server running at http://localhost:' + PORT_NUMBER + '/' + ' with root ' + ROOT_FOLDER)