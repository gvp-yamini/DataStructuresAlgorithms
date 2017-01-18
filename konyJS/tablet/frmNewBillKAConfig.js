var frmNewBillKAConfig = {
  "formid": "frmNewBillKA",
  "frmNewBillKA": {
    "entity": "Transactions",
    "objectServiceName": "RBObjects",
    "objectServiceOptions" : {"access":"online"}
  },
	"amountTextField":{
       "fieldprops": {
          "entity":"Transactions",
         "constrained":true,
          "widgettype": "TextField",
          "field":"amount"
       }
    },
   "lblTransferNotes":{
       "fieldprops": {
          "entity":"Transactions",
          "widgettype": "TextField",
          "field":"transactionsNotes"
       }
    },
   "toNamePick":{
       "fieldprops": {
          "entity":"Transactions",
         "constrained":true,
          "widgettype": "TextField",
          "field":"toAccountName"
       }
    } ,
   "tolblAccountNumberKA":{
       "fieldprops": {
          "entity":"Transactions",
         "constrained":true,
          "widgettype": "TextField",
          "field":"payeeId"
       }
    },
  "fromNamePick":{
       "fieldprops": {
          "entity":"Transactions",
         "constrained":true,
          "widgettype": "TextField",
          "field":"fromAccountName"
       }
    },
  "fromlblAccountNumberKA":{
       "fieldprops": {
          "entity":"Transactions",
         "constrained":true,
          "widgettype": "TextField",
          "field":"fromAccountNumber"
       }
    },
  "lblTransferDateKA":{
       "fieldprops": {
          "entity":"Transactions",
         "constrained":true,
          "widgettype": "TextField",
          "field":"scheduledDate"
       }
    },
 
  "lblTransactionType":{
       "fieldprops": {
          "entity":"Transactions",
         "constrained":true,
          "widgettype": "TextField",
          "field":"transactionType"
       }
    },
    "lblTransactionIdKA":{
       "fieldprops": {
          "entity":"Transactions",
         "constrained":true,
          "widgettype": "TextField",
          "field":"transactionId"
       }
    },
   "segInternalTOAccountsPayKA": {
    "fieldprops": {
      "widgettype": "Segment",
      "entity": "Payee",
      "additionalFields": ["accountNumber","addressLine2","cityName","companyName","email","errmsg","payeeId","payeeName","phone","state","street","success","zipCode"],
      "field": {
        "transactionName": {
          "widgettype": "Label",
          "field": "payeeNickName"
        },
        "PayPersonId": {
          "widgettype": "Label",
          "field": "payeeId"
        }
      }
    }
  }
};



