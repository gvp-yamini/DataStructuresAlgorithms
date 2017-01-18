function openStatementURL(){
       var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
       var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
       var viewModel = controller.getFormModel();
         var selRecord = viewModel.getViewAttributeByProperty("contactsegment", "selectedItems")[0];
         kony.application.openURL(selRecord.StatementLink);
}

function accountsInfoPreShowskins(){
      var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmAccountDetailKA");
      var controllerContextData = controller.getContextData();
      if( controllerContextData && controllerContextData.getCustomInfo("selectedAccountObj")){
          var accountData = controllerContextData.getCustomInfo("selectedAccountObj");
          var accountType = accountData["accountType"];
        }
  if (accountType === kony.retailBanking.globalData.globals.Checking){
      frmAccountInfoKA.skin = sknaccountCheckingBkg;
      frmAccountInfoKA.titleBarAccountInfo.skin = sknaccountTypeChecking;
      frmAccountInfoKA.accountDetailsContainer.isVisible = false;
      frmAccountInfoKA.flxaccountdetailsfordeposits.isVisible = false;
      frmAccountInfoKA.flxaccountdetailsSavings.isVisible = true;
      frmAccountInfoKA.addExternalAccount.isVisible = true;
    } else if (accountType === kony.retailBanking.globalData.globals.Savings){
      frmAccountInfoKA.skin = sknaccountSavingsBkg;
      frmAccountInfoKA.titleBarAccountInfo.skin = sknaccountTypeSavings;
      frmAccountInfoKA.accountDetailsContainer.isVisible = false;
      frmAccountInfoKA.flxaccountdetailsfordeposits.isVisible = false;
      frmAccountInfoKA.flxaccountdetailsSavings.isVisible = true;
      frmAccountInfoKA.addExternalAccount.isVisible = true;
    } else if (accountType === kony.retailBanking.globalData.globals.CreditCard){
      frmAccountInfoKA.skin = sknaccountCreditBkg;
      frmAccountInfoKA.titleBarAccountInfo.skin = sknaccountTypeCredit;
      frmAccountInfoKA.accountDetailsContainer.isVisible = true;
      frmAccountInfoKA.flxaccountdetailsfordeposits.isVisible = false;
      frmAccountInfoKA.flxaccountdetailsSavings.isVisible = false;
      frmAccountInfoKA.addExternalAccount.isVisible = false;
    }else if (accountType === kony.retailBanking.globalData.globals.Deposit){
      frmAccountInfoKA.skin=sknaccountDepositBkg;
      frmAccountInfoKA.titleBarAccountInfo.skin = sknaccounttypeDeposit;
      frmAccountInfoKA.accountDetailsContainer.isVisible = false;
      frmAccountInfoKA.flxaccountdetailsfordeposits.isVisible = true;
      frmAccountInfoKA.flxaccountdetailsSavings.isVisible = false;
      frmAccountInfoKA.addExternalAccount.isVisible = false;
    } 
    else if (accountType == kony.retailBanking.globalData.globals.Mortgage){
      frmAccountInfoKA.skin=sknaccountMortageBkg;
      frmAccountInfoKA.titleBarAccountInfo.skin = sknaccounttypemortage;
      frmAccountInfoKA.accountDetailsContainer.isVisible = false;
      frmAccountInfoKA.flxaccountdetailsfordeposits.isVisible = true;
      frmAccountInfoKA.flxaccountdetailsSavings.isVisible = false;
      frmAccountInfoKA.addExternalAccount.isVisible = false;
  }
  
    frmAccountInfoKA.successIcon.opacity = 0;
  frmAccountInfoKA.successImage.opacity = 0;
}

function accountsInfoEditPreShowskins(){
      var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmAccountDetailKA");
      var controllerContextData = controller.getContextData();
      if( controllerContextData && controllerContextData.getCustomInfo("selectedAccountObj")){
          var accountData = controllerContextData.getCustomInfo("selectedAccountObj");
          var accountType = accountData["accountType"];
        }
  if (accountType === kony.retailBanking.globalData.globals.Checking){
      frmAccountInfoEditKA.skin = sknaccountCheckingBkg;
      frmAccountInfoEditKA.titleBarAccountInfo.skin = sknaccountTypeChecking;
      frmAccountInfoEditKA.accountDetailsContainer.isVisible = false;
      frmAccountInfoEditKA.flxaccountdetailsfordeposits.isVisible = false;
      frmAccountInfoEditKA.flxaccountdetailsSavings.isVisible = true;
    } else if (accountType === kony.retailBanking.globalData.globals.Savings){
      frmAccountInfoEditKA.skin = sknaccountSavingsBkg;
      frmAccountInfoEditKA.titleBarAccountInfo.skin = sknaccountTypeSavings;
      frmAccountInfoEditKA.accountDetailsContainer.isVisible = false;
      frmAccountInfoEditKA.flxaccountdetailsfordeposits.isVisible = false;
      frmAccountInfoEditKA.flxaccountdetailsSavings.isVisible = true;
    } else if (accountType === kony.retailBanking.globalData.globals.CreditCard){
      frmAccountInfoEditKA.skin = sknaccountCreditBkg;
      frmAccountInfoEditKA.titleBarAccountInfo.skin = sknaccountTypeCredit;
      frmAccountInfoEditKA.accountDetailsContainer.isVisible = true;
      frmAccountInfoEditKA.flxaccountdetailsfordeposits.isVisible = false;
      frmAccountInfoEditKA.flxaccountdetailsSavings.isVisible = false;
    }else if (accountType === kony.retailBanking.globalData.globals.Deposit){
      frmAccountInfoEditKA.skin=sknaccountDepositBkg;
      frmAccountInfoEditKA.titleBarAccountInfo.skin = sknaccounttypeDeposit;
      frmAccountInfoEditKA.accountDetailsContainer.isVisible = false;
      frmAccountInfoEditKA.flxaccountdetailsfordeposits.isVisible = true;
      frmAccountInfoEditKA.flxaccountdetailsSavings.isVisible = false;
    } 
    else if (accountType == kony.retailBanking.globalData.globals.Mortgage){
      frmAccountInfoEditKA.skin=sknaccountMortageBkg;
      frmAccountInfoEditKA.titleBarAccountInfo.skin = sknaccounttypemortage;
      frmAccountInfoEditKA.accountDetailsContainer.isVisible = false;
      frmAccountInfoEditKA.flxaccountdetailsfordeposits.isVisible = true;
      frmAccountInfoEditKA.flxaccountdetailsSavings.isVisible = false;
  }
  
    frmAccountInfoEditKA.successIcon.opacity = 0;
  frmAccountInfoEditKA.successImage.opacity = 0;
}

function populatingAccountsInfoScreen(setAccountNickname){
      var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmAccountDetailKA");
      var controllerContextData = controller.getContextData();
      if( controllerContextData && controllerContextData.getCustomInfo("selectedAccountObj")){
          var accountData = controllerContextData.getCustomInfo("selectedAccountObj");
      if(setAccountNickname){
          frmAccountInfoKA.accountNicknameTextfield.text = accountData["nickName"];
          }
          frmAccountInfoKA.accountNicknameTextfield.setEnabled(false);
          if(accountData["creditCardNumber"]){
          frmAccountInfoKA.accountNumberLabel.text = kony.retailBanking.util.formatingAmount.maskingLastFourDigits(accountData["creditCardNumber"]);
          }
      if(accountData["currentBalance"]){
           var creditCurrBal = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accountData["currentBalance"]);
           if(creditCurrBal.indexOf('-')==-1){
             frmAccountInfoKA.CopyaccountNumberLabel0e1c2ed08e25c42.text = "-" + creditCurrBal;
           }else{
             frmAccountInfoKA.CopyaccountNumberLabel0e1c2ed08e25c42.text = creditCurrBal;
           }
      }
      if(accountData["availableBalance"]){
      frmAccountInfoKA.CopyaccountNumberLabel045821e897a8646.text = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accountData["availableBalance"]);
      }
      if(accountData["dueDate"]){
      frmAccountInfoKA.CopyaccountNumberLabel014bda555f8c040.text = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(accountData["dueDate"]);
          }
        var availablePoints = accountData["availablePoints"];
        if(availablePoints.indexOf('.')==-1){
        frmAccountInfoKA.routingNumberLabel.text  = availablePoints;
          }else{
            frmAccountInfoKA.routingNumberLabel.text = availablePoints.substring(0,availablePoints.indexOf('.'));
          }
         // frmAccountInfoKA.interestRateLabel.text = accountData["interestRate"];
     if(accountData["lastStatementBalance"]){
          frmAccountInfoKA.interestRateLabel.text = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accountData["lastStatementBalance"]);
     }
          if(accountData["minimumDue"]){ 
      frmAccountInfoKA.interestEarnedLabel.text = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accountData["minimumDue"]);
          }
          if(accountData["availableBalance"]){
          frmAccountInfoKA.CopyaccountNumberLabel0b9e42672fcff47.text = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accountData["availableBalance"]);
          }
      if(accountData["currentBalance"]){
      frmAccountInfoKA.CopyroutingNumberLabel07e049f0450604c.text = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accountData["currentBalance"]);
          }
      frmAccountInfoKA.CopyinterestRateLabel0cf90d54edd014c.text = kony.retailBanking.util.maskAccountNumber(accountData["accountID"]);
          frmAccountInfoKA.CopyaccountNumberLabel036c71ac511b84d.text = kony.retailBanking.util.maskAccountNumber(accountData["accountID"]);
          frmAccountInfoKA.CopyroutingNumberLabel06e90c7d5900842.text = accountData["interestRate"]+"%";
      if(accountData["currentBalance"]){
          frmAccountInfoKA.CopyinterestRateLabel09f06e1600f0e43.text = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accountData["currentBalance"]);
          }
      frmAccountInfoKA.CopyinterestRateLabel0b14fb4af446e45.text = accountData["paymentTerm"];
      if(accountData["openingDate"]){
          frmAccountInfoKA.CopyinterestEarnedLabel00b76261e56e741.text = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(accountData["openingDate"]);
          }
      if(accountData["maturityDate"]){
      frmAccountInfoKA.CopyinterestEarnedLabel0daf983bec94d4c.text = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(accountData["maturityDate"]);
          }
    }
  kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
  frmAccountInfoKA.show();
}
function populatingAccountsInfoEditScreen(){
        var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
      var controller = INSTANCE.getFormController("frmAccountDetailKA");
        var formmodel = controller.getFormModel();
        var controllerContextData = controller.getContextData();
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
      if(accountData["creditCardNumber"]){
            frmAccountInfoEditKA.accountNumberLabel.text = kony.retailBanking.util.formatingAmount.maskingLastFourDigits(accountData["creditCardNumber"]);
          }
          if(accountData["currentBalance"]){ 
          var creditCurrBal = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accountData["currentBalance"]);
      if(creditCurrBal.indexOf('-')==-1){
             frmAccountInfoEditKA.CopyaccountNumberLabel0e1c2ed08e25c42.text = "-" + creditCurrBal;
           }else{
             frmAccountInfoEditKA.CopyaccountNumberLabel0e1c2ed08e25c42.text = creditCurrBal;
           }
          }
      if(accountData["availableBalance"]){
      frmAccountInfoEditKA.CopyaccountNumberLabel045821e897a8646.text = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accountData["availableBalance"]);
      }
      if(accountData["dueDate"]){
      frmAccountInfoEditKA.CopyaccountNumberLabel014bda555f8c040.text = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(accountData["dueDate"]);
          }
          var availablePoints = accountData["availablePoints"];
          if(availablePoints.indexOf('.')==-1){
        frmAccountInfoEditKA.routingNumberLabel.text = availablePoints;
          }else{
            frmAccountInfoEditKA.routingNumberLabel.text = availablePoints.substring(0,availablePoints.indexOf('.'));
          }
         // frmAccountInfoKA.interestRateLabel.text = accountData["interestRate"];
          if(accountData["lastStatementBalance"]){
          frmAccountInfoEditKA.interestRateLabel.text = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accountData["lastStatementBalance"]);
          }
          if(accountData["minimumDue"]){
          frmAccountInfoEditKA.interestEarnedLabel.text = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accountData["minimumDue"]);
          }
          if(accountData["availableBalance"]){
          frmAccountInfoEditKA.CopyaccountNumberLabel0b9e42672fcff47.text = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accountData["availableBalance"]);
          }
      if(accountData["currentBalance"]){
      frmAccountInfoEditKA.CopyroutingNumberLabel07e049f0450604c.text = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accountData["currentBalance"]);
          }
            var maskNum = kony.retailBanking.util.maskAccountNumber(accountData["accountID"]);
            var accountNum = new kony.sdk.mvvm.Data(accountData["accountID"],maskNum);
            formmodel.setWidgetData("CopyinterestRateLabel0cf90d54edd014c", accountNum);
        formmodel.setWidgetData("CopyaccountNumberLabel036c71ac511b84d", accountNum);
             
          frmAccountInfoEditKA.CopyroutingNumberLabel06e90c7d5900842.text = accountData["interestRate"]+"%";
      if(accountData["currentBalance"]){
          frmAccountInfoEditKA.CopyinterestRateLabel09f06e1600f0e43.text = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accountData["currentBalance"]);
      }
          frmAccountInfoEditKA.CopyinterestRateLabel0b14fb4af446e45.text = accountData["paymentTerm"];
      if(accountData["openingDate"]){
          frmAccountInfoEditKA.CopyinterestEarnedLabel00b76261e56e741.text = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(accountData["openingDate"]);
      }
      if(accountData["maturityDate"]){
          frmAccountInfoEditKA.CopyinterestEarnedLabel0daf983bec94d4c.text = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(accountData["maturityDate"]);
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
         processedRowObj["accountType"] = "Oustanding Balance";
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
      if(segTransactionListData[i]["isScheduled"]==="false"){
        processedRowObj = {};
        processedRowObj["description"] = kony.retailBanking.util.validation.trucateTo(segTransactionListData[i]["description"],35,32,"...");
        processedRowObj["amount"] = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(segTransactionListData[i]["amount"]);
    processedRowObj["transactionDate"] = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(segTransactionListData[i]["transactionDate"]);
    /*if(segTransactionListData[i]["checkImage"]=="cheque"){
       processedRowObj["Imgcheck"] = {"src":"checkf.png","isVisible":true};
        }else{
      processedRowObj["Imgcheck"] = {"src":"checkf.png","isVisible":false};
    }*/
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
      if(segTransactionListData[i]["frequencyType"] !==undefined) 
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
      Data[segmentName][segmentName].setData(processedSegData);
       
    }
   return Data;
}
/*
Termns & conditions opens for the First time in Accounts Module and Deposit Module flow
*/
function firstTimeVisitAccountTermsForm(){
  
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
      var controller = INSTANCE.getFormController("frmacntstatementsKA");
      var navObject = new kony.sdk.mvvm.NavigationObject();
      var AccountDetailscontroller = INSTANCE.getFormController("frmAccountDetailKA");
      var controllerContextData = AccountDetailscontroller.getContextData();
      if( controllerContextData && controllerContextData.getCustomInfo("selectedAccountObj")){
          var accountData = controllerContextData.getCustomInfo("selectedAccountObj");
          var accountId = accountData["accountID"];
          navObject.setRequestOptions("contactsegment",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"accountID": accountId}});
          controller.performAction("loadDataAndShowForm",[navObject]);
      }
    
  }
}

function tnCAccountsSuccess(response)
{
    //alert(response[0]);
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmAccountDetailKA");
    var controllerContextData=controller.getContextData();
    var accStatementDetail=  controllerContextData.getCustomInfo("selectedAccountObj");
    frmTermsAndConditionsAccountsKA.titleBarWrapper.skin = getSkinColor(accStatementDetail["accountType"]);
    frmTermsAndConditionsAccountsKA.richTexttermsandconditionsAccounts.text=response[0].infoContent;
    frmTermsAndConditionsAccountsKA.show();
}

function tnCAccountsError(err)
{
 //kony.print(err); 
customErrorCallback(err);
}

function updateAcceptTermnsnCofAccounts(){
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
      var controller = INSTANCE.getFormController("frmacntstatementsKA");
      var navObject = new kony.sdk.mvvm.NavigationObject();
      
    var AccountDetailscontroller = INSTANCE.getFormController("frmAccountDetailKA");
      var controllerContextData = AccountDetailscontroller.getContextData();
      if( controllerContextData && controllerContextData.getCustomInfo("selectedAccountObj")){
          var accountData = controllerContextData.getCustomInfo("selectedAccountObj");
          var accountId = accountData["accountID"];
          navObject.setRequestOptions("contactsegment",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"accountID": accountId}});
          controller.performAction("loadDataAndShowForm",[navObject]);
      }
     // navObject.setRequestOptions("contactsegment",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  
     //getAccountSatements("frmacntstatementsKA");
}

function updateaccountsTnCError(err)
{
 //kony.print(err); 
customErrorCallback(err);
}



function navigateToAcceptAccountStatements(frmForm,toForm){
     var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(frmForm);
      var controllerContextData = controller.getContextData();
      if( controllerContextData && controllerContextData.getCustomInfo("selectedAccountObj")){
          var accountData = controllerContextData.getCustomInfo("selectedAccountObj");
          var accountId = accountData["accountID"];
          var datamodel = new kony.sdk.mvvm.DataModel;
          
          var navigationObject = new kony.sdk.mvvm.NavigationObject;
          navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
          navigationObject.setRequestOptions("contactsegment",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"accountID": accountId}});
          controller.performAction("navigateTo",[toForm,navigationObject]);
         //controller.performAction("loadDataAndShowForm",[navObject]);
 }
}
function getAccountSatements(form)
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController(form);
  var navObject = new kony.sdk.mvvm.NavigationObject();
  navObject.setRequestOptions("contactsegment",{"headers":{"session_token":kony.retailBanking.globalData.session_token }});
  controller.performAction("loadDataAndShowForm",[navObject]);
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
 //var tempDate = kony.retailBanking.util.formatingDate.getISODateTimeKA(statementData[i]["StatementMonth"], kony.retailBanking.util.BACKEND_DATE_FORMAT);
  //processedRowObj["StatementMonth"] = (tempDate instanceof Date)? tempDate.format('F d, Y') : "";
        processedRowObj["StatementMonth"] =  kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(statementData[i]["StatementMonth"]);
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
//    frmTermsAndConditionsKA.titleBarWrapper.skin = getSkinColor(accStatementDetail["accountType"]);
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
    var controller = INSTANCE.getFormController("frmAccountDetailKA");
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
    var navigationObject = new kony.sdk.mvvm.NavigationObject;
    navigationObject.setCustomInfo("selectedAccountObj",selectedRecord);
    navigationObject.setCustomInfo("Peekandpop",false);
    var accountId = selectedRecord["accountID"];
    var datamodel = new kony.sdk.mvvm.DataModel;
    navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
    navigationObject.setRequestOptions("transactionSegment",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"accountID": accountId}});
   controller.performAction("navigateTo",[toForm,navigationObject]);
}

function navigateToDetailsPeekandPop(fromForm,toForm,segName,index){
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(fromForm);
    //index
    var selectedRecord = getSelectedRecord(index,fromForm,segName);
    var navigationObject = new kony.sdk.mvvm.NavigationObject;
    navigationObject.setCustomInfo("selectedAccountObj",selectedRecord);
    navigationObject.setCustomInfo("Peekandpop",true);
    var accountId = selectedRecord["accountID"];
    var datamodel = new kony.sdk.mvvm.DataModel;
    navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
    navigationObject.setRequestOptions("transactionSegment",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"accountID": accountId}});
   controller.performAction("navigateTo",[toForm,navigationObject]);
    return accountId;
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
       if(kony.retailBanking.globalData.deviceInfo.isIphone())
        frmAccountDetailKA.skin = getSkinColorForBg(accDetails["accountType"]);
           frmAccountDetailKA.accountDetailsOverview.skin = getSkinColor(accDetails["accountType"]);
           frmAccountDetailKA.titleBarAccountDetails.skin = getSkinColor(accDetails["accountType"]);
          if(accDetails["nickName"]){
          frmAccountDetailKA.accountDetailsHeader.text = accDetails["nickName"];
        }else{
          var accountNumber = accDetails["accountID"];
          frmAccountDetailKA.accountDetailsHeader.text =  accDetails["accountName"] + accountNumber.substring(accountNumber.length-4, accountNumber.length);
        }
           frmAccountDetailKA.accountDetailsTime.text = kony.retailBanking.globalData.globals.refreshTimeLabel;
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
            frmAccountDetailKA.lblavailbalance.text = i18n_availableBalance;
            frmAccountDetailKA.lblaccountbalance.text = i18n_currentBalance;
      frmAccountDetailKA.availableBalanceAmount.text = availableBal;
           frmAccountDetailKA.accountBalanceAmount.text = currentBal;
    } else if (accountType === kony.retailBanking.globalData.globals.Savings){
         frmAccountDetailKA.lblavailbalance.text = i18n_availableBalance;
         frmAccountDetailKA.lblaccountbalance.text = i18n_currentBalance;
     frmAccountDetailKA.availableBalanceAmount.text = availableBal;
         frmAccountDetailKA.accountBalanceAmount.text = currentBal;
    } else if (accountType === kony.retailBanking.globalData.globals.CreditCard){
         frmAccountDetailKA.lblavailbalance.text = i18n_PaymentDueDateg;
         frmAccountDetailKA.lblaccountbalance.text = i18n_lastStatementBalanceg;
     frmAccountDetailKA.availableBalanceAmount.text = paymentTerm;
         frmAccountDetailKA.accountBalanceAmount.text = lastStatementBalance;
    }else if (accountType === kony.retailBanking.globalData.globals.Deposit){
         frmAccountDetailKA.lblavailbalance.text = i18n_currentBalance;
         frmAccountDetailKA.lblaccountbalance.text = i18n_maturityDate;
     frmAccountDetailKA.availableBalanceAmount.text = currentBal;
         frmAccountDetailKA.accountBalanceAmount.text = maturityDate;
    } 
    else if (accountType == kony.retailBanking.globalData.globals.Mortgage){
         frmAccountDetailKA.lblavailbalance.text = kony.retailBanking.globalData.globals.OustandingBalance;
         frmAccountDetailKA.lblaccountbalance.text = kony.retailBanking.globalData.globals.InterestRate;
     frmAccountDetailKA.availableBalanceAmount.text = outstandingBal;
         frmAccountDetailKA.accountBalanceAmount.text = interestRate;
  }
          
       if(accDetails["accountType"] == kony.retailBanking.globalData.globals.Deposit || accDetails["accountType"] == kony.retailBanking.globalData.globals.Mortgage ){
            frmAccountDetailKA.btnaccountstatements.isVisible = false;
            frmAccountDetailKA.accountDetailsOverview.height = "190dp";
            //frmAccountDetailKA.accountDetailsTransactions.top = "220dp";
         }
        else {
            frmAccountDetailKA.btnaccountstatements.isVisible = true;
            frmAccountDetailKA.accountDetailsOverview.height = "250dp";
            //frmAccountDetailKA.accountDetailsTransactions.top = "300dp";
           } 
        }
}

function navigateToTransactionDetailsAccounts(fromForm,toForm,segName){
  frmRecentTransactionDetailsKA.repeatTransactionButton.isVisible = false;
  frmRecentTransactionDetailsKA.Copydivider06e184b7d586e4a.isVisible = false;
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController(fromForm);
  var viewModel = controller.getFormModel();
  var index = viewModel.getViewAttributeByProperty(segName, "selectedRowIndex");
  var response,tempDate;
  frmRecentTransactionDetailsKA.lblseletedIndex.text=index[1];
  var selectedTransactionRecord = getSelectedRecord(index[1],fromForm,segName);
  var DataTemp={};
  for(var key in selectedTransactionRecord){
  if(key == "amount"){
  DataTemp[key] = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(selectedTransactionRecord[key]);
  }else if(key == "transactionDate"){
  //tempDate = kony.retailBanking.util.formatingDate.getISODateTimeKA(selectedTransactionRecord[key], kony.retailBanking.util.BACKEND_DATE_FORMAT);
      // DataTemp[key] = (tempDate instanceof Date)? tempDate.format('F d, Y') : "";
    DataTemp[key] = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(selectedTransactionRecord[key]);
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
  var listController = INSTANCE.getFormController("frmAccountDetailKA");
  var navigationObject = listController.getContextData();
    var accDetails =  navigationObject.getCustomInfo("selectedAccountObj");
  frmRecentDepositKA.skin = getSkinColorForBg(accDetails.accountType);
  frmRecentDepositKA.titleBarWrapper.skin = getSkinColor(accDetails.accountType);
  navigationObject.setCustomInfo("selDeposit",DataTemp);
  recentDepositPreshow();
  }
}

function paintHeaderInRecentTransaction(){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
      var controller = INSTANCE.getFormController("frmAccountDetailKA");
     var controllerContextData=controller.getContextData();
     var accDetails =  controllerContextData.getCustomInfo("selectedAccountObj");
   frmRecentTransactionDetailsKA.skin = getSkinColorForBg(accDetails.accountType);
     frmRecentTransactionDetailsKA.titleBarWrapper.skin = getSkinColor(accDetails.accountType);
}

function resetPaintedHeaderInRecentTransaction(){
  frmRecentTransactionDetailsKA.skin = "sknmainGradient";
     frmRecentTransactionDetailsKA.titleBarWrapper.skin = "skncontainerBkgNone";
}

// AccountInfo Call

var ph;
//var phNum="";
function alertcall(){
  
    // ph = "284-123-1234";
     //phNum="284-123-1233";
 // var msg;
    var selRow = frmAccountInfoKA.contactSegmentList.selectedIndex[1];
   if(selRow == 0)
  {
    ph = "284-123-1234";
  }else {
     ph="284-123-1233";
}
     kony.ui.Alert({
            "message": ph,
            "alertType": constants.ALERT_TYPE_CONFIRMATION,
            "alertTitle": i18n_call,
            "yesLabel": i18n_call,
            "noLabel": i18n_cancelC,
            "alertIcon": "phone_icon_inactive.png",
            "alertHandler": userResponse
        }, {
            "iconPosition": constants.ALERT_ICON_POSITION_LEFT
        });

  function userResponse(response)
  {
  try
  {
     if(response === true)
       kony.phone.dial(ph);
    } 
  catch(err)
  {
    alert(i18n_dailError+" "+err);
  }
  }
}
function alertcallAccountInfoEditKA(){
  
    // ph = "284-123-1234";
     //phNum="284-123-1233";
 // var msg;
    var selRow = frmAccountInfoEditKA.contactSegmentList.selectedIndex[1];
   if(selRow == 0)
  {
    ph = "284-123-1234";
  }else {
     ph="284-123-1233";
}
     kony.ui.Alert({
            "message": ph,
            "alertType": constants.ALERT_TYPE_CONFIRMATION,
            "alertTitle": i18n_call,
            "yesLabel": i18n_call,
            "noLabel": i18n_cancelC,
            "alertIcon": "phone_icon_inactive.png",
            "alertHandler": userResponse
        }, {
            "iconPosition": constants.ALERT_ICON_POSITION_LEFT
        });

  function userResponse(response)
  {
  try
  {
     if(response === true)
       kony.phone.dial(ph);
    } 
  catch(err)
  {
    alert(i18n_dailError+" "+err);
  }
  }
}
/**
 * @function registerForPeekAndPop
 *
 */
function registerForPeekAndPop () {
  frmAccountsLandingKA.segAccountsKA.registerForPeekAndPop(onPeekCallback, onPopCallback);
  var previewActionItems = [
                              {
                                "type": constants.PREVIEW_ACTION_TYPE_INDIVIDUAL,
                                "title": i18n_searchTransactions,
                                "style": constants.PREVIEW_ACTION_STYLE_DEFAULT,
                                "onPreviewAction":navaigateToAccountDetailPAP
                              },
                  {
                                "type": constants.PREVIEW_ACTION_TYPE_INDIVIDUAL,
                                "title": i18n_viewAcntInfo,
                                "style": constants.PREVIEW_ACTION_STYLE_DEFAULT,
                                "onPreviewAction":navaigateToAccountInfoPAP
                              },
                              {
                                "type": constants.PREVIEW_ACTION_TYPE_INDIVIDUAL,
                                "title": i18n_viewAcntStatements,
                                "style": constants.PREVIEW_ACTION_STYLE_DEFAULT,
                                "onPreviewAction":navaigateToAccountStatementPAP
                              }
              ];
  frmAccountDetailKA.setPreviewActionItems (previewActionItems);
}
/**
 * @function onPeekCallback
 *
 */
function onPeekCallback (widgetRef, contextInfo) {
  var Index = contextInfo.rowIndex;
  var rowFocus = contextInfo.rowRect;
  var previewInfoTable = {"peekForm": frmAccountDetailKA, "focusRect": rowFocus, "contentSize": [320, 480]};
  var accountID = navigateToDetailsPeekandPop("frmAccountsLandingKA","frmAccountDetailKA","segAccountsKA",Index);
  frmAccountDetailKA.info = {"accountId": accountID}
  return previewInfoTable;
}

/**
 * @function onPopCallback
 *
 */
function onPopCallback (widgetRef, peekForm) {
  return peekForm;  
}

/**
 * @function readAction
 *
 */
function navaigateToAccountDetailPAP () {
    var account = frmAccountDetailKA.info.accountId;
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var frmController = INSTANCE.getFormController("frmAccountDetailKA");
    var navObject = new kony.sdk.mvvm.NavigationObject();
    var acnt = {"id":account};
    navObject.setCustomInfo("selAccount",acnt);
    navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
    clearData();
    frmController.performAction("navigateTo",["frmSearchOptionsKA",navObject]); 
}

/**
 * @function readAction1
 *
 */
function navaigateToAccountInfoPAP () {
  var account = frmAccountDetailKA.info.accountId;
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmAccountDetailKA");
  var accountId = account;
  var datamodel = new kony.sdk.mvvm.DataModel;
  var navigationObject = new kony.sdk.mvvm.NavigationObject;
  navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
  navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"accountID": accountId}});
  controller.performAction("navigateTo",["frmAccountInfoKA",navigationObject]);
}

/**
 * @function readAction2
 *
 */
function navaigateToAccountStatementPAP () {
    var account = frmAccountDetailKA.info.accountId;
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmacntstatementsKA");
    var navObject = new kony.sdk.mvvm.NavigationObject();
    var accountId = account;// accountData["accountID"];
    navObject.setRequestOptions("contactsegment",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"accountID": accountId}});
    controller.performAction("loadDataAndShowForm",[navObject]);
}


/**
 * @function appForceTouchCallBack
 *
 */
function appForceTouchCallBack (params) {
  if (null !== params && params.launchmode == 3) {
    var quickActionItem = params.launchparams.quickactionitem;
    if(quickActionItem){
      if (quickActionItem.id === "ATM finder") {
         menuIconForceTouch = true;
         if(isLoggedIn){
          onClickLocateUS(true, "frmMoreLandingKA");
         }else{
          onClickLocateUS(false,"frmLoginKA");
         }
               return frmLocatorKA;
      }
            else if(quickActionItem.id == "New Check Deposit" && isLoggedIn == true) {
              menuIconForceTouch = true;
              var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
              var listController = INSTANCE.getFormController("frmNewDepositKA");
              var navObject = new kony.sdk.mvvm.NavigationObject();
              navObject.setRequestOptions("segInternalTOAccountsKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
              navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
              listController.performAction("navigateTo",["frmNewDepositKA",navObject]); 
              newDepositPreShow();
              return frmNewDepositKA;
      }
            else if(quickActionItem.id == "Transfer Money" && isLoggedIn == true) {
               menuIconForceTouch = true;
               navigateToNewTransferForm("InitialLanding", null);
               return frmNewTransferKA;
      }
            else if(quickActionItem.id == "Pay a Bill" && isLoggedIn == true) {
               menuIconForceTouch = true;
               BillPayfromForm="NewBillPay";
         navigateToNewBillPayForm("InitialLanding", null);
               return frmNewBillKA;
      }
            else if(isLoggedIn == false){
              defaultPage = quickActionItem.id;
              return frmLoginKA;
            }
            else{
              return frmLoginKA;
            }
    }
  }
}