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
   if (userAgent == "iPhone"){
               if(frmNewCheckReOrderKA.imgSpecifyAddress.src =="radioselected.png"){
                 addressType = "SpecifyNew";
               }else{
                 addressType = "AccountAddress";
               }
   }else{
     addressType = frmNewCheckReOrderKA.radioAddressType.selectedKey;
   }
  var valid = true;
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
       var accountId = frmNewCheckReOrderKA.fromlblAccountNumberKA.text;
      if(!valid){
        alert("Please enter a valid address with all fields");
      }else if(accountId.trim()==""){
        alert("Please select an account");
      }else{
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
	frmNewCheckReOrderKA.lblaccountName.text = "";
	frmNewCheckReOrderKA.lblPostBoxNumber.text = "";
	frmNewCheckReOrderKA.lblStreetKA.text = "";
	frmNewCheckReOrderKA.lblRegionKAMain.text = "";
	frmNewCheckReOrderKA.lblZipCodeKA.text = "";
}
function setAccountAddressInCheckReOrder(){
    setNullToUserAddressInCheckReOrder();
	frmNewCheckReOrderKA.lblaccountName.text = kony.retailBanking.globalData.globals.userObj.addressLine1;
	frmNewCheckReOrderKA.lblPostBoxNumber.text = kony.retailBanking.globalData.globals.userObj.addressLine2;
	frmNewCheckReOrderKA.lblStreetKA.text = kony.retailBanking.globalData.globals.userObj.state;
	frmNewCheckReOrderKA.lblRegionKAMain.text = kony.retailBanking.globalData.globals.userObj.country;
	frmNewCheckReOrderKA.lblZipCodeKA.text = kony.retailBanking.globalData.globals.userObj.zipcode;
}

function setSpecifiedAccountInCheckReOrder(){
    setNullToUserAddressInCheckReOrder();
     var addressType;
   if (userAgent == "iPhone"){
               if(frmNewCheckReOrderKA.imgSpecifyAddress.src =="radioselected.png"){
                 addressType = "SpecifyNew";
               }else{
                 addressType = "AccountAddress";
               }
   }else{
     addressType = frmNewCheckReOrderKA.radioAddressType.selectedKey;
   }
if(addressType=="SpecifyNew"){
	frmNewCheckReOrderKA.lblaccountName.text = frmNewCheckReOrderKA.lblStreetNameKA.text;
	frmNewCheckReOrderKA.lblPostBoxNumber.text = frmNewCheckReOrderKA.lblPostBoxKA.text;
	frmNewCheckReOrderKA.lblStreetKA.text = frmNewCheckReOrderKA.lblCountryKA.text;
	frmNewCheckReOrderKA.lblRegionKAMain.text = frmNewCheckReOrderKA.lblRegionKA.text;
	frmNewCheckReOrderKA.lblZipCodeKA.text = frmNewCheckReOrderKA.lblZipKA.text;
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
 }

function onclicksegmentCheck(type)
{
  type= type;
  frmNewCheckReOrderKA[type+"CardTitle"].setVisibility(false);
  frmNewCheckReOrderKA[type+"CardInner"].setVisibility(false);
  frmNewCheckReOrderKA[type+"AccountPick"].setVisibility(true);
}
function onclickCheckReOrderEdit(type)
{
  type= type;
  frmNewCheckReOrderKA[type+"CardTitle"].setVisibility(true);
  frmNewCheckReOrderKA[type+"CardInner"].setVisibility(true);
  frmNewCheckReOrderKA[type+"AccountPick"].setVisibility(false);
  frmNewCheckReOrderKA.fromCardInner.opacity=1;
  frmNewCheckReOrderKA.fromCardTitle.opacity=1;
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
var listController = INSTANCE.getFormController("frmCheckReorderConfirmationKA");
var formmodel = listController.getFormModel();
var CheckObject = {};
var accountdata = formmodel.getWidgetData("accountNicknameTextfield");
var leafCount = formmodel.getWidgetData("lblNumberOfLeafletsVal");
var name = formmodel.getWidgetData("lblaccountName");
var postboxNumber =  formmodel.getWidgetData("lblPostBoxNumber");
var state = formmodel.getWidgetData("lblStreetKA");
var country = formmodel.getWidgetData("lblZipCodeKA");
var zipcode = formmodel.getWidgetData("CopylblZipCodeKA02d327cdad7ce4c");
CheckObject = {
"accountdata" : accountdata,
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
  frmNewCheckReOrderKA.img20KA.src = "radioselected.png";
  frmNewCheckReOrderKA.img30KA.src = "radiononselected.png";
  frmNewCheckReOrderKA.img40KA.src = "radiononselected.png";
  frmNewCheckReOrderKA.lblNumberOfLeafLetsKA.text = "20";
}

function setSelectedImageNumberofLeafLets30(){
  frmNewCheckReOrderKA.img20KA.src = "radiononselected.png";
  frmNewCheckReOrderKA.img30KA.src = "radioselected.png";
  frmNewCheckReOrderKA.img40KA.src = "radiononselected.png";
  frmNewCheckReOrderKA.lblNumberOfLeafLetsKA.text = "30";
}
function setSelectedImageNumberofLeafLets40(){
  frmNewCheckReOrderKA.img20KA.src = "radiononselected.png";
  frmNewCheckReOrderKA.img30KA.src = "radiononselected.png";
  frmNewCheckReOrderKA.img40KA.src = "radioselected.png";
  frmNewCheckReOrderKA.lblNumberOfLeafLetsKA.text = "40";
}
function setselectedAddressTypeAccounts(){
  frmNewCheckReOrderKA.imgAccountAddress.src = "radioselected.png";
  frmNewCheckReOrderKA.imgSpecifyAddress.src = "radiononselected.png";
  setAccountAddressInCheckReOrder();
  frmNewCheckReOrderKA.flxAccountAddressKA.isVisible = true;
  frmNewCheckReOrderKA.flxSpecifyAddressKA.isVisible = false;
}
function setselectedAddressTypeSpecified(){
  frmNewCheckReOrderKA.imgAccountAddress.src = "radiononselected.png";
  frmNewCheckReOrderKA.imgSpecifyAddress.src = "radioselected.png";
  frmNewCheckReOrderKA.flxAccountAddressKA.isVisible = false;
  frmNewCheckReOrderKA.flxSpecifyAddressKA.isVisible = true;
}

function newCheckReOrderPreShow(fromEdit,CheckObject){
    userAgent = kony.os.userAgent();
  // Alterations to Android layout due to diffrence in radio button UI
  if(fromEdit != "EDIT"){
  if (userAgent == "iPhone"){
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
             if (userAgent == "iPhone"){
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
			    frmNewCheckReOrderKA.lblNumberOfLeafLetsKA.text = CheckObject["leafCount"].getData();
             }
             if(addressType=="SpecifyNew"){
				 frmNewCheckReOrderKA.lblStreetNameKA.text = CheckObject["name"].getData();
	             frmNewCheckReOrderKA.lblPostBoxKA.text = CheckObject["postboxNumber"].getData();
	             frmNewCheckReOrderKA.lblCountryKA.text = CheckObject["state"].getData();
	             frmNewCheckReOrderKA.lblRegionKA.text = CheckObject["country"].getData();
	             frmNewCheckReOrderKA.lblZipKA.text = CheckObject["zipcode"].getData();
              }else{
				  setAccountAddressInCheckReOrder();
              }
			  onclicksegmentCheck("from");
			  frmNewCheckReOrderKA.fromNamePick.text = CheckObject["accountdata"].getData();
			  
			  
			   for(var i=0;i< accPreviewData.length;i++){
                if(accPreviewData[i]["accountID"]==CheckObject["accountdata"].getData()){
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
             if (userAgent == "iPhone"){
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
            if (userAgent == "iPhone"){
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
  frmNewCheckReOrderKA.show();
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
	  var controller = INSTANCE.getFormController("frmAccountDetailKA");
      var controllerContextData = controller.getContextData();
      if( controllerContextData && controllerContextData.getCustomInfo("selectedAccountObj")){
          var accountData = controllerContextData.getCustomInfo("selectedAccountObj");
		  newCheckReOrderPreShow("AccountInfo",accountData);
}
}