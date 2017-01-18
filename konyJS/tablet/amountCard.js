var transferAmountEntered;
var billAmountEntered;
var payPersonAmountEntered;
var depositAmountEntered;

// Called onEditingDone()
function selectAmountCard(whatForm){
  whatForm = whatForm;
   
  whatForm.amountCard.animate(
        kony.ui.createAnimation({"100":{"height": defaultCardHeight,"stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": duration},
        {"animationEnd": function () {}}
    );
  
   whatForm.amountPick.animate(
        kony.ui.createAnimation({"100":{"opacity": 1, "stepConfig":{"timingFunction": easeIn}}}),
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
  
    whatForm.amountCardInner.animate(
        kony.ui.createAnimation({"100":{"opacity": 0,"top": "0dp","stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards,"duration": duration},
        {"animationEnd": function () {}}
    );
  
  // specific to newTransfer form
  if (whatForm === frmNewTransferKA){
  		transferAmountEntered = frmNewTransferKA.amountTextField.text;
    	transferAmountEntered = numberWithCommas(transferAmountEntered);
  		frmNewTransferKA.amountEnteredLabel.text = "$" + transferAmountEntered;
    
   // specific to newBill form
  } else if (whatForm === newBill){
  		billAmountEntered = newBill.amountTextField.text;
  		newBill.amountEnteredLabel.text = "$" + billAmountEntered;

  // specific to depositLanding form
  } else if (whatForm === depositLanding){
  	 depositAmountEntered = depositLanding.amountTextField.text;
  	 depositLanding.depositAmountEntered.text = "$" + depositAmountEntered;
    
  // specific to newPayPerson form
  } else if (whatForm === newPayPerson){
  		payPersonAmountEntered = newPayPerson.amountTextField.text;
  		newPayPerson.amountEnteredLabel.text = "$" + payPersonAmountEntered;
    
        if (userAgent === "iPhone" || userAgent === "iPad"){
            newPayPerson.iOSPayPersonAmount.text = "Pay $" + payPersonAmountEntered;
        } else {
            newPayPerson.androidPayPersonAmount.text = "Pay $" + payPersonAmountEntered;
        }
    
        newPayPerson.selectPayeeButton.skin = primaryActionEnabled;
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
   
    whatForm.amountCardInner.animate(
        kony.ui.createAnimation({"100":{"opacity": 1,"top": "60dp","stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards,"duration": duration},
        {"animationEnd": function () {}}
    );
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getTransferAccountCardHight()
{ 
    toACCHeight = 60+38+(todatalength*62)+38+(externaldatalength*60)+58;
  	fromACCHeight = 60+38+(fromdatalength*62);  
    fromACCHeight = fromACCHeight + "dp";
    toACCHeight = toACCHeight + "dp";
}