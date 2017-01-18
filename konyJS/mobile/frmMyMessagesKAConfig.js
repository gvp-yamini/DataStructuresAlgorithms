var frmMyMessagesKAConfig = {
    "formid": "frmMyMessagesKA",
    "frmMyMessagesKA": {
        "entity": "Messages",
        "objectServiceName": "RBObjects",
        "objectServiceOptions" : {"access":"online"}
    },
    "segMessagesInboxKA": {
        "fieldprops": {
            "widgettype": "Segment",
            "entity": "Messages",
            "field": {
              "lblTitleKA":{
                	"widgettype": "Label",
                    "field": "subject"
              },
             "lblDescKA":{
                "widgettype": "Label",
                "field": "message"
              },
              "lblTimestampKA":{
                "widgettype":"Label",
                "field":"receivedDate"
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
              "lblCategoryNameKA":{
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
