var frmMessageDraftKAConfig = {
    "formid": "frmMessageDraftKA",
    "frmMessageDraftKA": {
        "entity": "Messages",
        "objectServiceName": "RBObjects",
        "objectServiceOptions" : {"access":"online"}
    },
    
   "tbxSubjectKA":{
      "fieldprops":{
        "entity":"Messages",
           "widgettype": "TextField",
            "field": "subject"
        }
    },
  "txtAreaMsgDescKA":{
    "fieldprops":{
        "entity":"Messages",
           "widgettype": "TextArea2",
            "field": "message"
        }
  },
  "lblMessageHeaderKA":{
    "fieldprops": {
          "entity": "Messages",
          "field": "createdDate",
          "widgettype": "Label"
        }
    },
     "lbxAccountNameKA":{
        "fieldprops": {
          "entity":"Messages",
          "widgettype": "ListBox",
          "field":"accountId",
          "selector": "relevant account name",
          "picklistInfo": {
            "entity": "Accounts",
            "key": "accountID",
            "value": "nickName"
          }
        }
    },
    "lbxCategoryKA":{
        "fieldprops": {
          "entity":"Messages",
          "widgettype": "ListBox",
          "field":"categoryId",
          "selector": "category",
          "picklistInfo": {
            "entity": "MessageCategory",
            "key": "categoryId",
            "value": "categoryName"
        }
       }
      },
    "lbxSubCategoryKA":{
        "fieldprops": {
          "entity":"Messages",
          "widgettype": "ListBox",
          "field":"subcategoryId"
       }
    },
  "lblMsgIdKA":{
    "fieldprops": {
          "entity": "Messages",
          "field": "messageId",
          "widgettype": "Label"
        }
    },
  "lblMessageTypeKA":{
    "fieldprops": {
          "entity": "Messages",
          "field": "messageType",
          "widgettype": "Label"
        }
    }
};



