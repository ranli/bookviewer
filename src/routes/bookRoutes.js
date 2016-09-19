var express = require('express');
var bookRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var objId = require('mongodb').ObjectID;



var router = function(nav) {
	var bookService = require('../services/goodreadersService')();
	var bookController = require('../controllers/bookController')(bookService, nav);
	bookRouter.use(bookController.middlewear);
	bookRouter.route('/')
		.get(bookController.getIndex);

	bookRouter.route('/:id')
		.get(bookController.getById);

	return bookRouter;
};
module.exports = router;
