var selectedAccountID;
var selectedStateID;
var selectedSubProduct=[1,"none"];
var count=0;
var newAccount={};
function onClickDetailBox(btnId){
  if(btnId === "btnFeatures"){
    frmNewAccountKAStep2.btnFeatures.skin = "sknNewAccountButtonsClick";
    frmNewAccountKAStep2.lblFeaturesButtonBorder.skin = "sknNewAccountLabelClick";
    frmNewAccountKAStep2.flxscrFeatures.isVisible = true;
    
    frmNewAccountKAStep2.btnCharges.skin = "CopyslButtonGlossBlue068b8db74deea43";
    frmNewAccountKAStep2.lblChargesButtonBorder.skin = "CopyslLabel043d9a0fa3e2041";
 	frmNewAccountKAStep2.flxscrCharges.isVisible = false;
    
    frmNewAccountKAStep2.btnInfo.skin = "CopyslButtonGlossBlue068b8db74deea43";
    frmNewAccountKAStep2.lblInfoButtonBorder.skin = "CopyslLabel043d9a0fa3e2041";
    frmNewAccountKAStep2.flxscrInfo.isVisible = false;
  }
  else if(btnId === "btnCharges"){
    frmNewAccountKAStep2.btnCharges.skin = "sknNewAccountButtonsClick";
    frmNewAccountKAStep2.lblChargesButtonBorder.skin = "sknNewAccountLabelClick";
    frmNewAccountKAStep2.flxscrCharges.isVisible = true;
    
    frmNewAccountKAStep2.btnFeatures.skin = "CopyslButtonGlossBlue068b8db74deea43";
    frmNewAccountKAStep2.lblFeaturesButtonBorder.skin = "CopyslLabel043d9a0fa3e2041";
    frmNewAccountKAStep2.flxscrFeatures.isVisible = false;
    
    frmNewAccountKAStep2.btnInfo.skin = "CopyslButtonGlossBlue068b8db74deea43";
    frmNewAccountKAStep2.lblInfoButtonBorder.skin = "CopyslLabel043d9a0fa3e2041";
    frmNewAccountKAStep2.flxscrInfo.isVisible = false;
  }
  else if(btnId === "btnInfo"){
    frmNewAccountKAStep2.btnInfo.skin = "sknNewAccountButtonsClick";
    frmNewAccountKAStep2.lblInfoButtonBorder.skin = "sknNewAccountLabelClick";
    frmNewAccountKAStep2.flxscrInfo.isVisible = true;
    
    frmNewAccountKAStep2.btnFeatures.skin = "CopyslButtonGlossBlue068b8db74deea43";
    frmNewAccountKAStep2.lblFeaturesButtonBorder.skin = "CopyslLabel043d9a0fa3e2041";
 	frmNewAccountKAStep2.flxscrFeatures.isVisible = false;
    
    frmNewAccountKAStep2.btnCharges.skin = "CopyslButtonGlossBlue068b8db74deea43";
    frmNewAccountKAStep2.lblChargesButtonBorder.skin = "CopyslLabel043d9a0fa3e2041";
    frmNewAccountKAStep2.flxscrCharges.isVisible = false;
  }
}
function showNewAccountStep1(){
    frmNewAccountKAStep1.lbxStateKA.skin = "CopysknInputsKA0dc9a8f25976646";
    frmNewAccountKAStep1.lbxProductKA.skin = "CopysknInputsKA0dc9a8f25976646";
    frmNewAccountKAStep1.lbxProductTypeKA.skin = "CopysknInputsKA0dc9a8f25976646";	
  	frmNewAccountKAStep1.show();
}
function showNewAccountStep2(){
  	frmNewAccountKAStep2.show();
}
function showNewAccountStep3(){
  	frmNewAccountKAStep3.tbxNameInput.skin = "skntbxlatoregular424242KA";
 	frmNewAccountKAStep3.calDOBKA.skin="Copyskn0033117961c0e47";
    frmNewAccountKAStep3.tbxHomeNumber.skin="skntbxlatoregular424242KA";
  	frmNewAccountKAStep3.tbxEmailInput.skin="skntbxlatoregular424242KA";
    frmNewAccountKAStep3.tbxAddressInput.skin="skntbxlatoregular424242KA";
    frmNewAccountKAStep3.tbxSSNInput.skin="skntbxlatoregular424242KA";
  	var userObj = kony.retailBanking.globalData.globals.userObj;
  	var dateString = userObj.dateOfBirth;
  	frmNewAccountKAStep3.lblSSNHidden.text = userObj.ssn;
  	frmNewAccountKAStep3.lblDOBHidden.text = dateString;
  	var dateArr = [];
  	dateArr[0]= dateString.split("T")[0].split("-")[2];
  	dateArr[1]= dateString.split("T")[0].split("-")[1];
  	dateArr[2]= dateString.split("T")[0].split("-")[0];
  	frmNewAccountKAStep3.calDOBKA.dateComponents = dateArr;
  	frmNewAccountKAStep3.tbxNameInput.text = userObj.userFirstName + " " + userObj.userLastName;
	frmNewAccountKAStep3.tbxHomeNumber.text = userObj.phone;
  	frmNewAccountKAStep3.tbxEmailInput.text = userObj.email;
  	frmNewAccountKAStep3.tbxSSNInput.text = userObj.ssn;
    frmNewAccountKAStep3.show();
}
function showNewAccountStep4(){  	}
function showNewAccountStep5(){
  	 var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmNewAccountKAStep5");
    var navObject = new kony.sdk.mvvm.NavigationObject();
    navObject.setDataModel(null, kony.sdk.mvvm.OperationType.ADD, "form");
    navObject.setRequestOptions("form", {
        "headers": {
            "session_token": kony.retailBanking.globalData.session_token
        }
    });
    controller.loadDataAndShowForm(navObject);
}

function showStep1FromTC(flag){
  if(flag){
    frmNewAccountKAStep1.chkBxTC.selectedKeys = ["checkTC"];
    frmNewAccountKAStep1.show();
  }
  else{
    frmNewAccountKAStep1.chkBxTC.selectedKeys = [];
    frmNewAccountKAStep1.show();
  }
}
function showNewAccountSuccessPage(){
  submitApplication();
}
function showNewAccountTC(){
  frmNewAccountTC.show();
}

function validateStep3AndShowStep4(){
  var nameValid = kony.retailBanking.util.validation.validateTextboxOrLabel(frmNewAccountKAStep3.tbxNameInput.text);
  var dobValid = compareDate(kony.retailBanking.util.formatingDate.getDateObjFromKonyCalendarArray(frmNewAccountKAStep3.calDOBKA.dateComponents));
  var phnumValid = kony.retailBanking.util.validation.isValidNumber(frmNewAccountKAStep3.tbxHomeNumber.text);
  var emailValid = kony.retailBanking.util.validation.isValidEmail(frmNewAccountKAStep3.tbxEmailInput.text);
  var addValid = kony.retailBanking.util.validation.validateTextboxOrLabel(frmNewAccountKAStep3.tbxAddressInput.text);
  var ssnValid = kony.retailBanking.util.validation.validateTextboxOrLabel(frmNewAccountKAStep3.tbxSSNInput.text) && validateSSN(frmNewAccountKAStep3.tbxSSNInput.text);
  var valid = true;
  if(!nameValid){
    frmNewAccountKAStep3.tbxNameInput.skin = "sknffffbb72727290KA";
    valid = false;
  }
  else{
  	frmNewAccountKAStep3.tbxNameInput.skin = "skntbxlatoregular424242KA";  
  }
  if(!dobValid){
    frmNewAccountKAStep3.calDOBKA.skin="sknclffffbb72727290KA";
    valid = false;
  }
  else{
    frmNewAccountKAStep3.calDOBKA.skin="Copyskn0033117961c0e47";
  }
  if(!phnumValid){
    frmNewAccountKAStep3.tbxHomeNumber.skin="sknffffbb72727290KA";
    valid = false;
  }
  else{
    frmNewAccountKAStep3.tbxHomeNumber.skin="skntbxlatoregular424242KA";
  }
  if(!emailValid){
    frmNewAccountKAStep3.tbxEmailInput.skin="sknffffbb72727290KA";
    valid = false;
  }
  else{
    frmNewAccountKAStep3.tbxEmailInput.skin="skntbxlatoregular424242KA";
  }
  if(!addValid){
    frmNewAccountKAStep3.tbxAddressInput.skin="sknffffbb72727290KA";
    valid = false;
  }
  else{
    frmNewAccountKAStep3.tbxAddressInput.skin="skntbxlatoregular424242KA";
  }
  if(!ssnValid){
    frmNewAccountKAStep3.tbxSSNInput.skin="sknffffbb72727290KA";
  	valid = false;
  }
  else{
    frmNewAccountKAStep3.tbxSSNInput.skin="skntbxlatoregular424242KA";
  }
  if(valid){
    //This gives the security questions and shows form in success call back
    newAccount.name=frmNewAccountKAStep3.tbxNameInput.text;
       var calDate = frmNewAccountKAStep3.calDOBKA.dateComponents;
    var formattedDate = getDateStringNewAccount(calDate);
var scheduledDate2 = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(formattedDate);

 function getDateStringNewAccount(selectedScheduledDate){             
      var month,month1;
      var day,day1;
      var day = parseInt(selectedScheduledDate[0]);
      var  month = parseInt(selectedScheduledDate[1]);
      if(month <10){
        month = "0"+month;
      }
      if(day <10){
        day = "0"+day;
      }
      var formattedDate = selectedScheduledDate[2]+"-"+month+"-"+day;
      return formattedDate;
  } 
     newAccount.dob=scheduledDate2;
	newAccount.DBdob = kony.retailBanking.util.formatingDate.getDBDateTimeFormat(calDate,"00:00");
      newAccount.phoneone=frmNewAccountKAStep3.tbxHomeNumber.text;
      newAccount.phonetwo=frmNewAccountKAStep3.tbxMobileNumberInput.text;
      newAccount.email=frmNewAccountKAStep3.tbxEmailInput.text;
      newAccount.address=frmNewAccountKAStep3.tbxAddressInput.text;
      newAccount.ssn=frmNewAccountKAStep3.lblSSNHidden.text;
    getSecurityQuestionsForNewAccount();
  }
  
}
function validateStep1AndShowStep2(){
  var stateKey = frmNewAccountKAStep1.lbxStateKA.selectedKey;
  var productKey = frmNewAccountKAStep1.lbxProductKA.selectedKey;
  var productTypeKey = frmNewAccountKAStep1.lbxProductTypeKA.selectedKey;
  var tcKey = frmNewAccountKAStep1.chkBxTC.selectedKeys;
  var valid = true;
  if(stateKey === "-1"){
    valid = false;
    //Change skin for list box
    frmNewAccountKAStep1.lbxStateKA.skin = "sknlbxValidation";
  }
  else{
    frmNewAccountKAStep1.lbxStateKA.skin = "CopysknInputsKA0dc9a8f25976646";
  }
  if(productKey === "-1"){
    valid = false;
    //Change skin for list box
    frmNewAccountKAStep1.lbxProductKA.skin = "sknlbxValidation";
  }
  else{
    frmNewAccountKAStep1.lbxProductKA.skin = "CopysknInputsKA0dc9a8f25976646";
  }
  if(frmNewAccountKAStep1.flxProductType.isVisible == true && productTypeKey === "-1"){
    valid = false;
    //Change skin for list box
    frmNewAccountKAStep1.lbxProductTypeKA.skin = "sknlbxValidation";
  }
  else{
    frmNewAccountKAStep1.lbxProductTypeKA.skin = "CopysknInputsKA0dc9a8f25976646";
  }
  if(tcKey === null || tcKey[0] !== "checkTC"){
    valid = false;
  }
  if(valid){
    //showNewAccountStep2();
    getTnCAccounts(newAccountFeatures);
  }
  else{
    
  }
}
function loadAndShowNewAccountStep1(){
 	newAccount={}
	selectedAccountID=[];
	selectedStateID=[];
	selectedSubProduct=[1,"none"];
	count=0;
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmNewAccountKAStep1");
  var navigationObject = new kony.sdk.mvvm.NavigationObject();
  navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  controller.performAction("navigateTo",["frmNewAccountKAStep1",navigationObject]);

}
function OnProductSelectionStep1(){
  if(selectedStateID[0]!==undefined){
    frmNewAccountKAStep1.lbxStateKA.skin = "CopysknInputsKA0dc9a8f25976646";
    if(frmNewAccountKAStep1.lbxProductKA.selectedKey=="3"||frmNewAccountKAStep1.lbxProductKA.selectedKey=="4"){
      frmNewAccountKAStep1.flxProductType.setVisibility(true);
      fetchDetailsIntoSubProduct();
    }
    else{
          frmNewAccountKAStep1.flxProductType.setVisibility(false);
    }
  }
  else{
    frmNewAccountKAStep1.lbxStateKA.skin = "sknlbxValidation";
  }
}

function fetchDetailsIntoSubProduct()
{
  	var scopeObj = this;
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
	var options ={ "access": "online",
	              "objectName": "RBObjects"
                };
	var headers = {"session_token":kony.retailBanking.globalData.session_token};
	var serviceName = "RBObjects";
	var modelObj = INSTANCE.getModel("Products",serviceName,options);
	var dataObject = new kony.sdk.dto.DataObject("Products");
	var serviceOptions = {"dataObject":dataObject,"headers":headers,"queryParams":{"accountType": selectedAccountID[0], "StateId": selectedStateID[0]}};
	modelObj.fetch(serviceOptions, cardsTypeSuccess, customErrorCallback);
}

function cardsTypeSuccess (response)
{
  var masterData = [];
  var masterDataElement = [];
  masterDataElement.push("-1");
  var toAppend = "Select Sub Product"
  masterDataElement.push(toAppend);
  masterData.push(masterDataElement);
  for (var i = 0; i < response.length; i++) 
  {
         masterDataElement = [];
         var key = response[i]["productId"];
         var value = response[i]["productDescription"];                            
         masterDataElement.push(key);
         masterDataElement.push(value);
         masterData.push(masterDataElement);
  }
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var nwmsgController = INSTANCE.getFormController("frmNewAccountKAStep1");
    var formmodel = nwmsgController.getFormModel();
    //frmNewAccountKAStep1.lbxProductTypeKA.masterData=masterData;
    formmodel.setViewAttributeByProperty("lbxProductTypeKA","masterData",masterData);
    formmodel.setViewAttributeByProperty("lbxProductTypeKA","selectedKey","-1");
}



//coppied from tablet
function getSecurityQuestionsForNewAccount(){
  //ShowLoadingScreen();
  var options = {"access":"online"};
  objectService = kony.sdk.getCurrentInstance().getObjectService("RBObjects",options);
  var dataObject = new kony.sdk.dto.DataObject("UserSecurityQuestions");
  var usrName = kony.retailBanking.globalData.globals.userObj.userName;
  kony.retailBanking.globalData.globals.usrName = usrName;
  var queryParams = {"userName":usrName};
  var serviceOptions = {"dataObject":dataObject,"queryParams":queryParams};
  //objectService.fetch(serviceOptions, securityQuestionsSuccess, customErrorCallback);
  objectService.fetch(serviceOptions,securityQuestionsSuccess,customErrorCallback);
}
function securityQuestionsSuccess(res){
  frmNewAccountKAStep4.tbxQuestion1Answer.skin = "skntbxlatoregular424242KA";
  frmNewAccountKAStep4.tbxQuestion2Answer.skin = "skntbxlatoregular424242KA";
  frmNewAccountKAStep4.tbxQuestion1Answer.text="";
  frmNewAccountKAStep4.tbxQuestion2Answer.text="";
  frmNewAccountKAStep4.lblQuestion1KA.text = res.records[0].question;
  frmNewAccountKAStep4.lblId1KA.text = res.records[0].question_id;
  frmNewAccountKAStep4.lblQuestion2KA.text = res.records[1].question;
  frmNewAccountKAStep4.lblId2KA.text = res.records[1].question_id;  
  frmNewAccountKAStep4.show();
}
function securityQuestionsError(res){
  alert(res.errmsg); 
}
function ValidateSecurityQuestions(){
  
  var q1 = frmNewAccountKAStep4.lblId1KA.text;
  var q2 = frmNewAccountKAStep4.lblId2KA.text;
  var options = {"access":"online"};
  objectService = kony.sdk.getCurrentInstance().getObjectService("RBObjects",options);
  var x = [{"question_id":q1,"answer":frmNewAccountKAStep4.tbxQuestion1Answer.text},
           {"question_id":q2,"answer":frmNewAccountKAStep4.tbxQuestion2Answer.text}
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
  objectService.partialUpdate(serviceOptions,ValidateSecurityQuestionsSuccess,customErrorCallback);
  
 }
function ValidateSecurityQuestionsSuccess(res){
 if(res.errmsg){
    count=count+1;
   //alert(res.errmsg);
   frmNewAccountKAStep4.tbxQuestion1Answer.skin = "skntbxValidation";
   frmNewAccountKAStep4.tbxQuestion2Answer.skin = "skntbxValidation";
   if(count==5){
    count=0;
    loadAndShowNewAccountStep1();
   }
 }
  else{
     showNewAccountStep5();
 }
}
function ValidateSecurityQuestionsError(res){
  alert(res.errmsg);
}



function ValidateAndInsertSSN(mssn, text){
  if(mssn===text)
  {
    newAccount.ssn=kony.retailBanking.globalData.globals.userObj.ssn;
    return false;
  }
  if(text.match(/^\d{9}$/)){
    newAccount.ssn=text;
    return false;
  }
   return true;
}      
function viewApplicationPreShow(){
    frmNewAccountKAStep5.lblFromAccountDataKA.text = newAccount.name;
    frmNewAccountKAStep5.dob.text = newAccount.DBdob;
    frmNewAccountKAStep5.lblDOBDataKA.text = newAccount.dob;
    frmNewAccountKAStep5.lblPhoneone.text=newAccount.phoneone;
    frmNewAccountKAStep5.lblPhonetwo.text=newAccount.phonetwo;
    frmNewAccountKAStep5.lblEmail.text=newAccount.email;
    frmNewAccountKAStep5.address.text=newAccount.address;
    frmNewAccountKAStep5.ssn.text=newAccount.ssn;
    frmNewAccountKAStep5.firstName.text=newAccount.name.split(" ")[0];
    frmNewAccountKAStep5.lastName.text=newAccount.name.split(" ")[1];
    frmNewAccountKAStep5.accountType.text= selectedAccountID[0];
    frmNewAccountKAStep5.stateId.text=selectedStateID[0];
    frmNewAccountKAStep5.productId.text=selectedSubProduct[0];   
}  
function submitApplication(){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmNewAccountKAStep5");
  controller.performAction("saveData");
}

// show terms & conditions and features & rates
function getTnCAccounts(name)
{
  var scopeObj = this;
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var options ={ 
                 "access": "online",
                  "objectName": "RBObjects"
               };
  var headers = {"session_token":kony.retailBanking.globalData.session_token};
  var serviceName = "RBObjects";
  var modelObj = INSTANCE.getModel("AccountFeatures",serviceName,options);
  var dataObject = new kony.sdk.dto.DataObject("AccountFeatures");
  if(selectedAccountID.length>0){
  var serviceOptions = {"dataObject":dataObject,"headers":headers,"queryParams":{"accountTypeId": selectedAccountID[0]}};
  modelObj.fetch(serviceOptions, name, customErrorCallback);
  }else{
    alert("Please select an account type");
  }
}
//Success callback to show T&C
function newAccountTermsAndCond(response)
{ 
  frmNewAccountTC.rctxtTC.text=response[0].termsAndConditions;
  frmNewAccountTC.show();  
}
//Success CallBack to show Step 2
function newAccountFeatures(response)
{ 
  frmNewAccountKAStep2.rctxtCharges.text=response[0].rates;
  frmNewAccountKAStep2.rctxtFeatures.text=response[0].features;
  frmNewAccountKAStep2.rctxtInfo.text=response[0].info;
  frmNewAccountKAStep2.show();
}



