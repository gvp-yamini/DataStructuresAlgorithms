var frmConfirmBillPaymentKAConfig = {
    "formid": "frmConfirmBillPaymentKA",
    "frmConfirmBillPaymentKA": {
        "entity": "Transactions",
        "objectServiceName": "RBObjects",
        "objectServiceOptions" : {"access":"online"},
    },
"lblFromAccValKA":{
        "fieldprops": {
          "entity":"Transactions",
          "widgettype":"Label",
          "field":"fromAccountNumber"
		}		  
      },
  "lblAmountValKA" : {
	    "fieldprops": {
          "entity":"Transactions",
          "widgettype":"Label",
          "field":"amount"
		}
  }, 
  "lblToAccValKA" : {
	  "fieldprops": {
          "entity":"Transactions",
          "widgettype":"Label",
          "field":"payeeId"
		} 
  },
  "lblDateValKA" : {
	  	  "fieldprops": {
          "entity":"Transactions",
          "widgettype":"Label",
          "field":"scheduledDate"
		}
  },
   "transactionId" : {
    	 "fieldprops": {
          "entity":"Transactions",
          "widgettype":"Label",
          "field":"transactionId"
		}
  },
  "transactionTypeKA" : {
    "fieldprops": {
          "entity":"Transactions",
          "widgettype":"Label",
          "field":"transactionType"
		}
  }
}