kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.initApplicationForms = function(appContext) {
    try {
        kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("");
		
		var frmDashboardKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmDashboardKAConfig);
        var frmDashboardKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmDashboardKAController", appContext, frmDashboardKAModelConfigObj);
        var frmDashboardKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmDashboardKAControllerExtension", frmDashboardKAControllerObj);
        frmDashboardKAControllerObj.setControllerExtensionObject(frmDashboardKAControllerExtObj);
        var frmDashboardKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmDashboardKAFormModel", frmDashboardKAControllerObj);
        var frmDashboardKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmDashboardKAFormModelExtension", frmDashboardKAFormModelObj);
        frmDashboardKAFormModelObj.setFormModelExtensionObj(frmDashboardKAFormModelExtObj);
        appContext.setFormController("frmDashboardKA", frmDashboardKAControllerObj);
		
		 //Used For AccountInformation
    var frmInformationKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmInformationKAConfig);
    var frmInformationKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmInformationKAController", appContext, frmInformationKAModelConfigObj);
    var frmInformationKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmInformationKAControllerExtension", frmInformationKAControllerObj);
    frmInformationKAControllerObj.setControllerExtensionObject(frmInformationKAControllerExtObj);
    var frmInformationKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmInformationKAFormModel", frmInformationKAControllerObj);
    var frmInformationKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmInformationKAFormModelExtension", frmInformationKAFormModelObj);
    frmInformationKAFormModelObj.setFormModelExtensionObj(frmInformationKAFormModelExtObj);
    appContext.setFormController("frmInformationKA", frmInformationKAControllerObj);
    
    //Used For AccountSummaryKA
    var frmAccountSummaryKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmAccountSummaryKAConfig);
    var frmAccountSummaryKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmAccountSummaryKAController", appContext, frmAccountSummaryKAModelConfigObj);
    var frmAccountSummaryKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmAccountSummaryKAControllerExtension", frmAccountSummaryKAControllerObj);
    frmAccountSummaryKAControllerObj.setControllerExtensionObject(frmAccountSummaryKAControllerExtObj);
    var frmAccountSummaryKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmAccountSummaryKAFormModel", frmAccountSummaryKAControllerObj);
    var frmAccountSummaryKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmAccountSummaryKAFormModelExtension", frmAccountSummaryKAFormModelObj);
    frmAccountSummaryKAFormModelObj.setFormModelExtensionObj(frmAccountSummaryKAFormModelExtObj);
    appContext.setFormController("frmAccountSummaryKA", frmAccountSummaryKAControllerObj);
	
	 var frmAccountStatementsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmAccountStatementsKAConfig);
        var frmAccountStatementsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmAccountStatementsKAController", appContext, frmAccountStatementsKAModelConfigObj);
        var frmAccountStatementsKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmAccountStatementsKAControllerExtension", frmAccountStatementsKAControllerObj);
        frmAccountStatementsKAControllerObj.setControllerExtensionObject(frmAccountStatementsKAControllerExtObj);
        var frmAccountStatementsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmAccountStatementsKAFormModel", frmAccountStatementsKAControllerObj);
        var frmAccountStatementsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmAccountStatementsKAFormModelExtension", frmAccountStatementsKAFormModelObj);
        frmAccountStatementsKAFormModelObj.setFormModelExtensionObj(frmAccountStatementsKAFormModelExtObj);
        appContext.setFormController("frmAccountStatementsKA", frmAccountStatementsKAControllerObj);
		

	//MakeTransfers
		var frmMakeTransferKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmMakeTransferKAConfig);
        var frmMakeTransferKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmMakeTransferKAController", appContext, frmMakeTransferKAModelConfigObj);
        var frmMakeTransferKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmMakeTransferKAControllerExtension", frmMakeTransferKAControllerObj);
        frmMakeTransferKAControllerObj.setControllerExtensionObject(frmMakeTransferKAControllerExtObj);
        var frmMakeTransferKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmMakeTransferKAFormModel", frmMakeTransferKAControllerObj);
        var frmMakeTransferKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmMakeTransferKAFormModelExtension", frmMakeTransferKAFormModelObj);
        frmMakeTransferKAFormModelObj.setFormModelExtensionObj(frmMakeTransferKAFormModelExtObj);
        appContext.setFormController("frmMakeTransferKA", frmMakeTransferKAControllerObj);
		
      	var frmMakeTransferAcknowModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmMakeTransferAcknowConfig);
        var frmMakeTransferAcknowControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmMakeTransferAcknowController", appContext, frmMakeTransferAcknowModelConfigObj);
        var frmMakeTransferAcknowControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmMakeTransferAcknowControllerExtension", frmMakeTransferAcknowControllerObj);
        frmMakeTransferAcknowControllerObj.setControllerExtensionObject(frmMakeTransferAcknowControllerExtObj);
        var frmMakeTransferAcknowFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmMakeTransferAcknowFormModel", frmMakeTransferAcknowControllerObj);
        var frmMakeTransferAcknowFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmMakeTransferAcknowFormModelExtension", frmMakeTransferAcknowFormModelObj);
        frmMakeTransferAcknowFormModelObj.setFormModelExtensionObj(frmMakeTransferAcknowFormModelExtObj);
        appContext.setFormController("frmMakeTransferAcknow", frmMakeTransferAcknowControllerObj);

        //frmOtherFinacialKA
        var frmOtherFinancialKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmOtherFinancialKAConfig);
        var frmOtherFinancialKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmOtherFinancialKAController", appContext, frmOtherFinancialKAModelConfigObj);
        var frmOtherFinancialKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmOtherFinancialKAControllerExtension", frmOtherFinancialKAControllerObj);
        frmOtherFinancialKAControllerObj.setControllerExtensionObject(frmOtherFinancialKAControllerExtObj);
        var frmOtherFinancialKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmOtherFinancialKAFormModel", frmOtherFinancialKAControllerObj);
        var frmOtherFinancialKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmOtherFinancialKAFormModelExtension", frmOtherFinancialKAFormModelObj);
        frmOtherFinancialKAFormModelObj.setFormModelExtensionObj(frmOtherFinancialKAFormModelExtObj);
        appContext.setFormController("frmOtherFinancialKA", frmOtherFinancialKAControllerObj);

        //frmAddFinancialKA
        var frmAddFinancialKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmAddFinancialKAConfig);
        var frmAddFinancialKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmAddFinancialKAController", appContext, frmAddFinancialKAModelConfigObj);
        var frmAddFinancialKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmAddFinancialKAControllerExtension", frmAddFinancialKAControllerObj);
        frmAddFinancialKAControllerObj.setControllerExtensionObject(frmAddFinancialKAControllerExtObj);
        var frmAddFinancialKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmAddFinancialKAFormModel", frmAddFinancialKAControllerObj);
        var frmAddFinancialKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmAddFinancialKAFormModelExtension", frmAddFinancialKAFormModelObj);
        frmAddFinancialKAFormModelObj.setFormModelExtensionObj(frmAddFinancialKAFormModelExtObj);
        appContext.setFormController("frmAddFinancialKA", frmAddFinancialKAControllerObj);
		
			// 
		var frmAcceptStatementsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmAcceptStatementsKAConfig);
        var frmAcceptStatementsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmAcceptStatementsKAController", appContext, frmAcceptStatementsKAModelConfigObj);
        var frmAcceptStatementsKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmAcceptStatementsKAControllerExtension", frmAcceptStatementsKAControllerObj);
        frmAcceptStatementsKAControllerObj.setControllerExtensionObject(frmAcceptStatementsKAControllerExtObj);
        var frmAcceptStatementsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmAcceptStatementsKAFormModel", frmAcceptStatementsKAControllerObj);
        var frmAcceptStatementsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmAcceptStatementsKAFormModelExtension", frmAcceptStatementsKAFormModelObj);
        frmAcceptStatementsKAFormModelObj.setFormModelExtensionObj(frmAcceptStatementsKAFormModelExtObj);
        appContext.setFormController("frmAcceptStatementsKA", frmAcceptStatementsKAControllerObj);
        
         //frmAccountEditKA
		  var frmAccountInfoEditKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmAccountInfoEditKAConfig);
        var frmAccountInfoEditKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmAccountInfoEditKAController", appContext, frmAccountInfoEditKAModelConfigObj);
        var frmAccountInfoEditKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmAccountInfoEditKAControllerExtension", frmAccountInfoEditKAControllerObj);
        frmAccountInfoEditKAControllerObj.setControllerExtensionObject(frmAccountInfoEditKAControllerExtObj);
        var frmAccountInfoEditKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmAccountInfoEditKAFormModel", frmAccountInfoEditKAControllerObj);
        var frmAccountInfoEditKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmAccountInfoEditKAFormModelExtension", frmAccountInfoEditKAFormModelObj);
        frmAccountInfoEditKAFormModelObj.setFormModelExtensionObj(frmAccountInfoEditKAFormModelExtObj);
        appContext.setFormController("frmAccountInfoEditKA", frmAccountInfoEditKAControllerObj);

        //frmCardsListKA
        var frmCardsListKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmCardsListKAConfig);
        var frmCardsListKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmCardsListKAController", appContext, frmCardsListKAModelConfigObj);
        var frmCardsListKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmCardsListKAControllerExtension", frmCardsListKAControllerObj);
        frmCardsListKAControllerObj.setControllerExtensionObject(frmCardsListKAControllerExtObj);
        var frmCardsListKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmCardsListKAFormModel", frmCardsListKAControllerObj);
        var frmCardsListKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmCardsListKAFormModelExtension", frmCardsListKAFormModelObj);
        frmCardsListKAFormModelObj.setFormModelExtensionObj(frmCardsListKAFormModelExtObj);
        appContext.setFormController("frmCardsListKA", frmCardsListKAControllerObj);


        //frmCardDetailsKA
        var frmCardDetailsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmCardDetailsKAConfig);
        var frmCardDetailsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmCardDetailsKAController", appContext, frmCardDetailsKAModelConfigObj);
        var frmCardDetailsKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmCardDetailsKAControllerExtension", frmCardDetailsKAControllerObj);
        frmCardDetailsKAControllerObj.setControllerExtensionObject(frmCardDetailsKAControllerExtObj);
        var frmCardDetailsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmCardDetailsKAFormModel", frmCardDetailsKAControllerObj);
        var frmCardDetailsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmCardDetailsKAFormModelExtension", frmCardDetailsKAFormModelObj);
        frmCardDetailsKAFormModelObj.setFormModelExtensionObj(frmCardDetailsKAFormModelExtObj);
        appContext.setFormController("frmCardDetailsKA", frmCardDetailsKAControllerObj);
		
		var frmBillManageKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmBillManageKAConfig);
        var frmBillManageKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmBillManageKAController", appContext, frmBillManageKAModelConfigObj);
        var frmBillManageKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmBillManageKAControllerExtension", frmBillManageKAControllerObj);
        frmBillManageKAControllerObj.setControllerExtensionObject(frmBillManageKAControllerExtObj);
        var frmBillManageKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmBillManageKAFormModel", frmBillManageKAControllerObj);
        var frmBillManageKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmBillManageKAFormModelExtension", frmBillManageKAFormModelObj);
        frmBillManageKAFormModelObj.setFormModelExtensionObj(frmBillManageKAFormModelExtObj);
        appContext.setFormController("frmBillManageKA", frmBillManageKAControllerObj);

        var frmBillRecentKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmBillRecentKAConfig);
        var frmBillRecentKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmBillRecentKAController", appContext, frmBillRecentKAModelConfigObj);
        var frmBillRecentKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmBillRecentKAControllerExtension", frmBillRecentKAControllerObj);
        frmBillRecentKAControllerObj.setControllerExtensionObject(frmBillRecentKAControllerExtObj);
        var frmBillRecentKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmBillRecentKAFormModel", frmBillRecentKAControllerObj);
        var frmBillRecentKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmBillRecentKAFormModelExtension", frmBillRecentKAFormModelObj);
        frmBillRecentKAFormModelObj.setFormModelExtensionObj(frmBillRecentKAFormModelExtObj);
        appContext.setFormController("frmBillRecentKA", frmBillRecentKAControllerObj);

        var frmBillScheduledKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmBillScheduledKAConfig);
        var frmBillScheduledKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmBillScheduledKAController", appContext, frmBillScheduledKAModelConfigObj);
        var frmBillScheduledKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmBillScheduledKAControllerExtension", frmBillScheduledKAControllerObj);
        frmBillScheduledKAControllerObj.setControllerExtensionObject(frmBillScheduledKAControllerExtObj);
        var frmBillScheduledKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmBillScheduledKAFormModel", frmBillScheduledKAControllerObj);
        var frmBillScheduledKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmBillScheduledKAFormModelExtension", frmBillScheduledKAFormModelObj);
        frmBillScheduledKAFormModelObj.setFormModelExtensionObj(frmBillScheduledKAFormModelExtObj);
        appContext.setFormController("frmBillScheduledKA", frmBillScheduledKAControllerObj);
		
        var frmConfirmBillPaymentKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmConfirmBillPaymentKAConfig);
        var frmConfirmBillPaymentKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmConfirmBillPaymentKAController", appContext, frmConfirmBillPaymentKAModelConfigObj);
        var frmConfirmBillPaymentKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmConfirmBillPaymentKAControllerExtension", frmConfirmBillPaymentKAControllerObj);
        frmConfirmBillPaymentKAControllerObj.setControllerExtensionObject(frmConfirmBillPaymentKAControllerExtObj);
        var frmConfirmBillPaymentKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmConfirmBillPaymentKAFormModel", frmConfirmBillPaymentKAControllerObj);
        var frmConfirmBillPaymentKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmConfirmBillPaymentKAFormModelExtension", frmConfirmBillPaymentKAFormModelObj);
        frmConfirmBillPaymentKAFormModelObj.setFormModelExtensionObj(frmConfirmBillPaymentKAFormModelExtObj);
        appContext.setFormController("frmConfirmBillPaymentKA", frmConfirmBillPaymentKAControllerObj);
      
        var frmPersonalDetailsStep2KAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmPersonalDetailsStep2KAConfig);
        var frmPersonalDetailsStep2KAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmPersonalDetailsStep2KAController", appContext, frmPersonalDetailsStep2KAModelConfigObj);
        var frmPersonalDetailsStep2KAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmPersonalDetailsStep2KAControllerExtension", frmPersonalDetailsStep2KAControllerObj);
        frmPersonalDetailsStep2KAControllerObj.setControllerExtensionObject(frmPersonalDetailsStep2KAControllerExtObj);
        var frmPersonalDetailsStep2KAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmPersonalDetailsStep2KAFormModel", frmPersonalDetailsStep2KAControllerObj);
        var frmPersonalDetailsStep2KAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmPersonalDetailsStep2KAFormModelExtension", frmPersonalDetailsStep2KAFormModelObj);
        frmPersonalDetailsStep2KAFormModelObj.setFormModelExtensionObj(frmPersonalDetailsStep2KAFormModelExtObj);
        appContext.setFormController("frmPersonalDetailsStep2KA", frmPersonalDetailsStep2KAControllerObj);
		
		var frmMoreAccAlertKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmMoreAccAlertKAConfig);
        var frmMoreAccAlertKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmMoreAccAlertKAController", appContext, frmMoreAccAlertKAModelConfigObj);
        var frmMoreAccAlertKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmMoreAccAlertKAControllerExtension", frmMoreAccAlertKAControllerObj);
        frmMoreAccAlertKAControllerObj.setControllerExtensionObject(frmMoreAccAlertKAControllerExtObj);
        var frmMoreAccAlertKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmMoreAccAlertKAFormModel", frmMoreAccAlertKAControllerObj);
        var frmMoreAccAlertKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmMoreAccAlertKAFormModelExtension", frmMoreAccAlertKAFormModelObj);
        frmMoreAccAlertKAFormModelObj.setFormModelExtensionObj(frmMoreAccAlertKAFormModelExtObj);
        appContext.setFormController("frmMoreAccAlertKA", frmMoreAccAlertKAControllerObj);
		
		var frmGeneralAlertsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmGeneralAlertsKAConfig);
        var frmGeneralAlertsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmGeneralAlertsKAController", appContext, frmGeneralAlertsKAModelConfigObj);
        var frmGeneralAlertsKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmGeneralAlertsKAControllerExtension", frmGeneralAlertsKAControllerObj);
        frmGeneralAlertsKAControllerObj.setControllerExtensionObject(frmGeneralAlertsKAControllerExtObj);
        var frmGeneralAlertsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmGeneralAlertsKAFormModel", frmGeneralAlertsKAControllerObj);
        var frmGeneralAlertsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmGeneralAlertsKAFormModelExtension", frmGeneralAlertsKAFormModelObj);
        frmGeneralAlertsKAFormModelObj.setFormModelExtensionObj(frmGeneralAlertsKAFormModelExtObj);
        appContext.setFormController("frmGeneralAlertsKA", frmGeneralAlertsKAControllerObj);

        var frmMessageNewKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmMessageNewKAConfig);
        var frmMessageNewKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmMessageNewKAController", appContext, frmMessageNewKAModelConfigObj);
        var frmMessageNewKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmMessageNewKAControllerExtension", frmMessageNewKAControllerObj);
        frmMessageNewKAControllerObj.setControllerExtensionObject(frmMessageNewKAControllerExtObj);
        var frmMessageNewKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmMessageNewKAFormModel", frmMessageNewKAControllerObj);
        var frmMessageNewKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmMessageNewKAFormModelExtension", frmMessageNewKAFormModelObj);
        frmMessageNewKAFormModelObj.setFormModelExtensionObj(frmMessageNewKAFormModelExtObj);
        appContext.setFormController("frmMessageNewKA", frmMessageNewKAControllerObj);
		
		//pay a person
		var frmPayAPersonKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmPayAPersonKAConfig);
        var frmPayAPersonKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmPayAPersonKAController", appContext, frmPayAPersonKAModelConfigObj);
        var frmPayAPersonKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmPayAPersonKAControllerExtension", frmPayAPersonKAControllerObj);
        frmPayAPersonKAControllerObj.setControllerExtensionObject(frmPayAPersonKAControllerExtObj);
        var frmPayAPersonKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmPayAPersonKAFormModel", frmPayAPersonKAControllerObj);
        var frmPayAPersonKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmPayAPersonKAFormModelExtension", frmPayAPersonKAFormModelObj);
        frmPayAPersonKAFormModelObj.setFormModelExtensionObj(frmPayAPersonKAFormModelExtObj);
        appContext.setFormController("frmPayAPersonKA", frmPayAPersonKAControllerObj);
		
		//confirm P2P form
        var frmPayABillKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmPayABillKAConfig);
        var frmPayABillKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmPayABillKAController", appContext, frmPayABillKAModelConfigObj);
        var frmPayABillKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmPayABillKAControllerExtension", frmPayABillKAControllerObj);
        frmPayABillKAControllerObj.setControllerExtensionObject(frmPayABillKAControllerExtObj);
        var frmPayABillKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmPayABillKAFormModel", frmPayABillKAControllerObj);
        var frmPayABillKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmPayABillKAFormModelExtension", frmPayABillKAFormModelObj);
        frmPayABillKAFormModelObj.setFormModelExtensionObj(frmPayABillKAFormModelExtObj);
      	appContext.setFormController("frmPayABillKA", frmPayABillKAControllerObj);
		
		//scheduled P2P
		var frmScheduledP2PKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmScheduledP2PKAConfig);
        var frmScheduledP2PKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmScheduledP2PKAController", appContext, frmScheduledP2PKAModelConfigObj);
        var frmScheduledP2PKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmScheduledP2PKAControllerExtension", frmScheduledP2PKAControllerObj);
        frmScheduledP2PKAControllerObj.setControllerExtensionObject(frmScheduledP2PKAControllerExtObj);
        var frmScheduledP2PKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmScheduledP2PKAFormModel", frmScheduledP2PKAControllerObj);
        var frmScheduledP2PKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmScheduledP2PKAFormModelExtension", frmScheduledP2PKAFormModelObj);
        frmScheduledP2PKAFormModelObj.setFormModelExtensionObj(frmScheduledP2PKAFormModelExtObj);
        appContext.setFormController("frmScheduledP2PKA", frmScheduledP2PKAControllerObj);
		
		//recent P2P
		var frmRecentP2PKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmRecentP2PKAConfig);
        var frmRecentP2PKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmRecentP2PKAController", appContext, frmRecentP2PKAModelConfigObj);
        var frmRecentP2PKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmRecentP2PKAControllerExtension", frmRecentP2PKAControllerObj);
        frmRecentP2PKAControllerObj.setControllerExtensionObject(frmRecentP2PKAControllerExtObj);
        var frmRecentP2PKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmRecentP2PKAFormModel", frmRecentP2PKAControllerObj);
        var frmRecentP2PKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmRecentP2PKAFormModelExtension", frmRecentP2PKAFormModelObj);
        frmRecentP2PKAFormModelObj.setFormModelExtensionObj(frmRecentP2PKAFormModelExtObj);
        appContext.setFormController("frmRecentP2PKA", frmRecentP2PKAControllerObj);
		
		//manage p2p payee
		var frmManagePayeeP2PKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmManagePayeeP2PKAConfig);
        var frmManagePayeeP2PKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmManagePayeeP2PKAController", appContext, frmManagePayeeP2PKAModelConfigObj);
        var frmManagePayeeP2PKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmManagePayeeP2PKAControllerExtension", frmManagePayeeP2PKAControllerObj);
        frmManagePayeeP2PKAControllerObj.setControllerExtensionObject(frmManagePayeeP2PKAControllerExtObj);
        var frmManagePayeeP2PKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmManagePayeeP2PKAFormModel", frmManagePayeeP2PKAControllerObj);
        var frmManagePayeeP2PKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmManagePayeeP2PKAFormModelExtension", frmManagePayeeP2PKAFormModelObj);
        frmManagePayeeP2PKAFormModelObj.setFormModelExtensionObj(frmManagePayeeP2PKAFormModelExtObj);
        appContext.setFormController("frmManagePayeeP2PKA", frmManagePayeeP2PKAControllerObj);
		
		//add new p2p payee
		var frmP2PaddNewPayeeKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmP2PaddNewPayeeKAConfig);
        var frmP2PaddNewPayeeKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmP2PaddNewPayeeKAController", appContext, frmP2PaddNewPayeeKAModelConfigObj);
        var frmP2PaddNewPayeeKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmP2PaddNewPayeeKAControllerExtension", frmP2PaddNewPayeeKAControllerObj);
        frmP2PaddNewPayeeKAControllerObj.setControllerExtensionObject(frmP2PaddNewPayeeKAControllerExtObj);
        var frmP2PaddNewPayeeKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmP2PaddNewPayeeKAFormModel", frmP2PaddNewPayeeKAControllerObj);
        var frmP2PaddNewPayeeKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmP2PaddNewPayeeKAFormModelExtension", frmP2PaddNewPayeeKAFormModelObj);
        frmP2PaddNewPayeeKAFormModelObj.setFormModelExtensionObj(frmP2PaddNewPayeeKAFormModelExtObj);
        appContext.setFormController("frmP2PaddNewPayeeKA", frmP2PaddNewPayeeKAControllerObj);
		
		 var frmPayeeTransactionsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmPayeeTransactionsKAConfig);
        var frmPayeeTransactionsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmPayeeTransactionsKAController", appContext, frmPayeeTransactionsKAModelConfigObj);
        var frmPayeeTransactionsKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmPayeeTransactionsKAControllerExtension", frmPayeeTransactionsKAControllerObj);
        frmPayeeTransactionsKAControllerObj.setControllerExtensionObject(frmPayeeTransactionsKAControllerExtObj);
        var frmPayeeTransactionsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmPayeeTransactionsKAFormModel", frmPayeeTransactionsKAControllerObj);
        var frmPayeeTransactionsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmPayeeTransactionsKAFormModelExtension", frmPayeeTransactionsKAFormModelObj);
        frmPayeeTransactionsKAFormModelObj.setFormModelExtensionObj(frmPayeeTransactionsKAFormModelExtObj);
        appContext.setFormController("frmPayeeTransactionsKA", frmPayeeTransactionsKAControllerObj);
      
        var frmEditPayeeKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmEditPayeeKAConfig);
        var frmEditPayeeKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmEditPayeeKAController", appContext, frmEditPayeeKAModelConfigObj);
        var frmEditPayeeKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmEditPayeeKAControllerExtension", frmEditPayeeKAControllerObj);
        frmEditPayeeKAControllerObj.setControllerExtensionObject(frmEditPayeeKAControllerExtObj);
        var frmEditPayeeKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmEditPayeeKAFormModel", frmEditPayeeKAControllerObj);
        var frmEditPayeeKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmEditPayeeKAFormModelExtension", frmEditPayeeKAFormModelObj);
        frmEditPayeeKAFormModelObj.setFormModelExtensionObj(frmEditPayeeKAFormModelExtObj);
        appContext.setFormController("frmEditPayeeKA", frmEditPayeeKAControllerObj);
      
        var frmPayeeDetailsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmPayeeDetailsKAConfig);
        var frmPayeeDetailsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmPayeeDetailsKAController", appContext, frmPayeeDetailsKAModelConfigObj);
        var frmPayeeDetailsKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmPayeeDetailsKAControllerExtension", frmPayeeDetailsKAControllerObj);
        frmPayeeDetailsKAControllerObj.setControllerExtensionObject(frmPayeeDetailsKAControllerExtObj);
        var frmPayeeDetailsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmPayeeDetailsKAFormModel", frmPayeeDetailsKAControllerObj);
        var frmPayeeDetailsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmPayeeDetailsKAFormModelExtension", frmPayeeDetailsKAFormModelObj);
        frmPayeeDetailsKAFormModelObj.setFormModelExtensionObj(frmPayeeDetailsKAFormModelExtObj);
        appContext.setFormController("frmPayeeDetailsKA", frmPayeeDetailsKAControllerObj);
      
        var frmAddNewPayeeKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmAddNewPayeeKAConfig);
        var frmAddNewPayeeKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmAddNewPayeeKAController", appContext, frmAddNewPayeeKAModelConfigObj);
        var frmAddNewPayeeKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmAddNewPayeeKAControllerExtension", frmAddNewPayeeKAControllerObj);
        frmAddNewPayeeKAControllerObj.setControllerExtensionObject(frmAddNewPayeeKAControllerExtObj);
        var frmAddNewPayeeKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmAddNewPayeeKAFormModel", frmAddNewPayeeKAControllerObj);
        var frmAddNewPayeeKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmAddNewPayeeKAFormModelExtension", frmAddNewPayeeKAFormModelObj);
        frmAddNewPayeeKAFormModelObj.setFormModelExtensionObj(frmAddNewPayeeKAFormModelExtObj);
        appContext.setFormController("frmAddNewPayeeKA", frmAddNewPayeeKAControllerObj);

          var frmMessageInboxKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmMessageInboxKAConfig);
        var frmMessageInboxKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmMessageInboxKAController", appContext, frmMessageInboxKAModelConfigObj);
        var frmMessageInboxKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmMessageInboxKAControllerExtension", frmMessageInboxKAControllerObj);
        frmMessageInboxKAControllerObj.setControllerExtensionObject(frmMessageInboxKAControllerExtObj);
        var frmMessageInboxKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmMessageInboxKAFormModel", frmMessageInboxKAControllerObj);
        var frmMessageInboxKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmMessageInboxKAFormModelExtension", frmMessageInboxKAFormModelObj);
        frmMessageInboxKAFormModelObj.setFormModelExtensionObj(frmMessageInboxKAFormModelExtObj);
        appContext.setFormController("frmMessageInboxKA", frmMessageInboxKAControllerObj);
      
        var frmMessageReplyKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmMessageReplyKAConfig);
        var frmMessageReplyKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmMessageReplyKAController", appContext, frmMessageReplyKAModelConfigObj);
        var frmMessageReplyKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmMessageReplyKAControllerExtension", frmMessageReplyKAControllerObj);
        frmMessageReplyKAControllerObj.setControllerExtensionObject(frmMessageReplyKAControllerExtObj);
        var frmMessageReplyKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmMessageReplyKAFormModel", frmMessageReplyKAControllerObj);
        var frmMessageReplyKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmMessageReplyKAFormModelExtension", frmMessageReplyKAFormModelObj);
        frmMessageReplyKAFormModelObj.setFormModelExtensionObj(frmMessageReplyKAFormModelExtObj);
        appContext.setFormController("frmMessageReplyKA", frmMessageReplyKAControllerObj);
      
        var frmMessageSentItemsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmMessageSentItemsKAConfig);
        var frmMessageSentItemsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmMessageSentItemsKAController", appContext, frmMessageSentItemsKAModelConfigObj);
        var frmMessageSentItemsKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmMessageSentItemsKAControllerExtension", frmMessageSentItemsKAControllerObj);
        frmMessageSentItemsKAControllerObj.setControllerExtensionObject(frmMessageSentItemsKAControllerExtObj);
        var frmMessageSentItemsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmMessageSentItemsKAFormModel", frmMessageSentItemsKAControllerObj);
        var frmMessageSentItemsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmMessageSentItemsKAFormModelExtension", frmMessageSentItemsKAFormModelObj);
        frmMessageSentItemsKAFormModelObj.setFormModelExtensionObj(frmMessageSentItemsKAFormModelExtObj);
        appContext.setFormController("frmMessageSentItemsKA", frmMessageSentItemsKAControllerObj);
 
        var frmMessageDeletedItemsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmMessageDeletedItemsKAConfig);
        var frmMessageDeletedItemsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmMessageDeletedItemsKAController", appContext, frmMessageDeletedItemsKAModelConfigObj);
        var frmMessageDeletedItemsKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmMessageDeletedItemsKAControllerExtension", frmMessageDeletedItemsKAControllerObj);
        frmMessageDeletedItemsKAControllerObj.setControllerExtensionObject(frmMessageDeletedItemsKAControllerExtObj);
        var frmMessageDeletedItemsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmMessageDeletedItemsKAFormModel", frmMessageDeletedItemsKAControllerObj);
        var frmMessageDeletedItemsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmMessageDeletedItemsKAFormModelExtension", frmMessageDeletedItemsKAFormModelObj);
        frmMessageDeletedItemsKAFormModelObj.setFormModelExtensionObj(frmMessageDeletedItemsKAFormModelExtObj);
        appContext.setFormController("frmMessageDeletedItemsKA", frmMessageDeletedItemsKAControllerObj);


        var frmMessageDraftKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmMessageDraftKAConfig);
        var frmMessageDraftKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmMessageDraftKAController", appContext, frmMessageDraftKAModelConfigObj);
        var frmMessageDraftKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmMessageDraftKAControllerExtension", frmMessageDraftKAControllerObj);
        frmMessageDraftKAControllerObj.setControllerExtensionObject(frmMessageDraftKAControllerExtObj);
        var frmMessageDraftKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmMessageDraftKAFormModel", frmMessageDraftKAControllerObj);
        var frmMessageDraftKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmMessageDraftKAFormModelExtension", frmMessageDraftKAFormModelObj);
        frmMessageDraftKAFormModelObj.setFormModelExtensionObj(frmMessageDraftKAFormModelExtObj);
        appContext.setFormController("frmMessageDraftKA", frmMessageDraftKAControllerObj);
    
 
        //frmTermsNConditionsKA
        var frmTermsNConditionsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmTermsNConditionsKAConfig);
        var frmTermsNConditionsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmTermsNConditionsKAController", appContext, frmTermsNConditionsKAModelConfigObj);
        var frmTermsNConditionsKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmTermsNConditionsKAControllerExtension", frmTermsNConditionsKAControllerObj);
        frmTermsNConditionsKAControllerObj.setControllerExtensionObject(frmTermsNConditionsKAControllerExtObj);
        var frmTermsNConditionsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmTermsNConditionsKAFormModel", frmTermsNConditionsKAControllerObj);
        var frmTermsNConditionsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmTermsNConditionsKAFormModelExtension", frmTermsNConditionsKAFormModelObj);
        frmTermsNConditionsKAFormModelObj.setFormModelExtensionObj(frmTermsNConditionsKAFormModelExtObj);
        appContext.setFormController("frmTermsNConditionsKA", frmTermsNConditionsKAControllerObj);
    
      //frmFAQsKA
        var frmFAQsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmFAQsKAConfig);
        var frmFAQsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmFAQsKAController", appContext, frmFAQsKAModelConfigObj);
        var frmFAQsKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmFAQsKAControllerExtension", frmFAQsKAControllerObj);
        frmFAQsKAControllerObj.setControllerExtensionObject(frmFAQsKAControllerExtObj);
        var frmFAQsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmFAQsKAFormModel", frmFAQsKAControllerObj);
        var frmFAQsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmFAQsKAFormModelExtension", frmFAQsKAFormModelObj);
        frmFAQsKAFormModelObj.setFormModelExtensionObj(frmFAQsKAFormModelExtObj);
        appContext.setFormController("frmFAQsKA", frmFAQsKAControllerObj);

        //frmPrivacyPolicyPostLoginKA
        var frmPrivacyPolicyPostLoginKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmPrivacyPolicyPostLoginKAConfig);
        var frmPrivacyPolicyPostLoginKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmPrivacyPolicyPostLoginKAController", appContext, frmPrivacyPolicyPostLoginKAModelConfigObj);
        var frmPrivacyPolicyPostLoginKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmPrivacyPolicyPostLoginKAControllerExtension", frmPrivacyPolicyPostLoginKAControllerObj);
        frmPrivacyPolicyPostLoginKAControllerObj.setControllerExtensionObject(frmPrivacyPolicyPostLoginKAControllerExtObj);
        var frmPrivacyPolicyPostLoginKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmPrivacyPolicyPostLoginKAFormModel", frmPrivacyPolicyPostLoginKAControllerObj);
        var frmPrivacyPolicyPostLoginKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmPrivacyPolicyPostLoginKAFormModelExtension", frmPrivacyPolicyPostLoginKAFormModelObj);
        frmPrivacyPolicyPostLoginKAFormModelObj.setFormModelExtensionObj(frmPrivacyPolicyPostLoginKAFormModelExtObj);
        appContext.setFormController("frmPrivacyPolicyPostLoginKA", frmPrivacyPolicyPostLoginKAControllerObj);

        var frmScheduledBillPayDetailsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmScheduledBillPayDetailsKAConfig);
        var frmScheduledBillPayDetailsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmScheduledBillPayDetailsKAController", appContext, frmScheduledBillPayDetailsKAModelConfigObj);
        var frmScheduledBillPayDetailsKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmScheduledBillPayDetailsKAControllerExtension", frmScheduledBillPayDetailsKAControllerObj);
        frmScheduledBillPayDetailsKAControllerObj.setControllerExtensionObject(frmScheduledBillPayDetailsKAControllerExtObj);
        var frmScheduledBillPayDetailsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmScheduledBillPayDetailsKAFormModel", frmScheduledBillPayDetailsKAControllerObj);
        var frmScheduledBillPayDetailsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmScheduledBillPayDetailsKAFormModelExtension", frmScheduledBillPayDetailsKAFormModelObj);
        frmScheduledBillPayDetailsKAFormModelObj.setFormModelExtensionObj(frmScheduledBillPayDetailsKAFormModelExtObj);
        appContext.setFormController("frmScheduledBillPayDetailsKA", frmScheduledBillPayDetailsKAControllerObj);

        //frmNewAccountStep1
        var frmNewAccountKAStep1ModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmNewAccountKAStep1Config);
        var frmNewAccountKAStep1ControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmNewAccountKAStep1Controller", appContext, frmNewAccountKAStep1ModelConfigObj);
        var frmNewAccountKAStep1ControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmNewAccountKAStep1ControllerExtension", frmNewAccountKAStep1ControllerObj);
        frmNewAccountKAStep1ControllerObj.setControllerExtensionObject(frmNewAccountKAStep1ControllerExtObj);
        var frmNewAccountKAStep1FormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmNewAccountKAStep1FormModel", frmNewAccountKAStep1ControllerObj);
        var frmNewAccountKAStep1FormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmNewAccountKAStep1FormModelExtension", frmNewAccountKAStep1FormModelObj);
        frmNewAccountKAStep1FormModelObj.setFormModelExtensionObj(frmNewAccountKAStep1FormModelExtObj);
        appContext.setFormController("frmNewAccountKAStep1", frmNewAccountKAStep1ControllerObj);
    
        var frmMessageDetailsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmMessageDetailsKAConfig);
        var frmMessageDetailsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmMessageDetailsKAController", appContext, frmMessageDetailsKAModelConfigObj);
        var frmMessageDetailsKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmMessageDetailsKAControllerExtension", frmMessageDetailsKAControllerObj);
        frmMessageDetailsKAControllerObj.setControllerExtensionObject(frmMessageDetailsKAControllerExtObj);
        var frmMessageDetailsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmMessageDetailsKAFormModel", frmMessageDetailsKAControllerObj);
        var frmMessageDetailsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmMessageDetailsKAFormModelExtension", frmMessageDetailsKAFormModelObj);
        frmMessageDetailsKAFormModelObj.setFormModelExtensionObj(frmMessageDetailsKAFormModelExtObj);
        appContext.setFormController("frmMessageDetailsKA", frmMessageDetailsKAControllerObj);
    
        var frmMessageDraftDetailsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmMessageDraftDetailsKAConfig);
        var frmMessageDraftDetailsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmMessageDraftDetailsKAController", appContext, frmMessageDraftDetailsKAModelConfigObj);
        var frmMessageDraftDetailsKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmMessageDraftDetailsKAControllerExtension", frmMessageDraftDetailsKAControllerObj);
        frmMessageDraftDetailsKAControllerObj.setControllerExtensionObject(frmMessageDraftDetailsKAControllerExtObj);
        var frmMessageDraftDetailsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmMessageDraftDetailsKAFormModel", frmMessageDraftDetailsKAControllerObj);
        var frmMessageDraftDetailsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmMessageDraftDetailsKAFormModelExtension", frmMessageDraftDetailsKAFormModelObj);
        frmMessageDraftDetailsKAFormModelObj.setFormModelExtensionObj(frmMessageDraftDetailsKAFormModelExtObj);
        appContext.setFormController("frmMessageDraftDetailsKA", frmMessageDraftDetailsKAControllerObj);

        //frmNewAccountStep5
        var frmNewAccountKAStep5ModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmNewAccountKAStep5Config);
        var frmNewAccountKAStep5ControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmNewAccountKAStep5Controller", appContext, frmNewAccountKAStep5ModelConfigObj);
        var frmNewAccountKAStep5ControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmNewAccountKAStep5ControllerExtension", frmNewAccountKAStep5ControllerObj);
        frmNewAccountKAStep5ControllerObj.setControllerExtensionObject(frmNewAccountKAStep5ControllerExtObj);
        var frmNewAccountKAStep5FormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmNewAccountKAStep5FormModel", frmNewAccountKAStep5ControllerObj);
        var frmNewAccountKAStep5FormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmNewAccountKAStep5FormModelExtension", frmNewAccountKAStep5FormModelObj);
        frmNewAccountKAStep5FormModelObj.setFormModelExtensionObj(frmNewAccountKAStep5FormModelExtObj);
        appContext.setFormController("frmNewAccountKAStep5", frmNewAccountKAStep5ControllerObj);
		
		 //frmForeignExchangeKA
        var frmForeignExchangeKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmForeignExchangeKAConfig);
        var frmForeignExchangeKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmForeignExchangeKAController", appContext, frmForeignExchangeKAModelConfigObj);
        var frmForeignExchangeKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmForeignExchangeKAControllerExtension", frmForeignExchangeKAControllerObj);
        frmForeignExchangeKAControllerObj.setControllerExtensionObject(frmForeignExchangeKAControllerExtObj);
        var frmForeignExchangeKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmForeignExchangeKAFormModel", frmForeignExchangeKAControllerObj);
        var frmForeignExchangeKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmForeignExchangeKAFormModelExtension", frmForeignExchangeKAFormModelObj);
        frmForeignExchangeKAFormModelObj.setFormModelExtensionObj(frmForeignExchangeKAFormModelExtObj);
        appContext.setFormController("frmForeignExchangeKA", frmForeignExchangeKAControllerObj);

      //frmInterestRateKA
        var frmInterestRateKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmInterestRateKAConfig);
        var frmInterestRateKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmInterestRateKAController", appContext, frmInterestRateKAModelConfigObj);
        var frmInterestRateKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmInterestRateKAControllerExtension", frmInterestRateKAControllerObj);
        frmInterestRateKAControllerObj.setControllerExtensionObject(frmInterestRateKAControllerExtObj);
        var frmInterestRateKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmInterestRateKAFormModel", frmInterestRateKAControllerObj);
        var frmInterestRateKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmInterestRateKAFormModelExtension", frmInterestRateKAFormModelObj);
        frmInterestRateKAFormModelObj.setFormModelExtensionObj(frmInterestRateKAFormModelExtObj);
        appContext.setFormController("frmInterestRateKA", frmInterestRateKAControllerObj);


        var frmTransactionSearch1KAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmTransactionSearch1KAConfig);
        var frmTransactionSearch1KAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmTransactionSearch1KAController", appContext, frmTransactionSearch1KAModelConfigObj);
        var frmTransactionSearch1KAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmTransactionSearch1KAControllerExtension", frmTransactionSearch1KAControllerObj);
        frmTransactionSearch1KAControllerObj.setControllerExtensionObject(frmTransactionSearch1KAControllerExtObj);
        var frmTransactionSearch1KAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmTransactionSearch1KAFormModel", frmTransactionSearch1KAControllerObj);
        var frmTransactionSearch1KAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmTransactionSearch1KAFormModelExtension", frmTransactionSearch1KAFormModelObj);
        frmTransactionSearch1KAFormModelObj.setFormModelExtensionObj(frmTransactionSearch1KAFormModelExtObj);
        appContext.setFormController("frmTransactionSearch1KA", frmTransactionSearch1KAControllerObj);

        var frmFMMAccountListKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmFMMAccountListKAConfig);
        var frmFMMAccountListKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmFMMAccountListKAController", appContext, frmFMMAccountListKAModelConfigObj);
        var frmFMMAccountListKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmFMMAccountListKAControllerExtension", frmFMMAccountListKAControllerObj);
        frmFMMAccountListKAControllerObj.setControllerExtensionObject(frmFMMAccountListKAControllerExtObj);
        var frmFMMAccountListKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmFMMAccountListKAFormModel", frmFMMAccountListKAControllerObj);
        var frmFMMAccountListKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmFMMAccountListKAFormModelExtension", frmFMMAccountListKAFormModelObj);
        frmFMMAccountListKAFormModelObj.setFormModelExtensionObj(frmFMMAccountListKAFormModelExtObj);
        appContext.setFormController("frmFMMAccountListKA", frmFMMAccountListKAControllerObj);
		
		var frmUncategorizedTransactionsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmUncategorizedTransactionsKAConfig);
        var frmUncategorizedTransactionsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmUncategorizedTransactionsKAController", appContext, frmUncategorizedTransactionsKAModelConfigObj);
        var frmUncategorizedTransactionsKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmUncategorizedTransactionsKAControllerExtension", frmUncategorizedTransactionsKAControllerObj);
        frmUncategorizedTransactionsKAControllerObj.setControllerExtensionObject(frmUncategorizedTransactionsKAControllerExtObj);
        var frmUncategorizedTransactionsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmUncategorizedTransactionsKAFormModel", frmUncategorizedTransactionsKAControllerObj);
        var frmUncategorizedTransactionsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmUncategorizedTransactionsKAFormModelExtension", frmUncategorizedTransactionsKAFormModelObj);
        frmUncategorizedTransactionsKAFormModelObj.setFormModelExtensionObj(frmUncategorizedTransactionsKAFormModelExtObj);
        appContext.setFormController("frmUncategorizedTransactionsKA", frmUncategorizedTransactionsKAControllerObj);
      
        var frmTransactionDetailKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmTransactionDetailKAConfig);
        var frmTransactionDetailKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmTransactionDetailKAController", appContext, frmTransactionDetailKAModelConfigObj);
        var frmTransactionDetailKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmTransactionDetailKAControllerExtension", frmTransactionDetailKAControllerObj);
        frmTransactionDetailKAControllerObj.setControllerExtensionObject(frmTransactionDetailKAControllerExtObj);
        var frmTransactionDetailKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmTransactionDetailKAFormModel", frmTransactionDetailKAControllerObj);
        var frmTransactionDetailKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmTransactionDetailKAFormModelExtension", frmTransactionDetailKAFormModelObj);
        frmTransactionDetailKAFormModelObj.setFormModelExtensionObj(frmTransactionDetailKAFormModelExtObj);
        appContext.setFormController("frmTransactionDetailKA", frmTransactionDetailKAControllerObj);
		
        var frmSearchTransactionDetailsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmSearchTransactionDetailsKAConfig);
        var frmSearchTransactionDetailsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmSearchTransactionDetailsKAController", appContext, frmSearchTransactionDetailsKAModelConfigObj);
        var frmSearchTransactionDetailsKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmSearchTransactionDetailsKAControllerExtension", frmSearchTransactionDetailsKAControllerObj);
        frmSearchTransactionDetailsKAControllerObj.setControllerExtensionObject(frmSearchTransactionDetailsKAControllerExtObj);
        var frmSearchTransactionDetailsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmSearchTransactionDetailsKAFormModel", frmSearchTransactionDetailsKAControllerObj);
        var frmSearchTransactionDetailsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmSearchTransactionDetailsKAFormModelExtension", frmSearchTransactionDetailsKAFormModelObj);
        frmSearchTransactionDetailsKAFormModelObj.setFormModelExtensionObj(frmSearchTransactionDetailsKAFormModelExtObj);
        appContext.setFormController("frmSearchTransactionDetailsKA", frmSearchTransactionDetailsKAControllerObj);
       
      kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
    } catch (err) {
        kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
        var exception = appContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_APP_INIT_FORMS, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_APP_INIT_FORMS, err);
        kony.sdk.mvvm.log.error(exception.toString());
        throw exception;
    }
};