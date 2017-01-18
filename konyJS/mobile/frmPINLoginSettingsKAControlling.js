//Type your code here
var count=0;
var updated_pass="";
var first_pass="";
function check_updated(i){//store the number as string and matches entered and re-entered pin
  	count++;
  	if(count<=6){
      updated_pass = updated_pass + i ;
      //alert(count);
      frmPINLoginSettingsKA["flxProgressButton"+count].skin="sknFlxProgressButtonFill";
    }	
	//frmPINLoginSettingsKA.clearLink.isVisible = false;
  	if(count===6){
    //  clearProgressFlex();
       kony.timer.schedule("mytimer100",clearProgressFlex, 0.09, false);
      animation_wrong_pin();   
    }
}
  

function clearBtnClicked(){//on click of clear button

    if(count>0)
      {
        updated_pass = updated_pass.substring(0, updated_pass.length - 1);
       	frmPINLoginSettingsKA["flxProgressButton"+count].skin="sknFlxProgressButtonEmpty";        
        count--;        
      }
}




function clearProgressFlex(){ 	 //changes all filled skin to empty skins
      for(var i=6; i>=1;i--)
      {
           		 frmPINLoginSettingsKA["flxProgressButton"+i].skin="sknFlxProgressButtonEmpty";  
      }
 	 count=0; 
   	 updated_pass=""; 
}




function callback_ofanim() {
        frmPINLoginSettingsKA.flxProgressButtons.animate(
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
function animation_wrong_pin()
{
  for(var i=0;i<5;i++){
  	frmPINLoginSettingsKA.flxProgressButtons.animate(
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