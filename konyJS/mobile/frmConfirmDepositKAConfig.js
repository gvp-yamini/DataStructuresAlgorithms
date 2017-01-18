var frmConfirmDepositKAConfig = {
  "formid": "frmConfirmDepositKA",
  "frmConfirmDepositKA": {
    "entity": "Transactions",
    "objectServiceName": "RBObjects",
    "objectServiceOptions" : {"access":"online"},
  },
  "transactionAmount":{
        "fieldprops": {
          "entity":"Transactions",
          "constrained":true,
          "widgettype":"Label",
          "field":"amount"
		}		  
      },

"transactionNotes":{
        "fieldprops": {
          "entity":"Transactions",
          "constrained":true,
          "widgettype":"Label",
          "field":"transactionsNotes"
		}		  
      },
 
"toAccountNumberKA":{
        "fieldprops": {
          "entity":"Transactions",
          "constrained":true,
          "widgettype":"Label",
          "field":"toAccountNumber"
		}		  
      },
  
  "depositsType":{
    "fieldprops":{
          "entity":"Transactions",
          "constrained":true,
          "widgettype":"Label",
          "field":"transactionType"
       }
  },
   "createdDate":{
     "fieldprops":{
          "entity":"Transactions",
          "constrained":true,
          "widgettype":"Label",
          "field":"scheduledDate"
       }
  },
  "lblfrontKA":{
    "fieldprops":{
          "entity":"Transactions",
          "widgettype":"Label",
          "field":"checkImage"
       }
  },
  "lblbackKA":{
    "fieldprops":{
          "entity":"Transactions",
          "widgettype":"Label",
          "field":"checkImageBack"
       }
  }

};
