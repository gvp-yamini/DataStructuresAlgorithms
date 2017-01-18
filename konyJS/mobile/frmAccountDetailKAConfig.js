var frmAccountDetailKAConfig = {
    "formid": "frmAccountDetailKA",
    "frmAccountDetailKA": {
        "entity": "Transactions",
        "objectServiceName": "RBObjects",
        "objectServiceOptions" : {"access":"online"},
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
              },"dummyForStatusDescription":{
                    "widgettype": "Label",
                    "field": "statusDescription"
            },"dummyfrequencyType":{
               "widgettype": "Label",
               "field": "frequencyType"
            },"dummyisScheduled" : {
              "widgettype": "Label",
              "field": "isScheduled"
            },
            "dummyisdeposits" : {
              "widgettype": "Label",
              "field": "hasDepositImage"
            },
              "Imgcheck":{
                	"widgettype": "Label",
                    "field": "transactiontype",
                    "alias":"Imgcheck"
              }
              
            }
        }
    }
}