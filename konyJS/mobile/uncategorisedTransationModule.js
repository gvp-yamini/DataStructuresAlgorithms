function navigateToUncategoriseTransactionDetails(){
      var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
      var controller = INSTANCE.getFormController("frmTransactionDetailKA");
      var Listcontroller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
      var viewModel = Listcontroller.getFormModel();	 
     var selRecord = viewModel.getViewAttributeByProperty("transactionSegment", "selectedItems")[0];
     var datamodel = new kony.sdk.mvvm.DataModel;
     var navigationObject = new kony.sdk.mvvm.NavigationObject();
    navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
    navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"transactionId": selRecord["transactionId"]}});
    controller.loadDataAndShowForm(navigationObject);
}//Type your code here
function navigateToUncategorisedList(){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmUncategorizedTransactionsKA");
   var datamodel = new kony.sdk.mvvm.DataModel;
 var navigationObject = new kony.sdk.mvvm.NavigationObject();
 navigationObject.setRequestOptions("transactionSegment",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"categoryId":kony.retailBanking.globalData.globals.UNCATEGORISED_CATEGORYID}});
 controller.loadDataAndShowForm(navigationObject);
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
  frmTransactionDetailKA.CheckBoxGroup0aebf676b3db246.selectedKeys[0] = true;
}

function settingIsAnalyzedFalseAndroid(){
  frmTransactionDetailKA.CheckBoxGroup0aebf676b3db246.selectedKeys = null;
}

function settingisMappedToMerchantTrueAndroid(){
  frmTransactionDetailKA.CopyCheckBoxGroup0d9fa019582e647.selectedKeys[0] = true;
}

function settingisMappedToMerchantFalseAndroid(){
  frmTransactionDetailKA.CopyCheckBoxGroup0d9fa019582e647.selectedKeys = null;
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
	  for(var i=0;i<response.length;i++){
        if(response[i]["categoryName"]==kony.retailBanking.globalData.globals.UNCATEGORISED){
           kony.retailBanking.globalData.globals.UNCATEGORISED_CATEGORYID = response[i]["categoryId"];
           break;
           }
      }
    }
	function dataError(err){
		kony.sdk.mvvm.log.error("Error occured while fetching the data for the PFM Category entity");
      customErrorCallback(err);
    }
}

function UncategorisedtransactionListformatting(Data,segmentName){
  var segTransactionListData = Data[segmentName][segmentName].getData();
    if(segTransactionListData && segTransactionListData.length>0)
    {
      var processedSegData = [ ];
      var processedRowObj;
       for(var i in segTransactionListData){
        processedRowObj = {};
        processedRowObj["transactionDescription"] = kony.retailBanking.util.validation.trucateTo(segTransactionListData[i]["transactionDescription"],35,32,"...");
        processedRowObj["transactionAmount"] = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(segTransactionListData[i]["transactionAmount"]);
		processedRowObj["transactionDate"] = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(segTransactionListData[i]["transactionDate"]);
        processedRowObj["transactionId"] = segTransactionListData[i]["primaryKeyValueMap"]["transactionId"];
        processedSegData.push(processedRowObj);
      }
      Data[segmentName][segmentName].setData(processedSegData);
    }
   return Data;
}