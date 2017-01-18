function getDeposits(form)
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController(form);
  var navObject = new kony.sdk.mvvm.NavigationObject();
  navObject.setRequestOptions("recentTransactions",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"transactionType": "Deposit"}});
  listController.performAction("navigateTo",[form,navObject]); 
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


function navigateToDepositDetails(){
  var selRecord  = frmDepositPayLandingKA.recentTransactions.selectedItems[0];
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController("frmDepositPayLandingKA");
  var navigationObject = listController.getContextData();
  navigationObject.setCustomInfo("selDeposit",selRecord);
}
function navigateToPendingDepositDetails(){
  var selRecord  = frmDepositPayLandingKA.scheduledTransactions.selectedItems[0];
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController("frmDepositPayLandingKA");
  var navigationObject = listController.getContextData();
  navigationObject.setCustomInfo("selDeposit",selRecord);
  if(kony.retailBanking.globalData.deviceInfo.isIphone())
    frmRecentDepositKA.transferPayTitleLabel.text = i18n_pendingDeposit;
  else
    frmRecentDepositKA.androidTitleLabel.text = i18n_pendingDeposit;
  frmRecentDepositKA.show();
}

function recentDepositPreshow(){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var currForm = kony.application.getCurrentForm().id;
  var customInfo;
  if(currForm=="frmSearchKA")
  {
    var listController = INSTANCE.getFormController("frmSearchKA");
    var controllerContextData = listController.getContextData();
    if(controllerContextData && controllerContextData.getCustomInfo("selDeposit")){
      customInfo = controllerContextData.getCustomInfo("selDeposit");
    }
    frmRecentDepositKA.skin = "sknmainGradient";
    frmRecentDepositKA.titleBarWrapper.skin = "skncontainerBkgNone";
  }else if(currForm!="frmAccountDetailKA"){
  var listController = INSTANCE.getFormController("frmDepositPayLandingKA");
  var controllerContextData = listController.getContextData();
    if(controllerContextData && controllerContextData.getCustomInfo("selDeposit")){
        customInfo = controllerContextData.getCustomInfo("selDeposit");
    }
  	frmRecentDepositKA.skin = "sknmainGradient";
    frmRecentDepositKA.titleBarWrapper.skin = "skncontainerBkgNone";
  }else{
  var listController = INSTANCE.getFormController("frmAccountDetailKA");
  var controllerContextData = listController.getContextData();
    if(controllerContextData && controllerContextData.getCustomInfo("selectedAccountObj")){
  var accDetails =  controllerContextData.getCustomInfo("selectedAccountObj");
  frmRecentDepositKA.skin = getSkinColorForBg(accDetails.accountType);
  frmRecentDepositKA.titleBarWrapper.skin = getSkinColor(accDetails.accountType);
        if(controllerContextData && controllerContextData.getCustomInfo("selDeposit")){
              customInfo = controllerContextData.getCustomInfo("selDeposit");
         }
    }
  }
  frmRecentDepositKA.transactionAmount.text = customInfo.amount;
  frmRecentDepositKA.transactionName.text = customInfo.description;
  frmRecentDepositKA.transactionFrom.text = customInfo.toAccountName;
  frmRecentDepositKA.lblTransactionDateValueKA.text = customInfo.transactionDate;
  var currentForm = kony.application.getCurrentForm().id;
  frmRecentDepositKA.lblLine1KA.text = currentForm;

  if(customInfo.transactionsNotes)
    frmRecentDepositKA.transactionNotes.text = customInfo.transactionsNotes;
  else
    frmRecentDepositKA.flxNotesKA.isVisible = false;
    frmRecentDepositKA.show();
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
      fromProcessData[i]["typeAccount"]= i18n_availableBalance;
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
  var selectedAccountRecord  = frmNewDepositKA.segInternalTOAccountsKA.selectedItems[0];
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
  selectAccountCard(frmNewDepositKA,"to",1);
  frmNewDepositKA[type+"CardTitle"].setVisibility(false);
  frmNewDepositKA[type+"CardInner"].setVisibility(false);
  frmNewDepositKA[type+"AccountPick"].setVisibility(true);
}

function onclickDepositEdit(type)
{
  editAccountCard(frmNewDepositKA, "to");
  type= type;
  frmNewDepositKA[type+"CardTitle"].setVisibility(true);
  frmNewDepositKA[type+"CardInner"].setVisibility(true);
  frmNewDepositKA[type+"AccountPick"].setVisibility(false);
}



function confirmDepositTransfer()
{
  ShowLoadingScreen();
  var back64Str,front64Str;
  if(kony.retailBanking.globalData.deviceInfo.isIphone()){
     back64Str = frmNewDepositKA.backImageCapture.base64;
     front64Str = frmNewDepositKA.frontImageCapture.base64;
  }
  else{
     back64Str = kony.convertToBase64(frmNewDepositKA.backImageCapture.rawBytes);
     front64Str = kony.convertToBase64(frmNewDepositKA.frontImageCapture.rawBytes);
  }
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmNewDepositKA");
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
  
  var listController = INSTANCE.getFormController("frmConfirmDepositKA");
  var navigationObject = new kony.sdk.mvvm.NavigationObject();
  navigationObject.setCustomInfo("dataDeposit",depositObj);
  navigationObject.setDataModel(null,kony.sdk.mvvm.OperationType.ADD, "form");
  navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  listController.performAction("navigateTo",["frmConfirmDepositKA",navigationObject]);
 }
}

function newDepositPreShow(){
  
  frmNewDepositKA.amountTextField.text="";
  frmNewDepositKA.noteTextfield.text = "";
  resetDepositLandingCameras();
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmNewDepositKA");
  var viewModel = controller.getFormModel();
  viewModel.setViewAttributeByProperty("lblCurrencyType","text",kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount("",kony.retailBanking.globalData.globals.CurrencyCode)); 
  viewModel.performActionOnView("editToCard","setVisibility",[true]);
  viewModel.performActionOnView("toCardTitle","setVisibility",[false]);
  viewModel.performActionOnView("toCardInner","setVisibility",[false]);
  viewModel.performActionOnView("toAccountPick","setVisibility",[true]);
  var toAccountNumber =  viewModel.setViewAttributeByProperty("tolblAccountNumberKA","text","");
  viewModel.performActionOnView("CopyamountAccountOne03ee5831d718349","setVisibility",[true]);
  viewModel.performActionOnView("toAmountPick","setVisibility",[true]);
  viewModel.setViewAttributeByProperty("confirmTransaction","skin","sknprimaryActionDisabled");
  viewModel.performActionOnView("lblCurrencyType","text",kony.retailBanking.globalData.globals.CurrencyCode);
  viewModel.setViewAttributeByProperty("lblBankNameHeader","text",kony.retailBanking.globalData.globals.BankName);
  viewModel.setViewAttributeByProperty("lblToAccountBankNameKA","text",kony.retailBanking.globalData.globals.BankName);
}

function onDoneAmountEntered()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmNewDepositKA");
  var viewModel = controller.getFormModel();
  var amount=viewModel.getViewAttributeByProperty("amountTextField","text");
  var validated= kony.retailBanking.util.validation.validateTextboxOrLabel(viewModel && viewModel.getViewAttributeByProperty("amountTextField","text"));
  validated = validateDecimals(amount);
  if(validated){
    if ((amount===null) || (amount==="") || (Number(amount)<= 0))
	{
	  viewModel.setViewAttributeByProperty("confirmTransaction","skin","sknprimaryActionDisabled");
      return false;
	}
    else{
     viewModel.setViewAttributeByProperty("confirmTransaction","skin","sknprimaryAction");
  return true;}
  }
  else{
    viewModel.setViewAttributeByProperty("confirmTransaction","skin","sknprimaryActionDisabled");
    return false;}

}
function navigateToSuccess(res){
  frmDepositSuccessKA.successTitle.text = res.success;
  frmDepositSuccessKA.successText.text = "ReferenceId :" + " " + res.referenceId;
  frmDepositSuccessKA.show();
}

function depositSuccessFormPreShow() {
    frmDepositSuccessKA.successIcon.opacity=1;
    frmDepositSuccessKA.successIcon.skin = "sknsuccessIcon";
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
    frmTermsAndConditionsKA.titleBarWrapper.skin=skncontainerBkgNone;
  	frmTermsAndConditionsKA.richTexttermsandconditions.text=response[0].infoContent;
  	frmTermsAndConditionsKA.show();
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
    frmDepositSuccessKA.successIcon.skin = "sknsuccessIcon";
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
function depositSuccessFormPostShow() {
    frmDepositSuccessKA.successImage2.isVisible = true;
    frmDepositSuccessKA.successIcon2.skin = "sknsuccessIcon";
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
function depositerrorFormPostShow(){
    frmDepositSuccessKA.successImage2.isVisible = true;
    frmDepositSuccessKA.successIcon2.skin = "sknsuccessIcon";
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
function setInfo(whatForm,whatType,whatAccount)
{
  
}