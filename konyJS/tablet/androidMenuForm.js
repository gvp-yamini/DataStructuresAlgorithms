
function androidMenuPreShow(){
  setRightContainer();
  onOrientationChange(androidMenu);
}

// onClick action for hamburger icons on Android
function activeAndroidNav() {
    CurrForm  = kony.application.getCurrentForm();

    CurrForm.add(androidMenu.navigationWrapper);

  	CurrForm.navigationDrawer.left = "-85%";
  	CurrForm.navigationDrawerBkg.isVisible = false;
    CurrForm.navigationDrawerBkg.opacity = 0;
  	animateAndroidNav();
}

// Show Android Nav
function animateAndroidNav(){
  CurrForm.navigationDrawer.animate(
        kony.ui.createAnimation({"100":{"left": "0%","stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": duration/1.3, "delay": 0.3},
        {"animationEnd": function () {}}
    );
  	CurrForm.navigationDrawerBkg.isVisible = true;
    CurrForm.navigationDrawerBkg.animate(
        kony.ui.createAnimation({"100":{"opacity": 1,"stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": duration},
        {"animationEnd": function () {}}
    );
}

// Close Android Nav and remove it from the form
function closeAndroidNav(){
  if (CurrForm.navigationWrapper){
    CurrForm.navigationDrawer.animate(
          kony.ui.createAnimation({"100":{"left": "-85%","stepConfig":{"timingFunction": easeIn}}}),
          {"fillMode": forwards, "duration": duration/1.3},
          {"animationEnd": function () {}}
      );

      CurrForm.navigationDrawerBkg.animate(
          kony.ui.createAnimation({"100":{"opacity": 0,"stepConfig":{"timingFunction": easeIn}}}),
          {"fillMode": forwards, "duration": duration},
          {"animationEnd": function () {
               CurrForm.navigationDrawerBkg.isVisible = false;
               CurrForm.remove(CurrForm.navigationWrapper);
              }
          }
      );
  }
}

function androidPrimaryNavigationClick(){
   //closeAndroidNav();
  
  var selectedRow = androidMenu.androidPrimaryNavigation.selectedRowIndex[1];

  switch(selectedRow){
      case 0:
      		accountLanding();
        	break;
      case 1:
     	    rightContainer = "rightWrapper";
			//transferPayLanding.destroy();
    		//transferPayLanding.show();
            getTransferPayLandingForm("frmTransferPayLandingKA");
        	break;
      case 2:
    	gotoDeposits();
      	//	firstTimeVisitTabletDepositForm();
			      		
        	break;
	  case 3:
			    showMessages();
      		break;
      case 4:
           showSettings();
      		break;
      case 5:
		  showResources();
          break;
      default:
        	androidMenu.show();
    }
}



function showSettings()
{
  		clearRightContainerSettings();
         frmUserSettingsKA.show();
}

function showResources()
{
		  rightContainer="rightWrapper";
          clearRightContainerResources();
		  moreLanding.moreResourcesSegment.retainSelection = false;
          moreLanding.show();
}

function androidSecondaryNavigationClick(){
  closeAndroidNav();
  
  var selectedRow = androidMenu.androidSecondaryNavigation.selectedRowIndex[1];

  switch(selectedRow){
      case 0:
        	locator.show();
        	break;
      case 1:
    		contactUs.show();
        	break;
      case 2:
    		moreLanding.show();
        	break;
      case 3:
            userSettings.show();
            break;
      default:
        	androidMenu.show();
    }
}

function accountLanding(){
  			rightContainer = "rightWrapper";
      		var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
           var controller = INSTANCE.getFormController("accountsLanding");
           var navObject = new kony.sdk.mvvm.NavigationObject();
         	navObject.setRequestOptions("segAccountInfoData",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
           controller.loadDataAndShowForm(navObject);
}