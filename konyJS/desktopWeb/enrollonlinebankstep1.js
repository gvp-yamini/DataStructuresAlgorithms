function enrolluserStep1OnClick()
{
  initialiseForms();
  kony.retailBanking.globalData.globals.tmcFlagSet=false;
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listcontroller = INSTANCE.getFormController("frmEnrollOnlineBankingStep1KA");
  var navObject = new kony.sdk.mvvm.NavigationObject();
  navObject.setDataModel(null, kony.sdk.mvvm.OperationType.ADD, "form");
  listcontroller.performAction("loadDataAndShowForm",[navObject]);
}
function onClickEnrollStep1Submit() 
{
	var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmEnrollOnlineBankingStep1KA");
    var viewModel = controller.getFormModel();
	var valid1=true,valid2=true,valid3=true,valid4=true,valid5=true,valid6=true,valid7=true,valid8=true,valid9=true,valid=true,valid10=true;
    valid1= kony.retailBanking.util.validation.validateListBox(viewModel && viewModel.getWidgetData("lbxAcTypeKA").getData());
	valid2 = kony.retailBanking.util.validation.validateTextboxOrLabel(viewModel && viewModel.getViewAttributeByProperty("tbxAccNoKA", "text"));
    valid3 = validateSSN(viewModel.getViewAttributeByProperty("tbxssnKA", "text")) && kony.retailBanking.util.validation.validateTextboxOrLabel(viewModel && viewModel.getViewAttributeByProperty("tbxssnKA", "text"));
    var calDate = kony.retailBanking.util.formatingDate.getDateObjFromKonyCalendarArray(viewModel.getViewAttributeByProperty("caldobKA", "dateComponents"));
    valid4 = compareDate(calDate);
	valid5 = kony.retailBanking.util.validation.isValidUsername(viewModel && viewModel.getViewAttributeByProperty("tbxusernameKA", "text"));
    valid6 = kony.retailBanking.util.validation.isValidPassword(viewModel && viewModel.getViewAttributeByProperty("tbxpasswordKA", "text"));
    valid7 = validateConfirmPassword(viewModel && viewModel.getViewAttributeByProperty("tbxretypepassKA", "text"), viewModel && viewModel.getViewAttributeByProperty("tbxpasswordKA", "text"));
	valid8= kony.retailBanking.util.validation.isValidEmail(viewModel && viewModel.getViewAttributeByProperty("tbxemailKA", "text"));
	valid9 = kony.retailBanking.util.validation.isValidNumber(viewModel && viewModel.getViewAttributeByProperty("tbxphnoKA", "text"));
    var temp=viewModel.getViewAttributeByProperty("caldobKA", "day");
    if(temp===0)//checking if date is null date=null if day=0
      {
       valid10=false; 
      }
    var temp2=viewModel.getViewAttributeByProperty("tbxretypepassKA", "text");
	if(temp2==="")//checking retype pass is null 
	{
		valid7=false;
	}
    valid=valid1&&valid2&&valid3&&valid4&&valid5&&valid6&&valid7&&valid8&&valid9&&valid10;
	if (!valid)
    {
      if(!valid1)
          {
            viewModel.setViewAttributeByProperty("lbxAcTypeKA", "skin","sknlbxffffbb72727290KA");
          }
      else
          {
            viewModel.setViewAttributeByProperty("lbxAcTypeKA", "skin","sknLatoRegular72727290KA");
          }
      if(!valid2) 
          {
            viewModel.setViewAttributeByProperty("tbxAccNoKA", "skin", "sknffffbb72727290KA");
          }
	  else
		  {
		 viewModel.setViewAttributeByProperty("tbxAccNoKA", "skin", "skntbxlatoregular72727290KA");
		  }
      if(!valid3) 
          {
            viewModel.setViewAttributeByProperty("tbxssnKA", "skin", "sknffffbb72727290KA");
          }
      else
		  {
		    viewModel.setViewAttributeByProperty("tbxssnKA", "skin", "skntbxlatoregular72727290KA");

	     }
      if (!valid4) {
            viewModel.setViewAttributeByProperty("caldobKA", "skin", "sknclffffbb72727290KA");
        }
		else
		{
		 viewModel.setViewAttributeByProperty("caldobKA", "skin", "skn72727290");

		}
        
        if (!valid5) {
            viewModel.setViewAttributeByProperty("tbxusernameKA", "skin", "sknffffbb72727290KA");
        }
		else
		{
		 viewModel.setViewAttributeByProperty("tbxusernameKA", "skin", "skntbxlatoregular72727290KA");

		}
        if (!valid6) {
            viewModel.setViewAttributeByProperty("tbxpasswordKA", "skin", "sknffffbb72727290KA");
        }
		else
		{
		 viewModel.setViewAttributeByProperty("tbxpasswordKA", "skin", "skntbxlatoregular72727290KA");

		}
        if (!valid7) {
            viewModel.setViewAttributeByProperty("tbxretypepassKA", "skin", "sknffffbb72727290KA");
        }
		else
		{
		 viewModel.setViewAttributeByProperty("tbxretypepassKA", "skin", "skntbxlatoregular72727290KA");

		}
        if (!valid8) {
            viewModel.setViewAttributeByProperty("tbxemailKA", "skin", "sknffffbb72727290KA");
        }
		else
		{
		 viewModel.setViewAttributeByProperty("tbxemailKA", "skin", "skntbxlatoregular72727290KA");

		}
        if (!valid9) {
            viewModel.setViewAttributeByProperty("tbxphnoKA", "skin", "sknffffbb72727290KA");
        }
		else
		{
		 viewModel.setViewAttributeByProperty("tbxphnoKA", "skin", "skntbxlatoregular72727290KA");

		}
      if(!valid10)
         {
            viewModel.setViewAttributeByProperty("caldobKA", "skin", "sknclffffbb72727290KA");
        }
		else
		{
		 viewModel.setViewAttributeByProperty("caldobKA", "skin", "skn72727290");

		}
    }
    if (valid) {
        if (frmEnrollOnlineBankingStep1KA.chktncka.checked !== null) valid = true;
    }
    if (valid) {
        //var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var listcontroller = INSTANCE.getFormController("frmEnrollOnlineBankingStep2KA");
        var navObject = new kony.sdk.mvvm.NavigationObject();
        var actype = viewModel.getWidgetData("lbxAcTypeKA").getData();
        var ssn = viewModel.getViewAttributeByProperty("tbxssnKA", "text");
        var acno = viewModel.getViewAttributeByProperty("tbxAccNoKA", "text");
        var phno = viewModel.getViewAttributeByProperty("tbxphnoKA", "text");
        var email = viewModel.getViewAttributeByProperty("tbxemailKA", "text");
        var uname = viewModel.getViewAttributeByProperty("tbxusernameKA", "text");
        var pass = viewModel.getViewAttributeByProperty("tbxpasswordKA", "text");
        var dob = viewModel.getViewAttributeByProperty("caldobKA","dateComponents");
        dob=getDateFromdateObj(dob);
             // var dob = kony.retailBanking.util.formatingDate.getDateObjFromKonyCalendarArray(viewModel.getViewAttributeByProperty("caldobKA", "dateComponents"));

        var enrollinfo = {
            "actype": actype,
            "acno": acno,
            "ssn": ssn,
            "phno": phno,
            "email": email,
            "pass": pass,
            "uname": uname,
            "dob": dob
        };
        navObject.setCustomInfo("enrollinfo", enrollinfo);
        navObject.setDataModel(null, kony.sdk.mvvm.OperationType.ADD, "form");
        listcontroller.performAction("loadDataAndShowForm", [navObject]);
    }
};
function getDateFromdateObj(dateObj)
{
   var year = dateObj[2];
   var month = dateObj[1].toString();
   var day = dateObj[0].toString();
   if(month.length == 1){
    month = "0"+month;
   }
  if(day.length == 1){
    day = "0"+day;
  }
  var dateString = year+"-"+month+"-"+day;
  return dateString;
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
function onclickEnroll(){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmEnrollOnlineBankingStep2KA");
  var viewModel = controller.getFormModel();
  var valid= true;
  var valid1=true,valid2=true,valid3=true,valid4=true,valid5=true,valid6=true;
  var q1,q2,q3;//q4,q5;
  var qstn = new Array(4);
  valid1=kony.retailBanking.util.validation.validateListBox(viewModel && viewModel.getWidgetData("lbxQ1KA").getData());
  valid2 = kony.retailBanking.util.validation.validateTextboxOrLabel(viewModel && viewModel.getViewAttributeByProperty("tbxA1KA","text"));
  valid3= kony.retailBanking.util.validation.validateListBox(viewModel && viewModel.getWidgetData("lbxQ2KA").getData());
  valid4 = kony.retailBanking.util.validation.validateTextboxOrLabel(viewModel && viewModel.getViewAttributeByProperty("tbxAns2KA","text"));
  valid5= kony.retailBanking.util.validation.validateListBox(viewModel && viewModel.getWidgetData("lbxQ3KA").getData());
  valid6 = kony.retailBanking.util.validation.validateTextboxOrLabel(viewModel && viewModel.getViewAttributeByProperty("tbxA3KA","text"));
  valid=valid1&&valid2&&valid3&&valid4&&valid5&&valid6;
  if(!valid) //if all values are not valid
    {
      if(!valid1)
          {
            viewModel.setViewAttributeByProperty("lbxQ1KA", "skin","sknlbxffffbb72727290KA");
          }
      else
          {
            viewModel.setViewAttributeByProperty("lbxQ1KA", "skin","sknLatoRegular72727290KA");
          }
      if (!valid2) 
          {
            viewModel.setViewAttributeByProperty("tbxA1KA", "skin", "sknffffbb72727290KA");
          }
		else
		  {
		    viewModel.setViewAttributeByProperty("tbxA1KA", "skin", "skntbxlatoregular72727290KA");

		  }
      if(!valid3)
          {
            viewModel.setViewAttributeByProperty("lbxQ2KA", "skin","sknlbxffffbb72727290KA");
          }
      else
          {
            viewModel.setViewAttributeByProperty("lbxQ2KA", "skin","sknLatoRegular72727290KA");
          }
      if (!valid4) 
          {
            viewModel.setViewAttributeByProperty("tbxAns2KA", "skin", "sknffffbb72727290KA");
          }
		else
		  {
		    viewModel.setViewAttributeByProperty("tbxAns2KA", "skin", "skntbxlatoregular72727290KA");

		  }
      if(!valid5)
          {
            viewModel.setViewAttributeByProperty("lbxQ3KA", "skin","sknlbxffffbb72727290KA");
          }
      else
          {
            viewModel.setViewAttributeByProperty("lbxQ3KA", "skin","sknLatoRegular72727290KA");
          }
      if (!valid6) 
          {
            viewModel.setViewAttributeByProperty("tbxA3KA", "skin", "sknffffbb72727290KA");
          }
		else
		  {
		    viewModel.setViewAttributeByProperty("tbxA3KA", "skin", "skntbxlatoregular72727290KA");

		  }
    }

  if(valid){
    q1 = viewModel.getWidgetData("lbxQ1KA").getData();
    q2 = viewModel.getWidgetData("lbxQ2KA").getData();
    q3 = viewModel.getWidgetData("lbxQ3KA").getData();
   // q4 = viewModel.getWidgetData("lbxQ4KA").getData();
  //  q5 = viewModel.getWidgetData("CopylbxQ0e381e112689444").getData();
    valid = validateQstns(q1,q2,q3,qstn);
  }
  if(valid){
    
   controller.performAction("saveData");
  }
}



function validateQstns(q1,q2,q3,qstn){
  qstn[q1] = 1;
  if(qstn[q2]!= 1)
    qstn[q2] =1;
  else 
    return false;
  /*if(qstn[q3]!= 1)
    qstn[q3]= 1;
  else 
    return false;
  if(qstn[q4]!= 1)
    qstn[q4]= 1;
  else 
    return false;*/
  if(qstn[q3]!= 1){
     qstn[q3]= 1;
     return true;
  }
  else 
    return false;
}
function calendarSet()
{   var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmEnrollOnlineBankingStep1KA");
    var viewModel = controller.getFormModel();
	var d = new Date();
	var date=d.getDate();
	var year=d.getFullYear();
	var month=(d.getMonth()+1);
	viewModel.setViewAttributeByProperty("caldobKA","validEndDate",[date,month,year]);
}
function tandcSetChecked()
{ if(kony.retailBanking.globalData.globals.tmcFlagSet===true)
  {
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listcontroller = INSTANCE.getFormController("frmEnrollOnlineBankingStep1KA");
  var viewModel = listcontroller.getFormModel();
  viewModel.setViewAttributeByProperty("chktncka","selectedKeys",["checked"]);
  }
  if(kony.retailBanking.globalData.globals.tmcFlagSet===false)
  {
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listcontroller = INSTANCE.getFormController("frmEnrollOnlineBankingStep1KA");
  var viewModel = listcontroller.getFormModel();
  viewModel.setViewAttributeByProperty("chktncka","selectedKeys",["unchecked"]);
  }
}
function onclicktncAccept()
{
  kony.retailBanking.globalData.globals.tmcFlagSet=true;
  frmEnrollOnlineBankingStep1KA.show();
}
function onPreShowofEnrollStep1()
{
  	var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmEnrollOnlineBankingStep1KA");
    var viewModel = controller.getFormModel();
    viewModel.setViewAttributeByProperty("tbxAccNoKA", "skin", "skntbxlatoregular72727290KA");
    viewModel.setViewAttributeByProperty("tbxssnKA", "skin", "skntbxlatoregular72727290KA");
    viewModel.setViewAttributeByProperty("tbxusernameKA", "skin", "skntbxlatoregular72727290KA");
    viewModel.setViewAttributeByProperty("tbxpasswordKA", "skin", "skntbxlatoregular72727290KA");
    viewModel.setViewAttributeByProperty("tbxretypepassKA", "skin", "skntbxlatoregular72727290KA");
	viewModel.setViewAttributeByProperty("tbxemailKA", "skin", "skntbxlatoregular72727290KA");
    viewModel.setViewAttributeByProperty("tbxphnoKA", "skin", "skntbxlatoregular72727290KA");
    viewModel.setViewAttributeByProperty("caldobKA", "skin", "skn72727290");
    viewModel.setViewAttributeByProperty("lbxAcTypeKA", "skin","sknLatoRegular72727290KA");
}
function enrollStep2PreShow()
{ var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var controller = INSTANCE.getFormController("frmEnrollOnlineBankingStep2KA");
  var viewModel = controller.getFormModel();
  viewModel.setViewAttributeByProperty("lbxQ1KA", "skin","sknLatoRegular72727290KA");
  viewModel.setViewAttributeByProperty("tbxA1KA", "skin", "skntbxlatoregular72727290KA");
  viewModel.setViewAttributeByProperty("lbxQ2KA", "skin","sknLatoRegular72727290KA");
  viewModel.setViewAttributeByProperty("tbxAns2KA", "skin", "skntbxlatoregular72727290KA");
  viewModel.setViewAttributeByProperty("lbxQ3KA", "skin","sknLatoRegular72727290KA");
  viewModel.setViewAttributeByProperty("tbxA3KA", "skin", "skntbxlatoregular72727290KA");

}