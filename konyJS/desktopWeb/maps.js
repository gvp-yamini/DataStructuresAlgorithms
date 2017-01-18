//Type your code here
var gblLatitude,gbLlongitude,gblCurrentLocator,gblIsCurrentLocation,gblLocationData,gblLocationDataATM,gblLocationDataBranch,gblSelectionPinData,gblDirectionsData;

function onClickLocateUS(isLoggedIn){
  ShowLoadingScreen();
  if(kony.retailBanking.globalData.session_token !=="")
  {
   frmLocationsSearchKA.flxMainMasterKA.setVisibility(true);
   frmLocationsSearchKA.FlexContainer0778e316253c14b.setVisibility(false);
   frmLocationsSearchKA.backToLoginKA.setVisibility(false);
  }else
  {
    frmLocationsSearchKA.FlexContainer0778e316253c14b.setVisibility(true);
    frmLocationsSearchKA.flxMainMasterKA.setVisibility(false);
	frmLocationsSearchKA.backToLoginKA.setVisibility(true);
  }

  var options = {"access":"online"};
  objectService = kony.sdk.getCurrentInstance().getObjectService("RBObjects",options);
  var dataObject = new kony.sdk.dto.DataObject("Locations");

  var queryParams = {"currLatitude":gblLatitude?gblLatitude:"","currLongitude":gbLlongitude?gbLlongitude:"","maxDistance":50};
  var serviceOptions = {"dataObject":dataObject,"queryParams":queryParams};
  objectService.fetch(serviceOptions, setDataMapCallBack,errorCallBack);

}
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

function androidgeoCallBack(response){
  if(response == true){
    frmLocationsSearchKA.locatorSearchTextField.text = null;
    setDataMapWithoutCurrentLoc();
  } 
  else{
    LocationSettings.open();
  }
}

function setDataMapCallBack(response){
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
    frmLocationsSearchKA.mapCurrentLocationWrapper.setVisibility(true);
  }else{
    frmLocationsSearchKA.mapCurrentLocationWrapper.setVisibility(false);
  }
  if(locationList && locationList.length === 0){ 		 
    bothLocationData = [];
    frmLocationsSearchKA.locatorMap.locationData=[];
    kony.ui.Alert("No ATM/Branches found in specified search criteria.",null,constants.ALERT_TYPE_INFO,"OK","","");
    if(frmLocationsSearchKA.locatorSearchTextField.text !== null && frmLocationsSearchKA.locatorSearchTextField.text !== ""){
      kony.application.dismissLoadingScreen();
    }
  }
  else if(locationList && locationList.length >0){
    settingMapListView(locationList) ;
  } 
}

function settingMapListView(locationList){

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
        imgNext:{"onTouchEnd":onClickImageCallout}
      },
      rightChevron1:{"src":"map_drilldown.png"},
      //distanceLabel:distanceListShow,
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
  settingData(gblLocationData,locationFormNavigation); 
}
function locationFormNavigation(){
  kony.application.dismissLoadingScreen();
  // frmLocationsSearchKA.noSearchResults.isVisible = false;
  frmLocationsSearchKA.locatorSegmentList.top = "0dp";
  frmLocationsSearchKA.locatorSegmentList.opacity = 1;
  frmLocationsSearchKA.show(); 
}
function settingData(data,callback){
  if(data && data.length >0){
    frmLocationsSearchKA.locatorMap.calloutTemplate=flxMapATMBranch0bec724f23ba344;
    frmLocationsSearchKA.locatorMap.widgetDataMapForCallout={
      lblName:"rbName",
      lblAddress:"rbDesc",
      lblDistance:"lblDistance",
      lblDistanceUnit:"lblDistanceUnit",
      lblStatus:"lblStatus",
      imgStatus:"imgStatus",
      imgNext:"imgNext",
    };
    frmLocationsSearchKA.locatorSegmentList.widgetDataMap={
      rightChevron1:"rightChevron1",
      informationListLabel: "name",
      //distanceLabel:"distanceLabel",
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
    frmLocationsSearchKA.locatorMap.calloutWidth=55;
    frmLocationsSearchKA.locatorMap.locationData=data;
    frmLocationsSearchKA.locatorSegmentList.setData(data);
    frmLocationsSearchKA.locatorSegmentList.setVisibility(true);
    //frmLocationsSearchKA.LabelNoRecordsKA.setVisibility(false);
    frmLocationsSearchKA.locatorSegmentList.onRowClick=onRowClickSegment;
    frmLocationsSearchKA.locatorMap.onSelection=onClickPinCallout;
    frmLocationsSearchKA.locatorMap.onPinClick=onClickPin;
    frmLocationsSearchKA.locatorMap.zoomLevel=15; 
  }
  else{
    frmLocationsSearchKA.locatorSegmentList.setVisibility(false);
    //frmLocationsSearchKA.LabelNoRecordsKA.setVisibility(true);
    frmLocationsSearchKA.locatorSegmentList.removeAll();
    frmLocationsSearchKA.locatorMap.locationData=[];
    gotoCurrentLocation();
  }
  callback();
}

function getATMLocations(){
  ShowLoadingScreen();
  settingData(gblLocationDataATM,onClickFilterCallback);
}

function getBranchLocations(){
  ShowLoadingScreen();
  settingData(gblLocationDataBranch,onClickFilterCallback);
}

function getAllLocations(){
  ShowLoadingScreen();
  settingData(gblLocationData,onClickFilterCallback);
}

function onRowClickSegment(){
  var listData=frmLocationsSearchKA.locatorSegmentList.selectedItems[0];
  settingDetailsData(listData);
}

function settingDetailsData(data){
  ShowLoadingScreen();
  gblDirectionsData = data;
  var segListOperationData=[];
  var segListServiceData=[];
  var serviceListValue=data.services.split("||");
  var workingHoursValue=data.workingHours.split("||");
  for(i=0; i<workingHoursValue.length;i++){
    segListOperationData.push({
      "lblOperationHrs": workingHoursValue[i].split(":")[0] + ":",
      "lblOperationHrsValue": workingHoursValue[i].split(":")[1]

    });
  }
  for(i=0; i<serviceListValue.length;i++){
    segListServiceData.push({      
      "lblServiceList":serviceListValue[i],
      "lblOperationHrsValue":serviceListValue[i]
    });
  }
  frmLocationsSearchKA.segOperationHours1.setData(segListOperationData);
  frmLocationsSearchKA.segSerivcesList.setData(segListServiceData);
  //frmLocationsSearchKA.branchTitleBar.text = data.name;
  frmLocationsSearchKA.address1.text=data.desc;
  frmLocationsSearchKA.address2.text=data.city + "-"+ data.zipCode; 
  /* frmLocationsSearchKA.phoneContainer.setVisibility(true);
  if(data.type=="ATM"){
    frmLocationsSearchKA.phoneContainer.setVisibility(false);
  }*/
  if(gblIsCurrentLocation == true){
    frmLocationsSearchKA.btnDirection.onClick=getDirections;
    frmLocationsSearchKA.btnDirection.setEnabled(true);
    /*if(gblPinClickDetails.distanceLabel=="")
      frmLocationsSearchKA.distance.text="Distance Unknown";
    else
      frmLocationsSearchKA.distance.text=data.distanceLabel;*/
  }
  else{
    // frmLocationsSearchKA.distance.text="Distance Unknown";
    frmLocationsSearchKA.btnDirection.setEnabled(false); 
  }
  onClickInfoDetails();
  frmLocationsSearchKA.locatorDetailsWrapper.setVisibility(true);
  kony.application.dismissLoadingScreen();
  frmLocationsSearchKA.list.setVisibility(false);
  frmLocationsSearchKA.flxSearchContainerKA.setVisibility(false);
  frmLocationsSearchKA.BacktoSearch.setVisibility(true);
}
function onClickFilterCallback(){
  kony.print("successfully filtered");
  kony.application.dismissLoadingScreen();
}
function getLocationImage(type){
  if(type == "ATM"){
    return "atm_icon_line.png";
  }
  else if(type == "BRANCH" || type == "MainBranch"){
    return "branch_icon_line.png";
  }
}
function getMapPinIcon(type){
  if(type == "ATM"){
    return "atm_icon_inactive.png";
  }
  else if(type == "BRANCH" || type == "MainBranch"){
    return "branch_icon_inactive.png";
  }
}

function getStatusImage(type){
  if(type == "CLOSED"){
    return "location_close.png";
  }
  else if(type == "OPEN"){
    return "location_open.png";
  }  

}

function getSknColorStatus(type){
  if(type == "CLOSED"){
    return "sknstatusClosed";
  }
  else if(type == "OPEN"){
    return "sknstatus";
  } 
}

function gotoCurrentLocation(){
  if(gblLatitude && gbLlongitude){  
    frmLocationsSearchKA.locatorMap.navigateToLocation({ lat: gblLatitude, 
                                                        lon: gbLlongitude,
                                                        image:"current_location.png",
                                                        showcallout: false
                                                       }, true, true);
  }
}

function onBackforMaps(){
  kony.application.getPreviousForm().show();
}

function onBackBtnDetails(){
  frmLocationsSearchKA.list.setVisibility(true);
  frmLocationsSearchKA.locatorDetailsWrapper.setVisibility(false);
}
function setDataMapWithoutCurrentLoc(){
  ShowLoadingScreen();
  kony.print("setDataMapWithoutLoc");
  var options = {"access":"online"};
  objectService = kony.sdk.getCurrentInstance().getObjectService("RBObjects",options);
  var dataObject = new kony.sdk.dto.DataObject("Locations");

  var queryParams = {"city":"New York"};
  var serviceOptions = {"dataObject":dataObject,"queryParams":queryParams};
  objectService.fetch(serviceOptions, setDataMapCallBack,errorCallBack);  
}

function onClickPin(mapid,response){
  gblSelectionPinData=[];
  frmLocationsSearchKA.locatorMap.navigateToLocation(response, true, true) ;
  gblSelectionPinData=response;
}

function onClickPinCallout(mapid,response){
  settingDetailsData(response);
}

function onClickImageCallout(){
  if(gblSelectionPinData){
    settingDetailsData(gblSelectionPinData);
  }
}

function onClickInfoDetails(){
  try{
    var locationDataArray=[];
    locationDataArray.push(gblDirectionsData);
   /*  if(gblRoute){
      frmLocationsSearchKA.locatorMap.removePolyline("route"+(gblRoute.length -1));
    }  */
    frmLocationsSearchKA.locatorMap.locationData = locationDataArray;
    frmLocationsSearchKA.locatorMap.navigateToLocation(gblDirectionsData, false, true);
   // frmLocationsSearchKA.flxLocationDetails.setVisibility(true);
   // frmLocatorKA.flxLocationDirections.setVisibility(false); 
  }
  catch(e){
    kony.print("error"+e);
  }
}
function getDirections(){
  ShowLoadingScreen();
  var searchCriteria
  kony.print("gblPinClickDetails"+JSON.stringify(gblDirectionsData));
  if (userAgent=="iPad") 
  {
    searchCriteria = {
      origin : {lat:gblLatitude, lon: gbLlongitude},
      destination : {lat : gblDirectionsData.lat,lon : gblDirectionsData.lon},
      alternatives : false,

    };
  }
  else{
    searchCriteria = {
      origin : {lat:gblLatitude, lon: gbLlongitude},
      destination : {lat : gblDirectionsData.lat,lon : gblDirectionsData.lon},
      directionServiceUrl : "https://maps.googleapis.com/maps/api/directions/json",
      alternatives : false,
      apiKey : "AIzaSyAJOkl-7hJ08jbE5sBZs9Da9qrHP_XhXro"
    };                             
  }
  kony.map.searchRoutes(searchCriteria, searchRouteSuccessCallback, errorRouteSuccessCallback); 
}

function searchRouteSuccessCallback(routes)
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

function errorRouteSuccessCallback(code,emsg){  
  kony.print("code"+ code+ "message" +emsg );
}

function onMapSelectionType(){
  var selectedKey = frmLocationsSearchKA.rbgMapSelectionType.selectedKey;
  if(selectedKey === "ATM"){
    getATMLocations();
  }
  else if(selectedKey === "Branch"){
    getBranchLocations();
  }
  else if(selectedKey === "Both"){
    getAllLocations();
  }
}

function clickBackToSearch()
{
  frmLocationsSearchKA.flxSearchContainerKA.setVisibility(true);
  frmLocationsSearchKA.BacktoSearch.setVisibility(false);
  onBackBtnDetails();
}


/**
* Search TextBox on Done functionality.
*/
function startSearchOnDone(){
  if(frmLocationsSearchKA.locatorSearchTextField.text !== null){
    frmLocationsSearchKA.rbgMapSelectionType.selectedKey = "Both";
    setDataMaponSearch(frmLocationsSearchKA.locatorSearchTextField.text.trim());
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


