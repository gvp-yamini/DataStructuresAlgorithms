function onClickProfile()
{
	userSettings.lblPrimarynum.text=kony.retailBanking.globalData.globals.userObj.phone;
	userSettings.lblSecondary.text=kony.retailBanking.globalData.globals.userObj.secondaryPhone;
	userSettings.lblEmaill.text=kony.retailBanking.globalData.globals.userObj.email;
	userSettings.lblSecondaryEmail.text=kony.retailBanking.globalData.globals.userObj.secondaryEmail;
	userSettings.lblAddress1value.text = kony.retailBanking.globalData.globals.userObj.addressLine1;
	userSettings.lblAddress2value.text = kony.retailBanking.globalData.globals.userObj.addressLine2;
	userSettings.lblAddressstateValue.text = kony.retailBanking.globalData.globals.userObj.state;
	userSettings.lblAddresscityvalue.text = kony.retailBanking.globalData.globals.userObj.city;
	userSettings.lblAddressCountryValue.text = kony.retailBanking.globalData.globals.userObj.country;
	userSettings.lblAddresszipcodevalue.text = kony.retailBanking.globalData.globals.userObj.zipcode;

      addRightPanel(userSettings.flxSettingsMyProfileWrapper,"flxSettingsMyProfileWrapper");
}


function changeUserSuccess(res)
{
  	  kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
      frmUsrSecurityQuestions.answerField1.text="";
      frmUsrSecurityQuestions.answerField2.text="";
      frmUsrSecurityQuestions.lblQuestion1.text = res.records[0].question;
      frmUsrSecurityQuestions.lblId1KA.text = res.records[0].question_id;
      frmUsrSecurityQuestions.lblQuestion2.text = res.records[1].question;
      frmUsrSecurityQuestions.lblId2KA.text = res.records[1].question_id;
      frmUsrSecurityQuestions.lblUserNameKA.text = kony.retailBanking.globalData.globals.usrName; 
      openModal(frmUsrSecurityQuestions.passwordWrapper,"passwordWrapper");
}



function verifySecQuestions(){
      ShowLoadingScreen();
      var q1 =  frmUsrSecurityQuestions.lblId1KA.text;
      var q2 =  frmUsrSecurityQuestions.lblId2KA.text;
      var options = {"access":"online"};
      objectService = kony.sdk.getCurrentInstance().getObjectService("RBObjects",options);
      var x = [{"question_id":q1,"answer":frmUsrSecurityQuestions.answerField1.text},
               {"question_id":q2,"answer":frmUsrSecurityQuestions.answerField2.text}
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
      objectService.partialUpdate(serviceOptions, verifySecQuestnsSuccess,verifySecQuestnsError);
  
 }


function verifySecQuestnsSuccess(res){
   kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
     if(res.errmsg)
       showGeneralAlert(res.errmsg);
     else
       gotoEditProfile();
}

function verifySecQuestnsError(res)
{
     kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
	  showGeneralAlert(res.errmsg);
}

function gotoEditProfile()
{
	 
      if(profSettings==1)
      {
       navigateToEditPage("frmUserSettingsEditPersonalDetailsKA");
        profSettings=0;
      }
      else if(profSettings==2)
       {
         navigateToEditPage("frmUserSettingsEditUsernameKA");
         profSettings=0;
       }
      else if(profSettings==3) 
       {
         navigateToEditPage("frmUserSettingsEditPasswordKA");
         profSettings=0;
       }
}

function navigateToEditPage(whichForm)
{
      var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
	  var listcontroller = INSTANCE.getFormController(whichForm);
      var navObject = new kony.sdk.mvvm.NavigationObject();
      navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
      listcontroller.performAction("loadDataAndShowForm",[navObject]);
}


function updateUserName(){
   var INSTANCE =  kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
   var controller = INSTANCE.getFormController("frmUserSettingsEditUsernameKA");
   var formModel=controller.getFormModel();
   var newUserName=formModel.getViewAttributeByProperty("txtNewUserNameKA","text");
   var currentUserName=formModel.getViewAttributeByProperty("lblCurrentUserNameKA","text");
   if(newUserName===currentUserName)
      showGeneralAlert(i18n_differentUsername);
    else if(!kony.retailBanking.util.validation.isValidUsername(newUserName))
      	showGeneralAlert(i18n_validUsernamealert);
    else
    {
        var navObject = new kony.sdk.mvvm.NavigationObject();
        navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
		controller.performAction("saveData",[navObject]);
    }
}


function updatePassword()
{
  	var INSTANCE =  kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmUserSettingsEditPasswordKA");
    var formModel=controller.getFormModel();
    var NewPassword=formModel.getViewAttributeByProperty("answerFieldPassword","text");
    var currentPassword=formModel.getViewAttributeByProperty("answerField","text");
    var ReEnterPassword=formModel.getViewAttributeByProperty("answerFieldReEnter","text");
  	var msg="";
	if(NewPassword===null || ReEnterPassword === null)
      	   showGeneralAlert(i18n_emptyPasswordalert);
    else if(ReEnterPassword!=NewPassword)
      	   showGeneralAlert(i18n_PasswordMismatchalert);
	else if(NewPassword===currentPassword)
      	  showGeneralAlert(i18n_Passwordsuniquealert);
    else if(!kony.retailBanking.util.validation.isValidPassword(NewPassword))
    	 showGeneralAlert(i18n_validPasswordalert);
    else 
    {
        var navObject = new kony.sdk.mvvm.NavigationObject();
        navObject.setDataModel(null, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
        navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
        controller.performAction("saveData",[navObject]);
    }

}

function updatePersonalDetails()
{
    var INSTANCE =  kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  	var controller = INSTANCE.getFormController("frmUserSettingsEditPersonalDetailsKA");
  	var formModel=controller.getFormModel();
  	var userPhone=formModel.getViewAttributeByProperty("answerField1","text");
    var userSPhone=formModel.getViewAttributeByProperty("answerField2","text");
    var userEmail=formModel.getViewAttributeByProperty("answerField3","text");
    var userSEmail=formModel.getViewAttributeByProperty("answerField4","text");
    var msg="";
  	if(userPhone === "" || userEmail === "")
      showGeneralAlert(i18n_EmailorPhoneemptyalert)
    else if(!kony.retailBanking.util.validation.isValidEmail(userEmail))
      	showGeneralAlert(i18n_validEmailalert);
    else if (userSEmail !== null && userSEmail !== "" && !kony.retailBanking.util.validation.isValidEmail(userSEmail))
      showGeneralAlert(i18n_validSecondaryEmailalert);
    else 
    {
        var navObject = new kony.sdk.mvvm.NavigationObject();
      	navObject.setDataModel(null, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
        navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
		controller.performAction("saveData",[navObject]);
    }


}

function saveProfilePicture() {
   var rawBytes = frmUserSettingsEditPersonalDetailsKA.cameraKA.rawBytes;
   var base64Image = kony.convertToBase64(rawBytes);
   if (kony.retailBanking.globalData.deviceInfo.isIpad())
   {
  	   frmUserSettingsEditPersonalDetailsKA.imgProfileKA.base64 = base64Image;
       userSettings.imgProfileKA.base64=base64Image;	
    }
  else
  {
       frmUserSettingsEditPersonalDetailsKA.imgProfileKA.rawBytes = rawBytes;
       userSettings.imgProfileKA.rawBytes=rawBytes;
    }
  	
 	base64Image=null;
  	frmUserSettingsEditPersonalDetailsKA.cameraKA.releaseRawBytes();
}

function openMediaGallery()
{
    try {
        var querycontext = {mimetype:"image/*"};
        returnStatus = kony.phone.openMediaGallery(onSuccessSelectionCallback, querycontext);

    }catch(err){
        showGeneralAlert(i18n_mediaGalleryerror+err);
    }

}

function onSuccessSelectionCallback(rawbytes)
{
		if (rawbytes === null)
		{
			showGeneralAlert(i18n_imagenotSelected);
			return;
		}
		var base64 = kony.convertToBase64(rawbytes);
		frmUserSettingsEditPersonalDetailsKA.imgProfileKA.base64 = base64;
 		userSettings.imgProfileKA.base64=base64;
}

