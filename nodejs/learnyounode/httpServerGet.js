
var http = require('http');
var body='';
http.get(process.argv[2],function(response){
response.setEncoding('utf8');
response.on('data', function (chunk) {
	  console.log(chunk);
      body = body + chunk;
});
response.on('end',function(){
      //console.log(body.length);
	  //console.log(body);
});
response.on('error', console.error);
});