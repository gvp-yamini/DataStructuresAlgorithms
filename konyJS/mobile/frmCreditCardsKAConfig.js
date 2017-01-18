var frmCreditCardsKAConfig = {
  "formid": "frmCreditCardsKA",
  "frmCreditCardsKA": {
    "entity": "Products",
    "objectServiceName": "RBObjects",
    "objectServiceOptions" : {"access":"online"}
  },
  "moreResourcesSegment": {
        "fieldprops": {
            "widgettype": "Segment",
            "entity": "Products",
            "additionalFields": [],
            "field": {
                "lblPageNameKA": {
                    "widgettype": "Label",
                    "field": "productDescription"
                },
              "HiddenLbl":{
                  "widgettype": "Label",
                    "field": "productId"
              },
              
              
            }
        }
    }
  
};