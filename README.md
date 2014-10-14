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


### URL

To use the module,

``` javascript
var getURL = require( 'opentsdb-url' );
```

A URL generator is bound to a particular OpenTSDB [client](https://github.com/opentsdb-js/client) instance.

``` javascript
var createClient = require( 'opentsdb-client' );

// Create a new client:
var client = createClient();

// Bind the generator to the client:
var url = new getURL( client );
```

The instance has the following methods...


#### url.template()

Creates a URL template based on the OpenTSDB client configuration. The template contains two parameters: `start` and `end`.

``` javascript
url.template();
``` 


#### url.create()

Inserts `start` and `end` times into a template OpenTSDB query string. The `start` and `end` times are obtained from the bound client instance.

``` javascript
url.create();
// returns '...'
```


## Examples

To run the example code from the top-level application,

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

[travis-image]: http://img.shields.io/travis/opentsdb-js/opentsdb-url/master.svg
[travis-url]: https://travis-ci.org/opentsdb-js/opentsdb-url

[coveralls-image]: https://img.shields.io/coveralls/opentsdb-js/opentsdb-url/master.svg
[coveralls-url]: https://coveralls.io/r/opentsdb-js/opentsdb-url?branch=master

[dependencies-image]: http://img.shields.io/david/opentsdb-js/opentsdb-url.svg
[dependencies-url]: https://david-dm.org/opentsdb-js/opentsdb-url

[dev-dependencies-image]: http://img.shields.io/david/dev/opentsdb-js/opentsdb-url.svg
[dev-dependencies-url]: https://david-dm.org/dev/opentsdb-js/opentsdb-url

[github-issues-image]: http://img.shields.io/github/issues/opentsdb-js/opentsdb-url.svg
[github-issues-url]: https://github.com/opentsdb-js/opentsdb-url/issues