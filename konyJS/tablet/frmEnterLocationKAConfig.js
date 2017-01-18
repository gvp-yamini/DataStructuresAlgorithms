var frmEnterLocationKAConfig = {
  "formid": "frmEnterLocationKA",
  "frmEnterLocationKA": {
    "entity": "NewAccount",
    "objectServiceName": "RBObjects",
    "objectServiceOptions" : {"access":"online"}
  },
  "lstLocation":{
    "fieldprops": {
      "widgettype": "ListBox",
      "field":"States",
      "selector": "State Name",
      "picklistInfo": {
        "entity":"States",
        "key": "stateId",
        "value": "stateName"
      } 
    }
  },
  "lblAcntType": {
    "fieldprops": {
      "entity": "NewAccount",
      "widgettype": "Label",
      "constrained": true,
      "field": "accountType"
    }
  },
  "lblAddress": {
    "fieldprops": {
      "entity": "NewAccount",
      "widgettype": "Label",
      "constrained": true,
      "field": "address"
    }
  },
  "lblDob": {
    "fieldprops": {
      "entity": "NewAccount",
      "widgettype": "Label",
      "constrained": true,
      "field": "dateOfBirth"
    }
  },
  "lblUserFirstName": {
    "fieldprops": {
      "entity": "NewAccount",
      "widgettype": "Label",
      "constrained": true,
      "field": "firstName"
    }
  },
  "lblUserLastName": {
    "fieldprops": {
      "entity": "NewAccount",
      "widgettype": "Label",
      "constrained": true,
      "field": "lastName"
    }
  },
  "lblProductId": {
    "fieldprops": {
      "entity": "NewAccount",
      "widgettype": "Label",
      "constrained": true,
      "field": "productId"
    }
  },
  "lblssn": {
    "fieldprops": {
      "entity": "NewAccount",
      "widgettype": "Label",
      "constrained": true,
      "field": "ssn"
    }
  },
  "lblStateId": {
    "fieldprops": {
      "entity": "NewAccount",
      "widgettype": "Label",
      "constrained": true,
      "field": "stateId"
    }
  }
  
};