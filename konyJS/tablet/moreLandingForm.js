var greetingName = "John";


// moreLandingPreShow - sets user greeting text
function moreLandingPreShow() {
   var usrObj = kony.retailBanking.globalData.globals.userObj;
  moreLanding.greetingName.text = i18n_Hi +" "+ usrObj.userFirstName;
   moreLanding.lastSignOnLabel.text = i18n_lastSignin +" " + usrObj.lastLoginTime;
 setRightContainer();
 onOrientationChange(moreLanding);
}

//Cancel The Demo Option

function cancelDemoOption()
{
   moreLanding.rightWrapper.setVisibility(true);
      moreLanding.moreTermsAndConditionsWrapper.setVisibility(false);
      moreLanding.morePrivacyPolicyWrapper.setVisibility(false);
      moreLanding.moreFAQsWrapper.setVisibility(false);
      moreLanding.moreForeignExchangeRatesWrapper.setVisibility(false);
      moreLanding.moreInterestRatesWrapper.setVisibility(false);
      moreLanding.moreCheckReorderWrapper.setVisibility(false);
}

///////////////////////////////
//IPAD
//////////////////////////////
function moreResourcesSegmentClickIpad(){ 
  var selectedRow;
  userAgent = kony.os.userAgent();
  retainSelectionOn("moreResourcesSegment");
  if(moreLanding.moreResourcesSegment.selectedRowIndex !== null)
     {
   selectedRow = moreLanding.moreResourcesSegment.selectedRowIndex[1];
  
       switch(selectedRow){
      case 0:
           getAccountTypes();
         break;
      case 1:
           var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
           var controller = INSTANCE.getFormController("frmManageCardsKA");
           var navObject = new kony.sdk.mvvm.NavigationObject();
           navObject.setRequestOptions("segCardsKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
           controller.loadDataAndShowForm(navObject);
      //addRightPanel(frmManageCardsKA.manageCardsWrapper,"manageCardsWrapper");
      
       break;
      case 2:
            fetchManagePayees();
        break;
      case 3:
      	   var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
      	   var controller = INSTANCE.getFormController("frmMyMoneyKA");
           var navObject = new kony.sdk.mvvm.NavigationObject();
           navObject.setRequestOptions("segMyMoneyAccountsListKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
           controller.loadDataAndShowForm(navObject);
        break;
      case 4:
           var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
var controller = INSTANCE.getFormController("moreInterestRates");
var navObject = new kony.sdk.mvvm.NavigationObject();
navObject.setRequestOptions("segInterestRates",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
controller.loadDataAndShowForm(navObject);
      
        break;
      case 5:
            var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
      	   var controller = INSTANCE.getFormController("moreForeignExchangeRates");
           var navObject = new kony.sdk.mvvm.NavigationObject();
           navObject.setRequestOptions("segForeignExchange",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
           controller.loadDataAndShowForm(navObject);
       //addRightPanel(moreForeignExchangeRates.moreForeignExchangeRatesWrapper,"moreForeignExchangeRatesWrapper");
        break;
      case 6:
           
            var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
 		 	var options ={    "access": "online",
                  "objectName": "RBObjects"
               };
  			var serviceName = "RBObjects";
  			var modelObj = INSTANCE.getModel("Informationcontent",serviceName,options);
  			var dataObject = new kony.sdk.dto.DataObject("Informationcontent");
            var serviceOptions = {"dataObject":dataObject,
                       "queryParams" : {"infoType": "termsandconditions"}};
        	modelObj.fetch(serviceOptions, moreinfoContentTandCSuccess, customErrorCallback);
           	break; 
                     
      case 7:
            var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
 		 	var options ={    "access": "online",
                  "objectName": "RBObjects"
               };
  			var serviceName = "RBObjects";
  			var modelObj = INSTANCE.getModel("Informationcontent",serviceName,options);
  			var dataObject = new kony.sdk.dto.DataObject("Informationcontent");
            var serviceOptions = {"dataObject":dataObject,
                       "queryParams" : {"infoType": "privacypolicy"}};
        	modelObj.fetch(serviceOptions, moreinfoContentPrivacyPolicySuccess, customErrorCallback);
        	break;           
           
      case 8:
            var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
 		 	var options ={    "access": "online",
                  "objectName": "RBObjects"
               };
  			var serviceName = "RBObjects";
  			var modelObj = INSTANCE.getModel("Informationcontent",serviceName,options);
  			var dataObject = new kony.sdk.dto.DataObject("Informationcontent");
           var serviceOptions = {"dataObject":dataObject,
                       "queryParams" : {"infoType": "faq"}};
        	modelObj.fetch(serviceOptions, moreinfoContentFAQSuccess, customErrorCallback);
           	break;
           
      case 9:
			   navigateToCheckReOrder();
      //addRightPanel(moreCheckReorder.moreCheckReorderWrapper,"moreCheckReorderWrapper");
         break;
       default:
         moreLanding.show();
    }
   
   retainSelectionOn("moreResourcesSegment"); 
     }
  
}
function moreinfoContentFAQSuccess(response){
moreFAQs.RichTextFAQ.text = response[0].infoContent;
  addRightPanel(moreFAQs.moreFAQsWrapper,"moreFAQsWrapper");
}

function moreinfoContentPrivacyPolicySuccess(response){
morePrivacyPolicy.RichTextPrivacyPolicy.text = response[0].infoContent;
  addRightPanel(morePrivacyPolicy.morePrivacyPolicyWrapper,"morePrivacyPolicyWrapper");
}

function moreinfoContentTandCSuccess(response){
moreTermsAndConditions.RichTextTermsandConditions.text = response[0].infoContent;
  addRightPanel(moreTermsAndConditions.moreTermsAndConditionsWrapper,"moreTermsAndConditionsWrapper");
}

function closemanageCards(){
  manageCards.manageCardsUsWrapper.isVisible(false);
  
}

function showPopUp(){
  alert("entering in tot h");
   manageCards.manageCardsUsWrapper.setVisibility(true);
}


// moreLanding Form close panel
function closeMoreContainer () {
  //closeRightPanel(rightContainer,"rightWrapper");
  
//   CurrForm[rightContainer].animate(
//     kony.ui.createAnimation({100:
//                              {"left": '100%',"stepConfig":{"timingFunction": easeOut}}}),
//     {fillMode: forwards ,duration:duration},
//     {animationEnd: function() {
//       CurrForm.remove(CurrForm[rightContainer]);
//     } });
//   showOriginalPanel("rightWrapper");
//   retainSelectionOff("moreResourcesSegment");
//   rightContainer = "rightWrapper";
    closeRightPanel(rightContainer, "rightWrapper");
    retainSelectionOff("moreResourcesSegment");
}



//retainSelectionToggle
function retainSelectionOn(segmentName){
  CurrForm  = kony.application.getCurrentForm();
  CurrForm[segmentName].retainSelection = true;
}

function retainSelectionOff(segmentName){
  CurrForm  = kony.application.getCurrentForm();
  CurrForm[segmentName].retainSelection = false;
}



