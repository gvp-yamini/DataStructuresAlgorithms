////////////////////////////
// Account Detail Form
////////////////////////////

function accountDetailPreShow(){
  userAgent = kony.os.userAgent();
  // Alterations to Android layout due to lack of scrolling events
  if (userAgent !== "iPhone"){
    alert("preshow");
    accountDetail.accountBalanceOverview.top = "70dp";
    accountDetail.accountDetailsOverview.height = "215dp";
    accountDetail.accountDetailsTransactions.top = "215dp";
  }
}

// Called on yourAccount[x] buttons on accountLanding form
// Passes sample data and color information to accountDetail form and displays it
var x;
function yourAccountClick(whichAccount){
  x = whichAccount;
  accountDetail.accountDetailsHeader.text = x.name;
  accountDetail.accountDetailsOverview.backgroundColor =  x.color;
  accountDetail.titleBarAccountDetails.backgroundColor =  x.color;
  accountDetail.availableBalanceAmount.text =  x.avlBalance;
  accountDetail.accountBalanceAmount.text =  x.acctBalance;
  accountsLanding.scrollToBeginning();

	if (x === account1){
      accountDetail.skin = accountCheckingBkg;
    } else if (x === account2){
      accountDetail.skin = accountSavingsBkg;
    } else if (x === account3){
      accountDetail.skin = accountCreditBkg;
    } else if (x === account4){
      accountDetail.skin = accountCheckingBkg;
    }
  
//   if (userAgent !== "iPad"){
//     accountDetail.show();
//   }
  

}

function hideAccountDetails(){
  accountsLanding.show();
}


// Called on accountDetail.accountDetailsScrollContainer onScrolling action
function accountDetailsScroll(){
  if (userAgent === "iPhone"){
  	var outerScrollY = accountDetail.accountDetailsScrollContainer.contentOffsetMeasured.y;
  	var outerScrollYAbs=Math.abs(outerScrollY);
  
  	// Display accountLabelScroll element
  	if (outerScrollY > 115){
    	accountDetail.accountLabelScroll.isVisible = true;
    } else if (outerScrollY > 0 && outerScrollY < 115) {
          accountDetail.accountLabelScroll.isVisible = false;
    }

    // If user scrolls upwards
    if (outerScrollY > 0 && outerScrollY < 80){
      accountDetail.accountBalanceOverview.top = (95-(outerScrollYAbs*0.3125) + "dp");
      accountDetail.accountInfoButton.opacity = (1-(outerScrollYAbs*0.006));
      accountDetail.accountInfoButton.bottom = (10+(outerScrollYAbs*0.05) + "%");
    }
  	
  	if (outerScrollY > 80) {
      accountDetail.accountBalanceOverview.top = "70dp";
    }
  
  	if (outerScrollY === 0){
      accountDetail.accountInfoButton.bottom = "10%";
      accountDetail.accountBalanceOverview.opacity = 1;
      accountDetail.accountInfoButton.opacity = 1;
    }

    // if user scrolls downwards  
    if (outerScrollY < 0){
      	accountDetail.accountDetailsHeader.top = (15 + (outerScrollYAbs*0.3) + "dp");
      	accountDetail.accountDetailsTime.top = (37 + (outerScrollYAbs*0.3) + "dp");
      	accountDetail.accountBalanceOverview.top = (95+(outerScrollYAbs*0.4) + "dp");
      	accountDetail.accountInfoButton.bottom = (10+(outerScrollYAbs*0.05) + "%");
      	accountDetail.gradientOverlay.bottom = (0-(outerScrollYAbs*1) + "dp");
 	}
  }
}






///////////////////////////////
////////////////////////iPad
///////////////////////////////



// Called on accountDetail.accountDetailsScrollContainer onScrolling action
function accountDetailsScrollIpad(){
  	var outerScrollY = accountDetail.accountDetailsScrollContainer.contentOffsetMeasured.y;
  	var outerScrollYAbs = Math.abs(outerScrollY);
  
  	// Display accountLabelScroll element
  	if (outerScrollY > 65){
    	accountsLanding.accountLabelScroll.isVisible = true;
    } else if (outerScrollY > 0 && outerScrollY < 65) {
        accountsLanding.accountLabelScroll.isVisible = false;
    }

    // If user scrolls upwards
    if (outerScrollY > 0 && outerScrollY < 80){
      accountsLanding.accountBalanceOverview.top = (70-(outerScrollYAbs*0.1875) + "dp");
      accountsLanding.accountInfoButton.opacity = (1-(outerScrollYAbs*0.006));
      //accountsLanding.accountInfoButton.bottom = (10+(outerScrollYAbs*0.05) + "%");
    }
  	
  	if (outerScrollY > 80) {
      accountsLanding.accountBalanceOverview.top = "55dp";
    }
 
  	if (outerScrollY === 0){
      //accountsLanding.accountInfoButton.bottom = "10%";
      //accountsLanding.accountBalanceOverview.opacity = 1;
      //accountsLanding.accountInfoButton.opacity = 1;
    }

    // if user scrolls downwards  
    if (outerScrollY < 0){
      	accountsLanding.accountDetailsHeader.top = (19 + (outerScrollYAbs*0.3) + "dp");
      	accountsLanding.accountBalanceOverview.top = (70+(outerScrollYAbs*0.4) + "dp");
      //	accountsLanding.accountInfoButton.bottom = (10+(outerScrollYAbs*0.05) + "%");
       // accountsLanding.btnAccountStatementsKA.top = (70+(outerScrollYAbs*0.05) + "%");
     	accountsLanding.accountInfoButton.bottom = "28%";
        accountsLanding.btnAccountStatementsKA.bottom = "5%";
      	accountsLanding.gradientOverlay.bottom = (0-(outerScrollYAbs*1) + "dp");
 	}
}

