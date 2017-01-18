var frmManageCardsKAConfig = {
  "formid": "frmManageCardsKA",
  "frmManageCardsKA": {
    "entity": "Cards",
    "objectServiceName": "RBObjects",
    "objectServiceOptions" : {"access":"online"},
  } ,
      "segCardsKA": {
        "fieldprops": {
            "widgettype": "Segment",
            "entity": "Cards", 
            "additionalFields": ["userId","cardId","Action","cardStatus"],
            "field": {
                "cardType": {
                    "widgettype": "Label",
                    "field" : "cardType"
                },
              "cardNumber":{
                	"widgettype": "Label",
                    "field": "cardNumber"
              },
              "CardHolder":{
                	"widgettype": "Label",
                    "field": "cardHolderName"
              },
              "ValidThru":{
                	"widgettype": "Label",
                    "field": "expiryDate"
              },
              "cardImage":{
                "widgettype": "Image",
                "field": "cardType",
                "alias": "cardImg"
               
                
              }
              
           
              
            }
        }
    }
  
};