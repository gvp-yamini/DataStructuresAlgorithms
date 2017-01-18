userAgent = kony.os.userAgent();
function cancelCheckReOrderListForm(form)
{
  clearRightContainer(frmTransferPayLandingKA,"accountTransactionWrapper","rightWrapper");
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController(form);
  var navObject = new kony.sdk.mvvm.NavigationObject();
  navObject.setRequestOptions("recentTransactions",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  listController.performAction("navigateTo",[form,navObject]);
  //return;
}

function onclicksegmentCheck(type)
{
  type= type;
  if(frmNewCheckReOrderKA && frmNewCheckReOrderKA[type+"CardTitle"]){
      frmNewCheckReOrderKA[type+"CardTitle"].setVisibility(false);
      frmNewCheckReOrderKA[type+"CardInner"].setVisibility(false);
      frmNewCheckReOrderKA[type+"AccountPick"].setVisibility(true);
  }else if(moreLanding && moreLanding[type+"CardTitle"]){
    moreLanding[type+"CardTitle"].setVisibility(false);
    moreLanding[type+"CardInner"].setVisibility(false);
    moreLanding[type+"AccountPick"].setVisibility(true);
  }else{
    accountsLanding[type+"CardTitle"].setVisibility(false);
    accountsLanding[type+"CardInner"].setVisibility(false);
    accountsLanding[type+"AccountPick"].setVisibility(true);
  }

}
function onclickCheckReOrderEdit(type)
{
  type= type;
  if(frmNewCheckReOrderKA && frmNewCheckReOrderKA[type+"CardTitle"]){
    frmNewCheckReOrderKA[type+"CardTitle"].setVisibility(true);
    frmNewCheckReOrderKA[type+"CardInner"].setVisibility(true);
    frmNewCheckReOrderKA[type+"AccountPick"].setVisibility(false);
    frmNewCheckReOrderKA.fromCardInner.opacity=1;
    frmNewCheckReOrderKA.fromCardTitle.opacity=1;
  }else if(moreLanding && moreLanding[type+"CardTitle"]){
    moreLanding[type+"CardTitle"].setVisibility(true);
    moreLanding[type+"CardInner"].setVisibility(true);
    moreLanding[type+"AccountPick"].setVisibility(false);
    moreLanding.fromCardInner.opacity=1;
    moreLanding.fromCardTitle.opacity=1;
  }else{
    accountsLanding[type+"CardTitle"].setVisibility(true);
    accountsLanding[type+"CardInner"].setVisibility(true);
    accountsLanding[type+"AccountPick"].setVisibility(false);
    accountsLanding.fromCardInner.opacity=1;
    accountsLanding.fromCardTitle.opacity=1;
  }
}

function backTOListFormCheckReOrder(){
  navigateToCheckReOrder();
}
function alertCallCheckReOrder(){
  var phNum = "284-123-1235";
  function onClickCall(response){
if(response){
  try
	{
          kony.phone.dial(phNum);
	} 
	catch(err)
	{
		alert(i18n_dailError+" "+err);
	}
 }
}
kony.ui.Alert({
        "alertType": constants.ALERT_TYPE_CONFIRMATION,
        "alertTitle": i18n_call,
        "yesLabel": i18n_call,
        "noLabel": i18n_cancel,
        "alertIcon": "phone_icon_inactive.png",
        "message": phNum,
        "alertHandler": onClickCall 
    }, {
        "iconPosition": constants.ALERT_ICON_POSITION_LEFT
    })
}
function navigateToCheckReOrder(){
     var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
      var controller = INSTANCE.getFormController("frmCheckReOrderListKA");
      var navObject = new kony.sdk.mvvm.NavigationObject();
      navObject.setRequestOptions("contactsegment",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
      controller.loadDataAndShowForm(navObject);
}
function navigateToCheckReOrderNewConfirmation(){
  var addressType;
   if (userAgent == "iPhone" || userAgent == "iPad"){
            if(frmNewCheckReOrderKA && frmNewCheckReOrderKA.imgSpecifyAddress){
              if(frmNewCheckReOrderKA.imgSpecifyAddress.src =="radioselected.png"){
                 addressType = "SpecifyNew";
               }else{
                 addressType = "AccountAddress";
               }
            }else if(moreLanding && moreLanding.imgSpecifyAddress){
              if(moreLanding.imgSpecifyAddress.src =="radioselected.png"){
                 addressType = "SpecifyNew";
               }else{
                 addressType = "AccountAddress";
               }
            }else{
               if(accountsLanding.imgSpecifyAddress.src =="radioselected.png"){
                 addressType = "SpecifyNew";
               }else{
                 addressType = "AccountAddress";
               }
            }
               
   }else{
     if(frmNewCheckReOrderKA && frmNewCheckReOrderKA.radioAddressType){
       addressType = frmNewCheckReOrderKA.radioAddressType.selectedKey;
     }else if(moreLanding && moreLanding.radioAddressType){
       addressType = moreLanding.radioAddressType.selectedKey;
     }else{
       addressType = accountsLanding.radioAddressType.selectedKey;
     }
   }
  var valid = true;
      if(frmNewCheckReOrderKA && frmNewCheckReOrderKA.lblStreetNameKA){
              if(addressType=="SpecifyNew"){
        var addline1 = frmNewCheckReOrderKA.lblStreetNameKA.text;
        if(addline1.trim() == ""){
          valid = false;
        }
        var addline2 = frmNewCheckReOrderKA.lblPostBoxKA.text;
        if(addline2.trim()==""){
          valid = false;
        }
        var state = frmNewCheckReOrderKA.lblCountryKA.text;
        if(state.trim()==""){
          valid = false;
        }
       var country = frmNewCheckReOrderKA.lblRegionKA.text;
        if(country.trim()==""){
          valid = false;
        }
      var zipcode = frmNewCheckReOrderKA.lblZipKA.text;
      if(zipcode.trim()==""){
        valid = false;
      }
      setSpecifiedAccountInCheckReOrder();
      }
      }else if(moreLanding && moreLanding.lblStreetNameKA.text){
              if(addressType=="SpecifyNew"){
        var addline1 = moreLanding.lblStreetNameKA.text;
        if(addline1.trim() == ""){
          valid = false;
        }
        var addline2 = moreLanding.lblPostBoxKA.text;
        if(addline2.trim()==""){
          valid = false;
        }
        var state = moreLanding.lblCountryKA.text;
        if(state.trim()==""){
          valid = false;
        }
       var country = moreLanding.lblRegionKA.text;
        if(country.trim()==""){
          valid = false;
        }
      var zipcode = moreLanding.lblZipKA.text;
      if(zipcode.trim()==""){
        valid = false;
      }
      setSpecifiedAccountInCheckReOrder();
      }
      }else{
               if(addressType=="SpecifyNew"){
        var addline1 = accountsLanding.lblStreetNameKA.text;
        if(addline1.trim() == ""){
          valid = false;
        }
        var addline2 = accountsLanding.lblPostBoxKA.text;
        if(addline2.trim()==""){
          valid = false;
        }
        var state = accountsLanding.lblCountryKA.text;
        if(state.trim()==""){
          valid = false;
        }
       var country = accountsLanding.lblRegionKA.text;
        if(country.trim()==""){
          valid = false;
        }
      var zipcode = accountsLanding.lblZipKA.text;
      if(zipcode.trim()==""){
        valid = false;
      }
      setSpecifiedAccountInCheckReOrder();
      }
      }
       if(frmNewCheckReOrderKA && frmNewCheckReOrderKA.fromlblAccountNumberKA){
         var accountId = frmNewCheckReOrderKA.fromlblAccountNumberKA.text;
       }else if(moreLanding && moreLanding.fromlblAccountNumberKA){
         var accountId = moreLanding.fromlblAccountNumberKA.text;
       }else{
         var accountId = accountsLanding.fromlblAccountNumberKA.text;
       }
       
      if(!valid){
        alert("Please enter a valid address with all fields");
      }else if(accountId.trim()==""){
        alert("Please select an account");
      }else{
        frmCheckReorderConfirmationKA.accountId.text = accountId;
        var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var listController = INSTANCE.getFormController("frmCheckReorderConfirmationKA");
        var navigationObject = new kony.sdk.mvvm.NavigationObject();
        var datamodelflxAddressKA = new kony.sdk.mvvm.DataModel();
        navigationObject.setDataModel(null,kony.sdk.mvvm.OperationType.ADD, "form");
        navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}}); 
        listController.loadDataAndShowForm(navigationObject);
      }

}
function setNullToUserAddressInCheckReOrder(){
    if(frmNewCheckReOrderKA && frmNewCheckReOrderKA.lblaccountName){
      frmNewCheckReOrderKA.lblaccountName.text = "";
	  frmNewCheckReOrderKA.lblPostBoxNumber.text = "";
	  frmNewCheckReOrderKA.lblStreetKA.text = "";
	  frmNewCheckReOrderKA.lblRegionKAMain.text = "";
	  frmNewCheckReOrderKA.lblZipCodeKA.text = "";
    }else if(moreLanding && moreLanding.lblaccountName.text){
      moreLanding.lblaccountName.text = "";
	  moreLanding.lblPostBoxNumber.text = "";
	  moreLanding.lblStreetKA.text = "";
	  moreLanding.lblRegionKAMain.text = "";
	  moreLanding.lblZipCodeKA.text = "";
    }else{
      accountsLanding.lblaccountName.text = "";
	  accountsLanding.lblPostBoxNumber.text = "";
	  accountsLanding.lblStreetKA.text = "";
	  accountsLanding.lblRegionKAMain.text = "";
	  accountsLanding.lblZipCodeKA.text = "";
    }
	
}
function setAccountAddressInCheckReOrder(){
    setNullToUserAddressInCheckReOrder();
    if(frmNewCheckReOrderKA && frmNewCheckReOrderKA.lblaccountName){
      	frmNewCheckReOrderKA.lblaccountName.text = kony.retailBanking.globalData.globals.userObj.addressLine1;
	frmNewCheckReOrderKA.lblPostBoxNumber.text = kony.retailBanking.globalData.globals.userObj.addressLine2;
	frmNewCheckReOrderKA.lblStreetKA.text = kony.retailBanking.globalData.globals.userObj.state;
	frmNewCheckReOrderKA.lblRegionKAMain.text = kony.retailBanking.globalData.globals.userObj.country;
	frmNewCheckReOrderKA.lblZipCodeKA.text = kony.retailBanking.globalData.globals.userObj.zipcode;
    }else if(moreLanding && moreLanding.lblaccountName){
      	moreLanding.lblaccountName.text = kony.retailBanking.globalData.globals.userObj.addressLine1;
	moreLanding.lblPostBoxNumber.text = kony.retailBanking.globalData.globals.userObj.addressLine2;
	moreLanding.lblStreetKA.text = kony.retailBanking.globalData.globals.userObj.state;
	moreLanding.lblRegionKAMain.text = kony.retailBanking.globalData.globals.userObj.country;
	moreLanding.lblZipCodeKA.text = kony.retailBanking.globalData.globals.userObj.zipcode;
    }else{
      accountsLanding.lblaccountName.text = kony.retailBanking.globalData.globals.userObj.addressLine1;
	accountsLanding.lblPostBoxNumber.text = kony.retailBanking.globalData.globals.userObj.addressLine2;
	accountsLanding.lblStreetKA.text = kony.retailBanking.globalData.globals.userObj.state;
	accountsLanding.lblRegionKAMain.text = kony.retailBanking.globalData.globals.userObj.country;
	accountsLanding.lblZipCodeKA.text = kony.retailBanking.globalData.globals.userObj.zipcode;
    }

}

function setSpecifiedAccountInCheckReOrder(){
    setNullToUserAddressInCheckReOrder();
     var addressType;
   if (userAgent == "iPhone" || userAgent == "iPad"){
               if(frmNewCheckReOrderKA && frmNewCheckReOrderKA.imgSpecifyAddress){
                 if(frmNewCheckReOrderKA.imgSpecifyAddress.src =="radioselected.png"){
                 addressType = "SpecifyNew";
               }else{
                 addressType = "AccountAddress";
               }
               }else if(moreLanding && moreLanding.imgSpecifyAddress){
                 if(moreLanding.imgSpecifyAddress.src =="radioselected.png"){
                 addressType = "SpecifyNew";
               }else{
                 addressType = "AccountAddress";
               }
               }else{
                  if(accountsLanding.imgSpecifyAddress.src =="radioselected.png"){
                 addressType = "SpecifyNew";
               }else{
                 addressType = "AccountAddress";
               }
               }
               
   }else{
     if(frmNewCheckReOrderKA && frmNewCheckReOrderKA.radioAddressType){
       addressType = frmNewCheckReOrderKA.radioAddressType.selectedKey;
     }else if(moreLanding && moreLanding.radioAddressType){
       addressType = moreLanding.radioAddressType.selectedKey;
     }else{
       addressType = accountsLanding.radioAddressType.selectedKey;
     }
   }
if(addressType=="SpecifyNew"){
    if(frmNewCheckReOrderKA && frmNewCheckReOrderKA.lblaccountName){
      frmNewCheckReOrderKA.lblaccountName.text = frmNewCheckReOrderKA.lblStreetNameKA.text;
	frmNewCheckReOrderKA.lblPostBoxNumber.text = frmNewCheckReOrderKA.lblPostBoxKA.text;
	frmNewCheckReOrderKA.lblStreetKA.text = frmNewCheckReOrderKA.lblCountryKA.text;
	frmNewCheckReOrderKA.lblRegionKAMain.text = frmNewCheckReOrderKA.lblRegionKA.text;
	frmNewCheckReOrderKA.lblZipCodeKA.text = frmNewCheckReOrderKA.lblZipKA.text;
    }else if(moreLanding && moreLanding.lblaccountName){
       moreLanding.lblaccountName.text = moreLanding.lblStreetNameKA.text;
	moreLanding.lblPostBoxNumber.text = moreLanding.lblPostBoxKA.text;
	moreLanding.lblStreetKA.text = moreLanding.lblCountryKA.text;
	moreLanding.lblRegionKAMain.text = moreLanding.lblRegionKA.text;
	moreLanding.lblZipCodeKA.text = moreLanding.lblZipKA.text;
    }else{
       accountsLanding.lblaccountName.text = accountsLanding.lblStreetNameKA.text;
	accountsLanding.lblPostBoxNumber.text = accountsLanding.lblPostBoxKA.text;
	accountsLanding.lblStreetKA.text = accountsLanding.lblCountryKA.text;
	accountsLanding.lblRegionKAMain.text = accountsLanding.lblRegionKA.text;
	accountsLanding.lblZipCodeKA.text = accountsLanding.lblZipKA.text;
    }
}
}


function checkReOrderListFormatting(Data,segmentName){
    var segCheckReOrderListData = Data[segmentName][segmentName].getData();
    if(segCheckReOrderListData && segCheckReOrderListData.length>0)
    {
      var processedSegData = [ ];
      var processedRowObj;
      for(var i in segCheckReOrderListData){
          processedRowObj = {};
          processedRowObj["accountNickName"] = kony.retailBanking.util.validation.trucateTo(segCheckReOrderListData[i]["accountNickName"],35,32,"...");
          processedRowObj["leafCount"] = "Leaflets: "+ segCheckReOrderListData[i]["leafCount"];
		  processedRowObj["orderTime"] = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(segCheckReOrderListData[i]["orderTime"]);
		  processedRowObj["status"] = segCheckReOrderListData[i]["status"];
		  processedRowObj["chevron"] = {
          "isVisible": true,
          "src" :"right_chevron_icon.png"
        };
        processedRowObj["checkOrderID"]=segCheckReOrderListData[i]["checkOrderID"];
        
		processedSegData.push(processedRowObj);
      }
      Data[segmentName][segmentName].setData(processedSegData);
    }
  return Data;
}

function navigateToNewCheckOrder(){
        var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var listController = INSTANCE.getFormController("frmNewCheckReOrderKA");
        var navigationObject = new kony.sdk.mvvm.NavigationObject();
        var datamodelflxAddressKA = new kony.sdk.mvvm.DataModel();
        navigationObject.setDataModel(null,kony.sdk.mvvm.OperationType.ADD, "form");
        navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}}); 
        listController.performAction("navigateTo",["frmNewCheckReOrderKA",navigationObject]);
}

function getFilteredFromAccountsForCheckReOrder(fromAccountsData){
	var fromData = [];
   for(var i in fromAccountsData)
  {
    
    if( fromAccountsData[i]["accountType"]===kony.retailBanking.globalData.globals.Checking)
    {
      fromData.push(fromAccountsData[i]);
     
    }else if(fromAccountsData[i]["accountType"]===kony.retailBanking.globalData.globals.Savings){
	  fromData.push(fromAccountsData[i]);
	}
  }
  return fromData;
}

function getSelectedFromCheckReOrder(){
     if(frmNewCheckReOrderKA && frmNewCheckReOrderKA.segInternalFromAccountsPayKA){
            var selectedAccount =frmNewCheckReOrderKA.segInternalFromAccountsPayKA.selectedItems;
     frmNewCheckReOrderKA.fromNamePick.text = selectedAccount[0]["accountName"];
	 frmNewCheckReOrderKA.lblFromAccountBankNameKA.text = selectedAccount[0]["bankName"];  
	 var accountType = selectedAccount[0]["accountType"];
	 var accountId = selectedAccount[0]["accountID"];
//        accPreviewData[i].availableBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: availableBal};
//        accPreviewData[i].currentBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: currBal};
//        accPreviewData[i].outstandingBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: outstandingBal};
  
      if (accountType === kony.retailBanking.globalData.globals.Checking){
         frmNewCheckReOrderKA.amountAccountOne.text = i18n_availableBalance;
         frmNewCheckReOrderKA.fromAmountPick.text = selectedAccount[0]["availableBalance"].text;//kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(selectedAccount[0]["availableBalance"],kony.retailBanking.globalData.globals.CurrencyCode); //selectedAccount[0]["availableBalance"].text;
         frmNewCheckReOrderKA.fromAccountColorPick.skin = getSkinColor(accountType); 
    } else if (accountType === kony.retailBanking.globalData.globals.Savings){
         frmNewCheckReOrderKA.amountAccountOne.text = i18n_availableBalance;
         frmNewCheckReOrderKA.fromAmountPick.text = selectedAccount[0]["availableBalance"].text;// kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(selectedAccount[0]["availableBalance"],kony.retailBanking.globalData.globals.CurrencyCode);
         frmNewCheckReOrderKA.fromAccountColorPick.skin = getSkinColor(accountType);  
    }  else if (accountType === kony.retailBanking.globalData.globals.CreditCard){
         frmNewCheckReOrderKA.amountAccountOne.text = i18n_availableBalance;
         frmNewCheckReOrderKA.fromAmountPick.text = selectedAccount[0]["availableBalance"].text; //{skin :getSknlblAmount(selectedAccount[0]["currentBalance"]),text: currBal};//getSkinColor(selectedAccount[0]["currentBalance"].text); //kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(selectedAccount[0]["currentBalance"],kony.retailBanking.globalData.globals.CurrencyCode);
         frmNewCheckReOrderKA.fromAccountColorPick.skin = getSkinColor(accountType); 
    }else if (accountType === kony.retailBanking.globalData.globals.Deposit){
         frmNewCheckReOrderKA.amountAccountOne.text = i18n_availableBalance;
         frmNewCheckReOrderKA.fromAmountPick.text = selectedAccount[0]["availableBalance"].text;//kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(selectedAccount[0]["currentBalance"],kony.retailBanking.globalData.globals.CurrencyCode);
         frmNewCheckReOrderKA.fromAccountColorPick.skin = getSkinColor(accountType); 
    } 
    else if (accountType == kony.retailBanking.globalData.globals.Mortgage){
         frmNewCheckReOrderKA.amountAccountOne.text = i18n_outStandingBalance;
         frmNewCheckReOrderKA.fromAmountPick.text =selectedAccount[0]["outstandingBalance"].text; //kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(selectedAccount[0]["outstandingBalance"],kony.retailBanking.globalData.globals.CurrencyCode);
         frmNewCheckReOrderKA.fromAccountColorPick.skin = getSkinColor(accountType); 
    }
   frmNewCheckReOrderKA.fromlblAccountNumberKA.text = selectedAccount[0]["accountID"];
     }else if(moreLanding && moreLanding.segInternalFromAccountsPayKA){
            var selectedAccount =moreLanding.segInternalFromAccountsPayKA.selectedItems;
     moreLanding.fromNamePick.text = selectedAccount[0]["accountName"];
	 moreLanding.lblFromAccountBankNameKA.text = selectedAccount[0]["bankName"];  
	 var accountType = selectedAccount[0]["accountType"];
	 var accountId = selectedAccount[0]["accountID"];
//        accPreviewData[i].availableBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: availableBal};
//        accPreviewData[i].currentBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: currBal};
//        accPreviewData[i].outstandingBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: outstandingBal};
  
      if (accountType === kony.retailBanking.globalData.globals.Checking){
         moreLanding.amountAccountOne.text = i18n_availableBalance;
         moreLanding.fromAmountPick.text = selectedAccount[0]["availableBalance"].text;//kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(selectedAccount[0]["availableBalance"],kony.retailBanking.globalData.globals.CurrencyCode); //selectedAccount[0]["availableBalance"].text;
         moreLanding.fromAccountColorPick.skin = getSkinColor(accountType); 
    } else if (accountType === kony.retailBanking.globalData.globals.Savings){
         moreLanding.amountAccountOne.text = i18n_availableBalance;
         moreLanding.fromAmountPick.text = selectedAccount[0]["availableBalance"].text;// kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(selectedAccount[0]["availableBalance"],kony.retailBanking.globalData.globals.CurrencyCode);
         moreLanding.fromAccountColorPick.skin = getSkinColor(accountType);  
    }  else if (accountType === kony.retailBanking.globalData.globals.CreditCard){
         moreLanding.amountAccountOne.text = i18n_availableBalance;
         moreLanding.fromAmountPick.text = selectedAccount[0]["availableBalance"].text; //{skin :getSknlblAmount(selectedAccount[0]["currentBalance"]),text: currBal};//getSkinColor(selectedAccount[0]["currentBalance"].text); //kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(selectedAccount[0]["currentBalance"],kony.retailBanking.globalData.globals.CurrencyCode);
         moreLanding.fromAccountColorPick.skin = getSkinColor(accountType); 
    }else if (accountType === kony.retailBanking.globalData.globals.Deposit){
         moreLanding.amountAccountOne.text = i18n_availableBalance;
         moreLanding.fromAmountPick.text = selectedAccount[0]["availableBalance"].text;//kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(selectedAccount[0]["currentBalance"],kony.retailBanking.globalData.globals.CurrencyCode);
         moreLanding.fromAccountColorPick.skin = getSkinColor(accountType); 
    } 
    else if (accountType == kony.retailBanking.globalData.globals.Mortgage){
         moreLanding.amountAccountOne.text = i18n_outStandingBalance;
         moreLanding.fromAmountPick.text =selectedAccount[0]["outstandingBalance"].text; //kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(selectedAccount[0]["outstandingBalance"],kony.retailBanking.globalData.globals.CurrencyCode);
         moreLanding.fromAccountColorPick.skin = getSkinColor(accountType); 
    }
   moreLanding.fromlblAccountNumberKA.text = selectedAccount[0]["accountID"];
     }else{
       var selectedAccount =accountsLanding.segInternalFromAccountsPayKA.selectedItems;
     accountsLanding.fromNamePick.text = selectedAccount[0]["accountName"];
	 accountsLanding.lblFromAccountBankNameKA.text = selectedAccount[0]["bankName"];  
	 var accountType = selectedAccount[0]["accountType"];
	 var accountId = selectedAccount[0]["accountID"];
//        accPreviewData[i].availableBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: availableBal};
//        accPreviewData[i].currentBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: currBal};
//        accPreviewData[i].outstandingBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: outstandingBal};
  
      if (accountType === kony.retailBanking.globalData.globals.Checking){
         accountsLanding.amountAccountOne.text = i18n_availableBalance;
         accountsLanding.fromAmountPick.text = selectedAccount[0]["availableBalance"].text;//kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(selectedAccount[0]["availableBalance"],kony.retailBanking.globalData.globals.CurrencyCode); //selectedAccount[0]["availableBalance"].text;
         accountsLanding.fromAccountColorPick.skin = getSkinColor(accountType); 
    } else if (accountType === kony.retailBanking.globalData.globals.Savings){
         accountsLanding.amountAccountOne.text = i18n_availableBalance;
         accountsLanding.fromAmountPick.text = selectedAccount[0]["availableBalance"].text;// kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(selectedAccount[0]["availableBalance"],kony.retailBanking.globalData.globals.CurrencyCode);
         accountsLanding.fromAccountColorPick.skin = getSkinColor(accountType);  
    }  else if (accountType === kony.retailBanking.globalData.globals.CreditCard){
         accountsLanding.amountAccountOne.text = i18n_availableBalance;
         accountsLanding.fromAmountPick.text = selectedAccount[0]["availableBalance"].text; //{skin :getSknlblAmount(selectedAccount[0]["currentBalance"]),text: currBal};//getSkinColor(selectedAccount[0]["currentBalance"].text); //kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(selectedAccount[0]["currentBalance"],kony.retailBanking.globalData.globals.CurrencyCode);
         accountsLanding.fromAccountColorPick.skin = getSkinColor(accountType); 
    }else if (accountType === kony.retailBanking.globalData.globals.Deposit){
         accountsLanding.amountAccountOne.text = i18n_availableBalance;
         accountsLanding.fromAmountPick.text = selectedAccount[0]["availableBalance"].text;//kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(selectedAccount[0]["currentBalance"],kony.retailBanking.globalData.globals.CurrencyCode);
         accountsLanding.fromAccountColorPick.skin = getSkinColor(accountType); 
    } 
    else if (accountType == kony.retailBanking.globalData.globals.Mortgage){
         accountsLanding.amountAccountOne.text = i18n_outStandingBalance;
         accountsLanding.fromAmountPick.text =selectedAccount[0]["outstandingBalance"].text; //kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(selectedAccount[0]["outstandingBalance"],kony.retailBanking.globalData.globals.CurrencyCode);
         accountsLanding.fromAccountColorPick.skin = getSkinColor(accountType); 
    }
   accountsLanding.fromlblAccountNumberKA.text = selectedAccount[0]["accountID"];
     }

 }


function navigateToCheckReOrderDetails(){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmCheckReOrderListKA");
  var viewModel = controller.getFormModel();
  var selectedRecord = viewModel.getViewAttributeByProperty("contactsegment", "selectedItems")[0];
  var checkOrderID = selectedRecord["checkOrderID"];
  var navigationObject = new kony.sdk.mvvm.NavigationObject;
  var datamodel = new kony.sdk.mvvm.DataModel;
  navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
  navigationObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"checkOrderID": checkOrderID}});
  controller.performAction("navigateTo",["frmCheckReorderDetailsKA",navigationObject]);
}

function editCheckReOrderScreen(){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
var listController = INSTANCE.getFormController("moreLanding");
var formmodel = listController.getFormModel();
var CheckObject = {};
  if(moreLanding && moreLanding.accountId){
    var accountId = moreLanding.accountId.text; 
var accountdata = moreLanding.accountNicknameTextfield.text;
var leafCount = moreLanding.lblNumberOfLeafletsVal.text;
var name = moreLanding.lblaccountNameKA.text;
var postboxNumber =  moreLanding.lblPostBoxNumberKA.text;
var state = moreLanding.lblStreetK.text;
var country = moreLanding.lblZipCodeK.text;
var zipcode = moreLanding.CopylblZipCodeKA0bcd5e742ad7a42.text;
  }else{
    var accountId = accountsLanding.accountId.text; 
var accountdata = accountsLanding.accountNicknameTextfield.text;
var leafCount = accountsLanding.lblNumberOfLeafletsVal.text;
var name = accountsLanding.lblaccountNameKA.text;
var postboxNumber =  accountsLanding.lblPostBoxNumberKA.text;
var state = accountsLanding.lblStreetK.text;
var country = accountsLanding.lblZipCodeK.text;
var zipcode = accountsLanding.CopylblZipCodeKA0bcd5e742ad7a42.text;
  }

CheckObject = {
"accountdata" : accountId,
"leafCount" : leafCount,
"name": name,
"postboxNumber" : postboxNumber,
"state" : state,
"country": country,
"zipcode":zipcode
};
newCheckReOrderPreShow("EDIT",CheckObject);
}

function setSelectedImageNumberofLeafLets20(){
  if(frmNewCheckReOrderKA && frmNewCheckReOrderKA.img20KA){
    frmNewCheckReOrderKA.img20KA.src = "radioselected.png";
  frmNewCheckReOrderKA.img30KA.src = "radiononselected.png";
  frmNewCheckReOrderKA.img40KA.src = "radiononselected.png";
  frmNewCheckReOrderKA.lblNumberOfLeafLetsKA.text = "20";
  }else if(moreLanding && moreLanding.img20KA){
    moreLanding.img20KA.src = "radioselected.png";
  moreLanding.img30KA.src = "radiononselected.png";
  moreLanding.img40KA.src = "radiononselected.png";
  moreLanding.lblNumberOfLeafLetsKA.text = "20";
  }else{
     accountsLanding.img20KA.src = "radioselected.png";
  accountsLanding.img30KA.src = "radiononselected.png";
  accountsLanding.img40KA.src = "radiononselected.png";
  accountsLanding.lblNumberOfLeafLetsKA.text = "20";
  }
}

function setSelectedImageNumberofLeafLets30(){
  if(frmNewCheckReOrderKA && frmNewCheckReOrderKA.img20KA){
    frmNewCheckReOrderKA.img20KA.src = "radiononselected.png";
  frmNewCheckReOrderKA.img30KA.src = "radioselected.png";
  frmNewCheckReOrderKA.img40KA.src = "radiononselected.png";
  frmNewCheckReOrderKA.lblNumberOfLeafLetsKA.text = "30";
  }else if(moreLanding && moreLanding.img20KA){
    moreLanding.img20KA.src = "radiononselected.png";
  moreLanding.img30KA.src = "radioselected.png";
  moreLanding.img40KA.src = "radiononselected.png";
  moreLanding.lblNumberOfLeafLetsKA.text = "30";
  }else{
     accountsLanding.img20KA.src = "radiononselected.png";
  accountsLanding.img30KA.src = "radioselected.png";
  accountsLanding.img40KA.src = "radiononselected.png";
  accountsLanding.lblNumberOfLeafLetsKA.text = "30";
  }
  
}
function setSelectedImageNumberofLeafLets40(){
  if(frmNewCheckReOrderKA && frmNewCheckReOrderKA.img20KA){
      frmNewCheckReOrderKA.img20KA.src = "radiononselected.png";
  frmNewCheckReOrderKA.img30KA.src = "radiononselected.png";
  frmNewCheckReOrderKA.img40KA.src = "radioselected.png";
  frmNewCheckReOrderKA.lblNumberOfLeafLetsKA.text = "40";
  }else if(moreLanding && moreLanding.img20KA){
      moreLanding.img20KA.src = "radiononselected.png";
  moreLanding.img30KA.src = "radiononselected.png";
  moreLanding.img40KA.src = "radioselected.png";
  moreLanding.lblNumberOfLeafLetsKA.text = "40";
  }else{
    accountsLanding.img20KA.src = "radiononselected.png";
  accountsLanding.img30KA.src = "radiononselected.png";
  accountsLanding.img40KA.src = "radioselected.png";
  accountsLanding.lblNumberOfLeafLetsKA.text = "40";
  }

}
function setselectedAddressTypeAccounts(){
  if(frmNewCheckReOrderKA && frmNewCheckReOrderKA.imgAccountAddress){
      frmNewCheckReOrderKA.imgAccountAddress.src = "radioselected.png";
  frmNewCheckReOrderKA.imgSpecifyAddress.src = "radiononselected.png";
  setAccountAddressInCheckReOrder();
  frmNewCheckReOrderKA.flxAccountAddressKA.isVisible = true;
  frmNewCheckReOrderKA.flxSpecifyAddressKA.isVisible = false;
  }else if(moreLanding && moreLanding.imgAccountAddress){
      moreLanding.imgAccountAddress.src = "radioselected.png";
  moreLanding.imgSpecifyAddress.src = "radiononselected.png";
  setAccountAddressInCheckReOrder();
  moreLanding.flxAccountAddressKA.isVisible = true;
  moreLanding.flxSpecifyAddressKA.isVisible = false;
  }else{
     accountsLanding.imgAccountAddress.src = "radioselected.png";
  accountsLanding.imgSpecifyAddress.src = "radiononselected.png";
  setAccountAddressInCheckReOrder();
  accountsLanding.flxAccountAddressKA.isVisible = true;
  accountsLanding.flxSpecifyAddressKA.isVisible = false;
  }

}
function setselectedAddressTypeSpecified(){
  if(frmNewCheckReOrderKA && frmNewCheckReOrderKA.imgAccountAddress){
      frmNewCheckReOrderKA.imgAccountAddress.src = "radiononselected.png";
  frmNewCheckReOrderKA.imgSpecifyAddress.src = "radioselected.png";
  frmNewCheckReOrderKA.flxAccountAddressKA.isVisible = false;
  frmNewCheckReOrderKA.flxSpecifyAddressKA.isVisible = true;
  }else if(moreLanding && moreLanding.imgAccountAddress){
      moreLanding.imgAccountAddress.src = "radiononselected.png";
  moreLanding.imgSpecifyAddress.src = "radioselected.png";
  moreLanding.flxAccountAddressKA.isVisible = false;
  moreLanding.flxSpecifyAddressKA.isVisible = true;
  }else{
     accountsLanding.imgAccountAddress.src = "radiononselected.png";
  accountsLanding.imgSpecifyAddress.src = "radioselected.png";
  accountsLanding.flxAccountAddressKA.isVisible = false;
  accountsLanding.flxSpecifyAddressKA.isVisible = true;
  }

}

function newCheckReOrderPreShow(fromEdit,CheckObject){
  // Alterations to Android layout due to diffrence in radio button UI
  if(fromEdit != "EDIT"){
  if (userAgent == "iPhone" || userAgent == "iPad"){
     setSelectedImageNumberofLeafLets20();
     setselectedAddressTypeAccounts();
     frmNewCheckReOrderKA.flxAddressKA.setVisibility(true);
     frmNewCheckReOrderKA.radioAddressType.isVisible = false;
     frmNewCheckReOrderKA.flxNumberOfLeafLetsKA.setVisibility(true);
     frmNewCheckReOrderKA.radioNoOfLeaflets.isVisible = false;
  }else{
     frmNewCheckReOrderKA.flxAddressKA.setVisibility(false);
     frmNewCheckReOrderKA.radioAddressType.isVisible = true;
     frmNewCheckReOrderKA.flxNumberOfLeafLetsKA.setVisibility(false);
     frmNewCheckReOrderKA.radioNoOfLeaflets.isVisible = true;
  }
  }
  frmNewCheckReOrderKA.fromCardInner.setVisibility(true);
  frmNewCheckReOrderKA.fromAccountPick.setVisibility(false);
  
  frmNewCheckReOrderKA.lblStreetNameKA.text = "";
  frmNewCheckReOrderKA.lblPostBoxKA.text = "";
  frmNewCheckReOrderKA.lblCountryKA.text = "";
  frmNewCheckReOrderKA.lblRegionKA.text = "";
  frmNewCheckReOrderKA.lblZipKA.text = "";
  frmNewCheckReOrderKA.lblBankNameHeader.text = kony.retailBanking.globalData.globals.BankName;
  frmNewCheckReOrderKA.fromlblAccountNumberKA.text = "";
  
  var  accPreviewData= kony.retailBanking.datastore.getAccountListObject().response;
          if(accPreviewData != null){
           var availableBal,currBal,outstandingBal;
           for(var i=0;i< accPreviewData.length;i++){
           if( accPreviewData[i]["nickName"]){
              accPreviewData[i].accountName = kony.retailBanking.util.validation.trucateTo( accPreviewData[i]["nickName"],35,32,"...");
           }else{
              var accountNumber =  accPreviewData[i]["accountID"];
              accPreviewData[i].accountName =   accPreviewData[i]["accountName"] + accountNumber.substring(accountNumber.length-4, accountNumber.length);
           }
         
            
           var accountType = accPreviewData[i]["accountType"];
           if(accPreviewData[i]["availableBalance"]){
               availableBal = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accPreviewData[i]["availableBalance"],kony.retailBanking.globalData.globals.CurrencyCode);
           }
        
		   if(accPreviewData[i]["currentBalance"]){
				currBal = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accPreviewData[i]["currentBalance"],kony.retailBanking.globalData.globals.CurrencyCode);
		   }
				
		  if(accPreviewData[i]["outstandingBalance"]){
				outstandingBal = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accPreviewData[i]["outstandingBalance"],kony.retailBanking.globalData.globals.CurrencyCode);
		   }
		 if(accPreviewData[i]["accountType"]=="CreditCard"){
				currBal = "-"+currBal;
		  }
				
		if (accountType === kony.retailBanking.globalData.globals.Checking){
			accPreviewData[i].availableBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: availableBal};
			accPreviewData[i].currentBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: currBal};
			accPreviewData[i].outstandingBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: outstandingBal};
			accPreviewData[i].flxClr= {skin:getSkinColor(accPreviewData[i].accountType)};
            accPreviewData[i]["availBalanView"] = i18n_availableBalance;
        } else if (accountType === kony.retailBanking.globalData.globals.Savings){
            accPreviewData[i].availableBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: availableBal};
            accPreviewData[i].currentBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: currBal};
            accPreviewData[i].outstandingBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: outstandingBal};       
            accPreviewData[i].flxClr= {skin:getSkinColor(accPreviewData[i].accountType)};
          accPreviewData[i]["availBalanView"] = i18n_availableBalance;
        } else if (accountType === kony.retailBanking.globalData.globals.CreditCard){
            accPreviewData[i].availableBalance= {skin :getSknlblAmountCredit(accPreviewData[i].accountType), text: availableBal};
            accPreviewData[i].currentBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: currBal};
            accPreviewData[i].outstandingBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: outstandingBal};
            accPreviewData[i].flxClr= {skin:getSkinColor(accPreviewData[i].accountType)};
            accPreviewData[i]["availBalanView"] = i18n_availableBalance;
        }else if (accountType === kony.retailBanking.globalData.globals.Deposit){
            accPreviewData[i].availableBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: availableBal};
            accPreviewData[i].currentBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: currBal};
            accPreviewData[i].outstandingBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: outstandingBal};
            accPreviewData[i].flxClr= {skin:getSkinColor(accPreviewData[i].accountType)};
            accPreviewData[i]["availBalanView"] = i18n_availableBalance;
        } else if (accountType == kony.retailBanking.globalData.globals.Mortgage){
           accPreviewData[i].availableBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: availableBal};
           accPreviewData[i].currentBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: currBal};
           accPreviewData[i].outstandingBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: outstandingBal};
           accPreviewData[i].flxClr= {skin:getSkinColor(accPreviewData[i].accountType)};
            accPreviewData[i]["availBalanView"] = "Oustanding Balance";
        }
          accPreviewData[i].bankName= kony.retailBanking.util.validation.trucateTo(accPreviewData[i].bankName,35,32,"...");
        } 
         frmNewCheckReOrderKA.segInternalFromAccountsPayKA.widgetDataMap={
              nameAccount1:"accountName",
              amountAccount1:"availableBalance",
              typeAccountBalanceView:"availBalanView",
              typeAccount:"accountType",
              lblColorKA:"flxClr",
              lblBankName:"bankName"
                             };
          
                    
          var tempdata= getFilteredFromAccountsForCheckReOrder(accPreviewData);
          frmNewCheckReOrderKA.segInternalFromAccountsPayKA.setData(tempdata);
		  var addressType;
		  if(fromEdit=="EDIT"){
             if (userAgent == "iPhone" || userAgent == "iPad"){
               if(frmNewCheckReOrderKA.imgSpecifyAddress.src =="radioselected.png"){
                 addressType = "SpecifyNew";
               }else{
                 addressType = "AccountAddress";
               }
               if(CheckObject["leafCount"].getData()=="20"){
                 setSelectedImageNumberofLeafLets20();
               }else if(CheckObject["leafCount"].getData()=="30"){
                 setSelectedImageNumberofLeafLets30();
               }else{
                 setSelectedImageNumberofLeafLets40();
               }
             }else{
			    addressType = frmNewCheckReOrderKA.radioAddressType.selectedKey;
			    frmNewCheckReOrderKA.lblNumberOfLeafLetsKA.text = CheckObject["leafCount"];
             }
             if(addressType=="SpecifyNew"){
				 frmNewCheckReOrderKA.lblStreetNameKA.text = CheckObject["name"];
	             frmNewCheckReOrderKA.lblPostBoxKA.text = CheckObject["postboxNumber"];
	             frmNewCheckReOrderKA.lblCountryKA.text = CheckObject["state"];
	             frmNewCheckReOrderKA.lblRegionKA.text = CheckObject["country"];
	             frmNewCheckReOrderKA.lblZipKA.text = CheckObject["zipcode"];
              }else{
				  setAccountAddressInCheckReOrder();
              }
			  onclicksegmentCheck("from");
			  frmNewCheckReOrderKA.fromNamePick.text = CheckObject["accountdata"];
			  
			  
			   for(var i=0;i< accPreviewData.length;i++){
                if(accPreviewData[i]["accountID"]==CheckObject["accountdata"]){
					frmNewCheckReOrderKA.fromNamePick.text = accPreviewData[i]["accountName"];
					frmNewCheckReOrderKA.lblFromAccountBankNameKA.text = accPreviewData[i]["bankName"];  
					settingAccountDataForFromAccountInCheckReOrder(accPreviewData[i]);
					break;
				}
              }
			  
			  
		  }else if(fromEdit=="AccountInfo"){
            onclicksegmentCheck("from");
			frmNewCheckReOrderKA.fromNamePick.text = CheckObject["accountID"];
             for(var i=0;i< accPreviewData.length;i++){
                if(accPreviewData[i]["accountID"]==CheckObject["accountID"]){
					frmNewCheckReOrderKA.fromNamePick.text = accPreviewData[i]["accountName"];
					frmNewCheckReOrderKA.lblFromAccountBankNameKA.text = accPreviewData[i]["bankName"];  
					settingAccountDataForFromAccountInCheckReOrder(accPreviewData[i]);
					break;
				}
              }
             if (userAgent == "iPhone" || userAgent == "iPad"){
                setSelectedImageNumberofLeafLets20();
                setselectedAddressTypeAccounts();
            }else{
		  frmNewCheckReOrderKA.lblNumberOfLeafLetsKA.text = "20";
          frmNewCheckReOrderKA.radioNoOfLeaflets.selectedKey = "20";
          frmNewCheckReOrderKA.radioAddressType.selectedKey="AccountAddress";
          frmNewCheckReOrderKA.flxAccountAddressKA.isVisible = true;
          frmNewCheckReOrderKA.flxSpecifyAddressKA.isVisible = false;
            }
          setAccountAddressInCheckReOrder();
          }else{
            if (userAgent == "iPhone" || userAgent == "iPad"){
                setSelectedImageNumberofLeafLets20();
                setselectedAddressTypeAccounts();
            }else{
		  frmNewCheckReOrderKA.lblNumberOfLeafLetsKA.text = "20";
          frmNewCheckReOrderKA.radioNoOfLeaflets.selectedKey = "20";
          frmNewCheckReOrderKA.radioAddressType.selectedKey="AccountAddress";
          frmNewCheckReOrderKA.flxAccountAddressKA.isVisible = true;
          frmNewCheckReOrderKA.flxSpecifyAddressKA.isVisible = false;
            }
          setAccountAddressInCheckReOrder();
          if(tempdata.length == 1){
               onclicksegmentCheck("from");
               frmNewCheckReOrderKA.fromNamePick.text = tempdata[0]["accountName"];
               frmNewCheckReOrderKA.lblFromAccountBankNameKA.text = tempdata[0]["bankName"]; 
               settingAccountDataForFromAccountInCheckReOrder(tempdata[0]);			   
         }
		}		 
        }
  //frmNewCheckReOrderKA.show();
  if(fromEdit=="EDIT"){
  closeModal("flxCheckReorderDetailsKA",frmCheckReorderConfirmationKA);
  }
  openModal(frmNewCheckReOrderKA.newCheckLandingWrapper, "newCheckLandingWrapper");
}

function settingAccountDataForFromAccountInCheckReOrder(tempdata){
	           var accountType2 = tempdata["accountType"];
               var accountId = tempdata["accountID"];

               if (accountType2 === kony.retailBanking.globalData.globals.Checking){
                   frmNewCheckReOrderKA.amountAccountOne.text = i18n_availableBalance;
                   frmNewCheckReOrderKA.fromAmountPick.text =tempdata["availableBalance"].text;//kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(tempdata[0]["availableBalance"],kony.retailBanking.globalData.globals.CurrencyCode); //tempdata[0]["availableBalance"].text;
                   frmNewCheckReOrderKA.fromAccountColorPick.skin = getSkinColor(accountType2); 
              } else if (accountType2 === kony.retailBanking.globalData.globals.Savings){
                   frmNewCheckReOrderKA.amountAccountOne.text = i18n_availableBalance;
                   frmNewCheckReOrderKA.fromAmountPick.text =tempdata["availableBalance"].text;// kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(tempdata[0]["availableBalance"],kony.retailBanking.globalData.globals.CurrencyCode);//tempdata[0]["availableBalance"].text;
                   frmNewCheckReOrderKA.fromAccountColorPick.skin = getSkinColor(accountType2);  
              } else if (accountType2 === kony.retailBanking.globalData.globals.CreditCard){
                   frmNewCheckReOrderKA.amountAccountOne.text = i18n_availableBalance;
                   frmNewCheckReOrderKA.fromAmountPick.text =tempdata["availableBalance"].text;// kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(tempdata[0]["currentBalance"],kony.retailBanking.globalData.globals.CurrencyCode);
                   frmNewCheckReOrderKA.fromAccountColorPick.skin = getSkinColor(accountType2); 
              }else if (accountType2 === kony.retailBanking.globalData.globals.Deposit){
                   frmNewCheckReOrderKA.amountAccountOne.text = i18n_availableBalance;
                   frmNewCheckReOrderKA.fromAmountPick.text = tempdata["availableBalance"].text;//kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(tempdata[0]["currentBalance"],kony.retailBanking.globalData.globals.CurrencyCode);
                   frmNewCheckReOrderKA.fromAccountColorPick.skin = getSkinColor(accountType2); 
              } 
              else if (accountType2 == kony.retailBanking.globalData.globals.Mortgage){
                   frmNewCheckReOrderKA.amountAccountOne.text = "Oustanding Balance";
                   frmNewCheckReOrderKA.fromAmountPick.text = tempdata["outstandingBalance"].text;//kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(tempdata[0]["outstandingBalance"],kony.retailBanking.globalData.globals.CurrencyCode);
                   frmNewCheckReOrderKA.fromAccountColorPick.skin = getSkinColor(accountType2); 
              }
             frmNewCheckReOrderKA.fromlblAccountNumberKA.text = tempdata["accountID"];
}

function newCheckreOrderPreShowAccountinfo(){
      var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
	  var controller = INSTANCE.getFormController("accountsLanding");
      var controllerContextData = controller.getContextData();
      if( controllerContextData && controllerContextData.getCustomInfo("selectedAccountObj")){
          var accountData = controllerContextData.getCustomInfo("selectedAccountObj");
		  closeModal("accountInfoWrapper",accountInfo);  
          newCheckReOrderPreShow("AccountInfo",accountData);
}
}