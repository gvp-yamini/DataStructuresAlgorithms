var frmUpdateAccountAlertsKAConfig = {
    "formid": "frmUpdateAccountAlertsKA",
    "frmUpdateAccountAlertsKA": {
        "entity": "UserAccountAlerts",
        "objectServiceName": "RBObjects",
        "objectServiceOptions": {
            "access": "online"
        }
    },
    "minBalance": {
        "fieldprops": {
            "entity": "UserAccountAlerts",
            "field": "minimumBalance",
            "widgettype": "TextField"
        }
    },
    
    "debit": {
        "fieldprops": {
            "widgettype": "TextField",
            "entity": "UserAccountAlerts",
            "field": "debitLimit"
        }
    },
    "credit": {
        "fieldprops": {
            "widgettype": "TextField",
            "entity": "UserAccountAlerts",
            "field": "creditLimit"
        }
    },
    

    "HiddenAlertId": {
        "fieldprops": {
            "widgettype": "Label",
            "entity": "UserAccountAlerts",
            "field": "alertId"
        }
    },



     "BalUpdateLB":{
        "fieldprops": {
          "entity":"UserAccountAlerts",
          "widgettype": "ListBox",
          "field":"balanceUpdateTypeId",
          "selector": "relevant Period",
          "picklistInfo": {
            "entity": "TimePeriod",
            "key": "timePeriodId",
            "value": "description"
          }
        }
    },
     "paymentLB":{
        "fieldprops": {
          "entity":"UserAccountAlerts",
          "widgettype": "ListBox",
          "field":"paymentDueReminderTypeId",
          "selector": "relevant Period",
          "picklistInfo": {
            "entity": "TimePeriod",
            "key": "timePeriodId",
            "value": "description"
          }
        }
    },
     "DepositMaturity":{
        "fieldprops": {
          "entity":"UserAccountAlerts",
          "widgettype": "ListBox",
          "field":"depositDueReminderTypeId",
          "selector": "relevant Period",
          "picklistInfo": {
            "entity": "TimePeriod",
            "key": "timePeriodId",
            "value": "description"
          }
        }
    }

};