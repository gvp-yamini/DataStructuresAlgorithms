//Type your code here
var cardsList;
var selectedCard=0;
function loadAndShowManageCards()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmCardsListKA");
  var navigationObject = new kony.sdk.mvvm.NavigationObject();
  navigationObject.setRequestOptions("segCardsListKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  controller.performAction("navigateTo",["frmCardsListKA",navigationObject]);
}

function onCardsClick(selectedRow){  
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmCardDetailsKA");
  var navigationObject = new kony.sdk.mvvm.NavigationObject();
  var datamodelflxAddressKA = new kony.sdk.mvvm.DataModel();
  navigationObject.setDataModel(null,kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
  navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
controller.performAction("navigateTo",["frmCardDetailsKA",navigationObject]);
  
   frmCardDetailsKA.txtReasonKA.text = "";
  frmCardDetailsKA.prevBtn.isVisible=true;
  frmCardDetailsKA.nxtBtn.isVisible=false;
  
  
  if(selectedRow==0)
    {
    frmCardDetailsKA.prevBtn.skin="SknbuttonKA";
    frmCardDetailsKA.prevBtn.setEnabled(false);
    }
  else
    {
    frmCardDetailsKA.prevBtn.skin="CopyslButtonGlossBlue0a94d1a3589d348";
    frmCardDetailsKA.prevBtn.setEnabled(true);
    }
  if(selectedRow==(cardsList.length)-1){
    frmCardDetailsKA.nxtBtn.skin="SknbuttonKA";
    frmCardDetailsKA.nxtBtn.setEnabled(false);
  }
  else  
  { 
    frmCardDetailsKA.nxtBtn.skin="CopyslButtonGlossBlue0a94d1a3589d348";
    frmCardDetailsKA.nxtBtn.setEnabled(true);
  }
  frmCardDetailsKA.cardHolderName.text=cardsList[selectedRow].cardHolderName
  frmCardDetailsKA.cardNumber.text=cardsList[selectedRow].cardNumber
  frmCardDetailsKA.CardType.text= cardsList[selectedRow].cardType;
if (cardsList[selectedRow].cardType == "Credit Card") {
        frmCardDetailsKA.cardImage.src = "card_gold.png"
    } else {
        frmCardDetailsKA.cardImage.src = "card_silver.png"
    }
  frmCardDetailsKA.validThru.text=cardsList[selectedRow].expiryDate;
  frmCardDetailsKA.cardId.text=cardsList[selectedRow].cardId;
  
  frmCardDetailsKA.flxButtonsKA.setVisibility(true);
  frmCardDetailsKA.flxContinueKA.setVisibility(false);
  frmCardDetailsKA.flxDetailsKA.setVisibility(false);
  
  frmCardDetailsKA.nxtBtn.isVisible=true;
  frmCardDetailsKA.prevBtn.isVisible=true;
  showButtons(cardsList[selectedRow].cardStatus);
  frmCardDetailsKA.forceLayout();

   
}
function showButtons(cardStatus){
  		if(cardStatus==="Active")
            {
              frmCardDetailsKA.btnActivateKA.text="DEACTIVATE";
              frmCardDetailsKA.changepinKA.isVisible=true;
              frmCardDetailsKA.btnActivateKA.isVisible=true;
              frmCardDetailsKA.replacecardKA.isVisible=true;
              frmCardDetailsKA.cancelcardKA.isVisible=true;
              frmCardDetailsKA.reportStolenKA.isVisible=true;
              frmCardDetailsKA.lblCardStatusKA.isVisible = false;
            }
         else if(cardStatus==="Inactive")
          {
            frmCardDetailsKA.btnActivateKA.text="ACTIVATE";
          	frmCardDetailsKA.changepinKA.isVisible=false;
            frmCardDetailsKA.btnActivateKA.isVisible=true;
            frmCardDetailsKA.replacecardKA.isVisible=false;
            frmCardDetailsKA.cancelcardKA.isVisible=false;
            frmCardDetailsKA.reportStolenKA.isVisible=false;
            frmCardDetailsKA.lblCardStatusKA.isVisible = true;
            frmCardDetailsKA.lblCardStatusKA.text = "You have Deactivated this Card.";
          }
          else if(cardStatus==="Cancelled")
          {
            
          	frmCardDetailsKA.changepinKA.isVisible=false;
            frmCardDetailsKA.btnActivateKA.isVisible=false;
            frmCardDetailsKA.replacecardKA.isVisible=false;
            frmCardDetailsKA.cancelcardKA.isVisible=false;
            frmCardDetailsKA.reportStolenKA.isVisible=false;
            frmCardDetailsKA.lblCardStatusKA.isVisible = true;
            frmCardDetailsKA.lblCardStatusKA.text = "You have Cancelled this Card.";
          }
          else if(cardStatus==="Lost")
          {
            
          	frmCardDetailsKA.changepinKA.isVisible=false;
            frmCardDetailsKA.btnActivateKA.isVisible=false;
            frmCardDetailsKA.replacecardKA.isVisible=false;
            frmCardDetailsKA.cancelcardKA.isVisible=false;
            frmCardDetailsKA.reportStolenKA.isVisible=false;
            frmCardDetailsKA.lblCardStatusKA.isVisible = true;
            frmCardDetailsKA.lblCardStatusKA.text = "You have reported Lost/Stolen.";
          }
          else if(cardStatus==="Replaced")
          {
          	frmCardDetailsKA.changepinKA.isVisible=true;
            frmCardDetailsKA.btnActivateKA.isVisible=false;
            frmCardDetailsKA.replacecardKA.isVisible=false;
            frmCardDetailsKA.cancelcardKA.isVisible=true;
            frmCardDetailsKA.reportStolenKA.isVisible=true;
            frmCardDetailsKA.lblCardStatusKA.isVisible = true;
            frmCardDetailsKA.lblCardStatusKA.text = "You have Requested for Replacement.";
           }
  frmCardDetailsKA.flxBottomButtons.forceLayout();
  frmCardDetailsKA.flxButtonsKA.forceLayout();
  //frmCardsDetailsKA.flxContainerKA.forceLayout();
}

function CardOptionClick(action){
  frmCardDetailsKA.lblActionKA.text=action;
  frmCardDetailsKA.txtReasonKA.text = "";
  frmCardDetailsKA.flxButtonsKA.setVisibility(false);
  frmCardDetailsKA.flxDetailsKA.setVisibility(true);
  frmCardDetailsKA.flxContinueKA.setVisibility(false);
  
  frmCardDetailsKA.nxtBtn.isVisible=false;
  frmCardDetailsKA.prevBtn.isVisible=false;
  //frmCardsDetailsKA.flxContainerKA.forceLayout();
   frmCardDetailsKA.flxBottomButtons.forceLayout();
  
  if(action === "PinChange")
    frmCardDetailsKA.lblDescKA.text = "Requesting PIN Change";
  else if(action === "Cancel")
    frmCardDetailsKA.lblDescKA.text = "Cancelling "+frmCardDetailsKA.CardType.text;
   else if(action === "Lost")
    frmCardDetailsKA.lblDescKA.text = "Stolen/Lost "+ frmCardDetailsKA.CardType.text;
  else if(action === "Replace")
    frmCardDetailsKA.lblDescKA.text = "Replacing "+ frmCardDetailsKA.CardType.text; 
  else if(action === "Deactivate")
    frmCardDetailsKA.lblDescKA.text = "Deactivating " + frmCardDetailsKA.CardType.text;  
  else if(action === "Activate")
    frmCardDetailsKA.lblDescKA.text = "Activating " + frmCardDetailsKA.CardType.text; 
  
}
function UpdateCard(){
   var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
   var controller = INSTANCE.getFormController("frmCardDetailsKA");
   var navigationObject = new kony.sdk.mvvm.NavigationObject();
   navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
   controller.performAction("saveData",[navigationObject]); 
}

function UpdateSuccess(){
  
  frmCardDetailsKA.flxContinueKA.setVisibility(true);
  frmCardDetailsKA.flxButtonsKA.setVisibility(false);
  frmCardDetailsKA.flxDetailsKA.setVisibility(false);
  var action=frmCardDetailsKA.lblActionKA.text;
  if(action=="PinChange")
    frmCardDetailsKA.flxContinueKA.lblResponseKA.text="Request for PIN change is confirmed. Please check your mail for new PIN.";
  else if(action === "Cancel")
    frmCardDetailsKA.flxContinueKA.lblResponseKA.text="Your card is Cancelled.";
  else if(action === "Lost")
    frmCardDetailsKA.flxContinueKA.lblResponseKA.text="You have reported for Lost/Stolen Card.You can also call the custmer care and report the same.";
  else if(action === "Replace")
    frmCardDetailsKA.flxContinueKA.lblResponseKA.text="Request for replacement is confirmed. We will get back to you in "+kony.retailBanking.globalData.applicationProperties.appProperties.businessDays+"  working days";
  else if(action === "Deactivate")
    frmCardDetailsKA.flxContinueKA.lblResponseKA.text="Your card is deactivated.";
  else if(action === "Activate") 
  frmCardDetailsKA.flxContinueKA.lblResponseKA.text="Your card is activated.";
  frmCardDetailsKA.flxContinueKA.forceLayout();
  frmCardDetailsKA.flxContainerKA.forceLayout();
  frmCardDetailsKA.forceLayout();
  
  
}