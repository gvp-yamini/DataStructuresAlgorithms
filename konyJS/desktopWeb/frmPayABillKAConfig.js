var frmPayABillKAConfig = {
  "formid": "frmPayABillKA",
  "frmPayABillKA": {
    "entity": "Transactions",
    "objectServiceName": "RBObjects",
    "objectServiceOptions" : {"access":"online"},
  },
  "lblAmountValKA":{
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
  "transactionTypeKA":{
    "fieldprops": {
      "entity":"Transactions",
      "constrained":true,
      "widgettype":"Label",
      "field":"transactionType"
    }		  
  }, 
  "lblDateValKA":{
    "fieldprops": {
      "entity":"Transactions",
      "constrained":true,
      "widgettype":"Label",
      "field":"scheduledDate"
    }		  
  }, 
  "lblNotesValKA":{
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
  "payPersonIdKA":{
    "fieldprops": {
      "entity":"Transactions",
      "constrained":true,
      "widgettype":"Label",
      "field":"personId"
    }		  
  } 
};