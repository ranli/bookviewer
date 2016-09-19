var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');


var router = function(nav){
	
	authRouter.route('/signUp')
			.post(function(req, res){
				console.log(req.body);
				var url = 'mongodb://localhost:27017/local';
					mongodb.connect(url,function(err, db){
						var collection = db.collection('users');
						var user = {
							username: req.body.username,
							password: req.body.password
						};
						collection.insert(user,
							function(err, results){
								req.login(results.ops[0], function(){
									res.redirect('/Auth/profile');
								});
							});
				});
			});
	authRouter.route('/signIn')
			.post(passport.authenticate('local',{
				failureRedirect: '/',
				failureFlash: 'Invalid username or password.'
			}), function(req, res){
				res.redirect('/Auth/profile');
			});

	authRouter.route('/profile')
			.all(function(req, res, next){
				if(!req.user){
					res.redirect('/');
				}
				next();
			})
			.get(function(req, res){
				var user = req.user;
				res.render('profile',{	
					nav: nav,
					user: user 			
									});
			});


	return authRouter;

}

module.exports = router;