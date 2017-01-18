// Sets titlebar appropriate color
function accountsStatementsPreShow(){
 // if (x === account1){
//       //accountInfo.skin = accountCheckingBkg;
//       frmMonthlyAccountStatementsKA.titleBarAccountInfo.skin = accountTypeChecking;
//     } else if (x === account2){
//       //accountInfo.skin = accountSavingsBkg;
//       frmMonthlyAccountStatementsKA.titleBarAccountInfo.skin = accountTypeSavings;
//     } else if (x === account3){
//       //accountInfo.skin = accountCreditBkg;
//       frmMonthlyAccountStatementsKA.titleBarAccountInfo.skin = accountTypeCredit;
//     } else if (x === account4){
//       //accountInfo.skin = accountCheckingBkg;
//       frmMonthlyAccountStatementsKA.titleBarAccountInfo.skin = accountTypeChecking;
//     } 
  
  	//accountInfo.successIcon.opacity = 0;
 	//accountInfo.successImage.opacity = 0;
    frmMonthlyAccountStatementsKA.titleBarAccountInfo.skin = segAccountInfoData[selectedAccount].colorAccount1.skin;
}


function openAccountStatementPrintOptions(){
 if(!frmMonthlyAccountStatementsKA.flxAccountStatementsPrintOptionsKA.isVisible){
   frmMonthlyAccountStatementsKA.flxAccountStatementsPrintOptionsKA.setVisibility(true);
 }
}
