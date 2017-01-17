var jsface = require("jsface"), Class = jsface.Class, extend = jsface.extend;

Encoder = Class({
	constructor: function(){
		this.base64Indexes = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split("");
	},
	encodingfunction: function(inputString){
		try{
		var tempInputString = inputString;
		var paddingNumbertemp = tempInputString.length % 3;
		var paddingString = "";
		var paddingNumber = 0;
		var inputbinaryTriplet = "";
		var outputEncodedString = "";
		var i =0;
		if(paddingNumbertemp)
		{
		   paddingNumber = 3 - paddingNumbertemp;
		}
		while(paddingNumber)
		{
			tempInputString = tempInputString + "\0";
			paddingString = paddingString + "=";
			paddingNumber -- ;
		}
		var tempcount =0;
		while(i<tempInputString.length)
		{
			if(i>0 &&  (i/3*4)%76 ==0)
			{
				outputEncodedString = outputEncodedString + "\r\n";
			}
			inputbinaryTriplet = tempInputString.charCodeAt(i)<<16+ tempInputString.charCodeAt(i+1)<<8+ tempInputString.charCodeAt(i+2);
			var tempbuf = [(inputbinaryTriplet>>>18)&63,(inputbinaryTriplet>>>12&63),(inputbinaryTriplet>>6)&63,inputbinaryTriplet&63];
			outputEncodedString = outputEncodedString + this.base64Indexes[tempbuf[0]]+this.base64Indexes[tempbuf[1]]+this.base64Indexes[tempbuf[2]]+this.base64Indexes[tempbuf[3]];
			i=i+3;
		}
		
		return outputEncodedString.substring(0,outputEncodedString.length - paddingString.length) + paddingString;
		}catch(error)
		{
			console.log("Error message is :"+error);
		}
	}
});

var encoding = new Encoder();
var input = "yamini";

console.log(encoding.encodingfunction(input));