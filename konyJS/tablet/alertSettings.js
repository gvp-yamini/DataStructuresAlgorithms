//var saveofsalerts="";
var prevFlex = " ";
var selectedValue;
var selectedRow;
function formatAlertData(data,AlertsData)
{
  var alertdata = data[AlertsData]; 
  for(var i in alertdata)
  {   
    if(alertdata[i]["isEnabled"]==="true")
    alertdata[i]["isEnabled"] = i18n_onLabel;
	
	else
	alertdata[i]["isEnabled"] = i18n_offLabel;
  }
  return alertdata;
} 
function saveAlertRequired(alertchanged)
{
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var options ={    "access": "online",
                  "objectName": "RBObjects"
               };
    var headers = {"session_token":kony.retailBanking.globalData.session_token};
    var serviceName = "RBObjects";
    var modelObj = INSTANCE.getModel("User",serviceName,options);
    kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("");
    var record = {};
	record["alertsTurnedOn"]=alertchanged;
    var dataObject = new kony.sdk.dto.DataObject("User",record);	 
    var serviceOptions = {"dataObject":dataObject, "headers":headers};
    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
    modelObj.update(serviceOptions, alertSaveSuccess, customErrorCallback);
  function alertSaveSuccess()
  {
   if(alertchanged==="true")
   {
         kony.retailBanking.globalData.globals.settings.alerts =true;
       

    }
	 else{
        kony.retailBanking.globalData.globals.settings.alerts =false;
         } 
  }
}
function closeofalertpanel()
{  if(frmUserSettingsKA.flxMyProfileAlerts.left==="0%")
     {
       MoveAlertFlexBack();
     }
}
function setAlertRequired()
{ 
 
  if(kony.retailBanking.globalData.deviceInfo.isIpad())
    { 
     if(kony.retailBanking.globalData.globals.settings.alerts ===true)
      {
        frmAlertsKA.SwitchAlerts.selectedIndex=0;
        frmAlertsKA.flxSegmentofAlertsKA.setVisibility(true);
      }
   else
      {
         frmAlertsKA.SwitchAlerts.selectedIndex=1;
         frmAlertsKA.flxSegmentofAlertsKA.setVisibility(false);
      }  
    
    }
  else
    {
      if(kony.retailBanking.globalData.globals.settings.alerts ===true)
     { 
       frmAlertsKA.imgAlertsRequired.src="checkbox_selected.png";
       frmAlertsKA.flxSegmentofAlertsKA.setVisibility(true);
     }
   else
   {
   
    frmAlertsKA.imgAlertsRequired.src="checkbox_unselected.png";
    frmAlertsKA.flxSegmentofAlertsKA.setVisibility(false);
   }  
   
    }
 
}
function AlertsSwitchOnclick()
{
  if(frmUserSettingsKA.SwitchAlerts.selectedIndex)
  {
    closeSideFlexByMain();
	MoveAlertSettingsFlexBack();
    saveAlertRequired("false");
    frmUserSettingsKA.flxSegmentofAlertsKA.setVisibility(false);
    closeofalertpanel();
  }
else
  {  
     frmUserSettingsKA.flxSegmentofAlertsKA.setVisibility(true);
	 saveAlertRequired("true");
     populatebackOfAlert();

  }
}
function FetchPopulateAA()
{
 selectedValue = frmUserSettingsKA.AlertsData.selectedItems[0].alertId;
   selectedRow=frmUserSettingsKA.AlertsData.selectedRowIndex[1];
  frmUserSettingsKA.navigationDrawerBkg.setVisibility(false);
  frmUserSettingsKA.rightWrapper.setVisibility(false);
 fetchAccountAlertData(selectedValue);
 
  
}

function fetchAccountAlertData(selectedValue)
{
var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var options ={    "access": "online",
                "objectName": "RBObjects"
               };
  var headers = {"session_token":kony.retailBanking.globalData.session_token};
  var serviceName = "RBObjects";
  var modelObj = INSTANCE.getModel("UserAccountAlerts",serviceName,options);
  var dataObject = new kony.sdk.dto.DataObject("UserAccountAlerts");
  var serviceOptions = {"dataObject":dataObject, "headers":headers,"queryParams":{"alertId":selectedValue}};
  kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("");
  modelObj.fetch(serviceOptions, accountAlertsFetchSuccess, customErrorCallback);
  function accountAlertsFetchSuccess(response)
  {
//var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmAlertsKA");
    var viewModel = controller.getFormModel();
viewModel.setViewAttributeByProperty("lblMinimumBalance", "text",response[0].minimumBalance); 
	viewModel.setViewAttributeByProperty("lblBalanceUpdate", "text",response[0].balanceUpdate); 
	viewModel.setViewAttributeByProperty("lblDebitLimit", "text",response[0].debitLimit); 
	viewModel.setViewAttributeByProperty("lblCreditLimit", "text",response[0].creditLimit); 
	viewModel.setViewAttributeByProperty("lblPaymentDue", "text",response[0].paymentDueReminder);
    viewModel.setViewAttributeByProperty("lblDepositMR", "text",response[0].depositDueReminder); 
     viewModel.setViewAttributeByProperty("lblAccountAlertsHeader", "text",response[0].accountName); 
   viewModel.setViewAttributeByProperty("lblEnableAccountAlert", "text",response[0].accountName); 
   if(kony.retailBanking.globalData.deviceInfo.isIpad())
{ 
  
   if(response[0].successfulTransfer === "true")
   {
     viewModel.setViewAttributeByProperty("switchSucessfultransfer", "selectedIndex",0); 
   }
   else
   {
     viewModel.setViewAttributeByProperty("switchSucessfultransfer", "selectedIndex",1); 
   }
   if(response[0].checkClearance === "true")
   {
     viewModel.setViewAttributeByProperty("switchCheckClearance", "selectedIndex",0); 
   }
   else
   {
     viewModel.setViewAttributeByProperty("switchCheckClearance", "selectedIndex",1); 
   }
   if(response[0].isEnabled === "true")
   {
     viewModel.setViewAttributeByProperty("switchAccAlerts", "selectedIndex",0);
      frmUserSettingsKA.flxAccountAlertsStep1.setVisibility(true);

   }
   else
   {
     viewModel.setViewAttributeByProperty("switchAccAlerts", "selectedIndex",1); 
      frmUserSettingsKA.flxAccountAlertsStep1.setVisibility(false);
   }
}
else
{
   
   if(response[0].successfulTransfer === "true")
   {
     viewModel.setViewAttributeByProperty("imgSucessfulTransfer", "src","checkbox_selected.png"); 
   }
   else
   {
     viewModel.setViewAttributeByProperty("imgSucessfulTransfer",  "src","checkbox_unselected.png"); 
   }
   if(response[0].checkClearance === "true")
   {
     viewModel.setViewAttributeByProperty("imgCheckClearance", "src","checkbox_selected.png"); 
   }
   else
   {
     viewModel.setViewAttributeByProperty("imgCheckClearance",  "src","checkbox_unselected.png"); 
   }
   if(response[0].isEnabled === "true")
   {
     viewModel.setViewAttributeByProperty("imgAccAlerts", "src","checkbox_selected.png"); 
      frmUserSettingsKA.flxAccountAlertsStep1.setVisibility(true);
   }
   else
   {
     viewModel.setViewAttributeByProperty("imgAccAlerts",  "src","checkbox_unselected.png"); 
      frmUserSettingsKA.flxAccountAlertsStep1.setVisibility(false);
   }
}
}
   
    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
}
function AlertSegmentOnclick()
{
     retainSelectionOn("AlertsData");
     retainSelectionOff("segAlerts2");

  // kony.ui.alert(frmUserSettingsKA.AlertsData.selectedRowIndex);
  
  FetchPopulateAA();
 
  
  if(frmUserSettingsKA.flxAccountAlerts)
        								{
          									//frmUserSettingsKA.lblAccountAlertsHeader.text="Account Alerts Savings 2354";								
        								}
        							 else
	                                    {   
                                            if((prevFlex!="flxAccountAlerts")&&(prevFlex!=" "))
											{
                                              closeRightPanel(prevFlex,"rightWrapper");
                                              frmUserSettingsKA.remove(frmUserSettingsKA[prevFlex]);
                                            }
                                           	frmUserSettingsKA.add(frmAlertsKA.flxAccountAlerts);
      										frmUserSettingsKA.flxAccountAlerts.left = "100%";
      										frmUserSettingsKA.flxAccountAlerts.width = leftContainerWidth;
                                          frmUserSettingsKA.lblAccountAlertsHeader.text="Account Alerts Savings 2354";
      										frmUserSettingsKA.flxMyProfileAlerts.animate(
          										kony.ui.createAnimation({100:
          										{"left": "0%", "stepConfig":{"timingFunction": easeOut}}}),
          										{fillMode: forwards, duration: duration},
          										{animationEnd: function() {} });
      										frmUserSettingsKA.flxAccountAlerts.animate(
          										kony.ui.createAnimation({100:
          										{"left": rightContainerWidth, "stepConfig":{"timingFunction": easeOut}}}),
          										{fillMode: forwards, duration: duration},
          										{animationEnd: function() {} }); 
                                          prevFlex="flxAccountAlerts";
                                      	}

  
}

function alertaddRightPanel()
{
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
           var controller = INSTANCE.getFormController("frmAlertsKA");
           var navObject = new kony.sdk.mvvm.NavigationObject();
           navObject.setRequestOptions("AlertsData",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
           controller.loadDataAndShowForm(navObject);

        	//addRightPanel(frmAlertsKA.flxMyProfileAlerts,"flxMyProfileAlerts");
            
}
function AlertAndroidOnClick()
{
  if(frmUserSettingsKA.imgAlertsRequired.src =="checkbox_unselected.png")
    { 
     frmUserSettingsKA.imgAlertsRequired.src="checkbox_selected.png";
	 saveAlertRequired("true");
     frmUserSettingsKA.flxSegmentofAlertsKA.setVisibility(true);
     populatebackOfAlert();

  }
else if(frmUserSettingsKA.imgAlertsRequired.src == "checkbox_selected.png")
  { 
     frmUserSettingsKA.imgAlertsRequired.src="checkbox_unselected.png";
    closeSideFlexByMain();
	MoveAlertSettingsFlexBack();
    saveAlertRequired("false");
    frmUserSettingsKA.flxSegmentofAlertsKA.setVisibility(false);
    closeofalertpanel();
  }
}
function closeSideFlexByMain()
{
  if(frmUserSettingsKA.flxAccountAlerts)
    {
      closeRightPanel("flxAccountAlerts","rightWrapper");
      frmUserSettingsKA.remove(frmUserSettingsKA.flxAccountAlerts);
      retainSelectionOff("AlertsData");

    }
  if(frmUserSettingsKA.flexSecurityAlerts)
    { 
      
     closeRightPanel("flexSecurityAlerts","rightWrapper");
      frmUserSettingsKA.remove(frmUserSettingsKA.flexSecurityAlerts);
         retainSelectionOff("segAlerts2");


    }
  if(frmUserSettingsKA.flxDealAlerts)
    {
     
      closeRightPanel("flxDealAlerts","rightWrapper");
      frmUserSettingsKA.remove(frmUserSettingsKA.flxDealAlerts);
               retainSelectionOff("segAlerts2");

    }
}
function MoveAlertSettingsFlexBack()
{
  frmUserSettingsKA.flxSegmentofAlertsKA.animate(kony.ui.createAnimation({100:
                             {"top": "-20dp", "opacity": 0, "stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: backwards ,duration:0.3},
    {animationEnd: function() {} }); 
  frmUserSettingsKA.rightWrapper.setVisibility(true);
  frmUserSettingsKA.navigationDrawerBkg.setVisibility(true);
 retainSelectionOff("AlertsData");
    retainSelectionOff("segAlerts2");

}

function setChequeValues(data)
{
  if(kony.retailBanking.globalData.deviceInfo.isIpad()){
          
              if(data._raw_response_.form.records[0].bankingIDChange === "true"){
				frmSecurityAlertsKA.switchBankingID.selectedIndex = 0;
              }else{
                frmSecurityAlertsKA.switchBankingID.selectedIndex = 1;
              }
            
            if(data._raw_response_.form.records[0].passwordChange === "true"){
				frmSecurityAlertsKA.switchpasschange.selectedIndex = 0;
              }else{
                frmSecurityAlertsKA.switchpasschange.selectedIndex = 1;
              }
            if(data._raw_response_.form.records[0].passwordExpired === "true"){
				frmSecurityAlertsKA.switchpassexp.selectedIndex = 0;
              }else{
                frmSecurityAlertsKA.switchpassexp.selectedIndex = 1;
              }
            if(data._raw_response_.form.records[0].communicationChange === "true"){
				frmSecurityAlertsKA.switchcommchanged.selectedIndex = 0;
              }else{
                frmSecurityAlertsKA.switchcommchanged.selectedIndex = 1;
              }
            if(data._raw_response_.form.records[0].newPayeeAdded === "true"){
				frmSecurityAlertsKA.switchnewpayadd.selectedIndex = 0;
              }else{
                frmSecurityAlertsKA.switchnewpayadd.selectedIndex = 1;
              }
            if(data._raw_response_.form.records[0].payeeDetailsUpdated === "true"){
				frmSecurityAlertsKA.switchpaydetailsupdate.selectedIndex = 0;
              }else{
                frmSecurityAlertsKA.switchpaydetailsupdate.selectedIndex = 1;
              }
     if(data._raw_response_.form.records[0].newDealsAvailable === "true"){
				frmSecurityAlertsKA.switchnewdeals.selectedIndex = 0;
              }else{
                frmSecurityAlertsKA.switchnewdeals.selectedIndex = 1;
              }
     if(data._raw_response_.form.records[0].dealsExpiring === "true"){
				frmSecurityAlertsKA.switchdealexp.selectedIndex = 0;
              }else{
                frmSecurityAlertsKA.switchdealexp.selectedIndex = 1;
              }
            
          }else{
             if(data._raw_response_.form.records[0].bankingIDChange === "true"){
				frmSecurityAlertsKA.imgBankingIDchange.src="checkbox_selected.png";
              }else{
               frmSecurityAlertsKA.imgBankingIDchange.src="checkbox_unselected.png";
              }
            
            if(data._raw_response_.form.records[0].passwordChange === "true"){
				frmSecurityAlertsKA.imgPasswordChange.src="checkbox_selected.png";
              }else{
                frmSecurityAlertsKA.imgPasswordChange.src="checkbox_unselected.png";
              }
            if(data._raw_response_.form.records[0].passwordExpired === "true"){
				frmSecurityAlertsKA.imgPasswordExpired.src="checkbox_selected.png";
              }else{
                frmSecurityAlertsKA.imgPasswordExpired.src="checkbox_unselected.png";
              }
            if(data._raw_response_.form.records[0].communicationChange === "true"){
				frmSecurityAlertsKA.imgCommunicationChange.src="checkbox_selected.png";
              }else{
               frmSecurityAlertsKA.imgCommunicationChange.src="checkbox_unselected.png";
              }
            if(data._raw_response_.form.records[0].newPayeeAdded === "true"){
				frmSecurityAlertsKA.imgNewPayeeAdded.src="checkbox_selected.png";
              }else{
                frmSecurityAlertsKA.imgNewPayeeAdded.src="checkbox_unselected.png";
              }
            if(data._raw_response_.form.records[0].payeeDetailsUpdated === "true"){
				frmSecurityAlertsKA.imgPayeeDetailsUpdated.src="checkbox_selected.png";
              }else{
                frmSecurityAlertsKA.imgPayeeDetailsUpdated.src="checkbox_unselected.png";
              }
            if(data._raw_response_.form.records[0].newDealsAvailable === "true"){
				frmSecurityAlertsKA.imgNewDeals.src="checkbox_selected.png";
              }else{
                frmSecurityAlertsKA.imgNewDeals.src="checkbox_unselected.png";
              }
            if(data._raw_response_.form.records[0].dealsExpiring === "true"){
				frmSecurityAlertsKA.imgDealExpiring.src="checkbox_selected.png";
              }else{
                frmSecurityAlertsKA.imgDealExpiring.src="checkbox_unselected.png";
              }
            
            
          }
}
function populatebackOfAlert()
{
  frmUserSettingsKA.flxSegmentofAlertsKA.animate(
    kony.ui.createAnimation({100:
                             {"top": "200dp", "opacity": 1, "stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration:0.3},
    {animationEnd: function() {} }); 
}
function MoveAlertFlexBack()
{
  frmUserSettingsKA.flxMyProfileAlerts.animate(
          										kony.ui.createAnimation({100:
          										{"left": leftContainerWidth, "stepConfig":{"timingFunction": easeOut}}}),
          										{fillMode: forwards, duration: duration},
          										{animationEnd: function() {} });
  frmUserSettingsKA.rightWrapper.setVisibility(true);
  frmUserSettingsKA.navigationDrawerBkg.setVisibility(true);
 retainSelectionOff("AlertsData");
    retainSelectionOff("segAlerts2");
}

function segAlerts2OnClick()
{
selectedValue = frmUserSettingsKA.segAlerts2.selectedItems[0].lblSettingsNameKA;
frmUserSettingsKA.navigationDrawerBkg.setVisibility(false);
frmUserSettingsKA.rightWrapper.setVisibility(false);
switch(selectedValue)
 {
 case "Security Alerts"   	: if(frmUserSettingsKA.flexSecurityAlerts)
        								{
          									
        								}
        							else
	                                    {
                                          if((prevFlex!="flexSecurityAlerts")&&(prevFlex!=" "))
											{
                                              closeRightPanel(prevFlex,"rightWrapper");
                                              frmUserSettingsKA.remove(frmUserSettingsKA[prevFlex]);
                                            }
                                           	frmUserSettingsKA.add(frmSecurityAlertsKA.flexSecurityAlerts);
                                           // frmUserSettingsKA.add(frmSecurityAlertsKA.flxAlertIDlabel);

                                          
      										frmUserSettingsKA.flexSecurityAlerts.left = "100%";
      										frmUserSettingsKA.flexSecurityAlerts.width = leftContainerWidth;
      										frmUserSettingsKA.flxMyProfileAlerts.animate(
          										kony.ui.createAnimation({100:
          										{"left": "0%", "stepConfig":{"timingFunction": easeOut}}}),
          										{fillMode: forwards, duration: duration},
          										{animationEnd: function() {} });
      										frmUserSettingsKA.flexSecurityAlerts.animate(
          										kony.ui.createAnimation({100:
          										{"left": rightContainerWidth, "stepConfig":{"timingFunction": easeOut}}}),
          										{fillMode: forwards, duration: duration},
          										{animationEnd: function() {} }); 
                                          prevFlex="flexSecurityAlerts";
                                      	}
        							break;
      case "Deals Alerts"		: if(frmUserSettingsKA.flxDealAlerts)
        								{
          									
        								}
        							else
	                                    {
                                          if((prevFlex!="flxDealAlerts")&&(prevFlex!=" "))
											{
                                              closeRightPanel(prevFlex,"rightWrapper");
                                              frmUserSettingsKA.remove(frmUserSettingsKA[prevFlex]);
                                            }
                                           	frmUserSettingsKA.add(frmSecurityAlertsKA.flxDealAlerts);
                                         //   frmUserSettingsKA.add(frmSecurityAlertsKA.flxAlertIDlabel);

      										frmUserSettingsKA.flxDealAlerts.left = "100%";
      										frmUserSettingsKA.flxDealAlerts.width = leftContainerWidth;
      										frmUserSettingsKA.flxMyProfileAlerts.animate(
          										kony.ui.createAnimation({100:
          										{"left": "0%", "stepConfig":{"timingFunction": easeOut}}}),
          										{fillMode: forwards, duration: duration},
          										{animationEnd: function() {} });
      										frmUserSettingsKA.flxDealAlerts.animate(
          										kony.ui.createAnimation({100:
          										{"left": rightContainerWidth, "stepConfig":{"timingFunction": easeOut}}}),
          										{fillMode: forwards, duration: duration},
          										{animationEnd: function() {} }); 
                                          prevFlex="flxDealAlerts";
                                      	}
        							break;
        default :
    }
   retainSelectionOn("segAlerts2");
  
}

function onClickOfSegalerts2()
{   retainSelectionOn("segAlerts2");
 retainSelectionOff("AlertsData");


  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
           var controller = INSTANCE.getFormController("frmSecurityAlertsKA");
           var navObject = new kony.sdk.mvvm.NavigationObject();
           navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
           controller.loadDataAndShowForm(navObject);
}
function updateSecurityAlertStatus(alertType){
  if(kony.retailBanking.globalData.deviceInfo.isIpad()){
      if(alertType === "bankingIdChange"){
         if(frmUserSettingsKA.switchBankingID.selectedIndex===1)
        {
          frmUserSettingsKA.lblBankingIdChange.text = "false";
        }else {
            frmUserSettingsKA.lblBankingIdChange.text = "true";
          }
      }else if(alertType === "passwordChange"){
          if(frmUserSettingsKA.switchpasschange.selectedIndex===1)
        {
          frmUserSettingsKA.lblPasswordChange.text = "false";
        }else {
            frmUserSettingsKA.lblPasswordChange.text = "true";
          }
      }else if(alertType === "passwordExpired"){
          if(frmUserSettingsKA.switchpassexp.selectedIndex===1)
        {
          frmUserSettingsKA.lblPasswordExpired.text = "false";
        }else {
            frmUserSettingsKA.lblPasswordExpired.text = "true";
          }
      }else if(alertType === "addressPhoneChanged"){
          if(frmUserSettingsKA.switchcommchanged.selectedIndex===1)
        {
          frmUserSettingsKA.lblAddressPhoneChange.text = "false";
        }else {
            frmUserSettingsKA.lblAddressPhoneChange.text = "true";
          }
      }else if(alertType === "newPayeeAdded"){
          if(frmUserSettingsKA.switchnewpayadd.selectedIndex===1)
        {
          frmUserSettingsKA.lbNewPayeeAdded.text = "false";
        }else {
            frmUserSettingsKA.lbNewPayeeAdded.text = "true";
          }
      }else{
          if(frmUserSettingsKA.switchpaydetailsupdate.selectedIndex===1)
        {
          frmUserSettingsKA.lblPayeeDetailsUpdated.text = "false";
        }else {
            frmUserSettingsKA.lblPayeeDetailsUpdated.text = "true";
          }
      }
  }
  else{
     if(alertType === "bankingIdChange"){
        if(frmUserSettingsKA.imgBankingIDchange.src=="checkbox_unselected.png")
        {
            frmUserSettingsKA.imgBankingIDchange.src="checkbox_selected.png";
            frmUserSettingsKA.lblBankingIdChange.text = "true";
        }else {
             frmUserSettingsKA.imgBankingIDchange.src="checkbox_unselected.png";
             frmUserSettingsKA.lblBankingIdChange.text = "false";
        }
    }else if(alertType === "passwordChange"){
         if(frmUserSettingsKA.imgPasswordChange.src=="checkbox_unselected.png")
        {
            frmUserSettingsKA.imgPasswordChange.src="checkbox_selected.png";
            frmUserSettingsKA.lblPasswordChange.text = "true";
        }else {
             frmUserSettingsKA.imgPasswordChange.src="checkbox_unselected.png";
             frmUserSettingsKA.lblPasswordChange.text = "false";
        }
    }else if(alertType === "passwordExpired"){
         if(frmUserSettingsKA.imgPasswordExpired.src=="checkbox_unselected.png")
        {
            frmUserSettingsKA.imgPasswordExpired.src="checkbox_selected.png";
            frmUserSettingsKA.lblPasswordExpired.text = "true";
        }else {
             frmUserSettingsKA.imgPasswordExpired.src="checkbox_unselected.png";
             frmUserSettingsKA.lblPasswordExpired.text = "false";
        }
    }else if(alertType === "addressPhoneChanged"){
          if(frmUserSettingsKA.imgCommunicationChange.src=="checkbox_unselected.png")
        {
            frmUserSettingsKA.imgCommunicationChange.src="checkbox_selected.png";
            frmUserSettingsKA.lblAddressPhoneChange.text = "true";
        }else {
             frmUserSettingsKA.imgCommunicationChange.src="checkbox_unselected.png";
             frmUserSettingsKA.lblAddressPhoneChange.text = "false";
        }
    }else if(alertType === "newPayeeAdded"){
         if(frmUserSettingsKA.imgNewPayeeAdded.src=="checkbox_unselected.png")
        {
            frmUserSettingsKA.imgNewPayeeAdded.src="checkbox_selected.png";
            frmUserSettingsKA.lbNewPayeeAdded.text = "true";
        }else {
             frmUserSettingsKA.imgNewPayeeAdded.src="checkbox_unselected.png";
             frmUserSettingsKA.lbNewPayeeAdded.text = "false";
        }
    }else{
         if(frmUserSettingsKA.imgPayeeDetailsUpdated.src=="checkbox_unselected.png")
        {
            frmUserSettingsKA.imgPayeeDetailsUpdated.src="checkbox_selected.png";
            frmUserSettingsKA.lblPayeeDetailsUpdated.text = "true";
        }else {
             frmUserSettingsKA.imgPayeeDetailsUpdated.src="checkbox_unselected.png";
             frmUserSettingsKA.lblPayeeDetailsUpdated.text = "false";
        }
    }

  }
  
  }


function updateDealsAlertStatus(alertType){
  if(kony.retailBanking.globalData.deviceInfo.isIpad()){
      if(alertType === "newDealsAvailable"){
         if(frmUserSettingsKA.switchnewdeals.selectedIndex===1)
        {
          frmUserSettingsKA.lblNewDeals.text = "false";
        }else {
            frmUserSettingsKA.lblNewDeals.text = "true";
          }
      }else {
          if(frmUserSettingsKA.switchdealexp.selectedIndex===1)
        {
          frmUserSettingsKA.lblDealsExpiring.text = "false";
        }else {
            frmUserSettingsKA.lblDealsExpiring.text = "true";
          }
      }
  }else{
     if(alertType === "newDealsAvailable"){
        if(frmUserSettingsKA.imgNewDeals.src=="checkbox_unselected.png")
        {
            frmUserSettingsKA.imgNewDeals.src="checkbox_selected.png";
            frmUserSettingsKA.lblNewDeals.text = "true";
        }else {
             frmUserSettingsKA.imgNewDeals.src="checkbox_unselected.png";
             frmUserSettingsKA.lblNewDeals.text = "false";
        }
    }else{
         if(frmUserSettingsKA.imgDealExpiring.src=="checkbox_unselected.png")
        {
            frmUserSettingsKA.imgDealExpiring.src="checkbox_selected.png";
            frmUserSettingsKA.lblDealsExpiring.text = "true";
        }else {
             frmUserSettingsKA.imgDealExpiring.src="checkbox_unselected.png";
             frmUserSettingsKA.lblDealsExpiring.text = "false";
        }
    }

  }
    

}
  
function OnClickSaveOfSecurityAlerts()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
		  var controller = INSTANCE.getFormController("frmSecurityAlertsKA");
		  var navigationObject = new kony.sdk.mvvm.NavigationObject();
    	  navigationObject.setDataModel(null, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
		  navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
		  controller.performAction("saveData",[navigationObject]);

}
function setDataatRowAlert(rowValue,rowindex)
{
  var alertsegData=frmUserSettingsKA.AlertsData.data;
  alertsegData[rowindex]["isEnabled"]=rowValue;
   frmUserSettingsKA.AlertsData.setData(alertsegData);
}

function saveAAStatus(statusflag,success)
{
    var scopeObj = this;
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var options ={    "access": "online",
                  "objectName": "RBObjects"
                 };
    var headers = {"session_token":kony.retailBanking.globalData.session_token};
    var serviceName = "RBObjects";
    var modelObj = INSTANCE.getModel("UserAccountAlerts",serviceName,options);
    var record = {};
    record["isEnabled"] =statusflag;
    record["alertId"] = selectedValue;
    var dataObject = new kony.sdk.dto.DataObject("UserAccountAlerts",record);
    var requestOptions = {"dataObject":dataObject, "headers":headers,};
	modelObj.update(requestOptions, updateAASuccess, customErrorCallback);
                function updateAASuccess(){
                                          
                  changeStatusinSeg(statusflag);
                  success.call(this);
                                          }
}
function changeStatusinSeg(values)
{
  if(values==="true")
    {
     setDataatRowAlert(i18n_onLabel, selectedRow);      
      
    }
  else
    {
     setDataatRowAlert(i18n_offLabel, selectedRow);      
    }
}

function onClickSwitchAccAlerts()
{
  
  if(frmUserSettingsKA.switchAccAlerts.selectedIndex===1)
  {
	MoveAccountAlertsStep1FlexBack();
    frmUserSettingsKA.flxAccountAlertsStep1.setVisibility(false);
    saveAAStatus("false",success);
  }
else
  {  
     frmUserSettingsKA.flxAccountAlertsStep1.setVisibility(true);
     populatebackOfAccountAlertsStep1();
         saveAAStatus("true",success);


  }
  retainSelectionOn("AlertsData");
  function success(){
  frmUserSettingsKA.AlertsData.selectedIndex = [0,selectedRow];

  }
}
function MoveAccountAlertsStep1FlexBack()
{
  frmUserSettingsKA.flxAccountAlertsStep1.animate(kony.ui.createAnimation({100:
                             {"top": "-20dp", "opacity": 0, "stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: backwards ,duration:0.3},
    {animationEnd: function() {} }); 
  

}
function populatebackOfAccountAlertsStep1()
{
  frmUserSettingsKA.flxAccountAlertsStep1.animate(
    kony.ui.createAnimation({100:
                             {"top": "0dp", "opacity": 1, "stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration:0.3},
    {animationEnd: function() {} }); 
}

function OnClickAndroidAccAlerts()
{
  if(frmUserSettingsKA.imgAccAlerts.src =="checkbox_unselected.png")
    { 
     frmUserSettingsKA.imgAccAlerts.src="checkbox_selected.png";
     frmUserSettingsKA.flxAccountAlertsStep1.setVisibility(true);
     populatebackOfAccountAlertsStep1();
      saveAAStatus("true" ,success);

  }
else if(frmUserSettingsKA.imgAccAlerts.src == "checkbox_selected.png")
  { 
    frmUserSettingsKA.imgAccAlerts.src="checkbox_unselected.png";
	MoveAccountAlertsStep1FlexBack();
     frmUserSettingsKA.flxAccountAlertsStep1.setVisibility(false);
        saveAAStatus("false" ,success);

  }
  function success(){
  frmUserSettingsKA.AlertsData.selectedIndex = [0,selectedRow];

  }
}
function accountNameSave1(updateField,Fetchedvalue)
{
  var scopeObj = this;
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var options ={    "access": "online",
                "objectName": "RBObjects"
               };
  var headers = {"session_token":kony.retailBanking.globalData.session_token};
  var serviceName = "RBObjects";
  var modelObj = INSTANCE.getModel("UserAccountAlerts",serviceName,options);
  var record = {};
  record[updateField] = Fetchedvalue;
  record["alertId"] = selectedValue;

  //record["accountID"] = accountId;
  var dataObject = new kony.sdk.dto.DataObject("UserAccountAlerts",record);
  var requestOptions = {"dataObject":dataObject, "headers":headers,};

  modelObj.update(requestOptions, updateSuccess, customErrorCallback);
  function updateSuccess(){
    closeModal("flxMyProfilePopUp",frmUserSettingsKA); 
   fetchAccountAlertData(selectedValue);

    // scopeObj.getController().fetchData();
    // kony.sdk.mvvm.log.info("success saving record ", res);
  }
}
function accountAmountUpdate()
{

  var operationType = frmAlertsKA.flxMyProfilePopUp.lblPopUpHeader.text;
  if(operationType ==="Minimum Balance"){
    accountNameSave1("minimumBalance",frmUserSettingsKA.TbxMyProfilepopup.text);
  }else if(operationType ==="Debit Limit"){
    accountNameSave1("debitLimit",frmUserSettingsKA.TbxMyProfilepopup.text);
  } else{
    accountNameSave1("creditLimit",frmUserSettingsKA.TbxMyProfilepopup.text);
  }
}


function accountNameSave2(updateField,Fetchedvalue)
{

  var scopeObj = this;
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var options ={    "access": "online",
                "objectName": "RBObjects"
               };
  var headers = {"session_token":kony.retailBanking.globalData.session_token};
  var serviceName = "RBObjects";
  var modelObj = INSTANCE.getModel("UserAccountAlerts",serviceName,options);
  var record = {};
  record[updateField] = Fetchedvalue;
  record["alertId"] = selectedValue;

  //record["accountID"] = accountId;
  var dataObject = new kony.sdk.dto.DataObject("UserAccountAlerts",record);
  var requestOptions = {"dataObject":dataObject, "headers":headers,};

  modelObj.update(requestOptions, updateSuccess, customErrorCallback);
  function updateSuccess(){
    
    closeModal("flxBalanceUpdatePicker",frmUserSettingsKA); 
	fetchAccountAlertData(selectedValue);
    

    // scopeObj.getController().fetchData();
    // kony.sdk.mvvm.log.info("success saving record ", res);
  }   
}

function fetchTimePeriod()
{
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var options = {
        "access": "online",
        "objectName": "RBObjects"
    };
    var headers = {
        "session_token": kony.retailBanking.globalData.session_token
    };
    var serviceName = "RBObjects";
    var modelObj = INSTANCE.getModel("TimePeriod", serviceName, options);
    var dataObject = new kony.sdk.dto.DataObject("TimePeriod");
    var serviceOptions = {
        "dataObject": dataObject,
        "headers": headers
    };
    modelObj.fetch(serviceOptions, dataSuccessFetchAccount, dataFailureFetchAccount);

    function dataSuccessFetchAccount(response) {
      var masterData = [];
  var masterDataElement = [];
    for (var i = 0; i < response.length; i++) 
  {
         masterDataElement = [];
         var key = response[i]["timePeriodId"];
         var value = response[i]["description"];                            
         masterDataElement.push(key);
         masterDataElement.push(value);
         masterData.push(masterDataElement);
  }
  frmAlertsKA.lbxBalanceUpdate.masterData=masterData;
   frmAlertsKA.lbxRemainder.masterData=masterData;
   }
    function dataFailureFetchAccount(err) {
        kony.print("err" + err);
    
}
}
  function accountNameSave3(updateField,Fetchedvalue)
{

  var scopeObj = this;
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var options ={    "access": "online",
                "objectName": "RBObjects"
               };
  var headers = {"session_token":kony.retailBanking.globalData.session_token};
  var serviceName = "RBObjects";
  var modelObj = INSTANCE.getModel("UserAccountAlerts",serviceName,options);
  var record = {};
  record[updateField] = Fetchedvalue;
  record["alertId"] = selectedValue;

  //record["accountID"] = accountId;
  var dataObject = new kony.sdk.dto.DataObject("UserAccountAlerts",record);
  var requestOptions = {"dataObject":dataObject, "headers":headers,};

  modelObj.update(requestOptions, updateSuccess, customErrorCallback);
  function updateSuccess(){
    
    closeModal("flxDueRemainderPicker",frmUserSettingsKA); 
	fetchAccountAlertData(selectedValue);
   

    // scopeObj.getController().fetchData();
    // kony.sdk.mvvm.log.info("success saving record ", res);
  } 
}


function accountAlertsUpdate(fieldName)
{ var fieldValue;
  var scopeObj = this;
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var options ={    "access": "online",
                "objectName": "RBObjects"
               };
  var headers = {"session_token":kony.retailBanking.globalData.session_token};
  var serviceName = "RBObjects";
  var modelObj = INSTANCE.getModel("UserAccountAlerts",serviceName,options);
  var record = {};
   if(fieldName==="successfulTransfer")
   {
     if(kony.retailBanking.globalData.deviceInfo.isIpad())
	 {
	   if(frmUserSettingsKA.switchSucessfultransfer.selectedIndex===0)
	   {
	    fieldValue="true";
	   }
	 
	 else
	 {
	   fieldValue="false";
	 }
	}
	 else
	 {
	  if(frmUserSettingsKA.imgSucessfulTransfer.src==="checkbox_selected.png")
	  {
	     frmUserSettingsKA.imgSucessfulTransfer.src="checkbox_unselected.png";
		 fieldValue="false";
	  }
	  else
	  {
	   frmUserSettingsKA.imgSucessfulTransfer.src="checkbox_selected.png";
	   fieldValue="true";
	  }
	 }
   }
   else if(fieldName==="checkClearance")
   {
    if(kony.retailBanking.globalData.deviceInfo.isIpad())
	 {
	  if(frmUserSettingsKA.switchCheckClearance.selectedIndex===0)
	  {
	    fieldValue="true";
	  }
	  else
	  {
	    fieldValue="false";
	  }
	 }
	 else
	 {
	   if(frmUserSettingsKA.imgCheckClearance.src==="checkbox_selected.png")
	   {
	     frmUserSettingsKA.imgCheckClearance.src="checkbox_unselected.png";
		 fieldValue="false";
	   }
	   else
	   {
	      frmUserSettingsKA.imgCheckClearance.src="checkbox_selected.png";
		 fieldValue="true";
	   }
	 }
    }
	
  record[fieldName] = fieldValue;
  record["alertId"] = selectedValue;
  var dataObject = new kony.sdk.dto.DataObject("UserAccountAlerts",record);
  var requestOptions = {"dataObject":dataObject, "headers":headers,};
  modelObj.update(requestOptions, updateAlertFlagSuccess, customErrorCallback);
  function updateAlertFlagSuccess()
  {
     kony.sdk.mvvm.log.info("sucess");
  }
}