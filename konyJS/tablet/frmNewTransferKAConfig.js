var frmNewTransferKAConfig = {
  "formid": "frmNewTransferKA",
  "frmNewTransferKA": {
    "entity": "Transactions",
    "objectServiceName": "RBObjects",
    "objectServiceOptions" : {"access":"online"}
  },
   "amountTextField":{
       "fieldprops": {
          "entity":"Transactions",
          "widgettype": "TextField",
          "field":"amount"
       }
    },
   "toNamePick":{
       "fieldprops": {
          "entity":"Transactions",
          "widgettype": "TextField",
          "field":"toAccountName"
       }
    } ,
   "tolblAccountNumberKA":{
       "fieldprops": {
          "entity":"Transactions",
          "widgettype": "TextField",
          "field":"toAccountNumber"
       }
    },
  "fromNamePick":{
       "fieldprops": {
          "entity":"Transactions",
          "widgettype": "TextField",
          "field":"fromAccountName"
       }
    },
  "fromlblAccountNumberKA":{
       "fieldprops": {
          "entity":"Transactions",
          "widgettype": "TextField",
          "field":"fromAccountNumber"
       }
    },
  "lblTransferDateKA":{
       "fieldprops": {
          "entity":"Transactions",
          "widgettype": "TextField",
          "field":"scheduledDate"
       }
    },
   "lblNoofTimesKA":{
       "fieldprops": {
          "entity":"Transactions",
          "widgettype": "TextField",
          "field":"numberOfRecurrences"
       }
    },
  "lblTransferNotes":{
       "fieldprops": {
          "entity":"Transactions",
          "widgettype": "TextField",
          "field":"transactionsNotes"
       }
    },
   "lblRecurringFromData":{
       "fieldprops": {
          "entity":"Transactions",
          "widgettype": "TextField",
          "field":"frequencyStartDate"
       }
    },
  "lblRecurringTOData":{
       "fieldprops": {
          "entity":"Transactions",
          "widgettype": "TextField",
          "field":"frequencyEndDate"
       }
    },
  "frequencyPickLabel":{
       "fieldprops": {
          "entity":"Transactions",
          "widgettype": "TextField",
          "field":"frequencyType"
       }
    },
  "lblTransactionType":{
       "fieldprops": {
          "entity":"Transactions",
          "widgettype": "TextField",
          "field":"transactionType"
       }
    },
  "lblTransactionIdKA":{
       "fieldprops": {
          "entity":"Transactions",
          "widgettype": "TextField",
          "field":"transactionId"
       }
    }
  
};

   
     
     