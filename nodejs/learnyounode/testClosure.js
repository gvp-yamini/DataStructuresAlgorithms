http = require('http');
var buffer=[];
function main()
{
	var url = [];
for(var i=2;i<process.argv.length;i++)
{
	url[i-2]=process.argv[i];
}

for(var i=0; i < url.length; i++)
{
    buffer[i] = '';
}

readingFiles(url)
}

var count=0;
var completeString='';
var test;

function readingFiles(url)
{
	for(var i=0;i<url.length;i++)
	{
		(function(j){
			http.get(url[j],function (response){
				response.on('data',function (data){
					buffer[j] = buffer[j] + data;
				});
			    response.on('end',function (){
					count++;
					if(count==url.length)
					{
						console.log(buffer.join('\n'));
					}
				});
			});
		})(i);
	}
}

main();