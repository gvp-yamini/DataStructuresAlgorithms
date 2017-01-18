var frmP2PConfirmTransferKAConfig = {
  "formid": "frmP2PConfirmTransferKA",
  "frmP2PConfirmTransferKA": {
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
   "referenceId":{
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
  }, 
  "dateSet":{
    "fieldprops": {
      "entity":"Transactions",
      "constrained":true,
      "widgettype":"Label",
      "field":"scheduledDate"
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
  "fromAccountNumberKA":{
    "fieldprops": {
      "entity":"Transactions",
      "constrained":true,
      "widgettype":"Label",
      "field":"fromAccountNumber"
    }		  
  },
  "toAccountNumberKA":{
    "fieldprops": {
      "entity":"Transactions",
      "constrained":true,
      "widgettype":"Label",
      "field":"personId"
    }		  
  } 
};