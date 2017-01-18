var frmMessageSentItemsKAConfig = {
    "formid": "frmMessageSentItemsKA",
    "frmMessageSentItemsKA": {
        "entity": "Messages",
        "objectServiceName": "RBObjects",
        "objectServiceOptions" : {"access":"online"}
    },
    "segMessagesSentKA": {
        "fieldprops": {
            "widgettype": "Segment",
            "entity": "Messages",
            "field": {
              "lblSubjectKA":{
                	"widgettype": "Label",
                    "field": "subject"
              },
             "lblMsgDescKA":{
                "widgettype": "Label",
                "field": "message"
              },
              "lblDateKA":{
                "widgettype":"Label",
                "field":"sentDate"
              },
			  "lblMessageIdKA":{
                "widgettype":"Label",
                "field":"messageId"
              },
			  "lblMessagestatusKA":{
                "widgettype":"Label",
                "field":"isRead"
              },
              "lblAccountIdKA":{
                "widgettype":"Label",
                "field":"accountId"
              },
              "lblAccountNameKA":{
                "widgettype":"Label",
                "field":"accountName"
              },
              "lblCategoryIdKA":{
                "widgettype":"Label",
                "field":"categoryId"
              },
              "lblCategoryKA":{
                "widgettype":"Label",
                "field":"categoryName"
              },
              "lblSubCategoryIdKA":{
                "widgettype":"Label",
                "field":"subcategoryId"
              },
              "lblSubCategoryNameKA":{
                "widgettype":"Label",
                "field":"subcategoryName"
              }
              
            }
        }
    }
};
