//Type your code here
kony = kony || {};
kony.retailBanking = kony.retailBanking || {};
kony.retailBanking.payBill = kony.retailBanking.payBill || {};
kony.retailBanking.payBill.globals = kony.retailBanking.payBill.globals || {};
kony.retailBanking.payBill.globals ={
             accountsObject : null,
             payBillObject : null
};

function emptyDataBeforeSetting(obj){
  if(!obj){
  frmPayNewBillKA.tbxAmountInputKA.text = "";
  //frmPayNewBillKA.tbxNotesInputKA.text = "";
  var date = new Date();
  frmPayNewBillKA.calDateKA.datecomponents = [date.getDate(),date.getMonth()+1,date.getFullYear()];
  frmConfirmBillPaymentKA.transactionId.text = "";
  frmPayNewBillKA.transactionId.text = "";
  frmPayNewBillKA.lblPayBillKA.text = "Pay a Bill";
  }else{
	  if(obj["amountNoFormat"]){
      frmPayNewBillKA.tbxAmountInputKA.text = obj["amountNoFormat"];
    }else{
    frmPayNewBillKA.tbxAmountInputKA.text = obj["amount"];
	}
    //frmPayNewBillKA.tbxNotesInputKA.text = obj["description"];
       
        if(obj["fromEdit"]=="fromEdit"){
          frmConfirmBillPaymentKA.transactionId.text = obj["transactionId"];
          frmPayNewBillKA.transactionId.text = obj["transactionId"];
          frmPayNewBillKA.lblPayBillKA.text = "Edit Pay a Bill";
          if (obj["formatted"]) {
			     if(obj["scheduledDateNoFormat"]){
                  frmPayNewBillKA.calDateKA.datecomponents = getDateArrayPayBill(obj["scheduledDateNoFormat"]);
                }else{
                  var datearr = kony.retailBanking.util.formatingDate.getcalObjfromFormattedData(obj["scheduledDate"]);
                  if(obj["scheduledDate"] && !isNaN(datearr[0]) && !isNaN(datearr[1]) && !isNaN(datearr[2])){
			      frmPayNewBillKA.calDateKA.datecomponents = kony.retailBanking.util.formatingDate.getcalObjfromFormattedData(obj["scheduledDate"]);
                  }else{
                    frmPayNewBillKA.calDateKA.datecomponents = getDateArrayPayBill(obj["scheduledDate"]);
                  }
                  }
			}else{
				frmPayNewBillKA.calDateKA.datecomponents = getDateArrayPayBill(obj["scheduledDate"]); 
			}
        }else{
          if(obj["calDateKA"]){
            frmPayNewBillKA.calDateKA.datecomponents = obj["calDateKA"];
          }else{
            if(obj["transactionDateNoFormat"]){
              frmPayNewBillKA.calDateKA.datecomponents = getDateArrayPayBill(obj["transactionDateNoFormat"]);
            }else{
            if(obj["formatted"]){
              frmPayNewBillKA.calDateKA.datecomponents = kony.retailBanking.util.formatingDate.getcalObjfromFormattedData(obj["transactionDate"]);
            }else{
              frmPayNewBillKA.calDateKA.datecomponents = getDateArrayPayBill(obj["transactionDate"]);
            }
            }
          }
        }
        
  }
}

function getDateArrayPayBill(date){
  		var year = date.slice(0,4);
  		var month = date.slice(5,7);
  		var day = date.slice(8,10);
        return [parseFloat(day), parseFloat(month), parseFloat(year), 0.0, 0.0, 0.0];
}
function navigateToPayeeDetails(){
      var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
	  var controller = INSTANCE.getFormController("frmBillManageKA");
	  var detailscontroller = INSTANCE.getFormController("frmPayeeDetailsKA");
      var viewModel = controller.getFormModel();
      var index = viewModel.getViewAttributeByProperty("segManagePaymentsKA", "selectedRowIndex");
      var selectedRecord = getSelectedRecord(index[1],"frmBillManageKA","segManagePaymentsKA");
      var navigationObject = new kony.sdk.mvvm.NavigationObject;
      navigationObject.setCustomInfo("selectedPayeeObj",selectedRecord);
	  var payeeId = selectedRecord["payeeId"];
	  var datamodel = new kony.sdk.mvvm.DataModel;
	  navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
      navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"payeeId": payeeId}});
      detailscontroller.loadDataAndShowForm(navigationObject);
}

function navigateToPayementHistoryfromSegment(){
   var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmPayeeTransactionsKA");
    var datamodel = new kony.sdk.mvvm.DataModel;
    var navigationObject = new kony.sdk.mvvm.NavigationObject();
    var listController = INSTANCE.getFormController("frmBillManageKA");
     var viewModel = listController.getFormModel();
      var selectedRecord  = viewModel.getViewAttributeByProperty("segManagePaymentsKA","selectedItems")[0];
	   var payeeId = selectedRecord["payeeId"];
    
      navigationObject.setCustomInfo("selectedBillPayObj",selectedRecord);
    navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
    navigationObject.setRequestOptions("segCompletedPaymentsKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"payeeId": payeeId}});
    controller.loadDataAndShowForm(navigationObject);
}

function navigateToRecentBillPayDetails(fromForm,segmentName){
      var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
	  var controller = INSTANCE.getFormController(fromForm);
      var viewModel = controller.getFormModel();
      //var index = viewModel.getViewAttributeByProperty(segmentName, "selectedRowIndex");
      //var selectedRecord = getSelectedRecord(index[1],fromForm,segmentName);
	  var transactionId = frmBillRecentKA.segRecentKA.selectedItems[0].transactionId;
      var selectedRecord = getRecordBasedOnId(fromForm,segmentName,transactionId);
      var controllerContextData= controller.getContextData();
      controllerContextData.setCustomInfo("selectedBillPayObj",selectedRecord);
      populateRecentBillPayDetails(selectedRecord);
}
function navigateToRecentBillPayDetailsfromTransactions(fromForm,segmentName){
	  var selectedInd = frmActivityKA.SegTransactionsKA.selectedRowIndex[1]; 
      var selectedRecord = kony.retailBanking.globalData.activityData.getActivityDataNotFormated()[selectedInd];
      if(parseFloat(selectedRecord["amount"])<0){
        selectedRecord["amount"] = "" + parseFloat(selectedRecord["amount"])*-1; 
      }
      recentBillPayDetailsGlobal = selectedRecord;
      populateRecentBillPayDetails(selectedRecord);
}
function navigateToRecentBillPayDetailsPaymentHistory(fromForm,segmentName){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController(fromForm);
  var selectedRecord = frmPayeeTransactionsKA[segmentName].selectedItems[0];
    selectedRecord["fromForm"] = "frmPayeeTransactionsKA";
    selectedRecord["formatted"] = "formatted";
   var controllerContextData= controller.getContextData();
   controllerContextData.setCustomInfo("selectedBillPayObj",selectedRecord);
   populateRecentBillPayDetails(selectedRecord);
}
function navigateToScheduledBillPayDetailsPaymentHistory(fromForm,segmentName){
   var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController(fromForm);
  var selectedRecord = frmPayeeTransactionsKA[segmentName].selectedItems[0];
    selectedRecord["fromForm"] = "frmPayeeTransactionsKA";
      var navigationObject = new kony.sdk.mvvm.NavigationObject;
      navigationObject.setCustomInfo("selectedBillPayObj",selectedRecord);
      var transactionId = selectedRecord["transactionId"];
	  var datamodel = new kony.sdk.mvvm.DataModel;
	  navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
      navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"transactionId": transactionId}});
      var detailscontroller = INSTANCE.getFormController("frmScheduledBillPayDetailsKA");
      detailscontroller.loadDataAndShowForm(navigationObject);
}
function repeatBillPay(fromForm,segmentName){
	var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
	  var controller = INSTANCE.getFormController(fromForm);
      var viewModel = controller.getFormModel();
      var selRec = viewModel.getViewAttributeByProperty(segmentName, "selectedItems")[0];
      var transactionId = selRec["transactionId"];
      if(getSelectedRecordbyID(transactionId,fromForm,segmentName)){
	  fetchAcountsDataPayBill(getSelectedRecordbyID(transactionId,fromForm,segmentName));
      }else{
        selRec["formatted"]= "formated";
        fetchAcountsDataPayBill(selRec,fromForm);
      }
}

function getDateStringPayBill(selectedScheduledDate){             
      var month,month1;
      var day,day1;
      var day = parseInt(selectedScheduledDate[0]);
      var  month = parseInt(selectedScheduledDate[1]);
      if(month <10){
        month = "0"+month;
      }
      if(day <10){
        day = "0"+day;
      }
      var formattedDate = selectedScheduledDate[2]+"-"+month+"-"+day;
      return formattedDate;
  }

function getSelectedRecordbyID(id,formName,segmentName){
        var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var listController = INSTANCE.getFormController(formName);
	    var controllerContextData= listController.getContextData();
       if( controllerContextData && controllerContextData.getCustomInfo(segmentName)){
          var segData = controllerContextData.getCustomInfo(segmentName);
		  for(var i=0;i<segData.length;i++){
            if(segData[i]["transactionId"]==id){
                return segData[i];
            }
          }
        }else{
          return;
       }
}

function navigateToScheduledBillPayDetails(fromForm,segmentName){
      var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
	  var controller = INSTANCE.getFormController(fromForm);
      var viewModel = controller.getFormModel();
     // var index = viewModel.getViewAttributeByProperty(segmentName, "selectedRowIndex");
     // var selectedRecord = getSelectedRecord(index[1],fromForm,segmentName);
	 var transactionId = frmBillScheduledKA.segScheduleBillPayKA.selectedItems[0].transactionId;
     var selectedRecord = getRecordBasedOnId(fromForm,segmentName,transactionId);
      var navigationObject = new kony.sdk.mvvm.NavigationObject;
      navigationObject.setCustomInfo("selectedBillPayObj",selectedRecord);
      var payeeId = selectedRecord["transactionId"];
	  var datamodel = new kony.sdk.mvvm.DataModel;
	  navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
      navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"payeeId": payeeId}});
      var detailscontroller = INSTANCE.getFormController("frmScheduledBillPayDetailsKA");
      detailscontroller.loadDataAndShowForm(navigationObject);
}
function populateRecentBillPayDetails(selectedRecord){
    if(selectedRecord["fromForm"] == "frmPayeeTransactionsKA"){
      frmRecentBillPayDetailsKA.lblFromAccValKA.text = selectedRecord["fromNickName"];
	  frmRecentBillPayDetailsKA.lblToAccValKA.text = selectedRecord["payeeNickName"];
	  frmRecentBillPayDetailsKA.lblAmountValKA.text = selectedRecord["amount"];
	  frmRecentBillPayDetailsKA.lblDateValKA.text = selectedRecord["transactionDate"];
	  frmRecentBillPayDetailsKA.lblNotesValKA.text = selectedRecord["description"];
    }else{
      frmRecentBillPayDetailsKA.lblFromAccValKA.text = selectedRecord["fromNickName"];
	  frmRecentBillPayDetailsKA.lblToAccValKA.text = selectedRecord["payeeNickName"];
	  frmRecentBillPayDetailsKA.lblAmountValKA.text = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(selectedRecord["amount"]);
	  frmRecentBillPayDetailsKA.lblDateValKA.text = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(selectedRecord["transactionDate"]);
	  frmRecentBillPayDetailsKA.lblNotesValKA.text = selectedRecord["description"];
      frmRecentBillPayDetailsKA.lblTransactionIdValKA.text = selectedRecord["transactionId"];
    }
    frmRecentBillPayDetailsKA.show();
}
function ScheduledCancelPayBill(frmName,segName){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController(frmName);
  var viewModel = listController.getFormModel();
  var selRecord  = viewModel.getViewAttributeByProperty(segName,"selectedItems")[0];
  var transctionId = selRecord["transactionId"];
  var options ={    "access": "online",
                    "objectName": "RBObjects"
               };
  var headers = {"session_token":kony.retailBanking.globalData.session_token};
  var serviceName = "RBObjects";
  var modelObj = INSTANCE.getModel("Transactions",serviceName,options);
  var record = {};
  record["transactionId"] = transctionId;
  var dataObject = new kony.sdk.dto.DataObject("Transactions",record);
  var serviceOptions = {"dataObject":dataObject,"headers":headers};
  modelObj.remove(serviceOptions, deleteSuccess, customErrorCallback);
  
  function deleteSuccess(res){
      navigateToPayBillTransactionsList("frmBillScheduledKA","segScheduleBillPayKA");
  }
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

function fetchAcountsDataPayBill(payBillObj,fromForm){
  var payBillObj = payBillObj;
  kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Loading Form");
  frmPayNewBillKA.lbxFromAccountKA.skin = "CopysknInputsKA0dc9a8f25976646";
  frmPayNewBillKA.lbxToAccountKA.skin = "CopysknInputsKA0dc9a8f25976646";
  frmPayNewBillKA.tbxAmountInputKA.skin = "CopyslTextBox082d070bc5b4f4d";
  //frmPayNewBillKA.calDateKA.skin = "CopyslCalendar09f527b597f6844";
  emptyDataBeforeSetting(payBillObj,fromForm);
  var resData = [];
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var options ={    "access": "online",
                "objectName": "RBObjects"
               };
  var headers = {"session_token":kony.retailBanking.globalData.session_token};
  var serviceName = "RBObjects";
  var modelObj = INSTANCE.getModel("Accounts",serviceName,options);
  var dataObject = new kony.sdk.dto.DataObject("Accounts");
  var serviceOptions = {"dataObject":dataObject, "headers":headers};
  modelObj.fetch(serviceOptions, dataSuccessFetchAccount, dataFailureFetchAccount);


  function dataSuccessFetchAccount(response){
    if(response){
      kony.retailBanking.payBill.globals.accountsObject = response;
      kony.sdk.mvvm.log.info("meta data fetch response : " + JSON.stringify(response));
      var masterData = [];
      var masterDataElement = [];
      for (var i = 0; i < response.length; i++) 
      {
        masterDataElement = [];
        var pickListItem;
        pickListItem = response[i];
        var key = response[i]["accountID"];
        var value;  
          if(response[i]["nickName"]){
           value = kony.retailBanking.util.validation.trucateTo(response[i]["nickName"],35,32,"...");
        }else{
          var accountNumber = response[i]["accountID"];
          value =  response[i]["accountName"] + accountNumber.substring(accountNumber.length-4, accountNumber.length);
        }    
        if(response[i]["supportBillPay"]==="1"){
        masterDataElement.push(key);
        masterDataElement.push(value);
        masterData.push(masterDataElement);
        }
      }
      frmPayNewBillKA.lbxFromAccountKA.masterData = masterData;
      var preferedSelAcnt=kony.retailBanking.globalData.globals.settings.DefaultPaymentAcctNo;
      if(payBillObj){
        frmPayNewBillKA.lbxFromAccountKA.selectedKey = payBillObj["fromAccountNumber"];
      }else{
       if(preferedSelAcnt){
					frmPayNewBillKA.lbxFromAccountKA.selectedKey = preferedSelAcnt;
				}else{
                 frmPayNewBillKA.lbxFromAccountKA.selectedKey = response[0]["accountID"];
				}
      }
      fetchPayeeDataPayBill(payBillObj);
    }
  }
  function dataFailureFetchAccount(err){
    kony.print("err"+err);
  }
}

function fetchPayeeDataPayBill(payBillObj){
  var payBillObj = payBillObj;
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
  modelObj.fetch(serviceOptions, dataSuccessFetchPayee, dataFailureFetchPayee);


  function dataSuccessFetchPayee(response){
    if(response){
      kony.retailBanking.payBill.globals.payBillObject = response;
      kony.sdk.mvvm.log.info("meta data fetch response : " + JSON.stringify(response));
      var masterData = [];
      var masterDataElement = [];
          masterDataElement.push("-1");
          masterDataElement.push("Select a Payee");
          masterData.push(masterDataElement);
      for (var i = 0; i < response.length; i++) 
      {
        var pickListItem;
        masterDataElement = [];
        pickListItem = response[i];
        var key = response[i]["payeeId"];
        var value;  
          if(response[i]["payeeNickName"]){
           value = kony.retailBanking.util.validation.trucateTo(response[i]["payeeNickName"],35,32,"...");
        }else{
          value = kony.retailBanking.util.validation.trucateTo(response[i]["payeeName"],35,32,"...")
        }                           
        masterDataElement.push(key);
        masterDataElement.push(value);
        masterData.push(masterDataElement);
      }
      frmPayNewBillKA.lbxToAccountKA.masterData = masterData;
      if(payBillObj){
        frmPayNewBillKA.lbxToAccountKA.selectedKey = payBillObj["payeeId"];
      }else{ 
          frmPayNewBillKA.lbxToAccountKA.selectedKey = "-1";  
      }
      kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
      frmPayNewBillKA.show();
    }
  }
  function dataFailureFetchPayee(err){
    kony.print("err"+err);
  }
}
function setAccountselectedPayBill(accID,listboxname){
  var accObj = kony.retailBanking.payBill.globals.accountsObject;
  for(var i=0;i<accObj.length;i++){
    if(accID==accObj[i]["accountID"]){
      frmPayNewBillKA[listboxname]["selectedKey"] = accObj[i]["accountID"];
      break;
    }
  }
}

function navigateToConfirmBillPay(){
  var PayBillObject = {};
  
  var fromAccountID = frmPayNewBillKA.lbxFromAccountKA.selectedKey;
  var PayeeId = frmPayNewBillKA.lbxToAccountKA.selectedKey;
  var amountTransfered = frmPayNewBillKA.tbxAmountInputKA.text;
  var calDateKA = frmPayNewBillKA.calDateKA.dateComponents;
  var temp = true;
  //var Notes = frmPayNewBillKA.tbxNotesInputKA.text;
  if(fromAccountID==="" || fromAccountID===" "|| fromAccountID==="-1" || fromAccountID===-1){
   // alert("Please Select From Account");
    frmPayNewBillKA.lbxFromAccountKA.skin = "sknlbxValidation";
    temp =false;
  }else
    frmPayNewBillKA.lbxFromAccountKA.skin = "CopysknInputsKA0dc9a8f25976646";
  if(PayeeId==="" || PayeeId===" "|| PayeeId==="-1" || PayeeId===-1){
    //alert("Please Select Payee");
    frmPayNewBillKA.lbxToAccountKA.skin = "sknlbxValidation";
    temp =false;
  }else
    frmPayNewBillKA.lbxToAccountKA.skin = "CopysknInputsKA0dc9a8f25976646";
   
   if(amountTransfered === null ||  amountTransfered === undefined || amountTransfered == " "|| amountTransfered ==="" || !validateDecimals(amountTransfered)){
		temp = false;
        frmPayNewBillKA.tbxAmountInputKA.skin = "skntbxValidation";
   }
   else{
       if (isNaN(amountTransfered) || parseFloat(amountTransfered) <= 0) {
            frmPayNewBillKA.tbxAmountInputKA.skin = "skntbxValidation";
            temp = false;
        } 
		else {
            frmPayNewBillKA.tbxAmountInputKA.skin = "CopyslTextBox082d070bc5b4f4d";
        }

  }
  var calDate = kony.retailBanking.util.formatingDate.getDateObjFromKonyCalendarArray(frmPayNewBillKA.calDateKA.dateComponents);
  var currentDate=new Date();
  if ((currentDate.getFullYear == calDate.getFullYear  && currentDate.getMonth() == calDate.getMonth() && currentDate.getDate() == calDate.getDate())|| currentDate<calDate)
	frmPayNewBillKA.calDateKA.skin = "CopyslCalendar09f527b597f6844";
  else{
    frmPayNewBillKA.calDateKA.skin = "sknlbxValidation";
    temp = false;
  }
  
  if(temp){
	  frmPayNewBillKA.lbxFromAccountKA.skin = "CopysknInputsKA0dc9a8f25976646";
	frmPayNewBillKA.lbxToAccountKA.skin = "CopysknInputsKA0dc9a8f25976646";
	frmPayNewBillKA.tbxAmountInputKA.skin = "CopyslTextBox082d070bc5b4f4d";
	frmPayNewBillKA.calDateKA.skin = "CopyslCalendar09f527b597f6844";
       var res = kony.retailBanking.payBill.globals.accountsObject;
  for(var i=0;i<res.length;i++){
    if(res[i]["accountID"]==fromAccountID){
         PayBillObject["fromAccountNickName"] = res[i]["nickName"];
         break;
              }
  }

  var res = kony.retailBanking.payBill.globals.payBillObject;
  for(var i=0;i<res.length;i++){
    if(res[i]["payeeId"]==PayeeId){
         PayBillObject["PayeeNickName"] = res[i]["payeeNickName"];
         break;
              }
  }
    PayBillObject["fromAccountID"] = fromAccountID;
    PayBillObject["PayeeId"] = PayeeId;
    PayBillObject["amountTransfered"] = amountTransfered;
    PayBillObject["calDateKA"] = calDateKA;
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var listController = INSTANCE.getFormController("frmConfirmBillPaymentKA");
    var navigationObject = new kony.sdk.mvvm.NavigationObject();
    var datamodelflxAddressKA = new kony.sdk.mvvm.DataModel();
    if(frmPayNewBillKA.transactionId.text=="" || frmPayNewBillKA.transactionId.text==" " || frmPayNewBillKA.transactionId.text==null){
    navigationObject.setDataModel(null,kony.sdk.mvvm.OperationType.ADD, "form");
    }
    navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
    navigationObject.setCustomInfo("payBillObject",PayBillObject);
    listController.performAction("navigateTo",["frmConfirmBillPaymentKA",navigationObject]);
  }
}

function ValidAmount(fromAccountID,amountTransfered){
  var res = kony.retailBanking.payBill.globals.accountsObject;
  for(var i=0;i<res.length;i++){
    if(res[i]["accountID"]==fromAccountID){
              if(Number(amountTransfered)>Number(res[i]["availableBalance"])){
                return false
              }else{
                return true;
              }
              }
  }
  return false;
}

function validateDecimals(amount){
  if(amount.match(kony.retailBanking.globalData.globals.decimalOnly) === null){
       alert("Only 2 decimal points are allowed"); 
       return false;
  }
  else 
    return true; 
}

function navigateToPayBillTransactionsList(form,segName)
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController(form);
  var navObject = new kony.sdk.mvvm.NavigationObject();
  navObject.setRequestOptions(segName,{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  listController.performAction("navigateTo",[form,navObject]); 
}

function payeetransactionFormatting(Data,segmentName){
  var segTransactionListData = Data[segmentName][segmentName].getData();
  var processedSegData = [ ];
  var processedRowObj;
  if(segTransactionListData && segTransactionListData.length>0)
  {
	  var processedSegCompletedPaymentsData = [ ];
      var processedSegScheduledTransactionsData = [ ];
      var processedFailedTransactionsData = [ ];
	  
	  for(var i in segTransactionListData){
        processedRowObj = {};
        processedRowObj["amountNoFormat"] = segTransactionListData[i]["amount"];
        processedRowObj["amount"] = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(segTransactionListData[i]["amount"]);
        processedRowObj["transactionId"]= segTransactionListData[i]["transactionId"];
        processedRowObj["payeeId"]= segTransactionListData[i]["payeeId"];
        processedRowObj["fromAccountNumber"] = segTransactionListData[i]["fromAccountNumber"];
        processedRowObj["payeeNickName"]= segTransactionListData[i]["payeeNickName"];
         if(segTransactionListData[i]["scheduledDate"]){
            processedRowObj["cancelBillPay"] = "Cancel Bill Pay";
		}else if(segTransactionListData[i].hasOwnProperty("statusDescription")){
            processedRowObj["repeatBillPay"] = "Repeat Bill Pay";
		}else{
            processedRowObj["repeatBillPay"] = "Repeat Bill Pay";
		}
        processedRowObj["transactionDate"] = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(segTransactionListData[i]["transactionDate"]);
        processedRowObj["transactionDateNoFormat"] = segTransactionListData[i]["transactionDate"];
        processedRowObj["scheduledDate"] = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(segTransactionListData[i]["scheduledDate"]);
        processedRowObj["scheduledDateNoFormat"] = segTransactionListData[i]["scheduledDate"];
        if(segTransactionListData[i]["transactionType"]){
          processedRowObj["transactionType"] = segTransactionListData[i]["transactionType"];
        }else{
          processedRowObj["transactionType"] = " ";
        }
        if(segTransactionListData[i]["fromNickName"]){
          processedRowObj["fromNickName"] = segTransactionListData[i]["fromNickName"];
        }else{
          processedRowObj["fromNickName"] = " ";
        }
        if(segTransactionListData[i]["description"]){
          processedRowObj["description"] = segTransactionListData[i]["description"];
        }else{
          processedRowObj["description"] = " ";
        }
        var status = segTransactionListData[i]["statusDescription"];   
        if(status !== kony.retailBanking.globalData.globals.Failed) 
        {
          if(segTransactionListData[i]["frequencyType"] !==undefined) 
          {
            processedRowObj["hasDepositImage"] = {
              "isVisible": true,
              src :"recuurencebox.png"
            }; 
          } else
          {
            processedRowObj["hasDepositImage"] = {
              "isVisible": false,
              src :"recuurencebox.png"
            };
          }
        }else
        {
          if(segTransactionListData[i]["frequencyType"] !==undefined) 
          {
            processedRowObj["hasDepositImage"] = {
              "isVisible": false,
              src :"recuurencebox.png"
            };
          }

        }
        if(segTransactionListData[i]["scheduledDate"]){
			processedSegScheduledTransactionsData.push(processedRowObj);
		}else if(segTransactionListData[i].hasOwnProperty("statusDescription")){
			processedSegCompletedPaymentsData.push(processedRowObj);
		}else{
        
			processedFailedTransactionsData.push(processedRowObj);
		}
    }
	      if(processedSegCompletedPaymentsData.length >0){
        frmPayeeTransactionsKA.segCompletedPaymentsKA.widgetDataMap = { 
                imgCheckKA : "hasDepositImage",
				lblDateKA : "transactionDate",
                lblPayeeNickNameKA : "payeeNickName",
				lblTransactionFromKA : "fromNickName",
				lblTransactionT0KA : "payeeNickName",
				lblAmountKA : "amount",
				btnRepeatBillPayKA : "repeatBillPay"
                                 };
        frmPayeeTransactionsKA.segCompletedPaymentsKA.setData(processedSegCompletedPaymentsData);
        frmPayeeTransactionsKA.segCompletedPaymentsKA.isVisible = true;
        frmPayeeTransactionsKA.LabelNoCompletedTransactionsKA.isVisible = false;
      }else{
        frmPayeeTransactionsKA.segCompletedPaymentsKA.isVisible = false;
        frmPayeeTransactionsKA.LabelNoCompletedTransactionsKA.isVisible = true;
      }
      if(processedSegScheduledTransactionsData.length >0){
        frmPayeeTransactionsKA.segScheduledTransactionsKA.widgetDataMap = { 
				lblDateKA : "scheduledDate",
				lblTransactionFromKA : "fromNickName",
				lblTransactionT0KA : "payeeNickName",
				lblAmountKA : "amount",
				MakeTransfer : "cancelBillPay"
                                 };
        frmPayeeTransactionsKA.segScheduledTransactionsKA.setData(processedSegScheduledTransactionsData);
        frmPayeeTransactionsKA.segScheduledTransactionsKA.isVisible = true;
        frmPayeeTransactionsKA.LabelNoScheduledTransactionsKA.isVisible = false;
      }else{
        frmPayeeTransactionsKA.segScheduledTransactionsKA.isVisible = false;
        frmPayeeTransactionsKA.LabelNoScheduledTransactionsKA.isVisible = true;
      }
      if(processedFailedTransactionsData.length >0){
                frmPayeeTransactionsKA.segFailedTransactionsKA.widgetDataMap = { 
                imgCheckKA : "hasDepositImage",
				lblDateKA : "transactionDate",
                lblPayeeNickNameKA : "payeeNickName",
				lblTransactionFromKA : "fromNickName",
				lblTransactionT0KA : "payeeNickName",
				lblAmountKA : "amount",
				btnRepeatBillPayKA : "repeatBillPay"
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
  frmPayeeTransactionsKA.show();
}

function populatePayeeDetailsPaymentHistory(){
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var listController = INSTANCE.getFormController("frmPayeeTransactionsKA");
    var controllerContextData= listController.getContextData();
         if( controllerContextData && controllerContextData.getCustomInfo("selectedBillPayObj")){
         var payeeDetails =  controllerContextData.getCustomInfo("selectedBillPayObj");
        }
  	frmPayeeTransactionsKA.lblPayeeNicknameKA.text = payeeDetails["payeeNickName"];
	frmPayeeTransactionsKA.lblCompanyValueKA.text = payeeDetails["companyName"];
	frmPayeeTransactionsKA.lblAccountValueKA.text = payeeDetails["accountNumber"];
}

function transactionRecentFormatting(Data,segmentName){
  var segTransactionListData = Data[segmentName][segmentName].getData();
  var processedSegData = [ ];
  var processedRowObj;
  if(segTransactionListData && segTransactionListData.length>0)
  {
    for(var i in segTransactionListData){
      if(segTransactionListData[i]["scheduledDate"] == undefined){
		        if (segTransactionListData[i]["transactionType"] === kony.retailBanking.globalData.globals.PayBill) {  
        processedRowObj = {};
        processedRowObj["amount"] = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(segTransactionListData[i]["amount"]);
        processedRowObj["transactionId"]= segTransactionListData[i]["transactionId"];
        processedRowObj["payeeId"]= segTransactionListData[i]["payeeId"];
		processedRowObj["payeeNickName"]= segTransactionListData[i]["payeeNickName"];
        processedRowObj["transactionDate"] = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(segTransactionListData[i]["transactionDate"]);
        processedRowObj["repeatBillPay"] = "Repeat Bill Pay";
        if(segTransactionListData[i]["transactionType"]){
          processedRowObj["transactionType"] = segTransactionListData[i]["transactionType"];
        }else{
          processedRowObj["transactionType"] = " ";
        }
        if(segTransactionListData[i]["fromNickName"]){
          processedRowObj["fromNickName"] = segTransactionListData[i]["fromNickName"];
        }else{
          processedRowObj["fromNickName"] = " ";
        }
        if(segTransactionListData[i]["description"]){
          processedRowObj["description"] = segTransactionListData[i]["description"];
        }else{
          processedRowObj["description"] = " ";
        }
        var status = segTransactionListData[i]["statusDescription"];   
        if(status !== kony.retailBanking.globalData.globals.Failed) 
        {
          if(segTransactionListData[i]["frequencyType"] !==undefined) 
          {
            processedRowObj["hasDepositImage"] = {
              "isVisible": true,
              src :"recuurencebox.png"
            }; 
          } else
          {
            processedRowObj["hasDepositImage"] = {
              "isVisible": false,
              src :"recuurencebox.png"
            };
          }
        }else
        {
          if(segTransactionListData[i]["frequencyType"] !==undefined) 
          {
            processedRowObj["hasDepositImage"] = {
              "isVisible": false,
              src :"recuurencebox.png"
            };
          }

        }
        processedSegData.push(processedRowObj);
	 }
      }
    }
  }
  Data[segmentName][segmentName].setData(processedSegData);
  return Data;
}

function transactionScheduledFormatting(Data,segmentName){
  var segTransactionListData = Data[segmentName][segmentName].getData();
  var processedSegData = [ ];
  var processedRowObj;
  if(segTransactionListData && segTransactionListData.length>0)
  {
    for(var i in segTransactionListData){
      if(segTransactionListData[i]["scheduledDate"] != undefined){
		   if (segTransactionListData[i]["transactionType"] === kony.retailBanking.globalData.globals.PayBill) {
        processedRowObj = {};
        processedRowObj["transactionId"]= segTransactionListData[i]["transactionId"];
        processedRowObj["amount"] = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(segTransactionListData[i]["amount"]);
        processedRowObj["payeeNickName"]= segTransactionListData[i]["payeeNickName"];
        processedRowObj["scheduledDate"] = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(segTransactionListData[i]["scheduledDate"]);
         processedRowObj["cancelBillPay"] = "Cancel Bill Pay";
        if(segTransactionListData[i]["transactionType"]){
          processedRowObj["transactionType"] = segTransactionListData[i]["transactionType"];
        }else{
          processedRowObj["transactionType"] = " ";
        }
        if(segTransactionListData[i]["fromNickName"]){
          processedRowObj["fromNickName"] = segTransactionListData[i]["fromNickName"];
        }else{
          processedRowObj["fromNickName"] = " ";
        }
        if(segTransactionListData[i]["description"]){
          processedRowObj["description"] = segTransactionListData[i]["description"];
        }else{
          processedRowObj["description"] = " ";
        }
        var status = segTransactionListData[i]["statusDescription"];   
        if(status !== kony.retailBanking.globalData.globals.Failed) 
        {
          if(segTransactionListData[i]["frequencyType"] !==undefined) 
          {
            processedRowObj["hasDepositImage"] = {
              "isVisible": true,
              src :"recuurencebox.png"
            }; 
          } else
          {
            processedRowObj["hasDepositImage"] = {
              "isVisible": false,
              src :"recuurencebox.png"
            };
          }
        }else
        {
          if(segTransactionListData[i]["frequencyType"] !==undefined) 
          {
            processedRowObj["hasDepositImage"] = {
              "isVisible": false,
              src :"recuurencebox.png"
            };
          }

        }
        processedSegData.push(processedRowObj);
		   }
      }
    }
  }
  Data[segmentName][segmentName].setData(processedSegData);
  return Data;
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
        processedRowObj["paymentHistory"] = "Payment History";
         processedRowObj["payeeId"] = segPayeeListData[i]["payeeId"];
        processedSegData.push(processedRowObj);
      }
      Data[segmentName][segmentName].setData(processedSegData);
    }
  return Data;
}

function navigateToManagePayeeAdd(){
        var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var listController = INSTANCE.getFormController("frmAddNewPayeeKA");
        var navigationObject = new kony.sdk.mvvm.NavigationObject();
        var datamodelflxAddressKA = new kony.sdk.mvvm.DataModel();
        navigationObject.setDataModel(null,kony.sdk.mvvm.OperationType.ADD, "form");
        navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}}); 
        listController.performAction("navigateTo",["frmAddNewPayeeKA",navigationObject]);

}

function navigateToPayeeEdit(){
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmEditPayeeKA");
    var datamodel = new kony.sdk.mvvm.DataModel;
    var navigationObject = new kony.sdk.mvvm.NavigationObject();
    var listController = INSTANCE.getFormController("frmPayeeDetailsKA");
    var controllerContextData= listController.getContextData();
         if( controllerContextData && controllerContextData.getCustomInfo("selectedPayeeObj")){
         var payeeDetails =  controllerContextData.getCustomInfo("selectedPayeeObj");
         var payeeID = payeeDetails["payeeId"];
        }
    navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
    navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"payeeId": payeeID}});
    controller.loadDataAndShowForm(navigationObject);
}
function navigateToPayementHistory(){
   var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmPayeeTransactionsKA");
    var datamodel = new kony.sdk.mvvm.DataModel;
    var navigationObject = new kony.sdk.mvvm.NavigationObject();
    var listController = INSTANCE.getFormController("frmPayeeDetailsKA");
    var controllerContextData= listController.getContextData();
         if( controllerContextData && controllerContextData.getCustomInfo("selectedPayeeObj")){
         var payeeDetails =  controllerContextData.getCustomInfo("selectedPayeeObj");
         var payeeID = payeeDetails["payeeId"];
         navigationObject.setCustomInfo("selectedBillPayObj",payeeDetails);
        }
    navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
    navigationObject.setRequestOptions("segCompletedPaymentsKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"payeeId": payeeID}});
    controller.loadDataAndShowForm(navigationObject);
}

function getRecordBasedOnId(fromForm,segmentName,transactionId)
{

  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController(fromForm);
  var controllerContextData= listController.getContextData();
  var segData = controllerContextData.getCustomInfo(segmentName);
  var transaction = [];
  for (var len=0;len<segData.length;len++){
    if(segData[len]["transactionId"] == transactionId)
    {
      transaction = segData[len];
    }
  }
  return transaction;
}
