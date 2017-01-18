var frmDealsAlertKAConfig = {
  "formid": "frmDealsAlertKA",
  "frmDealsAlertKA": {
    "entity": "UserAlerts",
    "objectServiceName": "RBObjects",
    "objectServiceOptions" : {"access":"online"},
  },
   "lblNewDeals": {
        "fieldprops": {
            "widgettype": "Label",
            "entity": "UserAlerts",
            "field": "newDealsAvailable"
        }
    },
	 "lblDealsExpiring": {
        "fieldprops": {
            "widgettype": "Label",
            "entity": "UserAlerts",
            "field": "dealsExpiring"
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