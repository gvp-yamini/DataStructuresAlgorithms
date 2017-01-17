var fs = require('fs');
var path = require('path');
module.exports = function(pathtoDir,extension,callback){
	fs.readdir(pathtoDir,function completeFiles(err,data){
		if(err)
		{
			 return callback(err)
		}
		var len = data.length;
		var filteredData = [];
		for(var i=0;i<len;i++)
		{
			if(path.extname(data[i]) == '.'+extension)
			{
				filteredData.push(data[i]);
			}
		}
		 
		 return callback(null,filteredData);
	});
}
