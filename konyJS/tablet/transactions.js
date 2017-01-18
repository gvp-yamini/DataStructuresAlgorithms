
// Determines titlebar color based on accountType of selected row
// variable is set in recentTransactionsOnRowClick()
function recentTransactionDetailPreShow(){
  // set checkingColor
   if (selectedAccountColor === checkingColor){
      recentTransactionDetails.titleBarWrapper.skin = accountTypeChecking;
     // Set savingsColor
    } else if (selectedAccountColor === savingsColor){
      recentTransactionDetails.titleBarWrapper.skin = accountTypeSavings;
      // set creditColor
    } else if (selectedAccountColor === creditColor){
      recentTransactionDetails.titleBarWrapper.skin = accountTypeCredit;
    } 
}

// Determines titlebar color based on accountType of selected row
// variable is set in recentTransactionsOnRowClick()
function scheduledTransactionDetailPreShow(){
  // set checkingColor
   if (selectedAccountColor === checkingColor){
      scheduledTransactionDetails.titleBarWrapper.skin = accountTypeChecking;
     // Set savingsColor
    } else if (selectedAccountColor === savingsColor){
      scheduledTransactionDetails.titleBarWrapper.skin = accountTypeSavings;
      // set creditColor
    } else if (selectedAccountColor === creditColor){
      scheduledTransactionDetails.titleBarWrapper.skin = accountTypeCredit;
    } 
}




// Determines titlebar and form skin color based on accountType of selected row
// variable is set in recentTransactionsOnRowClick()
function recentTransactionDetailPreShow(){

  //setting Data For Recent Transaction
  var recentObJ  =frmDepositPayLandingKA.recentTransactions.selectedItems;
  frmRecentDepositKA.transactionAmount.text = recentObJ[0].transferAmount;
  frmRecentDepositKA.transactionDate.text = "Scheduled for: "+ recentObJ[0].transferDate;
  frmRecentDepositKA.transactionName.text = recentObJ[0].transferDescription;

  // set checkingColor
  if (selectedAccountColor === checkingColor){
    frmRecentTransactionDetailsKA.skin = sknaccountCheckingBkg;
    frmRecentTransactionDetailsKA.titleBarWrapper.skin = sknaccountTypeChecking;

    // Set savingsColor
  } else if (selectedAccountColor === savingsColor){
    frmRecentTransactionDetailsKA.skin = sknaccountSavingsBkg;
    frmRecentTransactionDetailsKA.titleBarWrapper.skin = sknaccountTypeSavings;
    // set creditColor
  } else if (selectedAccountColor === creditColor){
    frmRecentTransactionDetailsKA.skin = sknaccountCreditBkg;
    frmRecentTransactionDetailsKA.titleBarWrapper.skin = sknaccountTypeCredit;
  } 
}

// Determines titlebar and form skin color based on accountType of selected row
// variable is set in recentTransactionsOnRowClick()
function scheduledTransactionDetailPreShow(){

  //setting Data For Pending Transaction
  var pendingObJ  = frmDepositPayLandingKA.scheduledTransactions.selectedItems;
  frmdepositchequeKA.transactionAmount.text = pendingObJ[0].transferAmount;
  frmdepositchequeKA.transactionDate.text = i18n_scheduledForC+" "+ pendingObJ[0].transferDate;
  frmdepositchequeKA.transactionName.text = pendingObJ[0].transferDescription;
  
}

//Useing in Transfer And pay Landing Page
// Determines titlebar and form skin color based on accountType of selected row
// variable is set in recentTransactionsOnRowClick()
function scheduledTransactionPreShow(){
  // set checkingColor
   if (selectedAccountColor === checkingColor){
      frmScheduledTransactionDetailsKA.skin = accountCheckingBkg;
      frmScheduledTransactionDetailsKA.titleBarWrapper.skin = accountTypeChecking;
     // Set savingsColor
    } else if (selectedAccountColor === savingsColor){
      frmScheduledTransactionDetailsKA.skin = accountSavingsBkg;
      frmScheduledTransactionDetailsKA.titleBarWrapper.skin = accountTypeSavings;
      // set creditColor
    } else if (selectedAccountColor === creditColor){
      frmScheduledTransactionDetailsKA.skin = accountCreditBkg;
      frmScheduledTransactionDetailsKA.titleBarWrapper.skin = accountTypeCredit;
    } 
}

function AccountRecentTransactionsPreShow(){
      var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
      var controller = INSTANCE.getFormController("accountDetail");
   	 var controllerContextData=controller.getContextData();
     var accDetails =  controllerContextData.getCustomInfo("selectedAccountObj");
 	 frmAccountRecentTransactionDetailsKA.skin = getSkinColorForBg(accDetails.accountType);
     frmAccountRecentTransactionDetailsKA.titleBarWrapper.skin = getSkinColor(accDetails.accountType);
     frmAccountRecentTransactionDetailsKA.backgroundColor=getSkinColorForBg(accDetails.accountType);
  
  
      var viewModel = controller.getFormModel();
      var index = viewModel.getViewAttributeByProperty("transactionSegment", "selectedRowIndex");
      var selectedRecord = getSelectedRecord(index[1],"frmAccountDetailKA","transactionSegment");
      kony.print("Selected Record is: \n\n\n\n\n\n\n\n\n\n\n\n");
      kony.print(selectedRecord);
  
  
  	  frmAccountRecentTransactionDetailsKA.FlexContainer00bb80511034544.transactionDetails.text=selectedRecord.description;
  	  frmAccountRecentTransactionDetailsKA.transactionNotes.text=selectedRecord.transactionsNotes;
      frmAccountRecentTransactionDetailsKA.transactionAmount.text=kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(selectedRecord.amount);
  	  frmAccountRecentTransactionDetailsKA.flxTransactionDate.lblTransactionDateValueKA.text=selectedRecord.transactionDate;
      if(selectedRecord.transactiontype=="Pay a Bill")
      {
        frmAccountRecentTransactionDetailsKA.FlexContainer042b0725667e643.isVisible=true;
        frmAccountRecentTransactionDetailsKA.NameFlex.isVisible=true;
        frmAccountRecentTransactionDetailsKA.NameFlex.NameField.text=selectedRecord.payeeNickName;
        frmAccountRecentTransactionDetailsKA.PhoneFlex.isVisible=false;
        frmAccountRecentTransactionDetailsKA.EmailFlex.isVisible=false;
        frmAccountRecentTransactionDetailsKA.ToFlex.isVisible=false;
        frmAccountRecentTransactionDetailsKA.fromFlex.isVisible=false;
        frmAccountRecentTransactionDetailsKA.notesFlex.isVisible=true;
        frmAccountRecentTransactionDetailsKA.flxTransactionDate=true;
        frmAccountRecentTransactionDetailsKA.repeatTransactionContainer=true; 
        
      }
      else if(selectedRecord.transactiontype=="Transfer Money")
      {
        
        frmAccountRecentTransactionDetailsKA.FlexContainer042b0725667e643.isVisible=true;
        frmAccountRecentTransactionDetailsKA.NameFlex.isVisible=false;
        frmAccountRecentTransactionDetailsKA.PhoneFlex.isVisible=false;
        frmAccountRecentTransactionDetailsKA.EmailFlex.isVisible=false;
        if(accDetails.accountName==selectedRecord.fromAccountName)
        {
          frmAccountRecentTransactionDetailsKA.ToFlex.isVisible=true;
          frmAccountRecentTransactionDetailsKA.fromFlex.isVisible=false;
          frmAccountRecentTransactionDetailsKA.ToFlex.transactionTo.text=selectedRecord.toAccountName;
        }
        else
        {
          frmAccountRecentTransactionDetailsKA.ToFlex.isVisible=false;
          frmAccountRecentTransactionDetailsKA.fromFlex.isVisible=true;
          frmAccountRecentTransactionDetailsKA.fromFlex.transactionFrom.text=selectedRecord.fromAccountName;
          
        }
        frmAccountRecentTransactionDetailsKA.notesFlex.isVisible=false;
        if(accDetails.accountType=="Credit Card")
        frmAccountRecentTransactionDetailsKA.notesFlex.isVisible=true;
        frmAccountRecentTransactionDetailsKA.flxTransactionDate=true;
        frmAccountRecentTransactionDetailsKA.repeatTransactionContainer=true;
		
      }
      else if(selectedRecord.transactiontype=="Pay a Person")
      {

        frmAccountRecentTransactionDetailsKA.FlexContainer042b0725667e643.isVisible=true;
        frmAccountRecentTransactionDetailsKA.NameFlex.isVisible=true;
        frmAccountRecentTransactionDetailsKA.NameFlex.NameField.text=selectedRecord.payeeNickName;
        frmAccountRecentTransactionDetailsKA.PhoneFlex.isVisible=true;
        frmAccountRecentTransactionDetailsKA.EmailFlex.isVisible=true;
        frmAccountRecentTransactionDetailsKA.ToFlex.isVisible=false;
        frmAccountRecentTransactionDetailsKA.fromFlex.isVisible=false;
        frmAccountRecentTransactionDetailsKA.notesFlex.isVisible=true;
        frmAccountRecentTransactionDetailsKA.flxTransactionDate=true;
        frmAccountRecentTransactionDetailsKA.repeatTransactionContainer=true;
      }
      else if(selectedRecord.transactiontype=="Check")
      {
        //need to revisit after this field specified in service
        frmAccountRecentTransactionDetailsKA.FlexContainer042b0725667e643.isVisible=true;
        frmAccountRecentTransactionDetailsKA.NameFlex.isVisible=false;
        frmAccountRecentTransactionDetailsKA.PhoneFlex.isVisible=false;
        frmAccountRecentTransactionDetailsKA.EmailFlex.isVisible=false;
        frmAccountRecentTransactionDetailsKA.ToFlex.isVisible=false;
        frmAccountRecentTransactionDetailsKA.fromFlex.isVisible=false;
        frmAccountRecentTransactionDetailsKA.notesFlex.isVisible=false;
        frmAccountRecentTransactionDetailsKA.flxTransactionDate=true;
        frmAccountRecentTransactionDetailsKA.repeatTransactionContainer=true;

      }
      else 
      {		
        frmAccountRecentTransactionDetailsKA.FlexContainer042b0725667e643.isVisible=true;
        frmAccountRecentTransactionDetailsKA.NameFlex.isVisible=false;
        frmAccountRecentTransactionDetailsKA.PhoneFlex.isVisible=false;
        frmAccountRecentTransactionDetailsKA.EmailFlex.isVisible=false;
        frmAccountRecentTransactionDetailsKA.ToFlex.isVisible=false;
        frmAccountRecentTransactionDetailsKA.fromFlex.isVisible=false;
        frmAccountRecentTransactionDetailsKA.notesFlex.isVisible=false;
        frmAccountRecentTransactionDetailsKA.flxTransactionDate=true;
        frmAccountRecentTransactionDetailsKA.repeatTransactionContainer=false;
      }
      


}

