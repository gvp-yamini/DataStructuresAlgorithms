var frmOtherFinancialKAConfig = {
  "formid": "frmOtherFinancialKA",
  "frmOtherFinancialKA": {
    "entity": "ExternalAccounts",
    "objectServiceName": "RBObjects",
    "objectServiceOptions" : {"access":"online"}
  },
 "segAddFinancialKA":
  {
        "fieldprops":
         {
            "widgettype": "Segment",
            "entity": "ExternalAccounts",
            "additionalFields": [],
            "field":
             {
                "lbl1": 
                {
                    "widgettype": "Label",
                    "field": "accountNumber"
                },
                "lbl2":
                {
                    "widgettype": "Label",
                      "field": "nickName"
                },
               "lbl3":
                {
                    "widgettype": "Label",
                      "field": "dummy1"
                },
               
                "lbl4":
                {
                      "widgettype": "Label",
                      "field": "accountType"
                },
               "btnMkTransferKA":
               {
               "widgettype": "Label",
                      "field": "dummy2"
             	}
              
            }
        }
    } 
 

};