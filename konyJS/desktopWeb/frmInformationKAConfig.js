var frmInformationKAConfig = {
  "formid": "frmInformationKA",
  "frmInformationKA": {
    "entity": "Accounts",
    "objectServiceName": "RBObjects",
    "objectServiceOptions" : {"access":"online"}
  },
  "ListBoxAccountsKA":{
    "fieldprops": {
      "widgettype": "ListBox",
      "field":"Accounts",
      "store" :true,
      
      "picklistInfo": {
        "entity":"Accounts",
        "key": "accountID",
        "value": "nickName",
        "alter" : "accountName",
      } 
    }
  }
}