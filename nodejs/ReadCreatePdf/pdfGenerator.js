var fs = require('fs');
pathOfTextFile = "E:/nodejs/ReadCreatePdf/InputFile.txt";

fs.readFile(pathOfTextFile,"utf8",readcallback);
function readcallback(err,data){
	console.log(data);
	fs.writeFile("output.pdf",data,"utf8",writecallback);
	function writecallback(err){
		if(err) throw err;
		console.log("saved successfully");
	};
};
