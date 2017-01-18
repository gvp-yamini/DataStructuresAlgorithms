var frmP2PaddnewPayeeKAConfig = {
  "formid": "frmP2PaddnewPayeeKA",
  "frmP2PaddnewPayeeKA": {
    "entity": "PayPerson",
    "objectServiceName": "RBObjects",
    "objectServiceOptions" : {"access":"online"},
  },

  "payeefname":{
    "fieldprops": {
      "field":"firstName",
      "entity": "PayPerson",
      "widgettype": "TextField",

    }
  },
  "payeelname":{
    "fieldprops": {
      "field":"lastName",
      "entity": "PayPerson",
      "widgettype": "TextField",
    }
  },


  "tbxPhoneKA":{
    "fieldprops": {
      "field":"phone",
      "entity": "PayPerson",
      "widgettype": "TextField",

    }
  },

  "tbxEmailKA":{
    "fieldprops": {
      "field":"email",
      "entity": "PayPerson",
      "widgettype": "TextField",
    }
  }

 
}