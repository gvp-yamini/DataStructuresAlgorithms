//Type your code here
var enter_count=0;
var pass="";
var firstPass="";
function check(i){//store the number as string and matches entered and re-entered pin
  enter_count++;
   var formName=kony.application.getCurrentForm().id;
    if(enter_count<=6)//store  umber till count is less than 6
    {      
      pass = pass+i;
      if(formName==="frmPinEntryStep1")
     	 frmPinEntryStep1["flxProgressButton"+enter_count].skin="sknFlxProgressButtonFill";
      else if(formName==="frmPinEntryStep2")
     	 frmPinEntryStep2["flxProgressButton"+enter_count].skin="sknFlxProgressButtonFill";
     
    }
  
    if(firstPass!=="" && enter_count==6 ){//if the pin is entered in the second form 
      if(firstPass === pass){//first pass will contain the final pin
           kony.timer.schedule("mytimer1",showNextFormAndDestroyPrevious, 0.09, false);
        }
        else{
          kony.timer.schedule("mytimer2",clearAll, 0.02, false);
          //alert("PIN Confirmation failed!Please Re-Enter");
          animation();
           pass=""; 
          enter_count=0;
        } 
    }
  
  	if(enter_count>0){
       if(formName==="frmPinEntryStep1")
     	 frmPinEntryStep1.flxClear.isVisible="true";
      else if(formName==="frmPinEntryStep2")
         frmPinEntryStep2.flxClear.isVisible="true";
    }
  else{
    if(formName==="frmPinEntryStep1")
     	 frmPinEntryStep1.flxClear.isVisible="false";
      else if(formName==="frmPinEntryStep2")
         frmPinEntryStep2.flxClear.isVisible="false";
  }
  
    if(enter_count==6 && formName==="frmPinEntryStep1")//if count of number is 6 in first step
    {
      	firstPass=pass;
       kony.timer.schedule("mytimer12",recheck_pass, 0.2, false);      
    }  
}
  
function showNextFormAndDestroyPrevious(){
 // alert("bingo");
  /*if (accountpreviewcheck())
        nextFeature();
  else
	showFormOrderList();*/
  frmPinEntrySuccess.show();
}

function clearClicked(){//on click of clear button
    var formName=kony.application.getCurrentForm().id;
    if(enter_count>0)
      {
        pass = pass.substring(0, pass.length - 1);
        if(formName==="frmPinEntryStep1")
       		 frmPinEntryStep1["flxProgressButton"+enter_count].skin="sknFlxProgressButtonEmpty";
        else if(formName==="frmPinEntryStep2")
       		 frmPinEntryStep2["flxProgressButton"+enter_count].skin="sknFlxProgressButtonEmpty";
        
        enter_count--;        
      }
  
  if(enter_count>0){
       if(formName==="frmPinEntryStep1")
     	 frmPinEntryStep1.flxClear.isVisible="true";
      else if(formName==="frmPinEntryStep2")
         frmPinEntryStep2.flxClear.isVisible="true";
    }
  else{
    if(formName==="frmPinEntryStep1")
     	 frmPinEntryStep1.flxClear.isVisible="false";
      else if(formName==="frmPinEntryStep2")
         frmPinEntryStep2.flxClear.isVisible="false";
  }
}


function recheck_pass(){//change the previous form to second step form
  	   frmPinEntryStep2.show();
  	  enter_count=0;
      pass="";  	 
      clearAll();      
}

function clearAll(){ 	 //changes all filled skin to empty skins
  	  var formName=kony.application.getCurrentForm().id;
      for(var i=6; i>=1;i--)
      {
        	 if(formName==="frmPinEntryStep1")
           		 frmPinEntryStep1["flxProgressButton"+i].skin="sknFlxProgressButtonEmpty";  
             else if(formName==="frmPinEntryStep2")
           		 frmPinEntryStep2["flxProgressButton"+i].skin="sknFlxProgressButtonEmpty";  
            
      }
}

function exit()//on click of back button on frmPinEntry
{
  var formName=kony.application.getCurrentForm().id;
   try{
     	kony.application.exit();
     	pass="";
     	firstPass="";
     	enter_count=0;
        clearAll();
      }
   catch(Error)
      {
         alert("Exception While getting exiting the application  : "+Error);
      }
}

function navigationOnTouchIdEnabled(){
  frmPinEntryStep1.show();
}

function callback_ofanim() {
        frmPinEntryStep2.flxProgressButtons.animate(
        kony.ui.createAnimation({
            "100": {
                "left": "35%",
                "stepConfig": {
                    "timingFunction": kony.anim.EASE
                }
            }
        }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_BACKWARDS,
            "duration": 0.07
        }, {
          
        });
    }
function animation()
{
  for(var i=0;i<5;i++){
  	frmPinEntryStep2.flxProgressButtons.animate(
    kony.ui.createAnimation({
        "100": {
            "left": "20%",
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            }
        }
    }), {
        "delay": 0,
        "iterationCount": "1",
        "fillMode": kony.anim.FILL_MODE_BACKWARDS,
        "duration": 0.07
    }, {
        "animationEnd": callback_ofanim
    });
}
}