//Type your code here
function off_animation() {
    function callback() {
        frmSetUpPinLogin.flxSwitch.skin = "sknSwitchOFF";
    }
    frmSetUpPinLogin.flxCircle.animate(
    kony.ui.createAnimation({
        "100": {
            "left": "44%",
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            }
        }
    }), {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 0.25
    }, {
        "animationEnd": callback
    });
}

function on_animation() {
    function callback() {
        frmSetUpPinLogin.flxSwitch.skin = "sknSwitchON";
    }
    frmSetUpPinLogin.flxCircle.animate(
    kony.ui.createAnimation({
        "100": {
            "left": "0%",
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            }
        }
    }), {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 0.25
    }, {
        "animationEnd": callback
    });
}