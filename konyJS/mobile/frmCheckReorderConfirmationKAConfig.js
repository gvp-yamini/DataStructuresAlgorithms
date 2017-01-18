var frmCheckReorderConfirmationKAConfig = {
    "formid": "frmCheckReorderConfirmationKA",
    "frmCheckReorderConfirmationKA": {
        "entity": "CheckOrder",
        "objectServiceName": "RBObjects",
        "objectServiceOptions" : {"access":"online"},
    },
"accountNicknameTextfield":{
        "fieldprops": {
          "entity":"CheckOrder",
          "widgettype":"Label",
          "field":"accountID"
		}		  
      },
  "lblNumberOfLeafletsVal" : {
	    "fieldprops": {
          "entity":"CheckOrder",
          "widgettype":"Label",
          "field":"leafCount"
		}
  }, 
  "lblaccountName" : {
	  "fieldprops": {
          "entity":"CheckOrder",
          "widgettype":"Label",
          "field":"name"
		} 
  },
  "lblPostBoxNumber" : {
	  	  "fieldprops": {
          "entity":"CheckOrder",
          "widgettype":"Label",
          "field":"postboxNumber"
		}
  },
   "lblStreetKA" : {
    	 "fieldprops": {
          "entity":"CheckOrder",
          "widgettype":"Label",
          "field":"state"
		}
  },
  "lblZipCodeKA" : {
    	 "fieldprops": {
          "entity":"CheckOrder",
          "widgettype":"Label",
          "field":"country"
		}
  },
  "CopylblZipCodeKA02d327cdad7ce4c" : {
    	 "fieldprops": {
          "entity":"CheckOrder",
          "widgettype":"Label",
          "field":"zipcode"
		}
  }
}