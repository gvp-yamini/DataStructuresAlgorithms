/*
 * Controller Extension class for frmViewApplicationKA
 * Developer can edit the existing methods or can add new methods if required
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};

/**
 * Creates a new Form Controller Extension.
 * @class frmViewApplicationKAControllerExtension
 * @param {Object} controllerObj - Form Controller.
 */
kony.sdk.mvvm.frmViewApplicationKAControllerExtension = Class(kony.sdk.mvvm.BankingAppControllerExtension, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
    },
    /** 
     * This method is an entry point for all fetch related flows. Developer can edit.
     * Default implementation fetches data for the form based on form config 
     * @memberof frmViewApplicationKAControllerExtension#
     */
    fetchData: function() {
        try {
            var scopeObj = this;
            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Loading Form");
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            var formModel = this.getController() && this.getController().getFormModel();
            formModel.clear();

           /* formModel.setViewAttributeByProperty("lblHeadingKA","text",selectedAccountForm);
            formModel.setViewAttributeByProperty("accountType","text",selectedAccountID);
            formModel.setViewAttributeByProperty("stateId","text",selectedStateID);
            formModel.setViewAttributeByProperty("productId","text",selectedProductID);
            formModel.setViewAttributeByProperty("phoneone","text",newAccount.phoneone);
            formModel.setViewAttributeByProperty("phonetwo","text",newAccount.phonetwo);
            formModel.setViewAttributeByProperty("ssn","text",newAccount.ssn);
            formModel.setViewAttributeByProperty("address","text",newAccount.address);
            formModel.setViewAttributeByProperty("email","text",newAccount.email);
            formModel.setViewAttributeByProperty("dob","text",newAccount.dob.split("/")[2]+"-"+newAccount.dob.split("/")[1]+"-"+newAccount.dob.split("/")[0]);
            formModel.setViewAttributeByProperty("userName","text",newAccount.name);
            formModel.setViewAttributeByProperty("firstName","text",newAccount.name.split(" ")[0]);
            formModel.setViewAttributeByProperty("lastName","text",newAccount.name.split(" ")[1]);*/
            


            //this.getController().showForm();




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
     * @memberof frmViewApplicationKAControllerExtension#
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
     * @memberof frmViewApplicationKAControllerExtension#
     */
    bindData: function(data) {
        try {
            var formModel = this.getController().getFormModel();
            formModel.clear();
            if(selectedAccountID == "1" || selectedAccountID == "2"  || selectedAccountID == "5"){    
                formModel.setViewAttributeByProperty("lblHeadingKA","text",selectedAccountForm);
              }
              else
              {
            formModel.setViewAttributeByProperty("lblHeadingKA","text",selectedProductName);
            }
            formModel.setViewAttributeByProperty("accountType","text",selectedAccountID);
            formModel.setViewAttributeByProperty("stateId","text",selectedStateID);
            formModel.setViewAttributeByProperty("productId","text",selectedProductID);
            formModel.setViewAttributeByProperty("phoneone","text",newAccount.phoneone);
            formModel.setViewAttributeByProperty("phonetwo","text",newAccount.phonetwo);
            formModel.setViewAttributeByProperty("ssn","text",newAccount.ssn);
            formModel.setViewAttributeByProperty("address","text",newAccount.address);
            formModel.setViewAttributeByProperty("email","text",newAccount.email);
          	//new Date(newAccount.dob.split("/")[2]+"-"+newAccount.dob.split("/")[1]+"-"+newAccount.dob.split("/")[0])
          	//var dob=new Date(newAccount.dob.split("/")[2]+"-"+newAccount.dob.split("/")[1]+"-"+newAccount.dob.split("/")[0]);
            //formModel.setViewAttributeByProperty("dob","text",JSON.stringify(kony.retailBanking.util.formatingDate.getISODateTimeKA(newAccount.dob.split("/")[2]+"-"+newAccount.dob.split("/")[1]+"-"+newAccount.dob.split("/")[0], kony.retailBanking.util.BACKEND_DATE_FORMAT)));//(newAccount.dob.split("/")[2]+"-"+newAccount.dob.split("/")[1]+"-"+newAccount.dob.split("/")[0]);
            //kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA()
          formModel.setViewAttributeByProperty("dob","text",newAccount.dob.split("/")[2]+"-"+newAccount.dob.split("/")[1]+"-"+newAccount.dob.split("/")[0]);
          formModel.setViewAttributeByProperty("dobShow","text",kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(newAccount.dob.split("/")[2]+"-"+newAccount.dob.split("/")[1]+"-"+newAccount.dob.split("/")[0]));
            formModel.setViewAttributeByProperty("userName","text",newAccount.name);
            formModel.setViewAttributeByProperty("firstName","text",newAccount.name.split(" ")[0]);
            formModel.setViewAttributeByProperty("lastName","text",newAccount.name.split(" ")[1]);
          	formModel.setViewAttributeByProperty("ssnShow","text","XXX XX "+ newAccount.ssn.slice(-4));
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
     * @memberof frmViewApplicationKAControllerExtension#
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
          	selectedAccountForm="";
             selectedAccountID="";
             selectedStateID="1";
             selectedProductID="1";
             newAccount={};
          	mssn="";
          
            frmConfirmationCardKA.lblHeadingKA.text = selectedAccountForm;
            frmConfirmationCardKA.refID.text=i18n_yourIDis+" "+ res.referenceId;
            frmConfirmationCardKA.show();
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
     * @memberof frmViewApplicationKAControllerExtension#
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
     * @memberof frmViewApplicationKAControllerExtension#
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