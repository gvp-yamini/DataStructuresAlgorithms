/*
 * Controller Extension class for frmMakeTransferKA
 * Developer can edit the existing methods or can add new methods if required
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};

/**
 * Creates a new Form Controller Extension.
 * @class frmMakeTransferKAControllerExtension
 * @param {Object} controllerObj - Form Controller.
 */
kony.sdk.mvvm.frmMakeTransferKAControllerExtension = Class(kony.sdk.mvvm.BankingAppControllerExtension, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
    },
    /** 
     * This method is an entry point for all fetch related flows. Developer can edit.
     * Default implementation fetches data for the form based on form config 
     * @memberof frmMakeTransferKAControllerExtension#
     */
    fetchData: function() {
        try {
            var scopeObj = this;
            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Loading Form");
            //manually fetch ExternalAcc
          	fetchExternalAccountDataAndStoreInGlobal();
            this.$class.$superp.fetchData.call(this, success, error);
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
    /** 
     * This method processes fetched data. Developer can edit.
     * Default implementation processes the provided data to required format for bind.
     * @param {Object} data - fetched data. (Default : data map, group id as key and records array as value)
     * @memberof frmMakeTransferKAControllerExtension#
     * @returns {Object} - processed data
     */
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
    /** 
     * This method binds the processed data to the form. Developer can edit.
     * Default implementation binds the data to widgets in the form.
     * @param {Object} data - processed data.(Default : data map for each group, widget id as key and widget data as value)
     * @memberof frmMakeTransferKAControllerExtension#
     */
    bindData: function(data) {
        try {
            var formmodel = this.getController().getFormModel();
            formmodel.clear();
          
          var masterData=formmodel.getMasterDataByProperty("lbxToAccountKA");
          for(var k = 0; k < kony.retailBanking.globalData.ExternalAccounts.length; k++){
            var pickListItem;
              		var masterDataElement = [];
              		pickListItem = kony.retailBanking.globalData.ExternalAccounts[k];
              		var key = pickListItem.accountNumber;
              		var value = pickListItem.nickName;
              		masterDataElement.push(key);
                	masterDataElement.push(value);
                  	masterData.push(masterDataElement);
            		
            		
          }
          formmodel.setMasterDataByProperty(masterData,"lbxToAccountKA");
			//This is a work around case to prepopulate External Account into Make Transfer Page
          	if(!isEmpty(values) && (values.fromAccount===undefined)){
              formmodel.setViewAttributeByProperty("lbxToAccountKA", "selectedKey", values.toAccount[0]);
              formmodel.setViewAttributeByProperty("lbxFromAccountKA", "selectedKey", "-1");
              //formmodel.setViewAttributeByProperty("lbxToAccountKA", "selectedKey", "-1");
              formmodel.setViewAttributeByProperty("tbxAmountInputKA", "text", "");
              formmodel.setViewAttributeByProperty("lblTransactionIdKA", "text", "");
              formmodel.setViewAttributeByProperty("tbxNotesInputKA", "text", "");
              formmodel.setViewAttributeByProperty("lbxFrequencyKA", "selectedKey", "Once");
 			  formmodel.setViewAttributeByProperty("rbgRecurrenceType", "selectedKey", "nor");
              setDateFormatForNewTransfer();
              formmodel.performActionOnView("flxRecurrence","setVisibility",[false]);
              formmodel.setViewAttributeByProperty("tbxRecurrenceTimesInputKA", "text", "");
              var recType = formmodel.getViewAttributeByProperty("rbgRecurrenceType", "selectedKey");
              if(recType === "nor"){
                  formmodel.performActionOnView("flxRecurrenceDateRange","setVisibility",[false]);
                  formmodel.performActionOnView("flxRecurrenceTimes","setVisibility",[true]);
                }
                else if(recType === "daterange"){
                  formmodel.performActionOnView("flxRecurrenceDateRange","setVisibility",[true]);
                  formmodel.performActionOnView("flxRecurrenceTimes","setVisibility",[false]);
                }
              
            }
          	else if(!isEmpty(values)){
              formmodel.setViewAttributeByProperty("lbxFromAccountKA", "selectedKey", values.fromAccount[0]);
              formmodel.setViewAttributeByProperty("lbxToAccountKA", "selectedKey", values.toAccount[0]);
              formmodel.setViewAttributeByProperty("tbxAmountInputKA", "text", values.amount);
              formmodel.setViewAttributeByProperty("tbxNotesInputKA", "text", values.notes);
              if(!values.notes){
                formmodel.setViewAttributeByProperty("tbxNotesInputKA", "text", "");
              }
              formmodel.setViewAttributeByProperty("lbxFrequencyKA", "selectedKey", values.frequency);
              formmodel.setViewAttributeByProperty("calDateKA", "dateComponents", values.date);
              formmodel.setViewAttributeByProperty("rbgRecurrenceType", "selectedKey", values.recurrenceType);
              formmodel.setViewAttributeByProperty("calFromDateKA", "dateComponents", values.fromDate);
              formmodel.setViewAttributeByProperty("calToDateKA", "dateComponents", values.toDate);
              formmodel.setViewAttributeByProperty("tbxRecurrenceTimesInputKA", "text", values.nor);
              if(values.frequency === "Once"){
                formmodel.setViewAttributeByProperty("lbxFrequencyKA", "selectedKey", "Once");
             	formmodel.setViewAttributeByProperty("rbgRecurrenceType", "selectedKey", "daterange");
                formmodel.setViewAttributeByProperty("tbxRecurrenceTimesInputKA", "text", "");
                formmodel.performActionOnView("flxRecurrenceDateRange", "setVisibility", [true]);
                formmodel.performActionOnView("flxRecurrenceTimes", "setVisibility", [false]);
                formmodel.performActionOnView("flxRecurrence","setVisibility",[false]);
              }
              else{
                formmodel.performActionOnView("flxRecurrence","setVisibility",[true]);
                if(values.recurrenceType === "nor"){
                  formmodel.performActionOnView("flxRecurrenceDateRange","setVisibility",[false]);
                  formmodel.performActionOnView("flxRecurrenceTimes","setVisibility",[true]);
                }
                else if(values.recurrenceType === "daterange"){
                  formmodel.performActionOnView("flxRecurrenceDateRange","setVisibility",[true]);
                  formmodel.performActionOnView("flxRecurrenceTimes","setVisibility",[false]);
                }
              }
              if(values.transactionID===undefined){
                formmodel.setViewAttributeByProperty("lblTransactionIdKA", "text", "");               
              }
              else{
                formmodel.setViewAttributeByProperty("lblTransactionIdKA", "text", values.transactionID);
              }
            }
          else{
            formmodel.setViewAttributeByProperty("lbxFromAccountKA", "selectedKey", "-1");
              formmodel.setViewAttributeByProperty("lbxToAccountKA", "selectedKey", "-1");
              formmodel.setViewAttributeByProperty("tbxAmountInputKA", "text", "");
              formmodel.setViewAttributeByProperty("lblTransactionIdKA", "text", "");
              formmodel.setViewAttributeByProperty("tbxNotesInputKA", "text", "");
              formmodel.setViewAttributeByProperty("lbxFrequencyKA", "selectedKey", "Once");
 			  formmodel.setViewAttributeByProperty("rbgRecurrenceType", "selectedKey", "nor");
              setDateFormatForNewTransfer();
              formmodel.performActionOnView("flxRecurrence","setVisibility",[false]);
              formmodel.setViewAttributeByProperty("tbxRecurrenceTimesInputKA", "text", "");
              var recType = formmodel.getViewAttributeByProperty("rbgRecurrenceType", "selectedKey");
              if(recType === "nor"){
                  formmodel.performActionOnView("flxRecurrenceDateRange","setVisibility",[false]);
                  formmodel.performActionOnView("flxRecurrenceTimes","setVisibility",[true]);
                }
                else if(recType === "daterange"){
                  formmodel.performActionOnView("flxRecurrenceDateRange","setVisibility",[true]);
                  formmodel.performActionOnView("flxRecurrenceTimes","setVisibility",[false]);
                }
              
          }
            this.$class.$superp.bindData.call(this, data);
            this.getController().getFormModel().formatUI();
          	formmodel.performActionOnView("flxValidationBox", "setVisibility",[false]);
            formmodel.setViewAttributeByProperty("lbxToAccountKA", "skin", "CopysknInputsKA0dc9a8f25976646");
            formmodel.setViewAttributeByProperty("lbxFromAccountKA", "skin", "CopysknInputsKA0dc9a8f25976646");
            formmodel.setViewAttributeByProperty("tbxAmountInputKA", "skin", "CopyslTextBox082d070bc5b4f4d");
          	kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            this.getController().showForm();
            values = {};
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in bindData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

    },
    /** 
     * This method is entry point for save flow. Developer can edit.
     * Default implementation saves the entity record from the data of widgets defined in form config 
     * @memberof frmMakeTransferKAControllerExtension#
     */
    saveData: function() {
        try {
            var scopeObj = this;
            this.$class.$superp.saveData.call(this, success, error);
        } catch (err) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

        function success(res) {
            //Successfully created record
            kony.sdk.mvvm.log.info("success saving record ", res);
        }

        function error(err) {
            //Handle error case
            kony.sdk.mvvm.log.error("In saveData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

    },
    /** 
     * This method is entry point for delete/remove flow. Developer can edit.
     * Default implementation deletes the entity record displayed in form (primary keys are needed)
     * @memberof frmMakeTransferKAControllerExtension#
     */
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
    /** 
     * This method shows form.
     * @memberof frmMakeTransferKAControllerExtension#
     */
    showForm: function() {
        try {
            var formmodel = this.getController().getFormModel();
            formmodel.showView();
        } catch (e) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SHOWFORM_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SHOWFORM_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    }
});