function getAccountAlertsPage()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController("frmMoreAccAlertKA");
  var navObject = new kony.sdk.mvvm.NavigationObject();
  navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  listController.performAction("navigateTo",["frmMoreAccAlertKA",navObject]);
}
//SetAlertsData
function setAlertsUIData(response)
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController("frmMoreAccAlertKA");
  var formmodel = listController.getFormModel();
  formmodel.setViewAttributeByProperty("listAlertAccountsKA", "selectedKeys", [response.alertId]);
  if(response.isEnabled === "true")
  {
    formmodel.setViewAttributeByProperty("checkAccountAlertKA", "selectedKeys", ["cbg", "1"]);
    formmodel.setViewAttributeByProperty("HiddenAlertsReq", "text", true);
	setEnableAccountAlert();
  }
  else
  {
    formmodel.setViewAttributeByProperty("checkAccountAlertKA", "selectedKeys", null);
    formmodel.setViewAttributeByProperty("HiddenAlertsReq", "text", false);
	setEnableAccountAlert();

  }
  if(response.checkClearance === "true")
  {
    formmodel.setViewAttributeByProperty("checkClearanceKA", "selectedKeys", ["cbg", "1"]);
    formmodel.setViewAttributeByProperty("HiddenCheckClear", "text", true);

  }
  else
  {
    formmodel.setViewAttributeByProperty("checkClearanceKA", "selectedKeys", null);
    formmodel.setViewAttributeByProperty("HiddenCheckClear", "text", false);

  }
  if(response.successfulTransfer === "true")
  {
    formmodel.setViewAttributeByProperty("checkSuccessTransferKA", "selectedKeys", ["cbg", "1"]);
    formmodel.setViewAttributeByProperty("HiddenSuccessTransfer", "text", true);
  }
  else
  {
    formmodel.setViewAttributeByProperty("checkSuccessTransferKA", "selectedKeys", null);
    formmodel.setViewAttributeByProperty("HiddenSuccessTransfer", "text", false);
  }
  formmodel.setViewAttributeByProperty("lbxBalanceUpdateKA", "selectedKeys", [response.balanceUpdateTypeId]);
  formmodel.setViewAttributeByProperty("lbxPaymentDueKA", "selectedKeys", [response.paymentDueReminderTypeId]);
  formmodel.setViewAttributeByProperty("lbxDepositMaturityRemainderKA", "selectedKeys", [response.depositDueReminderTypeId]);
}

function getAlertDataByPassingAccountID()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController("frmMoreAccAlertKA");
  var formmodel = listController.getFormModel();
  var alertId = formmodel.getViewAttributeByProperty("listAlertAccountsKA", "selectedKey");
  var navObject = new kony.sdk.mvvm.NavigationObject();
  navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"alertId": alertId}});
  listController.performAction("navigateTo",["frmMoreAccAlertKA",navObject]);
}

function cancelRefreshData()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController("frmMoreAccAlertKA");
  var formmodel = listController.getFormModel();
  var alertId = formmodel.getViewAttributeByProperty("HiddenAlertId", "text");
  var navObject = new kony.sdk.mvvm.NavigationObject();
  navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"alertId": alertId}});
  listController.performAction("navigateTo",["frmMoreAccAlertKA",navObject]);
}

function cancelAlertAccountData()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController("frmMoreAccAlertKA");
  var contexData = listController.getContextData();
  var alertOBJ = contexData.getCustomInfo("alertObj");
  setAlertsUIData(alertOBJ[0]);
  var formmodel = listController.getFormModel();
  formmodel.setViewAttributeByProperty("tbxAmountInputKA", "text", alertOBJ[0].minimumBalance);
  formmodel.setViewAttributeByProperty("tbxCreditLimitKA", "text", alertOBJ[0].creditLimit);
  formmodel.setViewAttributeByProperty("tbxDebitlimitKA", "text", alertOBJ[0].debitLimit);

}

function selectBalancePaymentDepositUpdate(selectBox,hiddenField)
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController("frmMoreAccAlertKA");
  var formmodel = listController.getFormModel();
  var data = formmodel.getViewAttributeByProperty(selectBox, "selectedKeys");
  formmodel.setViewAttributeByProperty(hiddenField, "text",data[0]);
}

function selectEnableSuccessClearCheckBoxes(checkBox,hiddenField)
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController("frmMoreAccAlertKA");
  var formmodel = listController.getFormModel();
  var isSelcted = formmodel.getViewAttributeByProperty(checkBox, "selectedkeyvalues");
  if(isSelcted !==null) 
  {
    formmodel.setViewAttributeByProperty(hiddenField, "text",true); 
  }else
  {
    formmodel.setViewAttributeByProperty(hiddenField, "text",false); 
  }	
}

function saveAlertData()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmMoreAccAlertKA");
  var navigationObject = new kony.sdk.mvvm.NavigationObject();
  navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  controller.performAction("saveData",[navigationObject]); 
}

//Used to get SecurityAndDealAlertsPage
function getGeneralAccountAlertsPage()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController("frmGeneralAlertsKA");
  var navObject = new kony.sdk.mvvm.NavigationObject();
  navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  listController.performAction("navigateTo",["frmGeneralAlertsKA",navObject]);
}

//Setting generalAlertsCheckBoxes
function setGeneralAlertsUIData()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController("frmGeneralAlertsKA");
  var contexData = listController.getContextData();
  var response = contexData.getCustomInfo("generalAlertObj")[0];
  var formmodel = listController.getFormModel();
  if(response.bankingIDChange === "true")
  {
    formmodel.setViewAttributeByProperty("cbxBankingIdChangeKA", "selectedKeys", ["cbg", "1"]);
    formmodel.setViewAttributeByProperty("HiddenBankingIDChangeKA", "text", true);
  }
  else
  {
    formmodel.setViewAttributeByProperty("cbxBankingIdChangeKA", "selectedKeys", null);
    formmodel.setViewAttributeByProperty("HiddenBankingIDChangeKA", "text", false);
  }
  if(response.communicationChange === "true")
  {
    formmodel.setViewAttributeByProperty("cbxAddressChangeKA", "selectedKeys", ["cbg", "1"]);
    formmodel.setViewAttributeByProperty("HiddenCommunicationChangeKA", "text", true);
  }
  else
  {
    formmodel.setViewAttributeByProperty("cbxAddressChangeKA", "selectedKeys", null);
    formmodel.setViewAttributeByProperty("HiddenCommunicationChangeKA", "text", false);
  }
  if(response.passwordChange === "true")
  {
    formmodel.setViewAttributeByProperty("cbxPwdChangeKA", "selectedKeys", ["cbg", "1"]);
    formmodel.setViewAttributeByProperty("HiddenPasswordChangeKA", "text", true);
  }
  else
  {
    formmodel.setViewAttributeByProperty("cbxPwdChangeKA", "selectedKeys", null);
    formmodel.setViewAttributeByProperty("HiddenPasswordChangeKA", "text", false);
  }
  if(response.newPayeeAdded === "true")
  {
    formmodel.setViewAttributeByProperty("cbxNewPayeeAddedKA", "selectedKeys", ["cbg", "1"]);
    formmodel.setViewAttributeByProperty("HiddennNewPayeeAddedKA", "text", true);
  }
  else
  {
    formmodel.setViewAttributeByProperty("cbxNewPayeeAddedKA", "selectedKeys", null);
    formmodel.setViewAttributeByProperty("HiddennNewPayeeAddedKA", "text", false);
  }
  if(response.passwordExpired === "true")
  {
    formmodel.setViewAttributeByProperty("cbxPwdExpiredKA", "selectedKeys", ["cbg", "1"]);
    formmodel.setViewAttributeByProperty("HiddenPasswordExpiredKA", "text", true);
  }
  else
  {
    formmodel.setViewAttributeByProperty("cbxPwdExpiredKA", "selectedKeys", null);
    formmodel.setViewAttributeByProperty("HiddenPasswordExpiredKA", "text", false);
  }
  if(response.dealsExpiring === "true")
  {
    formmodel.setViewAttributeByProperty("cbxDealExpiringKA", "selectedKeys", ["cbg", "1"]);
    formmodel.setViewAttributeByProperty("HiddenDealsExpiringKA", "text", true);
  }
  else
  {
    formmodel.setViewAttributeByProperty("cbxDealExpiringKA", "selectedKeys", null);
    formmodel.setViewAttributeByProperty("HiddenDealsExpiringKA", "text", false);
  }
  if(response.newDealsAvailable === "true")
  {
    formmodel.setViewAttributeByProperty("cbxNewDealsAvailableKA", "selectedKeys", ["cbg", "1"]);
    formmodel.setViewAttributeByProperty("HiddenNewDealsAvailableKA", "text", true);
  }
  else
  {
    formmodel.setViewAttributeByProperty("cbxNewDealsAvailableKA", "selectedKeys", null);
    formmodel.setViewAttributeByProperty("HiddenNewDealsAvailableKA", "text", false);
  }
  if(response.payeeDetailsUpdated === "true")
  {
    formmodel.setViewAttributeByProperty("cbxPayeeDetailsUpdatedKA", "selectedKeys", ["cbg", "1"]);
    formmodel.setViewAttributeByProperty("HiddenPayeeDetailsUpdatedKA", "text", true);
  }
  else
  {
    formmodel.setViewAttributeByProperty("cbxPayeeDetailsUpdatedKA", "selectedKeys", null);
    formmodel.setViewAttributeByProperty("HiddenPayeeDetailsUpdatedKA", "text", false);
  }
}

//Save GeneralAlertsData
function saveGeneralAlertsData()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmGeneralAlertsKA");
  var navigationObject = new kony.sdk.mvvm.NavigationObject();
  navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  controller.performAction("saveData",[navigationObject]);  
}

//used to setCheckBoxValuesToHiddenFields
function updateGeneralCheckBoxValuesToHiddenFields(formName,checkBox,hiddenField)
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController(formName);
  var formmodel = listController.getFormModel();
  var isSelcted = formmodel.getViewAttributeByProperty(checkBox, "selectedkeyvalues");
  if(isSelcted !==null) 
  {
    formmodel.setViewAttributeByProperty(hiddenField, "text",true); 
  }else
  {
    formmodel.setViewAttributeByProperty(hiddenField, "text",false); 
  }	
}

function setEnableAccountAlert()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController("frmMoreAccAlertKA");
  var formmodel = listController.getFormModel();
  var isSelcted = formmodel.getViewAttributeByProperty("checkAccountAlertKA", "selectedkeyvalues");
  if(isSelcted !==null) 
  {
    formmodel.performActionOnView("flxMinBalanceKA","setVisibility",[true]);
    formmodel.performActionOnView("flxBalanceUpdateKA","setVisibility",[true]);
    formmodel.performActionOnView("flxDebitLimitKA","setVisibility",[true]);
    formmodel.performActionOnView("flxCreditLimitKA","setVisibility",[true]);
    formmodel.performActionOnView("flxPaymentDueKA","setVisibility",[true]);
    formmodel.performActionOnView("flxDepositMaturityRemainderKA","setVisibility",[true]);
    formmodel.performActionOnView("flxSuccessfulTransferKA","setVisibility",[true]);
    formmodel.performActionOnView("flxCheckClearanceKA","setVisibility",[true]);
  }else
  {
    formmodel.performActionOnView("flxMinBalanceKA","setVisibility",[false]);
    formmodel.performActionOnView("flxBalanceUpdateKA","setVisibility",[false]);
    formmodel.performActionOnView("flxDebitLimitKA","setVisibility",[false]);
    formmodel.performActionOnView("flxCreditLimitKA","setVisibility",[false]);
    formmodel.performActionOnView("flxPaymentDueKA","setVisibility",[false]);
    formmodel.performActionOnView("flxDepositMaturityRemainderKA","setVisibility",[false]);
    formmodel.performActionOnView("flxSuccessfulTransferKA","setVisibility",[false]);
    formmodel.performActionOnView("flxCheckClearanceKA","setVisibility",[false]);
  }	
} 