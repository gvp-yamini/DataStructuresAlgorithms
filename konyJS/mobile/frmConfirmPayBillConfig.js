var frmConfirmPayBillConfig = {
  "formid": "frmConfirmPayBill",
  "frmConfirmPayBill": {
    "entity": "Transactions",
    "objectServiceName": "RBObjects",
    "objectServiceOptions" : {"access":"online"},
  },
  "fromAccNumberKA":{
        "fieldprops": {
          "entity":"Transactions",
          "widgettype":"Label",
          "field":"fromAccountNumber"
		}		  
      },
  "MapedAmountLabel" : {
	    "fieldprops": {
          "entity":"Transactions",
          "widgettype":"Label",
          "field":"amount"
		}
  }, 
  "fromAccountNumberKA" : {
	  "fieldprops": {
          "entity":"Transactions",
          "widgettype":"Label",
          "field":"payeeId"
		} 
  },
  "mapedDateKA" : {
	  	  "fieldprops": {
          "entity":"Transactions",
          "widgettype":"Label",
          "field":"scheduledDate"
		}
  },
  "fromAccountNameKA" : {
	  	 "fieldprops": {
          "entity":"Transactions",
          "widgettype":"Label",
          "field":"payeeNickName"
		}
  },
  "transactionType" : {
    	 "fieldprops": {
          "entity":"Transactions",
          "widgettype":"Label",
          "field":"transactionType"
		}
  },
  "transactionId" : {
    	 "fieldprops": {
          "entity":"Transactions",
          "widgettype":"Label",
          "field":"transactionId"
		}
  }
};