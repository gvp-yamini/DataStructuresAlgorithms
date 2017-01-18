kony = kony || {};
kony.retailBankingKA = kony.retailBanking || {};
kony.retailBankingKA.AccountsglobalData = kony.retailBankingKA.AccountsglobalData || {};
kony.retailBankingKA.AccountsglobalData = {
  accounts : [],
};

function fetchTransactionList(accountId) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var options = {
        "access": "online",
        "objectName": "RBObjects"
    };
    var headers = {
        "session_token": kony.retailBanking.globalData.session_token
    };
    var serviceName = "RBObjects";
    var modelObj = INSTANCE.getModel("Transactions", serviceName, options);
    var dataObject = new kony.sdk.dto.DataObject("Transactions");
    var serviceOptions = {
        "dataObject": dataObject,
        "headers": headers,
        "queryParams": {
            "accountID": accountId
        }
    };
    modelObj.fetch(serviceOptions, dataSuccessFetchAccount, dataFailureFetchAccount);

    function dataSuccessFetchAccount(response) {
        //kony.retailBanking.globalData.activityData.setActivityData(response);
      var resobj = clone(response);
       kony.retailBanking.globalData.activityData.setActivityDataNotFormated(resobj);
        transactionListformatting(response);
		    var activityData = response;
    for(var i in activityData){
      {
        activityData[i]["amount"] = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(activityData[i]["amount"].slice(1));
        activityData[i]["transactionDate"] = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(activityData[i]["transactionDate"]);
      }
      kony.retailBanking.globalData.activityData.setActivityData(activityData);
    
	}
	}
    function dataFailureFetchAccount(err) {
        kony.print("err" + err);
    }
}
  function clone(obj) {
      if (obj === null || typeof(obj) !== 'object' || 'isActiveClone' in obj)
        return obj;

      if (obj instanceof Date)
        var temp = new obj.constructor(); //or new Date(obj);
      else
        var temp = obj.constructor();

      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          obj['isActiveClone'] = null;
          temp[key] = clone(obj[key]);
          delete obj['isActiveClone'];
        }
      }

      return temp;
    }

function transactionListformatting(segTransactionListData){
  if(segTransactionListData && segTransactionListData.length>0)
  {
    var processedSegData = [ ];
    var processedRowObj;
    for(var i in segTransactionListData){
      if(segTransactionListData[i]["isScheduled"]==="false"){
        processedRowObj = {};
        if(segTransactionListData[i]["amount"]<0){
          processedRowObj["transaction"] = kony.retailBanking.globalData.globals.Debit;
        }else{
          processedRowObj["transaction"] = kony.retailBanking.globalData.globals.Credit;
        }
        processedRowObj["amount"] = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(segTransactionListData[i]["amount"]);
        //processedRowObj["amount"] = segTransactionListData[i]["amount"];
        processedRowObj["transactionDate"] = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(segTransactionListData[i]["transactionDate"]);
        // processedRowObj["transactionDate"] = segTransactionListData[i]["transactionDate"];
                  if(segTransactionListData[i]["transactionType"]){
          if(segTransactionListData[i]["transactionType"] === kony.retailBanking.globalData.globals.ExternalTransfer)
          {
            segTransactionListData[i]["transactionType"] = kony.retailBanking.globalData.globals.ExternalTransfer;
          }
          if(segTransactionListData[i]["transactionType"] === kony.retailBanking.globalData.globals.TransferMoney)
          {
            segTransactionListData[i]["transactionType"] = kony.retailBanking.globalData.globals.TransferMoney;
          }
          processedRowObj["transactionType"] = segTransactionListData[i]["transactionType"];
        }else{
          processedRowObj["transactionType"] = " ";
        }
        /*if(segTransactionListData[i]["fromNickName"]){
          processedRowObj["fromNickName"] = segTransactionListData[i]["fromNickName"];
        }else{
          processedRowObj["fromNickName"] = " ";
        }*/
        if (segTransactionListData[i]["toAccountName"]) {
                    processedRowObj["toAccountName"] = segTransactionListData[i]["toAccountName"];
                } else {
			   if (segTransactionListData[i]["transactionType"] === kony.retailBanking.globalData.globals.PayBill) 
				      processedRowObj["toAccountName"] = segTransactionListData[i]["payeeNickName"];
					else if(segTransactionListData[i]["transactionType"] === kony.retailBanking.globalData.globals.PayPerson)
                      processedRowObj["toAccountName"] = segTransactionListData[i]["payPersonName"];
                  	
                  else
                     processedRowObj["toAccountName"] = " ";
                }
        processedRowObj["transactionsNotes"] = kony.retailBanking.util.validation.trucateTo(segTransactionListData[i]["transactionsNotes"],35,32,"...");
        if(segTransactionListData[i]["hasDepositImage"] !== "false"){
          processedRowObj["Imgcheck"] = {
            "isVisible": true,
            src :"checkf.png"
          };
        }else{
          if(segTransactionListData[i]["statusDescription"] === kony.retailBanking.globalData.globals.Failed){
            processedRowObj["Imgcheck"] = {
              "isVisible": true,
              src :"failedimage.png"
            }; 
          }else{
            processedRowObj["Imgcheck"] = {
              "isVisible": false,
              src :"failedimage.png"
            }; 
            if(segTransactionListData[i]["frequencyType"] !==undefined && segTransactionListData[i]["frequencyType"] !== kony.retailBanking.globalData.globals.Once) 
            {
              processedRowObj["Imgcheck"] = {
                "isVisible": true,
                src :"recuurencebox.png"
              }; 
            } else
            {
              processedRowObj["Imgcheck"] = {
                "isVisible": false,
                src :"recuurencebox.png"
              };
            }
          }
        }    
        processedSegData.push(processedRowObj);
      }
    }
    frmActivityKA.SegTransactionsKA.widgetDataMap = { 
      Imgcheck : "Imgcheck",
      lblDateKA : "transactionDate",
      lblTransactionTypeKA : "transactionType",
      lblTransactionKA : "transaction",
      lblTransferFromKA : "fromNickName",
      lblTransferToKA : "toAccountName",
      lblAmountKA : "amount",
      lblNotesKA : "transactionsNotes",
    };
    frmActivityKA.SegTransactionsKA.setData(processedSegData);
    frmActivityKA.SegTransactionsKA.isVisible = true;
    frmActivityKA.lblNoRecordsToView.isVisible = false;
  }else{
    frmActivityKA.SegTransactionsKA.isVisible = false;
    frmActivityKA.lblNoRecordsToView.isVisible = true;
  }
      frmActivityKA.flxActivityInnerKA.forceLayout();

}
function fetchAcountsData(accountID){
  var resData = [];
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var options ={    "access": "online",
                "objectName": "RBObjects"
               };
  var headers = {"session_token":kony.retailBanking.globalData.session_token};
  var serviceName = "RBObjects";
  var modelObj = INSTANCE.getModel("Accounts",serviceName,options);
  var dataObject = new kony.sdk.dto.DataObject("Accounts");
  var serviceOptions = {"dataObject":dataObject, "headers":headers};
  modelObj.fetch(serviceOptions, dataSuccessFetchAccount, dataFailureFetchAccount);


  function dataSuccessFetchAccount(response){
    if(response){
      kony.retailBankingKA.AccountsglobalData.accounts = response;
      kony.sdk.mvvm.log.info("meta data fetch response : " + JSON.stringify(response));
      var masterData = [];
      var masterDataElement = [];
      for (var i = 0; i < response.length; i++) 
      {
        var pickListItem;
        masterDataElement = [];
        pickListItem = response[i];
        var key = response[i]["accountID"];
        var value;  
          if(response[i]["nickName"]){
           value = kony.retailBanking.util.validation.trucateTo(response[i]["nickName"],35,32,"...");
        }else{
          var accountNumber = response[i]["accountID"];
          value =  response[i]["accountName"] + accountNumber.substring(accountNumber.length-4, accountNumber.length);
        }                           
        masterDataElement.push(key);
        masterDataElement.push(value);
        masterData.push(masterDataElement);
      }

      frmActivityKA.listAccountDetailsKA.masterData = masterData;
      if(accountID===undefined)
        setAccountDetails(response[0]["accountID"]);
      else
      {
        setAccountDetails(accountID);
      }
      frmActivityKA.show();
    }
  }
  function dataFailureFetchAccount(err){
    kony.print("err"+err);
  }
}//Type your code here

function setAccountDetails(accID){
  var accObj = kony.retailBankingKA.AccountsglobalData.accounts;
  for(var i=0;i<accObj.length;i++){
    if(accID==accObj[i]["accountID"]){
      frmActivityKA.listAccountDetailsKA.selectedKey = accObj[i]["accountID"];
      populateAccountDetails(accObj[i]);
      fetchTransactionList(accObj[i]["accountID"]);
      break;
    }
  }
}

function populateAccountDetails(accDetails){
  var availableBal,currentBal,outstandingBal,paymentTerm,lastStatementBalance,maturityDate,interestRate;
  if(accDetails["availableBalance"]){
    availableBal = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accDetails["availableBalance"]);
    //availableBal = accDetails["availableBalance"];
  }
  if(accDetails["currentBalance"]){
    currentBal = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accDetails["currentBalance"]);
    //currentBal = accDetails["currentBalance"];
  }
  if(accDetails["outstandingBalance"]){
    outstandingBal = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accDetails["outstandingBalance"]);
    //outstandingBal = accDetails["outstandingBalance"];
  }
  if(accDetails["accountType"]=="CreditCard"){
    currentBal = "-"+currentBal;
  }
  if(accDetails["dueDate"]){
    paymentTerm = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(accDetails["dueDate"]);
    // paymentTerm = accDetails["dueDate"];
  }	
  if(accDetails["lastStatementBalance"]){
    //lastStatementBalance = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accDetails["lastStatementBalance"]);
    lastStatementBalance = accDetails["lastStatementBalance"];
  }
  if(accDetails["maturityDate"]){
    maturityDate = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(accDetails["maturityDate"]);
    //maturityDate = accDetails["maturityDate"];
  }
  if(accDetails["interestRate"]){
    interestRate = accDetails["interestRate"] + "%"
  }			
  var accountType = accDetails["accountType"];
  if (accountType === kony.retailBanking.globalData.globals.Checking){
    frmActivityKA.lblavailbalance.text = kony.retailBanking.globalData.globals.AvailableBalance;
    frmActivityKA.lblaccountbalance.text = kony.retailBanking.globalData.globals.CurrentBalance;
    frmActivityKA.availableBalanceAmount.text = availableBal;
    frmActivityKA.accountBalanceAmount.text = currentBal;
  } else if (accountType === kony.retailBanking.globalData.globals.Savings){
    frmActivityKA.lblavailbalance.text = kony.retailBanking.globalData.globals.AvailableBalance;
    frmActivityKA.lblaccountbalance.text = kony.retailBanking.globalData.globals.CurrentBalance;
    frmActivityKA.availableBalanceAmount.text = availableBal;
    frmActivityKA.accountBalanceAmount.text = currentBal;
  } else if (accountType === kony.retailBanking.globalData.globals.CreditCard){
    frmActivityKA.lblavailbalance.text = kony.retailBanking.globalData.globals.PaymentDueDate;
    frmActivityKA.lblaccountbalance.text = kony.retailBanking.globalData.globals.LastStatementBalance;
    frmActivityKA.availableBalanceAmount.text = paymentTerm;
    frmActivityKA.accountBalanceAmount.text = lastStatementBalance;
  }else if (accountType === kony.retailBanking.globalData.globals.Deposit){
    frmActivityKA.lblavailbalance.text = kony.retailBanking.globalData.globals.CurrentBalance;
    frmActivityKA.lblaccountbalance.text = kony.retailBanking.globalData.globals.MaturityDate;
    frmActivityKA.availableBalanceAmount.text = currentBal;
    frmActivityKA.accountBalanceAmount.text = maturityDate;
  } 
  else if (accountType == kony.retailBanking.globalData.globals.Mortgage){
    frmActivityKA.lblavailbalance.text = kony.retailBanking.globalData.globals.OustandingBalance;
    frmActivityKA.lblaccountbalance.text = kony.retailBanking.globalData.globals.InterestRate;
    frmActivityKA.availableBalanceAmount.text = outstandingBal;
    frmActivityKA.accountBalanceAmount.text = interestRate;
  }


}

function fetchAcountsDataforDashboard(){
  var resData = [];
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var options ={    "access": "online",
                "objectName": "RBObjects"
               };
  var headers = {"session_token":kony.retailBanking.globalData.session_token};
  var serviceName = "RBObjects";
  var modelObj = INSTANCE.getModel("Accounts",serviceName,options);
  var dataObject = new kony.sdk.dto.DataObject("Accounts");
  var serviceOptions = {"dataObject":dataObject, "headers":headers};
  modelObj.fetch(serviceOptions, dataSuccessFetchAccount, dataFailureFetchAccount);
  var Cash = 0,CreditDebt = 0;

  function dataSuccessFetchAccount(response){
    if(response){
      kony.retailBankingKA.AccountsglobalData.accounts = response;
      kony.sdk.mvvm.log.info("meta data fetch response : " + JSON.stringify(response));
      var AccountObject = kony.retailBankingKA.AccountsglobalData.accounts;        
      for(var i=0;i<AccountObject.length;i++){
        hBoxForName(AccountObject[i],i); 
      }
      var tempResponse = kony.retailBankingKA.AccountsglobalData.accounts;;
        for(var i =0 ; i< tempResponse.length;i++){
        if(tempResponse[i]["accountType"]==kony.retailBanking.globalData.globals.Savings||tempResponse[i]["accountType"]==kony.retailBanking.globalData.globals.Checking){
          Cash = Cash + parseFloat(tempResponse[i]["availableBalance"]);
        }else if(tempResponse[i]["accountType"]==kony.retailBanking.globalData.globals.CreditCard||tempResponse[i]["accountType"]==kony.retailBanking.globalData.globals.Mortgage){
          CreditDebt = CreditDebt + parseFloat(tempResponse[i]["currentBalance"]);
        }
       	}
        Cash = Cash.toFixed(2);
        CreditDebt = CreditDebt.toFixed(2);
        frmDashboardKA.lblCashOverview.text = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(Cash);
        frmDashboardKA.lblCreditDebtOverview.text = "-"+kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(CreditDebt);
    	fetchcashFlowData();
    }else{
      frmDashboardKA.lblNoRecordsKA.isVisible = true;
    }
	
    navigateToDashboard();
  }
  function dataFailureFetchAccount(err){
    kony.print("err"+err);
  }
}

function navigateToDashboard(){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmDashboardKA");
  var navObject = new kony.sdk.mvvm.NavigationObject();
  navObject.setRequestOptions("segScheduledTransfersDetailsKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  controller.loadDataAndShowForm(navObject);
}

function transactionListScheduled(Data,segmentName){
  var segTransactionListData = Data[segmentName][segmentName].getData();
  var processedSegData = [ ];
  var processedRowObj;
  if(segTransactionListData && segTransactionListData.length>0)
  {
    for(var i in segTransactionListData){
      if(segTransactionListData[i]["isScheduled"]==="true"){
        processedRowObj = {};
        processedRowObj["amount"] = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(segTransactionListData[i]["amount"]);
        
        processedRowObj["transactionDate"] = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(segTransactionListData[i]["transactionDate"]);
        //processedRowObj["transactionDate"] = segTransactionListData[i]["transactionDate"];
        if(segTransactionListData[i]["amount"]<0){
          processedRowObj["transactionId"] = kony.retailBanking.globalData.globals.Debit;
        }else{
          processedRowObj["transactionId"] = kony.retailBanking.globalData.globals.Credit;
        }
        if(segTransactionListData[i]["transactionType"]){
          processedRowObj["transactionType"] = segTransactionListData[i]["transactionType"];
        }else{
          processedRowObj["transactionType"] = " ";
        }
        if(segTransactionListData[i]["fromNickName"]){
          processedRowObj["fromNickName"] = segTransactionListData[i]["fromNickName"];
        }else{
          processedRowObj["fromNickName"] = " ";
        }
        if(segTransactionListData[i]["toAccountName"]){
          processedRowObj["toAccountName"] = segTransactionListData[i]["toAccountName"];
        }else{
          processedRowObj["toAccountName"] = " ";
        }
        processedRowObj["transactionsNotes"] = kony.retailBanking.util.validation.trucateTo(segTransactionListData[i]["transactionsNotes"],35,32,"...");
        var status = segTransactionListData[i]["statusDescription"];   
        if(status !== kony.retailBanking.globalData.globals.Failed) 
        {
          if(segTransactionListData[i]["frequencyType"] !==undefined) 
          {
            segTransactionListData[i]["hasDepositImage"] = {
              "isVisible": true,
              src :"recuurencebox.png"
            }; 
          } else
          {
            segTransactionListData[i]["hasDepositImage"] = {
              "isVisible": false,
              src :"recuurencebox.png"
            };
          }
        }else
        {
          if(segTransactionListData[i]["frequencyType"] !==undefined) 
          {
            segTransactionListData[i]["hasDepositImage"] = {
              "isVisible": false,
              src :"recuurencebox.png"
            };
          }

        }
        if (segTransactionListData[i]["toAccountName"]) {
                    processedRowObj["toAccountName"] = segTransactionListData[i]["toAccountName"];
                } else {
			   if (segTransactionListData[i]["transactionType"] === kony.retailBanking.globalData.globals.PayBill) 
				      processedRowObj["toAccountName"] = segTransactionListData[i]["payeeNickName"];
					else if(segTransactionListData[i]["transactionType"] === kony.retailBanking.globalData.globals.PayPerson)
                      processedRowObj["toAccountName"] = segTransactionListData[i]["payPersonName"];
                  else
                     processedRowObj["toAccountName"] = " ";
                }
        processedSegData.push(processedRowObj);
      }
    }
  }
  Data[segmentName][segmentName].setData(processedSegData);
  return Data;
}

//Used To Navigate to AccountInformation Page
function getAccountInformationPage()
{   
  var currForm = kony.application.getCurrentForm();
	if(currForm != frmInformationKA)
    {
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController("frmInformationKA");
  var navObject = new kony.sdk.mvvm.NavigationObject();
  navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  listController.performAction("navigateTo",["frmInformationKA",navObject]);
	}
}

//used to setInformation
function setAccountInformationData(accountID)
{
  var availableBal,currentBal,outstandingBal,paymentTerm,lastStatementBalance,maturityDate,interestRate;
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController("frmInformationKA");
  var viewModel = listController.getFormModel();
  var accDetails = kony.retailBanking.globalData.accounts.searchAccountById(accountID);
  var controllerContextData = listController.getContextData();
      if(controllerContextData ){
        controllerContextData.setCustomInfo("selectedAccountObj",accDetails);
      }
  if(accDetails["availableBalance"]){
    availableBal = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accDetails["availableBalance"]);
    //availableBal = accDetails["availableBalance"];
  }
  if(accDetails["currentBalance"]){
    currentBal = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accDetails["currentBalance"]);
    //currentBal = accDetails["currentBalance"];
  }
  if(accDetails["outstandingBalance"]){
    outstandingBal = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accDetails["outstandingBalance"]);
    //outstandingBal = accDetails["outstandingBalance"];
  }
  if(accDetails["accountType"]=="CreditCard"){
    currentBal = "-"+currentBal;
  }
  if(accDetails["dueDate"]){
    //paymentTerm = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(accDetails["dueDate"]);
    paymentTerm = accDetails["dueDate"];
  }	
  if(accDetails["lastStatementBalance"]){
    lastStatementBalance = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accDetails["lastStatementBalance"]);
   // lastStatementBalance = accDetails["lastStatementBalance"];
  }
  if(accDetails["maturityDate"]){
    //maturityDate = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(accDetails["maturityDate"]);
    maturityDate = accDetails["maturityDate"];
  }
  if(accDetails["interestRate"]){
    interestRate = accDetails["interestRate"] + "%"
  }
  if(accDetails["minimumDue"]){
      //lastStatementBalance = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accDetails["lastStatementBalance"]);
      accDetails["minimumDue"] = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accDetails["minimumDue"]);
    }
  var accountType = accDetails["accountType"];
  if (accountType === kony.retailBanking.globalData.globals.Checking){
    viewModel.setViewAttributeByProperty("currentBalLabel","text",kony.retailBanking.globalData.globals.AvailableBalance);
    viewModel.setViewAttributeByProperty("availablebalLabel","text",kony.retailBanking.globalData.globals.CurrentBalance);
    viewModel.setViewAttributeByProperty("lblCurrentBalanceKA","text",availableBal);
    viewModel.setViewAttributeByProperty("lblAvilabuleBalanceKA","text",currentBal);
    viewModel.performActionOnView("lblAccountNumberKA","setVisibility",[true]);
    viewModel.performActionOnView("lblInvestedAmountKA","setVisibility",[false]);
    viewModel.performActionOnView("lblOpeneOnKA","setVisibility",[false]);
    viewModel.performActionOnView("lblTermKA","setVisibility",[false]);
    viewModel.performActionOnView("lblMaturityDateKA","setVisibility",[false]);
    viewModel.performActionOnView("lblIntrestRateKA","setVisibility",[false]);
    viewModel.performActionOnView("lblCurrentBalKA","setVisibility",[false]);
    viewModel.performActionOnView("lblAccountNumberTextKA","setVisibility",[true]);
    viewModel.performActionOnView("lblInvestedAmountTestKA","setVisibility",[false]);
    viewModel.performActionOnView("lblOpenedTestKA","setVisibility",[false]);
    viewModel.performActionOnView("lblTermTestKA","setVisibility",[false]);
    viewModel.performActionOnView("lblMaturityTestKA","setVisibility",[false]);
    viewModel.performActionOnView("lblIntrestRateTestKA","setVisibility",[false]);
    viewModel.performActionOnView("lblCurrentBalTestKA","setVisibility",[false]);
    viewModel.setViewAttributeByProperty("lblAccountNumberTextKA","text",accDetails["accountID"]);


  } else if (accountType === kony.retailBanking.globalData.globals.Savings){
    viewModel.setViewAttributeByProperty("currentBalLabel","text",kony.retailBanking.globalData.globals.AvailableBalance);
    viewModel.setViewAttributeByProperty("availablebalLabel","text",kony.retailBanking.globalData.globals.CurrentBalance);
    viewModel.setViewAttributeByProperty("lblCurrentBalanceKA","text",availableBal);
    viewModel.setViewAttributeByProperty("lblAvilabuleBalanceKA","text",currentBal);
    viewModel.setViewAttributeByProperty("lblAvilabuleBalanceKA","text",currentBal);
    viewModel.performActionOnView("lblAccountNumberKA","setVisibility",[true]);
    viewModel.performActionOnView("lblInvestedAmountKA","setVisibility",[false]);
    viewModel.performActionOnView("lblOpeneOnKA","setVisibility",[false]);
    viewModel.performActionOnView("lblTermKA","setVisibility",[false]);
    viewModel.performActionOnView("lblMaturityDateKA","setVisibility",[false]);
    viewModel.performActionOnView("lblIntrestRateKA","setVisibility",[false]);
    viewModel.performActionOnView("lblCurrentBalKA","setVisibility",[false]);
    viewModel.performActionOnView("lblAccountNumberTextKA","setVisibility",[true]);
    viewModel.performActionOnView("lblInvestedAmountTestKA","setVisibility",[false]);
    viewModel.performActionOnView("lblOpenedTestKA","setVisibility",[false]);
    viewModel.performActionOnView("lblTermTestKA","setVisibility",[false]);
    viewModel.performActionOnView("lblMaturityTestKA","setVisibility",[false]);
    viewModel.performActionOnView("lblIntrestRateTestKA","setVisibility",[false]);
    viewModel.performActionOnView("lblCurrentBalTestKA","setVisibility",[false]);
    viewModel.setViewAttributeByProperty("lblAccountNumberTextKA","text",accDetails["accountID"]);
    viewModel.setViewAttributeByProperty("lblAccountNumberKA","text","AccountNumber");

  } else if (accountType === kony.retailBanking.globalData.globals.CreditCard){
    viewModel.setViewAttributeByProperty("currentBalLabel","text",kony.retailBanking.globalData.globals.PaymentDueDate);
    viewModel.setViewAttributeByProperty("availablebalLabel","text",kony.retailBanking.globalData.globals.LastStatementBalance);
    viewModel.setViewAttributeByProperty("lblCurrentBalanceKA","text",kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(paymentTerm));
    viewModel.setViewAttributeByProperty("lblAvilabuleBalanceKA","text",lastStatementBalance);
    viewModel.performActionOnView("lblAccountNumberKA","setVisibility",[true]);
    viewModel.performActionOnView("lblInvestedAmountKA","setVisibility",[true]);
    viewModel.performActionOnView("lblOpeneOnKA","setVisibility",[true]);
    viewModel.performActionOnView("lblTermKA","setVisibility",[true]);
    viewModel.performActionOnView("lblMaturityDateKA","setVisibility",[true]);
    viewModel.performActionOnView("lblIntrestRateKA","setVisibility",[false]);
    viewModel.performActionOnView("lblCurrentBalKA","setVisibility",[false]);
    viewModel.performActionOnView("lblAccountNumberTextKA","setVisibility",[true]);
    viewModel.performActionOnView("lblInvestedAmountTestKA","setVisibility",[true]);
    viewModel.performActionOnView("lblOpenedTestKA","setVisibility",[true]);
    viewModel.performActionOnView("lblTermTestKA","setVisibility",[true]);
    viewModel.performActionOnView("lblMaturityTestKA","setVisibility",[true]);
    viewModel.performActionOnView("lblIntrestRateTestKA","setVisibility",[false]);
    viewModel.performActionOnView("lblCurrentBalTestKA","setVisibility",[false]);
    viewModel.setViewAttributeByProperty("lblAccountNumberKA","text","creditCardNumber");
    viewModel.setViewAttributeByProperty("lblAccountNumberTextKA","text",kony.retailBanking.util.formatingAmount.maskingLastFourDigits(accDetails["creditCardNumber"]));
    viewModel.setViewAttributeByProperty("lblInvestedAmountKA","text",kony.retailBanking.globalData.globals.CurrentBalance);
    viewModel.setViewAttributeByProperty("lblInvestedAmountTestKA","text",currentBal);
    viewModel.setViewAttributeByProperty("lblInvestedAmountKA","text",kony.retailBanking.globalData.globals.CurrentBalance);
    viewModel.setViewAttributeByProperty("lblOpeneOnKA","text",kony.retailBanking.globalData.globals.AvilableCredit);
    viewModel.setViewAttributeByProperty("lblOpenedTestKA","text",availableBal);
    viewModel.setViewAttributeByProperty("lblTermKA","text",kony.retailBanking.globalData.globals.AvailablePoints);
    viewModel.setViewAttributeByProperty("lblTermTestKA","text",accDetails["availablePoints"]);
    viewModel.setViewAttributeByProperty("lblMaturityDateKA","text",kony.retailBanking.globalData.globals.MinimumPaymentDue);
    viewModel.setViewAttributeByProperty("lblMaturityTestKA","text",accDetails["minimumDue"]);

  }else if (accountType === kony.retailBanking.globalData.globals.Deposit){
    viewModel.setViewAttributeByProperty("currentBalLabel","text",kony.retailBanking.globalData.globals.CurrentBalance);
    viewModel.setViewAttributeByProperty("availablebalLabel","text",kony.retailBanking.globalData.globals.MaturityDate);
    viewModel.setViewAttributeByProperty("lblCurrentBalanceKA","text",currentBal);
    viewModel.setViewAttributeByProperty("lblAvilabuleBalanceKA","text",kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(maturityDate));
    viewModel.performActionOnView("lblAccountNumberKA","setVisibility",[true]);
    viewModel.performActionOnView("lblInvestedAmountKA","setVisibility",[true]);
    viewModel.performActionOnView("lblOpeneOnKA","setVisibility",[true]);
    viewModel.performActionOnView("lblTermKA","setVisibility",[true]);
    viewModel.performActionOnView("lblMaturityDateKA","setVisibility",[false]);
    viewModel.performActionOnView("lblIntrestRateKA","setVisibility",[false]);
    viewModel.performActionOnView("lblCurrentBalKA","setVisibility",[false]);
    viewModel.performActionOnView("lblAccountNumberTextKA","setVisibility",[true]);
    viewModel.performActionOnView("lblInvestedAmountTestKA","setVisibility",[true]);
    viewModel.performActionOnView("lblOpenedTestKA","setVisibility",[true]);
    viewModel.performActionOnView("lblTermTestKA","setVisibility",[true]);
    viewModel.performActionOnView("lblMaturityTestKA","setVisibility",[false]);
    viewModel.performActionOnView("lblIntrestRateTestKA","setVisibility",[false]);
    viewModel.performActionOnView("lblCurrentBalTestKA","setVisibility",[false]);
    viewModel.setViewAttributeByProperty("lblAccountNumberKA","text","AccountNumber");
    viewModel.setViewAttributeByProperty("lblAccountNumberTextKA","text",accDetails["accountID"]);
    viewModel.setViewAttributeByProperty("lblInvestedAmountKA","text",kony.retailBanking.globalData.globals.InterestRate);
    viewModel.setViewAttributeByProperty("lblInvestedAmountTestKA","text",interestRate);
    viewModel.setViewAttributeByProperty("lblOpeneOnKA","text",kony.retailBanking.globalData.globals.DateOpened);
    viewModel.setViewAttributeByProperty("lblOpenedTestKA","text",kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(accDetails["openingDate"]));
    viewModel.setViewAttributeByProperty("lblTermKA","text",kony.retailBanking.globalData.globals.Term);
    viewModel.setViewAttributeByProperty("lblTermTestKA","text",accDetails["paymentTerm"]);
  } 
   else if (accountType == kony.retailBanking.globalData.globals.Mortgage){
    viewModel.setViewAttributeByProperty("currentBalLabel","text",kony.retailBanking.globalData.globals.OustandingBalance);
    viewModel.setViewAttributeByProperty("availablebalLabel","text",kony.retailBanking.globalData.globals.InterestRate);
    viewModel.setViewAttributeByProperty("lblCurrentBalanceKA","text",outstandingBal);
    viewModel.setViewAttributeByProperty("lblAvilabuleBalanceKA","text",interestRate);
    viewModel.performActionOnView("lblAccountNumberKA","setVisibility",[true]);
    viewModel.performActionOnView("lblInvestedAmountKA","setVisibility",[true]);
    viewModel.performActionOnView("lblOpeneOnKA","setVisibility",[true]);
    viewModel.performActionOnView("lblTermKA","setVisibility",[true]);
    viewModel.performActionOnView("lblMaturityDateKA","setVisibility",[false]);
    viewModel.performActionOnView("lblIntrestRateKA","setVisibility",[false]);
    viewModel.performActionOnView("lblCurrentBalKA","setVisibility",[false]);
    viewModel.performActionOnView("lblAccountNumberTextKA","setVisibility",[true]);
    viewModel.performActionOnView("lblInvestedAmountTestKA","setVisibility",[true]);
    viewModel.performActionOnView("lblOpenedTestKA","setVisibility",[true]);
    viewModel.performActionOnView("lblTermTestKA","setVisibility",[true]);
    viewModel.performActionOnView("lblMaturityTestKA","setVisibility",[false]);
    viewModel.performActionOnView("lblIntrestRateTestKA","setVisibility",[false]);
    viewModel.performActionOnView("lblCurrentBalTestKA","setVisibility",[false]);
    viewModel.setViewAttributeByProperty("lblAccountNumberKA","text","AccountNumber");
    viewModel.setViewAttributeByProperty("lblAccountNumberTextKA","text",accDetails["accountID"]);
    viewModel.setViewAttributeByProperty("lblInvestedAmountKA","text",kony.retailBanking.globalData.globals.InterestRate);
    viewModel.setViewAttributeByProperty("lblInvestedAmountTestKA","text",interestRate);
    viewModel.setViewAttributeByProperty("lblOpeneOnKA","text",kony.retailBanking.globalData.globals.DateOpened);
    viewModel.setViewAttributeByProperty("lblOpenedTestKA","text",kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(accDetails["openingDate"]));
    viewModel.setViewAttributeByProperty("lblTermKA","text",kony.retailBanking.globalData.globals.EmiRate);
    viewModel.setViewAttributeByProperty("lblTermTestKA","text", accDetails["minimumDue"]);
  }
}

// Used to get AccountSummaryPage
function getAccountSummaryPage()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController("frmAccountSummaryKA");
  var navObject = new kony.sdk.mvvm.NavigationObject();
  navObject.setRequestOptions("segSavingsKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  listController.performAction("navigateTo",["frmAccountSummaryKA",navObject]);
}

//Used to Set All Accounts
function setAllAccountsListData(data,savingsSeg)
{
  var transacData = data[savingsSeg]; 
  var savingsSegData = [];
  var checkingSegData = [];
  var depositSegData = [];
  var creditSegData = [];
  var motrageSegData = [];
  for(var i in transacData)
  {   
    var accountType = transacData[i]["accountType"];
    if(transacData[i]["nickName"] == "")
    {
      transacData[i]["nickName"] = transacData[i]["accountName"] + transacData[i]["accountID"].slice(-4);
    }
    if(transacData[i]["availableBalance"]){
      //availableBal = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accDetails["availableBalance"]);
      transacData[i]["availableBalance"] = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(transacData[i]["availableBalance"]);
    }
	if(transacData[i]["creditCardNumber"]){
      //availableBal = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accDetails["availableBalance"]);
      transacData[i]["creditCardNumber"] = kony.retailBanking.util.formatingAmount.maskingLastFourDigits(transacData[i]["creditCardNumber"]);
    }
    if(transacData[i]["currentBalance"]){
      //currentBal = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accDetails["currentBalance"]);
      transacData[i]["currentBalance"] = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(transacData[i]["currentBalance"]);
    }
    if(transacData[i]["outstandingBalance"]){
      //outstandingBal = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accDetails["outstandingBalance"]);
      transacData[i]["outstandingBalance"] = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(transacData[i]["outstandingBalance"]);
    }
    if(transacData[i]["accountType"]=="CreditCard"){
      transacData[i]["currentBalance"] =  "-" + transacData[i]["currentBalance"];
    }
    if(transacData[i]["dueDate"]){
      //paymentTerm = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(accDetails["dueDate"]);
      transacData[i]["dueDate"] =kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(transacData[i]["dueDate"]);
    }	
    if(transacData[i]["lastStatementBalance"]){
      //lastStatementBalance = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accDetails["lastStatementBalance"]);
      transacData[i]["lastStatementBalance"] = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(transacData[i]["lastStatementBalance"]);
    }
    if(transacData[i]["maturityDate"]){
      //maturityDate = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(accDetails["maturityDate"]);
      transacData[i]["maturityDate"] = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(transacData[i]["maturityDate"]);
    }
    if(transacData[i]["openingDate"]){
      //maturityDate = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(accDetails["maturityDate"]);
      transacData[i]["openingDate"] = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(transacData[i]["openingDate"]);
    }
    if(transacData[i]["interestRate"]){
      transacData[i]["interestRate"] = transacData[i]["interestRate"] + "%"
    }
	if(transacData[i]["minimumDue"]){
      //lastStatementBalance = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accDetails["lastStatementBalance"]);
      transacData[i]["minimumDue"] = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(transacData[i]["minimumDue"]);
    }

    if (accountType === kony.retailBanking.globalData.globals.Checking)
    {
      checkingSegData.push( transacData[i]);
    }else if (accountType === kony.retailBanking.globalData.globals.Savings)
    {
      if(transacData[i]["nickName"] == "")
      {
        transacData[i]["nickName"] = transacData[i]["accountName"] + transacData[i]["accountID"].slice(-4);
      }
      savingsSegData.push( transacData[i]);
    }else if (accountType === kony.retailBanking.globalData.globals.CreditCard){
      creditSegData.push( transacData[i]);

    }else if (accountType === kony.retailBanking.globalData.globals.Deposit)
    {
      depositSegData.push( transacData[i]);

    }else if (accountType === kony.retailBanking.globalData.globals.Mortgage)
    {
      motrageSegData.push( transacData[i]);
    }
  }
  return [savingsSegData,checkingSegData,creditSegData,depositSegData,motrageSegData];
}

//Used To Set Visibulity OF Flex And Segments
function setAccountsUiContent(data)
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController("frmAccountSummaryKA");
  var viewModel = listController.getFormModel();
  frmAccountSummaryKA.flxSubMenu.lblAccountSummaryKA.skin = "skn192980LatoBold100";
  frmAccountSummaryKA.flxSubMenu.lblTransactionsKA.skin = "slLabelLATOBOLDKA";
  frmAccountSummaryKA.flxSubMenu.lblSearchKA.skin = "slLabelLATOBOLDKA";
  frmAccountSummaryKA.flxSubMenu.lblStatementsKA.skin = "slLabelLATOBOLDKA";
  frmAccountSummaryKA.flxSubMenu.lblInformationKA.skin = "slLabelLATOBOLDKA";
  //viewModel.performActionOnView("lblAccountSummaryKA","skin","skn192980LatoBold100");
  if(data.segMotrageKA.segMotrageKA.getData().length === 0)
  {
    viewModel.performActionOnView("flxMotrageKA","setVisibility",[false]);
    viewModel.performActionOnView("segMotrageKA","setVisibility",[false]);
    viewModel.performActionOnView("flxMortageHeaderKA","setVisibility",[false]);

  }
  if(data.segSavingsKA.segSavingsKA.getData().length === 0)
  {
    viewModel.performActionOnView("flxSavingsKA","setVisibility",[false]);
    viewModel.performActionOnView("segSavingsKA","setVisibility",[false]);
    viewModel.performActionOnView("flxSavingsHeaderKA","setVisibility",[false]);

  }
  if(data.segCheckAccountKA.segCheckAccountKA.getData().length === 0)
  {
    viewModel.performActionOnView("flxCheckAccountKA","setVisibility",[false]);
    viewModel.performActionOnView("segCheckAccountKA","setVisibility",[false]);
    viewModel.performActionOnView("flxCheckingsHeaderKA","setVisibility",[false]);
  }
  if(data.segCreditCardKA.segCreditCardKA.getData().length === 0)
  {
    viewModel.performActionOnView("flxCreditCardKA","setVisibility",[false]);
    viewModel.performActionOnView("segCreditCardKA","setVisibility",[false]);
    viewModel.performActionOnView("flxCreditCardHeaderKA","setVisibility",[false]);

  }
  if(data.segDepositKA.segDepositKA.getData().length === 0)
  {
    viewModel.performActionOnView("flxDepositKA","setVisibility",[false]);
    viewModel.performActionOnView("segDepositKA","setVisibility",[false]);
    viewModel.performActionOnView("flxDepositHeaderKA","setVisibility",[false]);

  }
}

//used to get AccountStatementsPage
function getStatementsPage()
{
  var accounts = kony.retailBanking.globalData.accounts.getAccountsData();
  setAccountsDataToStatementsPage();
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController("frmAccountStatementsKA");
  var navObject = new kony.sdk.mvvm.NavigationObject();
  navObject.setRequestOptions("segAccountStatementsKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"accountID": accounts[0]["accountID"]}});
  listController.performAction("navigateTo",["frmAccountStatementsKA",navObject]);
}

//Used to set Accounts In AccountsStatementPage
function setAccountsDataToStatementsPage()
{
  var accounts = kony.retailBanking.globalData.accounts.getAccountsData();
  if(accounts){
    var masterData = [];
    var masterDataElement = [];
    for (var i = 0; i < accounts.length; i++) 
    {
      var pickListItem,value;
      masterDataElement = [];
      pickListItem = accounts[i];
      var key = accounts[i]["accountID"];
      if(accounts[i]["nickName"] !== "")
      {
        value = accounts[i]["nickName"];
      }else
      {
        value = accounts[i]["accountName"]+accounts[i]["accountID"].slice(-4);;
      }

      masterDataElement.push(key);
      masterDataElement.push(value);
      masterData.push(masterDataElement);
    }
    frmAccountStatementsKA.ListBoxAccountsKA.masterData =  masterData;
    setAccountBalancesToStatementsPage(accounts[0]["accountID"]);
  }
}

////used to set Account Values to StatementsPage
function setAccountBalancesToStatementsPage(accountID)
{
  var availableBal,currentBal,outstandingBal,paymentTerm,lastStatementBalance,maturityDate,interestRate;
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController("frmAccountStatementsKA");
  var accDetails = kony.retailBanking.globalData.accounts.searchAccountById(accountID);
  var viewModel = listController.getFormModel();
  var accountType = accDetails["accountType"];
  if(accDetails["availableBalance"]){
    availableBal = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accDetails["availableBalance"]);
    //availableBal = accDetails["availableBalance"];
  }
  if(accDetails["currentBalance"]){
    currentBal = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accDetails["currentBalance"]);
    //currentBal = accDetails["currentBalance"];
  }
  if(accDetails["outstandingBalance"]){
    //outstandingBal = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accDetails["outstandingBalance"]);
    outstandingBal =  kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accDetails["outstandingBalance"]);
  }
  if(accDetails["accountType"]=="CreditCard"){
    currentBal = "-"+currentBal;
  }
  if(accDetails["dueDate"]){
    paymentTerm = accDetails["dueDate"];
   // paymentTerm = accDetails["dueDate"];
  }	
  if(accDetails["lastStatementBalance"]){
    //lastStatementBalance = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accDetails["lastStatementBalance"]);
    lastStatementBalance = accDetails["lastStatementBalance"];
  }
  if(accDetails["maturityDate"]){
    maturityDate = accDetails["maturityDate"];
    //maturityDate = accDetails["maturityDate"];
  }
  if(accDetails["interestRate"]){
    interestRate = accDetails["interestRate"];
  }
  if (accountType === kony.retailBanking.globalData.globals.Checking){
    viewModel.setViewAttributeByProperty("availablebalLabel","text",kony.retailBanking.globalData.globals.AvailableBalance);
    viewModel.setViewAttributeByProperty("currentBalLabel","text",kony.retailBanking.globalData.globals.CurrentBalance);
    viewModel.setViewAttributeByProperty("lblAvilabuleBalanceKA","text",availableBal);
    viewModel.setViewAttributeByProperty("lblCurrentBalanceKA","text",currentBal);
  } else if (accountType === kony.retailBanking.globalData.globals.Savings){
    viewModel.setViewAttributeByProperty("availablebalLabel","text",kony.retailBanking.globalData.globals.AvailableBalance);
    viewModel.setViewAttributeByProperty("currentBalLabel","text",kony.retailBanking.globalData.globals.CurrentBalance);
    viewModel.setViewAttributeByProperty("lblAvilabuleBalanceKA","text",availableBal);
    viewModel.setViewAttributeByProperty("lblCurrentBalanceKA","text",currentBal);
  }else if (accountType === kony.retailBanking.globalData.globals.CreditCard){
    viewModel.setViewAttributeByProperty("currentBalLabel","text",kony.retailBanking.globalData.globals.PaymentDueDate);
    viewModel.setViewAttributeByProperty("availablebalLabel","text",kony.retailBanking.globalData.globals.LastStatementBalance);
    viewModel.setViewAttributeByProperty("lblCurrentBalanceKA","text",paymentTerm);
    viewModel.setViewAttributeByProperty("lblAvilabuleBalanceKA","text",lastStatementBalance);
  }
  else if (accountType === kony.retailBanking.globalData.globals.Deposit){
    viewModel.setViewAttributeByProperty("currentBalLabel","text",kony.retailBanking.globalData.globals.CurrentBalance);
    viewModel.setViewAttributeByProperty("availablebalLabel","text",kony.retailBanking.globalData.globals.MaturityDate);
    viewModel.setViewAttributeByProperty("lblCurrentBalanceKA","text",currentBal);
    viewModel.setViewAttributeByProperty("lblAvilabuleBalanceKA","text",maturityDate);
  }
  else if (accountType == kony.retailBanking.globalData.globals.Mortgage){
    viewModel.setViewAttributeByProperty("currentBalLabel","text",kony.retailBanking.globalData.globals.OustandingBalance);
    viewModel.setViewAttributeByProperty("availablebalLabel","text",kony.retailBanking.globalData.globals.InterestRate);
    viewModel.setViewAttributeByProperty("lblCurrentBalanceKA","text",outstandingBal);
    viewModel.setViewAttributeByProperty("lblAvilabuleBalanceKA","text",interestRate);
  }
}

//Used to getSelectedAccountStatementsByListBox
function getSelectedAccountStateMentPageByListBox()
{ 
  var accountID = frmAccountStatementsKA.ListBoxAccountsKA.selectedKey;
  frmAccountStatementsKA.forceLayout();
  setAccountBalancesToStatementsPage(accountID);
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController("frmAccountStatementsKA");
  var navObject = new kony.sdk.mvvm.NavigationObject();
  navObject.setRequestOptions("segAccountStatementsKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"accountID": accountID}});
  listController.performAction("navigateTo",["frmAccountStatementsKA",navObject]);
}

function getTransactionsPageFromSummaryPage(segementName)
{
  var accDetails;
  switch(segementName)
  {
    case "segSavingsKA": 
      accDetails = frmAccountSummaryKA.segSavingsKA.selectedItems[0];
      break;   
    case "segCheckAccountKA": 
      accDetails = frmAccountSummaryKA.segCheckAccountKA.selectedItems[0];
      break;   
    case "segCreditCardKA": 
      accDetails = frmAccountSummaryKA.segCreditCardKA.selectedItems[0];
      break;   
    case "segDepositKA": 
      accDetails = frmAccountSummaryKA.segDepositKA.selectedItems[0];
      break;   
    case "segMotrageKA": 
      accDetails = frmAccountSummaryKA.segMotrageKA.selectedItems[0];
      break;   
  }
  fetchAcountsData(accDetails.primaryKeyValueMap.accountID);
  //frmActivityKA.show();
}

//used to get AccountStatementsPage
function checkAcceptStatementsPage()
{
  var isTnCAcceptedAccounts=kony.retailBanking.globalData.globals.userObj.acntStatementTCaccepted;
  if (isTnCAcceptedAccounts == "false"){
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var listController = INSTANCE.getFormController("frmAcceptStatementsKA");
    var navObject = new kony.sdk.mvvm.NavigationObject();
    navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"infoType": "AccountStatement"}});
    listController.performAction("navigateTo",["frmAcceptStatementsKA",navObject]);
  }else
  {
    getStatementsPage();
  }
}

//clikced Accept Button in AccountsTermsAndCOnditions Page.
function  updateAcceptTermnsnCofAccounts()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var options ={    "access": "online",
                "objectName": "RBObjects"
               };
  var headers = {"session_token":kony.retailBanking.globalData.session_token};
  var serviceName = "RBObjects";
  var modelObj = INSTANCE.getModel("User",serviceName,options);
  var record = {};
  record["areAccountStatementTermsAccepted"] = true;
  var dataObject = new kony.sdk.dto.DataObject("User",record);
  var requestOptions = {"dataObject":dataObject, "headers":headers};
  modelObj.update(requestOptions, updateaccountsTnCSuccess, updateaccountsTnCError);
}

function updateaccountsTnCSuccess(response)
{
  setUserObj();
  getStatementsPage();
}

function updateaccountsTnCError(err)
{
  customErrorCallback(err);
}

function downLoadAccountStatements(rowIndex)
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController("frmAccountStatementsKA");
  var viewModel = listController.getFormModel();
  var selRecord;
  selRecord  = viewModel.getViewAttributeByProperty("segAccountStatementsKA","data")[rowIndex];
  window.open(selRecord.StatementLink).click();
}

function formatStatementsData(data,segAccountStatementsKA)
{
  var transacData = data[segAccountStatementsKA]; 
  for(var i in transacData)
  {   
    transacData[i]["StatementMonth"] =kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(transacData[i]["StatementMonth"]);
    transacData[i]["accountID"] = "Download";
  }
  return transacData;
}
  function getRecentTransactionDetailsPage()
  {
    var transactionType =   frmActivityKA.SegTransactionsKA.selectedItems[0].transactionType;
    switch(transactionType)
    {
      case kony.retailBanking.globalData.globals.ExternalTransfer: 
        transferKA();
        break;   
      case kony.retailBanking.globalData.globals.TransferMoney: 
        transferKA();
        break; 
      case kony.retailBanking.globalData.globals.PayBill:
        navigateToRecentBillPayDetailsfromTransactions("frmActivityKA","SegTransactionsKA");
        break;
      case kony.retailBanking.globalData.globals.PayPerson:
        repeatRecentP2P();
        break;
    }
  }
