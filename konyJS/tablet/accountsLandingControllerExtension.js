/*
 * Controller Extension class for accountsLanding
 * Developer can edit the existing methods or can add new methods if required
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};

/**
 * Creates a new Form Controller Extension.
 * @class accountsLandingControllerExtension
 * @param {Object} controllerObj - Form Controller.
 */
kony.sdk.mvvm.accountsLandingControllerExtension = Class(kony.sdk.mvvm.BankingAppControllerExtension, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
    },
    /** 
     * This method is an entry point for all fetch related flows. Developer can edit.
     * Default implementation fetches data for the form based on form config 
     * @memberof accountsLandingControllerExtension#
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
             fetchAllCompanies();
             fetchcashFlowData();
             var currentdate = new Date(); 
             var time = currentdate.timeNow();
             kony.retailBanking.globalData.globals.refreshTimeLabel = kony.i18n.getLocalizedString("i18n.overview.asOfToday")+" - "+time;
             accountsLanding.accountDetailsTime.text = kony.retailBanking.globalData.globals.refreshTimeLabel;
             var navigationObject = this.getController() && this.getController().getContextData();
             navigationObject.setCustomInfo("segAccountInfoData",response.segAccountInfoData);  
             kony.retailBanking.datastore.setAccountListObject(response.segAccountInfoData);
           
             var Cash = 0,CreditDebt = 0;
             var tempResponse = response.segAccountInfoData;
             for(var i =0 ; i< tempResponse.length;i++){
               if(tempResponse[i]["accountType"]==kony.retailBanking.globalData.globals.Savings||tempResponse[i]["accountType"]==kony.retailBanking.globalData.globals.Checking||tempResponse[i]["accountType"]==kony.retailBanking.globalData.globals.Deposit){
                 Cash = Cash + parseFloat(tempResponse[i]["currentBalance"]);
               }else if(tempResponse[i]["accountType"]==kony.retailBanking.globalData.globals.CreditCard||tempResponse[i]["accountType"]==kony.retailBanking.globalData.globals.Mortgage){
                 CreditDebt = CreditDebt + parseFloat(tempResponse[i]["currentBalance"]);
               }
             }
			 Cash = Cash.toFixed(2);
             CreditDebt = CreditDebt.toFixed(2);
             accountsLanding.cashOverviewLabel.text = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(Cash);
             accountsLanding.creditDebtOverviewLabel.text = "-"+kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(CreditDebt);
             kony.retailBanking.globalData.accounts.setAccountsData(response.segAccountInfoData);
			 var encryptionAcntObj = JSON.parse(JSON.stringify(response.segAccountInfoData));
             kony.retailBanking.datastore.setEncryptionObj(encryptionAcntObj);
             var formattedResponse = scopeObj.getController().processData(response);
             scopeObj.bindData(formattedResponse);
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
     * @memberof accountsLandingControllerExtension#
     * @returns {Object} - processed data
     */
    processData: function(data) {
        try {
            var scopeObj = this;
            var processedData = this.$class.$superp.processData.call(this, data);
            //this.getController().bindData(processedData);
            //return processedData;
           return accountListsetting(processedData,"segAccountInfoData");
          
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
     * @memberof accountsLandingControllerExtension#
     */
    bindData: function(data) {
        try {
            if(accountsLanding.accountTransactionWrapper){
             accountsLanding.remove(accountsLanding.accountTransactionWrapper);
            }
           if(accountsLanding.flxAccountStatementsKA){
             accountsLanding.remove(accountsLanding.flxAccountStatementsKA);
            }
            if(accountsLanding.recentTransactionWrapper){
             accountsLanding.remove(accountsLanding.recentTransactionWrapper); 
            }
            if(accountsLanding.accountInfoWrapper){
              accountsLanding.remove(accountsLanding.accountInfoWrapper); 
            }
            if(accountsLanding.accountInfoEditWrapper){
              accountsLanding.remove(accountsLanding.accountInfoEditWrapper); 
            }
            if(accountsLanding.accountDetailWrapper && !accountsLanding.accountTransactionWrapper && !accountsLanding.flxAccountStatementsKA && !accountsLanding.scheduledTransactionWrapper && !accountsLanding.recentTransactionWrapper){
              accountsLanding.remove(accountsLanding.accountDetailWrapper);
              accountsLanding.leftWrapper.left =0;
              accountsLanding.rightWrapper.left=42;
               accountsLanding.rightWrapper.opacity =1;
            }
          	if (!kony.retailBanking.AreaChartGenereted) {
            	fetchAllTransactions();
            }
            else if( !(accountsLanding.chartid) && !(accountsLanding.linechartid) ){
              var AreaChart = createChartWidget();
              accountsLanding.insightsGraph1.add(AreaChart);
              var lineChart = line_createChartWidget();
              accountsLanding.insightsGraph2.add(lineChart);
            }
       		
            var formmodel = this.getController().getFormModel();
            formmodel.clear();
            if(data["segAccountInfoData"]["segAccountInfoData"].getData() && data["segAccountInfoData"]["segAccountInfoData"].getData().length > 0){		 
              formmodel.setViewAttributeByProperty("segAccountInfoData","isVisible",true);
    		  formmodel.setViewAttributeByProperty("LabelNoRecordsKA","isVisible",false);
         	}else{
              formmodel.setViewAttributeByProperty("segAccountInfoData","isVisible",false);
    	      formmodel.setViewAttributeByProperty("LabelNoRecordsKA","isVisible",true);
		    }
            this.$class.$superp.bindData.call(this, data);
            this.getController().getFormModel().formatUI();
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            formmodel.showView();
            accountsLanding.leftWrapper.forceLayout();
            accountsLanding.rightWrapper.forceLayout();
            accountsLanding.insightsGraph2.forceLayout();
            accountsLanding.insightsGraph1.forceLayout();
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
     * @memberof accountsLandingControllerExtension#
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
     * @memberof accountsLandingControllerExtension#
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
     * @memberof accountsLandingControllerExtension#
     */
    showForm: function() {
        try {
            var formmodel = this.getController().getFormModel();
            formmodel.showView();
        } catch (e) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SHOWFORM_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SHOWFORM_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    },
  	navigateToAccountsDetails: function(){
       setRightContainer();
      navigateToDetails("accountsLanding","accountDetail","segAccountInfoData");
      retainSelectionOn("segAccountInfoData"); 
  },
  getTransactionDetails: function(){
       //setRightContainer();
       navigateToTransactionDetailsAccountsTablet("accountsLanding","accountTransactionDetails","transactionSegment");
    retainSelectionOn("transactionSegment");
                },
  
  getAccountStatementList: function(){ 
      var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
      var controller = INSTANCE.getFormController("accountsLanding");
      var navObject = new kony.sdk.mvvm.NavigationObject();
      var AccountDetailscontroller = INSTANCE.getFormController("accountDetail");
      var controllerContextData = AccountDetailscontroller.getContextData();
      if( controllerContextData && controllerContextData.getCustomInfo("selectedAccountObj")){
          var accountData = controllerContextData.getCustomInfo("selectedAccountObj");
          var accountId = accountData["accountID"];
          navObject.setRequestOptions("segAccountStatementsKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"accountID": accountId}});
          controller.performAction("navigateTo",["frmAccountStatementsKA",navObject]);
      }
    },
     CheckReOrderSave: function() {
        try {
	   		try {
            var scopeObj = this;
            var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
            var options ={
                    "access": "online",
                    "objectName": "RBObjects"
                 };
            var serviceName = "RBObjects";
            var formEntity = "CheckOrder";
            var modelObj = INSTANCE.getModel(formEntity,serviceName,options);
            var headers = {"session_token":kony.retailBanking.globalData.session_token};
			var record = {};
            record["accountID"] = moreLanding.accountId.text;
            record["leafCount"] = moreLanding.lblNumberOfLeafletsVal.text;
            record["name"] = moreLanding.lblaccountNameKA.text;
            record["postboxNumber"] = moreLanding.lblPostBoxNumberKA.text;
            record["state"] = moreLanding.lblStreetK.text;
            record["country"] = moreLanding.lblZipCodeK.text;
            record["zipcode"] = moreLanding.CopylblZipCodeKA0bcd5e742ad7a42.text;
            var dataObject = new kony.sdk.dto.DataObject(formEntity,record);
            
			var requestOptions = {"dataObject":dataObject, "headers":headers};
                                                                                    
                modelObj.create(requestOptions, success, error);
          
        } catch (err) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
        } catch (err) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

        function success(res) {
            //Successfully created record
            kony.sdk.mvvm.log.info("success saving record ", res);
            closeModal("flxCheckReorderDetailsKA",frmCheckReorderConfirmationKA);
            openModal(frmCheckReOrderSuccessKA.flxCheckReorderDetailsKA, "flxCheckReorderDetailsKA");
        }

        function error(err) {
            //Handle error case
            kony.sdk.mvvm.log.error("In saveData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

    },
  getAccountInfoDetails: function(){
       navigateToAccInfo("accountDetail","accountInfo");
   },
  getAccountInfoEdit: function(){
  //openModal(accountInfoEdit.accountInfoEditWrapper, "accountInfoEditWrapper");
  navigateToAccInfoEdit("accountInfo","accountInfoEdit");
   },
  accountNameSave: function(){
     var scopeObj = this;
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("accountDetail");
    var controllerContextData = controller.getContextData();
    if( controllerContextData && controllerContextData.getCustomInfo("selectedAccountObj")){
          var accountData = controllerContextData.getCustomInfo("selectedAccountObj");
          var accountId = accountData["accountID"];
    }
    var options ={    "access": "online",
                  "objectName": "RBObjects"
                 };
    var headers = {"session_token":kony.retailBanking.globalData.session_token};
    var serviceName = "RBObjects";
    var modelObj = INSTANCE.getModel("Accounts",serviceName,options);
    var record = {};
    record["nickName"] = accountsLanding.accountNicknameTextfield1.text;
    record["accountID"] = accountId;
    var dataObject = new kony.sdk.dto.DataObject("Accounts",record);
    var requestOptions = {"dataObject":dataObject, "headers":headers};
    modelObj.update(requestOptions, updateSuccess, customErrorCallback);
    function updateSuccess(res){
      closeModal("accountInfoEditWrapper",accountInfoEdit);
      closeModal("accountInfoWrapper",accountInfo);
     // alert("Successfully created record");
     scopeObj.getController().fetchData();
     kony.sdk.mvvm.log.info("success saving record ", res);
    }
    function  customErrorCallback(){
      customErrorCallback();
    }
  }
});

Date.prototype.timeNow = function () {
	return ((this.getHours() < 10) ? "0" : "") + ((this.getHours() > 12) ? (this.getHours() - 12) : this.getHours()) + ":" + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes() + ((this.getHours() > 12) ? (' PM') : ' AM');
};

