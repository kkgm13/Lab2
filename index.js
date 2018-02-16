// console.log("index.js executing");

//Link to the imported code
var router = require('./routes/hello.js');
//Express NPM
var express = require('express');
//Link Express as an app
var app = express();

// app.get('/', function(req,res){
// 	res.send('Hello, World!');
// });

// app.post('/', function(req,res){
// 	res.send('NOT FOUND!');
// });

//Based of module, use this to execute the app
app.use('/', router);

/*Port Forwarding information*/
var port = 3000; //Create a port number
//Listen to the port and do stuff
app.listen(port, function(){
	//Output that it is now listening on the intended port
	console.log('Listening on port ' + port);
});