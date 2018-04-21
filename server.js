const express = require('express');
const cheerio = require('cheerio');
var request = require('request');
const app = express();

app.get('/', function(req, res) {
	if (req.query.search == undefined && req.query.type == undefined) {
		var warning = {
			STATUS: '1',
			CODE: '200',
			MESSAGE: 'For help, go here -> https://github.com/Fast0n/afhsearch-api',
			DATA: [],
			TOTALS: [],
		};
		res.json(warning);
	}

	if (req.query.search != undefined && req.query.type != undefined) {
		var s = req.query.search;
		var type = req.query.type;

		var JSONformData = {
			w: 'search',
			s: s,
			type: type,
		};

		var headers = {
			'user-agent':
				'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
		};

		var options = {
			uri: 'https://androidfilehost.com/?w=search&s=' + s + '&type=' + type,
			method: 'GET',
			json: true,
			form: JSONformData,
			headers: headers,
		};
		var array = [];
		var array1 = [];
		var array2 = [];
		var array3 = [];

		var date = [];
		var download = [];
		var size = [];

		var final = [];

		request(options, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				const $ = cheerio.load(body);

				if (type == 'files') {
					var results = $('section.search-files');
					if ('' + results == '') {
						res.json(warning);
					} else {
						results.each(function(i, result) {
							// crea la lista
							var lista = $(result)
								.find('ul.list-group')
								.html();

							$(lista)
								.find('div')
								.each(function(index, element) {
									array = array.concat([$(element).html()]);
								});

							// name files
							$(lista)
								.find('h3')
								.find('a')
								.each(function(index, element) {
									array1 = array1.concat([$(element).html()]);
								});

							// url files
							$(lista)
								.find('h3')
								.find('a')
								.each(function(index, element) {
									array2 = array2.concat([$(element).attr('href')]);
								});

							// details files
							$(lista)
								.find('div.row')
								.find('div.file-attr')
								.find('span.file-attr-value')
								.each(function(index, element) {
									array3 = array3.concat([$(element).html()]);
								});

							// show number of download
							for (var i = 0; i < array3.length; i++) {
								download += array3[i].split('<br>')[0] + '&';
								i = i + 2;
							}

							// show size
							for (var i = 1; i < array3.length; i++) {
								size += array3[i].split('<br>')[0] + '&';
								i = i + 2;
							}

							// show date
							for (var i = 2; i < array3.length; i++) {
								date += array3[i].split('<br>')[0] + '&';
								i = i + 2;
							}

							download = download.split('&');
							size = size.split('&');
							date = date.split('&');

							final += '{';
							for (var i = 0; i < array1.length; i++) {
								final +=
									'"' +
									i +
									'":{"name":"' +
									array1[i] +
									'","url":"' +
									'https://androidfilehost.com' +
									array2[i] +
									'","ndownload":"' +
									download[i] +
									'","size":"' +
									size[i] +
									'","upload_date":"' +
									date[i] +
									'"},';
							}

							res.send(final.slice(0, -1) + '}');
						});
					}
				}

				if (type == 'devices') {
					var results = $('section.search-devices');
					if ('' + results == '') {
						res.json(warning);
					} else {
						results.each(function(i, result) {
							// name devices
							$(results)
								.find('div')
								.find('div')
								.find('h4')
								.each(function(index, element) {
									array = array.concat([$(element).html()]);
								});

							// codaname devices
							$(results)
								.find('div')
								.find('div')
								.find('h6')
								.each(function(index, element) {
									array1 = array1.concat([$(element).html()]);
								});

							// url devices
							$(results)
								.find('div')
								.find('div')
								.find('p')
								.find('a')
								.each(function(index, element) {
									array2 = array2.concat([$(element).attr('href')]);
								});

							final += '{';
							// show date
							for (var i = 0; i < array.length; i++) {
								final +=
									'"' +
									i +
									'":{"name":"' +
									array[i] +
									'","codename":"' +
									array1[i] +
									'","url":"' +
									'https://androidfilehost.com' +
									array2[i] +
									'"},';
							}
							res.send(final.slice(0, -1) + '}');
						});
					}
				}
				if (type == 'developers') {
					var results = $('section.search-developers');
					if ('' + results == '') {
						res.send('[]');
					} else {
						results.each(function(i, result) {
							// name devices
							$(results)
								.find('div')
								.find('div')
								.find('h4')
								.find('a')
								.each(function(index, element) {
									array = array.concat([$(element).html()]);
								});

							// url devices
							$(results)
								.find('div')
								.find('div')
								.find('h4')
								.find('a')
								.each(function(index, element) {
									array1 = array1.concat([$(element).attr('href')]);
								});

							final += '{';
							// show date
							for (var i = 0; i < array1.length; i++) {
								final +=
									'"' +
									i +
									'":{"name":"' +
									array[i] +
									'","url":"' +
									'https://androidfilehost.com' +
									array1[i] +
									'"},';
							}
							res.send(final.slice(0, -1) + '}');
						});
					}
				}
			}
		});
	}
});

exports = module.exports = app;
const server = app.listen(3000, function() {});
