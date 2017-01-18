

function setListData(){
    segmentListData = [];
      for(var i=0;i<locationList.length;i++){
     
      if(gblIsCurrentLocation== true){
       
        if(distanceinMiles[i]!=='' && typeof(distanceinMiles[i])=='string' ){
          kony.print("going into distanceinMiles ");
          distanceListShow=  distanceinMiles[i] + " Miles"; 
          }else
          {
          kony.print("going into distanceinMiles Unknown ");
        
          distanceListShow=distanceinMiles[i];
           
          }
      
     }
     else{
     
      kony.print("going to else check current position");
       distanceListShow=distanceinMiles[i];
     
     }
     
      
     kony.print("distanceinMiles in List setting after Calcualtion"+JSON.stringify(distanceinMiles));

  
   frmLocatorKA.locatorSegmentList.widgetDataMap={
     rightChevron1:"rightChevron1",
     informationListLabel: "informationListLabel",
     distanceLabel:"distanceLabel",
     informationListIcon:"informationListIcon",
     addressLine1: "addressLine1",
     lblListStatus: "lblListStatus",
     type: "type",
     imgListStatus:"imgListStatus",
     imgNext:"imgNext",
     city:"city",
     zipCode:"zipCode",
     phone:"phone",
     email:"email",
     services:"services",
     workingHours:"workingHours"
     
   }

     
      segmentListData.push({
        rightChevron1:{"src":"map_drilldown.png"},
        informationListLabel: locationList[i].addressLine1,
        distanceLabel:distanceListShow,
        informationListIcon: {"src":getLocationImage(locationList[i].type)},
        addressLine1: locationList[i].addressLine2,
        lblListStatus: {"text":locationList[i].status,"skin":getSknColorStatus(locationList[i].status)},
        type: locationList[i].type,
        lat: locationList[i].latitude,
        lon:locationList[i].longitude,
        city:locationList[i].city,
        zipCode:locationList[i].zipCode,
        phone:locationList[i].phone,
        email:locationList[i].email,
        services:locationList[i].services,
        workingHours:locationList[i].workingHours,
        imgListStatus:{"src":getStatusImage(locationList[i].status)}
    });
     
      }   
    kony.print("listData #####"+segmentListData.length+ JSON.stringify(segmentListData));
  
  if(segmentListData.length > 0){	 
	frmLocatorKA.locatorSegmentList.setVisibility(true);
    frmLocatorKA.LabelNoRecordsKA.setVisibility(false);
    if(filterType== "Both"){
      kony.print("going into Both Type");
      frmLocatorKA.locatorSegmentList.setData(segmentListData);
    }else if(filterType=="ATM"){
      kony.print("going into ATM Type");
      var data = getFilteredData(segmentListData, "ATM", "List");
      if(data.length>0){
	     frmLocatorKA.locatorSegmentList.setVisibility(true);
         frmLocatorKA.LabelNoRecordsKA.setVisibility(false);
    	 frmLocatorKA.locatorSegmentList.removeAll();
         frmLocatorKA.locatorSegmentList.setData(data); 
       }else{
    	 frmLocatorKA.locatorSegmentList.setVisibility(false);
    	 frmLocatorKA.LabelNoRecordsKA.setVisibility(true);   
       } 
    }else if(filterType=="Branch"){
      kony.print("going into Branch Type");
      var data = getFilteredData(segmentListData, "Branch", "List");
      if(data.length>0){
	     frmLocatorKA.locatorSegmentList.setVisibility(true);
         frmLocatorKA.LabelNoRecordsKA.setVisibility(false);
         frmLocatorKA.locatorSegmentList.removeAll();
         frmLocatorKA.locatorSegmentList.setData(data);
      }else{
         frmLocatorKA.locatorSegmentList.setVisibility(false);
         frmLocatorKA.LabelNoRecordsKA.setVisibility(true);   
      } 
      
    }
  }else{
    kony.print("going into else");
    frmLocatorKA.locatorSegmentList.setVisibility(false);
    frmLocatorKA.LabelNoRecordsKA.setVisibility(true);  
    }
    frmLocatorKA.locatorSegmentList.onRowClick=onClickRowTypeSegmentList;

    
    kony.print("setDataMapCallBAck bothMasterData "+segmentListData.length + " "+   JSON.stringify(segmentListData));

    kony.application.dismissLoadingScreen();
   }
  
function getDistanceBWLocationsMapViewATM(){
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
  kony.map.searchRoutes(searchCriteria, findDistanceSuccesCallbackMapViewATM, errorRouteSuccesCallback);
     
   }

function findDistanceSuccesCallbackMapViewATM(routes)
{
 
  kony.print("######findDistanceSuccesCallback is called###"+JSON.stringify(routes));
  if(routes == null || routes.length == 0){
    kony.print("Unable to find distance");
   frmLocatorATMDetailsKA.distance.text= "Distance Unknown";;
 
  } else
    {
    
    frmLocatorATMDetailsKA.distance.text=calDistanceUsingStepsData(routes)+ " Miles";
    
    }
 
    
}

function getDistanceBWLocationsMapViewBranch(){
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
  kony.map.searchRoutes(searchCriteria, findDistanceSuccesCallbackMapViewBranch, errorRouteSuccesCallback);
     
   }

function findDistanceSuccesCallbackMapViewBranch(routes)
{
 
  kony.print("######findDistanceSuccesCallback is called###"+JSON.stringify(routes));
  if(routes == null || routes.length == 0){
    kony.print("Unable to find distance");
   frmLocatorBranchDetailsKA.distance.text= "Distance Unknown";;
 
  } else
    {
    
    frmLocatorBranchDetailsKA.distance.text=calDistanceUsingStepsData(routes)+ " Miles";
    
    }
 
    
}