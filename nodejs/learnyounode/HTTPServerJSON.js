var http = require('http');
var url = require('url');

var server = http.createServer(function (request,response){
	var queryData = url.parse(request.url, true).query;
	//queryData.stringify();
	queryData = queryData.iso.toString();
	var arr1 = queryData.split('T');
	var arr2 = arr1[1].split(':');
	var arr3 = arr2[2].split('.');
	//console.log(arr3);
	jsonResponse = {
		"hour" : arr2[0],
		"minute" : arr2[1],
		"second" : arr3[0]
	}
	response.writeHead(200, {"Content-Type": "application/json"});
	response.end(jsonResponse.toString().JSON.stringify());
});

server.listen(process.argv[2]);