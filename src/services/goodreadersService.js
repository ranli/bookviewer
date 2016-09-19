var http = require('http');
var xml2js = require('xml2js');
var parser = xml2js.Parser({explicitArray: false});


var goodreadersService = function(){
	var getBookById = function(id, callback){
		var options = {
			host: 'https://www.goodreads.com',
			path: '/book/show/'+ id +'?format=xml&key=PGTDP8oqCA5M6q4yWFCGA'
		};

		var cb = function(response){
			var str = '';
			response.on('data',function(chunk){
				str += chunk;
			});
			response.on('end',function(){
				parser.parseString(str, 
					function(err, result){
						callback(null, result.GoodreadsResponse.book);
				});
			});
		};

		http.request(options,cb).end();
		
	};

	

	return {
		getBookById: getBookById,
	};

};


module.exports = goodreadersService;