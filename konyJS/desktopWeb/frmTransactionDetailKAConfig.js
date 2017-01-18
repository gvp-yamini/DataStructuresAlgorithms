var frmTransactionDetailKAConfig = {
    "formid": "frmTransactionDetailKA",
    "frmTransactionDetailKA": {
        "entity": "PFMTransactions",
        "objectServiceName": "RBObjects",
        "objectServiceOptions" : {"access":"online"},
    },
    "dummytransactionAmount": {
        "fieldprops": {
            "entity": "PFMTransactions",
            "field": "transactionAmount",
            "widgettype": "TextField"
        }
    },
   "hiddencategoryIdKA": {
        "fieldprops": {
            "entity": "PFMTransactions",
            "field": "transactionId",
            "widgettype": "Label"
        }
    },
	    "transactionName": {
        "fieldprops": {
            "entity": "PFMTransactions",
            "field": "transactionDescription",
            "widgettype": "TextField"
        }
    },
	    "dummytransactionDate": {
        "fieldprops": {
            "entity": "PFMTransactions",
            "field": "transactionDate",
            "widgettype": "TextField"
        }
    },
	    "transactionFrom": {
        "fieldprops": {
            "entity": "PFMTransactions",
            "field": "fromAccountName",
            "widgettype": "TextField"
        }
    },
	"transactionNotes": {
        "fieldprops": {
            "entity": "PFMTransactions",
            "field": "transactionNotes",
            "widgettype": "TextField"
        }
    },
	    "ListBox001b478bb90954f":{
        "fieldprops": {
          "entity":"PFMTransactions",
          "widgettype": "ListBox",
          "field":"categoryId",
          "selector": "a category",
          "picklistInfo": {
            "entity": "PFMCategory",
            "key": "categoryId",
            "value": "categoryName"
        } 
          
      }
    },
	"hiddenIncludeInAnalysis": {
        "fieldprops": {
            "entity": "PFMTransactions",
            "field": "isAnalyzed",
            "widgettype": "Label"
        }
    },
	"hiddenMaptoMerchant": {
        "fieldprops": {
            "entity": "PFMTransactions",
            "field": "isMappedToMerchant",
            "widgettype": "Label"
        }
    }
}