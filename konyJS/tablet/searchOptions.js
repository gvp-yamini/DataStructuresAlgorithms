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
  frmSearchOptionsKA.CalenderFrom.dateComponents = null;
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var navObject = new kony.sdk.mvvm.NavigationObject();
	var frmController = INSTANCE.getFormController("accountsLanding");
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
  viewModel.setViewAttributeByProperty("lbxAccountsKA","selectedKey","thismonth");
  viewModel.performActionOnView("lblInvalidAmntRange","setVisibility",[false]);
  frmSearchOptionsKA.noSearchResults.setVisibility(true);
  frmSearchOptionsKA.segSearchResultsKA.setVisibility(false);
  frmSearchOptionsKA.flxSearchNoResultsKA.setVisibility(false);
}
function onWithdrawalSelected(){
  frmSearchOptionsKA.btnWithdrawalKA.skin = androidSegmentedTextActive;
  frmSearchOptionsKA.btnBothKA.skin = androidSegmentedTextInactive;
  frmSearchOptionsKA.btnDepositKA.skin = androidSegmentedTextInactive;
  frmSearchOptionsKA.flxSelectedKA.left = "0%";
  frmSearchOptionsKA.flxSelectedKA.forceLayout();
  searchObject.searchTransactionType = "Withdrawal";
}

function onBothSelected(){
  frmSearchOptionsKA.btnWithdrawalKA.skin = androidSegmentedTextInactive;
  frmSearchOptionsKA.btnBothKA.skin = androidSegmentedTextActive;
  frmSearchOptionsKA.btnDepositKA.skin = androidSegmentedTextInactive;
  frmSearchOptionsKA.flxSelectedKA.left = "33.3%";
  frmSearchOptionsKA.flxSelectedKA.forceLayout();
  searchObject.searchTransactionType = "Both";
}

function onDepositSelected(){
  frmSearchOptionsKA.btnWithdrawalKA.skin = androidSegmentedTextInactive;
  frmSearchOptionsKA.btnBothKA.skin = androidSegmentedTextInactive;
  frmSearchOptionsKA.btnDepositKA.skin = androidSegmentedTextActive;
  frmSearchOptionsKA.flxSelectedKA.left = "66.6%";
  frmSearchOptionsKA.flxSelectedKA.forceLayout();
  searchObject.searchTransactionType = "Deposit";
}

function onlbxDateRangeSelected(){
  if(frmSearchOptionsKA.lbxPeriodKA.selectedKey == "pickdate"){
   frmSearchOptionsKA.flxCalenders.setVisibility(true);
   calendarSet();
   frmSearchOptionsKA.flxCalenders.forceLayout();
  } 
  else 
    frmSearchOptionsKA.flxCalenders.setVisibility(false);
}

function selectAmountRange()
{
   frmSearchOptionsKA.lblInvalidAmntRange.setVisibility(false);
  if(kony.retailBanking.globalData.deviceInfo.isIpad())
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
  if(kony.retailBanking.globalData.deviceInfo.isIpad())
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
  var searchObj = setDataToSearch(searchObject);
  if(offset){
    searchObj.firstRecordNumber = offset;
    searchObj.lastRecordNumber = 25;
  } 
  else{
    frmSearchOptionsKA["segSearchResultsKA"].removeAll();
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
  var tempDate;
  //frmSearchOptionsKA.lblHeaderKA.text = frmSearchOptionsKA.lbxAccountsKA.selectedKeyValue[1];
  var segLen,segData,tempDate;
  if(response.length !== 0){
    kony.retailBanking.globalData.globals.pageFlag = true;
    frmSearchOptionsKA.segSearchResultsKA.setVisibility(true);
    frmSearchOptionsKA.flxSearchNoResultsKA.setVisibility(false);
    if(frmSearchOptionsKA["segSearchResultsKA"].data){
      segLen = frmSearchOptionsKA["segSearchResultsKA"].data.length;
    }
    segData =  frmSearchOptionsKA["segSearchResultsKA"].data;
  for ( var i=0; i< response.length;i++ ){
    response[i]["amount"] = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(response[i]["amount"]);
    tempDate = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(response[i]["transactionDate"]);
    if(tempDate!=="")
       response[i]["transactionDate"] = tempDate;
  }
  frmSearchOptionsKA.segSearchResultsKA.widgetDataMap={
        lblTransactionDateKA:"transactionDate",
        lblTransactionAmountKA:"amount",
        lblTransactionNameKA:"description"
      };
	if(segLen)
      frmSearchOptionsKA["segSearchResultsKA"].setData(segData.concat(response));
    else {
  frmSearchOptionsKA["segSearchResultsKA"].setData(response);
  frmSearchOptionsKA.segSearchResultsKA.setVisibility(true);
	}
  kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
  }
  else if(kony.retailBanking.globalData.globals.pageFlag === false){
       frmSearchOptionsKA.flxSearchNoResultsKA.setVisibility(true);
       frmSearchOptionsKA.segSearchResultsKA.setVisibility(false);
 }
  frmSearchOptionsKA.noSearchResults.setVisibility(false);
  kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
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
  searchObject.searchStartDate =lDate.substring(1, lDate.length-1);
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
  searchObject.searchStartDate =lDate.substring(1, lDate.length-1);
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

function onTranscationSearchOrientationChangePreShow(){
	  accountRightContainer = "rightWrapper";
      getOrientation();
      frmSearchOptionsKA.leftWrapper.width = leftContainerWidth;
      frmSearchOptionsKA[accountRightContainer].width = rightContainerWidth;
      frmSearchOptionsKA[accountRightContainer].left = leftContainerWidth;
    
}

function onTranscationSearchOrientationChange(){
//userAgent = kony.os.userAgent();
      frmSearchOptionsKA.leftWrapper.width = leftContainerWidth;
      frmSearchOptionsKA[accountRightContainer].width = rightContainerWidth;
      frmSearchOptionsKA[accountRightContainer].left = leftContainerWidth;
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

function navigateToSearchTransactionDetails(){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var searchController = INSTANCE.getFormController("frmSearchTransactionDetailsKA");
  var searchViewModel = searchController.getFormModel();
  var selRecord  = frmSearchOptionsKA.segSearchResultsKA.selectedItems[0];
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
	var toAmount = parseInt(viewModel.getViewAttributeByProperty("txtMaxAmountKA","text"));
    var fromAmount = parseInt(viewModel.getViewAttributeByProperty("txtMinAmountKA","text"));
    if (toAmount == 0 && (fromAmount>0))
        viewModel.performActionOnView("lblInvalidAmntRange","setVisibility",[true]);
    if (fromAmount && toAmount)
       if (fromAmount>toAmount)
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
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmSearchOptionsKA");
  var viewModel = controller.getFormModel();
  var validated =true;
  if (viewModel.getViewAttributeByProperty("lbxAccountsKA","selectedKey") === "-1")
   {
     showGeneralAlert("Please select account");
     return;
   }
  if(viewModel.getViewAttributeByProperty("flxTbxAmountRangeKA","isVisible"))
  {
    validated=kony.retailBanking.util.validation.validateTextboxOrLabel(viewModel && viewModel.getViewAttributeByProperty("txtMinAmountKA","text"));
    if (validated)
     validated = kony.retailBanking.util.validation.validateTextboxOrLabel(viewModel && viewModel.getViewAttributeByProperty("txtMaxAmountKA","text"));
  }
 if(validated)
 {  validated = viewModel.getViewAttributeByProperty("lblInvalidAmntRange","isVisible");
   if (!validated)
     searchResults();
 }
}

function searchSegmentRowOnClick(){
  if(frmSearchOptionsKA["searchTransactionWrapper"] )
   frmSearchOptionsKA.remove(frmSearchOptionsKA["searchTransactionWrapper"]);
  if (!frmSearchOptionsKA.searchTransactionWrapper){
      frmSearchOptionsKA.add(frmSearchTransactionDetailsKA.searchTransactionWrapper);
      frmSearchOptionsKA.searchTransactionWrapper.left = "100%";
      frmSearchOptionsKA.searchTransactionWrapper.width = leftContainerWidth;
      
      frmSearchOptionsKA.rightWrapper.animate(
          kony.ui.createAnimation({100:
          {"left": "0%", "stepConfig":{"timingFunction": easeOut}}}),
          {fillMode: forwards, duration: duration},
          {animationEnd: function() {} });
      
      frmSearchOptionsKA.searchTransactionWrapper.animate(
          kony.ui.createAnimation({100:
          {"left": rightContainerWidth, "stepConfig":{"timingFunction": easeOut}}}),
          {fillMode: forwards, duration: duration},
          {animationEnd: function() {} });

       frmSearchOptionsKA.leftWrapper.animate(
          kony.ui.createAnimation({100:
          {"left": "-" + leftContainerWidth, "stepConfig":{"timingFunction": easeOut}}}),
          {fillMode: forwards, duration: duration},
          {animationEnd: function() {} });
    } 
}
function onCloseSearchDetails(){
  frmSearchOptionsKA.rightWrapper.animate(
          kony.ui.createAnimation({100:
          {"left": leftContainerWidth, "stepConfig":{"timingFunction": easeOut}}}),
          {fillMode: forwards, duration: duration},
          {animationEnd: function() {} });

      frmSearchOptionsKA.searchTransactionWrapper.animate(
          kony.ui.createAnimation({100:
          {"left": "100%", "stepConfig":{"timingFunction": easeOut}}}),
          {fillMode: forwards, duration: duration},
          {animationEnd: function() {
           frmSearchOptionsKA.remove(frmSearchOptionsKA.accountTransactionWrapper);
          } });
  
      frmSearchOptionsKA.leftWrapper.animate(
          kony.ui.createAnimation({100:
          {"left": "0%", "stepConfig":{"timingFunction": easeOut}}}),
          {fillMode: forwards, duration: duration},
          {animationEnd: function() {} });
}