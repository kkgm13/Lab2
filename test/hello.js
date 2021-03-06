const chai    = require('chai');	//Chai NPM
const expect  = chai.expect;		//Expect Chai
const request = require('superagent');	//SuperAgent NPM
const status  = require('http-status');	//HTTP Status

//Create constant to store URL
const apiRoot = 'http://localhost:3000/';

//New Test Section
describe('Hello API Implementation', function(){
	/*Variable to store server in*/
	var server;
	/*Code to start server*/
	before(function(done){
		//Express Implementation
		var express = require('express');
		var app = express();
		//Implement router
		var router = require('../routes/hello.js');
			//Use the JS file
		app.use('/', router);
		const port = 3000;
		//Implement server
		server = app.listen(port,function(){
			done();
		});
	});

	/*Code to stop the server*/
	after(function(done){
		//Stop the server
		server.close();
	});

	//New Test for GET request
	it('GET request returns HTML text', function(done){
		//Check the request based of URL + port
		request.get(apiRoot)
		//Function returning error and response
		.end(function(err, res){
			expect(err).to.not.be.an('error'); 		// No errors expected
			expect(res.statusCode).to.equal(status.OK);	//Server 200 called
			expect(res.text).to.equal('Hello, World!');	//Response text exact
			done();
		})
	})

	//New Test for POST request
	it('POST request not allowed', function(done){
		//Post the URL + port
		request.post(apiRoot)
		//Function returning error and response
		.end(function(err, res){
			//Error expecting
			expect(err).to.be.an('error');
			expect(res.statusCode).to.not.equal(status.METHOD_NOT_ALLOWED); //Error 500 NOT 405
			done();
		});
	});
});