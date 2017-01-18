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
   if (!kony.retailBanking.columnChartGeneretedios) {
        if(kony.retailBanking.globalData.globals.PFM_ACCOUNTS_PRESENT){
        var ColumnChart = column_createChartWidget();
        frmMyMoneyKA.LabelNoRecordsGraphKA.isVisible = false;
        frmMyMoneyKA.flxSpendingOverviewKAinner.isVisible = true;
        frmMyMoneyKA.flxSpendingOverviewKAinner.add(ColumnChart);
        kony.retailBanking.columnChartGeneretedios = true;
        }else{
          frmMyMoneyKA.LabelNoRecordsGraphKA.isVisible = true;
          frmMyMoneyKA.flxSpendingOverviewKAinner.isVisible = false;
        }
 }
  frmMyMoneyKA.btnAccountsKA.skin = secondaryAction;
  frmMyMoneyKA.btnSpendingKA.skin = primaryAction;
  frmMyMoneyKA.btnBudgetKA.skin = secondaryAction;
  frmMyMoneyKA.flxAccountsListKA.isVisible = false;
  frmMyMoneyKA.flxMonthlySpendingWrapperKA.isVisible = true;
  frmMyMoneyKA.flxBudgetUsageWrapperKA.isVisible = false;
  
  frmMyMoneyKA.lblMonthlySpendingKA.skin = accountName;
  frmMyMoneyKA.lblSelectedMonthSpendingKA.skin = accountName;
  frmMyMoneyKA.lblShoppingKA.skin = accountName;
  frmMyMoneyKA.lblSelectedMonthSpendingKA.isVisible = false;
  frmMyMoneyKA.lblShoppingKA.isVisible = false;
  frmMyMoneyKA.lblTransactionDetailsKA.isVisible = false;
  
  frmMyMoneyKA.flxMonthlySpendingKA.isVisible = true;
  frmMyMoneyKA.flxSelectedMonthSpendingKA.isVisible = false;
  frmMyMoneyKA.flxShoppingKA.isVisible = false;
  frmMyMoneyKA.flxTransactionDetailsKA.isVisible = false;
   if(pieChart){
      frmMyMoneyKA.flxMonthlySpendingKAinner.remove(pieChart);
      pieChart = "";
  }
}

//on Accounts Button Click
function onAccountsSelected(){
  frmMyMoneyKA.btnAccountsKA.skin = primaryAction;
  frmMyMoneyKA.btnSpendingKA.skin = secondaryAction;
  frmMyMoneyKA.btnBudgetKA.skin = secondaryAction;
  frmMyMoneyKA.lblMonthlySpendingKA.skin = accountName;
  frmMyMoneyKA.lblSelectedMonthSpendingKA.skin = accountName;
  frmMyMoneyKA.lblSelectedMonthSpendingKA.isVisible = false;
  frmMyMoneyKA.lblShoppingKA.isVisible = false;
   frmMyMoneyKA.lblTransactionDetailsKA.isVisible = false;
  frmMyMoneyKA.flxAccountsListKA.isVisible = true;
  frmMyMoneyKA.flxMonthlySpendingWrapperKA.isVisible = false;
  frmMyMoneyKA.flxBudgetUsageWrapperKA.isVisible = false;
  
   frmMyMoneyKA.flxMonthlySpendingKA.isVisible = true;
  frmMyMoneyKA.flxSelectedMonthSpendingKA.isVisible = false;
  frmMyMoneyKA.flxShoppingKA.isVisible = false;
   frmMyMoneyKA.flxTransactionDetailsKA.isVisible = false;
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
  frmMyMoneyKA.btnAccountsKA.skin = secondaryAction;
  frmMyMoneyKA.btnSpendingKA.skin = secondaryAction;
  frmMyMoneyKA.btnBudgetKA.skin = primaryAction;
  frmMyMoneyKA.flxAccountsListKA.isVisible = false;
  
  frmMyMoneyKA.flxMonthlySpendingKA.isVisible = true;
  frmMyMoneyKA.flxSelectedMonthSpendingKA.isVisible = false;
  frmMyMoneyKA.flxShoppingKA.isVisible = false;
  frmMyMoneyKA.flxTransactionDetailsKA.isVisible = false;
  
  frmMyMoneyKA.flxMonthlySpendingWrapperKA.isVisible = false;
  frmMyMoneyKA.flxBudgetUsageWrapperKA.isVisible = true;
  
  frmMyMoneyKA.lblMonthlySpendingKA.skin = accountName;
  frmMyMoneyKA.lblSelectedMonthSpendingKA.skin = accountName;
  frmMyMoneyKA.lblSelectedMonthSpendingKA.isVisible = false;
  frmMyMoneyKA.lblShoppingKA.isVisible = false;
   frmMyMoneyKA.lblTransactionDetailsKA.isVisible = false;
   
  frmMyMoneyKA.segBudgetKA.isVisible = false;
  frmMyMoneyKA.LabelNoBudgetRecordsKA.isVisible = true;
  }
}

function onClickLblMonth(){
   frmMyMoneyKA.lblShoppingKA.isVisible = false;
   frmMyMoneyKA.lblSelectedMonthSpendingKA.skin = accountName;
   frmMyMoneyKA.flxSelectedMonthSpendingKA.isVisible = true;
   frmMyMoneyKA.flxShoppingKA.isVisible = false;
   frmMyMoneyKA.lblTransactionDetailsKA.isVisible = false;
  frmMyMoneyKA.flxTransactionDetailsKA.isVisible = false;
}

function onClickflxJanMnthKA(){
  frmMyMoneyKA.lblMonthlySpendingKA.skin = sknMonthlySpending3278E6KA;
  frmMyMoneyKA.lblSelectedMonthSpendingKA.skin = sknMonthlySpending3278E6KA;
  frmMyMoneyKA.lblShoppingKA.skin = accountName;
  frmMyMoneyKA.lblShoppingKA.isVisible = true;
  frmMyMoneyKA.lblTransactionDetailsKA.isVisible = false;
  frmMyMoneyKA.flxMonthlySpendingKA.isVisible = false;
  frmMyMoneyKA.flxSelectedMonthSpendingKA.isVisible = false;
  frmMyMoneyKA.flxShoppingKA.isVisible = true;
  frmMyMoneyKA.flxTransactionDetailsKA.isVisible = false;
}
function closeUnccategorizedTransactions(){
   if (moreLanding.flxTransactionDetailsWrapperKA){
      moreLanding.flxTransactionDetailsWrapperKA.animate(
          kony.ui.createAnimation({100:
          {"left": "100%", "stepConfig":{"timingFunction": easeOut}}}),
          {fillMode: forwards, duration: duration},
           {
           	 animationEnd: function() {
              moreLanding.remove(moreLanding.flxTransactionDetailsWrapperKA);
          	}
          });
   }
   moreLanding.flxUncategorizedTransactionsWrapperKA.animate(
          kony.ui.createAnimation({100:
          {"left": "100%", "stepConfig":{"timingFunction": easeOut}}}),
          {fillMode: forwards, duration: duration},
          {animationEnd: function() {
             moreLanding.moreLandingWrapper.remove(moreLanding.flxUncategorizedTransactionsWrapperKA);
          } });
   moreLanding.leftWrapper.animate(
          kony.ui.createAnimation({100:
          {"left": "0%", "stepConfig":{"timingFunction": easeOut}}}),
          {fillMode: forwards, duration: duration},
          {animationEnd: function() {} });
  
   onAccountsSelected();
      addRightPanel(frmMyMoneyKA.flxMyMoneyMainContainerWraperKA,"flxMyMoneyMainContainerWraperKA");
}
function openUncategorizedTransactionDetails(){
  navigateToUncategoriseTransactionDetails();
}
function closeUncategorizedTransactionDetails(){
      moreLanding.flxTransactionDetailsWrapperKA.animate(
          kony.ui.createAnimation({100:
          {"left": "100%", "stepConfig":{"timingFunction": easeOut}}}),
          {fillMode: forwards, duration: duration},
           {
           	 animationEnd: function() {
              moreLanding.remove(moreLanding.flxTransactionDetailsWrapperKA);
          	}
          });
   moreLanding.flxUncategorizedTransactionsWrapperKA.animate(
          kony.ui.createAnimation({100:
          {"left": leftContainerWidth, "stepConfig":{"timingFunction": easeOut}}}),
          {fillMode: forwards, duration: duration},
          {animationEnd: function() {} });
  moreLanding.leftWrapper.animate(
          kony.ui.createAnimation({100:
          {"left": "0%", "stepConfig":{"timingFunction": easeOut}}}),
          {fillMode: forwards, duration: duration},
          {animationEnd: function() {} });
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