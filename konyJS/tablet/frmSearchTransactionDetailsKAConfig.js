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
    "transactionName":{
        "fieldprops": {
          "entity":"Transactions",
          "widgettype":"Label",
          "field":"description"
		}		  
      },
   "lblP2PContactKA":{
        "fieldprops": {
          "entity":"Transactions",
          "widgettype":"Label",
          "field":"payPersonPhone"
		}		  
      },
  "transactionFrom":{
        "fieldprops": {
          "entity":"Transactions",
          "widgettype":"Label",
          "field":"fromNickName"
		}		  
      },
  "lblTransactionDateValueKA":{
        "fieldprops": {
          "entity":"Transactions",
          "widgettype":"Label",
          "field":"transactionDate"
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