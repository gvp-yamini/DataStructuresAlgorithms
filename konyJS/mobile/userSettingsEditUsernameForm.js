function onClickSettingsEditUserName(){
   var INSTANCE =  kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
   var controller = INSTANCE.getFormController("frmUserSettingsEditUsernameKA");
   var formModel=controller.getFormModel();
   var newUserName=formModel.getViewAttributeByProperty("txtNewUserNameKA","text");
   var currentUserName=formModel.getViewAttributeByProperty("lblCurrentUserNameKA","text");
   var msg="";
    if(newUserName===currentUserName){
      	msg=kony.i18n.getLocalizedString("i18n.common.frmUserSettingsEditUsernameKA.NewUIDShouldNotSameAsCurrUIDMsg");
      	showAlert(msg);
    }else if(!kony.retailBanking.util.validation.isValidUsername(newUserName)){
      	msg=kony.i18n.getLocalizedString("i18n.common.frmUserSettingsEditUsernameKA.ValidUIDMsg");
      	showAlert(msg);
    }else{
        var navObject = new kony.sdk.mvvm.NavigationObject();
      	navObject.setDataModel(null, kony.sdk.mvvm.OperationType.ADD, "form");
        navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
		controller.performAction("saveData",[navObject]);
    }
}

function onClickSettingsUsername(){
  		var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
		var listcontroller = INSTANCE.getFormController("frmUserSettingsEditUsernameKA");
        var navObject = new kony.sdk.mvvm.NavigationObject();
        navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
        listcontroller.performAction("loadDataAndShowForm",[navObject]);
}

function onClickSettingsEditProfile(){
    var INSTANCE =  kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  	var controller = INSTANCE.getFormController("frmUserSettingsEditPersonalDetailsKA");
  	var formModel=controller.getFormModel();
  	var userPhone=formModel.getViewAttributeByProperty("answerField1","text");
    var userSPhone=formModel.getViewAttributeByProperty("answerField2","text");
    var userEmail=formModel.getViewAttributeByProperty("answerField3","text");
    var userSEmail=formModel.getViewAttributeByProperty("answerField4","text");
    var msg="";
  	if(userPhone === "" || userEmail === ""){
      	msg=kony.i18n.getLocalizedString("i18n.common.frmUserSettingsEditPersonalDetailsKA.PPhoneAndPEmailNotNullMsg");
      	showAlert(msg);
    }else if(!kony.retailBanking.util.validation.isValidEmail(userEmail)){
      	msg=kony.i18n.getLocalizedString("i18n.common.frmUserSettingsEditPersonalDetailsKA.validPEmailMsg");
      	showAlert(msg);
    }else if (userSEmail !== null && userSEmail !== "" && !kony.retailBanking.util.validation.isValidEmail(userSEmail)){
      	msg=kony.i18n.getLocalizedString("i18n.common.frmUserSettingsEditPersonalDetailsKA.validSEmailMsg");
      	showAlert(msg);
    }else {
        var navObject = new kony.sdk.mvvm.NavigationObject();
      	navObject.setDataModel(null, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
        navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
		controller.performAction("saveData",[navObject]);
    }
}

function onClickSettingsProfile(){
  		var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
		var listcontroller = INSTANCE.getFormController("frmUserSettingsEditPersonalDetailsKA");
        var navObject = new kony.sdk.mvvm.NavigationObject();
        navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  		listcontroller.performAction("loadDataAndShowForm",[navObject]);

}

function onClickSettingsProfileToLoad(){
  		var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
		var listcontroller = INSTANCE.getFormController("frmUserSettingsPersonalDetailsKA");
        var navObject = new kony.sdk.mvvm.NavigationObject();
        navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
        listcontroller.performAction("navigateTo",["frmUserSettingsPersonalDetailsKA",navObject]);

}

//Change Username Security Questions functionality

function changeUsernameQFetch(){
  frmUserSettingsUsernameKA.answerField1.text="";
  frmUserSettingsUsernameKA.answerField2.text="";
  var options = {"access":"online"};
  objectService = kony.sdk.getCurrentInstance().getObjectService("RBObjects",options);
  var dataObject = new kony.sdk.dto.DataObject("UserSecurityQuestions");
  var usrName = kony.retailBanking.globalData.globals.userObj.userName;
  kony.retailBanking.globalData.globals.usrName = usrName;
  var queryParams = {"userName":usrName};
  var serviceOptions = {"dataObject":dataObject,"queryParams":queryParams};
  objectService.fetch(serviceOptions, changeUserSuccess,changeUserError);
}

function changeUserSuccess(res){
  frmUserSettingsUsernameKA.lblQuestion1.text = res.records[0].question;
  frmUserSettingsUsernameKA.lblId1KA.text = res.records[0].question_id;
  frmUserSettingsUsernameKA.lblQuestion2.text = res.records[1].question;
  frmUserSettingsUsernameKA.lblId2KA.text = res.records[1].question_id;
  frmUserSettingsUsernameKA.lblUserNameKA.text = kony.retailBanking.globalData.globals.usrName;
  frmUserSettingsUsernameKA.show();
}
function changeUserError(res){
  alert(res.errmsg);
}

function changeUsername(){
  var q1 =  frmUserSettingsUsernameKA.lblId1KA.text;
  var q2 =  frmUserSettingsUsernameKA.lblId2KA.text;
  var options = {"access":"online"};
  objectService = kony.sdk.getCurrentInstance().getObjectService("RBObjects",options);
  var x = [{"question_id":q1,"answer":frmUserSettingsUsernameKA.answerField1.text},
           {"question_id":q2,"answer":frmUserSettingsUsernameKA.answerField2.text}
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
  objectService.partialUpdate(serviceOptions, userIDSuccess,userIdError);
  
 }
function userIDSuccess(res){
 if(res.errmsg){
   alert(res.errmsg);
 }
  else{
    onClickSettingsUsername();
 }
}
function userIdError(res){
  alert(res.errmsg);
}

//Change Password Security Questions functionality

function changePasswordQFetch(){
  frmUserSettingsPasswordKA.answerField1.text="";
  frmUserSettingsPasswordKA.answerField2.text="";
  var options = {"access":"online"};
  objectService = kony.sdk.getCurrentInstance().getObjectService("RBObjects",options);
  var dataObject = new kony.sdk.dto.DataObject("UserSecurityQuestions");
  var usrName = kony.retailBanking.globalData.globals.userObj.userName;
  kony.retailBanking.globalData.globals.usrName = usrName;
  var queryParams = {"userName":usrName};
  var serviceOptions = {"dataObject":dataObject,"queryParams":queryParams};
  objectService.fetch(serviceOptions, passwordSuccess,passwordError);
}

function passwordSuccess(res){
  frmUserSettingsPasswordKA.lblQuestion1.text = res.records[0].question;
  frmUserSettingsPasswordKA.lblId1KA.text = res.records[0].question_id;
  frmUserSettingsPasswordKA.lblQuestion2.text = res.records[1].question;
  frmUserSettingsPasswordKA.lblId2KA.text = res.records[1].question_id;
  frmUserSettingsPasswordKA.lblUserNameKA.text = kony.retailBanking.globalData.globals.usrName;
  frmUserSettingsPasswordKA.show();
}
function passwordError(res){
  alert(res.errmsg);
}

function changePassword(){
  var q1 =  frmUserSettingsPasswordKA.lblId1KA.text;
  var q2 =  frmUserSettingsPasswordKA.lblId2KA.text;
  var options = {"access":"online"};
  objectService = kony.sdk.getCurrentInstance().getObjectService("RBObjects",options);
  var x = [{"question_id":q1,"answer":frmUserSettingsPasswordKA.answerField1.text},
           {"question_id":q2,"answer":frmUserSettingsPasswordKA.answerField2.text}
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
  objectService.partialUpdate(serviceOptions, passwordQSuccess,passwordQError);
  
 }
function passwordQSuccess(res){
 if(res.errmsg){
   alert(res.errmsg);
 }
  else{
    onClickSettingsPassword();
 }
}
function passwordQError(res){
  alert(res.errmsg);
}

//Change Profile Security Questions functionality

function changeProfileQFetch(){
  frmUserSettingsEditPersonalDetailsSecurityKA.answerField1.text="";
  frmUserSettingsEditPersonalDetailsSecurityKA.answerField2.text="";
  var options = {"access":"online"};
  objectService = kony.sdk.getCurrentInstance().getObjectService("RBObjects",options);
  var dataObject = new kony.sdk.dto.DataObject("UserSecurityQuestions");
  var usrName = kony.retailBanking.globalData.globals.userObj.userName;
  kony.retailBanking.globalData.globals.usrName = usrName;
  var queryParams = {"userName":usrName};
  var serviceOptions = {"dataObject":dataObject,"queryParams":queryParams};
  objectService.fetch(serviceOptions, profileSuccess,profileError);
}

function profileSuccess(res){
  frmUserSettingsEditPersonalDetailsSecurityKA.lblQuestion1.text = res.records[0].question;
  frmUserSettingsEditPersonalDetailsSecurityKA.lblId1KA.text = res.records[0].question_id;
  frmUserSettingsEditPersonalDetailsSecurityKA.lblQuestion2.text = res.records[1].question;
  frmUserSettingsEditPersonalDetailsSecurityKA.lblId2KA.text = res.records[1].question_id;
  frmUserSettingsEditPersonalDetailsSecurityKA.lblUserNameKA.text = kony.retailBanking.globalData.globals.usrName;
  frmUserSettingsEditPersonalDetailsSecurityKA.show();
}
function profileError(res){
  alert(res.errmsg);
}

function changeProfile(){
  var q1 =  frmUserSettingsEditPersonalDetailsSecurityKA.lblId1KA.text;
  var q2 =  frmUserSettingsEditPersonalDetailsSecurityKA.lblId2KA.text;
  var options = {"access":"online"};
  objectService = kony.sdk.getCurrentInstance().getObjectService("RBObjects",options);
  var x = [{"question_id":q1,"answer":frmUserSettingsEditPersonalDetailsSecurityKA.answerField1.text},
           {"question_id":q2,"answer":frmUserSettingsEditPersonalDetailsSecurityKA.answerField2.text}
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
  objectService.partialUpdate(serviceOptions, myProfileSuccess,myProfileError);
  
 }
function myProfileSuccess(res){
 if(res.errmsg){
   alert(res.errmsg);
 }
  else{
    onClickSettingsProfile();
 }
}
function myProfileError(res){
  alert(res.errmsg);
}