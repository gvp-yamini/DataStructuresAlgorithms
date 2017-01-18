function getDeposits(form)
{
  clearRightContainer(frmDepositPayLandingKA,"recentTransactionWrapper","rightWrapper");
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController(form);
  var navObject = new kony.sdk.mvvm.NavigationObject();
  navObject.setRequestOptions("recentTransactions",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"transactionType": "Deposit"}});
  listController.performAction("loadDataAndShowForm",[navObject]);

}

function clearRightContainer(frmName,clearWidget,showWrapper)
{
  if (frmName[clearWidget] !== null)
  {
       frmName.remove( frmName[clearWidget]);
       if( frmName[showWrapper] !== null)
   		{
             frmName[showWrapper].left=leftContainerWidth;
             frmName[showWrapper].opacity=1;
        }
  }
}

function setDepositListData(data,recentSeg){
  var depositData = data[recentSeg];
  var recentSegData = [];
  var pendingSegData = [];
  var tempDate;
  for(var i in depositData){
    if(depositData[i].statusDescription  && depositData[i].statusDescription == "Successful"){
       tempDate =kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(depositData[i]["transactionDate"], kony.retailBanking.util.BACKEND_DATE_FORMAT);
       depositData[i]["transactionDate"] = tempDate;
       depositData[i]["amount"] = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(depositData[i]["amount"],kony.retailBanking.globalData.globals.CurrencyCode);
       depositData[i]["description"] = depositData[i]["description"];
       depositData[i]["toAccountName"] =  depositData[i]["toAccountName"];
       depositData[i]["transactionsNotes"] = depositData[i]["transactionsNotes"];
       recentSegData.push(depositData[i]);
    }
    else{
       tempDate = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(depositData[i]["transactionDate"], kony.retailBanking.util.BACKEND_DATE_FORMAT);
       depositData[i]["transactionDate"] = tempDate;
       depositData[i]["amount"] = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(depositData[i]["amount"],kony.retailBanking.globalData.globals.CurrencyCode);
       depositData[i]["description"] = depositData[i]["description"];
       depositData[i]["toAccountName"] =  depositData[i]["toAccountName"];
       depositData[i]["transactionsNotes"] = depositData[i]["transactionsNotes"];
       pendingSegData.push(depositData[i]);
    }
  }
       
  if(recentSegData.length === 0)
  {
    frmDepositPayLandingKA.recentTransactions.setVisibility(false);
    frmDepositPayLandingKA.lblAlerts.setVisibility(true);
  }
  else
  {
    frmDepositPayLandingKA.recentTransactions.setVisibility(true);
    frmDepositPayLandingKA.lblAlerts.setVisibility(false);
  }


  if(pendingSegData.length === 0)
  {
    frmDepositPayLandingKA.scheduledTransactions.setVisibility(false);
    frmDepositPayLandingKA.lblAlerts2.setVisibility(true);
  }
  else
  {
    frmDepositPayLandingKA.scheduledTransactions.setVisibility(true);
    frmDepositPayLandingKA.lblAlerts2.setVisibility(false);
  }

  return [recentSegData,pendingSegData];
}


function navigateToDepositDetails(fromForm,toForm,segName){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController(fromForm);
  var viewModel = listController.getFormModel();
  var index = viewModel.getViewAttributeByProperty(segName,"selectedRowIndex");
  var selRecord = getSelectedRecord(index[1],fromForm,segName);
  recentDepositPreshow(fromForm,selRecord);
}
function navigateToPendingDepositDetails(){
  var selRecord  = frmDepositPayLandingKA.scheduledTransactions.selectedItems[0];
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController("frmDepositPayLandingKA");
  var navigationObject = listController.getContextData();
  navigationObject.setCustomInfo("selDeposit",selRecord);
 addRightPanel(frmRecentDepositKA.recentTransactionWrapper,"recentTransactionWrapper");
}

function recentDepositPreshow(fromform,selectedRecord){

  frmRecentDepositKA.transactionAmount.text = selectedRecord.amount;
  frmRecentDepositKA.transactionName.text = selectedRecord.description;
 frmRecentDepositKA.transactionFrom.text = selectedRecord.toAccountName;
 frmRecentDepositKA.lblTransactionDateValueKA.text = selectedRecord.transactionDate;

  if(selectedRecord.transactionsNotes)
  {
    frmRecentDepositKA.transactionNotes.text = selectedRecord.transactionsNotes;
    frmRecentDepositKA.flxNotesKA.setVisibility(true);
  }
  else
    frmRecentDepositKA.flxNotesKA.setVisibility(false);
  if(fromform == "frmDepositPayLandingKA"){
    addRightPanel(frmRecentDepositKA.recentTransactionWrapper,"recentTransactionWrapper");
  	retainSelectionOn("recentTransactions");
  	retainSelectionOff("scheduledTransactions");
  }
  else if(fromform == "accountsLanding"){
    // addRightPanel(frmRecentDepositKA.recentTransactionWrapper,"recentTransactionWrapper"); 
     onDepositTransactionSegmentRowClick();
  }
}

//NewDeposit

var segSelectflag=null;
function toAccountsDeposits(depositAccountsData,data){
   var fromProcessData = data.segInternalTOAccountsKA.segInternalTOAccountsKA.getData();
    var depositData = [];

  for(var i in depositAccountsData)
  {
    if(depositAccountsData[i]["supportDeposit"]=== "1")
    {
      fromProcessData[i]["availableBalance"] = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(depositAccountsData[i]["availableBalance"],kony.retailBanking.globalData.globals.CurrencyCode);
      fromProcessData[i]["sknColor"]={skin:getSkinColor(depositAccountsData[i]["accountType"])};
      fromProcessData[i]["accountName"]= i18n_availableBalance;
      depositData.push(fromProcessData[i]);
    }
  }
  depositheightlength = depositData.length;
  return [depositData];
}

function setSelctedToAccount(segName,fromForm,accountName,amount,accountNumber)
{
  segSelectflag=true;
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController(fromForm);
  var viewModel = controller.getFormModel();
  var selectedAccountRecord  = depositLanding.segInternalTOAccountsKA.selectedItems[0];
  viewModel.setViewAttributeByProperty("toAccountnumber","text",selectedAccountRecord.accountID);
  viewModel.setViewAttributeByProperty(accountName,"text",selectedAccountRecord.nickName);
  viewModel.setViewAttributeByProperty(amount,"text",selectedAccountRecord.availableBalance);
  viewModel.setViewAttributeByProperty(accountNumber,"text",selectedAccountRecord.accountID);
  viewModel.setViewAttributeByProperty("toAccountColorPick","skin",selectedAccountRecord.sknColor.skin);
 // return selIndex;
}

function onclicksegmentdeposit(type)
{
  type= type;
 // selectAccountCard(depositLanding,"to",1);
  depositLanding[type+"CardTitle"].setVisibility(false);
  depositLanding[type+"CardInner"].setVisibility(false);
  depositLanding[type+"AccountPick"].setVisibility(true);
}

function onclickDepositEdit(type)
{
  //editAccountCard(depositLanding, "to");
  type= type;
  depositLanding[type+"CardTitle"].setVisibility(true);
  depositLanding[type+"CardInner"].setVisibility(true);
  depositLanding[type+"AccountPick"].setVisibility(false);
}



function confirmDepositTransfer()
	{
	if(depositLanding.confirmTransaction.skin == "primaryActionDisabled")
	return;
	var back64Str,front64Str;
	if(kony.retailBanking.globalData.deviceInfo.isIpad()){
	 back64Str = depositLanding.backImageCapture.base64;
	 front64Str = depositLanding.frontImageCapture.base64;
  }
  else{
     back64Str = kony.convertToBase64(depositLanding.backImageCapture.rawBytes);
     front64Str = kony.convertToBase64(depositLanding.frontImageCapture.rawBytes);
  }
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("depositLanding");
  var viewModel = controller.getFormModel();
  var validated = true;
  validated= kony.retailBanking.util.validation.validateTextboxOrLabel(viewModel && viewModel.getViewAttributeByProperty("toNamePick","text"));
  if(validated){
    validated= kony.retailBanking.util.validation.validateTextboxOrLabel(viewModel && viewModel.getViewAttributeByProperty("amountTextField","text"));
  }
  if(validated){
  var amount = viewModel.getViewAttributeByProperty("amountTextField","text");
  var toAccountNumber = viewModel.getViewAttributeByProperty("toAccountnumber","text");
  var notes = viewModel.getViewAttributeByProperty("noteTextfield","text");
  var toAccountName = viewModel.getViewAttributeByProperty("toNamePick","text");
  var depositObj = {};
  depositObj.amount = amount;
  depositObj.toAccount = toAccountNumber;
  depositObj.toAccountName = toAccountName;
  depositObj.notes  = notes;
  depositObj.checkImgFront = front64Str;
  depositObj.checkImgBack = back64Str;
  
  var listController = INSTANCE.getFormController("frmConfirmDeposit");
  var navigationObject = new kony.sdk.mvvm.NavigationObject();
  navigationObject.setCustomInfo("dataDeposit",depositObj);
  navigationObject.setDataModel(null,kony.sdk.mvvm.OperationType.ADD, "form");
  navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  listController.performAction("navigateTo",["frmConfirmDeposit",navigationObject]); 
 }
}

function newDepositPreShow(){
  
  depositLanding.amountTextField.text="";
  depositLanding.noteTextfield.text = "";
  resetDepositLandingCameras();

}

function onDoneAmountEntered()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("depositLanding");
  var viewModel = controller.getFormModel();
  var amount=viewModel.getViewAttributeByProperty("amountTextField","text");
  var validated= kony.retailBanking.util.validation.validateTextboxOrLabel(viewModel && viewModel.getViewAttributeByProperty("amountTextField","text"));
  validated = validateDecimals(amount);
  if(validated){
    if ((amount===null) || (amount==="") || (Number(amount)<= 0) )
    {
      viewModel.setViewAttributeByProperty("confirmTransaction","skin","primaryActionDisabled");
      return false;
    }
    else{
     viewModel.setViewAttributeByProperty("confirmTransaction","skin","primaryAction");
  return true;}
  }
  else{
    viewModel.setViewAttributeByProperty("confirmTransaction","skin","primaryActionDisabled");
    return false;}

}
function navigateToSuccess(res){
  frmDepositSuccessKA.successTitle.text = res.success;
  frmDepositSuccessKA.successText.text = i18n_referenceId + " " + res.referenceId;
 //frmDepositSuccessKA.show();
  depositSuccessFormPostShow();
}

function depositSuccessFormPreShow() {
   frmDepositSuccessKA.successIcon.opacity=1;
    frmDepositSuccessKA.successIcon.skin = "successIcon";
    frmDepositSuccessKA.processing.opacity=1;
  	frmDepositSuccessKA.innerSuccessContainer.opacity = 0;
  	frmDepositSuccessKA.innerSuccessContainer.top = "100dp";
    frmDepositSuccessKA.successIcon2.isVisible = false;
    frmDepositSuccessKA.successImage2.opacity = 0;
  	frmDepositSuccessKA.successContinue.opacity = 0;
  	frmDepositSuccessKA.successContinue.top = "70dp";
}


function gotoDeposits()
{
  var isTnCAccepted=kony.retailBanking.globalData.globals.userObj.depositsTCaccepted;
  if (isTnCAccepted == "false")
    getTermsandConditions();
  else
    getDeposits("frmDepositPayLandingKA");
}
function getTermsandConditions()
{
  var scopeObj = this;
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var options ={    "access": "online",
                  "objectName": "RBObjects"
               };
  var headers = {"session_token":kony.retailBanking.globalData.session_token};
  var serviceName = "RBObjects";
  var modelObj = INSTANCE.getModel("Informationcontent",serviceName,options);
  var dataObject = new kony.sdk.dto.DataObject("Informationcontent");
  var serviceOptions = {"dataObject":dataObject,"headers":headers,"queryParams":{"infoType":"termsandconditions"}};
  modelObj.fetch(serviceOptions, tnCSuccess, customErrorCallback);
}

function tnCSuccess(response)
{
   // frmTermsnConditionsRDC.titleBarWrapper.skin=skncontainerBkgNone;
  	frmTermsnConditionsRDC.richTexttermsandconditions.text=response[0].infoContent;
   openModal(frmTermsnConditionsRDC.TnCWrapper,"TnCWrapper");
}

function updateTnCdepositsflag()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var options ={    "access": "online",
                "objectName": "RBObjects"
               };
  var headers = {"session_token":kony.retailBanking.globalData.session_token};
  var serviceName = "RBObjects";
  var modelObj = INSTANCE.getModel("User",serviceName,options);
  var record = {};
  record["areDepositTermsAccepted"] = true;
  var dataObject = new kony.sdk.dto.DataObject("User",record);
  var requestOptions = {"dataObject":dataObject, "headers":headers};
  modelObj.update(requestOptions, updateTnCSuccess, customErrorCallback);
}

function updateTnCSuccess(response)
{
  setUserObj();
  getDeposits("frmDepositPayLandingKA");
  
}


function depositsuccessanimationShow(){
    frmDepositSuccessKA.successIcon.isVisible = true;
    frmDepositSuccessKA.successIcon.skin = "successIcon";
   frmDepositSuccessKA.successImage2.src = "";
  	var transformSuccess1 = kony.ui.makeAffineTransform();
  	transformSuccess1.scale(0.6,0.6);
  	var transformSuccess2 = kony.ui.makeAffineTransform();
  	transformSuccess2.scale(0.75,0.75);
  	var transformSuccess3 = kony.ui.makeAffineTransform();
  	transformSuccess3.scale(0.9,0.9);
  	var transformSuccess4 = kony.ui.makeAffineTransform();
  	transformSuccess4.scale(1.0,1.0);
   
  	frmDepositSuccessKA.successIcon.animate(
        kony.ui.createAnimation({
          	"0":  {"transform": transformSuccess1 ,"stepConfig":{"timingFunction": easeIn}},
          	"15":{"transform": transformSuccess2 ,"stepConfig":{"timingFunction": easeIn}},
          	"30":{"transform": transformSuccess1 ,"stepConfig":{"timingFunction": easeIn}},
          	"45":{"transform": transformSuccess2 ,"stepConfig":{"timingFunction": easeIn}},
          	"60":{"transform": transformSuccess1 ,"stepConfig":{"timingFunction": easeIn}},
           "80":{"transform": transformSuccess3 ,"stepConfig":{"timingFunction": easeIn}},
          	"100":{"transform": transformSuccess1 ,"stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": backwards,"duration":4.0,"iterationCount":0,"delay": 0},
        {"animationStart": function () {},
          "animationEnd": function () {
          }}
    );
}
function errordepositFormPostShow(){
    frmDepositSuccessKA.successImage2.isVisible = true;
    frmDepositSuccessKA.successIcon2.skin = "successIcon";
    frmDepositSuccessKA.successImage2.src = "error.png";
    var transformSuccess1 = kony.ui.makeAffineTransform();
  	transformSuccess1.scale(0.6,0.6);
  	var transformSuccess2 = kony.ui.makeAffineTransform();
  	transformSuccess2.scale(0.75,0.75);
  	var transformSuccess3 = kony.ui.makeAffineTransform();
  	transformSuccess3.scale(1.1,1.1);
  	var transformSuccess4 = kony.ui.makeAffineTransform();
  	transformSuccess4.scale(1.0,1.0);
  
  	frmDepositSuccessKA.innerSuccessContainer.animate(
        kony.ui.createAnimation({"100":{"top": "-20dp", "opacity": 1 ,"stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards,"duration": duration, "delay": 3.1},
        {"animationEnd": function () {}}
    );
  
  	frmDepositSuccessKA.successContinue.animate(
        kony.ui.createAnimation({"100":{"top": "30dp", "opacity": 1 ,"stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards,"duration": duration, "delay": 3.3},
        {"animationEnd": function () {}}
    );
   frmDepositSuccessKA.successIcon2.isVisible = true;
  	frmDepositSuccessKA.successIcon2.animate(
        kony.ui.createAnimation({
          	"0":  {"transform": transformSuccess1 ,"stepConfig":{"timingFunction": easeIn}},
          	"15":{"transform": transformSuccess2 ,"stepConfig":{"timingFunction": easeIn}},
          	"30":{"transform": transformSuccess1 ,"stepConfig":{"timingFunction": easeIn}},
          	"45":{"transform": transformSuccess2 ,"stepConfig":{"timingFunction": easeIn}},
          	"60":{"transform": transformSuccess1 ,"stepConfig":{"timingFunction": easeIn}},
          	"80":{"transform": transformSuccess3 ,"stepConfig":{"timingFunction": easeIn}},
          	"100":{"transform": transformSuccess4 ,"stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards,"duration": 4.0, "delay": 0},
        {"animationStart": function () {frmDepositSuccessKA.successIcon.opacity=0;},
          "animationEnd": function () {}}
    );
  
  	frmDepositSuccessKA.successImage2.animate(
        kony.ui.createAnimation({
           	"0":{"transform": transformSuccess1 , "opacity": 0, "stepConfig":{"timingFunction": easeIn}},
          	"60":{"transform": transformSuccess3 , "opacity": 0.8, "stepConfig":{"timingFunction": easeIn}},
          	"100":{"transform": transformSuccess4 ,  "opacity": 1, "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards,"duration": 1.0, "delay": 2.6},
        { "animationStart": function () {frmDepositSuccessKA.successIcon2.skin = "sknerrorIcon";},
          "animationEnd": function () {}}
    );
  
  	frmDepositSuccessKA.processing.animate(
        kony.ui.createAnimation({
          	"65":{"opacity": 1, "stepConfig":{"timingFunction": easeIn}},
          	"80":{"opacity": 0, "stepConfig":{"timingFunction": easeIn}},
          	"100":{"opacity": 0, "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": 4.0},
        {"animationEnd": function () {}}
    ); 
}




function depositSuccessFormPostShow() {
  frmDepositSuccessKA.successImage2.isVisible = true;
    frmDepositSuccessKA.successIcon2.skin = "successIcon";
    frmDepositSuccessKA.successImage2.src = "success_large_check.png"
  	var transformSuccess1 = kony.ui.makeAffineTransform();
  	transformSuccess1.scale(0.6,0.6);
  	var transformSuccess2 = kony.ui.makeAffineTransform();
  	transformSuccess2.scale(0.75,0.75);
  	var transformSuccess3 = kony.ui.makeAffineTransform();
  	transformSuccess3.scale(1.1,1.1);
  	var transformSuccess4 = kony.ui.makeAffineTransform();
  	transformSuccess4.scale(1.0,1.0);
  
  	frmDepositSuccessKA.innerSuccessContainer.animate(
        kony.ui.createAnimation({"100":{"top": "-20dp", "opacity": 1 ,"stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards,"duration": duration, "delay": 3.1},
        {"animationEnd": function () {}}
    );
  
  	frmDepositSuccessKA.successContinue.animate(
        kony.ui.createAnimation({"100":{"top": "30dp", "opacity": 1 ,"stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards,"duration": duration, "delay": 3.3},
        {"animationEnd": function () {}}
    );
    frmDepositSuccessKA.successIcon2.isVisible = true;
  	frmDepositSuccessKA.successIcon2.animate(
        kony.ui.createAnimation({
          	"0":  {"transform": transformSuccess1 ,"stepConfig":{"timingFunction": easeIn}},
          	"15":{"transform": transformSuccess2 ,"stepConfig":{"timingFunction": easeIn}},
          	"30":{"transform": transformSuccess1 ,"stepConfig":{"timingFunction": easeIn}},
          	"45":{"transform": transformSuccess2 ,"stepConfig":{"timingFunction": easeIn}},
          	"60":{"transform": transformSuccess1 ,"stepConfig":{"timingFunction": easeIn}},
          	"80":{"transform": transformSuccess3 ,"stepConfig":{"timingFunction": easeIn}},
          	"100":{"transform": transformSuccess4 ,"stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards,"duration": 4, "delay":0},
        {"animationStart": function () {
                                        frmDepositSuccessKA.successIcon.opacity=0;
                                       },
          "animationEnd": function () {}}
    );
  	frmDepositSuccessKA.successImage2.animate(
        kony.ui.createAnimation({
           	"0":{"transform": transformSuccess1 , "opacity": 0, "stepConfig":{"timingFunction": easeIn}},
          	"60":{"transform": transformSuccess3 , "opacity": 0.8, "stepConfig":{"timingFunction": easeIn}},
          	"100":{"transform": transformSuccess4 ,  "opacity": 1, "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards,"duration": 1.0, "delay": 1.6},
        {"animationEnd": function () {}}
    );
   
  	frmDepositSuccessKA.processing.animate(
        kony.ui.createAnimation({
          	"65":{"opacity": 1, "stepConfig":{"timingFunction": easeIn}},
          	"80":{"opacity": 0, "stepConfig":{"timingFunction": easeIn}},
          	"100":{"opacity": 0, "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": 2.0},
        {"animationEnd": function () {}}
    ); 
}
