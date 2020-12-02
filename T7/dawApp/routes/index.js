var express = require('express');
var router = express.Router();

var Student = require('../controllers/student')

function studentBuilder(b){
  return{
    "numero" : b['number'],
    "nome" : b['name'],
    "git" : b['git'],
    "tpc" : [
      (b['1'] == "on") ? 1:0,
      (b['2'] == "on") ? 1:0,
      (b['3'] == "on") ? 1:0,
      (b['4'] == "on") ? 1:0,
      (b['5'] == "on") ? 1:0,
      (b['6'] == "on") ? 1:0,
      (b['7'] == "on") ? 1:0,
      (b['8'] == "on") ? 1:0,
    ]
  }
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//GET students
router.get('/students', function(req, res) {
  // Data retrieve
  Student.list()
    .then(data => res.render('students', { list: data }))
    .catch(err => res.render('error', {error: err}))
  ;
});

//GET Register form
router.get('/students/register', function(req,res){
  res.render('register')
});

//GET student page by id
router.get('/students/:id',function(req,res){
  var id = req.params.id
  Student.lookUp(id)
        .then(data =>res.render('student',{student: data, error:id}))
        .catch(err => res.render('error',{error:err}))
});

//POST student
router.post('/students',function(req,res){
  var student = studentBuilder(req.body)
  Student.insert(student)
      .then(data =>{
        Student.list().then(new_data=>res.render('students',{list:new_data}))
        .catch(err=>res.render('error',{error:err}
      ))
      })
      .catch(error => res.render("error",{error:error}))
});


//Get student to edit it

router.get('/students/edit/:id', function(req,res){
  var id = req.params.id
  Student.lookUp(id)
      .then(data=>res.render('edit', {student:data,error:id})
      .catch(err=>res.render('error',{error:err})))
});
//PUT student
router.post('/students/edit/:id', function(req,res){
  var student = studentBuilder(req.body)
  console.log(`
  ${student.numero}
  ${student.nome}`)

  Student.edit(student).then(data => {
    Student.list().then(new_data=> res.render('students',{list:new_data}))
    .catch(err=>res.render('error',{error:err}))
  })
  .catch(err => res.render('error',{error:err}))
})


// Delete a student
router.get('/students/delete/:id', function(req, res) {
  var id = req.params['id']
  Student.delete(id)
    .then(data => {
      Student.list()
        .then(new_data => res.render('students', {list: new_data}))
        .catch(err => res.render('error', {error: err}))
    })
    .catch(err => res.render('error', {error: err}))
});


module.exports = router;
