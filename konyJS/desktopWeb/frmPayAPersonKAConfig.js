var frmPayAPersonKAConfig= {
    "formid": "frmPayAPersonKA",
    "frmPayAPersonKA": {
      "entity": "Accounts",
      "objectServiceName": "RBObjects",
      "objectServiceOptions": {
        "access": "online"
      }
    },
  "tbxAmountKA":{
    "fieldprops": {
      "field":"firstName",
      "entity": "Transactions",
	  "constrained":true,
      "widgettype": "TextField",

    }
  },
  "referenceId":{
    "fieldprops": {
      "field":"transactionId",
      "entity": "Transactions",
	  "constrained":true,
      "widgettype": "Label",

    }
  },
  "noteTbx":{
    "fieldprops": {
      "field":"lastName",
      "entity": "Transactions",
	  "constrained":true,
      "widgettype": "TextField",
    }
  },
  "fromAccListBox": {
    "fieldprops": {
      "widgettype": "ListBox",
      "field": "accountName",
      "selector": "From Account",
      "picklistInfo": {
        "entity": "Accounts",
        "key": "accountID",
        "value": "nickName"
      }
    }
  },
  "toAcclistBox": {
    "fieldprops": {
      "widgettype": "ListBox",
      "field": "firstName",
      "selector": "Payee",
      "picklistInfo": {
        "entity": "PayPerson",
        "key": "PayPersonId",
        "value": "firstName"
      }
    }
  }
};