var express = require('express');
var todosRouter = express.Router();

module.exports = todosRouter;

todosRouter.get('/todos', function(req, res){
	console.log('todos');
	res.render('index');
});

