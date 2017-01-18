var frmPersonalDetailsStep2KAConfig = {
  "formid": "frmPersonalDetailsStep2KA",
  "frmPersonalDetailsStep2KA": {
    "entity": "User",
    "objectServiceName": "RBObjects",
    "objectServiceOptions" : {"access":"online"},
  },
  
  "tbxPhonePrimaryKA":{
        "fieldprops": {
          "entity":"User",
          "widgettype":"TextBox",
          "field":"phone"
		}		  
      },
  "tbxPhoneSecondaryKA":{
        "fieldprops": {
          "entity":"User",
          "widgettype":"TextBox",
          "field":"secondaryphone"
		}		  
      },
  "tbxEmailPrimaryKA":{
        "fieldprops": {
          "entity":"User",
          "widgettype":"TextBox",
          "field":"email"
		}		  
      },
 "tbxEmailSecondaryKA":{
        "fieldprops": {
          "entity":"User",
          "widgettype":"TextBox",
          "field":"secondaryemail"
		}		  
      },
    "tbxAddress1KA":{
        "fieldprops": {
          "entity":"User",
          "widgettype":"Label",
          "field":"addressLine1"
		}		  
      },
  "tbxAddress2KA":{
        "fieldprops": {
          "entity":"User",
          "widgettype":"Label",
          "field":"addressLine2"
		}		  
      },
  "tbxCityKA":{
        "fieldprops": {
          "entity":"User",
          "widgettype":"Label",
          "field":"city"
		}		  
      },
 "tbxStateKA":{
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
    "tbxZipCodeKA":{
        "fieldprops": {
          "entity":"User",
          "widgettype":"Label",
          "field":"zipcode"
		}		  
      }
};

