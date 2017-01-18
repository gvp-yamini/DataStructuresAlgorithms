var frmCheckReOrderListKAConfig = {
    "formid": "frmCheckReOrderListKA",
    "frmCheckReOrderListKA": {
        "entity": "CheckOrder",
        "objectServiceName": "RBObjects",
        "objectServiceOptions" : {"access":"online"},
    },
   "contactsegment": {
        "fieldprops": {
            "widgettype": "Segment",
            "entity": "CheckOrder",
            "additionalFields": ["checkOrderID"],
            "field": {
              "transactionDate": {
                    "widgettype": "Label",
                    "field": "orderTime"
                },
              "CopytransactionName0bfeb2626799d46": {
                    "widgettype": "Label",
                    "field": "status"
                },
              "transactionName": {
                    "widgettype": "Label",
                    "field": "accountNickName"
                },
              "lblNumberOfLeafletsKA": {
                    "widgettype": "Label",
                    "field": "leafCount"
                },
              "chevron":{
              	"widgettype": "Image",
              	"field": "state",
              	"alias":"chevron"
            },
             "dummyId":{
              "widgettype": "Label",
              "field": "checkOrderID"
            }
            }
        }
    }
};