var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// connect to databse

mongoose.connect('mongodb://shani:qwerty123@ds261114.mlab.com:61114/shani');


//schema 

var todoSchema = new mongoose.Schema({
	item: String
});

var Todo = mongoose.model('Todo' , todoSchema);
var itemOne = Todo({item: 'Get Flower'}).save(function(err)
	{
		if(err) throw err;
		console.log('item saved');
	});


//var data = [{item: 'get milk'},{item: 'walk dog'},{item: 'sleep'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});
 


module.exports = function(app)
{

app.get('/todo' , function(req , res){	
// get data from database
Todo.find({},function(err,data){
	if(err) throw err;

res.render('todo', {todos: data});
});
});


app.post('/todo',urlencodedParser, function(req , res) {
	
   var newTodo = Todo(req.body).save(function(err,data){
   	if(err) throw err;
   
    res.json(data);
});
	  
});


app.delete('/todo:item',  function(req , res) {
	
	Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err , data) {
		if(err) throw err;
		res.json(data);
	});
});
}