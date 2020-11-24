var http = require('http')
var axios = require('axios')
var static = require('./static')

var {parse} = require('querystring')

// Aux. Functions
// Retrieves student info from request body --------------------------------
function recuperaInfo(request, callback){
    if(request.headers['content-type'] == 'application/x-www-form-urlencoded'){
        let body = ''
        request.on('data', bloco => {
            body += bloco.toString()
        })
        request.on('end', ()=>{
            console.log(body)
            callback(parse(body))
        })
    }
}

// POST Confirmation HTML Page Template -------------------------------------
function geraPostConfirm( task, d){
    return `
    <html>
    <head>
        <title>POST receipt: ${task.id}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>Tarefa ${task.id} inserida</h1>
            </header>

            <div class="w3-container">
                <p><a href="/tasks/${task.id}">Aceda aqui à sua página."</a></p>
            </div>

            <footer class="w3-container w3-teal">
                <address>Gerado por todo::DAW2020 em ${d} - [<a href="/">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `
}

function geraDeleteTask(d){
    return `
    <html>
    <head>
        <title> DELETE receipt</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="../w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>Tarefa Apagada</h1>
            </header>
            <footer class="w3-container w3-teal">
                <address>Gerado por todo::DAW2020 em ${d} - [<a href="/">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `
}


// Student List HTML Page Template  -----------------------------------------
function geraPagTasks( tasks, d){
  let pagHTML = `
    <html>
        <head>
            <title>Lista de Tarefas</title>
            <meta charset="utf-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
        </head>
        <body>
            <div class="w3-container w3-teal">
                <h2>Ongoing Tasks</h2>
            </div>
            <table class="w3-table w3-bordered">
                <tr>
                    <th>Categoria</th>
                    <th>Descrição</th>
                    <th>Due Date</th>
                    <th>Finished</th>
                    <th>Delete</th>
                </tr>
  `
  tasks.forEach( a => {
      if(a.finished=='false'){
    pagHTML += `
        <tr>
            <td><a href="/tasks/${a.id}">${a.id}</a></td>
            <td>${a.description}</td>
            <td>${a.due_date}</td>
            <td>${a.finished}</td>
            <td> <button onclick="location.href='http://localhost:7779/tasks/${a.id}/delete'" type="button"> Apagar </button>
            </td>
        </tr>
    `
      }
  })
  pagHTML += `</table>
            <div class="w3-container w3-teal">
                <h2>Finished Tasks</h2>
            </div>
            <table class="w3-table w3-bordered">
                <tr>
                    <th>Titulo</th>
                    <th>Descrição</th>
                    <th>Due Date</th>
                    <th>Finished</th>
                    <th></th>
                </tr>
            `
    tasks.forEach( a => {
        if(a.finished=='true'){
            pagHTML += `
                    <tr>
                        <td><a href="/tasks/${a.id}">${a.id}</a></td>
                        <td>${a.description}</td>
                        <td>${a.due_date}</td>
                        <td>${a.finished}</td>
                        <td> <button onclick="location.href='http://localhost:7779/tasks/${a.id}/delete'" type="button">Apagar</button> 
            </td>
                    </tr>
            `
        }
    })
  pagHTML += `</table>
        <div class="w3-container w3-teal">
        <button onclick="location.href='http://localhost:7779/tasks/registo'" type="button">Registrar</button> 
            <address>Gerado por todo::DAW2020 em ${d} --------------</address>
        </div>
    </body>
    </html>
  `
  return pagHTML
}

// Student HTML Page Template -------------------------------------------------------
function geraPagTask( task, d ){
    return `
    <html>
    <head>
        <title>Task: ${task.id}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>Task ${task.id}</h1>
            </header>

            <div class="w3-container">
                <ul class="w3-ul w3-card-4" style="width:50%">
                    <li><b>Quem faz: </b> ${task.owner}</li>
                    <li><b>Descrição: </b> ${task.description}</li>
                    <li><b>Data de Criação: </b> ${task.creation_date}</li>
                    <li><b>Data de finalização: </b> ${task.due_date}</li>
                    <li><b>Finished: </b> ${task.finished}</li>
                </ul>
            </div>

            <footer class="w3-container w3-teal">
                <address>Gerado por todo::DAW2020 em ${d} - [<a href="/">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `
}

// Student Form HTML Page Template ------------------------------------------
function geraFormTask( d ){
    return `
    <html>
        <head>
            <title>Registo de uma Tarefa</title>
            <meta charset="utf-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
        </head>
        <body>
        
        </body>
            <div class="w3-container w3-teal">
                <h2>Registo de Tarefa</h2>
            </div>

            <form class="w3-container" action="/tasks" method="POST">
                <label class="w3-text-teal"><b>Owner</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="owner">
          
                <label class="w3-text-teal"><b>Identificador</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="id">

                <label class="w3-text-teal"><b>Categoria</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="category">

                <label class="w3-text-teal"><b>Descrição</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="description">

                <label class="w3-text-teal"><b>Data de inicio</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="creation_date">
                <label class="w3-text-teal"><b>Data de fim</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="due_date">
                <label class="w3-text-teal"><b>Finished?(Insira true ou false)</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="finished">
                <input class="w3-btn w3-blue-grey" type="submit" value="Registar"/>
                <input class="w3-btn w3-blue-grey" type="reset" value="Limpar valores"/> 
            </form>

            <footer class="w3-container w3-teal">
                <address>Gerado por todo::DAW2020 em ${d}</address>
            </footer>
        </body>
    </html>
    `
}

// Server setup

var galunoServer = http.createServer(function (req, res) {
    // Logger: que pedido chegou e quando
    var d = new Date().toISOString().substr(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Request processing
    // Tests if a static resource is requested
    if(static.recursoEstatico(req)){
        static.sirvoRecursoEstatico(req, res)
    }
    else{
    // Normal request
    switch(req.method){
        case "GET": 
            // GET /alunos --------------------------------------------------------------------
            if((req.url == "/") || (req.url == "/tasks")){
                axios.get("http://localhost:3000/tasks?_sort=title")
                    .then(response => {
                        var tasks = response.data

                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(geraPagTasks(tasks, d))
                        res.end()
                    })
                    .catch(function(erro){
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write("<p>Não foi possível obter a lista de tarefas...")
                        res.end()
                    })
            }
            // GET /alunos/:id --------------------------------------------------------------------
            else if(/\/tasks\/[0-9]+$/.test(req.url)){
                var idTask = req.url.split("/")[2]
                axios.get("http://localhost:3000/tasks/" + idTask)
                    .then( response => {
                        let a = response.data
                        
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(geraPagTask(a, d))
                        res.end()
                    })
            }
            // GET /alunos/registo --------------------------------------------------------------------
            else if(req.url == "/tasks/registo"){
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write(geraFormTask(d))
                res.end()
            }else if(/\/tasks\/[0-9]+\/delete$/.test(req.url)){
                var idTask = req.url.split("/")[2]
                axios.delete("http://localhost:3000/tasks/" + idTask)
                    .then( response => {
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(geraDeleteTask(d))
                        res.end()
                    }).catch(function(erro){
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write("<p>Não foi possível apagar a tarefa...")
                        res.end()
                    })
            }
            else{
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " " + req.url + " não suportado neste serviço.</p>")
                res.end()
            }
            break
        case "POST":
            if(req.url == '/tasks'){
                recuperaInfo(req, resultado => {
                    console.log('POST de tarefa:' + JSON.stringify(resultado))
                    axios.post('http://localhost:3000/tasks', resultado)
                        .then(resp => {
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(geraPostConfirm( resp.data, d))
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write('<p>Erro no POST: ' + erro + '</p>')
                            res.write('<p><a href="/">Voltar</a></p>')
                            res.end()
                        })
                })
            }
            else{
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write('<p>Recebi um POST não suportado.</p>')
                res.write('<p><a href="/">Voltar</a></p>')
                res.end()
            }
            break
        default: 
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write("<p>" + req.method + " não suportado neste serviço.</p>")
            res.end()
    }
    }
})

galunoServer.listen(7779)
console.log('Servidor à escuta na porta 7779...')