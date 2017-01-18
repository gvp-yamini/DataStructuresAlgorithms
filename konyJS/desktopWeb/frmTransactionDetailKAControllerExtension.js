/*
 * Controller Extension class for frmTransactionDetailKA
 * Developer can edit the existing methods or can add new methods if required
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.frmTransactionDetailKAControllerExtension = Class(kony.sdk.mvvm.BaseFormControllerExtension, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
    },
    fetchData: function() {
        try {
            var scopeObj = this;
            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Loading Form");
            settingUncategorisedTransactionsListInDetails();
            this.fetchDataMyMethod.call(this, success, error);
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

        function success(response) {
            kony.sdk.mvvm.log.info("success fetching data ", response);
            scopeObj.getController().processData(response);
        }

        function error(err) {
            //Error fetching data
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("In fetchData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    },
     fetchDataMyMethod: function(successCallback, errorCallback) {
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
                masterDataElement.push(kony.retailBanking.globalData.globals.UNCATEGORISED_CATEGORYID);
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
                            if(key !=kony.retailBanking.globalData.globals.UNCATEGORISED_CATEGORYID){                            
                            masterDataElement.push(key);
                            masterDataElement.push(value);
                            masterData.push(masterDataElement);
                            }
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
      
    },
    processData: function(data) {
        try {
            var scopeObj = this;
            var processedData = this.$class.$superp.processData.call(this, data);
            this.getController().bindData(processedData);
            return processedData;
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in processData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_PROCESSDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_PROCESSDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        };
    },
    bindData: function(data) {
        try {
            var formmodel = this.getController().getFormModel();
            formmodel.clear();
            this.$class.$superp.bindData.call(this, data);
            this.getController().getFormModel().formatUI();
            var amount = formmodel.getWidgetData("dummytransactionAmount").getData();
            var date = formmodel.getWidgetData("dummytransactionDate").getData();
            var formattedAmount = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(amount);
            var formattedDate = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(date);
            formmodel.setViewAttributeByProperty("transactionAmount","text",formattedAmount);
            formmodel.setViewAttributeByProperty("transactionDate","text",formattedDate);
            var isAnalyzed = data.form.hiddenIncludeInAnalysis.getData();
            var isMappedToMerchant = data.form.hiddenMaptoMerchant.getData();
            settingSwitchAndRadioButtons(isAnalyzed,isMappedToMerchant);
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            formmodel.showView();
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in bindData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

    },
    saveData: function() {
        try {
            var scopeObj = this;
            this.settingDataBasedonSwitchandRadioButtons();
            this.saveDataMyMethod.call(this, success, error);
        } catch (err) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

        function success(res) {
            //Successfully created record
            //scopeObj.goback(true);
            navigateToUncategoriseTransactionListKAfromMyMoney();
            kony.sdk.mvvm.log.info("success saving record ", res);
        }

        function error(err) {
            //Handle error case
            //scopeObj.goback(false);
            kony.sdk.mvvm.log.error("In saveData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

    },
      saveDataMyMethod: function(successCallback, errorCallback) {
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
			alert("error while saving data");
			errorCallback.call(scopeObj,err);
            kony.sdk.mvvm.log.error("In saveData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

    },
    deleteData: function() {
        try {
            var scopeObj = this;
            this.$class.$superp.deleteData.call(this, success, error);
        } catch (err) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

        function success(res) {
            //Successfully deleting record
            kony.sdk.mvvm.log.info("success deleting record " + JSON.stringify(res));
        }

        function error(err) {
            //Handle error case
            kony.sdk.mvvm.log.error("In deleteData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
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
  settingDataBasedonSwitchandRadioButtons: function(){
    var formmodel = this.getController().getFormModel();
  if (userAgent == "iPhone" || userAgent ==="iPad"){
    if(frmTransactionDetailKA.accountPreviewEnableSwitch.selectedIndex==1){
         formmodel.setWidgetData("hiddenIncludeInAnalysis","true");
    }else{
        formmodel.setWidgetData("hiddenIncludeInAnalysis","false");
    }
    if(frmTransactionDetailKA.CopyaccountPreviewEnableSwitch0b4fab801c08546.selectedIndex==1){
         formmodel.setWidgetData("hiddenMaptoMerchant","true");
    }else{
        formmodel.setWidgetData("hiddenMaptoMerchant","false");
    }
  }else{
     if(frmTransactionDetailKA.CheckBoxGroup0aebf676b3db246.selectedKeys && frmTransactionDetailKA.CheckBoxGroup0aebf676b3db246.selectedKeys[0]=="true"){
         formmodel.setWidgetData("hiddenIncludeInAnalysis","true");
    }else{
        formmodel.setWidgetData("hiddenIncludeInAnalysis","false");
    }
    if(frmTransactionDetailKA.CopyCheckBoxGroup0d9fa019582e647.selectedKeys && frmTransactionDetailKA.CopyCheckBoxGroup0d9fa019582e647.selectedKeys[0]=="true"){
         formmodel.setWidgetData("hiddenMaptoMerchant","true");
    }else{
        formmodel.setWidgetData("hiddenMaptoMerchant","false");
    }
  }
}
});