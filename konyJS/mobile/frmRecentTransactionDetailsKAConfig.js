var frmRecentTransactionDetailsKAConfig = {
    "formid": "frmRecentTransactionDetailsKA",
    "frmRecentTransactionDetailsKA": {
    "entity": "Transactions",
    "objectServiceName": "RBObjects",
    "objectServiceOptions" : {"access":"online"}
    },
  "transactionAmount":{
        "fieldprops": {
          "entity":"Transactions",
          "constrained":true,
          "widgettype":"Label",
          "field":"amount"         
      }
    },
    "transactionId":{
        "fieldprops": {
          "entity":"Transactions",
          "constrained":true,
          "widgettype":"Label",
          "field":"transactionId"
		}		  
      },
    "transactionType":{
        "fieldprops": {
          "entity":"Transactions",
          "constrained":true,
          "widgettype":"Label",
          "field":"transactionType"
		}		  
      }
};