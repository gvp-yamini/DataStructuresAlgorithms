function unauthInfoSegmentClick(){
  var selectedRow = unauthInformation.infoSegmentList.selectedRowIndex[1];
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var options ={    "access": "online",
                  "objectName": "RBObjects"
               };
  var serviceName = "RBObjects";
  var modelObj = INSTANCE.getModel("Informationcontent",serviceName,options);
  var dataObject = new kony.sdk.dto.DataObject("Informationcontent");
  
  
  	switch(selectedRow){
      case 0:
        var serviceOptions = {"dataObject":dataObject,
                       "queryParams" : {"infoType": "faq"}};
        modelObj.fetch(serviceOptions, infoContentFAQSuccess, customErrorCallback);
        	break;
      case 1:
        var serviceOptions = {"dataObject":dataObject,
                       "queryParams" : {"infoType": "termsandconditions"}};
        modelObj.fetch(serviceOptions, infoContentTermsAndConditionsSuccess, customErrorCallback);
        	break;
      case 2:
        var serviceOptions = {"dataObject":dataObject,
                       "queryParams" : {"infoType": "privacypolicy"}};
        modelObj.fetch(serviceOptions, infoContentPrivacyPolicySuccess, customErrorCallback);
        	break;
      default:
    }
}

function infoContentFAQSuccess(response){
  frmUnAuthInfo.infoContentRichText.text = response[0].infoContent;
  openModal(frmUnAuthInfo.infoContentFAQWrapper,"infoContentFAQWrapper");
  closeModal("infoModalContainer",frmLoginKA);
}
function infoContentTermsAndConditionsSuccess(response){
  frmUnAuthInfo.TermsAndConditionsRichText.text = response[0].infoContent;
  openModal(frmUnAuthInfo.infoContentTermsAndConditionsWrapper,"infoContentTermsAndConditionsWrapper");
  closeModal("infoModalContainer",frmLoginKA);
}
function infoContentPrivacyPolicySuccess(response){
  frmUnAuthInfo.privacyPolicyRichText.text = response[0].infoContent;
  openModal(frmUnAuthInfo.infoContentPrivacyPolicyWrapper,"infoContentPrivacyPolicyWrapper");
  closeModal("infoModalContainer",frmLoginKA);
}

function enrollOnRowClick() {
  	frmLoginKA.backButton.isVisible = true;
  
  	frmLoginKA.informationSegment.animate(
        kony.ui.createAnimation({100:
        {"left": "-30%","opacity": 0,"stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards ,duration: duration},
        {animationEnd: function() {} });
  
  	frmLoginKA.enrollSegment.animate(
        kony.ui.createAnimation({100:
        {"left": "0%","stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards ,duration: duration},
        {animationEnd: function() {} });
  	
  	
  	animateBackButtonIn();
}



function infoBack() {
  
  	frmLoginKA.enrollSegment.animate(
        kony.ui.createAnimation({100:
        {"left": "100%","stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards ,duration: duration},
        {animationEnd: function() {} });	
  
  	frmLoginKA.informationSegment.animate(
        kony.ui.createAnimation({100:
        {"left": "0%","opacity": 1,"stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards ,duration: duration},
        {animationEnd: function() {} });  
  
	animateBackButtonOut();
}


