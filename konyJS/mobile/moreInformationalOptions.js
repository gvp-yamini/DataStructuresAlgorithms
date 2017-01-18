
function onClickForeinExchangeRates(){
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmMoreForeignExchangeRatesKA");
    var navObject = new kony.sdk.mvvm.NavigationObject();
  	navObject.setRequestOptions("segForeignExRatesKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
    controller.loadDataAndShowForm(navObject);
}

function onClickInterestRates(){
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmMoreInterestRatesKA");
    var navObject = new kony.sdk.mvvm.NavigationObject();
  	navObject.setRequestOptions("segInterestRatesKA",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
    controller.loadDataAndShowForm(navObject);
}

function onClickFaqs(){
  	if (kony.retailBanking.globalData.session_token === null || kony.retailBanking.globalData.session_token === "" || deviceRegFrom == "logout"){
      	var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
      	var frmMoreFaqKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmMoreFaqKAConfig);
        var frmMoreFaqKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmMoreFaqKAController", appContext, frmMoreFaqKAModelConfigObj);
        var frmMoreFaqKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmMoreFaqKAControllerExtension", frmMoreFaqKAControllerObj);
        frmMoreFaqKAControllerObj.setControllerExtensionObject(frmMoreFaqKAControllerExtObj);
        var frmMoreFaqKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmMoreFaqKAFormModel", frmMoreFaqKAControllerObj);
        var frmMoreFaqKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmMoreFaqKAFormModelExtension", frmMoreFaqKAFormModelObj);
        frmMoreFaqKAFormModelObj.setFormModelExtensionObj(frmMoreFaqKAFormModelExtObj);
        appContext.setFormController("frmMoreFaqKA", frmMoreFaqKAControllerObj);
    }
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmMoreFaqKA");
    var navObject = new kony.sdk.mvvm.NavigationObject();
  	if (kony.retailBanking.globalData.session_token !== null && kony.retailBanking.globalData.session_token !== ""){
     	navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"infoType": "faq"}});     
    }else{
      		navObject.setRequestOptions("form",{ "queryParams" : {"infoType": "faq"}});	
    }
  
    controller.loadDataAndShowForm(navObject);
}

function onClickPrivacyPolicy(){
  	if (kony.retailBanking.globalData.session_token === null || kony.retailBanking.globalData.session_token === "" || deviceRegFrom == "logout"){
      	var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
      	var frmMorePrivacyPolicyKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmMorePrivacyPolicyKAConfig);
        var frmMorePrivacyPolicyKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmMorePrivacyPolicyKAController", appContext, frmMorePrivacyPolicyKAModelConfigObj);
        var frmMorePrivacyPolicyKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmMorePrivacyPolicyKAControllerExtension", frmMorePrivacyPolicyKAControllerObj);
        frmMorePrivacyPolicyKAControllerObj.setControllerExtensionObject(frmMorePrivacyPolicyKAControllerExtObj);
        var frmMorePrivacyPolicyKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmMorePrivacyPolicyKAFormModel", frmMorePrivacyPolicyKAControllerObj);
        var frmMorePrivacyPolicyKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmMorePrivacyPolicyKAFormModelExtension", frmMorePrivacyPolicyKAFormModelObj);
        frmMorePrivacyPolicyKAFormModelObj.setFormModelExtensionObj(frmMorePrivacyPolicyKAFormModelExtObj);
        appContext.setFormController("frmMorePrivacyPolicyKA", frmMorePrivacyPolicyKAControllerObj);
    }
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmMorePrivacyPolicyKA");
    var navObject = new kony.sdk.mvvm.NavigationObject();
  	if (kony.retailBanking.globalData.session_token !== null && kony.retailBanking.globalData.session_token !== ""){
      	navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"infoType": "privacypolicy"}});
    }else{
      	navObject.setRequestOptions("form", {"queryParams" : {"infoType": "privacypolicy"}});
    }
    controller.loadDataAndShowForm(navObject);
}

function onClickTandC(){
  	if (kony.retailBanking.globalData.session_token === null || kony.retailBanking.globalData.session_token === "" || deviceRegFrom == "logout"){
      	var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
      	var frmMoreTermsAndConditionsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmMoreTermsAndConditionsKAConfig);
        var frmMoreTermsAndConditionsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmMoreTermsAndConditionsKAController", appContext, frmMoreTermsAndConditionsKAModelConfigObj);
        var frmMoreTermsAndConditionsKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmMoreTermsAndConditionsKAControllerExtension", frmMoreTermsAndConditionsKAControllerObj);
        frmMoreTermsAndConditionsKAControllerObj.setControllerExtensionObject(frmMoreTermsAndConditionsKAControllerExtObj);
        var frmMoreTermsAndConditionsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmMoreTermsAndConditionsKAFormModel", frmMoreTermsAndConditionsKAControllerObj);
        var frmMoreTermsAndConditionsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmMoreTermsAndConditionsKAFormModelExtension", frmMoreTermsAndConditionsKAFormModelObj);
        frmMoreTermsAndConditionsKAFormModelObj.setFormModelExtensionObj(frmMoreTermsAndConditionsKAFormModelExtObj);
        appContext.setFormController("frmMoreTermsAndConditionsKA", frmMoreTermsAndConditionsKAControllerObj);
    }
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmMoreTermsAndConditionsKA");
    var navObject = new kony.sdk.mvvm.NavigationObject();
  	if (kony.retailBanking.globalData.session_token !== null && kony.retailBanking.globalData.session_token !== ""){
     	navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}, "queryParams" : {"infoType": "termsandconditions"}}); 
    }else{
      	navObject.setRequestOptions("form", {"queryParams" : {"infoType": "termsandconditions"}});
    }
  	
    controller.loadDataAndShowForm(navObject);
}

function onClickMoreInfoOptionsBack(){
  	if(deviceRegFrom == "moreLanding"){
      	frmMoreLandingKA.show();
    }else if(deviceRegFrom == "logout"){
      	frmUnauthInformationKA.show();
    }else{
      	frmUnauthInformationKA.show();
    }
}

