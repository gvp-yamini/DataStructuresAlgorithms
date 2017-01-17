var fs = require('fs');
var path = require('path');
var ext = '.'+process.argv[3];

function filteredLs(path)
{
	fs.readdir(path,filesList);
}

function filesList(err,filesList)
{
	var filteredarr;
	if(err)
		console.log('error message is: '+err);
	var len = filesList.length;
	for(var i = 0;i<len;i++)
	{
		if(ext == path.extname(filesList[i]))
			console.log(filesList[i]);
			
	}
}

filteredLs(process.argv[2]);