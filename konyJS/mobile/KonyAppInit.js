kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.initApplicationForms = function(appContext) {
    try {
        kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("");
		//frmAccountsLandingKA
        var frmAccountsLandingKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmAccountsLandingKAConfig);
        var frmAccountsLandingKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmAccountsLandingKAController", appContext, frmAccountsLandingKAModelConfigObj);
        var frmAccountsLandingKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmAccountsLandingKAControllerExtension", frmAccountsLandingKAControllerObj);
        frmAccountsLandingKAControllerObj.setControllerExtensionObject(frmAccountsLandingKAControllerExtObj);
        var frmAccountsLandingKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmAccountsLandingKAFormModel", frmAccountsLandingKAControllerObj);
        var frmAccountsLandingKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmAccountsLandingKAFormModelExtension", frmAccountsLandingKAFormModelObj);
        frmAccountsLandingKAFormModelObj.setFormModelExtensionObj(frmAccountsLandingKAFormModelExtObj);
        appContext.setFormController("frmAccountsLandingKA", frmAccountsLandingKAControllerObj);
		
		//frmAccountDetailKA
		 var frmAccountDetailKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmAccountDetailKAConfig);
        var frmAccountDetailKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmAccountDetailKAController", appContext, frmAccountDetailKAModelConfigObj);
        var frmAccountDetailKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmAccountDetailKAControllerExtension", frmAccountDetailKAControllerObj);
        frmAccountDetailKAControllerObj.setControllerExtensionObject(frmAccountDetailKAControllerExtObj);
        var frmAccountDetailKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmAccountDetailKAFormModel", frmAccountDetailKAControllerObj);
        var frmAccountDetailKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmAccountDetailKAFormModelExtension", frmAccountDetailKAFormModelObj);
        frmAccountDetailKAFormModelObj.setFormModelExtensionObj(frmAccountDetailKAFormModelExtObj);
        appContext.setFormController("frmAccountDetailKA", frmAccountDetailKAControllerObj);
		
       //TransferLanding
		var frmTransferPayLandingKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmTransferPayLandingKAConfig);
        var frmTransferPayLandingKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmTransferPayLandingKAController", appContext, frmTransferPayLandingKAModelConfigObj);
        var frmTransferPayLandingKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmTransferPayLandingKAControllerExtension", frmTransferPayLandingKAControllerObj);
        frmTransferPayLandingKAControllerObj.setControllerExtensionObject(frmTransferPayLandingKAControllerExtObj);
        var frmTransferPayLandingKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmTransferPayLandingKAFormModel", frmTransferPayLandingKAControllerObj);
        var frmTransferPayLandingKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmTransferPayLandingKAFormModelExtension", frmTransferPayLandingKAFormModelObj);
        frmTransferPayLandingKAFormModelObj.setFormModelExtensionObj(frmTransferPayLandingKAFormModelExtObj);
        appContext.setFormController("frmTransferPayLandingKA", frmTransferPayLandingKAControllerObj);
		
		//AccountInfo 
        var frmAccountInfoKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmAccountInfoKAConfig);
        var frmAccountInfoKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmAccountInfoKAController", appContext, frmAccountInfoKAModelConfigObj);
        var frmAccountInfoKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmAccountInfoKAControllerExtension", frmAccountInfoKAControllerObj);
        frmAccountInfoKAControllerObj.setControllerExtensionObject(frmAccountInfoKAControllerExtObj);
        var frmAccountInfoKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmAccountInfoKAFormModel", frmAccountInfoKAControllerObj);
        var frmAccountInfoKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmAccountInfoKAFormModelExtension", frmAccountInfoKAFormModelObj);
        frmAccountInfoKAFormModelObj.setFormModelExtensionObj(frmAccountInfoKAFormModelExtObj);
        appContext.setFormController("frmAccountInfoKA", frmAccountInfoKAControllerObj);
		
		//frmAccountInfoEditKA
        var frmAccountInfoEditKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmAccountInfoEditKAConfig);
        var frmAccountInfoEditKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmAccountInfoEditKAController", appContext, frmAccountInfoEditKAModelConfigObj);
        var frmAccountInfoEditKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmAccountInfoEditKAControllerExtension", frmAccountInfoEditKAControllerObj);
        frmAccountInfoEditKAControllerObj.setControllerExtensionObject(frmAccountInfoEditKAControllerExtObj);
        var frmAccountInfoEditKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmAccountInfoEditKAFormModel", frmAccountInfoEditKAControllerObj);
        var frmAccountInfoEditKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmAccountInfoEditKAFormModelExtension", frmAccountInfoEditKAFormModelObj);
        frmAccountInfoEditKAFormModelObj.setFormModelExtensionObj(frmAccountInfoEditKAFormModelExtObj);
        appContext.setFormController("frmAccountInfoEditKA", frmAccountInfoEditKAControllerObj);
		
	    //New Transfers
		 var frmNewTransferKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmNewTransferKAConfig);
        var frmNewTransferKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmNewTransferKAController", appContext, frmNewTransferKAModelConfigObj);
        var frmNewTransferKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmNewTransferKAControllerExtension", frmNewTransferKAControllerObj);
        frmNewTransferKAControllerObj.setControllerExtensionObject(frmNewTransferKAControllerExtObj);
        var frmNewTransferKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmNewTransferKAFormModel", frmNewTransferKAControllerObj);
        var frmNewTransferKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmNewTransferKAFormModelExtension", frmNewTransferKAFormModelObj);
        frmNewTransferKAFormModelObj.setFormModelExtensionObj(frmNewTransferKAFormModelExtObj);
        appContext.setFormController("frmNewTransferKA", frmNewTransferKAControllerObj);
       
	   //TransferLanding Details
		var frmRecentTransactionDetailsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmRecentTransactionDetailsKAConfig);
        var frmRecentTransactionDetailsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmRecentTransactionDetailsKAController", appContext, frmRecentTransactionDetailsKAModelConfigObj);
        var frmRecentTransactionDetailsKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmRecentTransactionDetailsKAControllerExtension", frmRecentTransactionDetailsKAControllerObj);
        frmRecentTransactionDetailsKAControllerObj.setControllerExtensionObject(frmRecentTransactionDetailsKAControllerExtObj);
        var frmRecentTransactionDetailsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmRecentTransactionDetailsKAFormModel", frmRecentTransactionDetailsKAControllerObj);
        var frmRecentTransactionDetailsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmRecentTransactionDetailsKAFormModelExtension", frmRecentTransactionDetailsKAFormModelObj);
        frmRecentTransactionDetailsKAFormModelObj.setFormModelExtensionObj(frmRecentTransactionDetailsKAFormModelExtObj);
        appContext.setFormController("frmRecentTransactionDetailsKA", frmRecentTransactionDetailsKAControllerObj);

             //Cofirm Transfer
        var frmConfirmTransferKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmConfirmTransferKAConfig);
        var frmConfirmTransferKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmConfirmTransferKAController", appContext, frmConfirmTransferKAModelConfigObj);
        var frmConfirmTransferKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmConfirmTransferKAControllerExtension", frmConfirmTransferKAControllerObj);
        frmConfirmTransferKAControllerObj.setControllerExtensionObject(frmConfirmTransferKAControllerExtObj);
        var frmConfirmTransferKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmConfirmTransferKAFormModel", frmConfirmTransferKAControllerObj);
        var frmConfirmTransferKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmConfirmTransferKAFormModelExtension", frmConfirmTransferKAFormModelObj);
        frmConfirmTransferKAFormModelObj.setFormModelExtensionObj(frmConfirmTransferKAFormModelExtObj);
        appContext.setFormController("frmConfirmTransferKA", frmConfirmTransferKAControllerObj);
      
      //frmUserSettingsEditUsernameKA
        var frmUserSettingsEditUsernameKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmUserSettingsEditUsernameKAConfig);
        var frmUserSettingsEditUsernameKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmUserSettingsEditUsernameKAController", appContext, frmUserSettingsEditUsernameKAModelConfigObj);
        var frmUserSettingsEditUsernameKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmUserSettingsEditUsernameKAControllerExtension", frmUserSettingsEditUsernameKAControllerObj);
        frmUserSettingsEditUsernameKAControllerObj.setControllerExtensionObject(frmUserSettingsEditUsernameKAControllerExtObj);
        var frmUserSettingsEditUsernameKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmUserSettingsEditUsernameKAFormModel", frmUserSettingsEditUsernameKAControllerObj);
        var frmUserSettingsEditUsernameKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmUserSettingsEditUsernameKAFormModelExtension", frmUserSettingsEditUsernameKAFormModelObj);
        frmUserSettingsEditUsernameKAFormModelObj.setFormModelExtensionObj(frmUserSettingsEditUsernameKAFormModelExtObj);
        appContext.setFormController("frmUserSettingsEditUsernameKA", frmUserSettingsEditUsernameKAControllerObj);
      
      //frmUserSettingsUsernameKA
       	var frmUserSettingsUsernameKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmUserSettingsUsernameKAConfig);
        var frmUserSettingsUsernameKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmUserSettingsUsernameKAController", appContext, frmUserSettingsUsernameKAModelConfigObj);
        var frmUserSettingsUsernameKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmUserSettingsUsernameKAControllerExtension", frmUserSettingsUsernameKAControllerObj);
        frmUserSettingsUsernameKAControllerObj.setControllerExtensionObject(frmUserSettingsUsernameKAControllerExtObj);
        var frmUserSettingsUsernameKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmUserSettingsUsernameKAFormModel", frmUserSettingsUsernameKAControllerObj);
        var frmUserSettingsUsernameKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmUserSettingsUsernameKAFormModelExtension", frmUserSettingsUsernameKAFormModelObj);
        frmUserSettingsUsernameKAFormModelObj.setFormModelExtensionObj(frmUserSettingsUsernameKAFormModelExtObj);
        appContext.setFormController("frmUserSettingsUsernameKA", frmUserSettingsUsernameKAControllerObj);
      
	//AccountStatement
	    var frmacntstatementsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmacntstatementsKAConfig);
        var frmacntstatementsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmacntstatementsKAController", appContext, frmacntstatementsKAModelConfigObj);
        var frmacntstatementsKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmacntstatementsKAControllerExtension", frmacntstatementsKAControllerObj);
        frmacntstatementsKAControllerObj.setControllerExtensionObject(frmacntstatementsKAControllerExtObj);
        var frmacntstatementsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmacntstatementsKAFormModel", frmacntstatementsKAControllerObj);
        var frmacntstatementsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmacntstatementsKAFormModelExtension", frmacntstatementsKAFormModelObj);
        frmacntstatementsKAFormModelObj.setFormModelExtensionObj(frmacntstatementsKAFormModelExtObj);
        appContext.setFormController("frmacntstatementsKA", frmacntstatementsKAControllerObj);
		
		//UserSettingsEditPasswordKA
		var frmUserSettingsEditPasswordKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmUserSettingsEditPasswordKAConfig);
        var frmUserSettingsEditPasswordKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmUserSettingsEditPasswordKAController", appContext, frmUserSettingsEditPasswordKAModelConfigObj);
        var frmUserSettingsEditPasswordKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmUserSettingsEditPasswordKAControllerExtension", frmUserSettingsEditPasswordKAControllerObj);
        frmUserSettingsEditPasswordKAControllerObj.setControllerExtensionObject(frmUserSettingsEditPasswordKAControllerExtObj);
        var frmUserSettingsEditPasswordKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmUserSettingsEditPasswordKAFormModel", frmUserSettingsEditPasswordKAControllerObj);
        var frmUserSettingsEditPasswordKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmUserSettingsEditPasswordKAFormModelExtension", frmUserSettingsEditPasswordKAFormModelObj);
        frmUserSettingsEditPasswordKAFormModelObj.setFormModelExtensionObj(frmUserSettingsEditPasswordKAFormModelExtObj);
        appContext.setFormController("frmUserSettingsEditPasswordKA", frmUserSettingsEditPasswordKAControllerObj);
      
      //frmUserSettingsEditPersonalDetailsKA
        var frmUserSettingsEditPersonalDetailsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmUserSettingsEditPersonalDetailsKAConfig);
        var frmUserSettingsEditPersonalDetailsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmUserSettingsEditPersonalDetailsKAController", appContext, frmUserSettingsEditPersonalDetailsKAModelConfigObj);
        var frmUserSettingsEditPersonalDetailsKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmUserSettingsEditPersonalDetailsKAControllerExtension", frmUserSettingsEditPersonalDetailsKAControllerObj);
        frmUserSettingsEditPersonalDetailsKAControllerObj.setControllerExtensionObject(frmUserSettingsEditPersonalDetailsKAControllerExtObj);
        var frmUserSettingsEditPersonalDetailsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmUserSettingsEditPersonalDetailsKAFormModel", frmUserSettingsEditPersonalDetailsKAControllerObj);
        var frmUserSettingsEditPersonalDetailsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmUserSettingsEditPersonalDetailsKAFormModelExtension", frmUserSettingsEditPersonalDetailsKAFormModelObj);
        frmUserSettingsEditPersonalDetailsKAFormModelObj.setFormModelExtensionObj(frmUserSettingsEditPersonalDetailsKAFormModelExtObj);
        appContext.setFormController("frmUserSettingsEditPersonalDetailsKA", frmUserSettingsEditPersonalDetailsKAControllerObj);
      
      //frmUserSettingsPersonalDetailsKA
        var frmUserSettingsPersonalDetailsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmUserSettingsPersonalDetailsKAConfig);
        var frmUserSettingsPersonalDetailsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmUserSettingsPersonalDetailsKAController", appContext, frmUserSettingsPersonalDetailsKAModelConfigObj);
        var frmUserSettingsPersonalDetailsKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmUserSettingsPersonalDetailsKAControllerExtension", frmUserSettingsPersonalDetailsKAControllerObj);
        frmUserSettingsPersonalDetailsKAControllerObj.setControllerExtensionObject(frmUserSettingsPersonalDetailsKAControllerExtObj);
        var frmUserSettingsPersonalDetailsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmUserSettingsPersonalDetailsKAFormModel", frmUserSettingsPersonalDetailsKAControllerObj);
        var frmUserSettingsPersonalDetailsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmUserSettingsPersonalDetailsKAFormModelExtension", frmUserSettingsPersonalDetailsKAFormModelObj);
        frmUserSettingsPersonalDetailsKAFormModelObj.setFormModelExtensionObj(frmUserSettingsPersonalDetailsKAFormModelExtObj);
        appContext.setFormController("frmUserSettingsPersonalDetailsKA", frmUserSettingsPersonalDetailsKAControllerObj);

        //frmSuccessFormKA
        var frmSuccessFormKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmSuccessFormKAConfig);
        var frmSuccessFormKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmSuccessFormKAController", appContext, frmSuccessFormKAModelConfigObj);
        var frmSuccessFormKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmSuccessFormKAControllerExtension", frmSuccessFormKAControllerObj);
        frmSuccessFormKAControllerObj.setControllerExtensionObject(frmSuccessFormKAControllerExtObj);
        var frmSuccessFormKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmSuccessFormKAFormModel", frmSuccessFormKAControllerObj);
        var frmSuccessFormKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmSuccessFormKAFormModelExtension", frmSuccessFormKAFormModelObj);
        frmSuccessFormKAFormModelObj.setFormModelExtensionObj(frmSuccessFormKAFormModelExtObj);
        appContext.setFormController("frmSuccessFormKA", frmSuccessFormKAControllerObj);
		
		//frmNewPayPersonKA      
        var frmNewPayPersonKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmNewPayPersonKAConfig);
        var frmNewPayPersonKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmNewPayPersonKAController", appContext, frmNewPayPersonKAModelConfigObj);
        var frmNewPayPersonKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmNewPayPersonKAControllerExtension", frmNewPayPersonKAControllerObj);
        frmNewPayPersonKAControllerObj.setControllerExtensionObject(frmNewPayPersonKAControllerExtObj);
        var frmNewPayPersonKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmNewPayPersonKAFormModel", frmNewPayPersonKAControllerObj);
        var frmNewPayPersonKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmNewPayPersonKAFormModelExtension", frmNewPayPersonKAFormModelObj);
        frmNewPayPersonKAFormModelObj.setFormModelExtensionObj(frmNewPayPersonKAFormModelExtObj);
        appContext.setFormController("frmNewPayPersonKA", frmNewPayPersonKAControllerObj);
	
	//frmPayeeTransactionKA
	
	  var frmPayeeTransactionsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmPayeeTransactionsKAConfig);
        var frmPayeeTransactionsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmPayeeTransactionsKAController", appContext, frmPayeeTransactionsKAModelConfigObj);
        var frmPayeeTransactionsKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmPayeeTransactionsKAControllerExtension", frmPayeeTransactionsKAControllerObj);
        frmPayeeTransactionsKAControllerObj.setControllerExtensionObject(frmPayeeTransactionsKAControllerExtObj);
        var frmPayeeTransactionsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmPayeeTransactionsKAFormModel", frmPayeeTransactionsKAControllerObj);
        var frmPayeeTransactionsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmPayeeTransactionsKAFormModelExtension", frmPayeeTransactionsKAFormModelObj);
        frmPayeeTransactionsKAFormModelObj.setFormModelExtensionObj(frmPayeeTransactionsKAFormModelExtObj);
        appContext.setFormController("frmPayeeTransactionsKA", frmPayeeTransactionsKAControllerObj);
 
      //Pay Bill
       var frmNewBillKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmNewBillKAConfig);
        var frmNewBillKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmNewBillKAController", appContext, frmNewBillKAModelConfigObj);
        var frmNewBillKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmNewBillKAControllerExtension", frmNewBillKAControllerObj);
        frmNewBillKAControllerObj.setControllerExtensionObject(frmNewBillKAControllerExtObj);
        var frmNewBillKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmNewBillKAFormModel", frmNewBillKAControllerObj);
        var frmNewBillKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmNewBillKAFormModelExtension", frmNewBillKAFormModelObj);
        frmNewBillKAFormModelObj.setFormModelExtensionObj(frmNewBillKAFormModelExtObj);
        appContext.setFormController("frmNewBillKA", frmNewBillKAControllerObj);
      
      //frmConfirmPayBill
    	//var frmConfirmPayBillModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmConfirmPayBillConfig);
       // var frmConfirmPayBillControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmConfirmPayBillController", appContext, frmConfirmPayBillModelConfigObj);
       // var frmConfirmPayBillControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmConfirmPayBillControllerExtension", frmConfirmPayBillControllerObj);
       // frmConfirmPayBillControllerObj.setControllerExtensionObject(frmConfirmPayBillControllerExtObj);
       // var frmConfirmPayBillFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmConfirmPayBillFormModel", frmConfirmPayBillControllerObj);
       // var frmConfirmPayBillFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmConfirmPayBillFormModelExtension", frmConfirmPayBillFormModelObj);
       // frmConfirmPayBillFormModelObj.setFormModelExtensionObj(frmConfirmPayBillFormModelExtObj);
       // appContext.setFormController("frmConfirmPayBill", frmConfirmPayBillControllerObj);
		
		//frmManagePayeeKA
		var frmManagePayeeKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmManagePayeeKAConfig);
        var frmManagePayeeKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmManagePayeeKAController", appContext, frmManagePayeeKAModelConfigObj);
        var frmManagePayeeKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmManagePayeeKAControllerExtension", frmManagePayeeKAControllerObj);
        frmManagePayeeKAControllerObj.setControllerExtensionObject(frmManagePayeeKAControllerExtObj);
        var frmManagePayeeKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmManagePayeeKAFormModel", frmManagePayeeKAControllerObj);
        var frmManagePayeeKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmManagePayeeKAFormModelExtension", frmManagePayeeKAFormModelObj);
        frmManagePayeeKAFormModelObj.setFormModelExtensionObj(frmManagePayeeKAFormModelExtObj);
        appContext.setFormController("frmManagePayeeKA", frmManagePayeeKAControllerObj);
		
   /*//frmEditPayeeKAwithCmpny
        var frmEditPayeeKAwithCmpnyModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmEditPayeeKAwithCmpnyConfig);
        var frmEditPayeeKAwithCmpnyControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmEditPayeeKAwithCmpnyController", appContext, frmEditPayeeKAwithCmpnyModelConfigObj);
        var frmEditPayeeKAwithCmpnyControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmEditPayeeKAwithCmpnyControllerExtension", frmEditPayeeKAwithCmpnyControllerObj);
        frmEditPayeeKAwithCmpnyControllerObj.setControllerExtensionObject(frmEditPayeeKAwithCmpnyControllerExtObj);
        var frmEditPayeeKAwithCmpnyFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmEditPayeeKAwithCmpnyFormModel", frmEditPayeeKAwithCmpnyControllerObj);
        var frmEditPayeeKAwithCmpnyFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmEditPayeeKAwithCmpnyFormModelExtension", frmEditPayeeKAwithCmpnyFormModelObj);
        frmEditPayeeKAwithCmpnyFormModelObj.setFormModelExtensionObj(frmEditPayeeKAwithCmpnyFormModelExtObj);
        appContext.setFormController("frmEditPayeeKAwithCmpny", frmEditPayeeKAwithCmpnyControllerObj);
		//P2P */
		

        var frmP2PselectPayeeKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmP2PselectPayeeKAConfig);
        var frmP2PselectPayeeKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmP2PselectPayeeKAController", appContext, frmP2PselectPayeeKAModelConfigObj);
        var frmP2PselectPayeeKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmP2PselectPayeeKAControllerExtension", frmP2PselectPayeeKAControllerObj);
        frmP2PselectPayeeKAControllerObj.setControllerExtensionObject(frmP2PselectPayeeKAControllerExtObj);
        var frmP2PselectPayeeKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmP2PselectPayeeKAFormModel", frmP2PselectPayeeKAControllerObj);
        var frmP2PselectPayeeKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmP2PselectPayeeKAFormModelExtension", frmP2PselectPayeeKAFormModelObj);
        frmP2PselectPayeeKAFormModelObj.setFormModelExtensionObj(frmP2PselectPayeeKAFormModelExtObj);
        appContext.setFormController("frmP2PselectPayeeKA", frmP2PselectPayeeKAControllerObj);
		
		//p2p:Add
		
		var frmP2PaddnewPayeeKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmP2PaddnewPayeeKAConfig);
        var frmP2PaddnewPayeeKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmP2PaddnewPayeeKAController", appContext, frmP2PaddnewPayeeKAModelConfigObj);
        var frmP2PaddnewPayeeKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmP2PaddnewPayeeKAControllerExtension", frmP2PaddnewPayeeKAControllerObj);
        frmP2PaddnewPayeeKAControllerObj.setControllerExtensionObject(frmP2PaddnewPayeeKAControllerExtObj);
        var frmP2PaddnewPayeeKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmP2PaddnewPayeeKAFormModel", frmP2PaddnewPayeeKAControllerObj);
        var frmP2PaddnewPayeeKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmP2PaddnewPayeeKAFormModelExtension", frmP2PaddnewPayeeKAFormModelObj);
        frmP2PaddnewPayeeKAFormModelObj.setFormModelExtensionObj(frmP2PaddnewPayeeKAFormModelExtObj);
        appContext.setFormController("frmP2PaddnewPayeeKA", frmP2PaddnewPayeeKAControllerObj);
		
		//p2p:confirmation
		
		var frmP2PConfirmationPayKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmP2PConfirmationPayKAConfig);
        var frmP2PConfirmationPayKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmP2PConfirmationPayKAController", appContext, frmP2PConfirmationPayKAModelConfigObj);
        var frmP2PConfirmationPayKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmP2PConfirmationPayKAControllerExtension", frmP2PConfirmationPayKAControllerObj);
        frmP2PConfirmationPayKAControllerObj.setControllerExtensionObject(frmP2PConfirmationPayKAControllerExtObj);
        var frmP2PConfirmationPayKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmP2PConfirmationPayKAFormModel", frmP2PConfirmationPayKAControllerObj);
        var frmP2PConfirmationPayKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmP2PConfirmationPayKAFormModelExtension", frmP2PConfirmationPayKAFormModelObj);
        frmP2PConfirmationPayKAFormModelObj.setFormModelExtensionObj(frmP2PConfirmationPayKAFormModelExtObj);
        appContext.setFormController("frmP2PConfirmationPayKA", frmP2PConfirmationPayKAControllerObj);


		        
		//frmEditPayeeKAwithCmpny
        //var frmEditPayeeKAwithCmpnyModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmEditPayeeKAwithCmpnyConfig);
        //var frmEditPayeeKAwithCmpnyControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmEditPayeeKAwithCmpnyController", appContext, frmEditPayeeKAwithCmpnyModelConfigObj);
        //var frmEditPayeeKAwithCmpnyControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmEditPayeeKAwithCmpnyControllerExtension", frmEditPayeeKAwithCmpnyControllerObj);
        //frmEditPayeeKAwithCmpnyControllerObj.setControllerExtensionObject(frmEditPayeeKAwithCmpnyControllerExtObj);
        //var frmEditPayeeKAwithCmpnyFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmEditPayeeKAwithCmpnyFormModel", frmEditPayeeKAwithCmpnyControllerObj);
        //var frmEditPayeeKAwithCmpnyFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmEditPayeeKAwithCmpnyFormModelExtension", frmEditPayeeKAwithCmpnyFormModelObj);
        //frmEditPayeeKAwithCmpnyFormModelObj.setFormModelExtensionObj(frmEditPayeeKAwithCmpnyFormModelExtObj);
        //appContext.setFormController("frmEditPayeeKAwithCmpny", frmEditPayeeKAwithCmpnyControllerObj);
		
        //frmEditPayeeKA
        var frmEditPayeeKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmEditPayeeKAConfig);
        var frmEditPayeeKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmEditPayeeKAController", appContext, frmEditPayeeKAModelConfigObj);
        var frmEditPayeeKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmEditPayeeKAControllerExtension", frmEditPayeeKAControllerObj);
        frmEditPayeeKAControllerObj.setControllerExtensionObject(frmEditPayeeKAControllerExtObj);
        var frmEditPayeeKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmEditPayeeKAFormModel", frmEditPayeeKAControllerObj);
        var frmEditPayeeKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmEditPayeeKAFormModelExtension", frmEditPayeeKAFormModelObj);
        frmEditPayeeKAFormModelObj.setFormModelExtensionObj(frmEditPayeeKAFormModelExtObj);
        appContext.setFormController("frmEditPayeeKA", frmEditPayeeKAControllerObj);
		
        
		//frmPayeeDetailsKA
        var frmPayeeDetailsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmPayeeDetailsKAConfig);
        var frmPayeeDetailsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmPayeeDetailsKAController", appContext, frmPayeeDetailsKAModelConfigObj);
        var frmPayeeDetailsKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmPayeeDetailsKAControllerExtension", frmPayeeDetailsKAControllerObj);
        frmPayeeDetailsKAControllerObj.setControllerExtensionObject(frmPayeeDetailsKAControllerExtObj);
        var frmPayeeDetailsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmPayeeDetailsKAFormModel", frmPayeeDetailsKAControllerObj);
        var frmPayeeDetailsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmPayeeDetailsKAFormModelExtension", frmPayeeDetailsKAFormModelObj);
        frmPayeeDetailsKAFormModelObj.setFormModelExtensionObj(frmPayeeDetailsKAFormModelExtObj);
        appContext.setFormController("frmPayeeDetailsKA", frmPayeeDetailsKAControllerObj);
		
		//frmManageCards
     	var frmManageCardsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmManageCardsKAConfig);
        var frmManageCardsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmManageCardsKAController", appContext, frmManageCardsKAModelConfigObj);
        var frmManageCardsKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmManageCardsKAControllerExtension", frmManageCardsKAControllerObj);
        frmManageCardsKAControllerObj.setControllerExtensionObject(frmManageCardsKAControllerExtObj);
        var frmManageCardsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmManageCardsKAFormModel", frmManageCardsKAControllerObj);
        var frmManageCardsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmManageCardsKAFormModelExtension", frmManageCardsKAFormModelObj);
        frmManageCardsKAFormModelObj.setFormModelExtensionObj(frmManageCardsKAFormModelExtObj);
        appContext.setFormController("frmManageCardsKA", frmManageCardsKAControllerObj);

        //frmDepositLandingKA
        var frmDepositPayLandingKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmDepositPayLandingKAConfig);
        var frmDepositPayLandingKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmDepositPayLandingKAController", appContext, frmDepositPayLandingKAModelConfigObj);
        var frmDepositPayLandingKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmDepositPayLandingKAControllerExtension", frmDepositPayLandingKAControllerObj);
        frmDepositPayLandingKAControllerObj.setControllerExtensionObject(frmDepositPayLandingKAControllerExtObj);
        var frmDepositPayLandingKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmDepositPayLandingKAFormModel", frmDepositPayLandingKAControllerObj);
        var frmDepositPayLandingKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmDepositPayLandingKAFormModelExtension", frmDepositPayLandingKAFormModelObj);
        frmDepositPayLandingKAFormModelObj.setFormModelExtensionObj(frmDepositPayLandingKAFormModelExtObj);
        appContext.setFormController("frmDepositPayLandingKA", frmDepositPayLandingKAControllerObj);
		
		//frmNewDeposit
       var frmNewDepositKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmNewDepositKAConfig);
        var frmNewDepositKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmNewDepositKAController", appContext, frmNewDepositKAModelConfigObj);
        var frmNewDepositKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmNewDepositKAControllerExtension", frmNewDepositKAControllerObj);
        frmNewDepositKAControllerObj.setControllerExtensionObject(frmNewDepositKAControllerExtObj);
        var frmNewDepositKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmNewDepositKAFormModel", frmNewDepositKAControllerObj);
        var frmNewDepositKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmNewDepositKAFormModelExtension", frmNewDepositKAFormModelObj);
        frmNewDepositKAFormModelObj.setFormModelExtensionObj(frmNewDepositKAFormModelExtObj);
        appContext.setFormController("frmNewDepositKA", frmNewDepositKAControllerObj);
		
		//frmAddExternalAccount
		var frmAddExternalAccountKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmAddExternalAccountKAConfig);
        var frmAddExternalAccountKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmAddExternalAccountKAController", appContext, frmAddExternalAccountKAModelConfigObj);
        var frmAddExternalAccountKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmAddExternalAccountKAControllerExtension", frmAddExternalAccountKAControllerObj);
        frmAddExternalAccountKAControllerObj.setControllerExtensionObject(frmAddExternalAccountKAControllerExtObj);
        var frmAddExternalAccountKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmAddExternalAccountKAFormModel", frmAddExternalAccountKAControllerObj);
        var frmAddExternalAccountKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmAddExternalAccountKAFormModelExtension", frmAddExternalAccountKAFormModelObj);
        frmAddExternalAccountKAFormModelObj.setFormModelExtensionObj(frmAddExternalAccountKAFormModelExtObj);
        appContext.setFormController("frmAddExternalAccountKA", frmAddExternalAccountKAControllerObj);
		
		//frmCardOperations
     	var frmCardOperationsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmCardOperationsKAConfig);
        var frmCardOperationsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmCardOperationsKAController", appContext, frmCardOperationsKAModelConfigObj);
        var frmCardOperationsKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmCardOperationsKAControllerExtension", frmCardOperationsKAControllerObj);
        frmCardOperationsKAControllerObj.setControllerExtensionObject(frmCardOperationsKAControllerExtObj);
        var frmCardOperationsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmCardOperationsKAFormModel", frmCardOperationsKAControllerObj);
        var frmCardOperationsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmCardOperationsKAFormModelExtension", frmCardOperationsKAFormModelObj);
        frmCardOperationsKAFormModelObj.setFormModelExtensionObj(frmCardOperationsKAFormModelExtObj);
        appContext.setFormController("frmCardOperationsKA", frmCardOperationsKAControllerObj);
 //AddNewPayee
        var frmAddNewPayeeKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmAddNewPayeeKAConfig);
        var frmAddNewPayeeKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmAddNewPayeeKAController", appContext, frmAddNewPayeeKAModelConfigObj);
        var frmAddNewPayeeKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmAddNewPayeeKAControllerExtension", frmAddNewPayeeKAControllerObj);
        frmAddNewPayeeKAControllerObj.setControllerExtensionObject(frmAddNewPayeeKAControllerExtObj);
        var frmAddNewPayeeKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmAddNewPayeeKAFormModel", frmAddNewPayeeKAControllerObj);
        var frmAddNewPayeeKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmAddNewPayeeKAFormModelExtension", frmAddNewPayeeKAFormModelObj);
        frmAddNewPayeeKAFormModelObj.setFormModelExtensionObj(frmAddNewPayeeKAFormModelExtObj);
        appContext.setFormController("frmAddNewPayeeKA", frmAddNewPayeeKAControllerObj);
      //AddNewPayeeSuccess
      var frmAddPayeeSuccessBillPayKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmAddPayeeSuccessBillPayKAConfig);
        var frmAddPayeeSuccessBillPayKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmAddPayeeSuccessBillPayKAController", appContext, frmAddPayeeSuccessBillPayKAModelConfigObj);
        var frmAddPayeeSuccessBillPayKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmAddPayeeSuccessBillPayKAControllerExtension", frmAddPayeeSuccessBillPayKAControllerObj);
        frmAddPayeeSuccessBillPayKAControllerObj.setControllerExtensionObject(frmAddPayeeSuccessBillPayKAControllerExtObj);
        var frmAddPayeeSuccessBillPayKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmAddPayeeSuccessBillPayKAFormModel", frmAddPayeeSuccessBillPayKAControllerObj);
        var frmAddPayeeSuccessBillPayKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmAddPayeeSuccessBillPayKAFormModelExtension", frmAddPayeeSuccessBillPayKAFormModelObj);
        frmAddPayeeSuccessBillPayKAFormModelObj.setFormModelExtensionObj(frmAddPayeeSuccessBillPayKAFormModelExtObj);
        appContext.setFormController("frmAddPayeeSuccessBillPayKA", frmAddPayeeSuccessBillPayKAControllerObj);
		
		
		//frmConfirmDeposit
		 var frmConfirmDepositKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmConfirmDepositKAConfig);
        var frmConfirmDepositKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmConfirmDepositKAController", appContext, frmConfirmDepositKAModelConfigObj);
        var frmConfirmDepositKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmConfirmDepositKAControllerExtension", frmConfirmDepositKAControllerObj);
        frmConfirmDepositKAControllerObj.setControllerExtensionObject(frmConfirmDepositKAControllerExtObj);
        var frmConfirmDepositKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmConfirmDepositKAFormModel", frmConfirmDepositKAControllerObj);
        var frmConfirmDepositKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmConfirmDepositKAFormModelExtension", frmConfirmDepositKAFormModelObj);
        frmConfirmDepositKAFormModelObj.setFormModelExtensionObj(frmConfirmDepositKAFormModelExtObj);
        appContext.setFormController("frmConfirmDepositKA", frmConfirmDepositKAControllerObj);

        
   //ConfirmPayBill
      var frmConfirmPayBillModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmConfirmPayBillConfig);
        var frmConfirmPayBillControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmConfirmPayBillController", appContext, frmConfirmPayBillModelConfigObj);
        var frmConfirmPayBillControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmConfirmPayBillControllerExtension", frmConfirmPayBillControllerObj);
        frmConfirmPayBillControllerObj.setControllerExtensionObject(frmConfirmPayBillControllerExtObj);
        var frmConfirmPayBillFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmConfirmPayBillFormModel", frmConfirmPayBillControllerObj);
        var frmConfirmPayBillFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmConfirmPayBillFormModelExtension", frmConfirmPayBillFormModelObj);
        frmConfirmPayBillFormModelObj.setFormModelExtensionObj(frmConfirmPayBillFormModelExtObj);
        appContext.setFormController("frmConfirmPayBill", frmConfirmPayBillControllerObj);

	//MyMoneyListKA
	    var frmMyMoneyListKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmMyMoneyListKAConfig);
        var frmMyMoneyListKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmMyMoneyListKAController", appContext, frmMyMoneyListKAModelConfigObj);
        var frmMyMoneyListKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmMyMoneyListKAControllerExtension", frmMyMoneyListKAControllerObj);
        frmMyMoneyListKAControllerObj.setControllerExtensionObject(frmMyMoneyListKAControllerExtObj);
        var frmMyMoneyListKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmMyMoneyListKAFormModel", frmMyMoneyListKAControllerObj);
        var frmMyMoneyListKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmMyMoneyListKAFormModelExtension", frmMyMoneyListKAFormModelObj);
        frmMyMoneyListKAFormModelObj.setFormModelExtensionObj(frmMyMoneyListKAFormModelExtObj);
        appContext.setFormController("frmMyMoneyListKA", frmMyMoneyListKAControllerObj);
    //frmMyMessagesKA
        var frmMyMessagesKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmMyMessagesKAConfig);
        var frmMyMessagesKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmMyMessagesKAController", appContext, frmMyMessagesKAModelConfigObj);
        var frmMyMessagesKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmMyMessagesKAControllerExtension", frmMyMessagesKAControllerObj);
        frmMyMessagesKAControllerObj.setControllerExtensionObject(frmMyMessagesKAControllerExtObj);
        var frmMyMessagesKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmMyMessagesKAFormModel", frmMyMessagesKAControllerObj);
        var frmMyMessagesKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmMyMessagesKAFormModelExtension", frmMyMessagesKAFormModelObj);
        frmMyMessagesKAFormModelObj.setFormModelExtensionObj(frmMyMessagesKAFormModelExtObj);
        appContext.setFormController("frmMyMessagesKA", frmMyMessagesKAControllerObj);

      //frmNewMessage
        var frmNewMessageKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmNewMessageKAConfig);
        var frmNewMessageKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmNewMessageKAController", appContext, frmNewMessageKAModelConfigObj);
        var frmNewMessageKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmNewMessageKAControllerExtension", frmNewMessageKAControllerObj);
        frmNewMessageKAControllerObj.setControllerExtensionObject(frmNewMessageKAControllerExtObj);
        var frmNewMessageKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmNewMessageKAFormModel", frmNewMessageKAControllerObj);
        var frmNewMessageKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmNewMessageKAFormModelExtension", frmNewMessageKAFormModelObj);
        frmNewMessageKAFormModelObj.setFormModelExtensionObj(frmNewMessageKAFormModelExtObj);
        appContext.setFormController("frmNewMessageKA", frmNewMessageKAControllerObj);
    
		//frmMoreForeignExchangeRatesKA
        var frmMoreForeignExchangeRatesKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmMoreForeignExchangeRatesKAConfig);
        var frmMoreForeignExchangeRatesKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmMoreForeignExchangeRatesKAController", appContext, frmMoreForeignExchangeRatesKAModelConfigObj);
        var frmMoreForeignExchangeRatesKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmMoreForeignExchangeRatesKAControllerExtension", frmMoreForeignExchangeRatesKAControllerObj);
        frmMoreForeignExchangeRatesKAControllerObj.setControllerExtensionObject(frmMoreForeignExchangeRatesKAControllerExtObj);
        var frmMoreForeignExchangeRatesKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmMoreForeignExchangeRatesKAFormModel", frmMoreForeignExchangeRatesKAControllerObj);
        var frmMoreForeignExchangeRatesKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmMoreForeignExchangeRatesKAFormModelExtension", frmMoreForeignExchangeRatesKAFormModelObj);
        frmMoreForeignExchangeRatesKAFormModelObj.setFormModelExtensionObj(frmMoreForeignExchangeRatesKAFormModelExtObj);
        appContext.setFormController("frmMoreForeignExchangeRatesKA", frmMoreForeignExchangeRatesKAControllerObj);
      
      //frmMoreInterestRatesKA
      	var frmMoreInterestRatesKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmMoreInterestRatesKAConfig);
        var frmMoreInterestRatesKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmMoreInterestRatesKAController", appContext, frmMoreInterestRatesKAModelConfigObj);
        var frmMoreInterestRatesKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmMoreInterestRatesKAControllerExtension", frmMoreInterestRatesKAControllerObj);
        frmMoreInterestRatesKAControllerObj.setControllerExtensionObject(frmMoreInterestRatesKAControllerExtObj);
        var frmMoreInterestRatesKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmMoreInterestRatesKAFormModel", frmMoreInterestRatesKAControllerObj);
        var frmMoreInterestRatesKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmMoreInterestRatesKAFormModelExtension", frmMoreInterestRatesKAFormModelObj);
        frmMoreInterestRatesKAFormModelObj.setFormModelExtensionObj(frmMoreInterestRatesKAFormModelExtObj);
        appContext.setFormController("frmMoreInterestRatesKA", frmMoreInterestRatesKAControllerObj);
      
      //frmMoreFaqKA
        var frmMoreFaqKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmMoreFaqKAConfig);
        var frmMoreFaqKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmMoreFaqKAController", appContext, frmMoreFaqKAModelConfigObj);
        var frmMoreFaqKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmMoreFaqKAControllerExtension", frmMoreFaqKAControllerObj);
        frmMoreFaqKAControllerObj.setControllerExtensionObject(frmMoreFaqKAControllerExtObj);
        var frmMoreFaqKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmMoreFaqKAFormModel", frmMoreFaqKAControllerObj);
        var frmMoreFaqKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmMoreFaqKAFormModelExtension", frmMoreFaqKAFormModelObj);
        frmMoreFaqKAFormModelObj.setFormModelExtensionObj(frmMoreFaqKAFormModelExtObj);
        appContext.setFormController("frmMoreFaqKA", frmMoreFaqKAControllerObj);
      
      //frmMorePrivacyPolicyKA
     	var frmMorePrivacyPolicyKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmMorePrivacyPolicyKAConfig);
        var frmMorePrivacyPolicyKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmMorePrivacyPolicyKAController", appContext, frmMorePrivacyPolicyKAModelConfigObj);
        var frmMorePrivacyPolicyKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmMorePrivacyPolicyKAControllerExtension", frmMorePrivacyPolicyKAControllerObj);
        frmMorePrivacyPolicyKAControllerObj.setControllerExtensionObject(frmMorePrivacyPolicyKAControllerExtObj);
        var frmMorePrivacyPolicyKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmMorePrivacyPolicyKAFormModel", frmMorePrivacyPolicyKAControllerObj);
        var frmMorePrivacyPolicyKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmMorePrivacyPolicyKAFormModelExtension", frmMorePrivacyPolicyKAFormModelObj);
        frmMorePrivacyPolicyKAFormModelObj.setFormModelExtensionObj(frmMorePrivacyPolicyKAFormModelExtObj);
        appContext.setFormController("frmMorePrivacyPolicyKA", frmMorePrivacyPolicyKAControllerObj);
		
      //frmMoreTermsAndConditionsKA
        var frmMoreTermsAndConditionsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmMoreTermsAndConditionsKAConfig);
        var frmMoreTermsAndConditionsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmMoreTermsAndConditionsKAController", appContext, frmMoreTermsAndConditionsKAModelConfigObj);
        var frmMoreTermsAndConditionsKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmMoreTermsAndConditionsKAControllerExtension", frmMoreTermsAndConditionsKAControllerObj);
        frmMoreTermsAndConditionsKAControllerObj.setControllerExtensionObject(frmMoreTermsAndConditionsKAControllerExtObj);
        var frmMoreTermsAndConditionsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmMoreTermsAndConditionsKAFormModel", frmMoreTermsAndConditionsKAControllerObj);
        var frmMoreTermsAndConditionsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmMoreTermsAndConditionsKAFormModelExtension", frmMoreTermsAndConditionsKAFormModelObj);
        frmMoreTermsAndConditionsKAFormModelObj.setFormModelExtensionObj(frmMoreTermsAndConditionsKAFormModelExtObj);
        appContext.setFormController("frmMoreTermsAndConditionsKA", frmMoreTermsAndConditionsKAControllerObj);
      

      //frmMessageDetailKA
        var frmMessageDetailKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmMessageDetailKAConfig);
        var frmMessageDetailKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmMessageDetailKAController", appContext, frmMessageDetailKAModelConfigObj);
        var frmMessageDetailKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmMessageDetailKAControllerExtension", frmMessageDetailKAControllerObj);
        frmMessageDetailKAControllerObj.setControllerExtensionObject(frmMessageDetailKAControllerExtObj);
        var frmMessageDetailKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmMessageDetailKAFormModel", frmMessageDetailKAControllerObj);
        var frmMessageDetailKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmMessageDetailKAFormModelExtension", frmMessageDetailKAFormModelObj);
        frmMessageDetailKAFormModelObj.setFormModelExtensionObj(frmMessageDetailKAFormModelExtObj);
        appContext.setFormController("frmMessageDetailKA", frmMessageDetailKAControllerObj);
       
      //frmMessageDraftKA
        var frmMessageDraftKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmMessageDraftKAConfig);
        var frmMessageDraftKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmMessageDraftKAController", appContext, frmMessageDraftKAModelConfigObj);
        var frmMessageDraftKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmMessageDraftKAControllerExtension", frmMessageDraftKAControllerObj);
        frmMessageDraftKAControllerObj.setControllerExtensionObject(frmMessageDraftKAControllerExtObj);
        var frmMessageDraftKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmMessageDraftKAFormModel", frmMessageDraftKAControllerObj);
        var frmMessageDraftKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmMessageDraftKAFormModelExtension", frmMessageDraftKAFormModelObj);
        frmMessageDraftKAFormModelObj.setFormModelExtensionObj(frmMessageDraftKAFormModelExtObj);
        appContext.setFormController("frmMessageDraftKA", frmMessageDraftKAControllerObj);
      
      //frmMessageReplyKA
        var frmMessageReplyKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmMessageReplyKAConfig);
        var frmMessageReplyKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmMessageReplyKAController", appContext, frmMessageReplyKAModelConfigObj);
        var frmMessageReplyKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmMessageReplyKAControllerExtension", frmMessageReplyKAControllerObj);
        frmMessageReplyKAControllerObj.setControllerExtensionObject(frmMessageReplyKAControllerExtObj);
        var frmMessageReplyKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmMessageReplyKAFormModel", frmMessageReplyKAControllerObj);
        var frmMessageReplyKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmMessageReplyKAFormModelExtension", frmMessageReplyKAFormModelObj);
        frmMessageReplyKAFormModelObj.setFormModelExtensionObj(frmMessageReplyKAFormModelExtObj);
        appContext.setFormController("frmMessageReplyKA", frmMessageReplyKAControllerObj);

        //frmPickAProduct
        var frmPickAProductKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmPickAProductKAConfig);
        var frmPickAProductKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmPickAProductKAController", appContext, frmPickAProductKAModelConfigObj);
        var frmPickAProductKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmPickAProductKAControllerExtension", frmPickAProductKAControllerObj);
        frmPickAProductKAControllerObj.setControllerExtensionObject(frmPickAProductKAControllerExtObj);
        var frmPickAProductKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmPickAProductKAFormModel", frmPickAProductKAControllerObj);
        var frmPickAProductKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmPickAProductKAFormModelExtension", frmPickAProductKAFormModelObj);
        frmPickAProductKAFormModelObj.setFormModelExtensionObj(frmPickAProductKAFormModelExtObj);
        appContext.setFormController("frmPickAProductKA", frmPickAProductKAControllerObj);

      //frmEnterLocationKA
        var frmEnterLocationKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmEnterLocationKAConfig);
        var frmEnterLocationKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmEnterLocationKAController", appContext, frmEnterLocationKAModelConfigObj);
        var frmEnterLocationKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmEnterLocationKAControllerExtension", frmEnterLocationKAControllerObj);
        frmEnterLocationKAControllerObj.setControllerExtensionObject(frmEnterLocationKAControllerExtObj);
        var frmEnterLocationKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmEnterLocationKAFormModel", frmEnterLocationKAControllerObj);
        var frmEnterLocationKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmEnterLocationKAFormModelExtension", frmEnterLocationKAFormModelObj);
        frmEnterLocationKAFormModelObj.setFormModelExtensionObj(frmEnterLocationKAFormModelExtObj);
        appContext.setFormController("frmEnterLocationKA", frmEnterLocationKAControllerObj);

      //frmCreditCardsKA
        var frmCreditCardsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmCreditCardsKAConfig);
        var frmCreditCardsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmCreditCardsKAController", appContext, frmCreditCardsKAModelConfigObj);
        var frmCreditCardsKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmCreditCardsKAControllerExtension", frmCreditCardsKAControllerObj);
        frmCreditCardsKAControllerObj.setControllerExtensionObject(frmCreditCardsKAControllerExtObj);
        var frmCreditCardsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmCreditCardsKAFormModel", frmCreditCardsKAControllerObj);
        var frmCreditCardsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmCreditCardsKAFormModelExtension", frmCreditCardsKAFormModelObj);
        frmCreditCardsKAFormModelObj.setFormModelExtensionObj(frmCreditCardsKAFormModelExtObj);
        appContext.setFormController("frmCreditCardsKA", frmCreditCardsKAControllerObj);
      
      //frmViewApplication
        var frmViewApplicationKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmViewApplicationKAConfig);
        var frmViewApplicationKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmViewApplicationKAController", appContext, frmViewApplicationKAModelConfigObj);
        var frmViewApplicationKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmViewApplicationKAControllerExtension", frmViewApplicationKAControllerObj);
        frmViewApplicationKAControllerObj.setControllerExtensionObject(frmViewApplicationKAControllerExtObj);
        var frmViewApplicationKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmViewApplicationKAFormModel", frmViewApplicationKAControllerObj);
        var frmViewApplicationKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmViewApplicationKAFormModelExtension", frmViewApplicationKAFormModelObj);
        frmViewApplicationKAFormModelObj.setFormModelExtensionObj(frmViewApplicationKAFormModelExtObj);
        appContext.setFormController("frmViewApplicationKA", frmViewApplicationKAControllerObj);
		
		//frmP2PConfirmTransferKA
		var frmP2PConfirmTransferKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmP2PConfirmTransferKAConfig);
        var frmP2PConfirmTransferKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmP2PConfirmTransferKAController", appContext, frmP2PConfirmTransferKAModelConfigObj);
        var frmP2PConfirmTransferKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmP2PConfirmTransferKAControllerExtension", frmP2PConfirmTransferKAControllerObj);
        frmP2PConfirmTransferKAControllerObj.setControllerExtensionObject(frmP2PConfirmTransferKAControllerExtObj);
        var frmP2PConfirmTransferKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmP2PConfirmTransferKAFormModel", frmP2PConfirmTransferKAControllerObj);
        var frmP2PConfirmTransferKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmP2PConfirmTransferKAFormModelExtension", frmP2PConfirmTransferKAFormModelObj);
        frmP2PConfirmTransferKAFormModelObj.setFormModelExtensionObj(frmP2PConfirmTransferKAFormModelExtObj);
        appContext.setFormController("frmP2PConfirmTransferKA", frmP2PConfirmTransferKAControllerObj);
		
      	
      	//frmP2PphonepayeeKA
      	 var frmP2PphonepayeeKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmP2PphonepayeeKAConfig);
        var frmP2PphonepayeeKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmP2PphonepayeeKAController", appContext, frmP2PphonepayeeKAModelConfigObj);
        var frmP2PphonepayeeKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmP2PphonepayeeKAControllerExtension", frmP2PphonepayeeKAControllerObj);
        frmP2PphonepayeeKAControllerObj.setControllerExtensionObject(frmP2PphonepayeeKAControllerExtObj);
        var frmP2PphonepayeeKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmP2PphonepayeeKAFormModel", frmP2PphonepayeeKAControllerObj);
        var frmP2PphonepayeeKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmP2PphonepayeeKAFormModelExtension", frmP2PphonepayeeKAFormModelObj);
        frmP2PphonepayeeKAFormModelObj.setFormModelExtensionObj(frmP2PphonepayeeKAFormModelExtObj);
        appContext.setFormController("frmP2PphonepayeeKA", frmP2PphonepayeeKAControllerObj);
      
      //frmUserSettingsKA
        var frmUserSettingsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmUserSettingsKAConfig);
        var frmUserSettingsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmUserSettingsKAController", appContext, frmUserSettingsKAModelConfigObj);
        var frmUserSettingsKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmUserSettingsKAControllerExtension", frmUserSettingsKAControllerObj);
        frmUserSettingsKAControllerObj.setControllerExtensionObject(frmUserSettingsKAControllerExtObj);
        var frmUserSettingsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmUserSettingsKAFormModel", frmUserSettingsKAControllerObj);
        var frmUserSettingsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmUserSettingsKAFormModelExtension", frmUserSettingsKAFormModelObj);
        frmUserSettingsKAFormModelObj.setFormModelExtensionObj(frmUserSettingsKAFormModelExtObj);
        appContext.setFormController("frmUserSettingsKA", frmUserSettingsKAControllerObj);

    //frmAlertsKA
        var frmAlertsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmAlertsKAConfig);
        var frmAlertsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmAlertsKAController", appContext, frmAlertsKAModelConfigObj);
        var frmAlertsKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmAlertsKAControllerExtension", frmAlertsKAControllerObj);
        frmAlertsKAControllerObj.setControllerExtensionObject(frmAlertsKAControllerExtObj);
        var frmAlertsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmAlertsKAFormModel", frmAlertsKAControllerObj);
        var frmAlertsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmAlertsKAFormModelExtension", frmAlertsKAFormModelObj);
        frmAlertsKAFormModelObj.setFormModelExtensionObj(frmAlertsKAFormModelExtObj);
        appContext.setFormController("frmAlertsKA", frmAlertsKAControllerObj);
      
      //frmDeviceDeRegistrationKA
      	var frmDeviceDeRegistrationKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmDeviceDeRegistrationKAConfig);
        var frmDeviceDeRegistrationKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmDeviceDeRegistrationKAController", appContext, frmDeviceDeRegistrationKAModelConfigObj);
        var frmDeviceDeRegistrationKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmDeviceDeRegistrationKAControllerExtension", frmDeviceDeRegistrationKAControllerObj);
        frmDeviceDeRegistrationKAControllerObj.setControllerExtensionObject(frmDeviceDeRegistrationKAControllerExtObj);
        var frmDeviceDeRegistrationKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmDeviceDeRegistrationKAFormModel", frmDeviceDeRegistrationKAControllerObj);
        var frmDeviceDeRegistrationKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmDeviceDeRegistrationKAFormModelExtension", frmDeviceDeRegistrationKAFormModelObj);
        frmDeviceDeRegistrationKAFormModelObj.setFormModelExtensionObj(frmDeviceDeRegistrationKAFormModelExtObj);
        appContext.setFormController("frmDeviceDeRegistrationKA", frmDeviceDeRegistrationKAControllerObj);
		
		//frmTransactionDetailKA
		var frmTransactionDetailKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmTransactionDetailKAConfig);
        var frmTransactionDetailKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmTransactionDetailKAController", appContext, frmTransactionDetailKAModelConfigObj);
        var frmTransactionDetailKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmTransactionDetailKAControllerExtension", frmTransactionDetailKAControllerObj);
        frmTransactionDetailKAControllerObj.setControllerExtensionObject(frmTransactionDetailKAControllerExtObj);
        var frmTransactionDetailKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmTransactionDetailKAFormModel", frmTransactionDetailKAControllerObj);
        var frmTransactionDetailKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmTransactionDetailKAFormModelExtension", frmTransactionDetailKAFormModelObj);
        frmTransactionDetailKAFormModelObj.setFormModelExtensionObj(frmTransactionDetailKAFormModelExtObj);
        appContext.setFormController("frmTransactionDetailKA", frmTransactionDetailKAControllerObj);
		
		//frmSecurityAlerts
		var frmSecurityAlertsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmSecurityAlertsKAConfig);
        var frmSecurityAlertsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmSecurityAlertsKAController", appContext, frmSecurityAlertsKAModelConfigObj);
        var frmSecurityAlertsKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmSecurityAlertsKAControllerExtension", frmSecurityAlertsKAControllerObj);
        frmSecurityAlertsKAControllerObj.setControllerExtensionObject(frmSecurityAlertsKAControllerExtObj);
        var frmSecurityAlertsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmSecurityAlertsKAFormModel", frmSecurityAlertsKAControllerObj);
        var frmSecurityAlertsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmSecurityAlertsKAFormModelExtension", frmSecurityAlertsKAFormModelObj);
        frmSecurityAlertsKAFormModelObj.setFormModelExtensionObj(frmSecurityAlertsKAFormModelExtObj);
        appContext.setFormController("frmSecurityAlertsKA", frmSecurityAlertsKAControllerObj);	
        
		//frmDealsAlertKA	
		var frmDealsAlertKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmDealsAlertKAConfig);
        var frmDealsAlertKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmDealsAlertKAController", appContext, frmDealsAlertKAModelConfigObj);
        var frmDealsAlertKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmDealsAlertKAControllerExtension", frmDealsAlertKAControllerObj);
        frmDealsAlertKAControllerObj.setControllerExtensionObject(frmDealsAlertKAControllerExtObj);
        var frmDealsAlertKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmDealsAlertKAFormModel", frmDealsAlertKAControllerObj);
        var frmDealsAlertKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmDealsAlertKAFormModelExtension", frmDealsAlertKAFormModelObj);
        frmDealsAlertKAFormModelObj.setFormModelExtensionObj(frmDealsAlertKAFormModelExtObj);
        appContext.setFormController("frmDealsAlertKA", frmDealsAlertKAControllerObj);
		
		//frmUncategorizedTransactionsKA
        var frmUncategorizedTransactionsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmUncategorizedTransactionsKAConfig);
        var frmUncategorizedTransactionsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmUncategorizedTransactionsKAController", appContext, frmUncategorizedTransactionsKAModelConfigObj);
        var frmUncategorizedTransactionsKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmUncategorizedTransactionsKAControllerExtension", frmUncategorizedTransactionsKAControllerObj);
        frmUncategorizedTransactionsKAControllerObj.setControllerExtensionObject(frmUncategorizedTransactionsKAControllerExtObj);
        var frmUncategorizedTransactionsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmUncategorizedTransactionsKAFormModel", frmUncategorizedTransactionsKAControllerObj);
        var frmUncategorizedTransactionsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmUncategorizedTransactionsKAFormModelExtension", frmUncategorizedTransactionsKAFormModelObj);
        frmUncategorizedTransactionsKAFormModelObj.setFormModelExtensionObj(frmUncategorizedTransactionsKAFormModelExtObj);
        appContext.setFormController("frmUncategorizedTransactionsKA", frmUncategorizedTransactionsKAControllerObj);
    //frmAccountAlertsKA
        var frmAccountAlertsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmAccountAlertsKAConfig);
        var frmAccountAlertsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmAccountAlertsKAController", appContext, frmAccountAlertsKAModelConfigObj);
        var frmAccountAlertsKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmAccountAlertsKAControllerExtension", frmAccountAlertsKAControllerObj);
        frmAccountAlertsKAControllerObj.setControllerExtensionObject(frmAccountAlertsKAControllerExtObj);
        var frmAccountAlertsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmAccountAlertsKAFormModel", frmAccountAlertsKAControllerObj);
        var frmAccountAlertsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmAccountAlertsKAFormModelExtension", frmAccountAlertsKAFormModelObj);
        frmAccountAlertsKAFormModelObj.setFormModelExtensionObj(frmAccountAlertsKAFormModelExtObj);
        appContext.setFormController("frmAccountAlertsKA", frmAccountAlertsKAControllerObj);

    //frmUpdateAccountAlertsKA
        var frmUpdateAccountAlertsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmUpdateAccountAlertsKAConfig);
        var frmUpdateAccountAlertsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmUpdateAccountAlertsKAController", appContext, frmUpdateAccountAlertsKAModelConfigObj);
        var frmUpdateAccountAlertsKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmUpdateAccountAlertsKAControllerExtension", frmUpdateAccountAlertsKAControllerObj);
        frmUpdateAccountAlertsKAControllerObj.setControllerExtensionObject(frmUpdateAccountAlertsKAControllerExtObj);
        var frmUpdateAccountAlertsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmUpdateAccountAlertsKAFormModel", frmUpdateAccountAlertsKAControllerObj);
        var frmUpdateAccountAlertsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmUpdateAccountAlertsKAFormModelExtension", frmUpdateAccountAlertsKAFormModelObj);
        frmUpdateAccountAlertsKAFormModelObj.setFormModelExtensionObj(frmUpdateAccountAlertsKAFormModelExtObj);
        appContext.setFormController("frmUpdateAccountAlertsKA", frmUpdateAccountAlertsKAControllerObj);
		
		//frmAcntTermsAndConditionsKA
        var frmAcntTermsAndConditionsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmAcntTermsAndConditionsKAConfig);
        var frmAcntTermsAndConditionsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmAcntTermsAndConditionsKAController", appContext, frmAcntTermsAndConditionsKAModelConfigObj);
        var frmAcntTermsAndConditionsKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmAcntTermsAndConditionsKAControllerExtension", frmAcntTermsAndConditionsKAControllerObj);
        frmAcntTermsAndConditionsKAControllerObj.setControllerExtensionObject(frmAcntTermsAndConditionsKAControllerExtObj);
        var frmAcntTermsAndConditionsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmAcntTermsAndConditionsKAFormModel", frmAcntTermsAndConditionsKAControllerObj);
        var frmAcntTermsAndConditionsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmAcntTermsAndConditionsKAFormModelExtension", frmAcntTermsAndConditionsKAFormModelObj);
        frmAcntTermsAndConditionsKAFormModelObj.setFormModelExtensionObj(frmAcntTermsAndConditionsKAFormModelExtObj);
        appContext.setFormController("frmAcntTermsAndConditionsKA", frmAcntTermsAndConditionsKAControllerObj);
		
		//frmAcmeCreditCardKA
		var frmAcmeCreditCardKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmAcmeCreditCardKAConfig);
        var frmAcmeCreditCardKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmAcmeCreditCardKAController", appContext, frmAcmeCreditCardKAModelConfigObj);
        var frmAcmeCreditCardKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmAcmeCreditCardKAControllerExtension", frmAcmeCreditCardKAControllerObj);
        frmAcmeCreditCardKAControllerObj.setControllerExtensionObject(frmAcmeCreditCardKAControllerExtObj);
        var frmAcmeCreditCardKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmAcmeCreditCardKAFormModel", frmAcmeCreditCardKAControllerObj);
        var frmAcmeCreditCardKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmAcmeCreditCardKAFormModelExtension", frmAcmeCreditCardKAFormModelObj);
        frmAcmeCreditCardKAFormModelObj.setFormModelExtensionObj(frmAcmeCreditCardKAFormModelExtObj);
        appContext.setFormController("frmAcmeCreditCardKA", frmAcmeCreditCardKAControllerObj);
      
      //frmSearchOptionsKA
        var frmSearchOptionsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmSearchOptionsKAConfig);
        var frmSearchOptionsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmSearchOptionsKAController", appContext, frmSearchOptionsKAModelConfigObj);
        var frmSearchOptionsKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmSearchOptionsKAControllerExtension", frmSearchOptionsKAControllerObj);
        frmSearchOptionsKAControllerObj.setControllerExtensionObject(frmSearchOptionsKAControllerExtObj);
        var frmSearchOptionsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmSearchOptionsKAFormModel", frmSearchOptionsKAControllerObj);
        var frmSearchOptionsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmSearchOptionsKAFormModelExtension", frmSearchOptionsKAFormModelObj);
        frmSearchOptionsKAFormModelObj.setFormModelExtensionObj(frmSearchOptionsKAFormModelExtObj);
        appContext.setFormController("frmSearchOptionsKA", frmSearchOptionsKAControllerObj);
      
      //frmSearchTransactionDetails
        var frmSearchTransactionDetailsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmSearchTransactionDetailsKAConfig);
        var frmSearchTransactionDetailsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmSearchTransactionDetailsKAController", appContext, frmSearchTransactionDetailsKAModelConfigObj);
        var frmSearchTransactionDetailsKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmSearchTransactionDetailsKAControllerExtension", frmSearchTransactionDetailsKAControllerObj);
        frmSearchTransactionDetailsKAControllerObj.setControllerExtensionObject(frmSearchTransactionDetailsKAControllerExtObj);
        var frmSearchTransactionDetailsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmSearchTransactionDetailsKAFormModel", frmSearchTransactionDetailsKAControllerObj);
        var frmSearchTransactionDetailsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmSearchTransactionDetailsKAFormModelExtension", frmSearchTransactionDetailsKAFormModelObj);
        frmSearchTransactionDetailsKAFormModelObj.setFormModelExtensionObj(frmSearchTransactionDetailsKAFormModelExtObj);
        appContext.setFormController("frmSearchTransactionDetailsKA", frmSearchTransactionDetailsKAControllerObj);

      //frmDepositSuccessKA
       var frmDepositSuccessKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmDepositSuccessKAConfig);
        var frmDepositSuccessKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmDepositSuccessKAController", appContext, frmDepositSuccessKAModelConfigObj);
        var frmDepositSuccessKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmDepositSuccessKAControllerExtension", frmDepositSuccessKAControllerObj);
        frmDepositSuccessKAControllerObj.setControllerExtensionObject(frmDepositSuccessKAControllerExtObj);
        var frmDepositSuccessKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmDepositSuccessKAFormModel", frmDepositSuccessKAControllerObj);
        var frmDepositSuccessKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmDepositSuccessKAFormModelExtension", frmDepositSuccessKAFormModelObj);
        frmDepositSuccessKAFormModelObj.setFormModelExtensionObj(frmDepositSuccessKAFormModelExtObj);
        appContext.setFormController("frmDepositSuccessKA", frmDepositSuccessKAControllerObj);
		
		var frmCheckReOrderListKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmCheckReOrderListKAConfig);
        var frmCheckReOrderListKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmCheckReOrderListKAController", appContext, frmCheckReOrderListKAModelConfigObj);
        var frmCheckReOrderListKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmCheckReOrderListKAControllerExtension", frmCheckReOrderListKAControllerObj);
        frmCheckReOrderListKAControllerObj.setControllerExtensionObject(frmCheckReOrderListKAControllerExtObj);
        var frmCheckReOrderListKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmCheckReOrderListKAFormModel", frmCheckReOrderListKAControllerObj);
        var frmCheckReOrderListKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmCheckReOrderListKAFormModelExtension", frmCheckReOrderListKAFormModelObj);
        frmCheckReOrderListKAFormModelObj.setFormModelExtensionObj(frmCheckReOrderListKAFormModelExtObj);
        appContext.setFormController("frmCheckReOrderListKA", frmCheckReOrderListKAControllerObj);
		
		var frmCheckReorderConfirmationKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmCheckReorderConfirmationKAConfig);
        var frmCheckReorderConfirmationKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmCheckReorderConfirmationKAController", appContext, frmCheckReorderConfirmationKAModelConfigObj);
        var frmCheckReorderConfirmationKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmCheckReorderConfirmationKAControllerExtension", frmCheckReorderConfirmationKAControllerObj);
        frmCheckReorderConfirmationKAControllerObj.setControllerExtensionObject(frmCheckReorderConfirmationKAControllerExtObj);
        var frmCheckReorderConfirmationKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmCheckReorderConfirmationKAFormModel", frmCheckReorderConfirmationKAControllerObj);
        var frmCheckReorderConfirmationKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmCheckReorderConfirmationKAFormModelExtension", frmCheckReorderConfirmationKAFormModelObj);
        frmCheckReorderConfirmationKAFormModelObj.setFormModelExtensionObj(frmCheckReorderConfirmationKAFormModelExtObj);
        appContext.setFormController("frmCheckReorderConfirmationKA", frmCheckReorderConfirmationKAControllerObj);

        var frmCheckReorderDetailsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmCheckReorderDetailsKAConfig);
        var frmCheckReorderDetailsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmCheckReorderDetailsKAController", appContext, frmCheckReorderDetailsKAModelConfigObj);
        var frmCheckReorderDetailsKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmCheckReorderDetailsKAControllerExtension", frmCheckReorderDetailsKAControllerObj);
        frmCheckReorderDetailsKAControllerObj.setControllerExtensionObject(frmCheckReorderDetailsKAControllerExtObj);
        var frmCheckReorderDetailsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmCheckReorderDetailsKAFormModel", frmCheckReorderDetailsKAControllerObj);
        var frmCheckReorderDetailsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmCheckReorderDetailsKAFormModelExtension", frmCheckReorderDetailsKAFormModelObj);
        frmCheckReorderDetailsKAFormModelObj.setFormModelExtensionObj(frmCheckReorderDetailsKAFormModelExtObj);
        appContext.setFormController("frmCheckReorderDetailsKA", frmCheckReorderDetailsKAControllerObj);

        
    } catch (err) {
        kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
        var exception = appContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_APP_INIT_FORMS, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_APP_INIT_FORMS, err);
        kony.sdk.mvvm.log.error(exception.toString());
        throw exception;
    }
};