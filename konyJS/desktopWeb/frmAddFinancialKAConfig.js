var frmAddFinancialKAConfig ={
	"formid": "frmAddFinancialKA",
	"frmAddFinancialKA": {
		"entity": "ExternalAccounts",
		"objectServiceName": "RBObjects",
		"objectServiceOptions": {
			"access": "online"
		}
	},

	"countryListKA": {
		"fieldprops": {
			"widgettype": "ListBox",
			"field": "",
			"selector": "country",
			"picklistInfo": {
				"entity": "Country",
				"key": "CountryId",
				"value": "Name"
			}
		}
	},
	"txtNameOnAccKA": {
		"fieldprops": {
			"entity": "ExternalAccounts",
			"widgettype": "TextBox",		
			"field": "beneficiaryName"
		}
	},
	"tbxNickNameKA": {
		"fieldprops": {
			"entity": "ExternalAccounts",
			"widgettype": "TextBox",
			"field": "nickName"
		}
	},
	"txtRoutingNOKA": {
		"fieldprops": {
			"entity": "ExternalAccounts",
			"widgettype": "TextBox",		
			"field": "routingNumber"
		}
	},
	"txtSwiftCodeKA": {
		"fieldprops": {
			"entity": "ExternalAccounts",
			"widgettype": "TextBox",
			"field": "swiftCode"
		}
	},
	"txtAccountNOKA": {
		"fieldprops": {
			"entity": "ExternalAccounts",
			"widgettype": "TextBox",		
			"field": "accountNumber"
		}
	},
	"lblAccountTypeKA": {
		"fieldprops": {
			"entity": "ExternalAccounts",
			"widgettype": "Label",	
			"field": "accountType"
		}
	},
	"lblCountryNameKA": {
		"fieldprops": {
			"entity": "ExternalAccounts",
			"widgettype": "Label",			
			"field": "countryName"
		}
	},
	"lblInternaionalAccountKA": {
		"fieldprops": {
			"entity": "ExternalAccounts",
			"widgettype": "Label",			
			"field": "isInternationalAccount"
		}
	}






};