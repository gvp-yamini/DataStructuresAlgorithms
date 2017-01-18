function navigateToAccInfoEdit(frmForm,toForm){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmInformationKA");
  var controllerContextData = controller.getContextData();
  if( controllerContextData && controllerContextData.getCustomInfo("selectedAccountObj")){
    var accountData = controllerContextData.getCustomInfo("selectedAccountObj");
    var accountId = accountData["accountID"];
    var datamodel = new kony.sdk.mvvm.DataModel;
    var navigationObject = new kony.sdk.mvvm.NavigationObject;
    navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
    navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"accountID": accountId}});

    controller.performAction("navigateTo",[toForm,navigationObject]);

  }
}


function populatingAccountsInfoEditScreen() {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmInformationKA");
    var controllerContextData = controller.getContextData();
    if (controllerContextData && controllerContextData.getCustomInfo("selectedAccountObj")) {
        var accountData = controllerContextData.getCustomInfo("selectedAccountObj");
        frmAccountInfoEditKA.infoKA.setVisibility(false);
        frmAccountInfoEditKA.depositsKA.setVisibility(false);
        frmAccountInfoEditKA.savingsKA.setVisibility(false);
        var accountType = accountData["accountType"];
        frmAccountInfoEditKA.lblHiddenAccountNumberKA.text = accountData["accountID"];
        if (accountType === kony.retailBanking.globalData.globals.Checking || accountType === kony.retailBanking.globalData.globals.Savings) {
            frmAccountInfoEditKA.lblAccountNumberKA.text = "Account Number";
            frmAccountInfoEditKA.savingsKA.setVisibility(true);
            frmAccountInfoEditKA.TextField04db2cc822ba84e.text = accountData["nickName"];
            if (accountData["availableBalance"]) {
                frmAccountInfoEditKA.AvailableBalance.text = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accountData["availableBalance"]);
            }
            if (accountData["currentBalance"]) {
                frmAccountInfoEditKA.currentBalance.text = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accountData["currentBalance"]);
            }
            frmAccountInfoEditKA.lblAccountNumberTextKA.text = kony.retailBanking.util.maskAccountNumber(accountData["accountID"]);
        } 
		else if (accountType === kony.retailBanking.globalData.globals.CreditCard) {
            frmAccountInfoEditKA.lblAccountNumberKA.text = "creditCardNumber";
            frmAccountInfoEditKA.infoKA.setVisibility(true);
            frmAccountInfoEditKA.TextField04db2cc822ba84e.text = accountData["nickName"];
            if (accountData["creditCardNumber"]) {
                frmAccountInfoEditKA.lblAccountNumberTextKA.text = kony.retailBanking.util.formatingAmount.maskingLastFourDigits(accountData["creditCardNumber"]);
            }
            if (accountData["currentBalance"]) {
                var creditCurrBal = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accountData["currentBalance"]);
                if (creditCurrBal.indexOf('-') == -1) {
                    frmAccountInfoEditKA.lblCurrentBalanceKA.text = "-" + creditCurrBal;
                } else {
                    frmAccountInfoEditKA.lblCurrentBalanceKA.text = creditCurrBal;
                }
            }
            if (accountData["availableBalance"]) {
                frmAccountInfoEditKA.lblAvilabuleBalanceKA.text = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accountData["availableBalance"]);
            }
            if (accountData["lastStatementBalance"]) {
                frmAccountInfoEditKA.lblLastStatementBalanceKA.text = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accountData["lastStatementBalance"]);
            }
            if (accountData["minimumDue"]) {
                frmAccountInfoEditKA.lblminimumpayDueKA.text = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accountData["minimumDue"]);
            }
            if (accountData["dueDate"]) {
                frmAccountInfoEditKA.lblDueDateKA.text = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(accountData["dueDate"]);
            }
            var availablePoints = accountData["availablePoints"];
            if (availablePoints.indexOf('.') == -1) {
                frmAccountInfoEditKA.lblAvailablepointKA.text = availablePoints;
            } else {
                frmAccountInfoEditKA.lblAvailablepointKA.text = availablePoints.substring(0, availablePoints.indexOf('.'));
            }
        } else if (accountType === kony.retailBanking.globalData.globals.Deposit) {
            frmAccountInfoEditKA.lblAccountNumberKA.text = "Account Number";
            frmAccountInfoEditKA.depositsKA.setVisibility(true);
            frmAccountInfoEditKA.TextField04db2cc822ba84e.text = accountData["nickName"];
            frmAccountInfoEditKA.lblAccountNumberTextKA.text = kony.retailBanking.util.maskAccountNumber(accountData["accountID"]);
            frmAccountInfoEditKA.intrestLbl.text = accountData["interestRate"] + "%";
            if (accountData["currentBalance"]) {
                frmAccountInfoEditKA.lblCBalance.text = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accountData["currentBalance"]);
            }
            frmAccountInfoEditKA.termLbl.text = accountData["paymentTerm"];
            if (accountData["openingDate"]) {
                frmAccountInfoEditKA.openedDatelbl.text = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(accountData["openingDate"]);
            }
            if (accountData["maturityDate"]) {
                frmAccountInfoEditKA.maturityLbl.text = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(accountData["maturityDate"]);
            }
		}
        
    } else if (accountType == kony.retailBanking.globalData.globals.Mortgage) {}
}

function saveEditData(){
  kony.retailBanking.globalData.globals.DoReloadEditAccountInfo = true;

  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmAccountInfoEditKA");
  var listController = INSTANCE.getFormController("frmInformationKA");
  var formmodel = controller.getFormModel();

  var controllerContextData = listController.getContextData();
   var listContextData = controller.getContextData();

  if( controllerContextData && controllerContextData.getCustomInfo("selectedAccountObj"))
  {
    var accountData = controllerContextData.getCustomInfo("selectedAccountObj");
    listContextData.setCustomInfo("selectedAccountObj",accountData);
  }

 /*   var AccountNickName = formmodel.getWidgetData("TextField04db2cc822ba84e").getData();
  if( listContextData && listContextData.getCustomInfo("selectedAccountObj")){
    var accDetails =  listContextData.getCustomInfo("selectedAccountObj");
    accDetails["nickName"] = AccountNickName;
    listContextData.setCustomInfo("selectedAccountObj",accDetails);
  } */ 
  controller.performAction("saveData");

}
function transferKA()
{
	var selectedInd = frmActivityKA.SegTransactionsKA.selectedRowIndex[1]; 
    data = kony.retailBanking.globalData.activityData.getActivityData()[selectedInd];
	
  frmAccTransferShowKA.lblTransactionType.text = data.transactionType;
  if(data.transactionType === "ExternalTransfer"){
    frmAccTransferShowKA.lblToAccountNumber.text = data.ExternalAccountNumber;
  }
  else if(data.transactionType === "InternalTransfer"){
    frmAccTransferShowKA.lblToAccountNumber.text = data.toAccountNumber;
  }
  
  frmAccTransferShowKA.lblFromAccountNumber.text = data.fromAccountNumber;
  frmAccTransferShowKA.lblFromAccountDataKA.text = data.fromAccountName;
  frmAccTransferShowKA.lblToAccountDataKA.text = data.toAccountName;
  frmAccTransferShowKA.lblAmountDataKA.text = data.amount;
  frmAccTransferShowKA.lblTranasctionIdData.text = data.transactionId; 

  if(data.transactionsNotes !== undefined)
  frmAccTransferShowKA.lblNotesDataKA.text = data.transactionsNotes;

  if(data.frequencyType === "Once"){
    frmAccTransferShowKA.lblFrequencyDataKA.text = data.frequencyType;
    frmAccTransferShowKA.flxRecurrence.isVisible = false;
  }
  else{
    frmAccTransferShowKA.lblFrequencyDataKA.text = data.frequencyType;
    frmAccTransferShowKA.flxRecurrence.isVisible = true;
  }
   frmAccTransferShowKA.lblTransferDateDataKA.text = data.transactionDate;
  if(data.frequencyStartDate !== undefined || data.frequencyEndDate !== undefined || data.numberOfRecurrences === 0){
    frmAccTransferShowKA.lblRecurrenceFromDateKA.text = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(data.frequencyStartDate);
    frmAccTransferShowKA.lblRecurrenceToDateKA.text = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(data.frequencyEndDate);
    frmAccTransferShowKA.lblRecurrenceType.text = "daterange";
    frmAccTransferShowKA.flxRecurrence.isVisible = true;
    frmAccTransferShowKA.flxRecurrenceDatesInput.isVisible = true;
    frmAccTransferShowKA.flxRecurrenceTimesInput.isVisible = false;
  }
  else{
    frmAccTransferShowKA.lblRecurrenceType.text = "nor";
    frmAccTransferShowKA.lblRecurrenceTimesDataKA.text = data.numberOfRecurrences;
    frmAccTransferShowKA.flxRecurrenceDatesInput.isVisible = false;
    frmAccTransferShowKA.flxRecurrenceTimesInput.isVisible = true;
  }
  frmAccTransferShowKA.show();
  
}
