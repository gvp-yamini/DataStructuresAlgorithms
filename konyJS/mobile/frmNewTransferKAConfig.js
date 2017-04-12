var frmNewTransferKAConfig = {
  "formid": "frmNewTransferKA",
  "frmNewTransferKA": {
    "entity": "Accounts",
    "objectServiceName": "RBObjects",
    "objectServiceOptions" : {"access":"online"},
  },
  "segInternalFromAccountsKA": {
    "fieldprops": {
      "widgettype": "Segment",
      "entity": "Accounts",
      "additionalFields": ["accountID","bankName","currentBalance","interestRate","minimumDue","principalValue","supportBillPay","supportTransferFrom","supportTransferTo","transactionLimit","transferLimit","accountType"],
      "field": {
        "nameAccount1": {
          "widgettype": "Label",
          "field": "accountName"
        },
        "amountAccount1":{
          "widgettype": "Label",
          "field": "availableBalance"
        },"typeKA":{
          "widgettype": "Label",
          "field": "accountID"
        },
        "lblRowSeparator":{
          "widgettype": "Label",
          "field": "accountType",
          "alias":"sknRowSepColor"
        },
        "lblColorKA":{
          "widgettype": "Label",
          "field": "accountType",
          "alias":"sknColor"
        }

      }
    }
  },
  "segInternalTOAccountsKA": {
    "fieldprops": {
      "widgettype": "Segment",
      "entity": "Accounts",
      "constrained":true,
      "additionalFields": [],
      "field": {
        "nameAccount1": {
          "widgettype": "Label",
          "field": "accountName"
        },
        "amountAccount1":{
          "widgettype": "Label",
          "field": "availableBalance"
        },"typeKA":{
          "widgettype": "Label",
          "field": "accountID"
        },
        "lblRowSeparator":{
          "widgettype": "Label",
          "field": "accountType",
          "alias":"sknRowSepColor"
        },
        "lblColorKA":{
          "widgettype": "Label",
          "field": "accountType",
          "alias":"sknColor"
        }

      }
    }
  },
};