URL
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> URL generator for [OpenTSDB](http://opentsdb.net) HTTP data requests.


### Install

For use in Node.js,

``` bash
$ npm install opentsdb-url
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


### Usage

To use the module,

``` javascript
var createFactory = require( 'opentsdb-url' );
```

A URL generator must be bound to a particular OpenTSDB [client](https://github.com/opentsdb-js/client) instance.

``` javascript
var createClient = require( 'opentsdb-client' );

// Create a new client:
var client = createClient();

// Bind the generator to the client:
var url = createFactory( client );
```

The instance has the following methods...


#### url.template()

Creates a URL template based on the OpenTSDB client configuration. The template contains two parameters: `start` and `end`.

``` javascript
url.template();
``` 

Note: this method does not provide public access to the URL template. Instead, the method returns the current URL generator instance.


#### url.create()

Inserts `start` and `end` times into a template OpenTSDB query string. The `start` and `end` times are obtained from the bound client instance.

``` javascript
url.create();
// returns '...'
```

Note: Ensure that you have first generated a template __before__ trying to create a URL.

The motivation for the `template`/`create` separation is the recognition that `start` and `end` times are more likely to change than other `client` parameters, particularly when periodically polling OpenTSDB for data belonging to the same metric. 


## Examples

``` javascript
var createClient = require( 'opentsdb-client' ),
	mQuery = require( 'opentsdb-mquery' ),
	createFactory = require( 'opentsdb-url' ),
	end = Date.now(),
	start = end - 1000,
	client,
	query,
	url;

// Create a new metric query and configure:
query = mQuery();

query.metric( 'cpu.utilization' )
	.tags( 'beep', 'boop' );

// Create a new client and configure:
client = createClient();

client.queries( query );

// Bind the client to a URL generator:
url = createFactory( client );

// Create the url template:
url.template();

// Periodically create new URLs...
for ( var i = 0; i < 10; i++ ) {
	setTimeout( createURL( i*1000 ), i*1000 );
}

function createURL( offset ) {
	var begin = start + offset,
		stop = end + offset;
	return function onTimeout() {
		client.start( begin )
			.end( stop );

		console.log( url.create() );
	};
}
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```



## Tests

### Unit

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/opentsdb-url.svg
[npm-url]: https://npmjs.org/package/opentsdb-url

[travis-image]: http://img.shields.io/travis/opentsdb-js/url/master.svg
[travis-url]: https://travis-ci.org/opentsdb-js/url

[coveralls-image]: https://img.shields.io/coveralls/opentsdb-js/url/master.svg
[coveralls-url]: https://coveralls.io/r/opentsdb-js/url?branch=master

[dependencies-image]: http://img.shields.io/david/opentsdb-js/url.svg
[dependencies-url]: https://david-dm.org/opentsdb-js/url

[dev-dependencies-image]: http://img.shields.io/david/dev/opentsdb-js/url.svg
[dev-dependencies-url]: https://david-dm.org/dev/opentsdb-js/url

[github-issues-image]: http://img.shields.io/github/issues/opentsdb-js/url.svg
[github-issues-url]: https://github.com/opentsdb-js/url/issues