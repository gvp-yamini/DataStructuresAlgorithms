var frmEnrolluserSettingsKAConfig= {
    "formid": "frmEnrolluserSettingsKA",
    "frmEnrolluserSettingsKA": {
        "entity": "User",
        "objectServiceName": "RBObjects",
        "objectServiceOptions" : {"access":"online"}
    },
    "listSavingsKA":{
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
    "lstboxquestn1":{
        "fieldprops": {
          "entity":"User",
          "widgettype": "ListBox",
          "field":"",
          "selector": "a question here",
          "picklistInfo": {
            "entity": "SecurityQuestions",
            "key": "SecurityID",
            "value": "question"
        } 
          
      }
    },
    "lstboxquestn2":{
        "fieldprops": {
          "entity":"User",
          "widgettype": "ListBox",
          "field":"",
          "selector": "a question here",
          "picklistInfo": {
            "entity": "SecurityQuestions",
            "key": "SecurityID",
            "value": "question"
        } 
          
      }
    },
   "lstboxquestn3":{
        "fieldprops": {
          "entity":"User",
          "widgettype": "ListBox",
          "field":"",
          "selector": "a question here",
          "picklistInfo": {
            "entity": "SecurityQuestions",
            "key": "SecurityID",
            "value": "question"
        } 
          
      }
    },
   "lstboxquestn4":{
        "fieldprops": {
          "entity":"User",
          "widgettype": "ListBox",
          "field":"",
          "selector": "a question here",
          "picklistInfo": {
            "entity": "SecurityQuestions",
            "key": "SecurityID",
            "value": "question"
        } 
          
      }
    },
   "lstboxquestn5":{
        "fieldprops": {
          "entity":"User",
          "widgettype": "ListBox",
          "field":"",
          "selector": "a question here",
          "picklistInfo": {
            "entity": "SecurityQuestions",
            "key": "SecurityID",
            "value": "question"
        } 
          
      }
    },
    "txtAmountKA":{
       "fieldprops": {
          "entity":"User",
          "widgettype": "TextField",
          "field":"accountNumber"
       }
    },
    "tbxssnnumber":{
        "fieldprops":{
        "entity":"User",
           "widgettype": "TextField",
            "field": "ssn"
        }
      },
    "lblDobKA": {
          "fieldprops": {
          "entity": "User",
          "field": "dateOfBirth",
          "widgettype": "Label"
        }
     },
      "txtUserNameKA":{
           "fieldprops":{
           "entity": "User",
           "widgettype": "TextField",
            "field": "userName"
      }
    },
        "txtPasswordKA":{
          "fieldprops":{
          "entity": "User",
          "widgettype": "TextField",
          "field": "password"
          }
        },
       "txtEmailKA":{
          "fieldprops":{
          "entity": "User",
          "widgettype": "TextField",
          "field": "email"
          }
       },
     "txtPhoneNumberKA":{
       "fieldprops":{
          "entity": "User",
           "widgettype": "TextField",
           "field": "phone"
          }
     },
    "tbxAnswer1":{
        "fieldprops":{
        "entity": "User",
            "widgettype": "TextField",
            "field": ""
          }
    
  },
   "tbxAnswer2":{
     "fieldprops":{
          "entity": "User",
            "widgettype": "TextField",
            "field": ""
          }
    
  },
   "tbxAnswer3":{
     "fieldprops":{
          "entity": "User",
            "widgettype": "TextField",
            "field": ""
          }
    
  },
   "tbxAnswer4":{
     "fieldprops":{
          "entity": "User",
            "widgettype": "TextField",
            "field": ""
          }
    
  },
   "tbxAnswer5":{
     "fieldprops":{
          "entity": "User",
            "widgettype": "TextField",
            "field": ""
          }
    
  }
};

