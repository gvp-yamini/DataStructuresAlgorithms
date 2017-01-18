var action;
var selectedOperation = "";
var cardStatus ="";


function cardManagementOperations(operationMode){
  selectedOperation = operationMode;
  var cardType = cardsList[selectedCardIndex].cardType;
  cardStatus=cardsList[selectedCardIndex].cardStatus;
 	if(operationMode === "changePin"){
    action = "PinChange";
    frmCardOperationsKA.lblCardOperationHeaderKA.text = i18n_requestPinChange;
    frmCardOperationsKA.lblCardTypeKA.setVisibility(false);
    frmCardOperationsKA.flxCustomerCareCallKA.setVisibility(false);
    
  }else if(operationMode === "cancel"){
    action = "Cancel";
    frmCardOperationsKA.lblCardOperationHeaderKA.text = i18n_Cancelling+" "+cardType+" "+i18n_Card;
    frmCardOperationsKA.lblCardTypeKA.setVisibility(false);
    frmCardOperationsKA.flxCustomerCareCallKA.setVisibility(false);
   
  }else if(operationMode === "lost"){
    action = "Lost";
    frmCardOperationsKA.lblCardOperationHeaderKA.text = i18n_StolenorLost+" "+ cardType+" "+i18n_Card;
    frmCardOperationsKA.lblCardTypeKA.setVisibility(false);
    frmCardOperationsKA.flxCustomerCareCallKA.setVisibility(true);
  
  }
  else if(operationMode === "replace"){
    action = "Replace";
    frmCardOperationsKA.lblCardOperationHeaderKA.text = i18n_Replacing+" "+ cardType+" "+i18n_Card;
    frmCardOperationsKA.lblCardTypeKA.setVisibility(true);
    frmCardOperationsKA.flxCustomerCareCallKA.setVisibility(false);
  }
  else {
      if(cardStatus === "Active"){
	  action = "Deactivate";
      frmCardOperationsKA.lblCardOperationHeaderKA.text = i18n_Deactivating+" " + cardType+" "+i18n_Card;
      frmCardOperationsKA.lblCardTypeKA.setVisibility(false);
      frmCardOperationsKA.flxCustomerCareCallKA.setVisibility(false);
    }
    else if(cardStatus === "Inactive"){
      action = "Activate";
      frmCardOperationsKA.lblCardOperationHeaderKA.text = i18n_Activating+" " + cardType+" "+i18n_Card;
      frmCardOperationsKA.lblCardTypeKA.setVisibility(false);
      frmCardOperationsKA.flxCustomerCareCallKA.setVisibility(false);
    }
  }
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmCardOperationsKA");
  var navigationObject = new kony.sdk.mvvm.NavigationObject();
  var datamodelflxAddressKA = new kony.sdk.mvvm.DataModel();
  navigationObject.setDataModel(null,kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
  navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  navigationObject.setCustomInfo("dataIndex",selectedCardIndex);
  navigationObject.setCustomInfo("action",action);
 controller.performAction("navigateTo",["frmCardOperationsKA",navigationObject]);
}

function cardManagementOperationsTablet(operationMode){
  selectedOperation = operationMode;
  var cardType = cardsList[selectedCardIndex].cardType;
  cardStatus=cardsList[selectedCardIndex].cardStatus;
 	if(operationMode === "changePin"){
    action = "PinChange";
    cancellationCards.managecardsTitle.text = i18n_requestPinChange;
    cancellationCards.lblCardTypeKA.setVisibility(false);
    cancellationCards.flxCustomerCareCallKA.setVisibility(false);
    
  }else if(operationMode === "cancel"){
    action = "Cancel";
    cancellationCards.managecardsTitle.text = i18n_Cancelling+" "+cardType;
    cancellationCards.lblCardTypeKA.setVisibility(false);
    cancellationCards.flxCustomerCareCallKA.setVisibility(false);
   
  }else if(operationMode === "lost"){
    action = "Lost";
    cancellationCards.managecardsTitle.text = i18n_StolenorLost+" "+ cardType;
    cancellationCards.lblCardTypeKA.setVisibility(false);
    cancellationCards.flxCustomerCareCallKA.setVisibility(true);
  
  }
  else if(operationMode === "replace"){
    action = "Replace";
    cancellationCards.managecardsTitle.text = i18n_Replacing+" "+ cardType;
    cancellationCards.lblCardTypeKA.setVisibility(true);
    cancellationCards.flxCustomerCareCallKA.setVisibility(false);
  }
  else {
      if(cardStatus === "Active"){
	  action = "Deactivate";
      cancellationCards.managecardsTitle.text = i18n_Deactivating+" " + cardType;
      cancellationCards.lblCardTypeKA.setVisibility(false);
      cancellationCards.flxCustomerCareCallKA.setVisibility(false);
    }
    else if(cardStatus === "Inactive"){
      action = "Activate";
      cancellationCards.managecardsTitle.text = i18n_Activating+" " + cardType;
      cancellationCards.lblCardTypeKA.setVisibility(false);
      cancellationCards.flxCustomerCareCallKA.setVisibility(false);
    }
  }
  cancellationCards.lblCardTypeKA.text = i18n_CardTypeC+" "+cardsList[selectedCardIndex].cardType;
  cancellationCards.lblCardNumberKA.text =cardsList[selectedCardIndex].cardNumber;
  cancellationCards.lblValidThroughKA.text =cardsList[selectedCardIndex].expiryDate;
  cancellationCards.lblCardHolderNameKA.text =cardsList[selectedCardIndex].cardHolderName;
  cancellationCards.lblCardIdKA.text = cardsList[selectedCardIndex].cardId;  
  cancellationCards.lblActionKA.text = action;
  cancellationCards.txtAreaReasonKA.text = "";
  openModal(cancellationCards.flxCardDetailsKA,"flxCardDetailsKA");
  /*var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmCardOperationsKA");
  var navigationObject = new kony.sdk.mvvm.NavigationObject();
  var datamodelflxAddressKA = new kony.sdk.mvvm.DataModel();
  navigationObject.setDataModel(null,kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
  navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  navigationObject.setCustomInfo("dataIndex",selectedCardIndex);
  navigationObject.setCustomInfo("action",action);
 controller.performAction("navigateTo",["frmCardOperationsKA",navigationObject]);*/
}


var phNum = "";
function showManageCardsAlert(){
    phNum = "284 234 1234";
//var phNum = frmContactUsKA.contactSegmentList.selectedItems[0].phoneNum;
  var noLable="";
  var yesLable="";
  var alertType="";
  var alertTitle="";
  var message="";
  var imageIcon = "";
if(selectedOperation === "lost"){
     alertType = constants.ALERT_TYPE_CONFIRMATION;
    alertTitle = i18n_Confirmationalert;
    yesLable = i18n_Call;
    noLable = i18n_ok;
    message = i18n_InstructCardsLost;
  }else if(selectedOperation === "changePin"){
     alertType = constants.ALERT_TYPE_INFORMATION;
    alertTitle = i18n_Confirmationalert;
    yesLable = i18n_ok;
    noLable = "";
    message =  i18n_InstructPinChange;
  }else if(selectedOperation === "activateordeactivate"){
     alertType = constants.ALERT_TYPE_INFORMATION;
    alertTitle =i18n_Confirmationalert;
    yesLable = i18n_ok;
    noLable = "";
     if(cardStatus === "Active"){
   		 message = i18n_cardDeactivated;
     }else{
      	 message = i18n_cardactivated;
     }
  }else if(selectedOperation === "cancel"){
     alertType = constants.ALERT_TYPE_INFORMATION;
    alertTitle = i18n_Confirmationalert;
    yesLable = i18n_ok;
    noLable = "";
    message = i18n_cardCancelled;
  }else if(selectedOperation === "replace"){
     alertType = constants.ALERT_TYPE_INFORMATION;
    alertTitle = i18n_Confirmationalert;
    yesLable = i18n_ok;
    noLable = "";
   message = i18n_replacementReq+" "+kony.retailBanking.globalData.applicationProperties.appProperties.businessDays+"  "+i18n_workingDays;
  }

  kony.ui.Alert({
    	"message": message,
        "alertType": alertType,
        "alertTitle": alertTitle,
        "yesLabel": yesLable,
        "noLabel": noLable,
        "alertIcon": imageIcon,
        "alertHandler": userResponse
    }, {
        "iconPosition": constants.ALERT_ICON_POSITION_LEFT
    });
  }
  function userResponse(response){
if(response){
  try
	{
      if(selectedOperation === "lost"){
          kony.phone.dial(phNum);
       }
	} 
	catch(err)
	{
		alert("error in dial:: "+err);
	}
}
    	  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
		  var controller = INSTANCE.getFormController("frmManageCardsKA");
		  var navigationObject = new kony.sdk.mvvm.NavigationObject();
		  navigationObject.setRequestOptions("segCardsKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
		  controller.performAction("navigateTo",["frmManageCardsKA",navigationObject]);
  }




//Activating and deactivating different lables

function changeCardsLableStatus(cardStatus){
  if(cardStatus==="Active")
            {
              frmManageCardsKA.flxDeactivateKA.btnActivateKA.text=i18n_DeactivateCard;
              frmManageCardsKA.flxPinKA.isVisible=true;
              frmManageCardsKA.flxDeactivateKA.isVisible=true;
              frmManageCardsKA.flxReplaceKA.isVisible=true;
              frmManageCardsKA.flxCancelKA.isVisible=true;
              frmManageCardsKA.flxReportKA.isVisible=true;
              frmManageCardsKA.flxMessageLabelKA.isVisible = false;
            }
         else if(cardStatus==="Inactive")
          {
            frmManageCardsKA.flxDeactivateKA.btnActivateKA.text=i18n_ActivateCard;
          	frmManageCardsKA.flxPinKA.isVisible=false;
            frmManageCardsKA.flxDeactivateKA.isVisible=true;
            frmManageCardsKA.flxReplaceKA.isVisible=false;
            frmManageCardsKA.flxCancelKA.isVisible=false;
            frmManageCardsKA.flxReportKA.isVisible=false;
            frmManageCardsKA.flxMessageLabelKA.isVisible = true;
            frmManageCardsKA.lblCardStatusKA.text = i18n_DeactivateCardInfo;
           }
          else if(cardStatus==="Cancelled")
          {
            frmManageCardsKA.flxDeactivateKA.btnActivateKA.text=i18n_ActivateCard;
          	frmManageCardsKA.flxPinKA.isVisible=false;
            frmManageCardsKA.flxDeactivateKA.isVisible=false;
            frmManageCardsKA.flxReplaceKA.isVisible=false;
            frmManageCardsKA.flxCancelKA.isVisible=false;
            frmManageCardsKA.flxReportKA.isVisible=false;
             frmManageCardsKA.flxMessageLabelKA.isVisible = true;
            frmManageCardsKA.lblCardStatusKA.text = i18n_cancelCardInfo;
           }
          else if(cardStatus==="Lost")
          {
            frmManageCardsKA.flxDeactivateKA.btnActivateKA.text=i18n_ActivateCard;
          	frmManageCardsKA.flxPinKA.isVisible=false;
            frmManageCardsKA.flxDeactivateKA.isVisible=false;
            frmManageCardsKA.flxReplaceKA.isVisible=false;
            frmManageCardsKA.flxCancelKA.isVisible=false;
            frmManageCardsKA.flxReportKA.isVisible=false;
            frmManageCardsKA.flxMessageLabelKA.isVisible = true;
            frmManageCardsKA.lblCardStatusKA.text = i18n_ReportCardInfo;
           }
          else if(cardStatus==="Replaced")
          {
            frmManageCardsKA.flxDeactivateKA.btnActivateKA.text=i18n_ActivateCard;
          	frmManageCardsKA.flxPinKA.isVisible=true;
            frmManageCardsKA.flxDeactivateKA.isVisible=false;
            frmManageCardsKA.flxReplaceKA.isVisible=false;
            frmManageCardsKA.flxCancelKA.isVisible=true;
            frmManageCardsKA.flxReportKA.isVisible=true;
             frmManageCardsKA.flxMessageLabelKA.isVisible = true;
            frmManageCardsKA.lblCardStatusKA.text = i18n_ReplacementCardInfo;
           }         
}

function updateCardStatus(){
   var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
   var controller = INSTANCE.getFormController("frmCardOperationsKA");
   var navigationObject = new kony.sdk.mvvm.NavigationObject();
  navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
   controller.performAction("saveData",[navigationObject]);
}

function updateCardStatusTablet(){
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var options ={    "access": "online",
                  "objectName": "RBObjects"
                 };
    var headers = {"session_token":kony.retailBanking.globalData.session_token};
    var serviceName = "RBObjects";
    var modelObj = INSTANCE.getModel("Cards",serviceName,options);
    var record = {};
    record["Reason"] = moreLanding.txtAreaReasonKA.text;
    record["Action"] = moreLanding.lblActionKA.text;
    record["cardId"] = moreLanding.lblCardIdKA.text;
    var dataObject = new kony.sdk.dto.DataObject("Cards",record);
    var requestOptions = {"dataObject":dataObject, "headers":headers};
    modelObj.update(requestOptions, updateSuccess, customErrorCallback);
    function updateSuccess(res){
      closeModal("flxCardDetailsKA",cancellationCards);
      closeMoreContainer();
     kony.sdk.mvvm.log.info("success saving record ", res);
    }
    function  customErrorCallback(){
      customErrorCallback();
    }
}