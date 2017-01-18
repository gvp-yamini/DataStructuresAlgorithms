var gblLatitude;
var gblLongitude;
var gblIsCurrentLocation;
var gblPinClickDetails;
var gblCurrentLocatorResult;
var count=0;
var locationList;
var tempLocaterDataCurrPos=[];


function onClickLocator(){
  
  kony.print("onClickLocator");
  gblLatitude= "";  
  gblLongitude=""; 

    gblIsCurrentLocation = false; 

    kony.location.getCurrentPosition(geoSuccessCallBack,geoErrorCallBack);

}

function geoSuccessCallBack(position){
  
   if(position.coords.latitude != "" || position.coords.longitude != ""){
  			gblLatitude = position.coords.latitude;
  			gblLongitude = position.coords.longitude; 
     kony.print("gblLatitude"+ " "+gblLatitude+" "+"gblLongitude"+ " "+ gblLongitude);
     gblIsCurrentLocation=true;
   }
   
    gblATMBranchDetails =false;
    frmLocatorKA.locatorSearchTextField.text = null;
    setDataMap();
   
  
}

function geoErrorCallBack(positionerror){
  
  kony.print("gblLatitude in error callback"+ " "+gblLatitude+" "+"gblLongitude in error callback"+ " "+ gblLongitude);
  var errorMesg = "Error code: " + positionerror.code;
	errorMesg = errorMesg  + " message: " + positionerror.message
    kony.print(errorMesg);
   if (positionerror.code == 2) {
    kony.ui.Alert("Turn On Location services to determine current location",androidgeoCallBack,constants.ALERT_TYPE_CONFIRMATION,"Cancel","Settings","");	    
            
   } 
   
    if(userAgent== "iPhone"){
    frmLocatorKA.locatorSearchTextField.text = null;
    setDataMapWithoutLoc();
    }
}

function androidgeoCallBack(response){
  if(response== true){
    frmLocatorKA.locatorSearchTextField.text = null;
    setDataMapWithoutLoc();
  }
    
  else{
    LocationSettings.open();
  }
    
  
}
function setDataMap(){
  ShowLoadingScreen();
  var options = {"access":"online"};
  objectService = kony.sdk.getCurrentInstance().getObjectService("RBObjects",options);
  var dataObject = new kony.sdk.dto.DataObject("Locations");
  
  var queryParams = {"currLatitude":gblLatitude,"currLongitude":gblLongitude,"maxDistance":50};
  var serviceOptions = {"dataObject":dataObject,"queryParams":queryParams};
  objectService.fetch(serviceOptions, setDataMapCallBack,errorCallBack);  
}

function errorCallBack(err){
   kony.print(err.errmsg);
   var msg;
   kony.application.dismissLoadingScreen();
   if(err.hasOwnProperty("errmsg"))
    msg = err.errmsg; // for manual service calls
   kony.ui.Alert({
        "alertType": constants.ALERT_TYPE_INFO,
        "alertTitle": "Error",
        "yesLabel": "OK",
        "noLabel": "",
        "message": msg,
        "alertHandler": null
     },{});              

}

function setDataMapCallBack(response){
 
  if(frmLocatorKA.locatorSearchTextField.text!= null && frmLocatorKA.locatorSearchTextField.text !="")
    {
       locatorPreShow();
    }
  kony.print("records length"+ response.records.length + "response"+ JSON.stringify(response));
  kony.print( "records"+ JSON.stringify(response.records));
  locationList = response.records;// result.Locations;
 
  kony.print("locationListlength"+locationList.length+ JSON.stringify(locationList));
 
  if(gblIsCurrentLocation== true){
    
    //kept outside for loop because in case of random string search ,current location button should work
   tempLocaterDataCurrPos = { lat: gblLatitude, 
					   lon: gblLongitude,
					   image:"current_location.png",
					   showcallout: false
                       
					   };
   //frmLocatorKA.locatorMap.navigateToLocation(locatorResultSet[0], false, true); 
  gblCurrentLocatorResult= tempLocaterDataCurrPos;
  frmLocatorKA.mapCurrentLocationWrapper.setVisibility(true);
 }else{
  frmLocatorKA.mapCurrentLocationWrapper.setVisibility(false);
    }
  if(locationList.length ==0){ 		 
    bothLocationData = [];
    frmLocatorKA.locatorMap.locationData=[];
    kony.ui.Alert("No ATM/Branches found in specified search criteria.",null,constants.ALERT_TYPE_INFO,"OK","","");
    if(frmLocatorKA.locatorSearchTextField.text!= null && frmLocatorKA.locatorSearchTextField.text !=""){
    kony.print("entering into search"); 
    if(userAgent == "iPhone") 
    locatorPostShow();
   
    kony.application.dismissLoadingScreen();
   // frmLocatorKA.show();
   }
  }
  else
   settingMapListView() ;
    
}

function settingMapListView(){
 
  var tempLocaterData=[];
  var locatorResultSet=[];
 
  for(var i=0;i<locationList.length;i++){
     frmLocatorKA.locatorMap.calloutTemplate=flxMapATMBranchWithoutLocation;
     
      
     frmLocatorKA.locatorMap.widgetDataMapForCallout={
     lblName:"rbName",
     lblAddress:"rbDesc",
     lblDistance:"lblDistance",
     lblDistanceUnit:"lblDistanceUnit",
     lblStatus:"lblStatus",
     imgStatus:"imgStatus",
     imgNext:"imgNext",
 
   }
    
  // distanceLabel: distanceinMiles[i] + " Miles",
      tempLocaterData ={
                       lat: locationList[i].latitude,
                       lon:locationList[i].longitude,
                       name:locationList[i].addressLine1,
                       desc:locationList[i].addressLine2,
                       image: getMapPinIcon(locationList[i].type),
                       city:locationList[i].city,
                       zipCode:locationList[i].zipCode,
                       phone:locationList[i].phone,
                       email:locationList[i].email,
                       services:locationList[i].services,
                       workingHours:locationList[i].workingHours,
                       type: locationList[i].type,
                       
                       showcallout: true,
                       calloutData:{rbName: locationList[i].addressLine1,
                                     rbDesc:locationList[i].addressLine2,
                                     lblDistance: "", 
                                     lblDistanceUnit:"",
                                     lblStatus:{"text":locationList[i].status,"skin":getSknColorStatus(locationList[i].status)},
                                     imgStatus:{"src":getStatusImage(locationList[i].status)},
                                     imgNext:{"onTouchEnd":onClickdetails}
                                     
                                     
                                    
                                     }
                       
      }
    
     
     locatorResultSet.push(tempLocaterData);   
	 tempLocaterData = [];
    
 
   }
    kony.print("mapData #####"+locatorResultSet.length+ JSON.stringify(locatorResultSet));
    frmLocatorKA.locatorMap.calloutWidth=55;
    frmLocatorKA.locatorMap.locationData=locatorResultSet;
    if(userAgent != "iPhone")
       frmLocatorKA.locatorMap.onSelection=onClickdetails;
       frmLocatorKA.locatorMap.onPinClick=onClickPin;
       frmLocatorKA.locatorMap.zoomLevel=15; 
     
     if(frmLocatorKA.locatorSearchTextField.text!= null && frmLocatorKA.locatorSearchTextField.text !=""){
   kony.print("entering into search"); 

    bothLocationData = [];
    if(userAgent == "iPhone") 
    locatorPostShow();
   if((locationList.length>0 && gblIsCurrentLocation == true) || (locationList.length>0 && gblIsCurrentLocation == false) )
    frmLocatorKA.locatorMap.navigateToLocation(locatorResultSet[0], false, true); 
  }
     
    kony.print("tempLocaterDataCurrPos"+JSON.stringify(tempLocaterDataCurrPos));
    kony.print("setDataMapCallBAck bothLocationData"+ bothLocationData.length+" "+JSON.stringify(bothLocationData));
 
    kony.application.dismissLoadingScreen();
    frmLocatorKA.show();
 
	kony.print("setDataMapCallBAck after bothLocationData"+ bothLocationData.length+ " "+JSON.stringify(bothLocationData));
 
}


function onClickdetails(){
  kony.print("gblPinClickDetails>>>>>>>>"+JSON.stringify(gblPinClickDetails));
  var segOperationData=[];
  var segServiceData=[];
  var serviceListValue=gblPinClickDetails.services.split("||");
  var workingHoursValue=gblPinClickDetails.workingHours.split("||");
  
  for(i=0; i<workingHoursValue.length;i++){
     segOperationData.push({
       
         "lblOperationHrs":workingHoursValue[i].split(":")[0]+":",
         "lblOperationHrsValue":workingHoursValue[i].split(":")[1]
     })
  }
  for(i=0; i<serviceListValue.length;i++){
     segServiceData.push({
       
         "lblServiceList":serviceListValue[i]
     
     })
  }
  
 
  kony.print("segOperationData"+JSON.stringify(segOperationData));
  kony.print("segServiceData"+JSON.stringify(segServiceData));
  gblATMBranchDetails = true;
  if(gblPinClickDetails.type=="ATM"){
    frmLocatorATMDetailsKA.segOperationHours.setData(segOperationData);
    frmLocatorATMDetailsKA.segServiceList.setData(segServiceData);
    if(userAgent== "iPhone")
    frmLocatorATMDetailsKA.exampleTitleLabel.text=gblPinClickDetails.name;
    else{
      frmLocatorATMDetailsKA.androidTitleLabel.text=gblPinClickDetails.name;
    }
      
    frmLocatorATMDetailsKA.address1.text=gblPinClickDetails.desc;
    frmLocatorATMDetailsKA.address2.text=gblPinClickDetails.city + "-"+ gblPinClickDetails.zipCode;
      
    if(gblIsCurrentLocation== true){
      getDistanceBWLocationsMapViewATM();
    frmLocatorATMDetailsKA.getDirectionsButton.onClick=getSearchRoutes;
    frmLocatorATMDetailsKA.getDirectionsButton.setVisibility(true);
      /*
      if((gblPinClickDetails.distanceLabel).trim()=="Miles")
         frmLocatorATMDetailsKA.distance.text="Distance Unknown";
      else
         frmLocatorATMDetailsKA.distance.text=gblPinClickDetails.distanceLabel;
       */
    }
    else{
      frmLocatorATMDetailsKA.distance.text="Distance Unknown";
      frmLocatorATMDetailsKA.getDirectionsButton.setVisibility(false); 
    }
    
    frmLocatorATMDetailsKA.show();
  }
  else
    {
      frmLocatorBranchDetailsKA.segOperationHours.setData(segOperationData);
      frmLocatorBranchDetailsKA.segServiceList.setData(segServiceData);
      frmLocatorBranchDetailsKA.callButton.onClick= callPhone;
      frmLocatorBranchDetailsKA.lblEmailAddress.text= gblPinClickDetails.email;
       if(userAgent== "iPhone")
      frmLocatorBranchDetailsKA.exampleTitleLabel.text=gblPinClickDetails.name;
      else{
        frmLocatorBranchDetailsKA.androidTitleLabel.text=gblPinClickDetails.name;
      }
      
      frmLocatorBranchDetailsKA.address1.text=gblPinClickDetails.desc;
      frmLocatorBranchDetailsKA.address2.text=gblPinClickDetails.city + "-"+ gblPinClickDetails.zipCode;
      
       if(gblIsCurrentLocation== true){
        getDistanceBWLocationsMapViewBranch();
      frmLocatorBranchDetailsKA.getDirectionsButton.onClick= getSearchRoutes;
      frmLocatorBranchDetailsKA.getDirectionsButton.setVisibility(true);
         /*
        if(gblPinClickDetails.distanceLabel.trim()=="Miles")
           frmLocatorBranchDetailsKA.distance.text="Distance Unknown"; 
        else
           frmLocatorBranchDetailsKA.distance.text=gblPinClickDetails.distanceLabel;
           */
       }
      else{
       frmLocatorBranchDetailsKA.getDirectionsButton.setVisibility(false); 
      frmLocatorBranchDetailsKA.distance.text="Distance Unknown"; 
      }
      
      frmLocatorBranchDetailsKA.show();
    }
  
  
  
}

function onClickPin(mapid,response){
 
   kony.print("into onClickPin"+ JSON.stringify(response));
   frmLocatorKA.locatorMap.navigateToLocation(response, true, true) ;
   gblPinClickDetails=response;
 
}

function onClickRowTypeSegmentList(){
  listRowData=frmLocatorKA.locatorSegmentList.selectedRowItems[0];
  kony.print("listRowData"+JSON.stringify(listRowData));
  gblPinClickDetails=listRowData;
  kony.print("gblPinClickDetails...onClickRowTypeSegmentList"+JSON.stringify(gblPinClickDetails));
  var segListOperationData=[];
  var segListServiceData=[];
  var serviceListValue=gblPinClickDetails.services.split("||");
  var workingHoursValue=gblPinClickDetails.workingHours.split("||");
  
  for(i=0; i<workingHoursValue.length;i++){
     segListOperationData.push({
       
         "lblOperationHrs":workingHoursValue[i].split(":")[0]+":",
         "lblOperationHrsValue":workingHoursValue[i].split(":")[1]
     
     })
  }
  for(i=0; i<serviceListValue.length;i++){
     segListServiceData.push({
       
         "lblServiceList":serviceListValue[i]
     
     })
  }
  kony.print("segListOperationData"+JSON.stringify(segListOperationData));
  kony.print("segListServiceData"+JSON.stringify(segListServiceData));
  gblATMBranchDetails = true;
  if(listRowData.type=="ATM"){
    frmLocatorATMDetailsKA.segOperationHours.setData(segListOperationData);
    frmLocatorATMDetailsKA.segServiceList.setData(segListServiceData);
     if(userAgent== "iPhone")
    frmLocatorATMDetailsKA.exampleTitleLabel.text=gblPinClickDetails.informationListLabel;
    else{
      frmLocatorATMDetailsKA.androidTitleLabel.text=gblPinClickDetails.informationListLabel;
    }
      
    frmLocatorATMDetailsKA.address1.text=gblPinClickDetails.addressLine1;
      frmLocatorATMDetailsKA.address2.text=gblPinClickDetails.city + "-"+ gblPinClickDetails.zipCode;
      
    if(gblIsCurrentLocation== true){
    frmLocatorATMDetailsKA.getDirectionsButton.onClick=getSearchRoutes;
    frmLocatorATMDetailsKA.getDirectionsButton.setVisibility(true);
      if(gblPinClickDetails.distanceLabel=="")
          frmLocatorATMDetailsKA.distance.text="Distance Unknown";
      else
          frmLocatorATMDetailsKA.distance.text=gblPinClickDetails.distanceLabel;
    }
    else{
      frmLocatorATMDetailsKA.distance.text="Distance Unknown";
    frmLocatorATMDetailsKA.getDirectionsButton.setVisibility(false); 
    }
    
    frmLocatorATMDetailsKA.show();
  }
  else
    {
       frmLocatorBranchDetailsKA.segOperationHours.setData(segListOperationData);
       frmLocatorBranchDetailsKA.segServiceList.setData(segListServiceData);
      if(userAgent== "iPhone")
      frmLocatorBranchDetailsKA.exampleTitleLabel.text=gblPinClickDetails.informationListLabel;
      else{
         frmLocatorBranchDetailsKA.androidTitleLabel.text=gblPinClickDetails.informationListLabel;
      }
     
      frmLocatorBranchDetailsKA.address1.text=gblPinClickDetails.addressLine1;
      frmLocatorBranchDetailsKA.address2.text=gblPinClickDetails.city + "-"+ gblPinClickDetails.zipCode;
      
      frmLocatorBranchDetailsKA.callButton.onClick= callPhone;
      frmLocatorBranchDetailsKA.lblEmailAddress.text= gblPinClickDetails.email;
     if(gblIsCurrentLocation== true){
      frmLocatorBranchDetailsKA.getDirectionsButton.onClick= getSearchRoutes;
      frmLocatorBranchDetailsKA.getDirectionsButton.setVisibility(true);
       if(gblPinClickDetails.distanceLabel=="")
         frmLocatorBranchDetailsKA.distance.text="Distance Unknown";
       else
         frmLocatorBranchDetailsKA.distance.text=gblPinClickDetails.distanceLabel; 
     }
      else{
        frmLocatorBranchDetailsKA.distance.text="Distance Unknown";
      frmLocatorBranchDetailsKA.getDirectionsButton.setVisibility(false); 
      }
        
      frmLocatorBranchDetailsKA.show();
    }
  
}

  function callPhone(){
    kony.print("callPhone"+ gblPinClickDetails.phone);
      kony.ui.Alert(gblPinClickDetails.phone,
	               phoneCallBack,
	               constants.ALERT_TYPE_CONFIRMATION,
	               "Yes",
	               "No",
	               "Call");
  
}

 function phoneCallBack(response) {
    
       if (response) {
          kony.phone.dial(gblPinClickDetails.phone);
        }
    
}

function getSearchRoutes(){
   ShowLoadingScreen();
  kony.print("gblPinClickDetails"+JSON.stringify(gblPinClickDetails));
  if (userAgent=="iPhone") {
							var searchCriteria = {
									origin : {lat:gblLatitude, lon: gblLongitude},
									destination : {lat : gblPinClickDetails.lat,lon : gblPinClickDetails.lon},
									alternatives : false,
                                    
							};
						}else{
							var searchCriteria = {
									origin : {lat:gblLatitude, lon: gblLongitude},
									destination : {lat : gblPinClickDetails.lat,lon : gblPinClickDetails.lon},
									directionServiceUrl : "https://maps.googleapis.com/maps/api/directions/json",
									alternatives : false,
                                    
							};
							searchCriteria.apiKey = "AIzaSyAJOkl-7hJ08jbE5sBZs9Da9qrHP_XhXro";
                                                     
  kony.print("searchCriteria"+JSON.stringify(searchCriteria));
						}
  kony.map.searchRoutes(searchCriteria, searchRouteSuccesCallback, errorRouteSuccesCallback); 
  
}

function searchRouteSuccesCallback(routes)
{
    kony.print("######Succeess callback is called###"+JSON.stringify(routes));
  if(routes == null || routes.length == 0){
    kony.application.dismissLoadingScreen();
   
     kony.ui.Alert("No Directions Available",null,constants.ALERT_TYPE_INFO,"OK","","");
  } else
    {
    displaySearchRoutes(routes);
    setDirectionStepsData(routes);
    }
}
function noDirectionCallBack(response){
  kony.print("response"+ response);
}
function errorRouteSuccesCallback(code,emsg){
  
  kony.print("code"+ code+ "message" +emsg );
}
function displaySearchRoutes(routes){
 // setDirectionStepsData(Searchroutes);
  var routeColors = ["0000FFFF","FF00FFFF","FF0000FF","FFFF00FF","0x000000FF"];

        for(var i=0;i<routes.length;i++)
        {
            drawRoute("route"+i, routes[i].polylinePoints, routeColors[i]);
        }
        
}

function drawRoute(routeid,polyPoints,color)
{
    var steps = polyPoints;
    kony.print("################The polyline points");
    kony.print("drawRoute"+ steps);
     kony.print("drawRoute"+ steps.length);
    ei = steps.length-1;
    kony.print("ei"+ ei);
  // include id:1,id:2

    var startLoc = {
        lat:steps[0].lat,
        lon:steps[0].lon,
        image:{source:"current_location.png",anchor:kony.map.PIN_IMG_ANCHOR_CENTER}
    };

    var endLoc = {
        
        lat:steps[ei].lat,
        lon:steps[ei].lon,
        image:{source:getLocationImage(gblPinClickDetails.type),anchor:kony.map.PIN_IMG_ANCHOR_CENTER}
    };

    polylineData = {
        id : routeid,
        locations : steps,
        startLocation : startLoc,
        endLocation : endLoc,
        polylineConfig : {lineWidth : 5, lineColor: color}
    };
       locationinDir= startLoc;
    
    frmDirectionsKA.locatorMap.addPolyline(polylineData);
    if(kony.application.getCurrentForm().id== "frmLocatorATMDetailsKA")
    directionHeaderTitle(frmLocatorATMDetailsKA);
    else{
     directionHeaderTitle(frmLocatorBranchDetailsKA);   
    }
    
    frmDirectionsKA.currentLocationButton.onClick= toGetCurrentPosition;
    frmDirectionsKA.locatorMap.locationData=[];
    kony.application.dismissLoadingScreen();
    frmDirectionsKA.show();
}	

function directionHeaderTitle(frmName){
      if(userAgent== "iPhone")
      frmDirectionsKA.lblTitleKA.text =  frmName.exampleTitleLabel.text;
      else{
      frmDirectionsKA.lblTitleKA.text= frmName.androidTitleLabel.text;
      }  
      frmDirectionsKA.lblAddress1KA.text= frmName.address1.text;
      frmDirectionsKA.lblAddress2KA.text=frmName.address2.text;
  
}

function setDirectionStepsData(resultTable){
  kony.print("resultTable"+ " "+ JSON.stringify(resultTable));
  if(resultTable && resultTable[0]){
	    		var stepsTable = resultTable[0]["legs"][0]["steps"]; //main
                kony.print("stepsTable"+ " "+ JSON.stringify(stepsTable));
	    		var newDirectionsList = [];
			    var distanceValue = "";
			    var durationValue = "";
			    var longInstructionVA = "";
			  
				var totalDuration = resultTable[0]["legs"][0]["duration"];//main
                kony.print("duration"+ " "+ JSON.stringify(duration));
				var totalDistance = 0;
				var eachStep;
		
		
                var defaultRoutes =kony.i18n.getLocalizedString("i18n.common.Map.defaultDirectionListVA.ValueVA");
                  var defaultRoutesArray = defaultRoutes.split(",");
					var defaultTable = [];
					var len = 0;
					for(var j=0;j<defaultRoutesArray.length;j++){ // gets the respective maneuver image
                       kony.print("defaultRoutesArray"+ defaultRoutesArray[j]);
							var entry = defaultRoutesArray[j];
							defaultTable.push({"key" :entry.split(":")[0],value : entry.split(":")[1]});
							len=defaultTable.length;
									
					}
                   kony.print("len"+ len);
				for (var i=0; ((stepsTable) != null) && i< stepsTable.length; i++ ){
					 eachStep = stepsTable[i];
					 var imgDirectionVA = "";
					longInstructionVA = eachStep["instruction"];	
						longInstructionVA = longInstructionVA ? longInstructionVA.replace(/(<([^>]+)>)/ig, ""): "";		
						longInstructionVA = longInstructionVA ? longInstructionVA.replace(/&nbsp;/gi,' '): "";
							var lowerLongInstructionVA = longInstructionVA ? longInstructionVA.toLowerCase() : "" ;
							var value;
							
							var directionImage = "";
							var record;
							for(var k=0; k<len; k++){
								record = defaultTable[k];
                              kony.print("record"+ JSON.stringify(record));
								value = getDirectionImage(record["key"],lowerLongInstructionVA);
                              kony.print("getDirectionImage"+ value);
								if(value != -1){
									directionImage = defaultTable[k]["value"];
									k = len +1;
								}
							}
							if(directionImage != ""){
								imgDirectionVA = directionImage;
							}else{
								imgDirectionVA = "";
							}
						 
						 var distanceValue = toConvertMiles(eachStep["distance"]);
						 totalDistance = totalDistance + eachStep["distance"];
                  
						 kony.table.insert(newDirectionsList, {
							lblMilesKA : distanceValue,
							lblAddress1KA : longInstructionVA,
							imgDirKA : imgDirectionVA
						 });
					}
					var totalDurationFinal = toConvertMins(totalDuration);
					var totalDistanceFinal = toConvertMiles(totalDistance);
					
					frmDirectionsKA.lblDistanceKA.text = totalDistanceFinal +" / "+ totalDurationFinal;
                    frmDirectionsKA.locatorSegmentList.setData(newDirectionsList);
         	
    		}
  
  
  
}

function getDirectionImage(key,value){
  var keyOccurredAt = -1;
			value = value ? value.replace(/(<([^>]+)>)/ig, "") : "";
			if(value != ""){
			
				var keyi18nValue = kony.i18n.getLocalizedString("i18n.common.Map."+key+".ValueVA");//see
				var splitFlag = false;
				if(keyi18nValue && keyi18nValue.indexOf(',') != -1){
					var keyArray = keyi18nValue.split(",");
					splitFlag = true;
				}
				if(splitFlag){
					for (var k=0; ((keyArray) != null) && k< keyArray.length; k++ ){
						var keyValue = keyArray[k];
						keyValue = keyValue.toLowerCase();
						if((value.indexOf(keyValue))!= -1){
							keyOccurredAt = value.indexOf(keyValue);
							return keyOccurredAt;
						}
					}
				}else{
					if(keyi18nValue && (value.indexOf(keyi18nValue))!= -1){
						keyi18nValue = keyi18nValue.toLowerCase();
						keyOccurredAt = value.indexOf(keyi18nValue);
					}
				}
			}
			return keyOccurredAt;
  
  
}

 function toGetCurrentPosition(){
   kony.print("toGetCurrentPosition"+ locationinDir);
   frmDirectionsKA.locatorMap.navigateToLocation(locationinDir, true, true) ;
  }
function toConvertMiles(meterValue){
 
			var mileValue = "";
			mileValue = meterValue * 0.000621371;
			mileValue = mileValue.toFixed(1);
			
			if(mileValue == 0.0){
			mileValue = meterValue * 3.28084;
			mileValue = mileValue.toFixed(0)+" "+"Feet";
			}else{
			mileValue = mileValue+" "+"Miles";
			}
			return mileValue;
  
}

function toConvertMins(secValue){
 
			var minValue = "";
			minValue = secValue/60;
			minValue = minValue.toFixed(0) ;
			
			if(minValue == 0){
			minValue = secValue +" "+"Seconds";
			}else{
			minValue = minValue +" "+ "Minutes";
			}
			return minValue;
  
  
}