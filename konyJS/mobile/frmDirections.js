
function onClickBackButton(){
  	var previousForm=kony.application.getPreviousForm();
  	if(previousForm.id==="frmLocatorATMDetailsKA"){
      	frmLocatorATMDetailsKA.show();
    }else if(previousForm.id==="frmLocatorBranchDetailsKA"){
      frmLocatorBranchDetailsKA.show();
    }else{
      frmLocatorBranchDetailsKA.show();
    }
}


//  frmDirectionsKA preShow
function directionPreShow(){ 
  	var userAgent=kony.os.userAgent();
    if (userAgent !== "iPhone" ) {
           frmDirectionsKA.btnBackKA.skin="sknandroidBackButton";
           frmDirectionsKA.btnBackKA.focusSkin="sknandroidBackButtonFocus";
    }else{
      	   frmDirectionsKA.btnBackKA.skin="sknleftBackButtonNormal";
      	   frmDirectionsKA.btnBackKA.focusSkin="sknleftBackButtonFocus";	
    }
  frmDirectionsKA.locatorListView.opacity = 0;
	kony.print("preshow");
}

// frmDirectionsKA postShow
function directionPostShow(){ 
	//frmDirectionsKA.searchFocus.isVisible = false;
	
	// rotates "carrot" for callout template example
	var rotateCarrot = kony.ui.makeAffineTransform();
	rotateCarrot.rotate(45);
	frmDirectionsKA.calloutCarrot.animate(
		kony.ui.createAnimation({"100":{"transform": rotateCarrot,"stepConfig":{"timingFunction": easeIn}}}),
		{"fillMode": forwards, "duration": 0},
		{"animationEnd": function () {}}
		);
	
		// moves current location FAB to left for Android due to built in Zoom button placement
		if (userAgent !== "iPhone" || userAgent !== "iPad") {
			frmDirectionsKA.mapCurrentLocationWrapper.left = "5%";
		}


 
	}

// frmDirectionsKA onHide
function directionHide() {
	locatorMViewEnabled();
	//frmDirectionsKA.locatorSearchTextField.text = null;
	
		// android fallback due to animation not being called by
		// onHide action
		if (userAgent !== "iPhone" || userAgent !== "iPad") {
			frmDirectionsKA.locatorMapView.opacity = 1;
		}
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

function locatorMViewEnabled(){
	frmDirectionsKA.locatorMapView.isVisible = true;
	
	frmDirectionsKA.locatorListView.animate(
		kony.ui.createAnimation({100:{ "opacity": 0,"stepConfig":{"timingFunction": easeOut}}}),
		{fillMode: forwards ,duration:0.3},
		{animationEnd: function() {
			frmDirectionsKA.locatorListView.isVisible = false;
			frmDirectionsKA.locatorMapView.opacity = 1;
		} 
	});  
	
	//frmLocatorKA.locatorToggleButton.text = "List";
    frmDirectionsKA.btnMapKA.skin="sknprimaryAction";
  	frmDirectionsKA.btnListKA.skin="sknandroidSegmentedTextInactive";
}

