var frmMoreInterestRatesKAConfig= {
  "formid": "frmMoreInterestRatesKA",
  "frmMoreInterestRatesKA": {
    "entity": "InterestRates",
    "objectServiceName": "RBObjects",
    "objectServiceOptions" : {"access":"online"},
  },
   "segInterestRatesKA": {
        "fieldprops": {
            "widgettype": "Segment",
            "entity": "InterestRates",
          "additionalFields": [],
            "field": {
                "lblCDTermValKA": {
                    "widgettype": "Label",
                    "field" : "CDTerm"
                },
              "lblAPYValKA": {
                "widgettype": "Label",
                "field" : "APY"
              },
              "lblMinDepositValKA": {
                "widgettype": "Label",
                "field" : "minimumDeposit"
              }
            }
        }
     }
}

