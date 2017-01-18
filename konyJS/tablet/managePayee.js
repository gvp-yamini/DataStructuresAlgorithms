var processedSegCompletedPaymentsData;
var processedSegScheduledTransactionsData;
var processedFailedTransactionsData;
var selectedBill = null;
function flexWidthReduceOnClick(){
  if(moreLanding.navigationWrapper.registeredPayeerightWrapper.width==="38%")
  {
    moreLanding.navigationWrapper.registeredPayeerightWrapper.animate(
      kony.ui.createAnimation({100:
                               { 
                                 "right": '32%',
                                 "stepConfig":{"timingFunction": easeOut}}}),
      {fillMode: forwards ,duration:0.3},
      {animationEnd: function() {} });
  }
}
function androidFailedTransaction(){
   //closeAndroidNav();
  var selectedRow = moreLanding.segFailedTransactionsKA.selectedRowIndex[1];
	   moreLanding.registeredPayeerightWrapper.animate(
      kony.ui.createAnimation({100:
                             { 
							 "left": '100%',
                               "width":'62%',        
                               "stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration:0.3},
    {animationEnd: function() {} });
       moreLanding.payeeNickName.animate(
    kony.ui.createAnimation({100:
                             { 
                               "width":'62%',
                               "left":'0%',
                               "stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration:0.3},
    {animationEnd: function() {} });
       moreLanding.flexBillDetails.animate(
    kony.ui.createAnimation({100:
                             { 
                               "left":'62%',
                               "stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration:0.3},
    {animationEnd: function() {} });
}
// Onclick of close button of PayeeNickName
function payeeNickNameClose(){
  retainSelectionOff("segRegisteredPayee");
  moreLanding.payeeNickName.animate(
    kony.ui.createAnimation({100:
                             { 
                               "left": '100%',
                               "stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration:0.3},
    {animationEnd: function() {} });
  moreLanding.flexBillDetails.animate(
    kony.ui.createAnimation({100:
                             {                                
                               "left": '100%',
                               "stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration:0.3},
    {animationEnd: function() {} });
  moreLanding.leftWrapper.animate(
    kony.ui.createAnimation({100:
                             {                                
                               "left": '0%',
                               "stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration:0.3},
    {animationEnd: function() {} });
  	  moreLanding.registeredPayeerightWrapper.animate(
    kony.ui.createAnimation({100:
                             { 
                               "width":'62%',
                               //"right": '0%',
                               "left":'38%',
                               "stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration:0.3},
    {animationEnd: function() {} });      	
 }
//Onclick of close btn in Registered Payee
function RegisteredPayeeOnClose(){
   moreLanding.registeredPayeerightWrapper.animate(
    kony.ui.createAnimation({100:
                             { 
                               "width":'62%',
                               "left":'100%',
                               "stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration:0.3},
    {animationEnd: function() {} });
  	moreLanding.payeeNickName.animate(
    kony.ui.createAnimation({100:
                             {                           
                               "left": '100%',
                               "stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration:0.3},
    {animationEnd: function() {} });
    moreLanding.leftWrapper.animate(
    kony.ui.createAnimation({100:
                             { 
                               "left": '0%',
                               "stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration:0.3},
    {animationEnd: function() {} });
}
// Onclick of the close mark of the Payee Details
function OnclickPayeeDetailsClose(){
    moreLanding.payeeNickName.animate(
    kony.ui.createAnimation({100:
                             {
                               "left": '100%',
                               "stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration:0.3},
    {animationEnd: function() {} });
  moreLanding.flexBillDetails.animate(
    kony.ui.createAnimation({100:
                             { 
                               "left": '100%',
                               "stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration:0.3},
    {animationEnd: function() {} });
  moreLanding.leftWrapper.animate(
    kony.ui.createAnimation({100:
                             { 
                               "left": '0%',
                               "stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration:0.3},
    {animationEnd: function() {} });
  	  moreLanding.registeredPayeerightWrapper.animate(
    kony.ui.createAnimation({100:
                             { 
                               "width":'62%',
                               //"right": '0%',
                               "left":'38%',
                               "stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration:0.3},
    {animationEnd: function() {} });
}
//On click of close mark in the Edit payee flex
function OnClickEditPayeeClose(){
  moreLanding.newPayeeWrapperUpdate.isVisible = false;
  moreLanding.newPayeeWrapperEditPayee.isVisible = false;
  moreLanding.newPayeeWrapperPayeeDetails.isVisible = false;
  moreLanding.newPayeeWrapper.isVisible = false;
    moreLanding.registeredPayeerightWrapper.animate(
      kony.ui.createAnimation({100:
                             { 
                               "width":'38%',
                               "left": '0%',
                               "stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration:0.3},
    {animationEnd: function() {} });
      moreLanding.payeeNickName.animate(
      kony.ui.createAnimation({100:
                             { 
                               "left": '38%',
                               "stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration:0.3},
    {animationEnd: function() {} });
  payeeNickNameClose();
  	fetchManagePayees();
}
function OnclickBillDetailsClose(){ 
  moreLanding.flexBillDetails.animate(
      kony.ui.createAnimation({100:
                             { 
                               "left": '100%',
                               "stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration:0.3},
    {animationEnd: function() {} });
      moreLanding.payeeNickName.animate(
      kony.ui.createAnimation({100:
                             { 
                               "left": '38%',
                               "stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration:0.3},
    {animationEnd: function() {} });
   moreLanding.registeredPayeerightWrapper.animate(
      kony.ui.createAnimation({100:
                             { 
                              "width":'38%',
                               "left": '0%',
                               "stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration:0.3},
    {animationEnd: function() {} });
}
//setting selected payee details
function setPayeeDetails(selectedRecord)
{
  moreLanding.CopyaccountDetailsHeader0abc66c997f234c.text = selectedRecord.payeeNickName;
  moreLanding.CopyaccountDetailsHeader0ddedf1d0e09643.text = selectedRecord.companyName;
  moreLanding.CopyaccountDetailsHeader0b96ab91931f34e.text = selectedRecord.accountNumber;
}
// bill pay
function fetchBillPayeeData(){
  var resData = [];
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var options ={    "access": "online",
                "objectName": "RBObjects"
               };
  var headers = {"session_token":kony.retailBanking.globalData.session_token};
  var serviceName = "RBObjects";
  var modelObj = INSTANCE.getModel("Payee",serviceName,options);
  var dataObject = new kony.sdk.dto.DataObject("Payee");
  var serviceOptions = {"dataObject":dataObject, "headers":headers};
  modelObj.fetch(serviceOptions, dataSuccess, customErrorCallback);


  function dataSuccess(response){
    externaldatalength = response.length;
    frmNewBillKA.segInternalTOAccountsPayKA.widgetDataMap={
      transactionName:"payeeNickName",
      PayPersonId : "payeeId"
    };

    for(var i=0;i< response.length;i++)
    {       
      if(response[i].nickName === "" || response[i].nickName ==null)
      {
        response[i].nickName = response[i].beneficiaryName;
      }  
      resData.push(response[i]);
    }
    frmNewBillKA.segInternalTOAccountsPayKA.setData(resData);
  }
}

function managePayeeBillPay(){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmNewBillKA");
  var navigationObject = new kony.sdk.mvvm.NavigationObject();
  navigationObject.setDataModel(null, kony.sdk.mvvm.OperationType.ADD);
  controller.setContextData(navigationObject);
  var viewModel = controller.getFormModel();
  viewModel.clear();
     var  accPreviewDataOrig= kony.retailBanking.globalData.accounts.getAccountsData();
 	 var accPreviewData = JSON.parse(JSON.stringify(accPreviewDataOrig));
            kony.print("accPreviewData"+JSON.stringify(accPreviewData));
            for(var i=0;i< accPreviewData.length;i++){
               accPreviewData[i].accountName = kony.retailBanking.util.validation.trucateTo(accPreviewData[i].accountName,35,32,"...");
               availableBal = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accPreviewData[i].availableBalance,kony.retailBanking.globalData.globals.CurrencyCode); 
               if(accPreviewData[i].accountType=="CreditCard"){
                    availableBal = "-"+availableBal;
                  }
              accPreviewData[i].availableBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: availableBal};
               accPreviewData[i].flxClr= {skin:getSkinColor(accPreviewData[i].accountType)};
             // accPreviewData[i].accountName = "Available Balance";
          }
            frmNewBillKA.segInternalFromAccountsPayKA.widgetDataMap={
              nameAccount1:"accountName",
              amountAccount1:"availableBalance",
              typeAccount:"accountType",
              lblColorKA:"flxClr"
                             };
          var tempdataAcc= getFilteredFromAccounts(accPreviewData);
          frmNewBillKA.segInternalFromAccountsPayKA.setData(tempdataAcc);
          frmNewBillKA.segInternalFromAccountsPayKA.setVisibility(true);
         // var record = frmRegisterKA.lblSelectedRowIndexKA.text;
 		 var record = kony.retailBanking.globalData.selectedPayeeDetails.getSelectedPayeeDetails();
          frmNewBillKA.fromCardInner.setVisibility(true);
          frmNewBillKA.fromAccountPick.setVisibility(false);
		  frmNewBillKA.toCardTitle.setVisibility(false);
		  frmNewBillKA.toCardInner.setVisibility(false);
		  frmNewBillKA.toAccountPick.setVisibility(true);
		  frmNewBillKA.editToCard.setVisibility(false);
		  setDateFormatforPaybill();
				// frmNewBillKA.lblCurrencyType.text=kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount("",kony.retailBanking.globalData.globals.CurrencyCode);
				 //frmNewBillKA.fromlblAccountNumberKA.text=record.accountNumber;
				// frmNewBillKA.toNamePick.text= record.payeeNickName;
 				// frmNewBillKA.tolblAccountNumberKA.text= record.payeeId;
  		  frmNewBillKA.toNamePick.text= record.payeeNickName;
		  frmNewBillKA.tolblAccountNumberKA.text= record.payeeId;
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
              viewModel.performActionOnView("amountAccountOne","setVisibility",[true]);
              viewModel.performActionOnView("editFromCard","setVisibility",[true]);
              viewModel.performActionOnView("fromCardTitle","setVisibility",[false]);
              viewModel.performActionOnView("fromCardInner","setVisibility",[false]);
              viewModel.performActionOnView("fromAccountPick","setVisibility",[true]);
          
        }else{
          frmNewBillKA.fromCardInner.opacity=1;
          frmNewBillKA.fromCardTitle.opacity=1;
            viewModel.performActionOnView("fromCardTitle","setVisibility",[true]);
            viewModel.performActionOnView("fromCardInner","setVisibility",[true]);
            viewModel.performActionOnView("fromAccountPick","setVisibility",[false]);
          }
   kony.retailBanking.globalData.transfers.setTransferMainForm("moreLanding");
  viewModel.showView();
}

function repeatPayBill(){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var toController = INSTANCE.getFormController("frmNewBillKA");
  var navigationObject = new kony.sdk.mvvm.NavigationObject();
  var record = frmRegisterKA.lblSelectedRowIndexKA.text;
  record.type = "repeat";
  navigationObject.setCustomInfo("SelPayee",record);
  navigationObject.setRequestOptions("segInternalFromAccountsPayKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  navigationObject.setRequestOptions("segInternalTOAccountsPayKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  toController.loadDataAndShowForm(navigationObject);
}
// repeat bill pay
function repeatBillPay()
{
  kony.retailBanking.globalData.transfers.setTransferMainForm("moreLanding");
  var record = kony.retailBanking.globalData.selectedPayeeTransactionDetails.getSelectedPayeeTransactionDetails();
  EditPayBillTransfer(record);
}
//delete scheduled Bill
function deleteBill()
{
  kony.ui.Alert
    ({
      "message": i18n_cancelAlert,
      "alertType": constants.ALERT_TYPE_CONFIRMATION,
      "alertTitle":i18n_btnInfo,
      "yesLabel": i18n_YES,
      "noLabel": i18n_NO,
      "alertHandler":CancelScheduledBill
    },{});
}
function CancelScheduledBill(res)
{
  var transactionId = paybillScheduledList[moreLanding.segScheduledTransactionsKA.selectedRowIndex[1]].transactionId;
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
    modelObj.remove(serviceOptions, billDeleteSuccess, customErrorCallback);
  }
  function billDeleteSuccess(res)
  {
  	OnclickBillDetailsClose();
    payeeNickNameClose();
  }
}
//On click of PayeeNickName 
function androidPayeenicknameClick(segName){
  if(segName == "segScheduledTransactionsKA")
  {
    //frmRegisterKA.Label0dd7a1d645b6a4e.text = paybillScheduledList[moreLanding.segScheduledTransactionsKA.selectedRowIndex[1]];
    kony.retailBanking.globalData.selectedPayeeTransactionDetails.setSelectedPayeeTransactionDetails(paybillScheduledList[moreLanding.segScheduledTransactionsKA.selectedRowIndex[1]]);
    var selectedRow = moreLanding.segScheduledTransactionsKA.selectedRowIndex[1];
  }
  else if(segName == "transactionSegment")
  {
    //frmRegisterKA.Label0dd7a1d645b6a4e.text = paybillCompletedList[moreLanding.transactionSegment.selectedRowIndex[1]];
    kony.retailBanking.globalData.selectedPayeeTransactionDetails.setSelectedPayeeTransactionDetails(paybillCompletedList[moreLanding.transactionSegment.selectedRowIndex[1]]);
    var selectedRow = moreLanding.transactionSegment.selectedRowIndex[1];
  }
  navigateToBillDetails(segName,selectedRow);
	   frmRegisterKA.registeredPayeerightWrapper.animate(
      kony.ui.createAnimation({100:
                             { 
							 "left": '100%',
                               "width":'62%',
                               "stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration:0.3},
    {animationEnd: function() {} });
       moreLanding.payeeNickName.animate(
    kony.ui.createAnimation({100:
                             { 
                               "width":'62%',
                               "left":'0%',
                               "stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration:0.3},
    {animationEnd: function() {} });
       moreLanding.flexBillDetails.animate(
    kony.ui.createAnimation({100:
                             { 
                               "left":'62%',
                               "stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration:0.3},
    {animationEnd: function() {} });
}
//Transaction details
function navigateToBillDetails(segName,selctedIndex){
  var userAgent = kony.os.userAgent();
  //moreLanding.btnEditKA.isVisible = false;
  if(segName === "segScheduledTransactionsKA"){
    moreLanding.CopyLabel068fb22377d114b.text=i18n_ScheduledBillDetails+" ";
    moreLanding.CopytransactionAmount0895acb2cfcf848.text = paybillScheduledList[selctedIndex].amount;
    moreLanding.CopyLabel04ede5df998464b.text = paybillScheduledList[selctedIndex].description;
    //    moreLanding.CopytransactionFrom0458eee407d3048.text = kony.retailBanking.util.maskAccountNumber(paybillScheduledList[selctedIndex].fromAccountNumber);
    moreLanding.CopytransactionFrom0458eee407d3048.text = paybillScheduledList[selctedIndex].fromAccountNumber;
    moreLanding.CopyLabel008e12b57302e4e.text = paybillScheduledList[selctedIndex].transactionDate;
    frmNewBillKA.lblTransactionIdKA.text = paybillScheduledList[selctedIndex].transactionId;
    moreLanding.lblTransactionIdKA.text = paybillScheduledList[selctedIndex].transactionId;
    moreLanding.btnBillPay.text = i18n_editTransfer;
    moreLanding.btnCancel.isVisible = true;
  }else{
    moreLanding.CopyLabel068fb22377d114b.text=i18n_CompletedBillDetails+" ";
    moreLanding.CopytransactionAmount0895acb2cfcf848.text = paybillCompletedList[selctedIndex].amount;
    moreLanding.CopyLabel04ede5df998464b.text = paybillCompletedList[selctedIndex].description;
    //    moreLanding.CopytransactionFrom0458eee407d3048.text = kony.retailBanking.util.maskAccountNumber(billType[selctedIndex].fromAccountNumber);
    moreLanding.CopytransactionFrom0458eee407d3048.text = paybillCompletedList[selctedIndex].fromAccountNumber;
    moreLanding.CopyLabel008e12b57302e4e.text = paybillCompletedList[selctedIndex].transactionDate;
    frmNewBillKA.lblTransactionIdKA.text = "";
    moreLanding.lblTransactionIdKA.text = paybillCompletedList[selctedIndex].transactionId;
    // moreLanding.lblTransactionIdKA.text = billType[selctedIndex].transactionId;
    moreLanding.btnBillPay.text = i18n_repeatBillPay;
    moreLanding.btnCancel.isVisible = false;
  }
  moreLanding.flexBillDetails.isVisible = true;
}
//processing the different types of transactions
function managePayeeTransactionList(Data){
   paybillCompletedList = [];
   paybillScheduledList = [];
  processedSegCompletedPaymentsData = [];
 processedSegScheduledTransactionsData = [];
 processedFailedTransactionsData = [];
  var segPayeeTransactionListData = Data;
	 if(segPayeeTransactionListData && segPayeeTransactionListData.length>0)
    {
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
        moreLanding.transactionSegment.widgetDataMap = { 
                CopyLabel07d831b99b64f45 : "transactionDate",
                Label01f864cb479e14f : "description",
                CopyLabel07ba1b422f8344c : "amount",
                                 };
        moreLanding.transactionSegment.setData(processedSegCompletedPaymentsData);
        moreLanding.transactionSegment.isVisible = true;
        //moreLanding.LabelNoCompletedTransactionsKA.isVisible = false;
       // paybillCompletedList = processedSegCompletedPaymentsData;
      }else{
        moreLanding.transactionSegment.isVisible = false;
        //moreLanding.LabelNoCompletedTransactionsKA.isVisible = true;
      }
      if(processedSegScheduledTransactionsData.length >0){
        moreLanding.segScheduledTransactionsKA.widgetDataMap = { 
                CopyLabel07d831b99b64f45 : "transactionDate",
                Label01f864cb479e14f : "description",
                CopyLabel07ba1b422f8344c : "amount",
                                 };
        moreLanding.segScheduledTransactionsKA.setData(processedSegScheduledTransactionsData);
        moreLanding.segScheduledTransactionsKA.isVisible = true;
        //moreLanding.LabelNoScheduledTransactionsKA.isVisible = false;
       // paybillScheduledList = processedSegScheduledTransactionsData;
      }else{
        moreLanding.segScheduledTransactionsKA.isVisible = false;
        //moreLanding.LabelNoScheduledTransactionsKA.isVisible = true;
      }
      if(processedFailedTransactionsData.length >0){
                moreLanding.segFailedTransactionsKA.widgetDataMap = { 
                CopyLabel07d831b99b64f45 : "transactionDate",
                Label01f864cb479e14f : "description",
                CopyLabel07ba1b422f8344c : "amount",
                                 };
        moreLanding.segFailedTransactionsKA.setData(processedFailedTransactionsData);
        moreLanding.segFailedTransactionsKA.isVisible = true;
        //moreLanding.LabelNoFailedTransactionsKA.isVisible = false;
      }else{
        moreLanding.segFailedTransactionsKA.isVisible = false;
        //moreLanding.LabelNoFailedTransactionsKA.isVisible = true;
      }
    }else{
        moreLanding.transactionSegment.isVisible = false;
        //moreLanding.LabelNoCompletedTransactionsKA.isVisible = true;
        moreLanding.segScheduledTransactionsKA.isVisible = false;
        //moreLanding.LabelNoScheduledTransactionsKA.isVisible = true;
        moreLanding.segFailedTransactionsKA.isVisible = false;
        //moreLanding.LabelNoFailedTransactionsKA.isVisible = true;
    }
}
//On selecting payee to diplay the respective transactions
function fetchPayeeBills()
{
  var selectedRecord = frmRegisterKA.segRegisteredPayee.selectedRowItems[0];
  selectedRecord.transactionType = "BillPay";
  frmRegisterKA.lblSelectedRowIndexKA.text = selectedRecord;
  kony.retailBanking.globalData.selectedPayeeDetails.setSelectedPayeeDetails(selectedRecord);
  //selectedBill = selectedRecord;
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  setPayeeDetails(selectedRecord);
  var payeeId = selectedRecord.payeeId;
  var options ={    "access": "online",
                    "objectName": "RBObjects"
               };
  var headers = {"session_token":kony.retailBanking.globalData.session_token};
  var serviceName = "RBObjects";
  var modelObj = INSTANCE.getModel("Transactions",serviceName,options);
  var dataObject = new kony.sdk.dto.DataObject("Transactions");
  var serviceOptions = {"dataObject":dataObject, "headers":headers, "queryParams" : {"payeeId": payeeId}};
  kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("");
  modelObj.fetch(serviceOptions, payeeTransactionSuccess, customError);
  function payeeTransactionSuccess(res)
  {
    managePayeeTransactionList(res);
    moreLanding.registeredPayeerightWrapper.animate(
        kony.ui.createAnimation({100:
                                 { 
                                   "width":'38%',
                                   "left": '0%',
                                   "stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards ,duration:0.3},
        {animationEnd: function() {} });
      moreLanding.payeeNickName.animate(
        kony.ui.createAnimation({100:
                                 { 
                                   "left": '38%',
                                   "stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards ,duration:0.3},
        {animationEnd: function() {} });
    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
  }
  function customError(err)
  {
    customErrorCallback(err);
    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
  }
}
//Manual fetchPayee List
function fetchManagePayees()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var options ={    "access": "online",
                "objectName": "RBObjects"
               };
  var headers = {"session_token":kony.retailBanking.globalData.session_token};
  var serviceName = "RBObjects";
  var modelObj = INSTANCE.getModel("Payee",serviceName,options);
  var dataObject = new kony.sdk.dto.DataObject("Payee");
  var serviceOptions = {"dataObject":dataObject, "headers":headers};
  kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("");
  modelObj.fetch(serviceOptions, managePayeeDataSuccess, customErrorCallback);
  function managePayeeDataSuccess(response)
  {
    if(response.length !== 0)
    {
      frmRegisterKA.segRegisteredPayee.widgetDataMap={
        lblOne : "companyName",
        lblTwo : "payeeNickName",
        lblThree : "accountNumber",
      }
    }
    frmRegisterKA["segRegisteredPayee"].setData(response);
    addRightPanel(frmRegisterKA.registeredPayeerightWrapper,"registeredPayeerightWrapper");
    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
  }
}
function displayPayeeDetails()
{
  var selectedRecord  = kony.retailBanking.globalData.selectedPayeeDetails.getSelectedPayeeDetails();
  moreLanding.CopynewPayeeNameTextfield02fc8feb5edb949.text = selectedRecord.companyName;
  moreLanding.CopynewPayeeAccountNumberTextField0386beb4d13c84f.text = selectedRecord.payeeNickName;
  moreLanding.CopymyAccountNumberTextField025e791bef3c646.text = selectedRecord.accountNumber;
  moreLanding.CopyzipcodeTextField0cc74e247a8f24c.text = selectedRecord.zipCode;  
  moreLanding.CopynewPayeeNameTextfield02fc8feb5edb949.setEnabled(false);
  moreLanding.CopynewPayeeAccountNumberTextField0386beb4d13c84f.setEnabled(false);
  moreLanding.CopymyAccountNumberTextField025e791bef3c646.setEnabled(false);
  moreLanding.CopyzipcodeTextField0cc74e247a8f24c.setEnabled(false);
  moreLanding.newPayeeWrapperPayeeDetails.isVisible = true;
}

function editPayeeDetails()
{
  var selectedRecord  = kony.retailBanking.globalData.selectedPayeeDetails.getSelectedPayeeDetails();
  moreLanding.CopynewPayeeNameTextfield07d9e2d4975b146.text = selectedRecord.companyName;
  moreLanding.CopynewPayeeAccountNumberTextField01a02ea9b27b343.text = selectedRecord.payeeNickName;
  moreLanding.CopymyAccountNumberTextField016037cd49c1441.text = selectedRecord.accountNumber;
  moreLanding.CopyzipcodeTextField0b05ef9cc237248.text = selectedRecord.zipCode;
  moreLanding.CopynewPayeeNameTextfield07d9e2d4975b146.setEnabled(false);
  moreLanding.CopynewPayeeAccountNumberTextField01a02ea9b27b343.setEnabled(false);
  //moreLanding.CopymyAccountNumberTextField016037cd49c1441.setEnabled(false);
  moreLanding.CopyzipcodeTextField0b05ef9cc237248.setEnabled(false);
  moreLanding.newPayeeWrapperEditPayee.isVisible = true;
}
function addNewBillPayee()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var options ={    "access": "online",
                "objectName": "RBObjects"
               };
  var headers = {"session_token":kony.retailBanking.globalData.session_token};
  var serviceName = "RBObjects";
  var modelObj = INSTANCE.getModel("Payee",serviceName,options);
  var record = {};
  record["companyName"] = moreLanding.CopynewPayeeNameTextfield0f72f1d2173744e.text;
  record["payeeNickName"] = moreLanding.CopynewPayeeAccountNumberTextField01a02d93a07b841.text;
  record["accountNumber"] = moreLanding.CopymyAccountNumberTextField032073058ccb94f.text;
  record["zipCode"] = moreLanding.CopyzipcodeTextField0a756169b41bd43.text;
  if(!(record["companyName"]&&record["payeeNickName"]&&record["accountNumber"]&&record["zipCode"]))
    {
      kony.ui.Alert
    ({
      "message": i18n_fieldsMandatory,
      "alertType": constants.ALERT_TYPE_INFO,
      "alertTitle":i18n_btnInfo,
      "yesLabel": i18n_ok,
    },{});
      return;
    }
  if(record["accountNumber"] !== moreLanding.CopymyAccountNumberTextField0920bb2da01b24b.text)
    {
      kony.ui.Alert
    ({
      "message": i18n_AccountMismatchAlert,
      "alertType": constants.ALERT_TYPE_INFO,
      "alertTitle":i18n_btnInfo,
      "yesLabel": i18n_ok,
    },{});
      return;
    }
  frmRegisterKA.lblSelectedRowIndexKA.text = record;
  var dataObject = new kony.sdk.dto.DataObject("Payee",record);
  var requestOptions = {"dataObject":dataObject, "headers":headers};
  modelObj.create(requestOptions, createSuccess, customErrorCallback);
  function createSuccess(response)
  {
    var record = frmRegisterKA.lblSelectedRowIndexKA.text;
    record.payeeId = response.payeeId;
    frmRegisterKA.lblSelectedRowIndexKA.text = record;
    moreLanding.newPayeeWrapperUpdate.isVisible = true;
  }
}
function updatePayee()
{
  var payeeId = kony.retailBanking.globalData.selectedPayeeDetails.getSelectedPayeeDetails().payeeId;
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var options ={    "access": "online",
                "objectName": "RBObjects"
               };
  var headers = {"session_token":kony.retailBanking.globalData.session_token};
  var serviceName = "RBObjects";
  var modelObj = INSTANCE.getModel("Payee",serviceName,options);
  var record = {};
  record["payeeId"] = payeeId;
  record["companyName"] = moreLanding.CopynewPayeeNameTextfield07d9e2d4975b146.text;
  record["payeeNickName"] = moreLanding.CopynewPayeeAccountNumberTextField01a02ea9b27b343.text;
  record["accountNumber"] = moreLanding.CopymyAccountNumberTextField016037cd49c1441.text;
  record["zipCode"] = moreLanding.CopyzipcodeTextField0b05ef9cc237248.text;
  frmRegisterKA.lblSelectedRowIndexKA.text = record;
  var dataObject = new kony.sdk.dto.DataObject("Payee",record);
  var requestOptions = {"dataObject":dataObject, "headers":headers};
  modelObj.update(requestOptions, updateSuccess, customErrorCallback);
  function updateSuccess(response)
  {
    moreLanding.newPayeeWrapperUpdate.isVisible = true;
  }
}
function deletePayee()
{
  var payeeId = kony.retailBanking.globalData.selectedPayeeDetails.getSelectedPayeeDetails().payeeId;
   var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var options ={    "access": "online",
                "objectName": "RBObjects"
               };
  var headers = {"session_token":kony.retailBanking.globalData.session_token};
  var serviceName = "RBObjects";
  var modelObj = INSTANCE.getModel("Payee",serviceName,options);
  var record = {};
  record["payeeId"] = payeeId;
  var dataObject = new kony.sdk.dto.DataObject("Payee",record);
  var requestOptions = {"dataObject":dataObject, "headers":headers};
  modelObj.remove(requestOptions, deleteSuccess, customErrorCallback);
  function deleteSuccess(response)
  {
    moreLanding.newPayeeWrapperEditPayee.isVisible = false;
    moreLanding.newPayeeWrapperPayeeDetails.isVisible = false;
    payeeNickNameClose();
  	fetchManagePayees();
  }
}
function deleteTransaction()
{
  var record = kony.retailBanking.globalData.selectedPayeeTransactionDetails.getSelectedPayeeTransactionDetails();
 // var transactionId =  frmRegisterKA.Label0dd7a1d645b6a4e.text["transactionId"];
   var transactionId =  record["transactionId"];
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
    modelObj.remove(serviceOptions, transactionDeleteSuccess, customErrorCallback);
  function transactionDeleteSuccess(res)
  {
   	payeeNickNameClose();
  	fetchManagePayees();
  } 
}