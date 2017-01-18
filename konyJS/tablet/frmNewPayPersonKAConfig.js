var frmNewPayPersonKAConfig = {
  "formid": "frmNewPayPersonKA",
  "frmNewPayPersonKA": {
    "entity": "Transactions",
    "objectServiceName": "RBObjects",
    "objectServiceOptions" : {"access":"online"},
  },
  "segInternalFromAccountsKA": {
    "fieldprops": {
      "widgettype": "Segment",
      "entity": "Accounts",
      "additionalFields": [],
      "field": {
        "nameAccount1": {
          "widgettype": "Label",
          "field": "accountName"
        },
        "amountAccount1":{
          "widgettype": "Label",
          "field": "availableBalance"
        },
        "typeKA":{
          "widgettype": "Label",
          "field": "accountID"
        },
        "colorAccount1":{
                	"widgettype": "Label",
                    "field": "accountType",
                    "alias":"sknColor"
         }
      }
    }
  }
};