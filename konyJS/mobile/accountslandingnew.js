function viewaccountInfo()
{
  userAgent = kony.os.userAgent();
  frmAccountInfoformortageKA.successIcon.opacity = 0;
  frmAccountInfoformortageKA.successImage.opacity = 0;
  if (accounttype == "Deposit")
     {
       frmAccountInfoformortageKA.skin=sknaccountDepositBkg;
   	   frmAccountInfoformortageKA.titleBarAccountInfo.skin = sknaccounttypeDeposit;
       if (userAgent === "iPhone")
         frmAccountInfoformortageKA.lbliostitle.text="Deposit Account Info";
       else
         frmAccountInfoformortageKA.lbladrdtitle.text="Deposit Account Info";
       frmAccountInfoformortageKA.flxaccountdetailsfordeposits.setVisibility(true);
	   frmAccountInfoformortageKA.flxaccountdetailsformortage.setVisibility(false);
       frmAccountInfoformortageKA.show();
     }
  else if (accounttype == "Mortgage")
      {
        frmAccountInfoformortageKA.skin=sknaccountMortageBkg;
        if (userAgent === "iPhone"){
        frmAccountInfoformortageKA.lbliostitle.text="Mortgage Account Info";}
        else{
       frmAccountInfoformortageKA.lbladrdtitle.text="Mortgage Account Info";
        }
       frmAccountInfoformortageKA.titleBarAccountInfo.skin = sknaccounttypemortage;
       frmAccountInfoformortageKA.flxaccountdetailsfordeposits.setVisibility(true);
	   frmAccountInfoformortageKA.flxaccountdetailsformortage.setVisibility(false);
       frmAccountInfoformortageKA.show();
        
  }
    else {
          frmAccountInfoKA.show();
    }
}

function accountNicknameEnteredmortage(){
   frmAccountInfoformortageKA.saveNickname.isVisible = true;
}

function saveAccountNicknamemortage(){
     frmAccountInfoformortageKA.saveNickname.isVisible = false;
  
  	 frmAccountInfoformortageKA.successIcon.opacity = 1;
  
  	var transformSuccess1 = kony.ui.makeAffineTransform();
  	transformSuccess1.scale(0.6,0.6);
  	var transformSuccess2 = kony.ui.makeAffineTransform();
  	transformSuccess2.scale(0.75,0.75);
  	var transformSuccess3 = kony.ui.makeAffineTransform();
  	transformSuccess3.scale(1.1,1.1);
  	var transformSuccess4 = kony.ui.makeAffineTransform();
  	transformSuccess4.scale(1.0,1.0);
  
  	 frmAccountInfoformortageKA.successIcon.animate(
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
  
  	 frmAccountInfoformortageKA.successImage.animate(
        kony.ui.createAnimation({
           	"0":{"transform": transformSuccess1 , "opacity": 0, "stepConfig":{"timingFunction": easeIn}},
          	"60":{"transform": transformSuccess3 , "opacity": 0.8, "stepConfig":{"timingFunction": easeIn}},
          	"100":{"transform": transformSuccess4 ,  "opacity": 1, "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards,"duration": 1.0, "delay": 2.6},
        {"animationEnd": function () {}}
    );
  
}

