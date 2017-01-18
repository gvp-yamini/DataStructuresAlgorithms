var frmP2PselectPayeeKAConfig = {
    "formid": "frmP2PselectPayeeKA",
    "frmP2PselectPayeeKA": {
        "entity": "PayPerson",
        "objectServiceName": "RBObjects",
        "objectServiceOptions" : {"access":"online"},
    },
   "contactsegment": {
        "fieldprops": {
            "widgettype": "Segment",
            "entity": "PayPerson",
            "additionalFields": [],
            "field": {
                "transactionName": {
                    "widgettype": "Label",
                    "field": "firstName"
                },
				
				"transactionLastName": {
                    "widgettype": "Label",
                    "field": "lastName"
                },
              "transactionDate":{
                	"widgettype": "Label",
                    "field": "phone"
              },
              "transactionId":{
              "widgettype": "Label",
                    "field": "PayPersonId"
            }
              
            }
        }
    }
}