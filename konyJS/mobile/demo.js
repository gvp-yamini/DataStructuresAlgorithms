var x,accounttype;
function accountDetails(){
  var transactions = [];
  var transactionCheque = [];
  var transactionList = result.AccountListTransaction[0].transactionList ;
  for(var i=0;i<transactionList.length;i++){
    if(transactionList[i].type == "cheque"){
         transactionCheque.push({
            "transactiondescription":transactionList[i].description,
            "transactionAmount":evaluateAmount(transactionList[i].transamount,transactionList[i].transamountCurr), 
            "transactionDate":transactionList[i].transDateEffective
         })
    }
     else{   
       transactions.push({
            "transactiondescription":transactionList[i].description,
            "transactionAmount":evaluateAmount(transactionList[i].transamount,transactionList[i].transamountCurr),
            "transactionDate":transactionList[i].transDateEffective
                })
         }
  
};
 frmAccountDetailKA.segchequetransaction.widgetDataMap = { transactionName :"transactiondescription",
                transactionAmount: "transactionAmount",
                transactionDate: "transactionDate"
                                 };
 frmAccountDetailKA.transactionSegment.widgetDataMap = { transactionName :"transactiondescription",
                transactionAmount: "transactionAmount",
                transactionDate: "transactionDate"
                                 };
 frmAccountDetailKA.transactionSegment.setData(transactions);
 frmAccountDetailKA.segchequetransaction.setData(transactionCheque);
 frmAccountDetailKA.skin = getSkinColorForBg(frmAccountsLandingKA.segAccountsKA.selectedItems[0].typeKA);
 frmAccountDetailKA.accountDetailsOverview.skin = getSkinColor(frmAccountsLandingKA.segAccountsKA.selectedItems[0].typeKA);
 frmAccountDetailKA.titleBarAccountDetails.skin = getSkinColor(frmAccountsLandingKA.segAccountsKA.selectedItems[0].typeKA);
 frmAccountDetailKA.accountDetailsHeader.text = frmAccountsLandingKA.segAccountsKA.selectedItems[0].accountdescription;
 frmAccountDetailKA.availableBalanceAmount.text = frmAccountsLandingKA.segAccountsKA.selectedItems[0].accountAmount.text;
 frmAccountDetailKA.lblavailbalance.text = frmAccountsLandingKA.segAccountsKA.selectedItems[0].accountType;
 frmAccountDetailKA.accountBalanceAmount.text = getAcntDetails(frmAccountsLandingKA.segAccountsKA.selectedItems[0].accountdescription);
 frmAccountDetailKA.lblaccountbalance.text = getAcntType(frmAccountsLandingKA.segAccountsKA.selectedItems[0].typeKA);
 if(frmAccountsLandingKA.segAccountsKA.selectedItems[0].typeKA == "Deposit" || frmAccountsLandingKA.segAccountsKA.selectedItems[0].typeKA == "Mortgage" ){
     frmAccountDetailKA.btnaccountstatements.isVisible = false;
     frmAccountDetailKA.accountDetailsOverview.height = "220dp";
     frmAccountDetailKA.accountDetailsTransactions.top = "220dp";
 }
 else {
     frmAccountDetailKA.btnaccountstatements.isVisible = true;
     frmAccountDetailKA.accountDetailsOverview.height = "300dp";
     frmAccountDetailKA.accountDetailsTransactions.top = "300dp";
 }
 x= frmAccountsLandingKA.segAccountsKA.selectedItems[0].typeKA;
 accounttype= frmAccountsLandingKA.segAccountsKA.selectedItems[0].typeKA;
 frmAccountDetailKA.show(); 
}

function getAcntDetails(desc){
   for(var i=0;i<result.Accounts.length;i++){
     if(result.Accounts[i].description == desc){
       if(result.Accounts[i].acctBalance)
         return evaluateAmount(result.Accounts[i].acctBalance,result.Accounts[i].acctBalanceCurr);
       else if(result.Accounts[i].maturityDate)
         return result.Accounts[i].maturityDate;
       else if(result.Accounts[i].interestRate)
         return result.Accounts[i].interestRate;
     }
   }
}

function accountLanding(formName)
{
  var accounts = [];
  var accountList = result.Accounts;
  var credit =0,cash = 0;
  for(var i=0;i<accountList.length;i++){
    accounts.push({
      "accountdescription":accountList[i].description,
      "accountAmount":{skin :getSknlblAmount(accountList[i].type), text: evaluateAmount(accountList[i].availableBalanceValue,accountList[i].availableBalanceCurr)},
      "accountType": getAccountType(accountList[i].type),
      "typeKA":accountList[i].type,
      "flxClr": {skin:getSkinColor(accountList[i].type)}
    });
    if(accountList[i].type == "CreditCard" || accountList[i].type == "Mortgage" ){
      credit = credit + Math.abs(Number(changeNum(accountList[i].availableBalanceValue)));
    }
    else 
      cash = cash + Number(changeNum(accountList[i].availableBalanceValue));
  }
  formName.segAccountsKA.widgetDataMap = { nameAccount1 :"accountdescription",
                                                       amountAccount1 : "accountAmount",
                                                       typeAccount : "accountType",
                                                       typeKA : "typeKA",
                                                       lblColorKA : "flxClr"
  };
  formName.segAccountsKA.setData(accounts);
  if(formName == frmAccountsLandingKA){
  formName.cashOverviewLabel.text = evaluateAmount(String(cash),accountList[0].availableBalanceCurr);
  formName.creditDebtOverviewLabel.text = "-" + evaluateAmount(String(credit),accountList[0].availableBalanceCurr);
  }
}

function getAcntType(type){
  if(type == "Checking" || type == "Savings" || type == "CreditCard" )
    return "Account Balance";
  else if (type == "Deposit" )
    return "Maturity Date";
  else if(type == "Mortgage")
    return "Interest Rate";
}
function getSknlblAmount(acntType){
  if(acntType == "CreditCard")
   return  "sknaccountAmountNegative";
  else 
    return "sknaccountAmount";
}
function getSkinColor(acntType)
{
 switch (acntType){
   case "Checking":return sknCheckingKA;
                   break;
   case "Savings":return sknSavingsKA;
                   break;
   case "CreditCard":return sknCreditKA;
                   break;
   case "Deposit":return sknDepositKA;
                   break; 
   case "Mortgage":return sknMortgageKA;
                   break; 
 } 
}
function getSkinColorForBg(acntType)
{
 switch (acntType){
   case "Checking":return sknaccountCheckingBkg;
                   break;
   case "Savings":return sknaccountSavingsBkg;
                   break;
   case "CreditCard":return sknaccountCreditBkg;
                   break;
   case "Deposit":return sknaccountDepositBkg;
                   break; 
   case "Mortgage":return sknaccountMortageBkg;
                   break; 
 } 
}
function getAccountType(type){
  if(type == "Checking" || type == "Savings" || type == "CreditCard" )
    return "Available Balance";
  else if (type == "Deposit" )
    return "Current Balance";
  else if(type == "Mortgage")
    return "Outstanding Balance";
}
function evaluateAmount(amountVal,currency){
  var curr = getCurrency(currency);
  if(amountVal){
    if(amountVal.substr(0,1) == "-" )
      return "-" + curr + amountVal.substring(1) ;
    else 
    return curr + amountVal ;
  }
}
function getCurrency(code)
{
  var currency_symbols = {
    'USD': '$', // US Dollar
    'EUR': '€', // Euro
    'CRC': '₡', // Costa Rican Colón
    'GBP': '£', // British Pound Sterling
    'ILS': '₪', // Israeli New Sheqel
    'INR': '₹', // Indian Rupee
    'JPY': '¥', // Japanese Yen
    'KRW': '₩', // South Korean Won
    'NGN': '₦', // Nigerian Naira
    'PHP': '₱', // Philippine Peso
    'PLN': 'zł', // Polish Zloty
    'PYG': '₲', // Paraguayan Guarani
    'THB': '฿', // Thai Baht
    'UAH': '₴', // Ukrainian Hryvnia
    'VND': '₫', // Vietnamese Dong
};
  if(currency_symbols[code]!==undefined) {
    return currency_symbols[code];
  }
  else 
    return ;
}

function contactUsPreshow(){
   var contacts =[];
   var contactList = result.contact;
   for(var i=0;i<contactList.length;i++){
        contacts.push({
          "contactName" : contactList[i].typeOfContact,
          "phoneNum": contactList[i].phoneNumber,
          "img" :{src: "phone_icon.png"}
        })
   }
  frmContactUsKA.contactSegmentList.widgetDataMap = { lblNameKA :"contactName",
                                                     phone:"phoneNum",
                                                      imgicontick :"img"};
  frmContactUsKA.contactSegmentList.setData(contacts);
}                   

function setDataTransferPay(){
   var recent = [];
   var scheduled = [];
   var transferList = result.TransferAndPayments;
   for(var i=0;i<transferList.length;i++){
    if(transferList[i].type == "Recent"){
       recent.push({
      	"transferDescription":transferList[i].description,
      	"transferAmount":evaluateAmount(transferList[i].transamount,transferList[i].transamountCurr),
      	"transferDate":transferList[i].transDate,
        "flxClr": {skin:getSkinColor(transferList[i].acntType)}
      })
    }
    else if(transferList[i].type == "Scheduled"){
      scheduled.push({
      	"transferDescription":transferList[i].description,
      	"transferAmount":evaluateAmount(transferList[i].transamount,transferList[i].transamountCurr),
      	"transferDate":transferList[i].transDate,
        "flxClr": {skin:getSkinColor(transferList[i].acntType)}
      })
    }
  };
  frmTransferPayLandingKA.recentTransactions.widgetDataMap = { transactionName :"transferDescription",
                                                       transactionAmount : "transferAmount",
                                                       transactionDate : "transferDate",
                                                       lblAccountTypeKA : "flxClr"
  };
   frmTransferPayLandingKA.scheduledTransactions.widgetDataMap = { transactionName :"transferDescription",
                                                       transactionAmount : "transferAmount",
                                                       transactionDate : "transferDate",
                                                       lblAccountTypeKA : "flxClr"
  };
  frmTransferPayLandingKA.recentTransactions.setData(recent);
  frmTransferPayLandingKA.scheduledTransactions.setData(scheduled);
}

function setDataDepositPay(){
  var recent = [];
   var scheduled = [];
   var depositList = result.Deposits;
   for(var i=0;i<depositList.length;i++){
    if(depositList[i].type == "Recent"){
       recent.push({
      	"transferDescription":depositList[i].description,
      	"transferAmount":evaluateAmount(depositList[i].transamount,depositList[i].transamountCurr),
      	"transferDate":depositList[i].transDate,
        "flxClr": {skin:getSkinColor(depositList[i].acntType)}
      })
    }
    else if(depositList[i].type == "Scheduled"){
      scheduled.push({
      	"transferDescription":depositList[i].description,
      	"transferAmount":evaluateAmount(depositList[i].transamount,depositList[i].transamountCurr),
      	"transferDate":depositList[i].transDate,
        "flxClr": {skin:getSkinColor(depositList[i].acntType)}
      })
    }
  };
  frmDepositPayLandingKA.recentTransactions.widgetDataMap = { transactionName :"transferDescription",
                                                       transactionAmount : "transferAmount",
                                                       transactionDate : "transferDate",
                                                       lblAccountTypeKA : "flxClr"
  };
   frmDepositPayLandingKA.scheduledTransactions.widgetDataMap = { transactionName :"transferDescription",
                                                       transactionAmount : "transferAmount",
                                                       transactionDate : "transferDate",
                                                       lblAccountTypeKA : "flxClr"
  };
  frmDepositPayLandingKA.recentTransactions.setData(recent);
  frmDepositPayLandingKA.scheduledTransactions.setData(scheduled);
}

function p2pSetData(){
  var registered = [];
  var registeredList = result.registeredPayees;
  for(var i=0;i<registeredList.length;i++){
    registered.push({
       "transactionName" : registeredList[i].transactionName,
       "transactionDate" : registeredList[i].transactionDate
    })
  }
  frmP2PselectPayeeKA.contactsegment.widgetDataMap = { transactionName :"transactionName",
                                                       transactionDate :"transactionDate"
    
  }
  frmP2PselectPayeeKA.contactsegment.setData(registered);
}
function p2pPhoneSetData(){
  var contacts = [];
  var contactsList = result.myContactList;
  for(var i=0;i<contactsList.length;i++){
    contacts.push({
       "transactionName" : contactsList[i].transactionName,
       "transactionDate" : contactsList[i].transactionDate
    })
  }
  frmP2PphonepayeeKA.contactsegment.widgetDataMap = { transactionName :"transactionName",
                                                       transactionDate :"transactionDate"
    
  }
  frmP2PphonepayeeKA.contactsegment.setData(contacts);
}
function pushDepositJson(){
   var today = kony.os.dateComponents();
   var dateMod = [today.day,today.month,today.year];
   if(frmNewDepositKA.amountTextField.text){
    var depositJson = {
          "transamountCurr": "USD",
          "description": frmNewDepositKA.noteTextfield.text,
          "transamount": frmNewDepositKA.amountTextField.text,
          "transDate": getDate(dateMod),
          "type": "Scheduled",
          "acntType":"Checking"
        }
   result.Deposits.unshift(depositJson);
   return true;
  }
  else{
    alert("Please enter amount for deposit...");
    return false;
  }   
}
function pushJson(){
  var date = getDate(frmNewTransferKA.calDateKA.dateComponents);
  var newJson = {
          "transamountCurr": "USD",
          "description": "Trnasfer Money",
          "transamount": frmNewTransferKA.amountTextField.text,
          "transDate": date,
          "type": "Recent",
          "acntType":"Checking"
        }
  var acntVal = Number(changeNum(result.Accounts[0].availableBalanceValue));
  var acntVal1 = Number(changeNum(result.Accounts[1].availableBalanceValue)); 
  if(Number(newJson.transamount) > acntVal){
    alert("Transaction not possible ,choose amount within available balance");
    return false;
  }
  else{
    result.TransferAndPayments.unshift(newJson);
    result.Accounts[0].availableBalanceValue = String((acntVal - Number(newJson.transamount)).toFixed(2));
    result.Accounts[1].availableBalanceValue = String((acntVal1 + Number(newJson.transamount)).toFixed(2));
    return true;
  }
}

function changeNum(str){
   return str.replace(/\,/g,"");
}
function getDate(date){
  var month=date[1];
  var day = date[0];
  if(date[0]<10){
   day = "0"+date[0];
  }
  var months = {
    '1':'Jan',
    '2':'Feb',
    '3':'Mar',
    '4':'Apr',
    '5':'May',
    '6':'Jun',
    '7':'Jul',
    '8':'Aug',
    '9':'Sep',
    '10':'Oct',
    '11':'Nov',
    '12':'Dec'
  }
  if(months[month]!==undefined) {
    month = months[month];
  }
  formattedDate = month +" "+ day + ","+date[2];
  return formattedDate;
}
function setDataUncategorized(){
   var uncategorised =[];
   var uncategorizedList = result.unCategorised;
   for(var i=0;i<uncategorizedList.length;i++){
    uncategorised.push({
      	"transferDescription":uncategorizedList[i].transactionName,
      	"transferAmount":evaluateAmount(uncategorizedList[i].transactionAmount,uncategorizedList[i].transamountCurr),
      	"transferDate":uncategorizedList[i].transactionDate
      })
  };
  frmUncategorizedTransactionsKA.transactionSegment.widgetDataMap = { transactionName :"transferDescription",
                                                       transactionAmount : "transferAmount",
                                                       transactionDate : "transferDate",
                                                       
  };
   
  frmUncategorizedTransactionsKA.transactionSegment.setData(uncategorised);
}
function addLocations()
{
  var segmentData = [];
  var locationData = [];
  var locationList = result.Locations;
  for(var i=0;i<locationList.length;i++){
      segmentData.push({
      "rightChevron1":"right_chevron_icon.png",
      "addressLine2":locationList[i].addressLine2,
      "informationListLabel": locationList[i].informationTitle,
      "distanceLabel":locationList[i].distanceLabel,
      "informationListIcon": getLocationImage(locationList[i].type),
       "addressLine1": locationList[i].addressLine1,
       "type": locationList[i].type
    });
        locationData.push({
        "name":locationList[i].informationTitle,
        "lon":locationList[i].longitude,
        "lat": locationList[i].latitude,
        "desc":locationList[i].addressLine1,
         "image": getMapPinIcon(locationList[i].type),
        "type": locationList[i].type
      });
  }
  frmLocatorKA.locatorSegmentList.setData(segmentData);
  frmLocatorKA.locatorMap.locationData = locationData;
  //frmLocatorKA.locatorMap.locationData = [{lat:"17.445775", lon:"78.3731",name: "Campus 1", desc: "My Office Campus"}];
}

function getLocationImage(type){
  if(type == "ATM"){
    return "atm_icon_line.png";
  }
  else if(type == "BRANCH" || type == "MainBranch"){
    return "branch_icon_line.png";
  }
}

function getMapPinIcon(type){
  if(type == "ATM"){
    return "atm_icon_inactive.png";
  }
  else if(type == "BRANCH" || type == "MainBranch"){
    return "branch_icon_inactive.png";
  }
}

function getStatusImage(type){
if(type == "CLOSED"){
    return "location_close.png";
  }
  else if(type == "OPEN"){
    return "location_open.png";
  }  
  
}

function getSknColorStatus(type){
  if(type == "CLOSED"){
    return "sknstatusClosed";
  }
  else if(type == "OPEN"){
    return "sknstatus";
  } 
}