var express = require('express');
var todosRouter = express.Router();

module.exports = todosRouter;

todosRouter.get('/todos', function(req, res){
	res.render('index');
});

