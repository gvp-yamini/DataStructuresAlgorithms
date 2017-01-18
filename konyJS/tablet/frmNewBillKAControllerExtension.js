/*
 * Controller Extension class for frmNewBillKA
 * Developer can edit the existing methods or can add new methods if required
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};

/**
 * Creates a new Form Controller Extension.
 * @class frmNewBillKAControllerExtension
 * @param {Object} controllerObj - Form Controller.
 */
kony.sdk.mvvm.frmNewBillKAControllerExtension = Class(kony.sdk.mvvm.BankingAppControllerExtension, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
    },
    /** 
     * This method is an entry point for all fetch related flows. Developer can edit.
     * Default implementation fetches data for the form based on form config 
     * @memberof frmNewBillKAControllerExtension#
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
     * @memberof frmNewBillKAControllerExtension#
     * @returns {Object} - processed data
     */
    processData: function(data) {
        try {
             
           var scopeObj = this;
           var processedData = this.$class.$superp.processData.call(this, data);
          //var  accPreviewData= kony.retailBanking.datastore.getAccountListObject().response;
          var  accPreviewData= kony.retailBanking.globalData.accounts.getAccountsData();
          if(accPreviewData !== null){
           var availableBal,currBal,outstandingBal;
           for(var i=0;i< accPreviewData.length;i++){
          // accPreviewData[i].accountName = kony.retailBanking.util.validation.trucateTo(accPreviewData[i].nickName,35,32,"...");
           if( accPreviewData[i]["nickName"]){
              accPreviewData[i].accountName = kony.retailBanking.util.validation.trucateTo( accPreviewData[i]["nickName"],35,32,"...");
           }else{
              var accountNumber =  accPreviewData[i]["accountID"];
              accPreviewData[i].accountName =   accPreviewData[i]["accountName"] + accountNumber.substring(accountNumber.length-4, accountNumber.length);
           }
         
            
           var accountType = accPreviewData[i]["accountType"];
           // availableBal = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accPreviewData[i].availableBalance); 
               
          // if(accPreviewData[i].accountType=="CreditCard"){
				// availableBal = "-"+availableBal;
                //  }
           if(accPreviewData[i]["availableBalance"]){
               availableBal = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accPreviewData[i]["availableBalance"],kony.retailBanking.globalData.globals.CurrencyCode);
           }
        
		   if(accPreviewData[i]["currentBalance"]){
				currBal = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accPreviewData[i]["currentBalance"],kony.retailBanking.globalData.globals.CurrencyCode);
		   }
				
		  if(accPreviewData[i]["outstandingBalance"]){
				outstandingBal = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(accPreviewData[i]["outstandingBalance"],kony.retailBanking.globalData.globals.CurrencyCode);
		   }
		 if(accPreviewData[i]["accountType"]=="CreditCard"){
				currBal = "-"+currBal;
		  }
				
		if (accountType === kony.retailBanking.globalData.globals.Checking){
			accPreviewData[i].availableBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: availableBal};
			accPreviewData[i].currentBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: currBal};
			accPreviewData[i].outstandingBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: outstandingBal};
			accPreviewData[i].flxClr= {skin:getSkinColor(accPreviewData[i].accountType)};
            accPreviewData[i]["availBalanView"] = i18n_availableBalance;
        } else if (accountType === kony.retailBanking.globalData.globals.Savings){
            accPreviewData[i].availableBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: availableBal};
            accPreviewData[i].currentBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: currBal};
            accPreviewData[i].outstandingBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: outstandingBal};       
            accPreviewData[i].flxClr= {skin:getSkinColor(accPreviewData[i].accountType)};
          accPreviewData[i]["availBalanView"] = i18n_availableBalance;
        } else if (accountType === kony.retailBanking.globalData.globals.CreditCard){
            accPreviewData[i].availableBalance= {skin :getSknlblAmountCredit(accPreviewData[i].accountType), text: availableBal};
            accPreviewData[i].currentBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: currBal};
            accPreviewData[i].outstandingBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: outstandingBal};
            accPreviewData[i].flxClr= {skin:getSkinColor(accPreviewData[i].accountType)};
            accPreviewData[i]["availBalanView"] = i18n_availableBalance;
        }else if (accountType === kony.retailBanking.globalData.globals.Deposit){
            accPreviewData[i].availableBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: availableBal};
            accPreviewData[i].currentBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: currBal};
            accPreviewData[i].outstandingBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: outstandingBal};
            accPreviewData[i].flxClr= {skin:getSkinColor(accPreviewData[i].accountType)};
            accPreviewData[i]["availBalanView"] = i18n_availableBalance;
        } else if (accountType == kony.retailBanking.globalData.globals.Mortgage){
           accPreviewData[i].availableBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: availableBal};
           accPreviewData[i].currentBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: currBal};
           accPreviewData[i].outstandingBalance= {skin :getSknlblAmount(accPreviewData[i].accountType), text: outstandingBal};
           accPreviewData[i].flxClr= {skin:getSkinColor(accPreviewData[i].accountType)};
            accPreviewData[i]["availBalanView"] = i18n_outStandingBalance;
        }
          accPreviewData[i].bankName= kony.retailBanking.util.validation.trucateTo(accPreviewData[i].bankName,35,32,"...");
        }
          //where currBal,availBal  amountAccount1 i:e;0.00 availBalnc,outsBlnc,currBlnc 
         frmNewBillKA.segInternalFromAccountsPayKA.widgetDataMap={
              nameAccount1:"accountName",
              amountAccount1:"availableBalance",
              typeAccount:"availBalanView",
              colorAccount1:"flxClr",
              lblBankName:"bankName"
                             };
          
                    
          var tempdata= getFilteredFromAccounts(accPreviewData);
          fromBilldatalength = tempdata.length;
          data.segInternalFromAccountsPayKA = tempdata[0];
          frmNewBillKA.segInternalFromAccountsPayKA.setData(tempdata);
          
          if(tempdata.length == 1){
          
                    onclicksegmentPay("from");

               frmNewBillKA.fromNamePick.text = tempdata[0]["accountName"];
               frmNewBillKA.lblFromAccountBankNameKA.text = tempdata[0]["bankName"];  
               var accountType2 = tempdata[0]["accountType"];
               var accountId = tempdata[0]["accountID"];

               if (accountType2 === kony.retailBanking.globalData.globals.Checking){
                   frmNewBillKA.amountAccountOne.text = i18n_availableBalance;
                   frmNewBillKA.fromAmountPick.text =tempdata[0]["availableBalance"].text;//kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(tempdata[0]["availableBalance"],kony.retailBanking.globalData.globals.CurrencyCode); //tempdata[0]["availableBalance"].text;
                   frmNewBillKA.fromAccountColorPick.skin = getSkinColor(accountType2); 
              } else if (accountType2 === kony.retailBanking.globalData.globals.Savings){
                   frmNewBillKA.amountAccountOne.text = i18n_availableBalance;
                   frmNewBillKA.fromAmountPick.text =tempdata[0]["availableBalance"].text;// kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(tempdata[0]["availableBalance"],kony.retailBanking.globalData.globals.CurrencyCode);//tempdata[0]["availableBalance"].text;
                   frmNewBillKA.fromAccountColorPick.skin = getSkinColor(accountType2);  
              } else if (accountType2 === kony.retailBanking.globalData.globals.CreditCard){
                   frmNewBillKA.amountAccountOne.text = i18n_availableBalance;
                   frmNewBillKA.fromAmountPick.text =tempdata[0]["availableBalance"].text;// kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(tempdata[0]["currentBalance"],kony.retailBanking.globalData.globals.CurrencyCode);
                   frmNewBillKA.fromAccountColorPick.skin = getSkinColor(accountType2); 
              }else if (accountType2 === kony.retailBanking.globalData.globals.Deposit){
                   frmNewBillKA.amountAccountOne.text = i18n_availableBalance;
                   frmNewBillKA.fromAmountPick.text = tempdata[0]["availableBalance"].text;//kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(tempdata[0]["currentBalance"],kony.retailBanking.globalData.globals.CurrencyCode);
                   frmNewBillKA.fromAccountColorPick.skin = getSkinColor(accountType2); 
              } 
              else if (accountType2 == kony.retailBanking.globalData.globals.Mortgage){
                   frmNewBillKA.amountAccountOne.text = i18n_outStandingBalance;
                   frmNewBillKA.fromAmountPick.text = tempdata[0]["outstandingBalance"].text;//kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(tempdata[0]["outstandingBalance"],kony.retailBanking.globalData.globals.CurrencyCode);
                   frmNewBillKA.fromAccountColorPick.skin = getSkinColor(accountType2); 
              }
             frmNewBillKA.fromlblAccountNumberKA.text = tempdata[0]["accountID"];
         } 
        }else{
          
          //frmNewBillKA.fromCardInner.width="94%"; 
           frmNewBillKA.fromCardInner.opacity=1;
          frmNewBillKA.fromCardTitle.opacity=1;
          frmNewBillKA.LabelNoRecordsKA.isVisible="true";
          frmNewBillKA.AccountPick.opacity=0;
        }
          return accountListPayee(processedData,"segInternalTOAccountsPayKA");
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
     * @memberof frmNewBillKAControllerExtension#
     */
    bindData: function(data) {
        try {
            var formmodel = this.getController().getFormModel();
            formmodel.clear();
            this.$class.$superp.bindData.call(this, data);
            this.getController().getFormModel().formatUI();
            var currForm = kony.application.getPreviousForm().id;
			var thisForm = kony.application.getCurrentForm().id;
          	var navObject = this.getController().getContextData();
			var selectedRecord = navObject.getCustomInfo("SelPayee");
             if(currForm == "frmAddNewPayeeKA"){
                 var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
                 var controller = INSTANCE.getFormController("frmAddNewPayeeKA");
                 var controllerContextData = controller.getContextData();
                 if(controllerContextData && controllerContextData.getCustomInfo("payeeObject")){
                     var payeeObject = controllerContextData.getCustomInfo("payeeObject");
                     frmNewBillKA.fromCardTitle.setVisibility(true);
                     frmNewBillKA.fromCardInner.setVisibility(true);
  		             frmNewBillKA.fromAccountPick.setVisibility(false);
                     
                     frmNewBillKA.toCardTitle.setVisibility(false);
                     frmNewBillKA.toCardInner.setVisibility(false);
                     frmNewBillKA.toAccountPick.setVisibility(true);

                     frmNewBillKA.fromCard.setVisibility(true);
                     frmNewBillKA.toCard.setVisibility(true);

                     frmNewBillKA.amountCard.setVisibility(true);
                     frmNewBillKA.dateCard.setVisibility(true);
                     frmNewBillKA.editToCard.setVisibility(true);
                    
                     
                     frmNewBillKA.toNamePick.text = payeeObject["payeeNickname"];
                     var payeeId = payeeObject["payeeId"];
                     frmNewBillKA.tolblAccountNumberKA.text = payeeId;
                 }
             }
				else if(selectedRecord !== undefined && selectedRecord.type == "repeat")
				{
				  formmodel.setViewAttributeByProperty("fromCardInner","isVisible",true);
				  formmodel.setViewAttributeByProperty("fromAccountPick","isVisible",false);
				  formmodel.setViewAttributeByProperty("toCardTitle","isVisible",false);
				  formmodel.setViewAttributeByProperty("toCardInner","isVisible",false);
				  formmodel.setViewAttributeByProperty("toAccountPick","isVisible",true);
				  formmodel.setViewAttributeByProperty("editToCard","isVisible",false);
				  setDateFormatforNewBillPay();
				  formmodel.setViewAttributeByProperty("lblCurrencyType","text",kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount("",kony.retailBanking.globalData.globals.CurrencyCode));
				  formmodel.setViewAttributeByProperty("fromlblAccountNumberKA","text",selectedRecord.accountNumber);
				  formmodel.setViewAttributeByProperty("toNamePick","text",selectedRecord.payeeNickName);
				  var payeeId = selectedRecord.payeeId;
				  formmodel.setViewAttributeByProperty("tolblAccountNumberKA","text",payeeId);
				}
            setDateFormatforPaybill();
         	 SetPaybillPrefereedAccount();
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
     * @memberof frmNewBillKAControllerExtension#
     */
    saveData: function() {
        try {
            var scopeObj = this;
            var dataMap = this.getRecordsDataMap.call(this);
          	navigateToPayBillConfirmPageTablet(dataMap);
          	kony.retailBanking.globalData.transfersData.setTransfersDataMap(dataMap);
            //this.$class.$superp.saveData.call(this, success, error);
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
  saveTransferData: function() {
     successFormPreShow();
     successForm.show();
     successFormanimationShow();
      var record = kony.retailBanking.globalData.transfersData.getTransfersDataMap();
      record[0].scheduledDate = kony.retailBanking.util.formatingDate.getDBDateTimeFormat(frmNewBillKA.calDateKA.dateComponents,"00:00");
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
                modelObj.create(requestOptions, createSuccess,transactionErrorCallback);
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
   kony.sdk.mvvm.log.info("success saving record ", res);
    }
     
  },
    /** 
     * This method is entry point for delete/remove flow. Developer can edit.
     * Default implementation deletes the entity record displayed in form (primary keys are needed)
     * @memberof frmNewBillKAControllerExtension#
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
     * @memberof frmNewBillKAControllerExtension#
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