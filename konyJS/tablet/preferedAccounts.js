var transferAcc = [];
var depositAcc = [];
var paymentAcc = [];
var selectedPaymentAccID;
var selectedAcntType=" ";
var accountType="";
var selectedAccountName="";
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
  
   userSettings.ForTransfers.widgetDataMap={
              lblPageNameKA:"nickName",
              HiddenLbl:"accountId",
     		  imgicontick:"imgicontick"
                             };
   userSettings.ForTransfers.setData(whichAccount);
   
}

function onSelectPreferedAcnt()
{
  	var preferedAcntData=frmUserSettingsKA.ForTransfers.data;
   frmUserSettingsKA.ForTransfers.widgetDataMap={
              lblPageNameKA:"nickName",
              HiddenLbl:"accountId",
     		  imgicontick:"imgicontick"
                             };
	var selectedAcnt = frmUserSettingsKA.ForTransfers.selectedRowIndex[1];
	for (i = 0; i < preferedAcntData.length; i++)
    {
		if(selectedAcnt == i)
    		preferedAcntData[i].imgicontick='check_blue.png';
		else
    		preferedAcntData[i].imgicontick='';
  	}
    selectedAccountName = frmUserSettingsKA.ForTransfers.selectedItems[0].nickName;
  	selectedPaymentAccID = frmUserSettingsKA.ForTransfers.selectedItems[0].accountId;
    frmUserSettingsKA.ForTransfers.setData(preferedAcntData);
    preferredAccountsSave();
  	
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
  modelObj.update(requestOptions, updatePreferredAccountsSuccess, updatePreferredAccountsError);
}

function updatePreferredAccountsSuccess(response)
{
  setUserObj();
  data= {"lblSettingsNameKA":accountType,"lblSettingsStatusKA":selectedAccountName,"imgProgressKey":"right_chevron_icon.png"};
  frmUserSettingsKA.segSettingsKA.setDataAt(data,rowIndex,2);
  frmUserSettingsKA.segSettingsKA.selectedRowIndex=[2,rowIndex];

}

function updatePreferredAccountsError(err)
{
  customErrorCallback(err);
}
