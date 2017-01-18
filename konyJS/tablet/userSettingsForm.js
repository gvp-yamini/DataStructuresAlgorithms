
function getAccountNameForAccID(accID){
   var  accPreviewData= kony.retailBanking.globalData.accounts.getAccountsData();
  	var data=kony.retailBanking.globalData.accounts.getAccountsData();
  	var accountName="";
  	for (var i=0;i<data.length;i++){
      if(accID===data[i].accountID){
          accountName=data[i].nickName;
          return accountName; 	
      }
	}
  	 
}

function saveAlertsFlagData(){
  	var INSTANCE =  kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
   	var controller = INSTANCE.getFormController("frmUserSettingsKA");
  	var formModel=controller.getFormModel();
    var settingsData=kony.store.getItem("settingsflagsObject");
    formModel.setViewAttributeByProperty("lblAlertsFlagKA","text",settingsData.alerts);
   	formModel.setViewAttributeByProperty("lblForTransferAccKA","text",settingsData.DefaultTransferAcctNo);
    formModel.setViewAttributeByProperty("lblForDepositAccKA","text",settingsData.DefaultDepositAcctNo);
    formModel.setViewAttributeByProperty("lblForPaymentsAccKA","text",settingsData.DefaultPaymentAcctNo);
  	var navObject = new kony.sdk.mvvm.NavigationObject();
    navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
    controller.performAction("loadDataAndShowForm",[navObject]);
	savePreferredAccData();
}




// modal segment onRowClick
function userSettingsSegmentOnClick(){
  var selectedRow = moreLanding.userSettingsSegmentList.selectedRowIndex[1]; 
  switch(selectedRow){
    case 0:
      settingsOnRowClick("accountPreviewWrapper");
      activeModal = moreLanding.accountPreviewWrapper;
      break;
    case 1:
      settingsOnRowClick("touchIDWrapper");
      activeModal = moreLanding.touchIDWrapper;
      break;
    default:
  }
}


function settingsOnRowClick(settingsType) {
  moreLanding.backButton.isVisible = true;

  moreLanding.userSettingsContainer.animate(
    kony.ui.createAnimation({100:
                             {"left": "-30%","opacity": 0,"stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration: duration},
    {animationEnd: function() {} });

  moreLanding[settingsType].animate(
    kony.ui.createAnimation({100:
                             {"left": "0%","stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration: duration},
    {animationEnd: function() {} });


  animateBackButtonIn();
}




function userSettingsBack() {

  activeModal.animate(
    kony.ui.createAnimation({100:
                             {"left": "100%","stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration: duration},
    {animationEnd: function() {} });	

  moreLanding.userSettingsContainer.animate(
    kony.ui.createAnimation({100:
                             {"left": "0%","opacity": 1,"stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration: duration},
    {animationEnd: function() {} });  

  animateBackButtonOut();
}




//////////////////////////////////////////////
/////// funtion to move flex from left to right
////////FlexOut == goes to complete out of the view
////////FlexIN == comes into screen
/////////////////////////////////////////////
//////////////// Starts ////////////////////////
function flexMoveInOutAnimation(FlexOut,FlexIN)
{
   frmSettingsMenuKA[FlexOut].animate(
    kony.ui.createAnimation({100:
                             {"left": "-30%","opacity": 0,"stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration: duration},
    {animationEnd: function() {} });

  frmSettingsMenuKA[FlexIN].animate(
    kony.ui.createAnimation({100:
                             {"left": "0%","stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration: duration},
    {animationEnd: function() {} });
}

function SecurityOnContinueInMyProfile()
{
  var HeaderData = frmSettingsMenuKA.lblMyProfileHeader.text;
  switch(HeaderData)
    {
      case "Edit Profile"    :flexMoveInOutAnimation("flxMyProfileSecurityQuestion","flxEditMyProfileComplete");
                				break;
      case "Edit User Name"  :flexMoveInOutAnimation("flxMyProfileSecurityQuestion","flxMyProfileEditUserName");
                				break;
      case "Edit Password"   :flexMoveInOutAnimation("flxMyProfileSecurityQuestion","flxMyProfileEditPassword");
                				break; 
    }
}



var segPickProductData= [{

  lblleft: "Checking Account",
  imgSegIcon: "right_chevron_icon.png",
  colorAccount1:{skin:"accountTypeChecking"},// {skin:"accountTypeChecking"},//{backgroundColor : savingsColor},  //"checkingColor" ,      //violetcolor 
  colorAccount: {backgroundColor : checkingColor},
},
{

  lblleft: "Savings Account",
  imgSegIcon: "right_chevron_icon.png",
  colorAccount1:{skin:"accountTypeSavings"},// {skin:"accountTypeChecking"},//{backgroundColor : savingsColor},  //"checkingColor" ,      //violetcolor 
  colorAccount: {backgroundColor : savingsColor},
},
{

  lblleft: "Credit Cards",
  imgSegIcon: "right_chevron_icon.png",
  colorAccount1:{skin:"accountTypeCredit"},// {skin:"accountTypeChecking"},//{backgroundColor : savingsColor},  //"checkingColor" ,      //violetcolor 
  colorAccount: {backgroundColor : creditColor},
},
{

  lblleft: "Deposits",
  imgSegIcon: "right_chevron_icon.png",
  colorAccount1:{skin:"accountTypeCurrent"},// {skin:"accountTypeChecking"},//{backgroundColor : savingsColor},  //"checkingColor" ,      //violetcolor 
  colorAccount: {backgroundColor : deposit},
},
{

  lblleft: "Mortgage Account",
  imgSegIcon: "right_chevron_icon.png",
  colorAccount1:{skin:"accountTypeMortage"},// {skin:"accountTypeChecking"},//{backgroundColor : savingsColor},  //"checkingColor" ,      //violetcolor 
  colorAccount: {backgroundColor : mortage},
}];



function openAccountFlxTransition(flex1,flex2)
{
   moreLanding[flex1].animate(
    kony.ui.createAnimation({100:
                             {"left": "100%", "opacity": 1,"stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration:0.3},
    {animationEnd: function() {} }); 
  
     moreLanding[flex2].animate(
    kony.ui.createAnimation({100:
                             {"left": "0%", "opacity": 1,"stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration:0.3},
    {animationEnd: function() {} });
  
}
function openAccountFlxTransitionLocation(flex1,flex2)
{
  frmEnterLocationKA[flex1].animate(
    kony.ui.createAnimation({100:
                             {"left": "100%", "opacity": 1,"stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration:0.3},
    {animationEnd: function() {} }); 
  
      frmEnterLocationKA[flex2].animate(
    kony.ui.createAnimation({100:
                             {"left": "0%", "opacity": 1,"stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration:0.3},
    {animationEnd: function() {} });
  
}

function openNewAccTabs(btn)
{
  switch(btn)
    {
      case 1 : moreLanding.btnUserdetailsKA.skin="tabDeselected";
               moreLanding.btnBasicInfoKA.skin="tabSelected";
        	   moreLanding.btnTermsAndConditonsKA.skin="tabDeselected";
                moreLanding.flxTabSelectedIndicatorKA.animate
                (
    				kony.ui.createAnimation({100:
                             { 
                               "left": '0%',
                               "stepConfig":{"timingFunction": easeOut}}}),
    							{fillMode: forwards ,duration:0.3},
    							{animationEnd: function() {} }
                ); 
         		moreLanding.flx1.animate
                (
    				kony.ui.createAnimation({100:
                             { 
                               "centerX": '50%',
                               "stepConfig":{"timingFunction": easeOut}}}),
    							{fillMode: forwards ,duration:0.3},
    							{animationEnd: function() {} }
                ); 
        		moreLanding.flx2.animate
                (
    				kony.ui.createAnimation({100:
                             { 
                               "centerX": '150%',
                               "stepConfig":{"timingFunction": easeOut}}}),
    							{fillMode: forwards ,duration:0.3},
    							{animationEnd: function() {} }
                ); 
                moreLanding.flx3.animate
                (
    				kony.ui.createAnimation({100:
                             { 
                               "centerX": '150%',
                               "stepConfig":{"timingFunction": easeOut}}}),
    							{fillMode: forwards ,duration:0.3},
    							{animationEnd: function() {} }
                ); 
        		break;
      case 2 :moreLanding.btnUserdetailsKA.skin="tabSelected";
               moreLanding.btnBasicInfoKA.skin="tabDeselected";
        	   moreLanding.btnTermsAndConditonsKA.skin="tabDeselected";
                moreLanding.flxTabSelectedIndicatorKA.animate
                (
    				kony.ui.createAnimation({100:
                             { 
                               "left": '33.33%',
                               "stepConfig":{"timingFunction": easeOut}}}),
    							{fillMode: forwards ,duration:0.3},
    							{animationEnd: function() {} }
                ); 
         		moreLanding.flx1.animate
                (
    				kony.ui.createAnimation({100:
                             { 
                               "centerX": '150%',
                               "stepConfig":{"timingFunction": easeOut}}}),
    							{fillMode: forwards ,duration:0.3},
    							{animationEnd: function() {} }
                ); 
        		moreLanding.flx2.animate
                (
    				kony.ui.createAnimation({100:
                             { 
                               "centerX": '50%',
                               "stepConfig":{"timingFunction": easeOut}}}),
    							{fillMode: forwards ,duration:0.3},
    							{animationEnd: function() {} }
                ); 
                moreLanding.flx3.animate
                (
    				kony.ui.createAnimation({100:
                             { 
                               "centerX": '150%',
                               "stepConfig":{"timingFunction": easeOut}}}),
    							{fillMode: forwards ,duration:0.3},
    							{animationEnd: function() {} }
                ); 
        		break;
      case 3 :moreLanding.btnUserdetailsKA.skin="tabDeselected";
               moreLanding.btnBasicInfoKA.skin="tabDeselected";
        	   moreLanding.btnTermsAndConditonsKA.skin="tabSelected";
                moreLanding.flxTabSelectedIndicatorKA.animate
                (
    				kony.ui.createAnimation({100:
                             { 
                               "left": '66.66%',
                               "stepConfig":{"timingFunction": easeOut}}}),
    							{fillMode: forwards ,duration:0.3},
    							{animationEnd: function() {} }
                ); 
         		moreLanding.flx1.animate
                (
    				kony.ui.createAnimation({100:
                             { 
                               "centerX": '150%',
                               "stepConfig":{"timingFunction": easeOut}}}),
    							{fillMode: forwards ,duration:0.3},
    							{animationEnd: function() {} }
                ); 
        		moreLanding.flx2.animate
                (
    				kony.ui.createAnimation({100:
                             { 
                               "centerX": '150%',
                               "stepConfig":{"timingFunction": easeOut}}}),
    							{fillMode: forwards ,duration:0.3},
    							{animationEnd: function() {} }
                ); 
                moreLanding.flx3.animate
                (
    				kony.ui.createAnimation({100:
                             { 
                               "centerX": '50%',
                               "stepConfig":{"timingFunction": easeOut}}}),
    							{fillMode: forwards ,duration:0.3},
    							{animationEnd: function() {} }
                ); 
        		break;
    }
}

function ResetOpennewAccount()
{
  moreLanding.flxPickProduct.left="0%";
  moreLanding.flxTermsAndConditions.left="100%";
  frmEnterLocationKA.flxLocation.left="0%";
  frmEnterLocationKA.flxCards.left="100%";
 frmEnterLocationKA.flxSilverCards.left="100%";
  frmEnterLocationKA.flxPersonalDetails.left="100%";
 frmEnterLocationKA.flxSecretQuestion.left="100%";
 frmEnterLocationKA.flxapplicationPreview.left="100%";
  moreLanding.ImgNav.src="wizard_stepone.png";
  frmEnterLocationKA.ImgNav.src="wizard_stepthree.png";
  moreLanding.lblHeaderOpenAccount.text= i18n_pickaproduct;
   frmEnterLocationKA.lblHeaderOpenAccount.text=i18n_enterLocation;
  //ResetflxSilverCards();
}



function ResetflxSilverCards()
{
  
  frmEnterLocationKA.flx1.centerX="50%";
  frmEnterLocationKA.flx2.centerX="150%";
  frmEnterLocationKA.flx3.centerX="150%";
  frmEnterLocationKA.btnUserdetailsKA.skin="tabDeselected";
  frmEnterLocationKA.btnBasicInfoKA.skin="tabSelected";
  frmEnterLocationKA.btnTermsAndConditonsKA.skin="tabDeselected";
}
