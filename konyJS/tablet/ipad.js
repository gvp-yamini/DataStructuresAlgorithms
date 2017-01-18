
///////////
//iPad Transfer and Pay js
///////////


var rightContainer;
var currOrientation;

///////////////////////////////////
// Destroy form onHide
///////////////////////////////////
function onFormHide(){
  if(userAgent== "ipad"){
    CurrForm = kony.application.getCurrentForm();
    CurrForm.destroy();
  }
}



function setRightContainer(){
  CurrForm = kony.application.getCurrentForm();
  rightContainer = "rightWrapper";
}



///////////////////////////////////
// onClick action to open right panel
///////////////////////////////////
function addRightPanel(addWidgetForm,addWidget) {

  CurrForm = kony.application.getCurrentForm();


  if (rightContainer !== addWidget){ 
    if(CurrForm[addWidget])
      {
    CurrForm.remove(addWidgetForm);
      }
    CurrForm.add(addWidgetForm);
    CurrForm[addWidget].width = rightContainerWidth;
    CurrForm[addWidget].opacity = 1;
    //CurrForm[addWidget].left = "100%";
    //overlayRightPanel(addWidget);
    CurrForm[addWidget].left = leftContainerWidth;
    hideOriginalPanel(rightContainer);
    rightContainer = addWidget;
  }
}


function overlayRightPanel(addWidget) {

  currOrientation = kony.os.getDeviceCurrentOrientation();
  CurrForm[addWidget].animate(
    kony.ui.createAnimation({100:
                             {"left": leftContainerWidth, "opacity": 1, "stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards, duration:''},
    {animationEnd: function() {} });  
}

function hideOriginalPanel(hideWidget) {
  if(CurrForm[hideWidget] !== null){
    CurrForm[hideWidget].animate(
      kony.ui.createAnimation({100:
                               {"left": "100%","opacity": 0,"stepConfig":{"timingFunction": easeOut}}}),
      {fillMode: forwards, duration: duration},
      {animationEnd: function() {} });
  }
}



////////////////////////////////////
// onClick action to close right panel
////////////////////////////////////

function closeRightPanel(removeWidget,showWidget) {
  CurrForm = kony.application.getCurrentForm();
  if(CurrForm[removeWidget] !==null)
    CurrForm[removeWidget].animate(
      kony.ui.createAnimation({100:
                               {"left": '100%',"stepConfig":{"timingFunction": easeOut}}}),
      {fillMode: forwards ,duration:duration},
      {animationEnd: function() {
        //  CurrForm.remove( CurrForm[removeWidget]);
      } });
  showOriginalPanel(showWidget);
  rightContainer = showWidget;
}

function closeRightPanelTransferPanel(removeWidget,showWidget) {
   transferPayLanding.show();
  //CurrForm = kony.application.getCurrentForm();
  getOrientation();
  if(transferPayLanding[removeWidget] !==null)
    {
       transferPayLanding[removeWidget].animate(
      kony.ui.createAnimation({100:
                               {"left": '100%',"opacity": 0,"stepConfig":{"timingFunction": easeOut}}}),
      {fillMode: forwards ,duration:duration},
      {animationEnd: function() {
         // transferPayLanding.remove( transferPayLanding[removeWidget]);
      } });
    }
    
 // transferPayLanding[removeWidget].opacity = 0;
 // transferPayLanding["rightWrapper"].opacity = 1;
  leftContainerWidth = transferPayLanding.leftWrapper.width;
  
   transferPayLanding.rightWrapper.animate(
      kony.ui.createAnimation({100:
                               {"left": '100%',"opacity": 1,"stepConfig":{"timingFunction": easeOut}}}),
      {fillMode: forwards ,duration:duration},
      {animationEnd: function() {
         // transferPayLanding.remove( transferPayLanding[removeWidget]);
      } });
  rightContainer = transferPayLanding.rightWrapper;

}



function showOriginalPanel(showWidget) {
  currOrientation = kony.os.getDeviceCurrentOrientation();
  if(CurrForm[showWidget] !== null){
    CurrForm[showWidget].animate(
      kony.ui.createAnimation({100:
                               {"left": leftContainerWidth,"opacity": 1,"stepConfig":{"timingFunction": easeOut}}}),
      {fillMode: forwards ,duration:duration},
      {animationEnd: function() {} });
  }
}






// tabletTitleBar shrinking and expaning
/*
function leftTitleBar() {
  	CurrForm  = kony.application.getCurrentForm();
  	currOrientation = kony.os.getDeviceCurrentOrientation();

  	CurrForm.tabletTitleBar.animate(
        kony.ui.createAnimation({100:
        {"width": leftContainerWidth,"stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards ,duration: duration},
        {animationEnd: function() {} });
}

function fullTitleBar() {
  	CurrForm  = kony.application.getCurrentForm();
  	CurrForm.tabletTitleBar.animate(
        kony.ui.createAnimation({100:
        {"width": "100%","stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards ,duration: duration},
        {animationEnd: function() {} });
}*/




/////////////////////////////
// Modal Animations
/////////////////////////////

//open modal onClick

function openModal(addWidgetForm,addWidget){
  CurrForm  = kony.application.getCurrentForm();

  if (!CurrForm[addWidget]){
    CurrForm.add(addWidgetForm);
    CurrForm[addWidget].opacity = 1;

    CurrForm[addWidget].animate(
      kony.ui.createAnimation({100:
                               {"opacity": 1,"stepConfig":{"timingFunction": easeOut}}}),
      {fillMode: forwards, duration:0.3},
      {animationEnd: function() {} });
  }
}

//close modal onClick

function closeModal(removeWidget,destroyForm){
  CurrForm  = kony.application.getCurrentForm();
  var destroyThisForm = destroyForm;    

  if (removeWidget === "externalAccountWrapper" || removeWidget === "newPayeeWrapper"){
    CurrForm.bttnSubmitKA.skin = primaryActionFocus;
  }

 if(CurrForm[removeWidget] !==null)
   {
     CurrForm[removeWidget].animate(
    kony.ui.createAnimation({100:
                             {"opacity": 0,"stepConfig":{"timingFunction": easeOut}}}),
    {fillMode: forwards, duration:0.3},
    {animationEnd: function() {
      CurrForm.remove(CurrForm[removeWidget]);
      /*if(userAgent== "iPad"){
      destroyThisForm.destroy();
      }*/
    } });
   }
  
}

//hide back button on preShow modal with multiple screens
function hideModalBackButton(){
  CurrForm  = kony.application.getCurrentForm();
  if(CurrForm.backButton !== null)
  {
    CurrForm.backButton.opacity = 0;
    CurrForm.backButton.isVisible = false;
  }else if(CurrForm.buttonLeft !== null)
  {
    CurrForm.buttonLeft.opacity = 0;
    CurrForm.buttonLeft.isVisible = false;
  }
}

function animateBackButtonIn(){
  CurrForm  = kony.application.getCurrentForm();
  if(userAgent === "ipad")
  {
    CurrForm.backButton.animate(
      kony.ui.createAnimation({100:
                               {"opacity": 1,"stepConfig":{"timingFunction": easeOut}}}),
      {fillMode: forwards ,duration: 0.3, "delay": 0.1},
      {animationEnd: function() {CurrForm.backButton.isVisible = true;} });
  }else
  {
    if(CurrForm.buttonLeft !==null)
    {
      CurrForm.buttonLeft.animate(
        kony.ui.createAnimation({100:
                                 {"opacity": 0,"stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards ,duration: 0.3},
        {animationEnd: function() {
          CurrForm.buttonLeft.isVisible = false;
        } }); 
    }else  if(CurrForm.androidBack !==null)
    {
      CurrForm.androidBack.animate(
        kony.ui.createAnimation({100:
                                 {"opacity": 0,"stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards ,duration: 0.3},
        {animationEnd: function() {
          CurrForm.androidBack.isVisible = false;
        } }); 
    }

  }

}

function animateBackButtonOut(){
  if(userAgent === "ipad")
  {
    CurrForm.backButton.animate(
      kony.ui.createAnimation({100:
                               {"opacity": 0,"stepConfig":{"timingFunction": easeOut}}}),
      {fillMode: forwards ,duration: 0.3},
      {animationEnd: function() {
        CurrForm.backButton.isVisible = false;
      } });
  }else
  {
    if(CurrForm.buttonLeft !==null)
    {
      CurrForm.buttonLeft.animate(
        kony.ui.createAnimation({100:
                                 {"opacity": 0,"stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards ,duration: 0.3},
        {animationEnd: function() {
          CurrForm.buttonLeft.isVisible = false;
        } }); 
    }else  if(CurrForm.androidBack !==null)
    {
      CurrForm.androidBack.animate(
        kony.ui.createAnimation({100:
                                 {"opacity": 0,"stepConfig":{"timingFunction": easeOut}}}),
        {fillMode: forwards ,duration: 0.3},
        {animationEnd: function() {
          CurrForm.androidBack.isVisible = false;
        } }); 
    }

  }

}



/////////////////////////////
// Orientation Change Animations
/////////////////////////////


var leftContainerWidth;
var rightContainerWidth;

function onOrientationChange(CurrForm){

  //CurrForm  = kony.application.getCurrentForm();
  getOrientation();


  CurrForm.leftWrapper.width = leftContainerWidth;
  if(CurrForm[rightContainer]!==null)
  {
    CurrForm[rightContainer].left = leftContainerWidth;
    CurrForm[rightContainer].width = rightContainerWidth;  
  }

}

function getOrientation(){
  currOrientation = kony.os.getDeviceCurrentOrientation();

  if (currOrientation===1){
    //Landscape
    leftContainerWidth = "38%";
    rightContainerWidth = "62%";
  } else {
    //Portrait
    leftContainerWidth = "42%";
    rightContainerWidth = "58%";
  } 
}
