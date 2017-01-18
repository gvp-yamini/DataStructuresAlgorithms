kony = kony || {};
kony.retailBanking = kony.retailBanking || {};
kony.retailBanking.globalData = kony.retailBanking.globalData || {};
kony.retailBanking.globalData.session_token ="";
kony.retailBanking.globalData.deviceInfo = kony.retailBanking.globalData.deviceInfo || {};
kony.retailBanking.globalData.deviceInfo = {
	    getDeviceInfo : function() {   //returns an object which contains name(defines the OS) and version number of the OS
        	var devInfo = kony.os.deviceInfo();
            var obj = {
            		"name": devInfo.name,
            		"version":devInfo.version,
              		"model":devInfo.model,
                    "deviceID":devInfo.deviceid
            	};
            	return obj;
        },

	    isIphone:function() { //returns true if its an iphone else false
   		    var isIPhone = false;
    		try {
       			  var deviceName = kony.retailBanking.globalData.deviceInfo.getDeviceInfo().name;
        		  if (deviceName === "iPhone" || deviceName === "iPhone Simulator") 
        		  	          isIPhone = true;
    			} catch (e) {
        				      isIPhone = false;
    			}
   				return isIPhone;
		},

		isIpad : function() { //returns true if its an ipad else false
    		var isIPad = false;
    		try {
      				var deviceName = kony.retailBanking.globalData.deviceInfo.getDeviceInfo().name;
      				if (deviceName === "iPad" || deviceName === "iPad Simulator") 
      					       isIPad = true;
   				} catch (e) {
       				           isIPad = false;
    			}
   				return isIPad;
		},
	    isTouchIDSupported : function() {  //returns true if device supports touchId else  false
            var status = kony.localAuthentication.getStautusForAuthenticationMode(constants.LOCAL_AUTHENTICATION_MODE_TOUCH_ID);
	        if(status == 5000)
		     {
			    return true;
		     }
		    else
		     {
			   return false;
		     }
        }
};  

kony.retailBanking.globalData.applicationProperties = kony.retailBanking.globalData.applicationProperties || {};
kony.retailBanking.globalData.applicationProperties = {
	    appProperties : {newVersionInfo : null,appUpgradeMandatory : null,newVersionLink : null,
	                     minSupportedOSVersion : null,accoutnSummaryEnabled : null,
	                     preLoginSummaryEnabled : null,bannerURL : null,bankID : null,businessDays : null },
	    setApplicationProperties: function(response) {
	    	appProperties.newVersionInfo = response.newVersionInfo;
	    	appProperties.appUpgradeMandatory = response.appUpgradeMandatory;
	    	appProperties.newVersionLink = response.newVersionLink;
	    	appProperties.minSupportedOSVersion = response.minSupportedOSVersion;
	    	appProperties.accoutnSummaryEnabled = response.accoutnSummaryEnabled;
	    	appProperties.preLoginSummaryEnabled = response.preLoginSummaryEnabled;
	    	appProperties.bannerURL = response.bannerURL;
	    	appProperties.bankID = response.bankID;
	    	

	    },
	    getApplicationProperties: function() {
	    	return appProperties;
        }
};

kony.retailBanking.globalData.accounts = kony.retailBanking.globalData.accounts || {};
kony.retailBanking.globalData.accounts = {
	             accounts : [],
            setAccountsData : function(response) { //sets the array of accounts
            	accounts = response;
            },
            getAccountsData : function() { //returns an array of accounts.
                 return accounts;
            },
            searchAccount: function(searchProperty,searchValue) {//returns the account object which is required.
              //Input would be the property and the value on which search is performed (for example: searchAccount("bankName","HDFC"))
			  var resultArray =  []; 
			  var index = 0;
              var accounts_array = kony.retailBanking.globalData.accounts.getAccountsData();
            	for (var len=0;len<accounts_array.length;len++){
            		if(accounts_array[len][searchProperty] == searchValue)
            			   resultArray[index++] = accounts_array[len];
            	}
			  return resultArray;
            },
           searchAccountById:function(AccountId)
  			{
              var AccountData = [];
              var allAccounts = kony.retailBanking.globalData.accounts.getAccountsData();  
  			   for (var len=0;len<allAccounts.length;len++){
            		if(allAccounts[len]["accountID"] == AccountId)
            			  {
                            AccountData = allAccounts[len];
                          }
            	}
              return AccountData;
            }
			

 };


kony.retailBanking.globalData.globals = kony.retailBanking.globalData.globals || {};
kony.retailBanking.globalData.globals ={
                            formStack : [],
                            LOADING_SCREEN_MESSAGE : "Loading Data...",  
                            settings : {"rememberMeFlag":true,
                                        "touchIDEnabledFlag":null,
                                        "accountPreviewEnabledFlag":null,
                                        "deviceRegisterFlag":null,
                                        "defaultScreenEnum":"frmAccountsLandingKA",
                                        "DefaultTransferAcctNo":"",
                                        "DefaultDepositAcctNo":"", 
                                        "DefaultPaymentAcctNo":"",
                                        "alerts":null},
                          userObj : {"lastLoginTime" :null,
                                     "userFirstName" :null,
                                     "userLastName" :null,
                                     "email":null,
                                     "phone":null,
                                     "dateOfBirth":null,
                                     "userName":null,
                                     "ssn":null,
                                     "depositsTCaccepted":null,
                                     "acntStatementTCaccepted":null
                                    },
                          CurrencyCode : null,
						   German :"de_DE",
							SwitzerlandGerman :"de_CH",
						SwitzerlandFrench :"fr_CH",
				SwitzerlandItaly :"it_CH",
					GermanAustria: "de_AT",
  FrenchBelgium : "fr_BE",
  DutchNetherlands:"nl_NL",
  SpanishSpain:"es_ES",
  GreekGreece: "el_GR",
  RussianRussia: "ru_RU",
  SpanishArgentina : "es_AR",
  French : "fr_FR",
  						  BankName : null,
						  Checking : "Checking",
                          Savings : "Savings",
                          CreditCard : "CreditCard",
                          Deposit : "Deposit",
                          Mortgage : "Mortgage",
  AvailableBalance : "Available Balance:",
  CurrentBalance : "Current Balance:",
  MaturityDate : "Maturity Date:",
  PaymentDueDate : "Payment Due Date:",
  AvailablePoints : "Available Points:",
  MinimumPaymentDue : "Minimum Payment Due:",
  Credit : "Credit",
  Debit : "Debit",
  EmiRate : "Emi Rate",
  Term: "Term",
  LastStatementBalance : "Last Statement Balance:",
  OustandingBalance : "Oustanding Balance:",
  InterestRate : "Interest Rate",
  DateOpened : "Date Opened",
  AvilableCredit : "Available Credit",
  PayBill : "BillPay",
  PayPerson : "P2P",
  TransferMoney : "InternalTransfer",
  ExternalTransfer:"ExternalTransfer",
  Daily : "Daily",
  Weekly : "Weekly",
  BiWeekly : "BiWeekly",
  Monthly : "Monthly",
  Once : "Once",
  Failed : "Failed",
                          pageFlag :false,
                          DoReloadEditAccountInfo : true,
                          monthCredit : null,
                          currentmonth : null,
                          monthCash : null,
                          refreshTimeLabel : null,
                          usrName :null,
                          msgType : null,
						  IDLE_TIMEOUT : 5,
                          msgDel:null,
						  UNCATEGORISED_CATEGORYID : null,
                          CATEGORY_LIST: [],
                          UNCATEGORISED : "Uncategorized",
						  PFM_ACCOUNTS_PRESENT : false,
						  GRAPH_CURRENT_MONTH_LABEL : "",
                          UNCATEGORISED_COUNT : 0,
						   tmcFlagSet:false,
                          WIDTH : 23,
                          LEFT_GAP : 2,
};
//kony.retailBanking.datastore.setSettingsObject(kony.retailBanking.globalData.globals.settings);
kony.retailBanking.globalData.transfers = kony.retailBanking.globalData.transfers || {};

kony.retailBanking.globalData.transfers = {
  transfers : [],
  setTransfersData : function(recentObjects,scheduleObjects) { //sets the array of transactions
    var transactionResponseObject = {};
    transactionResponseObject["recentTransactions"] = recentObjects;
    transactionResponseObject["scheduledTransactions"] = scheduleObjects;
    transfers =  transactionResponseObject; 
  },
  getTransfersData : function(segName) { //returns an transaction.
    return transfers[segName];
  }
};
kony.retailBanking.globalData.deposits = kony.retailBanking.globalData.deposits || {};
kony.retailBanking.globalData.deposits = {
  deposits : [],
  setDepositData : function(recentDeposits,pendingDeposits){
    var depositObject = {};
    depositObject["recentTransactions"] = recentDeposits;
    depositObject["scheduledTransactions"] = pendingDeposits;
    deposits =  depositObject; 
  },
  getDepositData : function(segName) { 
    return deposits[segName];
  }
};
kony.retailBanking.globalData.activityData = kony.retailBanking.globalData.activityData || {};
kony.retailBanking.globalData.activityData = {
  activitys : [],
  activityNotFormatted : [],
  setActivityDataNotFormated : function(response){
    activityNotFormatted = response;
  },
  getActivityDataNotFormated: function(){
		return activityNotFormatted;
  },
  setActivityData : function(response) { //sets the array of accounts
    activitys = response;
  },
  getActivityData : function() { //returns an array of accounts.
    return activitys;
  },
};
isUserSettingsEnable=false;
kony.retailBanking.globalData.ExternalAccounts=kony.retailBanking.globalData.ExternalAccounts||{};
kony.retailBanking.globalData.barGraphMonthData = {
  months : [],
  setmonthsData : function(data) { //sets the array of transactions
    var monthObject = {};
    monthObject["monthData"] = data;
    months =  monthObject; 
  },
  getMonthsData : function() { //returns an transaction.
    return months;
  }
};