/*
 * Controller Extension class for frmAccountsLandingKA
 * Developer can edit the existing methods or can add new methods if required
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.frmAccountsLandingKAControllerExtension = Class(kony.sdk.mvvm.BankingAppControllerExtension, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
    },
    fetchData: function() {
        try {
            var scopeObj = this;
            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Loading Form");
            /* if(kony.retailBanking.globalData.globals.DoReloadEditAccountInfo){
                 kony.retailBanking.globalData.globals.DoReloadEditAccountInfo = false;
                 this.$class.$superp.fetchData.call(this, success, error);
             }else{
                var formmodel = this.getController().getFormModel();
                formmodel.showView();
             }*/
                 kony.retailBanking.globalData.globals.DoReloadEditAccountInfo = false;
                  kony.print("Perf Log: Account fetch service call - start");
				 this.$class.$superp.fetchData.call(this, success, error);
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

        function success(response) {
			 kony.print("Perf Log: Account fetch service call - End");
            kony.sdk.mvvm.log.info("success fetching data ", response); 
            fetchAllCompanies();
            var currentdate = new Date(); 
            var time = currentdate.timeNow();
            kony.retailBanking.globalData.globals.refreshTimeLabel = i18n_asOfToday+" - "+time;
            var navigationObject = this.getController() && this.getController().getContextData();
            navigationObject.setCustomInfo("segAccountsKA",response.segAccountsKA);
            kony.retailBanking.datastore.setAccountListObject(response.segAccountsKA);
            var Cash = 0,CreditDebt = 0;
            var tempResponse = response.segAccountsKA;
            for(var i =0 ; i< tempResponse.length;i++){
              if(tempResponse[i]["accountType"]==kony.retailBanking.globalData.globals.Savings||tempResponse[i]["accountType"]==kony.retailBanking.globalData.globals.Checking){
                Cash = Cash + parseFloat(tempResponse[i]["availableBalance"]);
              }else if(tempResponse[i]["accountType"]==kony.retailBanking.globalData.globals.CreditCard||tempResponse[i]["accountType"]==kony.retailBanking.globalData.globals.Mortgage){
                CreditDebt = CreditDebt + parseFloat(tempResponse[i]["currentBalance"]);
              }
            }
            Cash = Cash.toFixed(2);
            CreditDebt = CreditDebt.toFixed(2);
            frmAccountsLandingKA.cashOverviewLabel.text = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(Cash);
            frmAccountsLandingKA.creditDebtOverviewLabel.text = "-"+kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(CreditDebt);
            kony.retailBanking.globalData.accounts.setAccountsData(response.segAccountsKA);
            var encryptionAcntObj = JSON.parse(JSON.stringify(response.segAccountsKA));
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
    processData: function(data) {
        try {
            var scopeObj = this;
            var processedData = this.$class.$superp.processData.call(this, data);
            return accountListsetting(processedData,"segAccountsKA");
            //return processedData;
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in processData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_PROCESSDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_PROCESSDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    },
    bindData: function(data) {
        try {
            if (!kony.retailBanking.AreaChartGenereted) {
            fetchAllTransactions();
            }
            var formmodel = this.getController().getFormModel();
            formmodel.clear();
            if(data["segAccountsKA"]["segAccountsKA"].getData() && data["segAccountsKA"]["segAccountsKA"].getData().length > 0){		 
              formmodel.setViewAttributeByProperty("segAccountsKA","isVisible",true);
    		  formmodel.setViewAttributeByProperty("LabelNoRecordsKA","isVisible",false);
         	}else{
              formmodel.setViewAttributeByProperty("segAccountsKA","isVisible",false);
    	      formmodel.setViewAttributeByProperty("LabelNoRecordsKA","isVisible",true);
		    }
            this.$class.$superp.bindData.call(this, data);
            this.getController().getFormModel().formatUI();
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            formmodel.showView();
			kony.print("Perf Log: account prview dashboard- End");
            if(kony.retailBanking.globalData.deviceInfo.isIphone()){
             registerForPeekAndPop();
            } 
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in bindData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

    },
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
    navigateTo: function(formId, navObject){
    	this.$class.$superp.navigateTo.call(this, formId, navObject);
    },
  navigateToAccountsDetails: function(){
    navigateToDetails("frmAccountsLandingKA","frmAccountDetailKA","segAccountsKA");
  }
});

Date.prototype.timeNow = function () {
	return ((this.getHours() < 10) ? "0" : "") + ((this.getHours() > 12) ? (this.getHours() - 12) : this.getHours()) + ":" + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes() + ((this.getHours() > 12) ? (' PM') : ' AM');
};
