var moreForeignExchangeRatesConfig = {
    "formid": "moreForeignExchangeRates",
    "moreForeignExchangeRates": {
        "entity": "ExchangeRates",
        "objectServiceName": "RBObjects",
        "objectServiceOptions" : {"access":"online"}
    },
   "segForeignExchange": {
        "fieldprops": {
            "widgettype": "Segment",
            "entity": "ExchangeRates",
            "field": {
                "lblcurrency": {
                    "widgettype": "Label",
                    "field": "currency"
                },
              "lblExchangeRate":{
                 "widgettype": "Label",
                    "field": "exchangeRate"
              }             
            }
        }
    }
};