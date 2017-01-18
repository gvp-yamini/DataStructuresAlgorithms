
var whatSuccess;

// Success messages for newPayPerson, newTransfer, newPayBill, depositLanding
// Success messages are contained within the "successContainer" FlexContainer of each respecitve form
function transactionSuccess(whatSuccess){
  var title = " ",
      text =" "; 	

  switch(whatSuccess){
    case newBill:
      title = i18n_PendingTransaction;
      text = i18n_PendingTransactionText;
      if(rightContainer === "rightWrapper")
        transferPayLanding.show();
      else
        closeRightPanelTransferPanel(rightContainer, transferPayLanding.rightWrapper);
      break;
    case newTransfer:
      title = i18n_TransferScheduled;
      text = i18n_PendingTransactionText;
      break;
    case frmNewPayPersonKA:
      title = i18n_PendingTransaction;
      text = i18n_PendingTransactionText;
	  kony.store.setItem("frmTransactionPage","frmNewPayPersonKA");
      frmNewPayPersonKA.destroy();
      break;
    case depositLanding:
      title = i18n_depositPending;
      text = "You can view pending deposits in your account details.";
      kony.store.setItem("frmTransactionPage","frmNewDepositKA");
      break;

  }

  successForm.successTitle.text = title;
  successForm.successText.text = text;

  successForm.show();
}
 
function successFormPreShow(){
  successForm.successIcon.opacity=1;
    successForm.successIcon.skin = "successIcon";
  	successForm.innerSuccessContainer.opacity = 0;
  	successForm.innerSuccessContainer.top = "100dp";
   successForm.successIcon2.isVisible = false;
  successForm.successImage2.opacity = 0;
  	successForm.successContinue.opacity = 0;
  	successForm.successContinue.top = "70dp";
}

function successFormanimationShow(){
    successForm.successIcon.isVisible = true;
    successForm.successIcon.skin = "successIcon";
    successForm.successImage2.src = "";
  	var transformSuccess1 = kony.ui.makeAffineTransform();
  	transformSuccess1.scale(0.6,0.6);
  	var transformSuccess2 = kony.ui.makeAffineTransform();
  	transformSuccess2.scale(0.75,0.75);
  	var transformSuccess3 = kony.ui.makeAffineTransform();
  	transformSuccess3.scale(0.9,0.9);
   
  	successForm.successIcon.animate(
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

function errorFormPostShow(){
    successForm.successImage2.isVisible = true;
    successForm.successIcon2.skin = "successIcon";
    successForm.successImage2.src = "error.png";
    var transformSuccess1 = kony.ui.makeAffineTransform();
  	transformSuccess1.scale(0.6,0.6);
  	var transformSuccess2 = kony.ui.makeAffineTransform();
  	transformSuccess2.scale(0.75,0.75);
  	var transformSuccess3 = kony.ui.makeAffineTransform();
  	transformSuccess3.scale(1.1,1.1);
  	var transformSuccess4 = kony.ui.makeAffineTransform();
  	transformSuccess4.scale(1.0,1.0);
  
  	successForm.innerSuccessContainer.animate(
        kony.ui.createAnimation({"100":{"top": "-20dp", "opacity": 1 ,"stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards,"duration": duration, "delay": 3.1},
        {"animationEnd": function () {}}
    );
  
  	successForm.successContinue.animate(
        kony.ui.createAnimation({"100":{"top": "30dp", "opacity": 1 ,"stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards,"duration": duration, "delay": 3.3},
        {"animationEnd": function () {}}
    );
   successForm.successIcon2.isVisible = true;
  	successForm.successIcon2.animate(
        kony.ui.createAnimation({
          	"0":  {"transform": transformSuccess1 ,"stepConfig":{"timingFunction": easeIn}},
          	"15":{"transform": transformSuccess2 ,"stepConfig":{"timingFunction": easeIn}},
          	"30":{"transform": transformSuccess1 ,"stepConfig":{"timingFunction": easeIn}},
          	"45":{"transform": transformSuccess2 ,"stepConfig":{"timingFunction": easeIn}},
          	"60":{"transform": transformSuccess1 ,"stepConfig":{"timingFunction": easeIn}},
          	"80":{"transform": transformSuccess3 ,"stepConfig":{"timingFunction": easeIn}},
          	"100":{"transform": transformSuccess4 ,"stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards,"duration": 4.0, "delay": 0},
        {"animationStart": function () {successForm.successIcon.opacity=0;},
          "animationEnd": function () {}}
    );
  
  	successForm.successImage2.animate(
        kony.ui.createAnimation({
           	"0":{"transform": transformSuccess1 , "opacity": 0, "stepConfig":{"timingFunction": easeIn}},
          	"60":{"transform": transformSuccess3 , "opacity": 0.8, "stepConfig":{"timingFunction": easeIn}},
          	"100":{"transform": transformSuccess4 ,  "opacity": 1, "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards,"duration": 1.0, "delay": 2.6},
        { "animationStart": function () {successForm.successIcon2.skin = "sknerrorIcon";},
          "animationEnd": function () {}}
    );
  
  	successForm.processing.animate(
        kony.ui.createAnimation({
          	"65":{"opacity": 1, "stepConfig":{"timingFunction": easeIn}},
          	"80":{"opacity": 0, "stepConfig":{"timingFunction": easeIn}},
          	"100":{"opacity": 0, "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": 4.0},
        {"animationEnd": function () {}}
    ); 

}

function successFormPostShow(){
   successForm.successImage2.isVisible = true;
    successForm.successIcon2.skin = "successIcon";
    successForm.successImage2.src = "success_large_check.png";
  	var transformSuccess1 = kony.ui.makeAffineTransform();
  	transformSuccess1.scale(0.6,0.6);
  	var transformSuccess2 = kony.ui.makeAffineTransform();
  	transformSuccess2.scale(0.75,0.75);
  	var transformSuccess3 = kony.ui.makeAffineTransform();
  	transformSuccess3.scale(1.1,1.1);
  	var transformSuccess4 = kony.ui.makeAffineTransform();
  	transformSuccess4.scale(1.0,1.0);
  
  	successForm.innerSuccessContainer.animate(
        kony.ui.createAnimation({"100":{"top": "-20dp", "opacity": 1 ,"stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards,"duration": duration, "delay": 3.1},
        {"animationEnd": function () {}}
    );
  
  	successForm.successContinue.animate(
        kony.ui.createAnimation({"100":{"top": "30dp", "opacity": 1 ,"stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards,"duration": duration, "delay": 3.3},
        {"animationEnd": function () {}}
    );
    successForm.successIcon2.isVisible = true;
  	successForm.successIcon2.animate(
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
                                        successForm.successIcon.opacity=0;
                                       },
          "animationEnd": function () {}}
    );
  	successForm.successImage2.animate(
        kony.ui.createAnimation({
           	"0":{"transform": transformSuccess1 , "opacity": 0, "stepConfig":{"timingFunction": easeIn}},
          	"60":{"transform": transformSuccess3 , "opacity": 0.8, "stepConfig":{"timingFunction": easeIn}},
          	"100":{"transform": transformSuccess4 ,  "opacity": 1, "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards,"duration": 1.0, "delay": 1.6},
        {"animationEnd": function () {}}
    );
   
  	successForm.processing.animate(
        kony.ui.createAnimation({
          	"65":{"opacity": 1, "stepConfig":{"timingFunction": easeIn}},
          	"80":{"opacity": 0, "stepConfig":{"timingFunction": easeIn}},
          	"100":{"opacity": 0, "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": 2.0},
        {"animationEnd": function () {}}
    ); 
}


function successFormContinue(){
		rightContainer = "rightWrapper";
       // getTransferPayLandingForm("frmTransferPayLandingKA");
  cancelBillPay();
}
