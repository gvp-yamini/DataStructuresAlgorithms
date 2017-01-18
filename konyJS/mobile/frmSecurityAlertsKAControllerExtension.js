/*
 * Controller Extension class for frmSecurityAlertsKA
 * Developer can edit the existing methods or can add new methods if required
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};

/**
 * Creates a new Form Controller Extension.
 * @class frmSecurityAlertsKAControllerExtension
 * @param {Object} controllerObj - Form Controller.
 */
kony.sdk.mvvm.frmSecurityAlertsKAControllerExtension = Class(kony.sdk.mvvm.BankingAppControllerExtension, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
    },
    /** 
     * This method is an entry point for all fetch related flows. Developer can edit.
     * Default implementation fetches data for the form based on form config 
     * @memberof frmSecurityAlertsKAControllerExtension#
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
     * @memberof frmSecurityAlertsKAControllerExtension#
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
     * @memberof frmSecurityAlertsKAControllerExtension#
     */
    bindData: function(data) {
        try {
            var formmodel = this.getController().getFormModel();
            formmodel.clear();
          if(kony.retailBanking.globalData.deviceInfo.isIphone()){
          
              if(data._raw_response_.form.records[0].bankingIDChange === "true"){
				frmSecurityAlertsKA.BankingIdChangeAlertSwitch.selectedIndex = 0;
              }else{
                frmSecurityAlertsKA.BankingIdChangeAlertSwitch.selectedIndex = 1;
              }
            
            if(data._raw_response_.form.records[0].passwordChange === "true"){
				frmSecurityAlertsKA.PasswordChangeAlertSwitch.selectedIndex = 0;
              }else{
                frmSecurityAlertsKA.PasswordChangeAlertSwitch.selectedIndex = 1;
              }
            if(data._raw_response_.form.records[0].passwordExpired === "true"){
				frmSecurityAlertsKA.PasswordExpiredAlertSwitch.selectedIndex = 0;
              }else{
                frmSecurityAlertsKA.PasswordExpiredAlertSwitch.selectedIndex = 1;
              }
            if(data._raw_response_.form.records[0].communicationChange === "true"){
				frmSecurityAlertsKA.AddressPhoneChangeAlertSwitch.selectedIndex = 0;
              }else{
                frmSecurityAlertsKA.AddressPhoneChangeAlertSwitch.selectedIndex = 1;
              }
            if(data._raw_response_.form.records[0].newPayeeAdded === "true"){
				frmSecurityAlertsKA.NewPayeeAddedAlertSwitch.selectedIndex = 0;
              }else{
                frmSecurityAlertsKA.NewPayeeAddedAlertSwitch.selectedIndex = 1;
              }
            if(data._raw_response_.form.records[0].payeeDetailsUpdated === "true"){
				frmSecurityAlertsKA.PayeeDetailsUpdatedAlertSwitch.selectedIndex = 0;
              }else{
                frmSecurityAlertsKA.PayeeDetailsUpdatedAlertSwitch.selectedIndex = 1;
              }
            
          }else{
             if(data._raw_response_.form.records[0].bankingIDChange === "true"){
				frmSecurityAlertsKA.imgBankingIdChangeKA.src="checkbox_on.png";
              }else{
               frmSecurityAlertsKA.imgBankingIdChangeKA.src="checkbox_off.png";
              }
            
            if(data._raw_response_.form.records[0].passwordChange === "true"){
				frmSecurityAlertsKA.imgPasswordChangeKA.src="checkbox_on.png";
              }else{
                frmSecurityAlertsKA.imgPasswordChangeKA.src="checkbox_off.png";
              }
            if(data._raw_response_.form.records[0].passwordExpired === "true"){
				frmSecurityAlertsKA.imgPasswordExpiredKA.src="checkbox_on.png";
              }else{
                frmSecurityAlertsKA.imgPasswordExpiredKA.src="checkbox_off.png";
              }
            if(data._raw_response_.form.records[0].communicationChange === "true"){
				frmSecurityAlertsKA.imgAddressPhoneChangeKA.src="checkbox_on.png";
              }else{
               frmSecurityAlertsKA.imgAddressPhoneChangeKA.src="checkbox_off.png";
              }
            if(data._raw_response_.form.records[0].newPayeeAdded === "true"){
				frmSecurityAlertsKA.imgNewPayeeAddedKA.src="checkbox_on.png";
              }else{
                frmSecurityAlertsKA.imgNewPayeeAddedKA.src="checkbox_off.png";
              }
            if(data._raw_response_.form.records[0].payeeDetailsUpdated === "true"){
				frmSecurityAlertsKA.imgPayeeDetailsUpdatedKA.src="checkbox_on.png";
              }else{
                frmSecurityAlertsKA.imgPayeeDetailsUpdatedKA.src="checkbox_off.png";
              }
            
            
          }
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
     * @memberof frmSecurityAlertsKAControllerExtension#
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
     * @memberof frmSecurityAlertsKAControllerExtension#
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
     * @memberof frmSecurityAlertsKAControllerExtension#
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