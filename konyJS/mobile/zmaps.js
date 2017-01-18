//Type your code here
var gblLatitude,gbLlongitude,gblCurrentLocator,gblIsCurrentLocation,gblLocationData,gblLocationDataATM,gblLocationDataBranch,gblSelectionPinData,gblDirectionsData,gblFilterType,gblRoute,gblFormName;
/**
* On Click of LocateUs,gets CurrentLocation
*
* @author  Surendra
*/

function onClickLocateUS(isLoggedIn,formName){
  kony.print("perf log for map button click -- Start");
  ShowLoadingScreen();
  gblFormName = formName;
  kony.location.getCurrentPosition(geoLocationSuccessCallBack,geoLocationErrorCallBack);
  if(userAgent == "iPhone"){
    frmLocatorKA.backButton.setVisibility(true);
  }
  else{
    frmLocatorKA.hamburgerButton.setVisibility(isLoggedIn);
    frmLocatorKA.backButton.setVisibility(!isLoggedIn);
  }
  	  /**
      * SuccessCallBack of  CurrentLocation
      */
      function geoLocationSuccessCallBack(response){
       try{
          gblIsCurrentLocation =true;
          frmLocatorKA.locatorSearchTextField.text = "";
          
          if(response && response.coords && response.coords.latitude && response.coords.longitude){
                 gblLatitude =response.coords.latitude;
                 gbLlongitude =response.coords.longitude; 
          } 
          var options = {"access":"online"};
          objectService = kony.sdk.getCurrentInstance().getObjectService("RBObjects",options);
          var dataObject = new kony.sdk.dto.DataObject("Locations");

          var queryParams = {"currLatitude":gblLatitude?gblLatitude:"","currLongitude":gbLlongitude?gbLlongitude:"","maxDistance":50};
          var serviceOptions = {"dataObject":dataObject,"queryParams":queryParams};
          kony.print("Perf log for map loading -- Start");
		  objectService.fetch(serviceOptions, setDataMapCallBack,errorCallBack);
        }
       catch(e){
          customErrorCallback(e);
        }
      }     
	 /**
      * ErrorCallBack of  CurrentLocation
      */
    function geoLocationErrorCallBack(err){
      gblIsCurrentLocation =false;
      var errorMsg = "Error code: " + err.code;
      errorMsg = errorMsg  + " message: " + err.message;
      kony.print(errorMsg);
      if (err.code == 2 && userAgent !== "iPhone") {
      	kony.ui.Alert(i18n_turnOnLocationAlert,androidgeoCallBack,constants.ALERT_TYPE_CONFIRMATION,"Cancel","Settings","");	    
      }
      else if(userAgent == "iPhone" || userAgent == "iPad"){
        frmLocatorKA.locatorSearchTextField.text = "";
        setDataMapWithoutCurrentLoc();
      }
      kony.application.dismissLoadingScreen();
    }
}
/**
* ErrorCallBack of  ServiceCall of getLocations
*/
function errorCallBack(err){
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
/**
* CallBack of  Alert when currentLocaton is Off.Only for android
*/
function androidgeoCallBack(response){
  try{
    if(response == true){
      frmLocatorKA.locatorSearchTextField.text = "";
      setDataMapWithoutCurrentLoc();
    } 
    else{
      LocationSettings.open();
    }
  }
  catch(e){
    kony.print(e);
  }
}
/**
* SuccesCallBack of  ServiceCall of getLocations
*/
function setDataMapCallBack(response){
	kony.print("Perf log for map loading -- End");
  try{
  var locationList = [];
  if(response){
  	locationList = response.records;  // result.Locations; 
  }
  if(gblIsCurrentLocation == true){
  //kept outside for loop because in case of random string search ,current location button should work
   gblCurrentLocator = { lat: gblLatitude, 
					   lon: gbLlongitude,
					   image:"current_location.png",
					   showcallout: false
					   };
  frmLocatorKA.mapCurrentLocationWrapper.setVisibility(true);
  }else{
  frmLocatorKA.mapCurrentLocationWrapper.setVisibility(false);
  }
   gblFilterType="BOTH";
   frmLocatorKA.btnBothKA.skin = "sknaccountFilterButtonEnable";
   frmLocatorKA.btnATMKA.skin = "sknaccountFilterButtonDisabled";
   frmLocatorKA.btnBranchKA.skin = "sknaccountFilterButtonDisabled";
   settingMapListView(locationList) ;
  } 
  catch(e){
     kony.print(e);
  } 
}
/**
* Iteration of Locations and Filtered
*/
function settingMapListView(locationList){
 try{
    var tempLocaterData=[];
    var locatorResultSet=[];
    gblLocationData = [];gblLocationDataATM = [];gblLocationDataBranch = [];
    for(var i=0;i<locationList.length;i++){
        tempLocaterData =
                      {
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
                         calloutData:{
                                       rbName: locationList[i].addressLine1,
                                       rbDesc:locationList[i].addressLine2,
                                       lblDistance: "", 
                                       lblDistanceUnit:"",
                                       lblStatus:{"text":locationList[i].status,"skin":getSknColorStatus(locationList[i].status)},
                                       imgStatus:{"src":getStatusImage(locationList[i].status)},
                                       imgNext:{"isVisible": true}
                                     },
                       rightChevron1:{"src":"map_drilldown.png"},
                       distanceLabel:"",
                       informationListIcon: {"src":getLocationImage(locationList[i].type)},
                       lblListStatus: {"text":locationList[i].status,"skin":getSknColorStatus(locationList[i].status)},
                       imgListStatusseg:{"src":getStatusImage(locationList[i].status)}
                    };
       gblLocationData.push(tempLocaterData);   
       if(tempLocaterData.type.indexOf("ATM") > -1){
         gblLocationDataATM.push(tempLocaterData);
       }
       else if(tempLocaterData.type.indexOf("ATM") == -1){
         gblLocationDataBranch.push(tempLocaterData);   
       }
       tempLocaterData = [];
     }
    if(frmLocatorKA.locatorSearchTextField.text !=="" && frmLocatorKA.locatorSearchTextField.text != null){
      settingData(gblLocationData,onClickFilterCallback); 
    }
    else{
     settingData(gblLocationData,locationFormNavigation); 
    }
 }
 catch(e){
    kony.print(e);
  }
}
/**
* CallBack of LocateUs Button.frmLocatorKA show
*/
function locationFormNavigation(){
    kony.application.dismissLoadingScreen();
    frmLocatorKA.noSearchResults.isVisible = false;
	frmLocatorKA.locatorSegmentList.top = "0dp";
	frmLocatorKA.locatorSegmentList.opacity = 1;
    if(menuIconForceTouch){
      menuIconForceTouch = false;
    }
    else{
     frmLocatorKA.show(); 
	  kony.print("perf log for map button click -- End");
    } 
	
}
/**
* Common function that sets data for Segment and Maps.Used in case of ATM and Branch Buttons
*/
function settingData(data,callback){
    if(data && data.length >0){
      frmLocatorKA.locatorMap.calloutTemplate=flxMapATMBranchWithoutLocation;
      frmLocatorKA.locatorMap.widgetDataMapForCallout={
       lblName:"rbName",
       lblAddress:"rbDesc",
       lblDistance:"lblDistance",
       lblDistanceUnit:"lblDistanceUnit",
       lblStatus:"lblStatus",
       imgStatus:"imgStatus",
       imgNext:"imgNext",
     };
      frmLocatorKA.locatorSegmentList.widgetDataMap={
       rightChevron1:"rightChevron1",
       informationListLabel: "name",
       distanceLabel:"distanceLabel",
       informationListIcon:"informationListIcon",
       addressLine1: "desc",
       lblListStatus: "lblListStatus",
       type: "type",
       imgListStatus:"imgListStatusseg",
       imgNext:"imgNext",
       city:"city",
       zipCode:"zipCode",
       phone:"phone",
       email:"email",
       services:"services",
       workingHours:"workingHours"
     };
      frmLocatorKA.locatorMap.calloutWidth=55;
      frmLocatorKA.locatorMap.locationData=data;
      frmLocatorKA.locatorSegmentList.setData(data);
      frmLocatorKA.locatorSegmentList.setVisibility(true);
      frmLocatorKA.LabelNoRecordsKA.setVisibility(false);
      frmLocatorKA.locatorSegmentList.onRowClick=onRowClickSegment;
      if (userAgent=="iPhone" || userAgent=="iPad") 
      {
        frmLocatorKA.locatorMap.calloutTemplate["onTouchEnd"] = onClickPinCalloutiPhone;
      }
      else{
      frmLocatorKA.locatorMap.onSelection=onClickPinCallout;
      }
      frmLocatorKA.locatorMap.onPinClick=onClickPin;
      frmLocatorKA.locatorMap.zoomLevel=15; 
    }
    else{
      frmLocatorKA.locatorSegmentList.setVisibility(false);
      frmLocatorKA.LabelNoRecordsKA.setVisibility(true);
      frmLocatorKA.locatorSegmentList.removeAll();
      frmLocatorKA.locatorMap.locationData=[];
      gotoCurrentLocation();
    }
  callback();
}
/**
* On Click of ATM Filter Button.
*/
function getATMLocations(){
  ShowLoadingScreen();
  gblFilterType="ATM";
  frmLocatorKA.btnBothKA.skin = "sknaccountFilterButtonDisabled";
  frmLocatorKA.btnATMKA.skin = "sknaccountFilterButtonEnable";
  frmLocatorKA.btnBranchKA.skin = "sknaccountFilterButtonDisabled";
  settingData(gblLocationDataATM,onClickFilterCallback);
}
/**
* On Click of Branch Filter Button.
*/
function getBranchLocations(){
  ShowLoadingScreen();
  gblFilterType="BRANCH";
  frmLocatorKA.btnBothKA.skin = "sknaccountFilterButtonDisabled";
  frmLocatorKA.btnATMKA.skin = "sknaccountFilterButtonDisabled";
  frmLocatorKA.btnBranchKA.skin = "sknaccountFilterButtonEnable";
  settingData(gblLocationDataBranch,onClickFilterCallback);
}
/**
* On Click of Both ATM & BRANCH(ALL) Filter Button.
*/
function getAllLocations(){
  ShowLoadingScreen();
  gblFilterType="BOTH";
  frmLocatorKA.btnBothKA.skin = "sknaccountFilterButtonEnable";
  frmLocatorKA.btnATMKA.skin = "sknaccountFilterButtonDisabled";
  frmLocatorKA.btnBranchKA.skin = "sknaccountFilterButtonDisabled";
  settingData(gblLocationData,onClickFilterCallback);
}
/**
* On Click of Segment Row..
*/
function onRowClickSegment(){
  var listData=frmLocatorKA.locatorSegmentList.selectedRowItems[0];
  getDetailsData(listData);
}
/**
* Getting details of the location selected.
*/
function getDetailsData(data){
  ShowLoadingScreen();
  gblDirectionsData = data;
  if(gblIsCurrentLocation){
  	getDirections(data,directionSuccessCallback,directionsErrorCallback);
  }
  else{
    settingDetailsData(data);
  }
}
/**
* SuccessCallBack of the location directions.
*/
function directionSuccessCallback(routes){
    settingDetailsData(gblDirectionsData,routes);
  }
/**
* ErrorCallBack of the location directions.
*/
function directionsErrorCallback(){
    kony.print("code"+ code+ "message" +emsg );
    settingDetailsData(gblDirectionsData);
  }
/**
* Common function that sets data for that Location like Services offered and Working Hours
*/
function settingDetailsData(data,mapDetails){
  try{
    var segListOperationData=[];
    var segListServiceData=[];
    var serviceListValue=data.services.split("||");
    var workingHoursValue=data.workingHours.split("||");
    for(i=0; i<workingHoursValue.length;i++){
       segListOperationData.push({
           "lblOperationHrs":workingHoursValue[i].split(":")[0]+":",
           "lblOperationHrsValue":workingHoursValue[i].split(":")[1]

       });
    }
    for(i=0; i<serviceListValue.length;i++){
       segListServiceData.push({      
           "lblServiceList":serviceListValue[i]  
       });
    }
    frmLocatorBranchDetailsKA.segOperationHours.setData(segListOperationData);
    frmLocatorBranchDetailsKA.segServiceList.setData(segListServiceData);
    frmLocatorBranchDetailsKA.exampleTitleLabel.text = data.name;
    frmLocatorBranchDetailsKA.address1.text=data.desc;
    frmLocatorBranchDetailsKA.address2.text=data.city + "-"+ data.zipCode; 
    frmLocatorBranchDetailsKA.lblEmailAddress.text=data.email;
    frmDirectionsKA.lblTitleKA.text =  data.name;
    frmDirectionsKA.lblAddress1KA.text=data.desc;
    frmDirectionsKA.lblAddress2KA.text=data.city + "-"+ data.zipCode; 
    frmLocatorBranchDetailsKA.phoneContainer.setVisibility(true);
     frmLocatorBranchDetailsKA.emailContainer.setVisibility(true);
    if(data.type=="ATM"){
      frmLocatorBranchDetailsKA.phoneContainer.setVisibility(false);
       frmLocatorBranchDetailsKA.emailContainer.setVisibility(false);
    }
    if(gblIsCurrentLocation == true && mapDetails && mapDetails.length >0){
      frmLocatorBranchDetailsKA.getDirectionsButton.onClick=onClickgetDirections;
      frmLocatorBranchDetailsKA.getDirectionsButton.setVisibility(true);
      setDirectionStepsData(mapDetails);
      gblRoute = mapDetails;
    }
    else{
      mapDetails = [];
      frmLocatorBranchDetailsKA.distance.text=i18n_DistanceUnknown;
      frmLocatorBranchDetailsKA.getDirectionsButton.setVisibility(false); 
    }
   // onClickInfoDetails();
    kony.application.dismissLoadingScreen();
    frmLocatorBranchDetailsKA.show();
  }
  catch(e){
     kony.print(e);
  }
}
/**
* If CurrentLocation is not activated.
*/
function setDataMapWithoutCurrentLoc(){
 try{
   ShowLoadingScreen();
   kony.print("setDataMapWithoutLoc");
    gblIsCurrentLocation =false;
    var options = {"access":"online"};
    objectService = kony.sdk.getCurrentInstance().getObjectService("RBObjects",options);
    var dataObject = new kony.sdk.dto.DataObject("Locations");
    var queryParams = {"city":"New York"};
    var serviceOptions = {"dataObject":dataObject,"queryParams":queryParams};
    objectService.fetch(serviceOptions, setDataMapCallBack,errorCallBack); 
 }
 catch(e){
    customErrorCallback(e);
  }
}
/**
* Search TextBox on Done functionality.
*/
function startSearchOnDone(){
  if(frmLocatorKA.locatorSearchTextField.text != null){
    setDataMaponSearch(frmLocatorKA.locatorSearchTextField.text.trim());
  }
}
/**
* Service Call of Search.
*/
function setDataMaponSearch(searchCriteria){
  try{
    ShowLoadingScreen();
    kony.print("setDataMaponSearch");
    var options = {"access":"online"};
    objectService = kony.sdk.getCurrentInstance().getObjectService("RBObjects",options);
    var dataObject = new kony.sdk.dto.DataObject("Locations");
    var city= searchCriteria;
    var queryParams = {"city":city.trim()};
    var serviceOptions = {"dataObject":dataObject,"queryParams":queryParams};
    objectService.fetch(serviceOptions, setDataMapCallBack,errorCallBack); 
  }
  catch(e){
    customErrorCallback(e);
  }
}
/**
* OnClick of Pins located on Map
*/
function onClickPin(mapid,response){
  gblSelectionPinData=[];
  //frmLocatorKA.locatorMap.navigateToLocation(response, true, true) ;
  gblSelectionPinData=response;
}
/**
* OnClick of PinsCallout.
*/
function onClickPinCallout(mapid,response){
  getDetailsData(response);
}

function onClickPinCalloutiPhone(){
  getDetailsData(gblSelectionPinData);
}
/**
* OnClick of Image in PinsCallout.
*/
function onClickImageCallout(){
  if(gblSelectionPinData){
  	settingDetailsData(gblSelectionPinData);
  }
}
/**
* OnClick of InfoButton in DetailsPage.
*/
function onClickInfoDetails(){
  try{
    var locationDataArray=[];
    locationDataArray.push(gblDirectionsData);
    if(gblRoute){
      frmDirectionsKA.locatorMap.removePolyline("route"+(gblRoute.length -1));
    } 
    frmLocatorKA.buttonInfo.skin = primaryAction;
    frmLocatorKA.getDirectionsButton.skin = sknDirectionButton;
    frmLocatorKA.locatorMap.locationData = locationDataArray;
    frmLocatorKA.locatorMap.navigateToLocation(gblDirectionsData, true, true);
    frmLocatorKA.flxLocationDetails.setVisibility(true);
    frmLocatorKA.flxLocationDirections.setVisibility(false); 
  }
  catch(e){
    kony.print("error"+e);
  }
}
/**
* OnClick of GetDirection in DetailsPage.
*/
function onClickgetDirections(){
//   frmLocatorKA.buttonInfo.skin = sknDirectionButton;
//   frmLocatorKA.btnDirection.skin = primaryAction;
//   frmLocatorKA.flxLocationDetails.setVisibility(false);
//   frmLocatorKA.flxLocationDirections.setVisibility(true); 
  displaySearchRoutes(gblRoute);
}
/**
* Gets distance and traveltime and routes.
*/
function getDirections(toLocationData,successCallback,ErrorCallback){
  ShowLoadingScreen();
  var searchCriteria;
  kony.print("gblPinClickDetails"+JSON.stringify(toLocationData));
  if (userAgent=="iPhone") 
  {
    searchCriteria = {
      //origin : {lat:41.695604, lon:  -73.098596},//for testing purpose USA lat & long
      origin : {lat:gblLatitude, lon: gbLlongitude},
      destination : {lat : toLocationData.lat,lon : toLocationData.lon},
      alternatives : false,

    };
  }
  else{
    searchCriteria = {
      origin : {lat:gblLatitude, lon: gbLlongitude},
      destination : {lat : toLocationData.lat,lon : toLocationData.lon},
      directionServiceUrl : "https://maps.googleapis.com/maps/api/directions/json",
      alternatives : false,
      apiKey : "AIzaSyAJOkl-7hJ08jbE5sBZs9Da9qrHP_XhXro"
    };                             
  }
  kony.map.searchRoutes(searchCriteria, successCallback, ErrorCallback); 
}

function onClickFilterCallback(){
  kony.print("successfully filtered");
  kony.application.dismissLoadingScreen();
}
/**
* Returns LocationImage PIn for a type provied like ATM,BRANCH & MainBranch.
*/

function getLocationImage(type){
  if(type == "ATM"){
    return "atm_icon_line.png";
  }
  else if(type == "BRANCH" || type == "MainBranch"){
    return "branch_icon_line.png";
  }
}
/**
* Returns Image PIn for a type provied like ATM,BRANCH & MainBranch.
*/
function getMapPinIcon(type){
  if(type == "ATM"){
    return "atm_icon_inactive.png";
  }
  else if(type == "BRANCH" || type == "MainBranch"){
    return "branch_icon_inactive.png";
  }
}
/**
* Returns Image for a Status provied like CLOSED & OPEN .
*/
function getStatusImage(type){
if(type == "CLOSED"){
    return "location_close.png";
  }
  else if(type == "OPEN"){
    return "location_open.png";
  }  
  
}
/**
* Returns Colour for a Status provied like CLOSED & OPEN .
*/
function getSknColorStatus(type){
  if(type == "CLOSED"){
    return "sknstatusClosed";
  }
  else if(type == "OPEN"){
    return "sknStatus";
  } 
}
/**
* Navigates to currentLocation.
*/
function gotoCurrentLocation(){
  if(gblLatitude && gbLlongitude){  
    frmLocatorKA.locatorMap.navigateToLocation({ lat: gblLatitude, 
					   lon: gbLlongitude,
					   image:"current_location.png",
					   showcallout: false
					   }, true, true);
   }
}
/**
* OnClick of Back Button in frmLocatorKA.
*/

function onBackforMaps(){
 // kony.application.getPreviousForm().show();
  if(gblFormName == "frmLoginKA"){ 
    if(kony.retailBanking.globalData.deviceInfo.isIphone())
      	removeSwipe();
    frmLoginKA.show();
  }
  else if(gblFormName == "frmMoreLandingKA" && userAgent=="iPhone" ){
    frmMoreLandingKA.show();
  }
}

/**
* OnClick of Back Button in details.
*/
function onBackBtnDetails(){
  try{
    if(gblRoute) frmLocatorKA.locatorMap.removePolyline("route"+(gblRoute.length -1));
    if(gblFilterType == "ATM"){
      getATMLocations();
    }
    else if(gblFilterType == "BRANCH"){
      getBranchLocations();
    }
    else if(gblFilterType == "BOTH"){
      getAllLocations();
    }
    else{
      getAllLocations();
    }
    frmLocatorKA.listView.setVisibility(true);
    frmLocatorKA.locatorDetailsWrapper.setVisibility(false);
  }
  catch(e){
     kony.print(e);
    customErrorCallback(e);
  }
}
function locatorListViewEnabledAnimate(){
  
    frmLocatorKA.locatorListView.isVisible = true;	
	frmLocatorKA.locatorMapView.animate(
		kony.ui.createAnimation({100:{ "opacity": 0, "stepConfig":{"timingFunction": easeOut}}}),
		{fillMode: forwards ,duration:0.3},
		{animationEnd: function() { 
			frmLocatorKA.locatorMapView.isVisible = false;
			frmLocatorKA.locatorListView.opacity = 1;
		} 
	});
  frmLocatorKA.btnMapKA.skin="sknandroidSegmentedTextInactive";
  	frmLocatorKA.btnListKA.skin="sknprimaryAction";
    frmLocatorKA.btnListKA.focusSkin="sknprimaryAction";
}

function locatorMapViewEnabled(){
	frmLocatorKA.locatorMapView.isVisible = true;	
	frmLocatorKA.locatorListView.animate(
		kony.ui.createAnimation({100:{ "opacity": 0,"stepConfig":{"timingFunction": easeOut}}}),
		{fillMode: forwards ,duration:0.3},
		{animationEnd: function() {
			frmLocatorKA.locatorListView.isVisible = false;
			frmLocatorKA.locatorMapView.opacity = 1;
		} 
	});  
	
	//frmLocatorKA.locatorToggleButton.text = "List";
    frmLocatorKA.btnMapKA.skin="sknprimaryAction";
    frmLocatorKA.btnMapKA.focusSkin="sknprimaryAction";
  	frmLocatorKA.btnListKA.skin="sknandroidSegmentedTextInactive";
}

function locatorLViewEnabled(){
    frmDirectionsKA.locatorListView.isVisible = true;
	
	frmDirectionsKA.locatorMapView.animate(
		kony.ui.createAnimation({100:{ "opacity": 0, "stepConfig":{"timingFunction": easeOut}}}),
		{fillMode: forwards ,duration:0.3},
		{animationEnd: function() { 
			frmDirectionsKA.locatorMapView.isVisible = false;
			frmDirectionsKA.locatorListView.opacity = 1;
		} 
	});
	
	//frmLocatorKA.locatorToggleButton.text = "Map";
  	frmDirectionsKA.btnMapKA.skin="sknandroidSegmentedTextInactive";
  	frmDirectionsKA.btnListKA.skin="sknprimaryAction";
}

function openEmail()
{
	try
	{
		var to=[frmLocatorBranchDetailsKA.lblEmailAddress.text];
		var cc=[];
		var bcc = [];
		var sub = "Email to Branch";
		var msgbody = " Type your Email";
		kony.phone.openEmail(to,cc,bcc,sub,msgbody,false,[]);		
	}
	catch(err)
	{
		alert(err);
	}
}