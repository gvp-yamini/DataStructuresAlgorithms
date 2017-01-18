var frmUserSettingsKAConfig   = {
    "formid": "frmUserSettingsKA",
    "frmUserSettingsKA": {
        "entity": "User",
        "objectServiceName": "RBObjects",
        "objectServiceOptions" : {"access":"online"},
    },

  				"lblAlertsFlagKA": {
                    "fieldprops": {
                      "entity":"User",
                      "widgettype": "Label",
                      "field": "alertsTurnedOn"
                   } 
                },
                "lblForTransferAccKA": {
                  	"fieldprops": {
                      "entity":"User",
                      "widgettype": "Label",
                      "field": "default_account_transfers"
                    }
                },
				"lblForDepositAccKA": {
                 	"fieldprops": {
                      "entity":"User",
                      "widgettype": "Label",
                      "field": "default_account_deposit"
                    }
                },
                "lblForPaymentsAccKA": {
                   "fieldprops": {
                      "entity":"User",
                      "widgettype": "Label",
                      "field": "default_account_payments"
               	 }
    	       }
	
};

 