var from = "";
function OnClickCharges(){
    frmAcmeCreditCardKA.tabSelectedIndicator.animate(
        kony.ui.createAnimation({100:
        	{ 
             "left": '33.33%',
             "stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards ,duration:0.3},
        {animationEnd: function() {} });
    frmAcmeCreditCardKA.btnChargesKA.skin = "skntabSelected";
    frmAcmeCreditCardKA.btnFeaturesKA.skin = "skntabDeselected";
    frmAcmeCreditCardKA.btnInfoKA.skin = "skntabDeselected";
    frmAcmeCreditCardKA.tabDeselectedIndicator1KA.left = "0%";
    frmAcmeCreditCardKA.tabDeselectedIndicator2KA.left = "66.66%";
    frmAcmeCreditCardKA.flxChargesKA.isVisible = true;
    frmAcmeCreditCardKA.flxFeaturesKA.isVisible = false;
    frmAcmeCreditCardKA.flxInfoKA.isVisible = false;
 }

function OnClickInfo(){
    frmAcmeCreditCardKA.tabDeselectedIndicator1KA.left = "0%";
    frmAcmeCreditCardKA.tabDeselectedIndicator2KA.left = "33.33%";
    frmAcmeCreditCardKA.tabSelectedIndicator.animate(
        kony.ui.createAnimation({100:
        	{ 
             "left": '66.66%',
             "stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards ,duration:0.3},
        {animationEnd: function() {} });
    frmAcmeCreditCardKA.btnChargesKA.skin = "skntabDeselected";
    frmAcmeCreditCardKA.btnFeaturesKA.skin = "skntabDeselected";
    frmAcmeCreditCardKA.btnInfoKA.skin = "skntabSelected";
    frmAcmeCreditCardKA.flxChargesKA.isVisible = false;
    frmAcmeCreditCardKA.flxFeaturesKA.isVisible = false;
    frmAcmeCreditCardKA.flxInfoKA.isVisible = true;
  }
function OnClickFeatures(){
    frmAcmeCreditCardKA.tabDeselectedIndicator1KA.left = "66.66%";
    frmAcmeCreditCardKA.tabDeselectedIndicator2KA.left = "33.33%";
    frmAcmeCreditCardKA.tabSelectedIndicator.animate(
        kony.ui.createAnimation({100:
        	{ 
             "left": '0%',
             "stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards ,duration:0.3},
        {animationEnd: function() {} });
    frmAcmeCreditCardKA.btnChargesKA.skin = "skntabDeselected";
    frmAcmeCreditCardKA.btnFeaturesKA.skin = "skntabSelected";
    frmAcmeCreditCardKA.btnInfoKA.skin = "skntabDeselected";
    frmAcmeCreditCardKA.flxChargesKA.isVisible = false;
    frmAcmeCreditCardKA.flxFeaturesKA.isVisible = true;
    frmAcmeCreditCardKA.flxInfoKA.isVisible = false;
}