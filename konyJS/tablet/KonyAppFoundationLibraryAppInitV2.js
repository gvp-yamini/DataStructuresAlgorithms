kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.log = kony.sdk.mvvm.log || {};
kony.sdk.mvvm.util = kony.sdk.mvvm.util || {};
kony.sdk.mvvm.constants = kony.sdk.mvvm.constants || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.appInit = function(appContext) {
    try {
     	kony.sdk.mvvm.initApplicationForms(appContext);
        getDeviceRegStatus();
    } catch (err) {
        kony.sdk.mvvm.log.error("Error in app load : " + err);
    }
};

function showAccountsLanding() 
{

  kony.store.setItem("firstTimeLogin","finished");
  accountLanding();
}

