var hasTouchId;
var accountsPreviewStatus;
var deviceRegStatus;
var touchIDStatus;
var defaultPage;
var defaultTransferAcc="";
var defaultDepositAcc="";
var defaultPaymentsAcc="";
var profSettings;
var isPinEnabled;


function setSegmentTouchId()
{
   
   if (kony.retailBanking.globalData.deviceInfo.isTouchIDSupported())
         hasTouchId=true;
     else
     {
         hasTouchId=false;
         frmUserSettingsKA.userSettingsSegment.removeAt(3,0);
      }
   
}
function getAccountNameForAccID(accID){
  	var data=kony.retailBanking.globalData.accounts.getAccountsData();
  	var accountName="";
  	for (var i=0;i<data.length;i++){
      if(accID===data[i].accountID){
          accountName=data[i].nickName;
          return accountName; 	
      }
	}
  	 
}

function getSettingsFeaturesStatus()
{
  	var settingsData=kony.store.getItem("settingsflagsObject");
    if(settingsData.accountPreviewEnabledFlag!==null && settingsData.accountPreviewEnabledFlag ===true )
    {  
		 accountsPreviewStatus=i18n_onLabel;
         if(kony.retailBanking.globalData.deviceInfo.isIphone())
         	frmUserSettingsAccountPreviewKA.accountPreviewSwitch.selectedIndex = 0;
         else
         	frmUserSettingsAccountPreviewKA.accountPreviewCheckBox.selectedKeys = ["accountPreview"];
   }   
   else
   {
		 accountsPreviewStatus=i18n_offLabel;
       	if(kony.retailBanking.globalData.deviceInfo.isIphone())
         frmUserSettingsAccountPreviewKA.accountPreviewSwitch.selectedIndex = 1;
       else
         frmUserSettingsAccountPreviewKA.accountPreviewCheckBox.selectedKeys = null;
	}
  
  
    if(kony.retailBanking.globalData.deviceInfo.isTouchIDSupported())
    {
          if(settingsData.touchIDEnabledFlag===true )
          {
           touchIDStatus=i18n_onLabel;
           if(kony.retailBanking.globalData.deviceInfo.isIphone())
           		frmUserSettingsTouchIdKA.touchIdSwitch.selectedIndex = 0;
          else
           		frmUserSettingsTouchIdKA.touchIdCheckBox.selectedKeys = ["touchId"];
      	  }
         else
         {
           touchIDStatus=i18n_offLabel;
           if(kony.retailBanking.globalData.deviceInfo.isIphone())
           	   frmUserSettingsTouchIdKA.touchIdSwitch.selectedIndex = 1;
           else
           		frmUserSettingsTouchIdKA.touchIdCheckBox.selectedKeys = null;
         }
    }
    if(settingsData.isPinEnabledFlag!==null && settingsData.isPinEnabledFlag===true )
    {
           isPinEnabled=i18n_onLabel;
     }
      else
      {
           isPinEnabled=i18n_offLabel;
      }
  
  
	if( settingsData.deviceRegisterFlag!==null && settingsData.deviceRegisterFlag===true )
		 deviceRegStatus=i18n_onLabel;
	else
		 deviceRegStatus=i18n_offLabel;
  
  //Default Page
  /* if(settingsData.defaultScreenEnum!==null)
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
	}*/
	
   if(settingsData.DefaultTransferAcctNo!==null)
    	defaultTransferAcc = getAccountNameForAccID(settingsData.DefaultTransferAcctNo);
    if(settingsData.DefaultDepositAcctNo!==null)
 		defaultDepositAcc =getAccountNameForAccID(settingsData.DefaultDepositAcctNo);
    if(settingsData.DefaultPaymentAcctNo!==null)
 		 defaultPaymentsAcc = getAccountNameForAccID(settingsData.DefaultPaymentAcctNo);
  
}


function  onClickSettingsSeg()
{
  	var userSettingsData=kony.store.getItem("settingsflagsObject");
    var selectedSections = frmUserSettingsKA.userSettingsSegment.selectedRowIndex[0];
    frmUserSettingsKA.userSettingsSegment.retainSelection=true;
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
	var selectedRows = frmUserSettingsKA.userSettingsSegment.selectedRowIndex[1];
    switch (selectedRows)
    {
     	 case 0:
      		frmUserSettingsAccountPreviewKA.show();
        	break;
      	 case 1:
        	gotoDevRegistration();
            break;
        case 2:
         	alert("PIN Login");
        	break;
        case 3:
          if (hasTouchId)
            frmUserSettingsTouchIdKA.show();
          break;
	}
}


function gotoDevRegistration()
{
   var settingsData=kony.store.getItem("settingsflagsObject");
	if( settingsData.deviceRegisterFlag!==null && settingsData.deviceRegisterFlag === false )
      { 
        deviceRegFrom = "settings";
        frmDeviceRegistrationOptionsKA.show();
      }
  		
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
  var selectedRows = frmUserSettingsKA.userSettingsSegment.selectedRowIndex[1];
    switch (selectedRows)
    {
     	 case 0:
        	onClickProfile();
        	break;
      	case 1:
        	showAlertsForm();
            break;
    }
}

function onClickProfile()
{
	frmUserSettingsMyProfileKA.show();
}

function setSettingsData()
{
  getSettingsFeaturesStatus();
  data=[
         [
            	{"lblHeaderKA":i18n_LoginSettings},
            [	
                {"lblSettingsNameKA":i18n_AccountPreview,"lblSettingsStatusKA":accountsPreviewStatus,"imgProgressKey":"right_chevron_icon.png"},
              	{"lblSettingsNameKA":i18n_devRegistration,"lblSettingsStatusKA":deviceRegStatus,"imgProgressKey":"right_chevron_icon.png"},
                {"lblSettingsNameKA":"PIN Login","lblSettingsStatusKA":isPinEnabled,"imgProgressKey":"right_chevron_icon.png"},
                {"lblSettingsNameKA":i18n_TouchID,"lblSettingsStatusKA":touchIDStatus,"imgProgressKey":"right_chevron_icon.png"}
                
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
   frmUserSettingsKA.userSettingsSegment.setData(data);
   setSegmentTouchId();
}


function gotoAccountSettings()
{
  getPreferredAccounts();
  var selectedAcntRow=frmUserSettingsKA.userSettingsSegment.selectedRowIndex[1];
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
  frmPreferredAccountsKA.lbltransferHeader.text=accountType;
  frmPreferredAccountsKA.show();
}
