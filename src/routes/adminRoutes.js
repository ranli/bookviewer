var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;


var books = [
					{
						title: 'Go Set a Watchman',
						author: 'Harper Lee',
						bookId: 24817626,
						img: 'https://d2arxad8u2l0g7.cloudfront.net/books/1451442088m/24817626.jpg',
						isRead: false
					},
					{
						title: 'The Girl on the Train',
						author: 'Paula Hawkins',
						bookId: 22557272,
						img: 'https://d2arxad8u2l0g7.cloudfront.net/books/1469460259m/22557272.jpg',
						isRead: false
					},
					{
						title: 'The Nightingale',
						author: 'Kristin Hannah',
						img: 'https://d2arxad8u2l0g7.cloudfront.net/books/1451446316m/21853621.jpg',
						bookId: 21853621,
						isRead: false
					},
					{
						title: 'Trigger Warning: Short Fictions and Disturbances',
						author: 'Neil Gaiman',
						img: 'https://d2arxad8u2l0g7.cloudfront.net/books/1415036119m/22522808.jpg',
						bookId: 22522808,
						isRead: false
					},
					{
						title: 'Confess',
						author: 'Colleen Hoover',
						img: 'https://d2arxad8u2l0g7.cloudfront.net/books/1412280173m/22609310.jpg',
						bookId: 22609310,
						isRead: false
					},
					{
						title: 'Golden Son',
						author: 'Pierce Brown',
						img: 'https://d2arxad8u2l0g7.cloudfront.net/books/1461354417m/20697410.jpg',
						bookId: 20697410,
						isRead: false
					},
					{
						title: 'Saint Odd',
						author: 'Dean Koontz',
						img: 'https://d2arxad8u2l0g7.cloudfront.net/books/1398802430m/21538202.jpg',
						bookId: 21538202,
						isRead: false
					},
					{
						title: 'Why Not Me?',
						author: 'Mindy Kaling',
						img: 'https://d2arxad8u2l0g7.cloudfront.net/books/1442548684m/22716447.jpg',
						bookId: 22716447,
						isRead: false
					}
				];
var router = function(nav) {
	adminRouter.route('/addBooks')
				.get(function(req,res){
					var url = 'mongodb://ranli:123456@ds033126.mlab.com:33126/heroku_p7dh0spc';
					mongodb.connect(url,function(err, db){
						var collection = db.collection('books');
						collection.insertMany(books, function(err,results){
							res.send(results);
							db.close();
						});

					});
					//res.send('inserting books');
				});
	adminRouter.route('/deleteBooks')
				.get(function(req,res){
					var url = 'mongodb://ranli:123456@ds033126.mlab.com:33126/heroku_p7dh0spc';
					mongodb.connect(url,function(err, db){
						var collection = db.collection('books');
						collection.deleteMany(books, function(err,results){
							res.send(results);
							db.close();
						});

					});
					//res.send('inserting books');
				});
	return adminRouter;
};

module.exports = router;