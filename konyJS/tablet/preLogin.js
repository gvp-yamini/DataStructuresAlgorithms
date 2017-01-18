function initialiseForms(){
        var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        
        var frmEnrolluserSettingsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmEnrolluserSettingsKAConfig);
        var frmEnrolluserSettingsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmEnrolluserSettingsKAController", appContext, frmEnrolluserSettingsKAModelConfigObj);
        var frmEnrolluserSettingsKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmEnrolluserSettingsKAControllerExtension", frmEnrolluserSettingsKAControllerObj);
        frmEnrolluserSettingsKAControllerObj.setControllerExtensionObject(frmEnrolluserSettingsKAControllerExtObj);
        var frmEnrolluserSettingsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmEnrolluserSettingsKAFormModel", frmEnrolluserSettingsKAControllerObj);
        var frmEnrolluserSettingsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmEnrolluserSettingsKAFormModelExtension", frmEnrolluserSettingsKAFormModelObj);
        frmEnrolluserSettingsKAFormModelObj.setFormModelExtensionObj(frmEnrolluserSettingsKAFormModelExtObj);
        appContext.setFormController("frmEnrolluserSettingsKA", frmEnrolluserSettingsKAControllerObj);
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
   kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
   kony.retailBanking.globalData.globals.CurrencyCode = res.currencyCode;
   kony.retailBanking.globalData.globals.BankName = res.bankName;
   kony.retailBanking.globalData.applicationProperties.appProperties.businessDays = res.businessDays;
   //viewMainBranch(res);
 setBannerUrl(res);
   checkAppUpgrade(res);
 }
function setBannerUrl(res){
  var deviceData =  getDeviceInfo();
  var bannerUrl;
  if(deviceData.name === "iPad"){
   /* if(deviceData.model.indexOf("iPad 4") > -1)
      bannerUrl = res.bannerURL+"tablet/banner_tablet@1x.png";
    else if(deviceData.model.indexOf("iPad 5") > -1)
      bannerUrl = res.bannerURL+"tablet/banner_tablet@2x.png";
    else if(deviceData.model.indexOf("iPad 6") > -1)
     bannerUrl = res.bannerURL+"tablet/banner_tablet@3x.png"; */
     
     bannerUrl = res.bannerURL+"tablet/banner_tablet@2x.png";
  // bannerUrl="http://pmqa.konylabs.net/KonyWebBanking/tablet/banner_tablet@2x.png";
  }
  else
     bannerUrl = res.bannerURL+"tablet/banner_tablet_and.png";
    //bannerUrl = "http://pmqa.konylabs.net/KonyWebBanking/tablet/banner_tablet_and.png";
  if (bannerUrl != null || bannerUrl != "" )
  {
    frmLoginKA.imgBannerKA.src =  bannerUrl;
    frmLoginKA.bannerAd.skin = "sknBannerflx";
    frmLoginKA.imgBannerKlaa.setVisibility(false);
    frmLoginKA.imgBannerKA.setVisibility(true);
    frmLoginKA.bannerAd.onClick = openBannerAd;
    
  }
  else
  { 
    frmLoginKA.imgBannerKA.setVisibility(false);
    frmLoginKA.bannerAd.skin = "sknNoBanner";
    frmLoginKA.bannerAd.onClick = null;
    frmLoginKA.imgBannerKlaa.setVisibility(true);
  }
 
}

function openBannerAd()
{
  kony.application.openURL('http://pmqa.konylabs.net/KonyWebBanking/campaign.html');
}
function checkAppUpgrade(res){
  if(res.isUpdateMandatory === "true"){
     kony.ui.Alert({
        "alertType": constants.ALERT_TYPE_INFO,
        "alertTitle": i18n_UpgradeofApp,
        "yesLabel": i18n_ok,
        "noLabel": "",
        "message": i18n_UpgradeApp,
        "alertHandler": alertCallback
     },{});
  }
  else if(res.isUpdate === "true"){
    kony.ui.Alert({
        "alertType": constants.ALERT_TYPE_CONFIRMATION,
        "alertTitle": i18n_UpgradeofApp,
        "yesLabel": i18n_Upgrade,
        "noLabel": i18n_cancel,
        "message": i18n_UpgradeAppAlert,
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
      kony.ui.Alert({
          "message": i18n_turnOffRememberMe,
          "alertHandler": alertrememberCallback,
          "alertType": constants.ALERT_TYPE_CONFIRMATION,
          "yesLabel": i18n_Disable,
          "noLabel": i18n_cancel,
          "alertTitle": i18n_disableTouchId      
     },{});
    }
    updateFlags("rememberMeFlag",false);
    updateFlags("accountPreviewEnabledFlag",false);
  } 
  else{
   updateFlags("rememberMeFlag",true);
  // updateFlags("accountPreviewEnabledFlag",true);
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
   // updateFlags("accountPreviewEnabledFlag",true);
      }
}


function firstTimeapplogin()
{
  if(kony.store.getItem("firsttimecheck")=== null)
  {
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
      kony.retailBanking.globalData.globals.userObj.secondaryEmail = response[0].secondaryemail;
      kony.retailBanking.globalData.globals.userObj.phone = response[0].phone;
      kony.retailBanking.globalData.globals.userObj.secondaryPhone= response[0].secondaryphone;
      kony.retailBanking.globalData.globals.userObj.userFirstName = response[0].userfirstname;
      kony.retailBanking.globalData.globals.userObj.depositsTCaccepted=response[0].areDepositTermsAccepted;
      kony.retailBanking.globalData.globals.settings.alerts=alertsFlag;
      kony.retailBanking.globalData.globals.userObj.acntStatementTCaccepted=response[0].areAccountStatementTermsAccepted;
      kony.retailBanking.globalData.globals.userObj.addressLine1 = response[0].addressLine1;
      kony.retailBanking.globalData.globals.userObj.addressLine2 = response[0].addressLine2;
      kony.retailBanking.globalData.globals.userObj.state = response[0].state;
      kony.retailBanking.globalData.globals.userObj.city = response[0].city;
      kony.retailBanking.globalData.globals.userObj.country = response[0].country;
      kony.retailBanking.globalData.globals.userObj.zipcode = response[0].zipcode;

    
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
  }
 
}

function enrollUser(userId){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmEnrolluserSettingsKA");
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
    closeModal("userSettingsWrapper",userSettings);
    showGeneralAlert(res.success);
    setSwipegesture();
    kony.print("success question record created");
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
    
  }
}

function manageUname()
{
  clearUnamedata=kony.store.getItem("settingsflagsObject");
  if (clearUnamedata.rememberMeFlag === false)
 {
     frmLoginKA.usernameTextField.text="";
     frmLoginKA.passwordTextField.text="";
    if (userAgent == "iPad")
      frmLoginKA.rememberUsernameSwitch.selectedIndex=1;
    else
    frmLoginKA.imgRememberme.src = "checkbox_unselected.png";
  }
  else if (clearUnamedata.rememberMeFlag === true)
    {
      if (kony.store.getItem("firstTimeLogin") !== null)
        frmLoginKA.usernameTextField.text=DecryptValue(kony.store.getItem("userName"));
    }
} 

  

