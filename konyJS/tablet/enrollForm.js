//Used For PreShow

function enrollNow()
{
      removeSwipePrelogin();
      initialiseForms();
      var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
      var listcontroller = INSTANCE.getFormController("frmEnrolluserSettingsKA");
      var navObject = new kony.sdk.mvvm.NavigationObject();
      navObject.setDataModel(null, kony.sdk.mvvm.OperationType.ADD, "form");
      listcontroller.performAction("loadDataAndShowForm",[navObject]);
      enrolluserpreshow();
      frmEnrolluserSettingsKA.flxEnrollListsContainerKA.left="0%";
}


function removeSwipePrelogin()
{
  if(kony.retailBanking.globalData.deviceInfo.isIpad())
          frmLoginKA.removeGestureRecognizer(swipeGesture);
}

function enrolluserpreshow()
{
  
  tandCSelected();
  frmEnrolluserSettingsKA.btnUserdetailsKA.setEnabled(false);
  frmEnrolluserSettingsKA.btnBasicInfoKA.setEnabled(false);
  frmEnrolluserSettingsKA.btnSecurity.setEnabled(false);
  var d = new Date();
  var curr_date, curr_month, curr_year;
    curr_date = d.getDate();
  	curr_month = d.getMonth()+1;
  	curr_year = d.getFullYear();
  	//frmEnrolluserSettingsKA.calDobKA.dateComponents = [curr_date,curr_month,curr_year];
    frmEnrolluserSettingsKA.calDobKA.validEndDate = [curr_date,curr_month,curr_year];
}

function onclicknextbasicinfo()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmEnrolluserSettingsKA");
  var viewModel = controller.getFormModel();
  var valid= true;
  valid = kony.retailBanking.util.validation.validateListBox(viewModel && viewModel.getWidgetData("listSavingsKA").getData());
  if(valid){
    valid = kony.retailBanking.util.validation.validateTextboxOrLabel(viewModel && viewModel.getViewAttributeByProperty("txtAmountKA","text"));
  }
   if(valid){
    valid = validateSSN(viewModel.getViewAttributeByProperty("tbxssnnumber","text")) && kony.retailBanking.util.validation.validateTextboxOrLabel(viewModel && viewModel.getViewAttributeByProperty("tbxssnnumber","text"));
  }
  if(valid){
    var calDate = kony.retailBanking.util.formatingDate.getDateObjFromKonyCalendarArray(viewModel.getViewAttributeByProperty("calDobKA","dateComponents"));
    valid = compareDate(calDate);
  }
  if(valid)
  { 
 	userdetailsTabSelected();
  }
}

function compareDate(dt)
{
  var currentDate=new Date();
  if (currentDate== dt  || currentDate>dt)
    return true;
  else
    return false;
}

function validateConfirmPassword(password1,password2){
  if(password1 !== password2)
    return false;
  else 
    return true;
  
}

function validateSSN(ssn){
  if(ssn.length!=9)
    return false;
  else 
    return true;
}


function onclicknextuserdetails()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmEnrolluserSettingsKA");
  var viewModel = controller.getFormModel();
  var valid= true;
  valid = kony.retailBanking.util.validation.isValidUsername(viewModel && viewModel.getViewAttributeByProperty("txtUserNameKA","text"));
  if(valid){
    valid = kony.retailBanking.util.validation.isValidPassword(viewModel && viewModel.getViewAttributeByProperty("txtPasswordKA","text"));
  }
  if(valid){
    valid = validateConfirmPassword(viewModel && viewModel.getViewAttributeByProperty("txtReEnterPwdKA","text"),viewModel && viewModel.getViewAttributeByProperty("txtPasswordKA","text"));
  }
  if(valid){
    valid = kony.retailBanking.util.validation.isValidEmail(viewModel && viewModel.getViewAttributeByProperty("txtEmailKA","text"));
  }
  if(valid){
    valid = kony.retailBanking.util.validation.isValidNumber(viewModel && viewModel.getViewAttributeByProperty("txtPhoneNumberKA","text"));
  }
  if(valid)
  { 
 	 securityTabSelected();
  }
}


function onclickEnroll(){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmEnrolluserSettingsKA");
  var viewModel = controller.getFormModel();
  var valid= true;
  var q1,q2,q3,q4,q5;
  var qstn = new Array(6);
  valid = kony.retailBanking.util.validation.validateListBox(viewModel && viewModel.getWidgetData("lstboxquestn1").getData());
  if(valid){
    valid = kony.retailBanking.util.validation.validateTextboxOrLabel(viewModel && viewModel.getWidgetData("tbxAnswer1").getData());
  }
  if(valid){
    valid = kony.retailBanking.util.validation.validateListBox(viewModel && viewModel.getWidgetData("lstboxquestn2").getData());
  }
  if(valid){
    valid = kony.retailBanking.util.validation.validateTextboxOrLabel(viewModel && viewModel.getWidgetData("tbxAnswer2").getData());
  }
  if(valid){
    valid = kony.retailBanking.util.validation.validateListBox(viewModel && viewModel.getWidgetData("lstboxquestn3").getData());
  }
  if(valid){
    valid = kony.retailBanking.util.validation.validateTextboxOrLabel(viewModel && viewModel.getWidgetData("tbxAnswer3").getData());
  }
  if(valid){
    valid = kony.retailBanking.util.validation.validateListBox(viewModel && viewModel.getWidgetData("lstboxquestn4").getData());
  }
  if(valid){
    valid = kony.retailBanking.util.validation.validateTextboxOrLabel(viewModel && viewModel.getWidgetData("tbxAnswer4").getData());
  }
  if(valid){
    valid = kony.retailBanking.util.validation.validateListBox(viewModel && viewModel.getWidgetData("lstboxquestn5").getData());
  }
  if(valid){
    valid = kony.retailBanking.util.validation.validateTextboxOrLabel(viewModel && viewModel.getWidgetData("tbxAnswer5").getData());
  }
  if(valid){
    q1 = viewModel.getWidgetData("lstboxquestn1").getData();
    q2 = viewModel.getWidgetData("lstboxquestn2").getData();
    q3 = viewModel.getWidgetData("lstboxquestn3").getData();
    q4 = viewModel.getWidgetData("lstboxquestn4").getData();
    q5 = viewModel.getWidgetData("lstboxquestn5").getData();
    valid = validateQstns(q1,q2,q3,q4,q5,qstn);
  }
  if(valid){
   controller.performAction("saveData");
  }
}


function validateQstns(q1,q2,q3,q4,q5,qstn){
  qstn[q1] = 1;
  if(qstn[q2]!= 1)
    qstn[q2] =1;
  else 
    return false;
  if(qstn[q3]!= 1)
    qstn[q3]= 1;
  else 
    return false;
  if(qstn[q4]!= 1)
    qstn[q4]= 1;
  else 
    return false;
  if(qstn[q5]!= 1){
     qstn[q5]= 1;
     return true;
  }
  else 
    return false;
}


function basicInfotabSelected(){
 frmEnrolluserSettingsKA.btnBasicInfoKA.setEnabled(true);
  frmEnrolluserSettingsKA.flxEnrollListsContainerKA.animate(
    kony.ui.createAnimation({100:
                             { 
                               "left": '-100%',
                               "stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration:0.3},
    {animationEnd: function() {} });

  frmEnrolluserSettingsKA.flxTabSelectedIndicatorKA.animate(
    kony.ui.createAnimation({100:
                             { 
                               "left": '25%',
                               "stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration:0.3},
    {animationEnd: function() {} }); 

  frmEnrolluserSettingsKA.btnBasicInfoKA.skin = "tabSelected";
  frmEnrolluserSettingsKA.btnSecurity.skin = "tabDeselected";
  frmEnrolluserSettingsKA.btnUserdetailsKA.skin = "tabDeselected";
  frmEnrolluserSettingsKA.btnTermsAndConditonsKA.skin = "tabDeselected";

}

function userdetailsTabSelected(){
  frmEnrolluserSettingsKA.btnUserdetailsKA.setEnabled(true);
  frmEnrolluserSettingsKA.flxEnrollListsContainerKA.animate(
    kony.ui.createAnimation({100:
                             { 
                               "left": '-200%',
                               "stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration:0.3},
    {animationEnd: function() {} });

  frmEnrolluserSettingsKA.flxTabSelectedIndicatorKA.animate(
    kony.ui.createAnimation({100:
                             { 
                               "left": '50%',
                               "stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration:0.3},
    {animationEnd: function() {} });

  frmEnrolluserSettingsKA.btnUserdetailsKA.skin = "tabSelected";
  frmEnrolluserSettingsKA.btnBasicInfoKA.skin = "tabDeselected";
  frmEnrolluserSettingsKA.btnSecurity.skin = "tabDeselected";
  frmEnrolluserSettingsKA.btnTermsAndConditonsKA.skin = "tabDeselected";
}

function securityTabSelected() {
  frmEnrolluserSettingsKA.btnSecurity.setEnabled(true);
  frmEnrolluserSettingsKA.flxEnrollListsContainerKA.animate(
    kony.ui.createAnimation({100:
                             { 
                               "left": '-300%',
                               "stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration:0.3},
    {animationEnd: function() {} });

  frmEnrolluserSettingsKA.flxTabSelectedIndicatorKA.animate(
    kony.ui.createAnimation({100:
                             { 
                               "left": '75%',
                               "stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration:0.3},
    {animationEnd: function() {} });

  frmEnrolluserSettingsKA.btnSecurity.skin = "tabSelected";
  frmEnrolluserSettingsKA.btnUserdetailsKA.skin = "tabDeselected";
  frmEnrolluserSettingsKA.btnBasicInfoKA.skin = "tabDeselected";
  frmEnrolluserSettingsKA.btnTermsAndConditonsKA.skin = "tabDeselected";

}

function tandCSelected()
{
frmEnrolluserSettingsKA.flxEnrollListsContainerKA.animate(
    kony.ui.createAnimation({100:
                             { 
                               "left": '0%',
                               "stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration:0.3},
    {animationEnd: function() {} });

  frmEnrolluserSettingsKA.flxTabSelectedIndicatorKA.animate(
    kony.ui.createAnimation({100:
                             { 
                               "left": '0%',
                               "stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration:0.3},
    {animationEnd: function() {} });

  frmEnrolluserSettingsKA.btnSecurity.skin = "tabDeselected";
  frmEnrolluserSettingsKA.btnUserdetailsKA.skin = "tabDeselected";
  frmEnrolluserSettingsKA.btnBasicInfoKA.skin = "tabDeselected";
  frmEnrolluserSettingsKA.btnTermsAndConditonsKA.skin = "tabSelected";
}


function setSwipegesture()
{
  var setupTblTap = {fingers:1,swipedistance:50,swipevelocity:75};//swipe gesture
   var tempdata=kony.store.getItem("settingsflagsObject");
    if(userAgent == "iPad")
      swipeGesture=frmLoginKA.setGestureRecognizer(2,setupTblTap,AccountPreviewiPad);
    
}