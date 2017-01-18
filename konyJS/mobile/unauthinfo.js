function onClickunauthseg(  ){
 
	var selectedItem = frmUnauthInformationKA.unauthInformationSegment.selectedIndex[1];
 
	if((selectedItem != null)){
     
			segSelectedFrmunauth(selectedItem);
		
	}
}


function segSelectedFrmunauth( rowIdentifier ){
 infostatus=1;
	if((rowIdentifier === 0)){	
       onClickFaqs();
	}else if(rowIdentifier == 1){		
      	onClickTandC();
	}
  else{
    	onClickPrivacyPolicy();
  }
    
}

function gotoparentInfo()
{
  	if(infostatus == 1)
      {
        infostatus=0;
        frmUnauthInformationKA.show();
      }
  else if(gblfrmName == "Account Overview"){
    
    frmAccountDetailKA.show();
   
  }
  else
    {
    gblfrmName="";
    frmMoreLandingKA.show();
    }
}