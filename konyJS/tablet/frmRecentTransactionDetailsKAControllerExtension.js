/*
 * Controller Extension class for frmRecentTransactionDetailsKA
 * Developer can edit the existing methods or can add new methods if required
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};

/**
 * Creates a new Form Controller Extension.
 * @class frmRecentTransactionDetailsKAControllerExtension
 * @param {Object} controllerObj - Form Controller.
 */
kony.sdk.mvvm.frmRecentTransactionDetailsKAControllerExtension = Class(kony.sdk.mvvm.BaseFormControllerExtension, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
    },
    /** 
     * This method is an entry point for all fetch related flows. Developer can edit.
     * Default implementation fetches data for the form based on form config 
     * @memberof frmRecentTransactionDetailsKAControllerExtension#
     */
    fetchData: function() {
	try{
       var scopeObj = this;
      kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Loading Form");
      var navigationObject = this.getController().getContextData();
      var tempData = navigationObject.getCustomInfo("selectedTransactionObj");
      var transObject = [];
      var userAgent = kony.os.userAgent();
      transObject.push(tempData);
      //Todo ScheduleTransactions

      var formModel = this.getController() && this.getController().getFormModel();
      formModel.clear();         
      if(tempData.transactionId){
        formModel.setViewAttributeByProperty("transactionId","text",tempData.transactionId);
      }
      if(tempData.transactionType){
        formModel.setViewAttributeByProperty("transactionType","text",tempData.transactionType);
      }
      if(tempData.amount){
        formModel.setViewAttributeByProperty("transactionAmount","text",tempData.amount);
      }
      if(tempData.transactionDate){
        formModel.setViewAttributeByProperty("transactionDate","text",tempData.transactionDate);
      }
       if(tempData.fromNickName)
      {
        formModel.setViewAttributeByProperty("transactionFrom","text",tempData.fromNickName);
      }else
      {			
        formModel.setViewAttributeByProperty("transactionFrom","text",tempData.fromAccountType+"-"+tempData.fromAccountNumber.slice(-4));
      }
      formModel.setViewAttributeByProperty("lblNotesLabelKA","text",i18n_notes+" ");
      if(tempData.transactionsNotes){
        formModel.setViewAttributeByProperty("transactionNotes","text",tempData.transactionsNotes);
      }else{
        formModel.setViewAttributeByProperty("transactionNotes","text","");
      }
      switch(tempData.transactionType)
      {
        case kony.retailBanking.globalData.globals.PayBill     : formModel.performActionOnView("lblP2PContactKA","setVisibility",[false]);
          formModel.setViewAttributeByProperty("transactionName","text",tempData.payeeNickName); 
          formModel.setViewAttributeByProperty("transactionDate","text",i18n_billPaymentTo);
          formModel.setViewAttributeByProperty("repeatTransactionButton","text",i18n_repeatBillPay);
          formModel.performActionOnView("CopynotesWrapper03de47f39b8bc46","setVisibility",[false]);
          break;
        case kony.retailBanking.globalData.globals.PayPerson   : formModel.performActionOnView("lblP2PContactKA","setVisibility",[true]);
          if(tempData.payPersonPhone){
            formModel.setViewAttributeByProperty("lblP2PContactKA","text",tempData.payPersonPhone);
          }
          if(tempData.payPersonName){
            formModel.setViewAttributeByProperty("transactionName","text",tempData.payPersonName);
          }
          formModel.setViewAttributeByProperty("transactionDate","text",i18n_P2PTransferTo);
          formModel.setViewAttributeByProperty("repeatTransactionButton","text",i18n_repeatTransfer);
          formModel.performActionOnView("CopynotesWrapper03de47f39b8bc46","setVisibility",[true]);
          break;
        case kony.retailBanking.globalData.globals.TransferMoney : formModel.performActionOnView("lblP2PContactKA","setVisibility",[false]);
          formModel.setViewAttributeByProperty("transactionName","text",tempData.toAccountName+"-"+tempData.toAccountNumber);
          formModel.setViewAttributeByProperty("transactionDate","text",i18n_transferTo);
          formModel.setViewAttributeByProperty("repeatTransactionButton","text",i18n_repeatTransfer);
          formModel.performActionOnView("CopynotesWrapper03de47f39b8bc46","setVisibility",[true]);
          break;
        case kony.retailBanking.globalData.globals.ExternalTransfer : formModel.performActionOnView("lblP2PContactKA","setVisibility",[false]);

          formModel.setViewAttributeByProperty("transactionName","text",tempData.ExternalAccountNumber);
          formModel.setViewAttributeByProperty("transactionDate","text","Transfer to");
          formModel.setViewAttributeByProperty("repeatTransactionButton","text",i18n_repeatTransfer);
           formModel.performActionOnView("CopynotesWrapper03de47f39b8bc46","setVisibility",[true]);
          break;
      }
      if(tempData.isScheduled==="false")
      {
        if(userAgent === "iPhone")
        {
          formModel.setViewAttributeByProperty("transferPayTitleLabel","text",i18n_recentTransactions+" ");
        }
        else
        {
          formModel.setViewAttributeByProperty("androidTitleLabel","text",i18n_recentTransactions+" ");
        }
        formModel.setViewAttributeByProperty("lblTransactionDateKA","text",i18n_transactionDate);
        formModel.performActionOnView("btnEditKA","setVisibility",[false]);
        formModel.performActionOnView("flxReccurrence","setVisibility",[false]);
        formModel.setViewAttributeByProperty("lblTransactionDateValueKA","text",tempData.transactionDate);
        switch(tempData.transactionType)
        {
          case kony.retailBanking.globalData.globals.PayBill     : formModel.setViewAttributeByProperty("repeatTransactionButton","text",i18n_repeatBillPay);
            break;
          case kony.retailBanking.globalData.globals.PayPerson   : formModel.setViewAttributeByProperty("repeatTransactionButton","text",i18n_repeatTransfer);
            break;
          case kony.retailBanking.globalData.globals.TransferMoney : formModel.setViewAttributeByProperty("repeatTransactionButton","text",i18n_repeatTransfer);
            break;
          case kony.retailBanking.globalData.globals.ExternalTransfer : formModel.setViewAttributeByProperty("repeatTransactionButton","text",i18n_repeatTransfer);
            break;
        }

      }
      else
      {
        if(kony.retailBanking.globalData.deviceInfo.isIphone())
        {
          formModel.setViewAttributeByProperty("transferPayTitleLabel","text",i18n_scheduledTransactions+" ");
        }
        else
        {
          formModel.setViewAttributeByProperty("androidTitleLabel","text",i18n_scheduledTransactions+" ");
        }
        formModel.setViewAttributeByProperty("lblTransactionDateKA","text",i18n_scheduledFor);
        formModel.performActionOnView("btnEditKA","setVisibility",[true]);
        formModel.performActionOnView("CopynotesWrapper03de47f39b8bc46","setVisibility",[true]);
        var tempDate = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(tempData.scheduledDate);
        formModel.setViewAttributeByProperty("lblTransactionDateValueKA","text",tempDate);
        switch(tempData.transactionType)
        {
          case kony.retailBanking.globalData.globals.TransferMoney :
            formModel.performActionOnView("flxReccurrence","setVisibility",[true]);
            formModel.performActionOnView("CopynotesWrapper03de47f39b8bc46","setVisibility",[true]);
            formModel.setViewAttributeByProperty("lblReccurrenceValueKA","text",tempData.frequencyType);
            if(tempData.numberOfRecurrences !== undefined)
            {
              formModel.performActionOnView("lblReccurrenceNumberKA","setVisibility",[true]);
              formModel.setViewAttributeByProperty("lblReccurrenceNumberKA","text",i18n_next +tempData.numberOfRecurrences + i18n_times);

            }
            else if(tempData.frequencyStartDate !== undefined)
            {
              var tempFreqStartDate = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(tempData.frequencyStartDate);
              var tempFreqEndDate = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(tempData.frequencyEndDate);
              formModel.performActionOnView("lblReccurrenceNumberKA","setVisibility",[true]);
              formModel.setViewAttributeByProperty("lblReccurrenceNumberKA","text",tempFreqStartDate +"to" +tempFreqEndDate);
            }
            break;
          case kony.retailBanking.globalData.globals.ExternalTransfer :
            formModel.performActionOnView("flxReccurrence","setVisibility",[true]);
            formModel.performActionOnView("CopynotesWrapper03de47f39b8bc46","setVisibility",[true]);
            formModel.setViewAttributeByProperty("lblReccurrenceValueKA","text",tempData.frequencyType);            
            if(tempData.numberOfRecurrences !== undefined)
            {
              formModel.performActionOnView("lblReccurrenceNumberKA","setVisibility",[true]);
              formModel.setViewAttributeByProperty("lblReccurrenceNumberKA","text",i18n_next +tempData.numberOfRecurrences + i18n_times);

            }else if(tempData.frequencyStartDate !== undefined)
             {
              var tempFreqStartDate = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(tempData.frequencyStartDate);
              var tempFreqEndDate = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(tempData.frequencyEndDate);
              formModel.performActionOnView("lblReccurrenceNumberKA","setVisibility",[true]);
              formModel.setViewAttributeByProperty("lblReccurrenceNumberKA","text",tempFreqStartDate +i18n_to +tempFreqEndDate);
            }
            break;
          case kony.retailBanking.globalData.globals.PayBill :
            formModel.performActionOnView("flxReccurrence","setVisibility",[false]);
            formModel.setViewAttributeByProperty("lblReccurrenceValueKA","text",i18n_weeklyOnce);
            formModel.setViewAttributeByProperty("lblReccurrenceNumberKA","text","Next 5 Times");
	    formModel.performActionOnView("CopynotesWrapper03de47f39b8bc46","setVisibility",[false]);
            break;
          case kony.retailBanking.globalData.globals.PayPerson   : 
            formModel.performActionOnView("flxReccurrence","setVisibility",[false]);
            formModel.setViewAttributeByProperty("lblReccurrenceValueKA","text",i18n_weeklyOnce);
            formModel.setViewAttributeByProperty("lblReccurrenceNumberKA","text","Next 5 Times");
	   formModel.performActionOnView("CopynotesWrapper03de47f39b8bc46","setVisibility",[true]);
            break;
        }
        switch(tempData.transactionType)
        {
          case kony.retailBanking.globalData.globals.PayBill     : formModel.setViewAttributeByProperty("repeatTransactionButton","text",i18n_cancelBillPay);
            break;
          case kony.retailBanking.globalData.globals.PayPerson   : formModel.setViewAttributeByProperty("repeatTransactionButton","text",i18n_cancelTransferAlert);
            break;
          case kony.retailBanking.globalData.globals.TransferMoney : formModel.setViewAttributeByProperty("repeatTransactionButton","text",i18n_cancelTransferAlert);
            break;
          case kony.retailBanking.globalData.globals.ExternalTransfer : formModel.setViewAttributeByProperty("repeatTransactionButton","text",i18n_cancelTransferAlert);
            break;
        }

      }
//       var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
//       var controller = INSTANCE.getFormController("accountDetail");
//       var controllerContextData=controller.getContextData();
//       var currForm = kony.application.getCurrentForm().id;
//       if(controllerContextData && controllerContextData.getCustomInfo("selectedAccountObj") && currForm !="frmTransferPayLandingKA"){
//         formModel.setViewAttributeByProperty("repeatTransactionButton","text","Repeat Transaction");
//         paintHeaderInRecentTransaction();
//       }else{
//         resetPaintedHeaderInRecentTransaction();
//       }
      this.getController().showForm();
      // var processedData = this.$class.$superp.processData.call(this, tempData);
      //this.getController().bindData(processedData);
      //  this.$class.$superp.fetchData.call(this, success, error);
      // this.$class.$superp.fetchData.call(this, success, error);

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
     * @memberof frmRecentTransactionDetailsKAControllerExtension#
     * @returns {Object} - processed data
     */
    processData: function(data) {
        try {
	  var scopeObj = this;
      var navigationObject = this.getController().getContextData();
      data = getTransactionRowData(data,navigationObject.getCustomInfo("selectedTransactionObj"));
      //data.form.transactionAmount = "500";

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
     * @memberof frmRecentTransactionDetailsKAControllerExtension#
     */
    bindData: function(data) {
        try {
            var formmodel = this.getController().getFormModel();
            formmodel.clear();
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
     * @memberof frmRecentTransactionDetailsKAControllerExtension#
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
     * @memberof frmRecentTransactionDetailsKAControllerExtension#
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
			getTransferPayLandingForm("frmTransferPayLandingKA");
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
     * @memberof frmRecentTransactionDetailsKAControllerExtension#
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