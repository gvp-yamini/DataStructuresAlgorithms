var frmManagePayeeKAConfig= {
    "formid": "frmManagePayeeKA",
    "frmManagePayeeKA": {
        "entity": "Payee",
        "objectServiceName": "RBObjects",
        "objectServiceOptions" : {"access":"online"},
    },
   "managepayeesegment": {
        "fieldprops": {
            "widgettype": "Segment",
            "entity": "Payee",
            "additionalFields": ["addressLine2","cityName","companyName","email","errmsg","payeeId","phone","state","street","success","zipCode"],
            "field": {
                "payeename": {
                    "widgettype": "Label",
                    "field": "companyName"
                },
              "payeenickname":{
                	"widgettype": "Label",
                    "field": "payeeNickName"
              },
              "accountnumber":{
                	"widgettype": "Label",
                    "field": "accountNumber"
              }
           }
        }
    }
}