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
        try {
             var scopeObj = this;
	         this.$class.$superp.fetchData.call(this, success, error);
          // scopeObj.getController().processData(kony.retailBanking.globalData.accounts.getAccountsData());
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

        function success(response) {
            kony.sdk.mvvm.log.info("success fetching data ", response);
           // scopeObj.getController().processData(response);
           var formattedResponse = scopeObj.getController().processData(response);
            scopeObj.bindData(response);
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
              var  accPreviewData= kony.retailBanking.globalData.accounts.getAccountsData();
              kony.retailBanking.datastore.setAccountListObject(accPreviewData);
              kony.retailBanking.globalData.accounts.setAccountsData(accPreviewData);
              var processedData = this.$class.$superp.processData.call(this, data);
              var tempdata =  getFilteredFromAndToAccountsBySkinTablet(accPreviewData);
              this.getController().bindData(processedData);
           	  frmNewTransferKA.segInternalFromAccountsKA.widgetDataMap={
              nameAccount1:"accountName",
              amountAccount1:"availableBalance",
              typeAccountBalanceView:"availBalanView",
              typeAccount:"availBalanView",
              colorAccount1:"sknColor",
              lblBankName:"bankName"
              };
              frmNewTransferKA.segInternalTOAccountsKA.widgetDataMap={
              nameAccount1:"accountName",
              amountAccount1:"availableBalance",
              typeAccountBalanceView:"availBalanView",
              typeAccount:"accountType",
              colorAccount1:"sknColor",
              lblBankName:"bankName"
              };
          
                    
          fromBilldatalength = tempdata.length;
          frmNewTransferKA.segInternalFromAccountsKA.setData(tempdata[0]);
          frmNewTransferKA.segInternalTOAccountsKA.setData(tempdata[1]);
          frmNewTransferKA.fromAccountPick.setVisibility(false);
 		  frmNewTransferKA.toAccountPick.setVisibility(false);
          frmNewTransferKA.flxRecurrence.setVisibility(false);
         // frmNewTransferKA.lblOneTimeKA.text = "One Time";
          frmNewTransferKA.editToCard.setVisibility(true);
          frmNewTransferKA.ImgOneTimeKA.setVisibility(true);
		  frmNewTransferKA.ImgDailyKA.setVisibility(false);
		  frmNewTransferKA.ImgWeeklyKA.setVisibility(false);
		  frmNewTransferKA.ImgEvery2WeeksKA.setVisibility(false);
		  frmNewTransferKA.ImgMonthlyKA.setVisibility(false);
          frmNewTransferKA.lblNoofTimesKA.setVisibility(false);
		  frmNewTransferKA.flxDates.setVisibility(false);
          frmNewTransferKA.TbxNoofTimesKA.setVisibility(false);
		  frmNewTransferKA.flxCalenders.setVisibility(false);
           
          //onclickTransferEdit("from");
  		  onclickTransferEdit("to");
          
          DateFormatiingforRecurrence();
           
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
        try {
            var formmodel = this.getController().getFormModel();
            formmodel.clear();
            frmNewTransferKA.frequencyPickLabel.text = i18n_oneTIme;
            var previousForm = kony.application.getPreviousForm().id;
            /*if(previousForm == "frmRecentTransactionDetailsKA")
            {
              var fromAccountRecord = kony.retailBanking.globalData.accounts.searchAccountById(frmNewTransferKA.fromlblAccountNumberKA.text);
              viewModel.setViewAttributeByProperty("fromAmountPick","text",kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(fromAccountRecord.availableBalance,kony.retailBanking.globalData.globals.CurrencyCode));
              var toAccountRecord = kony.retailBanking.globalData.accounts.searchAccountById(frmNewTransferKA.tolblAccountNumberKA.text);
              viewModel.setViewAttributeByProperty("fromAmountPick","text",kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(toAccountRecord.availableBalance,kony.retailBanking.globalData.globals.CurrencyCode));
               viewModel.setViewAttributeByProperty("frmNewTransferKA","text","One Time");
            }*/
            this.$class.$superp.bindData.call(this, data);
            this.getController().getFormModel().formatUI();
         	newTransferPreShow();
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            setDateFormatforNewTransfer();
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
     * @memberof frmNewTransferKAControllerExtension#
     */
    saveData: function() {
        try {
            var scopeObj = this;
          var dataMap = this.getRecordsDataMap.call(this);
          navigateToTransferConfirmPageTablet(dataMap);
          kony.retailBanking.globalData.transfersData.setTransfersDataMap(dataMap);
           // this.$class.$superp.saveData.call(this, success, error);
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
  Save new transfer data
  */
   saveTransferData: function() {
   		successFormPreShow();
        successForm.show();
        successFormanimationShow();
      
      var record = kony.retailBanking.globalData.transfersData.getTransfersDataMap();
     var frequency = record[0].frequencyType;
      var frequencyType;
      if(frequency == "Daily")
        frequencyType = kony.retailBanking.globalData.globals.Daily;  
      else if(frequency == "Weekly Once")
        frequencyType = kony.retailBanking.globalData.globals.Weekly; 
      else if(frequency == "Every 2 Weeks")
        frequencyType = kony.retailBanking.globalData.globals.BiWeekly;
      else if(frequency == "Monthly Once")
        frequencyType = kony.retailBanking.globalData.globals.Monthly;
      else
        frequencyType = kony.retailBanking.globalData.globals.Once;
     record[0].frequencyType = frequencyType;
     
      record[0].scheduledDate = kony.retailBanking.util.formatingDate.getDBDateTimeFormat(frmNewTransferKA.calDateKA.dateComponents,"00:00");
     if(record[0].frequencyStartDate !=="" && record[0].frequencyStartDate !==null && record[0].frequencyStartDate !== undefined){
        var startDate = (record[0].frequencyStartDate).split("/");
       record[0].frequencyStartDate = kony.retailBanking.util.formatingDate.getDBDateTimeFormat(startDate,"00:00");
     }
        
      if(record[0].frequencyEndDate !=="" && record[0].frequencyEndDate !==null && record[0].frequencyEndDate !== undefined){
        var endDate = (record[0].frequencyEndDate).split("/");
        record[0].frequencyEndDate = kony.retailBanking.util.formatingDate.getDBDateTimeFormat(endDate,"00:00");
      }
        
     var transId = 0;
     if(record[0].transactionId !== null && record[0].transactionId !== "" && record[0].transactionId !== undefined){
       transId = 1;
     }
     
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var options ={    "access": "online",
                  "objectName": "RBObjects"
                 };
    var headers = {"session_token":kony.retailBanking.globalData.session_token};
    var serviceName = "RBObjects";
    var modelObj = INSTANCE.getModel("Transactions",serviceName,options);
    var dataObject = new kony.sdk.dto.DataObject("Transactions",record[0]);
    var requestOptions = {"dataObject":dataObject, "headers":headers};
     var recordsDataMap = this.getRecordsDataMap();
     var contexData = this.getController() && this.getController().getContextData();
             if(!contexData){
                  contexData = new kony.sdk.mvvm.NavigationObject();
             }
     var operation = contexData.getOperationType();
     var primaryKeyArr = modelObj.getValueForProperty("primaryKey");
       function primaryValuesExist(record, primaryKeyArr) {
               var result = false;
                for (var index in primaryKeyArr) {
                    if (record.hasOwnProperty(primaryKeyArr[index])) {
                        result = true
                    }
                }
                return result
            } 
     if (operation && operation === kony.sdk.mvvm.OperationType.ADD && transId === 0) {
                modelObj.create(requestOptions, createSuccess, transactionErrorCallback);
            } else if(primaryValuesExist(recordsDataMap, primaryKeyArr)){
                modelObj.update(requestOptions, createSuccess,transactionErrorCallback);
            } else{
               modelObj.update(requestOptions, createSuccess,transactionErrorCallback);
            }
     
   
    function createSuccess(res){
      
      var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
      var listController = INSTANCE.getFormController("successForm");
      var navObject = new kony.sdk.mvvm.NavigationObject();
      if(res.referenceId !==undefined)
        navObject.setCustomInfo("TransactionID","Reference ID:"+res.referenceId);
      else
        navObject.setCustomInfo("TransactionID","");
      listController.loadDataAndShowForm(navObject);
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