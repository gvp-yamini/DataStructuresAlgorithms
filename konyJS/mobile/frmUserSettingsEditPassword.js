
function onClickPasswordEditUserName(){
  	var currentPassword;
  	var INSTANCE =  kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmUserSettingsEditPasswordKA");
    var formModel=controller.getFormModel();
    var NewPassword=formModel.getViewAttributeByProperty("answerFieldPassword","text");
    currentPassword=formModel.getViewAttributeByProperty("answerField","text");
    var ReEnterPassword=formModel.getViewAttributeByProperty("answerFieldReEnter","text");
  	var msg="";
	if((currentPassword==="")||(currentPassword===null))
    {
      	  msg=kony.i18n.getLocalizedString("i18n.common.frmUserSettingsEditPasswordKA.CurrPwdNotNullMsg");
      	  showAlert(msg);
    }else if(NewPassword===null)
    {
      	    msg=kony.i18n.getLocalizedString("i18n.common.frmUserSettingsEditPasswordKA.NewPwdNotNullMsg");
      	   showAlert(msg);
    }else if(ReEnterPassword!=NewPassword)
	{
      	   msg=kony.i18n.getLocalizedString("i18n.common.frmUserSettingsEditPasswordKA.NewAndReEnterPwdMatchMsg");
      	   showAlert(msg);
	}else if(NewPassword===currentPassword){
      	msg=kony.i18n.getLocalizedString("i18n.common.frmUserSettingsEditPasswordKA.NewPwdShouldNotSameAsCurrPwdMsg");
      	showAlert(msg);
    }else if(!kony.retailBanking.util.validation.isValidPassword(NewPassword))
    {
      	  msg=kony.i18n.getLocalizedString("i18n.common.frmUserSettingsEditPasswordKA.ValidPwdMsg");
      	  showAlert(msg);
  		 return true;
    }else {
        var navObject = new kony.sdk.mvvm.NavigationObject();
        navObject.setDataModel(null, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
        navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
        controller.performAction("saveData",[navObject]);
    }
}
  
 
  function onClickSettingsPassword(){
        var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
		var listcontroller = INSTANCE.getFormController("frmUserSettingsEditPasswordKA");
        var navObject = new kony.sdk.mvvm.NavigationObject();
        navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
        listcontroller.performAction("loadDataAndShowForm",[navObject]);
}
    
function showAlert(msg){
  
  kony.ui.Alert({
        "alertType": constants.ALERT_TYPE_INFO,
        "alertTitle": "INFO",
        "yesLabel": "OK",
        "noLabel": "",
        "message": msg,
        "alertHandler": null
     },{});              

}    
 
 
  

    
  

