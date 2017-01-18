var frmNewAccountKAStep1Config= {
    "formid": "frmNewAccountKAStep1",
    "frmNewAccountKAStep1": {
        "entity": "AccountType",
        "objectServiceName": "RBObjects",
        "objectServiceOptions" : {"access":"online"}
    },
    "lbxStateKA":{
    "fieldprops": {
      "widgettype": "ListBox",
      "field":"",
      "selector": "State Name",
      "picklistInfo": {
        "entity":"States",
        "key": "stateId",
        "value": "stateName"
      } 
    }
  },

  	"lbxProductKA":{
    "fieldprops": {
      "widgettype": "ListBox",
      "field":"",
      "selector": "Account Type",
      "picklistInfo": {
        "entity":"AccountType",
        "key": "TypeID",
        "value": "TypeDescription"
      } 
    }
  },

};