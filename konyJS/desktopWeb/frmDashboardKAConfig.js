var frmDashboardKAConfig = {
  "formid": "frmDashboardKA",
  "frmDashboardKA": {
    "entity": "Transactions",
    "objectServiceName": "RBObjects",
    "objectServiceOptions" : {"access":"online"},
  }, 
  "segScheduledTransfersDetailsKA": {
    "fieldprops": {
      "widgettype": "Segment",
      "entity": "Transactions",
      "additionalFields": ["transactionId","toAccountNumber","toAccountName","payeeNickName","isScheduled","hasDepositImage","fromAccountNumber","fromAccountName","fromAccountBalance","accountID"],
      "field": {
        "lblDateKA": {
          "widgettype": "Label",
          "field": "transactionDate"
        },       
        "lblTransactionTypeKA":{
          "widgettype": "Label",
          "field": "transactionType"
        },
        "lblTransactionKA":{
          "widgettype": "Label",
          "field": "transactionId"
        },
        "lblTransferFromKA":{
          "widgettype": "Label",
          "field": "fromNickName"
        },
		"lblAmountKA":{
          "widgettype": "Label",
          "field": "amount"
        },
		"lblTransferToKA":{
          "widgettype": "Label",
          "field": "toAccountName"
        },
		"lblNotesKA":{
          "widgettype": "Label",
          "field": "transactionsNotes"
        },
        "Imgcheck" :{
          "widgettype": "Label",
          "field": "hasDepositImage"
        },
        "lbldummystatusDescriptionKA":{
          "widgettype": "Label",
          "field": "statusDescription"
        },
        "lbldummyfrequencyKA":{
          "widgettype": "Label",
          "field": "frequencyType"
        },
        "lbldummyscheduledKA":{
          "widgettype": "Label",
          "field": "isScheduled"
        },
          "lbldummyPayeeNickKA":{
          "widgettype": "Label",
          "field": "payeeNickName"
        },
        "lbldummyPayPersonKA":{
          "widgettype": "Label",
          "field": "payPersonName"
        }
      }
    }
  }
}