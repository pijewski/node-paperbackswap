Node.js bindings for the Paperbackswap API.

Paperbackswap.com is a website which facilitates book swaps between members.

The module will poll the Paperbackswap API once a minute and emit a "books"
event with any books which have been posted in the last minute.  The timeout
option controls how often the API is polled.


## Example

    var PBS = require('paperbackswap');

    var options = {};
    options.timeout = 30 * 1000;   // poll once every 30 seconds

    var agent = new PBS(options);
    
    agent.on('books', function (books) {
        books.forEach(function (book) {
            console.log(book);
        });
    });
    
    agent.on('error', function (err) {
        // Handle error
    });
    
    agent.start();


## Installation

    npm install paperbackswap


## License

MIT
