var frmAccountInfoEditKAConfig = {
    "formid": "frmAccountInfoEditKA",
    "frmAccountInfoEditKA": {
        "entity": "Accounts",
        "objectServiceName": "RBObjects",
        "objectServiceOptions" : {"access":"online"},
       "query": "$filters=accountID[eq]'-1'",
        "querytype":"odata",
       
    },
	
 
  //creditcard
  "TextField04db2cc822ba84e": {
        "fieldprops": {
            "entity": "Accounts",
            "field": "nickName",
            "widgettype": "TextField"
        }
    },
  
  "lblHiddenAccountNumberKA": {
        "fieldprops": {
            "entity": "Accounts",
            "field": "accountID",
            "widgettype": "Label"
        }
    }

  
};