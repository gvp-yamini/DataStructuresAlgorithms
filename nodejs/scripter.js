var path = require('path');
var fs = require('fs');

function replaceString(modulesPath){
	var listOfFiles = fs.readdirSync(modulesPath);
	console.log(listOfFiles);
	i = 0;
	toReplace(i);

	function toReplace(i){
		if(i >= listOfFiles.length){
			return;
		}
		
		var filepath = path.join(modulesPath,listOfFiles[i]);
		console.log("inside list of files for loop"+filepath);

		fs.readFile(filepath, 'utf8', function (err,data) {
		  if (err) {
		    return console.log(err);
		  }

		  var result = data.replace(/kony.appfoundation.v2.DataProvider/g, 'kony.sdk.mvvm.v2.DataProvider');
		  result = result.replace(/kony.appfoundation.v2.Model/g, 'kony.sdk.mvvm.v2.Model');
		  result = result.replace(/kony.appfoundation.v2.util/g, 'kony.sdk.mvvm.v2.util');
		  result = result.replace(/kony.appfoundation.v2 = kony.appfoundation.v2 \|\| {};/g, 'kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 \|\| {};');
		  result = result.replace(/kony.appfoundation.v2/g, 'kony.appfoundation');
		  result = result.replace(/kony.appfoundation/g, 'kony.sdk.mvvm');
		  result = result.replace(/kony.sdk.mvvm = kony.sdk.mvvm \|\| {};/g, 'kony.sdk = kony.sdk \|\| {};\nkony.sdk.mvvm = kony.sdk.mvvm \|\| {};');
		  result = result.replace(/kony.sdk.mvvm.AppFoundationException/g,'kony.sdk.mvvm.Exception');
		  result = result.replace(/.appFoundationException/g,'.getParentException()');
		  
		  fs.writeFile(filepath, result, 'utf8', function (err) {
		     if (err) return console.log(err);
		     toReplace(++i);
		  });
		});
	}
}

function main() {

	var argvLength = process.argv.length;


	if (argvLength === 3) {
		projectPath = process.argv[2];

		//Check if given project folder exists or not.
		fs.exists(projectPath, function(exists) {
			replaceString(projectPath);
		});
	} else {
		console.log("Invalid number of arguments passed, Format: node formConversion.js <VisualizerProjectName>");
	}

	// console.log("\n\n======================== CONVERSION END =================================");
}

main();