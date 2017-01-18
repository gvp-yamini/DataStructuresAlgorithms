function frmTransferDetailsKA_onDone(){
  var formid = kony.application.getPreviousForm().id;
  kony.print("formid"+ formid );
  
if(formid== "frmSearchKA")
  frmSearchKA.show();
else if(formid== "frmRecentTransfersKA")
  frmRecentTransfersKA.show();
else if(formid== "frmScheduledTransfersKA")
  frmScheduledTransfersKA.show();
else if(formid== "frmDashboardKA")
  frmDashboardKA.show();
else if(formid== "frmActivityKA")
  frmActivityKA.show();
else if(formid=="frmOtherFinancialKA")
  frmOtherFinancialKA.show();

}

function onclickseglabels()
{
  if (messagefrm==1 || messagefrm==2)
    {
      XXCopyNewMessage.show();
      messagefrm=0;
    }
}

function onclicksegimage()
{
  if (messagefrm==1 || messagefrm==2)
    {
      XXDeletedMessages.show();
       messagefrm=0;
    }
}

function onclicksegbtn()
{
  if (messagefrm==1 || messagefrm==2){
    XXNewMessage.show();
     messagefrm=0;  
  }
  else if( messagefrm==4)
    {
      XXDeletedMessages.show();
       messagefrm=0;
    }
  else if( messagefrm==3)
    {
       XXDeletedMessages.show();
       messagefrm=0;
    }
  
}