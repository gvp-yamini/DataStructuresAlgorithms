function forgotPasswordFetch(){
  ShowLoadingScreen();
  var options = {"access":"online"};
  objectService = kony.sdk.getCurrentInstance().getObjectService("RBObjects",options);
  var dataObject = new kony.sdk.dto.DataObject("UserSecurityQuestions");
  var usrName = frmForgotPwd.tbxUsername.text;
  kony.retailBanking.globalData.globals.usrName = usrName;
  var queryParams = {"userName":usrName};
  var serviceOptions = {"dataObject":dataObject,"queryParams":queryParams};
  objectService.fetch(serviceOptions, forgotSuccess,customErrorCallback);
}

function forgotSuccess(res){
  unauthForgotUsernamePassword.lblQuestion1.text = res.records[0].question;
  unauthForgotUsernamePassword.lblId1KA.text = res.records[0].question_id;
  unauthForgotUsernamePassword.lblQuestion2.text = res.records[1].question;
  unauthForgotUsernamePassword.lblId2KA.text = res.records[1].question_id;
  unauthForgotUsernamePassword.lblUserNameKA.text = kony.retailBanking.globalData.globals.usrName;
  unauthForgotUsernamePassword.txtQuestion1.text="";
  unauthForgotUsernamePassword.txtQuestion2.text="";
   kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
  openModal(unauthForgotUsernamePassword.forgotWrapper,"forgotWrapper");
  closeModal("forgotUnameWrapper",frmForgotPwd);
  
}
function forgotPassword(){
  ShowLoadingScreen();
  var q1 = unauthForgotUsernamePassword.lblId1KA.text;
  var q2 = unauthForgotUsernamePassword.lblId2KA.text;
  var options = {"access":"online"};
  objectService = kony.sdk.getCurrentInstance().getObjectService("RBObjects",options);
  var x = [{"question_id":q1,"answer":unauthForgotUsernamePassword.txtQuestion1.text},
           {"question_id":q2,"answer":unauthForgotUsernamePassword.txtQuestion2.text}
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
  kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
 if(res.errmsg){
   alert(res.errmsg);
 }
  else{
   
	alert(kony.i18n.getLocalizedString("i18n.commomerror.securityAnsValidated"));
       
   closeModal("forgotWrapper",unauthForgotUsernamePassword);

 }
}
