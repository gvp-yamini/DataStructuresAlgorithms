
function putAllDateRangesOff()
{

  frmSearchKA.ImgOneTimeKA.setVisibility(false);
  frmSearchKA.ImgDailyKA.setVisibility(false);
  // frmSearchKA.ImgSpecifyDaysKA.setVisibility(false);
  frmSearchKA.ImgWeeklyKA.setVisibility(false);
  frmSearchKA.ImgEvery2WeeksKA.setVisibility(false);
  frmSearchKA.ImgMonthlyKA.setVisibility(false);
}

function dateRangeOnClick(row)
{
  putAllDateRangesOff();
  switch(row)
  {
    case 1 :	if(!frmSearchKA.ImgOneTimeKA.isVisible)
    {	
      frmSearchKA.ImgOneTimeKA.setVisibility(true);
      frmSearchKA.flxCalenders.setVisibility(false);
      frmSearchKA.addExternalAccount.setVisibility(true);
      transactionDatePickerReset();
      getThisMonth();
    }
      break;
    case 2 :	if(!frmSearchKA.ImgDailyKA.isVisible)
    {	
      frmSearchKA.ImgDailyKA.setVisibility(true);
      frmSearchKA.flxCalenders.setVisibility(false);
      frmSearchKA.addExternalAccount.setVisibility(true);
      transactionDatePickerReset();
      getLastMonth();
    }
      break;
    case 3 :	if(!frmSearchKA.ImgWeeklyKA.isVisible)
    {	
      frmSearchKA.ImgWeeklyKA.setVisibility(true);
      frmSearchKA.flxCalenders.setVisibility(false);
      frmSearchKA.addExternalAccount.setVisibility(true);
      transactionDatePickerReset();
      getLastThirtyDays();
    }
      break;  
    case 4 :	if(!frmSearchKA.ImgEvery2WeeksKA.isVisible)
    {
      frmSearchKA.ImgEvery2WeeksKA.setVisibility(true);
      frmSearchKA.flxCalenders.setVisibility(false);
      frmSearchKA.addExternalAccount.setVisibility(true);
      getLastNintyDays();
      transactionDatePickerReset();
    }

      break; 
    case 5 :  if(!frmSearchKA.ImgMonthlyKA.isVisible)
    {
      transactionDatePickerReset();
      frmSearchKA.ImgMonthlyKA.setVisibility(true);
      frmSearchKA.flxCalenders.setVisibility(true);
    }
      break;         
  }
}

function selectDateRange()
{
  if(kony.retailBanking.globalData.deviceInfo.isIphone() || kony.retailBanking.globalData.deviceInfo.isIpad())
  {
    if(frmSearchKA.accountPreviewSwitch.selectedIndex)
    {
      dateRangeOnClick(1);
      frmSearchKA.flxFrequencySection.setVisibility(false);
    }else
    {
      frmSearchKA.flxFrequencySection.setVisibility(true);
    }

  }else
  {
    if(frmSearchKA.accountPreviewCheckBox.selectedKeyValues===null)
    {
      dateRangeOnClick(1);
      frmSearchKA.flxFrequencySection.setVisibility(false);
    }else
    {
      frmSearchKA.flxFrequencySection.setVisibility(true);
    }
  }

}

function selectAmountRange()
{
  if(kony.retailBanking.globalData.deviceInfo.isIphone() || kony.retailBanking.globalData.deviceInfo.isIpad())
  {
    if(frmSearchKA.CopyaccountPreviewSwitch06cb1ff51262e47.selectedIndex)
    {
      frmSearchKA.flxTbxAmountRangeKA.setVisibility(false);
    }else
    {
      frmSearchKA.flxTbxAmountRangeKA.setVisibility(true);
    }
  }else
  {
    if(frmSearchKA.CopyaccountPreviewCheckBox000e4265c453343.selectedKeyValues===null)
    {
      frmSearchKA.flxTbxAmountRangeKA.setVisibility(false);
    }else
    {
      frmSearchKA.flxTbxAmountRangeKA.setVisibility(true);
    }
  }

}

/**
 * @function
 *
 */
function selectCheckNumbers()
{
  if(kony.retailBanking.globalData.deviceInfo.isIphone() || kony.retailBanking.globalData.deviceInfo.isIpad())
  {
    if(frmSearchKA.CopyaccountPreviewSwitch076077c9f293046.selectedIndex)
    {
      frmSearchKA.flxTbxCheckNumbers.setVisibility(false);
    }else
    {
      frmSearchKA.flxTbxCheckNumbers.setVisibility(true);
    }
  }else
  {
    if(frmSearchKA.CopyaccountPreviewCheckBox099b080b2e85047.selectedKeyValues===null)
    {
      frmSearchKA.flxTbxCheckNumbers.setVisibility(false);
    }else
    {
      frmSearchKA.flxTbxCheckNumbers.setVisibility(true);
    }
  }

}

//frm serachKA Preshow()
function loadChangeDateRange()
{
  //frmSearchKA.mainContent.selectDateRange.setData(initialChangeDateRangeTypes);
}

//frm  loading for empty Image()
function changeDateRangeLoad()
{
  //frmSearchKA.mainContent.selectDateRange.setData(changeDateRangeTypes);
}
// frmSearchKA preShow
function loadSearchData(){
  frmSearchKA.accountFilter1.text = account1.name;
  frmSearchKA.accountFilter2.text = account2.name;
  frmSearchKA.accountFilter3.text = account3.name;
  frmSearchKA.accountFilter4.text = account4.name;

  frmSearchKA.searchResults.top = "100dp";
  frmSearchKA.searchResults.opacity = 0;
  frmSearchKA.lbldaterange.opacity = 0;
  frmSearchKA.btnchangedaterange.opacity = 0;
}


function onBeginEditing(searchType) {
  searchType.backButton.animate(
    kony.ui.createAnimation({"100":{"left": "-60dp","stepConfig":{"timingFunction": easeIn}}}),
    {"fillMode": forwards, "duration": duration},
    {"animationEnd": function () {}}
  );

  searchType.searchContainer.animate(
    kony.ui.createAnimation({"100":{"left": "2%", "width" :"80%", "stepConfig":{"timingFunction": easeIn}}}),
    {"fillMode": forwards, "duration": duration},
    {"animationEnd": function () {}}
  );
  searchType.utilContainer.animate(
    kony.ui.createAnimation({"100":{"opacity": 0, "stepConfig":{"timingFunction": easeIn}}}),
    {"fillMode": forwards, "duration": duration},
    {"animationEnd": function () {}}
  );
  searchType.cancelButton.animate(
    kony.ui.createAnimation({"100":{"right":"1.5%", "stepConfig":{"timingFunction": easeIn}}}),
    {"fillMode": forwards, "duration": duration},
    {"animationEnd": function () {}}
  );
}

function onEndEditing(searchType) {
  searchType.backButton.animate(
    kony.ui.createAnimation({"100":{"left": "0dp","stepConfig":{"timingFunction": easeIn}}}),
    {"fillMode": forwards, "duration": duration},
    {"animationEnd": function () {}}
  );
  searchType.searchContainer.animate(
    kony.ui.createAnimation({"100":{"left": "15%", "width" :"70%", "stepConfig":{"timingFunction": easeIn}}}),
    {"fillMode": forwards, "duration": duration},
    {"animationEnd": function () {}}
  );
  searchType.utilContainer.animate(
    kony.ui.createAnimation({"100":{"opacity": 1, "stepConfig":{"timingFunction": easeIn}}}),
    {"fillMode": forwards, "duration": duration},
    {"animationEnd": function () {}}
  );
  searchType.cancelButton.animate(
    kony.ui.createAnimation({"100":{"right":"-15%", "stepConfig":{"timingFunction": easeIn}}}),
    {"fillMode": forwards, "duration": duration},
    {"animationEnd": function () {}}
  );
  // frmSearchKA.lbldaterange.opacity = 1;
  // frmSearchKA.btnchangedaterange.opacity = 1;
}




function showDateRange(){
  frmSearchKA.mainSearch.animate(
    kony.ui.createAnimation({"100":{"left": "-100%","stepConfig":{"timingFunction": easeIn}}}),
    {"fillMode": forwards, "duration": duration},
    {"animationEnd": function () {}}
  );
  frmSearchKA.dateRangeSearch.setVisibility(true);
  frmSearchKA.mainSearch.setVisibility(false);
}

function hideDateRange(){
  frmSearchKA.mainSearch.animate(
    kony.ui.createAnimation({"100":{"left": "0%","stepConfig":{"timingFunction": easeIn}}}),
    {"fillMode": forwards, "duration": duration},
    {"animationEnd": function () {}}
  );
  frmSearchKA.mainSearch.setVisibility(true);
  frmSearchKA.dateRangeSearch.setVisibility(false);
}


function userEnteredSearchTerm(){
  frmSearchKA.innerResultsContainer.setEnabled(true);
  frmSearchKA.noSearchResults.animate(
    kony.ui.createAnimation({"100":{"opacity": 0,"stepConfig":{"timingFunction": easeIn}}}),
    {"fillMode": forwards, "duration": duration},
    {"animationEnd": function () {}}
  );
  frmSearchKA.searchResults.animate(
    kony.ui.createAnimation({"100":{"top":0, "opacity": 1, "stepConfig":{"timingFunction": easeIn}}}),
    {"fillMode": forwards, "duration": duration, "delay": 0.15},
    {"animationEnd": function () {}}
  );

  onEndEditing(frmSearchKA);
}

function getSearchPage()
{
  frmSearchKA.innerResultsContainer.setEnabled(false);
  frmSearchKA.noSearchResults.animate(
    kony.ui.createAnimation({"100":{"opacity": 1,"stepConfig":{"timingFunction": easeIn}}}),
    {"fillMode": forwards, "duration": duration},
    {"animationEnd": function () {}}
  );
  frmSearchKA.searchResults.animate(
    kony.ui.createAnimation({"100":{"top":0, "opacity": 0, "stepConfig":{"timingFunction": easeIn}}}),
    {"fillMode": forwards, "duration": duration, "delay": 0.15},
    {"animationEnd": function () {}}
  );
}
function changeDateRangeClick()
{
  var selectedIndex =  frmSearchKA.mainContent.selectDateRange.selectedIndex;
  var boolStatus =  frmSearchKA.mainContent.selectDateRange.selectedItems[0].imgicontick.isVisible;
  var name  =  frmSearchKA.mainContent.selectDateRange.selectedItems[0].lblNameKA;
  var data= {}; 
  if(boolStatus)
  {
    data = {
      lblNameKA: name,
      imgicontick:{src:"",isVisible: false}
    };
  }

  else
  {
    data = {
      lblNameKA: name,
      imgicontick:{src:"check_blue.png",isVisible: true}
    };  
  }
  changeDateRangeLoad();
  //frmSearchKA.mainContent.selectDateRange.setDataAt(data,selectedIndex[1],selectedIndex[0]);
}


function transactionSearchHeaderAnimate(left)
{

  if(!(kony.retailBanking.globalData.deviceInfo.isIphone()))
  {
    switch(left)
    {
      case "0%" : 
        frmSearchKA.CopyaccountFilterAll009c8fade44564c.skin="skntabSelected";
        frmSearchKA.CopyaccountFilterAll033b03f17d66848.skin="skntabDeselected";
        frmSearchKA.CopyaccountFilterAll09e78279785ae48.skin="skntabDeselected";
        break;
      case "33.3%":frmSearchKA.CopyaccountFilterAll009c8fade44564c.skin="skntabDeselected";
        frmSearchKA.CopyaccountFilterAll033b03f17d66848.skin="skntabSelected";
        frmSearchKA.CopyaccountFilterAll09e78279785ae48.skin="skntabDeselected";
        break;	
      case "66.6%" :frmSearchKA.CopyaccountFilterAll009c8fade44564c.skin="skntabDeselected";
        frmSearchKA.CopyaccountFilterAll033b03f17d66848.skin="skntabDeselected";
        frmSearchKA.CopyaccountFilterAll09e78279785ae48.skin="skntabSelected";
        break;
    }

    frmSearchKA.FlexContainer014668f58ba1148.animate(
      kony.ui.createAnimation({"100":{"left": left, "stepConfig":{"timingFunction": easeIn}}}),
      {"fillMode": forwards, "duration": duration, "delay": 0},
      {"animationEnd": function () {}}
    );
  }
}

function searchPreshow()
{
  frmSearchKA.searchResults.opacity=0;
  frmSearchKA.noSearchResults.opacity=1;
}

