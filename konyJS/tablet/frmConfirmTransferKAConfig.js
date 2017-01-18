var frmConfirmTransferKAConfig = {
  "formid": "frmConfirmTransferKA",
  "frmConfirmTransferKA": {
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
"transactionName":{
        "fieldprops": {
          "entity":"Transactions",
          "constrained":true,
          "widgettype":"Label",
          "field":"toAccountName"
		}		  
      }, 
"transactionFrom":{
        "fieldprops": {
          "entity":"Transactions",
          "constrained":true,
          "widgettype":"Label",
          "field":"fromAccountName"
		}		  
      }, 
"lblScheduledDate":{
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
          "field":"toAccountNumber"
		}		  
      } 
  

};