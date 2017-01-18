var frmForeignExchangeKAConfig = {
    "formid": "frmForeignExchangeKA",
    "frmForeignExchangeKA": {
        "entity": "ExchangeRates",
        "objectServiceName": "RBObjects",
        "objectServiceOptions" : {"access":"online"}
    },
   "segInterestRateKA": {
        "fieldprops": {
            "widgettype": "Segment",
            "entity": "ExchangeRates",
            "field": {
                "lblTmpCurrencyKA": {
                    "widgettype": "Label",
                    "field": "currency"
                },
              "lblTmpExchangeKA":{
                 "widgettype": "Label",
                    "field": "exchangeRate"
              }             
            }
        }
    }
};