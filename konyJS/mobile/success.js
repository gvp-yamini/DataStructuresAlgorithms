var whatSuccess;

// Success messages for frmNewPayPersonKA, frmNewTransferKA, newPayBill, frmNewDeposit
// Success messages are contained within the "successContainer" FlexContainer of each respecitve form
 
function transactionSuccess(whatSuccess){
  
   var title = " ",
		  text =" "; 	
  
  	switch(whatSuccess){
      case frmNewBillKA:
        title = i18n_processingTransaction;
      	text = i18n_successText;
        kony.store.setItem("frmTransactionPage","frmNewBillKA");
        break;
      case frmNewTransferKA:
        title = i18n_processingTransaction;
      	text = i18n_successText;
        kony.store.setItem("frmTransactionPage","frmNewTransferKA");
        break;
      case frmNewPayPersonKA:
        title = i18n_processingTransaction;
      	text = i18n_successText;
        kony.store.setItem("frmTransactionPage","frmNewPayPersonKA");
        break;
	  case frmP2PConfirmationPayKA:
        title = i18n_processingTransaction;
        text = i18n_successText;
        kony.store.setItem("frmTransactionPage","frmNewPayPersonKA");
        break;
      case frmNewDepositKA:
        title = i18n_processingTransaction;
        text = "You can view Transactions in your account details.";
        kony.store.setItem("frmTransactionPage","frmNewDepositKA");
        break;
    }
  
  frmSuccessFormKA.successTitle.text = title;
  frmSuccessFormKA.successText.text = text;
  frmSuccessFormKA.show();
}

function successFormPreShow(){
     frmSuccessFormKA.successIcon.opacity=1;
    frmSuccessFormKA.successIcon.skin = "sknsuccessIcon";
  	frmSuccessFormKA.innerSuccessContainer.opacity = 0;
  	frmSuccessFormKA.innerSuccessContainer.top = "100dp";
   frmSuccessFormKA.successIcon2.isVisible = false;
  frmSuccessFormKA.successImage2.opacity = 0;
  	frmSuccessFormKA.successContinue.opacity = 0;
  	frmSuccessFormKA.successContinue.top = "70dp";
  
 	
}

function errorFormPostShow(){
    frmSuccessFormKA.successImage2.isVisible = true;
    frmSuccessFormKA.successIcon2.skin = "sknsuccessIcon";
    frmSuccessFormKA.successImage2.src = "error.png";
    var transformSuccess1 = kony.ui.makeAffineTransform();
  	transformSuccess1.scale(0.6,0.6);
  	var transformSuccess2 = kony.ui.makeAffineTransform();
  	transformSuccess2.scale(0.75,0.75);
  	var transformSuccess3 = kony.ui.makeAffineTransform();
  	transformSuccess3.scale(1.1,1.1);
  	var transformSuccess4 = kony.ui.makeAffineTransform();
  	transformSuccess4.scale(1.0,1.0);
  
  	frmSuccessFormKA.innerSuccessContainer.animate(
        kony.ui.createAnimation({"100":{"top": "-20dp", "opacity": 1 ,"stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards,"duration": duration, "delay": 3.1},
        {"animationEnd": function () {}}
    );
  
  	frmSuccessFormKA.successContinue.animate(
        kony.ui.createAnimation({"100":{"top": "30dp", "opacity": 1 ,"stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards,"duration": duration, "delay": 3.3},
        {"animationEnd": function () {}}
    );
   frmSuccessFormKA.successIcon2.isVisible = true;
  	frmSuccessFormKA.successIcon2.animate(
        kony.ui.createAnimation({
          	"0":  {"transform": transformSuccess1 ,"stepConfig":{"timingFunction": easeIn}},
          	"15":{"transform": transformSuccess2 ,"stepConfig":{"timingFunction": easeIn}},
          	"30":{"transform": transformSuccess1 ,"stepConfig":{"timingFunction": easeIn}},
          	"45":{"transform": transformSuccess2 ,"stepConfig":{"timingFunction": easeIn}},
          	"60":{"transform": transformSuccess1 ,"stepConfig":{"timingFunction": easeIn}},
          	"80":{"transform": transformSuccess3 ,"stepConfig":{"timingFunction": easeIn}},
          	"100":{"transform": transformSuccess4 ,"stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards,"duration": 4.0, "delay": 0},
        {"animationStart": function () {frmSuccessFormKA.successIcon.opacity=0;},
          "animationEnd": function () {}}
    );
  
  	frmSuccessFormKA.successImage2.animate(
        kony.ui.createAnimation({
           	"0":{"transform": transformSuccess1 , "opacity": 0, "stepConfig":{"timingFunction": easeIn}},
          	"60":{"transform": transformSuccess3 , "opacity": 0.8, "stepConfig":{"timingFunction": easeIn}},
          	"100":{"transform": transformSuccess4 ,  "opacity": 1, "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards,"duration": 1.0, "delay": 2.6},
        { "animationStart": function () {frmSuccessFormKA.successIcon2.skin = "sknerrorIcon";},
          "animationEnd": function () {}}
    );
  
  	frmSuccessFormKA.processing.animate(
        kony.ui.createAnimation({
          	"65":{"opacity": 1, "stepConfig":{"timingFunction": easeIn}},
          	"80":{"opacity": 0, "stepConfig":{"timingFunction": easeIn}},
          	"100":{"opacity": 0, "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": 4.0},
        {"animationEnd": function () {}}
    ); 
}

function successFormPostShow(){
    frmSuccessFormKA.successImage2.isVisible = true;
    frmSuccessFormKA.successIcon2.skin = "sknsuccessIcon";
    frmSuccessFormKA.successImage2.src = "success_large_check.png"
  	var transformSuccess1 = kony.ui.makeAffineTransform();
  	transformSuccess1.scale(0.6,0.6);
  	var transformSuccess2 = kony.ui.makeAffineTransform();
  	transformSuccess2.scale(0.75,0.75);
  	var transformSuccess3 = kony.ui.makeAffineTransform();
  	transformSuccess3.scale(1.1,1.1);
  	var transformSuccess4 = kony.ui.makeAffineTransform();
  	transformSuccess4.scale(1.0,1.0);
  
  	frmSuccessFormKA.innerSuccessContainer.animate(
        kony.ui.createAnimation({"100":{"top": "-20dp", "opacity": 1 ,"stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards,"duration": duration, "delay": 3.1},
        {"animationEnd": function () {}}
    );
  
  	frmSuccessFormKA.successContinue.animate(
        kony.ui.createAnimation({"100":{"top": "30dp", "opacity": 1 ,"stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards,"duration": duration, "delay": 3.3},
        {"animationEnd": function () {}}
    );
    frmSuccessFormKA.successIcon2.isVisible = true;
  	frmSuccessFormKA.successIcon2.animate(
        kony.ui.createAnimation({
          	"0":  {"transform": transformSuccess1 ,"stepConfig":{"timingFunction": easeIn}},
          	"15":{"transform": transformSuccess2 ,"stepConfig":{"timingFunction": easeIn}},
          	"30":{"transform": transformSuccess1 ,"stepConfig":{"timingFunction": easeIn}},
          	"45":{"transform": transformSuccess2 ,"stepConfig":{"timingFunction": easeIn}},
          	"60":{"transform": transformSuccess1 ,"stepConfig":{"timingFunction": easeIn}},
          	"80":{"transform": transformSuccess3 ,"stepConfig":{"timingFunction": easeIn}},
          	"100":{"transform": transformSuccess4 ,"stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards,"duration": 4, "delay":0},
        {"animationStart": function () {
                                        frmSuccessFormKA.successIcon.opacity=0;
                                       },
          "animationEnd": function () {}}
    );
  	frmSuccessFormKA.successImage2.animate(
        kony.ui.createAnimation({
           	"0":{"transform": transformSuccess1 , "opacity": 0, "stepConfig":{"timingFunction": easeIn}},
          	"60":{"transform": transformSuccess3 , "opacity": 0.8, "stepConfig":{"timingFunction": easeIn}},
          	"100":{"transform": transformSuccess4 ,  "opacity": 1, "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards,"duration": 1.0, "delay": 1.6},
        {"animationEnd": function () {}}
    );
   
  	frmSuccessFormKA.processing.animate(
        kony.ui.createAnimation({
          	"65":{"opacity": 1, "stepConfig":{"timingFunction": easeIn}},
          	"80":{"opacity": 0, "stepConfig":{"timingFunction": easeIn}},
          	"100":{"opacity": 0, "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": 2.0},
        {"animationEnd": function () {}}
    ); 
  
}

function successFormContinue(){
    if(kony.store.getItem("frmTransactionPage")=="frmNewDepositKA")
      frmDepositPayLandingKA.show();
      else{
        getTransferPayLandingForm("frmTransferPayLandingKA");
        //frmTransferPayLandingKA.show();
      }
}

function successFormanimationShow(){
    frmSuccessFormKA.successIcon.isVisible = true;
    frmSuccessFormKA.successIcon.skin = "sknsuccessIcon";
    frmSuccessFormKA.successImage2.src = "";
  	var transformSuccess1 = kony.ui.makeAffineTransform();
  	transformSuccess1.scale(0.6,0.6);
  	var transformSuccess2 = kony.ui.makeAffineTransform();
  	transformSuccess2.scale(0.75,0.75);
  	var transformSuccess3 = kony.ui.makeAffineTransform();
  	transformSuccess3.scale(0.9,0.9);
   
  	frmSuccessFormKA.successIcon.animate(
        kony.ui.createAnimation({
          	"0":  {"transform": transformSuccess1 ,"stepConfig":{"timingFunction": easeIn}},
          	"15":{"transform": transformSuccess2 ,"stepConfig":{"timingFunction": easeIn}},
          	"30":{"transform": transformSuccess1 ,"stepConfig":{"timingFunction": easeIn}},
          	"45":{"transform": transformSuccess2 ,"stepConfig":{"timingFunction": easeIn}},
          	"60":{"transform": transformSuccess1 ,"stepConfig":{"timingFunction": easeIn}},
           "80":{"transform": transformSuccess3 ,"stepConfig":{"timingFunction": easeIn}},
          	"100":{"transform": transformSuccess1 ,"stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": backwards,"duration":4.0,"iterationCount":0,"delay": 0},
        {"animationStart": function () {},
          "animationEnd": function () {
           
          }}
    );
  
  
}