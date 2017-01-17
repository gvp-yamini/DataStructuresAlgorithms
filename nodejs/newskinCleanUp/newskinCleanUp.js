var fs = require('fs');
var path = require('path');

/***
 * you can run this node script to delete unused skins in vizualise.zip  
 ***/
 
var formDir = {
	"iphone" : "E:\\SAPrepo\\konysalesapp-yaminiratna\\KonySalesSAP\\Src\\Client\\apppackage\\apppackage\\App\\Forms\\mobile\\iphone\\",
	"ipad" : "E:\\SAPrepo\\konysalesapp-yaminiratna\\KonySalesSAP\\Src\\Client\\apppackage\\apppackage\\App\\Forms\\tablet\\ipad\\",
	"android": "E:\\SAPrepo\\konysalesapp-yaminiratna\\KonySalesSAP\\Src\\Client\\apppackage\\apppackage\\App\\Forms\\mobile\\android\\",
	"tabrcandroid" : "E:\\SAPrepo\\konysalesapp-yaminiratna\\KonySalesSAP\\Src\\Client\\apppackage\\apppackage\\App\\Forms\\tablet\\tabrcandroid\\"
};

var channels = ["iphone","ipad","android","tabrcandroid"];
var formRootDir = ["E:/SAPrepo/konysalesapp-yaminiratna/KonySalesSAP/Src/Client/apppackage/apppackage/App/Forms/mobile/",
				   "E:/SAPrepo/konysalesapp-yaminiratna/KonySalesSAP/Src/Client/apppackage/apppackage/App/Forms/tablet/"];
var skinsArray = [];
var uniqueArray = [];
var callbackCounter =[];
var len1=0; var len2 = 0;

function manageAllSkins(EachFormformjs,callback){ // to collect all skins in one array
		var len = EachFormformjs.length;
		var key="";
		var value="";
		var keyBuffer = "";
		var toCheckSkinAlreadyExist = 1;
		var i = 0;
		while(i<len)
		{
			if(EachFormformjs[i]=='"')
			{
				outerloop:
				for(var j = i+1;j<len; j++)
				{
					if(EachFormformjs[j] != '"')
					{
					     key = key + EachFormformjs[j];
					}
					else{
						if(key == "skin" || key == "focusSkin" || key == "rowSkin" || key == "rowFocusSkin" || key == "sectionHeaderSkin")
						{
							for( var p = j+1;p<len;p++)
							{
								if(EachFormformjs[p] == '"')
					               {
					                  for(var k = p + 1 ; k < len;k++)
									  {
										  if(EachFormformjs[k] != '"')
										  {
											  value = value + EachFormformjs[k];
										  }
										  else{
											  j=k;
											  i=k;
											  skinsArray.push(value);
											  key = "";
											  value = "";
											  break outerloop;
										  }
									  }
								   }
							}
							i=j;
							value = "";
						}
						key = "";
						break;
					}
						
				}
			}
			i++;
		}
		callback(skinsArray,printUniqueArray);
}

function printKeyValuePair(skinsArray,printUniqueArray) // remove duplicate skins
{
	skinsArray.forEach(function(item){
		if(uniqueArray.indexOf(item)<0){
			uniqueArray.push(item);
		}
	});
	printUniqueArray(uniqueArray);
}

function printUniqueArray(uniqueArray)
{
		console.log("total number of used skins-->" + uniqueArray.length);
}

function readAndDecodeformJS(channel,formDir,fname){
	fs.readFile(formDir[channel]+fname,"utf8", function (err, data) {
        if (err)
		{
			console.log(err);
			return;
		}
		else
		{
          var decodedFormJS = new Buffer(data,'base64').toString('ascii');
		  manageAllSkins(decodedFormJS,printKeyValuePair);
		}
});
}


//for(var i=0;i<channels.length;i++)
     //readAndDecodeformJS(channels[0],formDir,"frmCalendarListKA.formjs");
 
 
 fs.readdir(formRootDir[0],function(err,filenameBuffer){ // form mobile
		if(err)
		{
			 console.log(err);
			 return;
		}
	    len1 = filenameBuffer.length;
		for(var i=0;i<len1;i++)
		{
			var fname;
			if(path.extname(filenameBuffer[i]) == ".formjson")
			{
				fname = filenameBuffer[i].split(".");
				var fileNameormJS = fname[0] + ".formjs";
			    readAndDecodeformJS(channels[0],formDir,fileNameormJS);
				readAndDecodeformJS(channels[2],formDir,fileNameormJS);
			}
		}
		 
	});
	
 fs.readdir(formRootDir[1],function(err,filenameBuffer){ // form tablet
		if(err)
		{
			 console.log(err);
			 return;
		}
	    len2 = filenameBuffer.length;
		for(var i=0;i<len2;i++)
		{
			var fname;
			if(path.extname(filenameBuffer[i]) == ".formjson")
			{
				fname = filenameBuffer[i].split(".");
				var fileNameormJS = fname[0] + ".formjs";
				readAndDecodeformJS(channels[1],formDir,fileNameormJS);
				readAndDecodeformJS(channels[3],formDir,fileNameormJS);
			}
		}
		 
	}
	);