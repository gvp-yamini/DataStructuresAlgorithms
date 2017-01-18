var frmUncategorizedTransactionsKAConfig = {
    "formid": "frmUncategorizedTransactionsKA",
    "frmUncategorizedTransactionsKA": {
        "entity": "PFMTransactions",
        "objectServiceName": "RBObjects",
        "objectServiceOptions" : {"access":"online"},
    },
   "segUncategorizedTransactionsKA": {
        "fieldprops": {
            "widgettype": "Segment",
            "entity": "PFMTransactions",
            "additionalFields": [],
            "field": {
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
              }
              
            }
        }
    }
}