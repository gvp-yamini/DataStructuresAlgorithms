function getDeviceRegStatus(){
  ShowLoadingScreen();
  var scopeObj = this;
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var options ={    "access": "online",
                  "objectName": "RBObjects"
               };
  var headers = {"session_token":kony.retailBanking.globalData.session_token};
  var serviceName = "RBObjects";
  var modelObj = INSTANCE.getModel("DeviceRegistration",serviceName,options);
  var devID = kony.retailBanking.globalData.deviceInfo.getDeviceInfo().deviceID;
  var dataObject = new kony.sdk.dto.DataObject("DeviceRegistration");
  var serviceOptions = {"dataObject":dataObject,
                       "headers":headers,"queryParams":{"deviceId":devID}};
  modelObj.fetch(serviceOptions, deviceSuccess, customErrorCallback);
}

function deviceSuccess(response)
{
  kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
  var deviceRegstatus = response&&response[0]&&response[0].status;
  if (deviceRegstatus == "false"){  
    updateFlags("deviceRegisterFlag",false);
    frmDeviceRegistrationOptionsKA.show();   	  
  }
  else
  {
    updateFlags("deviceRegisterFlag",true);
    if(kony.store.getItem("firstTimeLogin") === null)
     {
        var devicetouchId=kony.store.getItem("settingsflagsObject");
       alert(kony.retailBanking.globalData.deviceInfo.isTouchIDSupported());
        if (kony.retailBanking.globalData.deviceInfo.isTouchIDSupported())
       		frmUnauthFeatureEnablingKA.show();     
       else
       {
         if (devicetouchId.rememberMeFlag == true)
           frmUnauthFeatureEnablingKA.show(); 
         else
           showAccountsLanding();
       }
     }
     else
   		showAccountsLanding();
   }  
}

function updateDeviceRegs(sucessFunction){
  ShowLoadingScreen();
 var scopeObj = this;
 var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var options ={    "access": "online",
                "objectName": "RBObjects"
               };
  var headers = {"session_token":kony.retailBanking.globalData.session_token};
  var serviceName = "RBObjects";
  var modelObj = INSTANCE.getModel("DeviceRegistration",serviceName,options);
  var record = {}; 
  record["deviceId"] = kony.os.deviceInfo().deviceid;
  var dataObject = new kony.sdk.dto.DataObject("DeviceRegistration",record);
  var requestOptions = {"dataObject":dataObject, "headers":headers};
  modelObj.create(requestOptions, sucessFunction, customErrorCallback);
}


function updatedevRegSuccessLogin(res){
  kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
  frmDeviceregistrarionSuccessKA.show();
  updateFlags("deviceRegisterFlag",true);
  kony.print(res);
}

function updatedevRegSuccessSettings(res){
  kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
  addRightPanel(frmDeviceRegistrationOptionsRightKA.RegistrationSuccessWrapperRight,"RegistrationSuccessWrapperRight")
  closeRightPanel("PinActivationWrapperRight","rightWrapper");
  updateFlags("deviceRegisterFlag",true);
  setDataatRow(i18n_devRegistration,i18n_offLabel,frmUserSettingsKA.segSettingsKA.selectedRowIndex[1]);
  kony.print(res);
}



function accountpreviewcheck()
{
  var flagData=kony.store.getItem("settingsflagsObject");
  if (kony.store.getItem("firstTimeLogin") === null && flagData.rememberMeFlag==true)
          return true; 
   else
          return false;
  
}

//To know  navigation from settings or Login
function navigateBackFromDeviceRegistration(){
    if(accountpreviewcheck())
    	frmUnauthFeatureEnablingKA.show();
    else
        showAccountsLanding(); 
  
  }

