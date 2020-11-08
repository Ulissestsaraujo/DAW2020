var http = require('http')
var fs = require('fs')
var aux = require('./mymod.js')
http.createServer(function(req,res){
    console.log(req.method + " " + req.url + " "+ aux.myDateTime())
    if(req.url.match(/\/((\d+)|index.html)$/)){
    if(req.url.match(/\/([1-9]|\d\d|1\d\d|2\d\d)$/)){
    var num  = req.url.split("/")[2]
    fs.readFile('site/arq'+num+'.html',function(err,data){
        res.writeHead(200,{'Content-Type':'text/html;charset=utf-8;'})
        res.write(data)
        res.end()
    })
}else if(req.url.match(/.\/index\.html/)){
    var num  = req.url.split("/")[2]
    fs.readFile(num,function(err,data){
        res.writeHead(200,{'Content-Type':'text/html;charset=utf-8;'})
        res.write(data)
        res.end()
    })
}else {
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8;'})
        res.write("<h3>O Arqueositio não existe.</h3>")
        res.end()
}
}
else{
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8;'})
        res.write("<p>O URL não corresponde ao esperado.</p>")
        res.end()
}
}).listen(7777)

