var frmBillScheduledKAConfig = {
    "formid": "frmBillScheduledKA",
    "frmBillScheduledKA": {
        "entity": "Transactions",
        "objectServiceName": "RBObjects",
        "objectServiceOptions" : {"access":"online"},
    },
	"segScheduleBillPayKA": {
    "fieldprops": {
      "widgettype": "Segment",
      "entity": "Transactions",
      "additionalFields": ["transactionDate","scheduledDate","transactionId","transactionsNotes","toAccountNumber","toAccountName","payeeNickName","payeeId","isScheduled","hasDepositImage","fromAccountNumber","fromAccountName","fromAccountBalance","accountID","frequencyType","statusDescription"],
      "field": {
        "lblDateKA": {
          "widgettype": "Label",
          "field": "scheduledDate"
        },       
        "lblTransactionFromKA":{
          "widgettype": "Label",
          "field": "fromNickName"
        },
        "lblTransactionT0KA":{
          "widgettype": "Label",
          "field": "payeeNickName"
        },
		"lblAmountKA":{
          "widgettype": "Label",
          "field": "amount"
        },
		"ImgRecurrence":{
          "widgettype": "Label",
          "field": "hasDepositImage"
        },
        "dummyStatus":{
          "widgettype": "Label",
          "field": "transactionType"
        },
        "dummytransactionType":{
          "widgettype": "Label",
          "field": "transactionType"
        },
         "dummytransactionId":{
          "widgettype": "Label",
          "field": "transactionId"
        },
        "dummyfrequency":{
          "widgettype": "Label",
          "field": "statusDescription"
        }
      }
    }
  }
}