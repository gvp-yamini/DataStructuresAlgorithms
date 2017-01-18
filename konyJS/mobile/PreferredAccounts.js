var transferAcc = [];
var depositAcc = [];
var paymentAcc = [];
var selectedPaymentAccID;
var selectedAccountName;
var accountType="";
var rowIndex;


function getPreferredAccounts(){
  var totalAccounts = kony.retailBanking.globalData.accounts.getAccountsData();
  var settingsAcntData=kony.store.getItem("settingsflagsObject");
  transferAcc = [];
  depositAcc = [];
  paymentAcc = [];
  for (var i =0 ; i < totalAccounts.length; i++){
    if(totalAccounts[i].supportBillPay == "1"){
            var temp = {};
            temp.accountId=totalAccounts[i].accountID;
            temp.nickName=totalAccounts[i].nickName;
          if(totalAccounts[i].accountID === settingsAcntData.DefaultPaymentAcctNo)
                  temp.imgicontick='check_blue.png';
            else
                  temp.imgicontick='';
            paymentAcc.push(temp);
    }
    if(totalAccounts[i].supportDeposit == "1"){
            var temp1 = {};
          temp1.accountId=totalAccounts[i].accountID;
            temp1.nickName=totalAccounts[i].nickName;
            if(totalAccounts[i].accountID === settingsAcntData.DefaultDepositAcctNo)
                  temp1.imgicontick='check_blue.png';
            else
                  temp1.imgicontick='';
            depositAcc.push(temp1);
    }
    if(totalAccounts[i].supportTransferFrom == "1"){
          var temp2 = {};
          temp2.accountId=totalAccounts[i].accountID;
            temp2.nickName=totalAccounts[i].nickName;
          if(totalAccounts[i].accountID === settingsAcntData.DefaultTransferAcctNo)
              temp2.imgicontick='check_blue.png';
          else
                temp2.imgicontick='';
            transferAcc.push(temp2);
    }
  }
  
}

function setDefaultAcntsData(whichAccount)
{
  
  frmPreferredAccountsKA.ForTransfers.widgetDataMap={
              lblPageNameKA:"nickName",
              HiddenLbl:"accountId",
          imgicontick:"imgicontick"
                             };
   frmPreferredAccountsKA.ForTransfers.setData(whichAccount);
   
}

function onSelectPreferedAcnt()
{
    var preferedAcntData=frmPreferredAccountsKA.ForTransfers.data;
    frmPreferredAccountsKA.ForTransfers.widgetDataMap={
              lblPageNameKA:"nickName",
              HiddenLbl:"accountId",
          imgicontick:"imgicontick"
                             };
  var selectedAcnt = frmPreferredAccountsKA.ForTransfers.selectedRowIndex[1];
  for (i = 0; i < preferedAcntData.length; i++)
    {
    if(selectedAcnt == i)
        preferedAcntData[i].imgicontick='check_blue.png';
    else
        preferedAcntData[i].imgicontick='';
    }
    selectedAccountName=frmPreferredAccountsKA.ForTransfers.selectedItems[0].nickName;
    selectedPaymentAccID = frmPreferredAccountsKA.ForTransfers.selectedItems[0].accountId;
    frmPreferredAccountsKA.ForTransfers.setData(preferedAcntData);

}


function preferredAccountsSave(){
  var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
  var options ={    "access": "online",
                "objectName": "RBObjects"
               };
  var headers = {"session_token":kony.retailBanking.globalData.session_token};
  var serviceName = "RBObjects";
  var modelObj = INSTANCE.getModel("User",serviceName,options);
  var record = {};
  record[selectedAcntType] = selectedPaymentAccID;
  var dataObject = new kony.sdk.dto.DataObject("User",record);
  var requestOptions = {"dataObject":dataObject, "headers":headers};
  ShowLoadingScreen();
  modelObj.update(requestOptions,updatePreferredAccountsSuccess, updatePreferredAccountsError);
}

function updatePreferredAccountsSuccess(response)
{
  setUserObj(succcallback);
  function succcallback(){
  data= {"lblSettingsNameKA":accountType,"lblSettingsStatusKA":selectedAccountName,"imgProgressKey":"right_chevron_icon.png"};
  frmUserSettingsKA.userSettingsSegment.setDataAt(data,rowIndex,2);
  frmUserSettingsKA.show();
  kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
  }


}

function updatePreferredAccountsError(err)
{
  customErrorCallback(err);
}
