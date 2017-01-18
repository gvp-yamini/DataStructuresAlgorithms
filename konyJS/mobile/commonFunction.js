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
  frmMyMoneyListKA.btnUncategorizedKA.right = "5dp";
  frmMyMoneyListKA.lblNumberKA.width = "20dp";
  frmMyMoneyListKA.lblNumberKA.text = badgeCountString;
}else{
   var num = badgeCountString.length;
   frmMyMoneyListKA.lblNumberKA.width = (num*10) + "dp";
   frmMyMoneyListKA.btnUncategorizedKA.right = (5 + (num*10-20)) + "dp";
   frmMyMoneyListKA.lblNumberKA.text = badgeCountString;
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
   case "Checking":return sknaccountCheckingBkg;
                   break;
   case "Savings":return sknaccountSavingsBkg;
                   break;
   case "CreditCard":return sknaccountCreditBkg;
                   break;
   case "Deposit":return sknaccountDepositBkg;
                   break; 
   case "Mortgage":return sknaccountMortageBkg;
                   break; 
 } 
}
function getSkinColor(acntType)
{
 switch (acntType){
   case "Checking":return sknCheckingKA;
                   break;
   case "Savings":return sknSavingsKA;
                   break;
   case "CreditCard":return sknCreditKA;
                   break;
   case "Deposit":return sknDepositKA;
                   break; 
   case "Mortgage":return sknMortgageKA;
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
      customErrorCallback(err);
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
        frmMyMoneyListKA.transactionSegment.widgetDataMap = { 
                transactionDate : "transactionDate",
                transactionName : "description",
                transactionAmount : "amount"
                                 };
        frmMyMoneyListKA.transactionSegment.setData(processedTransactionsData);
        frmMyMoneyListKA.transactionSegment.isVisible = true;
        frmMyMoneyListKA.LabelNoRecordsTransactnKA.isVisible = false;
        successCallback.call(scopeObj);
      }else{
        frmMyMoneyListKA.transactionSegment.isVisible = false;
        frmMyMoneyListKA.LabelNoRecordsTransactnKA.isVisible = true;
        successCallback.call(scopeObj);
      }
	}
	function dataError(err){
		kony.sdk.mvvm.log.error("Error occured while fetching the data for the PFM Bar graph entity");
	  errorCallbank.call(scopeObj);
      customErrorCallback(err);
    }
}

  function fetchAllTransactions(){
	kony.print("Perf Log: 2 graphs related data service call- start");
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
         kony.retailBanking.LAST_MONTH = i18n_lastMonthC+" "+kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(TotalCastCurr);
         kony.retailBanking.THIS_MONTH = i18n_thisMonthC+" "+ kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(TotalCashLast);
      if(kony.retailBanking.globalData.globals.GRAPH_CURRENT_MONTH_LABEL){
        var MonthArray = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        var monthNumberCurrMonth = parseInt(month2Number);
        frmAccountsLandingKA.CopyLabel0f357c1f2ae0642.text = MonthArray[monthNumberCurrMonth-1]+" "+year;
		kony.print("Perf Log: 2 graphs related data service call- End");
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
	kony.print("Perf Log: service call for monthly cash - start");
    var scopeObj = this;
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
        kony.retailBanking.globalData.globals.monthCash = parseFloat(kony.retailBanking.globalData.globals.monthCash).toFixed(2);
        kony.retailBanking.globalData.globals.monthCredit = parseFloat(kony.retailBanking.globalData.globals.monthCredit).toFixed(2);
        frmAccountsLandingKA.positiveCashFlowLabel.text="+"+kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(kony.retailBanking.globalData.globals.monthCash);
        frmAccountsLandingKA.negativeCashFlowLabel.text="-"+kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(kony.retailBanking.globalData.globals.monthCredit);
	    frmAccountsLandingKA.CopyLabel0041d3446730b49.text = kony.retailBanking.globalData.globals.currentmonth + " "+i18n_cashFlow;
        var totalAmmount = parseFloat(kony.retailBanking.globalData.globals.monthCredit) + parseFloat(kony.retailBanking.globalData.globals.monthCash);
        var incomeGraphwidth = (parseFloat(kony.retailBanking.globalData.globals.monthCash)/totalAmmount)*100;
        var spendGraphwidth = (parseFloat(kony.retailBanking.globalData.globals.monthCredit)/totalAmmount)*100;
        frmAccountsLandingKA.incomeGraph.width = incomeGraphwidth+"%";
        frmAccountsLandingKA.spendGraph.width = spendGraphwidth+"%";
		kony.print("Perf Log: service call for monthly cash - End");
    }
	function dataError(err){
		kony.sdk.mvvm.log.error("Error occured while fetching the data for the Transaction entity");
      customErrorCallback(err);
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
      customErrorCallback(err);
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
	    processedRowObj["bottomLabel"] = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(data[i]["amountSpent"]) +" "+ i18n_of+" "+ kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(data[i]["allocatedAmount"])+" "+i18n_used+" ";
        Percentagewidth = getPercentage(data[i]["amountSpent"],data[i]["allocatedAmount"]);      
	    processedRowObj["percentage"] = Percentagewidth+"%";
		}
		if(data[i]["categoryName"]){
		 processedRowObj["categoryName"] = {
          isVisible : true,
          skin : getSknlblBudgetCategory(data[i]["categoryName"]),
          text : data[i]["categoryName"],
		  width: getWidth(Percentagewidth)+"%"
        };
		processedRowObj["toFill"] = {
          isVisible : true,
          skin : getSknlblBudgetCategoryToFill(data[i]["categoryName"]),
          text : " ",
		  width : getWidth(100-Percentagewidth)+"%"
        };
		processedRowObj["Categoryimg"] = {
          isVisible : true,
          src : getImages(data[i]["categoryName"])
        };
		}
		processedSegData.push(processedRowObj);
	}
	 frmMyMoneyListKA.segBudgetKA.widgetDataMap = { 
                ImgCategoryKA : "Categoryimg",
                fullColorKA : "categoryName",
                restofColorKA : "toFill",
                lblPercentageValKA : "percentage",
				lblBelowLabelKA : "bottomLabel",
                                 };
	frmMyMoneyListKA.segBudgetKA.setData(processedSegData);
	frmMyMoneyListKA.segBudgetKA.isVisible = true;
    frmMyMoneyListKA.LabelNoBudgetRecordsKA.isVisible = false;
}else{
	frmMyMoneyListKA.segBudgetKA.isVisible = false;
    frmMyMoneyListKA.LabelNoBudgetRecordsKA.isVisible = true;
   }
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
}

function getSknlblBudgetCategory(categoryName){
	 switch (categoryName){
   case "Rent":return "sknBlueDark64A1D6";
                   break;
   case "Groceries":return "sknOrangeDarkF67C40";
                   break;
   case "Shopping":return "sknGreenDark87C36F";
                   break;
   case "Education":return "sknVioletDarkC495E6";
                   break; 
   default:return "sknVioletDarkC495E6";
                   
 }
}

function getSknlblBudgetCategoryToFill(categoryName){
	 switch (categoryName){
   case "Rent":return "sknBlueLightB1D0EA";
                   break;
   case "Groceries":return "sknOrangeLightFFC3A6";
                   break;
   case "Shopping":return "sknGreenLightADD998";
                   break;
   case "Education":return "snkVioletLightDFC8EF";
                   break; 
   default:return "snkVioletLightDFC8EF";
                   
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
    var index = frmMyMoneyListKA.transactionSegment.selectedRowIndex;
    var selectedRecord = kony.retailBanking.TransactionList[index[1]];
    frmTransactionDetailsPFMKA.transactionAmount.text = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(selectedRecord["transactionAmount"]);
    frmTransactionDetailsPFMKA.transactionName.text = selectedRecord["transactionDescription"];
    //var tempDate = kony.retailBanking.util.formatingDate.getISODateTimeKA(selectedRecord["transactionDate"], kony.retailBanking.util.BACKEND_DATE_FORMAT);
    //frmTransactionDetailsPFMKA.transactionDate.text = (tempDate instanceof Date)? tempDate.format('F d, Y') : "";
    frmTransactionDetailsPFMKA.transactionDate.text = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(selectedRecord["transactionDate"]);
    frmTransactionDetailsPFMKA.transactionFrom.text = selectedRecord["fromAccountName"];
    frmTransactionDetailsPFMKA.transactionNotes.text = selectedRecord["transactionNotes"];
    frmTransactionDetailsPFMKA.show();
}

function EncryptValue(inputValue){
  var key = kony.sdk.mvvm.generateAndSaveKey("RetailBanking");
  kony.store.setItem("generatedKey",key);
//  var val = inputValue;
 return kony.convertToBase64(kony.sdk.mvvm.encryptData(key,inputValue));
}

function DecryptValue(outputValue){
  if(outputValue!== null)
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
	 frmMyMoneyListKA.segLegendKA.widgetDataMap = { 
                CategoryName : "categoryName",
                lblBoxKA : "toFill",
                                 };
	    frmMyMoneyListKA.segLegendKA.setData(processedSegData);
		frmMyMoneyListKA.segLegendKA.isVisible = true;
	}else{
		frmMyMoneyListKA.segLegendKA.isVisible = false;
	}
}
