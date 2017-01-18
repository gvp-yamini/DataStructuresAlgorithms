function onMessagesCategorySelection(){
	var userAgent = kony.os.userAgent();
	var selectedKey;
	if (userAgent === "iPhone" || userAgent === "iPad"){
		selectedKey = frmMyMessagesKA.rbnCategoryKA.selectedKey;
	} else {
		selectedKey = getSelectedMessagesCategory();
	}
    frmMyMessagesKA.LabelNoRecordsKA.setVisibility(false);
    frmMyMessagesKA.LabelNoRecords1KA.setVisibility(false);
    frmMyMessagesKA.LabelNoRecords2KA.setVisibility(false);
    frmMyMessagesKA.LabelNoRecords3KA.setVisibility(false);
    frmMyMessagesKA.segMessagesDraftKA.setVisibility(true);
    frmMyMessagesKA.segMessagesInboxKA.setVisibility(true);
    frmMyMessagesKA.segMessagesSentKA.setVisibility(true);
    frmMyMessagesKA.segMessagesDeletedKA.setVisibility(true);
    kony.retailBanking.globalData.globals.pageFlag = false;
    getMessageData(selectedKey,"0");
    switch(selectedKey){
		case 'Inbox':
        kony.retailBanking.globalData.globals.msgDel = "Inbox";
        frmMyMessagesKA.flxSegSwitcherKA.left = '0%';
       // frmMyMessagesKA.LabelNoRecordsKA.left = "10%";
        break;
		case 'Drafts':
        kony.retailBanking.globalData.globals.msgDel = "Drafts";
        frmMyMessagesKA.flxSegSwitcherKA.left = '-100%';
        //frmMyMessagesKA.LabelNoRecordsKA.left = "90%";
		break;
		case 'Sent':
        kony.retailBanking.globalData.globals.msgDel = "Sent";
        frmMyMessagesKA.flxSegSwitcherKA.left = '-200%';
        //frmMyMessagesKA.LabelNoRecordsKA.left = "190%"
		break;
		case 'Deleted':
        kony.retailBanking.globalData.globals.msgDel = "Deleted";
		frmMyMessagesKA.flxSegSwitcherKA.left = '-300%';
        //frmMyMessagesKA.LabelNoRecordsKA.left = "290%"
		break;	
	}
   }


function onMyMessagesRowClick(){
    if(Object.keys(swipedIndices).length > 0 ||  coords.length !== 0){
			animationObj = getTransAnimDefinition("0%");
            coords = [];
            frmMyMessagesKA.segMessagesInboxKA.animateRows({
                    rows: [{
                        sectionIndex: swipedIndices["secIndex"],
                        rowIndex:swipedIndices["rowIndex"]
                    }],
                    widgets: ["flxSegMsgSwipe"],
                    animation: animationObj
                });
       swipedIndices={};
	}
  else{
    
	var userAgent = kony.os.userAgent();
	var selectedKey;
	if (userAgent === "iPhone" || userAgent === "iPad"){
		selectedKey = frmMyMessagesKA.rbnCategoryKA.selectedKey;
	} else {
		selectedKey = getSelectedMessagesCategory();
	}
	switch(selectedKey){
		case 'Inbox': 
		navigateToMsgDetailKA("frmMyMessagesKA","frmMessageDetailKA","segMessagesInboxKA");
		break;
		case 'Drafts':
        navigateToMsgDetailKA("frmMyMessagesKA","frmMessageDraftKA","segMessagesDraftKA");
		break;
		case 'Sent':
        navigateToMsgDetailKA("frmMyMessagesKA","frmMessageDetailKA","segMessagesSentKA");
		break;
		case 'Deleted':
		navigateToMsgDetailKA("frmMyMessagesKA","frmMessageDetailKA","segMessagesDeletedKA");
		break;
	}
  }
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

function navigateToMsgReplyKA(){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmMessageDetailKA");
  var viewModel = controller.getFormModel();
  var datamodel = new kony.sdk.mvvm.DataModel;
  var selRecord = {
    "date" :viewModel.getViewAttributeByProperty("lblMessageHeaderKA","text"),
    "accountName":viewModel.getViewAttributeByProperty("lblAccountNameInpKA","text"),
    "accountId":viewModel.getViewAttributeByProperty("lblAccountId","text"),
    "category":viewModel.getViewAttributeByProperty("lblCategoryInpKA","text"),
    "categoryId":viewModel.getViewAttributeByProperty("lblCategoryIdKA","text"),
    "subCategory":viewModel.getViewAttributeByProperty("lblSubcategoryInpKA","text"),
    "subCategoryId":viewModel.getViewAttributeByProperty("lblSubcategoryId","text"),
    "subject":viewModel.getViewAttributeByProperty("lblSubjectInpKA","text"),
    "msgDesc":viewModel.getViewAttributeByProperty("lblMessageDescKA","text")
  };
  frmMessageReplyKA.btnReplyKA.skin = sknprimaryActionDisabled;
  var navigationObject = new kony.sdk.mvvm.NavigationObject;
  navigationObject.setCustomInfo("selMessage",selRecord);
  navigationObject.setDataModel(null, kony.sdk.mvvm.OperationType.ADD, "form");
  navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  controller.performAction("navigateTo",["frmMessageReplyKA",navigationObject]);
}

function navigateToMsgDetailKA(fromForm,toForm,segName){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var toController = INSTANCE.getFormController(toForm);
  var toFormModel = toController.getFormModel();
   if(segName == "segMessagesSentKA"){
     toFormModel.performActionOnView("btnReplyKA","setVisibility",[false]);
     toFormModel.performActionOnView("btnDeleteForeverMessageKA","setVisibility",[false]);
     toFormModel.performActionOnView("btnDeleteMessageKA","setVisibility",[true]);
     toFormModel.setWidgetData("lblTitleKA","Sent Message");
   }
   else if(segName == "segMessagesDeletedKA"){
     toFormModel.performActionOnView("btnReplyKA","setVisibility",[false]);
     toFormModel.performActionOnView("btnDeleteForeverMessageKA","setVisibility",[true]);
     toFormModel.performActionOnView("btnDeleteMessageKA","setVisibility",[false]);
     toFormModel.setWidgetData("lblTitleKA","Deleted Message");
   }
   else if(segName == "segMessagesInboxKA"){
     toFormModel.performActionOnView("btnReplyKA","setVisibility",[true]);
     toFormModel.performActionOnView("btnDeleteForeverMessageKA","setVisibility",[false]);
     toFormModel.performActionOnView("btnDeleteMessageKA","setVisibility",[true]);
     toFormModel.setWidgetData("lblTitleKA","Message Details");
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

function getSelectedMessagesCategory(){
	var position = frmMyMessagesKA.flxSelectedIndicatorKA.left;
	kony.print('position is '+position);
	var index = (position.slice(0, -1))/25; // slice off the last character - '%'
	switch(index){
		case 0:
		return 'Inbox';
		case 1:
		return 'Drafts';
		case 2:
		return 'Sent';
		case 3:
		return 'Deleted';
	}
	return index;
}

function onMessageInboxSelected(){
	if (userAgent !== "iPhone" && userAgent !== "iPad"){
		frmMyMessagesKA.btnInboxKA.skin = sknandroidSegmentedTextActive;
		frmMyMessagesKA.btnDraftKA.skin = sknandroidSegmentedTextInactive;
		frmMyMessagesKA.btnSentKA.skin = sknandroidSegmentedTextInactive;
		frmMyMessagesKA.btnDeletedKA.skin = sknandroidSegmentedTextInactive;
		frmMyMessagesKA.flxSelectedIndicatorKA.left = '0%';
        frmMyMessagesKA.flxSelectedIndicatorKA.forceLayout();
	}
    if (userAgent === "iPhone" || userAgent === "iPad")
		frmMyMessagesKA.rbnCategoryKA.selectedKey = 'Inbox';
    onMessagesCategorySelection();
}

function onMessageDraftSelected(){
   if (userAgent !== "iPhone" && userAgent !== "iPad"){
		frmMyMessagesKA.btnInboxKA.skin = sknandroidSegmentedTextInactive;
		frmMyMessagesKA.btnDraftKA.skin = sknandroidSegmentedTextActive;
		frmMyMessagesKA.btnSentKA.skin = sknandroidSegmentedTextInactive;
		frmMyMessagesKA.btnDeletedKA.skin = sknandroidSegmentedTextInactive;
		frmMyMessagesKA.flxSelectedIndicatorKA.left = '25%';
        frmMyMessagesKA.flxSelectedIndicatorKA.forceLayout();
	}
    if (userAgent === "iPhone" || userAgent === "iPad")
		frmMyMessagesKA.rbnCategoryKA.selectedKey = 'Drafts';
    onMessagesCategorySelection();
}

function onMessageSentSelected(){
	if (userAgent !== "iPhone" && userAgent !== "iPad"){
		frmMyMessagesKA.btnInboxKA.skin = sknandroidSegmentedTextInactive;
		frmMyMessagesKA.btnDraftKA.skin = sknandroidSegmentedTextInactive;
		frmMyMessagesKA.btnSentKA.skin = sknandroidSegmentedTextActive;
		frmMyMessagesKA.btnDeletedKA.skin = sknandroidSegmentedTextInactive;
        frmMyMessagesKA.flxSelectedIndicatorKA.left = '50%';
        frmMyMessagesKA.flxSelectedIndicatorKA.forceLayout();
    }
    if (userAgent === "iPhone" || userAgent === "iPad")
		frmMyMessagesKA.rbnCategoryKA.selectedKey = 'Sent';
    onMessagesCategorySelection();
}

function onMessageDeletedSelected(){
	if (userAgent !== "iPhone" && userAgent !== "iPad"){
		frmMyMessagesKA.btnInboxKA.skin = sknandroidSegmentedTextInactive;
		frmMyMessagesKA.btnDraftKA.skin = sknandroidSegmentedTextInactive;
		frmMyMessagesKA.btnSentKA.skin = sknandroidSegmentedTextInactive;
		frmMyMessagesKA.btnDeletedKA.skin = sknandroidSegmentedTextActive;
		frmMyMessagesKA.flxSelectedIndicatorKA.left = '75%';
        frmMyMessagesKA.flxSelectedIndicatorKA.forceLayout();
	}
    if (userAgent === "iPhone" || userAgent === "iPad")
		frmMyMessagesKA.rbnCategoryKA.selectedKey = 'Deleted';
    onMessagesCategorySelection();
}

function enableMessageSendReplyButton(){
	kony.print("tboxReplyKA text is"+frmMessageReplyKA.txtAreaMsgDescKA.text);
	if(frmMessageReplyKA.txtAreaMsgDescKA.text !== ''){
		frmMessageReplyKA.btnReplyKA.skin = sknprimaryAction;
	} else {
		frmMessageReplyKA.btnReplyKA.skin = sknprimaryActionDisabled;
	}
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
  viewModel.setViewAttributeByProperty("lblMessageTypeKA","text","Drafts");
  controller.performAction("saveData");
  
}
function validateNewMessage(form){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController(form);
  var viewModel = controller.getFormModel();
  var valid= true;
  valid = kony.retailBanking.util.validation.validateListBox(viewModel && viewModel.getWidgetData("lbxAccountNameKA").getData());
  if(valid){
    valid = kony.retailBanking.util.validation.validateListBox(viewModel && viewModel.getWidgetData("lbxCategoryKA").getData());
  }
  if(valid){
    valid = kony.retailBanking.util.validation.validateListBox(viewModel && viewModel.getWidgetData("lbxSubCategoryKA").getData());
  }
  if(valid){
    valid = kony.retailBanking.util.validation.validateTextboxOrLabel(viewModel && viewModel.getViewAttributeByProperty("tbxSubjectKA","text"));
  }
  /*if(valid){
    valid = kony.retailBanking.util.validation.validateTextArea(viewModel && viewModel.getViewAttributeByProperty("txtAreaMsgDescKA","text"));
  }*/
  if(valid){
    viewModel.setViewAttributeByProperty("btnSendKA","skin","sknprimaryAction");
  }
  return valid;
}

function showMessagesList()
{
   var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
   var listController = INSTANCE.getFormController("frmMyMessagesKA");
   var navObject = new kony.sdk.mvvm.NavigationObject();
   navObject.setRequestOptions("segMessagesInboxKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"messageType": "Inbox","pageSize":"10","recordNumber":"0"}});
   listController.performAction("navigateTo",["frmMyMessagesKA",navObject]); 
}

function showNewMessage(){
   var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
   var listController = INSTANCE.getFormController("frmNewMessageKA");
   var navObject = new kony.sdk.mvvm.NavigationObject();
   navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
   navObject.setDataModel(null, kony.sdk.mvvm.OperationType.ADD, "form");
   listController.performAction("navigateTo",["frmNewMessageKA",navObject]); 
   messagePreshow("frmNewMessageKA");
}

function messagePreshow(whichForm){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController(whichForm);
  var viewModel=controller.getFormModel();
  viewModel.setViewAttributeByProperty("tbxSubjectKA","text","");
  viewModel.setViewAttributeByProperty("txtAreaMsgDescKA","text","");
  viewModel.setViewAttributeByProperty("btnSendKA","skin","sknprimaryActionDisabled");
}

function setInboxList(data){
  var tempData = data["segMessagesInboxKA"];
  var tempDate,count=0;
  for(var i in tempData){
    tempDate =kony.retailBanking.util.formatingDate.getApplicationFormattedDateTime(tempData[i]["receivedDate"],kony.retailBanking.util.BACKEND_DATE_TIME_FORMAT);
    tempData[i]["receivedDate"] = tempDate;
    if(tempData[i].hasOwnProperty("message") === true);
      //  tempData[i]["message"] =  kony.retailBanking.util.validation.trucateTo(tempData[i]["message"],25,22,"...");
      else
        tempData[i].message = i18n_noDescription;   
      if(tempData[i].hasOwnProperty("subject") === false)
        tempData[i].subject = i18n_noSubject;
    if(tempData[i]["isRead"] == "true")
              tempData[i]["subject"] = {"skin" : "sknMessageTitleKA","text" :tempData[i]["subject"]};
    else
      count++;
    
  }
  frmMyMessagesKA.titleBarLabel.text = i18n_myMessages + " "+"("+count+")";
  return tempData;
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
  if(offset == "0"){
    switch(msgType){
       case 'Inbox': frmMyMessagesKA["segMessagesInboxKA"].setData([]);
                     break;
       case 'Drafts':frmMyMessagesKA["segMessagesDraftKA"].setData([]);
                     break;
       case 'Sent':frmMyMessagesKA["segMessagesSentKA"].setData([]);
                   break;
       case 'Deleted':frmMyMessagesKA["segMessagesDeletedKA"].setData([]);
                      break;
        
    }
  }
  kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("");
  
  modelObj.fetch(serviceOptions, msgDataSuccess, customErrorCallback);
}
function msgDataSuccess(response){
  if(response.length !== 0){
    frmMyMessagesKA.LabelNoRecordsKA.setVisibility(false);
	kony.retailBanking.globalData.globals.pageFlag = true;
	var tempDate,segLen,segData;
	var messageType=response&&response[0]&&response[0].messageType;
	if(messageType== "Drafts" ){
		if(frmMyMessagesKA["segMessagesDraftKA"].data)
			segLen = frmMyMessagesKA["segMessagesDraftKA"].data.length;
			segData =  frmMyMessagesKA["segMessagesDraftKA"].data;  
			for(var  i=0;i<response.length;i++){
				tempDate = kony.retailBanking.util.formatingDate.getApplicationFormattedDateTime(response[i]["createdDate"],kony.retailBanking.util.BACKEND_DATE_TIME_FORMAT);
				response[i]["createdDate"]= tempDate;
				if(response[i]["message"] == "")
					response[i].message = i18n_noDescription; 
				else 
					response[i]["message"] = kony.retailBanking.util.validation.trucateTo(response[i]["message"],25,22,"...");
				if(response[i].hasOwnProperty("subject") === false)
					response[i].subject = i18n_noSubject;
			}
			frmMyMessagesKA.segMessagesDraftKA.widgetDataMap={
				lblTitleKA:"subject",
				lblDescKA:"message",
				lblTimestampKA:"createdDate",
				lblMessageIdKA:"messageId",
				lblMessagestatusKA:"isRead",
			};
			kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
			if(segLen)
				frmMyMessagesKA["segMessagesDraftKA"].setData(segData.concat(response));
			else
			    frmMyMessagesKA["segMessagesDraftKA"].setData(response);
    }
  else if(messageType == "Inbox"  ){
    var count =0 ;
    if(frmMyMessagesKA["segMessagesInboxKA"].data)
     segLen = frmMyMessagesKA["segMessagesInboxKA"].data.length;
     segData =  frmMyMessagesKA["segMessagesInboxKA"].data;
     for(var  i=0;i<response.length;i++){
      tempDate = kony.retailBanking.util.formatingDate.getApplicationFormattedDateTime(response[i]["receivedDate"],kony.retailBanking.util.BACKEND_DATE_TIME_FORMAT);
      response[i]["receivedDate"]= tempDate;
      if(response[i].hasOwnProperty("message") === true);
        //response[i]["message"] = kony.retailBanking.util.validation.trucateTo(response[i]["message"],25,22,"...");
      else 
        response[i].message = i18n_noDescription;    
      if(response[i].hasOwnProperty("subject") === false)
        response[i].subject = i18n_noSubject;
      if(response[i]["isRead"] == "true")
              response[i]["subject"] = {"skin" :"sknMessageTitleKA","text":response[i]["subject"]};
      else
        count ++;
    }
    frmMyMessagesKA.titleBarLabel.text = i18n_myMessages + " "+"("+count+")";
    frmMyMessagesKA.segMessagesInboxKA.widgetDataMap={
      lblTitleKA:"subject",
      lblDescKA:"message",
      lblTimestampKA:"receivedDate",
      lblMessageIdKA:"messageId",
      lblMessagestatusKA:"isRead",
    };
    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
    if(segLen)
      frmMyMessagesKA["segMessagesInboxKA"].setData(segData.concat(response));
    else 
      frmMyMessagesKA["segMessagesInboxKA"].setData(response);
  }
  else if(messageType == "Sent"  ){
    if( frmMyMessagesKA["segMessagesSentKA"].data)
    segLen = frmMyMessagesKA["segMessagesSentKA"].data.length;
    segData =  frmMyMessagesKA["segMessagesSentKA"].data;
   for(var  i=0;i<response.length;i++){
      tempDate = kony.retailBanking.util.formatingDate.getApplicationFormattedDateTime(response[i]["sentDate"], kony.retailBanking.util.BACKEND_DATE_TIME_FORMAT);
      response[i]["sentDate"]= tempDate;
      if(response[i].hasOwnProperty("message") === true);
        //response[i]["message"] = kony.retailBanking.util.validation.trucateTo(response[i]["message"],25,22,"...");
      else 
        response[i].message = i18n_noDescription;    
      if(response[i].hasOwnProperty("subject") === false)
        response[i].subject = i18n_noSubject;
   }
    frmMyMessagesKA.segMessagesSentKA.widgetDataMap={
      lblTitleKA:"subject",
      lblDescKA:"message",
      lblTimestampKA:"sentDate",
      lblMessageIdKA:"messageId"
    };
    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
    if(segLen)
       frmMyMessagesKA["segMessagesSentKA"].setData(segData.concat(response));
    else
       frmMyMessagesKA["segMessagesSentKA"].setData(response);
  }
  else if(messageType == "Deleted"  ){
    if(frmMyMessagesKA["segMessagesDeletedKA"].data)
    segLen = frmMyMessagesKA["segMessagesDeletedKA"].data.length;
    segData =  frmMyMessagesKA["segMessagesDeletedKA"].data;
    for(var  i=0;i<response.length;i++){
     if(response[i].hasOwnProperty("message") === true);
        //response[i]["message"] = kony.retailBanking.util.validation.trucateTo(response[i]["message"],25,22,"...");
      else 
        response[i].message = i18n_noDescription;    
      if(response[i].hasOwnProperty("subject") === false)
        response[i].subject = i18n_noSubject;
     tempDate = kony.retailBanking.util.formatingDate.getApplicationFormattedDateTime(response[i]["deletedDate"],kony.retailBanking.util.BACKEND_DATE_TIME_FORMAT);
     response[i]["deletedDate"]= tempDate;
    }
    frmMyMessagesKA.segMessagesDeletedKA.widgetDataMap={
      lblTitleKA:"subject",
      lblDescKA:"message",
      lblTimestampKA:"deletedDate",
      lblMessageIdKA:"messageId"
    }; 
    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
    if(segLen)
      frmMyMessagesKA["segMessagesDeletedKA"].setData(segData.concat(response));
    else 
      frmMyMessagesKA["segMessagesDeletedKA"].setData(response);
   }
  }
  else {
    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
	if(kony.retailBanking.globalData.globals.pageFlag == false){
        frmMyMessagesKA.LabelNoRecordsKA.setVisibility(true);
        frmMyMessagesKA.LabelNoRecords1KA.setVisibility(true);
        frmMyMessagesKA.LabelNoRecords2KA.setVisibility(true);
        frmMyMessagesKA.LabelNoRecords3KA.setVisibility(true);
		frmMyMessagesKA.segMessagesDraftKA.setVisibility(false);
		frmMyMessagesKA.segMessagesInboxKA.setVisibility(false);
		frmMyMessagesKA.segMessagesSentKA.setVisibility(false);
		frmMyMessagesKA.segMessagesDeletedKA.setVisibility(false);
	}
 }
 kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
}


function onClickDelete(form){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController(form);
  listController.performAction("deleteData"); 
}

function navigateToMsgAfterDelete(){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var toController = INSTANCE.getFormController("frmMyMessagesKA");
  onMessageDeletedSelected();
  toController.showForm();
}

function formatDateForDetails(data){
  var dateType,str,msgType;
  msgType = data["form"][0].messageType;
  if(msgType == "Inbox"){
    dateType = "receivedDate";
    str =  i18n_recievedOn;
  }
  else if(msgType == "Sent"){
    dateType = "sentDate";
    str = i18n_sentOn;
  }
  else if(msgType == "Deleted"){
    dateType = "deletedDate";
    str =  i18n_deletedOn;
  }
  var tempDate = kony.retailBanking.util.formatingDate.getApplicationFormattedDateTime(data["form"][0][dateType],kony.retailBanking.util.BACKEND_DATE_TIME_FORMAT);
  data["form"][0]["receivedDate"] = str+tempDate;
  return data;
}

function manualDelete(row){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController("frmMyMessagesKA");
  var viewModel = listController.getFormModel();
  var segName,selRecord; 
  if(kony.retailBanking.globalData.globals.msgDel == "Sent")
    segName = "segMessagesSentKA";
  else if(kony.retailBanking.globalData.globals.msgDel == "Deleted")
    segName = "segMessagesDeletedKA";
  else if(kony.retailBanking.globalData.globals.msgDel == "Inbox")
    segName = "segMessagesInboxKA";
  else if(kony.retailBanking.globalData.globals.msgDel == "Drafts")
    segName = "segMessagesDraftKA";
  if(kony.retailBanking.globalData.deviceInfo.isIphone())
     selRecord  = viewModel.getViewAttributeByProperty(segName,"data")[row];
  else 
     selRecord  = viewModel.getViewAttributeByProperty(segName,"selectedItems")[0];
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
}
function deleteSuccess(res){
  onMessageDeletedSelected();
}


function goToReply(row){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController("frmMyMessagesKA");
  var viewModel = listController.getFormModel();
  var selRecord;
  if(kony.retailBanking.globalData.deviceInfo.isIphone())
     selRecord  = viewModel.getViewAttributeByProperty("segMessagesInboxKA","data")[row];
  else 
    selRecord  = viewModel.getViewAttributeByProperty("segMessagesInboxKA","selectedItems")[0];
  var selMsg = {
    "date":"Received On : "+selRecord.receivedDate,
    "accountName":selRecord.accountName,
    "accountId":selRecord.accountId,
    "category":selRecord.categoryName,
    "categoryId":selRecord.categoryId,
    "subCategory":selRecord.subcategoryName,
    "subCategoryId":selRecord.subcategoryId,
    "subject":selRecord.subject.text,
    "msgDesc":selRecord.message
  };
  frmMessageReplyKA.btnReplyKA.skin = sknprimaryActionDisabled;
  var navigationObject = new kony.sdk.mvvm.NavigationObject;
  navigationObject.setCustomInfo("selMessage",selMsg);
  navigationObject.setDataModel(null, kony.sdk.mvvm.OperationType.ADD, "form");
  navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  listController.performAction("navigateTo",["frmMessageReplyKA",navigationObject]);
}

function fetchSubcategory(catId){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var options ={    "access": "online",
                    "objectName": "RBObjects"
               };
  var headers = {"session_token":kony.retailBanking.globalData.session_token};
  var serviceName = "RBObjects";
  var modelObj = INSTANCE.getModel("MessageSubCategory",serviceName,options);
  var dataObject = new kony.sdk.dto.DataObject("MessageSubCategory");
  var queryParams = {"categoryId":catId}
  var serviceOptions = {"dataObject":dataObject,"queryParams":queryParams,"headers":headers};
  modelObj.fetch(serviceOptions, categorySuccess, customErrorCallback);
}
function categorySuccess(response){
  var masterData = [];
  var masterDataElement = [];
  masterDataElement.push("-1");
  var toAppend = i18n_selectSubcategory
  masterDataElement.push(toAppend);
  masterData.push(masterDataElement);
  for (var i = 0; i < response.length; i++) 
  {
         masterDataElement = [];
         var key = response[i]["subcategoryId"];
         var value = response[i]["subcategoryName"];                            
         masterDataElement.push(key);
         masterDataElement.push(value);
         masterData.push(masterDataElement);
  }
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  if(kony.application.getCurrentForm().id == "frmNewMessageKA"){
    var nwmsgController = INSTANCE.getFormController("frmNewMessageKA");
    var formmodel = nwmsgController.getFormModel();
    formmodel.setMasterDataByProperty(masterData,"lbxSubCategoryKA");
    formmodel.setViewAttributeByProperty("lbxSubCategoryKA","selectedKey","-1");
  }
  else
  {
    var draftController = INSTANCE.getFormController("frmMessageDraftKA");
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
