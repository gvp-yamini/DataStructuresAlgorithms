function clearRightContainerSettings()
{
  if(frmUserSettingsKA["accountPreviewWrapper"] !== null)
    frmUserSettingsKA.remove(frmUserSettingsKA["accountPreviewWrapper"]);
  
 if(frmUserSettingsKA["flxSettingsMyProfileWrapper"] !== null)
    frmUserSettingsKA.remove(frmUserSettingsKA["flxSettingsMyProfileWrapper"]);
  
  if(frmUserSettingsKA["passwordWrapper"] !== null)
    frmUserSettingsKA.remove(frmUserSettingsKA["passwordWrapper"]);
 
  if(frmUserSettingsKA["touchIDWrapper"] !== null)
    frmUserSettingsKA.remove(frmUserSettingsKA["touchIDWrapper"]);
  
  if(frmUserSettingsKA["flxDefaultAccountsForTransfers"] !== null)
    frmUserSettingsKA.remove(frmUserSettingsKA["flxDefaultAccountsForTransfers"]);
  
   if(frmUserSettingsKA["deviceRegistrationWrapperRight"] !== null)
    frmUserSettingsKA.remove(frmUserSettingsKA["flxDevRegOptions"]);
  
   if(frmUserSettingsKA["DeviceDeRegistrationWrapper"] !== null)
    frmUserSettingsKA.remove(frmUserSettingsKA["DeviceDeRegistrationWrapper"]);
  
   if(frmUserSettingsKA["PinActivationWrapperRight"] !== null)
    frmUserSettingsKA.remove(frmUserSettingsKA["PinActivationWrapperRight"]);
  
   if(frmUserSettingsKA["inCorrectPinWrapperRight"] !== null)
    frmUserSettingsKA.remove(frmUserSettingsKA["inCorrectPinWrapperRight"]);
  
   if(frmUserSettingsKA["RegistrationSuccessWrapperRight"] !== null)
    frmUserSettingsKA.remove(frmUserSettingsKA["RegistrationSuccessWrapperRight"]);
  
  
  
  if(frmUserSettingsKA["flxAccountAlerts"] !== null)
   {
    
      frmUserSettingsKA.remove(frmUserSettingsKA["flxAccountAlerts"]);
     frmUserSettingsKA.flxMyProfileAlerts.left = "38%";
     frmUserSettingsKA.rightWrapper.setVisibility(true);
     frmUserSettingsKA.navigationDrawerBkg.setVisibility(true);
   }
  
  if(frmUserSettingsKA["flexSecurityAlerts"] !== null)
   {
     
    frmUserSettingsKA.remove(frmUserSettingsKA["flexSecurityAlerts"]);
     frmUserSettingsKA.flxMyProfileAlerts.left = "38%";
     frmUserSettingsKA.rightWrapper.setVisibility(true);
     frmUserSettingsKA.navigationDrawerBkg.setVisibility(true);
   }
  
  if(frmUserSettingsKA["flxDealAlerts"] !== null)
   { 
     
     frmUserSettingsKA.remove(frmUserSettingsKA["flxDealAlerts"]);
     frmUserSettingsKA.flxMyProfileAlerts.left = "38%";
     frmUserSettingsKA.rightWrapper.setVisibility(true);
     frmUserSettingsKA.navigationDrawerBkg.setVisibility(true);
   }
  
  if(frmUserSettingsKA["flxMyProfileAlerts"] !== null)
    frmUserSettingsKA.remove(frmUserSettingsKA["flxMyProfileAlerts"]);
  
   if(frmUserSettingsKA["editPasswordWrapper"] !== null)
    frmUserSettingsKA.remove(frmUserSettingsKA["editPasswordWrapper"]);
  
  if(frmUserSettingsKA["confirmpswdWrapper"] !== null)
    frmUserSettingsKA.remove(frmUserSettingsKA["confirmpswdWrapper"]);
  
  if(frmUserSettingsKA["personalDetailEditWrapper"] !== null)
    frmUserSettingsKA.remove(frmUserSettingsKA["personalDetailEditWrapper"]);
  
  if(frmUserSettingsKA["confirmPersonalDetailWrapper"] !== null)
    frmUserSettingsKA.remove(frmUserSettingsKA["personalDetailEditWrapper"]);
  
   if(frmUserSettingsKA["editUserNameWrapper"] !== null)
    frmUserSettingsKA.remove(frmUserSettingsKA["editUserNameWrapper"]);
  
  if(frmUserSettingsKA["confirmusernameDetailWrapper"] !== null)
    frmUserSettingsKA.remove(frmUserSettingsKA["confirmusernameDetailWrapper"]);
  
   if( frmUserSettingsKA["rightWrapper"] !== null)
   		{
             frmUserSettingsKA.leftWrapper.left ="0%";
              frmUserSettingsKA.rightWrapper.left="38%";
             frmUserSettingsKA["rightWrapper"].opacity=1;
        }
    
}


function showGeneralAlert(msg)
{
    kony.ui.Alert({
	"message": msg,
	"alertType": constants.ALERT_TYPE_INFO,
	"alertTitle":i18n_btnInfo,
	"yesLabel": i18n_ok,
	"noLabel": null,
	"alertHandler":null
	},{}); 
}

function signOutAlert()
{
	kony.ui.Alert({
        "alertType": constants.ALERT_TYPE_CONFIRMATION,
        "alertTitle": i18n_confirmSignOut,
        "yesLabel": i18n_signOut,
        "noLabel": i18n_cancel,
        "message": i18n_signOutAlert,
        "alertHandler": signoutAlertHandler
    }, {});
}

function signoutAlertHandler(response)
{
	if(response === true)
 	 kony.sdk.mvvm.LogoutAction();
}

 

function cancelDepositAlert()
{
	kony.ui.Alert({
        "alertType": constants.ALERT_TYPE_CONFIRMATION,
        "alertTitle": i18n_depositCancel,
        "yesLabel": i18n_Yeslbl,
        "noLabel": i18n_Nolbl,
        "message": i18n_cancelDepositAlert,
        "alertHandler": cancelDepositAlertHandler
    }, {});
}

function cancelDepositAlertHandler(response)
{
	if(response === true)
 	 getDeposits("frmDepositPayLandingKA");
}


function clearMessages()
{
   if(frmMessagesKA["newMsgWrapper"] !== null)
   frmMessagesKA.remove(frmMessagesKA["newMsgWrapper"]);
  
  if(frmMessagesKA["newDraftWrapper"] !== null)
   frmMessagesKA.remove(frmMessagesKA["newDraftWrapper"]);
  
  frmMessagesKA.flxReplyWrapperKA.setVisibility(false);
  frmMessagesKA.flxInboxMessageDetailsKA.setVisibility(false);

}


function clearRightContainerResources()
{
  if(moreLanding["flxMain"] !== null)
   moreLanding.remove(moreLanding["flxMain"]);
  
   if(moreLanding["flxMains"] !== null)
   moreLanding.remove(moreLanding["flxMains"]);
  
   if(moreLanding["manageCardsWrapper"] !== null)
   moreLanding.remove(moreLanding["manageCardsWrapper"]);
  
   if(moreLanding["registeredPayeerightWrapper"] !== null)
   moreLanding.remove(moreLanding["registeredPayeerightWrapper"]);
  
   if(moreLanding["flxMyMoneyMainContainerWraperKA"] !== null)
   moreLanding.remove(moreLanding["flxMyMoneyMainContainerWraperKA"]);
  
   if(moreLanding["moreInterestRatesWrapper"] !== null)
   moreLanding.remove(moreLanding["moreInterestRatesWrapper"]);
  
   if(moreLanding["moreForeignExchangeRatesWrapper"] !== null)
   moreLanding.remove(moreLanding["moreForeignExchangeRatesWrapper"]);
  
   if(moreLanding["moreTermsAndConditionsWrapper"] !== null)
   moreLanding.remove(moreLanding["moreTermsAndConditionsWrapper"]);
  
   if(moreLanding["morePrivacyPolicyWrapper"] !== null)
   moreLanding.remove(moreLanding["morePrivacyPolicyWrapper"]);
  
  if(moreLanding["moreFAQsWrapper"] !== null)
   moreLanding.remove(moreLanding["moreFAQsWrapper"]);
  
  if(moreLanding["moreCheckReorderWrapper"] !== null)
   moreLanding.remove(moreLanding["moreCheckReorderWrapper"]);
  
  if (moreLanding.flxTransactionDetailsWrapperKA)
  {
    moreLanding.remove(moreLanding["flxTransactionDetailsWrapperKA"]);
    moreLanding.flxUncategorizedTransactionsWrapperKA.left = "38%";
    // frmUserSettingsKA.rightWrapper.setVisibility(true);
  }
  
   if (moreLanding.flxUncategorizedTransactionsWrapperKA)
       moreLanding.remove(moreLanding["flxUncategorizedTransactionsWrapperKA"]);
  
  if(  moreLanding["rightWrapper"] !== null)
   		{
              moreLanding["leftWrapper"].left ="0%";
              moreLanding["rightWrapper"].left="38";
              moreLanding["rightWrapper"].opacity=1;
        }
  
}


  