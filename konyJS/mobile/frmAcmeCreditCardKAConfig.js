var frmAcmeCreditCardKAConfig = {
  "formid": "frmAcmeCreditCardKA",
  "frmAcmeCreditCardKA": {
    "entity": "AccountFeatures",
    "objectServiceName": "RBObjects",
    "objectServiceOptions" : {"access":"online"},
  },
   "TextAreaFeatures": {
        "fieldprops": {
            "widgettype": "TextArea",
            "entity": "AccountFeatures",
            "field": "features"
        }
    },
	"TextAreaCharges": {
        "fieldprops": {
            "widgettype": "TextArea",
            "entity": "AccountFeatures",
            "field": "rates"
        }
    },
	"TextAreaInfo": {
        "fieldprops": {
            "widgettype": "TextArea",
            "entity": "AccountFeatures",
            "field": "info"
        }
    }
	
};