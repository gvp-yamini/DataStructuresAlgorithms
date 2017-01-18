var frmFMMAccountListKAConfig = {
    "formid": "frmFMMAccountListKA",
    "frmFMMAccountListKA": {
        "entity": "PFMAccounts",
        "objectServiceName": "RBObjects",
        "objectServiceOptions" : {"access":"online"},
    },
    "segAccountsKA": {
        "fieldprops": {
            "widgettype": "Segment",
            "entity": "PFMAccounts",
            "additionalFields": ["availablePoints","dueDate","openingDate","paymentTerm","maturityDate","lastStatementBalance","creditCardNumber","accountID","currentBalance","interestRate","minimumDue","principalValue","currencyCode","isPFM",
	  "supportBillPay","supportTransferFrom","supportTransferTo","transactionLimit","transferLimit","errmsg","nickName","success"],
            "field": {
                "nameAccount1": {
                    "widgettype": "Label",
                    "field" : "nickName"
                },
              
              "lblBankName": {
                "widgettype": "Label",
                "field" : "bankName"
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
              "isPFMLabel" : {
                    "widgettype": "Label",
                    "field": "isPFM"
              }
              
            }
        }
    }
}