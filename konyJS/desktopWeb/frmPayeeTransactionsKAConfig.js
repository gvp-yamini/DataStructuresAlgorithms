var frmPayeeTransactionsKAConfig = {
    "formid": "frmPayeeTransactionsKA",
    "frmPayeeTransactionsKA": {
       "entity": "Transactions",
        "objectServiceName": "RBObjects",
        "objectServiceOptions" : {"access":"online"},
    },
     "segCompletedPaymentsKA": {
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
        "lblPayeeNickNameKA":{
          "widgettype": "Label",
          "field": "payeeNickName"
        },
        "dummy5":{
          "widgettype": "Label",
          "field": "scheduledDate"
        },
        "dummy6":{
          "widgettype": "Label",
          "field": "fromAccountNumber"
        },
        "lblAccountType":{
          "widgettype": "Label",
          "field": "transactiontype"
        },
		"lblTransactionFromKA":{
          "widgettype": "Label",
          "field": "fromNickName"
        },
        "lblTransactionT0KA":{
          "widgettype": "Label",
          "field": "description"
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
        }
      }
    }
    } 
};