var frmBillRecentKAConfig = {
    "formid": "frmBillRecentKA",
    "frmBillRecentKA": {
        "entity": "Transactions",
        "objectServiceName": "RBObjects",
        "objectServiceOptions" : {"access":"online"},
    },
	"segRecentKA": {
    "fieldprops": {
      "widgettype": "Segment",
      "entity": "Transactions",
      "additionalFields": ["transactionId","transactionsNotes","toAccountNumber","toAccountName","payeeNickName","payeeId","isScheduled","hasDepositImage","fromAccountNumber","fromAccountName","fromAccountBalance","accountID","frequencyType","statusDescription"],
      "field": {
        "lblDateKA": {
          "widgettype": "Label",
          "field": "transactionDate"
        },       
        "lblAmountKA":{
          "widgettype": "Label",
          "field": "amount"
        },
        "dummy4":{
          "widgettype": "Label",
          "field": "payeeId"
        },
        "lblAccountType":{
          "widgettype": "Label",
          "field": "transactionType"
        },
		"lblTransactionFromKA":{
          "widgettype": "Label",
          "field": "fromNickName"
        },
        "lblTransactionT0KA":{
          "widgettype": "Label",
          "field": "payeeNickName"
        }, 
		"ImgRecurrence":{
          "widgettype": "Label",
          "field": "hasDepositImage"
        },"dummy1":{
          "widgettype": "Label",
          "field": "frequencyType"
        },
        "dummy3":{
          "widgettype": "Label",
          "field": "transactionId"
        },
        "dummy2":{
          "widgettype": "Label",
          "field": "statusDescription"
        },
		"scheduledDate":{
          "widgettype": "Label",
          "field": "scheduledDate"
        }
      }
    }
  }
}