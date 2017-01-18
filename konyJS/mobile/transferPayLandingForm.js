// Determines color associated with selected segment row
var selectedAccountColor;

// Assign data for frmTransferPayLandingKA segments


// Set the accountType color of the selected row to the selectedAccountType variable
function recentTransactionsOnRowClick() {
   /*//////////////////////////////////////////////////////
  	 This variable will need to be set programatically depending
   	 on the backgroundColor of the accountType FlexContainer in each row
  */ /////////////////////////////////////////////////////////////////////////////
  selectedAccountColor = savingsColor;
}

function scheduledTransactionsOnRowClick() {
   /*//////////////////////////////////////////////////////
  	 This variable will need to be set programatically depending
   	 on the backgroundColor of the accountType FlexContainer in each row
  */ /////////////////////////////////////////////////////////////////////////////
  selectedAccountColor = checkingColor;
}

function recentTabSelected(){
   frmTransferPayLandingKA.transactionListsContainer.animate(
        kony.ui.createAnimation({100:
        	{ 
             "left": '0%',
             "stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards ,duration:0.3},
        {animationEnd: function() {} });
  
  frmTransferPayLandingKA.tabSelectedIndicator.animate(
        kony.ui.createAnimation({100:
        	{ 
             "left": '0%',
             "stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards ,duration:0.3},
        {animationEnd: function() {} }); 
  
  frmTransferPayLandingKA.recentTabButton.skin = skntabSelected;
  frmTransferPayLandingKA.scheduledTabButton.skin = skntabDeselected;
}


function scheduledTabSelected(){
   frmTransferPayLandingKA.transactionListsContainer.animate(
        kony.ui.createAnimation({100:
        	{ 
             "left": '-100%',
             "stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards ,duration:0.3},
        {animationEnd: function() {} });
  
    frmTransferPayLandingKA.tabSelectedIndicator.animate(
        kony.ui.createAnimation({100:
        	{ 
             "left": '50%',
             "stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards ,duration:0.3},
        {animationEnd: function() {} });
  
    frmTransferPayLandingKA.scheduledTabButton.skin = skntabSelected;
    frmTransferPayLandingKA.recentTabButton.skin = skntabDeselected;
}

function addExternalAccountSegmentClick()
{

  var selectedIndex = frmAddExternalAccountKA.externalAccountTypeSegment.selectedIndex;
  var boolStatus = frmAddExternalAccountKA.externalAccountTypeSegment.selectedItems[0].imgicontick.isVisible;
  var name  = frmAddExternalAccountKA.externalAccountTypeSegment.selectedItems[0].lblNameKA;
  var data= {};
 
    data = {
      lblNameKA: name,
      imgicontick:{src:"check_blue.png",isVisible: true}
    };  
  loadExternalAccountTypes();
  frmAddExternalAccountKA.externalAccountTypeSegment.setDataAt(data,selectedIndex[1],selectedIndex[0]);
  //Hidden Label Data
  frmAddExternalAccountKA.lblAccountTypeKA.text = name;
}