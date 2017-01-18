function gobackFormUncatTrans(){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController("frmUncategorizedTransactionsKA");
  listController.performAction("showPreviousForm",[true,"frmMyMoneyListKA"]);
}
function getUncategorisedTransactionCount(successCallBack,errorCallback){
   var scopeObj = this;
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var options ={
                    "access": "online",
                    "objectName": "RBObjects"
                 };
    var headers = {"session_token":kony.retailBanking.globalData.session_token};
    var serviceName = "RBObjects";
	var modelObj = INSTANCE.getModel("PFMTransactions",serviceName,options);
    var dataObject = new kony.sdk.dto.DataObject("PFMTransactions");
	var serviceOptions = {"dataObject":dataObject, "headers":headers,"queryParams" : {"getUncategorisedCount": "a"}};
    modelObj.fetch(serviceOptions, dataSuccess, dataError);
    function dataSuccess(response){
      kony.retailBanking.globalData.globals.UNCATEGORISED_COUNT = response[0]["success"];
      successCallBack.call(scopeObj);
  }
    function dataError(err){
	  kony.sdk.mvvm.log.error("Error occured while fetching the data for the PFM Bar graph entity");
      customErrorCallback(err);
      errorCallback.call(scopeObj);
	}
}

function BadgeUI(){
  var number = kony.retailBanking.globalData.globals.UNCATEGORISED_COUNT;
  var badgeCountString = parseFloat(number).toFixed(0) + "";
if(badgeCountString.length<3){
  frmMyMoneyKA.btnUncategorizedTransactionsKA.right = "20dp";
  frmMyMoneyKA.lblNumberKA.width = "26dp";
  frmMyMoneyKA.lblNumberKA.text = badgeCountString;
}else{
   var num = badgeCountString.length;
   frmMyMoneyKA.lblNumberKA.width = (num*10) + "dp";
   frmMyMoneyKA.btnUncategorizedTransactionsKA.right = (20 + (num*10-20)) + "dp";
   frmMyMoneyKA.lblNumberKA.text = badgeCountString;
}
}

function getDateFromdateObj(dateObj)
{
   var year = dateObj[2];
   var month = dateObj[1].toString();
   var day = dateObj[0].toString();
   if(month.length == 1){
    month = "0"+month;
   }
  if(day.length == 1){
    day = "0"+day;
  }
  var dateString = year+"-"+month+"-"+day;
  return dateString;
}
function getSkinColorForBg(acntType)
{
 switch (acntType){
   case "Checking":return accountCheckingBkg; //checkingColor;
                   break;
   case "Savings":return accountSavingsBkg;//savingsColor;
                   break;
   case "CreditCard":return accountCreditBkg ;//creditColor;
                   break;
   case "Deposit":return accountDepositBkg;//deposit;
                   break; 
   case "Mortgage":return accountMortageBkg;//mortage;
                   break; 
 } 
}
function getSkinColor(acntType)
{
 switch (acntType){
   case "Checking":return accountTypeChecking;
                   break;
   case "Savings":return accountTypeSavings;
                   break;
   case "CreditCard":return accountTypeCredit;
                   break;
   case "Deposit":return accountTypeCurrent;
                   break; 
   case "Mortgage":return accountTypeMortage;
                   break; 
 } 
}

function getSkinColorBackGround(acntType)
{
 switch (acntType){
   case "Checking":return checkingColor;
                   break;
   case "Savings":return savingsColor;
                   break;
   case "CreditCard":return creditColor;
                   break;
   case "Deposit":return deposit;
                   break; 
   case "Mortgage":return mortage;
                   break; 
 } 
}
function getSknlblAmount(acntType){
  if(acntType == "CreditCard")
   return  "sknaccountAmountNegative";
  else 
    return "sknaccountAmount";
}
function getSknlblAmountCredit(acntType){
  if(acntType == "CreditCard")
   return  "sknaccountAmount";
  else 
    return "sknaccountAmount";
}

function fetchBargraphData(){
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var options ={
                    "access": "online",
                    "objectName": "RBObjects"
                 };
    var headers = {"session_token":kony.retailBanking.globalData.session_token};
    var serviceName = "RBObjects";
	var modelObj = INSTANCE.getModel("PFMBarGraph",serviceName,options);
    var dataObject = new kony.sdk.dto.DataObject("PFMBarGraph");
	var serviceOptions = {"dataObject":dataObject, "headers":headers};
    modelObj.fetch(serviceOptions, dataSuccess, dataError);
	
		function dataSuccess(response){
		kony.retailBanking.barGraphRecordsList = response;
        kony.retailBanking.barGraphMonthNamesList = [];
        kony.retailBanking.barGraphFullMonthNamesList = [];
        kony.retailBanking.barGraphtotalCashMonth = [];
        kony.retailBanking.barGraphMonthIdList = [];
        kony.retailBanking.columnMajorIntervals = null;
        var mimimumValue = 0;
        var maximumValue = 0;
		 for(var i=0;i<response.length;i++){
           if(i==0){
             mimimumValue = parseFloat(response[i].totalCashFlow);
             maximumValue = parseFloat(response[i].totalCashFlow);
           }else{
               if(mimimumValue>parseFloat(response[i].totalCashFlow)) {
                 mimimumValue = parseFloat(response[i].totalCashFlow);
               }
               if(maximumValue<parseFloat(response[i].totalCashFlow)){
                 maximumValue = parseFloat(response[i].totalCashFlow);
               }
             }
          kony.retailBanking.barGraphFullMonthNamesList.push(response[i].monthName);
          kony.retailBanking.barGraphMonthNamesList.push(response[i].monthName.substr(0,3));
		  kony.retailBanking.barGraphtotalCashMonth.push(parseFloat(response[i].totalCashFlow));
		  kony.retailBanking.barGraphMonthIdList.push(response[i].monthId);
         }
       if(mimimumValue){
         kony.retailBanking.columnMajorIntervals = (maximumValue-mimimumValue)/mimimumValue;
       }else{
         kony.retailBanking.columnMajorIntervals = 0;
       }
      kony.retailBanking.minimumValue = mimimumValue/2;
      kony.retailBanking.maxValue = maximumValue+kony.retailBanking.minimumValue;
	}
  
	function dataError(err){
		kony.sdk.mvvm.log.error("Error occured while fetching the data for the PFM Bar graph entity");
	}
}
function fetchPieChartData(MonthId,successCallback,errorCallbank){
    var scopeObj = this;
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var options ={
                    "access": "online",
                    "objectName": "RBObjects"
                 };
    var headers = {"session_token":kony.retailBanking.globalData.session_token};
    var serviceName = "RBObjects";
	var modelObj = INSTANCE.getModel("PFMPieChart",serviceName,options);
    var dataObject = new kony.sdk.dto.DataObject("PFMPieChart");
	var serviceOptions = {"dataObject":dataObject, "headers":headers,"queryParams" : {"monthId": MonthId}};
    modelObj.fetch(serviceOptions, dataSuccess, dataError);
	
	function dataSuccess(response){ 
      kony.retailBanking.MonthDetailsCashFlowPieChart = [];
      kony.retailBanking.CategoryNameList = [];
      kony.retailBanking.CategoryIdList = [];
      for(var i=0;i<response.length;i++){
          kony.retailBanking.MonthDetailsCashFlowPieChart.push(parseFloat(response[i].cashSpent));
          kony.retailBanking.CategoryNameList.push(response[i].categoryName);
          kony.retailBanking.CategoryIdList.push(response[i].cateforyId);
         }
      successCallback.call(scopeObj);
	}
	function dataError(err){
		kony.sdk.mvvm.log.error("Error occured while fetching the data for the PFM Bar graph entity");
	  errorCallbank.call(scopeObj);
      customErrorCallback(err);
    }
}

function fetchMyModuleTransactionList(MonthId,CategoryId,successCallback,errorCallbank){
   var scopeObj = this;
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var options ={
                    "access": "online",
                    "objectName": "RBObjects"
                 };
    var headers = {"session_token":kony.retailBanking.globalData.session_token};
    var serviceName = "RBObjects";
	var modelObj = INSTANCE.getModel("PFMTransactions",serviceName,options);
    var dataObject = new kony.sdk.dto.DataObject("PFMTransactions");
	var serviceOptions = {"dataObject":dataObject, "headers":headers,"queryParams" : {"monthId":MonthId,"categoryId": CategoryId}};
    modelObj.fetch(serviceOptions, dataSuccess, dataError);
	
	function dataSuccess(response){ 
      kony.retailBanking.TransactionList = response;
      var processedTransactionsData = [ ];
      var processedRowObj;
      for(var i in response){
        processedRowObj = {};
        processedRowObj["description"] = kony.retailBanking.util.validation.trucateTo(response[i]["transactionDescription"],35,32,"...");
        processedRowObj["amount"] = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(response[i]["transactionAmount"]);
        processedRowObj["transactionDate"] = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(response[i]["transactionDate"]);
        processedTransactionsData.push(processedRowObj); 
      }
      if(processedTransactionsData.length >0){
        frmMyMoneyKA.segShoppingSpendingsKA.widgetDataMap = { 
                transactionDate : "transactionDate",
                transactionName : "description",
                transactionAmount : "amount"
                                 };
        frmMyMoneyKA.segShoppingSpendingsKA.setData(processedTransactionsData);
        frmMyMoneyKA.segShoppingSpendingsKA.isVisible = true;
        successCallback.call(scopeObj);
      }
	}
	function dataError(err){
		kony.sdk.mvvm.log.error("Error occured while fetching the data for the PFM Bar graph entity");
	  errorCallbank.call(scopeObj);
    }
}
  function fetchAllTransactions(){
    var scopeObj = this;
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var options ={
                    "access": "online",
                    "objectName": "RBObjects"
                 };
    var headers = {"session_token":kony.retailBanking.globalData.session_token};
    var serviceName = "RBObjects";
  var modelObj = INSTANCE.getModel("ChartTransactions",serviceName,options);
    var dataObject = new kony.sdk.dto.DataObject("ChartTransactions");
  var serviceOptions = {"dataObject":dataObject, "headers":headers};
    modelObj.fetch(serviceOptions, dataSuccess, dataError);
  
  function dataSuccess(response){
        var flag1 = 1;
        var flag2 = 1;
        var mainArray1=[];
        var mainArray2=[];
        var month1Number = "";
        var month2Number = "";
        var date = "";
        var month = "";
        var year = "";
        for(var i=0;i<response.length;i++){
          var finalVal = "";
          finalVal = getDateObject(response[i].transDate, kony.retailBanking.util.BACKEND_DATE_FORMAT);
      date = finalVal.day;
          month = finalVal.month;
          if(month1Number === "" && month2Number===""){
            month1Number = month;
          }
          if(month1Number !== "" && month2Number==="" && parseInt(month1Number) != parseInt(month)){
            month2Number = month;
            kony.retailBanking.globalData.globals.GRAPH_CURRENT_MONTH_LABEL = month2Number;
            year = finalVal.year;
          }
          flag1=1;
          flag2=1;
          for(var j=0;j<mainArray1.length;j++){
            if(mainArray1[j].date == date){
              mainArray1[j].closingBalance = response[i].closingBalanceAmount;
              flag1=0;
            }
          }
          for(var j=0;j<mainArray2.length;j++){
            if(mainArray2[j].date == date){
              mainArray2[j].closingBalance = response[i].closingBalanceAmount;
              flag2=0;
            }
          }
          if(flag1){
          if(parseInt(month) == parseInt(month1Number)){
          mainArray1.push({
            "date" : date,
            "closingBalance" : response[i].closingBalanceAmount
          });
          }
          }
           if(flag2){
            if(parseInt(month)== parseInt(month2Number)){
            mainArray2.push({
            "date" : date,
            "closingBalance" : response[i].closingBalanceAmount
          });
          }
           } 
        }
       kony.retailBanking.DatesOfMonth = [];
       kony.retailBanking.closingValuesOfDate1 = [];
       kony.retailBanking.closingValuesOfDate2 = [];
       var TotalCashLast = 0;
       var TotalCastCurr = 0;
       for(var i=0;i<mainArray1.length;i++){
         kony.retailBanking.DatesOfMonth.push(mainArray1[i].date);
         TotalCashLast = TotalCashLast + parseInt(mainArray1[i].closingBalance);
         TotalCastCurr = TotalCastCurr + parseInt(mainArray2[i].closingBalance);
         kony.retailBanking.closingValuesOfDate1.push(parseInt(mainArray1[i].closingBalance));
         kony.retailBanking.closingValuesOfDate2.push(parseInt(mainArray2[i].closingBalance));
       }
         kony.retailBanking.LAST_MONTH = i18n_lastMonth+" "+kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(TotalCastCurr);
         kony.retailBanking.THIS_MONTH = i18n_thisMonth+" " + kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(TotalCashLast);
       //  frmAccountsLandingKA.lblLastMonthKA.text = kony.retailBanking.LAST_MONTH;
         //frmAccountsLandingKA.lblThismonthKA.text = kony.retailBanking.THIS_MONTH;
	  if(kony.retailBanking.globalData.globals.GRAPH_CURRENT_MONTH_LABEL){
        var MonthArray = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        var monthNumberCurrMonth = parseInt(month2Number);
        //accountsLanding.CopyLabel0f357c1f2ae0642.text = MonthArray[monthNumberCurrMonth-1]+" "+year;
        accountsLanding.CopyLabel0f357c1f2ae0642.isVisible = false;
		var AreaChart = createChartWidget();
            accountsLanding.insightsGraph1.add(AreaChart);
            var lineChart = line_createChartWidget();
            accountsLanding.insightsGraph2.add(lineChart);
      }
  }
  function dataError(err){
    kony.sdk.mvvm.log.error("Error occured while fetching the data for the Transaction entity");
      errorCallbank.call(scopeObj)
      customErrorCallback(err);
  }
  }
function getDateObject(newDate, format){
    if (newDate && format) {
      var formattype = format.toUpperCase();
          var yyyyIndex = formattype.indexOf("YYYY");
          var mmIndex = formattype.indexOf("MM");
          var ddIndex = formattype.indexOf("DD");
      if (yyyyIndex > -1 && mmIndex > -1 && ddIndex > -1) {
                var newdd = parseFloat(newDate.substr(ddIndex, 2));
                if(newdd<10){
                  newdd = "0"+newdd;
                }else{
                  newdd = ""+newdd;
                }
                var newmm = parseFloat(newDate.substr(mmIndex, 2));
                if(newmm<10){
                  newmm = "0"+newmm;
                }else{
                  newmm = ""+newmm;
                }
        var newyyyy = parseFloat(newDate.substr(yyyyIndex, 4));
                newyyyy = ""+newyyyy;
    }
    }
    return {
      "month" : newmm,
      "day" : newdd,
      "year" : newyyyy
    }
  }

 function fetchcashFlowData(){
	var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var options ={
                    "access": "online",
                    "objectName": "RBObjects"
                 };
   var headers = {"session_token":kony.retailBanking.globalData.session_token};
    var serviceName = "RBObjects";
	var modelObj = INSTANCE.getModel("AccountCashFlow",serviceName,options);
    var dataObject = new kony.sdk.dto.DataObject("AccountCashFlow");
	var serviceOptions = {"dataObject":dataObject, "headers":headers};
    modelObj.fetch(serviceOptions, dataSuccess, dataError);
	
	function dataSuccess(response){
        kony.retailBanking.globalData.globals.monthCredit= response[0]["monthCredit"];
        kony.retailBanking.globalData.globals.currentmonth= response[0]["month"];
        kony.retailBanking.globalData.globals.monthCash= response[0]["monthCash"];
        accountsLanding.positiveCashFlowLabel.text="+"+kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(kony.retailBanking.globalData.globals.monthCash);
        accountsLanding.negativeCashFlowLabel.text="-"+kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(kony.retailBanking.globalData.globals.monthCredit);
	    accountsLanding.CopyLabel0041d3446730b49.text = kony.retailBanking.globalData.globals.currentmonth + " "+i18n_cashFlow;
        var totalAmmount = parseFloat(kony.retailBanking.globalData.globals.monthCredit) + parseFloat(kony.retailBanking.globalData.globals.monthCash);
        var incomeGraphwidth = (parseFloat(kony.retailBanking.globalData.globals.monthCash)/totalAmmount)*100;
        var spendGraphwidth = (parseFloat(kony.retailBanking.globalData.globals.monthCredit)/totalAmmount)*100;
        accountsLanding.incomeGraph.width = incomeGraphwidth+"%";
        accountsLanding.spendGraph.width = spendGraphwidth+"%";
    }
	function dataError(err){
		kony.sdk.mvvm.log.error("Error occured while fetching the data for the Transaction entity");
	}
  }

 function fetchBudgetData(){
    var scopeObj = this;
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var options ={
                    "access": "online",
                    "objectName": "RBObjects"
                 };
    var headers = {"session_token":kony.retailBanking.globalData.session_token};
    var serviceName = "RBObjects";
	var modelObj = INSTANCE.getModel("PFMBudgetGraph",serviceName,options);
    var dataObject = new kony.sdk.dto.DataObject("PFMBudgetGraph");
	var serviceOptions = {"dataObject":dataObject, "headers":headers};
    modelObj.fetch(serviceOptions, dataSuccess, dataError);
	
	function dataSuccess(response){
      formatBudgetSegmentData(response);
    }
	function dataError(err){
		kony.sdk.mvvm.log.error("Error occured while fetching the data for the PFMBudgetGraph entity");
	}
  }

function formatBudgetSegmentData(data){
   if(data && data.length>0)
    {
	  var processedSegData = [ ];
      var processedRowObj,Percentagewidth="";
      for(var i in data){
        processedRowObj = {};
        if(data[i]["allocatedAmount"] && data[i]["amountSpent"]){
        processedRowObj["bottomLabel"] = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(data[i]["amountSpent"]) +" of "+ kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(data[i]["allocatedAmount"])+" used";
        Percentagewidth = getPercentage(data[i]["amountSpent"],data[i]["allocatedAmount"]);      
	    processedRowObj["percentage"] = Percentagewidth+"%";
		}
		if(data[i]["categoryName"]){
		 processedRowObj["categoryName"] = {
          "isVisible": true,
          skin :getSknlblBudgetCategory(data[i]["categoryName"]),
          text: data[i]["categoryName"],
		  width: getWidth(Percentagewidth)+"%"
        };
		processedRowObj["toFill"] = {
          "isVisible": true,
          skin :getSknlblBudgetCategoryToFill(data[i]["categoryName"]),
          text: " ",
		  width: getWidth(100-Percentagewidth)+"%"
        };
		processedRowObj["Categoryimg"] = {
          "isVisible": true,
          src :getImages(data[i]["categoryName"])
        };
		}
		processedSegData.push(processedRowObj);
	}
	 frmMyMoneyKA.segBudgetKA.widgetDataMap = { 
                ImgCategoryKA : "Categoryimg",
                fullColorKA : "categoryName",
                restofColorKA : "toFill",
                lblPercentageValKA : "percentage",
				lblBelowLabelKA : "bottomLabel",
                                 };
	frmMyMoneyKA.segBudgetKA.setData(processedSegData);
	frmMyMoneyKA.segBudgetKA.isVisible = true;
    frmMyMoneyKA.LabelNoBudgetRecordsKA.isVisible = false;
}else{
	frmMyMoneyKA.segBudgetKA.isVisible = false;
    frmMyMoneyKA.LabelNoBudgetRecordsKA.isVisible = true;
   }
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
}

function getSknlblBudgetCategory(categoryName){
	 switch (categoryName){
   case "Rent":return sknBlueDark64A1D6;
                   break;
   case "Groceries":return sknOrangeDarkF67C40;
                   break;
   case "Shopping":return sknGreenDark87C36F;
                   break;
   case "Education":return sknVioletDarkC495E6;
                   break; 
   default:return sknVioletDarkC495E6;
                   
 }
}

function getSknlblBudgetCategoryToFill(categoryName){
	 switch (categoryName){
   case "Rent":return sknBlueLightB1D0EA;
                   break;
   case "Groceries":return sknOrangeLightFFC3A6;
                   break;
   case "Shopping":return sknGreenLightADD998;
                   break;
   case "Education":return snkVioletLightDFC8EF;
                   break; 
   default:return snkVioletLightDFC8EF;
                   
 }
}

function getImages(categoryName){
	 switch (categoryName){
   case "Rent":return "budget_furnish.png";
                   break;
   case "Groceries":return "budget_painting.png";
                   break;
   case "Shopping":return "budget_office.png";
                   break;
   case "Education":return "budget_printer.png";
                   break; 
   default:return "budget_printer.png";
                   
 }
}

function getPercentage(amountSpent,amountAllocated){
	return (amountSpent/amountAllocated)*100;
}
function getWidth(value){
	return (65*value)/100;
}

function navigateToTransactionDetailsPFM(){
    var index = frmMyMoneyKA.segShoppingSpendingsKA.selectedRowIndex;
    var selectedRecord = kony.retailBanking.TransactionList[index[1]];
    frmMyMoneyKA.lblTransactionAmountKA.text = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(selectedRecord["transactionAmount"]);
    frmMyMoneyKA.lblTransactionNameKA.text = selectedRecord["transactionDescription"];
    frmMyMoneyKA.lblTransactionDateKA.text = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(selectedRecord["transactionDate"]);
    frmMyMoneyKA.lblTransactionFromKA.text = selectedRecord["fromAccountName"];
    frmMyMoneyKA.lblTransactionNotesKA.text = selectedRecord["transactionNotes"];
    frmMyMoneyKA.lblShoppingKA.skin = sknMonthlySpending3278E6KA;
    frmMyMoneyKA.lblTransactionDetailsKA.isVisible = true;
    frmMyMoneyKA.flxShoppingKA.isVisible = false;
    frmMyMoneyKA.flxTransactionDetailsKA.isVisible = true;
}

function EncryptValue(inputValue){
  var key = kony.sdk.mvvm.generateAndSaveKey("RetailBanking");
  kony.store.setItem("generatedKey",key);
//  var val = inputValue;
 return kony.convertToBase64(kony.sdk.mvvm.encryptData(key,inputValue));
}

function DecryptValue(outputValue){
  if (outputValue !== null)
  		return kony.sdk.mvvm.decryptData(kony.store.getItem("generatedKey"),kony.convertToRawBytes(outputValue));
}

function populateSegLegend(){
	var arr = kony.retailBanking.CategoryNameList;
	if(arr.length>0){
	  var processedSegData = [ ];
      var processedRowObj;
      for(var i in arr){
        processedRowObj = {};
         processedRowObj["categoryName"] = {
				isVisible : true,
				text : arr[i]
			};
		if(arr[i] == "Rent"){
			processedRowObj["toFill"] = {
            isVisible : true,
            skin : "sknpieFF4019FFKA",
            text : " "
          };
        }else if(arr[i]=="Groceries"){
			processedRowObj["toFill"] = {
            isVisible : true,
            skin : "sknpie999999FFKA",
            text : " "
          };
      }else if(arr[i]=="Shopping"){
			processedRowObj["toFill"] = {
            isVisible : true,
            skin : "sknpie64A1D6FFKA",
            text : " "
          };
      }else if(arr[i]=="Education"){
			processedRowObj["toFill"] = {
            isVisible : true,
            skin : "sknpieFEC545FFKA",
            text : " "
          };
      }else if(arr[i]=="Fun"){
			processedRowObj["toFill"] = {
            isVisible : true,
            skin : "sknpieAB79CFFFKA",
            text : " "
          };
      }else if(arr[i]=="Medical"){
			processedRowObj["toFill"] = {
            isVisible : true,
            skin : "sknpie5FB336FFKA",
            text : " "
          };
      }else if(arr[i]=="Travel"){
			processedRowObj["toFill"] = {
            isVisible : true,
            skin : "sknpie3D6DCCFFKA",
            text : " "
          };
      }else{
			processedRowObj["toFill"] = {
            isVisible : true,
            skin : "sknpieD6B9EAFFKA",
            text : " "
          };
      }	
		processedSegData.push(processedRowObj);
	}
	 frmMyMoneyKA.segLegendKA.widgetDataMap = { 
                CategoryName : "categoryName",
                lblBoxKA : "toFill",
                                 };
	    frmMyMoneyKA.segLegendKA.setData(processedSegData);
		frmMyMoneyKA.segLegendKA.isVisible = true;
	}else{
		frmMyMoneyKA.segLegendKA.isVisible = false;
	}
}
function onDeviceBackAndroid(){
  kony.print("On Device back");
}