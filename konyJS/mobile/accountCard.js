// accountCard = to or from card
todatalength = 0 ;
fromdatalength = 0;
externaldatalength = 0;
fromACCHeight = "0dp";
toACCHeight = "0dp";
toBilldatalength=0;
fromBilldatalength=0;
fromBillACCHeight = "0dp";
toBillACCHeight = "0dp";
depositheightlength = 0;
DepositCardHeight="0dp";

toCardHeightPayBill = "0dp";
fromCardHeightPayBill="0dp";
/* Introduced as a part of re-factoring */
fromCardHeight= "0dp";
toCardHeight= "0dp";
freqCardHeight = "0dp";
recurrenceCardHeight = "0dp";

function getTransferAccountCardHight()
{ 
    toACCHeight = 60+38+(todatalength*62)+38+(externaldatalength*60)+58;
  	fromACCHeight = 60+38+(fromdatalength*62);  
    fromACCHeight = fromACCHeight + "dp";
    toACCHeight = toACCHeight + "dp";
}

function getPayBillAccountCardHight()
{ 
    toBillACCHeight = 60+(toBilldatalength*50);
  	fromBillACCHeight = 60+38+(fromBilldatalength*62);  
    fromBillACCHeight = fromBillACCHeight + "dp";
    toBillACCHeight = toBillACCHeight + "dp";
}

function getDepositCardHight()
{
	DepositCardHeight = 60+38+(depositheightlength*62);
    DepositCardHeight = DepositCardHeight + "dp";
}

var whatForm;
var whatType;
var whatAccount;
var targetCardHeight;

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

/* Not being used on Transfer screen, might be needed on Bill Pay and P2P,
For transfer screen using animationCollapseContainer() */ 
function selectAccountCard(whatForm, whatType, whatAccount) {
  whatForm = whatForm;
  whatType = whatType;
  whatAccount = whatAccount;
  if (whatForm === frmNewBillKA && whatType === "to"){
    setBillInfo(whatForm,whatAccount);
  } else {
    setInfo(whatForm,whatType,whatAccount);
  }

  whatForm[whatType + "CardTitle"].setVisibility(false);
  whatForm[whatType + "CardInner"].setVisibility(true);
  
  
  	whatForm[whatType + "Card"].animate(
        kony.ui.createAnimation({"100":{"height": defaultCardHeight,"stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": duration},
        {"animationEnd": function () {}}
    );

  whatForm[whatType + "CardInner"].animate(
        kony.ui.createAnimation({
           "100":{"top":"-100dp", "opacity": 0, 
                  "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": duration},
        {"animationStart": function () {whatForm[whatType + "CardInner"].skin = "skntransferCardInnerPicked";},
          "animationEnd": function () {
          }}
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
    whatForm[whatType + "AccountPick"].setVisibility(true);
   whatForm[whatType + "AccountPick"].opacity=1;
   whatForm[whatType + "CardInner"].setEnabled(false);
  
}

/* Not being used on Transfer screen, might be needed on Bill Pay and P2P,
For transfer screen using animationExpandContainer() */
function editAccountCard(whatForm, whatType) {
  whatForm = whatForm;
  whatType = whatType;
  
 whatForm[whatType + "CardInner"].setEnabled(true);
  if (whatForm === frmNewTransferKA && whatType === "to"){
    targetCardHeight = toACCHeight;
  } else if  (whatForm === frmNewTransferKA && whatType === "from"){
    targetCardHeight = fromACCHeight;
  
  } else if  (whatForm === frmNewBillKA && whatType === "to"){
    targetCardHeight = toBillACCHeight;
  } else if  (whatForm === frmNewBillKA && whatType === "from"){
    targetCardHeight = fromBillACCHeight;
    
  } else if (whatForm === frmNewPayPersonKA){
    targetCardHeight = fromACCHeight;
  } 
  else if (whatForm === frmNewDepositKA){
    targetCardHeight = DepositCardHeight;
  }
    whatForm[whatType + "CardInner"].setVisibility(true);
    whatForm[whatType + "CardTitle"].setVisibility(true);
    //whatForm[whatType + "CardInner"].top="60dp";

  whatForm[whatType + "Card"].animate(
        kony.ui.createAnimation({"100":{"height": targetCardHeight ,"stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": duration},
        {"animationEnd": function () {}}
    );
  whatForm[whatType + "CardInner"].animate(
        kony.ui.createAnimation({
           "100":{"top":"0dp", "opacity": 1,
                "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": duration, "delay": 0.3},
        {"animationStart": function () {whatForm[whatType + "CardInner"].skin = "skntransferCardInner";},
          "animationEnd": function () {}}
    );
  //whatForm[whatType + "AccountPick"].top="0dp";
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

/* Introduced as a part of re-factoring */

function calculateNewTransferAccountCardHeights(){
  fromCardHeight = parseInt(frmNewTransferKA.fromCardTitle.height) + 
    parseInt(frmNewTransferKA.CopytoInternalLabel0dd19c29451b147.height) + 
    (fromdatalength*62);
  
  toCardHeight = parseInt(frmNewTransferKA.toCardTitle.height) + 
    parseInt(frmNewTransferKA.toInternalLabel.height) + 
    (todatalength*62) + parseInt(frmNewTransferKA.toExternalLabel.height) + 
    (externaldatalength*60) + 
    parseInt(frmNewTransferKA.addExternalAccount.height);
    
  freqCardHeight =  parseInt(frmNewTransferKA.frequencyTitle.height) +
    (frequencyOptions.length*50);
    
  recurrenceCardHeight = parseInt(frmNewTransferKA.recurrenceTitle.height) +
    parseInt(frmNewTransferKA.flexNumberOfTimes.height) + 
    parseInt(frmNewTransferKA.flexRecurrenceDateRange.height) + 1;  
    
  kony.print("#$ fromCardHeight = " + fromCardHeight);
  kony.print("#$ toCardHeight = " + toCardHeight);
  kony.print("#$ freqCardHeight = " + freqCardHeight);
  kony.print("#$ recurrenceCardHeight = " + recurrenceCardHeight);
}

function calculateNewPayPersonAccountCardHeights(){
  fromCardHeight = parseInt(frmNewPayPersonKA.fromCardTitle.height) + 
    parseInt(frmNewPayPersonKA.CopytoInternalLabel0dd19c29451b147.height) + 
    (fromdatalength*62);
}

function calculateNewBillPayCardHeights(){
  fromCardHeightPayBill = parseInt(frmNewBillKA.fromCardTitle.height) + 
    parseInt(frmNewBillKA.CopytoInternalLabel0dd19c29451b147.height) + 
    (fromdatalength*62);
  
  toCardHeightPayBill = parseInt(frmNewBillKA.toCardTitle.height) + 
    parseInt(frmNewBillKA.toInternalLabel.height) + 
    (payeelength*62)  +  
    parseInt(frmNewBillKA.addExternalAccount.height);
    
   
    
  kony.print("#$ fromCardHeightPayBill = " + fromCardHeightPayBill);
  kony.print("#$ toCardHeightPayBill = " + toCardHeightPayBill);
 
}
function animationExpandContainer(whatForm, whatContainer, height, skin){
  whatForm = whatForm;
  whatType = whatContainer;
  
  var transform = kony.ui.makeAffineTransform();
  transform.translate(0, 0);
  kony.print("Container and height: " + whatContainer + " and " + height);
  whatForm[whatType + "Card"].animate(kony.ui.createAnimation({
    "100": {
      "height": height,
      "stepConfig": {
        "timingFunction": easeIn
      }
    }
  }), {
    "fillMode": forwards,
    "duration": duration
  }, {
    "animationEnd": function() {}
  });
  
  whatForm[whatType + "CardInner"].animate(kony.ui.createAnimation({
    "100": {
      //"transform": transform,
      "opacity": 1,
      "stepConfig": {
        "timingFunction": easeIn
      }
    }
  }), {
    "fillMode": forwards,
    "duration": duration,
    "delay": 0.3
  }, {
    "animationStart": function() {
      whatForm[whatType + "CardInner"].skin = skin;
    },
    "animationEnd": function() {}
  });
  whatForm[whatType + "AccountPick"].animate(kony.ui.createAnimation({
    "100": {
      "opacity": 0,
      "stepConfig": {
        "timingFunction": easeIn
      }
    }
  }), {
    "fillMode": forwards,
    "duration": duration,
    "delay": 0.2
  }, {
    "animationEnd": function() {}
  });
  whatForm[whatType + "AccountNameContainer"].animate(kony.ui.createAnimation({
    "100": {
      "top": "100%",
      "stepConfig": {
        "timingFunction": easeIn
      }
    }
  }), {
    "fillMode": forwards,
    "duration": duration,
    "delay": 0
  }, {
    "animationEnd": function() {}
  });
   if(whatForm!=frmNewBillKA || whatContainer !="to")
  whatForm[whatType + "AccountAmountContainer"].animate(kony.ui.createAnimation({
    "100": {
      "top": "100%",
      "stepConfig": {
        "timingFunction": easeIn
      }
    }
  }), {
    "fillMode": forwards,
    "duration": duration,
    "delay": 0.1
  }, {
    "animationEnd": function() {}
  });
  whatForm[whatType + "Label"].animate(kony.ui.createAnimation({
    "100": {
      "left": "-50dp",
      "stepConfig": {
        "timingFunction": easeIn
      }
    }
  }), {
    "fillMode": forwards,
    "duration": duration / 2
  }, {
    "animationEnd": function() {}
  });
}

function animationCollapseContainer(whatForm, whatContainer, height, skin){
  whatForm = whatForm;
  whatType = whatContainer;

  var transform = kony.ui.makeAffineTransform();
  transform.translate(0, -100);
  whatForm[whatType + "Card"].animate(kony.ui.createAnimation({
    "100": {
      "height": height,
      "stepConfig": {
        "timingFunction": easeIn
      }
    }
  }), {
    "fillMode": forwards,
    "duration": duration
  }, {
    "animationEnd": function() {}
  });
  whatForm[whatType + "CardInner"].animate(kony.ui.createAnimation({
    "100": {
      //"transform": transform,
      "opacity": 0,
      "stepConfig": {
        "timingFunction": easeIn
      }
    }
  }), {
    "fillMode": forwards,
    "duration": duration
  }, {
    "animationStart": function() {
      whatForm[whatType + "CardInner"].skin = skin;
    },
    "animationEnd": function() {}
  });
  whatForm[whatType + "AccountPick"].animate(kony.ui.createAnimation({
    "100": {
      "opacity": 1,
      "stepConfig": {
        "timingFunction": easeIn
      }
    }
  }), {
    "fillMode": forwards,
    "duration": duration / 1.5,
    "delay": 0.05
  }, {
    "animationEnd": function() {}
  });
  whatForm[whatType + "AccountNameContainer"].animate(kony.ui.createAnimation({
    "100": {
      "top": "0%",
      "stepConfig": {
        "timingFunction": easeIn
      }
    }
  }), {
    "fillMode": forwards,
    "duration": duration,
    "delay": 0.1
  }, {
    "animationEnd": function() {}
  });
  if(whatForm!=frmNewBillKA || whatContainer !="to")
  whatForm[whatType + "AccountAmountContainer"].animate(kony.ui.createAnimation({
    "100": {
      "top": "0%",
      "stepConfig": {
        "timingFunction": easeIn
      }
    }
  }), {
    "fillMode": forwards,
    "duration": duration,
    "delay": 0.15
  }, {
    "animationEnd": function() {}
  });
  whatForm[whatType + "Label"].animate(kony.ui.createAnimation({
    "100": {
      "left": labelLeft,
      "stepConfig": {
        "timingFunction": easeIn
      }
    }
  }), {
    "delay": 0.2,
    "fillMode": forwards,
    "duration": duration
  }, {
    "animationEnd": function() {}
  });
}


