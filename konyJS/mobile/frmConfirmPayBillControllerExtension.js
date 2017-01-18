/*
 * Controller Extension class for frmConfirmPayBill
 * Developer can edit the existing methods or can add new methods if required
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};

/**
 * Creates a new Form Controller Extension.
 * @class frmConfirmPayBillControllerExtension
 * @param {Object} controllerObj - Form Controller.
 */
kony.sdk.mvvm.frmConfirmPayBillControllerExtension =  Class(kony.sdk.mvvm.BankingAppControllerExtension, {
    constructor: function(controllerObj) {
        this.selectedScheduledDate = null;
        this.$class.$super.call(this, controllerObj);
    },
    /** 
     * This method is an entry point for all fetch related flows. Developer can edit.
     * Default implementation fetches data for the form based on form config 
     * @memberof frmConfirmPayBillControllerExtension#
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
     * @memberof frmConfirmPayBillControllerExtension#
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
     * @memberof frmConfirmPayBillControllerExtension#
     */
    bindData: function(data) {
        try {
            var formmodel = this.getController().getFormModel();
            formmodel.clear();
            //this.$class.$superp.bindData.call(this, data);
            //this.getController().getFormModel().formatUI();
			var navigationObject = this.getController().getContextData();
           /* var tempData = navigationObject.getCustomInfo("payBillObject"); 
			var amount = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(tempData.amount,kony.retailBanking.globalData.globals.CurrencyCode);
			formmodel.setViewAttributeByProperty("transactionAmount","text",amount);
			formmodel.setViewAttributeByProperty("transactionName","text",tempData.toAccName);
			formmodel.setViewAttributeByProperty("transactionFrom","text",tempData.fromAccName);
              
            formmodel.setWidgetData("transactionType",kony.retailBanking.globalData.globals.PayBill);
			formmodel.setWidgetData("fromAccNumberKA",tempData.fromAccNumber);
			formmodel.setWidgetData("MapedAmountLabel",tempData.amount);
			formmodel.setWidgetData("fromAccountNumberKA",tempData.toAccNumber);
			formmodel.setWidgetData("fromAccountNameKA",tempData.toAccName);
			
			var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
              var controller = INSTANCE.getFormController("frmNewBillKA");
              var controllerContextData = controller.getContextData();
              if(controllerContextData && controllerContextData.getCustomInfo("transactionId")){
                formmodel.setWidgetData("transactionId",controllerContextData.getCustomInfo("transactionId"));
              }else{
                formmodel.setWidgetData("transactionId","");
              }
			
			
			   /*     var payBill = {
          "fromAccNumber" : fromAccNumber,
          "toAccNumber" : toAccNumber,
          "amount" : amount,
          "toAccName": toAccName,    
          "fromAccName":fromAccName,
          "scheduledDate" : scheduledDate
        };*
      this.selectedScheduledDate = tempData.scheduledDate;
                
      var month,month1;
      var day,day1;
      var day = parseInt(this.selectedScheduledDate[0]);
      var  month = parseInt(this.selectedScheduledDate[1]);
      if(month <10){
        month = "0"+month;
      }
      /*else{
           month1 = month;
        }*
      if(day <10){
        day = "0"+day;
      }/*else{
           day1 = day;
         }*
      var formattedDate = this.selectedScheduledDate[2]+"-"+month+"-"+day;
      // var formattedDate =scheduledDate[0]+"-"+scheduledDate[1]+"-"+scheduledDate[2];
      //var tempDate = kony.retailBanking.util.formatingDate.getISODateTimeKA(formattedDate, kony.retailBanking.util.BACKEND_DATE_FORMAT);
      //var scheduledDate2 = (tempDate instanceof Date)? tempDate.format('F d, Y') : "";
	  var scheduledDate2 = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(formattedDate);
      formmodel.setViewAttributeByProperty("lblScheduledDate","text",scheduledDate2);
	  var dbDate = kony.retailBanking.util.formatingDate.getDBDateTimeFormat(this.selectedScheduledDate,"00:00");
	  formmodel.setWidgetData("mapedDateKA",dbDate);
	*/		setDataIntoConfirmBillPayfrom();
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
     /** 
     * This method is entry point for save flow. Developer can edit.
     * Default implementation saves the entity record from the data of widgets defined in form config 
     * @memberof frmConfirmTransferKAControllerExtension#
     */
    saveData: function() {
        try {
                successFormPreShow();
                frmSuccessFormKA.show();
                successFormanimationShow();
            	this.$class.$superp.saveData.call(this, success, error);
        } catch (err) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

        function success(res) {
                kony.sdk.mvvm.log.info("success saving record ", res);
                var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
      			var listController = INSTANCE.getFormController("frmSuccessFormKA");
      			var navObject = new kony.sdk.mvvm.NavigationObject();
      			if(res.referenceId){
      				 navObject.setCustomInfo("TransactionID",i18n_referenceId+ res.referenceId);
      			}else{
      				 navObject.setCustomInfo("TransactionID",i18n_referenceId+ res.transactionId);
      			}
     // kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                listController.loadDataAndShowForm(navObject);
			
        }

        function error(err) {
            //Handle error case
            frmSuccessFormKA.successText.text = i18n_transactionFailed;
            frmSuccessFormKA.successTitle.text =i18n_sorryForinconvenience;
            frmSuccessFormKA.processing.text = i18n_processingTransaction;
            errorFormPostShow();
            kony.sdk.mvvm.log.error("In saveData errorcallback in controller extension ", err);
            //var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
            //kony.sdk.mvvm.log.error(exception.toString());
        }

    },
    /** 
     * This method is entry point for delete/remove flow. Developer can edit.
     * Default implementation deletes the entity record displayed in form (primary keys are needed)
     * @memberof frmConfirmPayBillControllerExtension#
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
     * @memberof frmConfirmPayBillControllerExtension#
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