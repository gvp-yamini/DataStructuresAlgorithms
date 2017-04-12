/*
 * Controller Extension class for frmInformationKA
 * Developer can edit the existing methods or can add new methods if required
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};

/**
 * Creates a new Form Controller Extension.
 * @class frmInformationKAControllerExtension
 * @param {Object} controllerObj - Form Controller.
 */
kony.sdk.mvvm.frmInformationKAControllerExtension = Class(kony.sdk.mvvm.BankingAppControllerExtension, {
  constructor: function(controllerObj) {
    this.$class.$super.call(this, controllerObj);
  },
  /** 
     * This method is an entry point for all fetch related flows. Developer can edit.
     * Default implementation fetches data for the form based on form config 
     * @memberof frmInformationKAControllerExtension#
     */
  fetchData: function() {
    try {
      var scopeObj = this;
      kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Loading Form");
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
     * @memberof frmInformationKAControllerExtension#
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
     * @memberof frmInformationKAControllerExtension#
     */
  bindData: function(data) {
    try {
      var formmodel = this.getController().getFormModel();
      formmodel.clear();
	  frmInformationKA.flxSubMenu.lblInformationKA.skin = "skn192980LatoBold100";
      frmInformationKA.flxSubMenu.lblTransactionsKA.skin = "slLabelLATOBOLDKA";
      frmInformationKA.flxSubMenu.lblSearchKA.skin = "slLabelLATOBOLDKA";
      frmInformationKA.flxSubMenu.lblStatementsKA.skin = "slLabelLATOBOLDKA";
      frmInformationKA.flxSubMenu.lblAccountSummaryKA.skin = "slLabelLATOBOLDKA";
      this.$class.$superp.bindData.call(this, data);
      this.getController().getFormModel().formatUI();
      kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
      this.getController().showForm();
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
     * @memberof frmInformationKAControllerExtension#
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
     * @memberof frmInformationKAControllerExtension#
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
     * @memberof frmInformationKAControllerExtension#
     */
  showForm: function() {
    try {
      var formmodel = this.getController().getFormModel();
      var accountData = kony.retailBanking.globalData.accounts.getAccountsData();
      setAccountInformationData(accountData[0].accountID);
      formmodel.showView();
    } catch (e) {
      var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SHOWFORM_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SHOWFORM_IN_CONTROLLER_EXTENSION, err);
      kony.sdk.mvvm.log.error(exception.toString());
    }
  }
});