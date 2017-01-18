function getNewMessagePopup()
{
  
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var listcontroller = INSTANCE.getFormController("frmNewMessageKA");
  var navObject = new kony.sdk.mvvm.NavigationObject();
  navObject.setDataModel(null, kony.sdk.mvvm.OperationType.ADD, "form");
  navObject.setRequestOptions("form",{"headers":{"session_token":kony.retailBanking.globalData.session_token}});
  listcontroller.performAction("loadDataAndShowForm",[navObject]);
}



//Used For Closing NewMessage Popup
function closeNewMessagePopup()
{
closeModal("newMsgWrapper",frmNewMessageKA);
}

//used ForGetting InboxMessageContainer
function getInboxMessaageContainer()
{
  frmMessagesKA.flxInboxWrapperKA.animate(
    kony.ui.createAnimation({"100":{"left": "38%","stepConfig":{"timingFunction": easeIn}}}),
    {"fillMode": forwards, "duration": duration},
    {"animationStart": function () {},
     "animationEnd": function () {  
     }}
  );
  frmMessagesKA.flxDraftWrapperKA.animate(
    kony.ui.createAnimation({"100":{"left": "200%","stepConfig":{"timingFunction": easeIn}}}),
    {"fillMode": forwards, "duration": duration},
    {"animationStart": function () {},
     "animationEnd": function () {  
     }}
  );
 
}


//used ForGetting DraftMessageContainer
function getDraftMessaageContainer()
{
  frmMessagesKA.flxInboxWrapperKA.animate(
    kony.ui.createAnimation({"100":{"left": "200%","stepConfig":{"timingFunction": easeIn}}}),
    {"fillMode": forwards, "duration": duration},
    {"animationStart": function () {},
     "animationEnd": function () {  
     }}
  );
  frmMessagesKA.flxDraftWrapperKA.animate(
    kony.ui.createAnimation({"100":{"left": "38%","stepConfig":{"timingFunction": easeIn}}}),
    {"fillMode": forwards, "duration": duration},
    {"animationStart": function () {},
     "animationEnd": function () {  
     }}
  );
 
}


  
  //Used to close Popup click
  function closeMessagePopup()
  {
    var deviceName = kony.os.deviceInfo().name.toLowerCase();
    if ( deviceName == "android"){  
      androidMenu.show();
    }else
    {
      	 rightContainer = "rightWrapper";
         //accountsLanding.destroy();
         accountLanding();
    }
  }

