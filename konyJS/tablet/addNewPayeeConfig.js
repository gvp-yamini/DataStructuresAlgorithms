var addNewPayeeConfig = {
  "formid": "addNewPayee",
  "addNewPayee": {
    "entity": "Payee", 
    "objectServiceName": "RBObjects",
    "objectServiceOptions" : {"access":"online"},
  },
  "newPayeeNameTextfield":{
       "fieldprops": {
          "entity":"Payee",
          "widgettype": "TextField",
          "field":"companyName"
       }
    },
    "nickName":{
        "fieldprops":{
        "entity":"Payee",
           "widgettype": "TextField",
            "field": "payeeNickName"
        }
      },
   "newPayeeAccountNumberTextField":{
        "fieldprops":{
        "entity":"Payee",
           "widgettype": "TextField",
            "field": "accountNumber"
        }
      },
   "zipcode":{
        "fieldprops":{
        "entity":"Payee",
           "widgettype": "TextField",
            "field": "zipCode"
        }
      },
};