var selectedAccountForm;
var selectedAccountID;
var selectedStateID;
var selectedProductID;
var selectedProductName;
var InfoData;
var frmForm;
var newAccount={};
var count=0;
var mssn="";

function getAccountTypes(){
  ShowLoadingScreen();
  var scopeObj = this;
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var options ={    "access": "online",
                  "objectName": "RBObjects"
               };
  var headers = {"session_token":kony.retailBanking.globalData.session_token};
  var serviceName = "RBObjects";
  var modelObj = INSTANCE.getModel("AccountType",serviceName,options);
  var dataObject = new kony.sdk.dto.DataObject("AccountType");
  var serviceOptions = {"dataObject":dataObject,
                       "headers":headers};
  modelObj.fetch(serviceOptions, accountSuccess, customErrorCallback);
}


function accountSuccess(res)
{
   var acntTypes=res;
           for(var i=0;i< res.length;i++){
              acntTypes[i].accountName =res[i]["TypeDescription"];
			 acntTypes[i].flxClr= {skin:getSkinColor(res[i].TypeDescription)};
           }
         opennewaccount.segPickProduct.widgetDataMap={
              nameAccount1:"accountName",
              typeAccount:"TypeID",
              colorAccount1:"flxClr"
                             };
  opennewaccount.segPickProduct.setData(acntTypes);
  kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
  addRightPanel(opennewaccount.flxMain,"flxMain");
  newAccount={};
  ResetOpennewAccount();
  
  
}

function settingAccountValues()
{
  	selectedAccountID = opennewaccount.segPickProduct.selectedItems[0].TypeID;
	selectedAccountForm=opennewaccount.segPickProduct.selectedItems[0].TypeDescription;
}

function getTnCAccounts(name)
{
  var scopeObj = this;
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var options ={    "access": "online",
                  "objectName": "RBObjects"
               };
  var headers = {"session_token":kony.retailBanking.globalData.session_token};
  var serviceName = "RBObjects";
  var modelObj = INSTANCE.getModel("AccountFeatures",serviceName,options);
  var dataObject = new kony.sdk.dto.DataObject("AccountFeatures");
  var serviceOptions = {"dataObject":dataObject,"headers":headers,"queryParams":{"accountTypeId": selectedAccountID}};
  modelObj.fetch(serviceOptions, name, customErrorCallback);
}

function tnCAcntsSuccess(response)
{ 
  InfoData=response;
  opennewaccount.richTextTnC.text=response[0].termsAndConditions;
  openAccountFlxTransition("flxPickProduct","flxTermsAndConditions");
  moreLanding.ImgNav.src="wizard_steptwo.png";
  moreLanding.lblHeaderOpenAccount.text= i18n_termsnConditions;
}

function creditAcntsSuccess(response)
{ 
  InfoData=response;
  showInfoCards();
  frmEnterLocationKA.ImgNav.src="wizard_stepfive.png";
  frmEnterLocationKA.lblHeaderOpenAccount.text=selectedProductName;
}



function openEnterLocation()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmEnterLocationKA");
  var navigationObject = new kony.sdk.mvvm.NavigationObject();
  navigationObject.setDataModel(null,kony.sdk.mvvm.OperationType.ADD, "form");
  navigationObject.setRequestOptions("ListState",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
   navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
 controller.performAction("loadDataAndShowForm",[navigationObject]);
      
}

function locationProceed()
{
  selectedStateID=frmEnterLocationKA.lstLocation.selectedKey;
  if (selectedStateID == -1)
    showGeneralAlert(i18n_selectStateAlert);
   
  else
  {
  		if(selectedAccountID == "1" || selectedAccountID == "2"  || selectedAccountID == "5")    
   			showInfoCards();
  		else
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
            var serviceOptions = {"dataObject":dataObject,"headers":headers,"queryParams":{"accountType": selectedAccountID, "StateId": selectedStateID}};
            modelObj.fetch(serviceOptions, cardsTypeSuccess, customErrorCallback);

 		 }
  }
}

function showInfoCards()
{
  frmEnterLocationKA.richTxtUserDetails.text=InfoData[0].rates;
  frmEnterLocationKA.richTxtBasicInfo.text=InfoData[0].features;
  frmEnterLocationKA.richTxtcharges.text=InfoData[0].info;
  if(frmEnterLocationKA.flxCards.left == "0%")
    openAccountFlxTransitionLocation("flxCards","flxSilverCards");
  else
  openAccountFlxTransitionLocation("flxLocation","flxSilverCards");
  frmEnterLocationKA.ImgNav.src="wizard_stepfour.png";
  frmEnterLocationKA.lblHeaderOpenAccount.text=selectedAccountForm;
  openNewAccTabs(1);
}

function cardsTypeSuccess(response)
{
         frmEnterLocationKA.segCards.widgetDataMap={
              lblPageNameKA:"productDescription",
              lblProductId:"productId"
         };
     frmEnterLocationKA.segCards.setData(response);
     openAccountFlxTransitionLocation("flxLocation","flxCards");
     frmEnterLocationKA.ImgNav.src="wizard_stepfour.png";
     frmEnterLocationKA.lblHeaderOpenAccount.text=selectedAccountForm;
}

function onProductSelect()
{
    selectedProductID= frmEnterLocationKA.segCards.selectedItems[0].productId;
    selectedProductName=frmEnterLocationKA.segCards.selectedItems[0].productDescription;
    getTnCAccounts(creditAcntsSuccess);
}


function personalDetailsPreShow()
{
  
   var d = new Date();
   var curr_date, curr_month, curr_year;
   curr_date = d.getDate();
   curr_month = d.getMonth()+1;
   curr_year = d.getFullYear();
   frmEnterLocationKA.CalendarDOB.validEndDate = [curr_date,curr_month,curr_year];
  if(Object.keys(newAccount).length==0){
  frmEnterLocationKA.txtUname.text=kony.retailBanking.globalData.globals.userObj.userFirstName+" "+kony.retailBanking.globalData.globals.userObj.userLastName;
  var dob=new Date(kony.retailBanking.globalData.globals.userObj.dateOfBirth);
  frmEnterLocationKA.CalendarDOB.date=[dob.getDate(),dob.getMonth()+1,dob.getFullYear()]
  frmEnterLocationKA.phoneone.text=kony.retailBanking.globalData.globals.userObj.phone;
  frmEnterLocationKA.phonetwo.text="";
  frmEnterLocationKA.address.text="";
  frmEnterLocationKA.email.text=kony.retailBanking.globalData.globals.userObj.email;
  mssn="XXX XX "+kony.retailBanking.globalData.globals.userObj.ssn.slice(-4);
  frmEnterLocationKA.ssn.text=mssn;
  }
  else
    {
      frmEnterLocationKA.txtUname.text=newAccount.name;
      var dob=new Date(newAccount.dob.split("/")[2]+"-"+newAccount.dob.split("/")[1]+"-"+newAccount.dob.split("/")[0]);
  	  frmEnterLocationKA.CalendarDOB.date=[dob.getDate(),dob.getMonth()+1,dob.getFullYear()]
      frmEnterLocationKA.phoneone.text=newAccount.phoneone;
      frmEnterLocationKA.phonetwo.text=newAccount.phonetwo;
      frmEnterLocationKA.email.text=newAccount.email;
      frmEnterLocationKA.address.text=newAccount.address;
      frmEnterLocationKA.ssn.text=newAccount.ssn;
      if(newAccount.ssn==kony.retailBanking.globalData.globals.userObj.ssn)
        frmEnterLocationKA.ssn.text=mssn;
    }
    
}

function PersonalDetailsOnClick()
{
  if( frmEnterLocationKA.txtUname.text==null ||  frmEnterLocationKA.phoneone.text==null ||
      frmEnterLocationKA.email.text=="" ||
      frmEnterLocationKA.phoneone.text=="" ||
      frmEnterLocationKA.address.text=="" ||
      frmEnterLocationKA.ssn.text=="")
    {
      kony.ui.Alert({message: i18n_primaryFieldsAlert,alertType: constants.
      ALERT_TYPE_INFO,alertTitle: i18n_unfilledData,yesLabel:i18n_ok},{});
    }
    else if(!kony.retailBanking.util.validation.isValidEmail(frmEnterLocationKA.email.text))
      showGeneralAlert(i18n_validEmailalert);
     else if(ValidateAndInsertSSN(mssn,frmEnterLocationKA.ssn.text))
       showGeneralAlert(i18n_validSSNalert);
     else
    {
      newAccount.name=frmEnterLocationKA.txtUname.text;
      newAccount.dob=frmEnterLocationKA.CalendarDOB.date;
      newAccount.phoneone=frmEnterLocationKA.phoneone.text;
      newAccount.phonetwo=frmEnterLocationKA.phonetwo.text;
      newAccount.email=frmEnterLocationKA.email.text;
      newAccount.address=frmEnterLocationKA.address.text;
      getSecurityQuestions(securityQuestionsSuccess);
    }
  
}


function getSecurityQuestions(successFunc)
{
  ShowLoadingScreen();
  var options = {"access":"online"};
  objectService = kony.sdk.getCurrentInstance().getObjectService("RBObjects",options);
  var dataObject = new kony.sdk.dto.DataObject("UserSecurityQuestions");
  var usrName = kony.retailBanking.globalData.globals.userObj.userName;
  kony.retailBanking.globalData.globals.usrName = usrName;
  var queryParams = {"userName":usrName};
  var serviceOptions = {"dataObject":dataObject,"queryParams":queryParams};
  objectService.fetch(serviceOptions, successFunc, customErrorCallback);
}

function securityQuestionsSuccess(res){
   kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
  frmEnterLocationKA.txtQuestion1.text="";
  frmEnterLocationKA.txtQuestion2.text="";
  frmEnterLocationKA.lblQuestion1.text = res.records[0].question;
  frmEnterLocationKA.lblId1KA.text = res.records[0].question_id;
  frmEnterLocationKA.lblQuestion2.text = res.records[1].question;
  frmEnterLocationKA.lblId2KA.text = res.records[1].question_id;  
  openAccountFlxTransitionLocation("flxPersonalDetails","flxSecretQuestion");
  frmEnterLocationKA.ImgNav.src="wizard_stepseven.png";
  frmEnterLocationKA.lblHeaderOpenAccount.text=i18n_answerSecretQuestns;

}

function securityQuestionsError(res){
  showGeneralAlert(res.errmsg); 
}

function ValidateSecurityQuestions(){
  
  var q1 = frmEnterLocationKA.lblId1KA.text;
  var q2 = frmEnterLocationKA.lblId2KA.text;
  var options = {"access":"online"};
  objectService = kony.sdk.getCurrentInstance().getObjectService("RBObjects",options);
  var x = [{"question_id":q1,"answer":frmEnterLocationKA.txtQuestion1.text},
           {"question_id":q2,"answer":frmEnterLocationKA.txtQuestion2.text}
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
  objectService.partialUpdate(serviceOptions, ValidateSecurityQuestionsSuccess, customErrorCallback);
  
 }
function ValidateSecurityQuestionsSuccess(res){
 if(res.errmsg){
    count=count+1;
   showGneralAlert(res.errmsg);
   if(count==5){
    count=0;
    moreLanding.show();
   }
 }
  else{
     viewApplicationPreShow();
    openAccountFlxTransitionLocation("flxSecretQuestion","flxapplicationPreview");
   frmEnterLocationKA.ImgNav.src="wizard_stepeight.png";
   frmEnterLocationKA.lblHeaderOpenAccount.text=i18n_viewApplicationForm;
 }
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
    
function viewApplicationPreShow(){
    frmEnterLocationKA.lblUserName.text=newAccount.name;
	frmEnterLocationKA.lblDob.text=newAccount.dob;
    frmEnterLocationKA.lblPhoneone.text=newAccount.phoneone;
    frmEnterLocationKA.lblPhonetwo.text=newAccount.phonetwo;
    frmEnterLocationKA.lblEmail.text=newAccount.email;
    frmEnterLocationKA.lblAddress.text=newAccount.address;
    frmEnterLocationKA.lblssn.text=newAccount.ssn;
    frmEnterLocationKA.lblUserFirstName.text=newAccount.name.split(" ")[0];
    frmEnterLocationKA.lblUserLastName.text=newAccount.name.split(" ")[1];
    frmEnterLocationKA.lblAcntType.text= selectedAccountID;
    frmEnterLocationKA.lblStateId.text=selectedStateID;
    frmEnterLocationKA.lblProductId.text=selectedProductID;

   
}
  
function submitApplication(){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmEnterLocationKA");
  controller.performAction("saveData");
}