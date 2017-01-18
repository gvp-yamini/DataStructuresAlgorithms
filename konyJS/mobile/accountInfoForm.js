// Sets titlebar and form to appropriate color
function accountsInfoPreShow(){
  if (x === "Checking"){
      //frmAccountInfoKA.skin = sknaccountCheckingBkg;
      frmAccountInfoKA.titleBarAccountInfo.skin = sknaccountTypeChecking;
    } else if (x === "Savings"){
     // frmAccountInfoKA.skin = sknaccountSavingsBkg;
      frmAccountInfoKA.titleBarAccountInfo.skin = sknaccountTypeSavings;
    } else if (x === "CreditCard"){
     // frmAccountInfoKA.skin = sknaccountCreditBkg;
      frmAccountInfoKA.titleBarAccountInfo.skin = sknaccountTypeCredit;
    }
  
  	frmAccountInfoKA.successIcon.opacity = 0;
 	frmAccountInfoKA.successImage.opacity = 0;
}


function accountsStatementPreShow(){
  if (x === "Checking"){
      frmacntstatementsKA.skin = sknaccountCheckingBkg;
      frmacntstatementsKA.titleBarAccountInfo.skin = sknaccountTypeChecking;
    } else if (x === "Savings"){
      frmacntstatementsKA.skin = sknaccountSavingsBkg;
      frmacntstatementsKA.titleBarAccountInfo.skin = sknaccountTypeSavings;
    } else if (x === "CreditCard"){
      frmacntstatementsKA.skin = sknaccountCreditBkg;
      frmacntstatementsKA.titleBarAccountInfo.skin = sknaccountTypeCredit;
    } else if (x === "Deposit"){
      frmacntstatementsKA.skin=sknaccountDepositBkg;
      frmacntstatementsKA.titleBarAccountInfo.skin = sknaccounttypeDeposit;
    } 
    else if (x == "Mortgage"){
      frmacntstatementsKA.skin=sknaccountMortageBkg;
      frmacntstatementsKA.titleBarAccountInfo.skin = sknaccounttypemortage;
  }
  
}
function accountsStatementDetailsPreShow(){
  if (x === "Checking"){
      frmacntstatementdetailsKA.skin = sknaccountCheckingBkg;
      frmacntstatementdetailsKA.titleBarAccountInfo.skin = sknaccountTypeChecking;
    } else if (x === "Savings"){
      frmacntstatementdetailsKA.skin = sknaccountSavingsBkg;
      frmacntstatementdetailsKA.titleBarAccountInfo.skin = sknaccountTypeSavings;
    } else if (x === "CreditCard"){
      frmacntstatementdetailsKA.skin = sknaccountCreditBkg;
      frmacntstatementdetailsKA.titleBarAccountInfo.skin = sknaccountTypeCredit;
    } 
  
}

// called onEndEdit frmAccountInfoKA.accountNicknameTextfield
function accountNicknameEntered(){
  frmAccountInfoKA.saveNickname.isVisible = true;
}

function saveAccountNickname(){
    frmAccountInfoKA.saveNickname.isVisible = false;
  
  	frmAccountInfoKA.successIcon.opacity = 1;
  
  	var transformSuccess1 = kony.ui.makeAffineTransform();
  	transformSuccess1.scale(0.6,0.6);
  	var transformSuccess2 = kony.ui.makeAffineTransform();
  	transformSuccess2.scale(0.75,0.75);
  	var transformSuccess3 = kony.ui.makeAffineTransform();
  	transformSuccess3.scale(1.1,1.1);
  	var transformSuccess4 = kony.ui.makeAffineTransform();
  	transformSuccess4.scale(1.0,1.0);
  
  	frmAccountInfoKA.successIcon.animate(
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
  
  	frmAccountInfoKA.successImage.animate(
        kony.ui.createAnimation({
           	"0":{"transform": transformSuccess1 , "opacity": 0, "stepConfig":{"timingFunction": easeIn}},
          	"60":{"transform": transformSuccess3 , "opacity": 0.8, "stepConfig":{"timingFunction": easeIn}},
          	"100":{"transform": transformSuccess4 ,  "opacity": 1, "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards,"duration": 1.0, "delay": 2.6},
        {"animationEnd": function () {}}
    );
  
}
