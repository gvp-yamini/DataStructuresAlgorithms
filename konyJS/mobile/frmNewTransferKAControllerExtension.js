/*
 * Controller Extension class for frmNewTransferKA
 * Developer can edit the existing methods or can add new methods if required
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};

/**
 * Creates a new Form Controller Extension.
 * @class frmNewTransferKAControllerExtension
 * @param {Object} controllerObj - Form Controller.
 */
kony.sdk.mvvm.frmNewTransferKAControllerExtension = Class(kony.sdk.mvvm.BankingAppControllerExtension, {
  constructor: function(controllerObj) {
    this.$class.$super.call(this, controllerObj);
  },
  /** 
     * This method is an entry point for all fetch related flows. Developer can edit.
     * Default implementation fetches data for the form based on form config 
     * @memberof frmNewTransferKAControllerExtension#
     */
  fetchData: function() {
	kony.print("Perf Log: fetch accounts service call - Start");
    try {
      ShowLoadingScreen();
      var scopeObj = this;
      this.$class.$superp.fetchData.call(this, success, error);
    } catch (err) {
      kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
      kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension");
      var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
      kony.sdk.mvvm.log.error(exception.toString());
    }

    function success(response) {
	  kony.print("Perf Log: fetch accounts service call - End");
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
     * @memberof frmNewTransferKAControllerExtension#
     * @returns {Object} - processed data
     */
  processData: function(data) {
    try {
      ShowLoadingScreen();
      var scopeObj = this;
      var accountData = data["segInternalFromAccountsKA"];
      kony.retailBanking.datastore.setAccountListObject(data["segInternalFromAccountsKA"]);
      kony.retailBanking.globalData.accounts.setAccountsData(data["segInternalFromAccountsKA"]);
      var processedData = this.$class.$superp.processData.call(this, data);
      var tempdata =  getFilteredFromAndToAccountsBySkin(accountData,processedData);
      data.segInternalFromAccountsKA =  tempdata[0];
      data.segInternalTOAccountsKA = tempdata[1];
      processedData.segInternalFromAccountsKA.segInternalFromAccountsKA= tempdata[0];
      processedData.segInternalTOAccountsKA.segInternalTOAccountsKA = tempdata[1];
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
     * @memberof frmNewTransferKAControllerExtension#
     */
  bindData: function(data) {
    ShowLoadingScreen();
    kony.print("Entered bind call for form");
    try {
      var formmodel = this.getController().getFormModel();
      formmodel.clear();
      this.$class.$superp.bindData.call(this, data);
      this.getController().getFormModel().formatUI();
      kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
      if(menuIconForceTouch){
          menuIconForceTouch = false;
          newTransferPreShow();
      }
      else{
         kony.print("Starting to show form");
         this.getController().showForm();
		 kony.print("Perf Log: Transfer money button click - End");
         kony.print("Finished call to show form");
      } 
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
     * @memberof frmNewTransferKAControllerExtension#
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
     * @memberof frmNewTransferKAControllerExtension#
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
     * @memberof frmNewTransferKAControllerExtension#
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