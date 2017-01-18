function initialiseForms(){
        var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        
        var frmEnrolluserLandingKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmEnrolluserLandingKAConfig);
        var frmEnrolluserLandingKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmEnrolluserLandingKAController", appContext, frmEnrolluserLandingKAModelConfigObj);
        var frmEnrolluserLandingKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmEnrolluserLandingKAControllerExtension", frmEnrolluserLandingKAControllerObj);
        frmEnrolluserLandingKAControllerObj.setControllerExtensionObject(frmEnrolluserLandingKAControllerExtObj);
        var frmEnrolluserLandingKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmEnrolluserLandingKAFormModel", frmEnrolluserLandingKAControllerObj);
        var frmEnrolluserLandingKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmEnrolluserLandingKAFormModelExtension", frmEnrolluserLandingKAFormModelObj);
        frmEnrolluserLandingKAFormModelObj.setFormModelExtensionObj(frmEnrolluserLandingKAFormModelExtObj);
        appContext.setFormController("frmEnrolluserLandingKA", frmEnrolluserLandingKAControllerObj);
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
    ShowLoadingScreen();
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
 var deviceData = getDeviceInfo();
 var appVersion = appConfig.appVersion;
 objectService = kony.sdk.getCurrentInstance().getObjectService("RBObjects",options);
 var record = {"OSType":deviceData.name,"OSversion":deviceData.version,"AppVersion":appVersion}; 
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
   viewMainBranch(res);
   setBannerUrl(res);
   kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
   checkAppUpgrade(res);
 }
function setBannerUrl(res){
  var deviceData =  getDeviceInfo();
  var bannerUrl = res.bannerURL+"mobile/banner_mobile";
  if(deviceData.name === "iPhone"){
    if(deviceData.model.indexOf("iPhone 4") > -1)
      bannerUrl = bannerUrl+".png";
    else if(deviceData.model.indexOf("iPhone 5") > -1)
      bannerUrl = bannerUrl+"@2x.png";
    else if(deviceData.model.indexOf("iPhone 6") > -1)
      bannerUrl = bannerUrl+"@3x.png";
  else
       bannerUrl = bannerUrl+"@3x.png";
  }
  else
     bannerUrl = bannerUrl+".9.png";
  frmLoginKA.imgBannerKA.src =  bannerUrl;
  frmLoginKA.imgBannerPINKA.src =  bannerUrl;

} 

function checkAppUpgrade(res){
  if(res.isUpdateMandatory === "true"){
     kony.ui.Alert({
        "alertType": constants.ALERT_TYPE_INFO,
        "alertTitle": i18n_upgradeOfApp,
        "yesLabel": i18n_OK,
        "noLabel": "",
        "message": i18n_instrUpgrade,
        "alertHandler": alertCallback
     },{});
  }
  else if(res.isUpdate === "true"){
    kony.ui.Alert({
        "alertType": constants.ALERT_TYPE_CONFIRMATION,
        "alertTitle": i18n_upgradeOfApp,
        "yesLabel": i18n_upgrade,
        "noLabel": i18n_cancel,
        "message": i18n_qstnUpgrade,
        "alertHandler": alertCallback
    }, {});
  }
}
function alertCallback(response){
  kony.print("response" + response);
    if(response === true)
      kony.application.exit();
  
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
     showTouchIdOffAlert(i18n_disableTouchIdMessage,i18n_disableTouchId);
    }
    updateFlags("rememberMeFlag",false);
    updateFlags("accountPreviewEnabledFlag",false);
  } 
  else
   updateFlags("rememberMeFlag",true);
}

function showTouchIdOffAlert(msg,title)
{
   kony.ui.Alert({
          "message": msg,
          "alertHandler": alertrememberCallback,
          "alertType": constants.ALERT_TYPE_CONFIRMATION,
          "yesLabel": i18n_disable,
          "noLabel": i18n_cancel,
          "alertTitle": title     
     },{});

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
      }
}

function onclickImageRememberMe()
{
   var tempdata=kony.store.getItem("settingsflagsObject");
if (frmLoginKA.imgRememberme.src == "checkbox_selected.png")
  {
    frmLoginKA.imgRememberme.src = "checkbox_unselected.png";
    if (tempdata.touchIDEnabledFlag === true)
     showTouchIdOffAlert(i18n_touchIdalertAndroidMsg,i18n_touchIdalertAndroid);
    else
    {
    updateFlags("rememberMeFlag",false);
    updateFlags("accountPreviewEnabledFlag",false);
    }
  }
else if(frmLoginKA.imgRememberme.src == "checkbox_unselected.png")
  {
    frmLoginKA.imgRememberme.src = "checkbox_selected.png";
    updateFlags("rememberMeFlag",true);
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

function setUserObj(succCalBack){
  kony.print("Perf Log: User information loading Service call- start");
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
	  kony.print("Perf Log: User information loading Service call- End");
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
      kony.retailBanking.globalData.globals.userObj.addressLine1 = response[0].addressLine1;
      kony.retailBanking.globalData.globals.userObj.addressLine2 = response[0].addressLine2;
      kony.retailBanking.globalData.globals.userObj.city = response[0].city;
      kony.retailBanking.globalData.globals.userObj.country = response[0].country;
      kony.retailBanking.globalData.globals.userObj.state = response[0].state;
      kony.retailBanking.globalData.globals.userObj.zipcode = response[0].zipcode;
      kony.retailBanking.globalData.globals.userObj.userFirstName = response[0].userfirstname;
      kony.retailBanking.globalData.globals.userObj.depositsTCaccepted=response[0].areDepositTermsAccepted;
      kony.retailBanking.globalData.globals.settings.alerts=alertsFlag;
      kony.retailBanking.globalData.globals.userObj.acntStatementTCaccepted=response[0].areAccountStatementTermsAccepted;
    
      var appDate = kony.retailBanking.util.formatingDate.getApplicationFormattedDateTime(response[0].lastlogintime, kony.retailBanking.util.BACKEND_DATE_TIME_FORMAT);
      kony.retailBanking.globalData.globals.userObj.lastLoginTime = appDate;
	  kony.store.setItem("lastLoginTime",EncryptValue(kony.retailBanking.globalData.globals.userObj.lastLoginTime));
      kony.retailBanking.globalData.globals.userObj.userLastName =response[0].userlastname;
      var settingsObj = kony.store.getItem("settingsflagsObject");
      settingsObj.alerts = alertsFlag;	
 	  settingsObj.DefaultTransferAcctNo = response[0].default_account_transfers;
 	  settingsObj.DefaultDepositAcctNo = response[0].default_account_deposit;
 	  settingsObj.DefaultPaymentAcctNo = response[0].default_account_payments;
      kony.store.setItem("settingsflagsObject",settingsObj);
      if(succCalBack){
      succCalBack.call(this);
      }
  }
 
}

function enrollUser(userId){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmEnrolluserLandingKA");
  var viewModel = controller.getFormModel();
  var options = {"access":"online"};
  objectService = kony.sdk.getCurrentInstance().getObjectService("RBObjects",options);
  var q1,q2,q3,q4,q5;
  q1 = viewModel.getWidgetData("lstboxquestn1").getData();
  q2 = viewModel.getWidgetData("lstboxquestn2").getData();
  q3 = viewModel.getWidgetData("lstboxquestn3").getData();
  q4 = viewModel.getWidgetData("lstboxquestn4").getData();
  q5 = viewModel.getWidgetData("lstboxquestn5").getData();
  var x = [{"question_id":q1,"answer":viewModel.getViewAttributeByProperty("tbxAnswer1","text")},
           {"question_id":q2,"answer":viewModel.getViewAttributeByProperty("tbxAnswer2","text")},
           {"question_id":q3,"answer":viewModel.getViewAttributeByProperty("tbxAnswer3","text")},
           {"question_id":q4,"answer":viewModel.getViewAttributeByProperty("tbxAnswer4","text")},
           {"question_id":q5,"answer":viewModel.getViewAttributeByProperty("tbxAnswer5","text")},
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
    alert(res.success);
    frmLoginKA.show();
    kony.print("success question record created");
  }
}

function forgotPasswordFetch(){
  var options = {"access":"online"};
  objectService = kony.sdk.getCurrentInstance().getObjectService("RBObjects",options);
  var dataObject = new kony.sdk.dto.DataObject("UserSecurityQuestions");
  var usrName = frmUnauthForgotUsernamePasswordStep1KA.txtUserName.text;
  kony.retailBanking.globalData.globals.usrName = usrName;
  var queryParams = {"userName":usrName};
  var serviceOptions = {"dataObject":dataObject,"queryParams":queryParams};
  objectService.fetch(serviceOptions, forgotSuccess,customErrorCallback);
}

function forgotSuccess(res){
  frmUnauthForgotUsernamePasswordKA.lblQuestion1.text = res.records[0].question;
  frmUnauthForgotUsernamePasswordKA.lblId1KA.text = res.records[0].question_id;
  frmUnauthForgotUsernamePasswordKA.lblQuestion2.text = res.records[1].question;
  frmUnauthForgotUsernamePasswordKA.lblId2KA.text = res.records[1].question_id;
  frmUnauthForgotUsernamePasswordKA.lblUserNameKA.text = kony.retailBanking.globalData.globals.usrName;
  frmUnauthForgotUsernamePasswordKA.txtQuestion1.text="";
  frmUnauthForgotUsernamePasswordKA.txtQuestion2.text="";
  frmUnauthForgotUsernamePasswordKA.show();
}
function forgotPassword(){
  var q1 = frmUnauthForgotUsernamePasswordKA.lblId1KA.text;
  var q2 = frmUnauthForgotUsernamePasswordKA.lblId2KA.text;
  var options = {"access":"online"};
  objectService = kony.sdk.getCurrentInstance().getObjectService("RBObjects",options);
  var x = [{"question_id":q1,"answer":frmUnauthForgotUsernamePasswordKA.txtQuestion1.text},
           {"question_id":q2,"answer":frmUnauthForgotUsernamePasswordKA.txtQuestion2.text}
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
   alert(i18n_securityAnsValidated);
   frmLoginKA.show();
 }
}


function manageUname()
{
  clearUnamedata=kony.store.getItem("settingsflagsObject");
  if (clearUnamedata.rememberMeFlag === false)
 {
     frmLoginKA.usernameTextField.text="";
     frmLoginKA.passwordTextField.text="";
     if(kony.retailBanking.globalData.deviceInfo.isIphone())
       frmLoginKA.rememberUsernameSwitch.selectedIndex = 1;
     else
      frmLoginKA.imgRememberme.src = "checkbox_unselected.png";
     
   }
  else if (clearUnamedata.rememberMeFlag === true)
    {
      if (kony.store.getItem("firstTimeLogin") !== null)
        frmLoginKA.usernameTextField.text=DecryptValue(kony.store.getItem("userName"));
    }
} 


function removeSwipe()
{
  if(kony.retailBanking.globalData.deviceInfo.isIphone())
          frmLoginKA.removeGestureRecognizer(swipeGesture);
}
  

