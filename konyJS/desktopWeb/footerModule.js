function TermsNConditionsKAFunction()
{
   var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController("frmTermsNConditionsKA");
  var navObject = new kony.sdk.mvvm.NavigationObject();
  var queryParam = {"infoType":"termsandconditions"};
  navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token},"queryParams":queryParam});
  listController.performAction("navigateTo",["frmTermsNConditionsKA",navObject]);
}


function FAQsKAFunction()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController("frmFAQsKA");
  var navObject = new kony.sdk.mvvm.NavigationObject();
  var queryParam = {"infoType":"FAQ"};
  navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token},"queryParams":queryParam});
  listController.performAction("navigateTo",["frmFAQsKA",navObject]);

  
}

function PrivacyPolicyPostLoginKAFunction()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listController = INSTANCE.getFormController("frmPrivacyPolicyPostLoginKA");
  var navObject = new kony.sdk.mvvm.NavigationObject();
  var queryParam = {"infoType":"privacypolicy"};
  navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token},"queryParams":queryParam});
  listController.performAction("navigateTo",["frmPrivacyPolicyPostLoginKA",navObject]);
 
}


function initialisefrmPrivacyPolicyPreLoginKA()
{
var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
var frmPrivacyPolicyPreLoginKAConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmPrivacyPolicyPreLoginKAConfig);
var frmPrivacyPolicyPreLoginKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmPrivacyPolicyPreLoginKAController", appContext, frmPrivacyPolicyPreLoginKAConfigObj);
var frmPrivacyPolicyPreLoginKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmPrivacyPolicyPreLoginKAControllerExtension", frmPrivacyPolicyPreLoginKAControllerObj);
frmPrivacyPolicyPreLoginKAControllerObj.setControllerExtensionObject(frmPrivacyPolicyPreLoginKAControllerExtObj);
var frmPrivacyPolicyPreLoginKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmPrivacyPolicyPreLoginKAFormModel", frmPrivacyPolicyPreLoginKAControllerObj);
var frmPrivacyPolicyPreLoginKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmPrivacyPolicyPreLoginKAFormModelExtension", frmPrivacyPolicyPreLoginKAFormModelObj);
frmPrivacyPolicyPreLoginKAFormModelObj.setFormModelExtensionObj(frmPrivacyPolicyPreLoginKAFormModelExtObj);
appContext.setFormController("frmPrivacyPolicyPreLoginKA", frmPrivacyPolicyPreLoginKAControllerObj);

var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
var options ={    "access": "online",
                  "objectName": "RBObjects"
               };
var serviceName = "RBObjects";
var modelObj = INSTANCE.getModel("Informationcontent",serviceName,options);
var dataObject = new kony.sdk.dto.DataObject("Informationcontent"); 
var serviceOptions = {"dataObject":dataObject,
                       "queryParams" : {"infoType": "privacypolicy"}};
        modelObj.fetch(serviceOptions, infoContentPrivacyPolicySuccess, customErrorCallback);
  

}	



function infoContentPrivacyPolicySuccess(response){
    frmPrivacyPolicyPreLoginKA.rTxtPrivacyPolicyKA.text = response[0].infoContent;
frmPrivacyPolicyPreLoginKA .show(); 
  
}

		
function initialisefrmFAQsPreKA(){
        var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        
        var frmFAQsPreKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmFAQsPreKAConfig);
        var frmFAQsPreKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmFAQsPreKAController", appContext, frmFAQsPreKAModelConfigObj);
        var frmFAQsPreKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmFAQsPreKAControllerExtension", frmFAQsPreKAControllerObj);
        frmFAQsPreKAControllerObj.setControllerExtensionObject(frmFAQsPreKAControllerExtObj);
        var frmFAQsPreKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmFAQsPreKAFormModel", frmFAQsPreKAControllerObj);
        var frmFAQsPreKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmFAQsPreKAFormModelExtension", frmFAQsPreKAFormModelObj);
        frmFAQsPreKAFormModelObj.setFormModelExtensionObj(frmFAQsPreKAFormModelExtObj);
        appContext.setFormController("frmFAQsPreKA", frmFAQsPreKAControllerObj);
		
		var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
var options ={    "access": "online",
                  "objectName": "RBObjects"
               };
var serviceName = "RBObjects";
var modelObj = INSTANCE.getModel("Informationcontent",serviceName,options);
var dataObject = new kony.sdk.dto.DataObject("Informationcontent"); 
var serviceOptions = {"dataObject":dataObject,
                       "queryParams" : {"infoType": "privacypolicy"}};
        modelObj.fetch(serviceOptions, infoContentFAQsSuccess, customErrorCallback);
  

}

		
		function infoContentFAQsSuccess(response){
 frmFAQsPreKA.rTxtFAQKA.text = response[0].infoContent;
frmFAQsPreKA .show(); 
    
}


function initialisefrmTermsNConditionsPreKA(){
        var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        
        var frmTermsNConditionsPreKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmTermsNConditionsPreKAConfig);
        var frmTermsNConditionsPreKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmTermsNConditionsPreKAController", appContext, frmTermsNConditionsPreKAModelConfigObj);
        var frmTermsNConditionsPreKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmTermsNConditionsPreKAControllerExtension", frmTermsNConditionsPreKAControllerObj);
        frmTermsNConditionsPreKAControllerObj.setControllerExtensionObject(frmTermsNConditionsPreKAControllerExtObj);
        var frmTermsNConditionsPreKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmTermsNConditionsPreKAFormModel", frmTermsNConditionsPreKAControllerObj);
        var frmTermsNConditionsPreKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmTermsNConditionsPreKAFormModelExtension", frmTermsNConditionsPreKAFormModelObj);
        frmTermsNConditionsPreKAFormModelObj.setFormModelExtensionObj(frmTermsNConditionsPreKAFormModelExtObj);
        appContext.setFormController("frmTermsNConditionsPreKA", frmTermsNConditionsPreKAControllerObj);

		var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
var options ={    "access": "online",
                  "objectName": "RBObjects"
               };
var serviceName = "RBObjects";
var modelObj = INSTANCE.getModel("Informationcontent",serviceName,options);
var dataObject = new kony.sdk.dto.DataObject("Informationcontent"); 
var serviceOptions = {"dataObject":dataObject,
                       "queryParams" : {"infoType": "privacypolicy"}};
        modelObj.fetch(serviceOptions, infoContentTermsNConditionsSuccess, customErrorCallback);
  

}

		
		function infoContentTermsNConditionsSuccess(response){
 frmTermsNConditionsPreKA.rTxtTermsNConditionsKA.text = response[0].infoContent;
frmTermsNConditionsPreKA .show(); 
    
}
