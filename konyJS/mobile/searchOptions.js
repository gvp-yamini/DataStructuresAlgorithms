 var searchObject = { 	searchType : "Search",
						searchDescription : "",
						firstRecordNumber : "0",
						lastRecordNumber  : "24",
						searchMinAmount : "1",
						searchMaxAmount : "",
						searchStartDate : "",
						searchEndDate : "",
						fromCheckNumber : "",
						toCheckNumber : "",
						accountNumber : "",
						searchTransactionType : "Both"
						
					};

function navigateToSearchOptions(){
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
	var frmController = INSTANCE.getFormController("frmAccountDetailKA");
  	var controllerContextData = frmController.getContextData();
    if( controllerContextData && controllerContextData.getCustomInfo("selectedAccountObj")){
          var accountData = controllerContextData.getCustomInfo("selectedAccountObj");
          var accountId = accountData["accountID"];
    }
    var navObject = new kony.sdk.mvvm.NavigationObject();
    var acnt = {"id":accountId};
    navObject.setCustomInfo("selAccount",acnt);
    navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
    clearData();
    frmController.performAction("navigateTo",["frmSearchOptionsKA",navObject]); 
}
function clearData(){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmSearchOptionsKA");
  var viewModel = controller.getFormModel();
  viewModel.setViewAttributeByProperty("tbxSearchKA","text","");
  viewModel.setViewAttributeByProperty("txtMinAmountKA","text","");
  viewModel.setViewAttributeByProperty("txtMaxAmountKA","text","");
  viewModel.setViewAttributeByProperty("txtFromCheckKA","text","");
  viewModel.setViewAttributeByProperty("txtToCheckKA","text","");
  viewModel.performActionOnView("lblInvalidAmntRange","setVisibility",[false]);
  viewModel.setViewAttributeByProperty("lbxAccountsKA","selectedKey","thismonth");
}
function onClickRadioBtnIphone(){
  var selKey = frmSearchOptionsKA.searchSegmentedController.selectedKey;
  switch(selKey){
    case 'withdrawal' :searchObject.searchTransactionType = "Withdrawal";
                       break;
   case 'both' :searchObject.searchTransactionType = "Both";
                       break;
   case 'deposit' :searchObject.searchTransactionType = "Deposit";
                       break;
  }
  
}

function onWithdrawalSelected(){
  frmSearchOptionsKA.btnWithdrawalKA.skin = sknandroidSegmentedTextActive;
  frmSearchOptionsKA.btnBothKA.skin = sknandroidSegmentedTextInactive;
  frmSearchOptionsKA.btnDepositKA.skin = sknandroidSegmentedTextInactive;
  frmSearchOptionsKA.flxSelectedKA.left = "0%";
  searchObject.searchTransactionType = "Withdrawal";
}

function onBothSearchSelected(){
  frmSearchOptionsKA.btnWithdrawalKA.skin = sknandroidSegmentedTextInactive;
  frmSearchOptionsKA.btnBothKA.skin = sknandroidSegmentedTextActive;
  frmSearchOptionsKA.btnDepositKA.skin = sknandroidSegmentedTextInactive;
  frmSearchOptionsKA.flxSelectedKA.left = "33.3%";
  searchObject.searchTransactionType = "Both";
}

function onDepositSelected(){
  frmSearchOptionsKA.btnWithdrawalKA.skin = sknandroidSegmentedTextInactive;
  frmSearchOptionsKA.btnBothKA.skin = sknandroidSegmentedTextInactive;
  frmSearchOptionsKA.btnDepositKA.skin = sknandroidSegmentedTextActive;
  frmSearchOptionsKA.flxSelectedKA.left = "66.6%";
 searchObject.searchTransactionType = "Deposit";
}

function onlbxDateRangeSelected(){
  if(frmSearchOptionsKA.lbxPeriodKA.selectedKey == "pickdate"){
   frmSearchOptionsKA.flxCalenders.setVisibility(true);
   calendarSet();
   frmSearchOptionsKA.flxCalenders.forceLayout();
  } 
  else 
  {
    frmSearchOptionsKA.flxCalenders.setVisibility(false);
    frmSearchOptionsKA.lblInvalidDateRangeKA.setVisibility(false);
  }
}

function selectAmountRange()
{
  frmSearchOptionsKA.lblInvalidAmntRange.setVisibility(false);
  if(kony.retailBanking.globalData.deviceInfo.isIphone())
  {
    if(frmSearchOptionsKA.switchAmountRangeKA.selectedIndex)
    {
      frmSearchOptionsKA.flxTbxAmountRangeKA.setVisibility(false);
      frmSearchOptionsKA.txtMaxAmountKA.text = "";
      frmSearchOptionsKA.txtMinAmountKA.text = "";

    }else
    {
      frmSearchOptionsKA.flxTbxAmountRangeKA.setVisibility(true);
    }
  }else
  {
    if(frmSearchOptionsKA.chkboxAmountRangeKA.selectedKeyValues===null)
    {
      frmSearchOptionsKA.flxTbxAmountRangeKA.setVisibility(false);
      frmSearchOptionsKA.txtMaxAmountKA.text = "";
      frmSearchOptionsKA.txtMinAmountKA.text = "";
    }else
    {
      frmSearchOptionsKA.flxTbxAmountRangeKA.setVisibility(true);
    }
  }
}

function selectCheckNumbers()
{
  if(kony.retailBanking.globalData.deviceInfo.isIphone())
  {
    if(frmSearchOptionsKA.checkNumSwitchKA.selectedIndex)
    {
      frmSearchOptionsKA.flxTbxCheckNumbers.setVisibility(false);
      frmSearchOptionsKA.txtFromCheckKA.text = "";
      frmSearchOptionsKA.txtToCheckKA.text = "";
    }else
    {
      frmSearchOptionsKA.flxTbxCheckNumbers.setVisibility(true);
    }
  }else
  {
    if(frmSearchOptionsKA.chkboxCheckNumRangeKA.selectedKeyValues===null)
    {
      frmSearchOptionsKA.flxTbxCheckNumbers.setVisibility(false);
      frmSearchOptionsKA.txtFromCheckKA.text = "";
      frmSearchOptionsKA.txtToCheckKA.text = "";
    }else
    {
      frmSearchOptionsKA.flxTbxCheckNumbers.setVisibility(true);
    }
  }
}

function searchResults(offset){
  kony.print("Perf Log: Search results service call - start");
  var searchObj = setDataToSearch(searchObject);
  if(offset){
    searchObj.firstRecordNumber = offset;
    searchObj.lastRecordNumber = 25;
  } 
  else{
    frmSearchResultsKA["segSearchResultsKA"].removeAll();
    frmSearchResultsKA["segSearchResultsSevenDaysKA"].removeAll();
    frmSearchResultsKA["segSearchResultsOlderKA"].removeAll();
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
//}
function searchSuccess(response){
  kony.print("Perf Log: Search results service call - End");
  kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
 // frmSearchResultsKA.lblHeaderKA.text = frmSearchOptionsKA.lbxAccountsKA.selectedKeyValue[1];
  var segLen,segData,tempDate;
  var segLenToday = 0,segDataToday = [];
  var segLenWeek = 0,segDataWeek = [];
  var segLenOld = 0,segDataOld = [];
  if(response.length !== 0){
    kony.retailBanking.globalData.globals.pageFlag = true;
    frmSearchResultsKA.flxSectionHeaderKA.setVisibility(true);
    frmSearchResultsKA.segSearchResultsKA.setVisibility(true);
    frmSearchResultsKA.flxSectionHeaderSevenDaysKA.setVisibility(true);
    frmSearchResultsKA.segSearchResultsSevenDaysKA.setVisibility(true);
    frmSearchResultsKA.flxSectionHeaderOlderKA.setVisibility(true);
    frmSearchResultsKA.segSearchResultsOlderKA.setVisibility(true);
    frmSearchResultsKA.LabelNoRecordsKA.setVisibility(false);
    if(frmSearchResultsKA["segSearchResultsKA"].data){
      segLen = frmSearchResultsKA["segSearchResultsKA"].data.length;
    }
    segData =  frmSearchResultsKA["segSearchResultsKA"].data;
    for ( var i=0; i< response.length;i++ ){
      	 tempDate = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(response[i]["transactionDate"]);
         response[i]["amount"] = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(response[i]["amount"]);
      	 if(response[i].hasOwnProperty("description") === true)
           response[i]["description"] = kony.retailBanking.util.validation.trucateTo(response[i]["description"],25,22,"...");
         if(tempDate!==""){
 //          response[i]["transactionDate"] = tempDate;
           switch(compareTransactionDate(response[i]["transactionDate"])){
             case 1	:	response[i]["transactionDate"] = tempDate;
               			segDataToday[segLenToday++] = response[i];
               			break;
             case 2 :	response[i]["transactionDate"] = tempDate;
               			segDataWeek[segLenWeek++] = response[i];
               			break;
             case 3 :	response[i]["transactionDate"] = tempDate;
               			segDataOld[segLenOld++] = response[i];
               			break;
             default :
           }
         }
     }
    frmSearchResultsKA.segSearchResultsKA.widgetDataMap={
        lblTransactionDateKA:"transactionDate",
        lblTransactionAmountKA:"amount",
        lblTransactionNameKA:"description"
      };
    frmSearchResultsKA.segSearchResultsSevenDaysKA.widgetDataMap={
        lblTransactionDateKA:"transactionDate",
        lblTransactionAmountKA:"amount",
        lblTransactionNameKA:"description"
      };
    frmSearchResultsKA.segSearchResultsOlderKA.widgetDataMap={
        lblTransactionDateKA:"transactionDate",
        lblTransactionAmountKA:"amount",
        lblTransactionNameKA:"description"
      };
    if(segLen)
      frmSearchResultsKA["segSearchResultsKA"].setData(segData.concat(response));
    else {
      if(segLenToday)
      	frmSearchResultsKA["segSearchResultsKA"].setData(segDataToday);
      else
      {
        frmSearchResultsKA.flxSectionHeaderKA.setVisibility(false);
    	frmSearchResultsKA.segSearchResultsKA.setVisibility(false);
      }
      if(segLenWeek)
      	frmSearchResultsKA["segSearchResultsSevenDaysKA"].setData(segDataWeek);
      else
      {
        frmSearchResultsKA.flxSectionHeaderSevenDaysKA.setVisibility(false);
    	frmSearchResultsKA.segSearchResultsSevenDaysKA.setVisibility(false);
      }
      if(segLenOld)
      	frmSearchResultsKA["segSearchResultsOlderKA"].setData(segDataOld);
      else
      {
        frmSearchResultsKA.flxSectionHeaderOlderKA.setVisibility(false);
    	frmSearchResultsKA.segSearchResultsOlderKA.setVisibility(false);
      }
      frmSearchResultsKA.show();
	  kony.print("Perf Log: Search button click - End");
     }
   }
  else if(kony.retailBanking.globalData.globals.pageFlag === false){
      frmSearchResultsKA.LabelNoRecordsKA.setVisibility(true);
      frmSearchResultsKA.flxSectionHeaderKA.setVisibility(false);
      frmSearchResultsKA.segSearchResultsKA.setVisibility(false);
      frmSearchResultsKA.flxSectionHeaderSevenDaysKA.setVisibility(false);
      frmSearchResultsKA.segSearchResultsSevenDaysKA.setVisibility(false);
      frmSearchResultsKA.flxSectionHeaderOlderKA.setVisibility(false);
      frmSearchResultsKA.segSearchResultsOlderKA.setVisibility(false);
      frmSearchResultsKA.show();
      kony.print("Perf Log: Search button click - End");
 		}
	}
}
function navigateBackToSearchOptions(){
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
	var controller = INSTANCE.getFormController("frmSearchOptionsKA");
    kony.retailBanking.globalData.globals.pageFlag = false;
    searchObject.firstRecordNumber = "0"; // Resetting first record number due to pagiantion
	searchObject.lastRecordNumber  = "24";
    controller.showForm();
}
function setDataToSearch(searchObject){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmSearchOptionsKA");
  var viewModel = controller.getFormModel();
  var searchDesc = viewModel.getViewAttributeByProperty("tbxSearchKA","text");
  var accId = viewModel.getViewAttributeByProperty("lbxAccountsKA","selectedKey");
  var minAmount = viewModel.getViewAttributeByProperty("txtMinAmountKA","text");
  var maxAmount = viewModel.getViewAttributeByProperty("txtMaxAmountKA","text");
  var frmCheckNum = viewModel.getViewAttributeByProperty("txtFromCheckKA","text");
  var toCheckNum = viewModel.getViewAttributeByProperty("txtToCheckKA","text");
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

function getPickerDateSelection()
{
  var fromDate = frmSearchOptionsKA.CalenderFrom.dateComponents;
  var toDate  = frmSearchOptionsKA.CalenderTo.dateComponents;
  var pDateFormat = getDateFormatByCalenderArray(fromDate[2],fromDate[1],fromDate[0]);
  var lDateFormat = getDateFormatByCalenderArray(toDate[2],toDate[1],toDate[0]);
  var startDate = kony.retailBanking.util.formatingDate.getISODateTimeKA(pDateFormat,kony.retailBanking.util.BACKEND_DATE_FORMAT);
  var endDate = kony.retailBanking.util.formatingDate.getISODateTimeKA(lDateFormat,kony.retailBanking.util.BACKEND_DATE_FORMAT);
  var pDate = JSON.stringify(startDate);
  var lDate = JSON.stringify(endDate);
  searchObject.searchStartDate =pDate.substring(1, pDate.length-1);
  searchObject.searchEndDate = lDate.substring(1, lDate.length-1);
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

function calendarSet()
{   var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmSearchOptionsKA");
    var viewModel = controller.getFormModel();
	var d = new Date();
	var date=d.getDate();
	var year=d.getFullYear();
	var month=(d.getMonth()+1);
    //viewModel.setViewAttributeByProperty("CalenderFrom","dateComponents",[date,month,year]);
    viewModel.setViewAttributeByProperty("CalenderTo","dateComponents",[date,month,year]);
	viewModel.setViewAttributeByProperty("CalenderFrom","validEndDate",[date,month,year]);
    viewModel.setViewAttributeByProperty("CalenderTo","validEndDate",[date,month,year]);
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

function navigateToSearchTransactionDetails(selRecord){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var searchController = INSTANCE.getFormController("frmSearchTransactionDetailsKA");
  var searchViewModel = searchController.getFormModel();
  //var selRecord  = frmSearchResultsKA.segmentName.selectedItems[0];
  var navigationObject = new kony.sdk.mvvm.NavigationObject;
  var transactionId = selRecord["transactionId"];
  var datamodel = new kony.sdk.mvvm.DataModel;
  navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
  navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"transactionId": transactionId}});
  searchController.loadDataAndShowForm(navigationObject);
}

function compareAmountFields()
{   
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmSearchOptionsKA");
    var viewModel = controller.getFormModel();
	var fromAmount = parseInt(viewModel.getViewAttributeByProperty("txtMaxAmountKA","text"));
    var toAmount = parseInt(viewModel.getViewAttributeByProperty("txtMinAmountKA","text"));
    if (fromAmount == 0 && (toAmount>0))
        viewModel.performActionOnView("lblInvalidAmntRange","setVisibility",[true]);
    if (fromAmount && toAmount)
       if (fromAmount<toAmount)
         viewModel.performActionOnView("lblInvalidAmntRange","setVisibility",[true]);      
}

function offInvalidAmountorDate(lblName)
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmSearchOptionsKA");
  var viewModel = controller.getFormModel();
         viewModel.performActionOnView(lblName,"setVisibility",[false]);
}

function validateSearchfields()
{
  kony.print("Perf Log: Search button click - Start");
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmSearchOptionsKA");
  var viewModel = controller.getFormModel();
  var validated =true;
  var dateValidated =true;
  if(viewModel.getViewAttributeByProperty("flxTbxAmountRangeKA","isVisible"))
  {
    validated=kony.retailBanking.util.validation.validateTextboxOrLabel(viewModel && viewModel.getViewAttributeByProperty("txtMinAmountKA","text"));
    if (validated)
      validated = kony.retailBanking.util.validation.validateTextboxOrLabel(viewModel && viewModel.getViewAttributeByProperty("txtMaxAmountKA","text"));
  }
  if(viewModel.getViewAttributeByProperty("flxCalenders","isVisible"))
  {
    if(viewModel.getViewAttributeByProperty("CalenderFrom","dateComponents")[0]=== -1 ||
       viewModel.getViewAttributeByProperty("CalenderTo","dateComponents")[0]=== -1 )
    {
      dateValidated =false;
    }
  }
  if(validated && dateValidated)
  {  
    validated = viewModel.getViewAttributeByProperty("lblInvalidAmntRange","isVisible");
    dateValidated = viewModel.getViewAttributeByProperty("lblInvalidDateRangeKA","isVisible");
    if (!validated && !dateValidated)
      searchResults();
  }
}

function compareTransactionDate(date)
{
  var newday = new Date();
  var weekBack = new Date(newday.getTime() - 7*24*60*60*1000);
  var yesterday = new Date(newday.getTime() - 24*60*60*1000);
  var compareDate = new Date(date);
  if(compareDate.getDate() == newday.getDate() && compareDate.getMonth() == newday.getMonth() && compareDate.getFullYear() == newday.getFullYear())
    return 1;
  if(compareDate < newday && compareDate >= weekBack)
    return 2;
  return 3;
}

function compareDateFields()
{  

  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmSearchOptionsKA");
  var viewModel = controller.getFormModel();
  if(viewModel.getViewAttributeByProperty("flxCalenders","isVisible"))
  { 
    var fromDate = new Date(getFormattedDateFromCalendarDate(viewModel.getViewAttributeByProperty("CalenderFrom","dateComponents")));
    var toDate =   new Date(getFormattedDateFromCalendarDate(viewModel.getViewAttributeByProperty("CalenderTo","dateComponents")));  
    if (fromDate && toDate)
      if (+fromDate > +toDate)
        viewModel.performActionOnView("lblInvalidDateRangeKA","setVisibility",[true]);      
  }
}