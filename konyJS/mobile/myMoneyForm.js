/*
Back Navigation from MyMoneyListKA to frmMoreLandingKA
*/
function backToMoreLandingPage(formName)
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController(formName);
  listController.performAction("goback",[false]);
}

function onSpendingSelected()
{
  frmMyMoneyListKA.btnSpendingKA.skin = skntabSelected;
  frmMyMoneyListKA.btnAccountsKA.skin = skntabDeselected;
  frmMyMoneyListKA.btnBudgetKA.skin = skntabDeselected;
  frmMyMoneyListKA.flxResultSpendingKA.isVisible = true;
  frmMyMoneyListKA.flxResultAccountsKA.isVisible = false;
  frmMyMoneyListKA.flxResultBudgetKA.isVisible = false;
  frmMyMoneyListKA.flxMonthlySpendingKA.isVisible = false;
  frmMyMoneyListKA.flxSpendingOverviewKA.isVisible = true;
  frmMyMoneyListKA.flxExpenditureKA.isVisible = false;
  frmMyMoneyListKA.flxsegMonthlyDataKA.isVisible = false;
  frmMyMoneyListKA.flxMonthlySpendingKA.isVisible = false;
  frmMyMoneyListKA.lblMonthlySpendingKA.text = "";
  frmMyMoneyListKA.lblExpenditureKA.text = "";
  onClickLblMonth();
  frmMyMoneyListKA.flxSelectedKA.left = "33.33%";
  frmMyMoneyListKA.flxSelectedKA.forceLayout();
}

//on Accounts Button Click
function onAccountsSelected(){
  frmMyMoneyListKA.btnSpendingKA.skin = skntabDeselected;
  frmMyMoneyListKA.btnAccountsKA.skin = skntabSelected;
  frmMyMoneyListKA.btnBudgetKA.skin = skntabDeselected;
  frmMyMoneyListKA.flxResultSpendingKA.isVisible = false;
  frmMyMoneyListKA.flxResultAccountsKA.isVisible = true;
  frmMyMoneyListKA.flxResultBudgetKA.isVisible = false;
  frmMyMoneyListKA.flxSelectedKA.left = "0%";
  frmMyMoneyListKA.flxSelectedKA.forceLayout();
}

// onclick on MyMoney Module in Resources
function showFormMyMoneyAccountsList(){
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmMyMoneyListKA");
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
         processedRowObj["accountType"] = i18n_availableBalance;
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
         processedRowObj["accountType"] = i18n_availableBalance;
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
         processedRowObj["accountType"] = i18n_currentBalance;
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
         processedRowObj["accountType"] = i18n_currentBalance;
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
         processedRowObj["accountType"] = i18n_outStandingBalance;
  }
         processedRowObj["sknColor"] = {
           skin:getSkinColor(segmoneyaccountsList[i]["accountType"])
        }
        processedSegData.push(processedRowObj);
      	}
    }
      Data[segmentName][segmentName].setData(processedSegData);
    }else{
      
    }
  return Data;
}
//processedSegData.push(segmoneyaccountsList[i]);
     
  //  }
//get filter of accounts in PFM Accounts from Account Landing through a flag sent from response
function getFilteredAccountsofMyMoney(fromAccountsData)
{
  var fromData = [];
   for(var i in fromAccountsData)
  {
    
    if( fromAccountsData[i]["isPFM"]=== "false")
    {
      fromData.push(fromAccountsData[i]);
     
    }
  }
  return fromData;
}

function onBudgetSelected(){
   if(kony.retailBanking.globalData.globals.PFM_ACCOUNTS_PRESENT){
    fetchBudgetData();
    }else{
   var userAgent = kony.os.userAgent();
   if (userAgent !== "iPhone"){
  frmMyMoneyListKA.btnSpendingKA.skin = skntabDeselected;
  frmMyMoneyListKA.btnAccountsKA.skin = skntabDeselected;
  frmMyMoneyListKA.btnBudgetKA.skin = skntabSelected;
  frmMyMoneyListKA.flxSelectedKA.left = "66.66%";
     frmMyMoneyListKA.flxSelectedKA.forceLayout();
  }
  frmMyMoneyListKA.flxResultSpendingKA.isVisible = false;
  frmMyMoneyListKA.flxResultAccountsKA.isVisible = false;
  frmMyMoneyListKA.flxResultBudgetKA.isVisible = true;
      frmMyMoneyListKA.segBudgetKA.isVisible = false;
      frmMyMoneyListKA.LabelNoBudgetRecordsKA.isVisible = true;
    }
}

function onSelectionRadioBtn(){
  if(frmMyMoneyListKA.searchSegmentedController.selectedKey == "accounts"){
    frmMyMoneyListKA.flxResultSpendingKA.isVisible = false;
  	frmMyMoneyListKA.flxResultAccountsKA.isVisible = true;
  	frmMyMoneyListKA.flxResultBudgetKA.isVisible = false;
  }
  else if(frmMyMoneyListKA.searchSegmentedController.selectedKey == "spending"){
    if (!kony.retailBanking.columnChartGeneretedios) {
        if(kony.retailBanking.globalData.globals.PFM_ACCOUNTS_PRESENT){
        var ColumnChart = column_createChartWidget();
        frmMyMoneyListKA.flxSpendingOverviewKAinner.add(ColumnChart);
        kony.retailBanking.columnChartGeneretedios = true;
        }
 }
    frmMyMoneyListKA.flxResultSpendingKA.isVisible = true;
  	frmMyMoneyListKA.flxResultAccountsKA.isVisible = false;
    frmMyMoneyListKA.flxResultBudgetKA.isVisible = false;
    frmMyMoneyListKA.flxMonthlySpendingKA.isVisible = false;
    frmMyMoneyListKA.flxSpendingOverviewKA.isVisible = true;
    frmMyMoneyListKA.flxExpenditureKA.isVisible = false;
    frmMyMoneyListKA.lblMonthlySpendingKA.text = "";
    frmMyMoneyListKA.lblExpenditureKA.text = "";
    frmMyMoneyListKA.flxsegMonthlyDataKA.isVisible = false;
    frmMyMoneyListKA.flxMonthlySpendingKA.isVisible = false;
  }
  else if(frmMyMoneyListKA.searchSegmentedController.selectedKey == "budget"){
    if(kony.retailBanking.globalData.globals.PFM_ACCOUNTS_PRESENT){
    fetchBudgetData();
    }else{
      var userAgent = kony.os.userAgent();
   if (userAgent !== "iPhone"){
  frmMyMoneyListKA.btnSpendingKA.skin = skntabDeselected;
  frmMyMoneyListKA.btnAccountsKA.skin = skntabDeselected;
  frmMyMoneyListKA.btnBudgetKA.skin = skntabSelected;
  frmMyMoneyListKA.flxSelectedKA.left = "66.66%";
  frmMyMoneyListKA.flxSelectedKA.forceLayout();
  }
  frmMyMoneyListKA.flxResultSpendingKA.isVisible = false;
  frmMyMoneyListKA.flxResultAccountsKA.isVisible = false;
  frmMyMoneyListKA.flxResultBudgetKA.isVisible = true;
      frmMyMoneyListKA.segBudgetKA.isVisible = false;
      frmMyMoneyListKA.LabelNoBudgetRecordsKA.isVisible = true;
    }
  } 
  
}

function onClickFlxImgSpending(){
   frmMyMoneyListKA.resourcesLabel.skin = sknMonthlySpending3278E6KA;
   frmMyMoneyListKA.flxJanMnthKA.isVisible = true;
   frmMyMoneyListKA.flxMonthlySpendingKA.isVisible = true;
   frmMyMoneyListKA.flxSpendingOverviewKA.isVisible = false;
   frmMyMoneyListKA.flxExpenditureKA.isVisible = false;
   frmMyMoneyListKA.flxsegMonthlyDataKA.isVisible = false; 
}

function onClickLblMonth(){
  if(pieChart){
    frmMyMoneyListKA.flxMonthlySpendingKA.remove(pieChart);
    pieChart = "";
  }
  frmMyMoneyListKA.resourcesLabel.skin = sknaccountName;
  frmMyMoneyListKA.flxJanMnthKA.isVisible = false;
  frmMyMoneyListKA.flxMonthlySpendingKA.isVisible = false;
  frmMyMoneyListKA.flxExpenditureKA.isVisible = false;
  frmMyMoneyListKA.flxsegMonthlyDataKA.isVisible = false;
  frmMyMoneyListKA.flxSpendingOverviewKA.isVisible = true;
}

function onClickflxJanMnthKA(){
  frmMyMoneyListKA.resourcesLabel.skin = sknMonthlySpending3278E6KA;
  frmMyMoneyListKA.lblMonthlySpendingKA.skin = sknMonthlySpending3278E6KA;
  frmMyMoneyListKA.flxJanMnthKA.isVisible = true;
  frmMyMoneyListKA.flxExpenditureKA.isVisible = true;
  frmMyMoneyListKA.flxMonthlySpendingKA.isVisible = false;
  frmMyMoneyListKA.flxSpendingOverviewKA.isVisible = false;
  frmMyMoneyListKA.flxsegMonthlyDataKA.isVisible = true;
  
}

function preshowMyMoney(){
  BadgeUI();
  if(kony.retailBanking.fromAppMenu){
  kony.retailBanking.fromAppMenu = false;
  if(pieChart){
    frmMyMoneyListKA.flxMonthlySpendingKA.remove(pieChart);
    pieChart = "";
  }
  if(from == "MyMoney")
  {
   userAgent = kony.os.userAgent();
   if (userAgent === "iPhone"){
    frmMyMoneyListKA.searchSegmentedController.selectedKey = "accounts";
    frmMyMoneyListKA.flxResultSpendingKA.isVisible = false;
  	frmMyMoneyListKA.flxResultAccountsKA.isVisible = true;
  	frmMyMoneyListKA.flxResultBudgetKA.isVisible = false;
    
  }
  else{
    onAccountsSelected();
  }
 }
}
}