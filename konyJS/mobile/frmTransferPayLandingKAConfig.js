var frmTransferPayLandingKAConfig = {
  "formid": "frmTransferPayLandingKA",
  "frmTransferPayLandingKA": {
    "entity": "Transactions",
    "objectServiceName": "RBObjects",
    "objectServiceOptions" : {"access":"online"},
  }, 
  "recentTransactions": {
    "fieldprops": {
      "widgettype": "Segment",
      "entity": "Transactions",
      "additionalFields": ["transactionId","transactionsNotes","toAccountNumber","toAccountName","payeeNickName","payeeId","isScheduled","hasDepositImage","fromAccountNumber","fromAccountName","fromAccountBalance","accountID","frequencyType","statusDescription"],
      "field": {
        "transactionDate": {
          "widgettype": "Label",
          "field": "transactionDate"
        },       
        "transactionAmount":{
          "widgettype": "Label",
          "field": "amount"
        },
        "lblAccountType":{
          "widgettype": "Label",
          "field": "transactiontype"
        },
        "transactionName":{
          "widgettype": "Label",
          "field": "description"
        }, "ImgRecurrence":{
          "widgettype": "Label",
          "field": "hasDepositImage"
        }, "ImgTransactionFail":{
          "widgettype": "Label",
          "field": "statusDescription"
        } 
      }
    }
  },
  "scheduledTransactions": {
    "fieldprops": {
      "widgettype": "Segment",
      "constrained":true,
      "entity": "Transactions",
      "additionalFields": [],
      "field": {
        "transactionDate": {
          "widgettype": "Label",
          "field": "transactionDate"
        },       
        "lblAccountType":{
          "widgettype": "Label",
          "field": "transactiontype"
        },
        "transactionAmount":{
          "widgettype": "Label",
          "field": "amount"
        },
        "transactionName":{
          "widgettype": "Label",
          "field": "description"
        }, "ImgRecurrence":{
          "widgettype": "Label",
          "field": "hasDepositImage"
        }, "ImgTransactionFail":{
          "widgettype": "Label",
          "field": "statusDescription"
        }
      }
    }
  }
}