var frmMoreForeignExchangeRatesKAConfig = {
  "formid": "frmMoreForeignExchangeRatesKA",
  "frmMoreForeignExchangeRatesKA": {
    "entity": "ExchangeRates",
    "objectServiceName": "RBObjects",
    "objectServiceOptions" : {"access":"online"},
  },
   "segForeignExRatesKA": {
        "fieldprops": {
            "widgettype": "Segment",
            "entity": "ExchangeRates",
          "additionalFields": [],
            "field": {
                "lblCurrencyValKA": {
                    "widgettype": "Label",
                    "field" : "currency"
                },
              "lblUSDExRateKA": {
                "widgettype": "Label",
                "field" : "exchangeRate"
              }
            }
        }
     }
}



 