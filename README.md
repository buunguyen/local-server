local-server
============

Simple static web server.

### Install
```
npm install local-server -g
```

### Usage

```
lserver -p [port] -r [root folder] -f [fallback path if not found]
```

Arguments (all are optional):

* `p`: [`Number`] port number, default to 8000
* `r`: [`String`] root folder, default to working directory
* `f`: [`String`] fallback path when page not found, default to not falling back and send 404

For example
```
lserver -p 9000 -r ./ -f index.html
=> Server running at http://localhost:9000/ [root: ./, fallback: index.html]
```

That's all!