var gulp = require("gulp");
var fs = require("fs");
var http = require("http");
var $ = require("jquery");
var request = require('request');

var jsdom = require("jsdom").jsdom;

var carsFile = "cars.json";

var config = JSON.parse(fs.readFileSync(carsFile));

gulp.task("run", () => {

	var urlCivic = "https://seattle.craigslist.org/search/cto?sort=date&search_distance=50&postal=98007&min_price=3000&max_price=7500&auto_make_model=honda+civic&min_auto_year=2006&max_auto_miles=140000&condition=20&condition=30&condition=40&auto_title_status=1&auto_transmission=2&auto_bodytype=4&auto_bodytype=8";
	var urlCorolla = "https://seattle.craigslist.org/search/cto?sort=priceasc&search_distance=50&postal=98007&min_price=3000&max_price=7500&auto_make_model=toyota+corolla&min_auto_year=2006&max_auto_year=2012&max_auto_miles=130000&condition=20&condition=30&condition=40&auto_title_status=1&auto_transmission=2&auto_bodytype=4&auto_bodytype=8";

	var validateFunction = function(url, name, setValue, getValue) {
		return function(actualNum) {
			var configValue = getValue();
			if (actualNum !== configValue) {
				sendUpdate(url, name, configValue, actualNum);
				setValue(actualNum);
				fs.writeFileSync(carsFile, JSON.stringify(config));
			} else {
				console.log(name + '	- No update: ' + actualNum);
			}
		};
	};

	var validateCivicFunction = validateFunction(
		urlCivic,
		"Civic",
		function(val) { config.civic = val; },
		function () { return config.civic; }
	);

	var validateCorollaFunction = validateFunction(
		urlCorolla,
		"Corolla",
		function(val) { config.corolla = val; },
		function () { return config.corolla; }
	);


	CheckCardNumber(urlCorolla, validateCorollaFunction);
	CheckCardNumber(urlCivic, validateCivicFunction);

});

function sendUpdate(url, name, from, to) {
	new Error(name + '	- Updated: ' + from + " > " + to);
}

function CheckCardNumber(url, validateFunction) {
	var result = 0;
	request(url, function (error, response, body) {
		if (error || response && response.statusCode != 200) {
			console.log('error:', error); // Print the error if one occurred 
	  		console.log('statusCode:', response && response.statusCode); 
	  		console.log('url:', url); 
	  		new Error("Bad response");
		}
	 
		return jsdom.env({
		    html : body,
		    done : function(errs, window) {
		    	$ = require('jquery')(window);
		        global.window = window;
		        result = $(".result-row").length;

		        validateFunction(result);
		    }
		});
	});   
}