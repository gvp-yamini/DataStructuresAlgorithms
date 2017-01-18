//Type your code here
kony=kony || {}
kony.RB=kony.RB || {}

function setVisibiltyForButton(formObj,btnObj,booleanFlag)
{
  formObj[btnObj].setVisibility(booleanFlag)
}

function navigateTonextImg()
{
//   setVisibiltyForButton(frmLoginKA,"btnLeftArrowKA",true);
  if(kony.RB.selectedIndex===kony.RB.totalImgCount-1)
    {
      kony.RB.selectedIndex = 0;
//       setVisibiltyForButton(frmLoginKA,"btnRightArrowKA",false)              
    }  else{
      kony.RB.selectedIndex=kony.RB.selectedIndex+1 ;
    }
    frmLoginKA.segImageContainerKA.setData([kony.RB.globalImgData[kony.RB.selectedIndex]])
}
function navigateToPreviousImg()
{
   if(kony.RB.selectedIndex===0)
    {
      kony.RB.selectedIndex=kony.RB.totalImgCount-1;
//       setVisibiltyForButton(frmLoginKA,"btnLeftArrowKA",false)              
    }  else{
//   setVisibiltyForButton(frmLoginKA,"btnRightArrowKA",true);
  kony.RB.selectedIndex=kony.RB.selectedIndex-1; }   
  frmLoginKA.segImageContainerKA.setData([kony.RB.globalImgData[kony.RB.selectedIndex]])
 
    
}

function setConfigForImg()
{
//Todo	
disableBackButton();
kony.RB.totalImgCount=kony.RB.globalImgData.length;
kony.RB.selectedIndex=0
frmLoginKA.segImageContainerKA.setData([kony.RB.globalImgData[kony.RB.selectedIndex]])
// setVisibiltyForButton(frmLoginKA,"btnLeftArrowKA",false);
// if(kony.RB.totalImgCount <=1){
//   frmLoginKA.btnRightArrowKA.setVisibility(false);
// }form.flxMainFotterContainerKA.lblVersionNumberKA.text = appConfig.appVersion;
if(localStorage.getItem('username')!=null)
	frmLoginKA.usernameTextField.text = localStorage.getItem('username');
frmLoginKA.passwordTextField.text = "";	
  
}

function timerFunc() //nested function
{
    navigateTonextImg();
}

function disableBackButton()
{
  history.pushState(null, null,null);
  window.addEventListener('popstate', function () {
  history.pushState(null, null, null);
});
}

 function performSwipe()
{
//   alert("hi");
  
}