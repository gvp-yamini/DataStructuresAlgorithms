var frmMakeTransferAcknowConfig = {
    "formid": "frmMakeTransferAcknow",
    "frmMakeTransferAcknow": {
        "entity": "Transactions",
        "objectServiceName": "RBObjects",
        "objectServiceOptions": {"access":"online"}
    },
    "lblFromAccountNumber": {
        "fieldprops": {
            "entity":"Transactions",  
            "widgettype": "Label",
            "field": "fromAccountNumber"
        }
    },
    "lblToAccountNumber": {
        "fieldprops": {
            "entity":"Transactions",  
            "widgettype": "Label",
            "field": "toAccountNumber"
        }
    },
  	"lblTransferType": {
        "fieldprops": {
            "entity":"Transactions",  
            "widgettype": "Label",
            "field": "transactionType"
        }
    },
    "lblExternalAccountNumber": {
        "fieldprops": {
            "entity":"Transactions",  
            "widgettype": "Label",
            "field": "ExternalAccountNumber"
        }
    },
    "lblAmountDataKA": {
        "fieldprops": {
            "entity":"Transactions",  
            "widgettype": "Label",
            "field": "amount"
        }
    },
    "lblNotesDataKA": {
        "fieldprops": {
            "entity":"Transactions",  
            "widgettype": "Label",
            "field": "transactionsNotes"
        }
    },           
     "lblFrequencyDataKA": {
        "fieldprops": {
            "entity":"Transactions",
            "widgettype": "Label",
            "field": "frequencyType"
        }
    },
     "lblTransferDate": {
        "fieldprops": {
            "entity":"Transactions",
            "widgettype": "Label",
            "field": "scheduledDate"
        }
    },
     "lblRecurrenceTimesDataKA": {
        "fieldprops": {
            "entity":"Transactions",
            "widgettype": "Label",
            "field": "numberOfRecurrences"
        }
    },
     "lblFromDate": {
        "fieldprops": {
            "entity":"Transactions",
            "widgettype": "Label",
            "field": "frequencyStartDate"
        }
    },
     "lblToDate": {
        "fieldprops": {
            "entity":"Transactions",
            "widgettype": "Label",
            "field": "frequencyEndDate"
        }
    },
  	 "lblTransactionId": {
        "fieldprops": {
            "entity":"Transactions",
            "widgettype": "Label",
            "field": "transactionId"
        }
    }
  
      
};