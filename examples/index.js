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
		getURL = require( './../lib' );


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


	// SCRIPT //

	var client,
		query1,
		query2,
		url;

	// Create a new client:
	client = createClient();

	// Create a new metric query:
	query1 = mQuery();

	// Create a new TSUIDs query:
	query2 = tQuery();

	// Create a new URL generator:
	url = getURL( client );

	// Set the queries and client:
	setMetricQuery( query1 );
	setTSUIDsQuery( query2 );
	setClient( client, query1, query2 );

	// Create the request URL:
	console.log( url.template().create() );

})();