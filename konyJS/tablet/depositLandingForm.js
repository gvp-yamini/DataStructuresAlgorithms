function depositlInit(){
    toCardHeightDeposit = depositLanding.toCard.height;
}

function depositPreShow(){
  	
 
    // setup fromCard
   
    depositLanding.toCard.height = defaultCardHeight;
    depositLanding.toLabel.left = labelLeft;
	
  	// load initial account data
    
  
 	// setup amountCard
  	depositLanding.amountPick.opacity = 0;
  	depositLanding.amountPickContainer.top = "100%";
}



//deposit reset on Cancel
function depositCancel(){
    depositLanding.toNamePick.text = account1.name;
    depositLanding.toAmountPick.text = account1.avlBalance;
    depositLanding.toAccountColorPick.backgroundColor = account1.color;

    depositLanding.amountTextField.text = null;
    depositLanding.noteTextfield.text = null;
    editAmountCard(depositLanding);
    resetDepositLandingCameras();
}


//////////////////////////////////
/// Camera Logic
//////////////////////////////////

// Front Image Capture
function saveFrontOfCheckImage() {
    userAgent = kony.os.userAgent();

    var rawBytes = depositLanding.frontCamera.rawBytes;
    var base64Image = kony.convertToBase64(rawBytes);

      if (userAgent === "iPhone" || userAgent === "iPad"){
       // set base64Image to frontImageCapture
        depositLanding.frontImageCapture.base64 = base64Image;
    } else{
      // set rawBytes incase of Android
       depositLanding.frontImageCapture.rawBytes = rawBytes;
    }

      // Display image, change text
      depositLanding.frontImageWrap.height = "125dp";
      depositLanding.frontCameraWrap.top = "5dp";
      depositLanding.frontCameraWrap.height = "45dp";
      depositLanding.frontCameraIcon.isVisible = false;
      depositLanding.frontCameraLabel.text =i18n_retake;
  	  depositLanding.frontCameraLabel.bottom = "0dp";

      // Release image from memory
     base64Image=null;
      depositLanding.frontCamera.releaseRawBytes();
}

// Back Image Capture
function saveBackOfCheckImage() {
    userAgent = kony.os.userAgent();

    var rawBytes = depositLanding.backCamera.rawBytes;
    var base64Image = kony.convertToBase64(rawBytes);

    if (userAgent === "iPhone" || userAgent === "iPad"){
       // set base64Image to backImageCapture
         depositLanding.backImageCapture.base64 = base64Image;
    } else{
      // set rawBytes incase of Android
       depositLanding.backImageCapture.rawBytes = rawBytes;
    }

      // Display image, change text
      depositLanding.backImageWrap.height = "125dp";
      depositLanding.backCameraWrap.top = "5dp";
      depositLanding.backCameraWrap.height = "45dp";
      depositLanding.backCameraIcon.isVisible = false;
      depositLanding.backCameraLabel.text = i18n_retake;
	  depositLanding.backCameraLabel.bottom = "0dp";

      // Release image from memory
     base64Image=null;
      depositLanding.backCamera.releaseRawBytes();
}


function isChequeImagenotEmpty()
{
  if (userAgent === "iPad"){
  	  if (depositLanding.frontImageCapture.base64!==null && depositLanding.backImageCapture.base64 !==null)
        return true;
      else
        return false;
    } 
  else{
     
      if (depositLanding.frontImageCapture.rawBytes!==null && depositLanding.backImageCapture.rawBytes !==null)
        return true;
      else
        return false;
    }
}

function resetDepositLandingCameras(){
  	depositLanding.frontImageCapture.base64 = null;
  	depositLanding.frontImageWrap.height = "0dp";	
  	depositLanding.frontCameraWrap.top = "0dp";
  	depositLanding.frontCameraWrap.height = "125dp";
  	depositLanding.frontCameraIcon.isVisible = true;
  	depositLanding.frontCameraLabel.text = i18n_takePhoto;
  
  	depositLanding.backImageCapture.base64 = null;
  	depositLanding.backImageWrap.height = "0dp";
  	depositLanding.backCameraWrap.top = "0dp";
  	depositLanding.backCameraWrap.height = "125dp";
  	depositLanding.backCameraIcon.isVisible = true;
  	depositLanding.backCameraLabel.text = i18n_takePhoto;
}

///////////////////////////////////////
/// Show/Hide Deposit Instructions
///////////////////////////////////////

function openDepositInstructions() {
  depositLanding.depositInstructionsContainer.isVisible = true;
  depositLanding.depositInstructionsContainer.animate(
        kony.ui.createAnimation({"100":{"top": "0%","stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": duration},
        {"animationEnd": function () {}}
   );
   depositLanding.enableScrolling = false;
}

// Save button or Cancel
function closeDepositInstructions(){
   depositLanding.depositInstructionsContainer.animate(
        kony.ui.createAnimation({"100":{"top": "100%","stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": duration},
        {"animationStart": function () {},
         "animationEnd": function () {depositLanding.depositInstructionsContainer.isVisible = false;}}
    );
      depositLanding.enableScrolling = true;
}
