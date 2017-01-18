var frmUserSettingsEditPasswordKAConfig   = {
    "formid": "frmUserSettingsEditPasswordKA",
    "frmUserSettingsEditPasswordKA": {
        "entity": "User",
        "objectServiceName": "RBObjects",
        "objectServiceOptions" : {"access":"online"},
    },
    
	"answerFieldPassword":{
		 "fieldprops": {
		    "field":"password",
            "constrained":true,
            "entity": "User",
			"widgettype": "TextField",
	
    }
},
		"answerField":{
		 "fieldprops": {
			"field":"oldpassword",
            "entity": "User",
			"widgettype": "TextField",
	
    
}
}

}