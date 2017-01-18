var accountsLandingConfig = {
    "formid": "accountsLanding",
    "accountsLanding": {
        "entity": "Accounts",
        "objectServiceName": "RBObjects",
        "objectServiceOptions" : {"access":"online"},
    },
    "segAccountInfoData": {
        "fieldprops": {
            "widgettype": "Segment",
            "entity": "Accounts",
            "additionalFields": ["availablePoints","dueDate","openingDate","paymentTerm","maturityDate","lastStatementBalance","creditCardNumber","accountID","bankName","currentBalance","interestRate","minimumDue","principalValue","supportBillPay","supportTransferFrom","supportTransferTo","transactionLimit","transferLimit","errmsg","nickName","success"],
            "field": {
                "nameAccount1": {
                    "widgettype": "Label",
                    "field" : "nickName"
                },
              "dummyAccountNumber": {
                "widgettype": "Label",
                "field" : "accountID"
              },
              "dummyAccountName" : {
                 "widgettype": "Label",
                 "field" : "accountName"
              },
              "amountAccount1":{
                	"widgettype": "Label",
                    "field": "availableBalance"
              },
              "amountcurrBal":{
                	"widgettype": "Label",
                    "field": "currentBalance"
              },
              "amtOutsatndingBal":{
                	"widgettype": "Label",
                    "field": "outstandingBalance"
              },
              "typeAccount":{
                	"widgettype": "Label",
                    "field": "accountType"
              },
              "colorAccount1":{
                	"widgettype": "Label",
                    "field": "accountType",
                    "alias":"sknColor"
              }
            }
        }
    }
}