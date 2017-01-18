////////////////////////////
// Account Detail Form
////////////////////////////

function accountDetailPreShow(){
  userAgent = kony.os.userAgent();
  // Alterations to Android layout due to lack of scrolling events
  if (userAgent !== "iPhone"){
    frmAccountDetailKA.accountBalanceOverview.top = "70dp";
  
  }
}

// Called on yourAccount[x] buttons on accountLanding form
// Passes sample data and color information to frmAccountDetailKA form and displays it



function hideAccountDetails(){
    gblfrmName = "Account Overview";
  	var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmAccountsLandingKA");
    var navObject = new kony.sdk.mvvm.NavigationObject();
  	navObject.setRequestOptions("segAccountsKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
    controller.loadDataAndShowForm(navObject);
}

// Called on frmAccountDetailKA.accountDetailsScrollContainer onScrolling action
function accountDetailsScroll(){
  if (userAgent === "iPhone"){
  	var outerScrollY = frmAccountDetailKA.accountDetailsScrollContainer.contentOffsetMeasured.y;
  	var outerScrollYAbs=Math.abs(outerScrollY);
  
  	// Display accountLabelScroll element
  	if (outerScrollY > 115){
    	frmAccountDetailKA.accountLabelScroll.isVisible = true;
      	frmAccountDetailKA.resourcesLabel.isVisible=false;
    } else if (outerScrollY > 0 && outerScrollY < 115) {
          frmAccountDetailKA.accountLabelScroll.isVisible = false;
      frmAccountDetailKA.resourcesLabel.isVisible=true;
    }

    // If user scrolls upwards
    if (outerScrollY > 0 && outerScrollY < 80){
      frmAccountDetailKA.accountBalanceOverview.top = (95-(outerScrollYAbs*0.3125) + "dp");
      frmAccountDetailKA.accountInfoButton.opacity = (1-(outerScrollYAbs*0.006));
      frmAccountDetailKA.accountInfoButton.bottom = (10+(outerScrollYAbs*0.05) + "%");
    }
  	
  	if (outerScrollY > 80) {
      frmAccountDetailKA.accountBalanceOverview.top = "70dp";
    }
  
  	if (outerScrollY === 0){
      frmAccountDetailKA.accountInfoButton.bottom = "10%";
      frmAccountDetailKA.accountBalanceOverview.opacity = 1;
      frmAccountDetailKA.accountInfoButton.opacity = 1;
    }

    // if user scrolls downwards  
    if (outerScrollY < 0){
      	frmAccountDetailKA.accountDetailsHeader.top = (15 + (outerScrollYAbs*0.3) + "dp");
      	frmAccountDetailKA.accountDetailsTime.top = (37 + (outerScrollYAbs*0.3) + "dp");
      	frmAccountDetailKA.accountBalanceOverview.top = (95+(outerScrollYAbs*0.4) + "dp");
      	frmAccountDetailKA.accountInfoButton.bottom = (10+(outerScrollYAbs*0.05) + "%");
      	frmAccountDetailKA.gradientOverlay.bottom = (0-(outerScrollYAbs*1) + "dp");
 	}
  }
}
