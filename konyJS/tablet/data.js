
// Sample accounts
var account1 = {
  name: "John's Primary Checking Acct",
  avlBalance: "$3,968.24",
  acctBalance: "$4,153.84",
  color: checkingColor
};

var account2 = {
  name:"Savings 2453",
  avlBalance:"$4,152.80",
  acctBalance: "$4,287.34",
  color: savingsColor
};

var account3 = {
  name:"Travel Rewards Credit Card",
  avlBalance:"-$1,152.80",
  acctBalance: "$5,000.00",
  color: creditColor
};

var account4 = {
  name:"Checking 8503",
  avlBalance:"$2,824.67",
  acctBalance: "$3,453.34",
  color: checkingColor
};

var billData = {
  bill1: "City of Austin 8781",
  bill2: "Allstate Insurance 4546",
  bill3: "Shell Card 9832"
};

//Used For AccountTypeChecking for preShow

var initialExternalAccountTypes = [{
    lblsegIcon: "Savings Account",
    imgSegIcon:{src:"check_blue.png",isVisible: true}
},{
    lblsegIcon: "Checking Account",
    imgSegIcon:{src:"",isVisible: false}
}
 ];

var externalAccountTypes = [{
    lblsegIcon: "Savings Account",
    imgSegIcon:{src:"",isVisible: false}
},{
    lblsegIcon: "Checking Account",
    imgSegIcon:{src:"",isVisible: false}
}
];

var initialFrequencyTypes = [{
    lblsegIcon: "One Time",
    imgSegIcon:{src:"check_blue.png",isVisible: true}
},{
    lblsegIcon: "Once a Week",
    imgSegIcon:{src:"",isVisible: false}
},{
    lblsegIcon: "Every 2 Weeks",
    imgSegIcon:{src:"",isVisible: false}
},{
    lblsegIcon: "Once a Month",
    imgSegIcon:{src:"",isVisible: false}
},
 ];

var frequencyTypes = [{
    lblsegIcon: "One Time",
    imgSegIcon:{src:"",isVisible: false}
},{
    lblsegIcon: "Once a Week",
    imgSegIcon:{src:"",isVisible: false}
},{
    lblsegIcon: "Every 2 Weeks",
    imgSegIcon:{src:"",isVisible: false}
},{
    lblsegIcon: "Once a Month",
    imgSegIcon:{src:"",isVisible: false}
},
];

//load AddExternal Data
function loadFrequencyTypesPreShow()
{
  newTransfer.frequencySegment.setData(initialFrequencyTypes);
}

function loadFrequencyTypes()
{
  newTransfer.frequencySegment.setData(frequencyTypes);
}
//load AddExternal Data
function loadExternalAccountTypesPreShow()
{
  frmNewTransferKA.externalAccountTypeSegment.setData(initialExternalAccountTypes);
}
//load AddExternal Data
function loadExternalAccountTypes()
{
  frmNewTransferKA.externalAccountTypeSegment.setData(externalAccountTypes);
}

// Called on accountLanding preShow on accounts.js
function loadAccountsLandingData() {
  accountsLanding.colorAccount1.backgroundColor = account1.color;
  accountsLanding.nameAccount1.text = account1.name;
  accountsLanding.amountAccount1.text = account1.avlBalance;
  accountsLanding.colorAccount2.backgroundColor = account2.color;
  accountsLanding.nameAccount2.text = account2.name;
  accountsLanding.amountAccount2.text = account2.avlBalance;
  accountsLanding.colorAccount3.backgroundColor = account3.color;
  accountsLanding.nameAccount3.text = account3.name;
  accountsLanding.amountAccount3.text = account3.avlBalance;
  accountsLanding.colorAccount4.backgroundColor = account4.color;
  accountsLanding.nameAccount4.text = account4.name;
  accountsLanding.amountAccount4.text = account4.avlBalance;
  accountsLanding.amountAccount3.skin = accountAmountNegative;
}

// Called on newTransfer preShow on transfer.js
function loadNewTransferData() {
  newTransfer.toColorAccount1.backgroundColor = account1.color;
  newTransfer.toNameAccount1.text = account1.name;
  newTransfer.toAmountAccount1.text = account1.avlBalance;
  newTransfer.colorAccount2.backgroundColor = account2.color;
  newTransfer.nameAccount2.text = account2.name;
  newTransfer.amountAccount2.text = account2.avlBalance;

  newTransfer.fromColorAccount1.backgroundColor = account1.color;
  newTransfer.fromNameAccount1.text = account1.name;
  newTransfer.fromAmountAccount1.text = account1.avlBalance;
  newTransfer.fromColorAccount2.backgroundColor = account2.color;
  newTransfer.fromNameAccount2.text = account2.name;
  newTransfer.fromAmountAccount2.text = account2.avlBalance;
}

// Called on frmNewPayPersonKA preShow on payPerson.js
function loadNewPayPersonData() {  
  frmNewPayPersonKA.fromColorAccount1.backgroundColor = account1.color;
  frmNewPayPersonKA.fromNameAccount1.text = account1.name;
  frmNewPayPersonKA.fromAmountAccount1.text = account1.avlBalance;
  frmNewPayPersonKA.fromColorAccount2.backgroundColor = account4.color;
  frmNewPayPersonKA.fromNameAccount2.text = account4.name;
  frmNewPayPersonKA.fromAmountAccount2.text = account4.avlBalance;
}

// Called on frmNewPayPersonKA preShow on payPerson.js
function loadDepositData() {  
  depositLanding.toColorAccount1.backgroundColor = account1.color;
  depositLanding.toNameAccount1.text = account1.name;
  depositLanding.toAmountAccount1.text = account1.avlBalance;
  depositLanding.toColorAccount2.backgroundColor = account4.color;
  depositLanding.toNameAccount2.text = account4.name;
  depositLanding.toAmountAccount2.text = account4.avlBalance;
}

function loadNewBillData() {  
  newBill.toNameAccount1.text = billData.bill1;
  newBill.toNameAccount2.text = billData.bill2;

  newBill.fromColorAccount1.backgroundColor = account1.color;
  newBill.fromNameAccount1.text = account1.name;
  newBill.fromAmountAccount1.text = account1.avlBalance;
  newBill.fromColorAccount2.backgroundColor = account2.color;
  newBill.fromNameAccount2.text = account2.name;
  newBill.fromAmountAccount2.text = account2.avlBalance;
}



// Transfer & Pay Recent Segment Data
var recentTransactions = [{
  // Pending Transaction Example
  transactionName: "Payment to City of Austin",
  transactionAmount: {text:"-$56.00"},
  transactionDate:  "Sept 9, 2015",
  accountType: {backgroundColor: savingsColor },
  chevron: {isVisible: false}
},
                          {
                            transactionName: "Transfer from Checking 8781",
                            transactionAmount:{text:"72.86"},
                            transactionDate: "Oct 8, 2015",
                            accountType: {backgroundColor: savingsColor}
                          },
                          {
                            transactionName: "Transfer to Savings 2453",
                            transactionAmount: {skin: transactionNegative, text:"-$72.86"},
                            transactionDate: "Oct 8, 2015",
                            accountType: {backgroundColor: checkingColor }
                          },
                          {
                            transactionName: "Payment - Thank You",
                            transactionAmount:{text:"$1,172.49"},
                            transactionDate: "Oct 4, 2015",
                            accountType: {backgroundColor: creditColor}
                          },
                          {
                            transactionName: "Payment to Credit Card 4567",
                            transactionAmount: {skin: transactionNegative, text:"-$1,172.49"},
                            transactionDate: "Oct 4, 2015 - Recurring Monthly",
                            accountType: {backgroundColor: savingsColor}
                          },
                          {
                            transactionName: "Pay a Person - Sarah",
                            transactionAmount: {skin: transactionNegative, text:"-$15.30"},
                            transactionDate: "Sept 27, 2015",
                            accountType: {backgroundColor: checkingColor}
                          },
                          {
                            transactionName: "Payment to TWC",
                            transactionAmount: {text:"67.23"},
                            transactionDate: "Sept 10, 2015 - Recurring Monthly",
                            accountType: {backgroundColor: savingsColor}                          
                          }];
//Deposit recent Transaction:
  var DepositrecentTransactions = [/*{
  // Pending Transaction Example
  transactionName: "Payment to City of Austin",
  transactionAmount: {text:"-$56.00"},
  transactionDate:  "Sept 9, 2015",
  accountType: {backgroundColor: savingsColor },
  chevron: {isVisible: false}
},*/
                          {
                            transactionName: "To Checking 8781",
                            transactionAmount:{text:"50.00"},
                            transactionDate: "Sept6, 2015",
                            accountType: {backgroundColor: savingsColor}
                          },
                          {
                            transactionName: "To Savings 2453",
                            transactionAmount: {skin: transactionNegative, text:"$200.00"},
                            transactionDate: "Sept 7, 2015",
                            accountType: {backgroundColor: checkingColor }
                          },
                          {
                            transactionName: "To Checking 8781",
                            transactionAmount:{text:"$300.00"},
                            transactionDate: "Sept 7, 2015",
                            accountType: {backgroundColor: savingsColor}
                          },
                          {
                            transactionName: "To Savings 4567",
                            transactionAmount: {skin: transactionNegative, text:"$100.00"},
                            transactionDate: "Sept 8, 2015",
                            accountType: {backgroundColor: checkingColor }
                          },
                          {
                            transactionName: "To Savings 2453",
                            transactionAmount: {skin: transactionNegative, text:"$80.00"},
                            transactionDate: "Sept 7, 2015",
                            accountType: {backgroundColor: checkingColor }
                          },
                          {
                           transactionName: "To Savings 2453",
                            transactionAmount: {skin: transactionNegative, text:"-$80.00"},
                            transactionDate: "Sept 7, 2015",
                            accountType: {backgroundColor: checkingColor }                         
                          },
						  {
                            transactionName: "To Checking 8781",
                            transactionAmount:{text:"300.00"},
                            transactionDate: "Sept6, 2015",
                            accountType: {backgroundColor: savingsColor}
                          }
						  
						  ];



// Transfer & Pay Scheduled Segment Data
var scheduledTransactions = [{

  transactionName: "Payment to AT&T",
  transactionAmount: {skin: transactionNegative, text:"-$88.27"},
  transactionDate: "Oct 10, 2015 - Recurring Monthly",
  accountType: {backgroundColor: savingsColor },
},
                             {
                               transactionName: "Transfer to Savings 2453",
                               transactionAmount: {skin: transactionNegative, text:"-$650.00"},
                               transactionDate: "Oct 12, 2015",
                               accountType: {backgroundColor: checkingColor }
                             },
                             {
                               transactionName: "Pay a Person - John",
                               transactionAmount: { text:"$72.86"},  
                               transactionDate: "Oct 18, 2015 - Recurring Monthly",
                               accountType: {backgroundColor: checkingColor}
                             },
                             {
                               transactionName: "Payment to Credit Card 4567",
                               transactionAmount: {skin: transactionNegative, text:"-506.14"},
                               transactionDate: "Oct 30, 2015",
                               accountType: {backgroundColor: checkingColor }                  
                             }];

var scheduledDepositTransactions = [{

  transactionName: "Payment to AT&T",
  transactionAmount: {skin: transactionNegative, text:"-$88.27"},
  transactionDate: "Oct 10, 2015 - Recurring Monthly",
  accountType: {backgroundColor: savingsColor },
},
                             {
                               transactionName: "Transfer to Savings 2453",
                               transactionAmount: {skin: transactionNegative, text:"-$650.00"},
                               transactionDate: "Oct 12, 2015",
                               accountType: {backgroundColor: checkingColor }
                             },
                             {
                               transactionName: "Pay a Person - John",
                               transactionAmount: { text:"$72.86"},  
                               transactionDate: "Oct 18, 2015 - Recurring Monthly",
                               accountType: {backgroundColor: checkingColor}
                             },
                             {
                               transactionName: "Payment to Credit Card 4567",
                               transactionAmount: {skin: transactionNegative, text:"-506.14"},
                               transactionDate: "Oct 30, 2015",
                               accountType: {backgroundColor: checkingColor }                  
                             }];

/* 
Author:Mounika ch
Purpose:Account Segment Data on rightside Displaying
*/

var segAccountInfoData = [
  {
  nameAccount1: "John's Primary Checking Acct",
  amountAccount1: {text:"$3,968.54"},
  availableBalance1: "Available Balance",
  colorAccount1:{skin:"accountTypeChecking"},// {skin:"accountTypeChecking"},//{backgroundColor : savingsColor},  //"checkingColor" ,      //violetcolor 
  colorAccount: {backgroundColor : checkingColor},
  acctBalance: "$4,153.84"   
  },
                             {
                               nameAccount1: "Savings 2453",
                               amountAccount1: {text:"$4,152.80"},
                               availableBalance1:"Available Balance",            
                               colorAccount1: {skin:"accountTypeSavings"}, //green {backgroundColor: savingsColor },
                               colorAccount: {backgroundColor : savingsColor},
                               acctBalance: "$4,287.34"                               
                             },
                             {
                               nameAccount1: "Travel Rewards Credit Card",
                               amountAccount1:{skin: accountNegative,text:"-$1,529.54"},  
                                                                                                                   availableBalance1 : "Available Balance",                        
                               colorAccount1:  {skin:"accountTypeCredit"} ,//yellow {backgroundColor: creditColor },
                               colorAccount: {backgroundColor : creditColor},
                               acctBalance: "$5,000.00"                               
                             },
                             {
                               nameAccount1: "2 Year Deposit- 4445",
                               amountAccount1: {text:"$22,900.00"},
                               availableBalance1: "Current Balance",
                               colorAccount1: {skin:"accountTypeCurrent"}, //blue {backgroundColor: deposit  },
                               colorAccount: {backgroundColor : deposit},
                               acctBalance: "$3,453.34"
                             },
                                                                                                                {
                               nameAccount1: "15 Years Mortage- 2388",
                               amountAccount1: {text:"$50,000.00"},  
                                                                                                                   availableBalance1 : "OutStanding Balance",                        
                               colorAccount1: {skin:"accountTypeMortage"},//mortage {backgroundColor: mortage},
                               colorAccount: {backgroundColor : mortage},
                               acctBalance: "$3,678.34"                               
                             }];

/*
Author:Mounika Ch
Purpose: OnClick of Segemnet data in left wrapper displays related content on rightwrapper///  
  Set the accountType color of the selected row to the Flex of right wrapper
  This variable will need to be set programatically depending
  on the backgroundColor of the accountType FlexContainer in each row
  */ 
// function setAccountInfoDataRight() { 
//   selectedAccount = accountsLanding.segAccountInfoData.selectedRowIndex[1];
//   addRightPanel(accountDetail.accountDetailWrapper,"accountDetailWrapper");
//   accountDetail.FlexContainer089a76628a83242.skin = accountsLanding.segAccountInfoData.selectedItems[0]["colorAccount1"].skin;
//   kony.print("enterin tn to the"+accountDetail.FlexContainer089a76628a83242.skin)
//   accountDetail.accountDetailsHeader.text = accountsLanding.segAccountInfoData.selectedItems[0]["nameAccount1"];
//   accountDetail.availableBalanceAmount.text = accountsLanding.segAccountInfoData.selectedItems[0]["amountAccount1"].text;
//   accountDetail.Label01a9e582c581146.text =  accountsLanding.segAccountInfoData.selectedItems[0]["availableBalance1"];
//   accountDetail.accountBalanceAmount.text = accountsLanding.segAccountInfoData.selectedItems[0]["acctBalance"];
//   retainSelectionOn("segAccountInfoData"); 
//    }

/*
Author: Mounika Ch
Purpose: Determines titlebar color for account Info based on accountType of selected row
*/
function accountViewInfoDetails(){
  kony.print("entering in to the accountview info");
  accountInfo.titleBarAccountInfo.skin = accountsLanding.segAccountInfoData.selectedItems[0]["colorAccount1"].skin;
  kony.print("entering into the assiging the skin ofr titlebarinfo" +accountInfo.titleBarAccountInfo.skin); 
}
