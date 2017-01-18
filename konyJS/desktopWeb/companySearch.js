var companies =[];
function fetchAllCompanies(){
	if(companies.length==0){
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
	      companies = response;
		}
		function dataError(err){
			kony.sdk.mvvm.log.error("Error occured while fetching data from Company entity");
	      customErrorCallback(err);
		}
	}
  }

function populateCompanyList(){
frmAddNewPayeeKA.segMainCompanyKA.widgetDataMap = { 
                lblCompanyNameKA : "companyName"
                                 };
frmAddNewPayeeKA.segMainCompanyKA.setData(companies);
}
function searchTextChangeCompany(){
	var word = frmAddNewPayeeKA.tbxCompanyNameKA.text;
	if(word.length>0){
		frmAddNewPayeeKA.segMainCompanyKA.widgetDataMap = { 
                lblCompanyNameKA : "companyName"
                                 };
		var searchedObj = SearchData(word,"companyName");
        if(searchedObj !== null){
		frmAddNewPayeeKA.segMainCompanyKA.setData(searchedObj);
        frmAddNewPayeeKA.flxScrollCompanyRealKA.isVisible = true;
        }else{
          frmAddNewPayeeKA.flxScrollCompanyRealKA.isVisible = false;
        }
	}else{
		frmAddNewPayeeKA.flxScrollCompanyRealKA.isVisible = false;
	}
    frmAddNewPayeeKA.mainBodyKA.forceLayout();
}

function SelectedCompany(){
	var selectedRecord = frmAddNewPayeeKA.segMainCompanyKA.selectedItems[0];
	frmAddNewPayeeKA.tbxCompanyNameKA.text = selectedRecord["companyName"];
	frmAddNewPayeeKA.flxScrollCompanyRealKA.isVisible = false;
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