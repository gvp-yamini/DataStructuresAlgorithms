//Setting Deposit Data

//used For visiting FirstTime Deposit
function firstTimeVisitDepositForm()
{
  if(kony.store.getItem("depositForm") === null || kony.store.getItem("depositForm") === false)
  {
     //alert("hi entering in to deposit header skin");
    frmTermsAndConditionsKA.titleBarWrapper.skin=skncontainerBkgNone;
    //kony.print("frmTermsAndConditionsKA.titleBarWrapper.skin"+frmTermsAndConditionsKA.titleBarWrapper.skin);
    frmTermsAndConditionsKA.show();
  }
  else
  { 
     getDeposits("frmDepositPayLandingKA");
  }
}

//Selecting Scheduled Transactions
function scheduledDepositTabSelected(){
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
  
    frmDepositPayLandingKA.scheduledTabButton.skin = skntabSelected;
    frmDepositPayLandingKA.recentTabButton.skin = skntabDeselected;
}

//Selecting Recent Transactions
function recentDepositTabSelected(){
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
  
  frmDepositPayLandingKA.recentTabButton.skin = skntabSelected;
  frmDepositPayLandingKA.scheduledTabButton.skin = skntabDeselected;
}

//
function scheduledDepositTransactionsOnRowClick() {
  selectedAccountColor = checkingColor;
}


function depositlInit(){
    toCardHeightDeposit = frmNewDepositKA.toCard.height;
}

function depositPreShow(){
  //	loadDepositData();
 
    // setup fromCard
    selectAccountCard(frmNewDepositKA, "to", 1);
    frmNewDepositKA.toCard.height = defaultCardHeight;
    frmNewDepositKA.toLabel.left = labelLeft;
	
  	// load initial account data
    frmNewDepositKA.toNamePick.text = account1.name;
    frmNewDepositKA.toAmountPick.text = account1.avlBalance;
    frmNewDepositKA.toAccountColorPick.backgroundColor = account1.color;
  
 	// setup amountCard
  	frmNewDepositKA.amountPick.opacity = 0;
  	frmNewDepositKA.amountPickContainer.top = "100%";
}

function depositHide(){
	frmNewDepositKA.destroy();
}


function depositCancel(){
  
  	frmNewDepositKA.toNamePick.text = account1.name;
    frmNewDepositKA.toAmountPick.text = account1.avlBalance;
    frmNewDepositKA.toAccountColorPick.backgroundColor = account1.color;
  
  	frmNewDepositKA.amountTextField.text = null;
  	frmNewDepositKA.noteTextfield.text = null;
   	editAmountCard(frmNewDepositKA);
  	resetDepositLandingCameras();
}

//////////////////////////////////
/// Camera Logic
//////////////////////////////////


// Front Image Capture
function saveFrontOfCheckImage() {
  	userAgent = kony.os.userAgent();
  
  	var rawBytes = frmNewDepositKA.frontCamera.rawBytes;
    var base64Image = kony.convertToBase64(rawBytes);
	
  	if (userAgent === "iPhone" || userAgent === "iPad"){
       // set base64Image to frontImageCapture
  	  frmNewDepositKA.frontImageCapture.base64 = base64Image;
    } else{
      // set rawBytes incase of Android
       frmNewDepositKA.frontImageCapture.rawBytes = rawBytes;
    }
  
  	// Display image, change text
  	frmNewDepositKA.frontImageWrap.height = "100dp";	
  	frmNewDepositKA.frontCameraWrap.top = "5dp";
  	frmNewDepositKA.frontCameraWrap.height = "45dp";
  	frmNewDepositKA.frontCameraIcon.isVisible = false;
  	frmNewDepositKA.frontCameraLabel.text = i18n_retake;
  
  	// Release image from memory
  	 base64Image=null;
	frmNewDepositKA.frontCamera.releaseRawBytes();
}



function isChequeImagenotEmpty()
{
  if (userAgent === "iPhone"){
  	  if (frmNewDepositKA.frontImageCapture.base64!==null && frmNewDepositKA.backImageCapture.base64 !==null)
        return true;
      else
        return false;
    } 
  else{
     
      if (frmNewDepositKA.frontImageCapture.rawBytes!==null && frmNewDepositKA.backImageCapture.rawBytes !==null)
        return true;
      else
        return false;
    }
}

// Back Image Capture
function saveBackOfCheckImage() {
  	userAgent = kony.os.userAgent();
  	var rawBytes = frmNewDepositKA.backCamera.rawBytes;
    var base64Image = kony.convertToBase64(rawBytes);

  
    if (userAgent === "iPhone" || userAgent === "iPad"){
       // set base64Image to backImageCapture
  	   frmNewDepositKA.backImageCapture.base64 = base64Image;
    } else{
      // set rawBytes incase of Android
       frmNewDepositKA.backImageCapture.rawBytes = rawBytes;
    }
  	
  
  	// Display image, change text
  	frmNewDepositKA.backImageWrap.height = "100dp";	
  	frmNewDepositKA.backCameraWrap.top = "5dp";
  	frmNewDepositKA.backCameraWrap.height = "45dp";
  	frmNewDepositKA.backCameraIcon.isVisible = false;
  	frmNewDepositKA.backCameraLabel.text = i18n_retake;
  
  	// Release image from memory
 	base64Image=null;
  	frmNewDepositKA.backCamera.releaseRawBytes();
}

function resetDepositLandingCameras(){
  userAgent = kony.os.userAgent();
  if (userAgent === "iPhone" || userAgent === "iPad"){
  	frmNewDepositKA.frontImageCapture.base64 = null;
    frmNewDepositKA.backImageCapture.base64 = null;
    }
  else{
  frmNewDepositKA.frontImageCapture.rawBytes = null;
  frmNewDepositKA.backImageCapture.rawBytes = null;}
  	frmNewDepositKA.frontImageWrap.height = "0dp";	
  	frmNewDepositKA.frontCameraWrap.top = "0dp";
  	frmNewDepositKA.frontCameraWrap.height = "100dp";
  	frmNewDepositKA.frontCameraIcon.isVisible = true;
  	frmNewDepositKA.frontCameraLabel.text = i18n_takePhoto;
  
  	
  	frmNewDepositKA.backImageWrap.height = "0dp";
  	frmNewDepositKA.backCameraWrap.top = "0dp";
  	frmNewDepositKA.backCameraWrap.height = "100dp";
  	frmNewDepositKA.backCameraIcon.isVisible = true;
  	frmNewDepositKA.backCameraLabel.text = i18n_takePhoto;
}

///////////////////////////////////////
/// Show/Hide Deposit Instructions
///////////////////////////////////////

function openDepositInstructions() {
  frmNewDepositKA.depositInstructionsContainer.isVisible = true;
  frmNewDepositKA.depositInstructionsContainer.animate(
        kony.ui.createAnimation({"100":{"top": "0%","stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": duration},
        {"animationEnd": function () {}}
   );
   frmNewDepositKA.enableScrolling = false;
}

// Save button or Cancel
function closeDepositInstructions(){
   frmNewDepositKA.depositInstructionsContainer.animate(
        kony.ui.createAnimation({"100":{"top": "100%","stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": duration},
        {"animationStart": function () {},
         "animationEnd": function () {frmNewDepositKA.depositInstructionsContainer.isVisible = false;}}
    );
      frmNewDepositKA.enableScrolling = true;
      frmNewDepositKA.enableScrolling = true;
}
