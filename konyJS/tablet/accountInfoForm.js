// Sets titlebar and form to appropriate color
function accountsInfoPreShow(){
  if (x === account1){
      //accountInfo.skin = accountCheckingBkg;
      accountInfo.titleBarAccountInfo.skin = accountTypeChecking;
    } else if (x === account2){
      //accountInfo.skin = accountSavingsBkg;
      accountInfo.titleBarAccountInfo.skin = accountTypeSavings;
    } else if (x === account3){
      //accountInfo.skin = accountCreditBkg;
      accountInfo.titleBarAccountInfo.skin = accountTypeCredit;
    } else if (x === account4){
      //accountInfo.skin = accountCheckingBkg;
      accountInfo.titleBarAccountInfo.skin = accountTypeChecking;
    } 
  
  	accountInfo.successIcon.opacity = 0;
 	accountInfo.successImage.opacity = 0;
}

// called onEndEdit accountInfo.accountNicknameTextfield
function accountNicknameEntered(){
  accountInfo.saveNickname.isVisible = true;
}

function saveAccountNickname(){
    accountInfo.saveNickname.isVisible = false;
  
  	accountInfo.successIcon.opacity = 1;
  
  	var transformSuccess1 = kony.ui.makeAffineTransform();
  	transformSuccess1.scale(0.6,0.6);
  	var transformSuccess2 = kony.ui.makeAffineTransform();
  	transformSuccess2.scale(0.75,0.75);
  	var transformSuccess3 = kony.ui.makeAffineTransform();
  	transformSuccess3.scale(1.1,1.1);
  	var transformSuccess4 = kony.ui.makeAffineTransform();
  	transformSuccess4.scale(1.0,1.0);
  
  	accountInfo.successIcon.animate(
        kony.ui.createAnimation({
          	"0":  {"transform": transformSuccess1 ,"stepConfig":{"timingFunction": easeIn}},
          	"15":{"transform": transformSuccess2 ,"stepConfig":{"timingFunction": easeIn}},
          	"30":{"transform": transformSuccess1 ,"stepConfig":{"timingFunction": easeIn}},
          	"45":{"transform": transformSuccess2 ,"stepConfig":{"timingFunction": easeIn}},
          	"60":{"transform": transformSuccess1 ,"stepConfig":{"timingFunction": easeIn}},
          	"80":{"transform": transformSuccess3 ,"stepConfig":{"timingFunction": easeIn}},
          	"100":{"transform": transformSuccess4 ,"stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards,"duration": 4.0, "delay": 0},
        {"animationStart": function () {},
          "animationEnd": function () {}}
    );
  
  	accountInfo.successImage.animate(
        kony.ui.createAnimation({
           	"0":{"transform": transformSuccess1 , "opacity": 0, "stepConfig":{"timingFunction": easeIn}},
          	"60":{"transform": transformSuccess3 , "opacity": 0.8, "stepConfig":{"timingFunction": easeIn}},
          	"100":{"transform": transformSuccess4 ,  "opacity": 1, "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards,"duration": 1.0, "delay": 2.6},
        {"animationEnd": function () {}}
    );
  
}
