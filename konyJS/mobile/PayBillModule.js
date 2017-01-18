/*onclick of ManagePayee in Resources navigate to PayeeListform
*/
var selectedPayee,selectedAccount;
var paybillCompletedList = [];
var paybillScheduledList = [];
function getPayeeListDetails(form)
{
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmManagePayeeKA");
    var navObject = new kony.sdk.mvvm.NavigationObject();
  	navObject.setRequestOptions("managepayeesegment",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
    controller.performAction("navigateTo",[form,navObject]); 
}
/**
 used To Navigate the 
*/
function getPayeeTransactionsKALandingForm(form)
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController(form);
  var navObject = new kony.sdk.mvvm.NavigationObject();
  navObject.setRequestOptions("segCompletedPaymentsKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  listController.performAction("navigateTo",[form,navObject]); 
}

/*
onclick of Account segment
*/
function onclicksegmentPay(type)
{
  type= type;
  frmNewBillKA[type+"CardTitle"].setVisibility(false);
  frmNewBillKA[type+"CardInner"].setVisibility(false);
  frmNewBillKA[type+"AccountPick"].setVisibility(true);
}
function onClickfrom(){
  //selectedAccount = frmNewBillKA.segInternalFromAccountsKA.selectedRowIndex[1];
  alert("entering in to the onclickfrom segment");
  frmNewBillKA.fromNamePick.text = frmNewBillKA.segInternalFromAccountsKA.selectedItems[0]["nameAccount1"];
//   frmNewBillKA.lblFromAccountBankNameKA.text = frmNewBillKA.segInternalFromAccountsKA.selectedItems[0]["bankName"];
//   frmNewBillKA.fromAmountPick.text = frmNewBillKA.segInternalFromAccountsKA.selectedItems[0]["availableBalance"];
//   frmNewBillKA.amountAccountOne.text = frmNewBillKA.segInternalFromAccountsKA.selectedItems[0]["accountType"];
//   frmNewBillKA.fromAccountColorPick.skin =frmNewBillKA.segInternalFromAccountsKA.selectedItems[0]["accountType"].skin;
  onclicksegmentPay("from")
}
/*
Used for From: Account Edit
*/
function onclickPayBillEdit(type)
{
  type= type;
  frmNewBillKA[type+"CardTitle"].setVisibility(true);
  frmNewBillKA[type+"CardInner"].setVisibility(true);
  frmNewBillKA[type+"AccountPick"].setVisibility(false);
  frmNewBillKA.fromCardInner.opacity=1;
  frmNewBillKA.fromCardTitle.opacity=1;
}
/**
 Used to get From Details From Segement.
*/
var tempdata;
function getSegInternalAccountsPayKARecordClick(segName,fromForm,accountName,amount,accountNumber)
{
var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController(fromForm);
  var viewModel = controller.getFormModel();
  var accountsData =  kony.retailBanking.globalData.accounts.getAccountsData();
  var index = viewModel.getViewAttributeByProperty(segName, "selectedRowIndex");
  var selIndex = Math.floor(index[1]);
 
      tempdata= getFilteredFromAccounts(accountsData);
          
          
 
  var selectedAccountRecord ;
  if(segName === "segInternalFromAccountsPayKA")
    selectedAccountRecord = tempData[0][selIndex];
  viewModel.setViewAttributeByProperty(accountName,"text",selectedAccountRecord.nameAccount1);
  viewModel.setViewAttributeByProperty(amount,"text",selectedAccountRecord.availableBalance);
  viewModel.setViewAttributeByProperty(accountNumber,"text",selectedAccountRecord.accountID);
}

/**
setToPayBillAccountsAfterSelectionOfFromAccount
*/
function setToPayBillAccountsAfterSelectionOfFromAccount(fromForm,segName,index)
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController(fromForm);
  var viewModel = controller.getFormModel();
  var accountsData =  kony.retailBanking.globalData.accounts.getAccountsData();
  //var toAccountData = accountsData.splice(Math.floor(index),1);
//   if(segName=="segInternalTOAccountsPayKA")
//   {
//     // frmNewTransferKA.segInternalTOAccountsKA.removeAt(index,0);
//   }
//   else
//   {
//     // frmNewTransferKA.segInternalFromAccountsKA.removeAt(index,0); 

//   }
  selectedSegementRowIndex = index;
  //  viewModel.setWidgetData(segName,accountsData);
}

function getFilteredFromAccounts(fromAccountsData)
{
  var fromData = [];
   for(var i in fromAccountsData)
  {
    // fromAccountsData[i]["availableBalance"] = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(fromAccountsData[i]["availableBalance"],"USD");
    if( fromAccountsData[i]["supportBillPay"]==="1")
    {
      fromData.push(fromAccountsData[i]);
     
    }
  }
  return fromData;
}


function accountListPayee(Data,payeeSeg){
  var segPayeeListData = Data[payeeSeg][payeeSeg].getData();
    var availableBal;
    toBilldatalength = segPayeeListData.length;
    if(segPayeeListData && segPayeeListData.length>0)
    {
      var processedSegData = [];
      var processedRowObj;
      for(var i in segPayeeListData){
        processedRowObj = {};
        //processedRowObj["payeeName"] = kony.retailBanking.util.validation.trucateTo(segPayeeListData[i]["payeeName"],35,32,"...");
		processedRowObj["payeeNickName"] = kony.retailBanking.util.validation.trucateTo(segPayeeListData[i]["payeeNickName"],35,32,"...");
        processedRowObj["payeeId"] = segPayeeListData[i]["payeeId"];
// 		var accountNumber = segPayeeListData[i]["accountNumber"];
//         var lastFourDigits = accountNumber.substring(accountNumber.length-4, accountNumber.length);
// 		processedRowObj["accountNumber"] = "XXXX XXXX XXXX "+lastFourDigits;
        processedSegData.push(processedRowObj);
      }
      Data[payeeSeg][payeeSeg].setData(processedSegData);
    }
  return Data;                             
}



function newPayBillPreShow(){
  frmNewBillKA.transferPayTitleLabel.text=i18n_payBill; 
  frmNewBillKA.fromCardTitle.setVisibility(true);
  frmNewBillKA.fromCardInner.setVisibility(true);
  frmNewBillKA.fromAccountPick.setVisibility(false);
  frmNewBillKA.toCardTitle.setVisibility(true);
  frmNewBillKA.toCardInner.setVisibility(true);
  frmNewBillKA.toAccountPick.setVisibility(false);
  frmNewBillKA.editToCard.setVisibility(true);

  frmNewBillKA.fromNamePick.text=" ";
  frmNewBillKA.toNamePick.text=" ";
  frmNewBillKA.amountTextField.text="";
  

  var date = new Date();
  var year =   date.getFullYear();
  var month = date.getMonth()+1;
  var day = date.getDate();
  var startDate=[day,month,year];
  var endDate = [day,month,year+1];
  
 //frmNewBillKA.lblCurrencyType.text=(kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount("0")).substring(0,1);
  frmNewBillKA.lblCurrencyType.text=kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount("",kony.retailBanking.globalData.globals.CurrencyCode); 
  frmNewBillKA.calDateKA.validStartDate=startDate;
  frmNewBillKA.calDateKA.validEndDate=endDate;
  frmNewBillKA.calDateKA.dateComponents = [parseFloat(day), parseFloat(month), parseFloat(year), 0.0, 0.0, 0.0];
   // setup amountCard
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmNewBillKA");
  var viewModel = controller.getFormModel();
  var fromAccountNumber =  viewModel.setViewAttributeByProperty("fromlblAccountNumberKA","text","");
  var toAccountNumber =    viewModel.setViewAttributeByProperty("tolblAccountNumberKA","text","");
  viewModel.setViewAttributeByProperty("lblBankNameHeader","text",kony.retailBanking.globalData.globals.BankName); 
  var settingsObj = kony.store.getItem("settingsflagsObject");
  var preferedSelAcnt=kony.retailBanking.globalData.accounts.searchAccountById(settingsObj.DefaultPaymentAcctNo);
  if (preferedSelAcnt !==""){
         //onclicksegmentPay("from");
         var tempId = preferedSelAcnt.accountID;
         var nickNameData = preferedSelAcnt.nickName;
             //Need To Get This From Service
         if(nickNameData.trim() == "")
               viewModel.setViewAttributeByProperty("fromNamePick","text",preferedSelAcnt.accountName);
          else
             viewModel.setViewAttributeByProperty("fromNamePick","text",nickNameData);              
              //formmodel.setViewAttributeByProperty("fromNamePick","text",preferedSelAcnt.nickName);
             viewModel.setViewAttributeByProperty("fromAmountPick","text",kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(preferedSelAcnt.availableBalance,kony.retailBanking.globalData.globals.CurrencyCode));
            
            viewModel.setViewAttributeByProperty("fromlblAccountNumberKA","text",preferedSelAcnt.accountID);
              viewModel.setViewAttributeByProperty("fromAccountColorPick","skin",getSkinColor(preferedSelAcnt.accountType));
              viewModel.setViewAttributeByProperty("lblFromAccountBankNameKA","text",preferedSelAcnt.bankName);
              //viewModel.setViewAttributeByProperty("amountAccountOne","text",preferedSelAcnt.availBalanView);
  			  viewModel.performActionOnView("fromAccountPick","setVisibility",[true]);
              viewModel.setViewAttributeByProperty("fromAccountnumber","text",preferedSelAcnt.accountID);
              viewModel.setViewAttributeByProperty("fromAccountPick","opacity",1);
              frmNewBillKA.fromCardInner.opacity=1; 
            
//   				if(DepositCardHeight!="0dp")
//     			{
//                   formmodel.setViewAttributeByProperty("fromCard","height",defaultCardHeight);
//     			}
             // onclicksegmentPay("from");
              viewModel.performActionOnView("amountAccountOne","setVisibility",[true]);
              viewModel.performActionOnView("editFromCard","setVisibility",[true]);
              viewModel.performActionOnView("fromCardTitle","setVisibility",[false]);
              viewModel.performActionOnView("fromCardInner","setVisibility",[false]);
              viewModel.performActionOnView("fromAccountPick","setVisibility",[true]);
          
        }else{
            //frmNewBillKA.fromNamePick.text="";
          //frmNewBillKA.fromCardInner.opacity=1;
           viewModel.setViewAttributeByProperty("fromAccountPick","opacity",0);
         // viewModel.setViewAttributeByProperty("segInternalFromAccountsPayKA","opacity",1);
          frmNewBillKA.fromCardInner.opacity=1;
          frmNewBillKA.fromCardTitle.opacity=1;
               viewModel.performActionOnView("editFromCard","setVisibility",[false]);
            viewModel.performActionOnView("fromCardTitle","setVisibility",[true]);
            viewModel.performActionOnView("fromCardInner","setVisibility",[true]);
            viewModel.performActionOnView("fromAccountPick","setVisibility",[false]);
             //frmNewBillKA.LabelNoRecordsKA.isVisible="true";
             //onclickPayBillEdit("from");
          }
  
}

/**
Used To Navigate The ConfirmTransfer onclick of PayBill in NewBillKA form
*/
function newConfirmAccountPayBill(fromForm,toForm)
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController(fromForm);
  var viewModel = controller.getFormModel();
  var amount = viewModel.getViewAttributeByProperty("amountTextField","text");
  var toAccName = viewModel.getViewAttributeByProperty("toNamePick","text");
  var toAccNumber =    viewModel.getViewAttributeByProperty("tolblAccountNumberKA","text");
  var fromAccNumber =  viewModel.getViewAttributeByProperty("fromlblAccountNumberKA","text");
  var fromAccName =   viewModel.getViewAttributeByProperty("fromNamePick","text");
  var fromIndex = viewModel.getViewAttributeByProperty("segInternalFromAccountsPayKA", "selectedRowIndex");
  var toIndex = viewModel.getViewAttributeByProperty("segInternalTOAccountsPayKA", "selectedRowIndex");
  var scheduledDate = viewModel.getViewAttributeByProperty("calDateKA","dateComponents");
  var controllerContextData = controller.getContextData();
  if(fromAccNumber !== "" && toAccNumber !== ""){
  amount = amount.toString();
  var validated = validateDecimals(amount);
      if((amount===null) || (amount==="") || (Number(amount)< 0))
      {
        alert(i18n_notValidAmount);
      }else if(validated) //if((Number(amount)<=Number(fromAccountBal)))
      {
        var listController = INSTANCE.getFormController("frmConfirmPayBill");
        var navigationObject = new kony.sdk.mvvm.NavigationObject();
        var datamodelflxAddressKA = new kony.sdk.mvvm.DataModel();
          //if(controllerContextData && controllerContextData.getCustomInfo("operationType")){
             if(controllerContextData.getCustomInfo("operationType") == "ADD"){
                navigationObject.setDataModel(null,kony.sdk.mvvm.OperationType.ADD, "form");
            }
        // }
        navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
        var payBill = {
          "fromAccNumber" : fromAccNumber,
          "toAccNumber" : toAccNumber,
          "amount" : amount,
          "toAccName": toAccName,    
          "fromAccName":fromAccName,
          "scheduledDate" : scheduledDate
        };
        navigationObject.setCustomInfo("payBillObject",payBill);
        // this.navigateTo("frmAddAccountKA", navigationObject);
	   if(frmRecentTransactionDetailsKA.repeatTransactionButton.text == i18n_repeatBillPay){
          navigationObject.setDataModel(null,kony.sdk.mvvm.OperationType.ADD, "form");
        }
		
        listController.performAction("navigateTo",["frmConfirmPayBill",navigationObject]);
      }  
  }else if(fromAccNumber !=="" && toAccNumber === ""){
    alert(i18n_selectToAccountAlert);
  }else if(fromAccNumber ==="" && toAccNumber !== ""){
    alert(i18n_selectFromAccountAlert);
  }else{
    alert(i18n_selectTonFromAccountAlert);
  }
}
//from here
function getSelectedFromAccounts(){
     var selectedAccount =frmNewBillKA.segInternalFromAccountsPayKA.selectedItems;
     frmNewBillKA.fromNamePick.text = selectedAccount[0]["accountName"];
	 frmNewBillKA.lblFromAccountBankNameKA.text = selectedAccount[0]["bankName"];  
	 var accountType = selectedAccount[0]["accountType"];
	 var accountId = selectedAccount[0]["accountID"];
//        accPreviewData[i].availableBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: availableBal};
//        accPreviewData[i].currentBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: currBal};
//        accPreviewData[i].outstandingBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: outstandingBal};
  
      if (accountType === kony.retailBanking.globalData.globals.Checking){
         frmNewBillKA.amountAccountOne.text = i18n_availableBalance;
         frmNewBillKA.fromAmountPick.text = selectedAccount[0]["availableBalance"].text;//kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(selectedAccount[0]["availableBalance"],kony.retailBanking.globalData.globals.CurrencyCode); //selectedAccount[0]["availableBalance"].text;
         frmNewBillKA.fromAccountColorPick.skin = getSkinColor(accountType); 
    } else if (accountType === kony.retailBanking.globalData.globals.Savings){
         frmNewBillKA.amountAccountOne.text = i18n_availableBalance;
         frmNewBillKA.fromAmountPick.text = selectedAccount[0]["availableBalance"].text;// kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(selectedAccount[0]["availableBalance"],kony.retailBanking.globalData.globals.CurrencyCode);
         frmNewBillKA.fromAccountColorPick.skin = getSkinColor(accountType);  
    }  else if (accountType === kony.retailBanking.globalData.globals.CreditCard){
         frmNewBillKA.amountAccountOne.text = i18n_availableBalance;
         frmNewBillKA.fromAmountPick.text = selectedAccount[0]["availableBalance"].text; //{skin :getSknlblAmount(selectedAccount[0]["currentBalance"]),text: currBal};//getSkinColor(selectedAccount[0]["currentBalance"].text); //kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(selectedAccount[0]["currentBalance"],kony.retailBanking.globalData.globals.CurrencyCode);
         frmNewBillKA.fromAccountColorPick.skin = getSkinColor(accountType); 
    }else if (accountType === kony.retailBanking.globalData.globals.Deposit){
         frmNewBillKA.amountAccountOne.text = i18n_availableBalance;
         frmNewBillKA.fromAmountPick.text = selectedAccount[0]["availableBalance"].text;//kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(selectedAccount[0]["currentBalance"],kony.retailBanking.globalData.globals.CurrencyCode);
         frmNewBillKA.fromAccountColorPick.skin = getSkinColor(accountType); 
    } 
    else if (accountType == kony.retailBanking.globalData.globals.Mortgage){
         frmNewBillKA.amountAccountOne.text = i18n_outStandingBalance;
         frmNewBillKA.fromAmountPick.text =selectedAccount[0]["outstandingBalance"].text; //kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(selectedAccount[0]["outstandingBalance"],kony.retailBanking.globalData.globals.CurrencyCode);
         frmNewBillKA.fromAccountColorPick.skin = getSkinColor(accountType); 
    }
   frmNewBillKA.fromlblAccountNumberKA.text = selectedAccount[0]["accountID"];
 }

/*
amountTwoDecimalsValidation
*/
function amountTwoDecimalsValidation(amount){	
		if(amount==null){
			amount="";
		}
		var startIndex=amount.indexOf(".", 0);		
		if(startIndex>0){
		var AmountLength=amount.length;
		var decimals=amount.slice(startIndex+1,AmountLength);
		var decimalsLength=decimals.length;
			if(decimalsLength>2){
				
				var truncatedLength=startIndex+3;
				amount=amount.slice(0,truncatedLength);
			}
			else{}
		}	
		
		return amount;
 	}

function showFormManagePayeeList() {
  	var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmManagePayeeKA");
    var navObject = new kony.sdk.mvvm.NavigationObject();
  	navObject.setRequestOptions("managepayeesegment",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
    controller.loadDataAndShowForm(navObject);
   
}

function managePayeeList(Data,segmentName){
    var segPayeeListData = Data[segmentName][segmentName].getData();
    var availableBal;
    if(segPayeeListData && segPayeeListData.length>0)
    {
      var processedSegData = [ ];
      var processedRowObj;
      for(var i in segPayeeListData){
        processedRowObj = {};
        processedRowObj["companyName"] = kony.retailBanking.util.validation.trucateTo(segPayeeListData[i]["companyName"],35,32,"...");
		processedRowObj["payeeNickName"] = kony.retailBanking.util.validation.trucateTo(segPayeeListData[i]["payeeNickName"],35,32,"...");
		processedRowObj["accountNumber"] = kony.retailBanking.util.maskAccountNumber(segPayeeListData[i]["accountNumber"]);
        processedSegData.push(processedRowObj);
      }
      Data[segmentName][segmentName].setData(processedSegData);
    }
  return Data;
}


function navigateToPayeeTransactionDetails(fromForm,toForm,segName){
	  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
	  var controller = INSTANCE.getFormController(fromForm);
      var viewModel = controller.getFormModel();
      var index = viewModel.getViewAttributeByProperty(segName, "selectedRowIndex");
      var selectedRecord = getSelectedRecord(index[1],fromForm,segName);
      var navigationObject = new kony.sdk.mvvm.NavigationObject;
      navigationObject.setCustomInfo("selectedPayeeObj",selectedRecord);
	  var payeeId = selectedRecord["payeeId"];
	  var datamodel = new kony.sdk.mvvm.DataModel;
	  navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
      navigationObject.setRequestOptions("segCompletedPaymentsKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"payeeId": payeeId}});
      navigationObject.setRequestOptions("segScheduledTransactionsKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"payeeId": payeeId}});
      navigationObject.setRequestOptions("segFailedTransactionsKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"payeeId": payeeId}});
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
//from here
function managePayeeTransactionList(Data,segmentName){
  	paybillCompletedList = [];
	paybillScheduledList = [];
  var segPayeeTransactionListData;
	 var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var listController = INSTANCE.getFormController("frmPayeeTransactionsKA");
	    var controllerContextData= listController.getContextData();
        if( controllerContextData && controllerContextData.getCustomInfo("segCompletedPaymentsKA")){
         segPayeeTransactionListData = controllerContextData.getCustomInfo("segCompletedPaymentsKA");
		}
    if(segPayeeTransactionListData && segPayeeTransactionListData.length>0)
    {
      var processedSegCompletedPaymentsData = [ ];
      var processedSegScheduledTransactionsData = [ ];
      var processedFailedTransactionsData = [ ];
      var processedRowObj;
      for(var i in segPayeeTransactionListData){
        processedRowObj = {};
        processedRowObj["description"] = kony.retailBanking.util.validation.trucateTo(segPayeeTransactionListData[i]["description"],35,32,"...");
        processedRowObj["amount"] = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(segPayeeTransactionListData[i]["amount"]);
        if(segPayeeTransactionListData[i]["isScheduled"]==="true"){
          processedRowObj["transactionDate"] = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(segPayeeTransactionListData[i]["scheduledDate"]);
          processedSegScheduledTransactionsData.push(processedRowObj);
          segPayeeTransactionListData[i]["transactionDate"]= kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(segPayeeTransactionListData[i]["scheduledDate"]);
		  segPayeeTransactionListData[i]["amount"]= kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(segPayeeTransactionListData[i]["amount"]);
          paybillScheduledList.push(segPayeeTransactionListData[i]);
        }else if(segPayeeTransactionListData[i].hasOwnProperty("statusDescription")){
          processedRowObj["transactionDate"] = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(segPayeeTransactionListData[i]["transactionDate"]);
          processedSegCompletedPaymentsData.push(processedRowObj);
          segPayeeTransactionListData[i]["transactionDate"]= kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(segPayeeTransactionListData[i]["transactionDate"]);
		  segPayeeTransactionListData[i]["amount"]= kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(segPayeeTransactionListData[i]["amount"]);
          paybillCompletedList.push(segPayeeTransactionListData[i]);
        }else{
          processedRowObj["transactionDate"] = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(segPayeeTransactionListData[i]["transactionDate"]);
          processedFailedTransactionsData.push(processedRowObj);
        }
      }
      if(processedSegCompletedPaymentsData.length >0){
        frmPayeeTransactionsKA.segCompletedPaymentsKA.widgetDataMap = { 
                transactionDate : "transactionDate",
                transactionName : "description",
                transactionAmount : "amount",
                lblSepKA : "checkImage"
                                 };
        frmPayeeTransactionsKA.segCompletedPaymentsKA.setData(processedSegCompletedPaymentsData);
        frmPayeeTransactionsKA.segCompletedPaymentsKA.isVisible = true;
        frmPayeeTransactionsKA.LabelNoCompletedTransactionsKA.isVisible = false;
       // paybillCompletedList = processedSegCompletedPaymentsData;
      }else{
        frmPayeeTransactionsKA.segCompletedPaymentsKA.isVisible = false;
        frmPayeeTransactionsKA.LabelNoCompletedTransactionsKA.isVisible = true;
      }
      if(processedSegScheduledTransactionsData.length >0){
        frmPayeeTransactionsKA.segScheduledTransactionsKA.widgetDataMap = { 
                transactionDate : "transactionDate",
                transactionName : "description",
                transactionAmount : "amount",
                lblSepKA : "checkImage"
                                 };
        frmPayeeTransactionsKA.segScheduledTransactionsKA.setData(processedSegScheduledTransactionsData);
        frmPayeeTransactionsKA.segScheduledTransactionsKA.isVisible = true;
        frmPayeeTransactionsKA.LabelNoScheduledTransactionsKA.isVisible = false;
       // paybillScheduledList = processedSegScheduledTransactionsData;
      }else{
        frmPayeeTransactionsKA.segScheduledTransactionsKA.isVisible = false;
        frmPayeeTransactionsKA.LabelNoScheduledTransactionsKA.isVisible = true;
      }
      if(processedFailedTransactionsData.length >0){
                frmPayeeTransactionsKA.segFailedTransactionsKA.widgetDataMap = { 
                transactionDate : "transactionDate",
                transactionName : "description",
                transactionAmount : "amount",
                lblSepKA : "checkImage"
                                 };
        frmPayeeTransactionsKA.segFailedTransactionsKA.setData(processedFailedTransactionsData);
        frmPayeeTransactionsKA.segFailedTransactionsKA.isVisible = true;
        frmPayeeTransactionsKA.LabelNoFailedTransactionsKA.isVisible = false;
      }else{
        frmPayeeTransactionsKA.segFailedTransactionsKA.isVisible = false;
        frmPayeeTransactionsKA.LabelNoFailedTransactionsKA.isVisible = true;
      }
    }else{
        frmPayeeTransactionsKA.segCompletedPaymentsKA.isVisible = false;
        frmPayeeTransactionsKA.LabelNoCompletedTransactionsKA.isVisible = true;
        frmPayeeTransactionsKA.segScheduledTransactionsKA.isVisible = false;
        frmPayeeTransactionsKA.LabelNoScheduledTransactionsKA.isVisible = true;
        frmPayeeTransactionsKA.segFailedTransactionsKA.isVisible = false;
        frmPayeeTransactionsKA.LabelNoFailedTransactionsKA.isVisible = true;
    }
}

function navigateToPayBillDetails(segName,selctedIndex){
 //"segScheduledTransactionsKA"  segCompletedPaymentsKA
 BillPayfromForm="ManagePayee";
 frmBillDetailsKA.lblSelectedRowIndexKA.text = selctedIndex;
   var userAgent = kony.os.userAgent();
  if(segName === "segScheduledTransactionsKA"){
   	  frmBillDetailsKA.lblNotesKA.text = i18n_scheduledForC;
   	  frmBillDetailsKA.btnEditKA.isVisible = true;
      frmBillDetailsKA.btnCancelTransactionKA.isVisible = true;
      frmBillDetailsKA.btnRepeatTransactionKA.isVisible = false;
      frmBillDetailsKA.lblTransactionAmountKA.text =  paybillScheduledList[selctedIndex].amount;
      frmBillDetailsKA.lblTransactionNameKA.text = paybillScheduledList[selctedIndex].description;
      frmBillDetailsKA.lblCardNumberKA.text = kony.retailBanking.util.maskAccountNumber(paybillScheduledList[selctedIndex].fromAccountNumber);
      frmBillDetailsKA.lblTransactionNotesKA.text = paybillScheduledList[selctedIndex].transactionDate;
      frmBillDetailsKA.lblTransactionIdKA.text = paybillScheduledList[selctedIndex].transactionId;
		if(userAgent === "iPhone")
        {
          frmBillDetailsKA.flxTransferPayTitleLabelKA.text=i18n_ScheduledBillDetails;
        }
        else
        {
          frmBillDetailsKA.flxAndroidTitleLabelKA.text=i18n_ScheduledBillDetails;
        }
   }else{
    frmBillDetailsKA.lblNotesKA.text = i18n_transactionDate;
    frmBillDetailsKA.btnEditKA.isVisible = false;
    frmBillDetailsKA.btnCancelTransactionKA.isVisible = false;
    frmBillDetailsKA.btnRepeatTransactionKA.isVisible = true;
    frmBillDetailsKA.lblTransactionAmountKA.text = paybillCompletedList[selctedIndex].amount;
    frmBillDetailsKA.lblTransactionNameKA.text = paybillCompletedList[selctedIndex].description;
    frmBillDetailsKA.lblCardNumberKA.text = kony.retailBanking.util.maskAccountNumber(paybillCompletedList[selctedIndex].fromAccountNumber);
    frmBillDetailsKA.lblTransactionNotesKA.text = paybillCompletedList[selctedIndex].transactionDate;
    frmBillDetailsKA.lblTransactionIdKA.text = paybillCompletedList[selctedIndex].transactionId;
    if(userAgent === "iPhone")
        {
          frmBillDetailsKA.flxTransferPayTitleLabelKA.text=i18n_CompletedBillDetails;
        }
        else
        {
          frmBillDetailsKA.flxAndroidTitleLabelKA.text=i18n_CompletedBillDetails;
        }
  }
  frmBillDetailsKA.show();
}
function scheduledBillpayEdit(){
  var selectedIndex = frmBillDetailsKA.lblSelectedRowIndexKA.text;
  //EditPayBillTransfer(paybillScheduledList[selectedIndex]);
  //gblPayBillTransaction = "Pay a Bill Edit";
  detailsBillPayClick(paybillScheduledList[selectedIndex],"EditExistingTransfer");
}
function repeatCompletedBillPay(){
  var selectedIndex = frmBillDetailsKA.lblSelectedRowIndexKA.text;
  detailsBillPayClick(paybillCompletedList[selectedIndex]);
}

function CancelBillPayAlertFunction(res){
  var transactionId =  frmBillDetailsKA.lblTransactionIdKA.text;
  if(res)
  {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var options ={    "access": "online",
                    "objectName": "RBObjects"
               };
    var headers = {"session_token":kony.retailBanking.globalData.session_token};
    var serviceName = "RBObjects";
    var modelObj = INSTANCE.getModel("Transactions",serviceName,options);
    var dataObject = new kony.sdk.dto.DataObject("Transactions");
    var record = {"transactionId":transactionId}; 
    dataObject.setRecord(record);
    var serviceOptions = {"dataObject":dataObject, "headers":{"session_token":kony.retailBanking.globalData.session_token}};
    modelObj.remove(serviceOptions, billPayDeleteSuccess, customErrorCallback);
  }
  function billPayDeleteSuccess(res)
  {
    goBackInBetweenBillPay();
  }
}


function populatePayeeDetailsinTransactionList(currentForm){
        var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var listController = INSTANCE.getFormController(currentForm);
	    var controllerContextData= listController.getContextData();
        if( controllerContextData && controllerContextData.getCustomInfo("selectedPayeeObj")){
         var payeeDetails =  controllerContextData.getCustomInfo("selectedPayeeObj");
         frmPayeeTransactionsKA.lblTitleKA.text = payeeDetails["payeeNickName"];     
         frmPayeeTransactionsKA.lblPayeeNameKA.text = payeeDetails["companyName"];
         frmPayeeTransactionsKA.lblCardNumberKA.text = kony.retailBanking.util.maskAccountNumber(payeeDetails["accountNumber"]);
        }
}

function PopulatePayeeDetails(){
         /* var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
         var listController = INSTANCE.getFormController("frmPayeeTransactionsKA");
	     var controllerContextData= listController.getContextData();
         if( controllerContextData && controllerContextData.getCustomInfo("selectedPayeeObj")){
         var payeeDetails =  controllerContextData.getCustomInfo("selectedPayeeObj");
         frmPayeeDetailsKA.Label05b62c7983b484e.text = payeeDetails["companyName"]; 
         frmPayeeDetailsKA.Label06b74b1ba15f34d.text = payeeDetails["payeeNickName"];
         frmPayeeDetailsKA.Label05667124c8f964b.text = payeeDetails["accountNumber"];
         frmPayeeDetailsKA.Label023201109baf64b.text = payeeDetails["zipCode"];
		}*/
}

function navigateToPayeeEdit(){
      var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmEditPayeeKA");
    var datamodel = new kony.sdk.mvvm.DataModel;
    var navigationObject = new kony.sdk.mvvm.NavigationObject();
    var listController = INSTANCE.getFormController("frmPayeeTransactionsKA");
    var controllerContextData= listController.getContextData();
         if( controllerContextData && controllerContextData.getCustomInfo("selectedPayeeObj")){
         var payeeDetails =  controllerContextData.getCustomInfo("selectedPayeeObj");
         var payeeID = payeeDetails["payeeId"];
        }
    navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
    navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"payeeId": payeeID}});
    controller.loadDataAndShowForm(navigationObject);
}
function navigateToPayeeDetails(){
      var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmPayeeDetailsKA");
    var datamodel = new kony.sdk.mvvm.DataModel;
    var navigationObject = new kony.sdk.mvvm.NavigationObject();
    var listController = INSTANCE.getFormController("frmPayeeTransactionsKA");
    var controllerContextData= listController.getContextData();
         if( controllerContextData && controllerContextData.getCustomInfo("selectedPayeeObj")){
         var payeeDetails =  controllerContextData.getCustomInfo("selectedPayeeObj");
         var payeeID = payeeDetails["payeeId"];
        }
    navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
    navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"payeeId": payeeID}});
    controller.loadDataAndShowForm(navigationObject);
}

function showSuccessEditPayee(){
	var currentForm = kony.application.getCurrentForm().id;
	var previousForm = kony.application.getPreviousForm().id;

	if(currentForm == 'frmAddNewPayeeKA'){
		if (previousForm == 'frmManagePayeeKA'){
			frmAddPayeeSuccessKA.show();
		} else if(previousForm == 'frmNewBillKA'){
	      navigateTofrmAddPayeeSuccessBillPayKA();
		}   
	} else if(currentForm == 'frmEditPayeeKA'){
		if (previousForm == 'frmPayeeDetailsKA'){
			frmEditPayeeSuccessKA.show();
		} else if(previousForm == 'frmNewBillKA'){
			frmEditPayeeSuccessBillPayKA.show();
		}
	}
}
function navigateTofrmAddPayeeSuccessBillPayKA(){
      var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
      var listController = INSTANCE.getFormController("frmAddPayeeSuccessBillPayKA");
      var navObject = new kony.sdk.mvvm.NavigationObject();
      navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
      listController.performAction("navigateTo",["frmAddPayeeSuccessBillPayKA",navObject]);
}

function navigateToNewPayBill(){
  gblPayBillTransaction = "Pay a Bill";
//alert("entering in to pay a  bill");
//kony.print("entering gblPayBillTransaction" +gblPayBillTransaction);
var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
var listController = INSTANCE.getFormController("frmNewBillKA");
var navObject = new kony.sdk.mvvm.NavigationObject();
navObject.setCustomInfo("operationType","ADD");
navObject.setRequestOptions("segInternalTOAccountsPayKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
listController.performAction("navigateTo",["frmNewBillKA",navObject]); 
newPayBillPreShow();
}

function navigateToNewPayBillfromEditPayee(payeeRecord){
  gblPayBillTransaction = "Pay a Bill";
//alert("entering in to pay a  bill");
//kony.print("entering gblPayBillTransaction" +gblPayBillTransaction);
var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
var listController = INSTANCE.getFormController("frmNewBillKA");
var navObject = new kony.sdk.mvvm.NavigationObject();
navObject.setCustomInfo("operationType","ADD");
navObject.setRequestOptions("segInternalTOAccountsPayKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
listController.performAction("navigateTo",["frmNewBillKA",navObject]); 
newPayBillPreShowfromPayeeDetails(payeeRecord);
}

function navigateToNewPayBillfromPayeeTransactionDetails(payeeRecord){
  gblPayBillTransaction = "Pay a Bill";
//alert("entering in to pay a  bill");
//kony.print("entering gblPayBillTransaction" +gblPayBillTransaction);
var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
var listController = INSTANCE.getFormController("frmNewBillKA");
var navObject = new kony.sdk.mvvm.NavigationObject();
navObject.setCustomInfo("operationType","ADD");
navObject.setRequestOptions("segInternalTOAccountsPayKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
listController.performAction("navigateTo",["frmNewBillKA",navObject]); 
newPayBillPreShowfromPayeeDetails(payeeRecord);
}

function newPayBillPreShowfromPayeeDetails(payeeRecord){
  frmNewBillKA.transferPayTitleLabel.text=i18n_payBill;
  
  frmNewBillKA.fromCardTitle.setVisibility(true);
  frmNewBillKA.fromCardInner.setVisibility(true);
  frmNewBillKA.fromAccountPick.setVisibility(false);
  
  frmNewBillKA.toCardTitle.setVisibility(false);
  frmNewBillKA.toCardInner.setVisibility(false);
  frmNewBillKA.toAccountPick.setVisibility(true);
  
  frmNewBillKA.fromCard.setVisibility(true);
  frmNewBillKA.toCard.setVisibility(true);
  frmNewBillKA.editToCard.setVisibility(true);
  
  frmNewBillKA.fromNamePick.text=" ";
  frmNewBillKA.toNamePick.text=" ";
  frmNewBillKA.amountTextField.text="";
  

  var date = new Date();
  var year =   date.getFullYear();
  var month = date.getMonth()+1;
  var day = date.getDate();
  var startDate=[day,month,year];
  var endDate = [day,month,year+1];
  
  frmNewBillKA.lblCurrencyType.text=(kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount("0")).substring(0,1);
  frmNewBillKA.calDateKA.validStartDate=startDate;
  frmNewBillKA.calDateKA.validEndDate=endDate;
  frmNewBillKA.calDateKA.dateComponents = [parseFloat(day), parseFloat(month), parseFloat(year), 0.0, 0.0, 0.0];
   // setup amountCard
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmNewBillKA");
  var viewModel = controller.getFormModel();
  var fromAccountNumber =  viewModel.setViewAttributeByProperty("fromlblAccountNumberKA","text","");
  var toAccountNumber =    viewModel.setViewAttributeByProperty("tolblAccountNumberKA","text","");
  frmNewBillKA.toNamePick.text = payeeRecord["payeeNickName"];
  var payeeId = payeeRecord["payeeId"];
  frmNewBillKA.tolblAccountNumberKA.text = payeeId;

  viewModel.setViewAttributeByProperty("lblBankNameHeader","text",kony.retailBanking.globalData.globals.BankName); 
  var settingsObj = kony.store.getItem("settingsflagsObject");
  var preferedSelAcnt=kony.retailBanking.globalData.accounts.searchAccountById(settingsObj.DefaultPaymentAcctNo);
  
    if (preferedSelAcnt !==""){
         //onclicksegmentPay("from");
         var tempId = preferedSelAcnt.accountID;
         var nickNameData = preferedSelAcnt.nickName;
             //Need To Get This From Service
         if(nickNameData.trim() == "")
               viewModel.setViewAttributeByProperty("fromNamePick","text",preferedSelAcnt.accountName);
          else
             viewModel.setViewAttributeByProperty("fromNamePick","text",nickNameData);              
              //formmodel.setViewAttributeByProperty("fromNamePick","text",preferedSelAcnt.nickName);
             viewModel.setViewAttributeByProperty("fromAmountPick","text",kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(preferedSelAcnt.availableBalance,kony.retailBanking.globalData.globals.CurrencyCode));
            
            viewModel.setViewAttributeByProperty("fromlblAccountNumberKA","text",preferedSelAcnt.accountID);
              viewModel.setViewAttributeByProperty("fromAccountColorPick","skin",getSkinColor(preferedSelAcnt.accountType));
              viewModel.setViewAttributeByProperty("lblFromAccountBankNameKA","text",preferedSelAcnt.bankName);
              //viewModel.setViewAttributeByProperty("amountAccountOne","text",preferedSelAcnt.availBalanView);
  			  viewModel.performActionOnView("fromAccountPick","setVisibility",[true]);
              viewModel.setViewAttributeByProperty("fromAccountnumber","text",preferedSelAcnt.accountID);
              viewModel.setViewAttributeByProperty("fromAccountPick","opacity",1);
              frmNewBillKA.fromCardInner.opacity=1; 
            
//   				if(DepositCardHeight!="0dp")
//     			{
//                   formmodel.setViewAttributeByProperty("fromCard","height",defaultCardHeight);
//     			}
             // onclicksegmentPay("from");
              viewModel.performActionOnView("amountAccountOne","setVisibility",[true]);
              viewModel.performActionOnView("editFromCard","setVisibility",[true]);
              viewModel.performActionOnView("fromCardTitle","setVisibility",[false]);
              viewModel.performActionOnView("fromCardInner","setVisibility",[false]);
              viewModel.performActionOnView("fromAccountPick","setVisibility",[true]);
          
        }
}

function populatePayeeTo(){
  selectedPayee =frmNewBillKA.segInternalTOAccountsPayKA.selectedItems;
  frmNewBillKA.toNamePick.text = selectedPayee[0]["payeeNickName"];
  var payeeId = selectedPayee[0]["payeeId"];
  frmNewBillKA.tolblAccountNumberKA.text = payeeId;
}
/*
onclick of Add payee in Add Payee Screen
*/
function newAddPayee()
{
   var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
var controller = INSTANCE.getFormController("frmAddNewPayeeKA");
//   var viewModel = controller.getFormModel();
 // var amount = viewModel.getViewAttributeByProperty("amountTextField","text");
  //var fromAccountBal =   viewModel.getViewAttributeByProperty("fromAmountPick","text");
 // var fromIndex = viewModel.getViewAttributeByProperty("segInternalFromAccountsPayKA", "selectedRowIndex");
 // var toIndex = viewModel.getViewAttributeByProperty("segInternalTOAccountsPayKA", "selectedRowIndex");
  //var fromAccountNumber =  viewModel.getViewAttributeByProperty("fromlblAccountNumberKA","text");
  //var toAccountNumber =    viewModel.getViewAttributeByProperty("tolblAccountNumberKA","text");
  var companyname = frmAddNewPayeeKA.newPayeeNameTextfield.text;
  var nickname=frmAddNewPayeeKA.nickName.text;
  var accountNumber=frmAddNewPayeeKA.newPayeeAccountNumberTextField.text;
  
  var reenterNumber=frmAddNewPayeeKA.tboxReenterAccountNumberKA.text;
  var zipcode = frmAddNewPayeeKA.zipcode.text;
 if((companyname===null) || (companyname==="")){
  	alert(i18n_companyNameAlert);
}
 else if(nickname == null || kony.string.trim(nickname) == "" || nickname == undefined){
  	alert(i18n_payeeNickNameAlert);
}else if(accountNumber == null || kony.string.trim(accountNumber) == "" || accountNumber == undefined){
	alert(i18n_enterAccountNumberAlert);
 }
  //else if(accountNumber !== null || kony.string.trim(accountNumber) !== "" || accountNumber !== undefined){
// 	alert("Please enter the Account Number to proceed")
// }else if(accountNumber.length < 16){
//     	alert("Please enter the correct account Number to proceed");
//       }else if(accountNumber.length > 16){
//             alert("Please enter only 16 digits to enter the account Number to proceed");
      // }else if(debitSecurityCode.length < 3){  
// 			            HWUtility.displayMessage("Please enter 3 digit security code to proceed.");	
// 			}
else if(reenterNumber == null || kony.string.trim(reenterNumber) == "" || reenterNumber == undefined){
             alert(i18n_reenterAccountNumberAlert);
       }
         else if(accountNumber != reenterNumber){
             alert(i18n_accountNumberReAccountNumberAlert);
   }
else  if (zipcode == null || kony.string.trim(zipcode) == "" || zipcode == undefined){
	alert(i18n_enterZipCode);
}
//   else if(zipcode.length < 6){
//       alert("Please enter correct  Zipcode to proceed");
//     }else if (zipcode.length > 6){
//       alert("Please enter only 6 number Zipcode not more than to proceed.");
//     }

  else if(zipcode != null){
     
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController("frmAddNewPayeeKA");
  listController.performAction("saveData"); 
  
          }
  
}

 function fetchAddPayeeData(){

  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var options ={    "access": "online",
                "objectName": "RBObjects"
               };
  var headers = {"session_token":kony.retailBanking.globalData.session_token};
  var serviceName = "RBObjects";
  var modelObj = INSTANCE.getModel("Payee",serviceName,options);
  var dataObject = new kony.sdk.dto.DataObject("Payee");
  var serviceOptions = {"dataObject":dataObject, "headers":headers};
  modelObj.fetch(serviceOptions, dataSuccess, dataError);

  function dataSuccess(response){
    frmNewBillKA.segInternalTOAccountsPayKA.widgetDataMap={
      lblContact:"payeeNickName",
      
    };
    frmNewBillKA.segInternalTOAccountsPayKA.setData(response);
  }
  function dataError(err){
    kony.sdk.mvvm.log.error("Error occured while fetching the data for the Transaction entity");
    customErrorCallback(err);
  }
}

function EditPayBillTransfer(tempdata){
	
   gblPayBillTransaction = "Pay a Bill";	
   
  frmNewBillKA.transferPayTitleLabel.text=i18n_editPayBill;
  
  frmNewBillKA.fromCardTitle.setVisibility(false);
  frmNewBillKA.fromCardInner.setVisibility(false);
  frmNewBillKA.fromAccountPick.setVisibility(true);
  frmNewBillKA.toCardTitle.setVisibility(false);
  frmNewBillKA.toCardInner.setVisibility(false);
  frmNewBillKA.toAccountPick.setVisibility(true);
  frmNewBillKA.fromCard.setVisibility(true);
  frmNewBillKA.toCard.setVisibility(true);
  frmNewBillKA.amountCard.setVisibility(true);
  frmNewBillKA.dateCard.setVisibility(true);
  frmNewBillKA.editToCard.setVisibility(false);
  
  		var date = new Date();
        var year =   date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();
        var startDate=[day,month,year];
        var endDate = [day,month,year+1];
		frmNewBillKA.calDateKA.validStartDate=startDate;
        frmNewBillKA.calDateKA.validEndDate=endDate;
    if(tempdata.isScheduled == "true")
    {
  		var date = tempdata.scheduledDate;
  		var year = date.slice(0,4);
  		var month = date.slice(5,7);
  		var day = date.slice(8,10);
  		frmNewBillKA.calDateKA.dateComponents = [parseFloat(day), parseFloat(month), parseFloat(year), 0.0, 0.0, 0.0];
    }else{
        frmNewBillKA.calDateKA.dateComponents = [parseFloat(day), parseFloat(month), parseFloat(year), 0.0, 0.0, 0.0];		
	}
  
 // frmNewBillKA.lblCurrencyType.text=(kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount("0")).substring(0,1);
 frmNewBillKA.lblCurrencyType.text=kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount("",kony.retailBanking.globalData.globals.CurrencyCode); 
  var price = tempdata.amount.slice(1,tempdata.amount.length);
  frmNewBillKA.amountTextField.text= parseFloat(price.replace(/[^0-9-.]/g, ''));
  
              var  accPreviewData= kony.retailBanking.datastore.getAccountListObject().response;
            kony.print("accPreviewData"+JSON.stringify(accPreviewData));
            for(var i=0;i< accPreviewData.length;i++){
               accPreviewData[i].accountName = kony.retailBanking.util.validation.trucateTo(accPreviewData[i].accountName,35,32,"...");
               availableBal = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accPreviewData[i].availableBalance,kony.retailBanking.globalData.globals.CurrencyCode); 
               if(accPreviewData[i].accountType=="CreditCard"){
                    availableBal = "-"+availableBal;
                  }
              accPreviewData[i].availableBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: availableBal};
               accPreviewData[i].flxClr= {skin:getSkinColor(accPreviewData[i].accountType)};
          }
            frmNewBillKA.segInternalFromAccountsPayKA.widgetDataMap={
              nameAccount1:"accountName",
              amountAccount1:"availableBalance",
              typeAccount:"accountType",
              lblColorKA:"flxClr"
                             };
            //alert("enter in to the datamap");
      //kony.retailBanking.datastore.setAccountListObject(data["segInternalFromAccountsKA"]);
          //alert("entering in to the  datastore");
        // kony.retailBanking.globalData.accounts.setAccountsData(data["segInternalFromAccountsKA"]);
          
          var tempdataAcc= getFilteredFromAccounts(accPreviewData);
         // kony.print("entering in to tempdata"+tempdata);
          //alert("tempdata retrieved");
         // kony.print("entering in to tempdata"+JSON.stringify(tempdata));
          
          frmNewBillKA.segInternalFromAccountsPayKA.setData(tempdataAcc);
          frmNewBillKA.segInternalFromAccountsPayKA.setVisibility(true);
        
		  var selectedAccount = kony.retailBanking.globalData.accounts.searchAccountById(tempdata.fromAccountNumber);
          frmNewBillKA.fromNamePick.text = selectedAccount["accountName"];
          var accountType = selectedAccount["accountType"];
          var accountId = selectedAccount["accountID"];
          frmNewBillKA.fromAccountColorPick.skin = getSkinColor(selectedAccount["accountType"]);
  if (accountType === kony.retailBanking.globalData.globals.Checking){
         frmNewBillKA.amountAccountOne.text = i18n_availableBalance;
           frmNewBillKA.fromAmountPick.text = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(selectedAccount["availableBalance"],kony.retailBanking.globalData.globals.CurrencyCode);
           frmNewBillKA.fromAccountColorPick.skin = getSkinColor(selectedAccount["accountType"]);  
  } else if (accountType === kony.retailBanking.globalData.globals.Savings){
         frmNewBillKA.amountAccountOne.text = i18n_availableBalance;
         frmNewBillKA.fromAmountPick.text = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(selectedAccount["availableBalance"],kony.retailBanking.globalData.globals.CurrencyCode);
         frmNewBillKA.fromAccountColorPick.skin = getSkinColor(selectedAccount["accountType"]);
    } else if (accountType === kony.retailBanking.globalData.globals.CreditCard){
         frmNewBillKA.amountAccountOne.text = i18n_currentBalance;
         frmNewBillKA.fromAmountPick.text = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(selectedAccount["currentBalance"],kony.retailBanking.globalData.globals.CurrencyCode);
         frmNewBillKA.fromAccountColorPick.skin = getSkinColor(selectedAccount["accountType"]);
    }else if (accountType === kony.retailBanking.globalData.globals.Deposit){
         frmNewBillKA.amountAccountOne.text = i18n_currentBalance;
           frmNewBillKA.fromAmountPick.text = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(selectedAccount["currentBalance"],kony.retailBanking.globalData.globals.CurrencyCode);
           frmNewBillKA.fromAccountColorPick.skin = getSkinColor(selectedAccount["accountType"]);
    } 
    else if (accountType == kony.retailBanking.globalData.globals.Mortgage){
         frmNewBillKA.amountAccountOne.text = i18n_outStandingBalance;
         frmNewBillKA.fromAmountPick.text = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(selectedAccount["outstandingBalance"],kony.retailBanking.globalData.globals.CurrencyCode);
         frmNewBillKA.fromAccountColorPick.skin = getSkinColor(selectedAccount["accountType"]);
    }

   frmNewBillKA.fromlblAccountNumberKA.text = selectedAccount["accountID"];


  frmNewBillKA.toNamePick.text = tempdata["payeeNickName"];
  var payeeId = tempdata["payeeId"];
  frmNewBillKA.tolblAccountNumberKA.text = payeeId;
  
          
  
   // setup amountCard
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmNewBillKA");
  var viewModel = controller.getFormModel();
  var controllerContextData = controller.getContextData();
  if(controllerContextData){
  controllerContextData.setCustomInfo("operationType","EDIT");
  controllerContextData.setCustomInfo("transactionId",tempdata.transactionId);
  }else{
    controllerContextData = new kony.sdk.mvvm.NavigationObject();
    controllerContextData.setCustomInfo("operationType","ADD");
    controller.setContextData(controllerContextData);
  }
  
  controller.getFormModel().showView();

}


function navigateToNewPayBillfromBillPayeeDetailsEdit(){
    gblPayBillDetailsTransaction = "Bill Details";
    alert(i18n_billPayEdit);
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var listController = INSTANCE.getFormController("frmNewBillKA");
    var navObject = new kony.sdk.mvvm.NavigationObject();
    var controllerContextData = listController.getContextData();
    if(controllerContextData.getCustomInfo("operationType") == "ADD"){
	   navObject.setDataModel(null,kony.sdk.mvvm.OperationType.ADD, "form");
    }
	navObject.setCustomInfo("operationType","ADD");
	navObject.setRequestOptions("segInternalTOAccountsPayKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
    listController.performAction("navigateTo",["frmNewBillKA",navObject]);
	//newPayBillPreShowfromPayeeDetailsEdit(payeeRecord); 
}

function newPayBillPreShowfromPayeeDetailsEdit(payeeRecord){
  frmNewBillKA.transferPayTitleLabel.text=i18n_editPayBill;
  
  frmNewBillKA.fromCardTitle.setVisibility(true);
  frmNewBillKA.fromCardInner.setVisibility(true);
  frmNewBillKA.fromAccountPick.setVisibility(false);
  
  frmNewBillKA.toCardTitle.setVisibility(false);
  frmNewBillKA.toCardInner.setVisibility(false);
  frmNewBillKA.toAccountPick.setVisibility(true);
  
  frmNewBillKA.fromCard.setVisibility(true);
  frmNewBillKA.toCard.setVisibility(true);
  frmNewBillKA.editToCard.setVisibility(true);
  
  frmNewBillKA.fromNamePick.text=" ";
  frmNewBillKA.toNamePick.text=" ";
  frmNewBillKA.amountTextField.text="";
  

  var date = new Date();
  var year =   date.getFullYear();
  var month = date.getMonth()+1;
  var day = date.getDate();
  var startDate=[day,month,year];
  var endDate = [day,month,year+1];
  
  frmNewBillKA.lblCurrencyType.text=(kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount("0")).substring(0,1);
  frmNewBillKA.calDateKA.validStartDate=startDate;
  frmNewBillKA.calDateKA.validEndDate=endDate;
  frmNewBillKA.calDateKA.dateComponents = [parseFloat(day), parseFloat(month), parseFloat(year), 0.0, 0.0, 0.0];
   // setup amountCard
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmNewBillKA");
  var viewModel = controller.getFormModel();
  var fromAccountNumber =  viewModel.setViewAttributeByProperty("fromlblAccountNumberKA","text","");
  var toAccountNumber =    viewModel.setViewAttributeByProperty("tolblAccountNumberKA","text","");
  frmNewBillKA.toNamePick.text = payeeRecord["payeeNickName"];
  var payeeId = payeeRecord["payeeId"];
  frmNewBillKA.tolblAccountNumberKA.text = payeeId;

}

//onclick og segement on Scheduled from ManagePayee

function navigateToTransactionDetailsPayBill(fromForm,toForm,segName){
  frmBillDetailsKA.editScheduledTransactionButton.isVisible = true;
  frmBillDetailsKA.btnRepeatTransactionKA.isVisible = true;
  //frmBillDetailsKA.Copydivider06e184b7d586e4a.isVisible = true;
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController(fromForm);
  var viewModel = controller.getFormModel();
  var index = viewModel.getViewAttributeByProperty(segName, "selectedRowIndex");
  var response;
  frmBillDetailsKA.lblseletedIndex.text=index[1];
  var selectedTransactionRecord = getSelectedTransactionRecord(index[1],fromForm,segName);
  var navigationObject = new kony.sdk.mvvm.NavigationObject();
  response = kony.retailBanking.globalData.payBill.getpayBillData(segName);
  navigationObject.setCustomInfo("selectedPayBillObj",response[index[1]]); 
  navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  controller.performAction("navigateTo",[toForm,navigationObject]);
}

/**
  Used To getSelected Transaction Reccord
*/
function getSelectedTransactionRecord(index,formName,segmentName){
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

 