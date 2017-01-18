var frmAccountSummaryKAConfig = {
  "formid": "frmAccountSummaryKA",
  "frmAccountSummaryKA": {
    "entity": "Accounts",
    "objectServiceName": "RBObjects",
    "objectServiceOptions" : {"access":"online"},
  },
  "segSavingsKA": {
    "fieldprops": {
      "widgettype": "Segment",
      "entity": "Accounts",
	  "additionalFields": ["accountName"],
      "field": {
        "lblAccountNumberKA": {
          "widgettype": "Label",
          "field": "accountID"
        },       
        "lblAccountNameKA":{
          "widgettype": "Label",
          "field": "nickName"
        },
        "lblAvilableBalanceKA":{
          "widgettype": "Label",
          "field": "availableBalance"
        },
        "lblCurrentBalanceKA":{
          "widgettype": "Label",
          "field": "currentBalance"
        }
      }
    }
  },
    "segCheckAccountKA": {
    "fieldprops": {
      "widgettype": "Segment",
      "entity": "Accounts",
	  "constrained":true,
	  "additionalFields": ["accountName"],
      "field": {
        "lblAccountNumberKA": {
          "widgettype": "Label",
          "field": "accountID"
        },       
        "lblAccountNameKA":{
          "widgettype": "Label",
          "field": "nickName"
        },
        "lblAvilableBalanceKA":{
          "widgettype": "Label",
          "field": "availableBalance"
        },
        "lblCurrentBalanceKA":{
          "widgettype": "Label",
          "field": "currentBalance"
        }
      }
    }
  },
    "segCreditCardKA": {
    "fieldprops": {
      "widgettype": "Segment",
      "entity": "Accounts",
	  "constrained":true,
	  "additionalFields": ["accountName"],
      "field": {
        "lblCreditCardNumberKA": {
          "widgettype": "Label",
          "field": "creditCardNumber"
        },       
        "lblDepositerNameKA":{
          "widgettype": "Label",
          "field": "nickName"
        },
        "lblAmountKA":{
          "widgettype": "Label",
          "field": "currentBalance"
        },
        "lblOpenedOnKA":{
          "widgettype": "Label",
          "field": "availableBalance"
        },
        "lblMaturityKA":{
          "widgettype": "Label",
          "field": "lastStatementBalance"
        },
        "lblIntrestOnKA":{
          "widgettype": "Label",
          "field": "dueDate"
        }
      }
    }
  },
  "segDepositKA": {
    "fieldprops": {
      "widgettype": "Segment",
      "entity": "Accounts",
	  "constrained":true,
	  "additionalFields": ["accountName"],
      "field": {
        "lblCreditCardNumberKA": {
          "widgettype": "Label",
          "field": "accountID"
        },       
        "lblDepositerNameKA":{
          "widgettype": "Label",
          "field": "nickName"
        },
        "lblAmountKA":{
          "widgettype": "Label",
          "field": "availableBalance"
        },
        "lblOpenedOnKA":{
          "widgettype": "Label",
          "field": "openingDate"
        },
        "lblMaturityKA":{
          "widgettype": "Label",
          "field": "maturityDate"
        },
        "lblIntrestOnKA":{
          "widgettype": "Label",
          "field": "interestRate"
        }
      }
    }
  },
   "segMotrageKA": {
    "fieldprops": {
      "widgettype": "Segment",
      "entity": "Accounts",
	  "constrained":true,
	  "additionalFields": ["accountName"],
      "field": {
        "lblCreditCardNumberKA": {
          "widgettype": "Label",
          "field": "accountID"
        },       
        "lblDepositerNameKA":{
          "widgettype": "Label",
          "field": "nickName"
        },
        "lblAmountKA":{
          "widgettype": "Label",
          "field": "openingDate"
        },
        "lblOpenedOnKA":{
          "widgettype": "Label",
          "field": "outstandingBalance"
        },
        "lblMaturityKA":{
          "widgettype": "Label",
          "field": "minimumDue"
        },
        "lblIntrestOnKA":{
          "widgettype": "Label",
          "field": "interestRate"
        }
      }
    }
  },
}