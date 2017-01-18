/*// Account Preview/Touch ID Enabled Boolean

var accountPreviewIsEnabled = true;
var touchIdIsEnabled = false;
userAgent = kony.os.userAgent();
// to be set to true if a user selects "Account Preview" in accountPreviewRadio segment
var defaultToAccountPreview = false;
// Segment Row Actions for frmUserSettingsKA Form
function userSettingsSegmentClick(){
  var settingsData=kony.store.getItem("settingsflagsObject");
  var status = kony.localAuthentication.getStatusForAuthenticationMode(constants.LOCAL_AUTHENTICATION_MODE_TOUCH_ID);
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var alertController;
  var alertsNavObject;
  var deviceRegController ;
  var deviceRegNavObject ;
  if (status == 5000)
    {
      if (userAgent == "iPhone")
      {
         var selectedRows = frmUserSettingsKA.userSettingsSegment.selectedRowIndex[1];
         var selectedSections = frmUserSettingsKA.userSettingsSegment.selectedRowIndex[0];
      }
      else
        {
          var selectedRows = frmUserSettingsKA.userSettingsSegmentAndroid.selectedRowIndex[1];
          var selectedSections = frmUserSettingsKA.userSettingsSegmentAndroid.selectedRowIndex[0];
        }
     switch(selectedRows){
      case 0:
          if(selectedSections === 0)
          {
            frmUserSettingsAccountPreviewKA.show(); 
          }
          else if(selectedSections === 1)
          {
           frmUserSettingsMyProfileKA.show();
          }
         else
         {
              frmPreferredAccountsKA.ForTransfers.isVisible=true;
              frmPreferredAccountsKA.ForDeposits.isVisible=false;
              frmPreferredAccountsKA.ForPayments.isVisible=false;
              //frmPreferredAccountsKA.show();
              getSessionInfo();	
         }
        	break;
      case 1:
          if(selectedSections === 0) 
          {  
            frmUserSettingsTouchIdKA.show();
          } 
          else if(selectedSections === 1) 
          {
            //frmAlertsKA.show();
			     showAlertsForm();
          }
          else if(selectedSections === 2)
          {
              frmPreferredAccountsKA.ForTransfers.isVisible=false;
              frmPreferredAccountsKA.ForDeposits.isVisible=true;
              frmPreferredAccountsKA.ForPayments.isVisible=false;
             // frmPreferredAccountsKA.show();
             getSessionInfo();
          }

        	break;
      case 2:
		if(selectedSections === 0) 
          {  
            	deviceRegFrom = "settings";
                if(settingsData.deviceRegisterFlag !== null && settingsData.deviceRegisterFlag===true){
                  		deviceRegController = INSTANCE.getFormController("frmDeviceDeRegistrationKA");
  						deviceRegNavObject=new kony.sdk.mvvm.NavigationObject();
       					deviceRegNavObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
        				deviceRegController.performAction("loadDataAndShowForm",[deviceRegNavObject]);
                }                 		
             	 else
						frmDeviceRegistrationOptionsKA.show();
                 		
          } 
          
          else if(selectedSections === 2)
          {

              frmPreferredAccountsKA.ForTransfers.isVisible=false;
              frmPreferredAccountsKA.ForDeposits.isVisible=false;
              frmPreferredAccountsKA.ForPayments.isVisible=true;
             // frmPreferredAccountsKA.show();
              getSessionInfo();
          }
          break;
       case 3:
         if(selectedSections === 0)
          {
            frmSetDefaultPageKA.show();
          }
    }
   }
     else
    {
    var selectedRow = null;
    var selectedSection = null;
    if (userAgent == "iPhone" )
    {
     	 selectedRow = frmUserSettingsKA.userSettingsSegment.selectedRowIndex[1];
     	 selectedSection = frmUserSettingsKA.userSettingsSegment.selectedRowIndex[0];
    }else{
     	 selectedRow = frmUserSettingsKA.userSettingsSegmentAndroid.selectedRowIndex[1];
    	 selectedSection = frmUserSettingsKA.userSettingsSegmentAndroid.selectedRowIndex[0];
    }  
	
    switch(selectedRow){
      case 0:
          if(selectedSection === 0)
          {
            frmUserSettingsAccountPreviewKA.show(); 
          }
          else if(selectedSection === 1)
            {
           frmUserSettingsMyProfileKA.show();
            }
         else
         {
              frmPreferredAccountsKA.ForTransfers.isVisible=true;
              frmPreferredAccountsKA.ForDeposits.isVisible=false;
              frmPreferredAccountsKA.ForPayments.isVisible=false;
           	  getSessionInfo();
//               frmPreferredAccountsKA.show();
         }
        	break;
      case 1:
          if(selectedSection === 0) 
          {  
                 if(settingsData.deviceRegisterFlag!==null && settingsData.deviceRegisterFlag===true){
                  		deviceRegController = INSTANCE.getFormController("frmDeviceDeRegistrationKA");
  						deviceRegNavObject = new kony.sdk.mvvm.NavigationObject();
       					deviceRegNavObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
        				deviceRegController.performAction("loadDataAndShowForm",[deviceRegNavObject]); 
                 }   
             	 else
						frmDeviceRegistrationOptionsKA.show();
                 		
          } 
          else if(selectedSection === 1) 
          {
            //frmAlertsKA.show();
            showAlertsForm();
          }
          else if(selectedSection === 2)
          {
              frmPreferredAccountsKA.ForTransfers.isVisible=false;
              frmPreferredAccountsKA.ForDeposits.isVisible=true;
              frmPreferredAccountsKA.ForPayments.isVisible=false;
//               frmPreferredAccountsKA.show();
              getSessionInfo();
          }

        	break;
      case 2 :

          if(selectedSection === 0)
          {
            frmSetDefaultPageKA.show();
          }
          else if(selectedSection === 2)
          {
			  frmPreferredAccountsKA.ForTransfers.isVisible=false;
              frmPreferredAccountsKA.ForDeposits.isVisible=false;
              frmPreferredAccountsKA.ForPayments.isVisible=true;
//               frmPreferredAccountsKA.show();
              getSessionInfo();
          }
    }}
}

function getSessionInfo(){
  	var PreperController ;
    var PreperNavObject;
  	var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  	PreperController = INSTANCE.getFormController("frmPreferredAccountsKA");
  	PreperNavObject = new kony.sdk.mvvm.NavigationObject();
  	PreperNavObject.setRequestOptions("ForTransfers",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
    PreperNavObject.setRequestOptions("ForDeposits",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
    PreperNavObject.setRequestOptions("ForPayments",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
    PreperController.performAction("loadDataAndShowForm",[PreperNavObject]);		  
}


//////////////////////////////////
/// Account Preview Settings
//////////////////////////////////

function accountPreviewPreShow(){
   	  var settingsData=kony.store.getItem("settingsflagsObject");	
   	  if (settingsData.accountPreviewEnabledFlag === null || settingsData.accountPreviewEnabledFlag===false){
            disableAccountPreview();
      } else if (settingsData.accountPreviewEnabledFlag === true){  
            enableAccountPreview();
      }
}

// accountPreviewSwitch onTouchEnd settingsData
function accountPreviewSwitchOnTouchEnd() {
   if (userAgent == "iPhone" || userAgent ==="iPad"){
      if(frmUserSettingsAccountPreviewKA.accountPreviewSwitch.selectedIndex === 1){
        //enableAccountPreview();
        updateFlags("accountPreviewEnabledFlag",true);
      } else{
       //disableAccountPreview();
         updateFlags("accountPreviewEnabledFlag",false);
      }
  }
}

// accountPreviewCheckBox onTouchEnd
function accountPreviewCheckBoxSelectTouchEnd() {
  if(frmUserSettingsAccountPreviewKA.accountPreviewCheckBox.selectedKeys){
    // CheckBox Deselected
     updateFlags("accountPreviewEnabledFlag",false);
  } else {
    // CheckBox Selected
     updateFlags("accountPreviewEnabledFlag",true);
  }
}


function enableAccountPreview(){
  	// Account Preview accessible
  // showAccountPreviewOptions();
  frmUserSettingsAccountPreviewKA.accountPreviewCheckBox.selectedKeys = ["accountPreview"];
}

function disableAccountPreview(){
	// Account preview inaccessible 
    // hideAccountPreviewOptions();
  frmUserSettingsAccountPreviewKA.accountPreviewCheckBox.selectedKeys = null;
}


//////////////////////////////////
/// Touch ID Settings
//////////////////////////////////

function settingsTouchIdPreShow(){
  var settingsData=kony.store.getItem("settingsflagsObject");
//   if(settingsData.touchIDEnabledFlag!==null || settingsData.touchIDEnabledFlag ===true){  
//     	frmUserSettingsTouchIdKA.touchIdSwitch.selectedIndex = 0;
//   } else if (settingsData.touchIDEnabledFlag === false){  
//     	frmUserSettingsTouchIdKA.touchIdSwitch.selectedIndex = 1;
//   }
  
  
}

function touchIdSwitchOnTouchEnd() {
  if(frmUserSettingsTouchIdKA.touchIdSwitch.selectedIndex === 1){
    updateFlags("touchIDEnabledFlag",true);
  } else{
    updateFlags("touchIDEnabledFlag",false);
  }
}

function touchIdCheckBoxSelectTouchEnd() {
  if(frmUserSettingsTouchIdKA.touchIdCheckBox.selectedKeys){
    // CheckBox Deselected
     updateFlags("touchIDEnabledFlag",false);
  } else {
    // CheckBox Selected
     updateFlags("touchIDEnabledFlag",true);
  }
}
*/
function onLoginSettingsRowClick(){
    var selectedRow = frmUserSettingsMyProfileKA.loginSettingsSegmentAndroid.selectedRowIndex[1];

    if(selectedRow === 0)  
      	changeUsernameQFetch();
  	else if (selectedRow == 1)
    	changePasswordQFetch();
 	else if (selectedRow == 2)
    	onClickSettingsProfileToLoad();
}
/*
/////////////////////////////////////////////////
///Settings PreShow
//////////////////////////////////////////////
function setDeviceRegistrationEnable(){
  updateFlags("deviceRegisterFlag",true);
 
}

function setDeviceRegistrationDesable(){
	var INSTANCE =  kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var deviceRegController = INSTANCE.getFormController("frmDeviceDeRegistrationKA");
  	var deviceRegNavObject=new kony.sdk.mvvm.NavigationObject();
    deviceRegNavObject.setDataModel(null, kony.sdk.mvvm.OperationType, "form");
    deviceRegNavObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
	deviceRegController.performAction("deleteData",[deviceRegNavObject]);
	alert("Device is De-Registered")	;
    updateFlags("deviceRegisterFlag",false);
   
}

function populateSettingsData(){
  	var logigSettingVal=i18n_LoginSettings;
  	var accountPreviewVal= i18n_AccountPreview;
 	var touchIDVal=i18n_TouchID;
  	var deviceRegistrationVal=i18n_devRegistration;
    var defaultPageVal= i18n_defaultPage;
    var profileNAlertsVal=i18n_ProfilenAlerts;
    var myProfilVal=i18n_MyProfile;
    var alertsVal=i18n_Alerts;
    var preferredAccountsVal=i18n_preferredAccounts;
    var forTransfersVal=i18n_ForTransfers;
    var forDepositsVal=i18n_ForDeposits;
    var forPaymentsVal=i18n_ForPayments;
  	deviceRegFrom = "settings";
    var alertsFlg=false;
    var accountsPreviewFlag=false;
    var deviceRegFlag=false;
    var defaultPage="Accounts";
    var defaultTransferAcc="";
  	var defaultDepositAcc="";
  	var defaultPaymentsAcc="";
  	var touchIDFlag=null;
  	var data=[];
    var status = kony.localAuthentication.getStatusForAuthenticationMode(constants.LOCAL_AUTHENTICATION_MODE_TOUCH_ID);
    var settingsData=kony.store.getItem("settingsflagsObject");
    kony.print(JSON.stringify(settingsData));
    if(settingsData.accountPreviewEnabledFlag!==null && settingsData.accountPreviewEnabledFlag===true ) {  
		 accountsPreviewFlag="ON";
       if(kony.retailBanking.globalData.deviceInfo.isIphone()){
         frmUserSettingsAccountPreviewKA.accountPreviewSwitch.selectedIndex = 0;
       }else{
         frmUserSettingsAccountPreviewKA.accountPreviewCheckBox.selectedKeys = ["accountPreview"];
       }
         
	}else{
		 accountsPreviewFlag="OFF";
       if(kony.retailBanking.globalData.deviceInfo.isIphone()){
         frmUserSettingsAccountPreviewKA.accountPreviewSwitch.selectedIndex = 1;
       }else{
         frmUserSettingsAccountPreviewKA.accountPreviewCheckBox.selectedKeys = null;
       }
	}
    
       if(settingsData.touchIDEnabledFlag===true ){
           touchIDFlag="ON";
          if(kony.retailBanking.globalData.deviceInfo.isIphone())
           frmUserSettingsTouchIdKA.touchIdSwitch.selectedIndex = 0;
         else
           frmUserSettingsTouchIdKA.touchIdCheckBox.selectedKeys = ["touchId"];
      }else{
           touchIDFlag="OFF";
          if(kony.retailBanking.globalData.deviceInfo.isIphone())
           frmUserSettingsTouchIdKA.touchIdSwitch.selectedIndex = 1;
        else
           frmUserSettingsTouchIdKA.touchIdCheckBox.selectedKeys = null;
      }
    
	if( settingsData.deviceRegisterFlag!==null && settingsData.deviceRegisterFlag===true ){
		 deviceRegFlag="ON";
	}else{
		 deviceRegFlag="OFF";
	}
	if(settingsData.defaultScreenEnum!==null){
    	
         if(settingsData.defaultScreenEnum==="frmAccountsLandingKA"){
             defaultPage="Accounts";
         }else if(settingsData.defaultScreenEnum==="frmTransferPayLandingKA"){
          	defaultPage="Payments & Transfers";
         }else if(settingsData.defaultScreenEnum==="frmDepositPayLandingKA"){
          	defaultPage="Deposits";
         }else if(settingsData.defaultScreenEnum==="frmMyMoneyListKA"){
          	defaultPage="My Money";
         }
	}	
    if(settingsData.alerts!==null && settingsData.alerts===true){
            alertsFlg="ON";
      if(!kony.retailBanking.globalData.deviceInfo.isIphone()){
      	frmAlertsKA.infoImg.src="checkbox_on.png";}
       else{
            frmAlertsKA.SwitchAlert.selectedIndex = 0;
          }
       	frmAlertsKA.alertsTypes.isVisible=true;
        }else{
             alertsFlg="OFF";
          if(!kony.retailBanking.globalData.deviceInfo.isIphone()){
          frmAlertsKA.infoImg.src="checkbox_off.png";}
          else{
            frmAlertsKA.SwitchAlert.selectedIndex = 1;
          }
      	 frmAlertsKA.alertsTypes.isVisible=false;
    }
  	if(settingsData.DefaultTransferAcctNo!==null){
      	
    	defaultTransferAcc =getAccountNameForAccID(settingsData.DefaultTransferAcctNo) ;
    }
    if(settingsData.DefaultDepositAcctNo!==null){
 		defaultDepositAcc =getAccountNameForAccID(settingsData.DefaultDepositAcctNo);
    }
    if(settingsData.DefaultPaymentAcctNo!==null){
 		 defaultPaymentsAcc = getAccountNameForAccID(settingsData.DefaultPaymentAcctNo) ;
    }
  
  	if (kony.retailBanking.globalData.deviceInfo.isTouchIDSupported())
    {
      
      	 data=[
         [
            	{"lblHeaderKA":logigSettingVal},
            [	
                {"lblSettingsNameKA":accountPreviewVal,"lblSettingsStatusKA":accountsPreviewFlag,"imgProgressKey":"right_chevron_icon.png"},
              	{"lblSettingsNameKA":touchIDVal,"lblSettingsStatusKA":touchIDFlag,"imgProgressKey":"right_chevron_icon.png"},
                {"lblSettingsNameKA":deviceRegistrationVal,"lblSettingsStatusKA":deviceRegFlag,"imgProgressKey":"right_chevron_icon.png"}//,
                //{"lblSettingsNameKA":defaultPageVal,"lblSettingsStatusKA":defaultPage,"imgProgressKey":"right_chevron_icon.png"}
            ]
         ],
         [
                {"lblHeaderKA":profileNAlertsVal},
            [	
                {"lblSettingsNameKA":myProfilVal,"lblSettingsStatusKA":"","imgProgressKey":"right_chevron_icon.png"},
                {"lblSettingsNameKA":alertsVal,"lblSettingsStatusKA":alertsFlg,"imgProgressKey":"right_chevron_icon.png"}

            ]
         ],
         [
                {"lblHeaderKA":preferredAccountsVal},
            [	
                {"lblSettingsNameKA":forTransfersVal,"lblSettingsStatusKA":defaultTransferAcc,"imgProgressKey":"right_chevron_icon.png"},
                {"lblSettingsNameKA":forDepositsVal,"lblSettingsStatusKA":defaultDepositAcc,"imgProgressKey":"right_chevron_icon.png"},
                {"lblSettingsNameKA":forPaymentsVal,"lblSettingsStatusKA":defaultPaymentsAcc,"imgProgressKey":"right_chevron_icon.png"}
            ]
         ]

         ];
        // frmUserSettingsKA.userSettingsSegment.setData(data);
    }else {
      	 data=[
         [
            	{"lblHeaderKA":logigSettingVal},
            [	
                {"lblSettingsNameKA":accountPreviewVal,"lblSettingsStatusKA":accountsPreviewFlag,"imgProgressKey":"right_chevron_icon.png"},
                {"lblSettingsNameKA":deviceRegistrationVal,"lblSettingsStatusKA":deviceRegFlag,"imgProgressKey":"right_chevron_icon.png"}//,
               // {"lblSettingsNameKA":defaultPageVal,"lblSettingsStatusKA":defaultPage,"imgProgressKey":"right_chevron_icon.png"}
            ]
         ],
         [
                {"lblHeaderKA":profileNAlertsVal},
            [	
                {"lblSettingsNameKA":myProfilVal,"lblSettingsStatusKA":"","imgProgressKey":"right_chevron_icon.png"},
                {"lblSettingsNameKA":alertsVal,"lblSettingsStatusKA":alertsFlg,"imgProgressKey":"right_chevron_icon.png"}

            ]
         ],
         [
                {"lblHeaderKA":preferredAccountsVal},
            [	
                {"lblSettingsNameKA":forTransfersVal,"lblSettingsStatusKA":defaultTransferAcc,"imgProgressKey":"right_chevron_icon.png"},
                {"lblSettingsNameKA":forDepositsVal,"lblSettingsStatusKA":defaultDepositAcc,"imgProgressKey":"right_chevron_icon.png"},
                {"lblSettingsNameKA":forPaymentsVal,"lblSettingsStatusKA":defaultPaymentsAcc,"imgProgressKey":"right_chevron_icon.png"}
            ]
         ]

         ];
      
         //frmUserSettingsKA.userSettingsSegmentAndroid.setData(data);
    }
  if (userAgent == "iPhone" ){
    	frmUserSettingsKA.userSettingsSegment.setData(data);
  }else{
    	frmUserSettingsKA.userSettingsSegmentAndroid.setData(data);
  }
  
}
*/
function navigateBackFromDeviceRegistration(){
  var touchdata=kony.store.getItem("settingsflagsObject");
  if(deviceRegFrom =="settings"){
    frmUserSettingsKA.show();
  }else if(deviceRegFrom == "login"){
    if(accountpreviewcheck())
    	frmUnauthFeatureEnablingKA.show();
    else
        showFormOrderList();  
  }

}
/*
function getAccountNameForAccID(accID){
  	var data=kony.retailBanking.globalData.accounts.getAccountsData();
  	var accountName="";
  	for (var i=0;i<data.length;i++){
      if(accID===data[i].accountID){
          accountName=data[i].nickName;
          return accountName; 	
      }
	}
  	 
}*/

function saveAlertsFlagData(){
  	var INSTANCE =  kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
   	var controller = INSTANCE.getFormController("frmUserSettingsKA");
  	var formModel=controller.getFormModel();
    var settingsData=kony.store.getItem("settingsflagsObject");
    formModel.setViewAttributeByProperty("lblAlertsFlagKA","text",settingsData.alerts);
   	formModel.setViewAttributeByProperty("lblForTransferAccKA","text",settingsData.DefaultTransferAcctNo);
    formModel.setViewAttributeByProperty("lblForDepositAccKA","text",settingsData.DefaultDepositAcctNo);
    formModel.setViewAttributeByProperty("lblForPaymentsAccKA","text",settingsData.DefaultPaymentAcctNo);
  	var navObject = new kony.sdk.mvvm.NavigationObject();
    navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
    controller.performAction("loadDataAndShowForm",[navObject]);
	savePreferredAccData();
}

function savePreferredAccData(){
  		var INSTANCE =  kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
   		var controller = INSTANCE.getFormController("frmUserSettingsKA");
  		var navObject = new kony.sdk.mvvm.NavigationObject();
      	navObject.setDataModel(null, kony.sdk.mvvm.OperationType, "form");
        navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
		controller.performAction("saveData",[navObject]);
}