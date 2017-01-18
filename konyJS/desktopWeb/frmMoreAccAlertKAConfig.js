var frmMoreAccAlertKAConfig = {
  "formid": "frmMoreAccAlertKA",
  "frmMoreAccAlertKA": {
    "entity": "UserAccountAlerts",
    "objectServiceName": "RBObjects",
    "objectServiceOptions" : {"access":"online"},
  },
  "listAlertAccountsKA": {
    "fieldprops": {
      "widgettype": "ListBox",
      "field": "",
      "picklistInfo": {
        "entity": "UserAccountAlerts",
        "key": "alertId",
        "value": "accountName"
      }
    }
  },
  "lbxBalanceUpdateKA": {
    "fieldprops": {
      "widgettype": "ListBox",
      "field": "",
      "picklistInfo": {
        "entity": "TimePeriod",
        "key": "timePeriodId",
        "value": "description"
      }
    },
  },
  "lbxPaymentDueKA": {
    "fieldprops": {
      "widgettype": "ListBox",
      "field": "",
      "picklistInfo": {
        "entity": "TimePeriod",
        "key": "timePeriodId",
        "value": "description"
      }
    },
  },
  "lbxDepositMaturityRemainderKA": {
    "fieldprops": {
      "widgettype": "ListBox",
      "field": "",
      "picklistInfo": {
        "entity": "TimePeriod",
        "key": "timePeriodId",
        "value": "description"
      }
    },
  },
  "tbxAmountInputKA" : {
    "fieldprops": {
      "entity": "UserAccountAlerts",
      "widgettype": "TextBox",		
      "field": "minimumBalance"
    }
  },
  "tbxDebitlimitKA": {
    "fieldprops": {
      "widgettype": "TextBox",
      "entity": "UserAccountAlerts",
      "field": "debitLimit"
    }
  },
  "tbxCreditLimitKA": {
    "fieldprops": {
      "widgettype": "Label",
      "entity": "UserAccountAlerts",
      "field": "creditLimit"
    }
  },"HiddenAlertsReq": {
    "fieldprops": {
      "widgettype": "Label",
      "entity": "UserAccountAlerts",
      "field": "isEnabled"
    }
  },
  "HiddenSuccessTransfer": {
    "fieldprops": {
      "widgettype": "Label",
      "entity": "UserAccountAlerts",
      "field": "successfulTransfer"
    }
  },
  "HiddenCheckClear": {
    "fieldprops": {
      "widgettype": "Label",
      "entity": "UserAccountAlerts",
      "field": "checkClearance"
    }
  },
  "HiddenName": {
    "fieldprops": {
      "widgettype": "Label",
      "entity": "UserAccountAlerts",
      "field": "accountType"
    }
  },

  "HiddenAccNum": {
    "fieldprops": {
      "widgettype": "Label",
      "entity": "UserAccountAlerts",
      "field": "accountNumber"
    }
  },
  "HiddenAlertId": {
    "fieldprops": {
      "widgettype": "Label",
      "entity": "UserAccountAlerts",
      "field": "alertId"
    }
  },
  "HiddenPaymentDueReminderTypeId": {
    "fieldprops": {
      "widgettype": "Label",
      "entity": "UserAccountAlerts",
      "field": "paymentDueReminderTypeId"
    }
  },
  "HiddenBalanceUpdateTypeId": {
    "fieldprops": {
      "widgettype": "Label",
      "entity": "UserAccountAlerts",
      "field": "balanceUpdateTypeId"
    }
  },
  "HiddenDepositDueReminderTypeId": {
    "fieldprops": {
      "widgettype": "Label",
      "entity": "UserAccountAlerts",
      "field": "depositDueReminderTypeId"
    }
  },
};