// accountCard = to or from card

var whatForm;
var whatType;
var whatAccount;

var targetCardHeight;

//Set info for each form
function setInfo(whatObj, whatTypeObj, whatAccountNum){
  /*
  var account = account1;
  switch(whatAccountNum){
    case 1:
      account = account1;
      break;
    case 2:
      account = account2;
      break;
    case 3:
      account = account3;
      break;
    case 4:
      account = account4;
      break;
  }
  if (whatTypeObj === "to"){
  whatObj.toNamePick.text = account.name;
  whatObj.toAmountPick.text = account.avlBalance;
  whatObj.toAccountColorPick.backgroundColor = account.color;
  } else {
    whatObj.fromNamePick.text = account.name;
  	whatObj.fromAmountPick.text = account.avlBalance;
  	whatObj.fromAccountColorPick.backgroundColor = account.color;
  }
  */
}

function setBillInfo(whatObj, whatBill) {
  var bill = billData.bill1;
  switch(whatBill){
    case 1:
      	bill = billData.bill1;
      	break;
    case 2:
      	bill = billData.bill2;
      	break;  	
  }
  whatObj.toNamePick.text = bill;
}
 
function selectAccountCard(whatForm, whatType, whatAccount) {
  whatForm = whatForm;
  whatType = whatType;
  whatAccount = whatAccount;
  
  if (whatForm === newBill && whatType === "to"){
    setBillInfo(whatForm,whatAccount);
  } else {
    setInfo(whatForm,whatType,whatAccount);
  }

  
	var transform = kony.ui.makeAffineTransform();
	transform.translate(0,-100);
 
  	whatForm[whatType + "Card"].animate(
        kony.ui.createAnimation({"100":{"height": defaultCardHeight,"stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": duration},
        {"animationEnd": function () {}}
    );
 
  whatForm[whatType + "CardInner"].animate(
        kony.ui.createAnimation({
           "100":{"transform": transform, "opacity": 0, 
                  "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": duration},
        {"animationStart": function () {whatForm[whatType + "CardInner"].skin = transferCardInnerPicked;},
          "animationEnd": function () {}}
    );
  
  whatForm[whatType + "AccountPick"].animate(
        kony.ui.createAnimation({
           "100":{"opacity": 1,
                "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": duration/1.5, "delay": 0.05},
        {"animationEnd": function () {}}
    );
  
  whatForm[whatType + "AccountNameContainer"].animate(
        kony.ui.createAnimation({
           "100":{"top": "0%",
                "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": duration, "delay": 0.1},
        {"animationEnd": function () {}}
    );
  
  whatForm[whatType + "AccountAmountContainer"].animate(
        kony.ui.createAnimation({
           "100":{"top": "0%",
                "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": duration, "delay": 0.15},
        {"animationEnd": function () {}}
    );
  
   whatForm[whatType + "Label"].animate(
        kony.ui.createAnimation({"100":{"left": labelLeft,"stepConfig":{"timingFunction": easeIn}}}),
        {"delay": 0.2, "fillMode": forwards,"duration": duration/2},
        {"animationEnd": function () {}}
    );
}

function editAccountCard(whatForm, whatType) {
  whatForm = whatForm;
  whatType = whatType;
  
 
  if (whatForm === frmNewTransferKA && whatType === "to"){
    targetCardHeight = toCardHeight;
  } else if  (whatForm === frmNewTransferKA && whatType === "from"){
    targetCardHeight = fromCardHeight;
  
  } else if  (whatForm === newBill && whatType === "to"){
    targetCardHeight = toCardHeightPayBill;
  } else if  (whatForm === newBill && whatType === "from"){
    targetCardHeight = fromCardHeightPayBill;
    
  } //else if (whatForm === newPayPerson){
    //targetCardHeight = fromCardHeightPayPerson;
 // }
else if (whatForm === depositLanding){
    targetCardHeight = toCardHeightDeposit;
  }
 
  var transform = kony.ui.makeAffineTransform();
  transform.translate(0,0);
  
  whatForm[whatType + "Card"].animate(
        kony.ui.createAnimation({"100":{"height": targetCardHeight ,"stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": duration},
        {"animationEnd": function () {}}
    );
  
  whatForm[whatType + "CardInner"].animate(
        kony.ui.createAnimation({
           "100":{"transform": transform, "opacity": 1,
                "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": duration, "delay": 0.3},
        {"animationStart": function () {whatForm[whatType + "CardInner"].skin = transferCardInner;},
          "animationEnd": function () {}}
    );
  
 	whatForm[whatType + "AccountPick"].animate(
        kony.ui.createAnimation({
           "100":{"opacity": 0, "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": duration, "delay": 0.2},
        {"animationEnd": function () {}}
    );
  
  whatForm[whatType + "AccountNameContainer"].animate(
        kony.ui.createAnimation({
           "100":{"top": "100%", "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": duration, "delay": 0},
        {"animationEnd": function () {}}
    );
  
  whatForm[whatType + "AccountAmountContainer"].animate(
        kony.ui.createAnimation({
           "100":{"top": "100%", "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": duration, "delay": 0.1},
        {"animationEnd": function () {}}
    );
     
  	whatForm[whatType + "Label"].animate(
        kony.ui.createAnimation({"100":{"left":"-25dp","stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards,"duration": duration/2},
        {"animationEnd": function () {}}
    );

}

function onclicksegment(type)
{
  type= type;
  frmNewTransferKA[type+"CardTitle"].setVisibility(false);
  frmNewTransferKA[type+"CardInner"].setVisibility(false);
  frmNewTransferKA[type+"AccountPick"].setVisibility(true);
}
function onclickTransferEdit(type)
{
  type= type;
  frmNewTransferKA[type+"CardTitle"].setVisibility(true);
  frmNewTransferKA[type+"CardInner"].setVisibility(true);
  frmNewTransferKA[type+"AccountPick"].setVisibility(false);
}
 	
function onFreqEditClick()
{
  frmNewTransferKA.frequencyCardInner.setVisibility(true);
  frmNewTransferKA.frequencyTitle.setVisibility(true);
  frmNewTransferKA.frequencyPick.setVisibility(false);
}
function onFrequencyClick(freq)
{
 frmNewTransferKA.frequencyCardInner.setVisibility(false);
 frmNewTransferKA.frequencyTitle.setVisibility(false);
 frmNewTransferKA.frequencyPick.setVisibility(true);
 frmNewTransferKA.frequencyPickLabel.text=freq;
}