var transferAmountEntered;
var billAmountEntered;
var payPersonAmountEntered;
var depositAmountEntered;

// Called onEditingDone()
function selectAmountCard(whatForm){
  whatForm = whatForm;
   whatForm.amountPick.isVisible=true;
  whatForm.amountCard.animate(
        kony.ui.createAnimation({"100":{"height": defaultCardHeight,"stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": duration},
        {"animationEnd": function () {}}
    );
  
   whatForm.amountPick.animate(
        kony.ui.createAnimation({
           "100":{"opacity": 1, "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": duration/1.5, "delay": 0.05},
        {"animationEnd": function () {}}
    );
  
  whatForm.amountPickContainer.animate(
        kony.ui.createAnimation({"100":{"top": "0%", "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": duration, "delay": 0.05},
        {"animationEnd": function () {}}
    );
 
  whatForm.amountLabel.animate(
        kony.ui.createAnimation({"100":{"left": labelLeft,"stepConfig":{"timingFunction": easeIn}}}),
        {"delay": 0.2, "fillMode": forwards,"duration": duration/2},
        {"animationEnd": function () {}}
    );
  
  // specific to frmNewTransferKA form
  if (whatForm === frmNewTransferKA){
  		transferAmountEntered = frmNewTransferKA.amountTextField.text;
    	transferAmountEntered = numberWithCommas(transferAmountEntered);
  		frmNewTransferKA.amountEnteredLabel.text = "$" + transferAmountEntered;
    
   // specific to frmNewBillKA form
  } else if (whatForm === frmNewBillKA){
  		billAmountEntered = frmNewBillKA.amountTextField.text;
  		frmNewBillKA.amountEnteredLabel.text = "$" + billAmountEntered;

  // specific to frmDepositLandingKA form
  }else if (whatForm === frmNewDepositKA){
  	 depositAmountEntered = frmNewDepositKA.amountTextField.text;
  	 frmNewDepositKA.depositAmountEntered.text = depositAmountEntered;
    
  // specific to frmNewPayPersonKA form
  }else if (whatForm === frmNewPayPersonKA){
  		payPersonAmountEntered = frmNewPayPersonKA.amountTextField.text;
  		frmNewPayPersonKA.amountEnteredLabel.text = "$" + payPersonAmountEntered;
    
        if (userAgent === "iPhone" || userAgent === "iPad"){
            frmNewPayPersonKA.iOSPayPersonAmount.text = "Pay $" + payPersonAmountEntered;
          frmNewPayPersonKA.selectPayeeButton.skin = sknprimaryAction;
        } else {
            frmNewPayPersonKA.androidPayPersonAmount.text = "Pay $" + payPersonAmountEntered;
        }
    
        frmNewPayPersonKA.selectPayeeButton.skin = sknprimaryAction;
  }
}

function editAmountCard(whatForm){
  
    whatForm.amountCard.animate(
        kony.ui.createAnimation({"100":{"height": amountCardHeight,"stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": duration},
        {"animationEnd": function () {}}
    );
  
  whatForm.amountPickContainer.animate(
        kony.ui.createAnimation({"100":{"top": "100%", "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": duration, "delay": 0},
        {"animationEnd": function () {}}
    );
  
   whatForm.amountPick.animate(
        kony.ui.createAnimation({
           "100":{"opacity": 0, "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": duration, "delay": 0.2},
        {"animationEnd": function () {}}
    );
  
	whatForm.amountLabel.animate(
        kony.ui.createAnimation({"100":{"left":"-55dp","stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards,"duration": duration/2},
        {"animationEnd": function () {}}
    );
 
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}