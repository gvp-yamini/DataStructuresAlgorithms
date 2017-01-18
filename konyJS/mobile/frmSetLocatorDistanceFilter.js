var locatorRange="";
function setLocatorRange(){
  	  var defaultData = frmSetLocatorDistanceFilterKA.LocatorDistanceSegmentAndroid.data;
      
      if(frmSetLocatorDistanceFilterKA.LocatorDistanceSegmentAndroid.selectedRowIndex[1]=== 0){
        defaultData[0].imgicontick = 'check_blue.png';
        defaultData[1].imgicontick = '';
        defaultData[2].imgicontick = '';
        defaultData[3].imgicontick = '';
        defaultData[4].imgicontick = '';
        locatorRange="5 Miles";
      }
      else if(frmSetLocatorDistanceFilterKA.LocatorDistanceSegmentAndroid.selectedRowIndex[1]== 1){
        defaultData[0].imgicontick = '';
        defaultData[1].imgicontick = 'check_blue.png';
        defaultData[2].imgicontick = '';
        defaultData[3].imgicontick = '';
        defaultData[4].imgicontick = '';
        locatorRange="10 Miles";
      }
      else if(frmSetLocatorDistanceFilterKA.LocatorDistanceSegmentAndroid.selectedRowIndex[1]== 2){
        defaultData[0].imgicontick = '';
        defaultData[1].imgicontick = '';
        defaultData[2].imgicontick = 'check_blue.png';
        defaultData[3].imgicontick = '';
        defaultData[4].imgicontick = '';
        locatorRange="25 Miles";
      }
      else if(frmSetLocatorDistanceFilterKA.LocatorDistanceSegmentAndroid.selectedRowIndex[1]== 3){
        defaultData[0].imgicontick = '';
        defaultData[1].imgicontick = '';
        defaultData[2].imgicontick = '';
        defaultData[3].imgicontick = 'check_blue.png';
        defaultData[4].imgicontick = '';
        locatorRange="50 Miles";
      }
  	 else if(frmSetLocatorDistanceFilterKA.LocatorDistanceSegmentAndroid.selectedRowIndex[1]== 4){
        defaultData[0].imgicontick = '';
        defaultData[1].imgicontick = '';
        defaultData[2].imgicontick = '';
        defaultData[3].imgicontick = '';
        defaultData[4].imgicontick = 'check_blue.png';
        locatorRange="100 Miles";
      }
  	 kony.print(locatorRange);
      frmSetLocatorDistanceFilterKA.LocatorDistanceSegmentAndroid.setData(defaultData);
}