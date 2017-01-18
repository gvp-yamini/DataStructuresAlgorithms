//add external swaran
function OpenExternalForm(fromform,toform)
{
   var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
   var listController = INSTANCE.getFormController(fromform);
   var headers = {"session_token":kony.retailBanking.globalData.session_token};
   var navigationObject = new kony.sdk.mvvm.NavigationObject();
   navigationObject.setRequestOptions("form",{"headers": headers});
   navigationObject.setDataModel(null,kony.sdk.mvvm.OperationType.ADD, "form");
   listController.performAction("navigateTo",[toform,navigationObject]);
}

//frmExternalAccountFunctions

//Used To Set By Default Domestic Account "swaran"
function newExternalAccountPreshow()
{
  addExternalAccount.ImgDomestic.src="radioselected.png";
  addExternalAccount.ImgInternational.src="radiononselected.png"; 
  addExternalAccount.externalAccountCountry.setVisibility(false);
  addExternalAccount.externalRountingNumberContainer.setVisibility(true);
  addExternalAccount.externalSwiftCodeKA.setVisibility(false);
  addExternalAccount.lblCountryNameKA.text = "";
  addExternalAccount.lblInternaionalAccountKA.text = false;
  addExternalAccount.lblAccountTypeKA.text = i18n_savingsAccount;

}

function isDomestic(res)
{
  if(res)
  {
    addExternalAccount.ImgDomestic.src="radioselected.png";
    addExternalAccount.ImgInternational.src="radiononselected.png"; 
    addExternalAccount.externalAccountCountry.setVisibility(false);
    addExternalAccount.externalRountingNumberContainer.setVisibility(true);
    addExternalAccount.externalSwiftCodeKA.setVisibility(false);
    addExternalAccount.lblCountryNameKA.text = "";
    addExternalAccount.lblInternaionalAccountKA.text = false;
  }
  else
  {
    addExternalAccount.ImgDomestic.src="radiononselected.png";
    addExternalAccount.ImgInternational.src="radioselected.png";
    addExternalAccount.externalAccountCountry.setVisibility(true);
    addExternalAccount.externalRountingNumberContainer.setVisibility(false);
    addExternalAccount.externalSwiftCodeKA.setVisibility(true);
    addExternalAccount.lblInternaionalAccountKA.text = true;
  }
}
function confirmAddExternalAccount()
{
  var status = false;
  var benficiryName = addExternalAccount.txtBenficiryNameKA.text;
  var accountNumber = addExternalAccount.externalAccountNumberTextField.text;
  var countryStatus = addExternalAccount.externalAccountCountry.isVisible;
  if(countryStatus)
  {
    if(addExternalAccount.ListCountryKA.selectedKey==-1)
      {
        alert(i18n_selectCountryAlert);
      }
    else
    {
      var swiftCode = addExternalAccount.txtSwiftCodeKA.text;
      if((benficiryName ==="") || (benficiryName ===null))
      {
          alert(i18n_enterBeneficiaryNameAlert);
      }else if((accountNumber ==="") || (accountNumber ===null))
      {
        alert(i18n_enterAccountNumberAlert);
      }else if((swiftCode ==="") || (swiftCode ===null))
      {
       alert(i18n_enterswiftCodeAlert);
      }else{
      status = true;
      }
    }
  }
  else 
  {
    var routingNumber = addExternalAccount.txtExternalRoutingNumberKA.text;
    if((benficiryName ==="") || (benficiryName ===null))
    {
      alert(i18n_enterBeneficiaryNameAlert);
    }else if((accountNumber ==="") || (accountNumber ===null))
    {
      alert(i18n_enterAccountNumberAlert);
    }else if((routingNumber ==="") || (routingNumber ===null))
    {
      alert(i18n_enterRoutingNumberAlert);
    }else{
      status = true;
    }
  }
  return status;
}

function addExternalAccountSegmentClick()
{

  var selectedIndex = frmNewTransferKA.externalAccountTypeSegment.selectedIndex;
  var boolStatus = frmNewTransferKA.externalAccountTypeSegment.selectedItems[0].imgSegIcon.isVisible;
  var name  = frmNewTransferKA.externalAccountTypeSegment.selectedItems[0].lblsegIcon;
  var data= {};
 
    data = {
      lblsegIcon: name,
      imgSegIcon:{src:"check_blue.png",isVisible: true}
    };  
  loadExternalAccountTypes();
  frmNewTransferKA.externalAccountTypeSegment.setDataAt(data,selectedIndex[1],selectedIndex[0]);
  //Hidden Label Data
  frmNewTransferKA.lblAccountTypeKA.text = name;
}

