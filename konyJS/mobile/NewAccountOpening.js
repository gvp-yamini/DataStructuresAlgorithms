var selectedAccountForm;
var selectedAccountID;
var selectedStateID;
var selectedProductID;
var selectedProductName;
var newAccount={};
var count=0;
var mssn="";
function openEnterLocation()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
var controller = INSTANCE.getFormController("frmEnterLocationKA");
var navigationObject = new kony.sdk.mvvm.NavigationObject();
navigationObject.setRequestOptions("ListState",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
controller.performAction("navigateTo",["frmEnterLocationKA",navigationObject]);
}

function navigateToPickAProduct()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmPickAProductKA");
  var navigationObject = new kony.sdk.mvvm.NavigationObject();
  navigationObject.setRequestOptions("segAccountKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  controller.performAction("navigateTo",["frmPickAProductKA",navigationObject]);
}
function settingAccountValues()
{
  	selectedAccountID = frmPickAProductKA.segAccountKA.selectedItems[0].AccID;
	selectedAccountForm=frmPickAProductKA.segAccountKA.selectedItems[0].TypeDescription;
}
function locationProceed()
{
  selectedStateID=frmEnterLocationKA.ListState.selectedKey;
  if (selectedStateID == -1){
    alert(i18n_selectStateAlert);
    //selectedStateID = '1';
  }

  else{
  if(selectedAccountID == "1" || selectedAccountID == "2"  || selectedAccountID == "5"){    
    //frmAcmeCreditCardKA.lblHeadingKA.text = selectedAccountForm;
    //frmAcmeCreditCardKA.show();
    showAcmeCreditCardKA();
  }
  else{
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmCreditCardsKA");
    var navigationObject = new kony.sdk.mvvm.NavigationObject();
    navigationObject.setRequestOptions("moreResourcesSegment",{"headers":{"session_token":kony.retailBanking.globalData.session_token}
    ,"queryParams" : {"accountType": selectedAccountID, "StateId": selectedStateID  }});                                                  
    controller.performAction("navigateTo",["frmCreditCardsKA",navigationObject]);
    frmCreditCardsKA.lblHeadingKA.text = selectedAccountForm ;
    //frmCreditCardsKA.show();
  }}
}
function onProductSelect()
{
selectedProductID=frmCreditCardsKA.moreResourcesSegment.selectedItems[0].productId;
selectedProductName=frmCreditCardsKA.moreResourcesSegment.selectedItems[0].productDescription;
//frmAcmeCreditCardKA.lblHeadingKA.text = selectedProductName;
//frmAcmeCreditCardKA.show();
 showAcmeCreditCardKA();
}
function personalDetailsPreShow()
{
  if (kony.application.getPreviousForm().id=== "frmAcmeCreditCardKA")
  {
    newAccount={};
  }
  if(Object.keys(newAccount).length==0){
  frmEnterPersonalDetailsKA.answerField.text=kony.retailBanking.globalData.globals.userObj.userFirstName+" "+kony.retailBanking.globalData.globals.userObj.userLastName;
  var dob=new Date(kony.retailBanking.globalData.globals.userObj.dateOfBirth);
  frmEnterPersonalDetailsKA.CalendarDOB.date=[dob.getDate(),dob.getMonth()+1,dob.getFullYear()]
  frmEnterPersonalDetailsKA.phoneone.text=kony.retailBanking.globalData.globals.userObj.phone;
  frmEnterPersonalDetailsKA.phonetwo.text="";
  frmEnterPersonalDetailsKA.address.text="";
  frmEnterPersonalDetailsKA.email.text=kony.retailBanking.globalData.globals.userObj.email;
  mssn="XXX XX "+kony.retailBanking.globalData.globals.userObj.ssn.slice(-4);
  frmEnterPersonalDetailsKA.ssn.text=mssn;
  }
  else
    {
      frmEnterPersonalDetailsKA.answerField.text=newAccount.name;
      var dob=new Date(newAccount.dob.split("/")[2]+"-"+newAccount.dob.split("/")[1]+"-"+newAccount.dob.split("/")[0]);
  	  frmEnterPersonalDetailsKA.CalendarDOB.date=[dob.getDate(),dob.getMonth()+1,dob.getFullYear()]
      frmEnterPersonalDetailsKA.phoneone.text=newAccount.phoneone;
      frmEnterPersonalDetailsKA.phonetwo.text=newAccount.phonetwo;
      frmEnterPersonalDetailsKA.email.text=newAccount.email;
      frmEnterPersonalDetailsKA.address.text=newAccount.address;
      frmEnterPersonalDetailsKA.ssn.text=newAccount.ssn;
      if(newAccount.ssn==kony.retailBanking.globalData.globals.userObj.ssn)
        frmEnterPersonalDetailsKA.ssn.text=mssn;
    }
    
}

function PersonalDetailsOnClick()
{
  if(frmEnterPersonalDetailsKA.answerField.text==null || frmEnterPersonalDetailsKA.phoneone.text==null ||
     
     frmEnterPersonalDetailsKA.email.text=="" ||
     frmEnterPersonalDetailsKA.phoneone.text=="" ||
     frmEnterPersonalDetailsKA.address.text=="" ||
     frmEnterPersonalDetailsKA.ssn.text=="")
    {
      kony.ui.Alert({message: i18n_primaryFieldsAlert ,alertType: constants.
      ALERT_TYPE_INFO,alertTitle: i18n_unfilledData,yesLabel:i18n_OK},{});
    }
    else if(!kony.retailBanking.util.validation.isValidEmail(frmEnterPersonalDetailsKA.email.text)){
      alert(i18n_emailNotValid);
    }
   
     else if(ValidateAndInsertSSN(mssn,frmEnterPersonalDetailsKA.ssn.text))
     {
        alert(i18n_validSSNAlert);
     }
     else
    {

      newAccount.name=frmEnterPersonalDetailsKA.answerField.text;
      newAccount.dob=frmEnterPersonalDetailsKA.CalendarDOB.date;
      newAccount.phoneone=frmEnterPersonalDetailsKA.phoneone.text;
      newAccount.phonetwo=frmEnterPersonalDetailsKA.phonetwo.text;
      newAccount.email=frmEnterPersonalDetailsKA.email.text;
      newAccount.address=frmEnterPersonalDetailsKA.address.text;
      
      
      getSecurityQuestions();
    }
  
}

function getSecurityQuestions()
{
  var options = {"access":"online"};
  objectService = kony.sdk.getCurrentInstance().getObjectService("RBObjects",options);
  var dataObject = new kony.sdk.dto.DataObject("UserSecurityQuestions");
  var usrName = kony.retailBanking.globalData.globals.userObj.userName;
  kony.retailBanking.globalData.globals.usrName = usrName;
  var queryParams = {"userName":usrName};
  var serviceOptions = {"dataObject":dataObject,"queryParams":queryParams};
  objectService.fetch(serviceOptions,securityQuestionsSuccess,customErrorCallback);
}
function securityQuestionsSuccess(res){
  frmAnswerSecretQuestionsKA.txtQuestion1.text="";
  frmAnswerSecretQuestionsKA.txtQuestion2.text="";
  frmAnswerSecretQuestionsKA.lblQuestion1.text = res.records[0].question;
  frmAnswerSecretQuestionsKA.lblId1KA.text = res.records[0].question_id;
  frmAnswerSecretQuestionsKA.lblQuestion2.text = res.records[1].question;
  frmAnswerSecretQuestionsKA.lblId2KA.text = res.records[1].question_id;  
  frmAnswerSecretQuestionsKA.show();
}

function securityQuestionsError(res){
  alert(res.errmsg); 
}

function ValidateSecurityQuestions(){
  
  var q1 = frmAnswerSecretQuestionsKA.lblId1KA.text;
  var q2 = frmAnswerSecretQuestionsKA.lblId2KA.text;
  var options = {"access":"online"};
  objectService = kony.sdk.getCurrentInstance().getObjectService("RBObjects",options);
  var x = [{"question_id":q1,"answer":frmAnswerSecretQuestionsKA.txtQuestion1.text},
           {"question_id":q2,"answer":frmAnswerSecretQuestionsKA.txtQuestion2.text}
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
   alert(res.errmsg);
   if(count==5){
    count=0;
    frmMoreLandingKA.show();
   }
 }
  else{
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmViewApplicationKA");
    var navigationObject = new kony.sdk.mvvm.NavigationObject();
    navigationObject.setDataModel(null,kony.sdk.mvvm.OperationType.ADD, "form");
    navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
    controller.performAction("navigateTo",["frmViewApplicationKA",navigationObject]);
  
  //frmViewApplicationKA.show();
 }
}
function ValidateSecurityQuestionsError(res){
  alert(res.errmsg);
}


function viewApplicationPreShow(){
//   frmViewApplicationKA.lblHeadingKA.text=selectedAccountForm;
//   frmViewApplicationKA.userName.text=newAccount.name
//   frmViewApplicationKA.dob.text=newAccount.dob
//   frmViewApplicationKA.phoneone.text=newAccount.phoneone
//   frmViewApplicationKA.phonetwo.text=newAccount.phonetwo
//   frmViewApplicationKA.email.text=newAccount.email
//   frmViewApplicationKA.address.text=newAccount.address
//   frmViewApplicationKA.ssn.text=newAccount.ssn
  
}
  
function submitApplication(){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmViewApplicationKA");
  controller.performAction("saveData");
}

function submitApplicationError(res){
   alert(res.errmsg);
}

function ValidateAndInsertSSN(mssn, text)
{
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

function showAccountsTermsAndCond(){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmAcntTermsAndConditionsKA");
  var navigationObject = new kony.sdk.mvvm.NavigationObject();
  navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}
  ,"queryParams" : {"accountTypeId": selectedAccountID}});
  controller.performAction("navigateTo",["frmAcntTermsAndConditionsKA",navigationObject]);
}


function  showAcmeCreditCardKA()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmAcmeCreditCardKA");
  var navigationObject = new kony.sdk.mvvm.NavigationObject();
  navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}
  ,"queryParams" : {"accountTypeId": selectedAccountID}});
  controller.performAction("navigateTo",["frmAcmeCreditCardKA",navigationObject]);
}
