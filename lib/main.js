var bunyan = require('bunyan');
var events = require('events');
var http = require('http');
var util = require('util');
var xml2js = require('xml2js');
var LRU = require('lru-cache');


var parser = new xml2js.Parser();
var log = bunyan.createLogger({ name: 'PBS' });


var PBS_URL =
    'http://www.paperbackswap.com/api/v1/index.php?' +
    'RequestType=RecentlyPosted&Limit=10';

var cache = LRU({
    max: 100,
    maxAge: 60 * 60 * 100   // one hour
});

var self;


function PBS(options) {
	events.EventEmitter.call(this);

	if (!options)
		options = {};

	this.timeout = 	options.timeout || 60 * 1000;   // one minute

	self = this;
}

util.inherits(PBS, events.EventEmitter);


PBS.prototype.start = function start() {
	this.query();

	setInterval(this.query, this.timeout);
};

PBS.prototype.query = function query() {
	var req = http.request(PBS_URL, function (res) {
		var body = '';

		res.on('data', function (chunk) {
			body += chunk;
		});

		res.on('end', function () {
			parser.parseString(body, function (err, obj) {
				if (err) {
					self.emit('error', err);
					return;
				}

				var books = obj['Response']['Books'][0]['Book'];
				var newBooks = [];

				books.forEach(function (book) {
					if (!cache.get(book['ISBN-13'])) {
						newBooks.push(book);
						cache.set(book['ISBN-13'],
						    book);
					}
				});

				self.emit('books', newBooks);
			});
		});
	});

	req.on('error', function (err) {
		self.emit('error', err);
	});

	req.end();
};


module.exports = PBS;
