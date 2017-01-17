http = require('http');

function main()
{
	var url = [];
	var buffer=[];
	
for(var i=2;i<process.argv.length;i++)
{
	url[i-2]=process.argv[i];
}

for(var i=0; i < url.length; i++)
{
    buffer[i] = '';
}
readingFiles(url,buffer)
}

var count=0;

function readingFiles(url,buffer)
{
	url.forEach(function (value,index){
		http.get(value,function callback(response){
			response.setEncoding('utf8');
			response.on('data',function(chunk){
				 buffer[index] = buffer[index] + chunk;
			});
			response.on('end',function(){
				count++;
			   if(count==url.length)
			   {
				   console.log(buffer.join('\n'));
			   }
			});
		});
	});
}

main();