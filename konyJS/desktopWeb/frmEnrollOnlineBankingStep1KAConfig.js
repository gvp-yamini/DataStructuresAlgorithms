var frmEnrollOnlineBankingStep1KAConfig= {
    "formid": "frmEnrollOnlineBankingStep1KA",
    "frmEnrollOnlineBankingStep1KA": {
        "entity": "User",
        "objectServiceName": "RBObjects",
        "objectServiceOptions" : {"access":"online"}
    },
    "lbxAcTypeKA":{
        "fieldprops": {
          "entity":"User",
          "widgettype": "ListBox",
          "field":"accountType",
          "selector": "Account Type",
          "picklistInfo": {
            "entity": "AccountType",
            "key": "TypeID",
            "value": "TypeDescription"
        } 
          
      }
    },
    
};

