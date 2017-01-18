var frmacntstatementsKAConfig = {
    "formid": "frmacntstatementsKA",
    "frmacntstatementsKA": {
        "entity": "AccountStatement",
        "objectServiceName": "RBObjects",
        "objectServiceOptions" : {"access":"online"},
    },
  "contactsegment": {
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
        "lblStstementLinkKA" : {
          "widgettype": "Label",
          "field": "StatementLink"
        }
      }
    }
  }
}