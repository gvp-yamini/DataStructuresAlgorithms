var selectedMsgRow;
var unReadmsgs=0;
var msgCreatedType;
function showMessages()
{
  
  getMessageData("Inbox",0);
  frmMessagesKA.messageSegment.selectedRowIndex=[0,0];
  kony.retailBanking.globalData.globals.msgDel = "Inbox";
  selectedMsgRow=0;
  if (kony.retailBanking.globalData.deviceInfo.isIpad())
     clearMessages();
  frmMessagesKA.segMessagesDraftKA.setVisibility(true);
  frmMessagesKA.segMessagesInboxKA.setVisibility(true);
  frmMessagesKA.lblNomessages.setVisibility(true);
  frmMessagesKA.show();
}

function segMessagesonClick()
{
  	frmMessagesKA.lblNomessages.setVisibility(false);
    frmMessagesKA.segMessagesDraftKA.setVisibility(true);
 	frmMessagesKA.segMessagesInboxKA.setVisibility(true);
    kony.retailBanking.globalData.globals.pageFlag = false;
    selectedMsgRow = frmMessagesKA.messageSegment.selectedRowIndex[1];
    frmMessagesKA["messageSegment"].retainSelection=true;
	switch(selectedMsgRow)
    {
      case 0:
        kony.retailBanking.globalData.globals.msgDel = "Inbox";
        getMessageData("Inbox",0);
        getInboxMessaageContainer();
        break;
      case 1:
        kony.retailBanking.globalData.globals.msgDel = "Drafts";
        frmMessagesKA.lblDraftTitleKA.text=i18n_draftMessages;
        getMessageData("Drafts",0);
        break;
      case 2:
        kony.retailBanking.globalData.globals.msgDel = "Sent";
        frmMessagesKA.lblDraftTitleKA.text=i18n_sentMessages;
        getMessageData("Sent",0);    
        break;
      case 3:
        kony.retailBanking.globalData.globals.msgDel = "Deleted";
        frmMessagesKA.lblDraftTitleKA.text=i18n_deletedMessages;
        getMessageData("Deleted",0);
        break;

      default:
        frmMessagesKA.show();
    }

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
  if(offset == "0")
   { 
     frmMessagesKA["segMessagesInboxKA"].setData([]);
     frmMessagesKA["segMessagesDraftKA"].setData([]);
     unReadmsgs=0;
   }
  
  kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("");
  modelObj.fetch(serviceOptions, msgDataSuccess, customErrorCallback);
}


function msgDataSuccess(response)
{
  
  if(response.length !== 0)
  {
    frmMessagesKA.lblNomessages.setVisibility(false);
	kony.retailBanking.globalData.globals.pageFlag = true;
	var tempDate,segLen,segData;
	var messageType=response&&response[0]&&response[0].messageType;
    
   if(messageType == "Inbox")
    {
    var count =0 ;
    if(frmMessagesKA["segMessagesInboxKA"].data)
     segLen = frmMessagesKA["segMessagesInboxKA"].data.length;
     segData =  frmMessagesKA["segMessagesInboxKA"].data;
     for(var  i=0;i<response.length;i++)
     {
      tempDate = kony.retailBanking.util.formatingDate.getApplicationFormattedDateTime(response[i]["receivedDate"],kony.retailBanking.util.BACKEND_DATE_TIME_FORMAT);
      response[i]["receivedDate"]= tempDate;
      if(response[i]["message"] === undefined || response[i]["message"] === "")
         response[i].message = i18n_noDescription;
      else 
        response[i]["message"] = kony.retailBanking.util.validation.trucateTo(response[i]["message"],70,50,"...");
         
     if(response[i]["subject"] === undefined || response[i]["subject"] === "")
        response[i].subject = i18n_noSubject;
      if(response[i]["isRead"] == "true")
              response[i]["subject"] = {"skin" :"sknMessageTitleKA","text":response[i]["subject"]};
      else
        count ++;
    }
     unReadmsgs = unReadmsgs + count;
   frmMessagesKA.lblInboxTitleKA.text = i18n_myMessages + " "+"("+unReadmsgs+")";
    frmMessagesKA.segMessagesInboxKA.widgetDataMap={
      lblTitleKA:"subject",
      lblDescKA:"message",
      lblTimestampKA:"receivedDate",
      lblMessageIdKA:"messageId",
      lblMessagestatusKA:"isRead",
    };
    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
    if(segLen)
      frmMessagesKA["segMessagesInboxKA"].setData(segData.concat(response));
    else 
      frmMessagesKA["segMessagesInboxKA"].setData(response);
      getInboxMessaageContainer();
     
    }
  else
    {
      if( frmMessagesKA["segMessagesDraftKA"].data)
        segLen = frmMessagesKA["segMessagesDraftKA"].data.length;
        segData =  frmMessagesKA["segMessagesDraftKA"].data;
    var dateType;
    if(messageType == "Drafts")
      dateType = "createdDate";
    else if ( messageType == "Sent")
      dateType = "sentDate";
    else
      dateType = "deletedDate";
   for(var  i=0;i<response.length;i++){
      tempDate = kony.retailBanking.util.formatingDate.getApplicationFormattedDateTime(response[i][dateType], kony.retailBanking.util.BACKEND_DATE_TIME_FORMAT);
      response[i][dateType]= tempDate;
      if(response[i]["message"] === undefined || response[i]["message"] === "")
         response[i].message = i18n_noDescription;  
      else 
        response[i]["message"] = kony.retailBanking.util.validation.trucateTo(response[i]["message"],70,50,"...");
         
     if(response[i]["subject"] === undefined || response[i]["subject"] === "")
        response[i].subject = i18n_noSubject;
     
        
   }
    frmMessagesKA.segMessagesDraftKA.widgetDataMap={
      lblTitleKA:"subject",
      lblDescKA:"message",
      lblTimestampKA:dateType,
      lblMessageIdKA:"messageId"
    };
    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
    if(segLen)
       frmMessagesKA["segMessagesDraftKA"].setData(segData.concat(response));
    else
       frmMessagesKA["segMessagesDraftKA"].setData(response);
       getDraftMessaageContainer();
    }
    
  }
 else
 {
   kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
	if(kony.retailBanking.globalData.globals.pageFlag == false){
		frmMessagesKA.lblNomessages.setVisibility(true);
		frmMessagesKA.segMessagesDraftKA.setVisibility(false);
		frmMessagesKA.segMessagesInboxKA.setVisibility(false);
    }
 }
  
  kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
}


function onMyMessagesRowClick(){
    if(Object.keys(swipedIndices).length > 0 ||  coords.length !== 0){
			animationObj = getTransAnimDefinition("0%");
            coords = [];
            frmMessagesKA.segMessagesInboxKA.animateRows({
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
	switch(selectedMsgRow)
    {
		case 0: 
            navigateToMsgDetailKA("Inbox","segMessagesInboxKA",-1,messageRecordSuccess);
            msgDetailsPreshow("Inbox");
            break;
		case 1:
            navigateToDrafts("frmMessageDraftKA","segMessagesDraftKA")
            break;
      	case 2:
 			navigateToMsgDetailKA("Sent","segMessagesDraftKA",-1,messageRecordSuccess);
             msgDetailsPreshow("Sent");
            break;
        case 3:
        	navigateToMsgDetailKA("Deleted","segMessagesDraftKA",-1,messageRecordSuccess);
             msgDetailsPreshow("Deleted");
            break;
	}
  }
}


function navigateToMsgDetailKA(msgType,segName,rowSwipe,succesFunc)
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var options ={    "access": "online",
                "objectName": "RBObjects"
               };
  var headers = {"session_token":kony.retailBanking.globalData.session_token};
  var serviceName = "RBObjects";
  var modelObj = INSTANCE.getModel("Messages",serviceName,options);
  if (rowSwipe == -1)
 	 var selRecord=frmMessagesKA[segName].selectedItems[0];
  else
     var selRecord = frmMessagesKA[segName].data[rowSwipe];
  var msgId = selRecord["messageId"];
  var dataObject = new kony.sdk.dto.DataObject("Messages");
  var queryParams = {"messageId": msgId};
  var serviceOptions = {"dataObject":dataObject,"queryParams":queryParams, "headers":headers};
  modelObj.fetch(serviceOptions,succesFunc,customErrorCallback);
  if(segName == "segMessagesInboxKA")
     UpdateReadFlag(msgId);
}



function msgRecordSwipe(res)
{
      var tmpDate=formatDateForDetails(res);
      frmMessagesKA.lblReceiveTestKA.text=tmpDate;
      frmMessagesKA.lblReplyAccountNameKA.text=res[0].accountName;
      frmMessagesKA.lblTopicTextKA.text=res[0].categoryName + ' - ' + res[0].subcategoryName;
      frmMessagesKA.lblReplysubj.text=res[0].subject;
      frmMessagesKA.txtAreareply.text=res[0].message;
      frmMessagesKA.lblAcntId.text=res[0].accountId;
      frmMessagesKA.lblCategoryId.text=res[0].categoryId;
      frmMessagesKA.lblSubCategoryId.text=res[0].subcategoryId;
  	  frmMessagesKA.txtReplyKA.text="";
      frmMessagesKA.btnSendReplyKA.skin = primaryActionDisabled;
      frmMessagesKA.flxReplyWrapperKA.setVisibility(true);
      frmMessagesKA.flxReplyWrapperKA.forceLayout();
}


function messageRecordSuccess(res)
{
      var tmpDate=formatDateForDetails(res);
      frmMessagesKA.lblMessageReciveValueKA.text=tmpDate;
      frmMessagesKA.lblacntName.text=res[0].accountName;
      frmMessagesKA.lblTopic.text=res[0].categoryName;
      frmMessagesKA.lblSubCategory.text=res[0].subcategoryName;
      frmMessagesKA.lblSubject.text=res[0].subject;
      frmMessagesKA.lblDescription.text=res[0].message;
      frmMessagesKA.lblmessageID.text=res[0].messageId;
      frmMessagesKA.lblAcntId.text=res[0].accountId;
      frmMessagesKA.lblCategoryId.text=res[0].categoryId;
      frmMessagesKA.lblSubCategoryId.text=res[0].subcategoryId;
      

}


function msgDetailsPreshow(msgType)
{
      if (msgType == "Inbox")
      {
        frmMessagesKA.btnDeletefrver.setVisibility(false);
        frmMessagesKA.btnMsglReplyKA.setVisibility(true);
        frmMessagesKA.btnMsgDelete.setVisibility(true);
      }  
  	  else if (msgType == "Sent")
      {
        frmMessagesKA.btnDeletefrver.setVisibility(false);
        frmMessagesKA.btnMsglReplyKA.setVisibility(false);
        frmMessagesKA.btnMsgDelete.setVisibility(true);
      }
      else if (msgType == "Deleted")
      {
         frmMessagesKA.btnMsgDelete.setVisibility(false);
        frmMessagesKA.btnMsglReplyKA.setVisibility(false);
        frmMessagesKA.btnDeletefrver.setVisibility(true);
      }
     frmMessagesKA.flxInboxMessageDetailsKA.setVisibility(true);
     frmMessagesKA.flxInboxMessageDetailsKA.forceLayout();
  }

function formatDateForDetails(data){
  var dateType,str,msgType;
  msgType = data[0].messageType;
  if(msgType == "Inbox"){
    dateType = "receivedDate";
    str = i18n_ReceivedOn;
  }
  else if(msgType == "Sent"){
    dateType = "sentDate";
    str = i18n_sentOn;
  }
  else if(msgType == "Deleted"){
    dateType = "deletedDate";
    str = i18n_deletedOn;
  }
  var tempDate = kony.retailBanking.util.formatingDate.getApplicationFormattedDateTime(data[0][dateType],kony.retailBanking.util.BACKEND_DATE_TIME_FORMAT);
  tempDate= str+tempDate;
  return tempDate;
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


function deleteMessageSwipe(row)
{
  var segmentName;
  var messageDel = kony.retailBanking.globalData.globals.msgDel;
  if (messageDel == "Inbox")
    segmentName = "segMessagesInboxKA";
  else
    segmentName = "segMessagesDraftKA";
  if (row == -1)
  	var selRecord=frmMessagesKA[segmentName].selectedItems[0];
  else
    var selRecord =frmMessagesKA[segmentName].data[row];
  deleteMessage(selRecord["messageId"]); 
}


function deleteMessage(messageID)
{
  ShowLoadingScreen();
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var options ={    "access": "online",
                    "objectName": "RBObjects"
               };
  var headers = {"session_token":kony.retailBanking.globalData.session_token};
  var serviceName = "RBObjects";
  var modelObj = INSTANCE.getModel("Messages",serviceName,options);
  var record = {};
  record["messageId"] = messageID;
  var dataObject = new kony.sdk.dto.DataObject("Messages",record);
  var serviceOptions = {"dataObject":dataObject,"headers":headers};
  modelObj.remove(serviceOptions, deleteSuccess, customErrorCallback);
}

function deleteSuccess(res)
{
  frmMessagesKA.flxInboxMessageDetailsKA.isVisible = false;
  retainSelectionOff("messageSegment");
  frmMessagesKA.messageSegment.selectedRowIndex=[0,3];
  selectedMsgRow=3;
  retainSelectionOn("messageSegment");
  kony.retailBanking.globalData.globals.msgDel = "Deleted";
  getMessageData("Deleted",0);
   frmMessagesKA.lblDraftTitleKA.text=i18n_deletedMessages;
  frmMessagesKA.flxDraftHeaderKA.forceLayout();
   kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
}

function onClickDelete(form){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController(form);
  listController.performAction("deleteData"); 
}

function gotoMsgReplyKA()
{
      frmMessagesKA.lblReceiveTestKA.text=frmMessagesKA.lblMessageReciveValueKA.text;
      frmMessagesKA.lblReplyAccountNameKA.text=frmMessagesKA.lblacntName.text;
      frmMessagesKA.lblTopicTextKA.text=frmMessagesKA.lblTopic.text + ' - ' +  frmMessagesKA.lblSubCategory.text;
      frmMessagesKA.lblReplysubj.text=frmMessagesKA.lblSubject.text;
      frmMessagesKA.txtAreareply.text=frmMessagesKA.lblDescription.text;
  	  frmMessagesKA.txtReplyKA.text="";
      frmMessagesKA.btnSendReplyKA.skin = primaryActionDisabled;
      frmMessagesKA.flxReplyWrapperKA.setVisibility(true);
      frmMessagesKA.flxReplyWrapperKA.forceLayout();
}

function createMessage(messagetype)
{
  ShowLoadingScreen();
  var scopeObj = this;
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var options ={"access": "online",
                "objectName": "RBObjects"
               };
  var headers = {"session_token":kony.retailBanking.globalData.session_token};
  var serviceName = "RBObjects";
  var modelObj = INSTANCE.getModel("Messages",serviceName,options);
  var record = {}; 
  record["accountId"] = frmMessagesKA.lblAcntId.text;
  record["categoryId"] = frmMessagesKA.lblCategoryId.text;
  record["subcategoryId"]=frmMessagesKA.lblSubCategoryId.text;
  record["subject"]= frmMessagesKA.lblReplysubj.text;
  record["message"] = frmMessagesKA.txtReplyKA.text;
  record["messageType"] = messagetype;
  var dataObject = new kony.sdk.dto.DataObject("Messages",record);
  var requestOptions = {"dataObject":dataObject, "headers":headers};
  modelObj.create(requestOptions, createMessageSuccess, customErrorCallback);
}


function createMessageSuccess(res)
{
  frmMessagesKA.flxReplyWrapperKA.setVisibility(false);
  if (msgCreatedType == "Sent")
  {
    kony.retailBanking.globalData.globals.msgDel = "Sent";
    retainSelectionOff("messageSegment");
    retainSelectionOn("messageSegment");
    frmMessagesKA.messageSegment.selectedRowIndex=[0,2];
    selectedMsgRow=2;
    getMessageData("Sent",0);
     frmMessagesKA.lblDraftTitleKA.text=i18n_sentMessages;
    frmMessagesKA.flxDraftHeaderKA.forceLayout();
  }
  else
  {
    kony.retailBanking.globalData.globals.msgDel = "Drafts";
    frmMessagesKA.lblDraftTitleKA.text=i18n_draftMessages;
    retainSelectionOff("messageSegment");
    frmMessagesKA.messageSegment.selectedRowIndex=[0,1];
    selectedMsgRow=1;
     retainSelectionOn("messageSegment");
    getMessageData("Drafts",0);
  }
  kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();

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
  modelObj.fetch(serviceOptions, subcategorySuccess, customErrorCallback);
}


function subcategorySuccess(response){
  var masterData = [];
  var masterDataElement = [];
  masterDataElement.push("-1");
  var toAppend = i18n_selectSubcategory;
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
  if (msgCreatedType == "newMsg")
   {
   
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
  }
  
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
  if(valid){
    viewModel.setViewAttributeByProperty("btnSendKA","skin","primaryAction");
  }
  return valid;
}


function onNewMessageSendClick(form,msgType)
{
  
   var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
   var controller = INSTANCE.getFormController(form);
   var viewModel = controller.getFormModel();
   var validateMsg= validateNewMessage(form);
   if(validateMsg || msgType == "Drafts")
     {
        kony.retailBanking.globalData.globals.msgDel = msgType;
        viewModel.setViewAttributeByProperty("lblMessageTypeKA","text",msgType);
        ShowLoadingScreen();
        controller.performAction("saveData");
    }
}

function navigateToDrafts(toForm,segName)
{

  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var toController = INSTANCE.getFormController(toForm);
  var selRecord  = frmMessagesKA[segName].selectedItems[0];
  var navigationObject = new kony.sdk.mvvm.NavigationObject;
  var msgId = selRecord["messageId"];
  var datamodel = new kony.sdk.mvvm.DataModel;
  navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
  navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token},"queryParams" : {"messageId": msgId}});
  toController.performAction("loadDataAndShowForm",[navigationObject]);
    
}
