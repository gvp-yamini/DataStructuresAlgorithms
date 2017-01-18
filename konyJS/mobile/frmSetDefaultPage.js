
function setDefaultPage(){
  	  var defaultData = frmSetDefaultPageKA.loginSettingsSegmentAndroid.data;
      var defaultVal="";//=frmSetDefaultPageKA.loginSettingsSegmentAndroid.data."lblPageNameKA";
      if(frmSetDefaultPageKA.loginSettingsSegmentAndroid.selectedRowIndex[1]=== 0){
        defaultData[0].imgicontick = 'check_blue.png';
        defaultData[1].imgicontick = '';
        defaultData[2].imgicontick = '';
        defaultData[3].imgicontick = '';
        defaultVal="frmAccountsLandingKA";//frmSetDefaultPageKA.loginSettingsSegmentAndroid.selectedRowIndex[0].lblPageNameKA;//"Accounts";
      }
      else if(frmSetDefaultPageKA.loginSettingsSegmentAndroid.selectedRowIndex[1]== 1){
        defaultData[0].imgicontick = '';
        defaultData[1].imgicontick = 'check_blue.png';
        defaultData[2].imgicontick = '';
        defaultData[3].imgicontick = '';
        defaultVal="frmTransferPayLandingKA";
      }
      else if(frmSetDefaultPageKA.loginSettingsSegmentAndroid.selectedRowIndex[1]== 2){
        defaultData[0].imgicontick = '';
        defaultData[1].imgicontick = '';
        defaultData[2].imgicontick = 'check_blue.png';
        defaultData[3].imgicontick = '';
      defaultVal="frmDepositPayLandingKA";
      }
      else if(frmSetDefaultPageKA.loginSettingsSegmentAndroid.selectedRowIndex[1]== 3){
        defaultData[0].imgicontick = '';
        defaultData[1].imgicontick = '';
        defaultData[2].imgicontick = '';
        defaultData[3].imgicontick = 'check_blue.png';
        defaultVal="frmMyMoneyListKA";
      }
      frmSetDefaultPageKA.loginSettingsSegmentAndroid.setData(defaultData);
  	  updateFlags("defaultScreenEnum",defaultVal);
  	  frmUserSettingsKA.show();
}