var fs = require('fs');
var path = require('path');

/***
 * you can run this node script to add "objectServiceName" and "objectServiceOptions" to configs
 ***/

var formRootDir = "E:/sampleConfig/"; /*root directory name*/ 

function serviceAdder(formDir,fname){
	var fileBuffer = fs.readFileSync(formDir,"utf8");
	var AddingSubString = "var fname = ";
	AddingSubString = AddingSubString.replace(/fname/g,fname);
	console.log(AddingSubString);
	var substring = fileBuffer.replace(/^[^=]+=/,"");
	//console.log(substring);
	if(substring){
		var data = JSON.parse(substring);
	}
	
	   if(data)
	   {
		for(var obj in data){
		if(data.hasOwnProperty(obj)){
			if(obj == data["formid"]){
				var objectServiceName = "objectServiceName";
                var objectServiceNameVal = "CRMObjects";
				var objectServiceOptions = "objectServiceOptions";
                var objectServiceOptionsVal	= {"access":"offline"};
				data[obj][objectServiceName] = objectServiceNameVal;
				data[obj][objectServiceOptions] = objectServiceOptionsVal;
				break;
			}
	      }
		  
		}
		
              fs.writeFile(formDir,AddingSubString+JSON.stringify(data, null, 4), function(err) {
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

				fname = filenameBuffer[i].substring(0,filenameBuffer[i].indexOf('.js'));
				formDir = formRootDir + filenameBuffer[i];
				//console.log('formDir-->'+formDir);
				serviceAdder(formDir,fname);
		}
		 
	});
