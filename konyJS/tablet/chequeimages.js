function imagechangefront()
{
   frmchequeimages.frontImage.setVisibility(true);
   frmchequeimages.backImage.setVisibility(false);
  frmchequeimages.enableAp.skin="primaryAction";
 frmchequeimages.btnBack.skin="BackSkin";
   
  
}


function imagechangeback()
{
    frmchequeimages.frontImage.setVisibility(false);
    frmchequeimages.backImage.setVisibility(true);
    frmchequeimages.enableAp.skin="BackSkin";
    frmchequeimages.btnBack.skin="primaryAction";
}


function setCheckImagesUrl(whichImage,imageSide)
{
 
  var checkUrl="http://pmqa.konylabs.net/KonyWebBanking/tablet/"+whichImage;
   var deviceData =  getDeviceInfo();
  if(deviceData.name === "iPad"){
    /*if(deviceData.model.indexOf("iPad") > -1)
      checkUrl = checkUrl+".png";
    else if(deviceData.model.indexOf("iPhone 5") > -1)
      checkUrl = checkUrl+"@2x.png";
    else if(deviceData.model.indexOf("iPhone 6") > -1)*/
      checkUrl = checkUrl+".png";
  }
  else
     checkUrl = checkUrl+".png";
  if (imageSide==0)
  	frmchequeimages.frontImage.src=checkUrl;
  else
    frmchequeimages.backImage.src=checkUrl;
}


var accountinfotrans=0;
function gotoparentcheque()
{
 var previousForm=kony.application.getPreviousForm();
  	if(previousForm.id==="frmRecentDepositKA")
      	frmRecentDepositKA.show();
   else
   frmtransactionChequeKA.show();
}

function gotoparenttransaction()
{
  if(from == "MyMoney"){
    from = "transaction";
    onClickflxJanMnthKA();
    frmMyMoneyListKA.show();
  }
  else if (accountinfotrans==1){
    frmAccountDetailKA.show();
    accountinfotrans=0;
  }
  else if(from == "search"){
    from = "";
    frmSearchKA.show();
  }
 else if(accountinfotrans==2){
  from = "transaction";
    onClickflxJanMnthKA();
    frmMyMoneyListKA.show();
   accountinfotrans=0;
 }
  else
    {
      frmTransferPayLandingKA.show();
    }
}