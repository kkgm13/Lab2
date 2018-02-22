// console.log("index.js executing");

//Express NPM
var express = require('express');
//Link Express as an app
var app = express();
//Link to the imported code
var router = require('./routes/hello.js');

// app.get('/', function(req,res){
// 	res.send('Hello, World!');
// });

// app.post('/', function(req,res){
// 	res.send('NOT FOUND!');
// });


//Easy Database congiguration
var config = {
      /*Port Forwarding information*/
  port = 3000;, //Create a port number
  //Call MongoDB Database
  db: {
    url:'mongodb://localhost:27017/test'
  }
};

//Messages.JS Importation
var messages = require('./lib/messages.js')(
	function(err){
		if(err) new Error(err);
		//Based of module, use this to execute the app
		app.use('/', router);
		//
		app.use('/api/v1/messages',require('./routes/messages.js')(messages));
		//Listen to the port and do stuff
		app.listen(port, function(){
			//Output that it is now listening on the intended port
			console.log('Listening on port ' + port);
		});
	}
);