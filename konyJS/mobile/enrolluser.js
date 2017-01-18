function onclicknextbasicinfo()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmEnrolluserLandingKA");
  var viewModel = controller.getFormModel();
  var valid= true;
  valid = kony.retailBanking.util.validation.validateListBox(viewModel && viewModel.getWidgetData("lstboxaccountype").getData());
  if(valid){
    valid = kony.retailBanking.util.validation.validateTextboxOrLabel(viewModel && viewModel.getViewAttributeByProperty("tbxaccntnumber","text"));
  }
   if(valid){
    valid = validateSSN(viewModel.getViewAttributeByProperty("tbxssnnumber","text")) && kony.retailBanking.util.validation.validateTextboxOrLabel(viewModel && viewModel.getViewAttributeByProperty("tbxssnnumber","text"));
  }
  if(valid){
    var calDate = kony.retailBanking.util.formatingDate.getDateObjFromKonyCalendarArray(viewModel.getViewAttributeByProperty("calDob","dateComponents"));
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

function onclicknextuserdetails()
{
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmEnrolluserLandingKA");
  var viewModel = controller.getFormModel();
  var valid= true;
  valid = kony.retailBanking.util.validation.isValidUsername(viewModel && viewModel.getViewAttributeByProperty("tbxUsernameKA","text"));
  if(valid){
    valid = kony.retailBanking.util.validation.isValidPassword(viewModel && viewModel.getViewAttributeByProperty("tbxPasswordKA","text"));
  }
  if(valid){
    valid = validateConfirmPassword(viewModel && viewModel.getViewAttributeByProperty("tbxConfrmPwdKA","text"),viewModel && viewModel.getViewAttributeByProperty("tbxPasswordKA","text"));
  }
  if(valid){
    valid = kony.retailBanking.util.validation.isValidEmail(viewModel && viewModel.getViewAttributeByProperty("tbxEmailKA","text"));
  }
  if(valid){
    valid = kony.retailBanking.util.validation.isValidNumber(viewModel && viewModel.getViewAttributeByProperty("tbxPhoneNumberKA","text"));
  }
  if(valid)
  { 
 	 termsTabSelected();
  }
}

function validateConfirmPassword(password1,password2){
  if(password1 !== password2)
    return false;
  else 
    return true;
  
}

function onclickEnroll(){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmEnrolluserLandingKA");
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
function onclickbackenrolluserbtn()
{
   if (frmEnrolluserLandingKA.enrollListsContainer.left == "0%"){
		frmLoginKA.show();}
  else if (frmEnrolluserLandingKA.enrollListsContainer.left == "-100%"){
 		 frmEnrolluserLandingKA.btnuserdetails.setEnabled(true);
         basicInfotabSelected();}
   else if (frmEnrolluserLandingKA.enrollListsContainer.left == "-200%"){
   		 frmEnrolluserLandingKA.btnterms.setEnabled(true);
  		 userdetailsTabSelected();}
}

function basicInfotabSelected(){
   frmEnrolluserLandingKA.enrollListsContainer.animate(
        kony.ui.createAnimation({100:
        	{ 
                "left": '0%',
             "stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards ,duration:0.3},
        {animationEnd: function() {} });
  
  frmEnrolluserLandingKA.tabSelectedIndicator.animate(
        kony.ui.createAnimation({100:
        	{ 
             "left": '0%',
             "stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards ,duration:0.3},
        {animationEnd: function() {} }); 
  
  frmEnrolluserLandingKA.btnbasicinfo.skin = skntabSelected;
  frmEnrolluserLandingKA.btnuserdetails.skin = skntabDeselected;
  frmEnrolluserLandingKA.btnterms.skin = skntabDeselected;
  frmEnrolluserLandingKA.btnuserdetails.setEnabled(false);
  frmEnrolluserLandingKA.btnterms.setEnabled(false);
  var d = new Date();
  var curr_date, curr_month, curr_year;
  if(frmEnrolluserLandingKA.calDob.dateComponent === null)
  {
    curr_date = d.getDate();
  	curr_month = d.getMonth()+1;
  	curr_year = d.getFullYear();
  	frmEnrolluserLandingKA.calDob.validEndDate = [curr_date,curr_month,curr_year];
  }
}


function userdetailsTabSelected(){
   frmEnrolluserLandingKA.enrollListsContainer.animate(
        kony.ui.createAnimation({100:
        	{ 
             "left": '-100%',
             "stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards ,duration:0.3},
        {animationEnd: function() {} });
  
    frmEnrolluserLandingKA.tabSelectedIndicator.animate(
        kony.ui.createAnimation({100:
        	{ 
             "left": '33.3%',
             "stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards ,duration:0.3},
        {animationEnd: function() {} });
  frmEnrolluserLandingKA.btnterms.skin = skntabDeselected;
    frmEnrolluserLandingKA.btnuserdetails.skin = skntabSelected;
    frmEnrolluserLandingKA.btnbasicinfo.skin = skntabDeselected;
  frmEnrolluserLandingKA.btnterms.setEnabled(false);
  frmEnrolluserLandingKA.btnbasicinfo.setEnabled(false);
}

function termsTabSelected() {
  frmEnrolluserLandingKA.enrollListsContainer.animate(
        kony.ui.createAnimation({100:
        	{ 
             "left": '-200%',
             "stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards ,duration:0.3},
        {animationEnd: function() {} });
  
    frmEnrolluserLandingKA.tabSelectedIndicator.animate(
        kony.ui.createAnimation({100:
        	{ 
             "left": '66.6%',
             "stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards ,duration:0.3},
        {animationEnd: function() {} });
  
    frmEnrolluserLandingKA.btnterms.skin = skntabSelected;
    frmEnrolluserLandingKA.btnuserdetails.skin = skntabDeselected;
 frmEnrolluserLandingKA.btnbasicinfo.skin = skntabDeselected;
frmEnrolluserLandingKA.btnuserdetails.setEnabled(false);
  frmEnrolluserLandingKA.btnbasicinfo.setEnabled(false);
}

function validateSSN(ssn){
  if(ssn.length!=9)
    return false;
  else 
    return true;
}
