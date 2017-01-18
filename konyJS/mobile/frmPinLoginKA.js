//Type your code here
var pin_count_login=0;
var login_pass="";
var first_login_pass="";
function check_Login_Pin(i){//store the number as string and matches entered and re-entered pin
  	pin_count_login++;
  	if(pin_count_login<=6){
      login_pass = login_pass + i ;
      frmLoginKA["flxProgressButton"+pin_count_login].skin="sknFlxProgressButtonFill";
    }	
	
  	if(pin_count_login===6){
       kony.timer.schedule("mytimer100",clearProgressFlexLogin, 0.09, false);
      if(login_pass==="123456"){
        alert("Log in");
        
      }
      else{
        animation_wrong_pin();  
        login_pass=""; 
      }
    }
}

function clearBtnClickedFromLogin(){//on click of clear button

    if(pin_count_login>0)
      {
        login_pass = login_pass.substring(0, login_pass.length - 1);
       	frmLoginKA["flxProgressButton"+pin_count_login].skin="sknFlxProgressButtonEmpty";        
        pin_count_login--;        
      }
}

function backBtnClickedFromLogin()
{
   try{
     	kony.application.exit();
     	login_pass="";
     	pin_count_login=0;
        clearProgressFlexLogin();
      }
   catch(Error)
      {
         alert("Exception While getting exiting the application  : "+Error);
      }
}

function clearProgressFlexLogin(){ 	 //changes all filled skin to empty skins
      for(var i=6; i>=1;i--)
      {
           		 frmLoginKA["flxProgressButton"+i].skin="sknFlxProgressButtonEmpty";  
      }
 	 pin_count_login=0; 
   	 
}

function callback_ofanim() {
        frmLoginKA.flxProgressButtons.animate(
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
  	frmLoginKA.flxProgressButtons.animate(
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