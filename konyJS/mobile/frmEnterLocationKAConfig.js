var frmEnterLocationKAConfig = {
  "formid": "frmEnterLocationKA",
  "frmEnterLocationKA": {
    "entity": "States",
    "objectServiceName": "RBObjects",
    "objectServiceOptions" : {"access":"online"}
  },
  "ListState":{
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
  
};