var frmPayeeTransactionsKAConfig = {
    "formid": "frmPayeeTransactionsKA",
    "frmPayeeTransactionsKA": {
       "entity": "Transactions",
        "objectServiceName": "RBObjects",
        "objectServiceOptions" : {"access":"online"},
    },
     "segCompletedPaymentsKA": {
        "fieldprops": {
            "widgettype": "Segment",
            "entity": "Transactions",
            "additionalFields": ["accountID","errmsg","isScheduled","payeeId","scheduledDate","statusDescription"],
            "field": {
                "transactionDate": {
                    "widgettype": "Label",
                    "field": "transactionDate"
                },
              "transactionName":{
                	"widgettype": "Label",
                    "field": "description"
              },
              "transactionAmount":{
                	"widgettype": "Label",
                    "field": "amount"
              }
              
            }
        }
    },
       "segScheduledTransactionsKA": {
        "fieldprops": {
            "widgettype": "Segment",
            "entity": "Transactions",
            "additionalFields": ["accountID","errmsg","isScheduled","payeeId","scheduledDate","statusDescription"],
            "field": {
                "transactionDate": {
                    "widgettype": "Label",
                    "field": "transactionDate"
                },
              "transactionName":{
                	"widgettype": "Label",
                    "field": "description"
              },
              "transactionAmount":{
                	"widgettype": "Label",
                    "field": "amount"
              }
              
            }
        }
    },
    "segFailedTransactionsKA": {
        "fieldprops": {
            "widgettype": "Segment",
            "entity": "Transactions",
            "additionalFields": ["accountID","errmsg","isScheduled","payeeId","scheduledDate","statusDescription"],
            "field": {
                "transactionDate": {
                    "widgettype": "Label",
                    "field": "transactionDate"
                },
              "transactionName":{
                	"widgettype": "Label",
                    "field": "description"
              },
              "transactionAmount":{
                	"widgettype": "Label",
                    "field": "amount"
              }
              
            }
        }
    }
  
};