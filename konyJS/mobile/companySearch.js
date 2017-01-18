var companies =[];
function fetchAllCompanies(){
	if(companies.length==0){
		kony.print("Perf Log: Manage payee company load service call - start");
		var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
	    var options ={
	                    "access": "online",
	                    "objectName": "RBObjects"
	                 };
	    var headers = {"session_token":kony.retailBanking.globalData.session_token};
	    var serviceName = "RBObjects";
		var modelObj = INSTANCE.getModel("BillerCompany",serviceName,options);
	    var dataObject = new kony.sdk.dto.DataObject("BillerCompany");
		var serviceOptions = {"dataObject":dataObject, "headers":headers};
	    modelObj.fetch(serviceOptions, dataSuccess, dataError);
		
		function dataSuccess(response){
		  kony.print("Perf Log:  Manage payee company load service call - End");
	      companies = response;
		}
		function dataError(err){
			kony.sdk.mvvm.log.error("Error occured while fetching data from Company entity");
	      customErrorCallback(err);
		}
	}
  }

var dummycompanies = [{
	"companyid" : 1,
	"companyName" : "Kony"
},{
	"companyid" : 2,
	"companyName" : "Adobe"
},{
	"companyid" : 3,
	"companyName" : "Gati"
},{
	"companyid" : 4,
	"companyName" : "Amazon"
},{
	"companyid" : 5,
	"companyName" : "Pramati"
},{
	"companyid" : 6,
	"companyName" : "Microsoft"
},{
	"companyid" : 7,
	"companyName" : "Pega"
},{
	"companyid" : 8,
	"companyName" : "Factset"
},{
	"companyid" : 9,
	"companyName" : "Intel"
},{
	"companyid" : 10,
	"companyName" : "Kony Private Ltd"
},{
	"companyid" : 11,
	"companyName" : "Adobe2"
},{
	"companyid" : 12,
	"companyName" : "Amazon3"
},{
	"companyid" : 13,
	"companyName" : "Micro"
}];

function populateCompanyList(){
frmAddNewPayeeKA.segCompanyListKA.widgetDataMap = { 
                lblCompanyNameKA : "companyName"
                                 };
frmAddNewPayeeKA.segCompanyListKA.setData(companies);
}
function searchTextChangeCompany(){
	var word = frmAddNewPayeeKA.newPayeeNameTextfield.text;
	if(word.length>0){
		frmAddNewPayeeKA.segCompanyListKA.widgetDataMap = { 
                lblCompanyNameKA : "companyName"
                                 };
		frmAddNewPayeeKA.flxScrollCompanyListKA.isVisible = true;
		var searchedObj = SearchData(word,"companyName");
        if(searchedObj !== null){
		frmAddNewPayeeKA.segCompanyListKA.setData(searchedObj);
        }else{
          frmAddNewPayeeKA.flxScrollCompanyListKA.isVisible = false;
        }
	}else{
		frmAddNewPayeeKA.flxScrollCompanyListKA.isVisible = false;
	}
}

function SelectedCompany(){
	var selectedRecord = frmAddNewPayeeKA.segCompanyListKA.selectedItems[0];
	frmAddNewPayeeKA.newPayeeNameTextfield.text = selectedRecord["companyName"];
	frmAddNewPayeeKA.flxScrollCompanyListKA.isVisible = false;
}

function populateCompanyListEdit(){
frmEditPayeeKAwithCmpny.segCompanyListKA.widgetDataMap = { 
                lblCompanyNameKA : "companyName"
                                 };
frmEditPayeeKAwithCmpny.segCompanyListKA.setData(companies);
}
function searchTextChangeEdit(){
	var word = frmEditPayeeKAwithCmpny.newPayeeNameTextfield.text;
	if(word.length>0){
		frmEditPayeeKAwithCmpny.segCompanyListKA.widgetDataMap = { 
                lblCompanyNameKA : "companyName"
                                 };
		frmEditPayeeKAwithCmpny.flxScrollCompanyListKA.isVisible = true;
		var searchedObj = SearchData(word,"companyName");
        if(searchedObj !== null){
		frmEditPayeeKAwithCmpny.segCompanyListKA.setData(searchedObj);
        }else{
          frmEditPayeeKAwithCmpny.flxScrollCompanyListKA.isVisible = false;
        }
	}else{
		frmEditPayeeKAwithCmpny.flxScrollCompanyListKA.isVisible = false;
	}
}

function SelectedCompanyEdit(){
	var selectedRecord = frmEditPayeeKAwithCmpny.segCompanyListKA.selectedItems[0];
	frmEditPayeeKAwithCmpny.newPayeeNameTextfield.text = selectedRecord["companyName"];
	frmEditPayeeKAwithCmpny.flxScrollCompanyListKA.isVisible = false;
}

function SearchData(searchText,searchLbl)
{
	try{
         var gblListSegData=companies;
			if(searchText&&searchText.length >= 1)
			{
			    var newSegData=[];
				var tempArray=[];
				var j=0;
				for(var i=0;i<gblListSegData.length;i++)
					{
						var temp = gblListSegData[i];
						var event = temp[searchLbl];             
						if(event.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
							{	
                        
								newSegData.push(temp);					
								j++;
                               
							}
				   }
				   if(j===0){
						return null;
				   }else{
						return newSegData;                           
				   }
					
			}
	}catch(err)
	{
	  return null;
	}	
}