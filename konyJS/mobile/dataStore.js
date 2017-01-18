kony = kony || {};
kony.retailBanking = kony.retailBanking || {};
kony.retailBanking.datastore = kony.retailBanking.datastore || {};

//This method is use for encrypting and persisting encrypted username
kony.retailBanking.datastore.saveUserName = function(user){
	var key = kony.sdk.mvvm.generateAndSaveKey("RetailBanking");
	var username = kony.sdk.mvvm.encryptData(key,user);
	var usernamebase64 = kony.convertToBase64(username);
	var cred = {};
	cred["username"] = usernamebase64;
	cred["key"] = key;
	kony.store.setItem("cred",cred);
};

//This method is used for encrypting and persisting encrypted password
kony.retailBanking.datastore.savePassword = function(pass){
	var cred = kony.store.getItem("cred");
	var key = cred["key"];
	var password = kony.sdk.mvvm.encryptData(key,pass);
	var passwordbase64 = kony.convertToBase64(password);
	cred["password"] = passwordbase64;
	kony.store.setItem("cred",cred);
	kony.sdk.mvvm.userObj = {};
};

//This method is used for getting persisted user credentials
kony.retailBanking.datastore.getUserCred = function(){
	var credStore = kony.store.getItem("cred");
	var cred = {};
	var key = credStore["key"];
	cred["username"] = kony.sdk.mvvm.decryptData(key,kony.convertToRawBytes(credStore["username"]));
	if(credStore["password"]){
		cred["password"] = kony.sdk.mvvm.decryptData(key,kony.convertToRawBytes(credStore["password"]));
	}
	return cred;
};

//This method is used for encrypting and setting persistent Account Preview Data
kony.retailBanking.datastore.setAccountListObject = function(responseData){
  	var key = kony.sdk.mvvm.generateAndSaveKey("RetailBanking");
	//var responseDataencrypted = kony.sdk.mvvm.encryptData(key,responseData);
	//var responseDataencryptedbase64 = kony.convertToBase64(responseDataencrypted);
    var responseDataencryptedbase64 = responseData;
	var accountResponseObject = {};
	accountResponseObject["response"] = responseDataencryptedbase64;
	accountResponseObject["key"] = key;
	kony.store.setItem("accountResponseObject",accountResponseObject);
};

//This method is used for getting persistent Account Preview Data
kony.retailBanking.datastore.getAccountListObject = function(){
  	var accountResponseStore = kony.store.getItem("accountResponseObject");
	var accountResponseObject = {};
	var key = accountResponseStore["key"];
	if(accountResponseStore["response"]){
	     // accountResponseObject["response"] = kony.sdk.mvvm.decryptData(key,kony.convertToRawBytes(accountResponseStore["response"]));
         accountResponseObject["response"] = accountResponseStore["response"];
	}
	return accountResponseObject;
};

kony.retailBanking.datastore.setEncryptionObj = function(accountPreviewData)
{
 
    var encryptedAcntObject = [];
   	var sampleKey,sampleValue,dataValue;
    for (dataValue in accountPreviewData)
    {
          encryptedAcntObject[dataValue] = accountPreviewData[dataValue];
          for(var key in accountPreviewData[dataValue])
          {
            sampleKey = key;
            sampleValue =JSON.stringify(accountPreviewData[dataValue][key]);
            encryptedAcntObject[dataValue][sampleKey] = EncryptValue(sampleValue);
          }
      }
  	kony.store.setItem("encryptedAcntObj",encryptedAcntObject);
}

kony.retailBanking.datastore.getDecryptionObj = function()
{
   var decryptedAcntData = kony.store.getItem("encryptedAcntObj");
   var decryptedAcntObj = [];
   var sampleKey,sampleValue,dataValue;
    for (dataValue in decryptedAcntData)
   {
          decryptedAcntObj[dataValue] = decryptedAcntData[dataValue];
          for(var key in decryptedAcntData[dataValue])
          {
         sampleKey = key;
         sampleValue =decryptedAcntData[dataValue][key];
        decryptedAcntObj[dataValue][sampleKey] = JSON.parse(DecryptValue(sampleValue));
          }
    }
 
 	return decryptedAcntObj;
};


//This method is used for encrypting and setting persistent Setting Preview Data
kony.retailBanking.datastore.setSettingsObject = function(responseData){
  	var key = kony.sdk.mvvm.generateAndSaveKey("RetailBanking");
	//var responseDataencrypted = kony.sdk.mvvm.encryptData(key,responseData);
	//var responseDataencryptedbase64 = kony.convertToBase64(responseDataencrypted);
    var responseDataencryptedbase64 = responseData;
	var settingResponseObject = {};
	settingResponseObject["response"] = responseDataencryptedbase64;
	settingResponseObject["key"] = key;
	kony.store.setItem("settingsResponseObject",settingResponseObject);
};

//This method is used for getting persistent Setting Preview Data
kony.retailBanking.datastore.getSettingsObject = function(){
  	var settingResponseStore = kony.store.getItem("settingsResponseObject");
	var settingResponseObject = {};
	var key = settingResponseStore["key"];
	if(settingResponseStore["response"]){
	     // accountResponseObject["response"] = kony.sdk.mvvm.decryptData(key,kony.convertToRawBytes(settingResponseStore["response"]));
         settingResponseObject["response"] = settingResponseStore["response"];
	}
	return settingResponseObject;
};
