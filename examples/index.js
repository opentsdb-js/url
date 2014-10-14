/**
*
*	DEMO
*
*
*	DESCRIPTION:
*		- Demonstrates how to use the OpenTSDB URL generator.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1] 
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com.
*
*/

(function() {
	'use strict';

	// MODULES //

	var // OpenTSDB client creator:
		createClient = require( 'opentsdb-client' ),

		// Query types:
		mQuery = require( 'opentsdb-mquery' ),
		tQuery = require( 'opentsdb-tquery' ),

		// URL generator:
		createFactory = require( './../lib' );


	// VARIABLES //

	var // Settings:
		start = Date.now(),
		end = start + 1000,
		ms = false,
		arrays = false,
		tsuids = true,
		annotations = 'local',

		// Query:
		aggregator = 'sum',
		downsample = '5m-avg',
		rate = true,
		counter = true,
		counterMax = 10000,
		resetValue = 5,
		tags = {
			'nid': '*'
		},
		metric = 'cpu.utilization',
		ids = '0010120010,0010013100';


	// FUNCTIONS //

	/**
	* FUNCTION: setMetricQuery( query )
	*	Configures a metric query.
	*
	* @param {Query} Query instance
	*/
	function setMetricQuery( query ) {
		query.metric( metric )
			.aggregator( aggregator )
			.downsample( downsample )
			.rate( rate )
			.rateOptions({
				'counter': counter,
				'counterMax': counterMax,
				'resetValue': resetValue
			})
			.tags( 'nid', tags.nid );
	} // end FUNCTION setMetricQuery()

	/**
	* FUNCTION: setTSUIDsQuery( query )
	*	Configures a TSUIDs query.
	*
	* @param {Query} Query instance
	*/
	function setTSUIDsQuery( query ) {
		query.tsuids( ids )
			.aggregator( aggregator )
			.downsample( downsample )
			.rate( rate )
			.rateOptions({
				'counter': counter,
				'counterMax': counterMax,
				'resetValue': resetValue
			});
	} // end FUNCTION setTSUIDsQuery()

	/**
	* FUNCTION: setClient( client, query1[, query2, query3,...] )
	*	Configures a client instance.
	*
	* @param {Client} Client instance
	* @param {Query} Query instance(s)
	*/
	function setClient() {
		var client = arguments[ 0 ],
			queries = Array.prototype.slice.apply( arguments );

		client.start( start )
			.end( end )
			.ms( ms )
			.arrays( arrays )
			.tsuids( tsuids )
			.annotations( annotations );

		queries.shift();
			
		client.queries.apply( client, queries );
	} // end FUNCTION setClient()


	// VARIABLES //

	var client,
		query,
		query1,
		query2,
		url;


	// EXAMPLE 1 //

	// Create a new client:
	client = createClient();

	// Create a new metric query:
	query1 = mQuery();

	// Create a new TSUIDs query:
	query2 = tQuery();

	// Create a new URL generator:
	url = createFactory( client );

	// Set the queries and client:
	setMetricQuery( query1 );
	setTSUIDsQuery( query2 );
	setClient( client, query1, query2 );

	// Create the request URL:
	console.log( url.template().create() );


	// EXAMPLE 2 //

	// Create a new metric query:
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
		setTimeout( createURL( i*1000 ), 1000 );
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

})();