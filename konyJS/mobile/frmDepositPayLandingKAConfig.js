var frmDepositPayLandingKAConfig = {
    "formid": "frmDepositPayLandingKA",
    "frmDepositPayLandingKA": {
        "entity": "Transactions",
        "objectServiceName": "RBObjects",
        "objectServiceOptions" : {"access":"online"},
    },
    "recentTransactions": {
        "fieldprops": {
            "widgettype": "Segment",
            "entity": "Transactions",
            "field": {
              "lblNotesKA":{
                	"widgettype": "Label",
                    "field": "transactionsNotes",
                    "text": "transactionsNotes",
                    "alias":"transactionsNotes"
              },
              "lblAccountType":{
                	"widgettype": "Label",
                    "field": "toAccountName",
                    "text": "toAccountName",
                    "alias":"toAccountName"
              },
               "transactionAmount":{
                	"widgettype": "Label",
                    "field": "amount",
                    "text": "amount",
                    "alias":"amount"
              },
              "transactionDate":{
                    "widgettype": "Label",
                    "field": "transactionDate",
                    "text": "transactionDate",
                    "alias":"transactionDate"
              },
              "transactionName":{
                    "widgettype": "Label",
                    "field": "description",
                    "text": "description",
                    "alias":"description"
              },
              "lblAccountTypeKA":{
                "widgettype": "Label",
                "field": "statusDescription",
                "text": "statusDescription",
                "alias":"statusDescription"
              }
            }
        }
    },
    "scheduledTransactions": {
        "fieldprops": {
            "widgettype": "Segment",
            "constrained":true,
            "entity": "Transactions",
            "field": {
              "lblNotesKA":{
                	"widgettype": "Label",
                    "field": "transactionsNotes",
                    "text": "transactionsNotes",
                    "alias":"transactionsNotes"
              },
              "lblAccountType":{
                	"widgettype": "Label",
                    "field": "toAccountName",
                    "text": "toAccountName",
                    "alias":"toAccountName"
              },
              "transactionAmount":{
                	"widgettype": "Label",
                    "field": "amount",
                    "text": "amount",
                    "alias":"amount"
              },
              "transactionDate":{
                    "widgettype": "Label",
                    "field": "transactionDate",
                    "text": "transactionDate",
                    "alias":"transactionDate"
              },
              "transactionName":{
                    "widgettype": "Label",
                    "field": "description",
                    "text": "description",
                    "alias":"description"
              },
              "lblAccountTypeKA":{
                "widgettype": "Label",
                "field": "statusDescription",
                "text": "statusDescription",
                "alias":"statusDescription"
              }
            }
        }
    }
};