var swipeShow = -70;
var swipeHide = 40;

var insightsShown = "440dp";
var insightsDefault = "136dp";

var incomeCashFlowWidth = "80%";
var spendingCashFlowWidth = "50%";


/// preShow
function getTimeOfTheDay()
{
  var d = new Date();
  var n = d.getHours();
  if(n>0 && n<=12)
  return  i18n_goodMorning;
  else if(n>12 && n<=16)
  return i18n_goodAfternoon;
  else
  return i18n_goodEvening;
}
function accountsLandingPreShow(){
	kony.store.setItem("firstTimeLogin","firstTimefinished");
    var usrObj = kony.retailBanking.globalData.globals.userObj;
    frmAndroidMenuKA.greetingName.text = i18n_Hi +" "+ usrObj.userFirstName;
    frmAndroidMenuKA.lastSignOnLabel.text = i18n_lastSignin +" " + usrObj.lastLoginTime;
    frmAccountsLandingKA.lblUserNameTitleBarKA.text=usrObj.userFirstName;
    var greetingOnAccountsLandingKA=getTimeOfTheDay();
    frmAccountsLandingKA.lblGreetingTimeTitleBarKA.text=greetingOnAccountsLandingKA;
    if(kony.retailBanking.globalData.deviceInfo.isIphone()){
       frmMoreLandingKA.greetingName.text = i18n_Hi +" "+ usrObj.userFirstName;
       frmMoreLandingKA.moreLandingTitle.text = i18n_Hi +" "+ usrObj.userFirstName;
       frmMoreLandingKA.lastSignOnLabel.text = i18n_lastSignin +" " + usrObj.lastLoginTime;
    }
    userAgent = kony.os.userAgent();
    frmAccountsLandingKA.skin = sknmainGradient;
    insightsDefault = "195dp";
    frmAccountsLandingKA.insightsContainer.top="192dp";

    frmAccountsLandingKA.insightsPull.isVisible = false;
    frmAccountsLandingKA.accountsOuterScroll.top = "90dp";
    // resets in resetAccountInsights function below
    resetAccountInsights();
    if (userAgent === "iPhone"||userAgent === "iPad"){
      frmAccountsLandingKA.insightsScroll.opacity = 0;
     // frmAccountsLandingKA.segAccountsKA.height = "60%"
    }
   else{
      frmAccountsLandingKA.insightsScroll.opacity = 1;
      //frmAccountsLandingKA.segAccountsKA.height = "100%"
   }
      //accountLanding(frmAccountsLandingKA);
}

// Resets for form - called on preShow above
function resetAccountInsights() {
  	
  	frmAccountsLandingKA.insightsButton.opacity = 0;
    frmAccountsLandingKA.showInsightsButton.isVisible = true;
  
    //frmAccountsLandingKA.enableScrolling = true;
   	frmAccountsLandingKA.accountsOuterScroll.enableScrolling = false;
  	frmAccountsLandingKA.accountsInnerScroll.enableScrolling = false;
   
}

// Called on accountsOuterScroll onScrolling
function outerAccountScroll(){
  var scaleCashFlow = kony.ui.makeAffineTransform();
  scaleCashFlow.scale(1,1);
  
  frmAccountsLandingKA.insightsLine.opacity = 1;

  var outerScrollY = frmAccountsLandingKA.accountsOuterScroll.contentOffsetMeasured.y;
  var outerScrollYAbs=Math.abs(outerScrollY);

  if (outerScrollY > 115){
    	frmAccountsLandingKA.accountLabelScroll.isVisible = true;
  } else if (outerScrollY > 0 && outerScrollY < 115) {
    	frmAccountsLandingKA.accountLabelScroll.isVisible = false;
  }
  
   if (outerScrollY > 0){
     scaleCashFlow.scale(1*(outerScrollYAbs*0.2),1*(outerScrollYAbs*0.2));
   }
  
  if (outerScrollY < 0){
     frmAccountsLandingKA.insightsPull.opacity=(0.20+(outerScrollYAbs*0.01));
     frmAccountsLandingKA.insightsPull.top=(0+( outerScrollYAbs*0.2))+"dp";
     frmAccountsLandingKA.insightsLine.width=(1+( outerScrollYAbs*1))+"%";
     frmAccountsLandingKA.cashCreditOverview.top=(22+( outerScrollYAbs*0.1))+"dp";
     frmAccountsLandingKA.cashFlowContainer.top=(15+( outerScrollYAbs*0.1))+"dp";
  }
}

// Called on accountsOuterScroll onTouchEnd
function doneScrolling() {
   var outerScrollY = frmAccountsLandingKA.accountsOuterScroll.contentOffsetMeasured.y;
  
   if (outerScrollY < swipeShow){
    	showAccountInsights();
     	
       frmAccountsLandingKA.insightsPull.isVisible = false;	
    
     	frmAccountsLandingKA.accountsOuterScroll.enableScrolling = false;
        frmAccountsLandingKA.accountsInnerScroll.enableScrolling = false;
        frmAccountsLandingKA.enableScrolling = true;
     
  		frmAccountsLandingKA.insightsButton.top = "490dp";
     	
  	}  else if (outerScrollY > swipeHide){ 
    	hideAccountInsights();
    }
}

function showAccountInsights(){
    frmAccountsLandingKA.enableScrolling = true;
    frmAccountsLandingKA.insightsContainer.top="116dp";

  	var transformInsightsContainer = kony.ui.makeAffineTransform();
  	transformInsightsContainer.translate(0,0);
  	
  	frmAccountsLandingKA.insightsScroll.animate(
        kony.ui.createAnimation({"100":{ "transform": transformInsightsContainer,  "opacity": 1,
                  "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": 0.6},
        {"animationEnd": function () {}}
    );
   insightsShown=348;
  frmAccountsLandingKA.accountsOuterScroll.animate(
        kony.ui.createAnimation({"100":{ "top": insightsShown,
                  "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": 0.6},
        {"animationEnd": function () {
          fadeInHideInsights();
        }}
    );
  
        frmAccountsLandingKA.showInsightsButton.isVisible = false;
      	frmAccountsLandingKA.insightsButton.top = "386dp";
      	frmAccountsLandingKA.insightsScroll.opacity = 2;
}

function hideAccountInsights(){
 	resetAccountInsights();
  frmAccountsLandingKA.scrollToBeginning();
  insightsDefault=90;
  frmAccountsLandingKA.accountsOuterScroll.animate(
        kony.ui.createAnimation({"100":{ "top": insightsDefault,
                  "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration":0.4},
        {"animationEnd": function () {}}
    );
  
  frmAccountsLandingKA.showInsightsButton.isVisible = true;
  frmAccountsLandingKA.insightsScroll.opacity = 0;
  frmAccountsLandingKA.enableScrolling = false;
}

function transformInsights(){
  var transformInsightsContainer = kony.ui.makeAffineTransform();
  transformInsightsContainer.translate(0,-50);
  frmAccountsLandingKA.insightsScroll.animate(
        kony.ui.createAnimation({"100":{ "transform": transformInsightsContainer, "opacity": 0,
                  "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": 0.4},
        {"animationEnd": function () {}}
    );
}

function fadeInHideInsights() {
   frmAccountsLandingKA.insightsButton.animate(
        kony.ui.createAnimation({"100":{ "opacity": 1,
                  "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration":0.2},
        {"animationEnd": function () {}}
    );
}

function insightsPaging(){
   var insightsWidth = frmAccountsLandingKA.insightsContainer.width;
   var insightsScrollX = frmAccountsLandingKA.insightsScroll.contentOffsetMeasured.x;
  
   if (insightsScrollX > 300 &&insightsScrollX < 500 ){
    frmAccountsLandingKA.pagingActive.animate(
        kony.ui.createAnimation({"100":{ "centerX": "50%","stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards},
        {"animationEnd": function () {
         
        }}
    );
  }
  else if (insightsScrollX > 500){
    frmAccountsLandingKA.pagingActive.animate(
        kony.ui.createAnimation({"100":{ "centerX": "55%","stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards},
        {"animationEnd": function () {
         
        }}
    );
  } else if (insightsScrollX < 100) {
      frmAccountsLandingKA.pagingActive.animate(
        kony.ui.createAnimation({"100":{ "centerX": "45%","stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards },
        {"animationEnd": function () {
         
        }}
    );
  }
}

