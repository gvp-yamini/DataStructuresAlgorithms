var newTransferFromAccId;
var newTransferToAccId;

var recurrenceNumberSelectedFlag = 0;
var recurrenceDateRangeSelectedFlag = 0;
var recurrenceNumberOfTimes;

//Account Refreshing
function fetchAcoountsRefreshData(){
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
  modelObj.fetch(serviceOptions, dataSuccessFetchAccount, customErrorCallback);


  function dataSuccessFetchAccount(response){
    kony.retailBanking.globalData.accounts.setAccountsData(response);  
  }
}

/**
 used To Get TransferPayLandingPage
*/
function getTransferPayLandingForm(form)
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController(form);
  var navObject = new kony.sdk.mvvm.NavigationObject();
  navObject.setRequestOptions("recentTransactions",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  listController.performAction("navigateTo",[form,navObject]);
  //return;
}
/**
  Used To Naviagte the TransferPayLanding Page to TransactionDetais Page
*/
function navigateToTransactionDetails(fromForm,toForm,segName){
  BillPayfromForm="NewBillPay";
  frmRecentTransactionDetailsKA.repeatTransactionButton.isVisible = true;
  frmRecentTransactionDetailsKA.Copydivider06e184b7d586e4a.isVisible = true;
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController(fromForm);
  var viewModel = controller.getFormModel();
  var index = viewModel.getViewAttributeByProperty(segName, "selectedRowIndex");
  var response = [];
  frmRecentTransactionDetailsKA.lblseletedIndex.text=index[1];
  var selectedTransactionRecord = getSelectedTransactionRecord(index[1],fromForm,segName);
  var navigationObject = new kony.sdk.mvvm.NavigationObject();
  response = kony.retailBanking.globalData.transfers.getTransfersData(segName);
  navigationObject.setCustomInfo("selectedTransactionObj",response[index[1]]); 
  navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  controller.performAction("navigateTo",[toForm,navigationObject]);
}

/**
  Used To getSelected Transaction Reccord
*/
function getSelectedTransactionRecord(index,formName,segmentName){
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

/**

*/
function backToTransferPayLandingPage(formName)
{
	goBackInBetweenBillPay();
}
/**
  Used to get Paticular Transaction Details
*/

function getTransactionRowData(Data,navigationObject)
{
  var transactionDetails = [];
  transactionDetails.push(navigationObject);
  return navigationObject; 
}


/**
  Used to setTransactionList in TransferPayLanding Page
*/

function setTransferListData(Data,recSeg)
{
  var transacData = Data[recSeg]; 
  var recentSegData = [];
  var scheduleSegData = [];
  for(var i in transacData)
  {   
    var status = transacData[i]["statusDescription"];
    if(transacData[i]["statusDescription"] === kony.retailBanking.globalData.globals.Failed) 
    {
      transacData[i]["statusDescription"] = {
        "isVisible": true,
        src :"failedimage.png"
      }; 
    } else
    {
      transacData[i]["statusDescription"] = {
        "isVisible": false,
        src :"failedimage.png"
      };
    }
    if(status !== kony.retailBanking.globalData.globals.Failed) 
    {
      if(transacData[i]["frequencyType"] !==undefined && transacData[i]["frequencyType"] !== "Once") 
      {
        transacData[i]["hasDepositImage"] = {
          "isVisible": true,
          src :"recuurencebox.png"
        }; 
      } else
      {
        transacData[i]["hasDepositImage"] = {
          "isVisible": false,
          src :"recuurencebox.png"
        };
      }
    }else
    {
      if(transacData[i]["frequencyType"] !==undefined) 
      {
        transacData[i]["hasDepositImage"] = {
          "isVisible": false,
          src :"recuurencebox.png"
        };
      }

    }

    if(transacData[i]["transactionType"] !== kony.retailBanking.globalData.globals.Deposit)
    {
      transacData[i]["amount"] = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(transacData[i]["amount"]);
      if(transacData[i]["isScheduled"]==="false")
	  {
		  transacData[i]["transactionDate"] = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(transacData[i]["transactionDate"]);
		  recentSegData.push(transacData[i]);
	  }      
      else
	  {
		  transacData[i]["transactionDate"] = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(transacData[i]["scheduledDate"]);
		  scheduleSegData.push(transacData[i]);
	  }
        
    }

  }

  if(recentSegData.length == 0)
  {
    frmTransferPayLandingKA.recentTransactions.setVisibility(false);
    frmTransferPayLandingKA.lblAlerts.setVisibility(true);
  }
  else
  {
    frmTransferPayLandingKA.recentTransactions.setVisibility(true);
    frmTransferPayLandingKA.lblAlerts.setVisibility(false);
  }


  if(scheduleSegData.length == 0)
  {
    frmTransferPayLandingKA.scheduledTransactions.setVisibility(false);
    frmTransferPayLandingKA.lblAlerts2.setVisibility(true);
  }
  else
  {
    frmTransferPayLandingKA.scheduledTransactions.setVisibility(true);
    frmTransferPayLandingKA.lblAlerts2.setVisibility(false);
  }

  return [recentSegData,scheduleSegData];
}

/**
 Used to get From Details From Segement.
*/
function getSegInternalAccountsKARecordClick(segName,fromForm, whatForm, whatType)
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController(fromForm);
  var viewModel = controller.getFormModel();
  var index = viewModel.getViewAttributeByProperty(segName, "selectedRowIndex");
  var selIndex = Math.floor(index[1]);
  var selectedAccountRecord  = whatForm[segName].selectedRowItems[0];
  
  /* Cleaned up code after refactoring */
  if(fromForm == "frmNewTransferKA" )
    frmNewTransferKA.lblTransactionType.text = kony.retailBanking.globalData.globals.TransferMoney;
  else if(fromForm == "frmNewPayPersonKA")
    frmNewPayPersonKA.lblTransactionType.text = kony.retailBanking.globalData.globals.PayPerson;
  setSelectedAccountData(whatForm, whatType, selectedAccountRecord.accountName,
                        selectedAccountRecord.availableBalance, selectedAccountRecord.accountID, 
                        selectedAccountRecord.sknColor.skin, "INTERNAL");
  return selIndex;
}


/**
Used To Navigate The ConfirmTransfer
*/
function newConfirmAccountTransfer(fromForm,toForm)
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController(fromForm);
  var viewModel = controller.getFormModel();
  var amount = viewModel.getViewAttributeByProperty("amountTextField","text");
  var fromAccountBal =   viewModel.getViewAttributeByProperty("fromAmountPick","text");
  fromAccountBal = fromAccountBal.slice(2);
  var fromIndex = viewModel.getViewAttributeByProperty("segInternalFromAccountsKA", "selectedRowIndex");
  var toIndex = viewModel.getViewAttributeByProperty("segInternalTOAccountsKA", "selectedRowIndex");
  var fromAccountNumber =  viewModel.getViewAttributeByProperty("fromlblAccountNumberKA","text");
  var toAccountNumber =    viewModel.getViewAttributeByProperty("tolblAccountNumberKA","text");

  if(fromAccountNumber !== "" && toAccountNumber !== ""){

    if(fromAccountNumber === toAccountNumber)
    {
      alert("We can't transfer Same Accounts");
    }else{
      var validated = validateDecimals(amount);
      amount = amount;
      if((amount===null) || (amount==="") || (Number(amount)< 1))
      {
        alert("Entered amount is Not Valid");
      }else if(validated) //if((Number(amount)<=Number(fromAccountBal)))
      {
        var listController = INSTANCE.getFormController("frmConfirmTransferKA");
        var navigationObject = new kony.sdk.mvvm.NavigationObject();
        var datamodelflxAddressKA = new kony.sdk.mvvm.DataModel();
        if(frmNewTransferKA.lblTransactionIdKA.text == null || frmNewTransferKA.lblTransactionIdKA.text == "")  {
          navigationObject.setDataModel(null,kony.sdk.mvvm.OperationType.ADD, "form");
          navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
        }else  {
          navigationObject.setDataModel(null, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
          navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"transactionId": frmNewTransferKA.lblTransactionIdKA.text}});
        }
        var newTransferTransactionData = constructNewTransferTransactionObject();
        navigationObject.setCustomInfo("newTransferTransactionData", newTransferTransactionData);
        listController.performAction("navigateTo",["frmConfirmTransferKA",navigationObject]);
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
  }else if(fromAccountNumber !=="" && toAccountNumber === ""){
    alert("Please Select To Account");
  }else if(fromAccountNumber ==="" && toAccountNumber !== ""){
    alert("Please Select From Account");
  }else{
    alert("Please select From and To accounts");
  }
}

/* Added the setting of sknRowSepColor as a part of refactoring */
function getFilteredFromAndToAccountsBySkin(fromAccountsData,data)
{
  var fromProcessData = data.segInternalFromAccountsKA.segInternalFromAccountsKA.getData();
  var fromData = [];
  var toData = [];
  for(var i in fromAccountsData)
  {
    
    if(fromAccountsData[i]["supportTransferFrom"]==="1"&&fromAccountsData[i]["supportTransferTo"]==="1")
    {
      if( fromAccountsData[i]["nickName"]!== null|| fromAccountsData[i]["nickName"]!== "")
        fromProcessData[i]["accountName"] = fromAccountsData[i]["nickName"];

      fromProcessData[i]["availableBalance"] = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(fromAccountsData[i]["availableBalance"],kony.retailBanking.globalData.globals.CurrencyCode);
      fromProcessData[i]["sknColor"]= {skin:getSkinColor(fromAccountsData[i]["accountType"])};
      fromProcessData[i]["sknRowSepColor"] = {skin: sknCopyslFbox0a29a14ecfe6442};
      fromData.push(fromProcessData[i]);
      toData.push(fromProcessData[i]); 
    }else if(fromAccountsData[i]["supportTransferFrom"]==="1")
    {
      if( fromAccountsData[i]["nickName"]!== null|| fromAccountsData[i]["nickName"]!== "")
        fromProcessData[i]["accountName"] = fromAccountsData[i]["nickName"];
      fromProcessData[i]["availableBalance"] = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(fromAccountsData[i]["availableBalance"],kony.retailBanking.globalData.globals.CurrencyCode);
      fromProcessData[i]["sknColor"]= {skin:getSkinColor(fromAccountsData[i]["accountType"])};
	  fromProcessData[i]["sknRowSepColor"] = {skin:sknCopyslFbox0a29a14ecfe6442};
      fromData.push(fromProcessData[i]);
    }else if(fromAccountsData[i]["supportTransferTo"]==="1")
    {
      if( fromAccountsData[i]["nickName"]!== null|| fromAccountsData[i]["nickName"]!== "")
        fromProcessData[i]["accountName"] = fromAccountsData[i]["nickName"];
      fromProcessData[i]["availableBalance"] = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(fromAccountsData[i]["availableBalance"],kony.retailBanking.globalData.globals.CurrencyCode);      
      fromProcessData[i]["sknColor"]= {skin:getSkinColor(fromAccountsData[i]["accountType"])};
      fromProcessData[i]["sknRowSepColor"] = {skin:sknCopyslFbox0a29a14ecfe6442};
      toData.push(fromProcessData[i]); 
    }
  }
  fromdatalength = fromData.length;
  todatalength = toData.length;
  return [fromData,toData];
}

function getFilteredFromAndToAccounts(fromAccountsData)
{
  var fromData = [];
  var toData = [];
  for(var i in fromAccountsData)
  {
    if(fromAccountsData[i]["supportTransferFrom"]==="1"&&fromAccountsData[i]["supportTransferTo"]==="1")
    {
      fromAccountsData[i]["availableBalance"] = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(fromAccountsData[i]["availableBalance"],kony.retailBanking.globalData.globals.CurrencyCode);
      fromData.push(fromAccountsData[i]);
      toData.push(fromAccountsData[i]); 
    }else if(fromAccountsData[i]["supportTransferFrom"]==="1")
    {
      fromAccountsData[i]["availableBalance"] = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(fromAccountsData[i]["availableBalance"],kony.retailBanking.globalData.globals.CurrencyCode);
      fromData.push(fromAccountsData[i]);
    }else if(fromAccountsData[i]["supportTransferTo"]==="1")
    {
      fromAccountsData[i]["availableBalance"] = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(fromAccountsData[i]["availableBalance"],kony.retailBanking.globalData.globals.CurrencyCode);      
      toData.push(fromAccountsData[i]); 
    }
  }
  return [fromData,toData];
}

function CancelAlertFunction(res)
{
  if(res)
  {
    //frmNewTransferKA.editToCard.setVisibility(true);
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var listController = INSTANCE.getFormController("frmRecentTransactionDetailsKA");
    listController.performAction("deleteData"); 
  }
}

//Fetch ExternalAccount Data
function fetchExternalAccountData(showState, transactionObject){
  kony.print("Perf Log: fetch External account service call - Start");
  ShowLoadingScreen();
  var resData = [];
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
	kony.print("Perf Log: fetch External account service call - End");
    externaldatalength = response.length;
    kony.print("External account length = " + externaldatalength);
    var rowData;
    var contactName;
    frmNewTransferKA.segExternalTOAccountsKA.widgetDataMap={
      lblContact:"nickName",
      lblAccountNumberKA : "accountNumber",
      lblRowSeparator: "rowSeparator"
    };

    for(var i=0;i< response.length;i++)
    {       
      if(response[i].nickName === "" || response[i].nickName ==null)
      {
        //response[i].nickName = response[i].beneficiaryName;
        contactName = response[i].beneficiaryName;
      }
      else /* Added code to set rowSeparator as a part of refactoring */
        contactName = response[i].nickName;
      rowData = {"nickName": contactName, "accountNumber": response[i].accountNumber,
                "rowSeparator":{skin: sknCopyslFbox0a29a14ecfe6442}
                };
      
      resData.push(rowData);
    }
    frmNewTransferKA.segExternalTOAccountsKA.setData(resData);
    syncNavigation(showState, transactionObject);
   // kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
  }
}

function setExtrenalToAccountTransfer(fromForm)
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController(fromForm);
  var viewModel = controller.getFormModel();
  frmNewTransferKA.lblTransactionType.text = kony.retailBanking.globalData.globals.ExternalTransfer;
  setSelectedAccountData(frmNewTransferKA, "to", frmNewTransferKA.segExternalTOAccountsKA.selectedRowItems[0].nickName,
                        null, frmNewTransferKA.segExternalTOAccountsKA.selectedRowItems[0].accountNumber, 
                        null, "EXTERNAL"); 
}


function unSelectSameAccount()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmNewTransferKA");
  var viewModel = controller.getFormModel();
  var fromAccountNumber =  viewModel.getViewAttributeByProperty("fromlblAccountNumberKA","text");
  var toAccountNumber =    viewModel.getViewAttributeByProperty("tolblAccountNumberKA","text");
  if(fromAccountNumber !== "" && toAccountNumber !== ""){

    if(fromAccountNumber === toAccountNumber)
    {
      alert("From Account and To Account can't be same");
    }
  }
}

/************ Start of refactoring ********************/

/* Utility function to navigate to NewTransferForm from different places. showState indicates how
   we are coming here and transactionObject indicates if there is existing transaction data available
   for the transfer */
function navigateToNewTransferForm(showState, transactionObject){
    /* As we are not allowing editing of the To field only in EditExistingTransfer scenario */
    if(showState !== "EditExistingTransfer")
        fetchExternalAccountData(showState,transactionObject);
    else{
      syncNavigation(showState, transactionObject);
    }
    
}

function syncNavigation(showState, transactionObject){
    ShowLoadingScreen();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var listController = INSTANCE.getFormController("frmNewTransferKA");
    var navObject = new kony.sdk.mvvm.NavigationObject();
    navObject.setCustomInfo("showState",showState);
    if(showState !== "InitialLanding")
        navObject.setCustomInfo("newTransferTransactionData",transactionObject);
    navObject.setRequestOptions("segInternalFromAccountsKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
    listController.performAction("navigateTo",["frmNewTransferKA",navObject]);
}

/* Utility function to set the selected data within the from/to 'Pick' container */
function setSelectedAccountData(whatForm, whatType, accountName, accountBalanceAmount, accountNumber, accountSkin, accountType){
  whatForm[whatType + "NamePick"].text = accountName; 
  whatForm[whatType + "lblAccountNumberKA"].text = accountNumber;
  
  if(accountType === "INTERNAL"){
    whatForm[whatType + "AccountBankNameKA"].text = kony.retailBanking.globalData.globals.BankName;
    whatForm[whatType + "AccountColorPick"].skin = accountSkin;
    whatForm[whatType + "AccountAmountContainer"].opacity = 1;
    whatForm[whatType + "AmountPick"].text = accountBalanceAmount;
  }
  else{
    whatForm[whatType + "AccountBankNameKA"].text = "";
    whatForm[whatType + "AccountColorPick"].skin = null;
    whatForm[whatType + "AccountAmountContainer"].opacity = 0;
  }
}

/* Based on the selection index will tick the appropriate segment row in the frequency selection container */
function setFrequencyCardSelection(whatForm, selectionIndex){
    var frequencyCardData = [];
    var imgIcon = "";
    for (i=0; i<frequencyOptions.length;i++){
        if(i === selectionIndex)
            imgIcon = "check_blue.png"
        else
            imgIcon = "";
        if(i != frequencyOptions.length-1)
            frequencyRow = {"lblNameKA": frequencyOptions[i], "contactListDivider":{skin:sknCopyslFbox0a29a14ecfe6442}, "imgicontick":{src:imgIcon}};
        else
            frequencyRow = {"lblNameKA": frequencyOptions[i], "contactListDivider":{skin:null}, "imgicontick":{src:imgIcon}};
        frequencyCardData.push(frequencyRow);
    }
    whatForm["segFrequency"].setData(frequencyCardData);
}


/* The frequency container is always in selected mode. But still...who knows in the future */
function setFrequencyCard(showState){
    setFrequencyContainerState(frmNewTransferKA, "SELECTED", frmNewTransferKA.frequencyPick.height);
}

/* We can technically set the recurrence container state based on the selected frequency. However not sure how it
   should play out if frequency is selected and then the user adds an external account and then comes back 
   So let us leave it based on the showState for now */
function setRecurrenceCard(showState){
    if(showState === "InitialLanding" || showState === "ExternalAccountAdded"){
        setRecurrenceContainerState(frmNewTransferKA, "INVISIBLE", "0dp");
    }
    else if(showState === "EditExistingTransfer" || showState === "EditNewTransfer" ||
        showState === "RepeatTransfer"){
        var index = getFrequencyIndex(frmNewTransferKA.frequencyPickLabel.text);
        if(index === 0){
            setRecurrenceContainerState(frmNewTransferKA, "INVISIBLE", "0dp");
        }
        else{
            setRecurrenceContainerState(frmNewTransferKA, "SELECTED", frmNewTransferKA.recurrencePick.height);
        }
    }
     
}

/* The from container state is determined based on how we arrive on this page */
function setFromContainerAttributes(showState){
    if(showState === "InitialLanding" || showState === "ExternalAccountAdded"){
        var settingsObj = kony.store.getItem("settingsflagsObject");
        var preferedSelAcnt=kony.retailBanking.globalData.accounts.searchAccountById(settingsObj.DefaultTransferAcctNo);  
        if(preferedSelAcnt !==""){
            setContainerState(frmNewTransferKA,"from","INTERNAL_SELECTED", defaultCardHeight);
        }     
        else{
            setContainerState(frmNewTransferKA,"from","INITIAL_EXPANDED", fromCardHeight); 
        }
    }
    if(showState === "EditExistingTransfer" || showState === "EditNewTransfer" ||
        showState === "RepeatTransfer"){
        // From account data has already been set, so just set container state
        setContainerState(frmNewTransferKA,"from","INTERNAL_SELECTED", defaultCardHeight);
    }
}

/* The to container state is determined based on how we arrive on this page */
function setToContainerAttributes(showState){
    frmNewTransferKA.editToCard.setVisibility(true);
    if(showState === "InitialLanding"){
        setContainerState(frmNewTransferKA,"to","INITIAL_EXPANDED", toCardHeight);
    }
    if(showState === "ExternalAccountAdded" || showState === "EditExistingTransfer" || showState === "EditNewTransfer" ||
        showState === "RepeatTransfer"){
        // To account data has already been set, so just set container state
        // Also INTERNAL and EXTERNAL SELECTED does have an effect on the state
        setContainerState(frmNewTransferKA,"to","INTERNAL_SELECTED", defaultCardHeight);
        if(showState === "EditExistingTransfer"){
            frmNewTransferKA.editToCard.setVisibility(false);
        }
    }
}

/* Adjusts positional/dimensional/visibility parameters of UI elements in the frequency container to reflect the
   container state */
function setFrequencyContainerState(whatForm, state, height){
    if(state === "SELECTED"){
        whatForm["frequencyCard"].height = height;
        whatForm["frequencyCardInner"].opacity = 0;
        whatForm["frequencyCardInner"].top = "100%";
        whatForm["frequencyPick"].opacity = 1;
        whatForm["frequencyPickContainer"].top = "0%";
        whatForm["frequencyLabel"].left = transferLeft;        
    }
    else if(state === "EXPANDED"){
        whatForm["frequencyCard"].height = height;
        whatForm["frequencyPick"].opacity = 0;
        whatForm["frequencyLabel"].left = "-50dp";
        whatForm["frequencyPickContainer"].top = "100%";
        whatForm["frequencyCardInner"].opacity = 1;
        whatForm["frequencyCardInner"].left = "3%";
        whatForm["frequencyCardInner"].top = "60dp";
        whatForm["frequencyCardInner"].skin = skntransferCardInner;
    }
}

/* Adjusts positional/dimensional/visibility parameters of UI elements in the recurrence container to reflect the
   container state */
function setRecurrenceContainerState(whatForm, state, height){
    if(state === "INVISIBLE"){
        whatForm["recurrenceCard"].height = "0dp";
        whatForm["recurrenceCardInner"].opacity = 0;
        whatForm["recurrenceCardInner"].top = "100%";
        whatForm["recurrencePick"].opacity = 1;
        whatForm["recurrencePickContainer"].top = "0%";
        whatForm["recurrenceLabel"].left = transferLeft;
    }
    else if(state === "SELECTED"){
        whatForm["recurrenceCard"].height = height;
        whatForm["recurrenceCardInner"].opacity = 0;
        whatForm["recurrenceCardInner"].top = "100%";
        whatForm["recurrencePick"].opacity = 1;
        whatForm["recurrencePickContainer"].top = "0%";
        whatForm["recurrenceLabel"].left = transferLeft;        
    }
    else if(state === "EXPANDED"){
        whatForm["recurrenceCard"].height = height;
        whatForm["recurrencePick"].opacity = 0;
        whatForm["recurrenceLabel"].left = "-50dp";
        whatForm["recurrencePickContainer"].top = "100%";
        whatForm["recurrenceCardInner"].opacity = 1;
        whatForm["recurrenceCardInner"].left = "3%";
        whatForm["recurrenceCardInner"].top = "60dp";
        whatForm["frequencyCardInner"].skin = skntransferCardInner;
 
    }
}

/* Adjusts positional/dimensional/visibility parameters of UI elements in the from/to container to 
   reflect the container state */

function setContainerState(whatForm, whatContainer, state, height) {
  if (state === "INTERNAL_SELECTED" || state === "EXTERNAL_SELECTED"){
    whatForm[whatContainer + "Card"].height = height;
    whatForm[whatContainer + "CardInner"].opacity = 0;
    whatForm[whatContainer + "AccountNameContainer"].top = "0%";
      if(whatForm!=frmNewBillKA || whatContainer !="to")
    whatForm[whatContainer + "AccountAmountContainer"].top = "0%";
    whatForm[whatContainer + "Label"].left = transferLeft;
    whatForm[whatContainer + "AccountPick"].opacity = 1;
  }
  else if (state === "INITIAL_EXPANDED") {
    whatForm[whatContainer + "AccountPick"].opacity = 0;
    whatForm[whatContainer + "AccountNameContainer"].top = "100%";
    if(whatForm!=frmNewBillKA || whatContainer !="to")
      whatForm[whatContainer + "AccountAmountContainer"].top = "100%";
    whatForm[whatContainer + "Label"].left = "-50dp";
    whatForm[whatContainer+ "Card"].height = height;

    whatForm[whatContainer + "CardInner"].opacity = 1;
    whatForm[whatContainer + "CardInner"].left = "3%";
    whatForm[whatContainer + "CardInner"].top = "60dp";
    whatForm[whatContainer + "CardInner"].skin = skntransferCardInner;

  }
  else if (state === "ANIMATION_EXPAND"){
    animationExpandContainer(whatForm, whatContainer, height, skntransferCardInner);
  }
  else if(state === "ANIMATION_COLLAPSE"){
    animationCollapseContainer(whatForm, whatContainer, height, skntransferCardInner);
  }
}

/* Called on form pre-show */
function newTransferPreShow(){

  var showState = "InitialLanding";
  var navTransferTransactionData;
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmNewTransferKA");
  var controllerContextData= controller.getContextData();
  if(controllerContextData && controllerContextData.getCustomInfo("showState")){
    showState = controllerContextData.getCustomInfo("showState");
  }
  if(controllerContextData && controllerContextData.getCustomInfo("newTransferTransactionData")){
    navTransferTransactionData = controllerContextData.getCustomInfo("newTransferTransactionData");
  }
  
  /* First set data for all the UI elements on the New Transfer form */
  setDataUIElementsOnNewTransferForm(navTransferTransactionData, showState);
  
  var viewModel = controller.getFormModel();
  /* Old code. Sets the bank name retreived from global data */
  viewModel.setViewAttributeByProperty("fromAccountBankNameKA","text",kony.retailBanking.globalData.globals.BankName);
  viewModel.setViewAttributeByProperty("CopyLabel03e39ab4661a845","text",kony.retailBanking.globalData.globals.BankName);
  viewModel.setViewAttributeByProperty("Label0cecf1132bf8049","text",kony.retailBanking.globalData.globals.BankName); 
  
  /* Calculates the height of all the containers */
  calculateNewTransferAccountCardHeights();
  
  /* Determine the state of all the containers */
  setFromContainerAttributes(showState);
  setToContainerAttributes(showState);
  setFrequencyCard(showState);
  setRecurrenceCard(showState);

  /* Set the title bar */
  frmNewTransferKA.transferPayTitleLabel.text="New Transfer";
  if (showState === "EditExistingTransfer")
     frmNewTransferKA.transferPayTitleLabel.text="Edit Transfer"; 
}

/* On selecting a row within the frequency container */
function onFrequencyCardSelection(){
    var selectedIndex = frmNewTransferKA.segFrequency.selectedRowIndex[1];
    setFrequencyCardSelection(frmNewTransferKA, selectedIndex);
    frmNewTransferKA.frequencyPickLabel.text = frequencyOptions[selectedIndex];
    newTransferFrequencyMadePick(frmNewTransferKA.frequencyPick.height);
    if(selectedIndex != 0){
        newTransferRecurrenceEdit(recurrenceCardHeight);
    }
    else{
        setRecurrenceCard("InitialLanding");
    }
    
}

/* On clicking edit button in frequency container */
function onFrequencyCardSelectionEdit(){
    newTransferFrequencyEdit(freqCardHeight);
}

/* On clicking edit button in recurrence container */
function onRecurrenceCardSelectionEdit(){
    newTransferRecurrenceEdit(recurrenceCardHeight);
}

/* On done event of textbox for selecting number of recurrences in recurrency container */
function onRecurrenceNumberOfTimesSelection(){
    recurrenceNumberOfTimes = frmNewTransferKA.tbxNumberOfTimes.text.trim();
    frmNewTransferKA.recurrencePickLabel.text = frmNewTransferKA.tbxNumberOfTimes.text;
    recurrenceNumberSelectedFlag = 1;
    recurrenceDateRangeSelectedFlag = 0;
    newTransferRecurrenceMadePick(frmNewTransferKA.recurrencePick.height);
}

/* On done event of toRecurrenceCalendar for selecting date range in recurrency container */
function onRecurrenceDateRangeSelection(){
    var dateRangeString = "";
    var fromRecurrenceFormattedDate = getFormattedDateFromCalendarDate(frmNewTransferKA.calRecurrenceFrom.dateComponents);
    var fromRecurrenceDate = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(fromRecurrenceFormattedDate);
    var toRecurrenceFormattedDate = getFormattedDateFromCalendarDate(frmNewTransferKA.calRecurrenceTo.dateComponents);
    var toRecurrenceDate = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(toRecurrenceFormattedDate);
    dateRangeString = fromRecurrenceDate + "  to  " + toRecurrenceDate;
    recurrenceNumberSelectedFlag = 0;
    recurrenceDateRangeSelectedFlag = 1;
    frmNewTransferKA.recurrencePickLabel.text = dateRangeString;
    newTransferRecurrenceMadePick(frmNewTransferKA.recurrencePick.height);
}

/* On click of Edit button on Confirm transaction form. The passed in navigation object is passed back */
function onConfirmFormEditButtonClick(){
    var receivedNavObject = getCustomInfoObject("frmConfirmTransferKA", "newTransferTransactionData")
    navigateToNewTransferForm("EditNewTransfer", receivedNavObject);
}

/* On the RecentTransactionDetail form, sets data that is common to both a scheduled and non-scheduled transaction 
   for transfers, P2P and BillPay */
function setCommonUIDataOnRecentTransactionDetailsForm(transactionData){
    frmRecentTransactionDetailsKA.transactionId.text = transactionData.transactionId;
    frmRecentTransactionDetailsKA.transactionType.text = transactionData.transactionType;
    frmRecentTransactionDetailsKA.transactionAmount.text = transactionData.amount;
    if(transactionData.fromNickName){
      frmRecentTransactionDetailsKA.transactionFrom.text = transactionData.fromNickName;
    }
    else{			
      frmRecentTransactionDetailsKA.transactionFrom.text = transactionData.fromAccountType+"-"+transactionData.fromAccountNumber.slice(-4);
    }
    frmRecentTransactionDetailsKA.lblNotesLabelKA.text = "Notes ";
    if(transactionData.transactionsNotes){
      frmRecentTransactionDetailsKA.transactionNotes.text = transactionData.transactionsNotes;
    }
    else{
      frmRecentTransactionDetailsKA.transactionNotes.text = "";
    }
}

/* On the RecentTransactionDetail form, sets data that is unique to a non-scheduled transaction 
   for transfers, P2P and BillPay */
function setCommonUINonScheduledDataOnRecentTransactionDetailsForm(transactionData){
    var userAgent = kony.os.userAgent();
    if(userAgent === "iPhone"){
      frmRecentTransactionDetailsKA.transferPayTitleLabel.text = "Recent Transactions";
    }
    else{
      frmRecentTransactionDetailsKA.androidTitleLabel.text = "Recent Transactions";
    }
    frmRecentTransactionDetailsKA.lblTransactionDateKA.text = "Transaction Date";
    frmRecentTransactionDetailsKA.btnEditKA.setVisibility(false);
    frmRecentTransactionDetailsKA.flxReccurrence.setVisibility(false);
    frmRecentTransactionDetailsKA.lblTransactionDateValueKA.text = transactionData.transactionDate;
}

/* On the RecentTransactionDetail form, sets data that is unique to a scheduled transaction 
   for transfers, P2P and BillPay */
function setCommonUIScheduledDataOnRecentTransactionDetailsForm(transactionData){
    var userAgent = kony.os.userAgent();
    if(userAgent === "iPhone"){
      frmRecentTransactionDetailsKA.transferPayTitleLabel.text = "Scheduled Transactions ";
    }
    else{
      frmRecentTransactionDetailsKA.androidTitleLabel.text = "Scheduled Transactions ";
    }
    frmRecentTransactionDetailsKA.lblTransactionDateKA.text = "Scheduled For";
    frmRecentTransactionDetailsKA.btnEditKA.setVisibility(true);
    frmRecentTransactionDetailsKA.flexNotesContainer.setVisibility(true);
    frmRecentTransactionDetailsKA.flxReccurrence.setVisibility(false);
    frmRecentTransactionDetailsKA.lblReccurrenceNumberKA.setVisibility(false);
    var tempDate = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(transactionData.scheduledDate);
    frmRecentTransactionDetailsKA.lblTransactionDateValueKA.text = tempDate;
}

/* Set UI elements on RecentTransactionDetails form for an internal/external transfer */
function setTransferUIDataOnRecentTransactionDetailsForm(transactionData){
    
    setCommonUIDataOnRecentTransactionDetailsForm(transactionData);
    var toAccountName  = transactionData.toAccountName;
    
    if(transactionData.transactionType === kony.retailBanking.globalData.globals.TransferMoney){
        toAccountName = toAccountName+"-"+transactionData.toAccountNumber;
        frmRecentTransactionDetailsKA.transactionName.text = toAccountName;
    }
    else if(transactionData.transactionType === kony.retailBanking.globalData.globals.ExternalTransfer){
      frmRecentTransactionDetailsKA.transactionName.text = toAccountName;
    }
        
    frmRecentTransactionDetailsKA.lblP2PContactKA.setVisibility(false);
    frmRecentTransactionDetailsKA.transactionTypeString.text = "Transfer to";
    frmRecentTransactionDetailsKA.repeatTransactionButton.text = "Repeat Transfer";
    frmRecentTransactionDetailsKA.flexNotesContainer.setVisibility(true);
    
    if(transactionData.isScheduled==="false"){
        setCommonUINonScheduledDataOnRecentTransactionDetailsForm(transactionData);
    }
    else{
        setCommonUIScheduledDataOnRecentTransactionDetailsForm(transactionData);        
        frmRecentTransactionDetailsKA.flexNotesContainer.setVisibility(true);
        frmRecentTransactionDetailsKA.flxReccurrence.setVisibility(true);
        var frequencyString = frequencyOptions[0];
        if(transactionData.frequencyType !== undefined){
            frequencyString = getFrequencyString(transactionData.frequencyType);
        }
        frmRecentTransactionDetailsKA.lblReccurrenceValueKA.text = frequencyString;
        if(frequencyString !== frequencyOptions[0]){
            frmRecentTransactionDetailsKA.lblReccurrenceNumberKA.setVisibility(true);
            if(transactionData.numberOfRecurrences !== undefined){            
              frmRecentTransactionDetailsKA.lblReccurrenceNumberKA.text = "Next " +transactionData.numberOfRecurrences + " time(s)";
            }
            if(transactionData.frequencyStartDate !== undefined){
              var tempFreqStartDate = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(transactionData.frequencyStartDate);
              var tempFreqEndDate = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(transactionData.frequencyEndDate);
              frmRecentTransactionDetailsKA.lblReccurrenceNumberKA.text = tempFreqStartDate +" to " +tempFreqEndDate;
            }
        }
        frmRecentTransactionDetailsKA.repeatTransactionButton.text = "Cancel Scheduled Transfer";
    }
    
}

/* Set UI elements on RecentTransactionDetails form for PayBill transfer */
function setPayBillUIDataOnRecentTransactionDetailsForm(transactionData){
    
    setCommonUIDataOnRecentTransactionDetailsForm(transactionData);
    
    frmRecentTransactionDetailsKA.transactionName.text = transactionData.payeeNickName; 
    frmRecentTransactionDetailsKA.lblP2PContactKA.setVisibility(false);
    frmRecentTransactionDetailsKA.transactionTypeString.text = "Bill Payment to";
    frmRecentTransactionDetailsKA.repeatTransactionButton.text = "Repeat Bill Pay";
    
    if(transactionData.isScheduled==="false"){
        setCommonUINonScheduledDataOnRecentTransactionDetailsForm(transactionData);
    }
    else{
        setCommonUIScheduledDataOnRecentTransactionDetailsForm(transactionData);                
        frmRecentTransactionDetailsKA.repeatTransactionButton.text = "Cancel Bill Pay";
    }
    frmRecentTransactionDetailsKA.flexNotesContainer.setVisibility(false);
}

/* Set UI elements on RecentTransactionDetails form for P2P transfer */
function setP2PUIDataOnRecentTransactionDetailsForm(transactionData){
    
    setCommonUIDataOnRecentTransactionDetailsForm(transactionData);
    
    frmRecentTransactionDetailsKA.lblP2PContactKA.setVisibility(true);
    if(transactionData.payPersonPhone){
        frmRecentTransactionDetailsKA.lblP2PContactKA.text = transactionData.payPersonPhone;
    }
    if(transactionData.payPersonName){
        frmRecentTransactionDetailsKA.transactionName.text = transactionData.payPersonName;
    }

    frmRecentTransactionDetailsKA.lblP2PContactKA.setVisibility(false);
    frmRecentTransactionDetailsKA.transactionTypeString.text = "P2P Transfer to";
    frmRecentTransactionDetailsKA.repeatTransactionButton.text = "Repeat Transfer";
    frmRecentTransactionDetailsKA.flexNotesContainer.setVisibility(true);
    
    if(transactionData.isScheduled==="false"){
        setCommonUINonScheduledDataOnRecentTransactionDetailsForm(transactionData);
    }
    else{
        setCommonUIScheduledDataOnRecentTransactionDetailsForm(transactionData);        
        frmRecentTransactionDetailsKA.repeatTransactionButton.text = "Cancel Scheduled Transfer";
    }    
}   

/* Set UI element data on frmNewTransferKAForm */
function setDataUIElementsOnNewTransferForm(newTransferTransactionData, showState){
   frmNewTransferKA.lblCurrencyType.text=  kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount("",kony.retailBanking.globalData.globals.CurrencyCode);
    
    /* A new transaction will be initiated. So initialize most of the data */  
    if(showState === "InitialLanding" || showState === "ExternalAccountAdded"){    
        var settingsObj = kony.store.getItem("settingsflagsObject");
        var preferedSelAcnt=kony.retailBanking.globalData.accounts.searchAccountById(settingsObj.DefaultTransferAcctNo);  
        frmNewTransferKA.lblTransactionType.text = kony.retailBanking.globalData.globals.TransferMoney;
        if(preferedSelAcnt !==""){
            var nickNameData = preferedSelAcnt.nickName;
            //Need To Get This From Service
            if(nickNameData.trim() === "")
                nickNameData = preferedSelAcnt.accountName;
            setSelectedAccountData(frmNewTransferKA, "from", nickNameData,
                    kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(preferedSelAcnt.availableBalance,kony.retailBanking.globalData.globals.CurrencyCode), 
                    preferedSelAcnt.accountID, 
                    getSkinColor(preferedSelAcnt.accountType), "INTERNAL");
        }
        if(showState === "ExternalAccountAdded"){
            frmNewTransferKA.lblTransactionType.text = kony.retailBanking.globalData.globals.ExternalTransfer;
            setSelectedAccountData(frmNewTransferKA, "to", newTransferTransactionData.toAccountName,
                    0, newTransferTransactionData.toAccountNumber, 
                    null, "EXTERNAL");
        }
        frmNewTransferKA.amountTextField.text="";
        frmNewTransferKA.lblTransferNotes.text ="";
        setCalendarDateToCurrentDate(frmNewTransferKA.calDateKA);
        frmNewTransferKA.frequencyPickLabel.text = frequencyOptions[0];
        setFrequencyCardSelection(frmNewTransferKA, 0);
        frmNewTransferKA.recurrencePickLabel.text = "";
        frmNewTransferKA.tbxNumberOfTimes.text = "";
        setCalendarDateToCurrentDate(frmNewTransferKA.calRecurrenceFrom);
        setCalendarDateToCurrentDate(frmNewTransferKA.calRecurrenceTo);
        recurrenceNumberSelectedFlag = 0;
        recurrenceDateRangeSelectedFlag = 0;
        frmNewTransferKA.lblTransactionIdKA.text = "";
    }

    /* An existing transaction is available, fill up data in the UI using the passed in navigation object */
    if (showState === "EditExistingTransfer" || showState === "EditNewTransfer" ||
        showState === "RepeatTransfer"){
        frmNewTransferKA.amountTextField.text = newTransferTransactionData.transferAmount;
        var transactionTypeString = "INTERNAL";
        if(newTransferTransactionData.transferTransactionType === 
            kony.retailBanking.globalData.globals.ExternalTransfer)
            transactionTypeString = "EXTERNAL";
         
        setSelectedAccountData(frmNewTransferKA, "to", newTransferTransactionData.toAccountName,
        newTransferTransactionData.toAccountBalance, newTransferTransactionData.toAccountNumber, 
        newTransferTransactionData.toAccountColor, transactionTypeString);        
        
        setSelectedAccountData(frmNewTransferKA, "from", newTransferTransactionData.fromAccountName,
        newTransferTransactionData.fromAccountBalance, newTransferTransactionData.fromAccountNumber, 
        newTransferTransactionData.fromAccountColor, "INTERNAL");
        
        frmNewTransferKA.frequencyPickLabel.text = newTransferTransactionData.transferFrequency;
        var freqIndex = getFrequencyIndex(newTransferTransactionData.transferFrequency);
        setFrequencyCardSelection(frmNewTransferKA, freqIndex);
        
        frmNewTransferKA.lblTransferNotes.text = newTransferTransactionData.transferNotes;
        
        frmNewTransferKA.calDateKA.dateComponents = newTransferTransactionData.transferDate;
        
        recurrenceNumberSelectedFlag = newTransferTransactionData.recurrenceNumberSelectedFlag;
        recurrenceDateRangeSelectedFlag = newTransferTransactionData.recurrenceDateRangeSelectedFlag;
        recurrenceNumberOfTimes = newTransferTransactionData.recurrenceNumberOfTimes;
        frmNewTransferKA.calRecurrenceFrom.dateComponents = newTransferTransactionData.fromRecurrenceCalDate;
        frmNewTransferKA.calRecurrenceTo.dateComponents = newTransferTransactionData.toRecurrenceCalDate;
        var recurrenceNumberStringToDisplay="";
        if(newTransferTransactionData.recurrenceNumberSelectedFlag === 1){
            recurrenceNumberStringToDisplay = newTransferTransactionData.recurrenceNumberOfTimes;            
        }
        else{
            frmNewTransferKA.tbxNumberOfTimes.text = "";
        }
        if(newTransferTransactionData.recurrenceDateRangeSelectedFlag === 1){
            var fromRecurrenceFormattedDate = getFormattedDateFromCalendarDate(newTransferTransactionData.fromRecurrenceCalDate);
            var fromRecurrenceDate = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(fromRecurrenceFormattedDate);
            var toRecurrenceFormattedDate = getFormattedDateFromCalendarDate(newTransferTransactionData.toRecurrenceCalDate);
            var toRecurrenceDate = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(toRecurrenceFormattedDate);
            recurrenceNumberStringToDisplay = fromRecurrenceDate + "  to  " + toRecurrenceDate;
        }
        else{
            setCalendarDateToCurrentDate(frmNewTransferKA.calRecurrenceFrom);
            setCalendarDateToCurrentDate(frmNewTransferKA.calRecurrenceTo);
        }
        frmNewTransferKA.recurrencePickLabel.text = recurrenceNumberStringToDisplay;
        
        frmNewTransferKA.lblTransactionType.text = newTransferTransactionData.transferTransactionType;
        frmNewTransferKA.lblTransactionIdKA.text = "";
        if(showState === "EditExistingTransfer")
            frmNewTransferKA.lblTransactionIdKA.text = newTransferTransactionData.transferTransactionID;
    }
}

/* Construct newTransferTransactionData from UI elements on frmNewTransferKA form to pass as 
   a navigation object to the confirmTransfer form */
function constructNewTransferTransactionObject(){
    var newTransferTransactionData = {};
    newTransferTransactionData.transferAmount = frmNewTransferKA.amountTextField.text;
    newTransferTransactionData.toAccountName = frmNewTransferKA.toNamePick.text;
    newTransferTransactionData.toAccountNumber = frmNewTransferKA.tolblAccountNumberKA.text;
    newTransferTransactionData.toAccountBalance = frmNewTransferKA.toAmountPick.text;
    newTransferTransactionData.toAccountColor = frmNewTransferKA.toAccountColorPick.skin;
    newTransferTransactionData.fromAccountName = frmNewTransferKA.fromNamePick.text;
    newTransferTransactionData.fromAccountNumber = frmNewTransferKA.fromlblAccountNumberKA.text;
    newTransferTransactionData.fromAccountBalance = frmNewTransferKA.fromAmountPick.text;
    newTransferTransactionData.fromAccountColor = frmNewTransferKA.fromAccountColorPick.skin;
    newTransferTransactionData.transferFrequency = frmNewTransferKA.frequencyPickLabel.text;
    newTransferTransactionData.transferNotes = frmNewTransferKA.lblTransferNotes.text;
    
    newTransferTransactionData.transferDate = frmNewTransferKA.calDateKA.dateComponents;
        
    newTransferTransactionData.recurrenceNumberSelectedFlag = recurrenceNumberSelectedFlag;
    newTransferTransactionData.recurrenceDateRangeSelectedFlag = recurrenceDateRangeSelectedFlag;
    newTransferTransactionData.recurrenceNumberOfTimes = recurrenceNumberOfTimes;
    newTransferTransactionData.fromRecurrenceCalDate = frmNewTransferKA.calRecurrenceFrom.dateComponents;
    newTransferTransactionData.toRecurrenceCalDate = frmNewTransferKA.calRecurrenceTo.dateComponents;

    newTransferTransactionData.transferTransactionType = frmNewTransferKA.lblTransactionType.text;
    newTransferTransactionData.transferTransactionID = frmNewTransferKA.lblTransactionIdKA.text;
    return newTransferTransactionData;
}

/* A navigation object is passed in from the NewTransfer form. Use the object to bind data to
   the elements on confirmTransfer form */
function bindNewTransferTransactionObjectToConfirmTransferForm(){
  var navNewTransferTransactionObject;
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var formController = INSTANCE.getFormController("frmConfirmTransferKA");
  var formModel = formController && formController.getFormModel();

  var formControllerContextData= formController.getContextData();
  
  formModel.clear();
  
  if(formControllerContextData && formControllerContextData.getCustomInfo("newTransferTransactionData")){
    navNewTransferTransactionObject = formControllerContextData.getCustomInfo("newTransferTransactionData");
   
    var amount = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(navNewTransferTransactionObject.transferAmount,
                                    kony.retailBanking.globalData.globals.CurrencyCode);                            
                                    
    // Check if we need to set the default number for recurrences. 
    // I don't like this. We need to set the number of recurrences to 0 and let the transaction fail
    if (navNewTransferTransactionObject.transferFrequency !== frequencyOptions[0] && 
    navNewTransferTransactionObject.recurrenceNumberSelectedFlag == 0 && 
    navNewTransferTransactionObject.recurrenceDateRangeSelectedFlag == 0){
        navNewTransferTransactionObject.recurrenceNumberSelectedFlag = 1;
        navNewTransferTransactionObject.recurrenceNumberOfTimes = "1";
        navNewTransferTransactionObject.transferRecurrenceString = navNewTransferTransactionObject.recurrenceNumberOfTimes;
    }
        
    // start the bind
    formModel.setViewAttributeByProperty("transactionAmount","text",amount);
    formModel.setViewAttributeByProperty("transactionName","text",navNewTransferTransactionObject.toAccountName);
    formModel.setViewAttributeByProperty("toAccountNumberKA","text",navNewTransferTransactionObject.toAccountNumber);
    formModel.setViewAttributeByProperty("transactionFrom","text",navNewTransferTransactionObject.fromAccountName);
    formModel.setViewAttributeByProperty("fromAccountNumberKA","text",navNewTransferTransactionObject.fromAccountNumber);
    var transferFormattedDate = getFormattedDateFromCalendarDate(navNewTransferTransactionObject.transferDate);  
    formModel.setViewAttributeByProperty("lblScheduledDate","text",kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(transferFormattedDate));
    formModel.setViewAttributeByProperty("lblReccurrenceValue","text",navNewTransferTransactionObject.transferFrequency);
    formModel.setViewAttributeByProperty("transactionNotes","text",navNewTransferTransactionObject.transferNotes);
        
    if(navNewTransferTransactionObject.transferFrequency !== frequencyOptions[0]){
        var recurrenceNumberStringToDisplay;
        formModel.performActionOnView("lblRecurrenceFreq","setVisibility",[true]);
        if(navNewTransferTransactionObject.recurrenceNumberSelectedFlag === 1){
            recurrenceNumberStringToDisplay = "Next " + navNewTransferTransactionObject.recurrenceNumberOfTimes + " time(s)";            
        }
        else if(navNewTransferTransactionObject.recurrenceDateRangeSelectedFlag === 1){
            var fromRecurrenceFormattedDate = getFormattedDateFromCalendarDate(navNewTransferTransactionObject.fromRecurrenceCalDate);
            var fromRecurrenceDate = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(fromRecurrenceFormattedDate);
            var toRecurrenceFormattedDate = getFormattedDateFromCalendarDate(navNewTransferTransactionObject.toRecurrenceCalDate);
            var toRecurrenceDate = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(toRecurrenceFormattedDate);
            recurrenceNumberStringToDisplay = fromRecurrenceDate + "  to  " + toRecurrenceDate;
        }
        formModel.setViewAttributeByProperty("lblRecurrenceFreq","text",recurrenceNumberStringToDisplay);
    }
    else{
        formModel.performActionOnView("lblRecurrenceFreq","setVisibility",[false]);
    }
  }
}

/* We are on transaction detail page. Fill out the tarnsaction Object to be sent as a navigation object when
   Edit or Repeat Transfer is clicked */
function setTransactionObjectFromTransactionDetailPage(transactionData){
    var newTransferTransactionData = {};
    
    var amount = (transactionData.amount).toString();
    newTransferTransactionData.transferAmount = amount.replace(/[^0-9\.]+/g, "");
    
    var accountIDTo;
    var accountNameTo;
    var accountSkinColorTo;
    var accountAvailableBalanceTo;
    
    if(transactionData.transactionType==kony.retailBanking.globalData.globals.ExternalTransfer){
        accountIDTo=transactionData.ExternalAccountNumber;
        accountSkinColorTo = null;
        accountNameTo=transactionData.toAccountName;
    }
    else{
        var todata = kony.retailBanking.globalData.accounts.searchAccountById(transactionData.toAccountNumber);
        accountIDTo=todata.accountID;
        if(todata.nickName == null || todata.nickName === "")
          accountNameTo=todata.accountName;
        else
          accountNameTo=todata.nickName; 
        accountSkinColorTo = getSkinColor(todata.accountType);
        accountAvailableBalanceTo=kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(todata.availableBalance);
    }  
    newTransferTransactionData.toAccountName = accountNameTo;
    newTransferTransactionData.toAccountNumber = accountIDTo;
    newTransferTransactionData.toAccountBalance = accountAvailableBalanceTo;
    newTransferTransactionData.toAccountColor = accountSkinColorTo;   
    
    var fromdata = kony.retailBanking.globalData.accounts.searchAccountById(transactionData.fromAccountNumber);
    var accountNameFrom;
    if(fromdata.nickName == null || fromdata.nickName === "")
        accountNameFrom=fromdata.accountName;
    else
        accountNameFrom=fromdata.nickName; 
    newTransferTransactionData.fromAccountName = accountNameFrom;
    newTransferTransactionData.fromAccountNumber = fromdata.accountID;
    newTransferTransactionData.fromAccountBalance = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(fromdata.availableBalance);
    newTransferTransactionData.fromAccountColor = getSkinColor(fromdata.accountType);
    
    var frequencyString = frequencyOptions[0];
    if(transactionData.frequencyType !== undefined){
        frequencyString = getFrequencyString(transactionData.frequencyType);
    }
    newTransferTransactionData.transferFrequency = frequencyString;
    
    newTransferTransactionData.transferNotes = transactionData.transactionsNotes;
    
    var transferCalendar = {};
    transferCalendar.dateComponents = [];
    if(transactionData.isScheduled==="false"){
        setCalendarDateToCurrentDate(transferCalendar);
    }
    else{
        setCalendarDateToDate(transactionData.scheduledDate, transferCalendar);
    }
    newTransferTransactionData.transferDate = transferCalendar.dateComponents;
    
    newTransferTransactionData.recurrenceNumberSelectedFlag = 0;
    newTransferTransactionData.recurrenceDateRangeSelectedFlag = 0;
    
    if(newTransferTransactionData.transferFrequency != frequencyOptions[0]){
        if(transactionData.numberOfRecurrences !== undefined){
            newTransferTransactionData.recurrenceNumberSelectedFlag = 1;
            newTransferTransactionData.recurrenceNumberOfTimes = transactionData.numberOfRecurrences;
        }
        else if(transactionData.frequencyStartDate !== undefined){
            var fromRecurringCalendar = {};
            fromRecurringCalendar.dateComponents = [];
            var toRecurringCalendar = {};
            toRecurringCalendar.dateComponents = [];
            newTransferTransactionData.recurrenceDateRangeSelectedFlag = 1;
            setCalendarDateToDate(transactionData.frequencyStartDate, fromRecurringCalendar);
            setCalendarDateToDate(transactionData.frequencyEndDate, toRecurringCalendar);
            newTransferTransactionData.fromRecurrenceCalDate = fromRecurringCalendar.dateComponents;
            newTransferTransactionData.toRecurrenceCalDate = toRecurringCalendar.dateComponents;
        }
    }
   
    newTransferTransactionData.transferTransactionType = transactionData.transactionType;
    newTransferTransactionData.transferTransactionID = transactionData.transactionId;
    return newTransferTransactionData; 
}

/* I don't like this function either. But touching this would mean I need to enter into BillPay and P2P. So should be a part of
   future refactoring */
function RecentTransferSwitching(data, showState)
{
  switch(data.transactionType)
  {
    case kony.retailBanking.globalData.globals.TransferMoney : 
    case kony.retailBanking.globalData.globals.ExternalTransfer :
      var navTransferObject = setTransactionObjectFromTransactionDetailPage(data);
      navigateToNewTransferForm(showState, navTransferObject);
      break;  
    case "BillPay"		  : detailsBillPayClick(data,showState);
      break;
    case "Deposit"		  :	break;
    case kony.retailBanking.globalData.globals.PayPerson :
      var navP2PObject = setP2PObjectFromTransactionDetailPage(data); 
      navigateToNewPayPerson(showState,navP2PObject);
      break;
  }      
}

/* Again a function I don't like. But touching this would mean I need to refactor the Transfers Landing page. */
function ButtonClickInRecentTransaction()
{
  var btnText =frmRecentTransactionDetailsKA.repeatTransactionButton.text;
  if(btnText=="Cancel Bill Pay" || btnText=="Cancel Scheduled Transfer" || btnText=="Cancel Scheduled Transfer")
  {
    kony.ui.Alert
    ({
      "message": "Are you sure you want to cancel",
      "alertType": constants.ALERT_TYPE_CONFIRMATION,
      "alertTitle":"INFO",
      "yesLabel": "YES",
      "noLabel": "NO",
      "alertHandler":CancelAlertFunction
    },{});
  }
  else
  {
    var index = frmRecentTransactionDetailsKA.lblseletedIndex.text;
    var tempdata =[];
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var listController = INSTANCE.getFormController("frmRecentTransactionDetailsKA");
    var controllerContextData= listController.getContextData();
    var previousForm = kony.application.getPreviousForm().id;
    if(controllerContextData.getCustomInfo("selectedTransactionObj") && (previousForm=="frmAccountDetailKA")){
      var selData = controllerContextData.getCustomInfo("selectedTransactionObj");
      RecentTransferSwitching(selData, "RepeatTransfer");
    }else  if(controllerContextData.getCustomInfo("selectedTransactionObj") && (previousForm=="frmSearchKA")){
      var selData = controllerContextData.getCustomInfo("selectedTransactionObj");
      RecentTransferSwitching(selData, "RepeatTransfer");
    }else{
      tempdata = kony.retailBanking.globalData.transfers.getTransfersData("recentTransactions");
      RecentTransferSwitching(tempdata[index], "RepeatTransfer");
    }
  }
}

/* Again a function I don't like. But touching this would mean I need to refactor other pages. */
function scheduleEditOnClick()
{
  var index = frmRecentTransactionDetailsKA.lblseletedIndex.text;
  var tempdata =[];
  var previousForm = kony.application.getPreviousForm().id;
  if(previousForm=="frmSearchKA")
  {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var listController = INSTANCE.getFormController("frmRecentTransactionDetailsKA");
    var controllerContextData= listController.getContextData();
    var selData = controllerContextData.getCustomInfo("selectedTransactionObj");
    RecentTransferSwitching(selData, "EditExistingTransfer");
  }else if(previousForm!="frmAccountDetailKA"){
    tempdata = kony.retailBanking.globalData.transfers.getTransfersData("scheduledTransactions");
    RecentTransferSwitching(tempdata[index], "EditExistingTransfer");
  }else{
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var listController = INSTANCE.getFormController("frmAccountDetailKA");
    var navigationObject = listController.getContextData();
    if(navigationObject && navigationObject.getCustomInfo("selectedAccountObj")){
      var accDetails =  navigationObject.getCustomInfo("selectedAccountObj");
      RecentTransferSwitching(accDetails, "EditExistingTransfer");
    }

  }
}

