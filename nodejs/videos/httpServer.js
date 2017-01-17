var http = require("http");

function callback(request,response){
	console.log("client connected..");
	response.writeHead(200,{"Content-Type":"text/plain"});
	response.end("yamini it is end of the request");
}

var httpServer = http.createServer(callback);

httpServer.listen(8111,function(){console.log("listening carefully..");});
console.log("hello");