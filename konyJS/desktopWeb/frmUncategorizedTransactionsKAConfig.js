var frmUncategorizedTransactionsKAConfig = {
    "formid": "frmUncategorizedTransactionsKA",
    "frmUncategorizedTransactionsKA": {
        "entity": "PFMTransactions",
        "objectServiceName": "RBObjects",
        "objectServiceOptions" : {"access":"online"},
    },
   "segSpendingKA": {
        "fieldprops": {
            "widgettype": "Segment",
            "entity": "PFMTransactions",
            "additionalFields": ["categoryId","categoryName","fromAccountName","fromAccountNumber","isAnalyzed","isMappedToMerchant","monthId","transactionId","transactionNotes"],
            "field": {
              "categoryId": {
                    "widgettype": "Label",
                    "field": "categoryId"
                },
              "categoryName": {
                    "widgettype": "Label",
                    "field": "categoryName"
                },
              "fromAccountName": {
                    "widgettype": "Label",
                    "field": "fromAccountName"
                },
              "fromAccountNumber": {
                    "widgettype": "Label",
                    "field": "fromAccountNumber"
                },
              "isAnalyzed": {
                    "widgettype": "Label",
                    "field": "isAnalyzed"
                },
              "isMappedToMerchant": {
                    "widgettype": "Label",
                    "field": "isMappedToMerchant"
                },
              "transactionId": {
                    "widgettype": "Label",
                    "field": "transactionId"
                },
                "transactionNotes": {
                    "widgettype": "Label",
                    "field": "transactionNotes"
                },
                "transactionDate": {
                    "widgettype": "Label",
                    "field": "transactionDate"
                },
              "transactionName":{
                	"widgettype": "Label",
                    "field": "transactionDescription"
              },
              "transactionAmount":{
                	"widgettype": "Label",
                    "field": "transactionAmount"
              },
              "chevron" : {
				  "widgettype": "Label",
                  "field": "transactionAmount",
                  "alias": "chevron"
              }
              
            }
        }
    }
};