kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.log = kony.sdk.mvvm.log || {};
kony.sdk.mvvm.util = kony.sdk.mvvm.util || {};
kony.sdk.mvvm.constants = kony.sdk.mvvm.constants || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.BPT=kony.BPT||{};
kony.BPT.cacheData={};
kony.sdk.mvvm.appInit = function(appContext) {
    try {
     	kony.sdk.mvvm.initApplicationForms(appContext);
        showDashBoardKA();
        }
    catch (err) {
        kony.sdk.mvvm.log.error("Error in app load : " + err);
    }
};

function showDashBoardKA() {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmDashboardKA");
    var navObject = new kony.sdk.mvvm.NavigationObject();
  	navObject.setRequestOptions("segScheduledTransfersDetailsKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
    controller.loadDataAndShowForm(navObject);
}


