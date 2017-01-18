//frmExternalAccountFunctions

//Used To Set By Default Domestic Account
function newExternalAccountPreshow()
{
  frmAddExternalAccountKA.ImgDomestic.src="radioselected.png";
  frmAddExternalAccountKA.ImgInternational.src="radiononselected.png"; 
  frmAddExternalAccountKA.externalAccountCountry.setVisibility(false);
  frmAddExternalAccountKA.externalRountingNumberContainer.setVisibility(true);
  frmAddExternalAccountKA.externalSwiftCodeKA.setVisibility(false);
  frmAddExternalAccountKA.lblCountryNameKA.text = "";
  frmAddExternalAccountKA.lblInternaionalAccountKA.text = false;
  frmAddExternalAccountKA.lblAccountTypeKA.text = "Savings Account";

}

function isDomestic(res)
{
  if(res)
  {
    frmAddExternalAccountKA.ImgDomestic.src="radioselected.png";
    frmAddExternalAccountKA.ImgInternational.src="radiononselected.png"; 
    frmAddExternalAccountKA.externalAccountCountry.setVisibility(false);
    frmAddExternalAccountKA.externalRountingNumberContainer.setVisibility(true);
    frmAddExternalAccountKA.externalSwiftCodeKA.setVisibility(false);
    frmAddExternalAccountKA.lblCountryNameKA.text = "";
    frmAddExternalAccountKA.lblInternaionalAccountKA.text = false;
  }
  else
  {
    frmAddExternalAccountKA.ImgDomestic.src="radiononselected.png";
    frmAddExternalAccountKA.ImgInternational.src="radioselected.png";
    frmAddExternalAccountKA.externalAccountCountry.setVisibility(true);
    frmAddExternalAccountKA.externalRountingNumberContainer.setVisibility(false);
    frmAddExternalAccountKA.externalSwiftCodeKA.setVisibility(true);
    frmAddExternalAccountKA.lblInternaionalAccountKA.text = true;
  }
}
function confirmAddExternalAccount()
{
  var status = false;
  var benficiryName = frmAddExternalAccountKA.txtBenficiryNameKA.text;
  var accountNumber = frmAddExternalAccountKA.externalAccountNumberTextField.text;
  var countryStatus = frmAddExternalAccountKA.externalAccountCountry.isVisible;
  if(countryStatus)
  {
    if(frmAddExternalAccountKA.ListCountryKA.selectedKey==-1)
      {
        alert(i18n_selectCountryAlert);
      }
    else
    {
      var swiftCode = frmAddExternalAccountKA.txtSwiftCodeKA.text;
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
    var routingNumber = frmAddExternalAccountKA.txtExternalRoutingNumberKA.text;
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
