var depositLandingConfig = {
  "formid": "depositLanding",
  "depositLanding": {
    "entity": "Transactions",
    "objectServiceName": "RBObjects",
    "objectServiceOptions" : {"access":"online"},
	},
  "segInternalTOAccountsKA": {
    "fieldprops": {
      "widgettype": "Segment",
      "entity": "Accounts",
      "additionalFields": ["accountName","accountID","bankName","currentBalance","supportDeposit",],
      "field": {
        "nameAccount1": {
          "widgettype": "Label",
          "field": "nickName"
        },
        "amountAccount1":{
          "widgettype": "Label",
          "field": "availableBalance"
        },
        "dummyAccountNumber":{
          "widgettype": "Label",
          "field": "accountID"
        },
        "lblColorKA":{
          "widgettype":"Label",
          "field":"accountType",
          "alias":"sknColor"
        },
       "typeAccount":{
          "widgettype": "Label",
            "field": "accountName"
       } 

      }
    }
  },
 
  "depositAmountEntered":{
       "fieldprops": {
          "entity":"Transactions",
          "widgettype":"Label",
          "field":"amount"
       }
	},
  "noteTextfield":{
    "fieldprops": {
          "entity":"Transactions",
          "widgettype":"TextField",
           "constrained":true,
          "field":"transactionsNotes"
       }
  },
  
  "toAccountnumber":{
  "fieldprops":{
          "entity":"Transactions",
          "widgettype":"Label",
          "field":"toAccountNumber"
       }
	}
};