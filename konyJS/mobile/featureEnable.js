// PreShow
function featureEnablingPreShow() {
     var devicetouchId=kony.store.getItem("settingsflagsObject");
     if (kony.retailBanking.globalData.deviceInfo.isTouchIDSupported() && devicetouchId.touchIDEnabledFlag == null) {
   
            frmUnauthFeatureEnablingKA.touchFeature.left = "0dp";
            frmUnauthFeatureEnablingKA.touchFeature.opacity = 1;
     
            frmUnauthFeatureEnablingKA.touchSuccessContainer.opacity = 0;

            frmUnauthFeatureEnablingKA.touchIdImage.opacity = 1;
            frmUnauthFeatureEnablingKA.touchIdImage.centerX = "50%";

         

            var transformSuccess = kony.ui.makeAffineTransform();
            transformSuccess.scale(0, 0);

            frmUnauthFeatureEnablingKA.successIcon.animate(
                kony.ui.createAnimation({
                    "100": {
                        "transform": transformSuccess,
                        "stepConfig": {
                            "timingFunction": easeIn
                        }
                    }
                }), {
                    "fillMode": forwards,
                    "duration": 0.3
                }, {
                    "animationEnd": function() {}
                }
            );


            touchIdImageAnimate();
    }
      else
      {showFormOrderList();}
    }




// Reset FeatureEnabling on Hide
function featureEnablingHide() {
	   var devicetouchId=kony.store.getItem("settingsflagsObject");
       if (kony.retailBanking.globalData.deviceInfo.isTouchIDSupported() && devicetouchId.touchIDEnabledFlag == null) {

     
        frmUnauthFeatureEnablingKA.touchFeature.left = "0dp";
        frmUnauthFeatureEnablingKA.touchFeature.opacity = 1;
       

        
        frmUnauthFeatureEnablingKA.enableTouchID.top = "60dp";

        frmUnauthFeatureEnablingKA.touchSuccessContainer.top = "200dp";
        frmUnauthFeatureEnablingKA.touchSuccessContainer.opacity = "0";
        frmUnauthFeatureEnablingKA.touchButtonContainer.top = "0dp";
        frmUnauthFeatureEnablingKA.touchButtonContainer.opacity = 1;

      
         
    }

}




var whichFeature;

function enableFeature(whichFeature) {

    if (whichFeature == 1) {

        frmUnauthFeatureEnablingKA.touchSuccessContainer.animate(
            kony.ui.createAnimation({
                "100": {
                    "top": "10dp",
                    "opacity": 1,
                    "stepConfig": {
                        "timingFunction": easeOut
                    }
                }
            }), {
                "fillMode": forwards,
                "duration": 0.4,
                "delay": 0.4
            }, {
                "animationStart": function() {
                    successIconAnimate();
                },
                "animationEnd": function() {}
            }
        );

        frmUnauthFeatureEnablingKA.touchButtonContainer.animate(
            kony.ui.createAnimation({
                "80": {
                    "opacity": 0,
                    "stepConfig": {
                        "timingFunction": easeOut
                    }
                },
                "100": {
                    "top": "-100dp",
                    "stepConfig": {
                        "timingFunction": easeOut
                    }
                }
            }), {
                "fillMode": forwards,
                "duration": 0.3
            }, {
                "animationEnd": function() {}
            }
        );
    }

    if (whichFeature == 2) {

        frmUnauthFeatureEnablingKA.apSuccessContainer.animate(
            kony.ui.createAnimation({
                "100": {
                    "top": "10dp",
                    "opacity": 1,
                    "stepConfig": {
                        "timingFunction": easeOut
                    }
                }
            }), {
                "fillMode": forwards,
                "duration": 0.4,
                "delay": 0.4
            }, {
                "animationStart": function() {
                    successIconAnimate();
                },
                "animationEnd": function() {}
            }
        );

        frmUnauthFeatureEnablingKA.apButtonContainer.animate(
            kony.ui.createAnimation({
                "80": {
                    "opacity": 0,
                    "stepConfig": {
                        "timingFunction": easeOut
                    }
                },
                "100": {
                    "top": "-100dp",
                    "stepConfig": {
                        "timingFunction": easeOut
                    }
                }
            }), {
                "fillMode": forwards,
                "duration": 0.3
            }, {
                "animationEnd": function() {}
            }
        );
    }

}

function successIconAnimate() {
    var transformSuccess = kony.ui.makeAffineTransform();
    transformSuccess.scale(1.1, 1.1);
    var transformSuccess2 = kony.ui.makeAffineTransform();
    transformSuccess2.scale(0.9, 0.9);

    frmUnauthFeatureEnablingKA.successIcon.animate(
        kony.ui.createAnimation({
            "50": {
                "transform": transformSuccess,
                "stepConfig": {
                    "timingFunction": easeIn
                }
            },
            "100": {
                "transform": transformSuccess2,
                "stepConfig": {
                    "timingFunction": easeIn
                }
            }
        }), {
            "fillMode": forwards,
            "duration": 0.5,
            "delay": 0.1
        }, {
            "animationEnd": function() {}
        }
    );

   


}

function touchIdImageAnimate() {
    frmUnauthFeatureEnablingKA.touchIdImage.animate(
        kony.ui.createAnimation({
            "100": {
                "opacity": 1,
                "centerX": "50%",
                "stepConfig": {
                    "timingFunction": easeOut
                }
            }
        }), {
            "fillMode": forwards,
            "duration": 0.4,
            delay: 0.1
        }, {
            "animationEnd": function() {}
        }
    );
}

function nextFeature() {
    frmUnauthFeatureEnablingKA.touchFeature.animate(
        kony.ui.createAnimation({
            "100": {
                "left": "-50%",
                "opacity": 0,
                "stepConfig": {
                    "timingFunction": easeIn
                }
            }
        }), {
            "fillMode": forwards,
            "duration": 0.4
        }, {
            "animationEnd": function() {}
        }
    );
  

}

function accountpreviewcheck()
{
  var flagData=kony.store.getItem("settingsflagsObject");
  if (kony.store.getItem("firstTimeLogin") === null)
    {
      	if (flagData.rememberMeFlag==true)
          return true; 
        else
          return false;
    }
  else
    return false;
}