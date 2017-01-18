//Making a new p2p transfer
function newP2PTransfer()
{
 if(kony.application.getCurrentForm()!==frmPayAPersonKA)
  {	
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController("frmPayAPersonKA");
  var navObject = new kony.sdk.mvvm.NavigationObject();
  navObject.setDataModel(null, kony.sdk.mvvm.OperationType.NO_FILTER, "form");
  navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  listController.loadDataAndShowForm(navObject);
  }
}
//navigate to confirmation page
function navToP2PConfirmPage()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController("frmPayAPersonKA");
  var formModel = listController.getFormModel();
  var navObject = new kony.sdk.mvvm.NavigationObject();
  var record ={};
  record.fromAccount = formModel.getViewAttributeByProperty("fromAccListBox","selectedKeyValue");
  record.toAccount = formModel.getViewAttributeByProperty("toAcclistBox","selectedKeyValue");
  record.amount = formModel.getViewAttributeByProperty("tbxAmountKA","text");
  record.primaryContact = formModel.getViewAttributeByProperty("CopytoLbl0c1e7ad47deea44","text");
  record.date = frmPayAPersonKA.CalendarKA.dateComponents;
  record.notes = formModel.getViewAttributeByProperty("noteTbx","text");
  record.referenceId = formModel.getViewAttributeByProperty("referenceId","text");
  if(!validateData(record))
    return;
  navObject.setCustomInfo("SelPayPerson",record);
  if(!record.referenceId)
    navObject.setDataModel(null, kony.sdk.mvvm.OperationType.ADD);
  navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  listController.performAction("navigateTo", ["frmPayABillKA", navObject]);
}
function editPayPerson()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController("frmPayABillKA");
  var formModel = listController.getFormModel();
  var contextData = listController.getContextData();
  var record = contextData.getCustomInfo("SelPayPerson");
  record.type = "edit";
  var navObject = new kony.sdk.mvvm.NavigationObject();
  navObject.setCustomInfo("SelPayPerson",record);
  navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  listController.performAction("navigateTo", ["frmPayAPersonKA", navObject]);
}
function validateData(record)
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController("frmPayAPersonKA");
  var formModel = listController.getFormModel();
  var temp = true;
  if(record.fromAccount[0] == "-1")
  {
    inlinep2p("fromAccListBox");
    temp = false;
  }
  else
    formModel.setViewAttributeByProperty("fromAccListBox","skin","sknLatoRegular72727290KA");
  if(record.toAccount[0] == "-1")
  {
    inlinep2p("toAcclistBox");
    temp = false;
  }
  else
    formModel.setViewAttributeByProperty("toAcclistBox","skin","sknLatoRegular72727290KA");
  if(!record.amount)
  {
    inlinep2p("tbxAmountKA");
    temp = false;
  }
  else
    formModel.setViewAttributeByProperty("tbxAmountKA","skin","sknLatoRegular72727290KA");
  if(!validDate())
  {
    inlinep2p("CalendarKA");
    temp = false;
  }
  else
    formModel.setViewAttributeByProperty("CalendarKA","skin","skn72727290");
  return temp;
}
function validateNewPayeeData()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController("frmP2PaddNewPayeeKA");
  var formModel = listController.getFormModel();
  var firstName = formModel.getViewAttributeByProperty("payeefname","text");
  var temp = true;
  if(!firstName)
  {
    inlinep2p("payeefname");
    temp = false;
  }
  else
    formModel.setViewAttributeByProperty("payeefname","skin","skntbxlatoregular72727290KA");
  var lastName = formModel.getViewAttributeByProperty("payeelname","text");
  if(!lastName)
  {
    inlinep2p("payeelname");
    temp = false;
  }
  else
    formModel.setViewAttributeByProperty("payeelname","skin","skntbxlatoregular72727290KA");
  if(formModel.getViewAttributeByProperty("ImgP2PMobileCheckKA","isVisible"))
  {
    if(!(kony.retailBanking.util.validation.isValidNumber(formModel.getViewAttributeByProperty("tbxPhoneKA","text"))))
    {
      inlinep2p("tbxPhoneKA");
      temp = false;
    }
    else
    formModel.setViewAttributeByProperty("tbxPhoneKA","skin","skntbxlatoregular72727290KA");
    formModel.setViewAttributeByProperty("tbxEmailKA","skin","skntbxlatoregular72727290KA");
    return temp;
  }
  else
  {
    if(!kony.retailBanking.util.validation.isValidEmail(formModel.getViewAttributeByProperty("tbxEmailKA","text")))
    {
      inlinep2p("tbxEmailKA");
      temp = false;
    }
    else
    formModel.setViewAttributeByProperty("tbxEmailKA","skin","skntbxlatoregular72727290KA");
    formModel.setViewAttributeByProperty("tbxPhoneKA","skin","skntbxlatoregular72727290KA");
    return temp;
  }
  return temp;
}
function validDate()
{ 
  var calDate = kony.retailBanking.util.formatingDate.getDateObjFromKonyCalendarArray(frmPayAPersonKA.CalendarKA.dateComponents);
  var currentDate=new Date();
  if ((currentDate.getFullYear == calDate.getFullYear  && currentDate.getMonth() == calDate.getMonth() && currentDate.getDate() == calDate.getDate())|| currentDate<calDate)
    return true;
  else
    return false;
}
function inlinep2p(widget)
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var currForm = kony.application.getCurrentForm().id;
  var listController = INSTANCE.getFormController(currForm);
  var formModel = listController.getFormModel();
  formModel.setViewAttributeByProperty(widget,"skin","skntbxValidation");
}
function confirmP2PTransfer()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var addController = INSTANCE.getFormController("frmPayABillKA");
  addController.performAction("saveData"); 
}
function scheduledP2P()
{
  if(kony.application.getCurrentForm()!==frmScheduledP2PKA)
  {
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController("frmScheduledP2PKA");
  var navObject = new kony.sdk.mvvm.NavigationObject();
  navObject.setRequestOptions("segAccountStatementsKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  listController.loadDataAndShowForm(navObject);
  }
}
function recentP2P()
{
  if(kony.application.getCurrentForm()!==frmRecentP2PKA)
  {
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController("frmRecentP2PKA");
  var navObject = new kony.sdk.mvvm.NavigationObject();
  navObject.setRequestOptions("segAccountStatementsKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  listController.loadDataAndShowForm(navObject);
  }
}
//setting the data in the segments for recent and scheduled transactions
function setSegmentDataP2P(data, transactionType)
{
  var tempDate,j=0,transactions = [];
  for(var i in data)
  {
    if(data[i]["transactionType"]=="P2P")
    {
      switch(transactionType){
        case "recent" :	if(data[i]["isScheduled"] == "false"){
          data[i]["btnDownLoadKA"] = "Repeat Transaction";
          tempDate =kony.retailBanking.util.formatingDate.getApplicationFormattedDateTime(data[i]["transactionDate"],kony.retailBanking.util.BACKEND_DATE_FORMAT);
          data[i]["transactionDate"] = tempDate;
          transactions[j++] = data[i];
        }
          break;
        case "scheduled" : if(data[i]["isScheduled"] == "true"){
          data[i]["btnDownLoadKA"] = "Edit Transaction";
          tempDate =kony.retailBanking.util.formatingDate.getApplicationFormattedDateTime(data[i]["scheduledDate"],kony.retailBanking.util.BACKEND_DATE_FORMAT);
          data[i]["scheduledDate"] = tempDate;
          transactions[j++] = data[i];
        }
          break;
      }
    }
  }
  return transactions;
}
function getP2P(data,type)
{
  var tempDate,j=0,transactions = [];
  for(var i in data)
  {
    if(data[i]["transactionType"]=="P2P")
    {
      switch(type){
        case "recent" :	if(data[i]["isScheduled"] == "false"){
          data[i]["button"] = "Repeat Transaction";
          tempDate =kony.retailBanking.util.formatingDate.getApplicationFormattedDateTime(data[i]["transactionDate"],kony.retailBanking.util.BACKEND_DATE_FORMAT);
          data[i]["transactionDate"] = tempDate;
          transactions[j++] = data[i];
        }
          break;
        case "scheduled" : if(data[i]["isScheduled"] == "true"){
          data[i]["button"] = "Edit Transaction";
          tempDate =kony.retailBanking.util.formatingDate.getApplicationFormattedDateTime(data[i]["scheduledDate"],kony.retailBanking.util.BACKEND_DATE_FORMAT);
          data[i]["scheduledDate"] = tempDate;
          transactions[j++] = data[i];
        }
          break;
      }
    }
  }
  return transactions;
}
function repeatRecentP2P()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var currForm = kony.application.getCurrentForm().id;
  var listController = INSTANCE.getFormController(currForm);
  var index;
  var extObj;
  if(currForm == "frmRecentP2PKA"){
    index = frmRecentP2PKA.segAccountStatementsKA.selectedIndex[1];
    extObj =  listController.getControllerExtensionObject();
    var record = extObj.payeeObj[index];
  listController.setContextData(record);
  }else if(currForm == "frmActivityKA"){
    var selectedInd = frmActivityKA.SegTransactionsKA.selectedRowIndex[1]; 
    var record = kony.retailBanking.globalData.activityData.getActivityData()[selectedInd];
    PayPersonGlobalbject = record;
  }else{
    index = frmScheduledP2PKA.segAccountStatementsKA.selectedIndex[1];
    extObj =  listController.getControllerExtensionObject();
    var record = extObj.payeeObj[index];
    listController.setContextData(record);
  }
  
  if(currForm == "frmRecentP2PKA" || currForm == "frmActivityKA")
    navToRepeat(record);
  else
    navToEdit(record);
}
function editP2P()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  //var currForm = kony.application.getPreviousForm().id;
  var listController = INSTANCE.getFormController("frmPayAPersonKA");
  var navObject = new kony.sdk.mvvm.NavigationObject();
  var record = {};
  record.type = "repeat";
  navObject.setCustomInfo("SelPayPerson",record);
  navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  listController.performAction("navigateTo", ["frmPayAPersonKA", navObject]);
 // var toController = INSTANCE.getFormController("frmPayAPersonKA");
  //toController.loadDataAndShowForm();
}
function navToRepeat(record)
{
  frmP2PRecentTransKA.fromLbl.text = record.fromNickName;
  frmP2PRecentTransKA.toLbl.text = record.payPersonName;
  frmP2PRecentTransKA.CopytoLbl0c1e7ad47deea44.text = record.payPersonPhone;
  frmP2PRecentTransKA.amountLbl.text = record.amount;
  frmP2PRecentTransKA.transactionIdLbl.text = record.transactionId;
  frmP2PRecentTransKA.dateLbl.text = record.transactionDate;
  frmP2PRecentTransKA.noteLbl.text = record.transactionsNotes;
  frmP2PRecentTransKA.show();
}
function navToEdit(record)
{
  frmP2PScheduledTransKA.fromLbl.text = record.fromNickName;
  frmP2PScheduledTransKA.toLbl.text = record.payPersonName;
  frmP2PScheduledTransKA.CopytoLbl0c1e7ad47deea44.text = record.payPersonPhone;
  frmP2PScheduledTransKA.amountLbl.text = record.amount;
  frmP2PScheduledTransKA.transactionIdLbl.text = record.transactionId;
  frmP2PScheduledTransKA.dateLbl.text = record.transactionDate;
  frmP2PScheduledTransKA.noteLbl.text = record.transactionsNotes;
  frmP2PScheduledTransKA.show();
}
function setTodayDate()
{
  var date = new Date();
  var year =   date.getFullYear();
  var month = date.getMonth()+1;
  var day = date.getDate();
  frmPayAPersonKA.CalendarKA.dateComponents = [parseFloat(day), parseFloat(month), parseFloat(year)];
}
function setScheduledDate(scheduledDate)
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController("frmPayAPersonKA");
  var formmodel = listController.getFormModel();
  var date = scheduledDate;
  var day = date.slice(0, 2);
  var month = date.slice(3, 5);
  var year = date.slice(6, 10);
  frmPayAPersonKA.CalendarKA.dateComponents = [parseFloat(day), parseFloat(month), parseFloat(year), 0.0, 0.0, 0.0];
}
function manageP2P()
{
  if(kony.application.getCurrentForm()!==frmManagePayeeP2PKA)
 {	
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController("frmManagePayeeP2PKA");
  var navObject = new kony.sdk.mvvm.NavigationObject();
  navObject.setDataModel(null, kony.sdk.mvvm.OperationType.NO_FILTER, "form");
  navObject.setRequestOptions("segAccountStatementsKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  listController.loadDataAndShowForm(navObject);
 }
}
function addNewP2PPayee()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController("frmP2PaddNewPayeeKA");
  var navObject = new kony.sdk.mvvm.NavigationObject();
  navObject.setDataModel(null, kony.sdk.mvvm.OperationType.ADD, "form");
  navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  listController.loadDataAndShowForm(navObject);
}
function confirmAddPayPerson()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var addController = INSTANCE.getFormController("frmP2PaddNewPayeeKA");
  if(!validateNewPayeeData())
    return;
  var formModel = addController.getFormModel();
  if(formModel.getViewAttributeByProperty("ImgP2PMobileCheckKA","isVisible"))
     formModel.setViewAttributeByProperty("tbxEmailKA","text","");
  else
     formModel.setViewAttributeByProperty("tbxPhoneKA","text","");
  addController.performAction("saveData"); 
}
function primaryContact(data)
{
  for(var i in data)
    {
      if(data[i]["phone"] == "" || data[i]["phone"] == null)
        data[i]["phone"] = data[i]["email"];
    }
  return data;
}
function selectingPrimaryContact()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController("frmP2PaddNewPayeeKA");
  var formModel = listController.getFormModel();
  if(formModel.getViewAttributeByProperty("ImgP2PMobileCheckKA","isVisible") == true)
  {
    formModel.setViewAttributeByProperty("ImgP2PMobileCheckKA","isVisible",false);
    formModel.setViewAttributeByProperty("ImgP2PEmailCheckKA","isVisible",true);
    formModel.setViewAttributeByProperty("ImgP2PEmailUncheckKA","isVisible",false);
    formModel.setViewAttributeByProperty("ImgP2PMobileUncheckKA","isVisible",true);
  }
  else
  {
    formModel.setViewAttributeByProperty("ImgP2PMobileCheckKA","isVisible",true);
    formModel.setViewAttributeByProperty("ImgP2PEmailCheckKA","isVisible",false);
    formModel.setViewAttributeByProperty("ImgP2PEmailUncheckKA","isVisible",true);
    formModel.setViewAttributeByProperty("ImgP2PMobileUncheckKA","isVisible",false);
  }
}
function getPayeeDetails()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController("frmPayAPersonKA");
  var formModel = listController.getFormModel();
  var toAccount = formModel.getViewAttributeByProperty("toAcclistBox","selectedKey");
}
function setPayPersonHeaderSkin()
{
  var currForm=kony.application.getCurrentForm();
  switch(currForm.id){
    case "frmP2PConfirmationKA" : 
    case "frmPayABillKA" :
    case "frmPayAPersonKA" :
      currForm.submenuP2P.payapersonLbl.skin="sknLatoBold192980100FocusKA";
      break;
    case "frmP2PRecentTransKA" : 
    case "frmRecentP2PKA" :
      currForm.submenuP2P.recentLbl.skin="sknLatoBold192980100FocusKA";
      break;
    case "frmP2PScheduledTransKA" : 
    case "frmScheduledP2PKA" :
      currForm.submenuP2P.scheduledLbl.skin="sknLatoBold192980100FocusKA";
      break;
    case "frmManagePayeeP2PKA" : 
    case "frmP2PaddNewPayeeKA" :
    case "frmP2PeditPayeeKA" :
    case "frmP2PPayeeDetailsKA" :
      currForm.submenuP2P.managePayeeLbl.skin="sknLatoBold192980100FocusKA";
      break;
  }
}