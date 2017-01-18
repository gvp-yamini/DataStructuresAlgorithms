function navigateToUncategoriseTransactionDetails(){
     var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
     var controller = INSTANCE.getFormController("frmTransactionDetailKA");
     var Listcontroller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
     var viewModel = Listcontroller.getFormModel();  
     var selRecord = viewModel.getViewAttributeByProperty("segSpendingKA", "selectedItems")[0];
     var datamodel = new kony.sdk.mvvm.DataModel;
     var navigationObject = new kony.sdk.mvvm.NavigationObject();
    navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
    navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"transactionId": selRecord["transactionId"]}});
    controller.loadDataAndShowForm(navigationObject);
}//Type your code here
function navigateToUncategoriseTransactionListKAfromMyMoney(){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmUncategorizedTransactionsKA");
  var datamodel = new kony.sdk.mvvm.DataModel;
  var navigationObject = new kony.sdk.mvvm.NavigationObject();
  navigationObject.setRequestOptions("segSpendingKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"categoryId":kony.retailBanking.globalData.globals.UNCATEGORISED_CATEGORYID}});
  controller.loadDataAndShowForm(navigationObject);
}
function navigateToUncategorisedList(){
  loadAndShowPFMAccountListKA();
}

function settingSwitchAndRadioButtons(isAnalyzed,isMappedToMerchant){
  if (userAgent == "iPhone" || userAgent ==="iPad"){
    if(isAnalyzed != "false"){
      settingIsAnalyzedTrueIOS();
    }else{
      settingIsAnalyzedFalseIOS();
    }
    if(isMappedToMerchant != "false"){
      settingisMappedToMerchantTrueIOS();
    }else{
      settingisMappedToMerchantFalseIOS();
    }
  }else{
    if(isAnalyzed != "false"){
      settingIsAnalyzedTrueAndroid();
    }else{
      settingIsAnalyzedFalseAndroid();
    }
    if(isMappedToMerchant != "false"){
      settingisMappedToMerchantTrueAndroid();
    }else{
      settingisMappedToMerchantFalseAndroid();
    }
  }
}

function settingIsAnalyzedTrueIOS(){
  frmTransactionDetailKA.accountPreviewEnableSwitch.selectedIndex = 1;
}

function settingIsAnalyzedFalseIOS(){
  frmTransactionDetailKA.accountPreviewEnableSwitch.selectedIndex = 0;
}

function settingisMappedToMerchantTrueIOS(){
  frmTransactionDetailKA.CopyaccountPreviewEnableSwitch0b4fab801c08546.selectedIndex = 1;
}

function settingisMappedToMerchantFalseIOS(){
  frmTransactionDetailKA.CopyaccountPreviewEnableSwitch0b4fab801c08546.selectedIndex = 0;
}
function settingIsAnalyzedTrueAndroid(){
  frmTransactionDetailKA.CheckBoxGroup0aebf676b3db246.selectedKey = true;
}

function settingIsAnalyzedFalseAndroid(){
  frmTransactionDetailKA.CheckBoxGroup0aebf676b3db246.selectedKey = null;
}

function settingisMappedToMerchantTrueAndroid(){
  frmTransactionDetailKA.CopyCheckBoxGroup0d9fa019582e647.selectedKey = true;
}

function settingisMappedToMerchantFalseAndroid(){
  frmTransactionDetailKA.CopyCheckBoxGroup0d9fa019582e647.selectedKey = null;
}

function fetchCategoryList(){
   var scopeObj = this;
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var options ={
                    "access": "online",
                    "objectName": "RBObjects"
                 };
    var headers = {"session_token":kony.retailBanking.globalData.session_token};
    var serviceName = "RBObjects";
	var modelObj = INSTANCE.getModel("PFMCategory",serviceName,options);
    var dataObject = new kony.sdk.dto.DataObject("PFMCategory");
	var serviceOptions = {"dataObject":dataObject, "headers":headers};
    modelObj.fetch(serviceOptions, dataSuccess, dataError);
	
	function dataSuccess(response){ 
      kony.retailBanking.globalData.globals.CATEGORY_LIST = {};
      var categoryList = [];
	  for(var i=0;i<response.length;i++){
            var temp = {};
			temp["categoryName"] = response[i]["categoryName"];
			temp["categoryId"] = response[i]["categoryId"];
            categoryList.push(temp);
        if(response[i]["categoryName"]==kony.retailBanking.globalData.globals.UNCATEGORISED){
           kony.retailBanking.globalData.globals.UNCATEGORISED_CATEGORYID = response[i]["categoryId"];
           }
      }
      kony.retailBanking.globalData.globals.CATEGORY_LIST = categoryList;
      fetchUncategorisedTransactions();
    }
	function dataError(err){
		kony.sdk.mvvm.log.error("Error occured while fetching the data for the PFM Category entity");
      customErrorCallback(err);
    }
}

function settingUncategorisedTransactionsListInDetails(){
      var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
	  var controller = INSTANCE.getFormController("frmUncategorizedTransactionsKA");
      var controllerContextData = controller.getContextData();
      if( controllerContextData && controllerContextData.getCustomInfo("segSpendingKA")){
          var data = controllerContextData.getCustomInfo("segSpendingKA");
          var processedSegData = [ ];
          var processedRowObj;
       if(data && data.length>0)
    {
	    processedRowObj = {};
        for(var i in data){
        processedRowObj = {};
        processedRowObj["transactionDescription"] = kony.retailBanking.util.validation.trucateTo(data[i]["transactionDescription"],35,32,"...");
        processedRowObj["transactionAmount"] = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(data[i]["transactionAmount"]);
		processedRowObj["transactionDate"] = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(data[i]["transactionDate"]);
        processedRowObj["transactionId"] = data[i]["transactionId"];
        processedRowObj["chevron"] = {
          isVisible : true,
          src : "right_chevron_icon.png"
        };
        processedSegData.push(processedRowObj);
        }
     frmTransactionDetailKA.countUncategorisedKA.text = "("+data.length+")";
	 frmTransactionDetailKA.segSpendingKA.widgetDataMap = { 
                transactionName: "transactionDescription",
                transactionAmount : "transactionAmount",
                transactionDate : "transactionDate",
				lblSepKA : "transactionId",
                chevron : "chevron"
                                 };
	frmTransactionDetailKA.segSpendingKA.setData(processedSegData);
	frmTransactionDetailKA.segSpendingKA.isVisible = true;
}else{
	frmTransactionDetailKA.segSpendingKA.isVisible = false;
    frmTransactionDetailKA.countUncategorisedKA.text = "(0)";
   }
        }
}

function fetchUncategorisedTransactions(){
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
	var serviceOptions = {"dataObject":dataObject, "headers":headers,"queryParams" : {"categoryId":kony.retailBanking.globalData.globals.UNCATEGORISED_CATEGORYID}};
    modelObj.fetch(serviceOptions, dataSuccess, dataError);
	
	function dataSuccess(response){ 
      UncategorisedtransactionListformatting(response);
	}
	
	function dataError(err){
		kony.sdk.mvvm.log.error("Error occured while fetching the data for the PFM Bar graph entity");
	  errorCallbank.call(scopeObj);
      customErrorCallback(err);
    }
}

function getRecordDataToUncategorisedDetails(response){
  frmUncategorizedTransactionsKA.transactionAmount.text = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(response["transactionAmount"]); 
  frmUncategorizedTransactionsKA.UnFormattransactionAmount.text = response["transactionAmount"];
  frmUncategorizedTransactionsKA.transactionDate.text = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(response["transactionDate"]);
  frmUncategorizedTransactionsKA.UnformattedtransactionDate.text = response["transactionDate"];
  frmUncategorizedTransactionsKA.transactionName.text = response["transactionDescription"];
  frmUncategorizedTransactionsKA.transactionFrom.text = response["fromAccountName"];
  frmUncategorizedTransactionsKA.lblTransactionDateValueKA.text = response["transactionNotes"];
                var masterData = [];
                var masterDataElement = [];
                masterDataElement.push(kony.retailBanking.globalData.globals.UNCATEGORISED_CATEGORYID);
                var toAppend = "Select a Category";
                masterDataElement.push(toAppend);//TODO: i18n
	            masterData.push(masterDataElement);
                var response = kony.retailBanking.globalData.globals.CATEGORY_LIST;
                for (var i = 0; i < response.length; i++) 
                {
                            masterDataElement = [];
                            var key = response[i]["categoryId"];
                            var value = response[i]["categoryName"];
                            if(key !=kony.retailBanking.globalData.globals.UNCATEGORISED_CATEGORYID){                            
                            masterDataElement.push(key);
                            masterDataElement.push(value);
                            masterData.push(masterDataElement);
                            }
                }
           frmUncategorizedTransactionsKA.ListBox001b478bb90954f.masterData = masterData;
           var isAnalyzed = response["isAnalyzed"];
           var isMappedToMerchant = response["isMappedToMerchant"];
           settingSwitchAndRadioButtons(isAnalyzed,isMappedToMerchant);
}

function UncategorisedtransactionList(Data,segmentName){
    var data = Data[segmentName][segmentName].getData();
        var processedSegData = [ ];
        var processedRowObj;
       if(data && data.length>0)
    {
	    processedRowObj = {};
        for(var i in data){
        processedRowObj = {};
        processedRowObj["transactionDescription"] = kony.retailBanking.util.validation.trucateTo(data[i]["transactionDescription"],35,32,"...");
        processedRowObj["transactionAmount"] = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(data[i]["transactionAmount"]);
		processedRowObj["transactionDate"] = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(data[i]["transactionDate"]);
        processedRowObj["transactionId"] = data[i]["transactionId"];
        processedRowObj["fromAccountName"] = data[i]["fromAccountName"];
        processedRowObj["fromAccountNumber"] = data[i]["fromAccountNumber"];
        processedRowObj["isAnalyzed"] = data[i]["isAnalyzed"];
        processedRowObj["isMappedToMerchant"] = data[i]["isMappedToMerchant"];
        processedRowObj["transactionNotes"] = data[i]["transactionNotes"];
        processedRowObj["categoryId"] = data[i]["categoryId"];
        processedRowObj["categoryName"] = data[i]["categoryName"];
        processedRowObj["chevron"] = {
          isVisible : true,
          src : "right_chevron_icon.png"
        };
        processedSegData.push(processedRowObj);
        }
    }
      Data[segmentName][segmentName].setData(processedSegData);
      return Data;
}

function UncategorisedtransactionListformatting(response){
        var data = response;
        var processedSegData = [ ];
        var processedRowObj;
        var count = data.length;
       if(data && data.length>0)
    {
	    processedRowObj = {};
        for(var i in data){
        processedRowObj = {};
        processedRowObj["transactionDescription"] = kony.retailBanking.util.validation.trucateTo(data[i]["transactionDescription"],35,32,"...");
        processedRowObj["transactionAmount"] = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(data[i]["transactionAmount"]);
		processedRowObj["transactionDate"] = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(data[i]["transactionDate"]);
        processedRowObj["transactionId"] = data[i]["transactionId"];
        processedRowObj["chevron"] = {
          isVisible : true,
          src : "right_chevron_icon.png"
        };
        processedSegData.push(processedRowObj);
        }
	 frmFMMAccountListKA.segUncategorisedKA.widgetDataMap = { 
                transactionName: "transactionDescription",
                transactionAmount : "transactionAmount",
                transactionDate : "transactionDate",
				lblSepKA : "transactionId",
                chevron : "chevron"
                                 };
	frmFMMAccountListKA.segUncategorisedKA.setData(processedSegData);
	frmFMMAccountListKA.segUncategorisedKA.isVisible = true;
    frmFMMAccountListKA.LabelNoUnTransRecordsKA.isVisible = false;
    frmFMMAccountListKA.countUncategorisedKA.text = "("+count+")"
}else{
	frmFMMAccountListKA.segUncategorisedKA.isVisible = false;
    frmFMMAccountListKA.LabelNoUnTransRecordsKA.isVisible = true;
    frmFMMAccountListKA.countUncategorisedKA.text = "(0)";
   }
  frmFMMAccountListKA.show();
}