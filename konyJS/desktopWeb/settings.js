//Type your code here
function preferredAccounts(){
  var totalAccounts = kony.retailBankingKA.AccountsglobalData.accounts;
  var transferAcc = [];
  var depositAcc = [];
  var paymentAcc = [];
  var ind1,ind2,ind3;
  for (var i =0 ; i < totalAccounts.length; i++){
    if(totalAccounts[i].supportBillPay == "1"){
            var temp = [];
            temp.push(totalAccounts[i].accountID);
            temp.push(totalAccounts[i].nickName);
            paymentAcc.push(temp);
    }
    if(totalAccounts[i].supportDeposit == "1"){
            var temp1 = [];
     	    temp1.push(totalAccounts[i].accountID);
            temp1.push(totalAccounts[i].nickName);
            depositAcc.push(temp1);
    }
    if(totalAccounts[i].supportTransferFrom == "1"){
      		var temp2 = [];
     	    temp2.push(totalAccounts[i].accountID);
            temp2.push(totalAccounts[i].nickName);
            transferAcc.push(temp2);
    }
  }
  frmMoreMenuPreferredTransactionsKA.lbxfortransactionsKA.masterData = transferAcc;
  frmMoreMenuPreferredTransactionsKA.lbxforPaymentsKA.masterData = paymentAcc;
  frmMoreMenuPreferredTransactionsKA.lbxforDepositsKA.masterData = depositAcc;
  frmMoreMenuPreferredTransactionsKA.lbxfortransactionsKA.selectedKey = kony.retailBanking.globalData.globals.settings.DefaultTransferAcctNo;
  frmMoreMenuPreferredTransactionsKA.lbxforPaymentsKA.selectedKey = kony.retailBanking.globalData.globals.settings.DefaultPaymentAcctNo;
  frmMoreMenuPreferredTransactionsKA.lbxforDepositsKA.selectedKey = kony.retailBanking.globalData.globals.settings.DefaultDepositAcctNo;
}

function preferredAccountsSave(){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var options ={    "access": "online",
                "objectName": "RBObjects"
               };
  var headers = {"session_token":kony.retailBanking.globalData.session_token};
  var serviceName = "RBObjects";
  var modelObj = INSTANCE.getModel("User",serviceName,options);
  var record = {};
  record["default_account_deposit"] = frmMoreMenuPreferredTransactionsKA.lbxforDepositsKA.selectedKey;
  record["default_account_transfers"] = frmMoreMenuPreferredTransactionsKA.lbxfortransactionsKA.selectedKey;
  record["default_account_payments"] = frmMoreMenuPreferredTransactionsKA.lbxforPaymentsKA.selectedKey;
  var dataObject = new kony.sdk.dto.DataObject("User",record);
  var requestOptions = {"dataObject":dataObject, "headers":headers};
  modelObj.update(requestOptions, updatePreferredAccountsSuccess, updatePreferredAccountsError);
}

function updatePreferredAccountsSuccess(response)
{
  setUserObj();
  frmMoreKA.show();
}

function updatePreferredAccountsError(err)
{
  customErrorCallback(err);
}

function setSkinbeforeShow(form)
{
  form.tbxAnswerKA.skin="CopyslTextBox082d070bc5b4f4d";
  form.tbxAnswer2KA.skin="CopyslTextBox082d070bc5b4f4d";
}
function securityQuestionsFetch(form){
  ShowLoadingScreen();
  var options = {"access":"online"};
  objectService = kony.sdk.getCurrentInstance().getObjectService("RBObjects",options);
  var dataObject = new kony.sdk.dto.DataObject("UserSecurityQuestions");
  var queryParams = {"userName":kony.retailBanking.globalData.globals.userObj.userName};
  var serviceOptions = {"dataObject":dataObject,"queryParams":queryParams};
  objectService.fetch(serviceOptions, securityQuestionsSuccess,customErrorCallback);
   
  function securityQuestionsSuccess(res){
    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen(); 
    form["lblQue1ValKA"]["text"] = res.records[0].question;
    form["lblId1KA"]["text"] = res.records[0].question_id;
    form["lblQue2ValKA"]["text"] = res.records[1].question;
    form["lblId2KA"]["text"] = res.records[1].question_id;
    form["tbxAnswerKA"]["text"] ="";
    form["tbxAnswer2KA"]["text"] ="";
    setSkinbeforeShow(form);
    if(form.id == "frmChangeUsername1KA")
        frmChangeUsername1KA.show();
    else if(form.id == "frmChangePassword1KA")
        frmChangePassword1KA.show();
    else if(form.id == "frmPersonalDetailsStep1KA")
    	frmPersonalDetailsStep1KA.show();
 }
}
function changeUserNamePasswordDetails(form){
  var valid1=true,valid2=true,valid=true;
  var q1 = form["lblId1KA"]["text"];
  var q2 = form["lblId2KA"]["text"];
  a1=form["tbxAnswerKA"]["text"];
  a2=form["tbxAnswer2KA"]["text"];
  if(a1==="")
   form.tbxAnswerKA.skin="sknffffbb72727290KA";
  else
     form.tbxAnswerKA.skin="skntbxlatoregular72727290KA";
  if(a2==="")
    form.tbxAnswer2KA.skin="sknffffbb72727290KA";
  else
    form.tbxAnswer2KA.skin="skntbxlatoregular72727290KA";
  if(a1!=="" && a2!=="")
  {
   var options = {"access":"online"};
   objectService = kony.sdk.getCurrentInstance().getObjectService("RBObjects",options);
   var x = [{"question_id":q1,"answer":form["tbxAnswerKA"]["text"]},
           {"question_id":q2,"answer":form["tbxAnswer2KA"]["text"]}
          ];
   x = JSON.stringify(x);
   x.replace("\"","'");
   var record = {
                "usersecurityli":x
               };
  
  var usrName = kony.retailBanking.globalData.globals.userObj.userName;
  var headers = {"userName":usrName};
  var dataObject = new kony.sdk.dto.DataObject("UserSecurityQuestions");
  dataObject.setRecord(record);
  var serviceOptions = {"dataObject":dataObject, "headers":headers};
  objectService.partialUpdate(serviceOptions, changeUserNamePasswordSuccess,customErrorCallback);
  
  function changeUserNamePasswordSuccess(res){
    if(res.errmsg !==undefined && res.errmsg !==null)
      {
        if(form.id == "frmChangeUsername1KA" || form.id == "frmChangePassword1KA" || form.id == "frmPersonalDetailsStep1KA"){
                kony.ui.Alert({
        "alertType": constants.ALERT_TYPE_INFO,
        "alertTitle": "Error",
        "yesLabel": "OK",
        "noLabel": "",
        "message": res.errmsg,
        "alertHandler": null
     },{});
        } 
      }else
        {
        if(form.id == "frmChangeUsername1KA"){
         frmChangeUsername2KA.tbxCurrentUsrNameKA.text = "";
         frmChangeUsername2KA.tbxNewUnameKA.text = "";
         frmChangeUsername2KA.show();
       }
       else if(form.id == "frmChangePassword1KA"){
         frmChangePassword2KA.tbxCurrentPwdKA.text = "";
         frmChangePassword2KA.tbxNewPwdKA.text = "";
         frmChangePassword2KA.tbxReenterNewPwdKA.text = "";
         frmChangePassword2KA.show();
       }
       else if(form.id == "frmPersonalDetailsStep1KA"){
         var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
         var listcontroller = INSTANCE.getFormController("frmPersonalDetailsStep2KA");
         var navObject = new kony.sdk.mvvm.NavigationObject();
         navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
        listcontroller.performAction("loadDataAndShowForm",[navObject]); 
         
       } 
        }
    }
  }
}
function updateUsername(form){
      function updateUsernameSuccess(response){
        if(form.id == "frmChangeUsername2KA")
           frmChangeUsername3KA.show();
        else if(form.id == "frmChangePassword2KA")
           frmChangePassword3KA.show();
     }
  if(form.id == "frmChangeUsername2KA")
    {
       var currentUserName = form["tbxCurrentUsrNameKA"]["text"];
       var newUserName =  form["tbxNewUnameKA"]["text"];
       if (currentUserName === "") 
       form.tbxCurrentUsrNameKA.skin = "sknffffbb72727290KA";
       else 
       form.tbxCurrentUsrNameKA.skin = "skntbxlatoregular72727290KA";
       if (newUserName === "") 
      form.tbxNewUnameKA.skin = "sknffffbb72727290KA";
      else
      form.tbxNewUnameKA.skin = "skntbxlatoregular72727290KA";
        if (currentUserName !== "" && newUserName !== "") {
    if(currentUserName === kony.retailBanking.globalData.globals.userObj.userName)
      {
          var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var options ={    "access": "online",
                "objectName": "RBObjects"
               };
  var headers = {"session_token":kony.retailBanking.globalData.session_token};
  var serviceName = "RBObjects";
  var modelObj = INSTANCE.getModel("User",serviceName,options);
  var record = {};
   record["userName"] = frmChangeUsername2KA.tbxNewUnameKA.text;
  var dataObject = new kony.sdk.dto.DataObject("User",record);
  var requestOptions = {"dataObject":dataObject, "headers":headers};
  modelObj.update(requestOptions, updateUsernameSuccess, customErrorCallback);
      }else
        {
        kony.ui.Alert({
        "alertType": constants.ALERT_TYPE_INFO,
        "alertTitle": "Error",
        "yesLabel": "OK",
        "noLabel": "",
        "message": "Invalid User Name",
        "alertHandler": null
     },{});
        }
    
  }
  }else if(form.id == "frmChangePassword2KA")
     {
       var currentUserPassword = form["tbxCurrentPwdKA"]["text"];
       var newPassword =  form["tbxNewPwdKA"]["text"];
       var reenterPassword =  form["tbxReenterNewPwdKA"]["text"];
       if (currentUserPassword === "") 
       form.tbxCurrentPwdKA.skin = "sknffffbb72727290KA";
       else 
       form.tbxCurrentPwdKA.skin = "skntbxlatoregular72727290KA";
       if (newPassword === "") 
       form.tbxNewPwdKA.skin = "sknffffbb72727290KA";
       else 
       form.tbxNewPwdKA.skin = "skntbxlatoregular72727290KA";
       if (reenterPassword === "") 
       form.tbxReenterNewPwdKA.skin = "sknffffbb72727290KA";
       else 
       form.tbxReenterNewPwdKA.skin = "skntbxlatoregular72727290KA";
        if (currentUserPassword !== "" && newPassword !== "" && reenterPassword !== "") {
           var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
           var options ={    "access": "online",
                "objectName": "RBObjects"
               };
  		   var headers = {"session_token":kony.retailBanking.globalData.session_token};
 		   var serviceName = "RBObjects";
  			var modelObj = INSTANCE.getModel("User",serviceName,options);
  			var record = {};
            record["password"] = frmChangePassword2KA.tbxNewPwdKA.text;
           var dataObject = new kony.sdk.dto.DataObject("User",record);
         var requestOptions = {"dataObject":dataObject, "headers":headers};
        modelObj.update(requestOptions, updateUsernameSuccess, customErrorCallback);
     }
}
}

function savePersonalDetails(){
    var INSTANCE =  kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  	var controller = INSTANCE.getFormController("frmPersonalDetailsStep2KA");
  	var navObject = new kony.sdk.mvvm.NavigationObject();
  	if(validatePersonalDetails()){
    	navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
		controller.performAction("saveData",[navObject]);
    }
}
function validatePersonalDetails(){
  var primaryPhone = frmPersonalDetailsStep2KA.tbxPhonePrimaryKA.text;
  var secondaryPhone = frmPersonalDetailsStep2KA.tbxPhoneSecondaryKA.text;
  var primaryEmail = frmPersonalDetailsStep2KA.tbxEmailPrimaryKA.text;
  var valid = true;
  var Pvalid = true;
  var Svalid = true;
  var Evalid = true;
    if (!(kony.retailBanking.util.validation.validateTextboxOrLabel(primaryPhone))) {
        frmPersonalDetailsStep2KA.tbxPhonePrimaryKA.skin = "sknlbxValidation";
        Pvalid = false;
    }
  	if(!(kony.retailBanking.util.validation.validateTextboxOrLabel(secondaryPhone))){
      	frmPersonalDetailsStep2KA.tbxPhoneSecondaryKA.skin = "sknlbxValidation";
        Svalid = false;
      }
  if(Pvalid && Svalid){
  	if(kony.retailBanking.util.validation.isValidNumber(primaryPhone) && kony.retailBanking.util.validation.isValidNumber(secondaryPhone)) {
      	frmPersonalDetailsStep2KA.tbxPhonePrimaryKA.skin = "CopyslTextBox082d070bc5b4f4d";
      	frmPersonalDetailsStep2KA.tbxPhoneSecondaryKA.skin = "CopyslTextBox082d070bc5b4f4d";      
      	valid = true;
        }  
  }
  else 
    return false;
  
 	if(valid){
    	if (!(kony.retailBanking.util.validation.validateTextboxOrLabel(primaryEmail))) {
        	frmPersonalDetailsStep2KA.tbxEmailPrimaryKA.skin = "sknlbxValidation";
        	Evalid = false;
       	 	return Evalid;
   		 } 
  		if(kony.retailBanking.util.validation.isValidEmail(primaryEmail)){
        	frmPersonalDetailsStep2KA.tbxEmailPrimaryKA.skin = "CopyslTextBox082d070bc5b4f4d";
       	 Evalid = true;
    	}
    }
  	return Evalid;
}