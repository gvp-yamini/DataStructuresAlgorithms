var frmSearchOptionsKAConfig = {
  "formid": "frmSearchOptionsKA",
  "frmSearchOptionsKA": {
    "entity": "Transactions",
    "objectServiceName": "RBObjects",
    "objectServiceOptions" : {"access":"online"}
  },
 "lbxAccountsKA":{
        "fieldprops": {
          "entity":"",
          "widgettype":"ListBox",
          "field":"accountId",
          "selector": "relevant account name",
          "picklistInfo": {
            "entity": "Accounts",
            "key": "accountID",
            "value": "nickName"
          }
        }
    }
};