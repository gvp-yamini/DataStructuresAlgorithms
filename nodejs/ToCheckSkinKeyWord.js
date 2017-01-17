var fs = require('fs');
var path = require('path');

/***
 * you can run this node script to change name of widgetcontroller for label and flex dynamically 
 ***/
 
var rootDir = "E:/SAPrepo/konysalesapp-yaminiratna/"; /*root directory name*/
var formRootDir = rootDir + "KonySalesSAP/Src/Client/apppackage/App/Forms/mobile/";
var fname  = "frmCalendarMonthKA.formjson";
var skinsArray = [];
var uniqueArray = [];

function controllerConverter(formDir,fname){
	//console.log('formDir-->'+formDir);
	var fileBuffer = fs.readFileSync(formDir,"utf8");
	var data = JSON.parse(fileBuffer);
	//console.log('fileBufferObj'+JSON.stringify(data));
	for(var obj in data){
		if(data.hasOwnProperty(obj)){
			for(var prop in data[obj]){
				var val1 = prop.indexOf('skin');
				var val2 = prop.indexOf('Skin');
				if(val1 == -1)
				{
					val1 = false;
				}
				else{
					val1 = true;
				}
				if(val2 == -1)
				{
					val2 = false;
				}
				else{
					val2 = true;
				}
					if(val1 || val2)
					{
		                 
			                         skinsArray.push(prop);
		             
					}
			}

		}
	}
}
function main()
{
controllerConverter(formRootDir+fname,fname);
printskinnames();
}

function printskinnames()
{
		skinsArray.forEach(function(item){
		if(uniqueArray.indexOf(item)<0){
			uniqueArray.push(item);
		}
	});
	for(var i=0;i<uniqueArray.length;i++){
		console.log(uniqueArray[i]);
	}
}

main();


