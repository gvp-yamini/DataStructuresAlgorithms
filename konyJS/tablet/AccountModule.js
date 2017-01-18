function onclickEditInfo(){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var frmName = kony.application.getCurrentForm().id;
    var listController = INSTANCE.getFormController(frmName);
    listController.performAction("getAccountInfoEdit");
  
}

function openStatementURL(){
	     var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
	     var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
	     var viewModel = controller.getFormModel();
         var selRecord = viewModel.getViewAttributeByProperty("segAccountStatementsKA", "selectedItems")[0];
         kony.application.openURL(selRecord.StatementLink);
}

function accountsInfoPreShowskins(){
      var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
	  var controller = INSTANCE.getFormController("accountDetail");
      var controllerContextData = controller.getContextData();
      if( controllerContextData && controllerContextData.getCustomInfo("selectedAccountObj")){
          var accountData = controllerContextData.getCustomInfo("selectedAccountObj");
          var accountType = accountData["accountType"];
        }
  if (accountType === kony.retailBanking.globalData.globals.Checking){
      accountInfo.skin = accountCheckingBkg;
      accountInfo.titleBarAccountInfo.skin = accountTypeChecking;
      accountInfo.accountDetailsContainer.isVisible = false;
      accountInfo.flxaccountdetailsfordeposits.isVisible = false;
      accountInfo.flxaccountdetailsSavings.isVisible = true;
    } else if (accountType === kony.retailBanking.globalData.globals.Savings){
      accountInfo.skin = accountSavingsBkg;
      accountInfo.titleBarAccountInfo.skin = accountTypeSavings;
      accountInfo.accountDetailsContainer.isVisible = false;
      accountInfo.flxaccountdetailsfordeposits.isVisible = false;
      accountInfo.flxaccountdetailsSavings.isVisible = true;
    } else if (accountType === kony.retailBanking.globalData.globals.CreditCard){
      accountInfo.skin = accountCreditBkg;
      accountInfo.titleBarAccountInfo.skin = accountTypeCredit;
      accountInfo.accountDetailsContainer.isVisible = true;
      accountInfo.flxaccountdetailsfordeposits.isVisible = false;
      accountInfo.flxaccountdetailsSavings.isVisible = false;
    }else if (accountType === kony.retailBanking.globalData.globals.Deposit){
      accountInfo.skin= accountDepositBkg;
      accountInfo.titleBarAccountInfo.skin = accountTypeCurrent;
      accountInfo.accountDetailsContainer.isVisible = false;
      accountInfo.flxaccountdetailsfordeposits.isVisible = true;
      accountInfo.flxaccountdetailsSavings.isVisible = false;
    } 
    else if (accountType == kony.retailBanking.globalData.globals.Mortgage){
      accountInfo.skin= accountMortageBkg;
      accountInfo.titleBarAccountInfo.skin = accountTypeMortage;
      accountInfo.accountDetailsContainer.isVisible = false;
      accountInfo.flxaccountdetailsfordeposits.isVisible = true;
      accountInfo.flxaccountdetailsSavings.isVisible = false;
  }
  
  	accountInfo.successIcon.opacity = 0;
 	accountInfo.successImage.opacity = 0;
}

function accountsInfoEditPreShowskins(){
      var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
	  var controller = INSTANCE.getFormController("accountDetail");
      var controllerContextData = controller.getContextData();
      if( controllerContextData && controllerContextData.getCustomInfo("selectedAccountObj")){
          var accountData = controllerContextData.getCustomInfo("selectedAccountObj");
          var accountType = accountData["accountType"];
        }
  if (accountType === kony.retailBanking.globalData.globals.Checking){
      accountInfoEdit.skin = accountCheckingBkg;
      accountInfoEdit.titleBarAccountInfo.skin = accountTypeChecking;
      accountInfoEdit.accountDetailsContainer.isVisible = false;
      accountInfoEdit.flxaccountdetailsfordeposits.isVisible = false;
      accountInfoEdit.flxaccountdetailsSavings.isVisible = true;
    } else if (accountType === kony.retailBanking.globalData.globals.Savings){
      accountInfoEdit.skin = accountSavingsBkg;
      accountInfoEdit.titleBarAccountInfo.skin = accountTypeSavings;
      accountInfoEdit.accountDetailsContainer.isVisible = false;
      accountInfoEdit.flxaccountdetailsfordeposits.isVisible = false;
      accountInfoEdit.flxaccountdetailsSavings.isVisible = true;
    } else if (accountType === kony.retailBanking.globalData.globals.CreditCard){
      accountInfoEdit.skin = accountCreditBkg;
      accountInfoEdit.titleBarAccountInfo.skin = accountTypeCredit;
      accountInfoEdit.accountDetailsContainer.isVisible = true;
      accountInfoEdit.flxaccountdetailsfordeposits.isVisible = false;
      accountInfoEdit.flxaccountdetailsSavings.isVisible = false;
    }else if (accountType === kony.retailBanking.globalData.globals.Deposit){
      accountInfoEdit.skin=accountDepositBkg;
      accountInfoEdit.titleBarAccountInfo.skin = accountTypeCurrent;
      accountInfoEdit.accountDetailsContainer.isVisible = false;
      accountInfoEdit.flxaccountdetailsfordeposits.isVisible = true;
      accountInfoEdit.flxaccountdetailsSavings.isVisible = false;
    } 
    else if (accountType == kony.retailBanking.globalData.globals.Mortgage){
      accountInfoEdit.skin=accountMortageBkg;
      accountInfoEdit.titleBarAccountInfo.skin = accountTypeMortage;
      accountInfoEdit.accountDetailsContainer.isVisible = false;
      accountInfoEdit.flxaccountdetailsfordeposits.isVisible = true;
      accountInfoEdit.flxaccountdetailsSavings.isVisible = false;
  }
  
  	accountInfoEdit.successIcon.opacity = 0;
 	accountInfoEdit.successImage.opacity = 0;
}

function populatingAccountsInfoScreen(setAccountNickname){
      var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
      var controller = INSTANCE.getFormController("accountDetail");
      var navObject = new kony.sdk.mvvm.NavigationObject();
      var accountDetailscontroller = INSTANCE.getFormController("accountDetail");
      var controllerContextData = accountDetailscontroller.getContextData();   
      if( controllerContextData && controllerContextData.getCustomInfo("selectedAccountObj")){
          var accountData = controllerContextData.getCustomInfo("selectedAccountObj");
		  if(accountData["nickName"]){
          accountInfo.accountNicknameTextfield.text = accountData["nickName"];
          }
          accountInfo.accountNicknameTextfield.setEnabled(false);
          if(accountData["creditCardNumber"]){
          accountInfo.accountNumberLabel.text = kony.retailBanking.util.formatingAmount.maskingLastFourDigits(accountData["creditCardNumber"]);
          }
		  if(accountData["currentBalance"]){
           var creditCurrBal = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accountData["currentBalance"]);
           if(creditCurrBal.indexOf('-')==-1){
             accountInfo.CopyaccountNumberLabel0e1c2ed08e25c42.text = "-" + creditCurrBal;
           }else{
             accountInfo.CopyaccountNumberLabel0e1c2ed08e25c42.text = creditCurrBal;
           }
		  }
		  if(accountData["availableBalance"]){
		  accountInfo.CopyaccountNumberLabel045821e897a8646.text = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accountData["availableBalance"]);
		  }
		  if(accountData["dueDate"]){
		  accountInfo.CopyaccountNumberLabel014bda555f8c040.text = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(accountData["dueDate"]);
          }
        var availablePoints = accountData["availablePoints"];
        if(availablePoints.indexOf('.')==-1){
		    accountInfo.routingNumberLabel.text  = availablePoints;
          }else{
            accountInfo.routingNumberLabel.text = availablePoints.substring(0,availablePoints.indexOf('.'));
          }
         // frmAccountInfoKA.interestRateLabel.text = accountData["interestRate"];
		 if(accountData["lastStatementBalance"]){
          accountInfo.interestRateLabel.text = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accountData["lastStatementBalance"]);
		 }
          if(accountData["minimumDue"]){ 
		  accountInfo.interestEarnedLabel.text = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accountData["minimumDue"]);
          }
          if(accountData["availableBalance"]){
          accountInfo.CopyaccountNumberLabel0b9e42672fcff47.text = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accountData["availableBalance"]);
          }
		  if(accountData["currentBalance"]){
		  accountInfo.CopyroutingNumberLabel07e049f0450604c.text = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accountData["currentBalance"]);
          }
		  accountInfo.CopyinterestRateLabel0cf90d54edd014c.text = accountData["accountID"];
          accountInfo.CopyaccountNumberLabel036c71ac511b84d.text = accountData["accountID"];
          accountInfo.CopyroutingNumberLabel06e90c7d5900842.text = accountData["interestRate"]+"%";
		  if(accountData["currentBalance"]){
          accountInfo.CopyinterestRateLabel09f06e1600f0e43.text = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accountData["currentBalance"]);
          }
		  accountInfo.CopyinterestRateLabel0b14fb4af446e45.text = accountData["paymentTerm"];
		  if(accountData["openingDate"]){
          accountInfo.CopyinterestEarnedLabel00b76261e56e741.text = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(accountData["openingDate"]);
          }
		  if(accountData["maturityDate"]){
		  accountInfo.CopyinterestEarnedLabel0daf983bec94d4c.text = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(accountData["maturityDate"]);
          }
		}
  kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
 // frmAccountInfoKA.show();
  //openModal(accountInfo.accountInfoWrapper, "accountInfoWrapper");
}
function populatingAccountsInfoEditScreen(){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
	  var controller = INSTANCE.getFormController("accountDetail");
      var navObject = new kony.sdk.mvvm.NavigationObject();
      var accountDetailsINfoEditcontroller = INSTANCE.getFormController("accountDetail");
      var controllerContextData = accountDetailsINfoEditcontroller.getContextData();   
      if( controllerContextData && controllerContextData.getCustomInfo("selectedAccountObj")){
      var accountData = controllerContextData.getCustomInfo("selectedAccountObj");
          /*frmAccountInfoEditKA.routingNumberLabel.text = "8300399378";
          frmAccountInfoEditKA.interestEarnedLabel.text = "$5.24";
          frmAccountInfoEditKA.interestRateLabel.text = "0.25%";
          frmAccountInfoEditKA.CopyaccountNumberLabel0b9e42672fcff47.text = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accountData["availableBalance"]);
          frmAccountInfoEditKA.CopyroutingNumberLabel07e049f0450604c.text = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accountData["currentBalance"]);
          frmAccountInfoEditKA.CopyinterestRateLabel0cf90d54edd014c.text = accountData["accountID"];
          frmAccountInfoEditKA.CopyaccountNumberLabel036c71ac511b84d.text = accountData["accountID"];
          frmAccountInfoEditKA.CopyroutingNumberLabel06e90c7d5900842.text = accountData["interestRate"];
          frmAccountInfoEditKA.CopyinterestRateLabel09f06e1600f0e43.text = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accountData["currentBalance"]);
          frmAccountInfoEditKA.CopyinterestRateLabel0b14fb4af446e45.text = "24 months";
          frmAccountInfoEditKA.CopyinterestEarnedLabel00b76261e56e741.text = "11/20/2015";
          frmAccountInfoEditKA.CopyinterestEarnedLabel0daf983bec94d4c.text = "11/20/2017";*/
          if(accountData["nickName"]){
      
            accountInfoEdit.accountNicknameTextfield1.text = accountData["nickName"];
    
           }
		  if(accountData["creditCardNumber"]){
		  accountInfoEdit.accountNumberLabel.text = kony.retailBanking.util.formatingAmount.maskingLastFourDigits(accountData["creditCardNumber"]);
          }
          if(accountData["currentBalance"]){ 
          var creditCurrBal = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accountData["currentBalance"]);
		  if(creditCurrBal.indexOf('-')==-1){
             accountInfoEdit.CopyaccountNumberLabel0e1c2ed08e25c42.text = "-" + creditCurrBal;
           }else{
             accountInfoEdit.CopyaccountNumberLabel0e1c2ed08e25c42.text = creditCurrBal;
           }
          }
		  if(accountData["availableBalance"]){
		  accountInfoEdit.CopyaccountNumberLabel045821e897a8646.text = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accountData["availableBalance"]);
		  }
		  if(accountData["dueDate"]){
		  accountInfoEdit.CopyaccountNumberLabel014bda555f8c040.text = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(accountData["dueDate"]);
          }
          var availablePoints = accountData["availablePoints"];
          if(availablePoints.indexOf('.')==-1){
		    accountInfoEdit.routingNumberLabel.text = availablePoints;
          }else{
            accountInfoEdit.routingNumberLabel.text = availablePoints.substring(0,availablePoints.indexOf('.'));
          }
         // frmAccountInfoKA.interestRateLabel.text = accountData["interestRate"];
          if(accountData["lastStatementBalance"]){
          accountInfoEdit.interestRateLabel.text = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accountData["lastStatementBalance"]);
          }
          if(accountData["minimumDue"]){
          accountInfoEdit.interestEarnedLabel.text = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accountData["minimumDue"]);
          }
          if(accountData["availableBalance"]){
          accountInfoEdit.CopyaccountNumberLabel0b9e42672fcff47.text = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accountData["availableBalance"]);
          }
		  if(accountData["currentBalance"]){
		  accountInfoEdit.CopyroutingNumberLabel07e049f0450604c.text = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accountData["currentBalance"]);
          }
		  accountInfoEdit.CopyinterestRateLabel0cf90d54edd014c.text = accountData["accountID"];
          accountInfoEdit.CopyaccountNumberLabel036c71ac511b84d.text = accountData["accountID"];
          accountInfoEdit.CopyroutingNumberLabel06e90c7d5900842.text = accountData["interestRate"]+"%";
		  if(accountData["currentBalance"]){
          accountInfoEdit.CopyinterestRateLabel09f06e1600f0e43.text = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accountData["currentBalance"]);
		  }
          accountInfoEdit.CopyinterestRateLabel0b14fb4af446e45.text = accountData["paymentTerm"];
		  if(accountData["openingDate"]){
          accountInfoEdit.CopyinterestEarnedLabel00b76261e56e741.text = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(accountData["openingDate"]);
		  }
		  if(accountData["maturityDate"]){
          accountInfoEdit.CopyinterestEarnedLabel0daf983bec94d4c.text = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(accountData["maturityDate"]);
		  }
	  }
}

function accountListsetting(Data,segmentName){
    var segAccountListData = Data[segmentName][segmentName].getData();
    var availableBal,currBal,outstandingBal;
    if(segAccountListData && segAccountListData.length>0)
    {
      var processedSegData = [ ];
      var processedRowObj;
      for(var i in segAccountListData){
        processedRowObj = {};
        if(segAccountListData[i]["nickName"]){
        processedRowObj["nickName"] = kony.retailBanking.util.validation.trucateTo(segAccountListData[i]["nickName"],35,32,"...");
        }else{
          var accountNumber = segAccountListData[i]["accountID"];
          processedRowObj["nickName"] =  segAccountListData[i]["accountName"] + accountNumber.substring(accountNumber.length-4, accountNumber.length);
        }
        if(segAccountListData[i]["availableBalance"]){
        availableBal = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(segAccountListData[i]["availableBalance"]);
        }
        if(segAccountListData[i]["currentBalance"]){
        currBal = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(segAccountListData[i]["currentBalance"]);
        }
        if(segAccountListData[i]["outstandingBalance"]){
          outstandingBal = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(segAccountListData[i]["outstandingBalance"]);
        }
          if(segAccountListData[i]["accountType"]=="CreditCard"){
          currBal = "-"+currBal;
        }
        var accountType = segAccountListData[i]["accountType"];
if (accountType === kony.retailBanking.globalData.globals.Checking){
          processedRowObj["availableBalance"] = {
          "isVisible": true,
          skin :getSknlblAmount(segAccountListData[i]["accountType"]),
          text: availableBal
        };
        processedRowObj["currentBalance"] = {
          "isVisible": false,
          skin :getSknlblAmount(segAccountListData[i]["accountType"]),
          text: currBal
        };
        processedRowObj["outstandingBalance"] = {
          "isVisible": false,
          skin :getSknlblAmount(segAccountListData[i]["accountType"]),
          text: outstandingBal
        };
         processedRowObj["accountType"] = i18n_availableBalance;
    } else if (accountType === kony.retailBanking.globalData.globals.Savings){
                  processedRowObj["availableBalance"] = {
          "isVisible": true,
          skin :getSknlblAmount(segAccountListData[i]["accountType"]),
          text: availableBal
        };
        processedRowObj["currentBalance"] = {
          "isVisible": false,
          skin :getSknlblAmount(segAccountListData[i]["accountType"]),
          text: currBal
        };
        processedRowObj["outstandingBalance"] = {
          "isVisible": false,
          skin :getSknlblAmount(segAccountListData[i]["accountType"]),
          text: outstandingBal
        };
         processedRowObj["accountType"] = i18n_availableBalance;
    } else if (accountType === kony.retailBanking.globalData.globals.CreditCard){
                  processedRowObj["availableBalance"] = {
          "isVisible": false,
          skin :getSknlblAmount(segAccountListData[i]["accountType"]),
          text: availableBal
        };
        processedRowObj["currentBalance"] = {
          "isVisible": true,
          skin :getSknlblAmount(segAccountListData[i]["accountType"]),
          text: currBal
        };
        processedRowObj["outstandingBalance"] = {
          "isVisible": false,
          skin :getSknlblAmount(segAccountListData[i]["accountType"]),
          text: outstandingBal
        };
         processedRowObj["accountType"] = i18n_currentBalance;
    }else if (accountType === kony.retailBanking.globalData.globals.Deposit){
                 processedRowObj["availableBalance"] = {
          "isVisible": false,
          skin :getSknlblAmount(segAccountListData[i]["accountType"]),
          text: availableBal
        };
        processedRowObj["currentBalance"] = {
          "isVisible": true,
          skin :getSknlblAmount(segAccountListData[i]["accountType"]),
          text: currBal
        };
        processedRowObj["outstandingBalance"] = {
          "isVisible": false,
          skin :getSknlblAmount(segAccountListData[i]["accountType"]),
          text: outstandingBal
        };
         processedRowObj["accountType"] = i18n_currentBalance;
    } 
    else if (accountType == kony.retailBanking.globalData.globals.Mortgage){
           processedRowObj["availableBalance"] = {
          "isVisible": false,
          skin :getSknlblAmount(segAccountListData[i]["accountType"]),
          text: availableBal
        };
        processedRowObj["currentBalance"] = {
          "isVisible": false,
          skin :getSknlblAmount(segAccountListData[i]["accountType"]),
          text: currBal
        };
        processedRowObj["outstandingBalance"] = {
          "isVisible": true,
          skin :getSknlblAmount(segAccountListData[i]["accountType"]),
          text: outstandingBal
        };
         processedRowObj["accountType"] = i18n_outStandingBalance;
  }
         processedRowObj["sknColor"] = {
           skin:getSkinColor(segAccountListData[i]["accountType"])
        }
        processedSegData.push(processedRowObj);
      }
      Data[segmentName][segmentName].setData(processedSegData);
    }else{
      
    }
  return Data;
}
function transactionListformatting(Data,segmentName){
  var segTransactionListData = Data[segmentName][segmentName].getData();
    if(segTransactionListData && segTransactionListData.length>0)
    {
      var processedSegData = [ ];
      var processedRowObj;
       for(var i in segTransactionListData){
        processedRowObj = {};
        processedRowObj["description"] = kony.retailBanking.util.validation.trucateTo(segTransactionListData[i]["description"],35,32,"...");
        processedRowObj["amount"] = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(segTransactionListData[i]["amount"]);
		processedRowObj["transactionDate"] = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(segTransactionListData[i]["transactionDate"]);
		/*if(segTransactionListData[i]["checkImage"]=="cheque"){
			 processedRowObj["Imgcheck"] = {"src":"checkf.png","isVisible":true};
        }else{
			processedRowObj["Imgcheck"] = {"src":"checkf.png","isVisible":false};
		}*/
        processedSegData.push(processedRowObj);
      }
      Data[segmentName][segmentName].setData(processedSegData);
    }
   return Data;
}
/*
Termns & conditions opens for the First time in Accounts Module and Deposit Module flow
*/
function firstTimeVisitAccountTermsForm(){
  alert("entering into acountstatem,enttermns")
   var isTnCAcceptedAccounts=kony.retailBanking.globalData.globals.userObj.acntStatementTCaccepted;
 
   if (isTnCAcceptedAccounts == "false"){
    
    var scopeObj = this;
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var options ={    "access": "online",
                    "objectName": "RBObjects"
                 };
    var headers = {"session_token":kony.retailBanking.globalData.session_token};
    var serviceName = "RBObjects";
    var modelObj = INSTANCE.getModel("Informationcontent",serviceName,options);
    var dataObject = new kony.sdk.dto.DataObject("Informationcontent");
    var serviceOptions = {"dataObject":dataObject,"headers":headers,"queryParams":{"infoType":"AccountStatement"}};
    modelObj.fetch(serviceOptions, tnCAccountsSuccess, tnCAccountsError);
  } 
  else{
     var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
//       var controller = INSTANCE.getFormController("frmacntstatementsKA");
//       var navObject = new kony.sdk.mvvm.NavigationObject();
//       var AccountDetailscontroller = INSTANCE.getFormController("frmAccountDetailKA");
//       var controllerContextData = AccountDetailscontroller.getContextData();
     var controller = INSTANCE.getFormController("accountsLanding");
      var navObject = new kony.sdk.mvvm.NavigationObject();
      var AccountDetailscontroller = INSTANCE.getFormController("accountDetail");
      var controllerContextData = AccountDetailscontroller.getContextData();
      if( controllerContextData && controllerContextData.getCustomInfo("selectedAccountObj")){
          var accountData = controllerContextData.getCustomInfo("selectedAccountObj");
          var accountId = accountData["accountID"];
          navObject.setRequestOptions("segAccountStatementsKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"accountID": accountId}});
          controller.performAction("loadDataAndShowForm",[navObject]);
      }
    
  }
}

function tnCAccountsSuccess(response)
{
    //alert(response[0]);
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("accountDetail");
    var controllerContextData=controller.getContextData();
    var accStatementDetail=  controllerContextData.getCustomInfo("selectedAccountObj");
    frmTermsAndConditionsAccountsKA.titleBarWrapper.skin = getSkinColor(accStatementDetail["accountType"]);
    frmTermsAndConditionsAccountsKA.richTexttermsandconditionsAccounts.text=response[0].infoContent;
    //frmTermsAndConditionsAccountsKA.show();
  openModal(frmTermsAndConditionsAccountsKA.contactUsWrapper, "contactUsWrapper");
  
}

function tnCAccountsError(err)
{
 //kony.print(err); 
customErrorCallback(err);
}

function updateAcceptTermnsnCofAccounts(){
  // var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
//     var frmName = kony.application.getCurrentForm().id;
//     var listController = INSTANCE.getFormController(frmName);
//     listController.performAction("getAccountStatementList");
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
      var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
      var controller = INSTANCE.getFormController("accountsLanding");
      var navObject = new kony.sdk.mvvm.NavigationObject();
      var AccountDetailscontroller = INSTANCE.getFormController("accountDetail");
      var controllerContextData = AccountDetailscontroller.getContextData();
      if( controllerContextData && controllerContextData.getCustomInfo("selectedAccountObj")){
          var accountData = controllerContextData.getCustomInfo("selectedAccountObj");
          var accountId = accountData["accountID"];
          navObject.setRequestOptions("segAccountStatementsKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"accountID": accountId}});
          controller.performAction("navigateTo",["frmAccountStatementsKA",navObject]);
//       var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
//       var controller = INSTANCE.getFormController("frmacntstatementsKA");
//       var navObject = new kony.sdk.mvvm.NavigationObject();
      
// 	  var AccountDetailscontroller = INSTANCE.getFormController("frmAccountDetailKA");
//       var controllerContextData = AccountDetailscontroller.getContextData();
//       if( controllerContextData && controllerContextData.getCustomInfo("selectedAccountObj")){
//           var accountData = controllerContextData.getCustomInfo("selectedAccountObj");
//           var accountId = accountData["accountID"];
//           navObject.setRequestOptions("segAccountStatementsKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"accountID": accountId}});
          //controller.performAction("loadDataAndShowForm",[navObject]);
      }
     // navObject.setRequestOptions("contactsegment",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  
     //getAccountSatements("frmacntstatementsKA");
}

function updateaccountsTnCError(err)
{
 //kony.print(err); 
customErrorCallback(err);
}

/*
AccountSatement segment Populate Data
*/
function accountListstatement(Data,stateSeg){
  var statementData = Data[stateSeg][stateSeg].getData();

  if(statementData && statementData.length>0)
    {
      var processedSegData = [ ];
      var processedRowObj;
      for(var i in statementData){
        processedRowObj = {};
		 var tempDate = kony.retailBanking.util.formatingDate.getISODateTimeKA(statementData[i]["StatementMonth"], kony.retailBanking.util.BACKEND_DATE_FORMAT);
 		 processedRowObj["StatementMonth"] = (tempDate instanceof Date)? tempDate.format('F d, Y') : "";
         processedRowObj["StatementDescription"] = statementData[i]["StatementDescription"];
         processedRowObj["StatementLink"] = statementData[i]["StatementLink"];
        processedSegData.push(processedRowObj);
      }
      Data[stateSeg][stateSeg].setData(processedSegData);
    }
  return  Data ;                               
}
  
  /*
  This is used for header skin mapping from service as accounttype to Static form TermsAndCond PreShow
  */
  
//   function accountStatTermnsPreShow(){
//     //if(gblfrmName == "Account OverView"){
//        var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
//    var controller = INSTANCE.getFormController("frmAccountDetailKA");
//    var controllerContextData=controller.getContextData();
//   //if( controllerContextData && controllerContextData.getCustomInfo("selectedAccountObj")){
//      var accStatementDetail=  controllerContextData.getCustomInfo("selectedAccountObj");
//  	frmTermsAndConditionsKA.titleBarWrapper.skin = getSkinColor(accStatementDetail["accountType"]);
    //frmTermsAndConditionsKA.skin = getSkinColorForBg(accStatementDetail["accountType"]);
    //frmTermsAndConditionsKA.androidTitleBar.skin = getSkinColor(accStatementDetail["accountType"]);
  //   frmTermsAndConditionsKA.iosTitleBar.skin=getSkinColor(accStatementDetail["accountType"]);
   
    // }
      
//     }else{
//       frmTermsAndConditionsKA.titleBarWrapper.skin = skncontainerBkgNone;
//     }
  
	
 // }
/*
header skin for accountDetail
*/
function accountStatementDetailPreShow(){
     var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
     var controller = INSTANCE.getFormController("frmAccountDetailKA");
     var controllerContextData=controller.getContextData();
  //if( controllerContextData && controllerContextData.getCustomInfo("selectedAccountObj")){
     var accStatementDetailPDF=  controllerContextData.getCustomInfo("selectedAccountObj");
     frmacntstatementdetailsKA.titleBarAccountInfo.skin = getSkinColor(accStatementDetailPDF["accountType"]);
    frmacntstatementdetailsKA.skin = getSkinColorForBg(accStatementDetailPDF["accountType"]);
   // frmacntstatementdetailsKA.flxAndroidTittleBarKA.skin = getSkinColor(accStatementDetailPDF["accountType"]);
    //frmacntstatementdetailsKA.iosTitleBar.skin=getSkinColor(accStatementDetailPDF["accountType"]);
   
}
/* 
prepopulate the skin for accountSatement
*/
function prepopulateAccountStatements(currentForm){
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var listController = INSTANCE.getFormController(currentForm);
	    var controllerContextData= listController.getContextData();
  		kony.print(controllerContextData);
        if( controllerContextData && controllerContextData.getCustomInfo("selectedAccountObj")){
           var accStatements =  controllerContextData.getCustomInfo("selectedAccountObj");
            frmacntstatementsKA.titleBarAccountInfo.skin = getSkinColor(accStatements["accountType"]);
			frmacntstatementsKA.skin = getSkinColorForBg(accStatements["accountType"]);
        }
}

function navigateToAccInfo(frmForm,toForm){
  	  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
	  var controller = INSTANCE.getFormController(frmForm);
      var controllerContextData = controller.getContextData();
      if( controllerContextData && controllerContextData.getCustomInfo("selectedAccountObj")){
          var accountData = controllerContextData.getCustomInfo("selectedAccountObj");
          var accountId = accountData["accountID"];
          var datamodel = new kony.sdk.mvvm.DataModel;
          //datamodel.setPrimaryKeyValueMap({"accountID": accountId});
          var navigationObject = new kony.sdk.mvvm.NavigationObject;
          navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
          navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"accountID": accountId}});
          controller.performAction("navigateTo",[toForm,navigationObject]);
        }
      
}

function navigateToAccInfoEdit(frmForm,toForm){
      var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
	  var controller = INSTANCE.getFormController("accountDetail");
      var controllerContextData = controller.getContextData();
      if( controllerContextData && controllerContextData.getCustomInfo("selectedAccountObj")){
          var accountData = controllerContextData.getCustomInfo("selectedAccountObj");
          var accountId = accountData["accountID"];
          var datamodel = new kony.sdk.mvvm.DataModel;
          //datamodel.setPrimaryKeyValueMap({"accountID": accountId});
          var navigationObject = new kony.sdk.mvvm.NavigationObject;
          navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
          navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"accountID": accountId}});
          
          controller.performAction("navigateTo",[toForm,navigationObject]);
        
      }
}

function navigateToDetails(fromForm,toForm,segName){
	  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
	  var controller = INSTANCE.getFormController(fromForm);
    var viewModel = controller.getFormModel();
    var index = viewModel.getViewAttributeByProperty(segName, "selectedRowIndex");
    var selectedRecord = getSelectedRecord(index[1],fromForm,segName);
  // navigationObject1 is related to accountDetail controller to accountInfo
    var navigationObject1 = controller && controller.getContextData();
     navigationObject1.setCustomInfo("selectedAccountObj",selectedRecord);
  
  // navigationObject is related to onclick segment of transaction to populate data on transactdetail screen
    var navigationObject = new kony.sdk.mvvm.NavigationObject;
    navigationObject.setCustomInfo("selectedAccountObj",selectedRecord);
	  var accountId = selectedRecord["accountID"];
	  var datamodel = new kony.sdk.mvvm.DataModel;
	  navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
    navigationObject.setRequestOptions("transactionSegment",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"accountID": accountId}});
	  controller.performAction("navigateTo",[toForm,navigationObject]);
}

function getSelectedRecord(index,formName,segmentName){
        var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var listController = INSTANCE.getFormController(formName);
	    var controllerContextData= listController.getContextData();
       if( controllerContextData && controllerContextData.getCustomInfo(segmentName)){
          var segData = controllerContextData.getCustomInfo(segmentName);
		  return segData[index];
        }else{
          return;
       }
}

function populateAccountDetailsinAccountDetails(currentForm){
        var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var listController = INSTANCE.getFormController(currentForm);
	    var controllerContextData= listController.getContextData();
        if( controllerContextData && controllerContextData.getCustomInfo("selectedAccountObj")){
           var accDetails =  controllerContextData.getCustomInfo("selectedAccountObj");
 		   accountDetail.skin = getSkinColorForBg(accDetails["accountType"]);
           accountDetail.accountDetailsOverview.skin = getSkinColor(accDetails["accountType"]);
           accountDetail.titleBarAccountDetails.skin = getSkinColor(accDetails["accountType"]);
          if(accDetails["nickName"]){
          accountDetail.accountDetailsHeader.text = accDetails["nickName"];
        }else{
          var accountNumber = accDetails["accountID"];
          accountDetail.accountDetailsHeader.text =  accDetails["accountName"] + accountNumber.substring(accountNumber.length-4, accountNumber.length);
        }
           //accountDetail.accountDetailsTime.text = kony.retailBanking.globalData.globals.refreshTimeLabel;
           var availableBal,currentBal,outstandingBal,paymentTerm,lastStatementBalance,maturityDate,interestRate;
		    if(accDetails["availableBalance"]){
        availableBal = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accDetails["availableBalance"]);
        }
        if(accDetails["currentBalance"]){
        currentBal = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accDetails["currentBalance"]);
        }
        if(accDetails["outstandingBalance"]){
          outstandingBal = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accDetails["outstandingBalance"]);
        }
          if(accDetails["accountType"]=="CreditCard"){
          currentBal = "-"+currentBal;
        }
        if(accDetails["dueDate"]){
			paymentTerm = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(accDetails["dueDate"]);
        }	
        if(accDetails["lastStatementBalance"]){
			lastStatementBalance = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accDetails["lastStatementBalance"]);
		}
        if(accDetails["maturityDate"]){
			maturityDate = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(accDetails["maturityDate"]);
        }
        if(accDetails["interestRate"]){
			interestRate = accDetails["interestRate"] + "%"
		}			
          var accountType = accDetails["accountType"];
          if (accountType === kony.retailBanking.globalData.globals.Checking){
            accountDetail.lblavailbalance.text = kony.retailBanking.globalData.globals.AvailableBalance;
            accountDetail.lblaccountbalance.text = kony.retailBanking.globalData.globals.CurrentBalance;
			accountDetail.availableBalanceAmount.text = availableBal;
           accountDetail.accountBalanceAmount.text = currentBal;
    } else if (accountType === kony.retailBanking.globalData.globals.Savings){
         accountDetail.lblavailbalance.text = kony.retailBanking.globalData.globals.AvailableBalance;
         accountDetail.lblaccountbalance.text = kony.retailBanking.globalData.globals.CurrentBalance;
		 accountDetail.availableBalanceAmount.text = availableBal;
         accountDetail.accountBalanceAmount.text = currentBal;
    } else if (accountType === kony.retailBanking.globalData.globals.CreditCard){
         accountDetail.lblavailbalance.text = kony.retailBanking.globalData.globals.PaymentDueDate;
         accountDetail.lblaccountbalance.text = kony.retailBanking.globalData.globals.LastStatementBalance;
		 accountDetail.availableBalanceAmount.text = paymentTerm;
         accountDetail.accountBalanceAmount.text = lastStatementBalance;
    }else if (accountType === kony.retailBanking.globalData.globals.Deposit){
         accountDetail.lblavailbalance.text = kony.retailBanking.globalData.globals.CurrentBalance;
         accountDetail.lblaccountbalance.text = kony.retailBanking.globalData.globals.MaturityDate;
		 accountDetail.availableBalanceAmount.text = currentBal;
         accountDetail.accountBalanceAmount.text = maturityDate;
    } 
    else if (accountType == kony.retailBanking.globalData.globals.Mortgage){
         accountDetail.lblavailbalance.text = kony.retailBanking.globalData.globals.OustandingBalance;
         accountDetail.lblaccountbalance.text = kony.retailBanking.globalData.globals.InterestRate;
		 accountDetail.availableBalanceAmount.text = outstandingBal;
         accountDetail.accountBalanceAmount.text = interestRate;
  }
          
       if(accDetails["accountType"] == kony.retailBanking.globalData.globals.Deposit || accDetails["accountType"] == kony.retailBanking.globalData.globals.Mortgage ){
            accountDetail.btnaccountstatements.isVisible = false;
            accountDetail.accountDetailsOverview.height = "600dp";
            accountDetail.accountDetailsTransactions.top = "190dp";
         }
        else {
            accountDetail.btnaccountstatements.isVisible = true;
            accountDetail.accountDetailsOverview.height = "600dp";
            accountDetail.accountDetailsTransactions.top = "240dp";
           } 
        }
}

function navigateToTransactionDetailsAccounts(fromForm,toForm,segName){
   var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController(fromForm);
  var viewModel = controller.getFormModel();
  var index = viewModel.getViewAttributeByProperty(segName, "selectedRowIndex");
  var response,tempDate;
  //frmRecentTransactionDetailsKA.lblseletedIndex.text=index[1];
  var selectedTransactionRecord = getSelectedRecord(index[1],fromForm,segName);
  var DataTemp={};
  for(var key in selectedTransactionRecord){
  if(key == "amount"){
  DataTemp[key] = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(selectedTransactionRecord[key]);
  }else if(key == "transactionDate"){
  tempDate = kony.retailBanking.util.formatingDate.getISODateTimeKA(selectedTransactionRecord[key], kony.retailBanking.util.BACKEND_DATE_FORMAT);
       DataTemp[key] = (tempDate instanceof Date)? tempDate.format('F d, Y') : "";
  }else{
    DataTemp[key] = selectedTransactionRecord[key];
  }
  }
  if(selectedTransactionRecord.transactionType != "Deposit"){
    var navigationObject = new kony.sdk.mvvm.NavigationObject();
  navigationObject.setCustomInfo("selectedTransactionObj",DataTemp); 
  navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  controller.performAction("navigateTo",[toForm,navigationObject]);
  }else{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController("accountDetail");
  var navigationObject = listController.getContextData();
    var accDetails =  navigationObject.getCustomInfo("selectedAccountObj");
  frmRecentDepositKA.skin = getSkinColorForBg(accDetails.accountType);
  frmRecentDepositKA.titleBarWrapper.skin = getSkinColor(accDetails.accountType);
  navigationObject.setCustomInfo("selDeposit",DataTemp);
  recentDepositPreshow();
  }
}


function navigateToTransactionDetailsAccountsTablet(fromForm,toForm,segName){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController(fromForm);
  var viewModel = controller.getFormModel();
  var index = viewModel.getViewAttributeByProperty(segName, "selectedRowIndex");
  var response,tempDate;
  //frmRecentTransactionDetailsKA.lblseletedIndex.text=index[1];
  var selectedTransactionRecord = getSelectedRecord(index[1],fromForm,segName);
  var DataTemp={};
  for(var key in selectedTransactionRecord){
  if(key == "amount"){
  	DataTemp[key] = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(selectedTransactionRecord[key]);
  }
  else if(key == "transactionDate"){
    DataTemp[key] = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(selectedTransactionRecord[key]);
  }
  else{
      DataTemp[key] = selectedTransactionRecord[key];
    }
  }
  if(selectedTransactionRecord.transactionType != "Deposit"){
  	settingDataForTransactionDetails(DataTemp,fromForm);
  }
  else{
    recentDepositPreshow(fromForm,DataTemp)
  }
}

function settingDataForTransactionDetails(data,fromForm){
  var transObject = [];
  var userAgent = kony.os.userAgent();
  transObject.push(data);
  var transactionName,transactionType,btnText,transactionFrom,transactionNotes;
  try{
     if(data.transactionId){
        accountTransactionDetails.transactionId.text = data.transactionId;
      }
  	 if(data.transactionType){
        accountTransactionDetails.transactionType.text = data.transactionType;
      }
  	 if(data.amount){
        accountTransactionDetails.transactionAmount.text = data.amount;
      }
     if(data.transactionDate){
        accountTransactionDetails.transactionDate.text = data.transactionDate;
      }
      if(data.fromNickName)
      {
        accountTransactionDetails.transactionFrom.text = data.fromNickName;
      }else
      {			
        accountTransactionDetails.transactionFrom.text =  data.fromAccountType+"-"+data.fromAccountNumber.slice(-4);
      }
  	  accountTransactionDetails.lblNotesLabelKA.text = "Notes ";
      transactionNotes = (data.transactionsNotes) ? data.transactionsNotes:"";
      accountTransactionDetails.transactionNotes.text = transactionNotes;
     /* if(data.transactionsNotes){
        accountTransactionDetails.transactionNotes.text = transactionNotes;
      }else{
        accountTransactionDetails.transactionNotes.text = "";
      }*/
      switch(data.transactionType)
      {
        case kony.retailBanking.globalData.globals.PayBill     : 
          accountTransactionDetails.lblP2PContactKA.setVisibility(false);
          accountTransactionDetails.transactionName.text = data.payeeNickName; 
          accountTransactionDetails.transactionDate.text =kony.i18n.getLocalizedString("i18n.transfers.BillPaymentTo");
          accountTransactionDetails.repeatTransactionButton.text = kony.i18n.getLocalizedString("i18n.transfer.repeatBillPay");
          accountTransactionDetails.flxNotes.setVisibility(true);
          break;
        case kony.retailBanking.globalData.globals.PayPerson   :
            accountTransactionDetails.lblP2PContactKA.setVisibility(true);
          if(data.payPersonPhone){
            accountTransactionDetails.lblP2PContactKA.text = data.payPersonPhone;
          }
          if(data.payPersonName){
             accountTransactionDetails.transactionName.text = data.payPersonName;
          }
          accountTransactionDetails.transactionDate.text =kony.i18n.getLocalizedString("i18n.transfers.P2PTransferTo");
          accountTransactionDetails.repeatTransactionButton.text = kony.i18n.getLocalizedString("i18n.transfers.RepeatTransfer");
          accountTransactionDetails.flxNotes.setVisibility(true);
          break;
        case kony.retailBanking.globalData.globals.TransferMoney :
          accountTransactionDetails.lblP2PContactKA.setVisibility(false);
           accountTransactionDetails.transactionName.text = data.toAccountName+"-"+data.toAccountNumber;
          accountTransactionDetails.transactionDate.text =kony.i18n.getLocalizedString("i18n.transfers.TransferTo");
          accountTransactionDetails.repeatTransactionButton.text = kony.i18n.getLocalizedString("i18n.transfers.RepeatTransfer");
          accountTransactionDetails.flxNotes.setVisibility(true);
          break;
        case kony.retailBanking.globalData.globals.ExternalTransfer : 
          accountTransactionDetails.lblP2PContactKA.setVisibility(false);
          accountTransactionDetails.transactionName.text =  data.ExternalAccountNumber;
          accountTransactionDetails.transactionDate.text =kony.i18n.getLocalizedString("i18n.transfers.TransferTo");
          accountTransactionDetails.repeatTransactionButton.text = kony.i18n.getLocalizedString("i18n.transfers.RepeatTransfer");
          accountTransactionDetails.flxNotes.setVisibility(true);
          break;
      }
      if(data.isScheduled==="false")
          {
			  accountTransactionDetails.flxEditScheduleTransactionsKA.setVisibility(false);
            //commenting out specific phone code(header)
            /*if(userAgent === "iPhone")
            {
              formModel.setViewAttributeByProperty("transferPayTitleLabel","text","Recent Transactions ");
            }
            else
            {
              formModel.setViewAttributeByProperty("androidTitleLabel","text","Recent Transactions ");
            }*/
            accountTransactionDetails.lblTransactionDateKA.text = kony.i18n.getLocalizedString("i18n.transfers.TransactionDate");
            // edit code
            //formModel.performActionOnView("btnEditKA","setVisibility",[false]);    
           // accountTransactionDetails.btnEditKA.setVisibility(false);
            accountTransactionDetails.flexRecurrence.setVisibility(false);
            accountTransactionDetails.lblTransactionDateValueKA.text =  data.transactionDate;
            switch(data.transactionType)
            {
              case kony.retailBanking.globalData.globals.PayBill     : 
                accountTransactionDetails.repeatTransactionButton.text = kony.i18n.getLocalizedString("i18n.transfer.repeatBillPay");
                break;
              case kony.retailBanking.globalData.globals.PayPerson   : 
                accountTransactionDetails.repeatTransactionButton.text = kony.i18n.getLocalizedString("i18n.transfers.RepeatTransfer");
                break;
              case kony.retailBanking.globalData.globals.TransferMoney : 
                accountTransactionDetails.repeatTransactionButton.text = kony.i18n.getLocalizedString("i18n.transfers.RepeatTransfer");
                break;
              case kony.retailBanking.globalData.globals.ExternalTransfer : 
                accountTransactionDetails.repeatTransactionButton.text = kony.i18n.getLocalizedString("i18n.transfers.RepeatTransfer");
                break;
            }
          }
  		else
          {
			  accountTransactionDetails.flxEditScheduleTransactionsKA.setVisibility(true);
           	//commenting out specific phone code(header)
            /*if(kony.retailBanking.globalData.deviceInfo.isIphone())
            {
              formModel.setViewAttributeByProperty("transferPayTitleLabel","text","Scheduled Transactions ");
            }
            else
            {
              formModel.setViewAttributeByProperty("androidTitleLabel","text","Scheduled Transactions ");
            }*/
            accountTransactionDetails.lblTransactionDateKA.text = "Scheduled For";
            //formModel.performActionOnView("btnEditKA","setVisibility",[true]);
          //  accountTransactionDetails.btnEditKA.setVisibility(true);
             accountTransactionDetails.flxNotes.setVisibility(true);
            accountTransactionDetails.lblTransactionDateValueKA.text = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(data.scheduledDate);
            switch(data.transactionType)
            {
              case kony.retailBanking.globalData.globals.TransferMoney :
                accountTransactionDetails.flexRecurrence.setVisibility(true);
                accountTransactionDetails.flxNotes.setVisibility(true);
                accountTransactionDetails.lblReccurrenceValueKA.setVisibility(true);
                accountTransactionDetails.lblReccurrenceValueKA.text = data.frequencyType;
                 if(data.numberOfRecurrences !== undefined && data.numberOfRecurrences !== "" &&data.numberOfRecurrences !== "0")
                {
                  accountTransactionDetails.lblReccurrenceNumberKA.setVisibility(true);
                   accountTransactionDetails.lblReccurrenceNumberKA.text = kony.i18n.getLocalizedString("i18n.login.next") +data.numberOfRecurrences + "Times";
                }
                else if(data.frequencyStartDate !== undefined && data.frequencyStartDate !== "")
                {
                  var tempFreqStartDate = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(data.frequencyStartDate);
                  var tempFreqEndDate = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(data.frequencyEndDate);
                   accountTransactionDetails.lblReccurrenceNumberKA.setVisibility(true);
                  accountTransactionDetails.lblReccurrenceNumberKA.text = tempFreqStartDate +"to" +tempFreqEndDate;
                }else{
                  accountTransactionDetails.lblReccurrenceNumberKA.setVisibility(false);
                }
                break;
              case kony.retailBanking.globalData.globals.ExternalTransfer :
                accountTransactionDetails.flexRecurrence.setVisibility(true);
                accountTransactionDetails.flxNotes.setVisibility(true);
                accountTransactionDetails.lblReccurrenceValueKA.text = data.frequencyType;           
                if(data.numberOfRecurrences !== undefined && data.numberOfRecurrences !== "" &&data.numberOfRecurrences !== "0")
                {
                  accountTransactionDetails.lblReccurrenceNumberKA.setVisibility(true);
                  accountTransactionDetails.lblReccurrenceNumberKA.text = kony.i18n.getLocalizedString("i18n.login.next") +data.numberOfRecurrences + "Times";
                }else if(data.frequencyStartDate !== undefined && data.frequencyStartDate !== "")
                 {
                  var tempFreqStartDate = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(data.frequencyStartDate);
                  var tempFreqEndDate = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(data.frequencyEndDate);
                  accountTransactionDetails.lblReccurrenceNumberKA.setVisibility(true);
                  accountTransactionDetails.lblReccurrenceNumberKA.text = tempFreqStartDate +"to" +tempFreqEndDate;
                }else{
                  accountTransactionDetails.lblReccurrenceNumberKA.setVisibility(false);
                }
                break;
              case kony.retailBanking.globalData.globals.PayBill :
                 accountTransactionDetails.flexRecurrence.setVisibility(false);
                  accountTransactionDetails.lblReccurrenceValueKA.text = "Once a Week";  
                 accountTransactionDetails.lblReccurrenceNumberKA.text = "Next 5 Times";  
                accountTransactionDetails.flxNotes.setVisibility(true);
                break;
              case kony.retailBanking.globalData.globals.PayPerson   : 
                accountTransactionDetails.flexRecurrence.setVisibility(false);
                accountTransactionDetails.lblReccurrenceValueKA.text = "Once a Week";  
                 accountTransactionDetails.lblReccurrenceNumberKA.text = "Next 5 Times";  
                 accountTransactionDetails.flxNotes.setVisibility(true);
                break;
            }
            switch(data.transactionType)
            {
               case kony.retailBanking.globalData.globals.PayBill     :
                 accountTransactionDetails.repeatTransactionButton.text = kony.i18n.getLocalizedString("i18n.transfers.CancelBillPay");
                accountTransactionDetails.btnEditKA.text = kony.i18n.getLocalizedString("i18n.common.edit")+" "+kony.i18n.getLocalizedString("i18n.messages.billPay");
                break;
              case kony.retailBanking.globalData.globals.PayPerson   : 
                accountTransactionDetails.repeatTransactionButton.text = kony.i18n.getLocalizedString("i18n.common.cancel") + " "+kony.i18n.getLocalizedString("i18n.transfers.ScheduledTransfer");
                accountTransactionDetails.btnEditKA.text = kony.i18n.getLocalizedString("i18n.common.edit")+ " "+kony.i18n.getLocalizedString("i18n.transfers.ScheduledTransfer");
                break;
              case kony.retailBanking.globalData.globals.TransferMoney : 
               accountTransactionDetails.repeatTransactionButton.text = kony.i18n.getLocalizedString("i18n.common.cancel")+ " "+kony.i18n.getLocalizedString("i18n.transfers.ScheduledTransfer");
                accountTransactionDetails.btnEditKA.text = kony.i18n.getLocalizedString("i18n.common.edit")+ " "+kony.i18n.getLocalizedString("i18n.transfers.ScheduledTransfer");
                break;
              case kony.retailBanking.globalData.globals.ExternalTransfer : 
               accountTransactionDetails.repeatTransactionButton.text = kony.i18n.getLocalizedString("i18n.common.cancel")+ " "+kony.i18n.getLocalizedString("i18n.transfers.ScheduledTransfer");
                accountTransactionDetails.btnEditKA.text = kony.i18n.getLocalizedString("i18n.common.edit")+ " "+kony.i18n.getLocalizedString("i18n.transfers.ScheduledTransfer");
                break;
            }

          }
    }
    catch(e){
      kony.print(e);
    }
  if(fromForm == "accountsLanding"){
     accountTransactionDetails.flxEditScheduleTransactionsKA.setVisibility(false);
    accountTransactionDetails.repeatTransactionContainer.setVisibility(false);
 	onTransactionSegmentRowClick(); 
  } 
  else if(fromForm == "frmTransferPayLandingKA"){
    accountTransactionDetails.repeatTransactionContainer.setVisibility(true);
    addRightPanel(accountTransactionDetails.accountTransactionWrapper,"accountTransactionWrapper"); 
  }
}

function paintHeaderInRecentTransaction(){
	var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
      var controller = INSTANCE.getFormController("accountDetail");
   	 var controllerContextData=controller.getContextData();
     var accDetails =  controllerContextData.getCustomInfo("selectedAccountObj");
 	 frmRecentTransactionDetailsKA.skin = getSkinColorForBg(accDetails.accountType);
     frmRecentTransactionDetailsKA.titleBarWrapper.skin = getSkinColor(accDetails.accountType);
}

function resetPaintedHeaderInRecentTransaction(){
    frmRecentTransactionDetailsKA.skin = "mainGradient";
	//frmRecentTransactionDetailsKA.skin = "sknmainGradient";
     frmRecentTransactionDetailsKA.titleBarWrapper.skin = "skncontainerBkgNone";
}

function openStatementURLTablet(){
	   var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
	   var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
	   var viewModel = controller.getFormModel();
       var selRecord = viewModel.getViewAttributeByProperty("segAccountStatementsKA", "selectedItems")[0];
       kony.application.openURL(selRecord.StatementLink);
}

// AccountInfo Call

var ph;
//var phNum="";
function alertcall(){
  
    // ph = "284-123-1234";
     //phNum="284-123-1233";
 // var msg;
    var selRow = accountInfo.contactSegmentList.selectedIndex[1];
   if(selRow == 0)
	{
    ph = "284-123-1234";
	}else {
  	 ph="284-123-1233";
}
     kony.ui.Alert({
            "message": ph,
            "alertType": constants.ALERT_TYPE_CONFIRMATION,
            "alertTitle": i18n_Call,
            "yesLabel": i18n_Call,
            "noLabel": i18n_cancel,
            "alertIcon": "phone_icon_inactive.png",
            "alertHandler": userResponse
        }, {
            "iconPosition": constants.ALERT_ICON_POSITION_LEFT
        });

  function userResponse(response){
  try
	{
     if(response === true)
   		 kony.phone.dial(ph);
	
	} 
	catch(err)
	{
		alert("error in dial:: "+err);
	}
  }
}