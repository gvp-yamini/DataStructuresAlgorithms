function payBillInit(){
  fromCardHeightPayBill = frmNewBillKA.fromCard.height;
  toCardHeightPayBill = frmNewBillKA.toCard.height;
}

function payBillPreShow(){
  	loadNewBillData();
  
    // setup toCard
  	frmNewBillKA.toAccountPick.opacity = 0;
  	frmNewBillKA.toAccountNameContainer.top = "100%";
    frmNewBillKA.toAccountAmountContainer.top = "100%";
  	frmNewBillKA.toLabel.left = "-25dp";
  	
  	// setup fromCard
  	frmNewBillKA.fromAccountPick.opacity = 0;
  	frmNewBillKA.fromAccountNameContainer.top = "100%";
    frmNewBillKA.fromAccountAmountContainer.top = "100%";
  
  	// setup amountCard
  	frmNewBillKA.amountPick.opacity = 0;
  	frmNewBillKA.amountPickContainer.top = "100%";
  	
}

function payBillHide(){
  frmNewBillKA.destroy();
  
  /*frmNewBillKA.amountTextField.text = null;
  editAccountCard(frmNewBillKA, "to");
  editAccountCard(frmNewBillKA, "from");
  editAmountCard(frmNewBillKA);*/
}