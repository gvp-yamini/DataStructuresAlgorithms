var searchObject = { 	searchType : "Search",
						searchDescription : "",
						firstRecordNumber : "0",
						lastRecordNumber  : "10",
						searchMinAmount : "1",
						searchMaxAmount : "",
						searchStartDate : "",
						searchEndDate : "",
						fromCheckNumber : "",
						toCheckNumber : "",
						accountNumber : "",
						searchTransactionType : "Both"
						
					};
var searchSegSize;
function navigateToSearchOptions() {
		var currForm=kony.application.getCurrentForm();
  	var current=currForm.id;
	if(current!="frmTransactionSearch1KA"){
		var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var navObject = new kony.sdk.mvvm.NavigationObject();
    var frmController = INSTANCE.getFormController("frmTransactionSearch1KA");
    navObject.setRequestOptions("form", {
        "headers": {
            "session_token": kony.retailBanking.globalData.session_token
        }
    });
    clearData();
    frmController.loadDataAndShowForm(navObject);
	}
    
}
function clearData(){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmTransactionSearch1KA");
  var viewModel = controller.getFormModel();
  var d = new Date();
  var date=d.getDate();
  var year=d.getFullYear();
  var month=(d.getMonth()+1);
  viewModel.setViewAttributeByProperty("tbxSearchKeyboardKA","text","");
  viewModel.setViewAttributeByProperty("tbxFromAmountKA","text","");
  viewModel.setViewAttributeByProperty("tbxToAmountKA","text","");
  viewModel.setViewAttributeByProperty("tbxCheckNumbFromKA","text","");
  viewModel.setViewAttributeByProperty("tbxCheckNumbToKA","text","");
  viewModel.setViewAttributeByProperty("lbxPeriodKA","selectedKey","thismonth");
  viewModel.setViewAttributeByProperty("rGrpTransactionKA","selectedKey","rbg3");
  viewModel.setViewAttributeByProperty("calPeriodFromKA","dateComponents",[date,month,year]);
  viewModel.setViewAttributeByProperty("calPeriodToKA","dateComponents",[date,month,year]);
  viewModel.setViewAttributeByProperty("calPeriodFromKA","validEndDate",[date,month,year]);
  viewModel.setViewAttributeByProperty("calPeriodToKA","validEndDate",[date,month,year]);
  viewModel.setViewAttributeByProperty("listAlertAccountsKA","selectedKey",-1);
  viewModel.performActionOnView("flxPeriodFromToKA", "setVisibility", [false]);
}

function onlbxDateRangeSelected(){
  if(frmTransactionSearch1KA.lbxPeriodKA.selectedKey == "pickdate"){
   frmTransactionSearch1KA.flxPeriodFromToKA.setVisibility(true);
   frmTransactionSearch1KA.flxPeriodFromToKA.forceLayout();
  } 
  else 
    frmTransactionSearch1KA.flxPeriodFromToKA.setVisibility(false);
}

function onClickRadioBtnTransaction(){
  var selKey = frmTransactionSearch1KA.rGrpTransactionKA.selectedKey;
  switch(selKey){
    case 'withdrawal' :searchObject.searchTransactionType = "Withdrawal";
                       break;
   case 'both' :searchObject.searchTransactionType = "Both";
                       break;
   case 'deposit' :searchObject.searchTransactionType = "Deposit";
                       break;
  }
  
}

function searchResults(offset){
  var searchObj = setDataToSearch(searchObject);
  if(offset){
    searchObj.firstRecordNumber = offset;
    searchObj.lastRecordNumber = 10;
  } 
  else{
    frmTransactionSearch2KA["segTransactionSearchKA"].removeAll();
  }
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var options ={    "access": "online",
                    "objectName": "RBObjects"
               };
  var headers = {"session_token":kony.retailBanking.globalData.session_token};
  var serviceName = "RBObjects";
  var modelObj = INSTANCE.getModel("Transactions",serviceName,options);
  var dataObject = new kony.sdk.dto.DataObject("Transactions");
  var serviceOptions = {"dataObject":dataObject,"queryParams":searchObj, "headers":headers};
  ShowLoadingScreen();
  modelObj.fetch(serviceOptions,searchSuccess, customErrorCallback);
}
function searchSuccess(response){
  kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
  frmTransactionSearch2KA.lblAccountTypeKA.text = frmTransactionSearch1KA.listAlertAccountsKA.selectedKeyValue[1];
  var tempDate;
  if(response.length !== 0){
    searchSegSize = response.length;
    kony.retailBanking.globalData.globals.pageFlag = true;
    frmTransactionSearch2KA.segTransactionSearchKA.isVisible = true;
    frmTransactionSearch2KA.lblNoRecordsToViewScheduled.isVisible = false;
    for ( var i=0; i< response.length;i++ ){
         switch(response[i]["transactionType"]){
           case "InternalTransfer":response[i]["transferTo"] =response[i]["toAccountName"];
                                   break;
           case "BillPay":response[i]["transferTo"] =response[i]["payeeNickName"];
                                   break;
           case "ExternalTransfer":response[i]["transferTo"] =response[i]["ExternalAccountNumber"];
                                   break;
           case "P2P":response[i]["transferTo"] =response[i]["payPersonName"];
                                   break;
           case "Deposit":response[i]["transferTo"] =response[i]["toAccountName"];
                                   break;
         }
         response[i]["amount"] = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(response[i]["amount"]);
         tempDate = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(response[i]["transactionDate"]);
         if(tempDate!=="")
       		response[i]["transactionDate"] = tempDate;
     }
    frmTransactionSearch2KA.segTransactionSearchKA.widgetDataMap={
        lblDateKA:"transactionDate",
        lblAmountKA:"amount",
        lblNoteKA:"transactionsNotes",
        lblTransactionTypeKA:"transactionType",
        lblTransferToKA:"transferTo",
        lblTransactionIdKA:"transactionId"
      };
   
      frmTransactionSearch2KA["segTransactionSearchKA"].setData(response);
      frmTransactionSearch2KA.flxPageKA.setVisibility(true);
      frmTransactionSearch2KA.show();
	  frmTransactionSearch2KA.forceLayout();
     
   }
  else if(kony.retailBanking.globalData.globals.pageFlag === false){
       frmTransactionSearch2KA.lblNoRecordsToViewScheduled.setVisibility(true);
       frmTransactionSearch2KA.segTransactionSearchKA.setVisibility(false);
       frmTransactionSearch2KA.flxPageKA.setVisibility(false);
       frmTransactionSearch2KA.show();

 }
}
function navigateBackToSearchOptions(){
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
	var controller = INSTANCE.getFormController("frmTransactionSearch1KA");
	controller.showForm();
}
function setDataToSearch(searchObject){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmTransactionSearch1KA");
  var viewModel = controller.getFormModel();
  var searchDesc = viewModel.getViewAttributeByProperty("tbxSearchKeyboardKA","text");
  var accId = viewModel.getViewAttributeByProperty("listAlertAccountsKA","selectedKey");
  var minAmount = viewModel.getViewAttributeByProperty("tbxFromAmountKA","text");
  var maxAmount = viewModel.getViewAttributeByProperty("tbxToAmountKA","text");
  var frmCheckNum = viewModel.getViewAttributeByProperty("tbxCheckNumbFromKA","text");
  var toCheckNum = viewModel.getViewAttributeByProperty("tbxCheckNumbToKA","text");
  searchObject.accountNumber = accId;
  if(searchDesc === null)
    searchDesc = "";
  searchObject.searchDescription = searchDesc;
  if(minAmount === null)
    minAmount = "";
  searchObject.searchMinAmount = minAmount;
  if(maxAmount === null)
    maxAmount = "";
  searchObject.searchMaxAmount = maxAmount;
  if(frmCheckNum === null)
    frmCheckNum = "";
  searchObject.fromCheckNumber = frmCheckNum;
  if(toCheckNum === null)
    toCheckNum = "";
  searchObject.toCheckNumber = toCheckNum;
  var dateRange = viewModel.getViewAttributeByProperty("lbxPeriodKA","selectedKey");
  switch(dateRange){
    case "thismonth" :getThisMonth();
      				  break;
    case "lastmonth":getLastMonth();
      				 break;
    case "last30days":getLastThirtyDays();
      				  break;
    case "last90days":getLastNintyDays();
      				  break;
    case "pickdate":getPickerDateSelection();
      				break;
  }
  return searchObject;
}

function getPickerDateSelection()
{
  var fromDate = frmTransactionSearch1KA.calPeriodFromKA.dateComponents;
  var toDate  = frmTransactionSearch1KA.calPeriodToKA.dateComponents;
  var pDateFormat = getDateFormatByCalenderArray(fromDate[2],fromDate[1],fromDate[0]);
  var lDateFormat = getDateFormatByCalenderArray(toDate[2],toDate[1],toDate[0]);
  var startDate = kony.retailBanking.util.formatingDate.getISODateTimeKA(pDateFormat,kony.retailBanking.util.BACKEND_DATE_FORMAT);
  var endDate = kony.retailBanking.util.formatingDate.getISODateTimeKA(lDateFormat,kony.retailBanking.util.BACKEND_DATE_FORMAT);
  var pDate = JSON.stringify(startDate);
  var lDate = JSON.stringify(endDate);
  searchObject.searchStartDate =pDate.substring(1, pDate.length-1);
  searchObject.searchEndDate = lDate.substring(1, lDate.length-1);
}

function getThisMonth()
{
  var date = new Date();
  var month = date.getMonth();
  var year = date.getFullYear();
  var presentDate = new Date(year, month-1, 1); 
  var pDateFormat = getDateString(presentDate);
  var lDateFormat = getDateString(date);
  var startDate = kony.retailBanking.util.formatingDate.getISODateTimeKA(pDateFormat,kony.retailBanking.util.BACKEND_DATE_FORMAT);
  var endDate = kony.retailBanking.util.formatingDate.getISODateTimeKA(lDateFormat,kony.retailBanking.util.BACKEND_DATE_FORMAT);
  var pDate = JSON.stringify(startDate);
  var lDate = JSON.stringify(endDate);
  searchObject.searchStartDate =pDate.substring(1, pDate.length-1);
  searchObject.searchEndDate = lDate.substring(1, lDate.length-1);
}

function getLastMonth()
{
  var lDateObj = new Date();
  var lastDay = new Date(lDateObj.getFullYear(), lDateObj.getMonth(), 0);
  var lDateFormat = getDateString(lastDay);
  var date = new Date();
  var firstDay = new Date(date.getFullYear(), date.getMonth()-2, 1);
  var pDateFormat = getDateString(firstDay);
  var startDate = kony.retailBanking.util.formatingDate.getISODateTimeKA(pDateFormat,kony.retailBanking.util.BACKEND_DATE_FORMAT);
  var endDate = kony.retailBanking.util.formatingDate.getISODateTimeKA(lDateFormat,kony.retailBanking.util.BACKEND_DATE_FORMAT);
  var pDate = JSON.stringify(startDate);
  var lDate = JSON.stringify(endDate);
  searchObject.searchStartDate =pDate.substring(1, pDate.length-1);
  searchObject.searchEndDate = lDate.substring(1, lDate.length-1);
}

function getLastThirtyDays()
{
  var today = new Date();
  var priorDate = new Date(today.getTime() - 30*24*60*60*1000);
  var pDateFormat = getDateString(today);
  var lDateFormat = getDateString(priorDate);
  var startDate = kony.retailBanking.util.formatingDate.getISODateTimeKA(pDateFormat,kony.retailBanking.util.BACKEND_DATE_FORMAT);
  var endDate = kony.retailBanking.util.formatingDate.getISODateTimeKA(lDateFormat,kony.retailBanking.util.BACKEND_DATE_FORMAT);
  var pDate = JSON.stringify(startDate);
  var lDate = JSON.stringify(endDate);
  searchObject.searchStartDate = lDate.substring(1, lDate.length-1);  
  searchObject.searchEndDate = pDate.substring(1, pDate.length-1);
}
function getLastNintyDays()
{
  var today = new Date();
  var priorDate = new Date(today.getTime() - 90*24*60*60*1000);
  var pDateFormat = getDateString(today);
  var lDateFormat = getDateString(priorDate);
  var startDate = kony.retailBanking.util.formatingDate.getISODateTimeKA(pDateFormat,kony.retailBanking.util.BACKEND_DATE_FORMAT);
  var endDate = kony.retailBanking.util.formatingDate.getISODateTimeKA(lDateFormat,kony.retailBanking.util.BACKEND_DATE_FORMAT);
  var pDate = JSON.stringify(startDate);
  var lDate = JSON.stringify(endDate);
  searchObject.searchStartDate = lDate.substring(1, lDate.length-1);
  searchObject.searchEndDate = pDate.substring(1, pDate.length-1);
}



function getDateString(passedDate)
{
  var pYear = passedDate.getFullYear().toString();
  var pMonth = passedDate.getMonth()+1;
  var pDay  = passedDate.getUTCDate();
  if(pMonth<10)
    pMonth =  "0"+pMonth.toString();
  else
    pMonth =  pMonth.toString();
  if(pDay<10)
    pDay =  "0"+pDay.toString();
  else
    pDay =  pDay.toString();
  var pDateFormat = pYear+"-"+pMonth+"-"+pDay;
  return pDateFormat;
}


function getDateFormatByCalenderArray(year,month,day)
{
  var pYear = year.toString();
  var pMonth = month;
  var pDay  = day;
  if(pMonth<10)
    pMonth =  "0"+pMonth.toString();
  else
    pMonth =  pMonth.toString();
  if(pDay<10)
    pDay =  "0"+pDay.toString();
  else
    pDay =  pDay.toString();
  var pDateFormat = pYear+"-"+pMonth+"-"+pDay;
  return pDateFormat;
}

function searchOnClickNext(frm) {
    var str = frm["lblPageKA"]["text"];
    var num = Number(str.substring(5));
    if (searchSegSize == 10) {
        var offset = 10 * (num);
        searchResults(offset);
        frm["lblPageKA"]["text"] = "Page-" + (num + 1);
    } else alert("No records to show");
}
  
function searchOnClickPrevious(frm) {
    var str = frm["lblPageKA"]["text"];
    var num = Number(str.substring(5));
    var offset = 10 * (num - 2);
	if(offset >= 0 ){
       searchResults(offset);
       frm["lblPageKA"]["text"] = "Page-" + (num - 1);
	}
	else alert("No records to show");
}

function navigateToSearchTransactionDetails(){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var searchController = INSTANCE.getFormController("frmSearchTransactionDetailsKA");
  var searchViewModel = searchController.getFormModel();
  var selRecord  = frmTransactionSearch2KA.segTransactionSearchKA.selectedItems[0];
  var navigationObject = new kony.sdk.mvvm.NavigationObject;
  var transactionId = selRecord["transactionId"];
  var datamodel = new kony.sdk.mvvm.DataModel;
  navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
  navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"transactionId": transactionId}});
  searchController.loadDataAndShowForm(navigationObject);
}