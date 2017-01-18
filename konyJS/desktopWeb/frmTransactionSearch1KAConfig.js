var frmTransactionSearch1KAConfig = {
  "formid": "frmTransactionSearch1KA",
  "frmTransactionSearch1KA": {
    "entity": "Transactions",
    "objectServiceName": "RBObjects",
    "objectServiceOptions" : {"access":"online"}
  },
 "listAlertAccountsKA":{
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