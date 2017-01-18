function OnchangeAcntPreviewSettigns()
{
    if (userSettings.imgEnableacntPreview.src == "checkbox_selected.png")
    {
        userSettings.imgEnableacntPreview.src = "checkbox_unselected.png";
        updateFlags("accountPreviewEnabledFlag",false);
        hideAccountPreviewOptions();
        setDataatRow(i18n_AccountPreview,i18n_offLabel,0);
    }
  	else if(userSettings.imgEnableacntPreview.src == "checkbox_unselected.png")
    {
       userSettings.imgEnableacntPreview.src = "checkbox_selected.png";
       updateFlags("accountPreviewEnabledFlag",true);
       showAccountPreviewOptions();
       setDataatRow(i18n_AccountPreview,i18n_onLabel,0);
    }
}

function accountPreviewSwitchOnslide() {
   if (kony.retailBanking.globalData.deviceInfo.isIpad()){
      if(userSettings.accountPreviewSwitch.selectedIndex === 1)
      {
        updateFlags("accountPreviewEnabledFlag",false);
        hideAccountPreviewOptions();
        setDataatRow(i18n_AccountPreview,i18n_offLabel,0);
      }
       else
      {
         updateFlags("accountPreviewEnabledFlag",true);
         showAccountPreviewOptions();
         setDataatRow(i18n_AccountPreview,i18n_onLabel,0);
      }
  }
}

function setDataatRow(rowName,rowValue,rowindex)
{
	   data ={"lblSettingsNameKA":rowName,"lblSettingsStatusKA":rowValue,"imgProgressKey":"right_chevron_icon.png"}
  	   frmUserSettingsKA.segSettingsKA.setDataAt(data,rowindex,0);  
       frmUserSettingsKA.segSettingsKA.selectedRowIndex=[0,rowindex];
}


function touchIdSwitchOnslide() {
   if(kony.retailBanking.globalData.deviceInfo.isIpad())
   {
      if(userSettings.touchIdSwitch.selectedIndex === 1)
      {
        updateFlags("touchIDEnabledFlag",false);
        setDataatRow(i18n_TouchID,i18n_offLabel,1);
      }
       else
      {
         updateFlags("touchIDEnabledFlag",true);
        setDataatRow(i18n_TouchID,i18n_onLabel,1);
      }
  }
}

function deRegisterDevice(){
	var INSTANCE =  kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var deviceRegController = INSTANCE.getFormController("frmDeviceDeRegistrationKA");
  	var deviceRegNavObject=new kony.sdk.mvvm.NavigationObject();
    deviceRegNavObject.setDataModel(null, kony.sdk.mvvm.OperationType, "form");
    deviceRegNavObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
	deviceRegController.performAction("deleteData",[deviceRegNavObject]);
    updateFlags("deviceRegisterFlag",false);
    data ={"lblSettingsNameKA":i18n_devRegistration,"lblSettingsStatusKA":i18n_offLabel,"imgProgressKey":"right_chevron_icon.png"}
    frmUserSettingsKA.segSettingsKA.setDataAt(data,frmUserSettingsKA.segSettingsKA.selectedRowIndex[1],0);
	alertDevDeReg(); 
}

function alertDevDeReg(){
  kony.ui.Alert({
        "alertType": constants.ALERT_TYPE_INFO,
        "alertTitle": "INFO",
        "yesLabel": "OK",
        "noLabel": "",
        "message": i18n_devRegSuccess,
        "alertHandler": appLogout
     },{});              

}    

function appLogout()
{
  kony.sdk.mvvm.LogoutAction();
}
 



function enableAccountPreview(){
  if(kony.retailBanking.globalData.deviceInfo.isIpad())
    userSettings.accountPreviewSwitch.selectedIndex=0;
  else    
    userSettings.imgEnableacntPreview.src = "checkbox_selected.png"
    showAccountPreviewOptions();
  
}

function disableAccountPreview(){
  if(kony.retailBanking.globalData.deviceInfo.isIpad())
   userSettings.accountPreviewSwitch.selectedIndex=1;
  else    
    userSettings.imgEnableacntPreview.src = "checkbox_unselected.png"
  hideAccountPreviewOptions();
}


function showAccountPreviewOptions(){
  userSettings.accountPreviewOptions.animate(
    kony.ui.createAnimation({100:
                             {"top": "10dp", "opacity": 1,"stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration:0.3},
    {animationEnd: function() {} }); 
}

function hideAccountPreviewOptions(){
  userSettings.accountPreviewOptions.animate(
    kony.ui.createAnimation({100:
                             {"top": "-20dp", "opacity": 0, "stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration:0.3},
    {animationEnd: function() {} }); 
}


