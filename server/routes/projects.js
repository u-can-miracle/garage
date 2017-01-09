var express = require('express');
var projectsRouter = express.Router();

module.exports = projectsRouter;

projectsRouter.get('/projects', ensureAuthenticated, function(req, res){
	res.render('index');
});


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}