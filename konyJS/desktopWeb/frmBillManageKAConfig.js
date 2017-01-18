var frmBillManageKAConfig = {
    "formid": "frmBillManageKA",
    "frmBillManageKA": {
        "entity": "Payee",
        "objectServiceName": "RBObjects",
        "objectServiceOptions" : {"access":"online"},
    },
   "segManagePaymentsKA": {
        "fieldprops": {
            "widgettype": "Segment",
            "entity": "Payee",
            "additionalFields": ["addressLine2","cityName","companyName","email","errmsg","payeeId","phone","state","street","success","zipCode"],
            "field": {
                "lblCompanyKA": {
                    "widgettype": "Label",
                    "field": "companyName"
                },
              "lblPayeeKA":{
                	"widgettype": "Label",
                    "field": "payeeNickName"
              },
              "dummy1": {
                    "widgettype": "Label",
                    "field": "payeeId"
                },
              "lblAccountKA":{
                	"widgettype": "Label",
                    "field": "accountNumber"
              }
           }
        }
    }
}