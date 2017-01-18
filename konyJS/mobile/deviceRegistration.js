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
        if (kony.retailBanking.globalData.deviceInfo.isTouchIDSupported())
       		frmUnauthFeatureEnablingKA.show();     
       else
       {
         if (devicetouchId.rememberMeFlag == true)
           frmUnauthFeatureEnablingKA.show(); 
         else
          showFormOrderList();
       }
     }
     else
   		showFormOrderList();
   }  
}

function updateDeviceReg(devId){
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
  record["deviceId"] = devId;
  var dataObject = new kony.sdk.dto.DataObject("DeviceRegistration",record);
  var requestOptions = {"dataObject":dataObject, "headers":headers};
  modelObj.create(requestOptions, updatedevRegSuccess, customErrorCallback);
}
function updatedevRegSuccess(res){
  kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
  frmDeviceregistrarionSuccessKA.show();
  updateFlags("deviceRegisterFlag",true);
  kony.print(res);
}