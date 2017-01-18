function setAccountPreviewAndroid()
{  
     var temppdata=kony.store.getItem("settingsflagsObject");
      if(temppdata.rememberMeFlag === true && temppdata.accountPreviewEnabledFlag === true)
       {
          showAccountPreview();
          //frmLoginKA.apScrollEnable.opacity = 0.2;
          //frmLoginKA.loginMainScreen.opacity = 0.2;
       }
      else
     	showAlertAccounts();
}

function AccountPreviewiPad(myWidget,gestureInfo)
{
  var temppdata=kony.store.getItem("settingsflagsObject");
  if(temppdata.rememberMeFlag === true && temppdata.accountPreviewEnabledFlag === true)
    {
       var swipedSide = gestureInfo.swipeDirection;
  		if(swipedSide === 1) 
  			   apUnAnimate();
      
  	    else if(swipedSide === 2)
           showAccountPreview();
    }
   else
        showAlertAccounts(); 
}


function showAccountPreview()
{
  if (kony.sdk.mvvm.isNetworkAvailabile())
  {
  		if (kony.sdk.mvvm.KonyApplicationContext.getAppInstance())
          {
            ShowLoadingScreen();
            var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
            var options ={    "access": "online",
                            "objectName": "RBObjects"
                         };
            var serviceName = "RBObjects";
            var modelObj = INSTANCE.getModel("Accounts",serviceName,options);
            var dataObject = new kony.sdk.dto.DataObject("Accounts");
            var username =  DecryptValue(kony.store.getItem("userName"));
            var authParamKey = kony.retailBanking.globalData.deviceInfo.getDeviceInfo().deviceID; 
            var serviceOptions = {"dataObject":dataObject,"queryParams":{"userName": username,"deviceID":authParamKey}};
            modelObj.fetch(serviceOptions,preloginAccountsSuccess,preloginAccountError);
          }
         else
           showAccountsError("Error in Fetching Accounts.","Please try after sometime.");
  }
  else
    showAccountsError("The app is currently offline.","Please check device connectivity.");
  
}

function preloginAccountError(err)
{
  kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
  showAccountsError("Error in Fetching Accounts","Please try after sometime.");
}

function showAccountsError(errMsg,errType)
{
  frmLoginKA.flxAccountsSegment.setVisibility(false);
  frmLoginKA.flxNodata.setVisibility(true);
   frmLoginKA.lbltimeStampKA.setVisibility(false);
  frmLoginKA.lblNodatafetched.text=errMsg;
  frmLoginKA.lblErrorData.text=errType;
  apAnimate();
}

function preloginAccountsSuccess(response)
{
 		   var accPreviewData=response;
           var availableBal,currBal,outstandingBal;
           for(var i=0;i< accPreviewData.length;i++){
           if( accPreviewData[i]["nickName"])
              accPreviewData[i].accountName = kony.retailBanking.util.validation.trucateTo( accPreviewData[i]["nickName"],35,32,"...");
           else
           {
              var accountNumber =  accPreviewData[i]["accountID"];
              accPreviewData[i].accountName =   accPreviewData[i]["accountName"] + accountNumber.substring(accountNumber.length-4, accountNumber.length);
           }
             
           var accountType = accPreviewData[i]["accountType"];
           if(accPreviewData[i]["availableBalance"])
               availableBal = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accPreviewData[i]["availableBalance"]);
        
		   if(accPreviewData[i]["currentBalance"])
				currBal = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accPreviewData[i]["currentBalance"]);
		  
		  if(accPreviewData[i]["outstandingBalance"])
				outstandingBal = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accPreviewData[i]["outstandingBalance"]);
		   
		  if(accPreviewData[i]["accountType"]=="CreditCard")
				currBal = "-"+currBal;
				
		if (accountType === kony.retailBanking.globalData.globals.Checking){
			accPreviewData[i].availableBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: availableBal};
			accPreviewData[i].currentBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: currBal};
			accPreviewData[i].outstandingBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: outstandingBal};
			accPreviewData[i].flxClr= {skin:getSkinColor(accPreviewData[i].accountType)};
            accPreviewData[i]["accountType"] = i18n_availableBalance;
        } else if (accountType === kony.retailBanking.globalData.globals.Savings){
            accPreviewData[i].availableBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: availableBal};
            accPreviewData[i].currentBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: currBal};
            accPreviewData[i].outstandingBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: outstandingBal};       
            accPreviewData[i].flxClr= {skin:getSkinColor(accPreviewData[i].accountType)};
            accPreviewData[i]["accountType"] = i18n_availableBalance;
        } else if (accountType === kony.retailBanking.globalData.globals.CreditCard){
            accPreviewData[i].availableBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: availableBal};
            accPreviewData[i].currentBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: currBal};
            accPreviewData[i].outstandingBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: outstandingBal};
            accPreviewData[i].flxClr= {skin:getSkinColor(accPreviewData[i].accountType)};
            accPreviewData[i]["accountType"] = i18n_currentBalance;
        }else if (accountType === kony.retailBanking.globalData.globals.Deposit){
            accPreviewData[i].availableBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: availableBal};
            accPreviewData[i].currentBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: currBal};
            accPreviewData[i].outstandingBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: outstandingBal};
            accPreviewData[i].flxClr= {skin:getSkinColor(accPreviewData[i].accountType)};
            accPreviewData[i]["accountType"] = i18n_currentBalance;
        } else if (accountType == kony.retailBanking.globalData.globals.Mortgage){
            accPreviewData[i].availableBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: availableBal};
            accPreviewData[i].currentBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: currBal};
            accPreviewData[i].outstandingBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: outstandingBal};
            accPreviewData[i].flxClr= {skin:getSkinColor(accPreviewData[i].accountType)};
            accPreviewData[i]["accountType"] = i18n_outStandingBalance;
        }
          accPreviewData[i].bankName= kony.retailBanking.util.validation.trucateTo(accPreviewData[i].bankName,35,32,"...");
        }
          
         frmLoginKA.segAccountInfoData.widgetDataMap={
              nameAccount1:"accountName",
              amountAccount1:"availableBalance",
              typeAccount:"accountType",
	          lblBankName:"bankName",
              lblColorKA:"flxClr"
                             };
  
  frmLoginKA.segAccountInfoData.setData(accPreviewData);
  frmLoginKA.accountPreviewCard.setVisibility(true);
  var date = new Date();
  var timeStampNow = date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear()+" "+date.timeNow();
  frmLoginKA.lbltimeStampKA.text= kony.i18n.getLocalizedString("i18n.login.asOf")+" "+timeStampNow;
  kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
  frmLoginKA.lbltimeStampKA.setVisibility(true);
  frmLoginKA.flxAccountsSegment.setVisibility(true);
  frmLoginKA.flxNodata.setVisibility(false);
  apAnimate();


}


function showAlertAccounts()
{
  accountsAlert = kony.ui.Alert({
	"message": i18n_accountPreviewAlert,
	"alertType": constants.ALERT_TYPE_INFO,
	"alertTitle":i18n_btnInfo,
	"yesLabel": i18n_ok,
	"noLabel": null,
	"alertHandler":changeopacity
	},{}); 
}

function changeopacity()
{
  frmLoginKA.loginMainScreen.opacity = 1;
}






