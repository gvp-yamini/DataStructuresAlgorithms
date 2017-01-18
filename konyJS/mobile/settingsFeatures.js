function OnchangeAcntPreviewSettigns()
{
   if(frmUserSettingsAccountPreviewKA.accountPreviewCheckBox.selectedKeys)
   {
      updateFlags("accountPreviewEnabledFlag",false);
      setDataatRow(i18n_AccountPreview,i18n_offLabel,0);
   }
  	else
    {
       updateFlags("accountPreviewEnabledFlag",true);
       setDataatRow(i18n_AccountPreview,i18n_onLabel,0);
    }
}

function accountPreviewSwitchOnTouchEnd()
{
      if(frmUserSettingsAccountPreviewKA.accountPreviewSwitch.selectedIndex === 1)
      {
         updateFlags("accountPreviewEnabledFlag",true);
         setDataatRow(i18n_AccountPreview,i18n_onLabel,0);
      }
       else
       {
         updateFlags("accountPreviewEnabledFlag",false);
         setDataatRow(i18n_AccountPreview,i18n_offLabel,0);
        }
     
}

function setDataatRow(rowName,rowValue,rowindex)
{
	   data ={"lblSettingsNameKA":rowName,"lblSettingsStatusKA":rowValue,"imgProgressKey":"right_chevron_icon.png"}
  	   frmUserSettingsKA.userSettingsSegment.setDataAt(data,rowindex,0);  
       frmUserSettingsKA.userSettingsSegment.selectedRowIndex=[0,rowindex];
}


function touchIdSwitchOnTouchEnd()
{
      if(frmUserSettingsTouchIdKA.touchIdSwitch.selectedIndex === 1)
      {
        updateFlags("touchIDEnabledFlag",true);
       setDataatRow(i18n_TouchID,i18n_onLabel,3);
      }
       else
       {
         updateFlags("touchIDEnabledFlag",false);
          setDataatRow(i18n_TouchID,i18n_offLabel,3);
       }
      
}

function touchIdCheckBoxSelectTouchEnd() {
  if(frmUserSettingsTouchIdKA.touchIdCheckBox.selectedKeys)
  {
     updateFlags("touchIDEnabledFlag",false);
     setDataatRow(i18n_TouchID,i18n_offLabel,3);
  }
  else
    {
     updateFlags("touchIDEnabledFlag",true);
     setDataatRow(i18n_TouchID,i18n_onLabel,3);
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
    setDataatRow(i18n_devRegistration,i18n_offLabel,1);
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