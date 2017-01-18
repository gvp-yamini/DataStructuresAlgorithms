globalSegSize = 0;
function showNewMessage(){
   var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
   var listController = INSTANCE.getFormController("frmMessageNewKA");
   var navObject = new kony.sdk.mvvm.NavigationObject();
   navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
   navObject.setDataModel(null, kony.sdk.mvvm.OperationType.ADD, "form");
   listController.performAction("navigateTo",["frmMessageNewKA",navObject]); 
   messagePreshow("frmMessageNewKA");
}

function messagePreshow(whichForm){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController(whichForm);
  var viewModel=controller.getFormModel();
  viewModel.setViewAttributeByProperty("tbxSubjectKA","text","");
  viewModel.setViewAttributeByProperty("txtAreaMsgDescKA","text","");
}


function focusSkinforMsgModule(){
  var currForm=kony.application.getCurrentForm();
  switch(currForm.id){
     case "frmMessageNewKA" : 
		currForm.submenuHeader.newMsgLbl.skin="sknLatoBold192980100FocusKA";
        break;
     case "frmMessageInboxKA" :
     case "frmMessageReplyKA":
      currForm.submenuHeader.inboxLbl.skin="sknLatoBold192980100FocusKA";
      break;
    case "frmMessageSentItemsKA":
      currForm.submenuHeader.sentItemLbl.skin="sknLatoBold192980100FocusKA";
      break;
    case "frmMessageDraftKA":
    case "frmMessageDraftDetailsKA":
      currForm.submenuHeader.draftLbl.skin="sknLatoBold192980100FocusKA";
      break;
    case "frmMessageDeletedItemsKA":
      currForm.submenuHeader.deletedItemLbl.skin="sknLatoBold192980100FocusKA";
      break;
    case "frmMessageDetailsKA":
      var prevForm = kony.application.getPreviousForm();
      if(prevForm.id == "frmMessageInboxKA" )
         currForm.submenuHeader.inboxLbl.skin="sknLatoBold192980100FocusKA";
      else if(prevForm.id == "frmMessageSentItemsKA")
         currForm.submenuHeader.sentItemLbl.skin="sknLatoBold192980100FocusKA";
      else if(prevForm.id == "frmMessageDeletedItemsKA")
         currForm.submenuHeader.deletedItemLbl.skin="sknLatoBold192980100FocusKA";

  }
}
function fetchSubcategory(catId) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var options = {
        "access": "online",
        "objectName": "RBObjects"
    };
    var headers = {
        "session_token": kony.retailBanking.globalData.session_token
    };
    var serviceName = "RBObjects";
    var modelObj = INSTANCE.getModel("MessageSubCategory", serviceName, options);
    var dataObject = new kony.sdk.dto.DataObject("MessageSubCategory");
    var queryParams = {
        "categoryId": catId
    };
    var serviceOptions = {
        "dataObject": dataObject,
        "queryParams": queryParams,
        "headers": headers
    };
    modelObj.fetch(serviceOptions, categorySuccess, customErrorCallback);
  
  function categorySuccess(response) {
    var masterData = [];
    var masterDataElement = [];
    masterDataElement.push("-1");
    var toAppend = "Select SubCategory";
    masterDataElement.push(toAppend);
    masterData.push(masterDataElement);
    for (var i = 0; i < response.length; i++) {
        masterDataElement = [];
        var key = response[i]["subcategoryId"];
        var value = response[i]["subcategoryName"];
        masterDataElement.push(key);
        masterDataElement.push(value);
        masterData.push(masterDataElement);
    }
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    if (kony.application.getCurrentForm().id == "frmMessageNewKA") {
        var nwmsgController = INSTANCE.getFormController("frmMessageNewKA");
        var formmodel = nwmsgController.getFormModel();
        formmodel.setMasterDataByProperty(masterData, "lbxSubCategoryKA");
        formmodel.setViewAttributeByProperty("lbxSubCategoryKA", "selectedKey", "-1");
    } 
    else
  {
    var draftController = INSTANCE.getFormController("frmMessageDraftDetailsKA");
    var formmodel = draftController.getFormModel();
    formmodel.setMasterDataByProperty(masterData,"lbxSubCategoryKA");
    if(subCatId == undefined)
    	formmodel.setViewAttributeByProperty("lbxSubCategoryKA","selectedKey","-1");
    else 
        formmodel.setViewAttributeByProperty("lbxSubCategoryKA","selectedKey",subCatId);
    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
    draftController.showForm();
  }
}
}

function validateNewMessage(form){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController(form);
  var viewModel = controller.getFormModel();
  var valid= true;
  if(kony.retailBanking.util.validation.validateListBox(viewModel && viewModel.getWidgetData("lbxAccountNameKA").getData())){
    frmMessageNewKA.lbxAccountNameKA.skin = "sknLatoRegular72727290KA";
  }else{
    frmMessageNewKA.lbxAccountNameKA.skin = "sknlbxValidation";
    valid = false;
  }
  if(kony.retailBanking.util.validation.validateListBox(viewModel && viewModel.getWidgetData("lbxCategoryKA").getData())){
    frmMessageNewKA.lbxCategoryKA.skin = "sknLatoRegular72727290KA";
  }else{
    frmMessageNewKA.lbxCategoryKA.skin = "sknlbxValidation";
    valid = false;
  }
  if(kony.retailBanking.util.validation.validateListBox(viewModel && viewModel.getWidgetData("lbxSubCategoryKA").getData())){
    frmMessageNewKA.lbxSubCategoryKA.skin = "sknLatoRegular72727290KA";
  }else{
    frmMessageNewKA.lbxSubCategoryKA.skin = "sknlbxValidation";
    valid = false;
  }
  if(kony.retailBanking.util.validation.validateTextboxOrLabel(viewModel && viewModel.getViewAttributeByProperty("tbxSubjectKA","text"))){
  	frmMessageNewKA.tbxSubjectKA.skin = "sknLatoRegular72727290KA";
  }else{
    frmMessageNewKA.tbxSubjectKA.skin = "sknlbxValidation";
    valid = false;
  }
  if(kony.retailBanking.util.validation.validateTextArea(viewModel && viewModel.getViewAttributeByProperty("txtAreaMsgDescKA","text"))){
  	frmMessageNewKA.txtAreaMsgDescKA.skin = "skintArea";
  }else{
    frmMessageNewKA.txtAreaMsgDescKA.skin = "sknlbxValidation";
    valid = false;
  }
  return valid;
}

function onNewMessageSendClick(form){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController(form);
  var viewModel = controller.getFormModel();
  var validateMsg;
  if(form != "frmMessageReplyKA")
      validateMsg = validateNewMessage(form);
  if(validateMsg || form === "frmMessageReplyKA"){
    kony.retailBanking.globalData.globals.msgType = "Sent";
    viewModel.setViewAttributeByProperty("lblMessageTypeKA","text","Sent");
    ShowLoadingScreen();
    controller.performAction("saveData");
  }
}

function onNewMessageDraftClick(form){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController(form);
  var viewModel = controller.getFormModel();
  kony.retailBanking.globalData.globals.msgType = "Drafts";
  if(kony.retailBanking.util.validation.validateListBox(viewModel && viewModel.getWidgetData("lbxAccountNameKA").getData())){
    frmMessageNewKA.lbxAccountNameKA.skin = "sknLatoRegular72727290KA";
  }else{
    frmMessageNewKA.lbxAccountNameKA.skin = "sknlbxValidation";
    return;
  }
  viewModel.setViewAttributeByProperty("lblMessageTypeKA","text","Drafts");
  controller.performAction("saveData");
  
}

function setInboxList(tempData,msgTyp){
  var dtFormat = "d-M-Y";
  var tempDate,count=0,rowCount=0;
  for(var i in tempData){
    rowCount++;
    switch(msgTyp){
      case "Inbox": 
        			tempData[i]["Reply"] = "Reply";
                    tempDate =new Date(tempData[i]["receivedDate"]);
                    tempDate=tempDate.format(dtFormat);
                    tempData[i]["receivedDate"] = tempDate;
                    if(tempData[i]["isRead"] == "false"){
                       count++;
                       tempData[i]["subject"] = {"skin" : "skn424242latoBold110","text" :tempData[i]["subject"]};
                       tempData[i]["receivedDate"] = {"skin" : "skn424242latoBold110","text" :tempData[i]["receivedDate"]};
                       tempData[i]["message"] = {"skin" : "skn424242latoBold110","text" :tempData[i]["message"]};
                       tempData[i]["categoryName"] = {"skin" : "skn424242latoBold110","text" :tempData[i]["categoryName"]};
                    }
                   break;
      case "Sent":  tempData[i]["Delete"] = "Delete";
                    tempDate =new Date(tempData[i]["sentDate"]);
                    tempDate=tempDate.format(dtFormat);
                    tempData[i]["sentDate"] = tempDate;
                    break;
      case "Drafts":tempData[i]["Delete"] = "Delete";
                    tempDate =new Date(tempData[i]["createdDate"]);
                    tempDate=tempDate.format(dtFormat);
                    tempData[i]["createdDate"] = tempDate;
                    break;
      case "Deleted":tempData[i]["DeleteForever"] = "Delete Forever";
                    tempDate =new Date(tempData[i]["deletedDate"]);
                    tempDate=tempDate.format(dtFormat);
                    tempData[i]["deletedDate"] = tempDate;
                    break;
    
    
    }
    
    if(typeof(tempData[i]["message"]) == "string"){
      if(tempData[i]["message"] === undefined || tempData[i]["message"] === "")
         tempData[i]["message"] = "<No Description>";   
      else
         tempData[i]["message"] = kony.retailBanking.util.validation.trucateTo(tempData[i]["message"],25,22,"...");
    }
    else{
      if(tempData[i]["message"]["text"] === undefined || tempData[i]["message"]["text"] === "")
         tempData[i]["message"]["text"] = "<No Description>";   
      else
         tempData[i]["message"]["text"] = kony.retailBanking.util.validation.trucateTo(tempData[i]["message"]["text"],25,22,"...");
    }
    if(typeof(tempData[i]["subject"]) == "string"){
      if(tempData[i]["subject"] === undefined || tempData[i]["subject"] === "")
         tempData[i]["subject"] = "<No Subject>";
      else  
         tempData[i]["subject"] = kony.retailBanking.util.validation.trucateTo(tempData[i]["subject"],25,22,"...");
    }
    else{
      if(tempData[i]["subject"]["text"] === undefined || tempData[i]["subject"]["text"] === "")
         tempData[i]["subject"]["text"] = "<No Subject>";
      else  
         tempData[i]["subject"]["text"] = kony.retailBanking.util.validation.trucateTo(tempData[i]["subject"]["text"],25,22,"...");
    }
    if(typeof(tempData[i]["categoryName"]) == "string"){
      if(tempData[i]["categoryName"] === undefined || tempData[i]["categoryName"] === "")
         tempData[i]["categoryName"] = "<No Category>";
      else  
         tempData[i]["categoryName"] = kony.retailBanking.util.validation.trucateTo(tempData[i]["categoryName"],25,22,"...");
    }
    else{
      if(tempData[i]["categoryName"]["text"] === undefined || tempData[i]["categoryName"]["text"] === "")
         tempData[i]["categoryName"]["text"] = "<No Category>";
      else  
         tempData[i]["categoryName"]["text"] = kony.retailBanking.util.validation.trucateTo(tempData[i]["categoryName"]["text"],25,22,"...");
    }
  }
  globalSegSize = rowCount;
  if(msgTyp == "Inbox"){
    frmMessageInboxKA.submenuHeader.inboxLbl.text = "Inbox" + " "+"("+count+")";
    frmMessageReplyKA.submenuHeader.inboxLbl.text = "Inbox" + " "+"("+count+")";
    frmMessageNewKA.submenuHeader.inboxLbl.text = "Inbox" + " "+"("+count+")";
    frmMessageDraftKA.submenuHeader.inboxLbl.text = "Inbox" + " "+"("+count+")";
    frmMessageSentItemsKA.submenuHeader.inboxLbl.text = "Inbox" + " "+"("+count+")";
    frmMessageDeletedItemsKA.submenuHeader.inboxLbl.text = "Inbox" + " "+"("+count+")";
    frmMessageDetailsKA.submenuHeader.inboxLbl.text = "Inbox" + " "+"("+count+")";
  }
  
  return tempData;
}

function showMessagesForm(formId,segId,msgTyp)
{
   var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
   var listController = INSTANCE.getFormController(formId);
   var navObject = new kony.sdk.mvvm.NavigationObject();
   navObject.setRequestOptions(segId,{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"messageType": msgTyp,"pageSize":"10","recordNumber":"0"}});
   listController.performAction("navigateTo",[formId,navObject]); 
}
   
function goToReply(frm,selRecord){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController(frm);
  var selMsg;
  if(selRecord.isRead == "true"){
   selMsg = {
    "date":selRecord.receivedDate,
    "accountName":selRecord.accountName,
    "accountId":selRecord.accountId,
    "category":selRecord.categoryName,
    "categoryId":selRecord.categoryId,
    "subCategory":selRecord.subcategoryName,
    "subCategoryId":selRecord.subcategoryId,
    "subject":selRecord.subject,
    "msgDesc":selRecord.message
   };
  }
  else if(selRecord.isRead == "false"){
    selMsg = {
    "date":selRecord.receivedDate,
    "accountName":selRecord.accountName,
    "accountId":selRecord.accountId,
    "category":selRecord.categoryName.text,
    "categoryId":selRecord.categoryId,
    "subCategory":selRecord.subcategoryName,
    "subCategoryId":selRecord.subcategoryId,
    "subject":selRecord.subject.text,
    "msgDesc":selRecord.message.text
   };
  }
  var navigationObject = new kony.sdk.mvvm.NavigationObject;
  navigationObject.setCustomInfo("selMessage",selMsg);
  navigationObject.setDataModel(null, kony.sdk.mvvm.OperationType.ADD, "form");
  navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  listController.performAction("navigateTo",["frmMessageReplyKA",navigationObject]);
}

function manualDelete(frmName,segName){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController(frmName);
  var viewModel = listController.getFormModel();
  var selRecord  = viewModel.getViewAttributeByProperty(segName,"selectedItems")[0];
  var msgId = selRecord["messageId"];
  var options ={    "access": "online",
                    "objectName": "RBObjects"
               };
  var headers = {"session_token":kony.retailBanking.globalData.session_token};
  var serviceName = "RBObjects";
  var modelObj = INSTANCE.getModel("Messages",serviceName,options);
  var record = {};
  record["messageId"] = msgId;
  var dataObject = new kony.sdk.dto.DataObject("Messages",record);
  var serviceOptions = {"dataObject":dataObject,"headers":headers};
  modelObj.remove(serviceOptions, deleteSuccess, customErrorCallback);
  
  function deleteSuccess(res){
        showMessagesForm("frmMessageDeletedItemsKA","segMessageDeletedKA","Deleted");
  }
}

function navigateToMsgDetailKA(fromForm,toForm,segName){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var toController = INSTANCE.getFormController(toForm);
  var toFormModel = toController.getFormModel();
  if(segName == "segMessagesSentKA"){
     toFormModel.performActionOnView("btnReplyKA","setVisibility",[false]);
     toFormModel.performActionOnView("btnDeleteForeverMessageKA","setVisibility",[false]);
     toFormModel.performActionOnView("btnDeleteMessageKA","setVisibility",[true]);
     toFormModel.setViewAttributeByProperty("lblTitleKA","text","Sent Message");
   }
   else if(segName == "segMessageDeletedKA"){
     toFormModel.performActionOnView("btnReplyKA","setVisibility",[false]);
     toFormModel.performActionOnView("btnDeleteForeverMessageKA","setVisibility",[true]);
     toFormModel.performActionOnView("btnDeleteMessageKA","setVisibility",[false]);
     toFormModel.setViewAttributeByProperty("lblTitleKA","text","Deleted Message");
   }
   else if(segName == "segMessagesInboxKA"){
     toFormModel.performActionOnView("btnReplyKA","setVisibility",[true]);
     toFormModel.performActionOnView("btnDeleteForeverMessageKA","setVisibility",[false]);
     toFormModel.performActionOnView("btnDeleteMessageKA","setVisibility",[true]);
     toFormModel.setViewAttributeByProperty("lblTitleKA","text","Message Details");
   }
   else if(segName == "segMessageDraftKA"){
     toFormModel.setViewAttributeByProperty("lblTitleKA","text","Draft Message");
     
   }
  
  var controller = INSTANCE.getFormController(fromForm);
  var viewModel = controller.getFormModel();
  var selRecord  = viewModel.getViewAttributeByProperty(segName, "selectedItems")[0];
  var navigationObject = new kony.sdk.mvvm.NavigationObject;
  var msgId = selRecord["messageId"];
  var datamodel = new kony.sdk.mvvm.DataModel;
  navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
  navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"messageId": msgId}});
  controller.performAction("navigateTo",[toForm,navigationObject]);
  if(segName == "segMessagesInboxKA")
     UpdateReadFlag(msgId);
}

function UpdateReadFlag(msgId){
 var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var options ={    "access": "online",
                "objectName": "RBObjects"
               };
  var headers = {"session_token":kony.retailBanking.globalData.session_token};
  var serviceName = "RBObjects";
  var modelObj = INSTANCE.getModel("Messages",serviceName,options);
  var record = {};
  record["messageId"] = msgId;
  record["isRead"] = true;
  record["messageType"] = "Inbox";
  var dataObject = new kony.sdk.dto.DataObject("Messages",record);
  var requestOptions = {"dataObject":dataObject, "headers":headers};
  modelObj.update(requestOptions, updateSuccess, customErrorCallback);
}
function updateSuccess(res){
 kony.print(res);
}

function getDetailsForReply(){
   var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
   var fromController = INSTANCE.getFormController("frmMessageDetailsKA");
   var fromFormModel = fromController.getFormModel();
   var selMsg = {
    "receivedDate":fromFormModel.getViewAttributeByProperty("lblMessageHeaderKA","text"),
    "accountName":fromFormModel.getViewAttributeByProperty("lblAccountNameInpKA","text"),
    "accountId":fromFormModel.getViewAttributeByProperty("lblAccountId","text"),
    "categoryName":fromFormModel.getViewAttributeByProperty("lblCategoryInpKA","text"),
    "categoryId":fromFormModel.getViewAttributeByProperty("lblCategoryIdKA","text"),
    "subcategoryName":fromFormModel.getViewAttributeByProperty("lblSubcategoryInpKA","text"),
    "subcategoryId":fromFormModel.getViewAttributeByProperty("lblSubcategoryId","text"),
    "subject":fromFormModel.getViewAttributeByProperty("lblSubjectInpKA","text"),
    "message":fromFormModel.getViewAttributeByProperty("lblMessageDescriptionKA","text"),
    "isRead":fromFormModel.getViewAttributeByProperty("lblIsRead","text")
 };
 goToReply("frmMessageDetailsKA",selMsg);
}
function onClickDelete(form){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController(form);
  listController.performAction("deleteData"); 
}

function formatDateForDetails(data){
  var dtFormat = "d-M-Y";
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var detailController = INSTANCE.getFormController("frmMessageDetailsKA");
  var detailFormModel = detailController.getFormModel();
  var dateType,str,msgType;
  msgType = data["form"][0].messageType;
  if(msgType == "Inbox"){
    dateType = "receivedDate";
  }
  else if(msgType == "Sent"){
    dateType = "sentDate";
    detailFormModel.setViewAttributeByProperty("lblDateKA","text","Sent Date:");
  }
  else if(msgType == "Deleted"){
    dateType = "deletedDate";
    detailFormModel.setViewAttributeByProperty("lblDateKA","text","Deleted Date:");
  }
  var tempDate = new Date(data["form"][0][dateType]);
  tempDate=tempDate.format(dtFormat);
  data["form"][0]["receivedDate"] = tempDate;
  return data;
}

function goBackFromDetails(frm){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var detailController = INSTANCE.getFormController(frm);
  detailController.performAction("goback",[true]);
}


function getMessageData(msgType,offset){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var options ={    "access": "online",
                    "objectName": "RBObjects"
               };
  var headers = {"session_token":kony.retailBanking.globalData.session_token};
  var serviceName = "RBObjects";
  var modelObj = INSTANCE.getModel("Messages",serviceName,options);
  var dataObject = new kony.sdk.dto.DataObject("Messages");
  var queryParams = {"messageType": msgType,"pageSize":"10","recordNumber": offset}
  var serviceOptions = {"dataObject":dataObject,"queryParams":queryParams, "headers":headers};
  kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("");
  modelObj.fetch(serviceOptions, msgDataSuccess, msgDataError);
 }

 function msgDataSuccess(response){
  kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
  var dtFormat = "d-M-Y";
  if(response.length !== 0)
  {
    globalSegSize = response.length;
	kony.retailBanking.globalData.globals.pageFlag = true;
	var tempDate;
	var messageType=response&&response[0]&&response[0].messageType;
    if(messageType == "Inbox")
    {
      for(var  i=0;i<response.length;i++){
           response[i]["Reply"] = "Reply";
           tempDate =new Date(response[i]["receivedDate"]);
           tempDate=tempDate.format(dtFormat);
           response[i]["receivedDate"] = tempDate;
           if(response[i]["isRead"] == "false"){
                 response[i]["subject"] = {"skin" : "skn424242latoBold110","text" :response[i]["subject"]};
                 response[i]["receivedDate"] = {"skin" : "skn424242latoBold110","text" :response[i]["receivedDate"]};
                 response[i]["message"] = {"skin" : "skn424242latoBold110","text" :response[i]["message"]};
                 response[i]["categoryName"] = {"skin" : "skn424242latoBold110","text" :response[i]["categoryName"]};
           }
          if(response[i]["message"] === undefined || response[i]["message"] === "")
              response[i].message = "<No Description>";   
           else
              response[i]["message"] = kony.retailBanking.util.validation.trucateTo(response[i]["message"],25,22,"...");   
           if(response[i].hasOwnProperty("subject") === false)
              response[i].subject = "<No Subject>"
           if(response[i]["categoryName"] === undefined || response[i]["categoryName"] === "")
              response[i]["categoryName"] = "<No Category>";
    
  
     }
     frmMessageInboxKA.segMessagesInboxKA.widgetDataMap={
      lblSubjectKA:"subject",
      lblMsgDescKA:"message",
      lblDateKA:"receivedDate",
      lblMessageIdKA:"messageId",
      lblCategoryKA:"categoryName",
      lblCategoryIdKA:"categoryId",
      lblSubCategoryIdKA:"subcategoryId",
      lblSubCategoryNameKA:"subcategoryName",
      lblMessagestatusKA:"isRead",
      lblAccountIdKA:"accountId",
      lblAccountNameKA:"accountName",
      btnReplyKA:"Reply"
     };
    
    frmMessageInboxKA["segMessagesInboxKA"].setData(response);
   }
   else if(messageType == "Drafts")
    {
      for(var  i=0;i<response.length;i++){
           response[i]["Delete"] = "Delete";
           tempDate =new Date(response[i]["createdDate"]);
           tempDate=tempDate.format(dtFormat);
           response[i]["createdDate"] = tempDate;
           if(response[i]["message"] === undefined || response[i]["message"] === "")
              response[i].message = "<No Description>";   
           else
              response[i]["message"] = kony.retailBanking.util.validation.trucateTo(response[i]["message"],25,22,"...");
           if(response[i]["subject"] === undefined || response[i]["subject"] === "" )
              response[i].subject = "<No Subject>";
            if(response[i]["categoryName"] === undefined || response[i]["categoryName"] === "")
              response[i]["categoryName"] = "<No Category>";
    
     }
     frmMessageDraftKA.segMessageDraftKA.widgetDataMap={
      lblSubjectKA:"subject",
      lblMsgDescKA:"message",
      lblDateKA:"createdDate",
      lblMessageIdKA:"messageId",
      lblCategoryKA:"categoryName",
      lblCategoryIdKA:"categoryId",
      lblSubCategoryIdKA:"subcategoryId",
      lblSubCategoryNameKA:"subcategoryName",
      lblAccountIdKA:"accountId",
      lblAccountNameKA:"accountName",
      btnReplyKA:"Delete"
     };
    
    frmMessageDraftKA["segMessageDraftKA"].setData(response);
   }
   else if(messageType == "Sent")
    {
      for(var  i=0;i<response.length;i++){
           response[i]["Delete"] = "Delete";
           tempDate =new Date(response[i]["sentDate"]);
           tempDate=tempDate.format(dtFormat);
           response[i]["sentDate"] = tempDate;
          if(response[i]["message"] === undefined || response[i]["message"] === "")
              response[i].message = "<No Description>";  
           else 
              response[i]["message"] = kony.retailBanking.util.validation.trucateTo(response[i]["message"],25,22,"...");
           if(response[i]["subject"] === undefined || response[i]["subject"] === "" )
              response[i].subject = "<No Subject>";
           if(response[i]["categoryName"] === undefined || response[i]["categoryName"] === "")
              response[i]["categoryName"] = "<No Category>";
    
     }
     frmMessageSentItemsKA.segMessagesSentKA.widgetDataMap={
      lblSubjectKA:"subject",
      lblMsgDescKA:"message",
      lblDateKA:"sentDate",
      lblMessageIdKA:"messageId",
      lblCategoryKA:"categoryName",
      lblCategoryIdKA:"categoryId",
      lblSubCategoryIdKA:"subcategoryId",
      lblSubCategoryNameKA:"subcategoryName",
      lblAccountIdKA:"accountId",
      lblAccountNameKA:"accountName",
      btnReplyKA:"Delete"
     };
    
    frmMessageSentItemsKA["segMessagesSentKA"].setData(response);
   }
   else if(messageType == "Deleted")
    {
      for(var  i=0;i<response.length;i++){
           response[i]["DeleteForever"] = "Delete Forever";
           tempDate =new Date(response[i]["deletedDate"]);
           tempDate=tempDate.format(dtFormat);
           response[i]["deletedDate"] = tempDate;
           if(response[i]["message"] === undefined || response[i]["message"] === "")
              response[i].message = "<No Description>";  
           else 
              response[i]["message"] = kony.retailBanking.util.validation.trucateTo(response[i]["message"],25,22,"...");
           if(response[i]["subject"] === undefined || response[i]["subject"] === "" )
              response[i].subject = "<No Subject>";
           if(response[i]["categoryName"] === undefined || response[i]["categoryName"] === "")
              response[i]["categoryName"] = "<No Category>";
    
     }
     frmMessageDeletedItemsKA.segMessageDeletedKA.widgetDataMap={
      lblSubjectKA:"subject",
      lblMsgDescKA:"message",
      lblDateKA:"deletedDate",
      lblMessageIdKA:"messageId",
      lblCategoryKA:"categoryName",
      lblCategoryIdKA:"categoryId",
      lblSubCategoryIdKA:"subcategoryId",
      lblSubCategoryNameKA:"subcategoryName",
      lblAccountIdKA:"accountId",
      lblAccountNameKA:"accountName",
      btnReplyKA:"DeleteForever"
     };
    
    frmMessageDeletedItemsKA["segMessageDeletedKA"].setData(response);
   }
  }else
    alert("No records to show");
  
}

 function msgDataError(err){
       kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
       alert("No records to show");
    }
 
function onClickNext(frm, msgType) {
    var str = frm["lblPageKA"]["text"];
    var num = Number(str.substring(5));
    if (globalSegSize == 10) {
        var offset = 10 * (num);
        getMessageData(msgType, offset);
        frm["lblPageKA"]["text"] = "Page-" + (num + 1);
    } else alert("No records to show");
}
  
function onClickPrevious(frm, msgType) {
    var str = frm["lblPageKA"]["text"];
    var num = Number(str.substring(5));
    var offset = 10 * (num - 2);
	if(offset >= 0 ){
       getMessageData(msgType, offset);
       frm["lblPageKA"]["text"] = "Page-" + (num - 1);
	}
	else alert("No records to show");
}