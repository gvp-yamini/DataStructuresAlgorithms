var frmManagePayeeP2PKAConfig = {
    "formid": "frmManagePayeeP2PKA",
    "frmManagePayeeP2PKA": {
        "entity": "PayPerson",
        "objectServiceName": "RBObjects",
        "objectServiceOptions" : {"access":"online"},
    },
   "segAccountStatementsKA": {
        "fieldprops": {
            "widgettype": "Segment",
            "entity": "PayPerson",
            "additionalFields": ["email","PayPersonId"],
            "field": {
                "CopytransactionDate0e925907c93b440": {
                    "widgettype": "Label",
                    "field": "firstName"
                },
              "CopytransactionDate0c66cdeb6ab3040":{
                	"widgettype": "Label",
                    "field": "lastName"
              },
              "transactionDate": {
                    "widgettype": "Label",
                    "field": "phone"
                }
           }
        }
    }
}