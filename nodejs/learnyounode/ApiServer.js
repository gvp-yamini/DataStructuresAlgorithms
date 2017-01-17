http = require('http');
url = require('url');

function isoDatefun(time)
{
	return {
		"hour" : time.getHours(),
		"minute" : time.getMinutes(),
		"second" : time.getSeconds()
	}
};

function unixDatefun(time)
{
	return {
		"unixtime" : time.getTime()
	}
};

var server = http.createServer(function(req,res){
	var parsedUrl = url.parse(req.url,true);
	var time = new Date(parsedUrl.query.iso);
	var result;
	
	if(/^\/api\/parsetime/.test(req.url))
		result = isoDatefun(time);
	if(/^\/api\/unixtime/.test(req.url))
		result = unixDatefun(time);
	
	if(result)
	{
		res.writeHead(200,{"Content-Type": "application/json"});
		res.end(JSON.stringify(result));
	}
	else{
		res.writeHead(404);
		res.end();
	}
});

server.listen(Number(process.argv[2]));