/*Router Module*/
var express = require('express');
var router = express.Router();

//define the connected state route
router.get('/', function(req, res){
	res.send('Hello, World!');
});

//define the error state route
router.post('/', function(req, res){
	res.send('NOT FOUND!\n' + status.METHOD_NOT_ALLOWED);
});

//Export
module.exports = router;