/*
Author:Mounika Ch
Purpose:accountLanding Preshow to display the segment details at lefttwrapper
*/
var accountRightContainer;
var selectedAccountColor="";
/// preShow
function accountsLandingPreShow(){
	//Todo Servies Need Implementation
	 //accountsLanding.destroy();
  	userAgent = kony.os.userAgent();
  	CurrForm = kony.application.getCurrentForm();

  	// load segment data from data.js 
  	//loadAccountsLandingData();
  	//accountsLanding.segAccountInfoData.setData(segAccountInfoData);
	//setAccountInfoDataRight();
    
  accountRightContainer = "rightWrapper";
  	onAccountOrientationChange();
  	//selectedAccount = undefined;
  	
  	//selectedAccountWrapper = "buttonAccountsOverview";
  	//accountRetainSelection();
}




function accountLandingDestroy(){
  if (accountsLanding.accountDetailWrapper){
      accountsLanding.remove(accountsLanding.accountDetailWrapper);
      //accountDetail.destroy();
  }
  onFormHide();
}



///////////////////////////////////
// onClick action to open right panel
///////////////////////////////////


var selectedAccount;
var selectedAccountWrapper;

function onAccountClick (whichAccount){
  yourAccountClick(whichAccount);
  addAccountPanel();
  
  defineAccountButtonClick(whichAccount);
  if (selectedAccount !== undefined && selectedAccount !== selectedAccountWrapper){
      accountDeselect();
  }
  accountRetainSelection();
}


// Add Account Details Panel logic
function addAccountPanel() {
    if (!accountsLanding.accountDetailWrapper){
      accountsLanding.add(accountDetail.accountDetailWrapper);
      accountsLanding.accountDetailWrapper.left = "100%";
      accountsLanding.accountDetailWrapper.opacity = 0;
      accountsLanding.accountDetailWrapper.width = rightContainerWidth;
      
        overlayAccountPanel("accountDetailWrapper");
  		hideInsightsPanel(accountRightContainer);
  		accountRightContainer = "accountDetailWrapper";
    }

}

function overlayAccountPanel(addWidget) {
  CurrForm = kony.application.getCurrentForm();  
  CurrForm[addWidget].animate(
      kony.ui.createAnimation({100:
      {"left": leftContainerWidth, "opacity": 1,"stepConfig":{"timingFunction": easeOut}}}),
      {fillMode: forwards, duration: duration},
      {animationEnd: function() {} });
}

function hideInsightsPanel(hideWidget) {
  CurrForm = kony.application.getCurrentForm();  
  CurrForm[hideWidget].animate(
      kony.ui.createAnimation({100:
      {"left": "30%","opacity": 0.2,"stepConfig":{"timingFunction": easeOut}}}),
      {fillMode: forwards, duration: duration},
      {animationEnd: function() {} });
}


// Active state of account card logic
function accountRetainSelection(){
  accountsLanding[selectedAccountWrapper].skin = invisibleButtonDarken;
  
  selectedAccount = selectedAccountWrapper;
}

function accountDeselect(){
  accountsLanding[selectedAccount].skin = invisibleButtonNormal;

}


function defineAccountButtonClick(whichAccount){
  if (whichAccount === account1){
    selectedAccountWrapper = "buttonAccount1";
  } else if (whichAccount === account2){
    selectedAccountWrapper = "buttonAccount2";
  } else if (whichAccount === account3){
    selectedAccountWrapper = "buttonAccount3";
  } else if (whichAccount === account4){
    selectedAccountWrapper = "buttonAccount4";
  }
}

/*function onAccountOverviewButtonClick(){
  accountDeselect();
  selectedAccountWrapper = "buttonAccountsOverview";
  accountRetainSelection();
  closeDetailPanel();
}*/

/*
Author:Mounika Ch
Purpose:Close panel for accountDetails displays on right wrapper oof accountLanding Screen
*/

//Close panel

function closeDetailPanel() {

    if (accountsLanding.accountTransactionWrapper){
      /* accountsLanding.accountDetailWrapper.animate(
        kony.ui.createAnimation({100:
        {"left": leftContainerWidth, "stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards, duration: duration},
        {animationEnd: function() {} });*/
    accountsLanding.accountTransactionWrapper.animate(
        kony.ui.createAnimation({100:
        {"left": "100%", "stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards, duration: duration},
        {animationEnd: function() {
          accountsLanding.remove(accountsLanding.accountTransactionWrapper);
        } });
  
  	accountsLanding.leftWrapper.animate(
      kony.ui.createAnimation({100:
      {"left": "0%", "stepConfig":{"timingFunction": easeOut}}}),
      {fillMode: forwards, duration: duration},
      {animationEnd: function() {} });
      
    accountsLanding.accountDetailWrapper.animate(
        kony.ui.createAnimation({100:
        {"left": '100%',"stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards ,duration:duration},
        {animationEnd: function() {
          accountsLanding.remove(accountsLanding.accountDetailWrapper);
          //accountDetail.destroy();
        } });
            
    accountsLanding.rightWrapper.animate(
      kony.ui.createAnimation({100:
      {"left": leftContainerWidth,"opacity": 1,"stepConfig":{"timingFunction": easeOut}}}),
      {fillMode: forwards ,duration:duration},
      {animationEnd: function() {} });
  }
  	
  	if (accountsLanding.recentTransactionWrapper){
      /* accountsLanding.accountDetailWrapper.animate(
        kony.ui.createAnimation({100:
        {"left": leftContainerWidth, "stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards, duration: duration},
        {animationEnd: function() {} });*/
    accountsLanding.recentTransactionWrapper.animate(
        kony.ui.createAnimation({100:
        {"left": "100%", "stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards, duration: duration},
        {animationEnd: function() {
          accountsLanding.remove(accountsLanding.recentTransactionWrapper);
        } });
  
  	accountsLanding.leftWrapper.animate(
      kony.ui.createAnimation({100:
      {"left": "0%", "stepConfig":{"timingFunction": easeOut}}}),
      {fillMode: forwards, duration: duration},
      {animationEnd: function() {} });
      
    accountsLanding.accountDetailWrapper.animate(
        kony.ui.createAnimation({100:
        {"left": '100%',"stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards ,duration:duration},
        {animationEnd: function() {
          accountsLanding.remove(accountsLanding.accountDetailWrapper);
          //accountDetail.destroy();
        } });
            
    accountsLanding.rightWrapper.animate(
      kony.ui.createAnimation({100:
      {"left": leftContainerWidth,"opacity": 1,"stepConfig":{"timingFunction": easeOut}}}),
      {fillMode: forwards ,duration:duration},
      {animationEnd: function() {} });
  }
  
    if (accountsLanding.flxAccountStatementsKA){
   /* accountsLanding.accountDetailWrapper.animate(
        kony.ui.createAnimation({100:
        {"left": leftContainerWidth, "stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards, duration: duration},
        {animationEnd: function() {} });*/

    accountsLanding.flxAccountStatementsKA.animate(
        kony.ui.createAnimation({100:
        {"left": "100%", "stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards, duration: duration},
        {animationEnd: function() {
          accountsLanding.remove(accountsLanding.flxAccountStatementsKA);
        } });
  
  	accountsLanding.leftWrapper.animate(
      kony.ui.createAnimation({100:
      {"left": "0%", "stepConfig":{"timingFunction": easeOut}}}),
      {fillMode: forwards, duration: duration},
      {animationEnd: function() {} });
        
    accountsLanding.accountDetailWrapper.animate(
        kony.ui.createAnimation({100:
        {"left": '100%',"stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards ,duration:duration},
        {animationEnd: function() {
          accountsLanding.remove(accountsLanding.accountDetailWrapper);
          //accountDetail.destroy();
        } });
            
     accountsLanding.rightWrapper.animate(
      kony.ui.createAnimation({100:
      {"left": leftContainerWidth,"opacity": 1,"stepConfig":{"timingFunction": easeOut}}}),
      {fillMode: forwards ,duration:duration},
      {animationEnd: function() {} });

  }
  if (!accountsLanding.accountTransactionWrapper && !accountsLanding.flxAccountStatementsKA && !accountsLanding.scheduledTransactionWrapper && !accountsLanding.recentTransactionWrapper){
     accountsLanding.accountDetailWrapper.animate (
        kony.ui.createAnimation({100:
        {"left": '100%',"stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards ,duration:duration},
        {animationEnd: function() {
          accountsLanding.remove(accountsLanding.accountDetailWrapper);
          //accountDetail.destroy();
        } });
            
     accountsLanding.leftWrapper.animate(
          kony.ui.createAnimation({100:
          {"left": "0%", "stepConfig":{"timingFunction": easeOut}}}),
          {fillMode: forwards, duration: duration},
          {animationEnd: function() {} });
  
     accountsLanding.rightWrapper.animate(
      kony.ui.createAnimation({100:
      {"left": leftContainerWidth,"opacity": 1,"stepConfig":{"timingFunction": easeOut}}}),
      {fillMode: forwards ,duration:duration},
      {animationEnd: function() {} });
  }

  accountRightContainer = "rightWrapper";
  //accountDeselect();
 // selectedAccount = undefined;

//   accountsLanding.accountDetailWrapper.animate(
//         kony.ui.createAnimation({100:
//         {"left": '100%',"stepConfig":{"timingFunction": easeOut}}}),
//         {fillMode: forwards ,duration:duration},
//         {animationEnd: function() {
//           accountsLanding.remove(accountsLanding.accountDetailWrapper);
//           //accountDetail.destroy();
          
//         } });
  
//   accountsLanding.rightWrapper.animate(
//       kony.ui.createAnimation({100:
//       {"left": leftContainerWidth,"opacity": 1,"stepConfig":{"timingFunction": easeOut}}}),
//       {fillMode: forwards ,duration:duration},
//       {animationEnd: function() {} });
//     if (accountsLanding.accountTransactionWrapper){
//       accountsLanding.accountTransactionWrapper.animate(
//           kony.ui.createAnimation({100:
//           {"left": "100%","opacity": 1,"stepConfig":{"timingFunction": easeOut}}}),
//           {fillMode: forwards ,duration:duration},
//           {animationEnd: function() {
//             accountsLanding.remove(accountsLanding.accountTransactionWrapper);
//           } });
    
//       accountsLanding.leftWrapper.animate(
//           kony.ui.createAnimation({100:
//           {"left": "0%", "stepConfig":{"timingFunction": easeOut}}}),
//           {fillMode: forwards, duration: duration},
//           {animationEnd: function() {} });
//   }
       closeRightPanel(rightContainer, "rightWrapper");
       rightContainer = "rightWrapper";
       retainSelectionOff("segAccountInfoData");
  
      if (accountsLanding.scheduledTransactionWrapper){
   /* accountsLanding.accountDetailWrapper.animate(
        kony.ui.createAnimation({100:
        {"left": leftContainerWidth, "stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards, duration: duration},
        {animationEnd: function() {} });*/

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
        
    accountsLanding.accountDetailWrapper.animate(
        kony.ui.createAnimation({100:
        {"left": '100%',"stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards ,duration:duration},
        {animationEnd: function() {
          accountsLanding.remove(accountsLanding.accountDetailWrapper);
         // accountDetail.destroy();
        } });
            
     accountsLanding.rightWrapper.animate(
      kony.ui.createAnimation({100:
      {"left": leftContainerWidth,"opacity": 1,"stepConfig":{"timingFunction": easeOut}}}),
      {fillMode: forwards ,duration:duration},
      {animationEnd: function() {} });

  }
}


// Transaction Segment Row Click open transaction details
function onTransactionSegmentRowClick(){
  if (accountsLanding.flxAccountStatementsKA){
    accountsLanding.flxAccountStatementsKA.animate(
        kony.ui.createAnimation({100:
        {"left": "100%", "stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards, duration: duration},
        {animationEnd: function() {
          accountsLanding.remove(accountsLanding.flxAccountStatementsKA);
        } });
  }
  if (accountsLanding.scheduledTransactionWrapper){
    accountsLanding.scheduledTransactionWrapper.animate(
        kony.ui.createAnimation({100:
        {"left": "100%", "stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards, duration: duration},
        {animationEnd: function() {
          accountsLanding.remove(accountsLanding.scheduledTransactionWrapper);
        } });
  }
   if (accountsLanding.recentTransactionWrapper){
    accountsLanding.recentTransactionWrapper.animate(
        kony.ui.createAnimation({100:
        {"left": "100%", "stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards, duration: duration},
        {animationEnd: function() {
          accountsLanding.remove(accountsLanding.recentTransactionWrapper);
        } });
  }
    if (!accountsLanding.accountTransactionWrapper){
      accountsLanding.add(accountTransactionDetails.accountTransactionWrapper);
      accountsLanding.accountTransactionWrapper.left = "100%";
      accountsLanding.accountTransactionWrapper.width = leftContainerWidth;
      
      accountsLanding.accountDetailWrapper.animate(
          kony.ui.createAnimation({100:
          {"left": "0%", "stepConfig":{"timingFunction": easeOut}}}),
          {fillMode: forwards, duration: duration},
          {animationEnd: function() {} });
      
      accountsLanding.accountTransactionWrapper.animate(
          kony.ui.createAnimation({100:
          {"left": rightContainerWidth, "stepConfig":{"timingFunction": easeOut}}}),
          {fillMode: forwards, duration: duration},
          {animationEnd: function() {} });

       accountsLanding.leftWrapper.animate(
          kony.ui.createAnimation({100:
          {"left": "-" + leftContainerWidth, "stepConfig":{"timingFunction": easeOut}}}),
          {fillMode: forwards, duration: duration},
          {animationEnd: function() {} });
    } 
  
  	//retainSelectionOn("transactionSegment");
  	//alert("entering inot"+  retainSelectionOff("checkSegment"));
  	//retainSelectionOff("checkSegment");
}

// Depsoit Transaction Segment Row Click open transaction details
function onDepositTransactionSegmentRowClick(){
  if (accountsLanding.flxAccountStatementsKA){
    accountsLanding.flxAccountStatementsKA.animate(
        kony.ui.createAnimation({100:
        {"left": "100%", "stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards, duration: duration},
        {animationEnd: function() {
          accountsLanding.remove(accountsLanding.flxAccountStatementsKA);
        } });
  }
  if (accountsLanding.scheduledTransactionWrapper){
    accountsLanding.scheduledTransactionWrapper.animate(
        kony.ui.createAnimation({100:
        {"left": "100%", "stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards, duration: duration},
        {animationEnd: function() {
          accountsLanding.remove(accountsLanding.scheduledTransactionWrapper);
        } });
  }
   if (accountsLanding.recentTransactionWrapper){
    accountsLanding.recentTransactionWrapper.animate(
        kony.ui.createAnimation({100:
        {"left": "100%", "stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards, duration: duration},
        {animationEnd: function() {
          accountsLanding.remove(accountsLanding.recentTransactionWrapper);
        } });
    }
  if (accountsLanding.accountTransactionWrapper){
    accountsLanding.accountTransactionWrapper.animate(
        kony.ui.createAnimation({100:
        {"left": "100%", "stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards, duration: duration},
        {animationEnd: function() {
          accountsLanding.remove(accountsLanding.accountTransactionWrapper);
        } });
    }
    if (!accountsLanding.recentTransactionWrapper){
      accountsLanding.add(frmRecentDepositKA.recentTransactionWrapper);
      accountsLanding.recentTransactionWrapper.left = "100%";
      accountsLanding.recentTransactionWrapper.width = leftContainerWidth;
      
      accountsLanding.accountDetailWrapper.animate(
          kony.ui.createAnimation({100:
          {"left": "0%", "stepConfig":{"timingFunction": easeOut}}}),
          {fillMode: forwards, duration: duration},
          {animationEnd: function() {} });
      
      accountsLanding.recentTransactionWrapper.animate(
          kony.ui.createAnimation({100:
          {"left": rightContainerWidth, "stepConfig":{"timingFunction": easeOut}}}),
          {fillMode: forwards, duration: duration},
          {animationEnd: function() {} });

       accountsLanding.leftWrapper.animate(
          kony.ui.createAnimation({100:
          {"left": "-" + leftContainerWidth, "stepConfig":{"timingFunction": easeOut}}}),
          {fillMode: forwards, duration: duration},
          {animationEnd: function() {} });
    } 
  
  	//retainSelectionOn("transactionSegment");
  	//alert("entering inot"+  retainSelectionOff("checkSegment"));
  	//retainSelectionOff("checkSegment");
}
// Close transaction details
function onTransactionClose(){
    var frmName = kony.application.getCurrentForm().id;
    if(frmName=="accountsLanding")
    {  
      
      accountsLanding.accountDetailWrapper.animate(
          kony.ui.createAnimation({100:
          {"left": leftContainerWidth, "stepConfig":{"timingFunction": easeOut}}}),
          {fillMode: forwards, duration: duration},
          {animationEnd: function() {} });

      accountsLanding.accountTransactionWrapper.animate(
          kony.ui.createAnimation({100:
          {"left": "100%", "stepConfig":{"timingFunction": easeOut}}}),
          {fillMode: forwards, duration: duration},
          {animationEnd: function() {
            accountsLanding.remove(accountsLanding.accountTransactionWrapper);
          } });
  
      accountsLanding.leftWrapper.animate(
          kony.ui.createAnimation({100:
          {"left": "0%", "stepConfig":{"timingFunction": easeOut}}}),
          {fillMode: forwards, duration: duration},
          {animationEnd: function() {} });
  
      retainSelectionOff("transactionSegment");
    }
    else if(frmName=="frmTransferPayLandingKA")
      {
        retainSelectionOff("recentTransactions");
  	    retainSelectionOff("scheduledTransactions");
       closeRightPanel(rightContainer, "rightWrapper");
       rightContainer = "rightWrapper";
      }  
}

function onDepositTransactionClose(){
    var frmName = kony.application.getCurrentForm().id;
    if(frmName=="accountsLanding")
    {  
      accountsLanding.accountDetailWrapper.animate(
          kony.ui.createAnimation({100:
          {"left": leftContainerWidth, "stepConfig":{"timingFunction": easeOut}}}),
          {fillMode: forwards, duration: duration},
          {animationEnd: function() {} });

      accountsLanding.recentTransactionWrapper.animate(
          kony.ui.createAnimation({100:
          {"left": "100%", "stepConfig":{"timingFunction": easeOut}}}),
          {fillMode: forwards, duration: duration},
          {animationEnd: function() {
            accountsLanding.remove(accountsLanding.recentTransactionWrapper);
          } });
  
      accountsLanding.leftWrapper.animate(
          kony.ui.createAnimation({100:
          {"left": "0%", "stepConfig":{"timingFunction": easeOut}}}),
          {fillMode: forwards, duration: duration},
          {animationEnd: function() {} });
  
      retainSelectionOff("transactionSegment");
    }
    else if(frmName=="frmDepositPayLandingKA")
      {
       closeRightPanel(rightContainer, "rightWrapper");
      rightContainer = "rightWrapper";
      retainSelectionOff("recentTransactions");
      retainSelectionOff("scheduledTransactions");
      }  
}
/*Author:Mounika ChoncheckSegmentClick
Purpose:onclick of onCheckSegment displays DepositRecentTransactionDetails
*/
function onCheckSegmentRowClick(){
  kony.print("entering in to the checksegment click");
  if (accountsLanding.accountTransactionWrapper){
    accountsLanding.accountTransactionWrapper.animate(
        kony.ui.createAnimation({100:
        {"left": "100%", "stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards, duration: duration},
        {animationEnd: function() {
          accountsLanding.remove(accountsLanding.accountTransactionWrapper);
        } });
  }
   if (accountsLanding.flxAccountStatementsKA){
    accountsLanding.flxAccountStatementsKA.animate(
        kony.ui.createAnimation({100:
        {"left": "100%", "stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards, duration: duration},
        {animationEnd: function() {
          accountsLanding.remove(accountsLanding.flxAccountStatementsKA);
        } });
  }
  
   if (!accountsLanding.scheduledTransactionWrapper){
      accountsLanding.add(frmScheduledDepositKA.scheduledTransactionWrapper);
      accountsLanding.scheduledTransactionWrapper.left = "100%";
      accountsLanding.scheduledTransactionWrapper.width = leftContainerWidth;
      
      accountsLanding.accountDetailWrapper.animate(
          kony.ui.createAnimation({100:
          {"left": "0%", "stepConfig":{"timingFunction": easeOut}}}),
          {fillMode: forwards, duration: duration},
          {animationEnd: function() {} });
      
         accountsLanding.scheduledTransactionWrapper.animate(
          kony.ui.createAnimation({100:
          {"left": rightContainerWidth, "stepConfig":{"timingFunction": easeOut}}}),
          {fillMode: forwards, duration: duration},
          {animationEnd: function() {} });


       accountsLanding.leftWrapper.animate(
          kony.ui.createAnimation({100:
          {"left": "-" + leftContainerWidth, "stepConfig":{"timingFunction": easeOut}}}),
          {fillMode: forwards, duration: duration},
          {animationEnd: function() {} });
    } 
  
  	retainSelectionOn("checkSegment");
    retainSelectionOff("transactionSegment");
          }

// Account Statements open
function onAccountStatementsClick(){
  if (accountsLanding.accountTransactionWrapper){
    accountsLanding.accountTransactionWrapper.animate(
        kony.ui.createAnimation({100:
        {"left": "100%", "stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards, duration: duration},
        {animationEnd: function() {
          accountsLanding.remove(accountsLanding.accountTransactionWrapper);
        } });
  }
   if (accountsLanding.scheduledTransactionWrapper){
    accountsLanding.scheduledTransactionWrapper.animate(
        kony.ui.createAnimation({100:
        {"left": "100%", "stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards, duration: duration},
        {animationEnd: function() {
          accountsLanding.remove(accountsLanding.scheduledTransactionWrapper);
        } });
  }
  	 if (accountsLanding.recentTransactionWrapper){
    accountsLanding.recentTransactionWrapper.animate(
        kony.ui.createAnimation({100:
        {"left": "100%", "stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards, duration: duration},
        {animationEnd: function() {
          accountsLanding.remove(accountsLanding.recentTransactionWrapper);
        } });
    }
    if (!accountsLanding.flxAccountStatementsKA){
      accountsLanding.add(frmAccountStatementsKA.flxAccountStatementsKA);
      accountsLanding.flxAccountStatementsKA.left = "100%";
      accountsLanding.flxAccountStatementsKA.width = leftContainerWidth;
      
      accountsLanding.accountDetailWrapper.animate(
          kony.ui.createAnimation({100:
          {"left": "0%", "stepConfig":{"timingFunction": easeOut}}}),
          {fillMode: forwards, duration: duration},
          {animationEnd: function() {} });
      
      accountsLanding.flxAccountStatementsKA.animate(
          kony.ui.createAnimation({100:
          {"left": rightContainerWidth, "stepConfig":{"timingFunction": easeOut}}}),
          {fillMode: forwards, duration: duration},
          {animationEnd: function() {} });

       accountsLanding.leftWrapper.animate(
          kony.ui.createAnimation({100:
          {"left": "-" + leftContainerWidth, "stepConfig":{"timingFunction": easeOut}}}),
          {fillMode: forwards, duration: duration},
          {animationEnd: function() {} });
    } 
  
  	retainSelectionOn("transactionSegment");
}
// Account statements close
function onAccountStatementsClose(){
    accountsLanding.accountDetailWrapper.animate(
        kony.ui.createAnimation({100:
        {"left": leftContainerWidth, "stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards, duration: duration},
        {animationEnd: function() {} });

    accountsLanding.flxAccountStatementsKA.animate(
        kony.ui.createAnimation({100:
        {"left": "100%", "stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards, duration: duration},
        {animationEnd: function() {
          accountsLanding.remove(accountsLanding.flxAccountStatementsKA);
        } });
  
  	accountsLanding.leftWrapper.animate(
      kony.ui.createAnimation({100:
      {"left": "0%", "stepConfig":{"timingFunction": easeOut}}}),
      {fillMode: forwards, duration: duration},
      {animationEnd: function() {} });
  
  	retainSelectionOff("transactionSegment");
}

  

function onAccountOrientationChange(){
	getOrientation();

    if (accountsLanding.accountTransactionWrapper){	
        accountsLanding.accountDetailWrapper.width = rightContainerWidth;
        accountsLanding.accountTransactionWrapper.width = leftContainerWidth;
        accountsLanding.accountTransactionWrapper.left = rightContainerWidth;
      	accountsLanding.leftWrapper.width = leftContainerWidth;
    }else {
      accountsLanding.leftWrapper.width = leftContainerWidth;
      accountsLanding[accountRightContainer].width = rightContainerWidth;
      accountsLanding[accountRightContainer].left = leftContainerWidth;
    }
}

function onAccountLandingOrientationChange(){
//userAgent = kony.os.userAgent();
    if (accountsLanding.accountTransactionWrapper !==null){	
        accountsLanding.accountDetailWrapper.width = rightContainerWidth;
        accountsLanding.accountTransactionWrapper.width = leftContainerWidth;
        accountsLanding.accountTransactionWrapper.left = rightContainerWidth;
      	accountsLanding.leftWrapper.width = leftContainerWidth;
    }else if (accountsLanding.flxAccountStatementsKA){	
      //based on the user agent orientation value chnaged 
       var currFormOrientation = kony.os.getDeviceCurrentOrientation();
       if(userAgent === "iPad"){
           if (currFormOrientation==1){
        //Landscape
        frmMonthlyAccountStatementsKA.flxMonthlyAccountStatementsMaimKA.height = "680dp";
      } else {
        //Portrait
         frmMonthlyAccountStatementsKA.flxMonthlyAccountStatementsMaimKA.height = "830dp";
      } 
       }else{
            if (currFormOrientation==1){
        //Portrait
        frmMonthlyAccountStatementsKA.flxMonthlyAccountStatementsMaimKA.height = "830dp";
      } else {
        //Landscape
         frmMonthlyAccountStatementsKA.flxMonthlyAccountStatementsMaimKA.height = "680dp";
      } 
       }
     
    }else {
      accountsLanding.leftWrapper.width = leftContainerWidth;
      accountsLanding[accountRightContainer].width = rightContainerWidth;
      accountsLanding[accountRightContainer].left = leftContainerWidth;
    }
}


function onTransactionDetailsClick(){
  if (accountsLanding.accountTransactionWrapper){
    accountsLanding.accountTransactionWrapper.animate(
        kony.ui.createAnimation({100:
        {"left": "100%", "stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards, duration: duration},
        {animationEnd: function() {
          accountsLanding.remove(accountsLanding.accountTransactionWrapper);
        } });
  }
   if (accountsLanding.scheduledTransactionWrapper){
    accountsLanding.scheduledTransactionWrapper.animate(
        kony.ui.createAnimation({100:
        {"left": "100%", "stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards, duration: duration},
        {animationEnd: function() {
          accountsLanding.remove(accountsLanding.scheduledTransactionWrapper);
        } });
  }
    if (!accountsLanding.recentTransactionWrapper){
      accountsLanding.add(frmRecentTransactionDetailsKA.recentTransactionWrapper);
      accountsLanding.recentTransactionWrapper.left = "100%";
      accountsLanding.recentTransactionWrapper.width = leftContainerWidth;
      
      accountsLanding.accountDetailWrapper.animate(
          kony.ui.createAnimation({100:
          {"left": "0%", "stepConfig":{"timingFunction": easeOut}}}),
          {fillMode: forwards, duration: duration},
          {animationEnd: function() {} });
      
      accountsLanding.recentTransactionWrapper.animate(
          kony.ui.createAnimation({100:
          {"left": rightContainerWidth, "stepConfig":{"timingFunction": easeOut}}}),
          {fillMode: forwards, duration: duration},
          {animationEnd: function() {} });

       accountsLanding.leftWrapper.animate(
          kony.ui.createAnimation({100:
          {"left": "-" + leftContainerWidth, "stepConfig":{"timingFunction": easeOut}}}),
          {fillMode: forwards, duration: duration},
          {animationEnd: function() {} });
    } 
}