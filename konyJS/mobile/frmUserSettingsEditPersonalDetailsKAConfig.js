
var frmUserSettingsEditPersonalDetailsKAConfig = {
  "formid": "frmUserSettingsEditPersonalDetailsKA",
  "frmUserSettingsEditPersonalDetailsKA": {
    "entity": "User",
    "objectServiceName": "RBObjects",
    "objectServiceOptions" : {"access":"online"},
  },
  "answerField1":{
        "fieldprops": {
          "entity":"User",
          "widgettype":"TextBox",
          "field":"phone"
		}		  
      },
  "answerField2":{
        "fieldprops": {
          "entity":"User",
          "widgettype":"TextBox",
          "field":"secondaryphone"
		}		  
      },
  "answerField3":{
        "fieldprops": {
          "entity":"User",
          "widgettype":"TextBox",
          "field":"email"
		}		  
      },
 "answerField4":{
        "fieldprops": {
          "entity":"User",
          "widgettype":"TextBox",
          "field":"secondaryemail"
		}		  
      },
    "answerField5":{
        "fieldprops": {
          "entity":"User",
          "widgettype":"Label",
          "field":"addressLine1"
		}		  
      },
  "answerField6":{
        "fieldprops": {
          "entity":"User",
          "widgettype":"Label",
          "field":"addressLine2"
		}		  
      },
  "answerField7":{
        "fieldprops": {
          "entity":"User",
          "widgettype":"Label",
          "field":"city"
		}		  
      },
 "answerField8":{
        "fieldprops": {
          "entity":"User",
          "widgettype":"Label",
          "field":"state"
		}		  
      },
   "lbxCountryKA":{
        "fieldprops": {
          "entity":"User",
          "widgettype":"ListBox",
          "field":"country",
          "selector": "Country",
          "picklistInfo": {
            "entity": "Country",
            "key": "Name",
            "value": "Name"
        } 
		}		  
      },
    "answerField10":{
        "fieldprops": {
          "entity":"User",
          "widgettype":"Label",
          "field":"zipcode"
		}		  
      }
};

  

