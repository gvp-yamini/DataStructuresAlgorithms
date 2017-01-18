var frmSearchTransactionDetailsKAConfig = {
    "formid": "frmSearchTransactionDetailsKA",
    "frmSearchTransactionDetailsKA": {
    	"entity": "Transactions",
    	"objectServiceName": "RBObjects",
    	"objectServiceOptions" : {"access":"online"}
    },
  "transactionAmount":{
        "fieldprops": {
          "entity":"Transactions",
          "widgettype":"Label",
          "field":"amount"         
      }
    },
    "transactionId":{
        "fieldprops": {
          "entity":"Transactions",
          "widgettype":"Label",
          "field":"transactionId"
		}		  
      },
    "transactionType":{
        "fieldprops": {
          "entity":"Transactions",
          "widgettype":"Label",
          "field":"transactionType"
		}		  
      },
  "transactionFrom":{
        "fieldprops": {
          "entity":"Transactions",
          "widgettype":"Label",
          "field":"fromNickName"
		}		  
      },
   "lblToAccountDataKA":{
        "fieldprops": {
          "entity":"Transactions",
          "widgettype":"Label",
          "field":"toAccountName"
		}		  
      },
  "lblTransactionDateValueKA":{
        "fieldprops": {
          "entity":"Transactions",
          "widgettype":"Label",
          "field":"transactionDate"
		}		  
      },
  "lblFrequencyDataKA":{
        "fieldprops": {
          "entity":"Transactions",
          "widgettype":"Label",
          "field":"frequencyType"
		}		  
      },
  "transactionNotes":{
        "fieldprops": {
          "entity":"Transactions",
          "widgettype":"Label",
          "field":"transactionsNotes"
		}		  
      }
};