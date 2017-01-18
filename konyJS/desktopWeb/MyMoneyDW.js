function loadAndShowPFMAccountListKA(){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmFMMAccountListKA");
    var navObject = new kony.sdk.mvvm.NavigationObject();
  	navObject.setRequestOptions("segAccountsKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
    controller.loadDataAndShowForm(navObject);
}
//Populating data on Segment of Accounts in MyMoney Screen
function mymoneyaccountsList(Data,segmentName){
    var segmoneyaccountsList = Data[segmentName][segmentName].getData();
    var availableBal,currBal,outstandingBal;
    if(segmoneyaccountsList && segmoneyaccountsList.length>0)
    {
      var processedSegData = [ ];
      var processedRowObj;
      for(var i in segmoneyaccountsList){
        if( segmoneyaccountsList[i]["isPFM"]=== "true")
          {
        processedRowObj = {};
        if(segmoneyaccountsList[i]["nickName"]){
        processedRowObj["nickName"] = kony.retailBanking.util.validation.trucateTo(segmoneyaccountsList[i]["nickName"],35,32,"...");
        }else{
          var accountNumber = segmoneyaccountsList[i]["accountID"];
          processedRowObj["nickName"] =  segmoneyaccountsList[i]["accountName"] + accountNumber.substring(accountNumber.length-4, accountNumber.length);
        }
        if(segmoneyaccountsList[i]["bankName"]){
		      processedRowObj["bankName"] = kony.retailBanking.util.validation.trucateTo(segmoneyaccountsList[i]["bankName"],35,32,"...");
		}
        if(segmoneyaccountsList[i]["availableBalance"]){
        availableBal = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(segmoneyaccountsList[i]["availableBalance"]);
        }
        if(segmoneyaccountsList[i]["currentBalance"]){
        currBal = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(segmoneyaccountsList[i]["currentBalance"]);
        }
        if(segmoneyaccountsList[i]["outstandingBalance"]){
          outstandingBal = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(segmoneyaccountsList[i]["outstandingBalance"]);
        }
          if(segmoneyaccountsList[i]["accountType"]=="CreditCard"){
          currBal = "-"+currBal;
        }
        var accountType = segmoneyaccountsList[i]["accountType"];
if (accountType === kony.retailBanking.globalData.globals.Checking){
          processedRowObj["availableBalance"] = {
          "isVisible": true,
          skin :getSknlblAmount(segmoneyaccountsList[i]["accountType"]),
          text: availableBal
        };
        processedRowObj["currentBalance"] = {
          "isVisible": false,
          skin :getSknlblAmount(segmoneyaccountsList[i]["accountType"]),
          text: currBal
        };
        processedRowObj["outstandingBalance"] = {
          "isVisible": false,
          skin :getSknlblAmount(segmoneyaccountsList[i]["accountType"]),
          text: outstandingBal
        };
         processedRowObj["accountType"] = "Available Balance";
    } else if (accountType === kony.retailBanking.globalData.globals.Savings){
                  processedRowObj["availableBalance"] = {
          "isVisible": true,
          skin :getSknlblAmount(segmoneyaccountsList[i]["accountType"]),
          text: availableBal
        };
        processedRowObj["currentBalance"] = {
          "isVisible": false,
          skin :getSknlblAmount(segmoneyaccountsList[i]["accountType"]),
          text: currBal
        };
        processedRowObj["outstandingBalance"] = {
          "isVisible": false,
          skin :getSknlblAmount(segmoneyaccountsList[i]["accountType"]),
          text: outstandingBal
        };
         processedRowObj["accountType"] = "Available Balance";
    } else if (accountType === kony.retailBanking.globalData.globals.CreditCard){
                  processedRowObj["availableBalance"] = {
          "isVisible": false,
          skin :getSknlblAmount(segmoneyaccountsList[i]["accountType"]),
          text: availableBal
        };
        processedRowObj["currentBalance"] = {
          "isVisible": true,
          skin :getSknlblAmount(segmoneyaccountsList[i]["accountType"]),
          text: currBal
        };
        processedRowObj["outstandingBalance"] = {
          "isVisible": false,
          skin :getSknlblAmount(segmoneyaccountsList[i]["accountType"]),
          text: outstandingBal
        };
         processedRowObj["accountType"] = "Current Balance";
    }else if (accountType === kony.retailBanking.globalData.globals.Deposit){
                 processedRowObj["availableBalance"] = {
          "isVisible": false,
          skin :getSknlblAmount(segmoneyaccountsList[i]["accountType"]),
          text: availableBal
        };
        processedRowObj["currentBalance"] = {
          "isVisible": true,
          skin :getSknlblAmount(segmoneyaccountsList[i]["accountType"]),
          text: currBal
        };
        processedRowObj["outstandingBalance"] = {
          "isVisible": false,
          skin :getSknlblAmount(segmoneyaccountsList[i]["accountType"]),
          text: outstandingBal
        };
         processedRowObj["accountType"] = "Current Balance";
    } 
    else if (accountType == kony.retailBanking.globalData.globals.Mortgage){
           processedRowObj["availableBalance"] = {
          "isVisible": false,
          skin :getSknlblAmount(segmoneyaccountsList[i]["accountType"]),
          text: availableBal
        };
        processedRowObj["currentBalance"] = {
          "isVisible": false,
          skin :getSknlblAmount(segmoneyaccountsList[i]["accountType"]),
          text: currBal
        };
        processedRowObj["outstandingBalance"] = {
          "isVisible": true,
          skin :getSknlblAmount(segmoneyaccountsList[i]["accountType"]),
          text: outstandingBal
        };
         processedRowObj["accountType"] = "Oustanding Balance";
  }
        processedSegData.push(processedRowObj);
      	}
    }
      Data[segmentName][segmentName].setData(processedSegData);
    }else{
      
    }
  return Data;
}
function goBackFromExpenseDetails(){
	frmFMMSpendingKA.show();
}
function onClickPreviousMonth(){
    var curMonthId = kony.retailBanking.selectedMonthId;
  	var monthData = kony.retailBanking.globalData.barGraphMonthData.getMonthsData().monthData;
  	for(var i=0; i<monthData.length; i++){
      if(monthData[i]["monthId"] === curMonthId){
        navigateToSpendingDetails(monthData[i-1]);break;
      }
    }    
}
function onClickNextMonth(){
    var curMonthId = kony.retailBanking.selectedMonthId;
  	var monthData = kony.retailBanking.globalData.barGraphMonthData.getMonthsData().monthData;
  	for(var i=0; i<monthData.length; i++){
      if(monthData[i]["monthId"] === curMonthId){
        navigateToSpendingDetails(monthData[i+1]);break;
      }
    } 
}//Type your code here