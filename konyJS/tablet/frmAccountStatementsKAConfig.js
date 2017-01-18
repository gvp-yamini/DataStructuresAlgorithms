var frmAccountStatementsKAConfig = {
    "formid": "frmAccountStatementsKA",
    "frmAccountStatementsKA": {
        "entity": "AccountStatement",
        "objectServiceName": "RBObjects",
        "objectServiceOptions" : {"access":"online"},
    },
  "segAccountStatementsKA": {
    "fieldprops": {
      "widgettype": "Segment",
      "entity": "AccountStatement",
      "additionalFields": [],
      "field": {
        "transactionDate": {
          "widgettype": "Label",
          "field": "StatementMonth"
        },       
        "transactionName":{
          "widgettype": "Label",
          "field": "StatementDescription"
        },
        "lblSepKA":{
          "widgettype": "Label",
          "field": "StatementLink"
        }
      }
    }
  }
}