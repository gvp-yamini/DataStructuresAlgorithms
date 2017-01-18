// Determines color associated with selected segment row
var selectedAccountColor;

// Assign data for frmTransferPayLandingKA segments
function setDataTransferPay(){
  //frmTransferPayLandingKA.recentTransactions.setData(recentTransactions);
  //frmTransferPayLandingKA.scheduledTransactions.setData(scheduledTransactions);

  userAgent = kony.os.userAgent();
  setRightContainer();
  onOrientationChange(frmTransferPayLandingKA);
  if (userAgent === "iPad"){
    // todo
  }
}

// Set the accountType color of the selected row to the selectedAccountType variable
function recentTransactionsOnRowClick() {
  /*//////////////////////////////////////////////////////
  	 This variable will need to be set programatically depending
   	 on the backgroundColor of the accountType FlexContainer in each row
  */ /////////////////////////////////////////////////////////////////////////////
  //selectedAccountColor = savingsColor;
  var selectedRow = frmTransferPayLandingKA.recentTransactions.selectedItems;
  addRightPanel(frmRecentPayBillDetailsKA.recentTransactionWrapper,"recentTransactionWrapper");  
  frmRecentPayBillDetailsKA.transactionAmount.text = selectedRow[0].transactionAmount.text; 
  frmRecentPayBillDetailsKA.transactionDate.text = selectedRow[0].transactionDate;
  frmRecentPayBillDetailsKA.transactionName.text = selectedRow[0].transactionName;
  frmRecentPayBillDetailsKA.transactionFrom.text = selectedRow[0].transactionName;

  retainSelectionOn("recentTransactions");
  retainSelectionOff("scheduledTransactions");
}

function scheduledTransactionsOnRowClick() {
  /*//////////////////////////////////////////////////////
  	 This variable will need to be set programatically depending
   	 on the backgroundColor of the accountType FlexContainer in each row
  */ /////////////////////////////////////////////////////////////////////////////
  //selectedAccountColor = checkingColor;
    var selectedRow = frmTransferPayLandingKA.scheduledTransactions.selectedItems;

  addRightPanel(frmScheduledTransferDetailsKA.scheduledTransactionWrapper,"scheduledTransactionWrapper");
  frmScheduledTransferDetailsKA.transactionAmount.text = selectedRow[0].transactionAmount.text; 
  frmScheduledTransferDetailsKA.transactionDate.text = selectedRow[0].transactionDate;
  frmScheduledTransferDetailsKA.transactionName.text = selectedRow[0].transactionName;
  frmScheduledTransferDetailsKA.transactionFrom.text = selectedRow[0].transactionName;


  retainSelectionOn("scheduledTransactions");
  retainSelectionOff("recentTransactions");
}

/*
Author:Mounika ch
Purpose:close the rightWrapper in a form
*/

function closeTransactionDetailsContainer() {
  kony.print('animating and removing '+rightContainer);
  /*  	frmTransferPayLandingKA[rightContainer].animate(
        kony.ui.createAnimation({100:
        {"left": '100%',"stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards ,duration:duration},
        {animationEnd: function() {
          frmTransferPayLandingKA.remove(frmTransferPayLandingKA[rightContainer]);
        } });*/
//    closeRightPanel(rightContainer, "rightWrapper");
// //   //showOriginalPanel("rightWrapper");

//   retainSelectionOff("recentTransactions");
//    retainSelectionOff("scheduledTransactions");

//   rightContainer = "rightWrapper";
//    kony.print("entering in to the close check");
   var frmNameObject = kony.application.getCurrentForm();
  var frmName = frmNameObject.id; 
  //alert("frmName prints"+frmName);
 if(frmName == "accountsLanding"){
      if (accountsLanding.scheduledTransactionWrapper){
        //alert("entering in to the scheduledtransactions");
            accountsLanding.accountDetailWrapper.animate(
                kony.ui.createAnimation({100:
                {"left": leftContainerWidth, "stepConfig":{"timingFunction": easeOut}}}),
                {fillMode: forwards, duration: duration},
                {animationEnd: function() {} });

           accountsLanding.scheduledTransactionWrapper.animate(
                kony.ui.createAnimation({100:
                {"left": "100%", "stepConfig":{"timingFunction": easeOut}}}),
                {fillMode: forwards, duration: duration},
                {animationEnd: function() {
                  accountsLanding.remove(accountsLanding.scheduledTransactionWrapper);
                } });

            accountsLanding.leftWrapper.animate(
              kony.ui.createAnimation({100:
              {"left": "0%", "stepConfig":{"timingFunction": easeOut}}}),
              {fillMode: forwards, duration: duration},
              {animationEnd: function() {} });

            retainSelectionOff("checkSegment");
          }
 	}else if(frmName == "frmDepositPayLandingKA"){
             //alert("entering in to the frmRecentDepositKA");
      		if(frmDepositPayLandingKA.frmTransferPayLandingKAWrapper){
                closeRightPanel(rightContainer, "rightWrapper");
                retainSelectionOff("recentTransactions");
                retainSelectionOff("scheduledTransactions");
                rightContainer = "rightWrapper";
      	}
 	 }else if(frmName == "frmTransferPayLandingKA"){
            // alert("entering in to the frmRecentDepositKA");
	   if(frmTransferPayLandingKA.recentTransactionWrapper){ 
                rightContainer = "recentTransactionWrapper"; 
                closeRightPanel(rightContainer, "rightWrapper");
                retainSelectionOff("recentTransactions");
                retainSelectionOff("scheduledTransactions");
                rightContainer = "rightWrapper";
       }
  	}
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

  frmTransferPayLandingKA.recentTabButton.skin = tabSelected;
  frmTransferPayLandingKA.scheduledTabButton.skin = tabDeselected;
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

  frmTransferPayLandingKA.scheduledTabButton.skin = tabSelected;
  frmTransferPayLandingKA.recentTabButton.skin = tabDeselected;
}







