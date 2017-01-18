/*
 * Controller Extension class for frmConfirmBillPaymentKA
 * Developer can edit the existing methods or can add new methods if required
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.frmConfirmBillPaymentKAControllerExtension = Class(kony.sdk.mvvm.BankingAppControllerExtension, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
    },
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
    bindData: function(data) {
        try {
            var formmodel = this.getController().getFormModel();
            formmodel.clear();
            this.$class.$superp.bindData.call(this, data);
            this.getController().getFormModel().formatUI();
            var controllerContextData = this.getController().getContextData();
            if(controllerContextData && controllerContextData.getCustomInfo("payBillObject")){
              var payBillObject = controllerContextData.getCustomInfo("payBillObject");
              var accountdata = new kony.sdk.mvvm.Data(payBillObject["fromAccountID"],payBillObject["fromAccountNickName"]);        
              formmodel.setWidgetData("lblFromAccValKA", accountdata);
               var payeedata = new kony.sdk.mvvm.Data(payBillObject["PayeeId"],payBillObject["PayeeNickName"]);        
              formmodel.setWidgetData("lblToAccValKA", payeedata);
              if(payBillObject["amountTransfered"]){
              var amount = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(payBillObject["amountTransfered"]);
              var amountdata = new kony.sdk.mvvm.Data(payBillObject["amountTransfered"],amount);        
              }else{
                var amount = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(payBillObject["amount"]);
              var amountdata = new kony.sdk.mvvm.Data(payBillObject["amount"],amount); 
              }
              formmodel.setWidgetData("lblAmountValKA", amountdata);
              formmodel.setWidgetData("transactionTypeKA", kony.retailBanking.globalData.globals.PayBill);
              var selectedScheduledDate = payBillObject["calDateKA"];
      var formattedDate = this.getDateStringPayBill(selectedScheduledDate);       
	  var scheduledDate2 = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(formattedDate);
	  var dbDate = kony.retailBanking.util.formatingDate.getDBDateTimeFormat(selectedScheduledDate,"00:00");
	     var date = new kony.sdk.mvvm.Data(dbDate,scheduledDate2);
         formmodel.setWidgetData("lblDateValKA", date);
         formmodel.setWidgetData("lblNotesValKA", payBillObject["Notes"]);
            }
          
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            formmodel.showView();
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
            var navObject = scopeObj.getController().getContextData();
             if(res.referenceId){
      				 frmPayBillSuccessKA.lblTransactionID.text = res.referenceId;
      			}else{
      				 frmPayBillSuccessKA.lblTransactionID.text = res.transactionId;
      			}
            frmPayBillSuccessKA.show();
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
  getDateStringPayBill : function(selectedScheduledDate){             
      var month,month1;
      var day,day1;
      var day = parseInt(selectedScheduledDate[0]);
      var  month = parseInt(selectedScheduledDate[1]);
      if(month <10){
        month = "0"+month;
      }
      if(day <10){
        day = "0"+day;
      }
      var formattedDate = selectedScheduledDate[2]+"-"+month+"-"+day;
      return formattedDate;
  }
});