var frmPickAProductKAConfig = {
    "formid": "frmPickAProductKA",
    "frmPickAProductKA": {
        "entity": "AccountType",
        "objectServiceName": "RBObjects",
        "objectServiceOptions" : {"access":"online"},
    },
    "segAccountKA": {
        "fieldprops": {
            "widgettype": "Segment",
            "entity": "AccountType",
            "additionalFields": [],
            "field": {
                "nameAccount1": {
                    "widgettype": "Label",
                    "field" : "TypeDescription"
                },
              "typeKA": {
                "widgettype": "Label",
                "field" : "TypeID",
                "alias" : "AccID"
              },
              "lblColorKA":{
                	"widgettype": "Label",
                    "field": "TypeDescription",
                    "alias":"sknColor"
              }
              
            }
        }
    }
}