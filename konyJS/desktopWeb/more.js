var transferdetails=0;
function frmMoreKA_segResources_onRowClick(){
  try {
        var key = frmMoreKA.segResourcesKA.selectedItems[0].lblMoreKA;
        switch (key) {
        case "Message Center":showMessagesForm("frmMessageInboxKA","segMessagesInboxKA","Inbox");
            break;
        case "My Money":
            loadAndShowPFMAccountListKA();
           break;
        case "New Account":loadAndShowNewAccountStep1();
            break;
        case "Manage Cards":loadAndShowManageCards();
           break;
        case "Interest Rate":
             var INSTANCEI = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
             var controlleri = INSTANCEI.getFormController("frmInterestRateKA");
             var navObjecti = new kony.sdk.mvvm.NavigationObject();
             navObjecti.setRequestOptions("segInterestRateKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
             controlleri.loadDataAndShowForm(navObjecti);
            frmInterestRateKA.show();
            break;
        case "Foreign Exchange Rate":
            var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
            var controller = INSTANCE.getFormController("frmForeignExchangeKA");
            var navObject = new kony.sdk.mvvm.NavigationObject();
            navObject.setRequestOptions("segInterestRateKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
            controller.loadDataAndShowForm(navObject);
            frmForeignExchangeKA.show();
            break;
        default:
            break;
        }
    } catch (e) {
        kony.print("e");
    } 
}
function frmMoreKA_segSettings_onRowClick(){
  try {
        var key = frmMoreKA.segSettingsKA.selectedItems[0].lblMoreKA;
        switch (key) {
        case "Alerts": getAccountAlertsPage();
            break;
        case "Preferred Accounts":frmMoreMenuPreferredTransactionsKA.show();
           break;
        case "Personal Details":securityQuestionsFetch(frmPersonalDetailsStep1KA);
            break;
        case "Change Username":securityQuestionsFetch(frmChangeUsername1KA);
           break;
        case "Change Password":securityQuestionsFetch(frmChangePassword1KA);
            break;
        default:
            break;
        }
    } catch (e) {
        kony.print("e");
    } 
}