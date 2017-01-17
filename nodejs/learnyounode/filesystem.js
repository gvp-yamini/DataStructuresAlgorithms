var fs = require('fs');
var linesCount = undefined;
function numberofNewLines(callback,path)
{
	fs.readFile(path,function doneReading(err,filecontents)
	{
	  if(err)
		  console.log(err);
	  var buff = filecontents.toString();
	  var arr = buff.split('\n');
	  linesCount = arr.length-1;
	  callback();
	})
}

function showCountOfNewLines()
{
	console.log(linesCount);
}

numberofNewLines(showCountOfNewLines,process.argv[2]);