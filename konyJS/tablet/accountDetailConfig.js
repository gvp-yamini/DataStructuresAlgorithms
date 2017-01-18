var accountDetailConfig = {
    "formid": "accountDetail",
    "accountDetail": {
        "entity": "Transactions",
        "objectServiceName": "RBObjects",
        "objectServiceOptions" : {"access":"online"}
    },
   "transactionSegment": {
        "fieldprops": {
            "widgettype": "Segment",
            "entity": "Transactions",
            "additionalFields": ["transactionComments","success","statusDescription","scheduledDate","referenceId","personId","payeeId","fromAccountType","ExternalAccountNumber","transactionId","transactionsNotes","toAccountNumber","toAccountName","payeeNickName","isScheduled","hasDepositImage","fromAccountNumber","fromAccountName","fromAccountBalance","accountID"],
            "field": {
                "transactionDate": {
                    "widgettype": "Label",
                    "field": "transactionDate"
                },
              "transactionName":{
                	"widgettype": "Label",
                    "field": "description"
              },
              "transactionAmount":{
                	"widgettype": "Label",
                    "field": "amount"
              },
              "Imgcheck":{
                	"widgettype": "Label",
                    "field": "transactiontype",
                    "alias":"Imgcheck"
              }
              
            }
        }
    }
};