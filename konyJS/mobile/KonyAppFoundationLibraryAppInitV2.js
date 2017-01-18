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
        getDeviceRegStatus();
        }
    catch (err) {
        kony.sdk.mvvm.log.error("Error in app load : " + err);
    }
};

function showFormOrderList() {
    if(defaultPage == "New Check Deposit"){
      var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
      var listController = INSTANCE.getFormController("frmNewDepositKA");
      var navObject = new kony.sdk.mvvm.NavigationObject();
      navObject.setRequestOptions("segInternalTOAccountsKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
      navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
      listController.performAction("navigateTo",["frmNewDepositKA",navObject]); 
      newDepositPreShow();
      defaultPage = "frmAccountsLandingKA"; 
    }
    else if(defaultPage == "Transfer Money"){
      navigateToNewTransferForm("InitialLanding", null);
      defaultPage = "frmAccountsLandingKA";
    }
    else if(defaultPage == "Pay a Bill"){
     BillPayfromForm="NewBillPay";
	 navigateToNewBillPayForm("InitialLanding", null); 
     defaultPage = "frmAccountsLandingKA";
    }
    else{
      gblfrmName = "Account Overview";
      var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
      var controller = INSTANCE.getFormController("frmAccountsLandingKA");
      var navObject = new kony.sdk.mvvm.NavigationObject();
      navObject.setRequestOptions("segAccountsKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
      controller.loadDataAndShowForm(navObject);
    }
}

