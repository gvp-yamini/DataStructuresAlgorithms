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
  "lblaccountNameKA" : {
	  "fieldprops": {
          "entity":"CheckOrder",
          "widgettype":"Label",
          "field":"name"
		} 
  },
  "lblPostBoxNumberKA" : {
	  	  "fieldprops": {
          "entity":"CheckOrder",
          "widgettype":"Label",
          "field":"postboxNumber"
		}
  },
   "lblStreetK" : {
    	 "fieldprops": {
          "entity":"CheckOrder",
          "widgettype":"Label",
          "field":"state"
		}
  },
  "lblZipCodeK" : {
    	 "fieldprops": {
          "entity":"CheckOrder",
          "widgettype":"Label",
          "field":"country"
		}
  },
  "CopylblZipCodeKA0bcd5e742ad7a42" : {
    	 "fieldprops": {
          "entity":"CheckOrder",
          "widgettype":"Label",
          "field":"zipcode"
		}
  }
}