function firstTimeforDeviceRegistration()
{
  if(kony.store.getItem("deviceReg")=== null)
  {
     kony.store.setItem("deviceReg", "finished");
      frmDeviceRegistrationOptionsKA.show();
  }
  else
  {
    // kony.store.removeItem("deviceReg");
    frmUnauthFeatureEnablingKA.show();
  }
}


//Author: Gidda Gandhi 
//Date:04-Feb-2015
//KH9155

function deviceRegPreShow() {
  frmDeviceRegistrationKA.regFlex.left = "0dp";
  frmDeviceRegistrationKA.regFlex.opacity = 1;
  frmDeviceRegistrationKA.deviceRegSuccessContainer.opacity = 0;
  frmDeviceRegistrationKA.activation.isVisible = false;
  frmDeviceRegistrationKA.activation.opacity = 0;
  frmDeviceRegistrationKA.activation.left = "0dp";
  frmDeviceRegistrationKA.activation.top = "10%";
  frmDeviceRegistrationKA.doneFlex.opacity = 0;
  frmDeviceRegistrationKA.doneFlex.isVisible = true;
  frmDeviceRegistrationKA.doneFlex.left = "0dp";
  frmDeviceRegistrationKA.doneFlex.top = "-150dp";
}

function firstTimeforDeviceRegistration()
{
  if(kony.store.getItem("deviceReg")=== null)
  {
     kony.store.setItem("deviceReg", "finished");
      frmDeviceRegistrationOptionsKA.show();
  }
  else
  {
    
    frmUnauthFeatureEnablingKA.show();
  }
}
function deviceRegclick()
 {
   if(frmDeviceRegistrationKA.activation.isVisible === false)
   {
      frmDeviceRegistrationKA.activation.isVisible=true;


      frmDeviceRegistrationKA.activation.animate(
        kony.ui.createAnimation({ "100":{ "opacity": 1,
          "stepConfig":{"timingFunction": easeOut}}}),
        {"fillMode": forwards, "duration": 0.4, "delay": 0.4},
        {"animationStart": function () {},
        "animationEnd": function () {}}
        );
      
      frmDeviceRegistrationKA.notice.animate(
        kony.ui.createAnimation({
          "0":{ "opacity": 1,
          "stepConfig":{"timingFunction": easeOut}},
          "100":{"opacity": 0,
          "stepConfig":{"timingFunction": easeOut}}}),
        {"fillMode": forwards, "duration": 0.3},
        {"animationEnd": function () {
        }}
        ); 
    }
    else
    {
      frmDeviceRegistrationKA.deviceRegSuccessContainer.animate(
        kony.ui.createAnimation({ "100":{ "top":"10dp","opacity": 1,
          "stepConfig":{"timingFunction": easeOut}}}),
        {"fillMode": forwards, "duration": 0.4, "delay": 1},
        {"animationStart": function () {successIconAnimateReg();},
        "animationEnd": function () {}}
        );
      
      frmDeviceRegistrationKA.deviceRegButtonContainer.animate(
        kony.ui.createAnimation({
          "80":{ "opacity": 0,
          "stepConfig":{"timingFunction": easeOut}},
          "100":{"top": "-100dp",
          "stepConfig":{"timingFunction": easeOut}}}),
        {"fillMode": forwards, "duration": 0.3 , "delay": 0.8},
        {"animationEnd": function () {
        }}
        );
      frmDeviceRegistrationKA.doneFlex.animate(
        kony.ui.createAnimation({ "1":{ "opacity": 1,
          "stepConfig":{"timingFunction": easeOut}},
          "100":{ "top":"10%","opacity": 1,
          "stepConfig":{"timingFunction": easeOut}}}),
        {"fillMode": forwards, "duration": 0.4, "delay": 0.4},
        {"animationStart": function () {},
        "animationEnd": function () {}}
        );

      frmDeviceRegistrationKA.activation.animate(
        kony.ui.createAnimation({
          "80":{ "opacity": 0,
          "stepConfig":{"timingFunction": easeOut}},
          "100":{"top": "-100dp",
          "stepConfig":{"timingFunction": easeOut}}}),
        {"fillMode": forwards, "duration": 0.3},
        {"animationEnd": function () {
        }}
        );

    }
}

function successIconAnimateReg(){
  var transformSuccess = kony.ui.makeAffineTransform();
  transformSuccess.scale(1.1,1.1);
  var transformSuccess2 = kony.ui.makeAffineTransform();
  transformSuccess2.scale(0.9,0.9);
  
  frmDeviceRegistrationKA.successIcon.animate(
    kony.ui.createAnimation({
      "50":{ "transform": transformSuccess,
      "stepConfig":{"timingFunction": easeIn}},
      "100":{ "transform": transformSuccess2,
      "stepConfig":{"timingFunction": easeIn}}}),
    {"fillMode": forwards, "duration": 0.5, "delay": 0.1},
    {"animationEnd": function () {}}
    );
  
  
  
}



