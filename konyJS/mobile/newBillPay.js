//Type your code here
var payeelength=0;
var BillPayfromForm="NewBillPay";

function newBillPayPreShow(){
  var showState = "InitialLanding";
  var BillPayTransactionData=null;
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmNewBillKA");
  var controllerContextData= controller.getContextData();
  if(controllerContextData && controllerContextData.getCustomInfo("showState")){
    showState = controllerContextData.getCustomInfo("showState");
  }
  if(controllerContextData && controllerContextData.getCustomInfo("BillPayTransactionData")){
    BillPayTransactionData = controllerContextData.getCustomInfo("BillPayTransactionData");
  }
  
  /* First set data for all the UI elements on the New Bill Pay form */
  setDataUIElementsOnNewBillPayForm(BillPayTransactionData, showState);
  
  var viewModel = controller.getFormModel();
  /* Old code. Sets the bank name retreived from global data */
  viewModel.setViewAttributeByProperty("fromAccountBankNameKA","text",kony.retailBanking.globalData.globals.BankName);
  viewModel.setViewAttributeByProperty("CopyLabel03e39ab4661a845","text",kony.retailBanking.globalData.globals.BankName);
  //viewModel.setViewAttributeByProperty("Label0cecf1132bf8049","text",kony.retailBanking.globalData.globals.BankName); 
  
  /* Calculates the height of all the containers */
  calculateNewBillPayCardHeights();
  
  /* Determine the state of all the containers */
  setFromContainerAttributesBillPay(showState);
  setToContainerAttributesBillPay(showState);

  /* Set the title bar */
  frmNewBillKA.transferPayTitleLabel.text="New Bill Pay";
  if (showState === "EditExistingBillPay")
     frmNewBillKA.transferPayTitleLabel.text=i18n_editPayBill; 
}

function navigateToNewBillPayForm(showState, transactionObject){
    /* As we are not allowing editing of the To field only in EditExistingBillPay scenario */
    if(showState !== "EditExistingBillPay")
        fetchPayeesData();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var listController = INSTANCE.getFormController("frmNewBillKA");
    var navObject = new kony.sdk.mvvm.NavigationObject();
    navObject.setCustomInfo("showState",showState);
    if(showState !== "InitialLanding")
        navObject.setCustomInfo("BillPayTransactionData",transactionObject);
    navObject.setRequestOptions("segInternalFromAccountsKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
    listController.performAction("navigateTo",["frmNewBillKA",navObject]);
}

function setDataUIElementsOnNewBillPayForm(BillPayTransactionData, showState){
   frmNewBillKA.lblCurrencyType.text=  kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount("",kony.retailBanking.globalData.globals.CurrencyCode);
   frmNewBillKA.lblTransactionType.text = kony.retailBanking.globalData.globals.PayBill; 
    /* A new transaction will be initiated. So initialize most of the data */  
    if(showState === "InitialLanding"|| showState === "SpecifiedPayee"){    
        var settingsObj = kony.store.getItem("settingsflagsObject");
        var preferedSelAcnt=kony.retailBanking.globalData.accounts.searchAccountById(settingsObj.DefaultPaymentAcctNo);  
        if(preferedSelAcnt !==""){
            var nickNameData = preferedSelAcnt.nickName;
            //Need To Get This From Service
            if(nickNameData.trim() === "")
                nickNameData = preferedSelAcnt.accountName;
            setSelectedAccountData(frmNewBillKA, "from", nickNameData,
                    kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(preferedSelAcnt.availableBalance,kony.retailBanking.globalData.globals.CurrencyCode), 
                    preferedSelAcnt.accountID, 
                    getSkinColor(preferedSelAcnt.accountType), "INTERNAL");
        }
        //setPayeeData(frmNewBillKA, "form", null);
        frmNewBillKA.amountTextField.text="";
        frmNewBillKA.tolblAccountNumberKA.text="";
        setCalendarDateToCurrentDate(frmNewBillKA.calDateKA);        
        frmNewBillKA.lblTransactionIdKA.text = "";
      //Additionals for Specified payee
      if(showState=== "SpecifiedPayee")
      {
        frmNewBillKA.toNamePick.text =  BillPayTransactionData.payeeNickName; 
  		frmNewBillKA.tolblAccountNumberKA.text =  BillPayTransactionData.payeeId;
      }
      
    }

    /* An existing transaction is available, fill up data in the UI using the passed in navigation object */
    if (showState === "EditExistingBillPay" || showState === "EditNewBillPay" ||
        showState === "RepeatBillPay"){
        frmNewBillKA.amountTextField.text = BillPayTransactionData.transferAmount;   
       
        setSelectedAccountData(frmNewBillKA, "from", BillPayTransactionData.fromAccountName,
        BillPayTransactionData.fromAccountBalance, BillPayTransactionData.fromAccountNumber, 
        BillPayTransactionData.fromAccountColor, "INTERNAL");
       
        frmNewBillKA.calDateKA.dateComponents = BillPayTransactionData.transferDate;
        
      	frmNewBillKA.toNamePick.text =  BillPayTransactionData.payeeNickName; 
  		frmNewBillKA.tolblAccountNumberKA.text =  BillPayTransactionData.payeeId;
      
        frmNewBillKA.lblTransactionIdKA.text = "";
        if(showState === "EditExistingBillPay")
            frmNewBillKA.lblTransactionIdKA.text = BillPayTransactionData.transferTransactionID;

    }
  
  
}

function fetchPayeesData(){
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
    payeedatalength = response.length;
    kony.print("Payee account length = " + payeedatalength);
    var rowData;
    var contactName;
    frmNewBillKA.segPayeeNamesKA.widgetDataMap={
      lblContact:"payeeNickName",
      lblAccountNumberKA : "payeeId",
      lblRowSeparator: "rowSeparator"
    };
	payeelength=response.length;
    for(var i=0;i< response.length;i++)
    {       
      if(response[i].payeeNickName === "" || response[i].payeeNickName ==null)
      {
        //response[i].nickName = response[i].beneficiaryName;
        contactName = response[i].payeeName;
      }
      else /* Added code to set rowSeparator as a part of refactoring */
        contactName = response[i].payeeNickName;
      rowData = {"payeeNickName": contactName, "payeeId": response[i].payeeId,
                "rowSeparator":{skin: sknCopyslFbox0a29a14ecfe6442}
                };
      
      resData.push(rowData);
    }
    frmNewBillKA.segPayeeNamesKA.setData(resData);
  }
}

function setFromContainerAttributesBillPay(showState){
    if(showState === "InitialLanding"||showState === "SpecifiedPayee"){
        var settingsObj = kony.store.getItem("settingsflagsObject");
        var preferedSelAcnt=kony.retailBanking.globalData.accounts.searchAccountById(settingsObj.DefaultTransferAcctNo);  
        if(preferedSelAcnt !==""){
            setContainerState(frmNewBillKA,"from","INTERNAL_SELECTED", defaultCardHeight);
        }     
        else{
            setContainerState(frmNewBillKA,"from","INITIAL_EXPANDED", fromCardHeight); 
        }
    }
    if(showState === "EditExistingBillPay" || showState === "EditNewBillPay" ||
        showState === "RepeatBillPay"){
        // From account data has already been set, so just set container state
        setContainerState(frmNewBillKA,"from","INTERNAL_SELECTED", defaultCardHeight);
    }
}

/* The to container state is determined based on how we arrive on this page */
function setToContainerAttributesBillPay(showState){
    frmNewBillKA.editToCard.setVisibility(true);
    if(showState === "InitialLanding"){
        setContainerState(frmNewBillKA,"to","INITIAL_EXPANDED", toCardHeightPayBill);
       
    }
    if(showState === "EditExistingBillPay" || showState === "EditBillPay" ||
        showState === "RepeatBillPay"||showState === "SpecifiedPayee"){
        // To account data has already been set, so just set container state
        // Also INTERNAL and EXTERNAL SELECTED does have an effect on the state
        setContainerState(frmNewBillKA,"to","INTERNAL_SELECTED", defaultCardHeight);
        if(showState === "EditExistingBillPay"){
            frmNewBillKA.editToCard.setVisibility(false);
        }
    }
}

function setPayeeIntoToCard(){ 
  frmNewBillKA["toNamePick"].text =  frmNewBillKA.segPayeeNamesKA.selectedRowItems[0].payeeNickName; 
  frmNewBillKA["tolblAccountNumberKA"].text =  frmNewBillKA.segPayeeNamesKA.selectedRowItems[0].payeeId;
  
}

function newConfirmBillPay(fromForm,toForm){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController(fromForm);
  var viewModel = controller.getFormModel();
  var amount = viewModel.getViewAttributeByProperty("amountTextField","text");
  var fromAccountBal =   viewModel.getViewAttributeByProperty("fromAmountPick","text");
  fromAccountBal = fromAccountBal.slice(2);
  //var fromIndex = viewModel.getViewAttributeByProperty("segInternalFromAccountsKA", "selectedRowIndex");
  //var toIndex = viewModel.getViewAttributeByProperty("segInternalTOAccountsKA", "selectedRowIndex");
  var fromAccountNumber =  viewModel.getViewAttributeByProperty("fromlblAccountNumberKA","text");
  var toAccountNumber =    viewModel.getViewAttributeByProperty("tolblAccountNumberKA","text");

  if(fromAccountNumber !== "" && toAccountNumber !== ""){

   
      var validated = validateDecimals(amount);
      amount = amount;
      if((amount===null) || (amount==="") || (Number(amount)< 1))
      {
        alert("Entered amount is Not Valid");
      }else if(validated) //if((Number(amount)<=Number(fromAccountBal)))
      {
        var listController = INSTANCE.getFormController(toForm);
        var navigationObject = new kony.sdk.mvvm.NavigationObject();
        var datamodelflxAddressKA = new kony.sdk.mvvm.DataModel();
        if(frmNewBillKA.lblTransactionIdKA.text == null || frmNewBillKA.lblTransactionIdKA.text == "") // {
          navigationObject.setDataModel(null,kony.sdk.mvvm.OperationType.ADD, "form");
          navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
        //}else  {
          //navigationObject.setDataModel(null, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
        //  navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"transactionId": frmNewBillKA.lblTransactionIdKA.text}});
        //}
        var BillPayTransactionData = constructBillPayTransactionObject();
        navigationObject.setCustomInfo("BillPayTransactionData", BillPayTransactionData);
        listController.performAction("navigateTo",[toForm,navigationObject]);
      }/*else
      {
        kony.ui.Alert({
          "message": "Entered amount is more than the Available Balance",
          "alertType": constants.ALERT_TYPE_INFO,
          "alertTitle":"INFO",
          "yesLabel": "MODIFY",
          "noLabel": null,
          "alertHandler":onModifyClick
        },{});
      }*/
  }  
  else if(fromAccountNumber !=="" && toAccountNumber === ""){
    alert("Please Select To Account");
  }else if(fromAccountNumber ==="" && toAccountNumber !== ""){
    alert("Please Select From Account");
  }else{
    alert("Please select From and To accounts");
  }
}

function constructBillPayTransactionObject(){
    var newTransferTransactionData = {};
    newTransferTransactionData.transferAmount = frmNewBillKA.amountTextField.text;
    newTransferTransactionData.fromAccountName = frmNewBillKA.fromNamePick.text;
    newTransferTransactionData.fromAccountNumber = frmNewBillKA.fromlblAccountNumberKA.text;
    newTransferTransactionData.fromAccountBalance = frmNewBillKA.fromAmountPick.text;
    newTransferTransactionData.fromAccountColor = frmNewBillKA.fromAccountColorPick.skin;
  	newTransferTransactionData.payeeNickName = frmNewBillKA.toNamePick.text;
    newTransferTransactionData.payeeId = frmNewBillKA.tolblAccountNumberKA.text;
  
    newTransferTransactionData.transferDate = frmNewBillKA.calDateKA.dateComponents;
  
    newTransferTransactionData.transferTransactionType = frmNewBillKA.lblTransactionType.text;
    newTransferTransactionData.transferTransactionID = frmNewBillKA.lblTransactionIdKA.text;
    return newTransferTransactionData;
}

function setDataIntoConfirmBillPayfrom(){
  var BillPayTransactionData;
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var formController = INSTANCE.getFormController("frmConfirmPayBill");
  var formModel = formController && formController.getFormModel();
  var formControllerContextData= formController.getContextData();
  
  formModel.clear();
  
  if(formControllerContextData && formControllerContextData.getCustomInfo("BillPayTransactionData")){
    BillPayTransactionData = formControllerContextData.getCustomInfo("BillPayTransactionData");   
    var amount = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(BillPayTransactionData.transferAmount,
                                    kony.retailBanking.globalData.globals.CurrencyCode);                            
                                    
   
        
    // start the bind
        	formModel.setViewAttributeByProperty("transactionAmount","text",amount);
			formModel.setViewAttributeByProperty("transactionName","text",BillPayTransactionData.payeeNickName);
			formModel.setViewAttributeByProperty("transactionFrom","text",BillPayTransactionData.fromAccountName);
              
    	formModel.setViewAttributeByProperty("MapedAmountLabel","text",BillPayTransactionData.transferAmount);
    	formModel.setViewAttributeByProperty("fromAccountNumberKA","text",BillPayTransactionData.payeeId);
    	formModel.setViewAttributeByProperty("fromAccountNameKA","text",BillPayTransactionData.payeeNickName);
    	formModel.setViewAttributeByProperty("fromAccNumberKA","text",BillPayTransactionData.fromAccountNumber);
    	var transferFormattedDate = getFormattedDateFromCalendarDate(BillPayTransactionData.transferDate);  
    	var backendDate=JSON.stringify(kony.retailBanking.util.formatingDate.getDBDateTimeFormat(BillPayTransactionData.transferDate,"00:00"));
    	backendDate=backendDate.replace(/['"]+/g, '');
    	formModel.setViewAttributeByProperty("mapedDateKA","text",backendDate);
        formModel.setViewAttributeByProperty("lblScheduledDate","text",kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(transferFormattedDate));
        
    	formModel.setViewAttributeByProperty("transactionType","text",BillPayTransactionData.transferTransactionType);
    	formModel.setViewAttributeByProperty("transactionId","text",BillPayTransactionData.transferTransactionID);
  }
}

function onConfirmPayBillEditButtonClick(){
    var receivedNavObject = getCustomInfoObject("frmConfirmPayBill", "BillPayTransactionData")
    navigateToNewBillPayForm("EditNewBillPay", receivedNavObject);
}

function detailsBillPayClick(data,state){
  var showState = "RepeatBillPay";
  var BillPayTransactionData={};
  var tempAmount=data.amount.slice(1, data.amount.length);
  tempAmount=""+parseInt(tempAmount.replace(/[^0-9-.]/g, ''));
  BillPayTransactionData.transferAmount = tempAmount;
  BillPayTransactionData.fromAccountName=data.fromNickName;
  BillPayTransactionData.fromAccountNumber=data.fromAccountNumber;
  BillPayTransactionData.fromAccountBalance=data.fromAccountBalance;
  BillPayTransactionData.fromAccountColor=getSkinColor(data.fromAccountType);
  BillPayTransactionData.payeeNickName=data.payeeNickName;
  BillPayTransactionData.payeeId=data.payeeId;
  BillPayTransactionData.transferTransactionID=data.transactionId;
  BillPayTransactionData.transferTransactionType=data.transactionType;
  var date=new Date();
  BillPayTransactionData.transferDate=[date.getDate(),(date.getMonth())+1,date.getFullYear(),0,0,0];
  if(state=="EditExistingTransfer"){
    date = data.scheduledDate;
   	var year = date.slice(0,4);
    var month = date.slice(5,7);
    var day = date.slice(8,10);
  	BillPayTransactionData.transferDate= [parseFloat(day), parseFloat(month), parseFloat(year), 0.0, 0.0, 0.0];
    showState="EditExistingBillPay"
  }
  navigateToNewBillPayForm(showState, BillPayTransactionData);
  
}

function goBackInBetweenBillPay(){
  if(BillPayfromForm==="NewBillPay"){
    getTransferPayLandingForm("frmTransferPayLandingKA");
  }
  else if(BillPayfromForm==="ManagePayee"){
    showFormManagePayeeList();   
  }
}
function fromManagePayeetoBillPay(){
    BillPayfromForm="ManagePayee";
  	var  newTransferTransactionData={};
   	var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmPayeeDetailsKA");
    var listController = INSTANCE.getFormController("frmPayeeTransactionsKA");
    var controllerContextData= listController.getContextData();
    if( controllerContextData && controllerContextData.getCustomInfo("selectedPayeeObj")){
         var payeeDetails =  controllerContextData.getCustomInfo("selectedPayeeObj");
         newTransferTransactionData.payeeNickName = payeeDetails["payeeNickName"];
    	 newTransferTransactionData.payeeId = payeeDetails["payeeId"];         
        }
  navigateToNewBillPayForm("SpecifiedPayee",newTransferTransactionData);
}

function getFilteredBillPayAccounts(fromAccountsData,data){
   var fromProcessData = data.segInternalFromAccountsKA.segInternalFromAccountsKA.getData();
  var fromData = [];
  for(var i in fromAccountsData)
  {    
    if(fromAccountsData[i]["supportBillPay"]==="1")
    {
      if( fromAccountsData[i]["nickName"]!== null|| fromAccountsData[i]["nickName"]!== "")
        fromProcessData[i]["accountName"] = fromAccountsData[i]["nickName"];

      fromProcessData[i]["availableBalance"] = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(fromAccountsData[i]["availableBalance"],kony.retailBanking.globalData.globals.CurrencyCode);
      fromProcessData[i]["sknColor"]= {skin:getSkinColor(fromAccountsData[i]["accountType"])};
      fromProcessData[i]["sknRowSepColor"] = {skin: sknCopyslFbox0a29a14ecfe6442};
      fromData.push(fromProcessData[i]);
      
    }
  }
      fromdatalength = fromData.length;
	  return fromData;
}

function editedPayeeBillPay(){
      BillPayfromForm="ManagePayee";
   var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var listController = INSTANCE.getFormController("frmEditPayeeKA");
	    var controllerContextData= listController.getContextData();
        if( controllerContextData && controllerContextData.getCustomInfo("payeeObjectEdited")){
         var payeeDetails =  controllerContextData.getCustomInfo("payeeObjectEdited");
          var newTransferTransactionData={};
          newTransferTransactionData.payeeNickName = payeeDetails["payeeNickName"];
    	 newTransferTransactionData.payeeId = payeeDetails["payeeId"];  
          navigateToNewBillPayForm("SpecifiedPayee",newTransferTransactionData); 
        }
}

function newPayeeAddedBillPay(fromForm){
      BillPayfromForm=fromForm;
   var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var listController = INSTANCE.getFormController("frmAddNewPayeeKA");
      var controllerContextData= listController.getContextData();
        if( controllerContextData && controllerContextData.getCustomInfo("payeeObject")){
         var payeeDetails =  controllerContextData.getCustomInfo("payeeObject");
          var newTransferTransactionData={};
          newTransferTransactionData.payeeNickName = payeeDetails["payeeNickname"];
       newTransferTransactionData.payeeId = payeeDetails["payeeId"];  
          navigateToNewBillPayForm("SpecifiedPayee",newTransferTransactionData); 
        }
}