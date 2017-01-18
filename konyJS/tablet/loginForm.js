var TouchIDStatus="true";
var deviceRegFrom;
var mySwipe,swipeGestureiPhone,swipeGesture;
var setupTblTap = {fingers:1,swipedistance:50,swipevelocity:60};
function loginPreShow() {
  firstTimeapplogin();
  manageUname();
  var tempdata=kony.store.getItem("settingsflagsObject");
  userAgent = kony.os.userAgent();
  frmLoginKA.loginCard.centerY = "60%";
  frmLoginKA.loginCard.opacity = 0;
  frmLoginKA.apScrollEnable.opacity = 0;
  frmLoginKA.passwordTextField.text = "";
  if (userAgent === "iPhone" || userAgent === "iPad")
  {  
  if (tempdata.deviceRegisterFlag!== null && tempdata.touchIDEnabledFlag === true)
  		frmLoginKA.touchIdContainer.setVisibility(true);
    else
      frmLoginKA.touchIdContainer.isVisible = false;
  }
  if(kony.retailBanking.globalData.deviceInfo.isIpad())
	swipeGesture=frmLoginKA.setGestureRecognizer(2,setupTblTap,AccountPreviewiPad);
 
}
  


function touchLoginShow()
{  
  var primarydeviceRegdata=kony.store.getItem("settingsflagsObject");
  if(primarydeviceRegdata.deviceRegisterFlag!== null && primarydeviceRegdata.touchIDEnabledFlag=== true)
    {
      var config = {"promptMessage" : i18n_nativeTouchId};
      kony.localAuthentication.authenticate(constants.LOCAL_AUTHENTICATION_MODE_TOUCH_ID, statusCB, config);
    }
}

function loadProgresBar()
{
       kony.application.dismissLoadingScreen ();
       kony.timer.cancel("touchIdTimer");
       accountsLanding.show();   
}


function savePassword(password){
      kony.store.setItem("credPassword",EncryptValue(password));
}

function statusCB(status,message)
{ 
   if(status == 5000)
  {
     frmLoginKA.passwordTextField.text = DecryptValue(kony.store.getItem("credPassword"));
     kony.sdk.mvvm.LoginAction();   
  } 
  else
 {
      switch(status)
      {
          case 5001:
            alertMsg = i18n_alertInvalidCred;
            break;
          case 5002:
            alertMsg = i18n_alertAuthCancelUser;
            break;
          case 5003:
            alertMsg = i18n_alertAuthCancelBackBtn;
            break;
          case 5004:
            alertMsg = i18n_alertAuthCancelSystem;
            break;
          case 5005:
            alertMsg = i18n_alertPasscodeNotSet;
            break;
          case 5006:
            alertMsg = i18n_alertTouchIdUnavailable;
            break;
          case 5007:
            alertMsg = i18n_alertTouchIdNotEnrolled;
            break;
          default:
            alertMsg = i18n_alertTouchIdAuthFailed;
            break;
  } 
   kony.print(alertMsg);
 }
}

function loginPostShow() {
  	frmLoginKA.apScrollEnable.animate(
        kony.ui.createAnimation({
           "100":{"opacity": 1,
                  "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards,"duration": 1},
        {"animationEnd": function () {}}
    );
  
     frmLoginKA.loginCard.animate(
        kony.ui.createAnimation({
           "100":{ "centerY":"50%","opacity": 1,
                  "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards,"duration": 0.6, "delay": 0.1},
        {"animationEnd": function () {}}
    );
}

function loginHide(){
  if (userAgent === "iPhone" || userAgent === "iPad"){
    if (frmLoginKA.rememberUsernameSwitch.selectedIndex === 1){
          frmLoginKA.usernameTextField.text = null;
    }
  }
  frmLoginKA.passwordTextField.text = null;
}


////////////////////////////////
// Login card animation logic 
////////////////////////////////
function clickedLoginCardDeactivate(){
  if (frmLoginKA.loginCard.centerY === "40%"){
		loginKeyboardInactive();
  }
}

var usernameTextLength;
// on password endText and Done
function passwordOnEndEditing(){
  usernameTextLength = frmLoginKA.usernameTextField.text;

  	if (usernameTextLength.length && usernameTextLength.length >= 1){
      	// username textfield has text entered
    	loginKeyboardInactive();
    }
}

function loginKeyboardActive(){
	frmLoginKA.loginCard.animate(
		kony.ui.createAnimation({100:{"centerY": "40%" ,"stepConfig":{"timingFunction": easeOut}}}),
		{fillMode: forwards ,duration:0.3},
		{animationEnd: function() {} });
    if (userAgent !== "iPad"){
      frmLoginKA.logoContainer.animate(
            kony.ui.createAnimation({100:{"centerY": "26%" ,"stepConfig":{"timingFunction": easeOut}}}),
            {fillMode: forwards ,duration:0.3},
            {animationEnd: function() {} });
    }
}

function loginKeyboardInactive(){
	frmLoginKA.loginCard.animate(
		kony.ui.createAnimation({100:{"centerY": "50%" ,"stepConfig":{"timingFunction": easeOut}}}),
		{fillMode: forwards ,duration:0.3},
		{animationEnd: function() {} });
  if (userAgent !== "iPad"){
    frmLoginKA.logoContainer.animate(
          kony.ui.createAnimation({100:{"centerY": "45%" ,"stepConfig":{"timingFunction": easeOut}}}),
          {fillMode: forwards ,duration:0.3},
          {animationEnd: function() {} });
  }
}






////////////////////////////////
// Account Preview Swipe logic
////////////////////////////////
function apScrollEnableScrolling(){
  
  var bgScrollX = frmLoginKA.apScrollEnable.contentOffsetMeasured.x;
  var bgScrollXAbs=Math.abs(bgScrollX);
  
	if (bgScrollX < 0){
      frmLoginKA.apScrollDisable.left=(-100+(bgScrollXAbs*0.3))+"%";
      frmLoginKA.loginMainScreen.opacity = 1.0-(bgScrollXAbs*0.003);
      frmLoginKA.loginMainScreen.left = "0dp";
	}
}

function apScrollEnableTouchEnd(){
  var bgScrollX = frmLoginKA.apScrollEnable.contentOffsetMeasured.x;
   if (bgScrollX < -50){
     apAnimate();
    } 
}

function apScrollDisableTouchEnd(){
  var bgScrollX = frmLoginKA.apScrollDisable.contentOffsetMeasured.x;
   if (bgScrollX > 50){
     apUnAnimate();
    } 
}

function apAnimate(){
  var apWidth = frmLoginKA.accountPreviewScreen.width;
  var transform = kony.ui.makeAffineTransform();
  transform.translate(apWidth, 0);
	frmLoginKA.apScrollDisable.animate(
		kony.ui.createAnimation({100:{"transform": transform ,"stepConfig":{"timingFunction": easeOut}}}),
		{fillMode: forwards ,duration:0.3},
		{animationEnd: function() {} });
  
  frmLoginKA.apScrollEnable.animate(
		kony.ui.createAnimation({100:{"opacity": 0.2 ,"stepConfig":{"timingFunction": easeOut}}}),
		{fillMode: forwards ,duration:0.3},
		{animationEnd: function() {} });
	
   
}
function addAccountPanel() {
    //if (!frmLoginKA.leftWrapper.segAccountInfoData){
      frmLoginKA.segAccountInfoData.setData(segAccountInfoData);
//}

}
function apUnAnimate(){
  var transform = kony.ui.makeAffineTransform();
  transform.translate(0, 0);
  
  frmLoginKA.apScrollDisable.animate(
		kony.ui.createAnimation({100:{"transform": transform,"stepConfig":{}}}),
		{fillMode: forwards ,duration:0.5},
		{animationEnd: function() {} });
 
  frmLoginKA.apScrollEnable.animate(
		kony.ui.createAnimation({100:{"opacity": 1 ,"stepConfig":{"timingFunction": easeOut}}}),
		{fillMode: forwards ,duration:0.3},
		{animationEnd: function() {} });
  
  frmLoginKA.loginMainScreen.opacity = 1;
}


function onLoginOrientationChange(){
  if (frmLoginKA.apScrollEnable.opacity === 0.2){
		apAnimate();
  }
}