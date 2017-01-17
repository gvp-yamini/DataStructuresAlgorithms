var fs = require('fs');
var path = require('path');
//var fname = process.argv[2];

/***
 * you can run this node script to change name of widgetcontroller for label and flex dynamically 
 ***/

var rootDir = "E:/SAPrepo/konysalesapp-yaminiratna/"; /*root directory name*/
var formRootDir = rootDir + "KonySalesSAP/Src/Client/apppackage/App/Forms/tablet/";

function controllerConverter(formDir,fname){
	//console.log('formDir-->'+formDir);
	var fileBuffer = fs.readFileSync(formDir,"utf8");
	var data = JSON.parse(fileBuffer);
	//console.log('fileBufferObj'+JSON.stringify(data));
	var modified=0;
	for(var obj in data){
		if(data.hasOwnProperty(obj)){
			for(var prop in data[obj]){
				if(prop == "fieldprops"){
					if(data[obj][prop].widgettype == "FlexContainer"){
						if(data[obj][prop].hasOwnProperty('query'))
						{
						   //console.log(obj);
						   data[obj][prop].widgetcontroller = "FlexQueryWidgetController"; /*new name of the flexwidgetController*/
						   modified = 1;
						   //console.log("\n")
						}
					}
					if(data[obj][prop].widgettype == "Label"){
						if(data[obj][prop].hasOwnProperty('query'))
						{
						   //console.log(obj);
						   data[obj][prop].widgetcontroller = "QueryWidgetController"; /*new name of the lablewidgetController*/
						   modified = 1;
						   //console.log("\n")
						}
					}
				}
					
			}

		}
	}
	   
	        if(modified){
              fs.writeFile(formDir, JSON.stringify(data, null, 4), function(err) {
                  if(err) {
                   console.log(err);
	               return;
                  } else {
                   console.log("JSON saved to " + formDir);
                  }
                });
			}
}


fs.readdir(formRootDir,function(err,filenameBuffer){
		if(err)
		{
			 console.log(err);
			 return;
		}
		var len = filenameBuffer.length;
		for(var i=0;i<len;i++)
		{
			var formDir,fname;
			if(path.extname(filenameBuffer[i]) == ".formconfig")
			{
				fname = filenameBuffer[i];
				formDir = formRootDir + filenameBuffer[i];
				//console.log('formDir-->'+formDir);
				controllerConverter(formDir,fname);
			}
		}
		 
	});
