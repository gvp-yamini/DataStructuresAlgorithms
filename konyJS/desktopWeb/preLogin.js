function initialiseForms(){
        var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        
		 var frmEnrollOnlineBankingStep1KAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmEnrollOnlineBankingStep1KAConfig);
        var frmEnrollOnlineBankingStep1KAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmEnrollOnlineBankingStep1KAController", appContext, frmEnrollOnlineBankingStep1KAModelConfigObj);
        var frmEnrollOnlineBankingStep1KAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmEnrollOnlineBankingStep1KAControllerExtension", frmEnrollOnlineBankingStep1KAControllerObj);
        frmEnrollOnlineBankingStep1KAControllerObj.setControllerExtensionObject(frmEnrollOnlineBankingStep1KAControllerExtObj);
        var frmEnrollOnlineBankingStep1KAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmEnrollOnlineBankingStep1KAFormModel", frmEnrollOnlineBankingStep1KAControllerObj);
        var frmEnrollOnlineBankingStep1KAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmEnrollOnlineBankingStep1KAFormModelExtension", frmEnrollOnlineBankingStep1KAFormModelObj);
        frmEnrollOnlineBankingStep1KAFormModelObj.setFormModelExtensionObj(frmEnrollOnlineBankingStep1KAFormModelExtObj);
        appContext.setFormController("frmEnrollOnlineBankingStep1KA", frmEnrollOnlineBankingStep1KAControllerObj);

        var frmEnrollOnlineBankingStep2KAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmEnrollOnlineBankingStep2KAConfig);
        var frmEnrollOnlineBankingStep2KAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmEnrollOnlineBankingStep2KAController", appContext, frmEnrollOnlineBankingStep2KAModelConfigObj);
        var frmEnrollOnlineBankingStep2KAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmEnrollOnlineBankingStep2KAControllerExtension", frmEnrollOnlineBankingStep2KAControllerObj);
        frmEnrollOnlineBankingStep2KAControllerObj.setControllerExtensionObject(frmEnrollOnlineBankingStep2KAControllerExtObj);
        var frmEnrollOnlineBankingStep2KAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmEnrollOnlineBankingStep2KAFormModel", frmEnrollOnlineBankingStep2KAControllerObj);
        var frmEnrollOnlineBankingStep2KAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmEnrollOnlineBankingStep2KAFormModelExtension", frmEnrollOnlineBankingStep2KAFormModelObj);
        frmEnrollOnlineBankingStep2KAFormModelObj.setFormModelExtensionObj(frmEnrollOnlineBankingStep2KAFormModelExtObj);
        appContext.setFormController("frmEnrollOnlineBankingStep2KA", frmEnrollOnlineBankingStep2KAControllerObj);
}

function initMetaData(success, error){
  kony.sdk.mvvm.KonyApplicationContext.init();
    var configParams = {
     "ShowLoadingScreenFunction": ShowLoadingScreen
    };
    var appFactory = kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance();
    var appPropertiesInstance = appFactory.createConfigurationServiceManagerObject();
    var appPropertyObj = appPropertiesInstance.generateAppPropsObj(configParams);
    appPropertiesInstance.apply(appPropertyObj);
    var options = "online";
    var initManager = appFactory.createAppInitManagerObject();
    initManager.registerService("MetadataServiceManager",{"object":appFactory.createMetadataServiceManagerObject(),"params":{"options": options}});
    initManager.executeRegistedServices(success, customErrorCallback);
}

function fetchApplicationProperties() {
 initMetaData(success,customErrorCallback);
}
function getDeviceInfo() {   //returns an object which contains name(defines the OS) and version number of the OS
          var devInfo = kony.os.deviceInfo();
            var obj = {
                "name": devInfo.name,
                "version":devInfo.version,
                "model":devInfo.model
              };
              return obj;
        }
function success(){ 
 var options = {"access":"online"};
// var deviceData = getDeviceInfo();
 var appVersion = appConfig.appVersion;
 objectService = kony.sdk.getCurrentInstance().getObjectService("RBObjects",options);
 var record = {"AppVersion":appVersion}; 
 var dataObject = new kony.sdk.dto.DataObject("Application");
 dataObject.setRecord(record);
 var serviceOptions = {"dataObject":dataObject, "headers":""};
 objectService.create(serviceOptions, appPropSuccess,customErrorCallback);
}
function appPropSuccess(res) 
 {
   kony.retailBanking.globalData.globals.CurrencyCode = res.currencyCode;
   kony.retailBanking.globalData.globals.BankName = res.bankName;
   kony.retailBanking.globalData.applicationProperties.appProperties.businessDays = res.businessDays;
   //viewMainBranch(res);
}


//TouchId-AccountEnable Preview-rememberme

function updateFlags(whichflag,flagvalue)
{
  var deviceflagdata=kony.store.getItem("settingsflagsObject");
  deviceflagdata[whichflag]=flagvalue;
  kony.retailBanking.globalData.globals.settings.whichflag=flagvalue;
  kony.store.setItem("settingsflagsObject",deviceflagdata);
}

function remembeMeOption()
{
   
  var rememberMeflag=frmLoginKA.rememberUsernameSwitch.selectedIndex;
  var tempdata=kony.store.getItem("settingsflagsObject");
  if (rememberMeflag == 1){
    if (tempdata.touchIDEnabledFlag === true){
      kony.ui.Alert({
          "message": "Turning off remember me disables TouchId.Do you want to Continue?",
          "alertHandler": alertrememberCallback,
          "alertType": constants.ALERT_TYPE_CONFIRMATION,
          "yesLabel": "Disable",
          "noLabel": "Cancel",
          "alertTitle": "Disable of TouchId"      
     },{});
    }
    updateFlags("rememberMeFlag",false);
    updateFlags("accountPreviewEnabledFlag",false);
  } 
  else{
   updateFlags("rememberMeFlag",true);
   updateFlags("accountPreviewEnabledFlag",true);
  }
}

function alertrememberCallback(response)
{
  if (response === true){
    updateFlags("touchIDEnabledFlag",false);
    updateFlags("rememberMeFlag",false);
    manageUname();
    updateFlags("accountPreviewEnabledFlag",false);
    frmLoginKA.touchIdContainer.setVisibility(false);
  }
  else{
    frmLoginKA.rememberUsernameSwitch.selectedIndex=0;
    updateFlags("rememberMeFlag",true);
    updateFlags("accountPreviewEnabledFlag",true);
      }
}


function firstTimeapplogin()
{
  if(kony.store.getItem("firsttimecheck")=== null)
  {
   kony.retailBanking.datastore.setSettingsObject(kony.retailBanking.globalData.globals.settings);
   kony.store.setItem("settingsflagsObject",kony.retailBanking.globalData.globals.settings);
   kony.store.setItem("firsttimecheck", "finished");
  }
}

function setUserObj(){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var options ={    "access": "online",
                  "objectName": "RBObjects"
               };
  var headers = {"session_token":kony.retailBanking.globalData.session_token};
  var serviceName = "RBObjects";
  var modelObj = INSTANCE.getModel("User",serviceName,options);
  var dataObject = new kony.sdk.dto.DataObject("User");
  var serviceOptions = {"dataObject":dataObject, "headers":headers};
  modelObj.fetch(serviceOptions, dataSuccess, customErrorCallback);
  function dataSuccess(response){
      alertsFlag=true;
      if(response[0].alertsTurnedOn==="true"){
         alertsFlag=true;
      }else{
         alertsFlag=false;
      }
      kony.retailBanking.globalData.globals.userObj.userName = response[0].userName;
      kony.retailBanking.globalData.globals.userObj.dateOfBirth = response[0].dateOfBirth;
      kony.retailBanking.globalData.globals.userObj.ssn = response[0].ssn;
      kony.retailBanking.globalData.globals.userObj.email = response[0].email;
      kony.retailBanking.globalData.globals.userObj.phone = response[0].phone;
      kony.retailBanking.globalData.globals.userObj.userFirstName = response[0].userfirstname;
      kony.retailBanking.globalData.globals.userObj.depositsTCaccepted=response[0].areDepositTermsAccepted;
      kony.retailBanking.globalData.globals.settings.alerts=alertsFlag;
      kony.retailBanking.globalData.globals.userObj.acntStatementTCaccepted=response[0].areAccountStatementTermsAccepted;
    
      var appDate = kony.retailBanking.util.formatingDate.getApplicationFormattedDateTime(response[0].lastlogintime, kony.retailBanking.util.BACKEND_DATE_TIME_FORMAT);
      kony.retailBanking.globalData.globals.userObj.lastLoginTime = appDate;
	  kony.retailBanking.globalData.globals.userObj.userLastName =response[0].userlastname;
    
      kony.retailBanking.globalData.globals.settings.DefaultDepositAcctNo = response[0].default_account_deposit;
      kony.retailBanking.globalData.globals.settings.DefaultTransferAcctNo = response[0].default_account_transfers;
      kony.retailBanking.globalData.globals.settings.DefaultPaymentAcctNo = response[0].default_account_payments;
    }
}

function enrollUser(userId){
 var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmEnrollOnlineBankingStep2KA");
  var viewModel = controller.getFormModel();
  var options = {"access":"online"};
  objectService = kony.sdk.getCurrentInstance().getObjectService("RBObjects",options);
  var q1,q2,q3;//q4,q5;
  q1 = viewModel.getWidgetData("lbxQ1KA").getData();
  q2 = viewModel.getWidgetData("lbxQ2KA").getData();
  q3 = viewModel.getWidgetData("lbxQ3KA").getData();
//  q4 = viewModel.getWidgetData("lbxQ4KA").getData();
 // q5 = viewModel.getWidgetData("CopylbxQ0e381e112689444").getData();
  var x = [{"question_id":q1,"answer":viewModel.getViewAttributeByProperty("tbxA1KA","text")},
           {"question_id":q2,"answer":viewModel.getViewAttributeByProperty("tbxAns2KA","text")},
           {"question_id":q3,"answer":viewModel.getViewAttributeByProperty("tbxA3KA","text")},
          
          ];
  x = JSON.stringify(x);
  x.replace("\"","'");
  var record = {
                "userId":userId,
                "usersecurityli":x
               };
  var dataObject = new kony.sdk.dto.DataObject("UserSecurityQuestions");
  dataObject.setRecord(record);
  var serviceOptions = {"dataObject":dataObject, "headers":""};
  objectService.create(serviceOptions, enrollSuccess,customErrorCallback);
  
  function enrollSuccess(res){
    //alert("You have successfully enrolled for our Web Banking Application.Please sign in to start using the features.");
    //frmLoginKA.show();
	frmEnrollOnlineBankingSucessKA.show();
    kony.print("success question record created");
  }
}
function forgotPasswordPreShow()
{ frmForgotPassword1KA.tbxUsernameKA.text="";
  if(frmLoginKA.usernameTextField.text !== "") 
  frmForgotPassword1KA.tbxUsernameKA.text = frmLoginKA.usernameTextField.text;
  frmForgotPassword1KA.tbxUsernameKA.skin="tbxInputBoxE";
}
function forgotPasswordErrorCallBack()
{
 frmForgotPassword1KA.tbxUsernameKA.skin="skntbxValidation";
 
}
function forgotPasswordFetch(){
  var options = {"access":"online"};
  objectService = kony.sdk.getCurrentInstance().getObjectService("RBObjects",options);
  var dataObject = new kony.sdk.dto.DataObject("UserSecurityQuestions");
  var usrName = frmForgotPassword1KA.tbxUsernameKA.text;
  kony.retailBanking.globalData.globals.usrName = usrName;
  var queryParams = {"userName":usrName};
  var serviceOptions = {"dataObject":dataObject,"queryParams":queryParams};
  objectService.fetch(serviceOptions, forgotSuccess,forgotPasswordErrorCallBack);
}

function forgotSuccess(res){
  kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
  frmForgotPassword2KA.lblQuestion1KA.text = res.records[0].question;
  frmForgotPassword2KA.lblId1KA.text = res.records[0].question_id;
  frmForgotPassword2KA.lblQuestion2.text = res.records[1].question;
  frmForgotPassword2KA.lblId2KA.text = res.records[1].question_id;
  frmForgotPassword2KA.lblUserNameKA.text = kony.retailBanking.globalData.globals.usrName;
  frmForgotPassword2KA.txtQuestion1.text="";
  frmForgotPassword2KA.txtQuestion2.text="";
  frmForgotPassword2KA.show();
}
function forgotPassword(){
  var q1 = frmForgotPassword2KA.lblId1KA.text;
  var q2 = frmForgotPassword2KA.lblId2KA.text
  var options = {"access":"online"};
  objectService = kony.sdk.getCurrentInstance().getObjectService("RBObjects",options);
  var x = [{"question_id":q1,"answer":frmForgotPassword2KA.txtQuestion1.text},
           {"question_id":q2,"answer":frmForgotPassword2KA.txtQuestion2.text}
          ];
  x = JSON.stringify(x);
  x.replace("\"","'");
  var record = {
                "usersecurityli":x
               };
  
  var usrName = kony.retailBanking.globalData.globals.usrName;
  var headers = {"userName":usrName};
  var dataObject = new kony.sdk.dto.DataObject("UserSecurityQuestions");
  dataObject.setRecord(record);
  var serviceOptions = {"dataObject":dataObject, "headers":headers};
  objectService.partialUpdate(serviceOptions, pswrdSuccess,customErrorCallback);
  
 }
function pswrdSuccess(res){
 if(res.errmsg){
   alert(res.errmsg);
 }
  else{
  alert("A link with options to reset your password has been sent to your registered email address.Please check and reset your password");
  frmLoginKA.show();
 }
}
function onclickImageRememberMe()
{
if (frmLoginKA.imgRememberme.src == "checkbox_selected.png")
  {
    frmLoginKA.imgRememberme.src = "checkbox_unselected.png";
    updateFlags("rememberMeFlag",false);
    updateFlags("accountPreviewEnabledFlag",false);
  }
else if(frmLoginKA.imgRememberme.src == "checkbox_unselected.png")
  {
    frmLoginKA.imgRememberme.src = "checkbox_selected.png";
    updateFlags("rememberMeFlag",true);
    var accountdata=kony.store.getItem("settingsflagsObject");
    if (accountdata.accountPreviewEnabledFlag===false)
        updateFlags("accountPreviewEnabledFlag",true);
  }
}

function manageUname()
{
  clearUnamedata=kony.store.getItem("settingsflagsObject");
  if (clearUnamedata.rememberMeFlag === false)
 {
     frmLoginKA.usernameTextField.text="";
     frmLoginKA.passwordTextField.text="";
   }
  else if (clearUnamedata.rememberMeFlag === true)
    {
      if (kony.store.getItem("firstTimeLogin") !== null)
        frmLoginKA.usernameTextField.text=DecryptValue(kony.store.getItem("userName"));
    }
} 
function focusSkinforSubMenu(){
  var currForm=kony.application.getCurrentForm();
  currForm.flxMainFotterContainerKA.lblVersionNumberKA.text = appConfig.appVersion;
  switch(currForm.id){
     case "frmPrivacyPolicyPreLoginKA" : 
		currForm.flxMainKA.lblPrivacyPolicyKA.skin="sknLatoBold192980100FocusKA";
        break;
     case "frmFAQsPreKA":
      currForm.flxMainKA.lblFAQKA.skin="sknLatoBold192980100FocusKA";
      break;
     case "frmTermsNConditionsPreKA":
      currForm.flxMainKA.lblTermsKA.skin="sknLatoBold192980100FocusKA";
      break;
     case "frmContactUsPreLoginKA":
      currForm.flxMainKA.lblContactKA.skin="sknLatoBold192980100FocusKA";
      break;
  }
}

