function newPayPersonPreShow(){
  frmNewPayPersonKA.btnConfirmKA.setVisibility(false);
  frmNewPayPersonKA.selectPayeeButton.setVisibility(true);
  var showState = "InitialLanding";
  var newPayPersonTransactionData;
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmNewPayPersonKA");
  var controllerContextData= controller.getContextData();
  if(controllerContextData && controllerContextData.getCustomInfo("showState")){
    showState = controllerContextData.getCustomInfo("showState");
  }
  if(controllerContextData && controllerContextData.getCustomInfo("newPayPersonTransactionData")){
    newPayPersonTransactionData = controllerContextData.getCustomInfo("newPayPersonTransactionData");
  }
  setDataUIElementsOnNewPayPerson(newPayPersonTransactionData, showState);
  
  var viewModel = controller.getFormModel();
  viewModel.setViewAttributeByProperty("fromAccountBankNameKA","text",kony.retailBanking.globalData.globals.BankName);
  viewModel.setViewAttributeByProperty("CopyLabel03e39ab4661a845","text",kony.retailBanking.globalData.globals.BankName);
   
  calculateNewPayPersonAccountCardHeights();
  
  setFromContainerAttributesPayPerson(showState);
 
  frmNewPayPersonKA.transferPayTitleLabel.text = i18n_payAPerson;
  if (showState === "EditExistingTransfer")
     frmNewPayPersonKA.transferPayTitleLabel.text = i18n_editTransfer; 
}

function setDataUIElementsOnNewPayPerson(newPayPersonTransactionData, showState){
   frmNewPayPersonKA.lblCurrencyType.text=  kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount("",kony.retailBanking.globalData.globals.CurrencyCode);
    
    /* A new transaction will be initiated. So initialize most of the data */  
    if(showState === "InitialLanding"){    
        var settingsObj = kony.store.getItem("settingsflagsObject");
        var preferedSelAcnt=kony.retailBanking.globalData.accounts.searchAccountById(settingsObj.DefaultTransferAcctNo);  
        frmNewPayPersonKA.lblTransactionType.text = kony.retailBanking.globalData.globals.PayPerson;
        if(preferedSelAcnt !==""){
            var nickNameData = preferedSelAcnt.nickName;
            //Need To Get This From Service
            if(nickNameData.trim() === "")
                nickNameData = preferedSelAcnt.accountName;
            setSelectedAccountData(frmNewPayPersonKA, "from", nickNameData,
                    kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(preferedSelAcnt.availableBalance,kony.retailBanking.globalData.globals.CurrencyCode), 
                    preferedSelAcnt.accountID, 
                    getSkinColor(preferedSelAcnt.accountType), "INTERNAL");
        }
        frmNewPayPersonKA.amountTextField.text="";
        frmNewPayPersonKA.lblTransferNotes.text ="";
        setCalendarDateToCurrentDate(frmNewPayPersonKA.calDateKA);
        frmNewPayPersonKA.lblTransactionIdKA.text = "";
    }
    if(showState === "EditExistingTransfer"){
      frmNewPayPersonKA.btnConfirmKA.setVisibility(true);
      frmNewPayPersonKA.selectPayeeButton.setVisibility(false);
      frmNewPayPersonKA.referenceId.text = newPayPersonTransactionData.transferTransactionID;
      frmNewPayPersonKA.payeefname.text = newPayPersonTransactionData.payPayeeName;
      frmNewPayPersonKA.tbxPhoneKA.text = newPayPersonTransactionData.payPersonPhone;
      frmNewPayPersonKA.tbxEmailKA.text = newPayPersonTransactionData.payPersonEmail;
      frmNewPayPersonKA.toAccountNumberKA.text = newPayPersonTransactionData.payPersonId;
    }

    /* An existing transaction is available, fill up data in the UI using the passed in navigation object */
    if (showState === "EditExistingTransfer" || showState === "EditNewTransfer" ||
        showState === "RepeatTransfer" || showState === "backState" ){
        frmNewPayPersonKA.amountTextField.text = newPayPersonTransactionData.amount;
      
        setSelectedAccountData(frmNewPayPersonKA, "from", newPayPersonTransactionData.fromNamePick,
        newPayPersonTransactionData.fromAccBalance, newPayPersonTransactionData.accNumber, 
        newPayPersonTransactionData.fromAccountColorPick, "INTERNAL");
        
        frmNewPayPersonKA.lblTransferNotes.text = newPayPersonTransactionData.notes;
        
        frmNewPayPersonKA.calDateKA.dateComponents = newPayPersonTransactionData.date;
        
        
        frmNewPayPersonKA.lblTransactionType.text = newPayPersonTransactionData.transferTransactionType;
        frmNewPayPersonKA.lblTransactionIdKA.text = "";
        if(showState === "EditExistingTransfer")
            frmNewPayPersonKA.lblTransactionIdKA.text = newPayPersonTransactionData.transferTransactionID;
    }
}

function setFromContainerAttributesPayPerson(showState){
    if(showState === "InitialLanding"){
        var settingsObj = kony.store.getItem("settingsflagsObject");
        var preferedSelAcnt=kony.retailBanking.globalData.accounts.searchAccountById(settingsObj.DefaultTransferAcctNo);  
        if(preferedSelAcnt !==""){
            setContainerState(frmNewPayPersonKA,"from","INTERNAL_SELECTED", defaultCardHeight);
        }     
        else{
            setContainerState(frmNewPayPersonKA,"from","INITIAL_EXPANDED", fromCardHeight); 
        }
    }
    if(showState === "EditExistingTransfer" || showState === "EditNewTransfer" ||
        showState === "RepeatTransfer"){
        // From account data has already been set, so just set container state
        setContainerState(frmNewPayPersonKA,"from","INTERNAL_SELECTED", defaultCardHeight);
    }
}


function navigateToNewPayPerson(showState, transactionObject){
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var listController = INSTANCE.getFormController("frmNewPayPersonKA");
    var navObject = new kony.sdk.mvvm.NavigationObject();
    navObject.setCustomInfo("showState",showState);
    if(showState !== "InitialLanding")
        navObject.setCustomInfo("newPayPersonTransactionData",transactionObject);
    navObject.setRequestOptions("segInternalFromAccountsKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
    listController.performAction("loadDataAndShowForm",[navObject]);
}


function OnclickOfSelectPayee(){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmNewPayPersonKA");
  var viewModel = controller.getFormModel();
  var amnt =  viewModel.getViewAttributeByProperty("amountTextField","text");
  var validated = validateDecimals(amnt);
  if((amnt===null) || (amnt==="") || (Number(amnt)< 1))
  {
    kony.ui.Alert({
        "alertType": constants.ALERT_TYPE_INFO,
        "yesLabel": "OK",
        "message": i18n_notValidAmount,
     }, {});
  } 
  else if(validated){
  var record = {
    accNumber : viewModel.getViewAttributeByProperty("fromlblAccountNumberKA","text"),
    notes : viewModel.getViewAttributeByProperty("lblTransferNotes","text"),
    amount : viewModel.getViewAttributeByProperty("amountTextField","text"),
    date : viewModel.getViewAttributeByProperty("calDateKA","dateComponents"),
    referenceId : "" ,
    fromNamePick : viewModel.getViewAttributeByProperty("fromNamePick","text"),
    fromAccBalance : viewModel.getViewAttributeByProperty("fromAmountPick","text"),
    fromAccountColorPick : viewModel.getViewAttributeByProperty("fromAccountColorPick","skin"),
    transferTransactionType : viewModel.getViewAttributeByProperty("lblTransactionType","text")
  };
  var toController = INSTANCE.getFormController("frmP2PselectPayeeKA");
  var formModel = toController.getFormModel();
  var title= i18n_pay+" "+kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(kony.retailBanking.util.formatingDate.currencyformat(record.amount),kony.retailBanking.globalData.globals.CurrencyCode);
  if(kony.retailBanking.globalData.deviceInfo.isIphone())
  	formModel.setViewAttributeByProperty("transferPayTitleLabel","text",title);
  else
    formModel.setViewAttributeByProperty("titleBarLabel","text",title);

  var navigationObject = new kony.sdk.mvvm.NavigationObject();
  navigationObject.setCustomInfo("SelPayPerson",record);
  navigationObject.setRequestOptions("contactsegment",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  controller.performAction("navigateTo",["frmP2PselectPayeeKA",navigationObject]);
  }
}

function onClickConfirmP2P(){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmNewPayPersonKA");
  var viewModel = controller.getFormModel();
  var record = {
    accNumber : viewModel.getViewAttributeByProperty("fromlblAccountNumberKA","text"),
    notes : viewModel.getViewAttributeByProperty("lblTransferNotes","text"),
    amount : viewModel.getViewAttributeByProperty("amountTextField","text"),
    date : viewModel.getViewAttributeByProperty("calDateKA","dateComponents"),
    referenceId : viewModel.getViewAttributeByProperty("referenceId","text"),
    fromNamePick : viewModel.getViewAttributeByProperty("fromNamePick","text"),
    fromAccBalance : viewModel.getViewAttributeByProperty("fromAmountPick","text"),
    fromAccountColorPick : viewModel.getViewAttributeByProperty("fromAccountColorPick","skin"),
    transferTransactionType : viewModel.getViewAttributeByProperty("lblTransactionType","text"),
    transactionName :viewModel.getViewAttributeByProperty("payeefname","text"),
    transactionId : viewModel.getViewAttributeByProperty("toAccountNumberKA","text")
  };
  var navigationObject = new kony.sdk.mvvm.NavigationObject();
  navigationObject.setCustomInfo("SelPayPerson",record);
  navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  controller.performAction("navigateTo", ["frmP2PConfirmTransferKA", navigationObject]);
}
function OnclickOfAddPayeeList()
{
  var INSTANCE =  kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmP2PaddnewPayeeKA");
  var viewModel = controller.getFormModel();
  var fname = viewModel.getViewAttributeByProperty("payeefname","text");
  var lname = viewModel.getViewAttributeByProperty("payeelname","text");
  var fullName = fname+" "+lname;
  var phoneNumber = viewModel.getViewAttributeByProperty("tbxPhoneKA","text");
  var email = viewModel.getViewAttributeByProperty("tbxEmailKA","text");
  var navObject = controller.getContextData();
  var record = navObject.getCustomInfo("SelPayPerson");
  record.transactionName = fullName;
  if(frmP2PaddnewPayeeKA.imgPhoneKA.src =="radioselected.png"){
  	record.transactionDate = phoneNumber;
    viewModel.setViewAttributeByProperty("tbxEmailKA","text","");
  }
  else if(email!==""&&frmP2PaddnewPayeeKA.imgEmailKA.src =="radioselected.png"){
  	record.transactionDate = email;
    viewModel.setViewAttributeByProperty("tbxPhoneKA","text","");
  }
  navObject.setCustomInfo("SelPayPerson",record);
  controller.performAction("saveData");
}

/*setting of contacts from phone to segment in frmPhonePayee*/
function Contacts()
{
  var array=kony.contact.find("*", true);
  kony.print("array :"+JSON.stringify(array));
  var contactList= [];
  for (var i=0;i<array.length;i++)
    if((!(typeof(array[i].firstname) == "undefined"))&&(array[i].firstname!== "" || array[i].firstname!== undefined)&&((!(typeof(array[i].phone) == "undefined"))||(!(typeof(typeof(array[i].email) === "undefined")))))
    {
      if((typeof(array[i].phone) === "undefined"||array[i].phone.length === 0)&&array[i].email.length)
        contactList.push({
        "firstname":array[i].firstname,
        "number":"",
        "lastname":array[i].lastname,
        "email":array[i].email[0].id
      });
      else if((typeof(array[i].email) === "undefined"||array[i].email.length === 0)&&array[i].phone.length)
        contactList.push({
        "firstname":array[i].firstname,
        "number":array[i].phone[0].number,
        "lastname":array[i].lastname,
        "email":""
      });
      else if(array[i].phone.length&&array[i].email.length)
      contactList.push({
        "firstname":array[i].firstname,
        "number":array[i].phone[0].number,
        "lastname":array[i].lastname,
        "email":array[i].email[0].id
      });
    }
  frmP2PphonepayeeKA.contactsegment.widgetDataMap={
      transactionName:"firstname",
      transactionDate:"number",
      transactionLastName:"lastname",
      transactionEmail:"email"
    };
  frmP2PphonepayeeKA.contactsegment.setData(contactList);
 }

/*searching in phone contacts*/
function searchContacts(){
	var data=frmP2PphonepayeeKA.searchTextField.text;
	var array=kony.contact.find(data, true);
    var contactList=[];
  	for (var i=0;i<array.length;i++)
    if((!(typeof(array[i].firstname) === "undefined"))&&(array[i].firstname!== ""||array[i].firstname!=undefined)&&((!(typeof(array[i].phone) === "undefined"))||(!(typeof(typeof(array[i].email) === "undefined")))))
    {
      if((typeof(array[i].phone) === "undefined"||array[i].phone.length === 0)&&array[i].email.length)
        contactList.push({
        "firstname":array[i].firstname,
        "number":"",
        "lastname":array[i].lastname,
        "email":array[i].email[0].id
      });
      else if((typeof(array[i].email) === "undefined"||array[i].email.length === 0)&&array[i].phone.length)
        contactList.push({
        "firstname":array[i].firstname,
        "number":array[i].phone[0].number,
        "lastname":array[i].lastname,
        "email":""
      });
      else if(array[i].phone.length&&array[i].email.length)
      contactList.push({
        "firstname":array[i].firstname,
        "number":array[i].phone[0].number,
        "lastname":array[i].lastname,
        "email":array[i].email[0].id
      });
    }
  frmP2PphonepayeeKA.contactsegment.widgetDataMap={
      transactionName:"firstname",
      transactionDate:"number",
      transactionLastName:"lastname",
      transactionEmail:"email"
    };
  frmP2PphonepayeeKA.contactsegment.setData(contactList);
}

/*populating the payee details selected from phone contacts to frmP2PaddnewPayeeKA*/ 
function PopulateDetails()
{
  var INSTANCE =  kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmP2PphonepayeeKA");
  var viewModel = controller.getFormModel();
  var navObject = controller.getContextData();
  var toController = INSTANCE.getFormController("frmP2PaddnewPayeeKA");
  var toFormModel = toController.getFormModel();
  var selectedRow = viewModel.getViewAttributeByProperty("contactsegment", "selectedItems")[0];
  var record = navObject.getCustomInfo("SelPayPerson");
  record.payeefname = selectedRow.firstname;
  record.transactionDate = selectedRow.lastname;
  record.tbxPhoneKA = selectedRow.number;
  record.tbxEmailKA = selectedRow.email;
  if(selectedRow.number !== "")
        setPhonePrimary();
  else
        setEmailPrimary();
  navObject.setCustomInfo("SelPayPerson",record);
  navObject.setDataModel(null, kony.sdk.mvvm.OperationType.ADD, "form");
  navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  controller.performAction("navigateTo",["frmP2PaddnewPayeeKA",navObject]);
}

/*Editing a scheduled P2P*/
function confirmEditP2P()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmNewPayPersonKA");
  var viewModel = controller.getFormModel();
  var navObject = new kony.sdk.mvvm.NavigationObject();
  var record = {
    accNumber : viewModel.getViewAttributeByProperty("fromlblAccountNumberKA","text"),
    notes : viewModel.getViewAttributeByProperty("noteTextFieldLabel","text"),
    amount : viewModel.getViewAttributeByProperty("amountTextField","text"),
    date : viewModel.getViewAttributeByProperty("calDateKA","dateComponents"),
    payeefname : viewModel.getViewAttributeByProperty("payeefname","text"),
    transactionDate : viewModel.getViewAttributeByProperty("transactionDate","text"),
    tbxPhoneKA : viewModel.getViewAttributeByProperty("tbxPhoneKA","text"),
    tbxEmailKA : viewModel.getViewAttributeByProperty("tbxEmailKA","text"),
    referenceId : viewModel.getViewAttributeByProperty("referenceId","text"),
    fromNamePick : viewModel.getViewAttributeByProperty("fromNamePick","text")
  };
  navObject.setCustomInfo("SelPayPerson",record);
  navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  controller.performAction("navigateTo",["frmP2PConfirmTransferKA",navObject]);
}

/*adding a new payee*/
function OnclickOfAddPayee()
{
	var INSTANCE =  kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
	var controller = INSTANCE.getFormController("frmP2PaddnewPayeeKA");
	controller.performAction("saveData");
}

/*selecting a payee from contact list */
function OnclickOfSegmentListPayee()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmP2PselectPayeeKA");
  var viewModel = controller.getFormModel();
  var selectedRow =  viewModel.getViewAttributeByProperty("contactsegment","selectedItems");
  var ConfirmName=selectedRow[0].firstName+" "+selectedRow[0].lastName;
  var phoneNo = selectedRow[0].phone;
  var resultId = selectedRow[0].PayPersonId;
  var navObject = controller.getContextData();
  var record = navObject.getCustomInfo("SelPayPerson");
  record.transactionName = ConfirmName;
  record.transactionDate = phoneNo;
  record.transactionId = resultId;
  navObject.setCustomInfo("SelPayPerson",record);
  navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  controller.performAction("navigateTo",["frmP2PConfirmationPayKA",navObject]);
}

/*Editing P2P from Confirm Page*/
function onConfirmP2PEditOnClick(){
    var receivedNavObject = getCustomInfoObject("frmP2PConfirmTransferKA", "SelPayPerson");
    navigateToNewPayPerson("EditNewTransfer", receivedNavObject);
}

/*Repeat a transfer P2P from details*/
function setP2PObjectFromTransactionDetailPage(transactionData){
  var newP2PTransactionData = {};
    
    var amount = (transactionData.amount).toString();
    newP2PTransactionData.amount = amount.replace(/[^0-9\.]+/g, "");
    var fromdata = kony.retailBanking.globalData.accounts.searchAccountById(transactionData.fromAccountNumber);
    var accountNameFrom;
    if(fromdata.nickName === null || fromdata.nickName === "")
        accountNameFrom=fromdata.accountName;
    else
        accountNameFrom=fromdata.nickName; 
    newP2PTransactionData.fromNamePick = accountNameFrom;
    newP2PTransactionData.accNumber = fromdata.accountID;
    newP2PTransactionData.fromAccBalance = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(fromdata.availableBalance);
    newP2PTransactionData.fromAccountColorPick = getSkinColor(fromdata.accountType);
    
    newP2PTransactionData.notes = transactionData.transactionsNotes;
    
    var transferCalendar = {};
    transferCalendar.dateComponents = [];
    if(transactionData.isScheduled==="false"){
        setCalendarDateToCurrentDate(transferCalendar);
    }
    else{
        setCalendarDateToDate(transactionData.scheduledDate, transferCalendar);
    }
    newP2PTransactionData.date = transferCalendar.dateComponents;
    newP2PTransactionData.payPersonId = transactionData.personId;
    newP2PTransactionData.payPayeeName = transactionData.payPersonName;
    newP2PTransactionData.payPersonPhone = transactionData.payPersonPhone;
    newP2PTransactionData.payPersonEmail = transactionData.payPersonEmail;
    
    newP2PTransactionData.transferTransactionType = transactionData.transactionType;
    newP2PTransactionData.transferTransactionID = transactionData.transactionId;
    return newP2PTransactionData; 
}

function navigateToP2PconfirmationKA(){  
  
  var INSTANCE =  kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmP2PConfirmationPayKA");
  var navObject = controller.getContextData();
  var record = navObject.getCustomInfo("SelPayPerson");
  if(record.referenceId === "")
  	navObject.setDataModel(null, kony.sdk.mvvm.OperationType.ADD);
  navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  controller.performAction("navigateTo", ["frmP2PConfirmTransferKA", navObject]);
}

function OnclickOfAddPayeeFirst()
{
  disableAddPayeeBtn();
  var INSTANCE =  kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmP2PselectPayeeKA");
  var navObject = controller.getContextData();
  var record = navObject.getCustomInfo("SelPayPerson");
  record.formName = "frmP2PselectPayeeKA";
  navObject.setCustomInfo("SelPayPerson",record);
  navObject.setDataModel(null, kony.sdk.mvvm.OperationType.ADD, "form");
  navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  controller.performAction("navigateTo",["frmP2PaddnewPayeeKA",navObject]);
}
  
function disableAddPayeeBtn()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmP2PaddnewPayeeKA");
  var viewModel = controller.getFormModel();
  viewModel.setViewAttributeByProperty("saveNewPayeeButton","skin","sknprimaryActionDisabled");
}

function enableAddPayeeBtn()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmP2PaddnewPayeeKA");
  var viewModel = controller.getFormModel();
  viewModel.setViewAttributeByProperty("saveNewPayeeButton","skin","sknprimaryAction");
}

function canEnableAddPayeeBtn()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmP2PaddnewPayeeKA");
  var viewModel = controller.getFormModel();
  var fName = viewModel.getViewAttributeByProperty("payeefname","text");
  var lName = viewModel.getViewAttributeByProperty("payeelname","text");
  var phone = viewModel.getViewAttributeByProperty("tbxPhoneKA","text");
  var email = viewModel.getViewAttributeByProperty("tbxEmailKA","text");
  if(kony.retailBanking.util.validation.validateTextboxOrLabel(fName) && kony.retailBanking.util.validation.validateTextboxOrLabel(lName))
  {
   if (kony.retailBanking.util.validation.isValidNumber(phone))
     {
       
       return enableAddPayeeBtn(); 
     }
   else if (kony.retailBanking.util.validation.isValidEmail(email))
     {
       
       return enableAddPayeeBtn(); 
     }
   else  
      return disableAddPayeeBtn();
   }
   else  
      return disableAddPayeeBtn();
}

function setPhonePrimary()
 {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmP2PaddnewPayeeKA");
    var viewModel = controller.getFormModel();
   
   viewModel.setViewAttributeByProperty("tbxEmailKA","text","");
   
    viewModel.performActionOnView("tbxPhoneKA", "setEnabled", [true]);
    viewModel.performActionOnView("tbxEmailKA", "setEnabled", [false]);
    viewModel.setViewAttributeByProperty("imgEmailKA","src","radiononselected.png");
    viewModel.setViewAttributeByProperty("imgPhoneKA","src","radioselected.png");
    frmP2PaddnewPayeeKA.tbxPhoneKA.setFocus(true);
  frmP2PaddnewPayeeKA.tbxEmailKA.setFocus(false);
 }

function setEmailPrimary()
 {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmP2PaddnewPayeeKA");
    var viewModel = controller.getFormModel();
   
   viewModel.setViewAttributeByProperty("tbxPhoneKA","text","");
   
    viewModel.performActionOnView("tbxPhoneKA", "setEnabled", [false]);
    viewModel.performActionOnView("tbxEmailKA", "setEnabled", [true]);
   viewModel.setViewAttributeByProperty("imgEmailKA","src","radioselected.png");
   viewModel.setViewAttributeByProperty("imgPhoneKA","src","radiononselected.png");
    frmP2PaddnewPayeeKA.tbxPhoneKA.setFocus(false);
  frmP2PaddnewPayeeKA.tbxEmailKA.setFocus(true);
 }



function setDataPayee(res){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmP2PaddnewPayeeKA");
  var navObject = controller.getContextData();
  var record = navObject.getCustomInfo("SelPayPerson");
  record.transactionId = res.PayPersonId;
  navObject.setCustomInfo("SelPayPerson",record);
  navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  controller.performAction("navigateTo", ["frmP2PConfirmationPayKA", navObject]);
}


function navigateToPhoneContacts()
{
  var INSTANCE =  kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmP2PselectPayeeKA");
  var navObject = controller.getContextData();
  var record = navObject.getCustomInfo("SelPayPerson");
  record.formName = "frmP2PphonepayeeKA";
  var toFrmController = INSTANCE.getFormController("frmP2PphonepayeeKA");
  var formModel = toFrmController.getFormModel();
  var title= i18n_pay+" "+kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(kony.retailBanking.util.formatingDate.currencyformat(record.amount),kony.retailBanking.globalData.globals.CurrencyCode);
  if(kony.retailBanking.globalData.deviceInfo.isIphone())
    formModel.setViewAttributeByProperty("transferPayTitleLabel","text",title);
  else
    formModel.setViewAttributeByProperty("titleBarLabel","text",title);
  navObject.setCustomInfo("SelPayPerson",record);
  navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  controller.performAction("navigateTo",["frmP2PphonepayeeKA",navObject]);
}
