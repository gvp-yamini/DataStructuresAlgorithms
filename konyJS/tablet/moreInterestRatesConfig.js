var moreInterestRatesConfig = {
    "formid": "moreInterestRates",
    "moreInterestRates": {
        "entity": "InterestRates",
        "objectServiceName": "RBObjects",
        "objectServiceOptions" : {"access":"online"}
    },
   "segInterestRates": {
        "fieldprops": {
            "widgettype": "Segment",
            "entity": "InterestRates",
            "field": {
                "lblCDTerm": {
                    "widgettype": "Label",
                    "field": "CDTerm"
                },
              "lblAPY":{
                 "widgettype": "Label",
                    "field": "APY"
              },
              "lblMinimumDeposit":{
                 "widgettype": "Label",
                    "field": "minimumDeposit"
              },              
            }
        }
    }
};