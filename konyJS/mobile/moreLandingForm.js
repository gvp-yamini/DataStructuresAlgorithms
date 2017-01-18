var greetingName = "John";

// frmMoreLandingKA becomes "Resources" on android
function moreLandingInit(){
  	userAgent = kony.os.userAgent();
    if (userAgent !== "iPhone"){
      	frmMoreLandingKA.bottomContainer.top = "0dp";
      	frmMoreLandingKA.moreScrollContainer.top = "50dp";
      frmMoreLandingKA.moreResourcesSegment.top= "0%";
    }
}

// moreLandingPreShow - sets user greeting text
function moreLandingPreShow() {
  deviceRegFrom = "moreLanding";
   if (userAgent === "iPhone"){
  		//frmMoreLandingKA.greetingName.text = "Hi, " + greetingName;
  		//frmMoreLandingKA.moreLandingTitle.text = "Hi, " + greetingName;
  }
   userAgent = kony.os.userAgent();
}

// Segment Row Actions for frmMoreLandingKA Form
function moreResourcesSegmentClick(){
	var selectedRow = frmMoreLandingKA.moreResourcesSegment.selectedRowIndex[1];
    if(ColumnChart){
    frmMyMoneyListKA.flxSpendingOverviewKAinner.remove(ColumnChart);
    ColumnChart = "";
  }
  		//alert("SegmentedUI selectedRowIndex ::"+frmMoreLandingKA.moreResourcesSegment.selectedRowIndex[1]); 
  	switch(selectedRow){
      case 0:
        	 var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
			 var controller = INSTANCE.getFormController("frmManageCardsKA");
			 var navigationObject = new kony.sdk.mvvm.NavigationObject();
			 navigationObject.setRequestOptions("segCardsKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
			 controller.performAction("navigateTo",["frmManageCardsKA",navigationObject]);
				break;
      case 1:
          from = "MyMoney";
             kony.retailBanking.fromAppMenu = true;
             kony.retailBanking.columnChartGenereted = false;
             showFormMyMoneyAccountsList();
//         var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
// var listController = INSTANCE.getFormController("frmMyMoneyListKA");
// var navObject = new kony.sdk.mvvm.NavigationObject();
// navObject.setRequestOptions("segAccountsKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
// listController.performAction("navigateTo",["frmMyMoneyListKA",navObject]); 
             //frmMyMoneyListKA.show();
        	break;
      case 2:
            //frmPickAProductKA.show();
			navigateToPickAProduct();
        	break;
      case 3:
        	//frmManagePayeeKA.show();
            showFormManagePayeeList();
    		break;
      case 4:
            //frmMoreFaqKA.show();
        	onClickFaqs();
    		break;
      case 5:
        	//frmMorePrivacyPolicyKA.show();
        	onClickPrivacyPolicy();
    		break;
      case 6:
        	//frmMoreTermsAndConditionsKA.show();
        	onClickTandC();
    		break;
      case 7:
        //	frmMoreForeignExchangeRatesKA.show();
			onClickForeinExchangeRates();
    		break;
      case 8:
       		//frmMoreInterestRatesKA.show();
        	onClickInterestRates();
        	break;
      case 9:
       		navigateToCheckReOrder();
          break;
      default:
        	frmMoreLandingKA.show();
    }
}

// Called on frmMoreLandingKA.moreScrollContainer onScrolling action
function moreScroll(){
  if (userAgent === "iPhone"){
  	var outerScrollY = frmMoreLandingKA.moreScrollContainer.contentOffsetMeasured.y;
  	var outerScrollYAbs=Math.abs(outerScrollY);
  	
  	// Display accountLabelScroll element
  	if (outerScrollY > 200){
    	frmMoreLandingKA.accountLabelScroll.isVisible = true;
    } else if (outerScrollY > 0 && outerScrollY < 200) {
          frmMoreLandingKA.accountLabelScroll.isVisible = false;
    }
	
    // If user scrolls upwards
    if (outerScrollY > 0){
       	frmMoreLandingKA.topContainer.opacity= (1-(outerScrollYAbs*0.006));
       	frmMoreLandingKA.topContainer.top=(0+(outerScrollYAbs*0.7)); 
    }
    // Move moreLandingTitle into view
    if (outerScrollY > 20 && outerScrollY < 135){
      	frmMoreLandingKA.moreLandingTitle.top = (55-(outerScrollYAbs*0.3));
    }

    // Stick moreLandingTitle top to 15dp
    if (outerScrollY > 136){
      	frmMoreLandingKA.moreLandingTitle.top = "15dp";
    }

    // if user scrolls downwards  
    if (outerScrollY < 0){
     	frmMoreLandingKA.topContainer.opacity=(1+(outerScrollYAbs*0.02));
     	frmMoreLandingKA.topContainer.top=(0-(outerScrollYAbs*0.5));

    	 // Fallback to animate moreLandingTitle to default
    	 hideMoreLandingTitle();
 	}
  }
}

// Fallback animation for moreLandingTitle called in moreScroll()
function hideMoreLandingTitle(){
	frmMoreLandingKA.moreLandingTitle.animate(
        kony.ui.createAnimation({"100":{ "top": "55dp",
                  "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": 0.2},
        {"animationEnd": function () {}}
    );
}