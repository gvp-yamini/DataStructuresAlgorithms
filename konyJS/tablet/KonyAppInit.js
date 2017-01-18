kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.initApplicationForms = function(appContext) {
    try {
        kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("");
		
		
		var accountsLandingModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(accountsLandingConfig);
        var accountsLandingControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.accountsLandingController", appContext, accountsLandingModelConfigObj);
        var accountsLandingControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.accountsLandingControllerExtension", accountsLandingControllerObj);
        accountsLandingControllerObj.setControllerExtensionObject(accountsLandingControllerExtObj);
        var accountsLandingFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.accountsLandingFormModel", accountsLandingControllerObj);
        var accountsLandingFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.accountsLandingFormModelExtension", accountsLandingFormModelObj);
        accountsLandingFormModelObj.setFormModelExtensionObj(accountsLandingFormModelExtObj);
        appContext.setFormController("accountsLanding", accountsLandingControllerObj);
        
        
        //accountDetail
        var accountDetailModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(accountDetailConfig);
        var accountDetailControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.accountDetailController", appContext, accountDetailModelConfigObj);
        var accountDetailControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.accountDetailControllerExtension", accountDetailControllerObj);
        accountDetailControllerObj.setControllerExtensionObject(accountDetailControllerExtObj);
        var accountDetailFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.accountDetailFormModel", accountDetailControllerObj);
        var accountDetailFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.accountDetailFormModelExtension", accountDetailFormModelObj);
        accountDetailFormModelObj.setFormModelExtensionObj(accountDetailFormModelExtObj);
        appContext.setFormController("accountDetail", accountDetailControllerObj);
      
      	kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Initializing app");
        var accountTransactionDetailsModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(accountTransactionDetailsConfig);
        var accountTransactionDetailsControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.accountTransactionDetailsController", appContext, accountTransactionDetailsModelConfigObj);
        var accountTransactionDetailsControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.accountTransactionDetailsControllerExtension", accountTransactionDetailsControllerObj);
        accountTransactionDetailsControllerObj.setControllerExtensionObject(accountTransactionDetailsControllerExtObj);
        var accountTransactionDetailsFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.accountTransactionDetailsFormModel", accountTransactionDetailsControllerObj);
        var accountTransactionDetailsFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.accountTransactionDetailsFormModelExtension", accountTransactionDetailsFormModelObj);
        accountTransactionDetailsFormModelObj.setFormModelExtensionObj(accountTransactionDetailsFormModelExtObj);
        appContext.setFormController("accountTransactionDetails", accountTransactionDetailsControllerObj);

        var frmAccountStatementsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmAccountStatementsKAConfig);
        var frmAccountStatementsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmAccountStatementsKAController", appContext, frmAccountStatementsKAModelConfigObj);
        var frmAccountStatementsKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmAccountStatementsKAControllerExtension", frmAccountStatementsKAControllerObj);
        frmAccountStatementsKAControllerObj.setControllerExtensionObject(frmAccountStatementsKAControllerExtObj);
        var frmAccountStatementsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmAccountStatementsKAFormModel", frmAccountStatementsKAControllerObj);
        var frmAccountStatementsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmAccountStatementsKAFormModelExtension", frmAccountStatementsKAFormModelObj);
        frmAccountStatementsKAFormModelObj.setFormModelExtensionObj(frmAccountStatementsKAFormModelExtObj);
        appContext.setFormController("frmAccountStatementsKA", frmAccountStatementsKAControllerObj);
        
		
	  // Accountalerts
	    var frmAlertsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmAlertsKAConfig);
        var frmAlertsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmAlertsKAController", appContext, frmAlertsKAModelConfigObj);
        var frmAlertsKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmAlertsKAControllerExtension", frmAlertsKAControllerObj);
        frmAlertsKAControllerObj.setControllerExtensionObject(frmAlertsKAControllerExtObj);
        var frmAlertsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmAlertsKAFormModel", frmAlertsKAControllerObj);
        var frmAlertsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmAlertsKAFormModelExtension", frmAlertsKAFormModelObj);
        frmAlertsKAFormModelObj.setFormModelExtensionObj(frmAlertsKAFormModelExtObj);
        appContext.setFormController("frmAlertsKA", frmAlertsKAControllerObj);
		//Security Alerts
		var frmSecurityAlertsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmSecurityAlertsKAConfig);
        var frmSecurityAlertsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmSecurityAlertsKAController", appContext, frmSecurityAlertsKAModelConfigObj);
        var frmSecurityAlertsKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmSecurityAlertsKAControllerExtension", frmSecurityAlertsKAControllerObj);
        frmSecurityAlertsKAControllerObj.setControllerExtensionObject(frmSecurityAlertsKAControllerExtObj);
        var frmSecurityAlertsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmSecurityAlertsKAFormModel", frmSecurityAlertsKAControllerObj);
        var frmSecurityAlertsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmSecurityAlertsKAFormModelExtension", frmSecurityAlertsKAFormModelObj);
        frmSecurityAlertsKAFormModelObj.setFormModelExtensionObj(frmSecurityAlertsKAFormModelExtObj);
        appContext.setFormController("frmSecurityAlertsKA", frmSecurityAlertsKAControllerObj);

      //accountInfo
        var accountInfoModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(accountInfoConfig);
        var accountInfoControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.accountInfoController", appContext, accountInfoModelConfigObj);
        var accountInfoControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.accountInfoControllerExtension", accountInfoControllerObj);
        accountInfoControllerObj.setControllerExtensionObject(accountInfoControllerExtObj);
        var accountInfoFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.accountInfoFormModel",accountInfoControllerObj);
        var accountInfoFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.accountInfoFormModelExtension", accountInfoFormModelObj);
        accountInfoFormModelObj.setFormModelExtensionObj(accountInfoFormModelExtObj);
        appContext.setFormController("accountInfo", accountInfoControllerObj);
      
      //accountInfoEdit
        var accountInfoEditModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(accountInfoEditConfig);
        var accountInfoEditControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.accountInfoEditController", appContext, accountInfoEditModelConfigObj);
        var accountInfoEditControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.accountInfoEditControllerExtension", accountInfoEditControllerObj);
        accountInfoEditControllerObj.setControllerExtensionObject(accountInfoEditControllerExtObj);
        var accountInfoEditFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.accountInfoEditFormModel", accountInfoEditControllerObj);
        var accountInfoEditFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.accountInfoEditFormModelExtension", accountInfoEditFormModelObj);
        accountInfoEditFormModelObj.setFormModelExtensionObj(accountInfoEditFormModelExtObj);
        appContext.setFormController("accountInfoEdit", accountInfoEditControllerObj);
		
		//Recent Transactions
		/*var frmRecentTransactionDetailsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmRecentTransactionDetailsKAConfig);
        var frmRecentTransactionDetailsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmRecentTransactionDetailsKAController", appContext, frmRecentTransactionDetailsKAModelConfigObj);
        var frmRecentTransactionDetailsKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmRecentTransactionDetailsKAControllerExtension", frmRecentTransactionDetailsKAControllerObj);
        frmRecentTransactionDetailsKAControllerObj.setControllerExtensionObject(frmRecentTransactionDetailsKAControllerExtObj);
        var frmRecentTransactionDetailsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmRecentTransactionDetailsKAFormModel", frmRecentTransactionDetailsKAControllerObj);
        var frmRecentTransactionDetailsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmRecentTransactionDetailsKAFormModelExtension", frmRecentTransactionDetailsKAFormModelObj);
        frmRecentTransactionDetailsKAFormModelObj.setFormModelExtensionObj(frmRecentTransactionDetailsKAFormModelExtObj);
        appContext.setFormController("frmRecentTransactionDetailsKA", frmRecentTransactionDetailsKAControllerObj); */
		
		//frmNewTransferKA
		var frmNewTransferKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmNewTransferKAConfig);
        var frmNewTransferKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmNewTransferKAController", appContext, frmNewTransferKAModelConfigObj);
        var frmNewTransferKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmNewTransferKAControllerExtension", frmNewTransferKAControllerObj);
        frmNewTransferKAControllerObj.setControllerExtensionObject(frmNewTransferKAControllerExtObj);
        var frmNewTransferKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmNewTransferKAFormModel", frmNewTransferKAControllerObj);
        var frmNewTransferKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmNewTransferKAFormModelExtension", frmNewTransferKAFormModelObj);
        frmNewTransferKAFormModelObj.setFormModelExtensionObj(frmNewTransferKAFormModelExtObj);
        appContext.setFormController("frmNewTransferKA", frmNewTransferKAControllerObj);

        var frmTransferPayLandingKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmTransferPayLandingKAConfig);
        var frmTransferPayLandingKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmTransferPayLandingKAController", appContext, frmTransferPayLandingKAModelConfigObj);
        var frmTransferPayLandingKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmTransferPayLandingKAControllerExtension", frmTransferPayLandingKAControllerObj);
        frmTransferPayLandingKAControllerObj.setControllerExtensionObject(frmTransferPayLandingKAControllerExtObj);
        var frmTransferPayLandingKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmTransferPayLandingKAFormModel", frmTransferPayLandingKAControllerObj);
        var frmTransferPayLandingKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmTransferPayLandingKAFormModelExtension", frmTransferPayLandingKAFormModelObj);
        frmTransferPayLandingKAFormModelObj.setFormModelExtensionObj(frmTransferPayLandingKAFormModelExtObj);
        appContext.setFormController("frmTransferPayLandingKA", frmTransferPayLandingKAControllerObj);
		
		//frmConfirmTransferKA
		var frmConfirmTransferKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmConfirmTransferKAConfig);
        var frmConfirmTransferKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmConfirmTransferKAController", appContext, frmConfirmTransferKAModelConfigObj);
        var frmConfirmTransferKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmConfirmTransferKAControllerExtension", frmConfirmTransferKAControllerObj);
        frmConfirmTransferKAControllerObj.setControllerExtensionObject(frmConfirmTransferKAControllerExtObj);
        var frmConfirmTransferKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmConfirmTransferKAFormModel", frmConfirmTransferKAControllerObj);
        var frmConfirmTransferKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmConfirmTransferKAFormModelExtension", frmConfirmTransferKAFormModelObj);
        frmConfirmTransferKAFormModelObj.setFormModelExtensionObj(frmConfirmTransferKAFormModelExtObj);
        appContext.setFormController("frmConfirmTransferKA", frmConfirmTransferKAControllerObj);
		
		//new pay person
        var frmNewPayPersonKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmNewPayPersonKAConfig);
        var frmNewPayPersonKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmNewPayPersonKAController", appContext, frmNewPayPersonKAModelConfigObj);
        var frmNewPayPersonKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmNewPayPersonKAControllerExtension", frmNewPayPersonKAControllerObj);
        frmNewPayPersonKAControllerObj.setControllerExtensionObject(frmNewPayPersonKAControllerExtObj);
        var frmNewPayPersonKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmNewPayPersonKAFormModel", frmNewPayPersonKAControllerObj);
        var frmNewPayPersonKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmNewPayPersonKAFormModelExtension", frmNewPayPersonKAFormModelObj);
        frmNewPayPersonKAFormModelObj.setFormModelExtensionObj(frmNewPayPersonKAFormModelExtObj);
        appContext.setFormController("frmNewPayPersonKA", frmNewPayPersonKAControllerObj);

      	//add p2p add new person
        var frmP2PaddnewPayeeKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmP2PaddnewPayeeKAConfig);
        var frmP2PaddnewPayeeKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmP2PaddnewPayeeKAController", appContext, frmP2PaddnewPayeeKAModelConfigObj);
        var frmP2PaddnewPayeeKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmP2PaddnewPayeeKAControllerExtension", frmP2PaddnewPayeeKAControllerObj);
        frmP2PaddnewPayeeKAControllerObj.setControllerExtensionObject(frmP2PaddnewPayeeKAControllerExtObj);
        var frmP2PaddnewPayeeKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmP2PaddnewPayeeKAFormModel", frmP2PaddnewPayeeKAControllerObj);
        var frmP2PaddnewPayeeKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmP2PaddnewPayeeKAFormModelExtension", frmP2PaddnewPayeeKAFormModelObj);
        frmP2PaddnewPayeeKAFormModelObj.setFormModelExtensionObj(frmP2PaddnewPayeeKAFormModelExtObj);
        appContext.setFormController("frmP2PaddnewPayeeKA", frmP2PaddnewPayeeKAControllerObj);	
		
		 //frmDeposits
       var frmDepositPayLandingKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmDepositPayLandingKAConfig);
        var frmDepositPayLandingKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmDepositPayLandingKAController", appContext, frmDepositPayLandingKAModelConfigObj);
        var frmDepositPayLandingKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmDepositPayLandingKAControllerExtension", frmDepositPayLandingKAControllerObj);
        frmDepositPayLandingKAControllerObj.setControllerExtensionObject(frmDepositPayLandingKAControllerExtObj);
        var frmDepositPayLandingKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmDepositPayLandingKAFormModel", frmDepositPayLandingKAControllerObj);
        var frmDepositPayLandingKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmDepositPayLandingKAFormModelExtension", frmDepositPayLandingKAFormModelObj);
        frmDepositPayLandingKAFormModelObj.setFormModelExtensionObj(frmDepositPayLandingKAFormModelExtObj);
        appContext.setFormController("frmDepositPayLandingKA", frmDepositPayLandingKAControllerObj);

        //addExternalAccount
        var addExternalAccountModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(addExternalAccountConfig);
        var addExternalAccountControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.addExternalAccountController", appContext, addExternalAccountModelConfigObj);
        var addExternalAccountControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.addExternalAccountControllerExtension", addExternalAccountControllerObj);
        addExternalAccountControllerObj.setControllerExtensionObject(addExternalAccountControllerExtObj);
        var addExternalAccountFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.addExternalAccountFormModel", addExternalAccountControllerObj);
        var addExternalAccountFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.addExternalAccountFormModelExtension", addExternalAccountFormModelObj);
        addExternalAccountFormModelObj.setFormModelExtensionObj(addExternalAccountFormModelExtObj);
        appContext.setFormController("addExternalAccount", addExternalAccountControllerObj);
		
		//p2p confirm transfer
		var frmP2PConfirmTransferKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmP2PConfirmTransferKAConfig);
        var frmP2PConfirmTransferKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmP2PConfirmTransferKAController", appContext, frmP2PConfirmTransferKAModelConfigObj);
        var frmP2PConfirmTransferKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmP2PConfirmTransferKAControllerExtension", frmP2PConfirmTransferKAControllerObj);
        frmP2PConfirmTransferKAControllerObj.setControllerExtensionObject(frmP2PConfirmTransferKAControllerExtObj);
        var frmP2PConfirmTransferKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmP2PConfirmTransferKAFormModel", frmP2PConfirmTransferKAControllerObj);
        var frmP2PConfirmTransferKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmP2PConfirmTransferKAFormModelExtension", frmP2PConfirmTransferKAFormModelObj);
        frmP2PConfirmTransferKAFormModelObj.setFormModelExtensionObj(frmP2PConfirmTransferKAFormModelExtObj);
        appContext.setFormController("frmP2PConfirmTransferKA", frmP2PConfirmTransferKAControllerObj);
          
       //frmSearchOptionsKA
        var frmSearchOptionsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmSearchOptionsKAConfig);
        var frmSearchOptionsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmSearchOptionsKAController", appContext, frmSearchOptionsKAModelConfigObj);
        var frmSearchOptionsKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmSearchOptionsKAControllerExtension", frmSearchOptionsKAControllerObj);
        frmSearchOptionsKAControllerObj.setControllerExtensionObject(frmSearchOptionsKAControllerExtObj);
        var frmSearchOptionsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmSearchOptionsKAFormModel", frmSearchOptionsKAControllerObj);
        var frmSearchOptionsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmSearchOptionsKAFormModelExtension", frmSearchOptionsKAFormModelObj);
        frmSearchOptionsKAFormModelObj.setFormModelExtensionObj(frmSearchOptionsKAFormModelExtObj);
        appContext.setFormController("frmSearchOptionsKA", frmSearchOptionsKAControllerObj);

        //pAY  BILL
        var frmNewBillKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmNewBillKAConfig);
        var frmNewBillKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmNewBillKAController", appContext, frmNewBillKAModelConfigObj);
        var frmNewBillKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmNewBillKAControllerExtension", frmNewBillKAControllerObj);
        frmNewBillKAControllerObj.setControllerExtensionObject(frmNewBillKAControllerExtObj);
        var frmNewBillKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmNewBillKAFormModel", frmNewBillKAControllerObj);
        var frmNewBillKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmNewBillKAFormModelExtension", frmNewBillKAFormModelObj);
        frmNewBillKAFormModelObj.setFormModelExtensionObj(frmNewBillKAFormModelExtObj);
        appContext.setFormController("frmNewBillKA", frmNewBillKAControllerObj);

        //ManageCards
        var frmManageCardsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmManageCardsKAConfig);
        var frmManageCardsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmManageCardsKAController", appContext, frmManageCardsKAModelConfigObj);
        var frmManageCardsKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmManageCardsKAControllerExtension", frmManageCardsKAControllerObj);
        frmManageCardsKAControllerObj.setControllerExtensionObject(frmManageCardsKAControllerExtObj);
        var frmManageCardsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmManageCardsKAFormModel", frmManageCardsKAControllerObj);
        var frmManageCardsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmManageCardsKAFormModelExtension", frmManageCardsKAFormModelObj);
        frmManageCardsKAFormModelObj.setFormModelExtensionObj(frmManageCardsKAFormModelExtObj);
        appContext.setFormController("frmManageCardsKA", frmManageCardsKAControllerObj);

        //DepositLanding
      kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Initializing app");
        var depositLandingModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(depositLandingConfig);
        var depositLandingControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.depositLandingController", appContext, depositLandingModelConfigObj);
        var depositLandingControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.depositLandingControllerExtension", depositLandingControllerObj);
        depositLandingControllerObj.setControllerExtensionObject(depositLandingControllerExtObj);
        var depositLandingFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.depositLandingFormModel", depositLandingControllerObj);
        var depositLandingFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.depositLandingFormModelExtension", depositLandingFormModelObj);
        depositLandingFormModelObj.setFormModelExtensionObj(depositLandingFormModelExtObj);
        appContext.setFormController("depositLanding", depositLandingControllerObj);


       //ConfirmDeposit
	   kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Initializing app");
        var frmConfirmDepositModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmConfirmDepositConfig);
        var frmConfirmDepositControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmConfirmDepositController", appContext, frmConfirmDepositModelConfigObj);
        var frmConfirmDepositControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmConfirmDepositControllerExtension", frmConfirmDepositControllerObj);
        frmConfirmDepositControllerObj.setControllerExtensionObject(frmConfirmDepositControllerExtObj);
        var frmConfirmDepositFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmConfirmDepositFormModel", frmConfirmDepositControllerObj);
        var frmConfirmDepositFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmConfirmDepositFormModelExtension", frmConfirmDepositFormModelObj);
        frmConfirmDepositFormModelObj.setFormModelExtensionObj(frmConfirmDepositFormModelExtObj);
        appContext.setFormController("frmConfirmDeposit", frmConfirmDepositControllerObj);

        //addNewPayee
        var addNewPayeeModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(addNewPayeeConfig);
        var addNewPayeeControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.addNewPayeeController", appContext, addNewPayeeModelConfigObj);
        var addNewPayeeControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.addNewPayeeControllerExtension", addNewPayeeControllerObj);
        addNewPayeeControllerObj.setControllerExtensionObject(addNewPayeeControllerExtObj);
        var addNewPayeeFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.addNewPayeeFormModel", addNewPayeeControllerObj);
        var addNewPayeeFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.addNewPayeeFormModelExtension", addNewPayeeFormModelObj);
        addNewPayeeFormModelObj.setFormModelExtensionObj(addNewPayeeFormModelExtObj);
        appContext.setFormController("addNewPayee", addNewPayeeControllerObj);


     
      //frmDeviceDeRegistrationKA
      	var frmDeviceDeRegistrationKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmDeviceDeRegistrationKAConfig);
        var frmDeviceDeRegistrationKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmDeviceDeRegistrationKAController", appContext, frmDeviceDeRegistrationKAModelConfigObj);
        var frmDeviceDeRegistrationKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmDeviceDeRegistrationKAControllerExtension", frmDeviceDeRegistrationKAControllerObj);
        frmDeviceDeRegistrationKAControllerObj.setControllerExtensionObject(frmDeviceDeRegistrationKAControllerExtObj);
        var frmDeviceDeRegistrationKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmDeviceDeRegistrationKAFormModel", frmDeviceDeRegistrationKAControllerObj);
        var frmDeviceDeRegistrationKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmDeviceDeRegistrationKAFormModelExtension", frmDeviceDeRegistrationKAFormModelObj);
        frmDeviceDeRegistrationKAFormModelObj.setFormModelExtensionObj(frmDeviceDeRegistrationKAFormModelExtObj);
        appContext.setFormController("frmDeviceDeRegistrationKA", frmDeviceDeRegistrationKAControllerObj);
		

        //NewAccountOpening
        var frmEnterLocationKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmEnterLocationKAConfig);
        var frmEnterLocationKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmEnterLocationKAController", appContext, frmEnterLocationKAModelConfigObj);
        var frmEnterLocationKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmEnterLocationKAControllerExtension", frmEnterLocationKAControllerObj);
        frmEnterLocationKAControllerObj.setControllerExtensionObject(frmEnterLocationKAControllerExtObj);
        var frmEnterLocationKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmEnterLocationKAFormModel", frmEnterLocationKAControllerObj);
        var frmEnterLocationKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmEnterLocationKAFormModelExtension", frmEnterLocationKAFormModelObj);
        frmEnterLocationKAFormModelObj.setFormModelExtensionObj(frmEnterLocationKAFormModelExtObj);
        appContext.setFormController("frmEnterLocationKA", frmEnterLocationKAControllerObj);
		
		//manage payee
		var frmRegisterKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmRegisterKAConfig);
        var frmRegisterKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmRegisterKAController", appContext, frmRegisterKAModelConfigObj);
        var frmRegisterKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmRegisterKAControllerExtension", frmRegisterKAControllerObj);
        frmRegisterKAControllerObj.setControllerExtensionObject(frmRegisterKAControllerExtObj);
        var frmRegisterKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmRegisterKAFormModel", frmRegisterKAControllerObj);
        var frmRegisterKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmRegisterKAFormModelExtension", frmRegisterKAFormModelObj);
        frmRegisterKAFormModelObj.setFormModelExtensionObj(frmRegisterKAFormModelExtObj);
        appContext.setFormController("frmRegisterKA", frmRegisterKAControllerObj); 
		
		//more landing
		var moreLandingModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(moreLandingConfig);
        var moreLandingControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.moreLandingController", appContext, moreLandingModelConfigObj);
        var moreLandingControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.moreLandingControllerExtension", moreLandingControllerObj);
        moreLandingControllerObj.setControllerExtensionObject(moreLandingControllerExtObj);
        var moreLandingFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.moreLandingFormModel", moreLandingControllerObj);
        var moreLandingFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.moreLandingFormModelExtension", moreLandingFormModelObj);
        moreLandingFormModelObj.setFormModelExtensionObj(moreLandingFormModelExtObj);
        appContext.setFormController("moreLanding", moreLandingControllerObj);

 
      
      //frmUserSettingsEditPersonalDetailsKA
        var frmUserSettingsEditPersonalDetailsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmUserSettingsEditPersonalDetailsKAConfig);
        var frmUserSettingsEditPersonalDetailsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmUserSettingsEditPersonalDetailsKAController", appContext, frmUserSettingsEditPersonalDetailsKAModelConfigObj);
        var frmUserSettingsEditPersonalDetailsKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmUserSettingsEditPersonalDetailsKAControllerExtension", frmUserSettingsEditPersonalDetailsKAControllerObj);
        frmUserSettingsEditPersonalDetailsKAControllerObj.setControllerExtensionObject(frmUserSettingsEditPersonalDetailsKAControllerExtObj);
        var frmUserSettingsEditPersonalDetailsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmUserSettingsEditPersonalDetailsKAFormModel", frmUserSettingsEditPersonalDetailsKAControllerObj);
        var frmUserSettingsEditPersonalDetailsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmUserSettingsEditPersonalDetailsKAFormModelExtension", frmUserSettingsEditPersonalDetailsKAFormModelObj);
        frmUserSettingsEditPersonalDetailsKAFormModelObj.setFormModelExtensionObj(frmUserSettingsEditPersonalDetailsKAFormModelExtObj);
        appContext.setFormController("frmUserSettingsEditPersonalDetailsKA", frmUserSettingsEditPersonalDetailsKAControllerObj);

           //frmUserSettingsEditUsernameKA
        var frmUserSettingsEditUsernameKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmUserSettingsEditUsernameKAConfig);
        var frmUserSettingsEditUsernameKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmUserSettingsEditUsernameKAController", appContext, frmUserSettingsEditUsernameKAModelConfigObj);
        var frmUserSettingsEditUsernameKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmUserSettingsEditUsernameKAControllerExtension", frmUserSettingsEditUsernameKAControllerObj);
        frmUserSettingsEditUsernameKAControllerObj.setControllerExtensionObject(frmUserSettingsEditUsernameKAControllerExtObj);
        var frmUserSettingsEditUsernameKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmUserSettingsEditUsernameKAFormModel", frmUserSettingsEditUsernameKAControllerObj);
        var frmUserSettingsEditUsernameKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmUserSettingsEditUsernameKAFormModelExtension", frmUserSettingsEditUsernameKAFormModelObj);
        frmUserSettingsEditUsernameKAFormModelObj.setFormModelExtensionObj(frmUserSettingsEditUsernameKAFormModelExtObj);
        appContext.setFormController("frmUserSettingsEditUsernameKA", frmUserSettingsEditUsernameKAControllerObj);
      
      
       
      //UserSettingsEditPasswordKA
		var frmUserSettingsEditPasswordKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmUserSettingsEditPasswordKAConfig);
        var frmUserSettingsEditPasswordKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmUserSettingsEditPasswordKAController", appContext, frmUserSettingsEditPasswordKAModelConfigObj);
        var frmUserSettingsEditPasswordKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmUserSettingsEditPasswordKAControllerExtension", frmUserSettingsEditPasswordKAControllerObj);
        frmUserSettingsEditPasswordKAControllerObj.setControllerExtensionObject(frmUserSettingsEditPasswordKAControllerExtObj);
        var frmUserSettingsEditPasswordKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmUserSettingsEditPasswordKAFormModel", frmUserSettingsEditPasswordKAControllerObj);
        var frmUserSettingsEditPasswordKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmUserSettingsEditPasswordKAFormModelExtension", frmUserSettingsEditPasswordKAFormModelObj);
        frmUserSettingsEditPasswordKAFormModelObj.setFormModelExtensionObj(frmUserSettingsEditPasswordKAFormModelExtObj);
        appContext.setFormController("frmUserSettingsEditPasswordKA", frmUserSettingsEditPasswordKAControllerObj);

        
      //DepositSucces
      
       kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Initializing app");
        var frmDepositSuccessKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmDepositSuccessKAConfig);
        var frmDepositSuccessKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmDepositSuccessKAController", appContext, frmDepositSuccessKAModelConfigObj);
        var frmDepositSuccessKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmDepositSuccessKAControllerExtension", frmDepositSuccessKAControllerObj);
        frmDepositSuccessKAControllerObj.setControllerExtensionObject(frmDepositSuccessKAControllerExtObj);
        var frmDepositSuccessKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmDepositSuccessKAFormModel", frmDepositSuccessKAControllerObj);
        var frmDepositSuccessKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmDepositSuccessKAFormModelExtension", frmDepositSuccessKAFormModelObj);
        frmDepositSuccessKAFormModelObj.setFormModelExtensionObj(frmDepositSuccessKAFormModelExtObj);
        appContext.setFormController("frmDepositSuccessKA", frmDepositSuccessKAControllerObj);
		
		//frmMyMoneyKA
        var frmMyMoneyKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmMyMoneyKAConfig);
        var frmMyMoneyKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmMyMoneyKAController", appContext, frmMyMoneyKAModelConfigObj);
        var frmMyMoneyKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmMyMoneyKAControllerExtension", frmMyMoneyKAControllerObj);
        frmMyMoneyKAControllerObj.setControllerExtensionObject(frmMyMoneyKAControllerExtObj);
        var frmMyMoneyKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmMyMoneyKAFormModel", frmMyMoneyKAControllerObj);
        var frmMyMoneyKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmMyMoneyKAFormModelExtension", frmMyMoneyKAFormModelObj);
        frmMyMoneyKAFormModelObj.setFormModelExtensionObj(frmMyMoneyKAFormModelExtObj);
        appContext.setFormController("frmMyMoneyKA", frmMyMoneyKAControllerObj);

        
        //frmUncategorizedTransactionsKA
        var frmUncategorizedTransactionsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmUncategorizedTransactionsKAConfig);
        var frmUncategorizedTransactionsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmUncategorizedTransactionsKAController", appContext, frmUncategorizedTransactionsKAModelConfigObj);
        var frmUncategorizedTransactionsKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmUncategorizedTransactionsKAControllerExtension", frmUncategorizedTransactionsKAControllerObj);
        frmUncategorizedTransactionsKAControllerObj.setControllerExtensionObject(frmUncategorizedTransactionsKAControllerExtObj);
        var frmUncategorizedTransactionsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmUncategorizedTransactionsKAFormModel", frmUncategorizedTransactionsKAControllerObj);
        var frmUncategorizedTransactionsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmUncategorizedTransactionsKAFormModelExtension", frmUncategorizedTransactionsKAFormModelObj);
        frmUncategorizedTransactionsKAFormModelObj.setFormModelExtensionObj(frmUncategorizedTransactionsKAFormModelExtObj);
        appContext.setFormController("frmUncategorizedTransactionsKA", frmUncategorizedTransactionsKAControllerObj);
		
		//moreInterestRates
        var moreInterestRatesModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(moreInterestRatesConfig);
        var moreInterestRatesControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.moreInterestRatesController", appContext, moreInterestRatesModelConfigObj);
        var moreInterestRatesControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.moreInterestRatesControllerExtension", moreInterestRatesControllerObj);
        moreInterestRatesControllerObj.setControllerExtensionObject(moreInterestRatesControllerExtObj);
        var moreInterestRatesFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.moreInterestRatesFormModel", moreInterestRatesControllerObj);
        var moreInterestRatesFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.moreInterestRatesFormModelExtension", moreInterestRatesFormModelObj);
        moreInterestRatesFormModelObj.setFormModelExtensionObj(moreInterestRatesFormModelExtObj);
        appContext.setFormController("moreInterestRates", moreInterestRatesControllerObj);
      
      	//frmTransactionDetailKA
		var frmTransactionDetailKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmTransactionDetailKAConfig);
        var frmTransactionDetailKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmTransactionDetailKAController", appContext, frmTransactionDetailKAModelConfigObj);
        var frmTransactionDetailKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmTransactionDetailKAControllerExtension", frmTransactionDetailKAControllerObj);
        frmTransactionDetailKAControllerObj.setControllerExtensionObject(frmTransactionDetailKAControllerExtObj);
        var frmTransactionDetailKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmTransactionDetailKAFormModel", frmTransactionDetailKAControllerObj);
        var frmTransactionDetailKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmTransactionDetailKAFormModelExtension", frmTransactionDetailKAFormModelObj);
        frmTransactionDetailKAFormModelObj.setFormModelExtensionObj(frmTransactionDetailKAFormModelExtObj);
        appContext.setFormController("frmTransactionDetailKA", frmTransactionDetailKAControllerObj);
		
		//Foreign Exchange 
        var moreForeignExchangeRatesModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(moreForeignExchangeRatesConfig);
        var moreForeignExchangeRatesControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.moreForeignExchangeRatesController", appContext, moreForeignExchangeRatesModelConfigObj);
        var moreForeignExchangeRatesControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.moreForeignExchangeRatesControllerExtension", moreForeignExchangeRatesControllerObj);
        moreForeignExchangeRatesControllerObj.setControllerExtensionObject(moreForeignExchangeRatesControllerExtObj);
        var moreForeignExchangeRatesFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.moreForeignExchangeRatesFormModel", moreForeignExchangeRatesControllerObj);
        var moreForeignExchangeRatesFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.moreForeignExchangeRatesFormModelExtension", moreForeignExchangeRatesFormModelObj);
        moreForeignExchangeRatesFormModelObj.setFormModelExtensionObj(moreForeignExchangeRatesFormModelExtObj);
        appContext.setFormController("moreForeignExchangeRates", moreForeignExchangeRatesControllerObj);
      
      //frmNewMessageKA
       var frmNewMessageKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmNewMessageKAConfig);
        var frmNewMessageKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmNewMessageKAController", appContext, frmNewMessageKAModelConfigObj);
        var frmNewMessageKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmNewMessageKAControllerExtension", frmNewMessageKAControllerObj);
        frmNewMessageKAControllerObj.setControllerExtensionObject(frmNewMessageKAControllerExtObj);
        var frmNewMessageKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmNewMessageKAFormModel", frmNewMessageKAControllerObj);
        var frmNewMessageKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmNewMessageKAFormModelExtension", frmNewMessageKAFormModelObj);
        frmNewMessageKAFormModelObj.setFormModelExtensionObj(frmNewMessageKAFormModelExtObj);
        appContext.setFormController("frmNewMessageKA", frmNewMessageKAControllerObj);

      //FrmMessageDraft
        var frmMessageDraftKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmMessageDraftKAConfig);
        var frmMessageDraftKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmMessageDraftKAController", appContext, frmMessageDraftKAModelConfigObj);
        var frmMessageDraftKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmMessageDraftKAControllerExtension", frmMessageDraftKAControllerObj);
        frmMessageDraftKAControllerObj.setControllerExtensionObject(frmMessageDraftKAControllerExtObj);
        var frmMessageDraftKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmMessageDraftKAFormModel", frmMessageDraftKAControllerObj);
        var frmMessageDraftKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmMessageDraftKAFormModelExtension", frmMessageDraftKAFormModelObj);
        frmMessageDraftKAFormModelObj.setFormModelExtensionObj(frmMessageDraftKAFormModelExtObj);
        appContext.setFormController("frmMessageDraftKA", frmMessageDraftKAControllerObj);
      
       //frmSearchTransactionDetailsKA
        var frmSearchTransactionDetailsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmSearchTransactionDetailsKAConfig);
        var frmSearchTransactionDetailsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmSearchTransactionDetailsKAController", appContext, frmSearchTransactionDetailsKAModelConfigObj);
        var frmSearchTransactionDetailsKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmSearchTransactionDetailsKAControllerExtension", frmSearchTransactionDetailsKAControllerObj);
        frmSearchTransactionDetailsKAControllerObj.setControllerExtensionObject(frmSearchTransactionDetailsKAControllerExtObj);
        var frmSearchTransactionDetailsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmSearchTransactionDetailsKAFormModel", frmSearchTransactionDetailsKAControllerObj);
        var frmSearchTransactionDetailsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmSearchTransactionDetailsKAFormModelExtension", frmSearchTransactionDetailsKAFormModelObj);
        frmSearchTransactionDetailsKAFormModelObj.setFormModelExtensionObj(frmSearchTransactionDetailsKAFormModelExtObj);
        appContext.setFormController("frmSearchTransactionDetailsKA", frmSearchTransactionDetailsKAControllerObj);

       //Successform
       var successFormModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(successFormConfig);
        var successFormControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.successFormController", appContext, successFormModelConfigObj);
        var successFormControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.successFormControllerExtension", successFormControllerObj);
        successFormControllerObj.setControllerExtensionObject(successFormControllerExtObj);
        var successFormFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.successFormFormModel", successFormControllerObj);
        var successFormFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.successFormFormModelExtension", successFormFormModelObj);
        successFormFormModelObj.setFormModelExtensionObj(successFormFormModelExtObj);
        appContext.setFormController("successForm", successFormControllerObj);
		
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


        kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
    } catch (err) {
        kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
        var exception = appContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_APP_INIT_FORMS, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_APP_INIT_FORMS, err);
        kony.sdk.mvvm.log.error(exception.toString());
        throw exception;
    }
};