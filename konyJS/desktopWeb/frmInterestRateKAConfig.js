var frmInterestRateKAConfig = {
    "formid": "frmInterestRateKA",
    "frmInterestRateKA": {
        "entity": "InterestRates",
        "objectServiceName": "RBObjects",
        "objectServiceOptions" : {"access":"online"}
    },
   "segInterestRateKA": {
        "fieldprops": {
            "widgettype": "Segment",
            "entity": "InterestRates",
            "field": {
                "lblTmpCDTermKA": {
                    "widgettype": "Label",
                    "field": "CDTerm"
                },
              "lblTmpAPYKA":{
                 "widgettype": "Label",
                    "field": "APY"
              },
              "lblTmpMinDepositKA":{
                 "widgettype": "Label",
                    "field": "minimumDeposit"
              },              
            }
        }
    }
};