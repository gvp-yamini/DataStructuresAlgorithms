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
    //var savedCredential = kony.sdk.mvvm.KonyApplicationContext.getRecentlyLoggedUserDetails();
    var username = frmLoginKA.usernameTextField.text;
    if (username && typeof username === 'string'){
         username = username.toUpperCase();
         username = username.trim();
    }
    var password = frmLoginKA.passwordTextField.text;
    
    frmLoginKA.lblInvalidCredentialsKA.isVisible = false;
    if(!kony.retailBanking.util.validation.isValidUsername(username))
    {
        frmLoginKA.lblInvalidCredentialsKA.isVisible = true;
        frmLoginKA.passwordTextField.text = "";
        return true;
    }
    else if(!kony.retailBanking.util.validation.isValidPassword(password))
    {
         frmLoginKA.lblInvalidCredentialsKA.isVisible = true;
      	 frmLoginKA.passwordTextField.text = "";
         return true;
    }   
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
                fetchAcountsDataforDashboard();
                kony.sdk.mvvm.appInit(INSTANCE);
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
                    error.message = "Your device is not connected to a network. Check and try again.";
                    return;
                case 25:
                case 69:
                case 12:
                    frmLoginKA.lblInvalidCredentialsKA.isVisible = true;
                    return;
                case 17:
                case 19:
                case 20:
                case 21:
                case 22:
                case 23:
                case 26:
                    error.message = "Error in launching app";
                    break;
                default:
                    frmLoginKA.lblInvalidCredentialsKA.isVisible = true;
                    return;
            
            }
            alert(error.message);
        } else
            alert(error.errorMessage);
    }
};
function ShowLoadingScreen(){
  kony.application.showLoadingScreen(null,"", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
}

kony.sdk.mvvm.LogoutAction = function() {
    //if(!kony.konysales.util.backGroundSyncInProgress)
    if (kony.sdk.mvvm.isNetworkAvailabile()) {
        kony.sdk.mvvm.KonyApplicationContext.logout(sucCallback, errCallback);
    } else {
        alert(kony.sdk.mvvm.ExceptionCode.MSG_ERROR_NETWORK_UNAVAILABLE);
    }

    function sucCallback() {
        if (frmLoginKA.cbxRememberMeKA.selectedKeys === null) {
            frmLoginKA.destroy();
			localStorage.clear();
        }
		else{
			localStorage.setItem('username',frmLoginKA.usernameTextField.text);
			frmLoginKA.usernameTextField.text = localStorage.getItem('username');
			frmLoginKA.passwordTextField.text = "";	
		}
		kony.retailBanking.globalData.session_token="";
        frmLoginKA.show();
        fetchApplicationProperties();
    }

    function errCallback(err) {
        alert(err.toString());
    }
}
function timeOutCallback() {
    kony.sdk.mvvm.LogoutAction();
  	kony.retailBanking.globalData.session_token="";
}