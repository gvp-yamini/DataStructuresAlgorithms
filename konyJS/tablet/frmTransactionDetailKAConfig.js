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
	    "lblTransactionNameKA": {
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
	    "lblTransactionFromKA": {
        "fieldprops": {
            "entity": "PFMTransactions",
            "field": "fromAccountName",
            "widgettype": "TextField"
        }
    },
	"lblTransactionNotesKA": {
        "fieldprops": {
            "entity": "PFMTransactions",
            "field": "transactionNotes",
            "widgettype": "TextField"
        }
    },
	    "ListBox0976b69518ac446":{
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