function hBoxForName(AccountObject,random){
	var imagescr = getImage(AccountObject["accountType"]);
    var AccountNickName,availableBal,currBal,outstandingBal,amount,amountType;
    var accountType = AccountObject["accountType"];
    var accountId = AccountObject["accountID"];
      var left = kony.retailBanking.globalData.globals.LEFT_GAP*(random+1) + kony.retailBanking.globalData.globals.WIDTH*random;
  
  if(AccountObject["nickName"]){
        AccountNickName = kony.retailBanking.util.validation.trucateTo(AccountObject["nickName"],35,32,"...");
        }else{
          var accountNumber = AccountObject["accountID"];
          AccountNickName =  AccountObject["accountName"] + accountNumber.substring(accountNumber.length-4, accountNumber.length);
        }
  if(AccountObject["availableBalance"]){
        availableBal = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(AccountObject["availableBalance"]);
       //availableBal = AccountObject["availableBalance"];
       }
        if(AccountObject["currentBalance"]){
       currBal = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(AccountObject["currentBalance"]);
        //currBal = AccountObject["currentBalance"];
        }
        if(AccountObject["outstandingBalance"]){
          outstandingBal = kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount(AccountObject["outstandingBalance"]);
          //  outstandingBal = AccountObject["outstandingBalance"];
        }
          if(AccountObject["accountType"]=="CreditCard"){
          currBal = "-"+currBal;
        }
  if (accountType === kony.retailBanking.globalData.globals.Savings){
                amount = availableBal;
                amountType = "Available Balance";
      }else if (accountType === kony.retailBanking.globalData.globals.CreditCard){
                amount = currBal;
                amountType = "Current Balance";
      }else if(accountType === kony.retailBanking.globalData.globals.Deposit){
                amount = currBal;
                amountType = "Current Balance";
      }else if(accountType == kony.retailBanking.globalData.globals.Mortgage){
                amount = outstandingBal;
                amountType = "Oustanding Balance";
      }else if(accountType === kony.retailBanking.globalData.globals.Checking){
                amount = availableBal;
                amountType = "Available Balance";
      }
	var hboxbasicConf1 = new kony.ui.FlexContainer({
        "id": accountId,
		"skin" : getSkinForAccountType(accountType),
        "top": "0%",
        "left": left+"%",
        "width": kony.retailBanking.globalData.globals.WIDTH+"%",
        "height": "76%",
		"centerY" : "50%",
        "zIndex": 1,
        "isVisible": true,
        "onTouchStart": onTouchStartAccountTile,
        "onTouchEnd": null,
        "onTouchMove": null,
        "clipBounds": true,
        "layoutType": kony.flex.FLOW_VERTICAL
    }, {
        "padding": [0, 0, 0, 0]
    }, {});
	hboxbasicConf1.add(imageForAccounts(imagescr,random),lblForAccountNicknameName(AccountNickName,random),lblForAmount(amount,random),lblforAmountType(amountType,random));
    frmDashboardKA.flxScrollAccTypeDetailsKA.add(hboxbasicConf1);
}

function onTouchStartAccountTile(response){
  var accId = response.id; 
  fetchAcountsData(accId);
}

function getSkinForAccountType(accountType){
    if (accountType === kony.retailBanking.globalData.globals.Checking){
       return "sknFlx9060b7KA";
    } else if (accountType === kony.retailBanking.globalData.globals.Savings){
       return "sknFlx66d5f1KA";
    } else if (accountType === kony.retailBanking.globalData.globals.CreditCard){
      return "sknFlxf5a623KA";
    }else if (accountType === kony.retailBanking.globalData.globals.Deposit){
      return "sknFlx0270c9KA";
    } 
    else if (accountType == kony.retailBanking.globalData.globals.Mortgage){
     return "sknFlx85602aKA";
  }
}

function getImage(accountType){
  if (accountType === kony.retailBanking.globalData.globals.Checking){
       return "checking_dashboard.png";
    } else if (accountType === kony.retailBanking.globalData.globals.Savings){
       return "savings_dashboard.png";
    } else if (accountType === kony.retailBanking.globalData.globals.CreditCard){
      return "icondahsboard2.png";
    }else if (accountType === kony.retailBanking.globalData.globals.Deposit){
      return "icondahsboard1.png";
    } 
    else if (accountType == kony.retailBanking.globalData.globals.Mortgage){
     return "icondahsboard3.png";
  }
}

function imageForAccounts(imagescr,random){
	//Creating the Image with isVisible:true.
var basicConfImage = {
	"id" : "Accimage" + random,
	"isVisible" : true,
	"src" : imagescr,
	"imageWhenFailed" : null,
	"imageWhileDownloading" : null,
	"top": "3%",
	"width": "60dp",
    "height": "50dp",
	"centerX" : "50%"
};
var layoutConfImage = {containerWeight:100};
var PSPConfImage = {};
var imageId = new kony.ui.Image2(basicConfImage, layoutConfImage, PSPConfImage);
return imageId;
}

function lblForAccountNicknameName(AccountNickName,random){
	var lblBasic = {
		"id" : "AccountNickName" + random,
		"skin" : "sknLblLatoBffffffKA",
		"text" : AccountNickName,
		"isVisible" : true,
		"left": "4%",
		"top": "3%",
	    "centerX" : "50%"
	};
    var lblLayout ={containerWeight:100};
    var lblLayoutConfig = {renderAsAnchor:true, wrapping:constants.WIDGET_TEXT_WORD_WRAP};

    var lbl = new kony.ui.Label(lblBasic, lblLayout, lblLayoutConfig);
	
	return lbl;
}

function lblForAmount(amount,random){
		var lblBasic = {
		"id" : "amount" + random,
		"skin" : "sknLblLatoMffffffKA",
		"text" : amount,
		"isVisible" : true,
		"left": "4%",
		"top": "3%",
	    "centerX" : "50%"
	};
    var lblLayout ={containerWeight:100};
    var lblLayoutConfig ={renderAsAnchor:true, wrapping:constants.WIDGET_TEXT_WORD_WRAP};

    var lbl = new kony.ui.Label(lblBasic, lblLayout, lblLayoutConfig);
	
	return lbl;
}

function lblforAmountType(amountType,random){
			var lblBasic = {
		"id" : "amountType" + random,
		"skin" : "sknLblLatoRffffffKA",
		"text" : amountType,
		"isVisible" : true,
		"left": "4%",
		"top": "3%",
	    "centerX" : "50%"
	};
    var lblLayout ={containerWeight:100};
    var lblLayoutConfig ={renderAsAnchor:true, wrapping:constants.WIDGET_TEXT_WORD_WRAP};

    var lbl = new kony.ui.Label(lblBasic, lblLayout, lblLayoutConfig);
	
	return lbl;
}//Type your code here