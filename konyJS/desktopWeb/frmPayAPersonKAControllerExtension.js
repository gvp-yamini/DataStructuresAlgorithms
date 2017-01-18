/*
 * Controller Extension class for frmPayAPersonKA
 * Developer can edit the existing methods or can add new methods if required
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};

/**
 * Creates a new Form Controller Extension.
 * @class frmPayAPersonKAControllerExtension
 * @param {Object} controllerObj - Form Controller.
 */
kony.sdk.mvvm.frmPayAPersonKAControllerExtension = Class(kony.sdk.mvvm.BankingAppControllerExtension, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
    },
    /** 
     * This method is an entry point for all fetch related flows. Developer can edit.
     * Default implementation fetches data for the form based on form config 
     * @memberof frmPayAPersonKAControllerExtension#
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
     * @memberof frmPayAPersonKAControllerExtension#
     * @returns {Object} - processed data
     */
    processData: function(data) {
        try {
            var scopeObj = this;
          	var formmodel = this.getController().getFormModel();
            formmodel.clear();
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
     * @memberof frmPayAPersonKAControllerExtension#
     */
    bindData: function(data) {
        try {
            var formmodel = this.getController().getFormModel();
            formmodel.clear();
            this.$class.$superp.bindData.call(this, data);
            this.getController().getFormModel().formatUI();
          	var formId = kony.application.getPreviousForm().id;
          	var currId = kony.application.getCurrentForm().id;
          	formmodel.setViewAttributeByProperty("fromAccListBox","skin","sknLatoRegular72727290KA");
          	formmodel.setViewAttributeByProperty("toAcclistBox","skin","sknLatoRegular72727290KA");
          	formmodel.setViewAttributeByProperty("tbxAmountKA","skin","sknLatoRegular72727290KA");
          	formmodel.setViewAttributeByProperty("CalendarKA","skin","skn72727290");
          	var contextData = this.getController().getContextData();
            var details = contextData.getCustomInfo("SelPayPerson");
          	//if ((formId == "frmRecentP2PKA" || formId == "frmScheduledP2PKA" || formId == "frmActivityKA")&&(currId != "frmRecentP2PKA" && currId != "frmScheduledP2PKA" && currId != "frmManagePayeeP2PKA"))
          	if(details && details.type == "repeat")
            {
              var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
              var extObj,index,record;
              if(formId == "frmRecentP2PKA")
              {
                var listController = INSTANCE.getFormController(formId);
                formmodel.setViewAttributeByProperty("referenceId","text","");
                setTodayDate();
                index = frmRecentP2PKA.segAccountStatementsKA.selectedIndex[1];
    			extObj =  listController.getControllerExtensionObject();
                record = extObj.payeeObj[index];
              }else if(formId == "frmActivityKA"){
                  record = PayPersonGlobalbject;
              }else{
                var listController = INSTANCE.getFormController(formId);
                index = frmScheduledP2PKA.segAccountStatementsKA.selectedIndex[1];
    			extObj =  listController.getControllerExtensionObject();
                record = extObj.payeeObj[index];
                formmodel.setViewAttributeByProperty("referenceId","text",record.referenceId);
                setScheduledDate(record.scheduledDate);
              }
              formmodel.setViewAttributeByProperty("fromAccListBox", "selectedKey", record.fromAccountNumber);
              formmodel.setViewAttributeByProperty("toAcclistBox", "selectedKey", record.personId);
              formmodel.setViewAttributeByProperty("CopytoLbl0c1e7ad47deea44","text",record.payPersonPhone);
              formmodel.setViewAttributeByProperty("tbxAmountKA","text",record.amount);
              formmodel.setViewAttributeByProperty("noteTbx","text",record.transactionsNotes);
            }
          	else if(currId == "frmPayABillKA" && details && details.type == "edit")
            {
              var contextData = this.getController().getContextData();
              var details = contextData.getCustomInfo("SelPayPerson");
              formmodel.setViewAttributeByProperty("fromAccListBox", "selectedKey", details.fromAccount[0]);
              formmodel.setViewAttributeByProperty("toAcclistBox", "selectedKey", details.toAccount[0]);
              formmodel.setViewAttributeByProperty("tbxAmountKA", "text", details.amount);
              formmodel.setViewAttributeByProperty("noteTbx", "text", details.notes);
            }
         	else{
              var preferedSelAcnt=kony.retailBanking.globalData.globals.settings.DefaultPaymentAcctNo;
              if(preferedSelAcnt)
              	formmodel.setViewAttributeByProperty("fromAccListBox","selectedKey",preferedSelAcnt);
              else
                formmodel.setViewAttributeByProperty("fromAccListBox","selectedKey",-1);
              formmodel.setViewAttributeByProperty("referenceId","text","");
              formmodel.setViewAttributeByProperty("tbxAmountKA","text","");
              formmodel.setViewAttributeByProperty("noteTbx","text","");
              setTodayDate();
          	}
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
     * @memberof frmPayAPersonKAControllerExtension#
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
     * @memberof frmPayAPersonKAControllerExtension#
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
     * @memberof frmPayAPersonKAControllerExtension#
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