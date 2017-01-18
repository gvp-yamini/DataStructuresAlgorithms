var frmSecurityAlertsKAConfig = {
  "formid": "frmSecurityAlertsKA",
  "frmSecurityAlertsKA": {
    "entity": "UserAlerts",
    "objectServiceName": "RBObjects",
    "objectServiceOptions" : {"access":"online"}
  },
   "lblBankingIdChange": {
        "fieldprops": {
            "entity": "UserAlerts",
            "field": "bankingIDChange",
           "widgettype": "Label"
        }
    },
	 "lblPasswordChange": {
        "fieldprops": {
            "widgettype": "Label",
            "entity": "UserAlerts",
            "field": "passwordChange"
        }
    },
	 "lblPasswordExpired": {
        "fieldprops": {
            "widgettype": "Label",
            "entity": "UserAlerts",
            "field": "passwordExpired"
        }
    },
	 "lblAddressPhoneChange": {
        "fieldprops": {
            "widgettype": "Label",
            "entity": "UserAlerts",
            "field": "communicationChange"
        }
    },
	 "lbNewPayeeAdded": {
        "fieldprops": {
            "widgettype": "Label",
            "entity": "UserAlerts",
            "field": "newPayeeAdded"
        }
    }, 
	"lblPayeeDetailsUpdated": {
        "fieldprops": {
            "widgettype": "Label",
            "entity": "UserAlerts",
            "field": "payeeDetailsUpdated"
        }
    },
	"lblAlertId": {
        "fieldprops": {
            "widgettype": "Label",
            "entity": "UserAlerts",
            "field": "alertid"
        }
    }
  
};