var flxNo = 1;
function payPersonlInit(){
  fromCardHeightPayPerson = frmNewPayPersonKA.fromCard.height;
  userAgent = kony.os.userAgent();
}
function moveToPaymentSuccess(whichFlx){
    flxNo = 1;
    frmNewPayPersonKA.flxTitleBar2KA.animate(
    kony.ui.createAnimation({"100":{"left": "100%","stepConfig":{"timingFunction": easeIn}}}),
    {"fillMode": forwards, "duration": duration},
    {"animationStart": function () { 
    },
     "animationEnd": function () {
    }}
  );
      frmNewPayPersonKA.flxTitleBar1KA.animate(
    kony.ui.createAnimation({"100":{"left": "0%","stepConfig":{"timingFunction": easeIn}}}),
    {"fillMode": forwards, "duration": duration},
    {"animationStart": function () { 
    },
     "animationEnd": function () {
    }}
  );
    frmNewPayPersonKA.flxSelectedPayPersonKA.animate(
    kony.ui.createAnimation({"100":{"left": "100%","stepConfig":{"timingFunction": easeIn}}}),
    {"fillMode": forwards, "duration": duration},
    {"animationStart": function () {
    },
     "animationEnd": function () {
    }}
  );
    frmNewPayPersonKA.newPayPersonScreen1.animate(
    kony.ui.createAnimation({"100":{"left": "0%","stepConfig":{"timingFunction": easeIn}}}),
    {"fillMode": forwards, "duration": duration},
    {"animationStart": function () {},
     "animationEnd": function () {
    }}
  );
  if(whichFlx == "flx1"){
    transactionSuccess(frmNewPayPersonKA);
  }else{
      var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
      var listController = INSTANCE.getFormController("frmNewPayPersonKA");
      var navObject = new kony.sdk.mvvm.NavigationObject();
      listController.performAction("navigateTo",["frmTransferPayLandingKA",navObject]);
  }
}
//edit or repeat p2p transfers
function OnEditTransaction(tempdata)
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController("frmNewPayPersonKA");
  var formmodel = listController.getFormModel();
  if(tempdata.isScheduled == "true")
  {
    var date = tempdata.scheduledDate;
    var year = date.slice(0,4);
    var month = date.slice(5,7);
    var day = date.slice(8,10);
    frmNewPayPersonKA.calDateKA.dateComponents = [parseFloat(day), parseFloat(month), parseFloat(year), 0.0, 0.0, 0.0];
    formmodel.setViewAttributeByProperty("selectPayeeButton","isVisible",false);
    formmodel.setViewAttributeByProperty("tranferAmount","isVisible",true);
    formmodel.setViewAttributeByProperty("tranferAmount","text",i18n_TRANSFER);
    formmodel.setViewAttributeByProperty("transferPayTitleLabel","text",i18n_editP2PPerson);
    formmodel.setViewAttributeByProperty("referenceId","text",tempdata.primaryKeyValueMap.transactionId);
  }
  else
  {
    var date = new Date();
    var year =   date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    frmNewPayPersonKA.calDateKA.dateComponents = [parseFloat(day), parseFloat(month), parseFloat(year)];
    formmodel.setViewAttributeByProperty("selectPayeeButton","isVisible",true);
    formmodel.setViewAttributeByProperty("tranferAmount","isVisible",false);
    formmodel.setViewAttributeByProperty("transferPayTitleLabel","text",i18n_repeatP2P);
    formmodel.setViewAttributeByProperty("referenceId","text","");
  }
  	formmodel.setViewAttributeByProperty("CopydollarSign05d271943888c46","text",kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount("",kony.retailBanking.globalData.globals.CurrencyCode));
    var  accPreviewData= kony.retailBanking.globalData.accounts.getAccountsData();
    kony.print("accPreviewData"+JSON.stringify(accPreviewData));
    for(var i=0;i< accPreviewData.length;i++){
      accPreviewData[i].accountName = kony.retailBanking.util.validation.trucateTo(accPreviewData[i].accountName,35,32,"...");
      availableBal = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accPreviewData[i].availableBalance,kony.retailBanking.globalData.globals.CurrencyCode); 
      if(accPreviewData[i].accountType=="CreditCard"){
        availableBal = "-"+availableBal;
      }
      accPreviewData[i].availableBalance= availableBal;
      accPreviewData[i].flxClr= {skin:getSkinColor(accPreviewData[i].accountType)};
    }
    frmNewPayPersonKA.segInternalFromAccountsKA.widgetDataMap={
      nameAccount1:"accountName",
      amountAccount1:"availableBalance",
      typeKA:"accountID",
      colorAccount1:"flxClr"
    };
  var tempdataAcc= getFilteredFromAndToAccounts(accPreviewData);
  fromdatalength = tempdataAcc[0].length;
  formmodel.setWidgetData("segInternalFromAccountsKA",tempdataAcc[0]);
  formmodel.setViewAttributeByProperty("segInternalFromAccountsKA","setVisibility",false);
  var fromdata = kony.retailBanking.globalData.accounts.searchAccountById(tempdata.fromAccountNumber);
  formmodel.setViewAttributeByProperty("fromNamePick","text",fromdata.accountName);
  formmodel.setViewAttributeByProperty("fromAmountPick","text",kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(fromdata.availableBalance));
  var amount = (tempdata.amount).toString();
  formmodel.setViewAttributeByProperty("amountTextField","text",amount.replace(/[^0-9\.\,]+/g, ""));
  formmodel.setViewAttributeByProperty("noteTextFieldLabel","text",tempdata.transactionsNotes);
  formmodel.setViewAttributeByProperty("accountNumber","text",tempdata.fromAccountNumber);
  formmodel.setViewAttributeByProperty("fromCardInner","isVisible",false);
  formmodel.setViewAttributeByProperty("fromAccountPick","isVisible",true);
  formmodel.setViewAttributeByProperty("tbxPhoneKA","text",tempdata.payPersonPhone);
  formmodel.setViewAttributeByProperty("payPersonName","text",tempdata.payPersonName);
  formmodel.setViewAttributeByProperty("payeefname","text",tempdata.transactionType);
  formmodel.setViewAttributeByProperty("CopydollarSign05d271943888c46","text",kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount("",kony.retailBanking.globalData.globals.CurrencyCode));
  formmodel.setViewAttributeByProperty("CopyLabel03e39ab4661a845","text",kony.retailBanking.globalData.globals.BankName);
  CanEnableSelPayeeBtn();
  formmodel.showView();
  viewFirstFlex();
 }
//Cancel in add new payee
function cancelAddNewPayee()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var toController = INSTANCE.getFormController("frmNewPayPersonKA");
  var formModel = toController.getFormModel();
  formModel.performActionOnView("newPayPersonWrapper","setEnabled",[true]);
  formModel.performActionOnView("flxTitleBar1KA","setEnabled",[true]);
  formModel.performActionOnView("flxTitleBar2KA","setEnabled",[true]);
  closeModal("flxAddNewPayeeWrapperKA",frmP2PaddnewPayeeKA);
}
//Edit in confirm page
function editP2PinConfirmation()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController("frmP2PConfirmTransferKA");
  var formModel = listController.getFormModel();
  var navObject = new kony.sdk.mvvm.NavigationObject();
  var ToController = INSTANCE.getFormController("frmNewPayPersonKA");
  var viewModel = ToController.getFormModel();
  viewModel.setViewAttributeByProperty("transferPayTitleLabel","text",i18n_editTransfer);
  var amount = formModel.getViewAttributeByProperty("transactionAmount","text");
  var notes = formModel.getViewAttributeByProperty("transactionNotes","text");
  viewModel.setViewAttributeByProperty("amountTextField","text",amount);
  viewModel.setViewAttributeByProperty("noteTextFieldLabel","text",notes);
  frmNewPayPersonKA.show();
  moveToPaymentSuccess("flx3");
}
//View first flex for new transaction
function viewFirstFlex()
{
  if(flxNo == 3)
  {
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var toController = INSTANCE.getFormController("frmNewPayPersonKA");
  var viewModel = toController.getFormModel();
    frmNewPayPersonKA.flxSelectedPayPersonKA.animate(
    kony.ui.createAnimation({"100":{"left": "100%","stepConfig":{"timingFunction": easeIn}}}),
    {"fillMode": forwards, "duration": duration},
    {"animationStart": function () { 
     },
     "animationEnd": function () {
    }}
  );
   frmNewPayPersonKA.flxPaypersonReciepientsListKA.animate(
    kony.ui.createAnimation({"100":{"left": "100%","stepConfig":{"timingFunction": easeIn}}}),
    {"fillMode": forwards, "duration": duration},
    {"animationStart": function () {
    },
     "animationEnd": function () {
    }}
  );
   frmNewPayPersonKA.flxTitleBar2KA.animate(
    kony.ui.createAnimation({"100":{"left": "100%","stepConfig":{"timingFunction": easeIn}}}),
    {"fillMode": forwards, "duration": duration},
    {"animationStart": function () {},
     "animationEnd": function () {
    }}
  );
  frmNewPayPersonKA.flxTitleBar1KA.animate(
    kony.ui.createAnimation({"100":{"left": "0%","stepConfig":{"timingFunction": easeIn}}}),
    {"fillMode": forwards, "duration": duration},
    {"animationStart": function () {},
     "animationEnd": function () {
    }}
  );
   frmNewPayPersonKA.newPayPersonScreen1.animate(
    kony.ui.createAnimation({"100":{"left": "0%","stepConfig":{"timingFunction": easeIn}}}),
    {"fillMode": forwards, "duration": duration},
    {"animationStart": function () {},
     "animationEnd": function () {
    }}
  );
}
  flxNo = 1;
}
//back botton in newpayperson form
function goBackToPreviousPayPersonPage(){
  if(flxNo == 2){
    flxNo = 1;
    frmNewPayPersonKA.flxTitleBar2KA.animate(
    kony.ui.createAnimation({"100":{"left": "100%","stepConfig":{"timingFunction": easeIn}}}),
    {"fillMode": forwards, "duration": duration},
    {"animationStart": function () { 
    },
     "animationEnd": function () {
    }}
  );
      frmNewPayPersonKA.flxTitleBar1KA.animate(
    kony.ui.createAnimation({"100":{"left": "0%","stepConfig":{"timingFunction": easeIn}}}),
    {"fillMode": forwards, "duration": duration},
    {"animationStart": function () { 
    },
     "animationEnd": function () {
    }}
  );
    frmNewPayPersonKA.flxPaypersonReciepientsListKA.animate(
    kony.ui.createAnimation({"100":{"left": "100%","stepConfig":{"timingFunction": easeIn}}}),
    {"fillMode": forwards, "duration": duration},
    {"animationStart": function () {},
     "animationEnd": function () {
    }}
  );
    
    frmNewPayPersonKA.newPayPersonScreen1.animate(
    kony.ui.createAnimation({"100":{"left": "0%","stepConfig":{"timingFunction": easeIn}}}),
    {"fillMode": forwards, "duration": duration},
    {"animationStart": function () {},
     "animationEnd": function () {
    }}
  );
  }else if(flxNo == 3){
    flxNo = 2;
       frmNewPayPersonKA.flxPaypersonReciepientsListKA.animate(
    kony.ui.createAnimation({"100":{"left": "0%","stepConfig":{"timingFunction": easeIn}}}),
    {"fillMode": forwards, "duration": duration},
    {"animationStart": function () {},
     "animationEnd": function () {
    }}
  );
  frmNewPayPersonKA.flxSelectedPayPersonKA.animate(
    kony.ui.createAnimation({"100":{"left": "100%","stepConfig":{"timingFunction": easeIn}}}),
    {"fillMode": forwards, "duration": duration},
    {"animationStart": function () {
    },
     "animationEnd": function () {
    }}
  );
  }
}
function removeModal(){
  closeModal("flxAddNewPayeeWrapperKA",frmP2PaddnewPayeeKA);
}
//on click of segment in contacts page
function addPayeeContactFromList(){
  var INSTANCE =  kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmP2PaddnewPayeeKA");
  var viewModel = controller.getFormModel();
  var selectedRow = viewModel.getViewAttributeByProperty("phonecontactsegment", "selectedItems")[0];
  viewModel.setViewAttributeByProperty("payeefname","text",selectedRow.firstname);
  viewModel.setViewAttributeByProperty("payeelname","text",selectedRow.lastname);
  viewModel.setViewAttributeByProperty("tbxPhoneKA","text",selectedRow.number);
  viewModel.setViewAttributeByProperty("tbxEmailKA","text",selectedRow.email);
  if(selectedRow.number!="")
        setPhonePrimary();
  else
        setEmailPrimary();
  viewModel.setViewAttributeByProperty("flxAddPayeeContactListKA","isVisible",false);
  viewModel.setViewAttributeByProperty("flxNewPayeeAddKA","isVisible",true);
  openModal(frmP2PaddnewPayeeKA.flxAddNewPayeeWrapperKA,"flxAddNewPayeeWrapperKA");
}
//Fetch device contacts
function Contacts(){
  var array=kony.contact.find("*", true);
  if(array == null || array == "" || array.length == 0)
    {
      	kony.ui.Alert({
	"message": i18n_noContacts,
	"alertType": constants.ALERT_TYPE_INFO,
	"alertTitle":i18n_btnInfo,
	"yesLabel": i18n_ok,
	"noLabel": null,
	"alertHandler":changeopacity
	},{});
    	return;
    }
  kony.print("array :"+JSON.stringify(array));
  var contactList= [];
  var count = 0;
  for (var i=0;i<array.length;i++)
    if((!(typeof(array[i].firstname) === "undefined"))&&(array[i].firstname!=""||array[i].firstname!=undefined)&&((!(typeof(array[i].phone) === "undefined"))||(!(typeof(typeof(array[i].email) === "undefined")))))
    {
      if((typeof(array[i].phone) === "undefined"||array[i].phone.length==0)&&array[i].email.length)
        {
        contactList.push({
        "firstname":array[i].firstname,
        "number":"",
        "lastname":array[i].lastname,
        "email":array[i].email[0].id
      })
        count++;
        }
      else if((typeof(array[i].email) === "undefined"||array[i].email.length==0)&&array[i].phone.length)
        {
        contactList.push({
        "firstname":array[i].firstname,
        "number":array[i].phone[0].number,
        "lastname":array[i].lastname,
        "email":""
      })
        count++;
        }
      else if(array[i].phone.length&&array[i].email.length)
        {
      contactList.push({
        "firstname":array[i].firstname,
        "number":array[i].phone[0].number,
        "lastname":array[i].lastname,
        "email":array[i].email[0].id
      })
      count++;
        }
      if(count == 0)
        {
          kony.ui.Alert({
            "message": i18n_noContacts,
            "alertType": constants.ALERT_TYPE_INFO,
            "alertTitle":i18n_btnInfo,
            "yesLabel": i18n_ok,
            "noLabel": null,
            "alertHandler":changeopacity
          },{});
          return;
        }
      frmP2PaddnewPayeeKA.phonecontactsegment.widgetDataMap={
      transactionName:"firstname",
      phoneNumber:"number",
      transactionLastName:"lastname",
      transactionEmail:"email"
    };
  frmP2PaddnewPayeeKA.phonecontactsegment.setData(contactList);
      var INSTANCE =  kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  	  var controller = INSTANCE.getFormController("frmNewPayPersonKA");
  	  var viewModel = controller.getFormModel();
  	  var toController = INSTANCE.getFormController("frmP2PaddnewPayeeKA");
  	  var formModel = toController.getFormModel();
      formModel.setViewAttributeByProperty("flxAddPayeeContactListKA","isVisible",true);
      formModel.setViewAttributeByProperty("flxNewPayeeAddKA","isVisible",false);
      viewModel.performActionOnView("newPayPersonWrapper","setEnabled",[false]);
      viewModel.performActionOnView("flxTitleBar1KA","setEnabled",[false]);
      viewModel.performActionOnView("flxTitleBar2KA","setEnabled",[false]);
      openModal(frmP2PaddnewPayeeKA.flxAddNewPayeeWrapperKA,"flxAddNewPayeeWrapperKA");
    }
 }
// search phone contacts
function searchContacts(){
    var INSTANCE =  kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmP2PaddnewPayeeKA");
    var viewModel = controller.getFormModel();
	var data=viewModel.getViewAttributeByProperty("txtSearchContactListKA","text");
    var array=kony.contact.find(data, true);
    var contactList=[];
  	for (var i=0;i<array.length;i++)
    if((!(typeof(array[i].firstname) === "undefined"))&&(array[i].firstname!=""||array[i].firstname!=undefined)&&((!(typeof(array[i].phone) === "undefined"))||(!(typeof(typeof(array[i].email) === "undefined")))))
    {
      if((typeof(array[i].phone) === "undefined"||array[i].phone.length==0)&&array[i].email.length)
        contactList.push({
        "firstname":array[i].firstname,
        "number":"",
        "lastname":array[i].lastname,
        "email":array[i].email[0].id
      })
      else if((typeof(array[i].email) === "undefined"||array[i].email.length==0)&&array[i].phone.length)
        contactList.push({
        "firstname":array[i].firstname,
        "number":array[i].phone[0].number,
        "lastname":array[i].lastname,
        "email":""
      })
      else if(array[i].phone.length&&array[i].email.length)
      contactList.push({
        "firstname":array[i].firstname,
        "number":array[i].phone[0].number,
        "lastname":array[i].lastname,
        "email":array[i].email[0].id
      })
    }
  frmP2PaddnewPayeeKA.phonecontactsegment.widgetDataMap={
      transactionName:"firstname",
      phoneNumber:"number",
      transactionLastName:"lastname",
      transactionEmail:"email"
    };
  frmP2PaddnewPayeeKA.phonecontactsegment.setData(contactList);
}
//selecting add new payee in select payee page
function selectAddNewPayee()
{
  var INSTANCE =  kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var toController = INSTANCE.getFormController("frmNewPayPersonKA");
  var formModel = toController.getFormModel();
  formModel.performActionOnView("newPayPersonWrapper","setEnabled",[false]);
  formModel.performActionOnView("flxTitleBar1KA","setEnabled",[false]);
  formModel.performActionOnView("flxTitleBar2KA","setEnabled",[false]);
  var controller = INSTANCE.getFormController("frmP2PaddnewPayeeKA");
  var viewModel = controller.getFormModel();
  viewModel.setViewAttributeByProperty("payeefname","text","");
  viewModel.setViewAttributeByProperty("payeelname","text","");
  viewModel.setViewAttributeByProperty("tbxPhoneKA","text","");
  viewModel.setViewAttributeByProperty("tbxEmailKA","text","");
  viewModel.setViewAttributeByProperty("flxAddPayeeContactListKA","isVisible",false);
  viewModel.setViewAttributeByProperty("flxNewPayeeAddKA","isVisible",true);
  viewModel.setViewAttributeByProperty("saveNewPayeeButton","skin","primaryActionDisabled");
  setPhonePrimary();
  viewModel.setViewAttributeByProperty("payeefname","setFocus",true);
  openModal(frmP2PaddnewPayeeKA.flxAddNewPayeeWrapperKA,"flxAddNewPayeeWrapperKA");
}
//On click of add new payee manual save
function OnclickOfAddPayeeList()
{
  var INSTANCE =  kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmP2PaddnewPayeeKA");
  var viewModel = controller.getFormModel();
  if(frmP2PaddnewPayeeKA.saveNewPayeeButton.skin == "primaryActionDisabled")
    return;
    if(frmP2PaddnewPayeeKA.imgPhoneKA.src =="radioselected.png")
    viewModel.setViewAttributeByProperty("tbxEmailKA","text","");
  else if(frmP2PaddnewPayeeKA.imgEmailKA.src =="radioselected.png")
    viewModel.setViewAttributeByProperty("tbxPhoneKA","text","");
 	saveNewPayee();
}
//Manual save of new payee
function saveNewPayee()
{
  var INSTANCE =  kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmP2PaddnewPayeeKA");
  var viewModel = controller.getFormModel();
  var options ={    "access": "online",
                "objectName": "RBObjects"
               };
  var headers = {"session_token":kony.retailBanking.globalData.session_token};
  var serviceName = "RBObjects";
  var modelObj = INSTANCE.getModel("PayPerson",serviceName,options);
  var record = {
    firstName : viewModel.getViewAttributeByProperty("payeefname","text"),
    lastName :	viewModel.getViewAttributeByProperty("payeelname","text"),
    phone : viewModel.getViewAttributeByProperty("tbxPhoneKA","text"),
    email : viewModel.getViewAttributeByProperty("tbxEmailKA","text")
  };
  var dataObject = new kony.sdk.dto.DataObject("PayPerson",record);
  var requestOptions = {"dataObject":dataObject, "headers":headers};
  modelObj.create(requestOptions, createSuccess, customErrorCall);
  function createSuccess(res)
  {
    
    removeModal();
    setDataPayee(res);
	}
  function customErrorCall(err)
  {
    removeModal();
    frmNewPayPersonKA.newPayPersonWrapper.setEnabled(true);
    frmNewPayPersonKA.flxTitleBar1KA.setEnabled(true);
    frmNewPayPersonKA.flxTitleBar2KA.setEnabled(true);
    customErrorCallback(err);
  }
}
//set new payee details in selected payee details page
function setDataPayee(res)
{
  var INSTANCE =  kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmNewPayPersonKA");
  var toController = INSTANCE.getFormController("frmP2PaddnewPayeeKA");
  var viewModel = controller.getFormModel();
  var formModel = toController.getFormModel();
  var fname = formModel.getViewAttributeByProperty("payeefname","text");
  var lname = formModel.getViewAttributeByProperty("payeelname","text");
  var fullName = fname+" "+lname;
  var phoneNumber = formModel.getViewAttributeByProperty("tbxPhoneKA","text");
  var email = formModel.getViewAttributeByProperty("tbxEmailKA","text");
  viewModel.setViewAttributeByProperty("lblSelectedPayeeKA","text",fullName);
  if(phoneNumber!="")
  	viewModel.setViewAttributeByProperty("lblPayeeContact","text",phoneNumber);
  else
    viewModel.setViewAttributeByProperty("lblPayeeContact","text",email);
  viewModel.setViewAttributeByProperty("PayPersonId","text",res.PayPersonId);
    flxNo = 3;
   frmNewPayPersonKA.flxPaypersonReciepientsListKA.animate(
    kony.ui.createAnimation({"100":{"left": "100%","stepConfig":{"timingFunction": easeIn}}}),
    {"fillMode": forwards, "duration": duration},
    {"animationStart": function () {},
     "animationEnd": function () {
    }}
  );
  frmNewPayPersonKA.flxSelectedPayPersonKA.animate(
    kony.ui.createAnimation({"100":{"left": "0%","stepConfig":{"timingFunction": easeIn}}}),
    {"fillMode": forwards, "duration": duration},
    {"animationStart": function () {
    },
     "animationEnd": function () {
       frmNewPayPersonKA.newPayPersonWrapper.setEnabled(true);
       frmNewPayPersonKA.flxTitleBar1KA.setEnabled(true);
       frmNewPayPersonKA.flxTitleBar2KA.setEnabled(true);
    }}
  );
}
//disabling new add payee button on validating
function disableAddPayeeBtn()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmP2PaddnewPayeeKA");
  var viewModel = controller.getFormModel();
  viewModel.setViewAttributeByProperty("saveNewPayeeButton","skin","primaryActionDisabled");
}
//enabling new add payee butoon on validating
function enableAddPayeeBtn()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmP2PaddnewPayeeKA");
  var viewModel = controller.getFormModel();
  viewModel.setViewAttributeByProperty("saveNewPayeeButton","skin","primaryAction");
}
// validating new add payee form to enable button
function canEnableAddPayeeBtn()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmP2PaddnewPayeeKA");
  var viewModel = controller.getFormModel();
  var fName = viewModel.getViewAttributeByProperty("payeefname","text");
  var lName = viewModel.getViewAttributeByProperty("payeelname","text");
  if(fName == "" || fName == null || lName == "" || lName == null)
    return disableAddPayeeBtn();
  var phone = viewModel.getViewAttributeByProperty("tbxPhoneKA","text");
  var email = viewModel.getViewAttributeByProperty("tbxEmailKA","text");
   if(frmP2PaddnewPayeeKA.tbxPhoneKA.setEnabled&&phone!=""&&phone!=null)
        return enableAddPayeeBtn();
  else if(frmP2PaddnewPayeeKA.tbxEmailKA.setEnabled&&kony.retailBanking.util.validation.isValidEmail(email))
    	return enableAddPayeeBtn();
  return disableAddPayeeBtn();
}
//setting phone as primary
 function setPhonePrimary()
 {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmP2PaddnewPayeeKA");
    var viewModel = controller.getFormModel();
    viewModel.performActionOnView("tbxPhoneKA", "setEnabled", [true]);
    viewModel.performActionOnView("tbxEmailKA", "setEnabled", [false]);
   viewModel.setViewAttributeByProperty("imgEmailKA","src","radiononselected.png");
   viewModel.setViewAttributeByProperty("imgPhoneKA","src","radioselected.png");
   frmP2PaddnewPayeeKA.tbxPhoneKA.setFocus(true);
	frmP2PaddnewPayeeKA.tbxEmailKA.setFocus(false);
 }
//setting email as primary
 function setEmailPrimary()
 {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmP2PaddnewPayeeKA");
    var viewModel = controller.getFormModel();
    viewModel.performActionOnView("tbxPhoneKA", "setEnabled", [false]);
    viewModel.performActionOnView("tbxEmailKA", "setEnabled", [true]);
   viewModel.setViewAttributeByProperty("imgEmailKA","src","radioselected.png");
   viewModel.setViewAttributeByProperty("imgPhoneKA","src","radiononselected.png");
    frmP2PaddnewPayeeKA.tbxPhoneKA.setFocus(false);
	frmP2PaddnewPayeeKA.tbxEmailKA.setFocus(true);
 }
//Navigate to confirm transfer page
function navigateToP2PconfirmationKA()
{  
  flxNo = 3;
  var INSTANCE =  kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmNewPayPersonKA");
  var viewModel = controller.getFormModel();
  var navObject = controller.getContextData();
  if(navObject!=null)
  	var record = navObject.getCustomInfo("SelPayPerson");
  else
  {
    navObject = new kony.sdk.mvvm.NavigationObject();
    var record = {};
  }
  record.amount = viewModel.getViewAttributeByProperty("amountTextField", "text");
  record.toAccountNumberKA = viewModel.getViewAttributeByProperty("PayPersonId", "text");
  record.date = frmNewPayPersonKA.calDateKA.dateComponents;
  record.payeeName = viewModel.getViewAttributeByProperty("lblSelectedPayeeKA", "text");
  record.accountName = viewModel.getViewAttributeByProperty("fromNamePick", "text");
  record.notes = viewModel.getViewAttributeByProperty("noteTextFieldLabel", "text");
  record.accNumber = viewModel.getViewAttributeByProperty("accountNumber", "text");
  record.referenceId = "";
  navObject.setCustomInfo("SelPayPerson",record);
  navObject.setDataModel(null, kony.sdk.mvvm.OperationType.ADD);
  navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  controller.performAction("navigateTo", ["frmP2PConfirmTransferKA", navObject]);
}
//on selecting payee
function moveToSelectedPayee(){
  OnclickOfSegmentListPayee();
  flxNo = 3;
   frmNewPayPersonKA.flxPaypersonReciepientsListKA.animate(
    kony.ui.createAnimation({"100":{"left": "100%","stepConfig":{"timingFunction": easeIn}}}),
    {"fillMode": forwards, "duration": duration},
    {"animationStart": function () {},
     "animationEnd": function () {
    }}
  );
  frmNewPayPersonKA.flxSelectedPayPersonKA.animate(
    kony.ui.createAnimation({"100":{"left": "0%","stepConfig":{"timingFunction": easeIn}}}),
    {"fillMode": forwards, "duration": duration},
    {"animationStart": function () {
    },
     "animationEnd": function () {
    }}
  );
}
function OnclickOfSegmentListPayee()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmNewPayPersonKA");
  var viewModel = controller.getFormModel();
  var selectedRow =  viewModel.getViewAttributeByProperty("contactsegment","selectedItems");
  var ConfirmName=selectedRow[0].firstName+" "+selectedRow[0].lastName;
  var phoneNo = selectedRow[0].phone;
  var email = selectedRow[0].email;
  var PayPersonId = selectedRow[0].PayPersonId;
  viewModel.setViewAttributeByProperty("lblSelectedPayeeKA","text",ConfirmName);
  viewModel.setViewAttributeByProperty("PayPersonId","text",PayPersonId);
  if(phoneNo!=""&&phoneNo!=null)
    viewModel.setViewAttributeByProperty("lblPayeeContact","text",phoneNo);
  else
    viewModel.setViewAttributeByProperty("lblPayeeContact","text",email);
}
// Manual fetch for registered payees list
function fetchPayeesList()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var options ={    "access": "online",
                    "objectName": "RBObjects"
               };
  var headers = {"session_token":kony.retailBanking.globalData.session_token};
  var serviceName = "RBObjects";
  var modelObj = INSTANCE.getModel("Transactions",serviceName,options);
  var dataObject = new kony.sdk.dto.DataObject("PayPerson");
  var serviceOptions = {"dataObject":dataObject, "headers":headers};
  kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("");
  modelObj.fetch(serviceOptions, P2PDataSuccess, customErrorCallback);
}
function P2PDataSuccess(response)
{
  if(response.length !== 0)
    {
      var tempDate,segLen,segData;
      frmNewPayPersonKA.contactsegment.widgetDataMap={
        transactionName : "firstName",
        transactionLastName : "lastName",
        phoneNumber : "phone",
        PayPersonId : "PayPersonId"
      }
    }
  kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
  frmNewPayPersonKA["contactsegment"].setData(response);
  frmNewPayPersonKA.flxTitleBar1KA.animate(
    kony.ui.createAnimation({"100":{"left": "100%","stepConfig":{"timingFunction": easeIn}}}),
    {"fillMode": forwards, "duration": duration},
    {"animationStart": function () {},
     "animationEnd": function () {
    }}
  );
   frmNewPayPersonKA.newPayPersonScreen1.animate(
    kony.ui.createAnimation({"100":{"left": "100%","stepConfig":{"timingFunction": easeIn}}}),
    {"fillMode": forwards, "duration": duration},
    {"animationStart": function () {},
     "animationEnd": function () {
    }}
  );
    frmNewPayPersonKA.flxTitleBar2KA.animate(
    kony.ui.createAnimation({"100":{"left": "0%","stepConfig":{"timingFunction": easeIn}}}),
    {"fillMode": forwards, "duration": duration},
    {"animationStart": function () { 
     },
     "animationEnd": function () {
    }}
  );
   frmNewPayPersonKA.flxPaypersonReciepientsListKA.animate(
    kony.ui.createAnimation({"100":{"left": "0%","stepConfig":{"timingFunction": easeIn}}}),
    {"fillMode": forwards, "duration": duration},
    {"animationStart": function () {
    },
     "animationEnd": function () {
    }}
  );
}
//setting data in account pick
function getPTOPSegInternalAccountsKARecordClick(segName,fromForm,accountName,amount,accountNumber)
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController(fromForm);
  var viewModel = controller.getFormModel();
  var index = viewModel.getViewAttributeByProperty(segName, "selectedRowIndex");
  var selIndex = Math.floor(index[1]);
  var selectedAccountRecord  = frmNewPayPersonKA[segName].selectedRowItems[0];
  viewModel.setViewAttributeByProperty(accountName,"text",selectedAccountRecord.accountName);
  viewModel.setViewAttributeByProperty(amount,"text",selectedAccountRecord.availableBalance);
  viewModel.setViewAttributeByProperty(accountNumber,"text",selectedAccountRecord.accountID);
  viewModel.setViewAttributeByProperty("bankName","text",kony.retailBanking.globalData.globals.BankName);
  if(selectedAccountRecord.sknColor!=undefined)
  	viewModel.setViewAttributeByProperty("fromAccountColorPick","skin",selectedAccountRecord.sknColor.skin);
  else
    viewModel.setViewAttributeByProperty("fromAccountColorPick","skin",selectedAccountRecord.flxClr.skin);
  return selIndex;
}
//valid date
function validDate()
{ 
  var calDate = kony.retailBanking.util.formatingDate.getDateObjFromKonyCalendarArray(frmNewPayPersonKA.calDateKA.dateComponents);
  var currentDate=new Date();
  if ((currentDate.getFullYear == calDate.getFullYear  && currentDate.getMonth() == calDate.getMonth() && currentDate.getDate() == calDate.getDate())|| currentDate<calDate)
    return true;
  else
    return false;
}
//Validating data in new payee transaction
function CanEnableSelPayeeBtn()
{
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmNewPayPersonKA");
    var viewModel = controller.getFormModel();
    var accountsVisible = viewModel.getViewAttributeByProperty("fromCardInner", "isVisible");
  	var amount = viewModel.getViewAttributeByProperty("amountTextField", "text");
  	if (accountsVisible)
     return disableSelectPayeeButton();
  	else
      {
	    if(amount === null || amount == "")
          {
    		disableSelectPayeeButton();
            return;
          }
        var i=0;
        while(amount[i] !== null && amount[i] != '' && amount[i] != undefined)
        {
          if(amount[i]>'0'&& amount[i]<='9')
            {
              if(validDate())
              return enableSelectPayeeButton();
            }
          i++;
     	 }
        
 		disableSelectPayeeButton(); 
      }
}
//Displaying registered payee list
function moveToRegisteredPayeeList(){
  flxNo = 2;
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var toController = INSTANCE.getFormController("frmNewPayPersonKA");
  var viewModel = toController.getFormModel();
  if(viewModel.getViewAttributeByProperty("selectPayeeButton","skin") == "primaryActionDisabled")
    return;
  var amount = viewModel.getViewAttributeByProperty("amountTextField","text");
  viewModel.setViewAttributeByProperty("lblPayAmountKA","text",i18n_pay+" "+kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(amount,kony.retailBanking.globalData.globals.CurrencyCode));
  fetchPayeesList();
}
//Disable Select Payee Button
function disableSelectPayeeButton()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmNewPayPersonKA");
  var viewModel = controller.getFormModel();
  if(frmNewPayPersonKA.tranferAmount.isVisible)
    viewModel.setViewAttributeByProperty("tranferAmount","skin","primaryActionDisabled");
  else
  	viewModel.setViewAttributeByProperty("selectPayeeButton","skin","primaryActionDisabled");
}
//Enable Select Payee Button
function enableSelectPayeeButton()
{
   var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
   var controller = INSTANCE.getFormController("frmNewPayPersonKA");
   var viewModel = controller.getFormModel();
  if(frmNewPayPersonKA.tranferAmount.isVisible)
    viewModel.setViewAttributeByProperty("tranferAmount","skin","primaryAction");
  else
   viewModel.setViewAttributeByProperty("selectPayeeButton","skin","primaryAction");
}
//set today's date to calendar widget
function setTodayDate()
{
  var date = new Date();
  var year =   date.getFullYear();
  var month = date.getMonth()+1;
  var day = date.getDate();
  frmNewPayPersonKA.calDateKA.dateComponents = [parseFloat(day), parseFloat(month), parseFloat(year)];
}
//select payee button
function setSelPayeeBtn()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmNewPayPersonKA");
  var viewModel = controller.getFormModel();
  viewModel.setViewAttributeByProperty("tranferAmount","isVisible",false);
  viewModel.setViewAttributeByProperty("selectPayeeButton","isVisible",true);
  viewModel.setViewAttributeByProperty("transferPayTitleLabel","text",i18_payAPerson);
}
//show accounts and hide from pick
function showAccountsSegment()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var toController = INSTANCE.getFormController("frmNewPayPersonKA");
  var viewModel = toController.getFormModel();
  viewModel.setViewAttributeByProperty("fromCardInner","isVisible",true);
  viewModel.setViewAttributeByProperty("fromAccountPick","isVisible",false);
  CanEnableSelPayeeBtn();
}
//hide accounts and show from pick
function hideAccountsSegment()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var toController = INSTANCE.getFormController("frmNewPayPersonKA");
  var viewModel = toController.getFormModel();
  viewModel.setViewAttributeByProperty("fromCardInner","isVisible",false);
  viewModel.setViewAttributeByProperty("fromAccountPick","isVisible",true);
  CanEnableSelPayeeBtn();
}
//Navigating to new pay person from transfer pay landing form
function navToPayPerson()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController("frmTransferPayLandingKA");
  showAccountsSegment();
  setSelPayeeBtn();
  setTodayDate();
  kony.retailBanking.globalData.transfers.setTransferMainForm("transferPayLanding");
  var navObject = new kony.sdk.mvvm.NavigationObject();
  var record = {
    fromForm : "frmTransferPayLandingKA",
    referenceId : ""
  }
  navObject.setCustomInfo("SelPayPerson",record);
  navObject.setRequestOptions("segInternalFromAccountsKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  listController.performAction("navigateTo",["frmNewPayPersonKA",navObject]);   
}
//on transfer for edit
function confirmEditP2P()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmNewPayPersonKA");
  var viewModel = controller.getFormModel();
  var navObject = new kony.sdk.mvvm.NavigationObject();
  var record = {
    accNumber : viewModel.getViewAttributeByProperty("accountNumber","text"),
    notes : viewModel.getViewAttributeByProperty("noteTextFieldLabel","text"),
    amount : viewModel.getViewAttributeByProperty("amountTextField","text"),
    date : viewModel.getViewAttributeByProperty("calDateKA","dateComponents"),
    payeeName : viewModel.getViewAttributeByProperty("payeefname","text"),
    transactionDate : viewModel.getViewAttributeByProperty("transactionDate","text"),
    tbxPhoneKA : viewModel.getViewAttributeByProperty("tbxPhoneKA","text"),
    tbxEmailKA : viewModel.getViewAttributeByProperty("tbxEmailKA","text"),
    referenceId : viewModel.getViewAttributeByProperty("referenceId","text"),
    accountName : viewModel.getViewAttributeByProperty("fromNamePick","text"),
    toAccountNumberKA : viewModel.getViewAttributeByProperty("PayPersonId", "text")
  };
  navObject.setCustomInfo("SelPayPerson",record);
  navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  controller.performAction("navigateTo",["frmP2PConfirmTransferKA",navObject]);
}

function setPreferredAccountToP2P(){
   var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmNewPayPersonKA");
  var viewModel = controller.getFormModel();
  viewModel.setViewAttributeByProperty("bankName","text",kony.retailBanking.globalData.globals.BankName);
   var settingsObj = kony.store.getItem("settingsflagsObject");
   var preferedSelAcnt=kony.retailBanking.globalData.accounts.searchAccountById(settingsObj.DefaultTransferAcctNo);
  if(preferedSelAcnt !=="")
  {
     viewModel.setViewAttributeByProperty("accountNumber","text",preferedSelAcnt.accountID);
    var nickNameData = preferedSelAcnt.nickName;
    if(nickNameData.trim() === "")
      viewModel.setViewAttributeByProperty("fromNamePick","text",preferedSelAcnt.accountName);
    else
    viewModel.setViewAttributeByProperty("fromNamePick","text",nickNameData);
    viewModel.setViewAttributeByProperty("accountNumber","text",preferedSelAcnt.accountID);
    viewModel.setViewAttributeByProperty("fromAmountPick","text",kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(preferedSelAcnt.availableBalance,kony.retailBanking.globalData.globals.CurrencyCode));
    frmNewPayPersonKA.fromAccountColorPick.skin= getSkinColor(preferedSelAcnt.accountType);
    /*
  var selectedAccountRecord  = frmNewPayPersonKA[segName].selectedRowItems[0];
  viewModel.setViewAttributeByProperty(accountName,"text",selectedAccountRecord.accountName);
  viewModel.setViewAttributeByProperty(amount,"text",selectedAccountRecord.availableBalance);
  viewModel.setViewAttributeByProperty(accountNumber,"text",selectedAccountRecord.accountID);
  viewModel.setViewAttributeByProperty("bankName","text",kony.retailBanking.globalData.globals.BankName);
  if(selectedAccountRecord.sknColor!=undefined)
  	viewModel.setViewAttributeByProperty("fromAccountColorPick","skin",selectedAccountRecord.sknColor.skin);
  else
    viewModel.setViewAttributeByProperty("fromAccountColorPick","skin",selectedAccountRecord.flxClr.skin);
    */
    hideAccountsSegment();
  }else{
    showAccountsSegment();
  }
}