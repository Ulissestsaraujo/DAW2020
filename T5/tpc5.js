var http = require('http')
var axios = require('axios')
http.createServer(function(req,res){
    console.log(req.method + ' '+ req.url)
if(req.method == 'GET'){
    if(req.url == '/'){
        res.writeHead(200,{'Content-Type':'text/html;charset=utf-8;'})
        res.write('<h2>Escola de Música </h2>')
        res.write('<ul>')
        res.write('<li><a href="/alunos">Lista de Alunos </a> </li>')
        res.write('<li><a href="/cursos">Lista de Cursos </a></li>')
        res.write('<li><a href="/instrumentos">Lista de Instrumentos</a></li>')
        res.write('</ul>')
        res.end()
    }else if(req.url=='/alunos'){
        axios.get('http://localhost:3001/alunos')
    .then(resp=>{
        alunos = resp.data;
        res.writeHead(200,{'Content-Type':'text/html;charset=utf-8;'})
        res.write('<h2>Escola de Música: Lista de alunos</h2>')
        res.write('<ul>')
        alunos.forEach(a =>{
            res.write('<li>'+a.id+ ' - '+a.nome +'</li>')
        });
        res.write('</ul>')
        res.write('<address>[<a href="/">Voltar </a>]</address>')
        res.end()
    })
    .catch(function (error){
        console.log('Erro na obtenção da lista de alunos: '+error);
    })
    }else if(req.url=='/cursos'){
        axios.get('http://localhost:3001/cursos')
    .then(resp=>{
        cursos = resp.data;
        res.writeHead(200,{'Content-Type':'text/html;charset=utf-8;'})
        res.write('<h2>Escola de Música: Lista de cursos</h2>')
        res.write('<ul>')
        cursos.forEach(c =>{
            res.write('<li>'+c.id+ ' - '+c.designacao +'</li>')
        });
        res.write('</ul>')
        res.write('<address>[<a href="/">Voltar </a>]</address>')
        res.end()
    })
    .catch(function (error){
        console.log('Erro na obtenção da lista de cursos: '+error);
    })
    }else if(req.url=='/instrumentos'){
        axios.get('http://localhost:3001/instrumentos')
    .then(resp=>{
        instrumentos = resp.data;
        res.writeHead(200,{'Content-Type':'text/html;charset=utf-8;'})
        res.write('<h2>Escola de Música: Lista de instrumentos</h2>')
        res.write('<ul>')
        instrumentos.forEach(i =>{
            res.write('<li>'+i.id+ ' - '+i["#text"] +'</li>')
        });
        res.write('</ul>')
        res.write('<address>[<a href="/">Voltar </a>]</address>')
        res.end()
    })
    .catch(function (error){
        console.log('Erro na obtenção da lista de instrumentos: '+error);
    })
    }
    else{
        res.writeHead(200,{'Content-Type':'text/html'})
        res.write("<p>Pedido não suportado: " +req.method +" "+req.url+ "</p>")
        res.end()
    }
}

else {
    res.writeHead(200,{'Content-Type':'text/html'})
        res.write("<p>Pedido não suportado: " +req.method +" "+req.url+ "</p>")
        res.end()
}
}).listen(4000)

console.log('Servidor à escuta na porta 4000...')

