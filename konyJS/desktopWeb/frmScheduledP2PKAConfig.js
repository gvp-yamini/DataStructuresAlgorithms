var frmScheduledP2PKAConfig = {
    "formid": "frmScheduledP2PKA",
    "frmScheduledP2PKA": {
        "entity": "Transactions",
        "objectServiceName": "RBObjects",
        "objectServiceOptions" : {"access":"online"},
    },
	"segAccountStatementsKA": {
    "fieldprops": {
      "widgettype": "Segment",
      "entity": "Transactions",
      "additionalFields": ["transactionId","transactionsNotes","payPersonName","payPersonPhone","payPersonEmail","payPersonId","personId","personid","payeeId","isScheduled","fromAccountNumber","fromAccountName","fromAccountBalance","accountID","statusDescription"],
      "field": {
        "transactionDate": {
          "widgettype": "Label",
          "field": "scheduledDate"
        },       
        "CopytransactionDate0d58ccc8e6ee142":{
          "widgettype": "Label",
          "field": "amount"
        },
        "lblnote":{
          "widgettype": "Label",
          "field": "transactionsNotes"
        },
        "CopytransactionDate0c66cdeb6ab3040":{
          "widgettype": "Label",
          "field": "fromNickName"
        },
        "CopytransactionDate0e925907c93b440":{
          "widgettype": "Label",
          "field": "description"
        },
        "btnDownLoadKA":{
          "constrained" : true,
          "widgettype": "Label",
          "field": "transactionType"
        },
      }
    }
  }
}