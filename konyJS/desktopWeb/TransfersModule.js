//Type your code here

values ={};
function isEmpty(object) {
  for(var key in object){
    if(object.hasOwnProperty(key)){
      return false;
    }
  }
  return true;
}
function setDateFormatForNewTransfer()
{
  var date = new Date();
  var year =   date.getFullYear();
  var month = date.getMonth()+1;
  var day = date.getDate();
  var startdate=[day,month,year];
  var endDate = [day,month,year+1];
  var currentDate = [parseFloat(day), parseFloat(month), parseFloat(year), 0.0, 0.0, 0.0];
  frmMakeTransferKA.calDateKA.validStartDate=startdate;
  frmMakeTransferKA.calDateKA.validEndDate=endDate;
  frmMakeTransferKA.calFromDateKA.validStartDate=startdate;
  frmMakeTransferKA.calFromDateKA.validEndDate=endDate;
  frmMakeTransferKA.calToDateKA.validStartDate=startdate;
  frmMakeTransferKA.calToDateKA.validEndDate=endDate;
  frmMakeTransferKA.calDateKA.dateComponents = currentDate;
  frmMakeTransferKA.calFromDateKA.dateComponents = currentDate;
  frmMakeTransferKA.calToDateKA.dateComponents = currentDate;
}

function showTransferPage(){
  var appInstance = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var navigationObject = new kony.sdk.mvvm.NavigationObject();
  navigationObject.setDataModel(null, kony.sdk.mvvm.OperationType.NO_FILTER, "form");
  navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  var makeTransferController = appInstance.getFormController("frmMakeTransferKA");
  makeTransferController.performAction("navigateTo",["frmMakeTransferKA",navigationObject]);

}
function saveTransferData(){
  var appInstance = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var makeTransferController = appInstance.getFormController("frmMakeTransferAcknow");
  makeTransferController.performAction("saveData");
}
function showTransferAcknowPage(){
  var appInstance = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var obj;
  var fromAccount = frmMakeTransferKA.lbxFromAccountKA.selectedKeyValue;
  var toAccount = frmMakeTransferKA.lbxToAccountKA.selectedKeyValue;
  kony.print("########"+JSON.stringify(fromAccount)+"####"+JSON.stringify(toAccount));
  var amount = frmMakeTransferKA.tbxAmountInputKA.text;
  var notes = frmMakeTransferKA.tbxNotesInputKA.text;
  var frequency = frmMakeTransferKA.lbxFrequencyKA.selectedKey;
  var date = frmMakeTransferKA.calDateKA.dateComponents;
  var recurrenceType = frmMakeTransferKA.rbgRecurrenceType.selectedKey;
  var fromDate = frmMakeTransferKA.calFromDateKA.dateComponents;
  var toDate = frmMakeTransferKA.calToDateKA.dateComponents;
  var nor = frmMakeTransferKA.tbxRecurrenceTimesInputKA.text;
  var transactionID=frmMakeTransferKA.lblTransactionIdKA.text;
  var isExternalAccount = false;
  var externalAccounts = kony.retailBanking.globalData.ExternalAccounts;
  for(var i=0;i< externalAccounts.length;i++){
    if(toAccount[0] === externalAccounts[i].accountNumber){
      isExternalAccount = true;
      break;
    }
  }
  kony.print("Recurrence type"+JSON.stringify(recurrenceType));
  obj = {"fromAccount":fromAccount, "toAccount":toAccount, "amount":amount, "notes":notes, "frequency":frequency, "date":date, "recurrenceType":recurrenceType, "fromDate":fromDate, "toDate":toDate, "nor":nor, "isExternalAccount":isExternalAccount , "transactionID":transactionID};
  values=obj;
  var navigationObject = new kony.sdk.mvvm.NavigationObject();
  if(values.transactionID==="")
  navigationObject.setDataModel(null, kony.sdk.mvvm.OperationType.ADD, "form");
  else
     navigationObject.setDataModel(null, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");

  navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  var makeTransferAcknowController = appInstance.getFormController("frmMakeTransferAcknow");
  if(amount === ""|| toAccount[0] === "-1"){
    alert("Check amount and toaccount");
  }
  else{
    makeTransferAcknowController.performAction("navigateTo",["frmMakeTransferAcknow",navigationObject]);
  }
  //var makeTransferAcknowController = appInstance.getFormController("frmMakeTransferAcknow");
  //makeTransferAcknowController.performAction("setAllDetailsAndShowForm", [obj]);
}
function onselectfrequency(){
  var selectedKey = frmMakeTransferKA.lbxFrequencyKA.selectedKey;

  if(selectedKey === "Once"){
    frmMakeTransferKA.lblTransferDateKA.text = "Date:";
    frmMakeTransferKA.flxRecurrence.setVisibility(false);
  }
  else{
    frmMakeTransferKA.lblTransferDateKA.text = "Date:";
    frmMakeTransferKA.flxRecurrence.setVisibility(true);
  }
}
function onselectrecurrencetype(){
  var selectedKey = frmMakeTransferKA.rbgRecurrenceType.selectedKey;
  if(selectedKey === "nor"){
    frmMakeTransferKA.flxRecurrenceDateRange.setVisibility(false);
    frmMakeTransferKA.flxRecurrenceTimes.setVisibility(true);
  }
  else if(selectedKey === "daterange"){
    frmMakeTransferKA.flxRecurrenceTimes.setVisibility(false);
    frmMakeTransferKA.flxRecurrenceDateRange.setVisibility(true);
  }
}
function onclickreset(){
  values = {};
  showTransferPage();
}
function onclickcontinue(){
  var valid = true;
  //var  formmodel = this.getController().getFormModel();
  if(frmMakeTransferKA.tbxAmountInputKA.text === null || frmMakeTransferKA.tbxAmountInputKA.text === "" ){
    valid = false;
    //frmMakeTransferKA.lblValidation.text = "Please fill the following missing fields in the form";
    frmMakeTransferKA.tbxAmountInputKA.skin = "skntbxValidation";
  }
  else{
    if (isNaN(frmMakeTransferKA.tbxAmountInputKA.text) || parseFloat(frmMakeTransferKA.tbxAmountInputKA.text) <= 0) {
      frmMakeTransferKA.tbxAmountInputKA.skin = "skntbxValidation";
    //  frmMakeTransferKA.lblValidation.text = "Please enter valid amount";
      valid = false;
    } else {
      frmMakeTransferKA.tbxAmountInputKA.skin = "CopyslTextBox082d070bc5b4f4d";
    }
  }
  if(frmMakeTransferKA.lbxFrequencyKA.selectedKey !== "Once" && frmMakeTransferKA.rbgRecurrenceType.selectedKey === "nor"){
    if (frmMakeTransferKA.tbxRecurrenceTimesInputKA.text === null || frmMakeTransferKA.tbxRecurrenceTimesInputKA.text === "") {
      valid = false;
    //  frmMakeTransferKA.lblValidation.text = "Please fill the following missing fields in the form";
      frmMakeTransferKA.tbxRecurrenceTimesInputKA.skin = "skntbxValidation";
    } else {
      if (isNaN(frmMakeTransferKA.tbxRecurrenceTimesInputKA.text) || parseFloat(frmMakeTransferKA.tbxRecurrenceTimesInputKA.text) <= 0) {
        frmMakeTransferKA.tbxRecurrenceTimesInputKA.skin = "skntbxValidation";
      //  frmMakeTransferKA.lblValidation.text = "Please enter valid number of recurrences";
        valid = false;
      } else {
        frmMakeTransferKA.tbxRecurrenceTimesInputKA.skin = "CopyslTextBox082d070bc5b4f4d";
      }
    }
  }
    if(frmMakeTransferKA.lbxFromAccountKA.selectedKey === "-1" ){
    //alert("Please enter valid from account and to account");
    frmMakeTransferKA.lbxFromAccountKA.skin = "sknlbxValidation";
  //  frmMakeTransferKA.lblValidation.text = "Please fill the following missing fields in the form";
    valid = false;
  }
  else{
    frmMakeTransferKA.lbxFromAccountKA.skin = "CopysknInputsKA0dc9a8f25976646";
  }
  if(frmMakeTransferKA.lbxToAccountKA.selectedKey === "-1" || frmMakeTransferKA.lbxFromAccountKA.selectedKey === frmMakeTransferKA.lbxToAccountKA.selectedKey){
    frmMakeTransferKA.lbxToAccountKA.skin = "sknlbxValidation";
 //   frmMakeTransferKA.lblValidation.text = "Please fill the following missing fields in the form";
    valid = false;
  }
  else{
    frmMakeTransferKA.lbxToAccountKA.skin = "CopysknInputsKA0dc9a8f25976646";
  }
  if(!valid){
    //frmMakeTransferKA.flxValidationBox.isVisible = true;
  }
  else{
    showTransferAcknowPage();
  }

}



function fetchExternalAccountDataAndStoreInGlobal(){
  kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Loading To Accounts"); 
  var masterDataElement = [];
  var data = [];
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var options ={    "access": "online",
                "objectName": "RBObjects"
               };
  var headers = {"session_token":kony.retailBanking.globalData.session_token};
  var serviceName = "RBObjects";
  var modelObj = INSTANCE.getModel("ExternalAccounts",serviceName,options);
  var dataObject = new kony.sdk.dto.DataObject("ExternalAccounts");
  var serviceOptions = {"dataObject":dataObject, "headers":headers};
  modelObj.fetch(serviceOptions, dataSuccess, customErrorCallback);
  function dataSuccess(response){
    kony.retailBanking.globalData.ExternalAccounts=response;
  }   
}


function fetchDataForTransferAccounts(response,pickListInfo,widgetId,scopeObj){
  var masterData = [];
  var masterDataElement = [];
  if("lbxFromAccountKA" === widgetId || "fromAccListBox" === widgetId){
    masterDataElement.push("-1");
    masterDataElement.push("Select from account");
    masterData.push(masterDataElement);
    for(var j = 0; j < response.records.length; j++){
      var pickListItem1;
      masterDataElement = [];
      pickListItem1 = response.records[j];
      var key1 = response.records[j][pickListInfo.key];
      var value1 = response.records[j][pickListInfo.value];
      var supportTransferFrom = pickListItem1.supportTransferFrom;
      if(supportTransferFrom === "1"){
        masterDataElement.push(key1);
        masterDataElement.push(value1);
        masterData.push(masterDataElement);
      }  
    }
  }
  else if("lbxToAccountKA" === widgetId){
    var formModel = scopeObj.getController().getFormModel();
    var dataElement = [];
    dataElement.push("-1");
    dataElement.push("Select to account");
    masterData.push(dataElement);
    for(var k = 0; k < response.records.length; k++){
      var pickListItem2;
      masterDataElement = [];
      pickListItem2 = response.records[k];
      var key2 = response.records[k][pickListInfo.key];
      var value2 = response.records[k][pickListInfo.value];
      var supportTransferTo = pickListItem2.supportTransferTo;
      if(supportTransferTo === "1"){
        masterDataElement.push(key2);
        masterDataElement.push(value2);
        masterData.push(masterDataElement);
      } 
    }
  }
  else if("toAcclistBox" === widgetId){
    var formModel = scopeObj.getController().getFormModel();
    var dataElement = [];
    dataElement.push("-1");
    dataElement.push("Select Payee");
    masterData.push(dataElement);
    for(var k = 0; k < response.records.length; k++){
      var pickListItem2;
      masterDataElement = [];
      pickListItem2 = response.records[k];
      var key2 = response.records[k][pickListInfo.key];
      var value2 = response.records[k][pickListInfo.value];
      var supportTransferTo = pickListItem2.supportTransferTo;
      masterDataElement.push(key2);
      masterDataElement.push(value2);
      masterData.push(masterDataElement);
    }
  }
  return masterData;
}

function setAllDetailsAndShowForm() {
  var appInstance = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var makeTransferAcknowController = appInstance.getFormController("frmMakeTransferAcknow");
  var formmodel = makeTransferAcknowController.getFormModel();
  //formmodel.setWidgetData("lblFromAccountDataKA",data,false);
  var dateDay = parseInt(values.date[0]) <= 9 ? "0"+values.date[0] : values.date[0];
  var dateMonth = parseInt(values.date[1]) <= 9 ? "0"+values.date[1] : values.date[1];
  var dateYear = values.date[2];
  var toDateDay = parseInt(values.toDate[0]) <= 9 ? "0"+values.toDate[0] : values.toDate[0];
  var toDateMonth = parseInt(values.toDate[1]) <= 9 ? "0"+values.toDate[1] : values.toDate[1];
  var toDateYear = values.toDate[2];
  var fromDateDay = parseInt(values.fromDate[0]) <= 9 ? "0"+values.fromDate[0] : values.fromDate[0];
  var fromDateMonth = parseInt(values.fromDate[1]) <= 9 ? "0"+values.fromDate[1] : values.fromDate[1];
  var fromDateYear = values.fromDate[2];
  formmodel.setViewAttributeByProperty("lblFromAccountDataKA", "text", values.fromAccount[1]);
  formmodel.setViewAttributeByProperty("lblFromAccountNumber", "text", values.fromAccount[0]);
  formmodel.setViewAttributeByProperty("lblToAccountNumber", "text", "");
  formmodel.setViewAttributeByProperty("lblExternalAccountNumber", "text", "");
  formmodel.setViewAttributeByProperty("lblFromDate", "text", "");
  formmodel.setViewAttributeByProperty("lblToDate", "text", "");
  formmodel.setViewAttributeByProperty("lblRecurrenceTimesDataKA", "text", "");
  formmodel.setViewAttributeByProperty("lblToAccountDataKA", "text", values.toAccount[1]);
  if(values.transactionID===undefined)
    {
          formmodel.setViewAttributeByProperty("lblTransactionId", "text","");
    }
  else
        formmodel.setViewAttributeByProperty("lblTransactionId", "text", values.transactionID);

  if (values.isExternalAccount) {
    formmodel.setViewAttributeByProperty("lblToAccountNumber", "text", values.toAccount[0]);
    formmodel.setViewAttributeByProperty("lblTransferType", "text", "ExternalTransfer");
  } else {
    formmodel.setViewAttributeByProperty("lblToAccountNumber", "text", values.toAccount[0]);
    formmodel.setViewAttributeByProperty("lblTransferType", "text", "InternalTransfer");
  }
  formmodel.setViewAttributeByProperty("lblAmountDataKA", "text", values.amount);
  formmodel.setViewAttributeByProperty("lblNotesDataKA", "text", values.notes);
  formmodel.setViewAttributeByProperty("lblFrequencyDataKA", "text", values.frequency);
  //formmodel.setViewAttributeByProperty("lblExternalAccountNumber","text","");
  formmodel.setViewAttributeByProperty("lblTransferDate", "text", kony.retailBanking.util.formatingDate.getDBDateTimeFormat(values.date, "00:00"));
  kony.print("DateBackend set to" + formmodel.getViewAttributeByProperty("lblTransferDate", "text"));
  formmodel.setViewAttributeByProperty("lblTransferDateDataKA","text",kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(dateYear+"-"+dateMonth+"-"+dateDay));
  kony.print("DateView set to"+formmodel.getViewAttributeByProperty("lblTransferDateDataKA", "text"));  

  formmodel.setViewAttributeByProperty("lblRecurrenceFromDateKA","text",kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(fromDateYear+"-"+fromDateMonth+"-"+fromDateDay));
  kony.print("FromDateView set to"+formmodel.getViewAttributeByProperty("lblRecurrenceFromDateKA", "text"));  

  if (values.frequency === "Once") {
    formmodel.setViewAttributeByProperty("lblFromDate", "text", "");
    kony.print("FromDateBackend set to" + formmodel.getViewAttributeByProperty("lblFromDate", "text", ""));
    formmodel.setViewAttributeByProperty("lblToDate", "text", "");
    kony.print("ToDateBackend set to" + formmodel.getViewAttributeByProperty("lblToDate", "text", ""));
  } else {
    if (values.recurrenceType == "nor") {
      formmodel.setViewAttributeByProperty("lblRecurrenceTimesDataKA", "text", values.nor);
    } else if (values.recurrenceType == "daterange") {

      formmodel.setViewAttributeByProperty("lblToDate", "text", toDateYear + "-" + toDateMonth + "-" + toDateDay);
      formmodel.setViewAttributeByProperty("lblFromDate", "text", fromDateYear + "-" + fromDateMonth + "-" + fromDateDay);
      kony.print("ToDateBackend set to" + formmodel.getViewAttributeByProperty("lblToDate", "text"));
    }
  }
  formmodel.setViewAttributeByProperty("lblRecurrenceToDateKA", "text", kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(toDateYear+"-"+toDateMonth+"-"+toDateDay));
  kony.print("ToDateView set to" + formmodel.getViewAttributeByProperty("lblRecurrenceToDateKA", "text"));
  if (values.frequency === "Once") {
    formmodel.performActionOnView("flxRecurrence", "setVisibility", [false]);
    formmodel.setViewAttributeByProperty("lblTransferDateKA", "text", "Transfer Date:");
  } else {
    formmodel.performActionOnView("flxRecurrence", "setVisibility", [true]);
    if (values.recurrenceType === "nor") {
      formmodel.performActionOnView("flxRecurrenceDatesInput", "setVisibility", [false]);
      formmodel.performActionOnView("flxRecurrenceTimesInput", "setVisibility", [true]);
    } else if (values.recurrenceType === "daterange") {
      formmodel.performActionOnView("flxRecurrenceDatesInput", "setVisibility", [true]);
      formmodel.performActionOnView("flxRecurrenceTimesInput", "setVisibility", [false]);
    }
  }
  //makeTransferAcknowController.showForm();
}
///////////// CODE FOR ADD EXTERNAL ACCOUNT START////////////////

function getExternalAccountsForm()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController("frmOtherFinancialKA");
  var navObject = new kony.sdk.mvvm.NavigationObject();
  navObject.setRequestOptions("segAddFinancialKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  listController.performAction("navigateTo",["frmOtherFinancialKA",navObject]);
  //return;
}

function loadAndShowAddExternalAccount()
{
    if(kony.application.getPreviousForm().id == "frmOtherFinancialKA")
  {
   getExternalAccountsForm();
  }else
  {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var listController = INSTANCE.getFormController("frmAddFinancialKA");
    var navObject = new kony.sdk.mvvm.NavigationObject();
    navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
    navObject.setDataModel(null, kony.sdk.mvvm.OperationType.ADD, "form");
    listController.performAction("navigateTo",["frmAddFinancialKA",navObject]); 
  }
}

function saveAndCreateExternalAccount()
{
  
  
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController("frmAddFinancialKA");
  listController.performAction("saveData");
}
function loadIntoDetailsFormAndShow(PageData)
{
  frmExternalAccountDetailKA.lblCountryValueKA.text=PageData.Country;
  frmExternalAccountDetailKA.lblCategoryValueKA.text=PageData.IsInternational;
  frmExternalAccountDetailKA.lblSwiftCodeValueKA.text=PageData.SwiftCode;
  frmExternalAccountDetailKA.lblRoutingNoValueKA.text=PageData.RoutingNo;
  frmExternalAccountDetailKA.lblAccountNoValueKA.text=PageData.AccountNumber;
  frmExternalAccountDetailKA.lblNickNameValue.text=PageData.AccountName;
  frmExternalAccountDetailKA.lblAccTypeValueKA.text=PageData.AccountType;
  frmExternalAccountDetailKA.lblNameOnAccValueKA.text=PageData.BenificiaryName;
  if(PageData.IsInternational=="true")
  {
    frmExternalAccountDetailKA.lblCategoryValueKA.text="International";
    frmExternalAccountDetailKA.flxCountryKA.isVisible=true;
    frmExternalAccountDetailKA.flxSwiftKA.isVisible=true;
    frmExternalAccountDetailKA.flxRoutingNoKA.isVisible=false;
  }
  else
  {
    frmExternalAccountDetailKA.lblCategoryValueKA.text="Domestic";
    frmExternalAccountDetailKA.flxCountryKA.isVisible=false;
    frmExternalAccountDetailKA.flxSwiftKA.isVisible=false;
    frmExternalAccountDetailKA.flxRoutingNoKA.isVisible=true;

  }
  frmExternalAccountDetailKA.show();
}


/////// CODE FOR ADD EXTERNAL ACCOUNT END////////////////


/////  CODE FOR RECENT AND SCHEDULED TRANSACTIONS //////
function seperatRecentAndScheduled(transacData,funName){

  var scopeObj=this;
  var recentSegData = [];
  var scheduleSegData = [];
  for(var i in transacData)
  {   
    var status = transacData[i]["statusDescription"];
    if(transacData[i]["statusDescription"] === kony.retailBanking.globalData.globals.Failed) 
    {
      transacData[i]["imgSrc"] = {
        "isVisible": true,
        src :"failedimage.png"
      }; 
    } 
    if(status !== kony.retailBanking.globalData.globals.Failed) 
    {
      if(transacData[i]["frequencyType"] ==undefined ||transacData[i]["frequencyType"] =="Once") 
      {
        transacData[i]["imgSrc"] = {
          "isVisible": false,
          src :"recuurencebox.png"
        }; 
      } else
      {
        transacData[i]["imgSrc"] = {
          "isVisible": true,
          src :"recuurencebox.png"
        };
      }
    }

    if(transacData[i]["transactionType"] !== kony.retailBanking.globalData.globals.Deposit && transacData[i]["transactionType"] !== kony.retailBanking.globalData.globals.PayPerson && transacData[i]["transactionType"] !== kony.retailBanking.globalData.globals.PayBill)
    {
      if( transacData[i]["toAccountName"]=== undefined){
        transacData[i]["toAccountName"]=transacData[i]["payPersonName"];
      }
      transacData[i]["action"]="Repeat Transfer";
      transacData[i]["amount"] = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(transacData[i]["amount"]);
      transacData[i]["transactionsNotes"] = transacData[i]["transactionsNotes"];
	  transacData[i]["transactionsNotesformatted"] = kony.retailBanking.util.validation.trucateTo(transacData[i]["transactionsNotes"], 23, 20, "...");
      if(transacData[i]["isScheduled"]==="false")
      {
        transacData[i]["action"]="Repeat Transfer";
        transacData[i]["transactionDate"] = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(transacData[i]["transactionDate"]);
        recentSegData.push(transacData[i]);
      }      
      else
      {
        transacData[i]["action"]="Cancel Transfer";
        transacData[i]["transactionDate"] = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(transacData[i]["scheduledDate"]);
        scheduleSegData.push(transacData[i]);
      }

    }

  }

  kony.retailBanking.globalData.transfers.setTransfersData(recentSegData,scheduleSegData);
  funName.call(scopeObj);
}
////////// Recent Transfers Show////////////////////
function showRecentTransfers(){
 
    fetchAllTeansfers(setRecentDataIntoSeg);
    function setRecentDataIntoSeg() {
      var data=  kony.retailBanking.globalData.transfers.getTransfersData("recentTransactions");
      if(data.length>0){
        frmRecentTransfersKA.segRecentTransfersKA.widgetDataMap = { 
          Imgcheck : "imgSrc",
          lblDateKA : "transactionDate",

          lblTransactionFromKA : "fromNickName",
          lblTransactionT0KA : "toAccountName",
          lblAmountKA : "amount",
          lblNotesKA : "transactionsNotesformatted",
          MakeTransfer: "action"           };
        frmRecentTransfersKA.segRecentTransfersKA.setData(data);
        frmRecentTransfersKA.segRecentTransfersKA.isVisible = true;
        frmRecentTransfersKA.flxMainHeaderKA.isVisible = true;
        frmRecentTransfersKA.lblNoRecords.isVisible = false;
      }else{
        //frmRecentTransfersKA.flxMainHeaderKA.isVisible = false;
        frmRecentTransfersKA.segRecentTransfersKA.isVisible = false;
        frmRecentTransfersKA.lblNoRecords.isVisible = true;
      }
      frmRecentTransfersKA.show();
    }
  
}

////////// Scheduled Transfers Show////////////////////

function showScheduledTransfers(){
  fetchAllTeansfers(setScheduledDataIntoSeg);
  function setScheduledDataIntoSeg() {
    var data=  kony.retailBanking.globalData.transfers.getTransfersData("scheduledTransactions");
    if(data.length>0){
      frmScheduledTransfersKA.segScheduledTransfersKA.widgetDataMap = { 
        Imgcheck : "imgSrc",
        lblDateKA : "transactionDate",

        lblTransactionFromKA : "fromNickName",
        lblTransactionT0KA : "toAccountName",
        lblAmountKA : "amount",
        lblNotesKA : "transactionsNotesformatted",
        MakeTransfer: "action"           };

      frmScheduledTransfersKA.segScheduledTransfersKA.setData(data);
      frmScheduledTransfersKA.segScheduledTransfersKA.isVisible = true;
      frmScheduledTransfersKA.flxMainHeaderKA.isVisible = true;
      frmScheduledTransfersKA.lblNoRecords.isVisible = false;
    } else {
      //frmScheduledTransfersKA.flxMainHeaderKA.isVisible = false;
      frmScheduledTransfersKA.segScheduledTransfersKA.isVisible = false;
      frmScheduledTransfersKA.lblNoRecords.isVisible = true;
    }
    frmScheduledTransfersKA.show();
  }
}



function fetchAllTeansfers(funName){
  var scopeObj=this;
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var options ={    "access": "online",
                "objectName": "RBObjects"
               };
  var headers = {"session_token":kony.retailBanking.globalData.session_token};
  var serviceName = "RBObjects";
  var modelObj = INSTANCE.getModel("Transactions",serviceName,options);
  var dataObject = new kony.sdk.dto.DataObject("Transactions");
  var serviceOptions = {"dataObject":dataObject, "headers":headers};
  modelObj.fetch(serviceOptions, dataSuccessFetchTransfers, dataFailureFetchTransfers);
  function dataSuccessFetchTransfers(response){
    // funName.call(scopeObj);
    seperatRecentAndScheduled(response,funName);
  }
  function dataFailureFetchTransfers(err){
    kony.print("err"+err);
  }
}


function setValuesForMakeTransfer(temp, isScheduledEdit){
  var fromAccount=[temp.fromAccountNumber,temp.fromNickName];
  var toAccount=[];
  var date=new Date(temp.transactionDate);
  var notes=temp.transactionsNotes;
  var amount= temp.amount.slice(1);
  var  isExternalAccount=true;
  var frequency=temp.frequencyType;
  var recurrType;  
  var toDate=temp.frequencyStartDate;
  var fromDate=temp.frequencyEndDate;
  var nor=temp.numberOfRecurrences;
  var transactionID=undefined;
  //if(frequency===undefined)frequency="Once";
  if(isScheduledEdit)
    transactionID=temp.transactionId;
  if(nor===0||nor===undefined|| nor=== "0"){
    recurrType="daterange";
  }
  else
    recurrType="nor";
  if(temp.transactionType=="InternalTransfer"){
    isExternalAccount=false;  
    toAccount=[temp.toAccountNumber,temp.toAccountName];
  }
  else if(temp.transactionType=="ExternalTransfer"){
    isExternalAccount=true;
    toAccount=[temp.ExternalAccountNumber,temp.toAccountName];
  }
  if(toDate=== undefined){
    toDate=new Date();
  }
  else{
    toDate=new Date(toDate);
  }
  if(fromDate=== undefined){
    fromDate= new Date();
  }
  else{
    fromDate=new Date(fromDate);
  }
  values= {
    "fromAccount":fromAccount, "toAccount":toAccount, "amount":amount,
    "notes":notes, "frequency":frequency,
    "date":[date.getDate(),date.getMonth()+1,date.getFullYear()],
    "recurrenceType":recurrType,
    "fromDate":[fromDate.getDate(),fromDate.getMonth()+1,fromDate.getFullYear()],
    "toDate":[toDate.getDate(),toDate.getMonth()+1,toDate.getFullYear()], "nor":nor,
    "isExternalAccount":isExternalAccount, "transactionID": transactionID
  };
  return values;
}
function setValuesForRecentTransferDetails(selectedRowIndex){
  var data;
  if(selectedRowIndex !== undefined)
    data =  kony.retailBanking.globalData.transfers.getTransfersData("recentTransactions")[selectedRowIndex[1]];
  else
  {
    var selectedInd = frmActivityKA.SegTransactionsKA.selectedRowIndex[1]; 
    data = kony.retailBanking.globalData.activityData.getActivityData()[selectedInd];
  }
  // kony.print(JSON.stringify(data));

  frmRecentTransferDetailsKA.lblTransactionType.text = data.transactionType;
  if(data.transactionType === "ExternalTransfer"){
    frmRecentTransferDetailsKA.lblToAccountNumber.text = data.ExternalAccountNumber;
  }
  else if(data.transactionType === "InternalTransfer"){
    frmRecentTransferDetailsKA.lblToAccountNumber.text = data.toAccountNumber;
  }

  frmRecentTransferDetailsKA.lblFromAccountNumber.text = data.fromAccountNumber;
  frmRecentTransferDetailsKA.lblFromAccountDataKA.text = data.fromNickName;
  //frmRecentTransferDetailsKA.lblToAccountNumber.text = data.toAccountNumber;
  frmRecentTransferDetailsKA.lblToAccountDataKA.text = data.toAccountName;
  frmRecentTransferDetailsKA.lblAmountDataKA.text = data.amount;
  frmRecentTransferDetailsKA.lblTransactionIdDataKA.text = data.transactionId;
  if(data.transactionsNotes !== undefined)
    frmRecentTransferDetailsKA.lblNotesDataKA.text = data.transactionsNotes;
  if(data.frequencyType === "Once"){
    frmRecentTransferDetailsKA.lblFrequencyDataKA.text = data.frequencyType;
    frmRecentTransferDetailsKA.flxRecurrence.isVisible = false;
  }
  else{
    frmRecentTransferDetailsKA.lblFrequencyDataKA.text = data.frequencyType;
    frmRecentTransferDetailsKA.flxRecurrence.isVisible = true;
  }
  frmRecentTransferDetailsKA.lblTransferDateDataKA.text = data.transactionDate;
  if(data.frequencyStartDate !== undefined || data.frequencyEndDate !== undefined || data.numberOfRecurrences === 0){
    frmRecentTransferDetailsKA.lblRecurrenceFromDateKA.text = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(data.frequencyStartDate);
    frmRecentTransferDetailsKA.lblRecurrenceToDateKA.text = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(data.frequencyEndDate);
    frmRecentTransferDetailsKA.lblRecurrenceType.text = "daterange";
    frmRecentTransferDetailsKA.flxRecurrence.isVisible = true;
    frmRecentTransferDetailsKA.flxRecurrenceDatesInput.isVisible = true;
    frmRecentTransferDetailsKA.flxRecurrenceTimesInput.isVisible = false;
  }
  else{
    frmRecentTransferDetailsKA.lblRecurrenceType.text = "nor";
    frmRecentTransferDetailsKA.lblRecurrenceTimesDataKA.text = data.numberOfRecurrences;
    frmRecentTransferDetailsKA.flxRecurrenceDatesInput.isVisible = false;
    frmRecentTransferDetailsKA.flxRecurrenceTimesInput.isVisible = true;
  }
  frmRecentTransferDetailsKA.show();
}
function repeattransfer(){
  if(frmRecentTransferDetailsKA.lblTransactionType.text !== "ExternalTransfer" && frmRecentTransferDetailsKA.lblTransactionType.text !== "InternalTransfer"){
    alert("This is a "+frmRecentTransferDetailsKA.lblTransactionType.text+" transaction");
  }
  else{
    var fromAccount = [frmRecentTransferDetailsKA.lblFromAccountNumber.text , frmRecentTransferDetailsKA.lblFromAccountDataKA.text];
    var toAccount = [frmRecentTransferDetailsKA.lblToAccountNumber.text , frmRecentTransferDetailsKA.lblToAccountDataKA.text];
    var amount = frmRecentTransferDetailsKA.lblAmountDataKA.text.slice(1);
    var notes = frmRecentTransferDetailsKA.lblNotesDataKA.text;
    var frequency = frmRecentTransferDetailsKA.lblFrequencyDataKA.text;
    var date = [parseInt(frmRecentTransferDetailsKA.lblTransferDateDataKA.text.split("/")[1]),parseInt(frmRecentTransferDetailsKA.lblTransferDateDataKA.text.split("/")[0]),parseInt(frmRecentTransferDetailsKA.lblTransferDateDataKA.text.split("/")[2]),0,0,0];
    var fromDate = [parseInt(frmRecentTransferDetailsKA.lblRecurrenceFromDateKA.text.split("/")[1]),parseInt(frmRecentTransferDetailsKA.lblRecurrenceFromDateKA.text.split("/")[0]),parseInt(frmRecentTransferDetailsKA.lblRecurrenceFromDateKA.text.split("/")[2]),0,0,0];
    var toDate = [parseInt(frmRecentTransferDetailsKA.lblRecurrenceToDateKA.text.split("/")[1]),parseInt(frmRecentTransferDetailsKA.lblRecurrenceToDateKA.text.split("/")[0]),parseInt(frmRecentTransferDetailsKA.lblRecurrenceToDateKA.text.split("/")[2]),0,0,0];
    var isExternalAccount = false;
    var recurrenceType = "";
    var nor = "0";
    if(frmRecentTransferDetailsKA.lblTransactionType.text === "ExternalTransfer"){
      isExternalAccount = true;
    }
    if(frmRecentTransferDetailsKA.lblRecurrenceType.text === "nor"){
      recurrenceType = "nor";
      nor = frmRecentTransferDetailsKA.lblRecurrenceTimesDataKA.text;
    }
    else{
      recurrenceType = "daterange";
    }

    values = {"fromAccount":fromAccount, "toAccount":toAccount, "amount":amount, "notes":notes, "frequency":frequency, "date":date, "recurrenceType":recurrenceType, "fromDate":fromDate, "toDate":toDate, "nor":nor, "isExternalAccount":isExternalAccount };
    showTransferPage();
  }
}




function onExternalTransfersRowClick(rowNumber)
{
  var tempExternAccount=kony.retailBanking.globalData.ExternalAccounts[rowNumber];
  var pageData={};
  pageData.Country = tempExternAccount.countryName;
  pageData.IsInternational = tempExternAccount.isInternationalAccount;
  pageData.SwiftCode = tempExternAccount.swiftCode;
  pageData.RoutingNo = tempExternAccount.routingNumber;
  pageData.AccountNumber = tempExternAccount.accountNumber;
  pageData.AccountName = tempExternAccount.nickName;
  pageData.AccountType = tempExternAccount.accountType;
  pageData.BenificiaryName = tempExternAccount.beneficiaryName;

  loadIntoDetailsFormAndShow(pageData);
}

//Scheduled Transaction Details Load 

function setValuesForScheduledTransferDetails(selectedRowIndex){
  var data=  kony.retailBanking.globalData.transfers.getTransfersData("scheduledTransactions")[selectedRowIndex];
  // kony.print(JSON.stringify(data));

  //  frmScheduledTransferDetailsKA.lblTransactionType.text = data.transactionType;
  //   if(data.transactionType === "ExternalTransfer"){
  //     frmScheduledTransferDetailsKA.lblToAccountNumber.text = data.ExternalAccountNumber;
  //   }
  //   else if(data.transactionType === "InternalTransfer"){
  //     frmScheduledTransferDetailsKA.lblToAccountNumber.text = data.toAccountNumber;
  //   }

  frmScheduledTransferDetailsKA.lblTransactionIdData.text = data.transactionId;
  frmScheduledTransferDetailsKA.lblFromAccountDataKA.text = data.fromNickName;
  //  frmRecentTransferDetailsKA.lblToAccountNumber.text = data.toAccountNumber;
  frmScheduledTransferDetailsKA.lblToAccountDataKA.text = data.toAccountName;
  frmScheduledTransferDetailsKA.lblAmountDataKA.text = data.amount;
  frmScheduledTransferDetailsKA.lblNotesDataKA.text = data.transactionsNotes;
  if(data.frequencyType === "Once"){
    frmScheduledTransferDetailsKA.lblFrequencyDataKA.text = data.frequencyType;
    frmScheduledTransferDetailsKA.flxRecurrence.isVisible = false;
  }
  else{
    frmScheduledTransferDetailsKA.lblFrequencyDataKA.text = data.frequencyType;
    frmScheduledTransferDetailsKA.flxRecurrence.isVisible = true;
  }
  frmScheduledTransferDetailsKA.lblTransferDateDataKA.text = data.transactionDate;
  if(data.frequencyStartDate !== undefined || data.frequencyEndDate !== undefined || data.numberOfRecurrences === 0){
    frmScheduledTransferDetailsKA.lblRecurrenceFromDateKA.text = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(data.frequencyStartDate);
    frmScheduledTransferDetailsKA.lblRecurrenceToDateKA.text = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(data.frequencyEndDate);
    //frmScheduledTransferDetailsKA.lblRecurrenceType.text = "daterange";
    frmScheduledTransferDetailsKA.flxRecurrence.isVisible = true;
    frmScheduledTransferDetailsKA.flxRecurrenceDatesInput.isVisible = true;
    frmScheduledTransferDetailsKA.flxRecurrenceTimesInput.isVisible = false;
  }
  else{
    //frmScheduledTransferDetailsKA.lblRecurrenceType.text = "nor";
    frmScheduledTransferDetailsKA.lblRecurrenceTimesDataKA.text = data.numberOfRecurrences;
    frmScheduledTransferDetailsKA.flxRecurrenceDatesInput.isVisible = false;
    frmScheduledTransferDetailsKA.flxRecurrenceTimesInput.isVisible = true;
  }
  frmScheduledTransferDetailsKA.show();
}


//Delete Scheduled Transaction


function deleteTransaction(transactionId){
  kony.ui.Alert
  ({
    "message": "Are you sure you want to cancel",
    "alertType": constants.ALERT_TYPE_CONFIRMATION,
    "alertTitle":"INFO",
    "yesLabel": "YES",
    "noLabel": "NO",
    "alertHandler":CancelAlertFunction
  },{});

  function CancelAlertFunction(res)
  {
    //var transactionId =  accountTransactionDetails.transactionId.text;
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
      modelObj.remove(serviceOptions, transactionDeleteSuccess, customCallbac);
    }
  }

  function transactionDeleteSuccess(res)
  {
    // getTransferPayLandingForm("frmTransferPayLandingKA");
    // onTransactionClose();
    // rightContainer = "rightWrapper";
    // getTransferPayLandingForm("frmTransferPayLandingKA");

    showScheduledTransfers();
  }


  function customCallbac(res)
  {
    alert ("Failed Transaction "+ JSON.strigify(res));
  }

}


function recentOrScheduledButtonOnclick(context)
{
  //var RowData = kony.retailBanking.globalData.transfers.getTransfersData("recentTransactions")[context.rowIndex];

  if(kony.application.getCurrentForm().id=="frmScheduledTransfersKA"){
    var RowData = kony.retailBanking.globalData.transfers.getTransfersData("scheduledTransactions")[context.rowIndex];
    deleteTransaction(RowData.transactionId);
  }
  else{
    var RowData = kony.retailBanking.globalData.transfers.getTransfersData("recentTransactions")[context.rowIndex];
    values = setValuesForMakeTransfer(kony.retailBanking.globalData.transfers.getTransfersData("recentTransactions")[context.rowIndex]);
    showTransferPage();
  }
}


//Used To Get ScheduleEditTransfer
function scheduleEditMakeTransfer(selectedRowIndex)
{
  var scheduledData=  kony.retailBanking.globalData.transfers.getTransfersData("scheduledTransactions")[selectedRowIndex];
  values = setValuesForMakeTransfer(scheduledData, true);
  showTransferPage();
}


