function showAccountAlerts(){

          var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
          var controller = INSTANCE.getFormController("frmAlertsKA");
		  var alertId=frmAlertsKA.AlertsData.selectedItems[0].alertId;		
          var datamodel = new kony.sdk.mvvm.DataModel;
          var navigationObject = new kony.sdk.mvvm.NavigationObject;
          navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
          navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"alertId": alertId}});
          controller.performAction("navigateTo",["frmAccountAlertsKA",navigationObject]);
        
}

function AlertsStatusUpdate(header,accountName,selectedDays){
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmAccountAlertsKA");
    var viewModel = controller.getFormModel();
    var navigationObject = new kony.sdk.mvvm.NavigationObject;
    navigationObject.setCustomInfo("selectedAlertField",header);
  	navigationObject.setCustomInfo("AccountName",accountName);
  	navigationObject.setCustomInfo("Frequency",selectedDays);
	var datamodel = new kony.sdk.mvvm.DataModel;
	navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
    navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"alertId": frmAccountAlertsKA.HiddenAlertId.text}});
	  controller.performAction("navigateTo",["frmUpdateAccountAlertsKA",navigationObject]);
}
function showAlertsForm()
{
   //frmAlertsKA.show();
          	var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
           // var controller = INSTANCE.getFormController("frmPreferredAccountsKA");
            var navObject = new kony.sdk.mvvm.NavigationObject();
            var alertController = INSTANCE.getFormController("frmAlertsKA");
            navObject.setRequestOptions("AlertsData",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
            alertController.loadDataAndShowForm(navObject);
}