var segmentListData = []; // holds full data of segment
var bothLocationData = []; // holds full data of map
var filterType = "Both";
var userAgent;
gblATMBranchDetails = false;

// frmLocatorKA init
function locatorInit(){ 
	userAgent = kony.os.deviceInfo().name;
}

function onClickLocatoriPhoneBackBtn(){
  kony.print("onClickLocatoriPhoneBackBtn"+ deviceRegFrom);
   if((deviceRegFrom !== "preLogin")) {
      	frmMoreLandingKA.show();
    }else{
      	frmLoginKA.show();
    }
}

function onClickLocatorHamBackButton(){
	if(deviceRegFrom !=="preLogin") {
      	activeAndroidNav();
    }else{
      	frmLoginKA.show();
    }
      	
}
// frmLocatorKA preShow
function locatorPreShow(){  
  distanceinMiles=[];
 kony.print("gblATMBranchDetails"+ gblATMBranchDetails);
   kony.print("locatorPreShow bothLocationData"+ bothLocationData.length+ " "+JSON.stringify(bothLocationData));
	
  
  if(gblATMBranchDetails != true){
   kony.print("going into"+ gblATMBranchDetails );
   bothLocationData = [];
   filterType="Both";
   frmLocatorKA.btnBothKA.skin = "sknaccountFilterButtonEnable";
   frmLocatorKA.btnATMKA.skin = "sknaccountFilterButtonDisabled";
   frmLocatorKA.btnBranchKA.skin = "sknaccountFilterButtonDisabled";
   frmLocatorKA.locatorListView.opacity = 0;
    locatorMapViewEnabled();
  }
  
  else{
     locatorToggle(); 
     gblATMBranchDetails=false;
  }
  

  	var userType = kony.os.userAgent();
  //  frmLocatorKA.locatorListView.opacity = 0;
	frmLocatorKA.mapCalloutExample.opacity = 0;
	frmLocatorKA.noSearchResults.isVisible = false; 
    frmLocatorKA.locatorMap.dismissCallout();
 
  if (userType !== "iPhone" ){
      if(deviceRegFrom !=="preLogin") {
          frmLocatorKA.hamburgerButton.skin="sknhamburgerButton";
          frmLocatorKA.hamburgerButton.focusSkin="sknhamburgerButtonFocus";
      }else{
          frmLocatorKA.hamburgerButton.skin="sknandroidBackButton";
          frmLocatorKA.hamburgerButton.focusSkin="sknandroidBackButtonFocus";
      }
  }else{
      frmLocatorKA.backButton.skin="sknleftBackButtonNormal";
      frmLocatorKA.backButton.focusSkin="sknleftBackButtonFocus";
  }
    
	kony.print("preshow");
}

function startSearchOnDone(){
  kony.print("frmLocatorKA.locatorSearchTextField.text" + frmLocatorKA.locatorSearchTextField.text);
 
  if(frmLocatorKA.locatorSearchTextField.text !=null && frmLocatorKA.locatorSearchTextField.text !=""){
    kony.print("startSearchOnDone with Text");
    setDataMaponSearch();
  }
  
  
//  onBothSelected();
   frmLocatorKA.btnBothKA.skin = "sknaccountFilterButtonEnable";
   frmLocatorKA.btnATMKA.skin = "sknaccountFilterButtonDisabled";
   frmLocatorKA.btnBranchKA.skin = "sknaccountFilterButtonDisabled";
  locatorMapViewEnabled();
}

// frmLocatorKA postShow
function locatorPostShow(){ 
	frmLocatorKA.searchFocus.isVisible = false;
	// rotates "carrot" for callout template example
	var rotateCarrot = kony.ui.makeAffineTransform();
	rotateCarrot.rotate(45);
	frmLocatorKA.calloutCarrot.animate(
		kony.ui.createAnimation({"100":{"transform": rotateCarrot,"stepConfig":{"timingFunction": easeIn}}}),
		{"fillMode": forwards, "duration": 0},
		{"animationEnd": function () {}}
		);
	
		// moves current location FAB to left for Android due to built in Zoom button placement
		
	    frmLocatorKA.mapCurrentLocationWrapper.right = "5%";
		
		kony.print("post show: before assigning bothLocationData"+ bothLocationData.length+ " "+JSON.stringify(bothLocationData));
        kony.print("mapData Post show"+ frmLocatorKA.locatorMap.locationData);
		// in case of form loading from backstack, arrays contain data already
		// so don't override it
		if(bothLocationData.length == 0){
          kony.print("assigning to bothMasterData and bothLocationData");
          if(frmLocatorKA.locatorMap.locationData==""){
            kony.print("assigning to bothMasterData and bothLocationData with no records");
            bothLocationData=[];
          }else
			bothLocationData = frmLocatorKA.locatorMap.locationData;
		}
		
		kony.print("post show: bothLocationData"+ bothLocationData.length+ " "+JSON.stringify(bothLocationData));
	}

// frmLocatorKA onHide
function locatorHide() {
  kony.print("locatorHide");
	//locatorMapViewEnabled();
    //  locatorToggle();
//	frmLocatorKA.locatorSearchTextField.text = null;
	
		// android fallback due to animation not being called by
		// onHide action
		if (userAgent !== "iPhone" || userAgent !== "iPad") {
			frmLocatorKA.locatorMapView.opacity = 1;
		}
 
	}


// Select "Allow" on alert modal
function userAllowedLocation(){
	frmLocatorKA.noSearchResults.isVisible = false;
	frmLocatorKA.locatorSegmentList.top = "0dp";
	frmLocatorKA.locatorSegmentList.opacity = 1;
}


// frmLocatorKA frmSearchKA
//////////////////
function userStartsSearch(){
  frmLocatorKA.searchFocus.isVisible = true;
  kony.print("userStartsSearch");
	frmLocatorKA.searchFocus.animate(
		kony.ui.createAnimation({"100":{"opacity": 1,"stepConfig":{"timingFunction": easeIn}}}),
		{"fillMode": forwards, "duration": duration},
		{"animationEnd": function () {}}
		);
	frmLocatorKA.noSearchResults.animate(
		kony.ui.createAnimation({"100":{"opacity": 0,"stepConfig":{"timingFunction": easeIn}}}),
		{"fillMode": forwards, "duration": duration},
		{"animationEnd": function () {}}
		); 
	if (userAgent === "iPhone" || userAgent === "iPad") {
		onBeginEditing(frmLocatorKA);
	}
}



function userEnteredLocationTerm(){
  kony.print("userEnteredLocationTerm");
	frmLocatorKA.searchFocus.animate(
		kony.ui.createAnimation({"100":{"opacity": 0,"stepConfig":{"timingFunction": easeIn}}}),
		{"fillMode": forwards, "duration": duration},
		{"animationEnd": function () {}}
		); 
	frmLocatorKA.locatorSegmentList.animate(
		kony.ui.createAnimation({"100":{"top": 0, "opacity": 1, "stepConfig":{"timingFunction": easeIn}}}),
		{"fillMode": forwards, "duration": duration, "delay": 0.15},
		{"animationEnd": function () {}}
		);
	if (userAgent === "iPhone" || userAgent === "iPad") {
		onEndEditing(frmLocatorKA);
	}
}


//map callout example

function showMapCallout(){
	// closeCalloutButton is full screen overlay to disinvoke mapCallout
	// frmLocatorKA.closeCalloutButton.isVisible = true;
	// frmLocatorKA.mapCalloutExample.animate(
	// 	kony.ui.createAnimation({"100":{"opacity": 1,"stepConfig":{"timingFunction": easeIn}}}),
	// 	{"fillMode": forwards, "duration": duration},
	// 	{"animationEnd": function () {}}
	// 	); 
}

function hideMapCallout(){
	frmLocatorKA.closeCalloutButton.isVisible = false;
	frmLocatorKA.mapCalloutExample.animate(
		kony.ui.createAnimation({"100":{"opacity": 0,"stepConfig":{"timingFunction": easeIn}}}),
		{"fillMode": forwards, "duration": duration},
		{"animationEnd": function () {}}
		); 
}


// frmLocatorKA map/list toggle
function locatorToggle(){
  kony.print("locatorToggle"+ frmLocatorKA.locatorListView.opacity );
	if (frmLocatorKA.locatorListView.opacity === 1){
		//locatorListViewEnabled();commented to avoid distance calculation on back of details page
        locatorListViewEnabledAnimate();
	} else{
		locatorMapViewEnabled();
	}
}


function locatorListViewEnabled(){
   
    frmLocatorKA.btnMapKA.skin="sknandroidSegmentedTextInactive";
  	frmLocatorKA.btnListKA.skin="sknprimaryAction";
    frmLocatorKA.btnListKA.focusSkin="sknprimaryAction";
	// changed locationListItem to locationList
    if(locationList.length>0 && gblIsCurrentLocation == true){
      ShowLoadingScreen();
      getDistanceBWLocations(count); 
    }
    else{
      setListData();
      locatorListViewEnabledAnimate();
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

function onLocatorSegmentedControllerSelected(){
	var selectedKey = frmLocatorKA.locatorSegmentedController.selectedKey;
	var data;
	switch(selectedKey){
		case 'atm': data = getFilteredData(bothMasterData, "ATM", "List");
					frmLocatorKA.locatorSegmentList.setData(data);
					frmLocatorKA.locatorMap.locationData = getFilteredData(bothLocationData, "ATM", "Map");
					break;
		case 'branch': data = getFilteredData(bothMasterData, "Branch", "List");
					   frmLocatorKA.locatorSegmentList.setData(data);
					   frmLocatorKA.locatorMap.locationData = getFilteredData(bothLocationData, "Branch", "Map");
					   break;
		case 'both': frmLocatorKA.locatorSegmentList.setData(bothMasterData);
					 frmLocatorKA.locatorMap.locationData = bothLocationData;
					 break;
	}
}

function onBothSelected(){
  filterType="Both";
    kony.print("onBothSelected bothMasterData "+ segmentListData.length+ " "+   JSON.stringify(segmentListData));
    kony.print("onBothSelected bothLocationData"+ bothLocationData.length+ " "+JSON.stringify(bothLocationData));
//	frmLocatorKA.flxSelectedIndicatorKA.left = "33.33%";
	frmLocatorKA.btnBothKA.skin = "sknaccountFilterButtonEnable";//sknandroidSegmentedTextActive;
	frmLocatorKA.btnATMKA.skin = "sknaccountFilterButtonDisabled";//sknandroidSegmentedTextInactive;
	frmLocatorKA.btnBranchKA.skin = "sknaccountFilterButtonDisabled";
    
    if(segmentListData.length >0){		 
	frmLocatorKA.locatorSegmentList.setVisibility(true);
    frmLocatorKA.LabelNoRecordsKA.setVisibility(false);
    frmLocatorKA.locatorSegmentList.setData(segmentListData);
    }else{
    frmLocatorKA.locatorSegmentList.setVisibility(false);
    frmLocatorKA.LabelNoRecordsKA.setVisibility(true);   
    } 
    
	
	frmLocatorKA.locatorMap.locationData = bothLocationData;
}

function onATMSelected(){
   filterType="ATM";
    kony.print("onATMSelected bothMasterData "+ segmentListData.length+ " "+   JSON.stringify(segmentListData));
    kony.print("onATMSelected bothLocationData"+ bothLocationData.length+ " "+JSON.stringify(bothLocationData));
//	frmLocatorKA.flxSelectedIndicatorKA.left = "0%";
	frmLocatorKA.btnBothKA.skin = "sknaccountFilterButtonDisabled";
	frmLocatorKA.btnATMKA.skin = "sknaccountFilterButtonEnable";
	frmLocatorKA.btnBranchKA.skin = "sknaccountFilterButtonDisabled";
    if(segmentListData.length >0){
    var data = getFilteredData(segmentListData, "ATM", "List");
      kony.print("onATMSelecteddata"+ JSON.stringify(data));
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
   else{
   frmLocatorKA.locatorSegmentList.setVisibility(false);
   frmLocatorKA.LabelNoRecordsKA.setVisibility(true);  
    
  }
	
  
    
    
	frmLocatorKA.locatorMap.locationData = getFilteredData(bothLocationData, "ATM", "Map");
}

function onBranchSelected(){
    filterType="Branch";
    kony.print("onBranchSelected bothMasterData "+ segmentListData.length+ " "+   JSON.stringify(segmentListData));
	kony.print("onBranchSelected bothLocationData"+ bothLocationData.length+ " "+JSON.stringify(bothLocationData));
//	frmLocatorKA.flxSelectedIndicatorKA.left = "66.66%";
	frmLocatorKA.btnBothKA.skin = "sknaccountFilterButtonDisabled";
	frmLocatorKA.btnATMKA.skin = "sknaccountFilterButtonDisabled";
	frmLocatorKA.btnBranchKA.skin = "sknaccountFilterButtonEnable";
    if(segmentListData.length >0){
    var data = getFilteredData(segmentListData, "Branch", "List");
      kony.print("onBranchSelecteddata"+JSON.stringify(data));
        if(data.length>0){
	frmLocatorKA.locatorSegmentList.setVisibility(true);
    frmLocatorKA.LabelNoRecordsKA.setVisibility(false);
    frmLocatorKA.locatorSegmentList.removeAll();
    frmLocatorKA.locatorSegmentList.setData(data);
       }else{
    frmLocatorKA.locatorSegmentList.setVisibility(false);
    frmLocatorKA.LabelNoRecordsKA.setVisibility(true);   
            } 
   }else{
   frmLocatorKA.locatorSegmentList.setVisibility(false);
   frmLocatorKA.LabelNoRecordsKA.setVisibility(true);  
    
  } 
	
   
    
	frmLocatorKA.locatorMap.locationData = getFilteredData(bothLocationData, "Branch", "Map");
}

// "clickType" refers to list or map 
//section refers to ATM/Branch/Both
function getFilteredData(existingData, section, clickType){
	var data = [];
	kony.print("existingData "+existingData.length+ JSON.stringify(existingData));
	kony.print("section "+section);
	kony.print("clickType "+clickType);
	existingData.forEach(function(item){
		var name = "";
      
		if(clickType == "List"){
			//name = item.informationListLabel.text != undefined ? item.informationListLabel.text : item.informationListLabel;
          name = String(item.type);
		} else {
			//name = item.name;
           name = String(item.type);
		}
		
		if(section == "ATM"){
			if(name.indexOf(section) > -1){
           
				data.push(item);
			}				
		}
		else{
			if(name.indexOf("ATM") == -1){
				data.push(item);
			}
		}
	});

	kony.print("data is "+data.length+JSON.stringify(data));

	return data;
}