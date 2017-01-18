
function firstTimeVisitTabletDepositForm()
{
  if(kony.store.getItem("depositForm") === null || kony.store.getItem("depositForm") === false)
  {

    openModal(TermsandConditions.contactUsWrapper,"contactUsWrapper");
  }
  else
  { 
    frmDepositPayLandingKA.show();
  }
}


function DepositRecentTransactionsOnRowClick() {

  var selectedRow=frmDepositPayLandingKA.recentTransactions.selectedItems;

  

  frmRecentDepositKA.transactionAmount.text = selectedRow[0].transactionAmount.text; 

  frmRecentDepositKA.transactionDate.text = selectedRow[0].transactionDate;
  frmRecentDepositKA.transactionName.text = selectedRow[0].transactionName;
  frmRecentDepositKA.transactionFrom.text = selectedRow[0].transactionName;
  addRightPanel(frmRecentDepositKA.recentTransactionWrapper,"recentTransactionWrapper");
  
  retainSelectionOn("recentTransactions");
  retainSelectionOff("scheduledTransactions");


}

function DepositScheduledTransactionsOnRowClick() {

  var selectedRow=frmDepositPayLandingKA.scheduledTransactions.selectedItems;
  
  frmScheduledDepositKA.transactionAmount.text = selectedRow[0].transactionAmount.text;
  frmScheduledDepositKA.transactionDate.text = selectedRow[0].transactionDate;
  
  frmScheduledDepositKA.transactionName.text = selectedRow[0].transactionName;
  frmScheduledDepositKA.transactionFrom.text = selectedRow[0].transactionName;
  addRightPanel(frmScheduledDepositKA.scheduledTransactionWrapper,"scheduledTransactionWrapper");
  retainSelectionOn("scheduledTransactions");
  retainSelectionOff("recentTransactions");
}


function DepositRecentTabSelected(){
  frmDepositPayLandingKA.transactionListsContainer.animate(
    kony.ui.createAnimation({100:
                             { 
                               "left": '0%',
                               "stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration:0.3},
    {animationEnd: function() {} });

  frmDepositPayLandingKA.tabSelectedIndicator.animate(
    kony.ui.createAnimation({100:
                             { 
                               "left": '0%',
                               "stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration:0.3},
    {animationEnd: function() {} }); 

  frmDepositPayLandingKA.recentTabButton.skin = tabSelected;
  frmDepositPayLandingKA.scheduledTabButton.skin = tabDeselected;
}


function DepositScheduledTabSelected(){
  frmDepositPayLandingKA.transactionListsContainer.animate(
    kony.ui.createAnimation({100:
                             { 
                               "left": '-100%',
                               "stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration:0.3},
    {animationEnd: function() {} });

  frmDepositPayLandingKA.tabSelectedIndicator.animate(
    kony.ui.createAnimation({100:
                             { 
                               "left": '50%',
                               "stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards ,duration:0.3},
    {animationEnd: function() {} });

  frmDepositPayLandingKA.scheduledTabButton.skin = tabSelected;
  frmDepositPayLandingKA.recentTabButton.skin = tabDeselected;
}


function setDataDepositPay(){
 // frmDepositPayLandingKA.recentTransactions.setData(DepositrecentTransactions);
  //frmDepositPayLandingKA.scheduledTransactions.setData(scheduledDepositTransactions);

  userAgent = kony.os.userAgent();
  setRightContainer();
  onOrientationChange(frmDepositPayLandingKA);
  if (userAgent === "iPad"){
    // todo
  }
}
function btnFrontOnclick() {


  frmDepositRecentTransactionDetailsKA.ImgFront.setVisibility(true);
  frmDepositRecentTransactionDetailsKA.mainContent.enableAp.skin="primaryAction";
  frmDepositRecentTransactionDetailsKA.mainContent.btnBack.skin="BackSkin";
  frmDepositRecentTransactionDetailsKA.ImgBack.setVisibility(false);
}
function btnBackOnclick(){

  frmDepositRecentTransactionDetailsKA.ImgBack.setVisibility(true);
  frmDepositRecentTransactionDetailsKA.ImgFront.setVisibility(false);
  frmDepositRecentTransactionDetailsKA.mainContent.enableAp.skin="BackSkin";
  frmDepositRecentTransactionDetailsKA.mainContent.btnBack.skin="primaryAction";

}
function ChangeInOrientation(){
    userAgent=kony.os.userAgent();
 // alert(frmDepositRecentTransactionDetailsKA.contactModalContainer.width+"");500
//alert(frmDepositRecentTransactionDetailsKA.contactModalContainer.height+"");830
//alert(frmDepositRecentTransactionDetailsKA.contactModalContainer.iosTitleBar.width+"")100%
//alert(frmDepositRecentTransactionDetailsKA.contactModalContainer.iosTitleBar.height+"");51dp
  
      
       var currFormOrientation = kony.os.getDeviceCurrentOrientation();
       if(userAgent === "iPad"){
           if (currFormOrientation===1){
        //Landscape
        frmDepositRecentTransactionDetailsKA.contactModalContainer.height = "500dp";
        frmDepositRecentTransactionDetailsKA.contactModalContainer.width  ="830dp";
		frmDepositRecentTransactionDetailsKA.contactModalContainer.iosTitleBar.width="100%" ;
        frmDepositRecentTransactionDetailsKA.contactModalContainer.iosTitleBar.height="51dp";
        frmDepositRecentTransactionDetailsKA.contactModalContainer.mainContent.ImgFront.height="300dp";
        frmDepositRecentTransactionDetailsKA.contactModalContainer.mainContent.ImgFront.width="500dp";
             frmDepositRecentTransactionDetailsKA.contactModalContainer.mainContent.ImgBack.height="300dp";
        frmDepositRecentTransactionDetailsKA.contactModalContainer.mainContent.ImgBack.width="500dp";
        
           }
             
 
       
       else {
        //Portrait
        
         frmDepositRecentTransactionDetailsKA.contactModalContainer.height  = "830dp";
        frmDepositRecentTransactionDetailsKA.contactModalContainer.width = "500dp";
        frmDepositRecentTransactionDetailsKA.contactModalContainer.mainContent.ImgFront.height="500dp";
        frmDepositRecentTransactionDetailsKA.contactModalContainer.mainContent.ImgFront.width="300dp";
         frmDepositRecentTransactionDetailsKA.contactModalContainer.mainContent.ImgBack.height="500dp";
        frmDepositRecentTransactionDetailsKA.contactModalContainer.mainContent.ImgBack.width="300dp";
      } 
       }else{
            if (currFormOrientation===1){
        //Portrait
        frmDepositRecentTransactionDetailsKA.contactModalContainer.height  = "830dp";
         frmDepositRecentTransactionDetailsKA.contactModalContainer.width = "500dp";
         frmDepositRecentTransactionDetailsKA.contactModalContainer.mainContent.ImgFront.height="500dp";
        frmDepositRecentTransactionDetailsKA.contactModalContainer.mainContent.ImgFront.width="300dp";
               frmDepositRecentTransactionDetailsKA.contactModalContainer.mainContent.ImgBack.height="500dp";
        frmDepositRecentTransactionDetailsKA.contactModalContainer.mainContent.ImgBack.width="300dp";
      } else {
        //Landscape
        frmDepositRecentTransactionDetailsKA.contactModalContainer.height = "500dp";
        frmDepositRecentTransactionDetailsKA.contactModalContainer.width  ="830dp";
		frmDepositRecentTransactionDetailsKA.contactModalContainer.iosTitleBar.width="100%" ;
        frmDepositRecentTransactionDetailsKA.contactModalContainer.iosTitleBar.height="51dp";
        frmDepositRecentTransactionDetailsKA.contactModalContainer.mainContent.ImgFront.height="300dp";
        frmDepositRecentTransactionDetailsKA.contactModalContainer.mainContent.ImgFront.width="500dp";
          frmDepositRecentTransactionDetailsKA.contactModalContainer.mainContent.ImgBack.height="300dp";
        frmDepositRecentTransactionDetailsKA.contactModalContainer.mainContent.ImgBack.width="500dp";
        
        
      } 
       }
     
    }

       
   

  







