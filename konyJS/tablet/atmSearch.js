var distanceinMiles=[];

function setDataMaponSearch(){
  //kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("");
  ShowLoadingScreen();
  kony.print("setDataMaponSearch");
  var options = {"access":"online"};
  objectService = kony.sdk.getCurrentInstance().getObjectService("RBObjects",options);
  var dataObject = new kony.sdk.dto.DataObject("Locations");
  var city= frmLocatorKA.locatorSearchTextField.text;
  var queryParams = {"city":city.trim()};
  var serviceOptions = {"dataObject":dataObject,"queryParams":queryParams};
  objectService.fetch(serviceOptions, setDataMapCallBack,errorCallBack); 
}

function setDataMapWithoutLoc(){
 ShowLoadingScreen();
 kony.print("setDataMapWithoutLoc");
  var options = {"access":"online"};
  objectService = kony.sdk.getCurrentInstance().getObjectService("RBObjects",options);
  var dataObject = new kony.sdk.dto.DataObject("Locations");

  var queryParams = {"city":"New York"};
  var serviceOptions = {"dataObject":dataObject,"queryParams":queryParams};
  objectService.fetch(serviceOptions, setDataMapCallBack,errorCallBack);  
  
  
}


function onClickDoneSettingMaxDistance(){
  kony.print("onClickDoneSettingMaxDistance");
  var options = {"access":"online"};
  objectService = kony.sdk.getCurrentInstance().getObjectService("RBObjects",options);
  var dataObject = new kony.sdk.dto.DataObject("Locations");
  
  var queryParams = {"currLatitude":gblLatitude,"currLongitude":gblLongitude,"maxDistance":locatorRange};
  var serviceOptions = {"dataObject":dataObject,"queryParams":queryParams};
  objectService.fetch(serviceOptions, setDataMapCallBack,errorCallBack);  

}

function viewMainBranch(response){
  kony.print("response"+ JSON.stringify(response));
}

function getDistanceBWLocations(countRes){
  kony.print("countRes"+countRes); 
     var locationDest={};
     locationDest={lat:locationList[countRes].latitude,lon: locationList[countRes].longitude};//changed listItem to list
  
   if (userAgent=="iPhone") {
							var searchCriteria = {
									origin : {lat:gblLatitude, lon: gblLongitude},
									destination : {lat : locationDest.lat,lon : locationDest.lon},
									alternatives : false,
                                    
							};
						}else{
							var searchCriteria = {
									origin : {lat:gblLatitude, lon: gblLongitude},
									destination : {lat : locationDest.lat,lon : locationDest.lon},
									directionServiceUrl : "https://maps.googleapis.com/maps/api/directions/json",
									alternatives : false,
                                    
							};
							searchCriteria.apiKey = "AIzaSyCYyzgYv2T4CdgYl2kzfjM9RefK5cb4Ugw";
                                                     
  kony.print("searchCriteria getDistanceBWLocations"+JSON.stringify(searchCriteria));
						}
  
  kony.map.searchRoutes(searchCriteria,findDistanceSuccesCallback,errorDistanceSuccesCallback);
 
}

function findDistanceSuccesCallback(routes)
{
 
  var distBWLocation;
  kony.print("######findDistanceSuccesCallback is called###"+JSON.stringify(routes));
  if(routes == null || routes.length == 0){
    kony.print("Unable to find distance");
   distBWLocation= "";
 
  } else
    {
    
    distBWLocation=calDistanceUsingStepsData(routes);
    
    }
  kony.print("distBWLocation"+ distBWLocation+"count"+count );
  distanceinMiles.push(distBWLocation);
   count++;
  if(count<locationList.length){
   
   getDistanceBWLocations(count); 
  }
  else 
    {
      kony.print("distanceinMiles"+ distanceinMiles.length+" "+JSON.stringify(distanceinMiles));
      count=0; //added to fix back navigation
     // settingMapListView();
      setListData();
      locatorListViewEnabledAnimate();
    }
  
    
}


function errorDistanceSuccesCallback(code,emsg){
  
  kony.print("code"+ code+ "message" +emsg );
}

function calDistanceUsingStepsData(resultTable){
  kony.print("resultTable calDistanceUsingStepsData"+ " "+ JSON.stringify(resultTable));
  if(resultTable && resultTable[0]){
	    		var stepsTable = resultTable[0]["legs"][0]["steps"]; //main
                kony.print("stepsTable"+ " "+ JSON.stringify(stepsTable));
                
				var totalDistance = 0;
				var eachStep;

				for (var i=0; ((stepsTable) != null) && i< stepsTable.length; i++ ){
					 eachStep = stepsTable[i];
                     totalDistance = totalDistance + eachStep["distance"];
                 }
     kony.print("totalDistance"+ totalDistance);    
                var totalDistanceFinal = toConvertMiles(totalDistance);
                                  }
   kony.print("totalDistanceFinal"+ totalDistanceFinal);
   
   kony.print("totalDistanceFinalWO"+ totalDistanceFinal.split(" ")[0]);
   return totalDistanceFinal.split(" ")[0];
  
 
}