var moreLandingConfig = {
    "formid": "moreLanding",
    "moreLanding": {
       "entity": "Transactions",
        "objectServiceName": "RBObjects",
        "objectServiceOptions" : {"access":"online"},
    },
     "transactionSegment": {
        "fieldprops": {
            "widgettype": "Segment",
            "entity": "Transactions",
            "additionalFields": ["accountID","errmsg","isScheduled","payeeId","scheduledDate","statusDescription"],
            "field": {
                "CopyLabel07d831b99b64f45": {
                    "widgettype": "Label",
                    "field": "transactionDate"
                },
              "Label01f864cb479e14f":{
                	"widgettype": "Label",
                    "field": "description"
              },
              "CopyLabel07ba1b422f8344c":{
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
                "CopyLabel07d831b99b64f45": {
                    "widgettype": "Label",
                    "field": "transactionDate"
                },
              "Label01f864cb479e14f":{
                	"widgettype": "Label",
                    "field": "description"
              },
              "CopyLabel07ba1b422f8344c":{
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
                "CopyLabel07d831b99b64f45": {
                    "widgettype": "Label",
                    "field": "transactionDate"
                },
              "Label01f864cb479e14f":{
                	"widgettype": "Label",
                    "field": "description"
              },
              "CopyLabel07ba1b422f8344c":{
                	"widgettype": "Label",
                    "field": "amount"
              }              
            }
        }
    }
};