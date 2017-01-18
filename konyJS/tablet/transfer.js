var NewTransferdata="";
function newTransferPostShow(){
  	// scroll to top of form
  	newTransfer.scrollToBeginning();
}

function fieldErrorMessage(){
    acctNameTextLength = newTransfer.externalAccountNameTextField.text;

  	if (acctNameTextLength.length && acctNameTextLength.length >= 1){
      	// textfield has text entered
      if (newTransfer.flxFieldErrorMessageContainerKA !== 0){
        newTransfer.flxFieldErrorMessageContainerKA.animate(
            kony.ui.createAnimation({100:
            {"height": "0dp", "stepConfig":{"timingFunction": easeOut}}}),
            {fillMode: forwards, duration:duration},
            {animationEnd: function() {} });
      }
    } else {
        newTransfer.flxFieldErrorMessageContainerKA.animate(
            kony.ui.createAnimation({100:
            {"height": "32dp", "stepConfig":{"timingFunction": easeOut}}}),
            {fillMode: forwards, duration:duration},
            {animationEnd: function() {} });
    }

 
}


var newTransferFromAccId;
var newTransferToAccId;

/**
 used To Get TransferPayLandingPage
*/
function getTransferPayLandingForm(form)
{
  clearRightContainer(frmTransferPayLandingKA,"accountTransactionWrapper","rightWrapper");
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
  frmRecentTransactionDetailsKA.repeatTransactionButton.isVisible = true;
  frmRecentTransactionDetailsKA.Copydivider06e184b7d586e4a.isVisible = true;
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController(fromForm);
  var viewModel = controller.getFormModel();
  var index = viewModel.getViewAttributeByProperty(segName, "selectedRowIndex");
  var response;
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
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController(formName);
  listController.performAction("goback",[false]);
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
      if(transacData[i]["frequencyType"] !==undefined && transacData[i]["frequencyType"] !=="Once") 
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
      switch(transacData[i]["transactionType"])
      {

      }
      transacData[i]["amount"] = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(transacData[i]["amount"]);
      var tempDate;
      if(transacData[i]["isScheduled"]==="false")
      {
        // tempDate = kony.retailBanking.util.formatingDate.getISODateTimeKA(transacData[i]["transactionDate"], kony.retailBanking.util.BACKEND_DATE_FORMAT);
       // transacData[i]["transactionDate"] = (tempDate instanceof Date)? tempDate.format('F d, Y') : "";
        transacData[i]["transactionDate"] = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(transacData[i]["transactionDate"]);
        recentSegData.push(transacData[i]); 
      }
      else
      {
        // tempDate = kony.retailBanking.util.formatingDate.getISODateTimeKA(transacData[i]["scheduledDate"], kony.retailBanking.util.BACKEND_DATE_FORMAT);
        //transacData[i]["transactionDate"] = (tempDate instanceof Date)? tempDate.format('F d, Y') : "";
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
flag11 = false;
function newTransferPreShow(){
  
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmNewTransferKA");
  var viewModel = controller.getFormModel();
  viewModel.setViewAttributeByProperty("lblFromAccountBankNameKA","text",kony.retailBanking.globalData.globals.BankName);
 // viewModel.setViewAttributeByProperty("CopyLabel03e39ab4661a845","text",kony.retailBanking.globalData.globals.BankName);
 // viewModel.setViewAttributeByProperty("Label0cecf1132bf8049","text",kony.retailBanking.globalData.globals.BankName);
   var settingsObj = kony.store.getItem("settingsflagsObject");
   var preferedSelAcnt=kony.retailBanking.globalData.accounts.searchAccountById(settingsObj.DefaultTransferAcctNo);
  if(preferedSelAcnt !=="")
  {
    viewModel.setViewAttributeByProperty("fromlblAccountNumberKA","text",preferedSelAcnt.accountID);
    var nickNameData = preferedSelAcnt.nickName;
    //Need To Get This From Service
    if(nickNameData.trim() === "")
      viewModel.setViewAttributeByProperty("fromNamePick","text",preferedSelAcnt.accountName);
    else
    viewModel.setViewAttributeByProperty("fromNamePick","text",nickNameData);
    viewModel.setViewAttributeByProperty("fromlblAccountNumberKA","text",preferedSelAcnt.accountID);
    viewModel.setViewAttributeByProperty("fromAmountPick","text",kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(preferedSelAcnt.availableBalance,kony.retailBanking.globalData.globals.CurrencyCode));
   // viewModel.performActionOnView("fromAccountPick","setVisibility",[true]);
	//viewModel.setViewAttributeByProperty("fromAccountNameContainer","top","0%");
   // viewModel.setViewAttributeByProperty("fromAccountAmountContainer","top","0%");
   // viewModel.setViewAttributeByProperty("fromLabel","left","8dp");
   // selectAccountCard(frmNewTransferKA,"from",1);
   // frmNewTransferKA.fromCardInner.opacity=0;
   // frmNewTransferKA.fromCard.height=defaultCardHeight;
    frmNewTransferKA.fromAccountColorPick.skin= getSkinColor(preferedSelAcnt.accountType);
    onclicksegment("from");
  }else
  {
    onclickTransferEdit("from");
    //frmNewTransferKA.fromNamePick.text="";
   // viewModel.performActionOnView("fromAccountPick","setVisibility",[false]);
   // frmNewTransferKA.fromCard.height=fromACCHeight;
   // editAccountCard(frmNewTransferKA,"from");
    //frmNewTransferKA.fromCardInner.opacity=1;
   /* if(fromACCHeight!="0dp")
    {
      editAccountCard(frmNewTransferKA,"from");
      frmNewTransferKA.fromCard.height=fromACCHeight;
    }*/
 } //preferred else
  
  
  /*if(fromACCHeight!="0dp" || toACCHeight!="0dp" )
  {
    editAccountCard(frmNewTransferKA,"from");
    editAccountCard(frmNewTransferKA,"to");
    frmNewTransferKA.fromCard.height=fromACCHeight;
    frmNewTransferKA.toCard.height=toACCHeight;
  }*/
 /*setDateFormatforNewTransfer();
  frmNewTransferKA.fromCardInner.opacity=1;
  frmNewTransferKA.toCardInner.opacity=1;
  //frequencyCardHeight = "300dp";
  frmNewTransferKA.lblNoofTimesKA.text="";
 // frmNewTransferKA.transferPayTitleLabel.text="New Transfer";
  frmNewTransferKA.fromNamePick.text=" ";
  frmNewTransferKA.toNamePick.text=" ";
  frmNewTransferKA.amountTextField.text="";
  frmNewTransferKA.lblTransferNotes.text ="";
  frmNewTransferKA.lblRecurringFromData.text="";
  frmNewTransferKA.lblRecurringTOData.text="";
  frmNewTransferKA.lblNoofTimesKA.text="";
  onFreqEditClick();
  frequencyOnClick(1);
  RecurringChanges("2");
  frmNewTransferKA.flxRecurrence.setVisibility(false);
  frmNewTransferKA.editToCard.setVisibility(true);
  frmNewTransferKA.btnADDKA.text="Add";
   var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmNewTransferKA");
  var viewModel = controller.getFormModel();
  var fromAccountNumber =  viewModel.setViewAttributeByProperty("fromlblAccountNumberKA","text","");
  var toAccountNumber =    viewModel.setViewAttributeByProperty("tolblAccountNumberKA","text","");
  viewModel.performActionOnView("CopyamountAccountOne03ee5831d718349","setVisibility",[true]);
  viewModel.performActionOnView("toAmountPick","setVisibility",[true]);
  viewModel.performActionOnView("fromCardTitle","setVisibility",[true]);
  viewModel.performActionOnView("fromCardTitle","opacity","1");
  viewModel.performActionOnView("toCardTitle","setVisibility",[true]);
  viewModel.performActionOnView("toCardTitle","opacity","1");
  viewModel.performActionOnView("fromCardInner","setVisibility",[true]);
  viewModel.performActionOnView("fromCardInner","opacity",[1]);
  viewModel.performActionOnView("toCardInner","setVisibility",[true]);
  viewModel.performActionOnView("toCardInner","opacity",[1]);
  viewModel.performActionOnView("fromAccountPick","setVisibility",[false]);
  viewModel.performActionOnView("toAccountPick","setVisibility",[false]);
  frmNewTransferKA.lblTransactionType.text = "";
*/
  //frmNewTransferKA.calDateKA.data(day,month,year);


}

function setDateFormatforNewTransfer()
{
  var id = frmNewTransferKA.lblTransactionIdKA.text;
  if(!(id !== null && id !=="")){
     
  var date = new Date();
  var year =   date.getFullYear();
  var month = date.getMonth()+1;
  var day = date.getDate();
  var startdate=[day,month,year];
  var endDate = [day,month,year+1];
  frmNewTransferKA.lblCurrencyType.text=kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(0,kony.retailBanking.globalData.globals.CurrencyCode).slice(0,1);
  frmNewTransferKA.calDateKA.validStartDate=startdate;
  frmNewTransferKA.calDateKA.validEndDate=endDate;
  frmNewTransferKA.calDateKA.dateComponents = [parseFloat(day), parseFloat(month), parseFloat(year), 0.0, 0.0, 0.0];
  
  var month2,day2;
      day2 = parseInt(day);
      month2 = parseInt(month);
      if(month2 <10){
        month2 = "0"+month2;
      }
      if(day2 <10){
        day2 = "0"+day2;
      }
      var formattedDate = year+"-"+month2+"-"+day2;
      var scheduledDate2 = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(formattedDate);
 	  frmNewTransferKA.lblTransferDateKA.text = scheduledDate2; 
  }
}

function newTransferPostShow(){
  // scroll to top of form
  frmNewTransferKA.scrollToBeginning();
}

// Reset Transfer card on Hide
function newTransferHide(){
  //frmNewTransferKA.destroy();
  /*frmNewTransferKA.amountTextField.text = null;
  editAccountCard(frmNewTransferKA, "to");
  editAccountCard(frmNewTransferKA, "from");
  editAmountCard(frmNewTransferKA);*/
}

/**
 Used to get From Details From Segement.
*/
function getSegInternalAccountsKARecordClick(segName,fromForm,accountName,amount,accountNumber,color,bankName)
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController(fromForm);
  var viewModel = controller.getFormModel();
  var index = viewModel.getViewAttributeByProperty(segName, "selectedRowIndex");
  var selIndex = Math.floor(index[1]);
  var selectedAccountRecord  = frmNewTransferKA[segName].selectedRowItems[0];
  viewModel.setViewAttributeByProperty(accountName,"text",selectedAccountRecord.accountName);
  viewModel.setViewAttributeByProperty(amount,"text",selectedAccountRecord.availableBalance);
  viewModel.setViewAttributeByProperty(accountNumber,"text",selectedAccountRecord.accountID);
  //viewModel.setViewAttributeByProperty(color,"skin",selectedAccountRecord.sknColor.skin);
   viewModel.setViewAttributeByProperty(bankName,"text",selectedAccountRecord.bankName);
  if(color==="fromAccountColorPick")
    frmNewTransferKA.fromAccountColorPick.skin = selectedAccountRecord.sknColor.skin;
  else if(color === "toAccountColorPick")
    frmNewTransferKA.toAccountColorPick.skin = selectedAccountRecord.sknColor.skin;

  return selIndex;
}

/**
setToTransferAccountsAfterSelectionOfFromAccount
*/
function setToTransferAccountsAfterSelectionOfFromAccount(fromForm,segName,index)
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController(fromForm);
  var viewModel = controller.getFormModel();
  var accountsData =  kony.retailBanking.globalData.accounts.getAccountsData();

  //viewModel.setViewAttributeByProperty("lblTransactionType","text",kony.retailBanking.globalData.globals.TransferMoney);
frmNewTransferKA.lblTransactionType.text = kony.retailBanking.globalData.globals.TransferMoney;
  //var toAccountData = accountsData.splice(Math.floor(index),1);
  if(segName=="segInternalTOAccountsKA")
  {
    // frmNewTransferKA.segInternalTOAccountsKA.removeAt(index,0);
  }
  else
  {
    // frmNewTransferKA.segInternalFromAccountsKA.removeAt(index,0); 

  }
  selectedSegementRowIndex = index;
  //  viewModel.setWidgetData(segName,accountsData);
}

/**
Used To Reset the Accounts Data
*/

function resetTOAccountData(fromSegName,toSegName,fromForm)
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController(fromForm);
  var viewModel = controller.getFormModel();
  var index ;
  if(fromSegName === "segInternalFromAccountsKA")  
    var fromAccountNumber =  viewModel.setViewAttributeByProperty("fromlblAccountNumberKA","text","");
  else
    var toAccountNumber =    viewModel.setViewAttributeByProperty("tolblAccountNumberKA","text","");
}

/**
Used To Navigate The ConfirmTransfer
*/
function newConfirmAccountTransfer()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmNewTransferKA");
  var viewModel = controller.getFormModel();
  var amount = viewModel.getViewAttributeByProperty("amountTextField","text");
  var fromAccountBal =   viewModel.getViewAttributeByProperty("fromAmountPick","text");
  fromAccountBal = fromAccountBal.slice(2);
  var fromIndex = viewModel.getViewAttributeByProperty("segInternalFromAccountsKA", "selectedRowIndex");
  var toIndex = viewModel.getViewAttributeByProperty("segInternalTOAccountsKA", "selectedRowIndex");
  var fromAccountNumber =  viewModel.getViewAttributeByProperty("fromlblAccountNumberKA","text");
  var toAccountNumber =    viewModel.getViewAttributeByProperty("tolblAccountNumberKA","text");

  if((fromAccountNumber !== "" && fromAccountNumber !== null)  && (toAccountNumber !== "" && toAccountNumber !== null)){

    if(fromAccountNumber === toAccountNumber)
    {
      alert(i18n_sameAccountAlert);
    }else{
      amount = amount;
      if((amount===null) || (amount==="") || (Number(amount)< 1))
      {
        alert(i18n_validAmountAlert);
      }else //if((Number(amount)<=Number(fromAccountBal)))
      {
		INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
		 listController = INSTANCE.getFormController("frmNewTransferKA");
        listController.performAction("saveData");
      }/*else
      {
        kony.ui.Alert({
          "message": i18n_unsufficientAmountAlert,
          "alertType": constants.ALERT_TYPE_INFO,
          "alertTitle":i18n_btnInfo,
          "yesLabel": "MODIFY",
          "noLabel": null,
          "alertHandler":onModifyClick
        },{});
      }*/
    }
  }else if((fromAccountNumber !=="" && fromAccountNumber !== null) && (toAccountNumber === "" || toAccountNumber === null)){
    alert(i18n_selectToAccountAlert);
  }else if((fromAccountNumber ==="" || fromAccountNumber === null) && (toAccountNumber !== "" && toAccountNumber !== null)){
    alert(i18n_selectFromAccountAlert);
  }else{
    alert(i18n_selectTonFromAccountAlert);
  }
}

function onModifyClick()
{
  frmNewTransferKA.amountTextField.text="";
  frmNewTransferKA.amountTextField.placeholder="0";
  frmNewTransferKA.amountTextField.setFocus(true);
}

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
      fromData.push(fromProcessData[i]);
      toData.push(fromProcessData[i]); 
    }else if(fromAccountsData[i]["supportTransferFrom"]==="1")
    {
      if( fromAccountsData[i]["nickName"]!== null|| fromAccountsData[i]["nickName"]!== "")
        fromProcessData[i]["accountName"] = fromAccountsData[i]["nickName"];
      fromProcessData[i]["availableBalance"] = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(fromAccountsData[i]["availableBalance"],kony.retailBanking.globalData.globals.CurrencyCode);
      fromProcessData[i]["sknColor"]= {skin:getSkinColor(fromAccountsData[i]["accountType"])};

      fromData.push(fromProcessData[i]);
    }else if(fromAccountsData[i]["supportTransferTo"]==="1")
    {
      if( fromAccountsData[i]["nickName"]!== null|| fromAccountsData[i]["nickName"]!== "")
        fromProcessData[i]["accountName"] = fromAccountsData[i]["nickName"];
      fromProcessData[i]["availableBalance"] = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(fromAccountsData[i]["availableBalance"],kony.retailBanking.globalData.globals.CurrencyCode);      
      fromProcessData[i]["sknColor"]= {skin:getSkinColor(fromAccountsData[i]["accountType"])};
      toData.push(fromProcessData[i]); 
    }
  }
  fromdatalength = fromData.length;
  todatalength = toData.length;
  return [fromData,toData];
}

function getFilteredFromAndToAccountsBySkinTablet(fromAccountsData)
{
  // var fromProcessData = data.segInternalFromAccountsKA.segInternalFromAccountsKA.getData();
   var fromProcessData = fromAccountsData;
  var fromData = [];
  var toData = [];
  for(var i in fromAccountsData)
  {
    fromAccountsData[i]["availBalanView"] = i18n_availableBalance;
    if(fromAccountsData[i]["supportTransferFrom"]==="1"&&fromAccountsData[i]["supportTransferTo"]==="1")
    {
      if( fromAccountsData[i]["nickName"]!== null|| fromAccountsData[i]["nickName"]!== "")
        fromProcessData[i]["accountName"] = fromAccountsData[i]["nickName"];

      fromProcessData[i]["availableBalance"] = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(fromAccountsData[i]["availableBalance"],kony.retailBanking.globalData.globals.CurrencyCode);
      fromProcessData[i]["sknColor"]= {skin:getSkinColor(fromAccountsData[i]["accountType"])};
      fromData.push(fromProcessData[i]);
      toData.push(fromProcessData[i]); 
    }else if(fromAccountsData[i]["supportTransferFrom"]==="1")
    {
      if( fromAccountsData[i]["nickName"]!== null|| fromAccountsData[i]["nickName"]!== "")
        fromProcessData[i]["accountName"] = fromAccountsData[i]["nickName"];
      fromProcessData[i]["availableBalance"] = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(fromAccountsData[i]["availableBalance"],kony.retailBanking.globalData.globals.CurrencyCode);
      fromProcessData[i]["sknColor"]= {skin:getSkinColor(fromAccountsData[i]["accountType"])};

      fromData.push(fromProcessData[i]);
    }else if(fromAccountsData[i]["supportTransferTo"]==="1")
    {
      if( fromAccountsData[i]["nickName"]!== null|| fromAccountsData[i]["nickName"]!== "")
        fromProcessData[i]["accountName"] = fromAccountsData[i]["nickName"];
      fromProcessData[i]["availableBalance"] = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(fromAccountsData[i]["availableBalance"],kony.retailBanking.globalData.globals.CurrencyCode);      
      fromProcessData[i]["sknColor"]= {skin:getSkinColor(fromAccountsData[i]["accountType"])};
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


//Frequency Function
function frequencyOnClick(row)
{
  putAllFrequencyOff();
  var inp;
  switch(row)
  {
    case 1 :	if(!frmNewTransferKA.ImgOneTimeKA.isVisible)
    {	
      frmNewTransferKA.ImgOneTimeKA.setVisibility(true);
    }
      inp = i18n_oneTIme;
      frmNewTransferKA.flxRecurrence.setVisibility(false);
      frmNewTransferKA.lblRecurringFromData.text="";
      frmNewTransferKA.lblRecurringTOData.text="";
      frmNewTransferKA.TbxNoofTimesKA.text="";
      break;
    case 2 :	if(!frmNewTransferKA.ImgDailyKA.isVisible)
    {	
      frmNewTransferKA.ImgDailyKA.setVisibility(true);
    }
      inp = i18n_daily;
      frmNewTransferKA.flxRecurrence.setVisibility(true);
      break;
    case 4 :	if(!frmNewTransferKA.ImgWeeklyKA.isVisible)
    {	
      frmNewTransferKA.ImgWeeklyKA.setVisibility(true);
    }
      inp = i18n_weeklyOnce;
      frmNewTransferKA.flxRecurrence.setVisibility(true);
      break;  
    case 5 :	if(!frmNewTransferKA.ImgEvery2WeeksKA.isVisible)
    {
      frmNewTransferKA.ImgEvery2WeeksKA.setVisibility(true);
    }
      inp = i18n_every2Weeks;
      frmNewTransferKA.flxRecurrence.setVisibility(true);
      break; 
    case 6 :  if(!frmNewTransferKA.ImgMonthlyKA.isVisible)
    {
      frmNewTransferKA.ImgMonthlyKA.setVisibility(true);
    }
      inp = i18n_monthlyOnce;
      frmNewTransferKA.flxRecurrence.setVisibility(true);
      break;         
  }
  onFrequencyClick(inp);
}

function putAllFrequencyOff()
{
  frmNewTransferKA.ImgOneTimeKA.setVisibility(false);
  frmNewTransferKA.ImgDailyKA.setVisibility(false);
  //frmNewTransferKA.ImgSpecifyDaysKA.setVisibility(false);
  frmNewTransferKA.ImgWeeklyKA.setVisibility(false);
  frmNewTransferKA.ImgEvery2WeeksKA.setVisibility(false);
  frmNewTransferKA.ImgMonthlyKA.setVisibility(false);
}


function RepeatRecentTransfer(tempdata)
{
  frmNewTransferKA.fromAccountColorPick.skin = null;
  frmNewTransferKA.toAccountColorPick.skin = null;
  frmNewTransferKA.fromAccountPick.opacity=1;
  frmNewTransferKA.toAccountPick.opacity=1
 // frmNewTransferKA.lblTransactionIdKA.text ="";
  //setDateFormatforNewTransfer();
  if(tempdata.isScheduled == "true")
  {
    var date = tempdata.scheduledDate;
    var year = date.slice(0,4);
    var month = date.slice(5,7);
    var day = date.slice(8,10);
    frmNewTransferKA.calDateKA.dateComponents = [parseFloat(day), parseFloat(month), parseFloat(year), 0.0, 0.0, 0.0];
      var formattedDate = year+"-"+month+"-"+day;
      var scheduledDate2 = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(formattedDate);
 	  frmNewTransferKA.lblTransferDateKA.text = scheduledDate2;
    
  }else{
   setDateFormatforNewTransfer();
  }
  //frmNewTransferKA.toCard.height = defaultCardHeight;
 // frmNewTransferKA.fromCard.height = defaultCardHeight;
  frmNewTransferKA.lblTransactionType.text = tempdata.transactionType;
  var todata = kony.retailBanking.globalData.accounts.searchAccountById(tempdata.toAccountNumber);
  var fromdata = kony.retailBanking.globalData.accounts.searchAccountById(tempdata.fromAccountNumber);  
  if(fromdata.nickName == null || fromdata.nickName === "")
    frmNewTransferKA.fromNamePick.text=fromdata.accountName;
  else
    frmNewTransferKA.fromNamePick.text=fromdata.nickName; 
  frmNewTransferKA.fromAccountColorPick.skin = getSkinColor(fromdata.accountType);
  frmNewTransferKA.fromAmountPick.text="";;
  frmNewTransferKA.fromAmountPick.text=kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(fromdata.availableBalance);
  if(tempdata.transactionType==kony.retailBanking.globalData.globals.ExternalTransfer)
  {
    frmNewTransferKA.tolblAccountNumberKA.text=tempdata.ExternalAccountNumber;
    frmNewTransferKA.toAccountColorPick.skin = null;
    //Need To Get This From Service
    frmNewTransferKA.toNamePick.text=tempdata.ExternalAccountNumber;
    frmNewTransferKA.toAmountPick.setVisibility(false);
    frmNewTransferKA.CopyamountAccountOne03ee5831d718349.setVisibility(false);
  }
  else
  {
    frmNewTransferKA.tolblAccountNumberKA.text=todata.accountID;
    if(todata.nickName == null || todata.nickName === "")
      frmNewTransferKA.toNamePick.text=todata.accountName;
    else
      frmNewTransferKA.toNamePick.text=todata.nickName; 
    frmNewTransferKA.toAccountColorPick.skin = getSkinColor(todata.accountType);
    frmNewTransferKA.toAmountPick.setVisibility(true);
    frmNewTransferKA.CopyamountAccountOne03ee5831d718349.setVisibility(true);
    frmNewTransferKA.toAmountPick.text="";
    frmNewTransferKA.toAmountPick.text=kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(todata.availableBalance);
  }
  var amount = (tempdata.amount).toString();
  frmNewTransferKA.amountTextField.text=amount.slice(1);
  frmNewTransferKA.lblTransferNotes.text=tempdata.transactionsNotes;
  frmNewTransferKA.fromlblAccountNumberKA.text=fromdata.accountID;
  frmNewTransferKA.lblTransactionIdKA.text = accountTransactionDetails.transactionId.text;
  navigateToNewTransfer(tempdata.transactionType);
  /*onclicksegment("to");
  //onclicksegment("from");
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController("frmNewTransferKA");
  var navObject = new kony.sdk.mvvm.NavigationObject();
  navObject.setRequestOptions("segInternalFromAccountsKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  listController.performAction("navigateTo",["frmNewTransferKA",navObject]); */
}
function RecentTransferSwitching(data)
{
  switch(data.transactionType)
  {
    case kony.retailBanking.globalData.globals.TransferMoney : 
    case kony.retailBanking.globalData.globals.ExternalTransfer : 
      RepeatRecentTransfer(data);
      setRecurringDetails(data);
      break;  
    case "BillPay"		  : EditPayBillTransfer(data);
      break;
    case "Deposit"		  :	break;
    case "P2P"              :OnEditTransaction(data);break;
  }      
}
function ButtonClickInRecentTransaction()
{
  var btnText =accountTransactionDetails.repeatTransactionButton.text;
  if(btnText==i18n_cancelBillPay || btnText==i18n_cancelTransferAlert || btnText==i18n_cancelTransferAlert)
  {
    kony.ui.Alert
    ({
      "message": i18n_cancelAlert,
      "alertType": constants.ALERT_TYPE_CONFIRMATION,
      "alertTitle":i18n_btnInfo,
      "yesLabel": i18n_YES,
      "noLabel": i18n_NO,
      "alertHandler":CancelAlertFunction
    },{});
  }
  else
  {
    accountTransactionDetails.transactionId.text = "";
    frmNewTransferKA.editToCard.setVisibility(true);
    var index = accountTransactionDetails.lblseletedIndex.text;
    var tempdata =[];
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var listController = INSTANCE.getFormController("accountTransactionDetails");
    var controllerContextData= listController.getContextData();
    var previousForm = kony.application.getPreviousForm().id;
    if(previousForm=="accountDetail"){
      var selData = controllerContextData.getCustomInfo("selectedTransactionObj");
      RecentTransferSwitching(selData);
    }else  if(previousForm=="frmSearchKA"){
      var selData = controllerContextData.getCustomInfo("selectedTransactionObj");
      RecentTransferSwitching(selData);
    }else{
      tempdata = kony.retailBanking.globalData.transfers.getTransfersData("recentTransactions");
      RecentTransferSwitching(tempdata[index]);
    }

  }
  kony.retailBanking.globalData.transfers.setTransferMainForm("transferPayLanding");
}

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
    RecentTransferSwitching(selData);
    setRecurringDetails(selData);
    frmNewTransferKA.lblTransactionIdKA.text=selData.transactionId;
  }else if(previousForm!="frmAccountDetailKA"){
    tempdata = kony.retailBanking.globalData.transfers.getTransfersData("scheduledTransactions");
    RecentTransferSwitching(tempdata[index]);
    setRecurringDetails(tempdata[index]);
    frmNewTransferKA.lblTransactionIdKA.text=tempdata[index].transactionId;
  }else{
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var listController = INSTANCE.getFormController("frmAccountDetailKA");
    var navigationObject = listController.getContextData();
    if(navigationObject && navigationObject.getCustomInfo("selectedAccountObj")){
      var accDetails =  navigationObject.getCustomInfo("selectedAccountObj");
      RecentTransferSwitching(accDetails);
      frmNewTransferKA.lblTransactionIdKA.text=accDetails.transactionId;
    }

  }
  frmNewTransferKA.editToCard.setVisibility(false);
}

function scheduleEditOnClickTablet()
{
  var index = accountTransactionDetails.lblseletedIndex.text;
  var tempdata =[];
  var previousForm = kony.application.getPreviousForm().id;
  if(previousForm=="frmSearchKA")
  {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var listController = INSTANCE.getFormController("frmRecentTransactionDetailsKA");
    var controllerContextData= listController.getContextData();
    var selData = controllerContextData.getCustomInfo("selectedTransactionObj");
    RecentTransferSwitching(selData);
    setRecurringDetails(selData);
    frmNewTransferKA.lblTransactionIdKA.text=selData.transactionId;
  }else if(previousForm!="accountDetail"){
    tempdata = kony.retailBanking.globalData.transfers.getTransfersData("scheduledTransactions");
    RecentTransferSwitching(tempdata[index]);
    //setRecurringDetails(tempdata[index]);
    frmNewTransferKA.lblTransactionIdKA.text=tempdata[index].transactionId;
  }else{
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var listController = INSTANCE.getFormController("frmAccountDetailKA");
    var navigationObject = listController.getContextData();
    if(navigationObject && navigationObject.getCustomInfo("selectedAccountObj")){
      var accDetails =  navigationObject.getCustomInfo("selectedAccountObj");
      RecentTransferSwitching(accDetails);
      frmNewTransferKA.lblTransactionIdKA.text=accDetails.transactionId;
    }

  }
  kony.retailBanking.globalData.transfers.setTransferMainForm("transferPayLanding");
  frmNewTransferKA.editToCard.setVisibility(false);
}


function CancelAlertFunction(res)
{
  var transactionId =  accountTransactionDetails.transactionId.text;
  if(res)
  {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var options ={    "access": "online",
                    "objectName": "RBObjects"
               };
    var headers = {"session_token":kony.retailBanking.globalData.session_token};
    var serviceName = "RBObjects";
    var modelObj = INSTANCE.getModel("Transactions",serviceName,options);
    var dataObject = new kony.sdk.dto.DataObject("Transactions");
    var record = {"transactionId":transactionId}; 
    dataObject.setRecord(record);
    var serviceOptions = {"dataObject":dataObject, "headers":{"session_token":kony.retailBanking.globalData.session_token}};
    modelObj.remove(serviceOptions, transactionDeleteSuccess, customErrorCallback);
  }
  function transactionDeleteSuccess(res)
  {
   // getTransferPayLandingForm("frmTransferPayLandingKA");
    onTransactionClose();
    rightContainer = "rightWrapper";
    getTransferPayLandingForm("frmTransferPayLandingKA");
  }
  
}

//Fetch ExternalAccount Data
function fetchExternalAccountData(){
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
    externaldatalength = response.length;
    frmNewTransferKA.segExternalTOAccountsKA.widgetDataMap={
      lblContact:"nickName",
      lblAccountNumberKA : "accountNumber"
    };

    for(var i=0;i< response.length;i++)
    {       
      if(response[i].nickName === "" || response[i].nickName ==null)
      {
        response[i].nickName = response[i].beneficiaryName;
      }  
      resData.push(response[i]);
    }
    frmNewTransferKA.segExternalTOAccountsKA.setData(resData);
  }
}


function setExtrenalToAccountTransfer(fromForm)
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController(fromForm);
  var viewModel = controller.getFormModel();
  viewModel.setViewAttributeByProperty("toNamePick","text",frmNewTransferKA.segExternalTOAccountsKA.selectedRowItems[0].nickName);
  viewModel.performActionOnView("CopyamountAccountOne03ee5831d718349","setVisibility",[false]);
  viewModel.performActionOnView("toAmountPick","setVisibility",[false]);
  viewModel.setViewAttributeByProperty("tolblAccountNumberKA","text",frmNewTransferKA.segExternalTOAccountsKA.selectedRowItems[0].accountNumber);
  frmNewTransferKA.toAccountColorPick.skin = null;
  frmNewTransferKA.lblTransactionType.text = kony.retailBanking.globalData.globals.ExternalTransfer;

}

function getAllToFieldsVisible(fromForm)
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController(fromForm);
  var viewModel = controller.getFormModel();
  viewModel.performActionOnView("CopyamountAccountOne03ee5831d718349","setVisibility",[true]);
  viewModel.performActionOnView("toAmountPick","setVisibility",[true]);
}

function RecurringChanges(res)
{
  switch(res)
  {
    case "1" :frmNewTransferKA.RecurrenceTitleKA.setVisibility(true);
      frmNewTransferKA.flxMainRecurringKA.setVisibility(true);
      frmNewTransferKA.flxRecurrencePickerKA.setVisibility(false);
      break;
    case "2" :  frmNewTransferKA.RecurrenceTitleKA.setVisibility(false);
      frmNewTransferKA.flxMainRecurringKA.setVisibility(false);
      frmNewTransferKA.flxRecurrencePickerKA.setVisibility(true);
      frmNewTransferKA.btnADDKA.text="Edit";
      break;
    case "3" :  frmNewTransferKA.TbxNoofTimesKA.setVisibility(true);
      frmNewTransferKA.flxCalenders.setVisibility(false);
      frmNewTransferKA.lblRecurringFromData.text="";
      frmNewTransferKA.lblRecurringTOData.text="";
      frmNewTransferKA.CalenderFrom.dateComponents = "";
      frmNewTransferKA.CalenderTo.dateComponents = "";
      break;
    case "4" :frmNewTransferKA.TbxNoofTimesKA.text="";
      frmNewTransferKA.TbxNoofTimesKA.setVisibility(false);
      frmNewTransferKA.flxCalenders.setVisibility(true);
      DateFormatiingforRecurrence();
      break;
    case "5" :if(frmNewTransferKA.TbxNoofTimesKA.isVisible)
    {
      RecurringChanges("6");
    }
      else
      {
        frmNewTransferKA.TbxNoofTimesKA.text="";
      }
      break;
    case "6" :   var inp = frmNewTransferKA.TbxNoofTimesKA.text;
      frmNewTransferKA.lblNoofTimesKA.text=inp;
      frmNewTransferKA.flxDates.setVisibility(false);
      frmNewTransferKA.lblNoofTimesKA.setVisibility(true);
      frmNewTransferKA.lblRecurringFromData.text="";
      frmNewTransferKA.lblRecurringTOData.text="";
      RecurringChanges("2");
      break;
    case "7" :  frmNewTransferKA.CalenderTo.dateComponents = frmNewTransferKA.CalenderFrom.dateComponents;
      break;
    case "8" :  if(frmNewTransferKA.flxCalenders.isVisible)
    {
      var datefrom = frmNewTransferKA.CalenderFrom.dateComponents;
      var dateto = frmNewTransferKA.CalenderTo.dateComponents;
      
      var month,day,month1,day1;
      day = parseInt(datefrom[0]);
      month = parseInt(datefrom[1]);
      if(month <10){
        month = "0"+month;
      }
      if(day <10){
        day = "0"+day;
      }
      var formattedDate1 = day+"/"+month+"/"+datefrom[2];
      day1 = parseInt(dateto[0]);
      month1 = parseInt(dateto[1]);
      if(month1 <10){
        month1 = "0"+month1;
      }
      if(day1 <10){
        day1 = "0"+day1;
      }
      var formattedDate2 = day1+"/"+month1+"/"+dateto[2];
      frmNewTransferKA.lblRecurringFromData.text = formattedDate1;
      frmNewTransferKA.lblRecurringTOData.text = formattedDate2; 
         
      //frmNewTransferKA.lblRecurringFromData.text = datefrom[0]+"/"+datefrom[1]+"/"+datefrom[2];
      //frmNewTransferKA.lblRecurringTOData.text = dateto[0]+"/"+dateto[1]+"/"+dateto[2]; 
      frmNewTransferKA.flxDates.setVisibility(true);
      frmNewTransferKA.TbxNoofTimesKA.text="";
      frmNewTransferKA.lblNoofTimesKA.setVisibility(false);
      frmNewTransferKA.lblNoofTimesKA.text="";
      RecurringChanges("2");
    }
      break;
    default : alert(i18n_default);
  }
} 

function DateFormatiingforRecurrence()
{
  var date = frmNewTransferKA.calDateKA.dateComponents;
  frmNewTransferKA.CalenderFrom.dateComponents=date;
  frmNewTransferKA.CalenderFrom.validStartDate=[date[0],date[1],date[2]];
  frmNewTransferKA.CalenderFrom.validEndDate=[date[0],date[1],date[2]+1];
  frmNewTransferKA.CalenderTo.dateComponents=date;
  frmNewTransferKA.CalenderTo.validStartDate=[date[0],date[1],date[2]];
  frmNewTransferKA.CalenderTo.validEndDate=[date[0],date[1],date[2]+1];
}

function getIncreasedDate()
{
  switch(month)
  {
    case "1"  :
    case "3"  :
    case "5"  :
    case "7"  :
    case "8"  :
    case "10"   :
    case "12" :
      break;
    case "4"  :
    case "6"  :
    case "9"  :
    case "11" :
      break;
    case "2"  :
      break;
  }
}

function setRecurringDetails(tempData)
{
  if(tempData.frequencyType !==undefined)
  {
    if(tempData.frequencyType === "Once"){
      frequencyOnClick(1);
    } else if(tempData.frequencyType === "Daily"){
      frequencyOnClick(2);
    }else if(tempData.frequencyType === "Weekly"){
      frequencyOnClick(4);
    }else if(tempData.frequencyType === "BiWeekly"){
      frequencyOnClick(5);
    }else if(tempData.frequencyType === "Monthly"){
      frequencyOnClick(6);
    }
    //onFrequencyClick(tempData.frequencyType);
    if(tempData.numberOfRecurrences !== undefined && tempData.numberOfRecurrences !== "" && tempData.numberOfRecurrences !== "0")
    {
      frmNewTransferKA.lblNoofTimesKA.text = tempData.numberOfRecurrences; 
      frmNewTransferKA.TbxNoofTimesKA.text=tempData.numberOfRecurrences; 
      frmNewTransferKA.lblNoofTimesKA.setVisibility(true);
      frmNewTransferKA.flxRecurrence.setVisibility(true);
      frmNewTransferKA.flxDates.setVisibility(false);
       RecurringChanges("2");
       RecurringChanges("3");
    }else if(tempData.frequencyStartDate !== undefined)
    {
      frmNewTransferKA.lblNoofTimesKA.setVisibility(false);
      frmNewTransferKA.lblNoofTimesKA.text="";
      frmNewTransferKA.TbxNoofTimesKA.setVisibility(false);
      frmNewTransferKA.TbxNoofTimesKA.text="";
      frmNewTransferKA.flxCalenders.setVisibility(true);
      DateFormatiingforRecurrence();
      
      var fromDate = tempData.frequencyStartDate;
      var fYear = fromDate.slice(0,4);
      var fMonth = fromDate.slice(5,7);
      var fDay = fromDate.slice(8,10);
      var toDate = tempData.frequencyEndDate;
      var tYear = toDate.slice(0,4);
      var tMonth = toDate.slice(5,7);
      var tDay = toDate.slice(8,10);
      frmNewTransferKA.CalenderFrom.dateComponents = [parseFloat(fDay), parseFloat(fMonth), parseFloat(fYear), 0.0, 0.0, 0.0];
      frmNewTransferKA.CalenderTo.dateComponents = [parseFloat(tDay), parseFloat(tMonth), parseFloat(tYear), 0.0, 0.0, 0.0];
      frmNewTransferKA.lblRecurringFromData.text = fDay+"/"+fMonth+"/"+fYear;
      frmNewTransferKA.lblRecurringTOData.text = tDay+"/"+tMonth+"/"+tYear; 
      frmNewTransferKA.flxDates.setVisibility(true);
      frmNewTransferKA.flxRecurrence.setVisibility(true);
      RecurringChanges("2");
     // RecurringChanges("4");
      
     // RecurringChanges("8");
    }
  }else 
  {
    frmNewTransferKA.flxDates.setVisibility(false);
    frmNewTransferKA.flxRecurrence.setVisibility(false);
    RecurringChanges("8");
  }
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
      alert(i18n_sameAccountAlert);
    }
  }
}

function navigateToNewTransfer(transactionType){
  var frmName = kony.application.getPreviousForm().id;
 if((transactionType == kony.retailBanking.globalData.globals.TransferMoney) ||
	(transactionType == kony.retailBanking.globalData.globals.ExternalTransfer))
    {
      frmName = "frmNewTransferKA";
      fetchExternalAccountData();
      var  accPreviewData= kony.retailBanking.globalData.accounts.getAccountsData();
              kony.retailBanking.datastore.setAccountListObject(accPreviewData);
              kony.retailBanking.globalData.accounts.setAccountsData(accPreviewData);
              var tempdata =  getFilteredFromAndToAccountsBySkinTablet(accPreviewData);
           
              frmNewTransferKA.segInternalFromAccountsKA.widgetDataMap={
              nameAccount1:"accountName",
              amountAccount1:"availableBalance",
              typeAccountBalanceView:"availBalanView",
              typeAccount:"accountType",
              colorAccount1:"sknColor",
              lblBankName:"bankName"
              };
              frmNewTransferKA.segInternalTOAccountsKA.widgetDataMap={
              nameAccount1:"accountName",
              amountAccount1:"availableBalance",
              typeAccountBalanceView:"availBalanView",
              typeAccount:"accountType",
              colorAccount1:"sknColor",
              lblBankName:"bankName"
              };
          
                    
          fromBilldatalength = tempdata.length;
          frmNewTransferKA.segInternalFromAccountsKA.setData(tempdata[0]);
          frmNewTransferKA.segInternalTOAccountsKA.setData(tempdata[1]);
      frmNewTransferKA.fromAccountPick.setVisibility(true);
      frmNewTransferKA.toAccountPick.setVisibility(true);
      frmNewTransferKA.fromCardInner.setVisibility(false);
      frmNewTransferKA.toCardInner.setVisibility(false);
    }
      
   var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
   var listController = INSTANCE.getFormController(frmName);
   var navigationObject = new kony.sdk.mvvm.NavigationObject();
   navigationObject.setDataModel(null,kony.sdk.mvvm.OperationType.ADD, "form");
   listController.setContextData(navigationObject);
   listController.getFormModel().showView();
   //var navigationObject = new kony.sdk.mvvm.NavigationObject();
   //navigationObject.setDataModel(null,kony.sdk.mvvm.OperationType.ADD, "form");
   //navigationObject.setRequestOptions("segInternalFromAccountsKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
   //listController.performAction("showView");
 // newTransferPreShow();
}

function navigateToTransferConfirmPageTablet(dataMap){
  
var scopeObj = this;
      kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Loading Form");
      
  
      var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
      var listController = INSTANCE.getFormController("frmNewTransferKA");
      var transferformModel = listController.getFormModel();
	  var frequency = transferformModel.getViewAttributeByProperty("frequencyPickLabel","text");  
 	  var todate = dataMap[0].frequencyEndDate;
      var NoofTimes = dataMap[0].numberOfRecurrences;
      if((todate == "" || todate == null)&&(NoofTimes =="" || NoofTimes == null))
        {
          NoofTimes = "1"; 
        }
  	  frmConfirmTransferKA.CopynotesWrapper03de47f39b8bc46.setVisibility(true);
  	  frmConfirmTransferKA.flxReccurrence.setVisibility(true);
      frmConfirmTransferKA.transactionAmount.text= kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(dataMap[0].amount);
  	  frmConfirmTransferKA.transactionDate.text = "Transfer To";
      frmConfirmTransferKA.transactionName.text= dataMap[0].toAccountName;
      frmConfirmTransferKA.toAccountNumberKA.text= dataMap[0].toAccountNumber;
      frmConfirmTransferKA.transactionFrom.text= dataMap[0].fromAccountName;
      frmConfirmTransferKA.fromAccountNumberKA.text= dataMap[0].fromAccountNumber;
      frmConfirmTransferKA.lblScheduledDate.text= dataMap[0].scheduledDate;
      frmConfirmTransferKA.lblReccurrenceValue.text=frequency;
      frmConfirmTransferKA.lblReccuureceFreq.text= dataMap[0].numberOfRecurrences;
      frmConfirmTransferKA.transactionNotes.text= dataMap[0].transactionsNotes;
      frmConfirmTransferKA.lblfromDateKA.text= dataMap[0].frequencyStartDate;
      frmConfirmTransferKA.lblToDateKA.text= dataMap[0].frequencyEndDate;
  	  var recur = frmNewTransferKA.flxRecurrence.isVisible;
      if(recur)
      {
         if(NoofTimes=="" || NoofTimes==null )
        {
          if(!(todate == "" || todate == null ))
          {
            frmConfirmTransferKA.flxDateRange.setVisibility(true);
            frmConfirmTransferKA.lblReccuureceFreq.setVisibility(false);
            frmConfirmTransferKA.flxFrequency.setVisibility(false);
          }
          else
          {
            frmConfirmTransferKA.flxDateRange.setVisibility(false);
            frmConfirmTransferKA.lblReccuureceFreq.setVisibility(false);
            frmConfirmTransferKA.flxFrequency.setVisibility(false);
            frmConfirmTransferKA.lblReccuureceFreq.text="";
            frmConfirmTransferKA.lblfromDateKA.text="";
            frmConfirmTransferKA.lblToDateKA.text="";
          }
        }
        else
        {
          frmConfirmTransferKA.flxDateRange.setVisibility(false);
          frmConfirmTransferKA.lblReccuureceFreq.setVisibility(true);
          frmConfirmTransferKA.flxFrequency.setVisibility(true);
        }
      } else
      {
        frmConfirmTransferKA.flxDateRange.setVisibility(false);
        frmConfirmTransferKA.flxFrequency.setVisibility(false);
        frmConfirmTransferKA.lblReccuureceFreq.setVisibility(false);
        frmConfirmTransferKA.lblReccuureceFreq.text="";
        frmConfirmTransferKA.lblfromDateKA.text="";
        frmConfirmTransferKA.lblToDateKA.text="";
      }
  kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
  NewTransferdata = dataMap[0];
      frmConfirmTransferKA.show();

}
function formatTransferDate(){
  	  var scheduledDate = frmNewTransferKA.calDateKA.dateComponents;
 	  var month,day;
      day = parseInt(scheduledDate[0]);
      month = parseInt(scheduledDate[1]);
      if(month <10){
        month = "0"+month;
      }
      if(day <10){
        day = "0"+day;
      }
      var formattedDate = scheduledDate[2]+"-"+month+"-"+day;
      var scheduledDate2 = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(formattedDate);
  	  frmNewTransferKA.lblTransferDateKA.text = scheduledDate2;
}

/*
funtion setTranstionUI(formName,successback,errback){
  getTransferPayLandingForm(formName);
  successback.call();
}
*/
function newtransactionStatusCode(statuscode,id)
{
  successForm.successIcon.isVisible = false;
  successFormPreShow();
  if(statuscode)
    {
           successForm.successText.text=i18n_referenceId+" : "+id;
    }
  else
    {
            successForm.successText.text=i18n_transactionUpdateAlert;
    }
            successForm.processing.text=i18n_processingTransaction;
           successForm.successTitle.text=i18n_successtext+" ";
           successForm.show();
         successFormPostShow();
          successForm.successIcon.isVisible = true;
}


function onConfirmEditClick()
{
  var frmName = kony.application.getCurrentForm().id;
 if(frmName == "frmConfirmTransferKA" )
  { 
  	if(NewTransferdata!="")
    	{
      		frmNewTransferKA.amountTextField.text= NewTransferdata.amount;
      		frmNewTransferKA.toNamePick.text= NewTransferdata.toAccountName;
      		frmNewTransferKA.tolblAccountNumberKA.text= NewTransferdata.toAccountNumber;
      		frmNewTransferKA.fromNamePick.text= NewTransferdata.fromAccountName;
      		frmNewTransferKA.fromlblAccountNumberKA.text= NewTransferdata.fromAccountNumber;
      //frmNewTransferKA.lblTransferDateKA.text= scheduledDate2;
      //frmNewTransferKA.lblReccurrenceValue.text=frequency;
      		frmNewTransferKA.lblNoofTimesKA.text= NewTransferdata.numberOfRecurrences;
      		frmNewTransferKA.lblTransferNotes.text= NewTransferdata.transactionsNotes;
      		frmNewTransferKA.CalenderFrom.text= NewTransferdata.frequencyStartDate;
      		frmNewTransferKA.CalenderTo.text= NewTransferdata.frequencyEndDate;
      		frmNewTransferKA.lblTransactionType.text=NewTransferdata.transactionType;

		}
  }
  
  else if(frmName== "frmTransferPayLandingKA")
    {
      frmNewTransferKA.frequencyPickLabel.text = i18n_oneTIme;
    }
}

function navigateToTransfer(){
  fetchExternalAccountData();
   kony.retailBanking.globalData.transfers.setTransferMainForm("transferPayLanding");
   var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
   var listController = INSTANCE.getFormController("frmNewTransferKA");
   var navigationObject = new kony.sdk.mvvm.NavigationObject();
   navigationObject.setDataModel(null,kony.sdk.mvvm.OperationType.ADD, "form");
   navigationObject.setRequestOptions("segInternalFromAccountsKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
   listController.performAction("navigateTo",["frmNewTransferKA",navigationObject]);
 // newTransferPreShow();
   
}

function navigateToTransactionDetailsTablet(fromForm,toForm,segName){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController(fromForm);
  var viewModel = controller.getFormModel();
  var index = viewModel.getViewAttributeByProperty(segName, "selectedRowIndex");
  var response,tempDate;
  accountTransactionDetails.lblseletedIndex.text=index[1];
  var selectedTransactionRecord = getSelectedRecord(index[1],fromForm,segName);
 settingDataForTransactionDetails(selectedTransactionRecord,fromForm);
}


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

function afterComfirmClick()
{
   var prevform = kony.application.getPreviousForm().id;
   var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
var listController = INSTANCE.getFormController(prevform);
listController.performAction("saveTransferData");
}

function transactionErrorCallback(err)
{
		successForm.successText.text = i18n_transactionFailed;
        successForm.successTitle.text = i18n_FailedMsg;
        successForm.processing.text = i18n_processingTransaction;
        errorFormPostShow();
        kony.sdk.mvvm.log.error("In saveData errorcallback in controller extension ", err);
}
function OndevicebackClick()
{
  
}
