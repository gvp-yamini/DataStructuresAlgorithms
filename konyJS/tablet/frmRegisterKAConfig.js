var frmRegisterKAConfig= {
    "formid": "frmRegisterKA",
    "frmRegisterKA": {
        "entity": "Payee",
        "objectServiceName": "RBObjects",
        "objectServiceOptions" : {"access":"online"},
    },
   "segRegisteredPayee": {
        "fieldprops": {
            "widgettype": "Segment",
            "entity": "Payee",
            "additionalFields": ["addressLine2","cityName","companyName","email","errmsg","payeeId","phone","state","street","success","zipCode"],
            "field": {
                "lblOne": {
                    "widgettype": "Label",
                    "field": "companyName"
                },
              "lblTwo":{
                	"widgettype": "Label",
                    "field": "payeeNickName"
              },
              "lblThree":{
                	"widgettype": "Label",
                    "field": "accountNumber"
              }
           }
        }
    }
}