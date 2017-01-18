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
kony.sdk.mvvm.frmConfirmTransferKAControllerExtension = Class(kony.sdk.mvvm.BaseFormControllerExtension, {
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
           // this.$class.$superp.fetchData.call(this, success, error);
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
        };
    },
    /** 
     * This method binds the processed data to the form. Developer can edit.
     * Default implementation binds the data to widgets in the form.
     * @param {Object} data - processed data.(Default : data map for each group, widget id as key and widget data as value)
     * @memberof frmConfirmTransferKAControllerExtension#
     */
    bindData: function(data) {
        try {
           /* var formmodel = this.getController().getFormModel();
            formmodel.clear();
            this.$class.$superp.bindData.call(this, data);
            this.getController().getFormModel().formatUI();
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();*/
			
			  var scopeObj = this;
      var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
      var listController = INSTANCE.getFormController("frmNewTransferKA");
      var transferformModel = listController.getFormModel();
      var amount =kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(transferformModel.getViewAttributeByProperty("amountTextField","text"),kony.retailBanking.globalData.globals.CurrencyCode); 
      var toAccName = transferformModel.getViewAttributeByProperty("toNamePick","text");
      var toAccNumber = transferformModel.getViewAttributeByProperty("tolblAccountNumberKA","text");
      var fromAccName = transferformModel.getViewAttributeByProperty("fromNamePick","text");
      var fromAccNumber = transferformModel.getViewAttributeByProperty("fromlblAccountNumberKA","text");
      var frequency = transferformModel.getViewAttributeByProperty("frequencyPickLabel","text");  
      var TransferNotes = transferformModel.getViewAttributeByProperty("lblTransferNotes","text");
      var fromdate = transferformModel.getViewAttributeByProperty("lblRecurringFromData","text");
      var recurenceSttDate = transferformModel.getViewAttributeByProperty("CalenderFrom","dateComponents");
      var recurenceEndDate = transferformModel.getViewAttributeByProperty("CalenderTo","dateComponents");
      var todate = transferformModel.getViewAttributeByProperty("lblRecurringTOData","text");
      var NoofTimes = transferformModel.getViewAttributeByProperty("lblNoofTimesKA","text");
      var scheduledDate = transferformModel.getViewAttributeByProperty("calDateKA", "dateComponents");
      var recur = transferformModel.getViewAttributeByProperty("flxRecurrence", "isVisible");
      //selectedScheduledDate = kony.retailBanking.util.formatingDate.getDBDateTimeFormat(scheduledDate,"00:00");

      var month,month1;
      var day,day1;
      if((todate== "" || todate== null)&&(NoofTimes=="" || NoofTimes==null))
        {
          NoofTimes = "1"; 
        }
      day = parseInt(scheduledDate[0]);
      month = parseInt(scheduledDate[1]);
      if(month <10){
        month = "0"+month;
      }
      /*else{
           month1 = month;
         }*/
      if(day <10){
        day = "0"+day;
      }/*else{
           day1 = day;
         }*/
      var formattedDate = scheduledDate[2]+"-"+month+"-"+day;
      // var formattedDate =scheduledDate[0]+"-"+scheduledDate[1]+"-"+scheduledDate[2];
      var scheduledDate2 = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(formattedDate);

      // alert(kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(new Date()));
      //kony.retailBanking.util.formatingDate.datelocaleformat();
      // var navigationObject = this.getController().gfrequencyetContextData();
      //var tempData = navigationObject.getCustomInfo("transferData");
      var formModel = this.getController() && this.getController().getFormModel();
      formModel.clear();               
      //	formModel.showView();
      formModel.setViewAttributeByProperty("transactionAmount","text",amount);
      //	formModel.setViewAttributeByProperty("transactionDate","text","Transfer To");
      formModel.setViewAttributeByProperty("transactionName","text",toAccName);
      formModel.setViewAttributeByProperty("toAccountNumberKA","text",toAccNumber);
      formModel.setViewAttributeByProperty("transactionFrom","text",fromAccName);
      formModel.setViewAttributeByProperty("fromAccountNumberKA","text",fromAccNumber);
      //formModel.setViewAttributeByProperty("lblScheduledDate","text","2016-05-30T16:05:43+05:30");
      formModel.setViewAttributeByProperty("lblScheduledDate","text",scheduledDate2);
      formModel.setViewAttributeByProperty("lblReccurrenceValue","text",frequency);
      formModel.setViewAttributeByProperty("lblReccuureceFreq","text",NoofTimes);
      formModel.setViewAttributeByProperty("transactionNotes","text",TransferNotes);
      formModel.setViewAttributeByProperty("lblfromDateKA","text",fromdate);
      formModel.setViewAttributeByProperty("lblToDateKA","text",todate);
      if(recur)
      {
        if(NoofTimes=="" || NoofTimes==null )
        {
          if(!(todate== "" || todate== null ))
          {
            formModel.performActionOnView("flxDateRange","setVisibility",[true]);
            formModel.performActionOnView("lblReccuureceFreq","setVisibility",[false]);
            formModel.performActionOnView("flxFrequency","setVisibility",[false]);
          }
          else
          {
            formModel.performActionOnView("flxDateRange","setVisibility",[false]);
            formModel.performActionOnView("lblReccuureceFreq","setVisibility",[false]);
            formModel.performActionOnView("flxFrequency","setVisibility",[false]);
            formModel.setViewAttributeByProperty("lblReccuureceFreq","text","");
            formModel.setViewAttributeByProperty("lblfromDateKA","text","");
            formModel.setViewAttributeByProperty("lblToDateKA","text","");
          }
        }
        else
        {
          formModel.performActionOnView("flxDateRange","setVisibility",[false]);
          formModel.performActionOnView("lblReccuureceFreq","setVisibility",[true]);
          formModel.performActionOnView("flxFrequency","setVisibility",[true]);
        }
      }
      else
      {
        formModel.performActionOnView("flxDateRange","setVisibility",[false]);
        formModel.performActionOnView("flxFrequency","setVisibility",[false]);
        formModel.performActionOnView("lblReccuureceFreq","setVisibility",[false]);
        formModel.setViewAttributeByProperty("lblReccuureceFreq","text","");
        formModel.setViewAttributeByProperty("lblfromDateKA","text","");
        formModel.setViewAttributeByProperty("lblToDateKA","text","");
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
     * @memberof frmConfirmTransferKAControllerExtension#
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