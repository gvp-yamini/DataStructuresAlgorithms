var frmCardsListKAConfig = {
  "formid": "frmCardsListKA",
  "frmCardsListKA": {
    "entity": "Cards",
    "objectServiceName": "RBObjects",
    "objectServiceOptions" : {"access":"online"},
  },
  "segCardsListKA": {
    "fieldprops": {
      "widgettype": "Segment",
      "entity": "Cards",
      "additionalFields": ["userId","cardId","Action","cardStatus"],
      "field": {
        "lblCardTypeKA": {
          "widgettype": "Label",
          "field": "cardType"
        },       
     
        "lblCardNumberKA":{
          "widgettype": "Label",
          "field": "cardNumber"
        },
        "lblCardHolderKA":{
          "widgettype": "Label",
          "field": "cardHolderName"
        },
        "lblValidKA":{
          "widgettype": "Label",
          "field": "expiryDate"
        },
        "lblCardStatusKA":{
          "widgettype": "Label",
          "field": "cardStatus"
        }
      }
    }
  }
}