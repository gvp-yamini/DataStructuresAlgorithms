var hasTouchId;
var accountsPreviewStatus;
var deviceRegStatus;
var touchIDStatus;
var defaultPage;
var defaultTransferAcc="";
var defaultDepositAcc="";
var defaultPaymentsAcc="";
var profSettings;



function settingsFormPreShow()
{
  setRightContainer();
  onOrientationChange(frmUserSettingsKA);
  setSettingsData();
  var usrObj = kony.retailBanking.globalData.globals.userObj;
  frmUserSettingsKA.greetingName.text= i18n_Hi+" "+ usrObj.userFirstName;
  frmUserSettingsKA.lastSignOnLabel.text= i18n_lastSignin+" " + usrObj.lastLoginTime;
  userSettings.touchIDWrapper.lblinstruction.text=kony.retailBanking.globalData.globals.BankName+" "+i18n_touchIdHeader;   
}


function setSegmentTouchId()
{
   
   if (kony.retailBanking.globalData.deviceInfo.isIpad())
   {
     var status = kony.localAuthentication.getStatusForAuthenticationMode(constants.LOCAL_AUTHENTICATION_MODE_TOUCH_ID);
     if (status == 5000)
         hasTouchId=true;
     else
     {
         hasTouchId=false;
         frmUserSettingsKA.segSettingsKA.removeAt(1,0);
      }
   }                              
  else
  {
   frmUserSettingsKA.segSettingsKA.removeAt(1.0,0.0);
   hasTouchId=false;
  }
}

function getSettingsFeaturesStatus()
{
  	var settingsData=kony.store.getItem("settingsflagsObject");
    if(settingsData.accountPreviewEnabledFlag!==null && settingsData.accountPreviewEnabledFlag===true )
    {  
		 accountsPreviewStatus=i18n_onLabel;
         enableAccountPreview();
   }   
   else
   {
		 accountsPreviewStatus=i18n_offLabel;
       	 disableAccountPreview();
	}
  
  
    if(kony.retailBanking.globalData.deviceInfo.isIpad())
    {
          if(settingsData.touchIDEnabledFlag===true )
          {
           touchIDStatus=i18n_onLabel;
           userSettings.touchIdSwitch.selectedIndex = 0;
      	  }
         else
         {
           touchIDStatus=i18n_offLabel;
           userSettings.touchIdSwitch.selectedIndex = 1;
         }
    }
  
  
	if( settingsData.deviceRegisterFlag!==null && settingsData.deviceRegisterFlag===true )
		 deviceRegStatus=i18n_onLabel;
	else
		 deviceRegStatus=i18n_offLabel;
  
  //Default Page
   if(settingsData.defaultScreenEnum!==null)
   {
         if(settingsData.defaultScreenEnum === "accountsLanding"){
             defaultPage="Accounts";
         }else if(settingsData.defaultScreenEnum === "frmTransferPayLandingKA"){
          	defaultPage="Payments & Transfers";
         }else if(settingsData.defaultScreenEnum === "frmDepositPayLandingKA"){
          	defaultPage="Deposits";
         }else if(settingsData.defaultScreenEnum === "frmMyMoneyListKA"){
          	defaultPage="My Money";
         }
	}	
	
   if(settingsData.DefaultTransferAcctNo!==null)
    	defaultTransferAcc = getAccountNameForAccID(settingsData.DefaultTransferAcctNo);
    if(settingsData.DefaultDepositAcctNo!==null)
 		defaultDepositAcc =getAccountNameForAccID(settingsData.DefaultDepositAcctNo);
    if(settingsData.DefaultPaymentAcctNo!==null)
 		 defaultPaymentsAcc = getAccountNameForAccID(settingsData.DefaultPaymentAcctNo);
  
}


function  segSettingsOnClick()
{
  	var userSettingsData=kony.store.getItem("settingsflagsObject");
    var selectedSections = frmUserSettingsKA.segSettingsKA.selectedRowIndex[0];
   frmUserSettingsKA.segSettingsKA.retainSelection=true;
    retainSelectionOn("segSettingsKA");
    switch(selectedSections)
    {
      case 0:
         	gotoLoginSettings();
        	break;
      case 1:
        	gotoProfileSettings();
        	break;
      case 2:
        	gotoAccountSettings();
            break;
    }
  
}


function gotoLoginSettings()
{
	var selectedRows = frmUserSettingsKA.segSettingsKA.selectedRowIndex[1];
    switch (selectedRows)
    {
     	 case 0:
      		addRightPanel(userSettings.accountPreviewWrapper,"accountPreviewWrapper");
        	break;
      	case 1:
        	if(hasTouchId)
               addRightPanel(userSettings.touchIDWrapper,"touchIDWrapper");
            else
              gotoDevRegistration();
            break;
      case 2:
         	gotoDevRegistration();
        	break;
	}
}


function gotoDevRegistration()
{
   var settingsData=kony.store.getItem("settingsflagsObject");
	if( settingsData.deviceRegisterFlag!==null && settingsData.deviceRegisterFlag === false )
  		addRightPanel(frmDeviceRegistrationOptionsRightKA.flxDevRegOptions,"flxDevRegOptions");
   	else
    {
        var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
      	deviceRegController = INSTANCE.getFormController("frmDeviceDeRegistrationKA");
  		deviceRegNavObject=new kony.sdk.mvvm.NavigationObject();
      	deviceRegNavObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
        deviceRegController.performAction("loadDataAndShowForm",[deviceRegNavObject]);
    }
}

function gotoProfileSettings(){
  var selectedRows = frmUserSettingsKA.segSettingsKA.selectedRowIndex[1];
    switch (selectedRows)
    {
     	 case 0:
        	onClickProfile();
        	break;
      	case 1:
        	alertaddRightPanel();
            break;
    }
}


function setSettingsData()
{
  getSettingsFeaturesStatus();
  data=[
         [
            	{"lblHeaderKA":i18n_LoginSettings},
            [	
                {"lblSettingsNameKA":i18n_AccountPreview,"lblSettingsStatusKA":accountsPreviewStatus,"imgProgressKey":"right_chevron_icon.png"},
              	{"lblSettingsNameKA":i18n_TouchID,"lblSettingsStatusKA":touchIDStatus,"imgProgressKey":"right_chevron_icon.png"},
                {"lblSettingsNameKA":i18n_devRegistration,"lblSettingsStatusKA":deviceRegStatus,"imgProgressKey":"right_chevron_icon.png"}
                
            ]
         ],
         [
                {"lblHeaderKA":i18n_ProfilenAlerts},
            [	
                {"lblSettingsNameKA":i18n_MyProfile,"lblSettingsStatusKA":"","imgProgressKey":"right_chevron_icon.png"},
               {"lblSettingsNameKA":i18n_Alerts,"lblSettingsStatusKA":"","imgProgressKey":"right_chevron_icon.png"}

            ]
         ],
         [
                {"lblHeaderKA":i18n_GeneralSettings},
            [	
                {"lblSettingsNameKA":i18n_ForTransfers,"lblSettingsStatusKA":defaultTransferAcc,"imgProgressKey":"right_chevron_icon.png"},
                {"lblSettingsNameKA":i18n_ForDeposits,"lblSettingsStatusKA":defaultDepositAcc,"imgProgressKey":"right_chevron_icon.png"},
                {"lblSettingsNameKA":i18n_ForPayments,"lblSettingsStatusKA":defaultPaymentsAcc,"imgProgressKey":"right_chevron_icon.png"}
            ]
         ]

         ];
   frmUserSettingsKA.segSettingsKA.setData(data);
   setSegmentTouchId();
}


function gotoAccountSettings()
{
  getPreferredAccounts();
  var selectedAcntRow=frmUserSettingsKA.segSettingsKA.selectedRowIndex[1];
  switch(selectedAcntRow)
  {
    case 0:
      accountType=i18n_ForTransfers;
      rowIndex=0;
      selectedAcntType="default_account_transfers";
      setDefaultAcntsData(transferAcc);
      break;
    case 1:
      accountType=i18n_ForDeposits;
      rowIndex=1;
      selectedAcntType="default_account_deposit";
      setDefaultAcntsData(depositAcc);
      break;
    case 2:
      accountType=i18n_ForPayments;
      rowIndex=2;
      selectedAcntType="default_account_payments";
      setDefaultAcntsData(paymentAcc);
      break;
  }
  addRightPanel(userSettings.flxDefaultAccountsForTransfers,"flxDefaultAccountsForTransfers");  
}















