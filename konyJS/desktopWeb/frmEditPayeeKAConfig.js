var frmEditPayeeKAConfig = {
    "formid": "frmEditPayeeKA",
    "frmEditPayeeKA": {
        "entity": "Payee",
        "objectServiceName": "RBObjects",
        "objectServiceOptions" : {"access":"online"},
    },
     "tbxCompanyNameKA":{
       "fieldprops": {
          "entity":"Payee",
          "widgettype": "TextField",
          "field":"companyName"
       }
    },
    "tbxNickNameKA":{
        "fieldprops":{
        "entity":"Payee",
           "widgettype": "TextField",
            "field": "payeeNickName"
        }
      },
   "tbxAccKA":{
        "fieldprops":{
        "entity":"Payee",
           "widgettype": "TextField",
            "field": "accountNumber"
        }
      },
   "tbxAddress1KA":{
        "fieldprops":{
        "entity":"Payee",
           "widgettype": "TextField",
            "field": "zipCode"
        }
      },
   "payeeID" : {
        "fieldprops": {
            "entity": "Payee",
            "field": "payeeId",
            "widgettype": "TextField"
        }
   }
}