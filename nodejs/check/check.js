var fs = require('fs');
var path = require('path');
var fname = process.argv[2];
var fileBuffer = fs.readFileSync(fname,"utf8");
var data = JSON.parse(fileBuffer);
 for(var obj in data){
		if(data.hasOwnProperty(obj)){
		        for(var prop in data[obj]){
				     if(prop == "fieldprops" ){
				        if(data[obj][prop].entity ){
				           delete data[obj][prop].islabel;
					       delete data[obj][prop].widgetcontroller;
						   delete data[obj][prop].uilocking;
						   delete data[obj][prop].parent;
					       delete data[obj].events;
						   delete data[obj].isLocked;
				        }
				       else
					  delete data[obj];
					
			       }
			}

		}
	}
	   
fs.writeFile(fname, JSON.stringify(data, null, 4), function(err) {
    if(err) {
        console.log(err);
	    return;
    } else {
        console.log("JSON saved to " + fname);
       }
});
			



