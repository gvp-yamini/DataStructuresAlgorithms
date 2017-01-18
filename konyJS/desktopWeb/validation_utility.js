kony = kony || {};
kony.retailBanking = kony.retailBanking || {};
kony.retailBanking.util = kony.retailBanking.util || {};


kony.retailBanking.util.BACKEND_DATE_TIME_FORMAT = "YYYY-MM-DDTHH:MM:SS";
kony.retailBanking.util.BACKEND_DATE_FORMAT = "YYYY-MM-DD";
kony.retailBanking.util.APPLICATION_DATE_TIME_FORMAT1 = "m/d/Y h:i A";
kony.retailBanking.util.APPLICATION_DATE_FORMAT = "m/d/Y";
kony.retailBanking.util.APPLICATION_CALENDAR_FORMAT = "DD/MM/YYYY";

kony.retailBanking.util.currency_symbols = {
    'USD': '$', // US Dollar
  'EUR': '€', // Euro
  'CRC': '¢', // Costa Rican Colón
  'GBP': '£', // British Pound Sterling
  'ILS': '₪', // Israeli New Sheqel
  'INR': '?', // Indian Rupee
  'JPY': '¥', // Japanese Yen
  'KRW': '?', // South Korean Won
  'NGN': '?', // Nigerian Naira
  'PHP': '?', // Philippine Peso
  'PLN': 'zl', // Polish Zloty
  'DEM' : '€',
  'franc': '₣', 
  'PYG': '?', // Paraguayan Guarani
  'THB': '?', // Thai Baht
  'UAH': '?', // Ukrainian Hryvnia
  'VND': '?', // Vietnamese Dong
};

/**** Start of validation Related Methods ***/
kony.retailBanking.util.validation = kony.retailBanking.util.validation || {};
//This method validated checks for empty username and password
kony.retailBanking.util.validation.loginValidation = function(username,password){
	var errorMsg;
	if(!username || username.trim().length ===0){
		errorMsg = "Please enter valid Username.";
	}else if(!password || password.trim().length ===0){
		errorMsg = "Please enter valid Password.";
	}
};

//This method validates whether textArea is empty or not
kony.retailBanking.util.validation.validateTextArea = function(text, alertMessage) {
			    if(text === null ||  text === undefined || text == " "|| text ==="") {
			    	//alert(alertMessage);
			        return false;
			    }	
			    return true;
};

//This method validates textbox or label and accepts characters and special characters in regular exp
kony.retailBanking.util.validation.validateTextboxOrLabel = function(text, alertMessage) {
				var letters = /^[a-zA-Z0-9!@#%$^&*()_+\-=\[\]{};':"\\|,.<>\/? ]*$/;
    			if(text === null ||  text === undefined || text == " "|| text ==="") {
    				//alert(alertMessage);
       			    return false;
    		    }
			    else if(!(text.match(letters))){
    			   // alert(alertMessage);
       		        return false;
    			} 
				text = text && text.trim();
               	if(text === null ||  text === undefined || text == " "|| text ==="") {
    				//alert(alertMessage);
       			    return false;
    		    }
                else				
				    return true;
			};
//This method validates listBox for a valid input
kony.retailBanking.util.validation.validateListBox = function(selectvalue, alertMessage) {
    if(selectvalue == "select" || selectvalue == "Select" || selectvalue === -1 ||selectvalue == "-1" || selectvalue === null ) {
                   //alert(alertMessage);
                    return false;
    }
    return true;
};

//This method validates ZipCode,it allows numbers and characters
kony.retailBanking.util.validation.validateZip = function(text, alertMessage){
	var regex = /^[0-9a-zA-Z]*$/;
	if( !(text.match(regex)) ){
		alert(alertMessage);
        return false;
	}else if(text.replace(/ /g,'') !== "" && ( text.replace(/ /g,'').length !== 6 && text.replace(/ /g,'').length !== 5 && text.replace(/ /g,'').length !== 10 )){
		alert(alertMessage);
        return false;
	}
	return true;
};

//This method validates url
kony.retailBanking.util.validation.validateURL = function(url, alertMessage){
	if(!(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www\.)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(url)) && url.trim().length !== 0){
 		//alert(alertMessage);
        return false;
 	}
 	return true;
};

//This function true if email id format is valid
kony.retailBanking.util.validation.isValidEmail = function(email){
  return kony.string.isValidEmail(email);
};

//Invalid Characters- &, %, <, >, +, ‘, \, =, Pipe, Space
kony.retailBanking.util.validation.isValidUsername = function(username){
  	if(username == null)
      return false;
	else if(username.indexOf(" ") != -1){
		return false;
	}else if(username.length < 8 || username.length>24){
		return false;
	}else if(!isInvalidCharacterPresent(username)){
		return false;
	}
	return true;
}

//Invalid Characters- &, %, <, >, +, ‘, \, =, Pipe, Space and also values like 11111111 should not be allowed
kony.retailBanking.util.validation.isValidPassword = function(password){
  	if(password === null )
      return false;
	else if(password.indexOf(" ") !=-1){
		return false;
	}else if(password.length<8 || password.length>24){
		return false;
	}else if(!isInvalidCharacterPresent(password)){
		return false;
	}else if(!checkforUniqueness(password)){
		return false;
	}
	return true;
}

function isInvalidCharacterPresent(value){
	     var regexp = "&%<>+'\=|";
	    for(var i=0;i<regexp.length;i++){
		if(value.indexOf(regexp[i]) != -1){
			return false;
		}
	}
	return true;
}

function checkforUniqueness(val){
	var start = val[0];
	for(var i=1;i<val.length;i++){
		if(start!=val[i]){
			return true;
		}
	}
	return false;
}

//This function checks for Only numbers in phone number
kony.retailBanking.util.validation.isValidNumber = function(phoneNumber){  
  var phoneno = /^\d{8,15}$/;  
  if(phoneNumber === null)return false;// no number case
  
  if(phoneNumber.match(phoneno)){  
        return true;  
     }else{    
        return false;  
        }   
};

//This function checks whether the date is within range or not
kony.retailBanking.util.validation.isDateWithinRange = function(fromDate,toDate,dateToCheck){
  var fDate,lDate,cDate;
    fDate = Date.parse(fromDate);
    lDate = Date.parse(toDate);
    cDate = Date.parse(dateToCheck);

    if((cDate <= lDate && cDate >= fDate)) {
        return true;
    }
    return false;
};

//This function checks the amount is within the specified range
kony.retailBanking.util.validation.isAmountWithinRange = function(lowerLimit,uperLimit,amountToCheck){
  var lowerVal,upperVal;
  if(lowerLimit>uperLimit){
     lowerVal = uperLimit;
     upperVal = lowerLimit;
  }else{
      lowerVal = lowerLimit;
      upperVal = uperLimit;
  }
  return value >= lowerVal && value <= upperVal;
};

//This method is used for truncation,requires value,max number of characters,number of characters to have in substring and characters with we need to truncate.
kony.retailBanking.util.validation.trucateTo = function(value, num_char, num_char_trunc, appendingstring) {
            			if (typeof value == "string" && typeof num_char == "number" && typeof num_char_trunc == "number") {
            						if (value.length > num_char) {
                						value = value.substring(0, num_char_trunc);
                						value = value + appendingstring;
            							}
            							return value;
        							}
       						 return value;
    					};
/**** Start of Date Related Methods ***/
kony.retailBanking.util.formatingDate = kony.retailBanking.util.formatingDate || {};

//This method returns date format based on the device locale
kony.retailBanking.util.formatingDate.datelocaleformat = function(){
	               var fmtjson = {"ar-SA":"d/m/y","bg-BG":"d.n.Y","ca-ES":"d/m/Y","zh-TW":"Y/n/j","cs-CZ":"j.n.Y","da-DK":"d-m-Y","de-DE":"d.m.Y","el-GR":"j/n/Y","en-US":"n/j/Y","fi-FI":"j.n.Y","fr-FR":"d/m/Y","he-IL":"d/m/Y","hu-HU":"Y. m. d.","is-IS":"j.n.Y","it-IT":"d/m/Y","ja-JP":"Y/m/d","ko-KR":"Y-m-d","nl-NL":"j-n-Y","nb-NO":"d.m.Y","pl-PL":"Y-m-d","pt-BR":"j/n/Y","ro-RO":"d.m.Y","ru-RU":"d.m.Y","hr-HR":"j.n.Y","sk-SK":"j. n. Y","sq-AL":"Y-m-d","sv-SE":"Y-m-d","th-TH":"j/n/Y","tr-TR":"d.m.Y","ur-PK":"d/m/Y","id-ID":"d/m/Y","uk-UA":"d.m.Y","be-BY":"d.m.Y","sl-SI":"j.n.Y","et-EE":"j.m.Y","lv-LV":"Y.m.d.","lt-LT":"Y.m.d","fa-IR":"m/d/Y","vi-VN":"d/m/Y","hy-AM":"d.m.Y","az-Latn-AZ":"d.m.Y","eu-ES":"Y/m/d","mk-MK":"d.m.Y","af-ZA":"Y/m/d","ka-GE":"d.m.Y","fo-FO":"d-m-Y","hi-IN":"d-m-Y","ms-MY":"d/m/Y","kk-KZ":"d.m.Y","ky-KG":"d.m.y","sw-KE":"n/j/Y","uz-Latn-UZ":"d/m Y","tt-RU":"d.m.Y","pa-IN":"d-m-y","gu-IN":"d-m-y","ta-IN":"d-m-Y","te-IN":"d-m-y","kn-IN":"d-m-y","mr-IN":"d-m-Y","sa-IN":"d-m-Y","mn-MN":"y.m.d","gl-ES":"d/m/y","kok-IN":"d-m-Y","syr-SY":"d/m/Y","dv-MV":"d/m/y","ar-IQ":"d/m/Y","zh-CN":"Y/n/j","de-CH":"d.m.Y","en-GB":"d/m/Y","es-MX":"d/m/Y","fr-BE":"j/m/Y","it-CH":"d.m.Y","nl-BE":"j/m/Y","nn-NO":"d.m.Y","pt-PT":"d-m-Y","sr-Latn-CS":"j.n.Y","sv-FI":"j.n.Y","az-Cyrl-AZ":"d.m.Y","ms-BN":"d/m/Y","uz-Cyrl-UZ":"d.m.Y","ar-EG":"d/m/Y","zh-HK":"j/n/Y","de-AT":"d.m.Y","en-AU":"j/m/Y","es-ES":"d/m/Y","fr-CA":"Y-m-d","sr-Cyrl-CS":"j.n.Y","ar-LY":"d/m/Y","zh-SG":"j/n/Y","de-LU":"d.m.Y","en-CA":"d/m/Y","es-GT":"d/m/Y","fr-CH":"d.m.Y","ar-DZ":"d-m-Y","zh-MO":"j/n/Y","de-LI":"d.m.Y","en-NZ":"j/m/Y","es-CR":"d/m/Y","fr-LU":"d/m/Y","ar-MA":"d-m-Y","en-IE":"d/m/Y","es-PA":"m/d/Y","fr-MC":"d/m/Y","ar-TN":"d-m-Y","en-ZA":"Y/m/d","es-DO":"d/m/Y","ar-OM":"d/m/Y","en-JM":"d/m/Y","es-VE":"d/m/Y","ar-YE":"d/m/Y","en-029":"m/d/Y","es-CO":"d/m/Y","ar-SY":"d/m/Y","en-BZ":"d/m/Y","es-PE":"d/m/Y","ar-JO":"d/m/Y","en-TT":"d/m/Y","es-AR":"d/m/Y","ar-LB":"d/m/Y","en-ZW":"n/j/Y","es-EC":"d/m/Y","ar-KW":"d/m/Y","en-PH":"n/j/Y","es-CL":"d-m-Y","ar-AE":"d/m/Y","es-UY":"d/m/Y","ar-BH":"d/m/Y","es-PY":"d/m/Y","ar-QA":"d/m/Y","es-BO":"d/m/Y","es-SV":"d/m/Y","es-HN":"d/m/Y","es-NI":"d/m/Y","es-PR":"d/m/Y","am-ET":"j/n/Y","tzm-Latn-DZ":"d-m-Y","iu-Latn-CA":"j/m/Y","sma-NO":"d.m.Y","mn-Mong-CN":"Y/n/j","gd-GB":"d/m/Y","en-MY":"j/n/Y","prs-AF":"d/m/y","bn-BD":"d-m-y","wo-SN":"d/m/Y","rw-RW":"n/j/Y","qut-GT":"d/m/Y","sah-RU":"m.d.Y","gsw-FR":"d/m/Y","co-FR":"d/m/Y","oc-FR":"d/m/Y","mi-NZ":"d/m/Y","ga-IE":"d/m/Y","se-SE":"Y-m-d","br-FR":"d/m/Y","smn-FI":"j.n.Y","moh-CA":"n/j/Y","arn-CL":"d-m-Y","ii-CN":"Y/n/j","dsb-DE":"j. n. Y","ig-NG":"j/n/Y","kl-GL":"d-m-Y","lb-LU":"d/m/Y","ba-RU":"d.m.y","nso-ZA":"Y/m/d","quz-BO":"d/m/Y","yo-NG":"j/n/Y","ha-Latn-NG":"j/n/Y","fil-PH":"n/j/Y","ps-AF":"d/m/y","fy-NL":"j-n-Y","ne-NP":"n/j/Y","se-NO":"d.m.Y","iu-Cans-CA":"j/n/Y","sr-Latn-RS":"j.n.Y","si-LK":"Y-m-d","sr-Cyrl-RS":"j.n.Y","lo-LA":"d/m/Y","km-KH":"Y-m-d","cy-GB":"d/m/Y","bo-CN":"Y/n/j","sms-FI":"j.n.Y","as-IN":"d-m-Y","ml-IN":"d-m-y","en-IN":"d-m-Y","or-IN":"d-m-y","bn-IN":"d-m-y","tk-TM":"d.m.y","bs-Latn-BA":"j.n.Y","mt-MT":"d/m/Y","sr-Cyrl-ME":"j.n.Y","se-FI":"j.n.Y","zu-ZA":"Y/m/d","xh-ZA":"Y/m/d","tn-ZA":"Y/m/d","hsb-DE":"j. n. Y","bs-Cyrl-BA":"j.n.Y","tg-Cyrl-TJ":"d.m.y","sr-Latn-BA":"j.n.Y","smj-NO":"d.m.Y","rm-CH":"d/m/Y","smj-SE":"Y-m-d","quz-EC":"d/m/Y","quz-PE":"d/m/Y","hr-BA":"j.n.Y.","sr-Latn-ME":"j.n.Y","sma-SE":"Y-m-d","en-SG":"j/n/Y","ug-CN":"Y-n-j","sr-Cyrl-BA":"j.n.Y","es-US":"m/d/Y"};
                   var current_locale = kony.i18n.getCurrentDeviceLocale();
	               var formatLocale = "";
	               if (kony.retailBanking.globalData.deviceInfo.isIphone() || kony.retailBanking.globalData.deviceInfo.isIpad()){
		              formatLocale = current_locale.substring(0,2)+"-"+current_locale.substring(3,5);
	                }else{
		              formatLocale = current_locale.language+"-"+current_locale.country;
	            }
	          var fmt = (formatLocale in fmtjson)?fmtjson[formatLocale]:"m/d/Y";
	          return fmt;
             };


//This method returns Currency format based on the device locale
kony.retailBanking.util.formatingDate.currencyformat = function(currncyValue){
                   var current_locale = kony.i18n.getCurrentDeviceLocale();
	          return currncyValue.toLocaleString(current_locale);
             };
kony.retailBanking.util.APPLICATION_DATE_TIME_FORMAT = kony.retailBanking.util.formatingDate.datelocaleformat()+" h:i A";
kony.retailBanking.util.APPLICATION_DATE_FORMAT = kony.retailBanking.util.formatingDate.datelocaleformat();

//This method will format dateTime according to device locale,if time is not available it will only format date
kony.retailBanking.util.formatingDate.getApplicationFormattedDateTime = function(newData,LocalisationRequired){
  					var finalVal = "";
					if(newData && (newData.length >= kony.retailBanking.util.BACKEND_DATE_FORMAT.length)){//data and time formatting
							finalVal = kony.retailBanking.util.formatingDate.getISODateTimeKA(newData, kony.retailBanking.util.BACKEND_DATE_TIME_FORMAT);
							if(finalVal && (finalVal instanceof Date)){
									if(!LocalisationRequired){//if localisation is not required
											finalVal = finalVal.format(kony.retailBanking.util.APPLICATION_DATE_TIME_FORMAT1);
									}
									else{
                                      finalVal = finalVal.format(kony.retailBanking.util.APPLICATION_DATE_TIME_FORMAT);
                                    }

							}
								}else{ // only date is formatted
								finalVal = kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA(newData);
							}
							finalVal = finalVal || "";
					return finalVal;
};

//This method formats only date based on application format date locale
kony.retailBanking.util.formatingDate.getApplicationFormattedDateKA=function(newData){
	          		var finalVal = "";
						if(newData){
								finalVal = kony.retailBanking.util.formatingDate.getISODateTimeKA(newData, kony.retailBanking.util.BACKEND_DATE_FORMAT);
								if(finalVal && (finalVal instanceof Date)){
								finalVal = finalVal.format(kony.retailBanking.util.APPLICATION_DATE_FORMAT);
								}
							}	
							finalVal = finalVal || "";
							return finalVal;
					};

kony.retailBanking.util.formatingDate.getDateObjFromKonyCalendarArray = function(konyCalendarArray) {
    if (konyCalendarArray && konyCalendarArray instanceof Array) {
        return new Date(konyCalendarArray[2], konyCalendarArray[1] - 1, konyCalendarArray[0]);
    }
    return null;
};

kony.retailBanking.util.formatingDate.getcalObjfromFormattedData = function(DateString){
	var format = kony.retailBanking.util.APPLICATION_DATE_FORMAT;
	var calformat = kony.retailBanking.util.APPLICATION_CALENDAR_FORMAT;
	//works for belo calendar formats
	/* "DD/MM/YYYY"
"MM/DD/YYYY"
"YYYY/MM/DD" */
	var calObj = [];
	if(DateString){
		format = format.toUpperCase();
		calformat = calformat.toUpperCase();
		var yyyyIndex = format.indexOf("YYYY");
		var ddIndex = format.indexOf("DD");
		var mmIndex = format.indexOf("MM");
		if(yyyyIndex>-1 && ddIndex>-1 && mmIndex>-1){
			var newdd = parseInt(DateString.substr(ddIndex, 2), 10);
            var newmm = parseInt(DateString.substr(mmIndex, 2), 10);
            var newyyyy = parseInt(DateString.substr(yyyyIndex, 4), 10);
		}else{
          //n/j/Y
          var arr = DateString.split("/");
          var newdd = parseInt(arr[0], 10);
          var newmm = parseInt(arr[1], 10);
          var newyyyy = parseInt(arr[2], 10);
        }
      	    var calyyyyIndex = calformat.indexOf("YYYY");
		    var calddIndex = calformat.indexOf("DD");
		    var calmmIndex = calformat.indexOf("MM");
			if(calyyyyIndex>-1 && calddIndex>-1 && calmmIndex>-1){
				if(calddIndex<calyyyyIndex && calmmIndex>calddIndex && calmmIndex<calyyyyIndex){
					return [newdd,newmm,newyyyy];
				}
				if(calddIndex>calmmIndex && calddIndex<calyyyyIndex && calmmIndex<calyyyyIndex){
					return [newmm,newdd,newyyyy];
				}
				if(calyyyyIndex<calmmIndex && calddIndex>calmmIndex && calyyyyIndex<calddIndex){
					return [newyyyy,newmm,newdd];
				}
			}
	}
};

//this returns dateTime object for given input
kony.retailBanking.util.formatingDate.getISODateTimeKA = function(newDate, format) {
            try {
                var finalDateTime = null;
                if (newDate && format) {
                    var formattype = format.toUpperCase();
                    var yyyyIndex = formattype.indexOf("YYYY");
                    var mmIndex = formattype.indexOf("MM");
                    var ddIndex = formattype.indexOf("DD");
                    var hhIndex = formattype.indexOf("HH");
                    var minIndex = formattype.indexOf("MM", mmIndex + 1);
                    var ssIndex = formattype.indexOf("SS");
                    if (yyyyIndex > -1 && mmIndex > -1 && ddIndex > -1) {
                        var newdd = parseInt(newDate.substr(ddIndex, 2), 10);
                        var newmm = parseInt(newDate.substr(mmIndex, 2), 10);
                        var newyyyy = parseInt(newDate.substr(yyyyIndex, 4), 10);
                        if (newdd && (0 < newdd && newdd <= 31) && (newmm && (0 < newmm && newmm <= 12)) && (newyyyy && 0 <= newyyyy)) {
                            finalDateTime = new Date(newyyyy, newmm - 1, newdd, 0, 0, 0, 0);
                        }
                        var newTime = hhIndex > -1 ? newDate.substr(hhIndex, 2) : null;
                        newTime = newTime ? parseInt(newTime, 10) : null;
                        if (newTime && newTime < 24) {
                            finalDateTime = finalDateTime ? finalDateTime.setHours(newTime, 0, 0) : null;
                            finalDateTime = new Date(finalDateTime);
                        }
                        var newmin = minIndex > -1 ? newDate.substr(minIndex, 2) : null;
                        newmin = newmin ? parseInt(newmin, 10) : null;
                        if (newmin) {
                            finalDateTime = finalDateTime ? finalDateTime.setMinutes(newmin) : null;
                            finalDateTime = new Date(finalDateTime);
                        }
                        var newss = ssIndex > -1 ? newDate.substr(ssIndex, 4) : null;
                        newss = newss ? parseInt(newss, 10) : null;
                        if (newss) {
                            finalDateTime = finalDateTime ? finalDateTime.setSeconds(newss) : null;
                            finalDateTime = new Date(finalDateTime);
                        }
                    }
                }
                return finalDateTime;
            } catch (err) {
                kony.print("Error in ISO date formatting -->" + err);
            }
        }; 

/**** Start of Amount Related Methods ***/
kony.retailBanking.util.formatingAmount = kony.retailBanking.util.formatingAmount || {};
//converts amount to locale format without currency code eg: 1234 to 1,234
kony.retailBanking.util.formatingAmount.convertAmountToSpecificLocaleFormat = function(amount){
  return formatAmount(amount);
};

kony.retailBanking.util.formatingDate.getDBDateTimeFormat = function(calenderDateArray,AMPMTimeFormatString)
{
   var year = 1970,month = 0,day = 1,hours = 0,minutes = 0;
   if( AMPMTimeFormatString )
   {
      var timeArray = kony.retailBanking.util.formatingDate.get24TimeFormatFromAMPM(AMPMTimeFormatString);
	  hours = timeArray && timeArray[0];
	  minutes = timeArray && timeArray[1];
   }
   if( calenderDateArray && calenderDateArray instanceof Array)
   {
      var year = calenderDateArray[2];
	  var month = calenderDateArray[1]-1;
	  var day  = calenderDateArray[0];
   }
   var dateObject = new Date(year,month,day,hours,minutes);
	return dateObject;
};

kony.retailBanking.util.formatingDate.get24TimeFormatFromAMPM = function(AMPMTimeFormatString)
{
  var timeArray = AMPMTimeFormatString && AMPMTimeFormatString.split(":");
  var hours = timeArray && timeArray[0];
  var timeArray = timeArray && timeArray[1] && timeArray[1].split(" ");
  var minutes = timeArray && timeArray[0];
  var AMPMString = timeArray && timeArray[1];
  hours = Number(hours);
  minutes = Number(minutes);
  if(AMPMString == "PM" && hours<12)
  {
    hours = hours+12;
  }
  if(AMPMString == "AM" && hours==12)
  {
    hours = hours-12;
  }
  if(hours<10)
  {
    hours = "0"+hours;
  }
  if( minutes < 10 )
  {
    minutes = "0"+minutes;
  }
  return [hours,minutes]
};

//returns local format string like en-US
kony.retailBanking.util.formatingAmount.getLocaleFormatString = function(){
  var current_locale = kony.i18n.getCurrentDeviceLocale();
  var formatLocale = "";
  if (kony.retailBanking.globalData.deviceInfo.isIphone() || kony.retailBanking.globalData.deviceInfo.isIpad()){
		   formatLocale = current_locale.substring(0,2)+"-"+current_locale.substring(3,5);
	  }else{
		   formatLocale = current_locale.language+"-"+current_locale.country;
	   }
  return formatLocale;
};
kony.retailBanking.util.formatingAmount.maskingLastFourDigits = function(accountNumber){

        var lastFourDigits = accountNumber.substring(accountNumber.length-4, accountNumber.length);
		return "XXXX XXXX XXXX "+lastFourDigits;
};

//converts amount to locale format with currency symbol when currency code is passed
kony.retailBanking.util.formatingAmount.appendingCurrencyCodeToAmount = function(amount, currencyCode) {
 if(!currencyCode){
		if(kony.retailBanking.globalData.globals.CurrencyCode){
           currencyCode = kony.retailBanking.globalData.globals.CurrencyCode;
		}
    }
    amount = amount.toString();
    var negative = "";
    if (amount[0] == '-') {
        negative = "-";
        amount = amount.slice(1);
    }
    var currencies = {
        "bg-BG": 'BGN',
        "ca-ES": '€',
        "cs-CZ": 'Kc',
        "da-DK": 'kr',
        "de-DE": '€',
        "el-GR": '€',
        "en-US": '$',
        "fi-FI": '€',
        "fr-FR": '€',
        "hu-HU": 'Ft',
        "it-IT": '€',
        "ja-JP": '¥',
        "nl-NL": '€',
        "nb-NO": 'kr',
        "pl-PL": 'zl',
        "pt-BR": 'R$',
        "ro-RO": 'lei',
        "ru-RU": 'p.',
        "hr-HR": 'kn',
        "id-ID": 'Rp.',
        "en-IN": '?',
        "en-GB": '£'
    };
	if(amount.indexOf(kony.retailBanking.util.currency_symbols[currencyCode])!= -1)
		return amount;
    if(amount !== "")
    	amount = formattedNumberLocale(amount);
    if (kony.retailBanking.util.currency_symbols.hasOwnProperty(currencyCode)) {
		if(amount.indexOf(kony.retailBanking.util.currency_symbols[currencyCode]) == -1)
        {
          return negative + kony.retailBanking.util.currency_symbols[currencyCode] + "" + amount;
		}else{
			return amount;
		}
    }
	else 
    return kony.retailBanking.globalData.globals.CurrencyCode+""+amount;
	
};

//This function return the formatted amount like 1000 -->1,000
function formatAmount(x, sep) {
    var sx = (''+x).split('.'), s = '', i, j;
    sep = sep || (sep = ','); // default seperator
    i = sx[0].length;
    while (i > 3) {
        j = i - 3;
        s = sep + sx[0].slice(j, i) + s;
        i = j;
    }
    s = sx[0].slice(0, i) + s;
    sx[0] = s;
    return sx.join('.');
}

Date.prototype.format = function(format){
 var date = this;
 /*format=format.replace(/yyyy/,Date.replaceChars['Y'].call(date));
 format=format.replace(/yy/,Date.replaceChars['y'].call(date));
    format=format.replace(/mm/,Date.replaceChars['m'].call(date));
    format=format.replace(/m/,Date.replaceChars['n'].call(date));
    format=format.replace(/dd/,Date.replaceChars['d'].call(date));
    format=format.replace(/d/,Date.replaceChars['j'].call(date));  
 format=format.replace(/l/,Date.replaceChars['l'].call(date));
 format=format.replace(/F/,Date.replaceChars['F'].call(date));
 format=format.replace(/h/,Date.replaceChars['h'].call(date));
 format=format.replace(/i/,Date.replaceChars['i'].call(date));
 format=format.replace(/A/,Date.replaceChars['A'].call(date));
 return format;*/
 return format.replace(/(\\?)(.)/g, function (_, esc, chr) {
   return esc === "" && Date.replaceChars[chr] ? Date.replaceChars[chr].call(date) : chr
  })
}

Date.replaceChars = {
 shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    longMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    longDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  d : function () {
   return (this.getDate() < 10 ? "0" : "") + this.getDate();
  },
  D : function () {
   return Date.replaceChars.shortDays[this.getDay()];
  },
  j : function () {
   return this.getDate();
  },
  l : function () {
   return Date.replaceChars.longDays[this.getDay()];
  },
  N : function () {
   return this.getDay() === 0 ? 7 : this.getDay();
  },
  S : function () {
   return this.getDate() % 10 == 1 && this.getDate() != 11 ? "st" : this.getDate() % 10 == 2 && this.getDate() != 12 ? "nd" : this.getDate() % 10 == 3 && this.getDate() != 13 ? "rd" : "th";
  },
  w : function () {
   return this.getDay();
  },
  z : function () {
   var d = new Date(this.getFullYear(), 0, 1);
   return Math.ceil((this - d) / 864e5);
  },
  W : function () {
   var target = new Date(this.valueOf());
   var dayNr = (this.getDay() + 6) % 7;
   target.setDate(target.getDate() - dayNr + 3);
   var firstThursday = target.valueOf();
   target.setMonth(0, 1);
   if (target.getDay() !== 4) {
    target.setMonth(0, 1 + (4 - target.getDay() + 7) % 7);
   }
   return 1 + Math.ceil((firstThursday - target) / 6048e5);
  },
  F : function () {
   return Date.replaceChars.longMonths[this.getMonth()];
  },
  m : function () {
   return (this.getMonth() < 9 ? "0" : "") + (this.getMonth() + 1);
  },
  M : function () {
   return Date.replaceChars.shortMonths[this.getMonth()];
  },
  n : function () {
   return this.getMonth() + 1;
  },
  t : function () {
   var d = new Date();
   return new Date(d.getFullYear(), d.getMonth(), 0).getDate();
  },
  L : function () {
   var year = this.getFullYear();
   return year % 400 === 0 || year % 100 !== 0 && year % 4 === 0;
  },
  o : function () {
   var d = new Date(this.valueOf());
   d.setDate(d.getDate() - (this.getDay() + 6) % 7 + 3);
   return d.getFullYear();
  },
  Y : function () {
   return this.getFullYear();
  },
  y : function () {
   return ("" + this.getFullYear()).substr(2);
  },
  a : function () {
   return this.getHours() < 12 ? "am" : "pm";
  },
  A : function () {
   return this.getHours() < 12 ? "AM" : "PM";
  },
  B : function () {
   return Math.floor(((this.getUTCHours() + 1) % 24 + this.getUTCMinutes() / 60 + this.getUTCSeconds() / 3600) * 1e3 / 24);
  },
  g : function () {
   return this.getHours() % 12 || 12;
  },
  G : function () {
   return this.getHours();
  },
  h : function () {
   return ((this.getHours() % 12 || 12) < 10 ? "0" : "") + (this.getHours() % 12 || 12);
  },
  H : function () {
   return (this.getHours() < 10 ? "0" : "") + this.getHours();
  },
  i : function () {
   return (this.getMinutes() < 10 ? "0" : "") + this.getMinutes();
  },
  s : function () {
   return (this.getSeconds() < 10 ? "0" : "") + this.getSeconds();
  },
  u : function () {
   var m = this.getMilliseconds();
   return (m < 10 ? "00" : m < 100 ? "0" : "") + m;
  },
  e : function () {
   return "Not Yet Supported";
  },
  I : function () {
   var DST = null;
   for (var i = 0; i < 12; ++i) {
    var d = new Date(this.getFullYear(), i, 1);
    var offset = d.getTimezoneOffset();
    if (DST === null)
     DST = offset;
    else if (offset < DST) {
     DST = offset;
     break;
    } else if (offset > DST)
     break;
   }
   return this.getTimezoneOffset() == DST | 0;
  },
  O : function () {
   return (-this.getTimezoneOffset() < 0 ? "-" : "+") + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? "0" : "") + Math.abs(this.getTimezoneOffset() / 60) + "00";
  },
  P : function () {
   return (-this.getTimezoneOffset() < 0 ? "-" : "+") + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? "0" : "") + Math.abs(this.getTimezoneOffset() / 60) + ":00";
  },
  T : function () {
   return this.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/, "$1");
  },
  Z : function () {
   return -this.getTimezoneOffset() * 60;
  },
  c : function () {
   return this.format("Y-m-d\\TH:i:sP");
  },
  r : function () {
   return this.toString();
  },
  U : function () {
   return this.getTime() / 1e3;
  }
 };

// function to mask Account Number
kony.retailBanking.util.maskAccountNumber= function(AccNum){
	var numOfTimes = AccNum.length-4;
	var xValue="";
  if(AccNum.lenght<=4) return AccNum;
  for(var i=0;i<numOfTimes;i++){
	  xValue = xValue + 'X';
  }
  return xValue+AccNum.slice(-4);
};

/// It is Used To Number Formatting By Local Based

function formattedNumberLocale(amount){
	var amount_number = kony.os.toNumber(amount);
 	var current_locale = kony.i18n.getCurrentDeviceLocale();
	var formatLocale = "";
	if (kony.retailBanking.globalData.deviceInfo.isIphone()){
		formatLocale = current_locale.substring(0,2);//+"-"+current_locale.substring(3,5);
	}
	else{
		formatLocale = current_locale.language;//+"-"+current_locale.country;
	}
	formatLocale = (formatLocale)?formatLocale:"en";
	Globalize.culture( formatLocale );
	return Globalize.format(amount_number,"n");		 
}