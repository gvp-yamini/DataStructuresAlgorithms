var KSID; 
// var email = "konyRB@gmail.com";
var senderID ="619396663770";
var client ;
function onClickAlertsCHKBox(){
  client = kony.sdk.getCurrentInstance();
  setupPushCallbacks();
 	var segAndroidSettingsData=frmUserSettingsKA.userSettingsSegment.data[1][1][1];

    if(frmAlertsKA.infoImg.src=="checkbox_off.png")
    {
       	frmAlertsKA.infoImg.src="checkbox_on.png";
       	frmAlertsKA.alertsTypes.isVisible=true;
      registerPush();
      	updateFlags("alerts",true);
    }else {
       	 frmAlertsKA.infoImg.src="checkbox_off.png";
      	 frmAlertsKA.alertsTypes.isVisible=false;
      deregisterPush();
         updateFlags("alerts",false);
    }
 
}

function appintKPNSCallback(){
    var settingsData=kony.store.getItem("settingsflagsObject");
if(settingsData.alerts!==null && settingsData.alerts===true){
  
  var platFormName = kony.sdk.mvvm.Utils.getPlatformName();
    if(platFormName === kony.sdk.mvvm.Platforms["IPHONE"] || platFormName === kony.sdk.mvvm.Platforms["IPAD"]) {
      	callbackiPhoneSetCallbacks();
        }else{
         setupPushCallbacks();
        }
}
}

function onClickAlertsSwitchOption(){
  client = kony.sdk.getCurrentInstance();
  callbackiPhoneSetCallbacks();
    var segiphoneSettingsData=frmUserSettingsKA.userSettingsSegment.data[1][1][1];
    if(frmAlertsKA.SwitchAlert.selectedIndex===1)
    {
      	 frmAlertsKA.alertsTypes.isVisible=false;
      deregisterPush();
      	 updateFlags("alerts",false);
      }else
      {
         frmAlertsKA.alertsTypes.isVisible=true;
        registerPush();
         updateFlags("alerts",true);
	 }
    
}



// Function to register the device/app/user with push notification service provider (GCM)
function registerPush(){
  var configInfo;
	kony.print("\n\n\n<--------in registerPush--------->\n\n\n");
      kony.print("registration started.....");
		kony.print("sender ID: "+senderID);
		// Create local configInfo object where we pass the senderid
      if(kony.retailBanking.globalData.deviceInfo.isIphone()){
        configInfo = [0, 1, 2];
      }else{
		configInfo = {senderid:senderID};
      }
		// Call the push API to register the device with GCM
		kony.push.register(configInfo);
}

// Function to deregister the device/app/user with push notification service provider (GCM)
function deregisterPush(){
	var configInfo = {};
	kony.push.deRegister(configInfo);
  	kony.print("deregisterPush: " + JSON.stringify(configInfo));
}

// Function to setup all the callbacks for all push events
// This function is called on the preshow of the form
function setupPushCallbacks(){
	kony.print("\n\n\n<--------in setupPushCallbacks--------->\n\n\n");
	// Create local object 'callbacks'
	var callbacks = {onsuccessfulregistration:regSuccess, 
		             onfailureregistration:regFailureCallback,
		             onlinenotification:gotOnlinePushMessage,
		             offlinenotification:gotOfflinePushMessage,
		             onsuccessfulderegistration:deregSuccess,
		             onfailurederegistration:deregFail};

	// Call the push API to register callbacks
	kony.push.setCallbacks(callbacks);
}

function callbackiPhoneSetCallbacks()
{
		var callbacksTable = {onsuccessfulregistration: regSuccessiPhoneCallback, 
                              onfailureregistration: regFailureCallback, 
                              onlinenotification: onlinePushNotificationiPhoneCallback, 
                              offlinenotification: offlinePushNotificationiPhoneCallback, 
                              onsuccessfulderegistration: deregSuccess, 
                              onfailurederegistration: deregFail}; 
		kony.push.setCallbacks(callbacksTable);
		//alert("setCallBack Done !!!");
}

function regSuccess(regId)
{
	kony.print("\n\n\n<--------in regSuccess()--------->\n\n\n");
	kony.print("\nRegistration Id-->"+JSON.stringify(regId));
// 	frmPush.lblResult.text = frmPush.lblResult.text + "\n" +  "Successful registration: " + JSON.stringify(regId);
	
	subscribeMFMessaging(regId,"android");
}

function regSuccessiPhoneCallback(regId)
{
	
	//alert(" Registerd to iPhone push server : "+ regId);
    subscribeMFMessaging(regId,"iphone");
}


function regFailureCallback(error)
{
	kony.print("\n\n\n<--------in regFail--------->\n\n\n");
	kony.print("\n Error  --------->"+JSON.stringify(error));
// 	frmPush.lblResult.text = frmPush.lblResult.text + "\n" + "Unsuccessful registration: " + JSON.stringify(error);
	alert("Registration Failed ");
}


// Function to be invoked when the deregistration is successful. Once the deregistration is sucessful,
// we need to unsubscribe to KMS.
// So this function contains the code to invoke service 'unregisterSubscriberPush'
function deregSuccess(){
	kony.print("\n\n\n<--------in deregSuccess--------->\n\n\n");
	// Displaying the log on the screen along with previous log
// 	frmPush.lblResult.text = frmPush.lblResult.text + "\n" + "successful deregistration";
		// Check if userKsID is not null
		//if (userKsID!=null){
			
		//}
	unsubscribeMFMessaging();
}

// Function to be invoked when the deregistration is unsuccessful
function deregFail(error){
	kony.print("\n\n\n<--------in deregFail--------->\n\n\n");
	// Displaying the log on the screen along with previous log
// 	frmPush.lblResult.text = frmPush.lblResult.text + "\n" + "Unsuccessful deregistration: " + JSON.stringify(error);
}


// Function to be invoked when the device receives push notification message when the application is running
function gotOnlinePushMessage(pushMsg){
// 	frmPush.lblResult.text = "Got this online message: " + JSON.stringify(pushMsg);
	alert(JSON.stringify(pushMsg));
}

// Function to be invoked when the device receives push notification message when the application is not running
function gotOfflinePushMessage(pushMsg){
// 	frmPush.lblResult.text = "Got this offline message: " + JSON.stringify(pushMsg);
  alert(JSON.stringify(pushMsg));
}

function onlinePushNotificationiPhoneCallback(msg)
{
	kony.print("************ JS onlinePushNotificationCallback() called *********");
  alert("Offline Push Notification called ");
	kony.print(msg);
	var fetchid = msg["mid"];
	var msgs = new Array();
	for(var key in msg)
		msgs.push({"lblkey":key,"lblval":msg[key]});
	
	//sendViewMsgStatus(fetchid);
	alert("Message: "+msg["message"]);
}

function offlinePushNotificationiPhoneCallback(msg)
{
	kony.print("************ JS offlinePushNotificationCallback() called *********");
	alert("Offline Push Notification called ");
	var msgs = new Array();
	for(var key in msg)
		msgs.push("You have a notification"+msg[key]);
	//frmHome.segmsg.setData(msgs);
	alert("Message: "+msg["message"]);
	kony.print(msg);
}


var messagingClient;
function subscribeMFMessaging(regId,ostype)
{
	kony.print("\n\n<----------in subscribeMFMessaging()-------->\n\n");
	var deviceID = kony.os.deviceInfo().deviceid;
	var ufID = kony.retailBanking.globalData.globals.userObj.userName;
  	//ufID = "ravichandra.pitchuka@kony.com";
		try{
// 			messagingClient = kony.sdk.prototype.getMessagingService();
             messagingClient= client.getMessagingService();
		}catch(exception){
			kony.print("\n<----------Exception-------->" + exception.message);
		}
  		kony.print("messagingClient: " + JSON.stringify(messagingClient));
  if(ostype === "android"){
		messagingClient.register("androidgcm",deviceID, regId, ufID,function(response){
			// Displaying the service call status on the screen along with previous log 
// 				frmPush.lblResult.text = frmPush.lblResult.text + "\n" + "Subscription call status: success";
// 				frmPush.lblResult.text = frmPush.lblResult.text + "\n" + "KSID: " + response.id;
          KSID = response.id;
// 				frmPush.lblResult.text = frmPush.lblResult.text + "\n" + "message: " + response.message;
				kony.print("\n<----------Subscription Success--------> " + JSON.stringify(response));
// 				kony.print("\n<----------Printing lblResult : " + frmPush.lblResult.text);
				alert("Subscription Success");
			},
			function(error){
// 				frmPush.lblResult.text = frmPush.lblResult.text + "\n" + "Subscription call status: failure" + "\n" + "Error Message: " + JSON.stringify(error);
				kony.print("\n<----------Subscription Failure--------> " + JSON.stringify(error));
				alert("Subscription Failed");
			}
		);}else{
          messagingClient.register("iphone",deviceID, regId, ufID,function(response){
			// Displaying the service call status on the screen along with previous log 
// 				frmPush.lblResult.text = frmPush.lblResult.text + "\n" + "Subscription call status: success";
// 				frmPush.lblResult.text = frmPush.lblResult.text + "\n" + "KSID: " + response.id;
          KSID = response.id;
// 				frmPush.lblResult.text = frmPush.lblResult.text + "\n" + "message: " + response.message;
				kony.print("\n<----------Subscription Success--------> " + JSON.stringify(response));
// 				kony.print("\n<----------Printing lblResult : " + frmPush.lblResult.text);
				alert("Subscription Success");
			},
			function(error){
// 				frmPush.lblResult.text = frmPush.lblResult.text + "\n" + "Subscription call status: failure" + "\n" + "Error Message: " + JSON.stringify(error);
				kony.print("\n<----------Subscription Failure--------> " + JSON.stringify(error));
				alert("Subscription Failed");
			}
		);
        }
}
function unsubscribeMFMessaging()
{
	kony.print("\n\n<----------in unsubscribeKMS-------->\n\n");
  	try{
			messagingClient = client.getMessagingService();
	}catch(exception){
		kony.print("\n<----------Exception-------->" + exception.message);
	}
  	//kony.print("messagingClient: " + JSON.stringify(messagingClient));
	messagingClient.unregister(
		function(response){
// 			frmPush.lblResult.text = frmPush.lblResult.text + "\n" + "Unsubscription call status: success";
// 			frmPush.lblResult.text = frmPush.lblResult.text + "\n" + "KSID: " + response.id;
          KSID = response.id;
// 			frmPush.lblResult.text = frmPush.lblResult.text + "\n" + "message: " + response.message;
			kony.print("\n<----------Unsubscription Success--------> " +JSON.stringify(response));
			alert("Unsubscription Success");
		},
		function(error){
// 			frmPush.lblResult.text = frmPush.lblResult.text + "\n" + "Unsubscription call status: success" + "\n" + "Error Message: " + JSON.stringify(error);
			kony.print("\n<----------Unsubscription Failure--------> " +JSON.stringify(error)); 
			alert("Unsubscription Failed");
		}
	);

}

function securityDealsAlertsNavigation(){
       var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  if(frmAlertsKA.generalAlerts.selectedRowIndex[1] === 0){
		  var controller = INSTANCE.getFormController("frmSecurityAlertsKA");
		  var navigationObject = new kony.sdk.mvvm.NavigationObject();
    	  //navigationObject.setDataModel(null, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
		  navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
		  controller.performAction("navigateTo",["frmSecurityAlertsKA",navigationObject]);
 // frmSecurityAlertsKA.show();
}else{
		  var controller2 = INSTANCE.getFormController("frmDealsAlertKA");
		  var navigationObject2 = new kony.sdk.mvvm.NavigationObject();
    	  //navigationObject.setDataModel(null, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
		  navigationObject2.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
		  controller2.performAction("navigateTo",["frmDealsAlertKA",navigationObject2]);
 // frmDealsAlertKA.show();
}
}
function updateSecurityAletStatus(alertType){
  if(kony.retailBanking.globalData.deviceInfo.isIphone()){
      if(alertType === "bankingIdChange"){
         if(frmSecurityAlertsKA.BankingIdChangeAlertSwitch.selectedIndex===1)
        {
          frmSecurityAlertsKA.lblBankingIdChange.text = "false";
        }else {
            frmSecurityAlertsKA.lblBankingIdChange.text = "true";
          }
      }else if(alertType === "passwordChange"){
          if(frmSecurityAlertsKA.PasswordChangeAlertSwitch.selectedIndex===1)
        {
          frmSecurityAlertsKA.lblPasswordChange.text = "false";
        }else {
            frmSecurityAlertsKA.lblPasswordChange.text = "true";
          }
      }else if(alertType === "passwordExpired"){
          if(frmSecurityAlertsKA.PasswordExpiredAlertSwitch.selectedIndex===1)
        {
          frmSecurityAlertsKA.lblPasswordExpired.text = "false";
        }else {
            frmSecurityAlertsKA.lblPasswordExpired.text = "true";
          }
      }else if(alertType === "addressPhoneChanged"){
          if(frmSecurityAlertsKA.AddressPhoneChangeAlertSwitch.selectedIndex===1)
        {
          frmSecurityAlertsKA.lblAddressPhoneChange.text = "false";
        }else {
            frmSecurityAlertsKA.lblAddressPhoneChange.text = "true";
          }
      }else if(alertType === "newPayeeAdded"){
          if(frmSecurityAlertsKA.NewPayeeAddedAlertSwitch.selectedIndex===1)
        {
          frmSecurityAlertsKA.lbNewPayeeAdded.text = "false";
        }else {
            frmSecurityAlertsKA.lbNewPayeeAdded.text = "true";
          }
      }else{
          if(frmSecurityAlertsKA.PayeeDetailsUpdatedAlertSwitch.selectedIndex===1)
        {
          frmSecurityAlertsKA.lblPayeeDetailsUpdated.text = "false";
        }else {
            frmSecurityAlertsKA.lblPayeeDetailsUpdated.text = "true";
          }
      }
  }else{
     if(alertType === "bankingIdChange"){
        if(frmSecurityAlertsKA.imgBankingIdChangeKA.src=="checkbox_off.png")
        {
            frmSecurityAlertsKA.imgBankingIdChangeKA.src="checkbox_on.png";
            frmSecurityAlertsKA.lblBankingIdChange.text = "true";
        }else {
             frmSecurityAlertsKA.imgBankingIdChangeKA.src="checkbox_off.png";
             frmSecurityAlertsKA.lblBankingIdChange.text = "false";
        }
    }else if(alertType === "passwordChange"){
         if(frmSecurityAlertsKA.imgPasswordChangeKA.src=="checkbox_off.png")
        {
            frmSecurityAlertsKA.imgPasswordChangeKA.src="checkbox_on.png";
            frmSecurityAlertsKA.lblPasswordChange.text = "true";
        }else {
             frmSecurityAlertsKA.imgPasswordChangeKA.src="checkbox_off.png";
             frmSecurityAlertsKA.lblPasswordChange.text = "false";
        }
    }else if(alertType === "passwordExpired"){
         if(frmSecurityAlertsKA.imgPasswordExpiredKA.src=="checkbox_off.png")
        {
            frmSecurityAlertsKA.imgPasswordExpiredKA.src="checkbox_on.png";
            frmSecurityAlertsKA.lblPasswordExpired.text = "true";
        }else {
             frmSecurityAlertsKA.imgPasswordExpiredKA.src="checkbox_off.png";
             frmSecurityAlertsKA.lblPasswordExpired.text = "false";
        }
    }else if(alertType === "addressPhoneChanged"){
          if(frmSecurityAlertsKA.imgAddressPhoneChangeKA.src=="checkbox_off.png")
        {
            frmSecurityAlertsKA.imgAddressPhoneChangeKA.src="checkbox_on.png";
            frmSecurityAlertsKA.lblAddressPhoneChange.text = "true";
        }else {
             frmSecurityAlertsKA.imgAddressPhoneChangeKA.src="checkbox_off.png";
             frmSecurityAlertsKA.lblAddressPhoneChange.text = "false";
        }
    }else if(alertType === "newPayeeAdded"){
         if(frmSecurityAlertsKA.imgNewPayeeAddedKA.src=="checkbox_off.png")
        {
            frmSecurityAlertsKA.imgNewPayeeAddedKA.src="checkbox_on.png";
            frmSecurityAlertsKA.lbNewPayeeAdded.text = "true";
        }else {
             frmSecurityAlertsKA.imgNewPayeeAddedKA.src="checkbox_off.png";
             frmSecurityAlertsKA.lbNewPayeeAdded.text = "false";
        }
    }else{
         if(frmSecurityAlertsKA.imgPayeeDetailsUpdatedKA.src=="checkbox_off.png")
        {
            frmSecurityAlertsKA.imgPayeeDetailsUpdatedKA.src="checkbox_on.png";
            frmSecurityAlertsKA.lblPayeeDetailsUpdated.text = "true";
        }else {
             frmSecurityAlertsKA.imgPayeeDetailsUpdatedKA.src="checkbox_off.png";
             frmSecurityAlertsKA.lblPayeeDetailsUpdated.text = "false";
        }
    }

  }//else //if android
  // logic to call update of alert
  
  		  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
		  var controller = INSTANCE.getFormController("frmSecurityAlertsKA");
		  var navigationObject = new kony.sdk.mvvm.NavigationObject();
    	  navigationObject.setDataModel(null, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
		  navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
		  controller.performAction("saveData",[navigationObject]);
}


function updateDealsAlertStatus(alertType){
  if(kony.retailBanking.globalData.deviceInfo.isIphone()){
      if(alertType === "newDealsAvailable"){
         if(frmDealsAlertKA.NewDealsAlertSwitch.selectedIndex===1)
        {
          frmDealsAlertKA.lblNewDeals.text = "false";
        }else {
            frmDealsAlertKA.lblNewDeals.text = "true";
          }
      }else {
          if(frmDealsAlertKA.DealsExpiringAlertSwitch.selectedIndex===1)
        {
          frmDealsAlertKA.lblDealsExpiring.text = "false";
        }else {
            frmDealsAlertKA.lblDealsExpiring.text = "true";
          }
      }
  }else{
     if(alertType === "newDealsAvailable"){
        if(frmDealsAlertKA.imgNewDealsKA.src=="checkbox_off.png")
        {
            frmDealsAlertKA.imgNewDealsKA.src="checkbox_on.png";
            frmDealsAlertKA.lblNewDeals.text = "true";
        }else {
             frmDealsAlertKA.imgNewDealsKA.src="checkbox_off.png";
             frmDealsAlertKA.lblNewDeals.text = "false";
        }
    }else{
         if(frmDealsAlertKA.imgDealsExpiringKA.src=="checkbox_off.png")
        {
            frmDealsAlertKA.imgDealsExpiringKA.src="checkbox_on.png";
            frmDealsAlertKA.lblDealsExpiring.text = "true";
        }else {
             frmDealsAlertKA.imgDealsExpiringKA.src="checkbox_off.png";
             frmDealsAlertKA.lblDealsExpiring.text = "false";
        }
    }

  }//else //if android
  // logic to call update of alert
  
  		  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
		  var controller = INSTANCE.getFormController("frmDealsAlertKA");
		  var navigationObject = new kony.sdk.mvvm.NavigationObject();
    	  navigationObject.setDataModel(null, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
		  navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
		  controller.performAction("saveData",[navigationObject]);
}
/*
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
		  var controller = INSTANCE.getFormController("frmSecurityAlertsKA");
		  var navigationObject = new kony.sdk.mvvm.NavigationObject();
    	  navigationObject.setDataModel(null, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
		  navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
		  controller.performAction("saveData",[navigationObject]);
          
           var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
		  var controller = INSTANCE.getFormController("frmSecurityAlertsKA");
		  var navigationObject = new kony.sdk.mvvm.NavigationObject();
    	  navigationObject.setDataModel(null, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
		  navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
		  controller.performAction("saveData",[navigationObject]);
      	// frmAlertsKA.alertsTypes.isVisible=false;
     // deregisterPush();
       //  updateFlags("alerts",false);
*/