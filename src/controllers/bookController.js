var mongodb = require('mongodb').MongoClient;
var objId = require('mongodb').ObjectID;

var bookController = function(bookService, nav){
	
	var middlewear = function(req, res, next){
				if(!req.user){
					res.redirect('/');
				}
				next();
			};

	var getIndex = function (req, res){
			var url = 'mongodb://ranli:123456@ds033126.mlab.com:33126/heroku_p7dh0spc';

			mongodb.connect(url,function(err, db){

						var collection = db.collection('books');

						collection.find({}).toArray(function(err,results){

							res. render('books',{title: 'Books', 
							nav: nav,
							books: results
							});
			
						});
			});
		};

	var getById = function (req, res){
			var id =  new objId(req.params.id);
			var url = 'mongodb://ranli:123456@ds033126.mlab.com:33126/heroku_p7dh0spc';

			mongodb.connect(url,function(err, db){

				var collection = db.collection('books');

				collection.findOne({_id:id},
				
				function(err,results){
					if(results.bookId){
						bookService.getBookById(results.bookId, function(err, book){
								results.book = book;
								res.render('bookListView',{title: 'Books', 
										nav: nav,
										book: results
									});
						});
					}
					else{
						res.render('bookListView',{title: 'Books', 
										nav: nav,
										book: results
									});
					}

			
				});
			});
	};


	return {
		getIndex: getIndex,
		getById: getById,
		middlewear: middlewear,

	};

};

module.exports = bookController;