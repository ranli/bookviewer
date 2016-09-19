var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongodb = require('mongodb').MongoClient;

module.exports = function() {
	passport.use(new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password'
	},
	function(username, password, done){
		var url = 'mongodb://ranli:123456@ds033126.mlab.com:33126/heroku_p7dh0spc';
					mongodb.connect(url,function(err, db){
						var collection = db.collection('users');
						collection.findOne({ username: username },
							function(err,results){
								if(results !== null && results.password === password){
									var user = results;
									done(null,user);
								}else{
									done(null,false,{message: 'Bad password'});
								}
							});
		
					});
	}));
};