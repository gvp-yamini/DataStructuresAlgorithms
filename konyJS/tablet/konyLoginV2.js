kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.log = kony.sdk.mvvm.log || {};
kony.sdk.mvvm.constants = kony.sdk.mvvm.constants || {};
var apptype = {"APPTYPE":"MFAPP"};
kony.sdk.mvvm.KonyApplicationContext.init(apptype);
kony.sdk.mvvm.userObj = {};
kony.sdk.mvvm.LoginAction = function() {
    //Fetch username and password from login form
  kony.sdk.mvvm.KonyApplicationContext.init();
  var savedCredential = kony.sdk.mvvm.KonyApplicationContext.getRecentlyLoggedUserDetails();
  var username = frmLoginKA.usernameTextField.text || savedCredential["username"];
  var decUsr = DecryptValue(kony.store.getItem("userName"));
  if (kony.store.getItem("firstTimeLogin") !== null)
   {
    if(username &&  (username === decUsr) ){
     }
    else{
      kony.store.setItem("userName","");
      kony.store.setItem("credPassword","");
      kony.store.setItem("accountResponseObject","");
      kony.store.setItem("encryptedAcntObj","");
      kony.store.setItem("settingsflagsObject",kony.retailBanking.globalData.globals.settings);
    }}
	if(kony.retailBanking.util.validation.isValidUsername(username))		
		kony.store.setItem("userName",EncryptValue(username));
    if (username && typeof username === 'string'){
         username = username.toUpperCase();
         username = username.trim();
    }
    var password = frmLoginKA.passwordTextField.text;
    frmLoginKA.lblInvalidcredentials.isVisible = false;
    if(!kony.retailBanking.util.validation.isValidUsername(username))
    {
        frmLoginKA.lblInvalidcredentials.isVisible = true;
        frmLoginKA.passwordTextField.text = "";
        return true;
    }
    else if(!kony.retailBanking.util.validation.isValidPassword(password))
    {
         frmLoginKA.lblInvalidcredentials.isVisible = true;
      	 frmLoginKA.passwordTextField.text = "";
         return true;
    }   
    savePassword(password);
   var configParams = {
     "ShowLoadingScreenFunction": ShowLoadingScreen
    };
   var params = {   
    "authParams": {
        "username": username,
        "password": password,
        "loginOptions": {
            "isOfflineEnabled": false
        }
    },
    "options": {
        "access": "online"
    },
    "identityServiceName": "CustomLogin",
    "configParams": configParams
    };
   
    kony.sdk.mvvm.KonyApplicationContext.appServicesLogin(params, applicationInitialSuccessCallback, applicationErrorCallback);
    function applicationInitialSuccessCallback() {
        if (kony.sdk.mvvm.KonyApplicationContext.getAppInstance()) {
            var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
            try {
				kony.application.registerForIdleTimeout(kony.retailBanking.globalData.globals.IDLE_TIMEOUT, timeOutCallback);
                kony.retailBanking.globalData.session_token = kony.sdk.getCurrentInstance().currentBackEndToken.value;
                setUserObj();
                kony.sdk.mvvm.appInit(INSTANCE);
                //fetchcashFlowData();
            } catch (err) {
                applicationErrorCallback(err);
            }
        } else {
           
            kony.sdk.mvvm.log.error("Application is not initialized");
            applicationErrorCallback("Error during the user authentication for unknown reason");
        }
    }

    function applicationErrorCallback(error) {
        kony.sdk.mvvm.log.error("failed to load app" + error);
        if (error instanceof kony.sdk.mvvm.Exception) {
            switch (error.code) {
                case 70:
                case 79:
                case 125:
                    error.message = i18n_deviceConnectionError;
                    return;
                case 25:
                case 69:
                case 12:
                    frmLoginKA.lblInvalidcredentials.isVisible = true;
                    frmLoginKA.passwordTextField.text = "";
                    return;
                case 17:
                case 19:
                case 20:
                case 21:
                case 22:
                case 23:
                case 26:
                    error.message = i18n_appLaunchError;
                    break;
                default:
                    frmLoginKA.lblInvalidcredentials.isVisible = true;
                    frmLoginKA.passwordTextField.text = "";
                    return;
            
            }
            showGeneralAlert(error.message);
        } else
            showGeneralAlert(error.errorMessage);
    }
};
function ShowLoadingScreen(){
  kony.application.showLoadingScreen(null,"", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
}

kony.sdk.mvvm.LogoutAction = function() {
    ShowLoadingScreen();
    if (kony.sdk.mvvm.isNetworkAvailabile()) {
        kony.sdk.mvvm.KonyApplicationContext.logout(sucCallback, errCallback);
    } else {
        alert(kony.sdk.mvvm.ExceptionCode.MSG_ERROR_NETWORK_UNAVAILABLE);
      	sucCallback();
    }

    function sucCallback() {
      if (userAgent == "iPad")
		 frmLoginKA.removeGestureRecognizer(swipeGesture);
      frmLoginKA.show();
      kony.retailBanking.globalData.session_token="";
      kony.application.unregisterForIdleTimeout();
      fetchApplicationProperties();
    }

    function errCallback(err) {
        showGeneralAlert(err.toString());
    }
}
function timeOutCallback() {
    kony.sdk.mvvm.LogoutAction();
}