function saveProfilePicture() {
   var rawBytes = frmUserSettingsEditPersonalDetailsKA.cameraKA.rawBytes;
   var base64Image = kony.convertToBase64(rawBytes);
   if (kony.retailBanking.globalData.deviceInfo.isIphone()){
  	   frmUserSettingsEditPersonalDetailsKA.imgProfileKA.base64 = base64Image;
       frmUserSettingsPersonalDetailsKA.Image0c4b744183a2d47.base64=base64Image;	
    } else{
       frmUserSettingsEditPersonalDetailsKA.imgProfileKA.rawBytes = rawBytes;
       frmUserSettingsPersonalDetailsKA.Image0c4b744183a2d47.rawBytes=rawBytes;
    }
  	
 // Release image from memory
 	base64Image=null;
  	frmUserSettingsEditPersonalDetailsKA.cameraKA.releaseRawBytes();
}


function openMediaGallery()
{
    try {
        var querycontext = {mimetype:"image/*"};
        returnStatus = kony.phone.openMediaGallery(onSuccessSelectionCallback, querycontext);

    }catch(err){
        alert("error in openMediaGallery:: "+err);
    }

}

function onSuccessSelectionCallback(rawbytes)
{
		if (rawbytes === null)
		{
			alert("nothing selected");
			return;
		}
		var base64 = kony.convertToBase64(rawbytes);
		frmUserSettingsEditPersonalDetailsKA.imgProfileKA.base64 = base64;
 		frmUserSettingsPersonalDetailsKA.Image0c4b744183a2d47.base64=base64;
}


