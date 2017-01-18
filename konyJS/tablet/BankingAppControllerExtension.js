kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};

kony.sdk.mvvm.BankingAppControllerExtension = Class(kony.sdk.mvvm.BaseFormControllerExtension, {
    constructor: function(controllerObj) {
       kony.sdk.mvvm.BankingAppControllerExtension.$super.call(this, controllerObj);
    },
   fetchData: function(successCallback, errorCallback) {
         var scopeObj = this;
         var configObj = this.getController().getConfig();
         var serviceName = configObj.getObjectServiceName();
         var options = configObj.getObjectServiceOptions();
         var formmodel = this.getController().getFormModel();
         var appContext = this.getController().getApplicationContext();
         if (this.fetchMasterData && (typeof this.fetchMasterData === "function")) {
                this.fetchMasterData(serviceName, options, onSuccess, onError);
         }else{
	       		onSuccess(null);
	     }
	      function onSuccess(response) {	        
	      	kony.sdk.mvvm.BankingAppControllerExtension.$superp.fetchData.call(scopeObj,successCallback, errorCallback);
	      }
	      function onError(error) {
	            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
	        	kony.sdk.mvvm.log.error("Error in Blogic master data fetch : " + error);
	        	return;
	     }
        //Generic fetch data for single entity
       
    },
    
    bindData: function(dataMap) {
        //Generic bind data for single entity
        kony.sdk.mvvm.BankingAppControllerExtension.$superp.bindData.call(this,dataMap);
    },
    
    /**
     * This method would act as an entry point for all save related flows.
     */
     processData : function(data){
       return kony.sdk.mvvm.BankingAppControllerExtension.$superp.processData.call(this,data);
     },
    saveData: function(successCallback, errorCallback) {
	   //kony.sdk.mvvm.BankingAppControllerExtension.$superp.saveData.call(this,successCallback, errorCallback);
	   		try {
            var scopeObj = this;
            var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
            var options ={
                    "access": "online",
                    "objectName": "RBObjects"
                 };
			var contexData = this.getController() && this.getController().getContextData();
             if(!contexData){
                  contexData = new kony.sdk.mvvm.NavigationObject();
             }
            var serviceName = "RBObjects";
            var formConfig = this.getController() && this.getController().getConfig();
            var formEntity = formConfig && formConfig.getEntity();
            var modelObj = INSTANCE.getModel(formEntity,serviceName,options);
			var dataMap = this.$class.$superp.generateRecords.call(this);
			var dataObject = new kony.sdk.dto.DataObject(formEntity,dataMap[0]);
																															
			var primaryKeyArr = modelObj.getValueForProperty("primaryKey");
			var recordsDataMap = scopeObj.getRecordsDataMap();
            var operation = contexData.getOperationType();
            var requestOptions = contexData.getRequestOptions();
            if (!requestOptions) {
                requestOptions = {}
            }
            requestOptions["dataObject"] = dataObject;
                                                
            function primaryValuesExist(record, primaryKeyArr) {
               var result = false;
                for (var index in primaryKeyArr) {
                    if (record.hasOwnProperty(primaryKeyArr[index])) {
                        result = true
                    }
                }
                return result
            }                                     
            if (operation && operation === kony.sdk.mvvm.OperationType.ADD) {
                modelObj.create(requestOptions, success, error);
            } else if(primaryValuesExist(recordsDataMap, primaryKeyArr)){
                modelObj.update(requestOptions, success, error);
            }
                else{
               modelObj.update(requestOptions, success, error);
            }
        } catch (err) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

        function success(response) {
            kony.print("Successfully created record");
            kony.sdk.mvvm.log.info("success saving record ", response);
            successCallback.call(scopeObj, response);
        }

        function error(err) {
            //Handle error case
			//alert("error while saving data");
			errorCallback.call(scopeObj,err);
            kony.sdk.mvvm.log.error("In saveData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
          //customErrorCallback(err);
        }

    },
    saveRecords: function(recordsArray,successcallback, errorcallback) {
       kony.sdk.mvvm.BankingAppControllerExtension.$superp.saveRecords.call(this,recordsArray,successcallback, errorcallback);
    },
    saveRecord: function(record,successcallback, errorcallback) {
       kony.sdk.mvvm.BankingAppControllerExtension.$superp.saveRecord.call(this,record,successcallback, errorcallback);
    },
    deleteData: function(success, error) {
       kony.sdk.mvvm.BankingAppControllerExtension.$superp.deleteData.call(this,success, error);
    },
    
	showPreviousForm: function(doReload,formName){
    	var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    	var navigateToForm = formName ? formName : kony.application.getPreviousForm().id; // to show particular form
		var prevController = INSTANCE.getFormController(navigateToForm);
		if(doReload){
			kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(kony.retailBanking.globalData.globals.LOADING_SCREEN_MESSAGE);
			prevController.loadDataAndShowForm(prevController.getContextData());
			kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
		}else{
		    kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(kony.retailBanking.globalData.globals.LOADING_SCREEN_MESSAGE);
			prevController.getFormModel().showView();
			kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
		}
    },
    navigateTo: function(formId, navObject){
    	var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
		var formController = INSTANCE.getFormController(formId);
		if(!navObject || !(navObject instanceof kony.sdk.mvvm.NavigationObject)) {
        	navObject = new kony.sdk.mvvm.NavigationObject();
        }
        kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(kony.retailBanking.globalData.globals.LOADING_SCREEN_MESSAGE);
        kony.retailBanking.globalData.globals.formStack.push(formId);
		formController.loadDataAndShowForm(navObject);
    },
    goback: function(doreload)
        {
			var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
			var stackLength= kony.retailBanking.globalData.globals.formStack.length;
			var currentform = kony.retailBanking.globalData.globals.formStack[stackLength-1];
			var controller = INSTANCE.getFormController(currentform);
			kony.retailBanking.globalData.globals.formStack.pop();
			stackLength= kony.retailBanking.globalData.globals.formStack.length;
			if(stackLength!==0)
				{
					var form = kony.retailBanking.globalData.globals.formStack[stackLength-1];
					this.showPreviousForm(doreload,form);
				}
		},
  fetchMasterData: function(serviceName, options, successcallback, errorcallback) {
    	var mDataEnabledWidgetsArray = this.getController().getConfig().getMasterDataEnabledWidgets();
    	var indx = 0;
    	var scopeObj = this;
    	loadMasterData();
    	function loadMasterData() {
    		if(indx >= mDataEnabledWidgetsArray.length) {
            	successcallback.call(scopeObj);
            	return;
            }
            var widgetConfig = scopeObj.getController().getConfig().getWidget(mDataEnabledWidgetsArray[indx]);
    	    scopeObj.fetchMasterDataForWidget(mDataEnabledWidgetsArray[indx],serviceName, options, sucCallback, errCallback);
       }
       function sucCallback(response) {
            	indx++;
            	loadMasterData();
       }
	   function errCallback(err) {
				indx++;
            	loadMasterData();
	  }
    	
    },
    fetchMasterDataForWidget: function(widgetId, serviceName, options, successcallback, errorcallback) {
        try {
            var scopeObj = this;
            var frmName = this.getController().getConfig().getFormId();
			eval(" var frmConfigClassObj = " +frmName+"Config");
            var masterDataInfo = frmConfigClassObj[widgetId].fieldprops.picklistInfo;
            if(masterDataInfo ){
                 this.getPickListValues(masterDataInfo,widgetId,successcallback, errorcallback);
             }else{
               
                    successcallback.call(scopeObj);
             }  
          
        } catch (error) {
           kony.sdk.mvvm.log.error("Error in Blogic fetch metadata : ", error);
        }
        
    },
    getPickListValues : function(pickListInfo,widgetId,successcallback, errorcallback){
        var scopeObj = this;
        var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var config = this.getController().getConfig();
        var frmName = this.getController().getConfig().getFormId();
		eval(" var frmConfigClassObj = " +frmName+"Config");
        var serviceName = config.getObjectServiceName();
        objectService = kony.sdk.getCurrentInstance().getObjectService(serviceName,options);
        var headers = {"session_token":kony.retailBanking.globalData.session_token};
        var dataObject = new kony.sdk.dto.DataObject(pickListInfo.entity);
        var options = {"dataObject":dataObject, "headers":headers};
 	    objectService.fetch(options, success,error);
 
        function success(response){
			if(response){
			    kony.sdk.mvvm.log.info("meta data fetch response : " + JSON.stringify(response));
                var masterData = [];
                var masterDataElement = [];
                masterDataElement.push("-1");
                var toAppend = "Select"+ " " +frmConfigClassObj[widgetId].fieldprops.selector ;
                masterDataElement.push(toAppend);//TODO: i18n
	            masterData.push(masterDataElement);
                for (var i = 0; i < response.records.length; i++) 
                {
                            var pickListItem;
                            masterDataElement = [];
                            pickListItem = response.records[i];
                            var key = response.records[i][pickListInfo.key];
                            var value = response.records[i][pickListInfo.value];                            
                            masterDataElement.push(key);
                            masterDataElement.push(value);
                            masterData.push(masterDataElement);
                }
                    
               
               var formmodel = scopeObj.getController().getFormModel();
               formmodel.setMasterDataByProperty(masterData, widgetId);
               formmodel.setViewAttributeByProperty(widgetId,"selectedKey","-1");
               if (successcallback && (typeof successcallback === "function")) {
                    successcallback.call(scopeObj);
               }
            }
		}
		function error(err){
		kony.sdk.mvvm.log.error("Error occured while fetching the data for the entity");
			errorCallback(err);
		}
      
    }
});




function customErrorCallback(err){
  var msg;
  kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
  if(err.hasOwnProperty("errmsg"))
    msg = err.errmsg;
  else 
    msg = err.getRootErrorObj().errmsg;
  kony.ui.Alert({
        "alertType": constants.ALERT_TYPE_INFO,
        "alertTitle": "Error",
        "yesLabel": "OK",
        "noLabel": "",
        "message": msg,
        "alertHandler": null
     },{});
}

