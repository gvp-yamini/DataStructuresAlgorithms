/*
 * Controller Extension class for frmConfirmTransferKA
 * Developer can edit the existing methods or can add new methods if required
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};


/**
 * Creates a new Form Controller Extension.
 * @class frmConfirmTransferKAControllerExtension
 * @param {Object} controllerObj - Form Controller.
 */
kony.sdk.mvvm.frmConfirmTransferKAControllerExtension = Class(kony.sdk.mvvm.BankingAppControllerExtension, {
  constructor: function(controllerObj) {
    this.$class.$super.call(this, controllerObj);
  },
  /** 
     * This method is an entry point for all fetch related flows. Developer can edit.
     * Default implementation fetches data for the form based on form config 
     * @memberof frmConfirmTransferKAControllerExtension#
     */
  fetchData: function() {

    try {
      var scopeObj = this;
      kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Loading Form");
      //Issue in Fetching Data And Fetch Also Not required for this page
      //  this.$class.$superp.fetchData.call(this, success, error); 
      scopeObj.getController().processData([]);
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
     * @memberof frmConfirmTransferKAControllerExtension#
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
    }
  },
  /** 
     * This method binds the processed data to the form. Developer can edit.
     * Default implementation binds the data to widgets in the form.
     * @param {Object} data - processed data.(Default : data map for each group, widget id as key and widget data as value)
     * @memberof frmConfirmTransferKAControllerExtension#
     */
  bindData: function(data) {

    try {
      var scopeObj = this;
      kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Loading Form");
      kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
      var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
      
      // Get newTransfer transaction object from navigation data and perform the bind
      bindNewTransferTransactionObjectToConfirmTransferForm(); 
      this.getController().showForm();
    } catch (err) {
      kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
      kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension");
      var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
      kony.sdk.mvvm.log.error(exception.toString());
    }
  },
  /** 
     * This method is entry point for save flow. Developer can edit.
     * Default implementation saves the entity record from the data of widgets defined in form config 
     * @memberof frmConfirmTransferKAControllerExtension#
     */
  saveData: function() {
	kony.print("Perf Log: Saving of transaction service call - Start");
    frmSuccessFormKA.successIcon.isVisible = false;
    frmSuccessFormKA.show();
    successFormPreShow();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    //var listController = INSTANCE.getFormController("frmNewTransferKA");
    //var transferformModel = listController.getFormModel();
    try {
      var serviceName = "RBObjects";
      var options ={
        "access": "online",
        "objectName": "RBObjects"
      };
      var scopeObj = this;
      var formmodel = this.getController().getFormModel();
      var dataMap = this.getRecordsDataMap.call(this);
      var amount = formmodel.getViewAttributeByProperty("transactionAmount","text"); 
      var parsedAmount = parseFloat(amount.replace(/[^0-9-.]/g, ''));

      var receivedNavObject = getCustomInfoObject("frmConfirmTransferKA", "newTransferTransactionData")
      var frequencyType = getFrequencyType(receivedNavObject.transferFrequency);
     
      dataMap[0].amount = parsedAmount;
      dataMap[0].scheduledDate = kony.retailBanking.util.formatingDate.getDBDateTimeFormat(receivedNavObject.transferDate,"00:00");
      if(receivedNavObject.recurrenceNumberSelectedFlag !==0){
         dataMap[0].numberOfRecurrences = receivedNavObject.recurrenceNumberOfTimes;
      }
      if(receivedNavObject.recurrenceDateRangeSelectedFlag !==0){
        dataMap[0].frequencyStartDate = kony.retailBanking.util.formatingDate.getDBDateTimeFormat(receivedNavObject.fromRecurrenceCalDate,"00:00");
        dataMap[0].frequencyEndDate = kony.retailBanking.util.formatingDate.getDBDateTimeFormat(receivedNavObject.toRecurrenceCalDate,"00:00");
      }
      
      dataMap[0].frequencyType = frequencyType;
      dataMap[0].transactionType = receivedNavObject.transferTransactionType;
      dataMap[0].transactionId = receivedNavObject.transferTransactionID;
      
      var contexData = this.getController() && this.getController().getContextData();
      var formConfig = this.getController() && this.getController().getConfig();
      var formEntity = formConfig && formConfig.getEntity();
      var dataObject = new kony.sdk.dto.DataObject(formEntity,dataMap[0]);
      var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
      var modelObj = INSTANCE.getModel(formEntity,serviceName,options); 
      var requestOptions = contexData.getRequestOptions();
      var primaryKeyArr = modelObj.getValueForProperty("primaryKey");
      var recordsDataMap = scopeObj.getRecordsDataMap();
      var operation = contexData.getOperationType();
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
      // this.$class.$superp.saveRecords.call(this,dataMap, success, error);

    } catch (err) {
      var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
      kony.sdk.mvvm.log.error(exception.toString());
    }

    function success(res) {
      //Successfully created record
      // alert(res);
	  kony.print("Perf Log: Saving of transaction service call - End");
      kony.sdk.mvvm.log.info("success saving record ", res);
      var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
      var listController = INSTANCE.getFormController("frmSuccessFormKA");
      var navObject = new kony.sdk.mvvm.NavigationObject();
      if(res.referenceId !==undefined)
        navObject.setCustomInfo("TransactionID","Reference ID:"+res.referenceId);
      else
        navObject.setCustomInfo("TransactionID","Reference ID:"+res.transactionId);

      // kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
      listController.loadDataAndShowForm(navObject);
	   kony.print("Perf Log: Confirm form -- End");
    }

    function error(err) {
      //Handle error case
     frmSuccessFormKA.successText.text = "Transaction Failed";
     frmSuccessFormKA.successTitle.text = "Sorry for the inconvenience.Please try again after some time.";
     frmSuccessFormKA.processing.text = "Transaction Processing...";
     errorFormPostShow();
      kony.sdk.mvvm.log.error("In saveData errorcallback in controller extension ", err);
      var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
      kony.sdk.mvvm.log.error(exception.toString());
    }

  },
  /** 
     * This method is entry point for delete/remove flow. Developer can edit.
     * Default implementation deletes the entity record displayed in form (primary keys are needed)
     * @memberof frmConfirmTransferKAControllerExtension#
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
     * @memberof frmConfirmTransferKAControllerExtension#
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