var addExternalAccountConfig = {
  "formid": "addExternalAccount",
  "addExternalAccount": {
    "entity": "ExternalAccounts",
    "objectServiceName": "RBObjects",
    "objectServiceOptions" : {"access":"online"}
  },
  "ListCountryKA":{
    "fieldprops": {
      "widgettype": "ListBox",
      "field":"countryName",
      "selector": "Country Name",
      "picklistInfo": {
        "entity":"Country",
        "key": "CountryId",
        "value": "Name"
      } 
    }
  },
  "txtBenficiryNameKA":{
    "fieldprops": {
      "entity":"ExternalAccounts",
      "widgettype":"TextBox",
      "constrained":true,
      "field":"beneficiaryName",
    }
  },
  "txtAccountNickNameKA":{
    "fieldprops": {
      "entity":"ExternalAccounts",
      "widgettype":"TextBox",
      "constrained":true,
      "field":"nickName",
    }
  },
  "txtExternalRoutingNumberKA":{
    "fieldprops": {
      "entity":"ExternalAccounts",
      "widgettype":"TextBox",
      "constrained":true,
      "field":"routingNumber",
    }
  }, "txtSwiftCodeKA":{
    "fieldprops": {
      "entity":"ExternalAccounts",
      "widgettype":"TextBox",
      "constrained":true,
      "field":"swiftCode",
    }
  },"externalAccountNumberTextField":{
    "fieldprops": {
      "entity":"ExternalAccounts",
      "widgettype":"TextBox",
      "constrained":true,
      "field":"accountNumber",
    }
  },"lblAccountTypeKA":{
    "fieldprops": {
      "entity":"ExternalAccounts",
      "widgettype":"Label",
      "constrained":true,
      "field":"accountType",
    }},
  "lblCountryNameKA":{
    "fieldprops": {
      "entity":"ExternalAccounts",
      "widgettype":"Label",
      "constrained":true,
      "field":"countryName",
    }},"lblInternaionalAccountKA":{
      "fieldprops": {
        "entity":"ExternalAccounts",
        "widgettype":"Label",
        "constrained":true,
        "field":"isInternationalAccount",
      }},
};