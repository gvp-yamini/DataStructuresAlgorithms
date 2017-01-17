fs=require('fs');
var countOfLines = undefined;

function readFile(callback,path)
{
	    var data = fs.readFileSync(path);
		var buffer = data.toString();
		var arr = buffer.split('\n');
		countOfLines = arr.length-1;
		
	callback();
}

function showNoOfLines()
{
   console.log(countOfLines);
}

readFile(showNoOfLines,process.argv[2]);