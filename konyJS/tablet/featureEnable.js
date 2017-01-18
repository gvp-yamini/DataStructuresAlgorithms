// PreShow
function featureEnablingPreShow() {
    userAgent = kony.os.userAgent();
   if (userAgent === "iPhone" || userAgent === "iPad"){
     var status = kony.localAuthentication.getStatusForAuthenticationMode(constants.LOCAL_AUTHENTICATION_MODE_TOUCH_ID);  
     var devicetouchId=kony.store.getItem("settingsflagsObject");
     if (status == 5000 && devicetouchId.touchIDEnabledFlag == null)
     {
            frmUnauthFeatureEnablingKA.touchFeature.left = "0dp";
            frmUnauthFeatureEnablingKA.touchFeature.opacity = 1;
            frmUnauthFeatureEnablingKA.apFeature.opacity = 0;
            frmUnauthFeatureEnablingKA.apSuccessContainer.opacity = 0;
            frmUnauthFeatureEnablingKA.touchSuccessContainer.opacity = 0;

            frmUnauthFeatureEnablingKA.touchIdImage.opacity = 0;
            frmUnauthFeatureEnablingKA.touchIdImage.centerX = "70%";

            frmUnauthFeatureEnablingKA.imageContainer.opacity = 0;
            frmUnauthFeatureEnablingKA.imageContainer.left = "100dp";

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

            frmUnauthFeatureEnablingKA.successIcon2.animate(
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
    }else{
       frmUnauthFeatureEnablingKA.touchFeature.isVisible = false;
        frmUnauthFeatureEnablingKA.apSuccessContainer.opacity = 0;
        frmUnauthFeatureEnablingKA.apFeature.left = "0dp";
    }} else  {

        frmUnauthFeatureEnablingKA.touchFeature.isVisible = false;
        frmUnauthFeatureEnablingKA.apSuccessContainer.opacity = 0;
        frmUnauthFeatureEnablingKA.apFeature.left = "0dp";

    }
}



// Reset FeatureEnabling on Hide
function featureEnablingHide() {
userAgent = kony.os.userAgent();
   if (userAgent === "iPhone" || userAgent === "iPad"){
       var status = kony.localAuthentication.getStatusForAuthenticationMode(constants.LOCAL_AUTHENTICATION_MODE_TOUCH_ID);  

    if (status === 5000 && kony.store.getItem("touchIdEnable")=== null) {

     
        frmUnauthFeatureEnablingKA.touchFeature.left = "0dp";
        frmUnauthFeatureEnablingKA.touchFeature.opacity = 1;
        frmUnauthFeatureEnablingKA.apFeature.left = "50%";
        frmUnauthFeatureEnablingKA.apFeature.opacity = 0;

        frmUnauthFeatureEnablingKA.enableAp.top = "90dp";
        frmUnauthFeatureEnablingKA.enableTouchID.top = "60dp";

        frmUnauthFeatureEnablingKA.touchSuccessContainer.top = "200dp";
        frmUnauthFeatureEnablingKA.touchSuccessContainer.opacity = "0";
        frmUnauthFeatureEnablingKA.touchButtonContainer.top = "0dp";
        frmUnauthFeatureEnablingKA.touchButtonContainer.opacity = 1;

        frmUnauthFeatureEnablingKA.apSuccessContainer.top = "200dp";
        frmUnauthFeatureEnablingKA.apSuccessContainer.opacity = "0";
        frmUnauthFeatureEnablingKA.apButtonContainer.top = "0dp";
        frmUnauthFeatureEnablingKA.apButtonContainer.opacity = 1;
         
    }else
      {
        frmUnauthFeatureEnablingKA.apFeature.left = 0;
        frmUnauthFeatureEnablingKA.apFeature.opacity = 1;

        frmUnauthFeatureEnablingKA.enableAp.top = "90dp";

        frmUnauthFeatureEnablingKA.apSuccessContainer.top = "200dp";
        frmUnauthFeatureEnablingKA.apSuccessContainer.opacity = "0";
        frmUnauthFeatureEnablingKA.apButtonContainer.top = "0dp";
        frmUnauthFeatureEnablingKA.apButtonContainer.opacity = 1;

      }}else {

        frmUnauthFeatureEnablingKA.apFeature.left = 0;
        frmUnauthFeatureEnablingKA.apFeature.opacity = 1;

        frmUnauthFeatureEnablingKA.enableAp.top = "90dp";

        frmUnauthFeatureEnablingKA.apSuccessContainer.top = "200dp";
        frmUnauthFeatureEnablingKA.apSuccessContainer.opacity = "0";
        frmUnauthFeatureEnablingKA.apButtonContainer.top = "0dp";
        frmUnauthFeatureEnablingKA.apButtonContainer.opacity = 1;

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

    frmUnauthFeatureEnablingKA.successIcon2.animate(
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

    frmUnauthFeatureEnablingKA.apFeature.animate(
        kony.ui.createAnimation({
            "100": {
                "left": "0%",
                "opacity": 1,
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

    frmUnauthFeatureEnablingKA.imageContainer.animate(
        kony.ui.createAnimation({
            "100": {
                "opacity": 1,
                "left": "0dp",
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