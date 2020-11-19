var express = require('express');
var todocontroller = require( './controllers/todocontroller');


var app = express();

 app.set('view engine', 'ejs');

 //static file

 app.use(express.static('./public'));

 
// fire todo controller
todocontroller(app);

let port = process.env.PORT;
if(port == null || port == "")
{
	port = 3000;
}
 app.listen(port);
 console.log('listening at port 3000');   