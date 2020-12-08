var express = require('express')
var bodyParser = require('body-parser')
var templates = require('./html-templates')
var jsonfile = require('jsonfile')
var logger = require('morgan')
var multer = require('multer')
var upload = multer({dest: 'uploads/'})
var fs = require('fs')
const { dirname } = require('path')


var app = express()

//set logger
app.use(logger('dev'))
app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json())

app.use(express.static('public'))

app.get('/',function(req,res){
    var d = new Date().toISOString().substr(0,16)
    var files = jsonfile.readFileSync('./dbFiles.json')
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
    res.write(templates.fileList(files,d))
    res.end()
})

app.get('/files/upload',function(req,res){
    var d = new Date().toISOString().substr(0,16)
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
    res.write(templates.fileForm(d))
    res.end()
})



app.get('/files/download/:fname', (req,res)=>{
    res.download(__dirname + '/public/fileStore/' + req.params.fname)
})



app.post('/files',upload.array('myFile'),function(req,res){
  // req.file is the 'myFile' file
  //req.body will hold the text fields if any´
  //multiple files: upload.array(...) => files is an array
    for(var x = 0; x<req.files.length;x++){

  let oldPath = __dirname+ '/' + req.files[x].path
  let newPath = __dirname + '/public/fileStore/' + req.files[x].originalname

  fs.rename(oldPath,newPath,function(err){
      if(err) throw err
  })

  var d = new Date().toISOString().substr(0,16)
  var files = jsonfile.readFileSync('./dbFiles.json')
  files.push(
      {
          date:d,
          name:req.files[x].originalname,
          size:req.files[x].size,
          mimetype:req.files[x].mimetype,
          desc:req.body.desc[x]
      }
  )
  jsonfile.writeFileSync('./dbFiles.json',files)
}
  res.redirect('/')
})

app.listen(7700,() =>console.log('Servidor à escuta na porta 7700..'))