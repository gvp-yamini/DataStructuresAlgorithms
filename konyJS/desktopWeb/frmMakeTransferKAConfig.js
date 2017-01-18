var frmMakeTransferKAConfig = {
  "formid": "frmMakeTransferKA",
  "frmMakeTransferKA": {
    "entity": "Accounts",
    "objectServiceName": "RBObjects",
    "objectServiceOptions": {
      "access": "online"
    }
  },
  "lbxFromAccountKA": {
    "fieldprops": {
      "widgettype": "ListBox",
      "field": "Accounts",
      "selector": "From Account",
      "picklistInfo": {
        "entity": "Accounts",
        "key": "accountID",
        "value": "nickName"
      }
    }
  },
  "lbxToAccountKA": {
    "fieldprops": {
      "widgettype": "ListBox",
      "field": "Accounts",
      "selector": "To Account",
      "picklistInfo": {
        "entity": "Accounts",
        "key": "accountID",
        "value": "nickName"
      }
    }
  }
};