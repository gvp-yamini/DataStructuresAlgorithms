var frmAlertsKAConfig = {
    "formid": "frmAlertsKA",
    "frmAlertsKA": {
        "entity": "UserAccountAlerts",
        "objectServiceName": "RBObjects",
        "objectServiceOptions" : {"access":"online"},
    },
   "AlertsData": {
        "fieldprops": {
            "widgettype": "Segment",
            "entity": "UserAccountAlerts",
            "additionalFields": [],
          "field": {
                "lblSettingsNameKA": {
                    "widgettype": "Label",
                    "field": "accountName"
                },
            
              "lblSettingsStatusKA":{
                	"widgettype": "Label",
                    "field": "isEnabled"
              },
              "Hidden":{
                  "widgettype": "Label",
                    "field": "alertId"
              }
              
            }
        }
        }
    
};